import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, DetailRow, Toolbar,
    PdfExport, ExcelExport } from '@syncfusion/ej2-react-grids';
import { employeeData, hierarchyOrderdata, customerData } from './data';
import { SampleBase } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

export class HierarchyExport extends SampleBase<{}, {}> {
  public grid: GridComponent;
  public secondChildGrid: any = {
      dataSource: customerData,
      queryString: 'CustomerID',
      columns: [
          { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
          { field: 'ContactName', headerText: 'Contact Name', width: 100 },
          { field: 'Address', headerText: 'Address', width: 120 },
          { field: 'Country', headerText: 'Country', width: 100 }
      ]
  };
  public childGrid: any = {
      dataSource: hierarchyOrderdata,
      queryString: 'EmployeeID',
      allowPaging: true,
      pageSettings: { pageSize: 6, pageCount: 5 },
      columns: [
          { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
          { field: 'ShipCity', headerText: 'Ship City', width: 120 },
          { field: 'Freight', headerText: 'Freight', width: 120 },
          { field: 'ShipName', headerText: 'Ship Name', width: 150 }
      ],
      childGrid: this.secondChildGrid
  };

  toolbarClick(args: ClickEventArgs): void {
        if (args.item.id === 'MasterDetailsExport_excelexport') {
            this.grid.excelExport({hierarchyExportMode: 'All'} as any);
        }
        if (args.item.id === 'MasterDetailsExport_pdfexport') {
            this.grid.pdfExport({hierarchyExportMode: 'All'});
        }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent id='MasterDetailsExport' ref={r => this.grid = r} dataSource={employeeData} childGrid={this.childGrid} toolbar={['PdfExport', 'ExcelExport']}
          allowPdfExport={true} allowExcelExport={true} toolbarClick={this.toolbarClick.bind(this)}>
              <ColumnsDirective>
                  <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='Right' />
                  <ColumnDirective field='FirstName' headerText='Name' width='125' />
                  <ColumnDirective field='Title' headerText='Title' width='180' />
                  <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format='yMd' textAlign='Right' />
                  <ColumnDirective field='ReportsTo' headerText='Reports To' width='135' textAlign='Right' />
              </ColumnsDirective>
              <Inject services={[DetailRow, Toolbar, PdfExport, ExcelExport]} />
          </GridComponent>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the hierarchy Grid export feature. In this sample, you can export the hierarchy grid by clicking the corresponding export button from the grid's toolbar.</p>
        </div>
        <div id="description">
            <p>Grid supports client-side Hierarchy Grid exporting which allows you to export its data to the Excel and Pdf formats.</p>
            <p>In this demo, ExcelExport and PdfExport items are defined in the toolbar. For these toolbar items, we have defined actions
                in toolbarClick event to export hierarchy Grid using the
                <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid#excelexport">excelExport</a></code>, 
                <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid#pdfexport">pdfExport</a></code>
            methods and the grid will export using <code>All</code> mode.</p>
            The hierarchy grid allows us to export the grid with following options,
            <ul>
                <li><code>Expanded</code> - Exports only the visible child grids in expanded state.</li>
                <li><code>All</code> - Exports the all the child grids in expanded state.</li>
                <li><code>None</code> - Exports the child grids in collapse state.</li>
            </ul>
            <p>
                We can change the hierarchy grid's export option by using the <code>hierarchyExportMode</code> property.
            </p>
            <p style={{fontWeight: 500}}>Injecting Module:</p>
            <p>
                Grid features are segregated into individual feature-wise modules.
                To use Hierarchy, PdfExport and ExcelExport Grid feature, we need to inject <code>DetailRow</code>, <code>PdfExport</code>, <code>ExcelExport</code> module into the <code>services</code>.
            </p>
            <p>
                More information on the exporting configuration can be found in this
                 <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/pdf-export">
                pdf-export</a> and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/excel-export/excel-exporting">
                excel-export</a> documentation sections.
            </p>
        </div>
      </div>
    )
  }
}