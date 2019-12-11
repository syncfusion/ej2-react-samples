import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './pivot-chart.css';
/**
 * PivotView Sample with Selection feature.
 */
/* tslint:disable */
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    dataSource: Pivot_Data,
    expandAll: true,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};
export class Selection extends SampleBase {
    constructor() {
        super(...arguments);
        this.fields = { text: 'text', value: 'value' };
        this.modes = [
            { 'value': 'Cell', 'text': 'Cell' },
            { 'value': 'Row', 'text': 'Row Only' },
            { 'value': 'Column', 'text': 'Column Only' },
            { 'value': 'Both', 'text': 'Both' }
        ];
        this.types = [
            { 'value': 'Single', 'text': 'Single' },
            { 'value': 'Multiple', 'text': 'Multiple' }
        ];
    }
    onSelected(args) {
        document.getElementById('EventLog').innerHTML = '';
        if (args.selectedCellsInfo.length > 0) {
            for (var cell of args.selectedCellsInfo) {
                var summMeasure = this.pivotObj.engineModule.fieldList[cell.measure] ? this.pivotObj.engineModule.fieldList[cell.measure].aggregateType + ' of ' +
                    this.pivotObj.engineModule.fieldList[cell.measure].caption : '';
                this.appendElement((cell.columnHeaders == '' ? '' : 'Column Headers: ' + '<b>' + cell.columnHeaders + '</b></br>') +
                    (cell.rowHeaders == '' ? '' : 'Row Headers: ' + '<b>' + cell.rowHeaders + '</b></br>') +
                    (summMeasure == '' ? '' : 'Measure: ' + '<b>' + summMeasure + '</b></br>') +
                    'Value: ' + '<b>' + cell.currentCell.formattedText + '</b><hr></br>');
            }
        }
    }
    modeOnChange(args) {
        this.pivotObj.gridSettings.selectionSettings.mode = args.value;
        this.pivotObj.renderModule.updateGridSettings();
    }
    typeOnChange(args) {
        this.pivotObj.gridSettings.selectionSettings.type = args.value;
        this.pivotObj.renderModule.updateGridSettings();
    }
    appendElement(html) {
        let span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.appendChild(span);
    }
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-8 control-section' style={{ overflow: 'auto' }}>
                    <PivotViewComponent id='PivotView' ref={d => this.pivotObj = d} dataSourceSettings={dataSourceSettings} width={'100%'} height={'400'} cellSelected={this.onSelected.bind(this)} gridSettings={{
            columnWidth: 120, allowSelection: true,
            selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
        }}>
                    </PivotViewComponent>
                </div>
                <div className='col-lg-4 property-section pivottable-property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Selection Modes:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent floatLabelType={'Auto'} fields={this.fields} change={this.modeOnChange.bind(this)} id="mode" index={0} enabled={true} dataSource={this.modes}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Selection Types:
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent floatLabelType={'Auto'} fields={this.fields} change={this.typeOnChange.bind(this)} id="type" index={0} enabled={true} dataSource={this.types}/>
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
                                        <div className="eventarea" style={{ height: '230px', overflow: 'auto' }}>
                                            <span className="EventLog" id="EventLog" style={{ wordBreak: 'normal' }}></span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates different types of grid cell selection options and an event for getting complete information about the selection. The selection of headers, value cells, and summary cells can be done through mouse and keyboard actions.</p>
                </div>
                <div id="description">
                    <p>
                        This feature provides interactive support to highlight rows, columns, values, and summary cells that you select.
                        Selection can be done through either mouse or keyboard interaction.
                        To enable selection, set <code>allowSelection</code>property as true.
                    </p>
                    <p>The pivot table supports two types of selection which can be set using
                        <code>selectionSettings.type</code> property. They are:</p>
                    <ul>
                        <li><code>Single</code> - Enabled by default. Allows the user to select single row or column or cell at a time.
                        </li>
                        <li><code>Multiple</code> - Allows the user to select more than one row or column or cell at the same time.</li>
                    </ul>
                    <p>Also, there are three modes of selection which can be set using
                        <code>selectionSettings.mode</code> property. They are:
                    </p>
                    <ul>
                        <li><code>Row</code> - Enabled by default. Enables the complete row selection in a pivot table.</li>
                        <li><code>Column</code> - Enables the complete column selection in a pivot table.</li>
                        <li><code>Cell</code> - Enables the cell selection in pivot table.</li>
                        <li><code>Both</code> - Enables both the row and column selection in pivot table.</li>
                    </ul>
                    <p>To perform the multiselection, hold <strong>CTRL</strong> key and click the desired cells.
                        To select range of cells, hold <strong>SHIFT</strong> key and click the cells.</p>
                    <p>While using the pivot table in a touch device environment, tap over a row, column, or other cells.
                        This results in a pop-up with a multiselect icon. Now tap the icon to proceed with multiselection.
                    </p>
                    <p>In this demo, pick the selection type and selection mode from the properties panel in order to perform the
                        desired selection process.
                        The selected cell information can be seen in the Event Trace part with the help of the <code>cellSelected</code>
                        event.
                    </p>
                </div>
            </div>);
    }
}
