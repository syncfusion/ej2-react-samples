import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Freeze, Inject, Resize, Sort } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { Browser } from '@syncfusion/ej2-base';

function FrozenRows() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let rowInstance: NumericTextBoxComponent;
  let columnInstance: NumericTextBoxComponent;
  let grid: GridComponent;

  /* After clicking 'Set' button, the `frozenRows` and `frozenColumns` values will be updated in Grid */
  function btnClick(): void {
    grid.frozenRows = rowInstance.value;
    grid.frozenColumns = columnInstance.value;
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GridComponent dataSource={orderDetails} height='350' frozenRows={2} frozenColumns={1} allowSelection={false} enableHover={false} allowResizing={true} allowSorting={true} allowMultiSorting={false} ref={g => grid = g}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='125' format='C2' />
              <ColumnDirective field='CustomerID' headerText='Customer ID' width='130'></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='180'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' width='150' format='yMd' textAlign='Right' />
              <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='180' format='yMd' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='ShipName' headerText='Ship Name' width='300'></ColumnDirective>
              <ColumnDirective field='ShipAddress' headerText='Ship Address' width='270'></ColumnDirective>
              <ColumnDirective field='ShipCity' headerText='Ship City' width='250'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='250'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Freeze, Resize, Sort]} />
          </GridComponent>
        </div>
        <div className='col-lg-4 property-section'>
          <PropertyPane title='Properties'>
            <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>Frozen Rows </div>
                </td>
                <td style={{ width: '70%', paddingRight: '10px' }}>
                  <div style={{ minWidth: '148px' }}>
                    {/* Render NumericTextbox component with specific range for frozen rows */}
                    <NumericTextBoxComponent min={0} max={5} validateDecimalOnType={true} decimals={0} format='n' value={2} ref={numeric => rowInstance = numeric}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>Frozen Columns </div>
                </td>
                <td style={{ width: '70%', paddingRight: '10px' }}>
                  <div style={{ minWidth: '148px' }}>
                    {/* Render NumericTextbox component with specific range for frozen columns */}
                    <NumericTextBoxComponent min={0} max={Browser.isDevice ? 1 : 2} validateDecimalOnType={true} decimals={0} format='n' value={1} ref={numeric => columnInstance = numeric}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div style={{ float: 'right', marginRight: '10px' }}>
                    {/* Render Button component in properties panel */}
                    <ButtonComponent onClick={btnClick.bind(this)}>Set</ButtonComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the frozen rows and columns feature of the Grid. Scroll the movable content vertically/horizontally to view the frozen rows/columns with the content.</p>
      </div>
      <div id='description'>
        <p>
          The freezing feature enables the user to freeze certain rows/columns to scroll remaining movable content. This can be achieved by setting <b>frozenRows</b> and <b>frozenColumns</b> property.
        </p>
        <p>
          In this demo sample, the first column and two rows are set to frozen by using the <a target="_blank" className="code"
            href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#frozenrows"><code>frozenRows</code></a> and
          <a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#frozencolumns"><code>frozenColumns
          </code></a> properties.
        </p>
        <p style={{ fontWeight: 500 }}>Injecting Module:</p>
        <p>
          Grid component features are segregated into individual feature-wise modules. To use frozen rows and columns feature, we need to inject <code>Freeze</code> module into the <code>services</code>
        </p>
      </div>
    </div>
  )
}
export default FrozenRows;