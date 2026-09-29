import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, Toolbar, Edit, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, ToolbarItem, DependencyType } from '@syncfusion/ej2-react-gantt';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { dependencyData } from './data';
import { SampleBase } from '../common/sample-base';

export class DependencyTypes extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentID',
  };

  public dependencyTypeData: { text: string; value: string }[] = [
    { text: 'Finish to Start (FS)', value: 'FS' },
    { text: 'Start to Start (SS)', value: 'SS' },
    { text: 'Finish to Finish (FF)', value: 'FF' },
    { text: 'Start to Finish (SF)', value: 'SF' },
  ];

  public dependencyType: string[] = ['FS', 'SS', 'FF', 'SF'];

  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName',
  };

  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 3,
  };

  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  public toolbar: ToolbarItem[] = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  public projectStartDate: Date = new Date('01/04/2026');

  public getAllowedDependencyTypes(): DependencyType[] {
    return this.dependencyType as DependencyType[];
  }

  public onDependencyTypeChange(args: any): void {
    this.dependencyType = args.value as string[];
    this.setState({});
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='property-panel' style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ margin: 0 }}>Allowed Dependency Types:</label>
                <MultiSelectComponent
                  id='allowedDependencyType'
                  dataSource={this.dependencyTypeData}
                  fields={{ text: 'text', value: 'value' }}
                  value={this.dependencyType}
                  mode='CheckBox'
                  change={this.onDependencyTypeChange.bind(this)}
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
            taskFields={this.taskFields}
            allowSelection={true}
            highlightWeekends={true}
            toolbar={this.toolbar}
            editSettings={this.editSettings}
            splitterSettings={this.splitterSettings}
            height='650px'
            taskbarHeight={25}
            rowHeight={46}
            treeColumnIndex={1}
            labelSettings={this.labelSettings}
            // projectStartDate={this.projectStartDate}
            gridLines='Both'
            allowedDependencyTypes={this.getAllowedDependencyTypes()}
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
  }
}
