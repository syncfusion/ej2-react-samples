import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, FilterType, Column, freezeDirection } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

export class FrozenAPI extends SampleBase<{}, {}> {

  public grid: GridComponent;
  private freezeDropDown: DropDownListComponent;
  private columnDropDown: DropDownListComponent;
  private alertDialogInstance: DialogComponent;
  public refresh: boolean = true;
  public columnNames: { [key: string]: Object }[] = [
    { id: 'OrderID', name: 'Order ID' },
    { id: 'Freight', name: 'Freight' },
    { id: 'CustomerID', name: 'Customer ID' },
    { id: 'OrderDate', name: 'Order Date' },
    { id: 'ShipName', name: 'Ship Name' },
    { id: 'ShipAddress', name: 'Ship Address' },
    { id: 'ShipCity', name: 'Ship City' },
    { id: 'ShipCountry', name: 'Ship Country' }
  ];
  public directions: { [key: string]: Object }[] = [
    { id: 'Left', name: 'Left' },
    { id: 'Right', name: 'Right' },
    { id: 'Center', name: 'Center' },
    { id: 'Fixed', name: 'Fixed' },

  ];
  private fields: Object = { text: 'name', value: 'id' };
  public directionChange(e): void {
    if (this.refresh) {
      let columnName: string = this.columnDropDown.value as string;
      let mvblColumns: Column[] = this.grid.getMovableColumns();
      if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
        this.alertDialogInstance.show();
        this.refresh = false; this.freezeDropDown.value = "Center"; this.freezeDropDown.refresh();

      } else {
        this.grid.getColumnByField(columnName).freeze = e.value === 'Center' ? undefined : e.value as freezeDirection;
        this.grid.refreshColumns();
      }
    }
    this.refresh = true;
  };
  public columnChange(e): void {
    let columnName: string = e.value as string;
    let column: Column = this.grid.getColumnByField(columnName);
    let value: string = column.freeze === undefined ? 'Center' : column.freeze;
    this.refresh = this.freezeDropDown.value === value;
    this.freezeDropDown.value = value;
  };
  public confirmButton = [{
    click: () => {
      this.alertDialogInstance.hide();
    },
    buttonModel: { content: 'OK', isPrimary: true }
  }];


  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div style={{ paddingBottom: '5px' }}>
            <div style={{ display: 'inline-block', paddingRight: '10px' }}>
              <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                <span>
                  Column Name
                    </span>
              </div>
              <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                <DropDownListComponent id="column" dataSource={this.columnNames} change={this.columnChange.bind(this)} value="ShipCountry" fields={this.fields} ref={(colDropDown) => { this.columnDropDown = colDropDown }} />
              </div>
            </div>
            <div style={{ display: 'inline-block', paddingRight: '10px' }}>
              <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                <span>
                  Freeze Direction
                    </span>
              </div>
              <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                <DropDownListComponent id="freezedirection" dataSource={this.directions} value="Left" change={this.directionChange.bind(this)} fields={this.fields} ref={(freezeDropDown) => { this.freezeDropDown = freezeDropDown }} />
              </div>
            </div>
          </div>

          <GridComponent ref={g => this.grid = g} dataSource={orderDetails} height='350' frozenRows={2} enableHover={false}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' freeze='Left'></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='125' format='C2' textAlign='Right' />
              <ColumnDirective field='CustomerID' headerText='Customer ID' width='130' freeze='Right'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' width='150' format='yMd' textAlign='Right' />
              <ColumnDirective field='ShipName' headerText='Ship Name' width='300'></ColumnDirective>
              <ColumnDirective field='ShipAddress' headerText='Ship Address' width='270' freeze='Fixed'></ColumnDirective>
              <ColumnDirective field='ShipCity' headerText='Ship City' width='250'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='250'></ColumnDirective>
            </ColumnsDirective>
          </GridComponent>
        </div>
                                                                                                                                                                    
        <DialogComponent id="alertDialog" header='Frozen' visible={false} animationSettings={{ effect: 'None' }} width='300px' content='Atleast one Column should be in movable' ref={(alertdialog) => { this.alertDialogInstance = alertdialog }}
        target='.control-section' buttons={this.confirmButton} showCloseIcon={false} ></DialogComponent>

        <div id="action-description">
          <p>This sample demonstrates the frozen rows and columns feature of the Grid. Scroll the movable content
            horizontally to view the frozen and fixed columns, vertically to view the frozen rows with the content.
          </p>
        </div>
        <div id="description">
          <p>
            This feature enables users to freeze certain columns at specific positions. This can be achieved by
            setting the <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#freeze">freeze</a></code> 
            property of column settings. The various modes are:
          </p>
          <ul>
            <li><code>Left</code> : Freezes the column at the left.</li>
            <li><code>Right</code> : Freezes the column at the right.</li>
            <li><code>Center</code> : Freezes the column at the center.</li>
            <li><code>Fixed</code> : Freezes the column at a fixed position. This will ensure its visibility while scrolling horizontally.</li>
          </ul>
          <p> In this demo sample, the <b>Order ID</b> column is frozen at the left, the <b>Customer ID</b> column is
            frozen at the right and the <b>Ship Address</b> column at a fixed position using <code>column-&gt;freeze</code> property.
          </p>
          <p>
            More information on the frozen rows and columns can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/frozen"> documentation section</a>.
          </p>
        </div>
      </div>
    )
  }
}