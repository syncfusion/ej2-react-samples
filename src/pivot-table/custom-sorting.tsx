import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, Inject, IDataSet, GroupingBar, PivotActionCompleteEventArgs } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, ChangeEventArgs, MultiSelectComponent, SelectEventArgs, RemoveEventArgs, PopupEventArgs, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
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

export class CustomSorting extends SampleBase<{}, {}> {

    private pivotObj: PivotViewComponent;
    private fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
    private isInitial: boolean = true;
    private getMembers: { [key: string]: string[] } = { 'Country': [], 'Products': [], 'Year': [], 'Order_Source': [] };
    private memOrder: string[] = [];
    private index: number;
    private data: { [key: string]: Object; }[] = [];
    private fieldsObj: DropDownListComponent;
    private isMemberAdded: boolean = true;
    private isMemberAdded_1: boolean = true;
    private membersOrder: MultiSelectComponent;
    private orderInfo: DropDownListComponent;
    private applyBtn: ButtonComponent;
    private checkBoxObj: CheckBoxComponent;
    private order: string[] = ['Ascending', 'Descending'];
    private fields: { [key: string]: Object }[] = [
        { Field: 'Country', Order: 'Country_asc', caption: 'Country' },
        { Field: 'Products', Order: 'Products_desc', caption: 'Products' },
        { Field: 'Year', Order: 'Year_desc', caption: 'Year' },
        { Field: 'Order_Source', Order: 'Order_Source_asc', caption: 'Order Source' }
    ];
    onChange(e: ChangeEventArgs): void {
        if ((this.fieldsObj.dataSource as any)[this.fieldsObj.index].Order === (this.fieldsObj.dataSource as any)[this.fieldsObj.index].Field + '_asc') {
            this.orderInfo.index = 0;
        }
        else {
            this.orderInfo.index = 1;
        }
        if (this.memOrder.length > 0) {
            if (this.memOrder[this.fieldsObj.index] === 'Ascending') {
                this.orderInfo.index = 0;
            }
            else if (this.memOrder[this.fieldsObj.index] === 'Descending') {
                this.orderInfo.index = 1;
            }
        }
        if (e.itemData['Field'] === 'Year' && this.isMemberAdded) {
            this.fieldCollections.Year[3].Checked = "FY 2018_true";
            this.fieldCollections.Year[2].Checked = "FY 2017_true";
            this.membersOrder.value = this.updateSelectedMembers("Year").reverse();
            this.isMemberAdded = false;
        }
        else if (e.itemData['Field'] === 'Products' && this.isMemberAdded_1) {
            this.fieldCollections.Products[9].Checked = "Gloves_true";
            this.fieldCollections.Products[0].Checked = "Bottles and Cages_true";
            this.membersOrder.value = this.updateSelectedMembers("Products").reverse();
            this.isMemberAdded_1 = false;
        }
        this.membersOrder.dataSource = this.fieldCollections[e.itemData['Field']];
        this.membersOrder.value = this.updateSelectedMembers(e.itemData['Field']);
        this.membersOrder.dataBind();
        this.orderInfo.dataBind();
    }

