import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport } from '@syncfusion/ej2-react-grids';
import { data, employeeData } from '../data';
import { SampleBase } from './sample-base';
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
        </div>
      </div>
    )
  }
}
ReactDOM.render(<MultipleExporting />, document.getElementById('sample'));