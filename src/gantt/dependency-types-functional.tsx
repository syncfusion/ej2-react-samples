import * as React from 'react';
import { useEffect, useState } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, Toolbar, Edit, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, ToolbarItem, DependencyType } from '@syncfusion/ej2-react-gantt';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { dependencyData } from './data';
import { updateSampleSection } from '../common/sample-base';

const DependencyTypes = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);

  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentID',
  };

  const dependencyTypeData: { text: string; value: string }[] = [
    { text: 'Finish to Start (FS)', value: 'FS' },
    { text: 'Start to Start (SS)', value: 'SS' },
    { text: 'Finish to Finish (FF)', value: 'FF' },
    { text: 'Start to Finish (SF)', value: 'SF' },
  ];

  const [dependencyType, setDependencyType] = useState<string[]>(['FS', 'SS', 'FF', 'SF']);

  const allowedDependencyTypes: DependencyType[] = dependencyType as DependencyType[];

  const onDependencyTypeChange = (args: any) => {
    setDependencyType(args.value as string[]);
  };

  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName',
  };

  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 3,
  };

  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  const toolbar: ToolbarItem[] = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  const projectStartDate: Date = new Date('01/01/2026');

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='property-panel' style={{ marginBottom: '12px' }}>
          
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ margin: 0 }}>Allowed Dependency Types:</label>
              <MultiSelectComponent
                id='allowedDependencyType'
                dataSource={dependencyTypeData}
                fields={{ text: 'text', value: 'value' }}
                value={dependencyType}
                mode='CheckBox'
                change={onDependencyTypeChange}
                popupHeight='220px'
                showDropDownIcon={true}
                showClearButton={false}
                width='240px'
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
            </div>
        
        </div>
        <GanttComponent
          id='DependencyTypes'
          dataSource={dependencyData}
          taskFields={taskFields}
          allowSelection={true}
          highlightWeekends={true}
          toolbar={toolbar}
          editSettings={editSettings}
          splitterSettings={splitterSettings}
          height='650px'
          taskbarHeight={25}
          rowHeight={46}
          treeColumnIndex={1}
          labelSettings={labelSettings}
          projectStartDate={projectStartDate}
          gridLines='Both'
          allowedDependencyTypes={allowedDependencyTypes}
        >
          <ColumnsDirective>
            <ColumnDirective field='TaskID' visible={false} />
            <ColumnDirective field='TaskName' headerText='Task Name' width='200' />
            <ColumnDirective field='Predecessor' headerText='Dependency' width='140' />
            <ColumnDirective field='StartDate' headerText='Start Date' width='130' />
            <ColumnDirective field='Duration' headerText='Duration' width='110' />
            <ColumnDirective field='Progress' headerText='Progress' width='100' />
          </ColumnsDirective>
          <Inject services={[Edit, Selection, Toolbar]} />
        </GanttComponent>
      </div>

      <div id='action-description'>
        <p>
          The Gantt Chart supports dependency types to define relationships between tasks or features, helping control execution order and project sequencing.
        </p>
      </div>

      <div id='description'>
        <p>
          The Gantt chart supports various dependency relationship types to manage task links. The <code>allowedDependencyTypes</code> 
          API is used to restrict the dependency types available during task editing and dependency creation.
        </p>
        <p>
        The different types of dependency are as follows:
        </p>
        <ul>
          <li><code>FS</code> - Finish to Start</li>
          <li><code>SS</code> - Start to Start</li>
          <li><code>FF</code> - Finish to Finish</li>
          <li><code>SF</code> - Start to Finish</li>
        </ul>
        <p>
          When the dependency type list is configured, the Gantt validates newly created or modified links against the selected
          relationship types.
        </p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use edit, toolbar, and selection features, we need to inject <code>Edit</code>, <code>Toolbar</code>, and <code>Selection</code> into the <code>Inject Services</code> section.</p>
        <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/task-dependency">task dependency</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  );
};

export default DependencyTypes;
