import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, DurationUnit, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { workTimeRange } from './data';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
export class WorkingTimeRange extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  private workStartTime: NumericTextBoxComponent;
  private workEndTime: NumericTextBoxComponent;
  private workStartTime1: NumericTextBoxComponent;
  private workEndTime1: NumericTextBoxComponent;
  public selectObj: DropDownListComponent;
  public isTimeUpdated: boolean = false;
  public workDays: { [key: string]: Object }[] = [
    { id: 'Monday', day: 'Monday' },
    { id: 'Tuesday', day: 'Tuesday' },
    { id: 'Wednesday', day: 'Wednesday' },
    { id: 'Thursday', day: 'Thursday' },
    { id: 'Friday', day: 'Friday' },
];
public defaultValue: string = "Monday";
  private select(args: any): void {
    let startTime: number = 8;
    let endTime: number = 17;
    for(let i=0;i<this.ganttInstance.weekWorkingTime.length;i++) {
        if(this.ganttInstance.weekWorkingTime[i].dayOfWeek === args.item.innerText) {
            startTime = this.ganttInstance.weekWorkingTime[i].timeRange[0].from;
            endTime = this.ganttInstance.weekWorkingTime[i].timeRange[0].to;
            break;
        }
    }
    this.workStartTime1.value = startTime;
    this.workEndTime1.value = endTime;
  };
  private change1(args: any): void {
    if (this.workStartTime.value >= this.workEndTime.value) {
            if(this.workStartTime.value < 24) {
               this.workEndTime.value = this.workStartTime.value + 1.00;
            }
            else {
                this.workEndTime.value = 0.00;
            }
        }
  };
  private change2(args: any): void {
    if (this.workStartTime1.value >= this.workEndTime1.value) {
            if(this.workStartTime1.value < 24) {
               this.workEndTime1.value = this.workStartTime1.value + 1.00;
            }
            else {
                this.workEndTime1.value = 0.00;
            }
        }
  };
  private perform(): void {
    let selectedDay = this.selectObj.value;
    let workingTime: any = [];
    let weekWorkingTime = this.ganttInstance.weekWorkingTime;
    let isUpdated = false;
    for (let i = 0; i < weekWorkingTime.length; i++) {
      workingTime.push({ dayOfWeek: weekWorkingTime[i].dayOfWeek, timeRange: weekWorkingTime[i].timeRange });
    }
    for(let i=0;i<workingTime.length;i++) {
        if(workingTime[i].dayOfWeek === selectedDay) {
            workingTime[i].dayOfWeek= workingTime[i].dayOfWeek;
            workingTime[i].timeRange = [{ from: this.workStartTime1.value, to: this.workEndTime1.value }]
            isUpdated = true;
            break;
        }
    }
    if(!isUpdated) {
      workingTime.push({ dayOfWeek: selectedDay, timeRange: [{ from: this.workStartTime1.value, to: this.workEndTime1.value }] });
    }
    this.ganttInstance.weekWorkingTime = workingTime;
  }
  private update(): void {
    let workingTime = [{ from: this.workStartTime.value, to: this.workEndTime.value }];
    this.ganttInstance.dayWorkingTime = workingTime;
  }
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
  public timelineSettings: any = {
    topTier: {
      unit: 'Day',
    },
    bottomTier: {
      unit: 'Hour',
    }
  };
  public durationUnit: DurationUnit = 'Hour';
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public projectStartDate: Date = new Date('04/02/2024');
  public projectEndDate: Date = new Date('04/28/2024');
  public splitterSettings = {
    columnIndex: 1
};
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <GanttComponent id='WorkingTimeRange' ref={gantt => this.ganttInstance = gantt} dataSource={workTimeRange}
              highlightWeekends={true} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
              timelineSettings={this.timelineSettings} durationUnit={this.durationUnit} splitterSettings={this.splitterSettings}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskName' width='270'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Selection, DayMarkers ]} />
            </GanttComponent>
          </div>
          <div className='col-lg-4 property-section' style={{paddingLeft : '0px'}}>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%',paddingLeft : '0px' }}>
                <colgroup>
                  <col style={{ width: '55%' }} />
                  <col style={{ width: '45%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <label htmlFor='Time range'>Time Range for all days</label>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '10px' }}>
                      <div>Work Start Time</div>
                    </td>
                    <td>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.workStartTime = NumericTextBox} id='workStart' value={8} min={0} max={24} showSpinButton={true} change={this.change1.bind(this)} width='125px' step={0.5} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '10px' }}>
                      <div>Work End Time</div>
                    </td>
                    <td>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.workEndTime = NumericTextBox} id='workEnd' value={8} min={0} max={24} showSpinButton={true} change={this.change1.bind(this)} width='125px' step={0.5} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div>
                        <ButtonComponent onClick={this.update.bind(this)}>Update for all days</ButtonComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <label htmlFor='Time Range' style={{ marginTop: '20px' }}>Time Range for each day</label>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '10px' }}>
                      <div>Working Days</div>
                    </td>
                    <td>
                      <div>
                        <DropDownListComponent ref={dropselect => this.selectObj = dropselect} id="WorkWeek" value={this.defaultValue}
                          dataSource={this.workDays} width='100%' popupHeight='350px' fields={{ text: 'day', value: 'id' }}
                          select={this.select.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '10px' }}>
                      <div>Work Start Time</div>
                    </td>
                    <td>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.workStartTime1 = NumericTextBox} id='workStart' value={8} min={0} max={24} showSpinButton={true} change={this.change2.bind(this)} width='125px' step={0.5} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '10px' }}>
                      <div>Work End Time</div>
                    </td>
                    <td>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.workEndTime1 = NumericTextBox} id='workEnd' value={8} min={0} max={24} showSpinButton={true} change={this.change2.bind(this)} width='125px' step={0.5} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div>
                        <ButtonComponent onClick={this.perform.bind(this)}>Update for each day</ButtonComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
        <p>This sample visualizes the support for changing the working hours in a day. The selected start and end hours from the property panel will be applied to each task available in the project.</p>
        </div>

        <div id="description">
        <p>
        In this example, you can see how to render a Gantt Chart with the provided data source and customizable working hours in a day. You can split the working hours in a day to one or more range. So, you can also provide the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#dayworkingtime">
          dayworkingtime</a> property value as array of object collection. Gantt Chart also supports different <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#durationunit">
          durationUnit</a> values as follows:
          <ul>
          <li><code>day</code></li>
          <li><code>hour</code></li>
          <li><code>minute</code></li>
          </ul>
        </p>
        <p>You can also set different working time range for different working days using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#weekworkingtime">
        weekWorkingTime</a> property. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#weekworkingtime">
        weekWorkingTime</a> property enables you to specify different working hours for each day of the week in your Gantt Chart.
        By configuring this property, you can ensure that tasks are only scheduled during defined working periods, avoiding non-working hours.</p>
        <p>Given duration in dataSource will be considered with this unit. In this demo, the <code>hour</code> unit is used to render taskbars in day hour timeline mode. Gantt Chart supports only 24hours format as of now. The working hours will differ between organizations. This feature will be helpful to keep track of each task and resource task status based on the working time of company.</p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
          <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
      </div>
    </div>
    )
  }
}
