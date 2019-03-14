import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, Operators, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent, ChangeEventArgs as NumericEventArgs } from '@syncfusion/ej2-react-inputs';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/dataSource-model';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './filtering.css';

/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSource: IDataOptions = {
    allowValueFilter: true,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }],
    data: Pivot_Data,
    expandAll: false
};
let fieldCollections: { [key: string]: FilterModel } = {};
let operators: string[] = ['Equals', 'DoesNotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
    'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
let fields: string[] = ['Country', 'Products', 'Year'];
let measures: { [key: string]: Object }[] = [
    { value: 'In_Stock', text: 'In Stock' },
    { value: 'Sold', text: 'Units Sold' },
    { value: 'Amount', text: 'Sold Amount' }];
let measureFields: object = { text: 'text', value: 'value' };
let pivotGridObj: PivotViewComponent;
let fieldsddl: DropDownListComponent;
let measuresddl: DropDownListComponent;
let applyBtn: ButtonComponent;
let operatorddl: DropDownListComponent;
let valueInput1: NumericTextBoxComponent;
let valueInput2: NumericTextBoxComponent;

export class ValueFilter extends SampleBase<{}, {}> {

    setFilters(fieldName: string, measureName: string, condition: Operators, operand1: string, operand2: string): void {
        fieldCollections[fieldName] = {
            name: fieldName,
            measure: measureName,
            type: 'Value',
            condition: condition,
            value1: operand1,
            value2: operand2
        }
    }

    onClick(args: any): void {
        let filterOptions: FilterModel[] = [];
        filterOptions = [{
            name: fieldsddl.value as string,
            type: 'Value',
            measure: measuresddl.value as string,
            condition: operatorddl.value as Operators,
            value1: valueInput1.value === null ? '1' : valueInput1.value.toString(),
            value2: valueInput2.value === null ? '1' : valueInput2.value.toString()
        }];
        pivotGridObj.dataSource.filterSettings = filterOptions;
    }

    onClear(args: any): void {
        pivotGridObj.dataSource.filterSettings = [];
        valueInput1.value = 0;
        valueInput2.value = 0;
    }

    onFieldChange(args: ChangeEventArgs): void {
        if (fieldCollections[args.value as string]) {
            measuresddl.value = fieldCollections[args.value as string].measure;
            operatorddl.value = fieldCollections[args.value as string].condition;
        } else {
            this.setFilters(args.value as string, 'In_Stock', 'DoesNotEquals', '', '');
            operatorddl.value = 'DoesNotEquals';
            measuresddl.value = 'In_Stock';
        }
    }

    onMeasureChange(args: ChangeEventArgs): void {
        this.setFilters(fieldsddl.value as string, args.value as string, operatorddl.value as Operators, valueInput1.value.toString(), valueInput2.value.toString());
    }

    onOperatorChange(args: ChangeEventArgs): void {
        if (args.value === 'Between' || args.value === 'NotBetween') {
            (document.querySelector('.input2cls') as HTMLElement).style.display = '';
        } else {
            (document.querySelector('.input2cls') as HTMLElement).style.display = 'none';
        }
        this.setFilters(fieldsddl.value as string, measuresddl.value as string, args.value as Operators, valueInput1.value.toString(), valueInput2.value.toString());
    }

    onValue1Change(e: NumericEventArgs): void {
        this.setFilters(fieldsddl.value as string, measuresddl.value as string, operatorddl.value as Operators, e.value.toString(), valueInput2.value.toString());
    }

    onValue2Change(e: NumericEventArgs): void {
        this.setFilters(fieldsddl.value as string, measuresddl.value as string, operatorddl.value as Operators, valueInput1.value.toString(), e.value.toString());
    }

    ondataBound(args: any): void {
        fieldCollections = {};
        for (let field of pivotGridObj.dataSource.filterSettings) {
            fieldCollections[field.name] = field;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <div className='col-lg-8 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotGridObj = pivotview }} dataSource={dataSource} width={'100%'} height={'300'} dataBound={this.ondataBound} gridSettings={{ columnWidth: 140 }}>
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
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div>
                                                <DropDownListComponent ref={(scope) => { fieldsddl = scope; }} index={0} width={'100%'} id="fields" change={this.onFieldChange.bind(this)} dataSource={fields} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            Measures:
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div>
                                                <DropDownListComponent ref={(scope) => { measuresddl = scope; }} index={0} width={'100%'} id="measures" change={this.onMeasureChange.bind(this)}
                                                    dataSource={measures} fields={measureFields}></DropDownListComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            Condition:
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div className='conditionscls'>
                                                <DropDownListComponent ref={(scope) => { operatorddl = scope; }} value={'DoesNotEquals'} width={'100%'} id="conditions" change={this.onOperatorChange.bind(this)} dataSource={operators} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="input1cls" style={{ height: "50px" }}>
                                        <td>
                                            Value 1:
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div className="value1cls">
                                                <NumericTextBoxComponent id="value1" ref={(scope) => { valueInput1 = scope; }} value={0}
                                                    width={'100%'} change={this.onValue1Change.bind(this)} placeholder='Example: 9590'>
                                                </NumericTextBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="input2cls" style={{ height: "50px", display: "none" }}>
                                        <td>
                                            Value 2:
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div className="value2cls">
                                                <NumericTextBoxComponent id="value2" ref={(scope) => { valueInput2 = scope; }} value={0}
                                                    width={'100%'} change={this.onValue2Change.bind(this)} placeholder='Example: 17500'>
                                                </NumericTextBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td colSpan={2}>
                                            <div style={{ float: 'right', marginRight: "4px" }}>
                                                <ButtonComponent id='clear' onClick={this.onClear.bind(this)}>Clear</ButtonComponent>
                                            </div>
                                            <div style={{ float: 'right', marginRight: "4px" }}>
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
                    <p>This sample demonstrates filtering of fields based on the grand total.</p>
                </div>
                <div id="description">
                    <p>In this sample, any field can be selected from the
                        <b> Fields</b> dropdown list along with value field from
                        <b> Measures</b> dropdown list to filter. Further, choose an option from the
                        <b> Conditions</b> dropdown list, enter the values in
                        <b> Value1</b> and
                        <b> Value2</b> input textbox and apply the same to view the field headers filtered based on the grand total.
                        </p>
                    <p>
                        Value filtering can be applied either through code-behind or UI. To achieve this in code-behind, use the
                        <code> filterSettings</code> object in the pivot grid widget along with the following properties.
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
                            <td>Specifies the filter type and it should be "Value" in this scenario.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>measure :</code>
                            </td>
                            <td>Specifies the value based field.</td>
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
                            <td>Gets the value to view the filter result. For example, select "DoesNotEquals" and enter "9590" to exclude the grand total with this value.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>value2 :</code>
                            </td>
                            <td>For conditions like "between" and "not between", this option will be enabled. Enter both start and end value to view the filter result. For example, enter "9590" and "17500" to filter the grand totals within this range.</td>
                        </tr>
                    </table>
                    <br />
                    <p>
                        To achieve value filtering through UI, navigate to
                    <b> "User Interaction > Field List"</b> sample and open the filter dialog.
                            For API details, refer to the
                    <b> "Field List"</b> sample description.
                    </p>
                </div>
            </div>
        )
    }
}