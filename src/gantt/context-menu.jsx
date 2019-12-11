import * as React from 'react';
import { GanttComponent, EditDialogFieldsDirective, DayMarkers, EditDialogFieldDirective, Inject, Edit, Selection, Toolbar, Resize, Sort, ContextMenu, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
export class ContextMenuItem extends SampleBase {
    constructor() {
        super(...arguments);
        this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            notes: 'info',
            resourceInfo: 'resources'
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.projectStartDate = new Date('03/25/2019');
        this.projectEndDate = new Date('07/28/2019');
        this.gridLines = 'Both';
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
            },
        };
        this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        this.contextMenuItems = ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
            'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert',
            { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
            { text: 'Expand the Row', target: '.e-content', id: 'expandrow' }];
        this.eventMarkerDay1 = new Date('4/17/2019');
        this.eventMarkerDay2 = new Date('5/3/2019');
        this.eventMarkerDay3 = new Date('6/7/2019');
        this.eventMarkerDay4 = new Date('7/16/2019');
    }
    contextMenuOpen(args) {
        let record = args.rowData;
        if (args.type !== 'Header') {
            if (!record.hasChildRecords) {
                args.hideItems.push('Collapse the Row');
                args.hideItems.push('Expand the Row');
            }
            else {
                if (record.expanded) {
                    args.hideItems.push('Expand the Row');
                }
                else {
                    args.hideItems.push('Collapse the Row');
                }
            }
        }
    }
    contextMenuClick(args) {
        let record = args.rowData;
        if (args.item.id === 'collapserow') {
            this.ganttInstance.collapseByID(Number(record.ganttProperties.taskId));
        }
        if (args.item.id === 'expandrow') {
            this.ganttInstance.expandByID(Number(record.ganttProperties.taskId));
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ContextMenu' ref={gantt => this.ganttInstance = gantt} dataSource={editingData} dateFormat={'MMM dd, y'} enableContextMenu={true} treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true} allowSorting={true} allowResizing={true} contextMenuItems={this.contextMenuItems} contextMenuOpen={this.contextMenuOpen.bind(this)} contextMenuClick={this.contextMenuClick.bind(this)} allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings} height='410px' editSettings={this.editSettings} gridLines={this.gridLines} toolbar={this.toolbar} resourceNameMapping='resourceName' resourceIDMapping='resourceId' resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='50'></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <EditDialogFieldsDirective>
              <EditDialogFieldDirective type='General' headerText='General'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Dependency'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Resources'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Notes'></EditDialogFieldDirective>
            </EditDialogFieldsDirective>
            <EventMarkersDirective>
              <EventMarkerDirective day={this.eventMarkerDay1} label='Project approval and kick-off'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay2} label='Foundation inspection'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay3} label='Site manager inspection'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay4} label='Property handover and sign-off'></EventMarkerDirective>
            </EventMarkersDirective>
            <Inject services={[Edit, Selection, Toolbar, DayMarkers, ContextMenu, Resize, Sort]}/>
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Construction" target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the various phases involved in constructing a residential house, from testing
        the soil to handing over the fully constructed property to the owner. This also demonstrates the usage of default and custom context menu in Gantt component.
        </p>
        </div>

        <div id="description">
        <p>
        Gantt has an option to show the context menu while performing right click on it. You can configure the default and custom menu items in the context menu using the <code>contextMenuItems</code> property.
             Each menu item will be displayed contextually based on its target. In this demo we have rendered following default and custom menu items
    </p>
    <p>Default items:</p>
    <ul>
            <li><code>AutoFitAll</code> - Auto fit all columns.</li>
            <li><code>AutoFit</code> - Auto fit the current column.</li>
            <li><code>TaskInformation</code> - Edit the current record.</li>
            <li><code>DeleteTask</code> - Delete the current record.</li>
            <li><code>Save</code> - Save the edited record.</li>
            <li><code>Cancel</code> - Cancel the edited state.</li>
            <li><code>SortAscending </code> - Sort the current column in ascending order.</li>
            <li><code>SortDescending </code> - Sort the current column in descending order.</li>
            <li><code>DeleteDependency </code> - Delete the dependency of the current record.</li>
            <li><code>Convert </code> - Convert the normal task in to milestone task and vice versa.</li>
            <li><code>Add</code>
                <ul>
                    <li><code>Above</code> - Add a new row above the selected row </li>
                    <li><code>Below</code> - Add a new row below the selected row</li>
                    <li><code>Child</code> - Add a new row as child to the selected row</li>
                    <li><code>Milestone</code> - Add a milestone task below to selected row</li>
                </ul>
            </li>
    </ul>

    <p>Custom items:</p>
    <p>
        In this demo, custom menu items have been enabled in the context menu to perform expanding and collapsing the parent rows,
        <li><code>Expand the Row</code> - Used to expand the parent row and it will render where the row is in a collapsed state.</li>
        <li><code>Collapse the Row</code> - Used to collapse the parent row and it will render  where the row is in a expanded state.</li>
        
        To use context menu feature, we need to inject <code>ContextMenu</code> module into the <code>services</code>.
    </p>
        </div>
      </div>);
    }
}
