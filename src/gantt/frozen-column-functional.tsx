import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, Freeze, ColumnModel, Toolbar } from '@syncfusion/ej2-react-gantt';
import { frozenColumnsData, resourceCollection } from './data';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { freezeDirection } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import './frozen-column.css'
const FrozenColumns = () => {
    useEffect(() => {
        updateSampleSection();
      }, [])
    let ganttInstance = useRef<GanttComponent>(null);
    let columnDropDown = useRef<DropDownListComponent>(null);
    let directionDropDown = useRef<DropDownListComponent>(null);
    let columnValue: any= 'TaskID';
    let directionValue : any = 'Left';
    const leftColumns: { id: string; name: string }[] =  [{ id: 'TaskID', name: 'Task ID' },
      { id: 'TaskName', name: 'Task Name' },
      { id: 'StartDate', name: 'Start Date' },
      { id: 'EndDate', name: 'End Date' },
      { id: 'Duration', name: 'Duration' },
      { id: 'Progress', name: 'Progress' },
      { id: 'Predecessor', name: 'Dependency'},
      { id: 'Resources', name: 'Assignee' },
      { id: 'Designation', name: 'Designation' },
      { id: 'Status', name: 'Status' },
    ];
    const directions: { id: string; name: string }[] = [
      { id: 'Left', name: 'Left' },
      { id: 'Right', name: 'Right' },
      { id: 'Fixed', name: 'Fixed' },
      { id: 'None', name: 'None' },
    ];
    let refresh: boolean = true;
    const columnChange = (e: ChangeEventArgs) : void => {
      let columnName: any = e.value;
      columnValue = columnName;
      let column: ColumnModel = ganttInstance.current.getColumnByField(columnName, ganttInstance.current.columns as ColumnModel[]);
      let value: string = column.freeze === undefined ? 'None' : column.freeze;
      refresh = directionDropDown.current.value === value;
      directionDropDown.current.value = value;
    }
    const directionChange = (e: ChangeEventArgs): void => {
      if (refresh) {
        let columnName: any = columnDropDown.current.value;
        directionValue = e.value;
        let columns : ColumnModel[] = ganttInstance.current.getGanttColumns();
        let column = columns.find((col) => col.field === columnName);
        if (column) {
            column.freeze = e.value === 'None' ? 'None' : e.value as freezeDirection;
            ganttInstance.current.columns = columns;
        }
      }
      refresh = true;
    }
    const taskFields: any = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency:'Predecessor',
      parentID: 'ParentID',
      resourceInfo: 'Resources',
    };
    const labelSettings: any = {
      leftLabel: 'TaskName',
      taskLabel: 'Progress'
    };
    const resourceFields: any = {
        id: 'resourceId',
        name: 'resourceName',
    }
    const timelineSettings: any={
        showTooltip: true,
        topTier: {
            unit: 'Week',
            format: 'dd/MM/yyyy'
        },
        bottomTier: {
            unit: 'Day',
            count: 1
        }
    };
    const toolbar: any = [
        {
          align: 'Left',
          template: '<div class="left-label"><label>Columns:</label></div>'
        },
        {
          align: 'Left',
          template: () => (
          <DropDownListComponent
            id="columnDD" ref={columnDropDown}
            value={columnValue}
            change={columnChange}
            dataSource={leftColumns}
            fields={{ value: 'id', text: 'name' }}
          />
        ),
        },
        {
          align: 'Left',
          template: '<div class="right-label"><label>Freeze Direction:</label></div>'
        },
        {
          align: 'Left',
          template: ()=>(
           <DropDownListComponent id= "directionDD" ref={directionDropDown}
            value= {directionValue}
            change= {directionChange}
            dataSource= {directions}
            fields={{ value: 'id', text: 'name' }} />
          )
        },
      ];
    const projectStartDate: Date = new Date('02/27/2025');
    const projectEndDate: Date = new Date('05/04/2025');
    const splitterSettings: any={
      position: '70%'
    };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='frozenColumns' ref={ganttInstance} dataSource={frozenColumnsData} treeColumnIndex={1} splitterSettings={splitterSettings}
          taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46} timelineSettings={timelineSettings} resources={resourceCollection}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} allowSelection = {false} toolbar={toolbar} resourceFields={resourceFields}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' freeze='Left' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Task Name' freeze='Left'></ColumnDirective>
            <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
            <ColumnDirective field='Duration' headerText='Duration'></ColumnDirective>
            <ColumnDirective field='EndDate' headerText='End Date'></ColumnDirective>
            <ColumnDirective field='Progress' headerText='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
            <ColumnDirective field='Resources' headerText='Assignee' freeze='Right'></ColumnDirective>
            <ColumnDirective field='Designation' headerText='Designation'></ColumnDirective>
            <ColumnDirective field='Status' headerText='Status'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, Freeze, Toolbar]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>
            This sample demonstrates the column freezing feature in the Gantt Chart. Frozen columns remain fixed while other columns scroll horizontally, improving readability.
        </p>
      </div>
          <div id="description">
              <p>The freezing feature allows users to freeze specfied number of columns while scrolling the remaining content.
                  The freezing behavior can be configured using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#frozencolumns">frozenColumns</a> property.
                  Additionally, to keep specific columns visible during horizontal scrolling, use the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnmodel#freeze">column.freeze</a> property on the relevant columns to freeze them to the <code>Left</code>, <code>Right</code> or <code>Fixed</code>.
              </p>
              <p>In this example, the <b>Task ID</b> and <b>Task Name</b> columns are frozen on the left, and the <b>Assignee</b> column is frozen on the right using the <code className="code">column.freeze</code> property.
                  Gantt component features are segregated into individual feature-wise modules. To use column freezing, inject the <code
                      className="code">Freeze</code> module.
              </p>
              <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/getting-started#adding-gantt-component">documentation section</a>.</p>
          </div>
    </div>
  )
}
export default FrozenColumns;