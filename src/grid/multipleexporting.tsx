import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport } from '@syncfusion/ej2-react-grids';
import { data, employeeData } from './data';
import { SampleBase } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'

export class MultipleExporting extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['excelexport', 'pdfexport'];
  private firstGridInstance: GridComponent;
  private secondGridInstance: GridComponent;
  public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.text) {
      case 'PDF Export':
        let firstGridPdfExport: Promise<Object> = this.firstGridInstance.pdfExport({}, true);
        firstGridPdfExport.then((pdfData: Object) => {
          this.secondGridInstance.pdfExport({}, false, pdfData);
        });
        break;
      case 'Excel Export':
        let firstGridExcelExport: Promise<any> = this.firstGridInstance.excelExport({}, true);
        firstGridExcelExport.then((bookData: any) => {
          this.secondGridInstance.excelExport({}, false, bookData);
        });
        break;
    }
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div><p className='e-statustext'>First Grid</p>
            <GridComponent dataSource={data.slice(0, 5)} ref={grid => this.firstGridInstance = grid} toolbar={this.toolbarOptions}
              allowExcelExport={true} allowPdfExport={true} toolbarClick={this.toolbarClick.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' ></ColumnDirective>
                <ColumnDirective field='ShipName' headerText='Ship Name' width='170' ></ColumnDirective>
                <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' ></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Toolbar, ExcelExport, PdfExport]} />
            </GridComponent>
          </div>
          <br />
          <div><p className='e-statustext'>Second Grid</p>
            <GridComponent dataSource={employeeData.slice(0, 5)} ref={grid => this.secondGridInstance = grid}
              allowExcelExport={true} allowPdfExport={true} >
              <ColumnsDirective>
                <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='right' />
                <ColumnDirective field='FirstName' headerText='Name' width='125' />
                <ColumnDirective field='Title' headerText='Title' width='180' />
                <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format={{ skeleton: 'yMd', type: 'date' }} textAlign='right' />
                <ColumnDirective field='ReportsTo' headerText='Reports To' width='135' textAlign='right' />
              </ColumnsDirective>
              <Inject services={[ExcelExport, PdfExport]} />
            </GridComponent>
          </div>
          <div id="description">
            <p>Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats.</p>
            <p>In this demo, excelexport and pdfexport items are defined in the toolbar. For these toolbar items, we have defined actions
        in toolbarClick event to export multiple Grids in same document using the
        <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#excelexport">excelExport</a></code>,
                    <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#pdfexport">pdfExport</a></code>
              methods.
              </p>

            <p style={{ fontWeight: 500 }}>Injecting Module:</p>
            <p>Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject <code>ExcelExport</code>
              and <code>PdfExport</code> module into the <code>services</code></p>
          </div>
        </div>
      </div>
    )
  }
}