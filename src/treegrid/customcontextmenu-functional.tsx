import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit,
  Toolbar, ContextMenu, Sort
} from '@syncfusion/ej2-react-treegrid';
import { ContextMenuItemModel, EditSettingsModel } from '@syncfusion/ej2-react-grids';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-react-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-react-navigations'
import { defaultFormatUtc } from 'moment';

function CustomContextMenu() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj: TreeGridComponent;
  const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const contextMenuItems: ContextMenuItemModel[] = [
    { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
    { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
    { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
    { text: 'Expand All', target: '.e-headercontent', id: 'expandall' }
  ];

  function contextMenuOpen(args: BeforeOpenCloseEventArgs): void {
    let elem: Element = args.event.target as Element;
    let row: Element = elem.closest('.e-row');
    let uid: string = row && row.getAttribute('data-uid');
    let items: NodeListOf<Element> = document.querySelectorAll('.e-menu-item');
    for (let i: number = 0; i < items.length; i++) {
      items.item(i).setAttribute('style', 'display: none;');
    }
    if (elem.closest('.e-row')) {
      if (isNullOrUndefined(uid) || isNullOrUndefined(getValue('hasChildRecords', treegridObj.grid.getRowObjectFromUID(uid).data))) {
        args.cancel = true;
      } else {
        let flag: boolean = getValue('expanded', treegridObj.grid.getRowObjectFromUID(uid).data);
        let val: string = flag ? 'none' : 'block';
        document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
        val = !flag ? 'none' : 'block';
        document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
      }
    } else {
      let len = treegridObj.element.querySelectorAll('.e-treegridexpand').length;
      if (len !== 0) {
        document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
      } else {
        document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
      }
    }
  }

  function contextMenuClick(args: MenuEventArgs): void {
    if (args.item.id === 'collapserow') {
      treegridObj.collapseRow(treegridObj.getSelectedRows()[0] as HTMLTableRowElement, treegridObj.getSelectedRecords()[0]);
    } else if (args.item.id === 'expandrow') {
      treegridObj.expandRow(treegridObj.getSelectedRows()[0] as HTMLTableRowElement, treegridObj.getSelectedRecords()[0]);
    } else if (args.item.id === 'collapseall') {
      treegridObj.collapseAll();
    } else if (args.item.id === 'expandall') {
      treegridObj.expandAll();
    }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='400'
          contextMenuItems={contextMenuItems} contextMenuOpen={contextMenuOpen.bind(this)}
          contextMenuClick={contextMenuClick.bind(this)} ref={treegrid => treegridObj = treegrid}>
          <ColumnsDirective>
            <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='taskName' headerText='Task Name' width='210'></ColumnDirective>
            <ColumnDirective field='startDate' headerText='Start Date' width='100' textAlign='Right'
              format='yMd' type='date' />
            <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' type='date' textAlign='Right' />
            <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right' />
            <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right' />
            <ColumnDirective field='priority' headerText='Priority' width='90' />
          </ColumnsDirective>
          <Inject services={[Page, Edit, Toolbar, ContextMenu, Sort]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the usage of context menu in Tree Grid component. Right click anywhere on the Grid to view context
          menu.
        </p>
      </div>

      <div id="action-description">
        <p>This sample demonstrates the usage of custom context menu in Tree Grid component. Right click anywhere on a parent row in the
          Tree Grid to view custom context menu.
        </p>
      </div>

      <div id="description">
        <p>
          Tree Grid has an option to show the custom context menu when right click on it. To configure the custom items in context menu,
          you should define custom item in  <code>contextMenuItems</code>.
          In this demo, Custom Context Menu feature has enabled by defining the custom context menu <code>Expand the Row</code> and
          <code>Collapse the Row</code> for the parent nodes in <code>contextMenuItems</code>  property.
        </p>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise modules.
          To use context menu feature, we need to inject <code>ContextMenu</code> module into the <code>services</code>.
        </p>
      </div>
    </div>
  )
}
export default CustomContextMenu;