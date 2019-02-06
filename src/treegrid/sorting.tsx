import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Sort } from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SortEventArgs } from '@syncfusion/ej2-react-grids';
import { sortData } from './data';
import { SampleBase } from '../common/sample-base';

export class Sorting extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;

  public orderNameObj: CheckBoxComponent;

  public categoryObj: CheckBoxComponent;

  public orderDateObj: CheckBoxComponent;

  public unitsObj: CheckBoxComponent;

  public sortingOptions: Object = { columns: [{ field: 'Category', direction: 'Ascending' },
        { field: 'orderName', direction: 'Ascending' }] };

  private orderNameChange(args:ChangeEventArgs): void {
    if (args.checked) {
        this.treegridObj.sortByColumn('orderName', 'Ascending', true);
    } else {
        this.treegridObj.grid.removeSortColumn('orderName');
    }
  }

  private categoryChange(args:ChangeEventArgs): void {
    if (args.checked) {
        this.treegridObj.sortByColumn('Category', 'Ascending', true);
    } else {
        this.treegridObj.grid.removeSortColumn('Category');
    }
  }

  private orderDateChange(args:ChangeEventArgs): void {
    if (args.checked) {
        this.treegridObj.sortByColumn('orderDate', 'Ascending', true);
    } else {
        this.treegridObj.grid.removeSortColumn('orderDate');
    }
  }

  private unitsChange(args:ChangeEventArgs): void {
    if (args.checked) {
        this.treegridObj.sortByColumn('units', 'Ascending', true);
    } else {
        this.treegridObj.grid.removeSortColumn('units');
    }
  }

  private sort(args: SortEventArgs): void {
    if (args.requestType === 'sorting') {
        for (let columns of this.treegridObj.getColumns()) {
            for (let sortcolumns of this.treegridObj.sortSettings.columns) {
                if (sortcolumns.field === columns.field) {
                    this.check(sortcolumns.field, true); break;
                } else {
                    this.check(columns.field, false);
                }
            }
        }
    }
  }

  private check(field: string, state: boolean): void {
    switch (field) {
        case 'orderName':
            this.orderNameObj.checked = state; break;
        case 'Category':
            this.categoryObj.checked = state; break;
        case 'orderDate':
            this.orderDateObj.checked = state; break;
        case 'units':
            this.unitsObj.checked = state; break;
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-md-9'>
            <TreeGridComponent dataSource={sortData} treeColumnIndex={0} childMapping= 'subtasks' allowPaging='true'
               allowSorting='true' sortSettings={this.sortingOptions} ref={treegrid=> this.treegridObj = treegrid}
               actionComplete={ this.sort.bind(this) }>
            <ColumnsDirective>
              <ColumnDirective field='orderName' headerText='Order Name' width='220'></ColumnDirective>
              <ColumnDirective field='Category' headerText='Category' width='150'></ColumnDirective>
              <ColumnDirective field='orderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' />
              <ColumnDirective field='units' headerText='Units' width='130' textAlign='Right'/>
            </ColumnsDirective>
            <Inject services={[Page, Sort]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr>
                <td style={{ width: '70%' }}>
                   <div> Order Name</div>
                </td>
                <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                   <div className='col-md-6'>
                        <CheckBoxComponent checked={true} change={ this.orderNameChange.bind(this) }
                            ref={(scope) => { this.orderNameObj = scope; }} ></CheckBoxComponent>
                   </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '70%' }}>
                   <div> Category </div>
                </td>
                <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                   <div className='col-md-6'>
                        <CheckBoxComponent checked={true} change={ this.categoryChange.bind(this) }
                            ref={(scope) => { this.categoryObj = scope; }} ></CheckBoxComponent>
                   </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '70%' }}>
                   <div> Order Date </div>
                </td>
                <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                   <div className='col-md-6'>
                        <CheckBoxComponent change={ this.orderDateChange.bind(this) }
                            ref={(scope) => { this.orderDateObj = scope; }} ></CheckBoxComponent>
                   </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '70%' }}>
                   <div> Units </div>
                </td>
                <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                   <div className='col-md-6'>
                        <CheckBoxComponent change={ this.unitsChange.bind(this) }
                            ref={(scope) => { this.unitsObj = scope; }} ></CheckBoxComponent>
                   </div>
                </td>
              </tr>
            </table>
        </div>
        <div id="action-description">
            <p>
               This sample demonstrates the TreeGrid multi sorting feature. To sort two or more columns,
                hold the CTRL key and click the column header.
            </p>
        </div>

        <div id="description">
            <p>
                Sorting feature enables us to order the data in a particular direction. It can be enabled by
                setting the <code>allowSorting</code> as true.</p>
            <p className="e-grid" style={{ border:'none' }}>
                To sort a TreeGrid column by simply click the column header. The icons <span className="e-icons e-icon-ascending">
                </span>(ascending) and <span className="e-icons e-icon-descending"></span>(descending)
                specifies the sort direction of a column.</p>
            <p>By default, multi-sorting is enabled in TreeGrid, to sort multiple column hold <strong>CTRL</strong> key and click the column
                header. To clear sort for a column, hold <strong>SHIFT</strong> key and click the column header.</p>
            <p> While using TreeGrid in a touch device, you have an option for multi sorting in single tap on the treegrid header.
                 By tapping on the treegrid header, it will show the toggle button in small popup with sort icon. 
                 Now tap the button to enable the multi-sorting in single tap.
            </p>
            <p>In this demo, </p>
            <ul>
                <li>Simply click the column header to sort a column.</li>
                <li>Check the checkboxes in the properties panel to sort a column and uncheck to remove sort from a column.
                </li>
            </ul>
            <p>Injecting Module:</p>
            <p>
               TreeGrid features are segregated into individual feature-wise modules. To use sorting feature, we need to inject
                <code>Sort</code> module into the <code>services</code>.
            </p>
            <p>
               More information on the sorting feature configuration can be found in this documentation section.
            </p>
          </div>
      </div>
    </div>
    )
  }
}