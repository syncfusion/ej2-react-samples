import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, Operators, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { MaskedTextBoxComponent, MaskChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { updateSampleSection } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './filtering.css';

/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    allowLabelFilter: true,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }],
    dataSource: Pivot_Data,
    expandAll: false
};
let fieldCollections: { [key: string]: FilterModel } = {};
let operators: string[] = ['Equals', 'DoesNotEquals', 'BeginWith', 'DoesNotBeginWith', 'EndsWith',
    'DoesNotEndsWith', 'Contains', 'DoesNotContains', 'GreaterThan',
    'GreaterThanOrEqualTo', 'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
let fields: string[] = ['Country', 'Products', 'Year'];
let pivotObj: PivotViewComponent;
let fieldsddl: DropDownListComponent;
let applyBtn: ButtonComponent;
let operatorddl: DropDownListComponent;
let valueInput1: MaskedTextBoxComponent;
let valueInput2: MaskedTextBoxComponent;

function LabelFilter () {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    function setFilters(fieldName: string, condition: Operators, operand1: string, operand2: string): void {
        fieldCollections[fieldName] = {
            name: fieldName,
            type: 'Label',
            condition: condition,
            value1: operand1,
            value2: operand2
        }
    }

    function updateButtonState(): void {
        applyBtn.disabled = true;
        for (let field of fields) {
            if (fieldCollections[field] && (fieldCollections[field].value1 !== '' || fieldCollections[field].value2 !== '')) {
                applyBtn.disabled = false;
                break;
            };
        }
    }

    function onClick(args: any): void {
        let filterOptions: FilterModel[] = [];
        for (let field of fields) {
            if (fieldCollections[field] && fieldCollections[field].value1 !== '') {
                filterOptions.push(fieldCollections[field]);
            }
        }
        if (filterOptions.length === 0) {
            filterOptions = [{
                name: fieldsddl.value as string,
                type: 'Label',
                condition: operatorddl.value as Operators,
                value1: valueInput1.value.toString(),
                value2: valueInput2.value.toString()
            }];
        }
        pivotObj.dataSourceSettings.filterSettings = filterOptions;
    }

    function onClear(args: any): void {
        pivotObj.dataSourceSettings.filterSettings = [];
        valueInput1.value = '';
        valueInput2.value = '';
        fieldCollections = {};
        updateButtonState();
    }

    function onFieldChange(args: ChangeEventArgs): void {
        if (fieldCollections[args.value as string]) {
            operatorddl.value = fieldCollections[args.value as string].condition;
            valueInput1.value = fieldCollections[args.value as string].value1 as string;
            valueInput2.value = fieldCollections[args.value as string].value2 as string;
        } else {
            setFilters(args.value as string, 'DoesNotEquals', '', '');
            operatorddl.value = 'DoesNotEquals';
            valueInput1.value = '';
            valueInput2.value = '';
        }
        updateButtonState();
    }

    function onOperatorChange(args: ChangeEventArgs): void {
        if (args.value === 'Between' || args.value === 'NotBetween') {
            (document.querySelector('.input2cls') as HTMLElement).style.display = '';
        } else {
            (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
        }
        setFilters(fieldsddl.value as string, args.value as Operators, valueInput1.value, valueInput2.value);
        updateButtonState();
    }

    function onValue1Change(e: MaskChangeEventArgs): void {
        setFilters(fieldsddl.value as string, operatorddl.value as Operators, e.value, valueInput2.value);
        updateButtonState();
    }

    function onValue2Change(e: MaskChangeEventArgs): void {
        setFilters(fieldsddl.value as string, operatorddl.value as Operators, valueInput1.value, e.value);
        updateButtonState();
    }

    function ondataBound(args: any): void {
        fieldCollections = {};
        for (let field of pivotObj.dataSourceSettings.filterSettings) {
            fieldCollections[field.name] = field;
        }
    }

    function rendereComplete(): void {
        if (applyBtn) {
            applyBtn.disabled = true;
            applyBtn.refresh();
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section' style={{ overflow: 'auto' }}>
                <div className='col-lg-8 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} dataBound={ondataBound} gridSettings={{ columnWidth: 140 }}>
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
                                    <td style={{ paddingBottom: '16px' }}>
                                        <div>
                                            <DropDownListComponent ref={(scope) => { fieldsddl = scope; }} index={0} width={'100%'} id="fields" change={onFieldChange.bind(this)} dataSource={fields} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td>
                                        Condition:
                                    </td>
                                    <td style={{ paddingBottom: '16px' }}>
                                        <div className='conditionscls'>
                                            <DropDownListComponent ref={(scope) => { operatorddl = scope; }} value={'DoesNotEquals'} width={'100%'} id="conditions" change={onOperatorChange.bind(this)} dataSource={operators} />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="input1cls" style={{ height: "50px" }}>
                                    <td>
                                        Value 1:
                                    </td>
                                    <td style={{ paddingBottom: '16px' }}>
                                        <div className="value1cls">
                                            <MaskedTextBoxComponent id="value1" ref={(scope) => { valueInput1 = scope; }} value={''}
                                                width={'100%'} change={onValue1Change.bind(this)} placeholder='Example: "Germany"'>
                                            </MaskedTextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="input2cls" style={{ height: "50px", display: "none" }}>
                                    <td>
                                        Value 2:
                                    </td>
                                    <td style={{ paddingBottom: '16px' }}>
                                        <div className="value2cls">
                                            <MaskedTextBoxComponent id="value2" ref={(scope) => { valueInput2 = scope; }} value={''}
                                                width={'100%'} change={onValue2Change.bind(this)} placeholder='Example: "States"'>
                                            </MaskedTextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                <td colSpan={2}>
                                        <div style={{ float: 'right', marginRight: "4px" }}>
                                            <ButtonComponent id='clear' onClick={onClear.bind(this)}>Clear</ButtonComponent>
                                        </div>
                                        <div style={{ float: 'right', marginRight: "4px" }}>
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
                <p>This sample demonstrates filtering row and column headers based on their text. The different conditions that can be applied to the text are equals, begins with, ends with, contains, etc.</p>
            </div>
            <div id="description">
                <p>In this sample, any field can be selected from the
                    <b> Fields</b> dropdown list. Further, choose an option from the
                    <b> Conditions</b> dropdown list, enter the values in
                    <b> Value1</b> and
                    <b> Value2</b> input textbox and apply the same to view the field headers filtered based on the text.
                    </p>
                <p>
                    Label filtering can be applied either through code-behind or UI.  To achieve this in code-behind, use the
                    <code> filterSettings</code> object in the pivot table along with the following properties.
                </p>
                <table>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '10px 0', width: '100px' }}>
                            <code>name :</code>
                        </td>
                        <td>Specifies the normal field.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>type :</code>
                        </td>
                        <td>Specifies the filter type and it should be "Label" in this scenario.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>condition :</code>
                        </td>
                        <td>Specifies the operator type like equals, greater than, less than, etc.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>value1 :</code>
                        </td>
                        <td> Gets the text to view the filter result. For example, select "DoesNotEquals" and enter "Germany" to exclude this country.</td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                            <code>value2 :</code>
                        </td>
                        <td>For conditions like "between" and "not between", this option will be enabled. Enter both start and end text to view the filter result. For example, enter "Germany" and "States" to filter the countries within this range.</td>
                    </tr>
                </table>
                <br />
                <p>
                    To achieve label filtering through UI, navigate to
                <b> "User Interaction &gt; Field List"</b> sample and open the filter dialog to experience the same.
                            For API details, refer to the
                <b> "Field List"</b> sample description.
                </p><br />
                <p>
                    More information on the label filtering can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/filtering#label-filtering">
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default LabelFilter;