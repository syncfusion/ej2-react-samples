import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Sort, DetailRow, Toolbar, HierarchyGridPrintMode } from '@syncfusion/ej2-react-grids';
import { employeeData, hierarchyOrderdata, customerData } from './data';
import { SampleBase } from '../common/sample-base';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import './print.css';

export class Print extends SampleBase<{}, {}> {
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
      hierarchyPrintMode: 'All',
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
  public click(e: MouseEvent): void {
    let element: HTMLElement = e.target as HTMLElement;

    if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
        return;
    }

    element = (element.tagName === 'BUTTON' ? element.firstElementChild : element) as HTMLElement;
    removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
    addClass([element.parentElement.parentElement], 'e-ghidden');
    this.grid.hierarchyPrintMode = this.grid.childGrid.hierarchyPrintMode = element.innerHTML as HierarchyGridPrintMode;
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='e-statustext'>Select Hierarchy PrintMode</div>
          <ToolbarComponent id="toolbar" onClick={this.click.bind(this)} >
              <ItemsDirective>
                  <ItemDirective text="Expanded" />
                  <ItemDirective text="All"  cssClass="e-ghidden" />
                  <ItemDirective text="None" />
              </ItemsDirective>
          </ToolbarComponent>
          <br />
          <GridComponent ref={r => this.grid = r} dataSource={employeeData} childGrid={this.childGrid} toolbar={['Print']}
          allowSorting={true} hierarchyPrintMode={'All'}>
              <ColumnsDirective>
                  <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='Right' />
                  <ColumnDirective field='FirstName' headerText='Name' width='125' />
                  <ColumnDirective field='Title' headerText='Title' width='180' />
                  <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format='yMd' textAlign='Right' />
                  <ColumnDirective field='ReportsTo' headerText='Reports To' width='135' textAlign='Right' />
              </ColumnsDirective>
              <Inject services={[DetailRow, Toolbar, Sort]} />
          </GridComponent>
        </div>

        <div id="action-description">
            <p>
                This sample demonstrates the different options to print the hierarchy Grid. 
                Select the hierarchy grid's print mode in the toobar and click the print button from the grids's toolbar item to print Grid.
            </p>
        </div>

        <div id="description">
            <p>The Grid can be printed using the <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/api/grid#print">print
                </a></code> method. While printing the pager and scrollbar will be removed if they are enabled in Grid.
                By default, all pages will be printed. We can print current page alone by setting the <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/api/grid#printmode">printMode
                </a></code> property value as <code>currentpage</code>. The child grid allows us to print the grid with following options,
            </p>
            <ul>
                <li><code>Expanded</code> - Prints the master grid with expanded child grids.</li>
                <li><code>All</code> - Prints the master grid with all the child grids.</li>
                <li><code>None</code> - Prints the master grid alone.</li>
            </ul>
            <p>
                We can change the child grid's print option by using the <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/api/grid#hierarchyprintmode">hierarchyPrintMode
                </a></code> property.
            </p>
            <p>
                In this demo, we have set the hierarchyPrintMode as<code>All</code>. You can change the hierarchy grid's print mode by selecting the toolbar and click the print icon to print the Grid.
            </p>
            <p style={{ fontWeight: 500 }}> Injecting Module: </p>
            <p>
                Grid features are segregated into individual feature-wise modules,
                To use Hierarchy Grid feature, we need to inject <code>DetailRow</code> module into the <code>services</code>.
            </p>
            <p>More information on the print feature can be found in this 
                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/print">
                documentation section</a>.
            </p>
        </div>
      </div>
    )
  }
}