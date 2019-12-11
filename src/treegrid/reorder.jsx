import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Reorder, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class Reorders extends SampleBase {
    constructor() {
        super(...arguments);
        this.columnNames = [
            { id: 'taskID', name: 'Task ID' },
            { id: 'taskName', name: 'Task Name' },
            { id: 'startDate', name: 'Start Date' },
            { id: 'duration', name: 'Duration' },
            { id: 'progress', name: 'Progress' }
        ];
        this.columnsIndex = [
            { id: '0', name: '1' },
            { id: '1', name: '2' },
            { id: '2', name: '3' },
            { id: '3', name: '4' },
            { id: '4', name: '5' }
        ];
    }
    change(args) {
        let columnName = args.value.toString();
        let index = this.treegridObj.getColumnIndexByField(columnName);
        this.dropdownObj2.value = index.toString();
    }
    change2(args) {
        let columnName = this.dropdownObj.value.toString();
        let toColumnIndex = args.value;
        let column = this.treegridObj.columns[toColumnIndex];
        this.treegridObj.reorderColumns(columnName, column.field);
    }
    actionComplete(args) {
        if (args.requestType === 'reorder') {
            let columnName = this.dropdownObj.value;
            let index = this.treegridObj.getColumnIndexByField(columnName);
            this.dropdownObj2.value = index.toString();
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-md-9'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} allowPaging='true' childMapping='subtasks' allowReordering='true' pageSettings={{ pageCount: 4, pageSize: 11 }} ref={treegrid => this.treegridObj = treegrid} actionComplete={this.actionComplete.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='105' format='yMd' textAlign='Right'/>
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
            </ColumnsDirective>
            <Inject services={[Page, Reorder]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                   <div style={{ paddingTop: '10px' }}> Column </div>
                </td>
                <td style={{ width: '50%', paddingRight: '10px' }}>
                   <div>
                      <DropDownListComponent width="120px" id="columns" change={this.change.bind(this)} dataSource={this.columnNames} fields={{ text: 'name', value: 'id' }} value="taskID" ref={dropdown => this.dropdownObj = dropdown}/>
                   </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                   <div> Column Index </div>
                </td>
                <td style={{ width: '50%', paddingRight: '10px' }}>
                   <div>
                      <DropDownListComponent width="120px" id="columnindex" change={this.change2.bind(this)} dataSource={this.columnsIndex} fields={{ text: 'name', value: 'id' }} value="0" ref={dropdown => this.dropdownObj2 = dropdown}/>
                   </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample demonstrates reordering feature of the TreeGrid columns.You can reorder columns by simply
              drag and drop in the desired column position. You can also reorder columns by simply drag and drop
              in the desired column position.</p>
        </div>
        <div id='description'>
          <p>
            Reordering can be enabled by setting <code>allowReordering</code> property as true. Reordering can be done by drag and drop the
            column header from one index to another index within the TreeGrid.

            The location in which the column to be placed, will be indicated by two arrows symbols
          </p>
          <p>
            In this demo, you can reorder columns by drag and drop.
         </p>
         <p>Injecting Module:</p>
         <p>TreeGrid features are segregated into individual feature-wise modules. To use reordering feature, we need to
              inject <code>Reorder</code> module into the <code>services</code>.</p>
          <p>
            More information about Column Reorder can be found in this documentation section.
         </p>
        </div>
      </div>
    </div>);
    }
}
