import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Edit, Selection, DayMarkers, ColumnMenu, Toolbar, Filter, Reorder, Sort, Resize, ColumnsDirective, ColumnDirective, EditDialogFieldsDirective, EditDialogFieldDirective, AddDialogFieldsDirective, AddDialogFieldDirective, SplitterSettingsModel, TimelineSettingsModel, EditSettingsModel, LabelSettingsModel, ResourceFieldsModel, ToolbarItem } from '@syncfusion/ej2-react-gantt';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { getUniqueID, isNullOrUndefined } from '@syncfusion/ej2-base';
import { dialogData, dataResources } from './data';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';

const GanttDialogEditing = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);

  const ganttInstance = React.useRef<GanttComponent>(null);

  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    dependency: 'Predecessor',
    child: 'subtasks',
    progress: 'Progress',
    segments: 'Segments',
    constraintType: 'ConstraintType',
    constraintDate: 'ConstraintDate',
    resourceInfo: 'Resources',
    manual: 'isManual',
    work: 'Work',
  };

  const resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName',
  };

  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
    mode: 'Dialog',
  };

  const toolbar: ToolbarItem[] = ['Add', 'Edit', 'Delete', 'ExpandAll', 'CollapseAll'];

  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 4,
  };

  const timelineSettings: TimelineSettingsModel = {
    showTooltip: true,
    topTier: {
      unit: 'Week',
      format: 'dd/MM/yyyy',
    },
    bottomTier: {
      unit: 'Day',
      count: 1,
    },
  };

  const labelSettings: LabelSettingsModel = {
    rightLabel: 'TaskName',
  };
  const actionComplete = (args: any) => {
    if (args.requestType === 'openAddDialog' || args.requestType === 'openEditDialog') {
      const gantt = (document.getElementById('Dialog') as any)?.ej2_instances[0];
      const tabObj = (document.getElementById(`${gantt.element.id}_Tab`) as any)?.ej2_instances[0];
      const selectedTab = tabObj.selected;
      if (tabObj) {
        tabObj.selected = function (args: any) {
          if (args.selectedIndex === 1) {
            const gridObj = (document.getElementById(`${gantt.element.id}DependencyTabContainer`) as any)?.ej2_instances[0];
            if (gridObj) {
              gridObj.queryCellInfo = function (args: any) {
                if (args.column.field === 'name') {
                  args.cell.innerText = args.data.name.substring(args.data.id.length + 1);
                }
              };
              const cols = gridObj.columns;
              cols[1].edit.write = function (args: any) {
                if (args.requestType === 'add') {
                  args.rowData.uniqueId = getUniqueID('gantt');
                }
                const field = 'name';
                const dependencygridData = gantt?.editModule.dialogModule.idCollection || [];
                for (let i = 0; i < dependencygridData.length; i++) {
                  dependencygridData[i].text = dependencygridData[i].text.substring(
                    dependencygridData[i].id.length + 1
                  );
                }
                let comboValue = '';
                if (args.rowData[field]) {
                  comboValue = args.rowData[field].substring(0, args.rowData.id.length);
                }
                const autoObj = new ComboBox({
                  dataSource: new DataManager(dependencygridData),
                  popupHeight: '180px',
                  allowCustom: false,
                  enableRtl: gantt?.enableRtl,
                  fields: { value: 'value', text: 'text' },
                  value: comboValue,
                  change: function (arg: any) {
                    const tr = arg.element.closest('tr');
                    const idInput = tr.querySelector(`#${gantt?.element.id}DependencyTabContainerid`);
                    if (idInput) {
                      if (!isNullOrUndefined(arg.itemData) && !isNullOrUndefined(arg.item)) {
                        idInput.value = arg.itemData.value;
                      } else {
                        idInput.value = '';
                      }
                    }
                  },
                  autofill: true,
                });
                autoObj.appendTo(args.element);
              };
              cols[1].edit.read = function (args: any) {
                const ej2Instance = args.ej2_instances[0];
                return ej2Instance.value + '-' + ej2Instance.text;
              };
              gridObj.refresh();
            }
          }
          if (selectedTab) {
            selectedTab.call(tabObj, args);
          }
        };
      }
    }
  };

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id="Dialog" ref={ganttInstance} dataSource={dialogData} taskFields={taskFields} resourceFields={resourceFields} resources={dataResources}
          editSettings={editSettings} toolbar={toolbar} renderBaseline={true} treeColumnIndex={1} taskMode="Custom" allowSelection={true} showColumnMenu={true}
          splitterSettings={splitterSettings} gridLines="Both" highlightWeekends={true} timelineSettings={timelineSettings} labelSettings={labelSettings} allowResizing={true}
          taskbarHeight={25} rowHeight={46} height="650px" projectStartDate={new Date('03/30/2025')} projectEndDate={new Date('07/19/2025')} actionComplete={actionComplete}>
          <ColumnsDirective>
            <ColumnDirective field="TaskID" headerText="Task ID" width="110" />
            <ColumnDirective field="TaskName" headerText="Task Name" width="200" />
            <ColumnDirective field="StartDate" headerText="Start Date" />
            <ColumnDirective field="Duration" headerText="Duration" />
            <ColumnDirective field="ConstraintType" width="173" />
            <ColumnDirective field="ConstraintDate" width="176" />
            <ColumnDirective field="isManual" width="150" />
            <ColumnDirective field="Work" />
          </ColumnsDirective>
          <AddDialogFieldsDirective>
            <AddDialogFieldDirective
              type="General"
              fields={['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress']} />
            <AddDialogFieldDirective type="Dependency" />
            <AddDialogFieldDirective
              type="Resources"
              additionalParams={{
                allowFiltering: true,
                allowSorting: true,
                allowResizing: true,
                showColumnMenu: true,
                columns: [
                  { field: 'resourceId', width: 80 },
                  {
                    field: 'resourceName',
                    headerText: 'Resource Name',
                    width: 180,
                    template: '<div><img src="src/gantt/images/${resourceName}.png" style="height:25px;width:25px" /><div style="display:inline-block;width:100%;position:relative;left:5px">${resourceName}</div></div>',
                  },
                  { field: 'unit', width: 92 },
                  {
                    field: 'role',
                    headerText: 'Role',
                    allowEditing: false,
                    width: 120,
                  },
                ],
                filterSettings: { type: 'Menu' },
              }} />
            <AddDialogFieldDirective type="Segments" />
            <AddDialogFieldDirective
              type="Advanced"
              fields={['ConstraintType', 'ConstraintDate', 'isManual', 'Work']}
            />
          </AddDialogFieldsDirective>
          <EditDialogFieldsDirective>
            <EditDialogFieldDirective
              type="General"
              fields={['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress']} />
            <EditDialogFieldDirective
              type="Dependency"
              additionalParams={{
                allowSorting: true,
                toolbar: ['Add', 'Edit', 'Delete', 'Search'],
                editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
                searchSettings: { fields: ['name'], ignoreCase: true },
              }} />
            <EditDialogFieldDirective
              type="Resources"
              additionalParams={{
                allowFiltering: true,
                allowSorting: true,
                allowResizing: true,
                showColumnMenu: true,
                columns: [
                  { field: 'resourceId', width: 80 },
                  {
                    field: 'resourceName',
                    headerText: 'Resource Name',
                    width: 180,
                    template: '<div><img src="src/gantt/images/${resourceName}.png" style="height:25px;width:25px" /><div style="display:inline-block;width:100%;position:relative;left:5px">${resourceName}</div></div>',
                  },
                  { field: 'unit', width: 92 },
                  {
                    field: 'role',
                    headerText: 'Role',
                    allowEditing: false,
                    width: 120,
                  },
                ],
                filterSettings: { type: 'Menu' },
              }} />
            <EditDialogFieldDirective
              type="Segments"
              additionalParams={{
                allowFiltering: true,
                allowSorting: true,
                allowReordering: true,
                allowResizing: true,
                toolbar: ['Add', 'Edit', 'Delete'],
                editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
                filterSettings: { type: 'Menu' },
              }} />
            <EditDialogFieldDirective
              type="Advanced"
              fields={['ConstraintType', 'ConstraintDate', 'isManual', 'Work']}
            />
          </EditDialogFieldsDirective>

          <Inject services={[Selection, Edit, DayMarkers, ColumnMenu, Toolbar, Filter, Reorder, Sort, Resize]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates dialog editing in the Gantt Chart using a software development project workflow. The add and edit dialogs are customized with dedicated tabs for task details, dependencies, resources, segments, and advanced scheduling options.
        </p>
      </div>

      <div id="description">
        <p>This sample demonstrates how to fully customize the dialog editing interface in the React Gantt Chart using the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/addDialogFieldSettings/">addDialogFields</a></code> and <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/editDialogFieldSettings/">editDialogFields</a></code> properties along with <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/editDialogFieldSettings/#additionalparams">additionalParams</a></code>. It showcases how to override default input and grid components within each tab and organize custom fields across multiple tabs for a structured editing experience.
          The following tab-level customizations are included:</p>
        <ul>
          <li><b>Dependency Tab</b> - Includes additional toolbar items and improved task naming to simplify task relationship management.</li>
          <li><b>Resource Tab</b> - Combines resource images and names, introduces a Role column, and supports column menu options for flexible configuration.</li>
          <li><b>Segments Tab</b> - Enhanced with extra toolbar options for efficient segment editing and control.</li>
          <li><b>Advanced Tab</b> - Organizes Work and Task Mode input fields for quick access and improved clarity.</li>
        </ul>
        <p>Gantt component features are segregated into individual feature-wise modules. To use edit, columnMenu, filter, reorder, sort, resize, toolbar, markers and selection features, we need to inject <code>Edit</code>, <code>ColumnMenu</code>, <code>Filter</code>, <code>Reorder</code>, <code>Sort</code>, <code>Resize</code>, <code>Toolbar</code>, <code>DayMarkers</code> and <code>Selection</code> into the <code>Inject Services</code> section.</p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/managing-tasks/editing-tasks#edit-tasks-via-dialog">editing tasks</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  );
};

export default GanttDialogEditing;