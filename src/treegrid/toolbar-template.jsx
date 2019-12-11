import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, Toolbar, Page } from '@syncfusion/ej2-react-treegrid';
import { treesampleData } from './data';
import { SampleBase } from '../common/sample-base';
export class ToolbarTemplate extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['ExpandAll', 'CollapseAll', { text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'filter' }];
    }
    toolbarClick(args) {
        if (args.item.id === 'filter') {
            this.treegridObj.filterByColumn("taskName", "startswith", "Testing");
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div>
            <TreeGridComponent dataSource={treesampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' allowFiltering='true' toolbar={this.toolbarOptions} ref={treegrid => this.treegridObj = treegrid} toolbarClick={this.toolbarClick.bind(this)} filterSettings={{ type: 'Menu' }} pageSettings={{ pageSize: 11 }}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='90' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='130'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' type='date' textAlign='Right'/>
                <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right'/>
                <ColumnDirective field='priority' headerText='Priority' width='90'/>
              </ColumnsDirective>
              <Inject services={[Filter, Toolbar, Page]}/>
          </TreeGridComponent>
        </div>
      </div>
      <div id="action-description">
        <p>This sample explains the way of rendering custom template element <code>Quick Filter</code> in a toolbar and while click
            on the icon filters the <code>Task Name</code> column in TreeGrid using API
        </p>
    </div>

    <div id="description">
       <p>
           Custom toolbar items can be added by defining the toolbar as a collection of ItemModels.
           Actions for this customized toolbar items are defined in the toolbarClick event.
       </p>
       <p>
           In this sample, rendered the custom template element <code>Quick Filter</code> along with predefined toolbar items ExpandAll
            and CollapseAll. While click on the <code>Quick Filter</code> button then the filtering is performed for
            <code>Task Name</code> column.
       </p>
       <p>
           More information about Toolbar template can be found in this documentation section.
       </p>
    </div>

      </div>);
    }
}
