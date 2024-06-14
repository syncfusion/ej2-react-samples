import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, Inject, IDataSet, GroupingBar, PivotActionCompleteEventArgs } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, ChangeEventArgs, MultiSelectComponent, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs as Args } from '@syncfusion/ej2-buttons';
import { SortModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './sorting.css';

/**
 * PivotView Member Sorting sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    drilledMembers: [{name: 'Country', items: ['Germany']}],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    sortSettings: [{ name: 'Country', order: 'Ascending', membersOrder: ['France', 'United States'] }, { name: 'Year', order: 'Descending', membersOrder: ['FY 2018', 'FY 2017'] },
    { name: 'Products', order: 'Descending', membersOrder: ['Gloves', 'Bottles and Cages'] }],
    columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }]
};

function CustomSorting () {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let pivotObj: PivotViewComponent;
    let fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    let isInitial: boolean = true;
    let getMembers: { [key: string]: string[] } = { 'Country': [], 'Products': [], 'Year': [], 'Order_Source': [] };
    let memOrder: string[] = [];
    let index: number;
    let data: { [key: string]: Object; }[] = [];
    let fieldsObj: DropDownListComponent;
    let isMemberAdded: boolean = true;
    let isMemberAdded_1: boolean = true;
    let membersOrder: MultiSelectComponent;
    let orderInfo: DropDownListComponent;
    let applyBtn: ButtonComponent;
    let checkBoxObj: CheckBoxComponent;
    let order: string[] = ['Ascending', 'Descending'];
    let fields: { [key: string]: Object }[] = [
        { Field: 'Country', Order: 'Country_asc', caption: 'Country' },
        { Field: 'Products', Order: 'Products_desc', caption: 'Products' },
        { Field: 'Year', Order: 'Year_desc', caption: 'Year' },
        { Field: 'Order_Source', Order: 'Order_Source_asc', caption: 'Order Source' }
    ];
    function onChange(e: ChangeEventArgs): void {
        if ((fieldsObj.dataSource as any)[fieldsObj.index].Order === (fieldsObj.dataSource as any)[fieldsObj.index].Field + '_asc') {
            orderInfo.index = 0;
        }
        else {
            orderInfo.index = 1;
        }
        if (memOrder.length > 0) {
            if (memOrder[fieldsObj.index] === 'Ascending') {
                orderInfo.index = 0;
            }
            else if (memOrder[fieldsObj.index] === 'Descending') {
                orderInfo.index = 1;
            }
        }
        if (e.itemData['Field'] === 'Year' && isMemberAdded) {
            fieldCollections.Year[3].Checked = "FY 2018_true";
            fieldCollections.Year[2].Checked = "FY 2017_true";
            membersOrder.value = updateSelectedMembers("Year").reverse();
            isMemberAdded = false;
        }
        else if (e.itemData['Field'] === 'Products' && isMemberAdded_1) {
            fieldCollections.Products[9].Checked = "Gloves_true";
            fieldCollections.Products[0].Checked = "Bottles and Cages_true";
            membersOrder.value = updateSelectedMembers("Products").reverse();
            isMemberAdded_1 = false;
        }
        membersOrder.dataSource = fieldCollections[e.itemData['Field']];
        membersOrder.value = updateSelectedMembers(e.itemData['Field']);
        membersOrder.dataBind();
        orderInfo.dataBind();
    }

    /* jshint ignore:start */
    function dataBound(args: any): void {
        if (isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            let fieldCount: number = fields.length - 1;
            while (fieldCount > -1) {
                let members: string[] = Object.keys(pivotObj.engineModule.fieldList[fields[fieldCount].Field as string].members);
                let memberCnt: number = members.length;
                let memberColl: { Member: string; Checked: string; }[] = [];
                for (let i: number = 0; i < memberCnt; i++) {
                    memberColl.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                fieldCollections[fields[fieldCount].Field as string] = memberColl;
                fieldCount--;
            }
            fieldCollections.Order_Source.reverse();
            data = (fieldCollections[fields[0].Field as string]) as { [key: string]: Object }[];
            membersOrder.dataSource = data;
            fieldCollections.Country[0].Checked = "France_true";
            fieldCollections.Country[3].Checked = "United States_true";
            getMembers.Country.push('France', 'United States');
            getMembers.Year.push('FY 2018', 'FY 2017');
            getMembers.Products.push('Gloves', 'Bottles and Cages');
            membersOrder.value = updateSelectedMembers("Country").reverse();
            membersOrder.dataBind();
            isInitial = false;
        }
    }

    function actionComplete(args: PivotActionCompleteEventArgs): void {
        let sortDetails: SortModel[] = pivotObj.dataSourceSettings.sortSettings;
        for (let i: number = 0; i < (pivotObj.dataSourceSettings.rows.length + pivotObj.dataSourceSettings.columns.length); i++) {
            if (sortDetails.length > 0) {
                if (sortDetails[i] && sortDetails[i].name === 'Country') {
                    updateOrder(sortDetails, i, 'Country', 0);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Products') {
                    updateOrder(sortDetails, i, 'Products', 1);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Year') {
                    updateOrder(sortDetails, i, 'Year', 2);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Order_Source') {
                    updateOrder(sortDetails, i, 'Order_Source', 3);
                }
            }
        }
    }
    /* jshint ignore:end */

    function onChangeOrder(args: ChangeEventArgs): void {
        if (args.value === 'Ascending') {
            fieldsObj.dataSource[fieldsObj.index].Order = fieldsObj.dataSource[fieldsObj.index].Field + '_asc';
        }
        else {
            fieldsObj.dataSource[fieldsObj.index].Order = fieldsObj.dataSource[fieldsObj.index].Field + '_desc';
        }
        fieldsObj.refresh();
    }

    function onMembersSelect(args: SelectEventArgs): void {
        applyBtn.disabled = false;
        maintainCheckedState((fieldsObj as any).itemData.Field, args.item.textContent, args.item.textContent + '_' + true);
        getMembers[(fieldsObj as any).itemData.Field].push(args.itemData['Member']);
    }
    function onMembersRemove(args: RemoveEventArgs): void {
        maintainCheckedState((fieldsObj as any).itemData.Field, args.item.textContent, args.item.textContent + '_' + false);
        index = getMembers[(fieldsObj as any).itemData.Field].indexOf(args.itemData['Member']);
        if (getMembers[(fieldsObj as any).itemData.Field].indexOf(args.itemData['Member']) > -1) {
            getMembers[(fieldsObj as any).itemData.Field].splice(index, 1);
        }
    }
    function open(args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }

    function checkChange(args: Args): void {
        let ischecked: boolean = args.checked;
        fieldsObj.enabled = ischecked;
        orderInfo.enabled = ischecked;
        membersOrder.enabled = ischecked;
        applyBtn.disabled = !ischecked;
        pivotObj.dataSourceSettings.enableSorting = ischecked;
    }

    function onClick(): void {
        if (checkBoxObj.checked) {
            pivotObj.setProperties({
                dataSourceSettings: {
                    enableSorting: true, sortSettings: [
                        { name: 'Country', order: fieldsObj.dataSource[0].Order === 'Country_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Country'] },
                        { name: 'Products', order: fieldsObj.dataSource[1].Order === 'Products_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Products'] },
                        { name: 'Year', order: fieldsObj.dataSource[2].Order === 'Year_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Year'] },
                        { name: 'Order_Source', order: fieldsObj.dataSource[3].Order === 'Order_Source_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Order_Source'] }
                    ]
                }
            }, true);
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { enableSorting: false, sortSettings: [] } }, true);
        }
        pivotObj.refreshData();
    }

    /** To set the checked status of the members maintained in the object fieldCollections. */
    function maintainCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let count: number = members.length - 1;
        while (count > -1) {
            if (members[count].Member === member) {
                members[count].Checked = checkedState;
                break;
            }
            count--;
        }
    }

    /** To get the checked members/status here as string array. */
    function updateSelectedMembers(field: string) {
        let membersCollections: string[] = [];
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let count: number = members.length - 1;
        while (count > -1) {
            if (members[count].Checked === members[count].Member + '_' + true) {
                membersCollections.push(members[count].Member.toString());
            }
            count--;
        }
        return membersCollections;
    }

    function updateOrder(sortDetails: SortModel[], i: number, fieldName: string, j: number) {
        if (sortDetails[i].order === 'Ascending') {
            if ((fieldsObj as any).itemData.Field === fieldName) {
                orderInfo.index = 0;
            }
            memOrder[j] = 'Ascending';
        }
        else {
            if ((fieldsObj as any).itemData.Field === fieldName) {
                orderInfo.index = 1;
            }
            memOrder[j] = 'Descending';
        }
    }

    return (
        <div className='control-pane'>
        <div className='control-section' style={{ overflow: 'auto' }}>
            <div className='col-lg-8 adaptive'>
                <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings}
                    showGroupingBar={true} groupingBarSettings={{ showRemoveIcon: false, showFilterIcon: false, showSortIcon: true, showValueTypeIcon: false, allowDragAndDrop: false }}
                    width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }} dataBound={dataBound.bind(this)} actionComplete={actionComplete.bind(this)}>
                    <Inject services={[GroupingBar]} />
                </PivotViewComponent>
            </div>
            <div className='col-lg-4 property-section pivot-property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', height: '100%' }}>
                        <tbody>
                            <tr style={{ height: "50px" }}>
                                <td colSpan={2}>
                                    <div className='row'>
                                        <CheckBoxComponent ref={(scope) => { checkBoxObj = scope; }} id='reorder'
                                            checked={true} label='Enable Sorting' labelPosition='After' change={checkChange.bind(this)} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div className='hdrlabel'>
                                        Field:
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent enabled={true} ref={(scope) => { fieldsObj = scope; }}
                                            change={onChange.bind(this)} width={"98%"} id="etype" type='text' tabIndex={0}
                                            dataSource={fields} index={0} fields={{ text: 'caption', value: 'Order' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div className='hdrlabel'>
                                        Headers:
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <MultiSelectComponent ref={(scope) => { membersOrder = scope; }} select={onMembersSelect.bind(this)}
                                            removed={onMembersRemove.bind(this)} open={open.bind(this)}
                                            width={"98%"} placeholder="Select headers" id="etype"
                                            type='text' tabIndex={1} dataSource={data} mode='CheckBox'
                                            showDropDownIcon={true} showClearButton={false} enableSelectionOrder={false}
                                            fields={{ text: 'Member' }} aria-label={'multiselect'}>
                                            <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div className='hdrlabel'>
                                        Order:
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent enabled={true} ref={(scope) => { orderInfo = scope; }} type="text" tabIndex={1} change={onChangeOrder.bind(this)} width={"98%"} id="etype" dataSource={order} index={0} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td></td>
                                <td>
                                    <div id="btn-control" style={{ float: 'right', marginRight: '4px' }}>
                                        <ButtonComponent id='apply' ref={(scope) => { applyBtn = scope; }} onClick={onClick.bind(this)} isPrimary={true}>Apply</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div>
            <div id="action-description">
                <p>This sample demonstrates ordering used-defined member(s), aka header name(s), of specific field in row and column axes in ascending or descending order.</p>
            </div>
            <div id="description">
                <p>
                    In this sample, any field from the <b>Field</b> dropdown list and its member(s), aka header name(s), from the <b>Headers</b> dropdown list can be ordered ascending or descending.
                    It is possible to achieve this by setting the <code>enableSorting</code> property to <b>true</b>, 
                    as well as the field name, sort order, and member(s) (which can be in any order) inside the pivot table's <code>sortSettings</code> property.
                    The <code>dataSourceSettings</code> includes <code>enableSorting</code> and <code>sortSettings</code> properties.
                </p><br />
                <p>
                    More information on the custom sorting can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/sorting#custom-sorting">
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default CustomSorting;