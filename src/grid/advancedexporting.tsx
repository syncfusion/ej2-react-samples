import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport } from '@syncfusion/ej2-react-grids';
import { data, employeeData } from './data';
import { SampleBase } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

export class AdvancedExporting extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['excelexport', 'pdfexport'];
  private firstGridInstance: GridComponent;
  private secondGridInstance: GridComponent;
  public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.text) {
      case 'PDF Export':
        let firstGridPdfExport: Promise<Object> = this.firstGridInstance.pdfExport(this.getPdfExportProperties(), true);
        firstGridPdfExport.then((pdfData: Object) => {
          this.secondGridInstance.pdfExport(this.getPdfExportProperties(), false, pdfData);
        });
        break;
      case 'Excel Export':
        let firstGridExcelExport: Promise<any> = this.firstGridInstance.excelExport(this.getExcelExportProperties(), true);
        firstGridExcelExport.then((bookData: any) => {
          this.secondGridInstance.excelExport(this.getExcelExportProperties(), false, bookData);
        });
        break;
    }
  }
  /* tslint:disable-next-line:no-any */
  private getExcelExportProperties(): any {
    return {
      header: {
        headerRows: 7,
        rows: [
          {
            cells: [
              {
                colSpan: 6,
                value: 'Northwind Traders',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'center', bold: true, }
              }]
          },
          {
            cells: [
              {
                colSpan: 6,
                value: '2501 Aerial Center Parkway',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'center', bold: true, }
              }]
          },
          {
            cells: [
              {
                colSpan: 6,
                value: 'Suite 200 Morrisville, NC 27560 USA',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'center', bold: true, }
              }]
          },
          {
            cells: [
              {
                colSpan: 6,
                value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'center', bold: true, }
              }]
          },
          {
            cells: [
              {
                colSpan: 6,
                hyperlink: { target: 'https://www.northwind.com/', displayText: 'www.northwind.com' },
                style: { hAlign: 'center' }
              }]
          },
          {
            cells: [
              {
                colSpan: 6,
                hyperlink: { target: 'mailto:support@northwind.com' },
                style: { hAlign: 'center' }
              }]
          },
        ]
      },
      footer: {
        footerRows: 4,
        rows: [
          {
            cells: [
              {
                colSpan: 6,
                value: 'Thank you for your business!',
                style: { hAlign: 'center', bold: true }
              }]
          },
          {
            cells: [
              {
                colSpan: 6,
                value: '!Visit Again!',
                style: { hAlign: 'center', bold: true }
              }]
          }
        ]
      },
    };
  }
  /* tslint:disable-next-line:no-any */
  private getPdfExportProperties(): any {
    return {
      header: {
        fromTop: 0,
        height: 120,
        contents: [
          {
            type: 'line',
            style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
            points: { x1: 25, y1: 4, x2: 800, y2: 4 }
          },
          {
            type: 'line',
            style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
            points: { x1: 25, y1: 100, x2: 800, y2: 100 }
          },
          {
            type: 'text',
            value: 'Northwind Traders',
            position: { x: 300, y: 20 },
            style: { textBrushColor: '#C67878', fontSize: 14 }
          },
          {
            type: 'text',
            value: '2501 Aerial Center Parkway',
            position: { x: 280, y: 45 },
            style: { textBrushColor: '#C67878', fontSize: 14 }
          },
          {
            type: 'text',
            value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
            position: { x: 240, y: 70 },
            style: { textBrushColor: '#C67878', fontSize: 14 }
          },
        ]
      },
      footer: {
        fromBottom: 160,
        height: 100,
        contents: [
          {
            type: 'line',
            style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
            points: { x1: 25, y1: 4, x2: 800, y2: 4 }
          },
          {
            type: 'line',
            style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
            points: { x1: 25, y1: 60, x2: 800, y2: 60 }
          },
          {
            type: 'text',
            value: '!! Thank you !!',
            position: { x: 300, y: 20 },
            style: { textBrushColor: '#C67878', fontSize: 14 }
          }
        ]
      }
    };
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
          <div id="action-description">
          <p>This sample demonstrates the client-side exporting of the Grid, which allows you to export its data to the Excel, Pdf and CSV formats.
          Use the toolbar buttons to export multiple Grid data in same document to desired format.</p>
          </div>
          <div id="description">
            <p>Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats.</p>
            <p>In this demo, excelexport and pdfexport items are defined in the toolbar. For these toolbar items, we have defined actions
            in toolbarClick event to export multiple Grids in same document with header and footer using the
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