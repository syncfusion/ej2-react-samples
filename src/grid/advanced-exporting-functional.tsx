import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport, Page } from '@syncfusion/ej2-react-grids';
import { productData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DataManager, ODataV4Adaptor, Query, DataOptions } from '@syncfusion/ej2-data';

function AdvancedExporting() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const month: string = ((new Date()).getMonth().toString()) + '/';
  const date: string = ((new Date()).getDate().toString()) + '/';
  const year: string = ((new Date()).getFullYear().toString());
  const toolbarOptions: any = ['ExcelExport', 'PdfExport'];
  let gridInstance: GridComponent;
  function toolbarClick(args: ClickEventArgs): void {
    switch (args.item.text) {
      case 'PDF Export':
        gridInstance.pdfExport(getPdfExportProperties());
        break;
      case 'Excel Export':
        gridInstance.excelExport(getExcelExportProperties());
        break;
    }
  }
  /* tslint:disable-next-line:no-any */
  function getExcelExportProperties(): any {
    return {
      header: {
        headerRows: 7,
        rows: [
          {
            index: 1,
            cells: [
              /* tslint:disable-next-line:max-line-length */
              { index: 1, colSpan: 5, value: 'INVOICE', style: { fontColor: '#C25050', fontSize: 25, hAlign: 'Center', bold: true } }
            ]
          },
          {
            index: 3,
            cells: [
              { index: 1, colSpan: 2, value: 'Adventure Traders', style: { fontColor: '#C67878', fontSize: 15, bold: true } },
              { index: 4, value: 'INVOICE NUMBER', style: { fontColor: '#C67878', bold: true } },
              { index: 5, value: 'DATE', style: { fontColor: '#C67878', bold: true }, width: 150 }
            ]
          },
          {
            index: 4,
            cells: [
              { index: 1, colSpan: 2, value: '2501 Aerial Center Parkway' },
              { index: 4, value: 2034 },
              { index: 5, value: (month + date + year).toString(), width: 150 }
            ]
          },
          {
            index: 5,
            cells: [
              { index: 1, colSpan: 2, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306' },
              { index: 4, value: 'CUSOTMER ID', style: { fontColor: '#C67878', bold: true } },
              { index: 5, value: 'TERMS', width: 150, style: { fontColor: '#C67878', bold: true } }
            ]
          },
          {
            index: 6,
            cells: [
              { index: 4, value: 564 },
              { index: 5, value: 'Net 30 days', width: 150 }
            ]
          }
        ]
      },

      footer: {
        footerRows: 5,
        rows: [
          /* tslint:disable-next-line:max-line-length */
          { cells: [{ colSpan: 6, value: 'Thank you for your business!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] },
          { cells: [{ colSpan: 6, value: '!Visit Again!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] }
        ]
      },
      fileName: "exceldocument.xlsx"
    };
  }
  /* tslint:disable-next-line:no-any */
  function getPdfExportProperties(): any {
    return {
      header: {
        fromTop: 0,
        height: 120,
        contents: [
          {
            type: 'Text',
            value: 'INVOICE',
            position: { x: 280, y: 0 },
            style: { textBrushColor: '#C25050', fontSize: 25 },
          },
          {
            type: 'Text',
            value: 'INVOICE NUMBER',
            position: { x: 500, y: 30 },
            style: { textBrushColor: '#C67878', fontSize: 10 },
          },
          {
            type: 'Text',
            value: 'Date',
            position: { x: 600, y: 30 },
            style: { textBrushColor: '#C67878', fontSize: 10 },
          }, {
            type: 'Text',
            value: '223344',
            position: { x: 500, y: 50 },
            style: { textBrushColor: '#000000', fontSize: 10 },
          },
          {
            type: 'Text',
            value: (month + date + year).toString(),
            position: { x: 600, y: 50 },
            style: { textBrushColor: '#000000', fontSize: 10 },
          },
          {
            type: 'Text',
            value: 'CUSTOMER ID',
            position: { x: 500, y: 70 },
            style: { textBrushColor: '#C67878', fontSize: 10 },
          },
          {
            type: 'Text',
            value: 'TERMS',
            position: { x: 600, y: 70 },
            style: { textBrushColor: '#C67878', fontSize: 10 },
          }, {
            type: 'Text',
            value: '223',
            position: { x: 500, y: 90 },
            style: { textBrushColor: '#000000', fontSize: 10 },
          },
          {
            type: 'Text',
            value: 'Net 30 days',
            position: { x: 600, y: 90 },
            style: { textBrushColor: '#000000', fontSize: 10 },
          },
          {
            type: 'Text',
            value: 'Adventure Traders',
            position: { x: 20, y: 30 },
            style: { textBrushColor: '#C67878', fontSize: 20 }
          },
          {
            type: 'Text',
            value: '2501 Aerial Center Parkway',
            position: { x: 20, y: 65 },
            style: { textBrushColor: '#000000', fontSize: 11 }
          },
          {
            type: 'Text',
            value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
            position: { x: 20, y: 80 },
            style: { textBrushColor: '#000000', fontSize: 11 }
          },
        ]
      },
      footer: {
        fromBottom: 160,
        height: 100,
        contents: [
          {
            type: 'Text',
            value: 'Thank you for your business !',
            position: { x: 250, y: 20 },
            style: { textBrushColor: '#C67878', fontSize: 14 }
          },
          {
            type: 'Text',
            value: '! Visit Again !',
            position: { x: 300, y: 45 },
            style: { textBrushColor: '#C67878', fontSize: 14 }
          }
        ]
      },
      fileName: "pdfdocument.pdf"
    };
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div>
          <GridComponent id="Grid" dataSource={productData} ref={grid => gridInstance = grid} toolbar={toolbarOptions}
            allowExcelExport={true} allowPdfExport={true} toolbarClick={toolbarClick.bind(this)} allowPaging={true} pageSettings={{ pageCount: 2, pageSize: 10 }} >
            <ColumnsDirective>
              <ColumnDirective field='ProductID' headerText='Product ID' width='120' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='ProductName' headerText='Product Name' width='200'></ColumnDirective>
              <ColumnDirective field='QuantityPerUnit' headerText='Quantity Per Unit' width='180' ></ColumnDirective>
              <ColumnDirective field='UnitPrice' headerText='Units Price' width='150' textAlign='Right' format='C2' ></ColumnDirective>
              <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='Right' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Toolbar, ExcelExport, PdfExport, Page]} />
          </GridComponent>
        </div>
        <div id="description">
          <p>Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats.</p>
          <p>In this demo, excelexport and pdfexport items are defined in the toolbar. For these toolbar items, we have defined actions
            in toolbarClick event to export Grid with header and footer using the
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
export default AdvancedExporting;