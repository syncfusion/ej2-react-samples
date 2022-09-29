import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Freeze, Inject, FilterType, Column, freezeDirection } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

function FrozenAPI() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let grid: GridComponent;
  let freezeDropDown: DropDownListComponent;
  let columnDropDown: DropDownListComponent;
  let alertDialogInstance: DialogComponent;
  let refresh: boolean = true;
  const columnNames: { [key: string]: Object }[] = [
    { id: 'OrderID', name: 'Order ID' },
    { id: 'Freight', name: 'Freight' },
    { id: 'CustomerID', name: 'Customer ID' },
    { id: 'OrderDate', name: 'Order Date' },
    { id: 'ShipName', name: 'Ship Name' },
    { id: 'ShipAddress', name: 'Ship Address' },
    { id: 'ShipCity', name: 'Ship City' },
    { id: 'ShipCountry', name: 'Ship Country' }
  ];
  const directions: { [key: string]: Object }[] = [
    { id: 'Left', name: 'Left' },
    { id: 'Right', name: 'Right' },
    { id: 'Center', name: 'Center' }
  ];
  const fields: Object = { text: 'name', value: 'id' };
  function directionChange(e): void {
    if (refresh) {
      let columnName: string = columnDropDown.value as string;
      let mvblColumns: Column[] = grid.getMovableColumns();
      if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
        alertDialogInstance.show();
        refresh = false; freezeDropDown.value = "Center"; freezeDropDown.refresh();

      } else {
        grid.getColumnByField(columnName).freeze = e.value === 'Center' ? undefined : e.value as freezeDirection;
        grid.refreshColumns();
      }
    }
    refresh = true;
  };
  function columnChange(e): void {
    let columnName: string = e.value as string;
    let column: Column = grid.getColumnByField(columnName);
    let value: string = column.freeze === undefined ? 'Center' : column.freeze;
    refresh = freezeDropDown.value === value;
    freezeDropDown.value = value;
  };
  const confirmButton = [{
    click: () => {
      alertDialogInstance.hide();
    },
    buttonModel: { content: 'OK', isPrimary: true }
  }];


  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div style={{ paddingBottom: '5px' }}>
          <div style={{ display: 'inline-block', paddingRight: '10px' }}>
            <div style={{ display: 'inline-block', paddingRight: '10px' }}>
              <span>
                Column
              </span>
            </div>
            <div style={{ display: 'inline-block', paddingRight: '10px' }}>
              <DropDownListComponent id="column" dataSource={columnNames} change={columnChange.bind(this)} value="ShipCountry" fields={fields} ref={(colDropDown) => { columnDropDown = colDropDown }} />
            </div>
          </div>
          <div style={{ display: 'inline-block', paddingRight: '10px' }}>
            <div style={{ display: 'inline-block', paddingRight: '10px' }}>
              <span>
                Freeze Direction
              </span>
            </div>
            <div style={{ display: 'inline-block', paddingRight: '10px' }}>
              <DropDownListComponent id="freezedirection" dataSource={directions} value="Left" change={directionChange.bind(this)} fields={fields} ref={(frzDropDown) => { freezeDropDown = frzDropDown }} />
            </div>
          </div>
        </div>

        <GridComponent ref={g => grid = g} dataSource={orderDetails} height='350' frozenRows={2} enableHover={false}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='Freight' headerText='Freight' width='125' format='C2' textAlign='Right' />
            <ColumnDirective field='CustomerID' headerText='Customer ID' width='130' freeze='Right'></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' width='150' format='yMd' textAlign='Right' />
            <ColumnDirective field='ShipName' headerText='Ship Name' width='300'></ColumnDirective>
            <ColumnDirective field='ShipAddress' headerText='Ship Address' width='270'></ColumnDirective>
            <ColumnDirective field='ShipCity' headerText='Ship City' width='250'></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='250' freeze='Left'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Freeze]} />
        </GridComponent>
      </div>

      <DialogComponent id="alertDialog" header='Frozen' visible={false} animationSettings={{ effect: 'None' }} width='300px' content='Atleast one Column should be in movable' ref={(alertdialog) => { alertDialogInstance = alertdialog }}
        target='.control-section' buttons={confirmButton} showCloseIcon={false} ></DialogComponent>
      <div id="action-description">
        <p>This sample demonstrates the frozen rows and columns feature of the Grid. Scroll the movable content
          vertically/horizontally to view the frozen rows/columns
          with the content.
        </p>
      </div>
      <div id="description">
        <p>The freezing feature enables the user to freeze certain rows/columns at both sides to scroll remaining movable
          content. This can be achieved by setting <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#freeze">Freeze</a></code> property in column settings.
        </p>
        <p> In this demo sample, the <b>ShipCountry</b> column freezed at left side and <b>CustomerID</b> column freezed at
          right side using <code>Column-&gt;Freeze</code>property.</p>
        <p style={{ fontWeight: 500 }}>Injecting Module:</p>
        <p> Grid features are segregated into individual feature-wise modules. To use frozen rows and columns feature, we
          need to inject <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#freeze">Freeze
          </a></code> module into the <code>services</code></p>
      </div>
    </div>
  )
}
export default FrozenAPI;
