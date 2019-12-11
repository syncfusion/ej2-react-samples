import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, PdfExport, ExcelExport } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
export class Export extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['ExcelExport', 'PdfExport', 'CsvExport'];
    }
    toolbarClick(args) {
        switch (args.item.text) {
            case 'PDF Export':
                this.treegridInstance.pdfExport();
                break;
            case 'Excel Export':
                this.treegridInstance.excelExport();
                break;
            case 'CSV Export':
                this.treegridInstance.csvExport();
                break;
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} ref={treegrid => this.treegridInstance = treegrid} treeColumnIndex={1} childMapping='subtasks' toolbar={this.toolbarOptions} toolbarClick={this.toolbarClick.bind(this)} height='410' allowExcelExport={true} allowPdfExport={true}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='180'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right'/>
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right'/>
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right'/>
              <ColumnDirective field='priority' headerText='Priority' width='90'/>
            </ColumnsDirective>
            <Inject services={[Toolbar, ExcelExport, PdfExport]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the client-side exporting of the TreeGrid, which allows you to
                export its data to the Excel, Pdf and CSV formats. Use the toolbar buttons to export TreeGrid data to desired format. </p>
        </div>
        <div id="description">
          <p>TreeGrid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats.</p>
          <p>In this demo, for the toolbar items of exporting, we have defined actions in <code>toolbarClick</code> event to export
              the TreeGrid data using the <code>excelExport</code>, <code>pdfExport</code> and <code>csvExport</code> methods.</p>
          <p>Injecting Module:</p>
          <p>TreeGrid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject <code>
            ExcelExport</code> and <code>PdfExport</code> module into the services.</p>
          <p>More information on the Exporting can be found in the  documentation section.</p>
        </div>
      </div>);
    }
}
