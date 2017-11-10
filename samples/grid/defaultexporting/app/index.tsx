import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Toolbar, ExcelExport, PdfExport, Group } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

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
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Exporting />, document.getElementById('sample'));