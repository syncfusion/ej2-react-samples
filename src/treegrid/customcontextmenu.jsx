import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar, ContextMenu, Sort } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
export class CustomContextMenu extends SampleBase {
    constructor() {
        super(...arguments);
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.contextMenuItems = [
            { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
            { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
            { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
            { text: 'Expand All', target: '.e-headercontent', id: 'expandall' }
        ];
    }
    contextMenuOpen(args) {
        let elem = args.event.target;
        let row = elem.closest('.e-row');
        let uid = row && row.getAttribute('data-uid');
        let items = document.querySelectorAll('.e-menu-item');
        for (let i = 0; i < items.length; i++) {
            items.item(i).setAttribute('style', 'display: none;');
        }
        if (elem.closest('.e-row')) {
            if (isNullOrUndefined(uid) || isNullOrUndefined(getValue('hasChildRecords', this.treegridObj.grid.getRowObjectFromUID(uid).data))) {
                args.cancel = true;
            }
            else {
                let flag = getValue('expanded', this.treegridObj.grid.getRowObjectFromUID(uid).data);
                let val = flag ? 'none' : 'block';
                document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
                val = !flag ? 'none' : 'block';
                document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
            }
        }
        else {
            let len = this.treegridObj.element.querySelectorAll('.e-treegridexpand').length;
            if (len !== 0) {
                document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
            }
            else {
                document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
            }
        }
    }
    contextMenuClick(args) {
        if (args.item.id === 'collapserow') {
            this.treegridObj.collapseRow(this.treegridObj.getSelectedRows()[0], this.treegridObj.getSelectedRecords()[0]);
        }
        else if (args.item.id === 'expandrow') {
            this.treegridObj.expandRow(this.treegridObj.getSelectedRows()[0], this.treegridObj.getSelectedRecords()[0]);
        }
        else if (args.item.id === 'collapseall') {
            this.treegridObj.collapseAll();
        }
        else if (args.item.id === 'expandall') {
            this.treegridObj.expandAll();
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='400' contextMenuItems={this.contextMenuItems} contextMenuOpen={this.contextMenuOpen.bind(this)} contextMenuClick={this.contextMenuClick.bind(this)} ref={treegrid => this.treegridObj = treegrid}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='210'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='100' textAlign='Right' format='yMd' type='date'/>
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' type='date' textAlign='Right'/>
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
              <ColumnDirective field='priority' headerText='Priority' width='90'/>
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar, ContextMenu, Sort]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
    <p>This sample demonstrates the usage of context menu in TreeGrid component. Right click anywhere on the Grid to view context
        menu.
    </p>
</div>

<div id="action-description">
    <p>This sample demonstrates the usage of custom context menu in TreeGrid component. Right click anywhere on a parent row in the
        TreeGrid to view custom context menu.
    </p>
</div>

<div id="description">
    <p>
        TreeGrid has an option to show the custom context menu when right click on it. To configure the custom items in context menu,
          you should define custom item in  <code>contextMenuItems</code>.
        In this demo, Custom Context Menu feature has enabled by defining the custom context menu <code>Expand the Row</code> and
          <code>Collapse the Row</code> for the parent nodes in <code>contextMenuItems</code>  property.
    </p>
    <p>Injecting Module:</p>
    <p>
        TreeGrid features are segregated into individual feature-wise modules. 
        To use context menu feature, we need to inject <code>ContextMenu</code> module into the <code>services</code>.
    </p>
</div>
      </div>);
    }
}
