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
    dataSource: Pivot_Data,
    expandAll: false,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
    columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};

function DrillDown () {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let pivotObj: PivotViewComponent;
    let fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    let isInitial: boolean = true;
    let storeMembers: { [key: string]: string[] } = { 'Country': [], 'Year': [] };
    let isRowSelect: boolean = false;
    let isColumnSelect: boolean = false;
    let values: { [key: string]: Object }[] = [];
    let index: number;
    let fieldsddl: MultiSelectComponent;
    let membersOrder: MultiSelectComponent;
    let optionsdll: DropDownListComponent;
    let field1: DropDownListComponent;
    let applyBtn: ButtonComponent;
    let checkBoxObj: CheckBoxComponent;
    let fields: { [key: string]: Object }[] = [
        { Field: 'Country', expandAll: false },
        { Field: 'Year', expandAll: false }
    ];
    let options: { [key: string]: Object; }[] = [
        { value: 'allHeaders', text: 'All headers' },
        { value: 'rowHeaders', text: 'Row headers' },
        { value: 'columnHeader', text: 'Column headers' },
        { value: 'specificFields', text: 'Specific fields' },
        { value: 'specificHeaders', text: 'Specific headers' }
    ];
    function onChange(e: ChangeEventArgs): void {
        membersOrder.dataSource = fieldCollections[e.itemData['Field']];
        membersOrder.value = getSelectedMembers(e.itemData['Field']);
        membersOrder.dataBind();
        field1.dataBind();
    }

    /* jshint ignore:start */
    function dataBound(args: any): void {
        if (isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            let fieldCnt: number = fields.length - 1;
            while (fieldCnt > -1) {
                let members: string[] = Object.keys(pivotObj.engineModule.fieldList[fields[fieldCnt].Field as string].members);
                let memberCnt: number = members.length;
                let membersCollection: { Member: string; Checked: string; }[] = [];
                for (let i: number = 0; i < memberCnt; i++) {
                    membersCollection.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                fieldCollections[fields[fieldCnt].Field as string] = membersCollection;
                fieldCnt--;
            }
            values = fieldCollections[fields[0].Field as string];
            membersOrder.dataSource = values;
            membersOrder.dataBind();
            fieldsddl.dataBind();
            isInitial = false;
        }
    }
    /* jshint ignore:end */

    function onChangeOption(args: ChangeEventArgs): void {
        (document.querySelector('.field_cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.field_cls_1') as HTMLElement).style.display = 'none';
        (document.querySelector('.members_cls') as HTMLElement).style.display = 'none';
        (document.querySelector('.apply_cls') as HTMLElement).style.display = 'none';
        if (args.value == 'allHeaders') {
            clear();
            pivotObj.setProperties({ dataSourceSettings: { expandAll: true, drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            pivotObj.refreshData();
        } else if (args.value == 'rowHeaders') {
            clear();
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, true, false);
        } else if (args.value == 'columnHeader') {
            clear();
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, false, true);
        } else if (args.value == 'specificFields') {
            (document.querySelector('.field_cls') as HTMLElement).style.display = '';
        } else if (args.value == 'specificHeaders') {
            (document.querySelector('.field_cls_1') as HTMLElement).style.display = '';
            (document.querySelector('.members_cls') as HTMLElement).style.display = '';
            (document.querySelector('.apply_cls') as HTMLElement).style.display = '';
        }
    }

    function onMembersSelect(args: SelectEventArgs): void {
        setMemberCheckedState((field1 as any).itemData.Field, args['item'].textContent, args['item'].textContent + '_' + true);
        applyBtn.disabled = false;
        storeMembers[(field1 as any).itemData.Field].push(args.itemData['Member']);
    }
    function onMembersRemove(args: RemoveEventArgs): void {
        setMemberCheckedState((field1 as any).itemData.Field, args['item'].textContent, args['item'].textContent + '_' + false);
        index = storeMembers[(field1 as any).itemData.Field].indexOf(args.itemData['Member']);
        if (storeMembers[(field1 as any).itemData.Field].indexOf(args.itemData['Member']) > -1) {
            storeMembers[(field1 as any).itemData.Field].splice(index, 1);
        }
    }
    function onFieldSelect(args: SelectEventArgs): void {
        membersOrder.value = [];
        if (storeMembers['Country'].length > 0 || storeMembers['Year'].length > 0) {
            storeMembers = { 'Country': [], 'Year': [] };
            isInitial = true;
        }
        if (args.itemData['Field'] === 'Country') {
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, true, isColumnSelect);
            isRowSelect = true;
        }
        else if (args.itemData['Field'] === 'Year') {
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, isRowSelect, true);
            isColumnSelect = true;
        }
    }
    function onFieldRemove(args: RemoveEventArgs): void {
        if (args.itemData['Field'] === 'Country') {
            updateRowColumn(false, false, isColumnSelect);
            isRowSelect = false;
        }
        else if (args.itemData['Field'] === 'Year') {
            updateRowColumn(false, isRowSelect, false);
            isColumnSelect = false;
        }
    }
    function open(args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }

    function onClick(): void {
        fieldsddl.value = [];
        isRowSelect = false;
        isColumnSelect = false;
        pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: storeMembers['Country'] }, { name: 'Year', items: storeMembers['Year'] }] } }, true);
        updateRowColumn(false, false, false);
    }

    /** To set the checked status of the members maintained in the object fieldCollections. */
    function setMemberCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let membersLength: number = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Member === member) {
                members[membersLength].Checked = checkedState;
                break;
            }
            membersLength--;
        }
    }

    /** To get the checked members/status here as string array. */
    function getSelectedMembers(field: string) {
        let membersCollection: string[] = [];
        let members: { [key: string]: Object; }[] = fieldCollections[field];
        let membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Checked === members[membersLength].Member + '_' + true) {
                membersCollection.push(members[membersLength].Member.toString());
            }
            membersLength--;
        }
        return membersCollection;
    }

    function updateRowColumn(isExpand: boolean, isRowExpand: boolean, isColumnExpand: boolean) {
        pivotObj.setProperties({
            dataSourceSettings: {
                expandAll: isExpand, rows: [
                    { name: 'Country', expandAll: fieldsddl.dataSource[0].expandAll = isRowExpand },
                    { name: 'Products' }
                ], columns: [
                    { name: 'Year', expandAll: fieldsddl.dataSource[1].expandAll = isColumnExpand },
                    { name: 'Order_Source' }
                ]
            }
        }, true);
        pivotObj.refreshData();
    }

    function clear() {
        fieldsddl.value = [];
        isRowSelect = false;
        isColumnSelect = false;
        membersOrder.value = [];
        if (storeMembers['Country'].length > 0 || storeMembers['Year'].length > 0) {
            storeMembers = { 'Country': [], 'Year': [] };
            isInitial = true;
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section' style={{ overflow: 'auto' }}>
                <div className='col-lg-8 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings}
                        width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }} dataBound={dataBound.bind(this)}>
                    </PivotViewComponent>
                </div>
                <div className='col-lg-4 property-section pivot-property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', height: '100%' }}>
                            <tbody>
                            <tr style={{ height: '50px' }}>
                                    <td>
                                        <div className='hdrlabel' style={{ height: '50px' }}>
                                            Drill Down:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent enabled={true} ref={(scope) => { optionsdll = scope; }} type="text" tabIndex={0} change={onChangeOption.bind(this)} width={"98%"}
                                                id="etype" dataSource={options} fields={{ value: 'value', text: 'text' }} value='rowHeaders' />
                                        </div>
                                    </td>
                                </tr>
                                <tr className='field_cls' style={{ height: '50px', display: 'none' }}>
                                    <td>
                                        <div className='hdrlabel'>
                                            Fields:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <MultiSelectComponent ref={(scope) => { fieldsddl = scope; }} select={onFieldSelect.bind(this)}
                                                removed={onFieldRemove.bind(this)} open={open.bind(this)}
                                                width={"98%"} placeholder="Select fields" id="etype"
                                                type='text' tabIndex={1} dataSource={fields} mode='CheckBox'
                                                showDropDownIcon={true} showClearButton={false} enableSelectionOrder={false}
                                                fields={{ text: 'Field' }}>
                                                <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='field_cls_1' style={{ height: '50px', display: 'none' }}>
                                    <td>
                                        <div className='hdrlabel'>
                                            Fields:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent enabled={true} ref={(scope) => { field1 = scope; }} placeholder="Select fields"
                                                change={onChange.bind(this)} width={"100%"} id="etype" type='text' tabIndex={1}
                                                dataSource={fields} fields={{ text: 'Field' }} value="Country" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className='members_cls' style={{ height: '50px', display: 'none' }}>
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
                                                type='text' tabIndex={1} dataSource={values} mode='CheckBox'
                                                showDropDownIcon={true} showClearButton={false} enableSelectionOrder={false}
                                                fields={{ text: 'Member' }}>
                                                <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='apply_cls' style={{ height: '50px', display: "none" }}>
                                    <td></td>
                                    <td>
                                        <div id="btn-control" style={{ float: 'right' }}>
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
                <p>This sample demonstrates how to drill down on all headers, column headers only, row headers only, specific field(s), and specific member(s) within the specific field(s).</p>
                </div>
                <div id="description">
                <p>In this sample, drill down can be performed based on the option selected from the <b>Drill Down</b> dropdown list. The available options are described in detail below.</p>
                <table>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '10px 0', width: '150px' }}>
                        <code>All headers :</code>
                    </td>
                    
                    <td style={{ paddingTop: '10px' }}>Allows to expand all headers of row and column axes in the pivot table. 
                        It can be achieved by setting the <code>expandAll</code> property to <b>true</b> in the <code>dataSourceSettings</code>.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Row headers :</code>
                    </td>
                    <td style={{ paddingTop: '2px' }}>Allows to expand all row headers in the pivot table. 
                        It can be achieved by setting the <code>expandAll</code> property to <b>true</b> for row fields only.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Column headers :</code>
                    </td>
                    <td style={{ paddingTop: '2px' }}>Allows to expand all column headers in the pivot table. 
                        It can be achieved by setting the <code>expandAll</code> property to <b>true</b> for column fields only.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Specific fields :</code>
                    </td>
                    <td style={{ paddingTop: '3px' }}>Allows to expand specific field(s) in the pivot table's row or column axes. 
                        It can be achieved by setting the <code>expandAll</code> property for the relevant field(s) in the row and column axes to <b>true</b>.</td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                        <code>Specific headers :</code>
                    </td>
                    <td style={{ paddingTop: '3px' }}>Allows to expand specific header(s) within the respective field available in the pivot table's row or column axes.
                            It can be achieved by specifying the respective field name and its member(s), aka header name(s), inside the <code>drilledMembers</code> property in the <code>dataSourceSettings</code>.</td>
                </tr>
                </table><br />
                <p>
                    More information on the drill down can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/drill-down">
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default DrillDown;