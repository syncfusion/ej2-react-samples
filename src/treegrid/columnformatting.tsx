import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Column } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { DateFormatOptions } from '@syncfusion/ej2-base';
import { formatData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


export class ColumnFormat extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;
  public dropdownObj: DropDownListComponent;
  public dropdownObj2: DropDownListComponent;
  public format: any = { type:'dateTime',format:'M/d/yyyy'};

  private columnNames: { [key: string]: Object }[] = [
    { id: 'price', name: 'Price' },
    { id: 'orderDate', name: 'Order Date' }
  ];

  private priceFormat: { [key: string]: Object }[] = [
    { id: 'n2', format: 'n2' },
    { id: 'n3', format: 'n3' },
    { id: 'c2', format: 'c2' },
    { id: 'c3', format: 'c3' },
    { id: 'p2', format: 'p2' },
    { id: 'p3', format: 'p3' }
  ];

  private dateFormat: { [key: string]: Object }[] = [
    { id: 'M/d/yyyy', format: 'Short Date' },
    { id: 'dddd, MMMM dd, yyyy', format: 'Long Date' },
    { id: 'MMMM, yyyy', format: 'Month/Year' },
    { id: 'MMMM, dd', format: 'Month/Day' }
  ];

  private change(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    if (columnName === 'price') {
      this.dropdownObj2.dataSource = this.priceFormat;
      let priceColumn: Column = this.treegridObj.getColumnByField('price');
      this.dropdownObj2.value = priceColumn.format.toString();
    }
    if (columnName === 'orderDate') {
      this.dropdownObj2.dataSource = this.dateFormat;
      let format: any = this.treegridObj.getColumnByField('orderDate').format;
      this.dropdownObj2.value = format.format;
    }
  }

  private change2(args: ChangeEventArgs): void {
    let formatval: any = args.value;
    let columnName: string = this.dropdownObj.value.toString();
    if (columnName === 'price') {
      this.treegridObj.getColumnByField(columnName).format = formatval;
    }
    if (columnName === 'orderDate') {
      this.treegridObj.getColumnByField(columnName).format = { format : formatval, type: 'date' };
    }
    this.treegridObj.refreshColumns();
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-lg-9'>
            <TreeGridComponent dataSource={formatData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true} 
              ref={treegrid=> this.treegridObj = treegrid} pageSettings={{ pageCount: 5 }}>
              <ColumnsDirective>
                <ColumnDirective field='orderID' headerText='Order ID' width='110' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='orderName' headerText='Order Name' width='200'></ColumnDirective>
                <ColumnDirective field='orderDate' headerText='Order Date' width='190' type='date' format={this.format} textAlign='Right' />
                <ColumnDirective field='price' headerText='Price' width='120' format='c2' textAlign='Right' type='number' />
              </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr style={{ height: '50px' }}>
                  <td style={{ width: '20%' }}>
                      <div style={{ paddingTop: '7px' }}> Column </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div>
                         <DropDownListComponent width="100px" id="columns" change={this.change.bind(this)}
                            dataSource={this.columnNames} fields={{ text: 'name', value: 'id' }} value="price"
                            ref={dropdown=> this.dropdownObj = dropdown} />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: '50px' }}>
                     <td style={{ width: '30%' }}>
                        <div> Format </div>
                     </td>
                     <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                        <div>
                        <DropDownListComponent width="100px" id="format" change={this.change2.bind(this)}
                            dataSource={this.priceFormat} fields={{ text: 'format', value: 'id' }} value="c2"
                            ref={dropdown=> this.dropdownObj2 = dropdown} />
                        </div>
                     </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
          <p>This sample demonstrates the way of displaying the content of Tree Grid columns
              based on the specified format. In this sample, format of columns can be changed dynamically through property panel.
          </p>
      </div>
      <div id="description">
        <p>Format is the process of customizing the particular column data/values based on specific culture. The Tree Grid uses
              Internalization library to format number and date values.
            The format can be specified by using <code>format</code> property of columns.</p>
            <p>In this demo, select the column and format from the property panel to format the corresponding column values.</p>
            <p>
                More information about Column Formatting can be found in this documentation section.
            </p>
      </div>
    </div>
    )
  }
}