    /* jshint ignore:start */
    dataBound(args: any): void {
        if (this.isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            let fieldCount: number = this.fields.length - 1;
            while (fieldCount > -1) {
                let members: string[] = Object.keys(this.pivotObj.engineModule.fieldList[this.fields[fieldCount].Field as string].members);
                let memberCnt: number = members.length;
                let memberColl: { Member: string; Checked: string; }[] = [];
                for (let i: number = 0; i < memberCnt; i++) {
                    memberColl.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                this.fieldCollections[this.fields[fieldCount].Field as string] = memberColl;
                fieldCount--;
            }
            this.fieldCollections.Order_Source.reverse();
            this.data = (this.fieldCollections[this.fields[0].Field as string]) as { [key: string]: Object }[];
            this.membersOrder.dataSource = this.data;
            this.fieldCollections.Country[0].Checked = "France_true";
            this.fieldCollections.Country[3].Checked = "United States_true";
            this.getMembers.Country.push('France', 'United States');
            this.getMembers.Year.push('FY 2018', 'FY 2017');
            this.getMembers.Products.push('Gloves', 'Bottles and Cages');
            this.membersOrder.value = this.updateSelectedMembers("Country").reverse();
            this.membersOrder.dataBind();
            this.isInitial = false;
        }
    }

    actionComplete(args: PivotActionCompleteEventArgs): void {
        let sortDetails: SortModel[] = this.pivotObj.dataSourceSettings.sortSettings;
        for (let i: number = 0; i < (this.pivotObj.dataSourceSettings.rows.length + this.pivotObj.dataSourceSettings.columns.length); i++) {
            if (sortDetails.length > 0) {
                if (sortDetails[i] && sortDetails[i].name === 'Country') {
                    this.updateOrder(sortDetails, i, 'Country', 0);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Products') {
                    this.updateOrder(sortDetails, i, 'Products', 1);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Year') {
                    this.updateOrder(sortDetails, i, 'Year', 2);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Order_Source') {
                    this.updateOrder(sortDetails, i, 'Order_Source', 3);
                }
            }
        }
    }
    /* jshint ignore:end */

    onChangeOrder(args: ChangeEventArgs): void {
        if (args.value === 'Ascending') {
            this.fieldsObj.dataSource[this.fieldsObj.index].Order = this.fieldsObj.dataSource[this.fieldsObj.index].Field + '_asc';
        }
        else {
            this.fieldsObj.dataSource[this.fieldsObj.index].Order = this.fieldsObj.dataSource[this.fieldsObj.index].Field + '_desc';
        }
        this.fieldsObj.refresh();
    }

    onMembersSelect(args: SelectEventArgs): void {
        this.applyBtn.disabled = false;
        this.maintainCheckedState((this.fieldsObj as any).itemData.Field, args.item.textContent, args.item.textContent + '_' + true);
        this.getMembers[(this.fieldsObj as any).itemData.Field].push(args.itemData['Member']);
    }
    onMembersRemove(args: RemoveEventArgs): void {
        this.maintainCheckedState((this.fieldsObj as any).itemData.Field, args.item.textContent, args.item.textContent + '_' + false);
        this.index = this.getMembers[(this.fieldsObj as any).itemData.Field].indexOf(args.itemData['Member']);
        if (this.getMembers[(this.fieldsObj as any).itemData.Field].indexOf(args.itemData['Member']) > -1) {
            this.getMembers[(this.fieldsObj as any).itemData.Field].splice(this.index, 1);
        }
    }
    open(args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }

    checkChange(args: Args): void {
        let ischecked: boolean = args.checked;
        this.fieldsObj.enabled = ischecked;
        this.orderInfo.enabled = ischecked;
        this.membersOrder.enabled = ischecked;
        this.applyBtn.disabled = !ischecked;
        this.pivotObj.dataSourceSettings.enableSorting = ischecked;
    }

    onClick(): void {
        if (this.checkBoxObj.checked) {
            this.pivotObj.setProperties({
                dataSourceSettings: {
                    enableSorting: true, sortSettings: [
                        { name: 'Country', order: this.fieldsObj.dataSource[0].Order === 'Country_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Country'] },
                        { name: 'Products', order: this.fieldsObj.dataSource[1].Order === 'Products_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Products'] },
                        { name: 'Year', order: this.fieldsObj.dataSource[2].Order === 'Year_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Year'] },
                        { name: 'Order_Source', order: this.fieldsObj.dataSource[3].Order === 'Order_Source_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Order_Source'] }
                    ]
                }
            }, true);
        }
        else {
            this.pivotObj.setProperties({ dataSourceSettings: { enableSorting: false, sortSettings: [] } }, true);
        }
        this.pivotObj.refreshData();
    }

    /** To set the checked status of the members maintained in the object fieldCollections. */
    maintainCheckedState(field: string, member: string, checkedState: string) {
        let members: { [key: string]: Object; }[] = this.fieldCollections[field];
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
    updateSelectedMembers(field: string) {
        let membersCollections: string[] = [];
        let members: { [key: string]: Object; }[] = this.fieldCollections[field];
        let count: number = members.length - 1;
        while (count > -1) {
            if (members[count].Checked === members[count].Member + '_' + true) {
                membersCollections.push(members[count].Member.toString());
            }
            count--;
        }
        return membersCollections;
    }

    updateOrder(sortDetails: SortModel[], i: number, fieldName: string, j: number) {
        if (sortDetails[i].order === 'Ascending') {
            if ((this.fieldsObj as any).itemData.Field === fieldName) {
                this.orderInfo.index = 0;
            }
            this.memOrder[j] = 'Ascending';
        }
        else {
            if ((this.fieldsObj as any).itemData.Field === fieldName) {
                this.orderInfo.index = 1;
            }
            this.memOrder[j] = 'Descending';
        }
    }

    render() {
        return (
            <div className='control-pane'>
            <div className='control-section' style={{ overflow: 'auto' }}>
                <div className='col-lg-8 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotObj = pivotview }} dataSourceSettings={dataSourceSettings}
                        showGroupingBar={true} groupingBarSettings={{ showRemoveIcon: false, showFilterIcon: false, showSortIcon: true, showValueTypeIcon: false, allowDragAndDrop: false }}
                        width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }} dataBound={this.dataBound.bind(this)} actionComplete={this.actionComplete.bind(this)}>
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
                                            <CheckBoxComponent ref={(scope) => { this.checkBoxObj = scope; }} id='reorder'
                                                checked={true} label='Enable Sorting' labelPosition='After' change={this.checkChange.bind(this)} ></CheckBoxComponent>
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
                                            <DropDownListComponent enabled={true} ref={(scope) => { this.fieldsObj = scope; }}
                                                change={this.onChange.bind(this)} width={"98%"} id="etype" type='text' tabIndex={0}
                                                dataSource={this.fields} index={0} fields={{ text: 'caption', value: 'Order' }} />
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
                                            <MultiSelectComponent ref={(scope) => { this.membersOrder = scope; }} select={this.onMembersSelect.bind(this)}
                                                removed={this.onMembersRemove.bind(this)} open={this.open.bind(this)}
                                                width={"98%"} placeholder="Select headers" id="etype"
                                                type='text' tabIndex={1} dataSource={this.data} mode='CheckBox'
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
                                            <DropDownListComponent enabled={true} ref={(scope) => { this.orderInfo = scope; }} type="text" tabIndex={1} change={this.onChangeOrder.bind(this)} width={"98%"} id="etype" dataSource={this.order} index={0} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td></td>
                                    <td>
                                        <div id="btn-control" style={{ float: 'right', marginRight: '4px' }}>
                                            <ButtonComponent id='apply' ref={(scope) => { this.applyBtn = scope; }} onClick={this.onClick.bind(this)} isPrimary={true}>Apply</ButtonComponent>
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
}