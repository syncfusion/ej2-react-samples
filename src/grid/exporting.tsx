import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Toolbar, ExcelExport, PdfExport, Group } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'
import { SampleBase } from '../common/sample-base';

export class Exporting extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['excelexport', 'pdfexport', 'csvexport'];
  public groupOptions: Object = { showDropArea : false , columns: ['ShipCountry'] };
  private gridInstance: GridComponent;
  public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.text) {
      case 'PDF Export':
        this.gridInstance.pdfExport();
        break;
      case 'Excel Export':
        this.gridInstance.excelExport();
        break;
      case 'CSV Export':
        this.gridInstance.csvExport();
        break;
    }
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data.slice(0,200)} ref={grid => this.gridInstance = grid} toolbar={this.toolbarOptions} allowPaging={true} 
          allowExcelExport={true} allowPdfExport={true} allowGrouping={true} toolbarClick={this.toolbarClick.bind(this)} groupSettings={this.groupOptions} >
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' ></ColumnDirective>
              <ColumnDirective field='ShipName' headerText='Ship Name' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, ExcelExport, PdfExport, Group]} />
          </GridComponent>
          <div id="description">
            <p>Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats.</p>
            <p>In this demo, Grouping is applied for <strong><i>ShipCountry</i></strong> column and excelexport, pdfexport and csvexport items are defined in the toolbar. For these toolbar items, we have
            defined actions in toolbarClick event to export the Grid data using the
            <code><a target="_blank" className="code"

                href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#excelexport">excelExport</a></code>,
            <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#pdfexport">pdfExport</a></code>            and <code><a target="_blank" className="code"
                  href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#csvexport">csvExport</a></code> methods.</p>
            
            <p style={{ fontWeight: 500 }}>Injecting Module:</p>
            <p>Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject <code>ExcelExport</code>
            and <code>PdfExport</code> module into the <code>services</code></p>
          </div>
        </div>
      </div>
    )
  }
}