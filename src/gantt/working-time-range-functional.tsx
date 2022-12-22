import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, DurationUnit, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { workTimeRange } from './data';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';

function WorkingTimeRange() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance: GanttComponent;
  let workStartTime: NumericTextBoxComponent;
  let workEndTime: NumericTextBoxComponent; let isTimeUpdated: boolean = false;
  const updateTime = () => {
    let defaultDate: string = "08/08/2016", startDate: Date = new Date(defaultDate), endDate: Date = new Date(defaultDate);
    let decPlace: number = workStartTime.value - Math.floor(workStartTime.value);
    startDate.setHours(workStartTime.value);
    startDate.setMinutes(decPlace * 60);
    decPlace = workEndTime.value - Math.floor(workEndTime.value);
    endDate.setHours(workEndTime.value);
    endDate.setMinutes(decPlace * 60);

    /*Validate time value and update the time range*/
    if (startDate.getTime() < endDate.getTime() && isTimeUpdated == false) {
      let workingTime: object[] = [{ from: workStartTime.value, to: workEndTime.value }];
      ganttInstance.dayWorkingTime = workingTime;
      isTimeUpdated = false;
    }
    else {
      isTimeUpdated = true;
      workStartTime.value = ganttInstance.dayWorkingTime[0].from;
      workEndTime.value = ganttInstance.dayWorkingTime[ganttInstance.dayWorkingTime.length - 1].to;
    }
    isTimeUpdated = false;
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
  const projectStartDate: Date = new Date('04/02/2019');
  const projectEndDate: Date = new Date('04/28/2019');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='WorkingTimeRange' ref={gantt => ganttInstance = gantt} dataSource={workTimeRange}
            highlightWeekends={true} taskFields={taskFields} labelSettings={labelSettings} height='410px'
            timelineSettings={timelineSettings} durationUnit={durationUnit}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div className='col-lg-4 property-section'>
          <PropertyPane title='Properties'>
            <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <colgroup>
                <col style={{ width: '55%' }} />
                <col style={{ width: '45%' }} />
              </colgroup>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ fontSize: '15px' }}>Work Start Time</div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ paddingTop: '0px' }}>
                    <NumericTextBoxComponent ref={NumericTextBox => workStartTime = NumericTextBox} value={8} min={0} max={24} showSpinButton={true} width='150px' step={0.5} change={updateTime}></NumericTextBoxComponent>
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
                  <div style={{ paddingTop: '0px' }}>
                    <NumericTextBoxComponent ref={NumericTextBox => workEndTime = NumericTextBox} value={17} min={0} max={24} showSpinButton={true} width='150px' step={0.5} change={updateTime}></NumericTextBoxComponent>
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
export default WorkingTimeRange;
