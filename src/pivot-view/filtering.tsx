import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, FieldList, FilterType, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/dataSource-model';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
    DropDownListComponent, ChangeEventArgs, Inject, CheckBoxSelection, MultiSelectComponent, SelectEventArgs,
    RemoveEventArgs, PopupEventArgs
} from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './filtering.css';

/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSource: IDataOptions = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }],
    data: Pivot_Data,
    expandAll: false
};
let values: { [key: string]: Object }[] = [
    { Member: "United States", Checked: "United States_false" },
    { Member: "United Kingdom", Checked: "United Kingdom_false" },
    { Member: "Germany", Checked: "Germany_false" },
    { Member: "France", Checked: "France_false" }
];
let fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
let filterCollections: { [key: string]: FilterModel } = {};
let isInitial: boolean = true;
let type: string[] = ['Include', 'Exclude'];
let fields: string[] = ['Country', 'Products', 'Year'];
let pivotGridObj: PivotViewComponent;
let fieldsddl: DropDownListComponent;
let applyBtn: ButtonComponent;
let typeddl: DropDownListComponent;
let valuesddl: MultiSelectComponent;
let field: any = { text: 'Member' };

export class Filtering extends SampleBase<{}, {}> {

    /** To get the checked members here as string array */
    getSelectedMembers(field: string): string[] {
        let membersColl: string[] = [];
        let members: { [key: string]: Object }[] = fieldCollections[field];
        let memLength: number = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Checked'] === members[memLength]['Member'] + '_' + true) {
                membersColl.push(members[memLength]['Member'].toString());
            }
            memLength--;
        }
        return membersColl;
    }

    /** To set the checked status of the members maintained in the object fieldCollections */
    setMemberCheckedState(field: string, member: string, checkedState: string): void {
        let members: { [key: string]: Object }[] = fieldCollections[field];
        let memLength: number = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Member'] === member) {
                members[memLength]['Checked'] = checkedState;
                break;
            }
            memLength--;
        }
    }

    /** To set disabled/enabled state in the Apply button. */
    setApplyBtnState(): void {
        let fieldArray: string[] = ['Country', 'Products', 'Year'];
        let loopCount: number = fieldArray.length - 1;
        let isSelected: boolean = false;
        while (loopCount > -1) {
            if (this.getSelectedMembers(fieldArray[loopCount]).length > 0) {
                isSelected = true;
                break;
            }
            loopCount--;
        }
        applyBtn.disabled = !isSelected;
    }

    select(args: SelectEventArgs): void {
        applyBtn.disabled = false;
        this.setMemberCheckedState((fieldsddl as any).itemData, args.item.textContent, args.item.textContent + '_' + true);
    }
    removed(args: RemoveEventArgs): void {
        this.setMemberCheckedState((fieldsddl as any).itemData, args.item.textContent, args.item.textContent + '_' + false);
        this.setApplyBtnState();
    }
    open(args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }
    onClick(args: any): void {
        /** You can set your filter settings here */
        pivotGridObj.dataSource.filterSettings = [
            { name: fields[0], items: this.getSelectedMembers(fields[0]), type: this.updateFilterType(fields[0]) },
            { name: fields[1], items: this.getSelectedMembers(fields[1]), type: this.updateFilterType(fields[1]) },
            { name: fields[2], items: this.getSelectedMembers(fields[2]), type: this.updateFilterType(fields[2]) },
        ];
    }

    updateFilterType(fieldName: string): FilterType {
        if ((fieldsddl as any).itemData === fieldName) {
            return (typeddl as any).itemData;
        } else if (filterCollections[fieldName]) {
            return filterCollections[fieldName].type;
        } else {
            return 'Exclude'
        }
    }

    onChange(args: ChangeEventArgs): void {
        valuesddl.dataSource = fieldCollections[args.value.toString()];
        valuesddl.value = this.getSelectedMembers(args.value.toString());
        if (filterCollections[args.value.toString()]) {
            typeddl.value = filterCollections[args.value.toString()].type;
        }
        valuesddl.dataBind();
        typeddl.dataBind();
    }

    rendereComplete(): void {
        if (applyBtn) {
            applyBtn.disabled = true;
            applyBtn.refresh();
        }
    }

    ondataBound(args: any): void {
        if (isInitial) {
            /** To fill the members for each fields into the object fieldCollections */
            let fieldCnt: number = fields.length - 1;
            while (fieldCnt > -1) {
                let members: string[] = Object.keys((this as any).engineModule.fieldList[fields[fieldCnt]].members);
                let memberCnt: number = members.length - 1;
                let memberColl: { [key: string]: Object }[] = [];
                while (memberCnt > -1) {
                    memberColl.push({ Member: members[memberCnt], Checked: members[memberCnt] + '_' + false });
                    memberCnt--;
                }
                fieldCollections[fields[fieldCnt]] = memberColl;
                fieldCnt--;
            }
            values = fieldCollections[fields[0]];
            isInitial = false;
        }
        for (let field of pivotGridObj.dataSource.filterSettings) {
            filterCollections[field.name] = field;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <div className='col-lg-8 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotGridObj = pivotview }} dataSource={dataSource} width={'100%'} height={'300'} dataBound={this.ondataBound} gridSettings={{ columnWidth: 140 }}>
                            <Inject services={[FieldList]} />
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-4 property-section pivotgrid-property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            Fields:
                                        </td>
                                        <td>
                                            <div>
                                                <DropDownListComponent ref={(scope) => { fieldsddl = scope; }} index={0} width={'98%'} id="etype" change={this.onChange.bind(this)} dataSource={fields} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            Members:
                                        </td>
                                        <td>
                                            <div>
                                                <MultiSelectComponent id="checkbox" ref={(scope) => { valuesddl = scope; }} dataSource={values}
                                                    fields={field} mode="CheckBox" showClearButton={true} enableSelectionOrder={false} showDropDownIcon={true}
                                                    select={this.select.bind(this)} removed={this.removed.bind(this)} open={this.open.bind(this)}>
                                                    <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            Filter Type:
                                        </td>
                                        <td>
                                            <div>
                                                <DropDownListComponent ref={(scope) => { typeddl = scope; }} index={1} width={'98%'} id="etype" dataSource={type} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td></td>
                                        <td>
                                            <div id="btn-control" style={{ float: 'right', marginRight: '4px' }}>
                                                <ButtonComponent id='apply' ref={(scope) => { applyBtn = scope; }} onClick={this.onClick.bind(this)} isPrimary={true}>Apply</ButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>

                </div>
                <div id="action-description">
                    <p>This sample demonstrates filtering of field headers either by including or excluding them.</p>
                </div>
                <div id="description">
                    <p>In this sample, any field can be selected from
                        <b> Fields</b> dropdown list along with its members from be subsequent
                        <b> Members</b> dropdown list and finally select whether to include or exclude them from filtering. It can be achieved
                                                            using the
                        <code> name</code> and
                        <code> items</code> options inside the
                        <code> filterSettings</code> property in the pivotgrid widget.
                    </p>
                </div>
            </div>
        )
    }
}