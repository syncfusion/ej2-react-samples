import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, DurationUnit, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { workTimeRange } from './data';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const WorkingTimeRange = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  let workStartTime = useRef<NumericTextBoxComponent>(null);
  let workStartTime1 = useRef<NumericTextBoxComponent>(null);
  let workEndTime1 = useRef<NumericTextBoxComponent>(null);
  let dropselectObj = useRef<DropDownListComponent>(null);
  let workEndTime = useRef<NumericTextBoxComponent>(null);
  let isTimeUpdated: boolean = false;
  let workDays: { [key: string]: Object }[] = [
    { id: 'Monday', day: 'Monday' },
    { id: 'Tuesday', day: 'Tuesday' },
    { id: 'Wednesday', day: 'Wednesday' },
    { id: 'Thursday', day: 'Thursday' },
    { id: 'Friday', day: 'Friday' },
  ];
  const defaultValue: string = "Monday";
  const select = (args: any): void => {
    let startTime: number = 8;
    let endTime: number = 17;
    for(let i=0;i<ganttInstance.current.weekWorkingTime.length;i++) {
        if(ganttInstance.current.weekWorkingTime[i].dayOfWeek === args.item.innerText) {
            startTime = ganttInstance.current.weekWorkingTime[i].timeRange[0].from;
            endTime = ganttInstance.current.weekWorkingTime[i].timeRange[0].to;
            break;
        }
    }
    workStartTime1.current.value = startTime;
    workEndTime1.current.value = endTime;
  };
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const timelineSettings: any = {
    topTier: {
      unit: 'Day',
    },
    bottomTier: {
      unit: 'Hour',
    }
  };
  const durationUnit: DurationUnit = 'Hour';
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const projectStartDate: Date = new Date('04/02/2024');
  const projectEndDate: Date = new Date('04/28/2024');
  const perform = (): void => {
    let selectedDay = dropselectObj.current.value;
    let workingTime: any = [];
    let weekWorkingTime = ganttInstance.current.weekWorkingTime;
    let isUpdated = false;
    for(let i = 0; i < weekWorkingTime.length; i++) {
      workingTime.push({ dayOfWeek: weekWorkingTime[i].dayOfWeek, timeRange: weekWorkingTime[i].timeRange });
    }
    for(let i = 0; i < workingTime.length; i++) {
        if(workingTime[i].dayOfWeek === selectedDay) {
            workingTime[i].dayOfWeek= workingTime[i].dayOfWeek;
            workingTime[i].timeRange = [{ from: workStartTime1.current.value, to: workEndTime1.current.value }]
            isUpdated = true;
            break;
        }
    }
    if(!isUpdated) {
      workingTime.push({ dayOfWeek: selectedDay, timeRange: [{ from: workStartTime1.current.value, to: workEndTime1.current.value }] });
    }
    ganttInstance.current.weekWorkingTime = workingTime;
  }
  const update = (): void => {
    let workingTime = [{ from: workStartTime.current.value, to: workEndTime.current.value }];
    ganttInstance.current.dayWorkingTime = workingTime;
  }
  const splitterSettings: any = {
    columnIndex: 1
};
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='WorkingTimeRange' ref={ganttInstance} dataSource={workTimeRange}
            highlightWeekends={true} taskFields={taskFields} labelSettings={labelSettings} height='410px'
            timelineSettings={timelineSettings} durationUnit={durationUnit} splitterSettings={splitterSettings}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskName' width='270'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div className='col-lg-4 property-section' style={{paddingLeft : '0px'}}>
          <PropertyPane title='Properties'>
            <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%', paddingLeft : '0px' }}>
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
                  <div id='workStartTime' style={{marginLeft: '10px', marginTop:"10px"}}>Work Start Time</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={workStartTime} id='workStart' value={8} min={0} max={24} showSpinButton={true} width='125px' step={0.5}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
              <td style={{ paddingBottom: '10px' }}>
                <div id='workEndTime' style={{marginLeft: '10px', marginTop:"10px"}}>Work End Time</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={workEndTime} id='workEnd' value={17} min={0} max={24} showSpinButton={true} width='125px' step={0.5} ></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div>
                    <ButtonComponent onClick={update.bind(this)}> Update for all days</ButtonComponent>
                  </div>
                </td>
              </tr>

              <tr style={{ height: '30px' }}>
                <td colSpan={2}>
                  <label htmlFor='Time range'>Time Range for each day</label>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '10px' }}>
                  <div>
                    <div id="WorkWeek">Working Days</div>
                  </div>
                </td>
                <td>
                  <div style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                    <DropDownListComponent ref={dropselectObj} id="WorkWeek" style={{ padding: '2px' }} value={defaultValue}
                      dataSource={workDays} width='100%' popupHeight='350px' fields={{ text: 'day', value: 'id' }}
                      select={select.bind(this)}>
                    </DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '10px' }}>
                  <div id='workStart' style={{marginLeft: '10px', marginTop:"10px"}}>Work Start Time</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={workStartTime1} id='workStart' value={8} min={0} max={24} showSpinButton={true} width='125px' step={0.5}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '10px' }}>
                  <div id='workEnd' style={{marginLeft: '10px', marginTop:"10px"}}>Work End Time</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={workEndTime1} id='workEnd' value={17} min={0} max={24} showSpinButton={true} width='125px' step={0.5} ></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div>
                    <ButtonComponent onClick={perform.bind(this)}> Update for each day</ButtonComponent>
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
        </p>
        <ul>
          <li><code>day</code></li>
          <li><code>hour</code></li>
          <li><code>minute</code></li>
        </ul>
        <p>You can also set different working time range for different working days using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#weekworkingtime">
        weekWorkingTime</a> property. The weekWorkingTime property enables you to specify different working hours for each day of the week in your Gantt Chart.
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
export default WorkingTimeRange;