import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar,
  PdfExport, ExcelExport } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SampleBase } from '../common/sample-base';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';

export class Export extends SampleBase<{}, {}> {
  public collapsedStatePersist: boolean = true;
  public toolbarOptions: any = ['ExcelExport', 'PdfExport', 'CsvExport'];
  private treegridInstance: TreeGridComponent;

  public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case this.treegridInstance.grid.element.id + '_pdfexport':
      if (this.treegridInstance.enableRtl === true && this.treegridInstance.locale === 'ar') {
        let innercontent: any = 'You need custom fonts to export Arabic characters, refer this'
             + '<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">'
             + 'documentation section</a>';
            DialogUtility.alert({content: innercontent});
      }
      else {
        let pdfExportProperties = {
          isCollapsedStatePersist: this.collapsedStatePersist
        };
        this.treegridInstance.pdfExport(pdfExportProperties);
      }
        break;
      case this.treegridInstance.grid.element.id + '_excelexport':
        let excelExportProperties = {
          isCollapsedStatePersist: this.collapsedStatePersist
        };
        this.treegridInstance.excelExport(excelExportProperties);
        break;
      case this.treegridInstance.grid.element.id + '_csvexport':
        this.treegridInstance.csvExport();
        break;
    }
  }

  public onChange(args: ChangeEventArgs): void {
    if (args.checked) {
      this.collapsedStatePersist = true;
   } else {
      this.collapsedStatePersist = false;
  }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-md-9'>
          <TreeGridComponent dataSource={sampleData} ref={ treegrid => this.treegridInstance = treegrid} treeColumnIndex={1}
            childMapping= 'subtasks' toolbar={this.toolbarOptions} toolbarClick={this.toolbarClick.bind(this)} height='410'
            allowExcelExport={true} allowPdfExport={true}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='180'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='120' format='yMd' textAlign='Right' />
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
              <ColumnDirective field='priority' headerText='Priority' width='90' />
            </ColumnsDirective>
            <Inject services={[Toolbar, ExcelExport, PdfExport]} />
          </TreeGridComponent>
          </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Export Customization'>
              <table id='property'  className='property-panel-table' style={{ width: '100%' }}>
                  <tr style={{ height: '50px' }}>
                    <td style={{ width: '60%' }}>
                        <CheckBoxComponent checked={true} label="Persist collapsed state" labelPosition="Before"
                         change={ this.onChange.bind(this) } ></CheckBoxComponent>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
        <div id="action-description">
          <p>This sample demonstrates the client-side exporting of the Tree Grid, which allows you to
                export its data to the Excel, Pdf and CSV formats. Use the toolbar buttons to export Tree Grid data to desired format. </p>
                <p>By using the Persist collapsed state checkbox we can persist the Expand/Collpase state of Tree Grid in exported document </p>
        </div>
        <div id="description">
          <p>Tree Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats.</p>
          <p>In this demo, for the toolbar items of exporting, we have defined actions in <code>toolbarClick</code> event to export
              the Tree Grid data using the <code>excelExport</code>, <code>pdfExport</code> and <code>csvExport</code> methods.</p>
          <p>Injecting Module:</p>
          <p>Tree Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject <code>
            ExcelExport</code> and <code>PdfExport</code> module into the services.</p>
          <p>More information on the Exporting can be found in the  documentation section.</p>
        </div>
      </div>
    )
  }
}