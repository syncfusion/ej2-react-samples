import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent, MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './hyper-link.css';
/**
 * PivotView Hyperlink Sample.
 */
/* tslint:disable */
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    dataSource: Pivot_Data,
    expandAll: true
};
let hyperlinkSettings = {
    showValueCellHyperlink: true,
    cssClass: 'e-custom-class'
};
let operators = ['Equals', 'NotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
    'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
let measures = [
    { value: 'In_Stock', text: 'In Stock' },
    { value: 'Sold', text: 'Units Sold' },
    { value: 'Amount', text: 'Sold Amount' }
];
let options = [
    { value: 'allcells', text: 'All cells' },
    { value: 'rowheader', text: 'Row headers' },
    { value: 'columnheader', text: 'Column headers' },
    { value: 'valuecells', text: 'Value cells' },
    { value: 'summarycells', text: 'Summary cells' },
    { value: 'conditional', text: 'Condition based option' },
    { value: 'headertext', text: 'Header based option' }
];
let measureFields = { text: 'text', value: 'value' };
let pivotObj;
let optionsdll;
let measuresddl;
let applyBtn;
let operatorddl;
let valueInput1;
let valueInput2;
let textInput;
let alertButtons;
export class HyperLink extends SampleBase {
    onCellClick(args) {
        let cell = '';
        if (args.currentCell.className.indexOf('e-stot') > -1 ||
            args.currentCell.className.indexOf('e-gtot') > -1 ||
            args.currentCell.className.indexOf('e-summary') > -1) {
            cell += 'Summary ';
        }
        if (args.currentCell.querySelector('.e-headercelldiv') && !args.data.indexObject) {
            cell += 'Value Header ';
        }
        else if (args.currentCell.className.indexOf('e-rowsheader') > -1) {
            cell += 'Row Header ';
        }
        else if (args.currentCell.className.indexOf('e-columnsheader') > -1) {
            cell += 'Column Header ';
        }
        else if (args.currentCell.className.indexOf('e-valuescontent') > -1) {
            cell += 'Value ';
        }
        if (args.currentCell.querySelector('a') &&
            (args.currentCell.querySelector('a').innerText === 'France' || args.currentCell.querySelector('a').innerText === 'Germany')) {
            let country = args.currentCell.querySelector('a').innerText;
            args.currentCell.querySelector('a').setAttribute('data-url', (country === 'France' ?
                'https://en.wikipedia.org/wiki/France' : 'https://en.wikipedia.org/wiki/Germany'));
            args.cancel = false;
        }
        else {
            this.appendElement('<b>' + cell + '</b>' + ' cell click event called<hr>');
        }
    }
    onOptionChange(args) {
        document.querySelector('.text1cls').style.display = 'none';
        document.querySelector('.text2cls').style.display = 'none';
        document.querySelector('.measurecls').style.display = 'none';
        document.querySelector('.conditioncls').style.display = 'none';
        document.querySelector('.input1cls').style.display = 'none';
        document.querySelector('.input2cls').style.display = 'none';
        document.querySelector('.textinputcls').style.display = 'none';
        document.querySelector('.updatecls').style.display = 'none';
        if (args.value == 'allcells') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: true,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'rowheader') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: true,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'columnheader') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: true,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'valuecells') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: true,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'summarycells') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: true,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'conditional') {
            document.querySelector('.text1cls').style.display = '';
            document.querySelector('.measurecls').style.display = '';
            document.querySelector('.conditioncls').style.display = '';
            document.querySelector('.input1cls').style.display = '';
            if (operatorddl.value === 'Between' || operatorddl.value === 'NotBetween') {
                document.querySelector('.input2cls').style.display = '';
            }
            document.querySelector('.updatecls').style.display = '';
        }
        else if (args.value == 'headertext') {
            document.querySelector('.text2cls').style.display = '';
            document.querySelector('.textinputcls').style.display = '';
            document.querySelector('.updatecls').style.display = '';
        }
    }
    onClick() {
        if (optionsdll.value === 'conditional') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: [
                    {
                        measure: measuresddl.value,
                        conditions: operatorddl.value,
                        value1: valueInput1.value,
                        value2: valueInput2.value
                    }
                ]
            };
        }
        else if (optionsdll.value === 'headertext') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: textInput.value,
                conditionalSettings: []
            };
        }
    }
    onOperatorChange(args) {
        if (args.value === 'Between' || args.value === 'NotBetween') {
            document.querySelector('.input2cls').style.display = '';
        }
        else {
            document.querySelector('.input2cls').style.display = 'none';
        }
    }
    onClear() {
        document.getElementById('EventLog').innerHTML = '';
    }
    appendElement(html) {
        let span = document.createElement('span');
        span.innerHTML = html;
        let log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <div className='col-lg-8 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview; }} showTooltip={false} dataSourceSettings={dataSourceSettings} width={'100%'} height={'600'} gridSettings={{ columnWidth: 140 }} hyperlinkSettings={hyperlinkSettings} hyperlinkCellClick={this.onCellClick.bind(this)}></PivotViewComponent>
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
                                                <DropDownListComponent ref={(scope) => { optionsdll = scope; }} index={3} width={'100%'} id="fields" change={this.onOptionChange.bind(this)} dataSource={options} fields={measureFields}></DropDownListComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text1cls" style={{ height: "50px", display: "none" }}>
                                        <td colSpan={2}>
                                            <div>Condition based settings:
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="measurecls" style={{ height: "50px", display: "none" }}>
                                        <td>
                                            Measures:
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div>
                                                <DropDownListComponent ref={(scope) => { measuresddl = scope; }} index={0} width={'100%'} id="measures" dataSource={measures} fields={measureFields}></DropDownListComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="conditioncls" style={{ height: "50px", display: "none" }}>
                                        <td>
                                            Condition:
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div className='conditionscls'>
                                                <DropDownListComponent ref={(scope) => { operatorddl = scope; }} value={'NotEquals'} width={'100%'} id="conditions" change={this.onOperatorChange.bind(this)} dataSource={operators}></DropDownListComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="input1cls" style={{ height: "50px", display: "none" }}>
                                        <td>
                                            Value 1:
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div className="value1cls">
                                                <NumericTextBoxComponent id="value1" ref={(scope) => { valueInput1 = scope; }} value={0} width={'100%'} placeholder='Example: 400'>
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
                                                <NumericTextBoxComponent id="value2" ref={(scope) => { valueInput2 = scope; }} value={0} width={'100%'} placeholder='Example: 4000'>
                                                </NumericTextBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text2cls" style={{ height: "50px", display: "none" }}>
                                        <td colSpan={2}>
                                            <div>Header based settings:
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="textinputcls" style={{ height: "50px", display: "none" }}>
                                        <td>
                                            <div>Header Text:
                                            </div>
                                        </td>
                                        <td style={{ paddingBottom: '16px' }}>
                                            <div className="textcls">
                                                <MaskedTextBoxComponent id="text" ref={(scope) => { textInput = scope; }} value={''} width={'100%'} placeholder='Example: "FY 2015.In Stock"'>
                                                </MaskedTextBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="updatecls" style={{ height: '50px', display: "none" }}>
                                        <td colSpan={2}>
                                            <div style={{ float: 'right', marginRight: "4px" }}>
                                                <ButtonComponent id='apply' ref={(scope) => { applyBtn = scope; }} onClick={this.onClick.bind(this)} isPrimary={true}>Apply</ButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div><b>
                                                <hr></hr>Event Trace:
                                                </b>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="eventarea" style={{ height: '160px', overflow: 'auto' }}>
                                                <span className="EventLog" id="EventLog" style={{ wordBreak: 'normal' }}></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td colSpan={2}>
                                            <div className="evtbtn" style={{ float: 'right', marginRight: '4px' }}>
                                                <ButtonComponent id='clear' onClick={this.onClear.bind(this)}>Clear</ButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>

                </div>
                <div id="action-description">
                    <p>This sample demonstrates showing hyperlink options in row headers, column headers, value cells, and summary cells in the pivot table. Also, hyperlink options can be enabled for specific headers and value cells based on the applied condition.</p>
                </div>
                <div id="description">
                    <p>
                        In this sample, hyperlinks are enabled in cells based on the options selected from the <b>Show Hyperlink</b> drop-down list.
                        The following options are available for setting the hyperlinks:
                    </p>
                    <table>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '10px 0', width: '180px;' }}>
                                <code>All cells :</code>
                            </td>
                            <td>Allows to set the visibility of hyperlink to all cells.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Row headers :</code>
                            </td>
                            <td>Allows to set the visibility of hyperlink to row headers.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Column headers :</code>
                            </td>
                            <td>Allows to set the visibility of hyperlink to column headers.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Value cells :</code>
                            </td>
                            <td>Allows to set the visibility of hyperlink to value cells.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Summary cells :</code>
                            </td>
                            <td>Allows to set the visibility of hyperlink to summary cells.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Condition based option :</code>
                            </td>
                            <td>Allows to set the visibility of hyperlink to value and summary cells based on the applied condition like less than, greater than, equals, etc.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>Header based option :</code>
                            </td>
                            <td>Allows to set the visibility of hyperlink to specific row/column based on the given header text.</td>
                        </tr>
                    </table>
                </div>
            </div>);
    }
}
