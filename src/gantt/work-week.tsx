import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';

const emptyCss=`
.property-panel-table div {
  padding-top: 0px}`;
export class WorkWeek extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  public multiselectObj: MultiSelectComponent;
  public workDays: { [key: string]: Object }[] = [
        { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' },
  ];
  public defaultValue: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  private select(args: any): void {
    let workingDays: any = extend([], this.multiselectObj.value, [], true);
    workingDays.push(args.itemData.day);
    this.ganttInstance.workWeek = workingDays;
  };
  private removed(args: any): void {
    let index = this.ganttInstance.workWeek.indexOf(args.itemData.day);
    if (index !== -1) {
      this.ganttInstance.workWeek = (this.multiselectObj.value as string[]);
    }
  };

  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public workWeek: any = ["Monday", "Tuesday", "Wednesday","Thursday","Friday"];
  public projectStartDate: Date = new Date('03/24/2024');
  public projectEndDate: Date = new Date('07/06/2024');
  public splitterSettings = {
    columnIndex: 1
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <GanttComponent id='WorkWeek' ref={gantt => this.ganttInstance = gantt} dataSource={projectNewData} treeColumnIndex={1}
              highlightWeekends={true} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
              splitterSettings={this.splitterSettings} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Selection, DayMarkers ]} />
            </GanttComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <tbody>
              <colgroup>
                <col style={{width:'30%'}} />
                <col style={{width:'70%'}} />
              </colgroup>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>
                      <label htmlFor="WorkWeek">Working Days</label>
                    </div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div style={{ paddingTop: '0px'}}>
                    <MultiSelectComponent ref={multiselect=> this.multiselectObj = multiselect} id="WorkWeek" style={{ padding: '2px' }} mode="CheckBox" value={this.defaultValue}
                          dataSource={this.workDays} showDropDownIcon={true} popupHeight='350px' fields={{ text: 'day', value: 'id' }}
                          select={this.select.bind(this)} removed={this.removed.bind(this)}>
                          <Inject services={[CheckBoxSelection]}></Inject>
                      </MultiSelectComponent>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <style>
          {emptyCss}
        </style>
        <div id="action-description">
        <p>This sample visualizes the support for changing different set of working days in a week. The selected working days in drop down list will be applied to Gantt chart.</p>
        </div>

        <div id="description">
        <p>
        In this example, you can see how to render a Gantt chart with the provided data source and customizable array of working days. These working days alone will be considered for taskbar rendering and duration calculations.        
    </p>
    <p>
        The working days in your project can be customized using the <code>workWeek</code> property and the selected days in the dropdown list available in the property panel will be applied to Gantt chart. You can get to know the working days in the Gantt chart timeline by the highlighted weekend days. This can be enabled by using the <code>highlightWeekends</code> property
    </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
            <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
        </div>
      </div>
    )
  }
}
