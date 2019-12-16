import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Toolbar, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import './sample.css';
import { SampleBase } from '../common/sample-base';
export class RowHeight extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = [
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Left', tooltipText: 'Small' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Left', tooltipText: 'Medium' },
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Left', tooltipText: 'Large' }
        ];
    }
    toolbarClick(args) {
        if (args.item.id === 'small') {
            this.treegridObj.rowHeight = 20;
        }
        if (args.item.id === 'medium') {
            this.treegridObj.rowHeight = 40;
        }
        if (args.item.id === 'big') {
            this.treegridObj.rowHeight = 60;
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' rowHeight='20' toolbar={this.toolbarOptions} ref={treegrid => this.treegridObj = treegrid} toolbarClick={this.toolbarClick.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' type='date' textAlign='Right'/>
                <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' type='date' textAlign='Right'/>
                <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='progress' width='80' textAlign='Right'/>
                <ColumnDirective field='priority' headerText='Priority' width='90'/>
              </ColumnsDirective>
            <Inject services={[Toolbar]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the row height feature of the TreeGrid. In this demo, the rowHeight for all the TreeGrid rows can be
              changed as 20px, 40px and 60px through ToolBar button click.</p>
        </div>
        <div id='description'>
          <p>TreeGrid has provide an option to customize the row height by using <code>rowHeight</code> property of treegrid.
          </p>
          <p>In this sample, we have enabled an option in Toolbar to customize the row height of TreeGrid to 20px, 40px and 60px.
          </p>
        </div>
      </div>);
    }
}
