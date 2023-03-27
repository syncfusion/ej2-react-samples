import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, FieldList, FilterType, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
    DropDownListComponent, ChangeEventArgs, Inject, CheckBoxSelection, MultiSelectComponent, SelectEventArgs,
    RemoveEventArgs, PopupEventArgs
} from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './filtering.css';

/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }],
    dataSource: Pivot_Data,
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
let pivotObj: PivotViewComponent;
let fieldsddl: DropDownListComponent;
let applyBtn: ButtonComponent;
let typeddl: DropDownListComponent;
let valuesddl: MultiSelectComponent;
let field: any = { text: 'Member' };

function Filtering () {

    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])

    /** To get the checked members here as string array */
    function getSelectedMembers(field: string): string[] {
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
    function setMemberCheckedState(field: string, member: string, checkedState: string): void {
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
    function setApplyBtnState(): void {
        let fieldArray: string[] = ['Country', 'Products', 'Year'];
        let loopCount: number = fieldArray.length - 1;
        let isSelected: boolean = false;
        let isFiltersAvail: boolean = false;
        while (loopCount > -1) {
            if (getSelectedMembers(fieldArray[loopCount]).length > 0) {
                isSelected = true;
                break;
            }
            if (pivotObj.dataSourceSettings.filterSettings &&
                pivotObj.dataSourceSettings.filterSettings[loopCount] &&
                pivotObj.dataSourceSettings.filterSettings[loopCount].items.length > 0) {
                isFiltersAvail = true;
            }
            loopCount--;
        }
        applyBtn.disabled = (!isSelected && isFiltersAvail) ? isSelected : !isSelected;
    }

    function select(args: SelectEventArgs): void {
        applyBtn.disabled = false;
        setMemberCheckedState((fieldsddl as any).itemData, args.item.textContent, args.item.textContent + '_' + true);
    }
    function removed(args: RemoveEventArgs): void {
        setMemberCheckedState((fieldsddl as any).itemData, args.item.textContent, args.item.textContent + '_' + false);
        setApplyBtnState();
    }
    function open(args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }
    function onClick(args: any): void {
        /** You can set your filter settings here */
        let filterItems0: string[] = getSelectedMembers(fields[0]);
        let filterItems1: string[] = getSelectedMembers(fields[1]);
        let filterItems2: string[] = getSelectedMembers(fields[2]);
        pivotObj.dataSourceSettings.filterSettings = [
            { name: fields[0], items: getSelectedMembers(fields[0]), type: updateFilterType(fields[0]) },
            { name: fields[1], items: getSelectedMembers(fields[1]), type: updateFilterType(fields[1]) },
            { name: fields[2], items: getSelectedMembers(fields[2]), type: updateFilterType(fields[2]) },
        ];
        if (filterItems0.length === 0 && filterItems1.length === 0 && filterItems2.length === 0) {
            applyBtn.disabled = true;
        }
    }

    function updateFilterType(fieldName: string): FilterType {
        if ((fieldsddl as any).itemData === fieldName) {
            return (typeddl as any).itemData;
        } else if (filterCollections[fieldName]) {
            return filterCollections[fieldName].type;
        } else {
            return 'Exclude'
        }
    }

    function onChange(args: ChangeEventArgs): void {
        valuesddl.dataSource = fieldCollections[args.value.toString()];
        valuesddl.value = getSelectedMembers(args.value.toString());
        if (filterCollections[args.value.toString()]) {
            typeddl.value = filterCollections[args.value.toString()].type;
        }
        valuesddl.dataBind();
        typeddl.dataBind();
    }

    function rendereComplete(): void {
        if (applyBtn) {
            applyBtn.disabled = true;
            applyBtn.refresh();
        }
    }

    function ondataBound(args: any): void {
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
        for (let field of pivotObj.dataSourceSettings.filterSettings) {
            filterCollections[field.name] = field;
        }
    }

        return (
            <div className='control-pane'>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <div className='col-lg-8 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} dataBound={ondataBound} gridSettings={{ columnWidth: 140 }}>
                            <Inject services={[FieldList]} />
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-4 property-section pivottable-property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            Fields:
                                        </td>
                                        <td>
                                            <div>
                                                <DropDownListComponent ref={(scope) => { fieldsddl = scope; }} index={0} width={'98%'} id="etype" change={onChange.bind(this)} dataSource={fields} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            Members:
                                        </td>
                                        <td>
                                            <div>
                                                <MultiSelectComponent id="checkbox" placeholder="Select members" ref={(scope) => { valuesddl = scope; }} dataSource={values}
                                                    fields={field} mode="CheckBox" showClearButton={true} enableSelectionOrder={false} showDropDownIcon={true}
                                                    select={select.bind(this)} removed={removed.bind(this)} open={open.bind(this)}>
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
                    <p>This sample demonstrates filtering row and column headers either by including or excluding them from the pivot table.</p>
                </div>
                <div id="description">
                    <p>In this sample, any field can be selected from
                        <b> Fields</b> dropdown list along with its members from be subsequent
                        <b> Members</b> dropdown list and finally select whether to include or exclude them from filtering. It can be achieved
                                                            using the
                        <code> name</code> and
                        <code> items</code> options inside the
                        <code> filterSettings</code> property in the pivot table.
                    </p>
                </div>
            </div>
        )
}

export default Filtering;