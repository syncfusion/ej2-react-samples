import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { workTimeRange } from './data';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';

export class WorkingTimeRange extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  private workStartTime: NumericTextBoxComponent;
  private workEndTime: NumericTextBoxComponent;
  public isTimeUpdated: boolean = false;
  public updateTime(): any {
    let defaultDate: string = "08/08/2016", startDate: Date = new Date(defaultDate), endDate: Date = new Date(defaultDate);
    let decPlace: number =  this.workStartTime.value - Math.floor(this.workStartTime.value);
    startDate.setHours(this.workStartTime.value);
    startDate.setMinutes(decPlace * 60);
    decPlace = this.workEndTime.value - Math.floor(this.workEndTime.value);
    endDate.setHours(this.workEndTime.value);
    endDate.setMinutes(decPlace * 60);
       
    /*Validate time value and update the time range*/
    if (startDate.getTime() < endDate.getTime() && this.isTimeUpdated == false) {
      let workingTime: object[] = [{ from: this.workStartTime.value, to: this.workEndTime.value }];
      this.ganttInstance.dayWorkingTime = workingTime;
      this.isTimeUpdated = false;
    }
    else {
      this.isTimeUpdated = true;
      this.workStartTime.value = this.ganttInstance.dayWorkingTime[0].from;
      this.workEndTime.value = this.ganttInstance.dayWorkingTime[this.ganttInstance.dayWorkingTime.length - 1].to;
        }
    this.isTimeUpdated = false;
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
  public timelineSettings: any = {
    topTier: {
      unit: 'Day',
    },
    bottomTier: {
      unit: 'Hour',
    }
  };
  public durationUnit: string = 'hour';
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public projectStartDate: Date = new Date('04/02/2019');
  public projectEndDate: Date = new Date('04/28/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <GanttComponent id='WorkingTimeRange' ref={gantt => this.ganttInstance = gantt} dataSource={workTimeRange}
              highlightWeekends={true} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
              timelineSettings={this.timelineSettings} durationUnit={this.durationUnit}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <Inject services={[Selection, DayMarkers ]} />
            </GanttComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <colgroup>
                <col style={{width:'55%'}} />
                <col style={{width:'45%'}} />
              </colgroup>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ fontSize: '15px' }}>Work Start Time</div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ paddingTop: '0px'}}>
                    <NumericTextBoxComponent ref={NumericTextBox => this.workStartTime = NumericTextBox} value={8} min={0} max={24} showSpinButton={true} width='150px' step={0.5} change={this.updateTime.bind(this)}></NumericTextBoxComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ fontSize: '15px' }}>Work End Time</div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ paddingTop: '0px'}}>
                    <NumericTextBoxComponent ref={NumericTextBox => this.workEndTime = NumericTextBox} value={17} min={0} max={24} showSpinButton={true} width='150px' step={0.5} change={this.updateTime.bind(this)}></NumericTextBoxComponent>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
        <p>This sample visualizes the support for changing the working hours in a day. The selected start and end hours from the property panel will be applied to each task available in the project.</p>
        </div>

        <div id="description">
        <p>
        In this example, you can see how to render a Gantt chart with the provided data source and customizable working hours in a day. You can split the working hours in a day to one or more range. So, You can also provide the <code>dayWorkingTime</code> property value as array of object collection. Gantt chart also supports different <code>durationUnit</code> values as follows:
        <li><code>day</code></li>
        <li><code>hour</code></li>       
        <li><code>minute</code></li>
    </p>
    <p>Given duration in dataSource will be considered with this unit. In this demo, the <code>hour</code> unit is used to render taskbars in day hour timeline mode. Gantt chart supports only 24hours format as of now. The working hours will differ between organizations. This feature will be helpful to keep track of each task and resource task status based on the working time of company.</p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
            <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
        </div>
      </div>
    )
  }
}
