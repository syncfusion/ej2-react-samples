import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Sort } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class SortingAPI extends SampleBase {
    constructor() {
        super(...arguments);
        this.columnsName = [
            { id: 'taskID', name: 'Task ID' },
            { id: 'taskName', name: 'Task Name' },
            { id: 'duration', name: 'Duration' },
            { id: 'progress', name: 'Progress' }
        ];
        this.direction = [
            { id: 'Ascending', name: 'Ascending' },
            { id: 'Descending', name: 'Descending' }
        ];
    }
    btnClick() {
        let columnName = this.columnName.value;
        let sortType = this.sortDirection.value;
        this.treegridObj.sortByColumn(columnName, sortType, false);
    }
    btnClick2() {
        this.treegridObj.clearSorting();
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='410' ref={treegrid => this.treegridObj = treegrid} allowSorting='true'>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='160'></ColumnDirective>
                <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right'/>
              </ColumnsDirective>
            <Inject services={[Sort]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div> Column </div>
                    </td>
                    <td style={{ width: '60%', paddingRight: '10px' }}>
                      <div>
                         <DropDownListComponent id="columns" ref={columnname => this.columnName = columnname} dataSource={this.columnsName} fields={{ text: 'name', value: 'id' }} value="taskID"/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div> Direction </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div>
                         <DropDownListComponent id="direction" ref={sortdirection => this.sortDirection = sortdirection} dataSource={this.direction} fields={{ text: 'name', value: 'id' }} value="Ascending"/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div>
                        <ButtonComponent onClick={this.btnClick.bind(this)}> Sort </ButtonComponent>
                      </div>
                    </td>
                    <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <ButtonComponent onClick={this.btnClick2.bind(this)}> Clear </ButtonComponent>
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
    <p>
        Sorting feature enables us to order the data in a particular direction. It can be enabled 
        by setting the allowSorting as true.
    </p>
</div>

  <div id="description">
    <p>
        Sorting feature enables us to order the data in a particular direction. It can be enabled by setting
          the <code>allowSorting</code> as true.
    </p>
    <p className="e-treegrid" style={{ border: 'none' }}>
        To sort a TreeGrid column simply click the column header. The icons <span className="e-icons e-icon-ascending"></span>(ascending)
        and <span className="e-icons e-icon-descending"></span>(descending) specifies the sort direction of a column.</p>
    <p>By default, multi-sorting is enabled in TreeGrid, to sort multiple column hold <strong>CTRL</strong> key and click the column
        header. To clear sort for a column, hold <strong>SHIFT</strong> key and click the column header.</p>
    <p>
        While using TreeGrid in a touch device, you have an option for multi sorting in single tap on the treegrid header. By tapping on
        the treegrid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi-sorting
        in single tap.
    </p>
    <p>In this demo, select the column and direction from the properties panel then click the Sort button. Use the Clear button
        to remove sort for the selected column.
    </p>

    <p>Injecting Module:</p>
    <p>
        TreeGrid features are segregated into individual feature-wise modules. To use sorting feature, we need to inject
          <code>Sort</code> module into the <code>services</code>.
    </p>
    <p>
        More information on the sorting feature configuration can be found in this documentation section.
    </p>
      </div>
    </div>);
    }
}
