import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, Freeze, ColumnModel, Toolbar } from '@syncfusion/ej2-react-gantt';
import { frozenColumnsData, resourceCollection } from './data';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { freezeDirection } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import './frozen-column.css'
export class FrozenColumns extends SampleBase<{}, {}> {
    
    private ganttInstance: GanttComponent;
    private columnDropDown: DropDownListComponent;
    private directionDropDown: DropDownListComponent;
    public columnValue: any = "TaskID";
    public directionValue: any = "Left";
    public leftColumns: { id: string; name: string }[] =  [{ id: 'TaskID', name: 'Task ID' },
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
    public directions: { id: string; name: string }[] = [
      { id: 'Left', name: 'Left' },
      { id: 'Right', name: 'Right' },
      { id: 'Fixed', name: 'Fixed' },
      { id: 'None', name: 'None' },
    ];
    public refresh: boolean = true;
    public columnChange = (e: ChangeEventArgs) : void => {
      let columnName: any = e.value;
      this.columnValue = columnName;
      let column: ColumnModel = this.ganttInstance.getColumnByField(columnName, this.ganttInstance.columns as ColumnModel[]);
      let value: string = column.freeze === undefined ? 'None' : column.freeze;
      this.refresh = this.directionDropDown.value === value
      this.directionDropDown.value = value;
    }
    public directionChange = (e: ChangeEventArgs): void => {
      if (this.refresh) {
        let columnName: any = this.columnDropDown.value;
        this.directionValue = e.value;
        let columns : ColumnModel[] = this.ganttInstance.getGanttColumns();
        let column = columns.find((col) => col.field === columnName);
        if (column) {
            column.freeze = e.value === 'None' ? 'None' : e.value as freezeDirection;
            this.ganttInstance.columns = columns;
        }
      }
      this.refresh = true;
    }
    public taskFields: any = {
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
    public labelSettings: any = {
      leftLabel: 'TaskName',
      taskLabel: 'Progress'
    };
    public resourceFields: any = {
        id: 'resourceId',
        name: 'resourceName',
    }
    public timelineSettings: any={
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
    public toolbar: any = [
        {
          align: 'Left',
          template: '<div class="left-label"><label>Columns:</label></div>'
        },
        {
          align: 'Left',
          template: () => (
          <DropDownListComponent
            id="columnDD" ref={cd=>this.columnDropDown=cd}
            value={this.columnValue}
            change={this.columnChange}
            dataSource={this.leftColumns}
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
           <DropDownListComponent id= "directionDD" ref={d=>this.directionDropDown=d}
            value= {this.directionValue}
            change= {this.directionChange}
            dataSource= {this.directions}
            fields={{ value: 'id', text: 'name' }} />
          )
        },
      ];
    public projectStartDate: Date = new Date('02/27/2025');
    public projectEndDate: Date = new Date('05/04/2025');
    public splitterSettings: any={
      position: '70%'
    };
    render(){
        return(
            <div className='control-pane'>
              <div className='control-section'>
                <GanttComponent id='frozenColumns' ref={g=>this.ganttInstance=g} dataSource={frozenColumnsData} treeColumnIndex={1} splitterSettings={this.splitterSettings}
                  taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46} timelineSettings={this.timelineSettings} resources={resourceCollection}
                  projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} allowSelection = {false} toolbar={this.toolbar} resourceFields={this.resourceFields}>
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
}