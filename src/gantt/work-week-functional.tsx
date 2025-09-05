import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, CheckBox } from '@syncfusion/ej2-react-buttons';

const emptyCss = `
.property-panel-table div {
  padding-top: 0px}`;
const WorkWeek = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);

  let ganttInstance = useRef<GanttComponent>(null);
  let showWeekendCheckbox = useRef<CheckBoxComponent>(null);
  let highlightWeekendsCheckbox = useRef<CheckBoxComponent>(null);
  let multiselectObj = useRef<MultiSelectComponent>(null);
  let workDays: { [key: string]: Object }[] = [
    { id: 'Sunday', day: 'Sunday' },
    { id: 'Monday', day: 'Monday' },
    { id: 'Tuesday', day: 'Tuesday' },
    { id: 'Wednesday', day: 'Wednesday' },
    { id: 'Thursday', day: 'Thursday' },
    { id: 'Friday', day: 'Friday' },
    { id: 'Saturday', day: 'Saturday' },
  ];
  const defaultValue: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const select = (args: any): void => {
    let workingDays: any = extend([], multiselectObj.current.value, [], true);
    workingDays.push(args.itemData.day);
    ganttInstance.current.workWeek = workingDays;
  };
  const removed = (args: any): void => {
    let index = ganttInstance.current.workWeek.indexOf(args.itemData.day);
    if (index !== -1) {
      ganttInstance.current.workWeek = (multiselectObj.current.value as string[]);
    }
  };
  const showWeekendCheck = (props): any => {
    if (showWeekendCheckbox.current.checked) {
      ganttInstance.current.timelineSettings.showWeekend = true;
      ganttInstance.current.timelineModule.refreshTimeline();
    } else {
      ganttInstance.current.timelineSettings.showWeekend = false;
      ganttInstance.current.timelineModule.refreshTimeline();
    }
  }
  const highlightWeekendsCheck = (props): any => {
    if (highlightWeekendsCheckbox.current.checked) {
      ganttInstance.current.highlightWeekends = true;
      ganttInstance.current.timelineModule.refreshTimeline();
    } else {
      ganttInstance.current.highlightWeekends = false;
      ganttInstance.current.timelineModule.refreshTimeline();
    }
  }
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID:'ParentId'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const workWeek: any = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  const splitterSettings: any = {
    columnIndex: 1
  };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='WorkWeek' ref={ganttInstance} dataSource={projectNewData} treeColumnIndex={1}
            highlightWeekends={true} taskFields={taskFields} labelSettings={labelSettings} splitterSettings={splitterSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' visible={false} width='80' ></ColumnDirective>
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
                <col style={{ width: '30%' }} />
                <col style={{ width: '70%' }} />
              </colgroup>
              <tbody>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    <label htmlFor="WorkWeek">Working Days</label>
                  </div>
                </td>
                <td style={{ width: '70%',paddingBottom: '10px' }}>
                  <div style={{ paddingTop: '0px' }}>
                  <MultiSelectComponent ref={multiselectObj} id="WorkWeek" style={{ padding: '2px' }} mode="CheckBox" value={defaultValue}
                      dataSource={workDays} showDropDownIcon={true} popupHeight='350px' fields={{ text: 'day', value: 'id' }}
                      select={select.bind(this)} removed={removed.bind(this)}>
                      <Inject services={[CheckBoxSelection]}></Inject>
                    </MultiSelectComponent>
                  </div>
                </td>
              </tr>
                <tr>
                  <td style={{ width: '42%', paddingBottom: '10px',paddingTop: '10px' }}>
                    <div>Show Weekend</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <CheckBoxComponent ref={showWeekendCheckbox} id="showWeekendCheck" onClick={showWeekendCheck.bind(this)} className="checkbox" checked={true} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%', paddingBottom: '10px',paddingTop: '10px' }}>
                    <div>Highlight Weekends</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <CheckBoxComponent ref={highlightWeekendsCheckbox} id="highlightWeekendsCheck" onClick={highlightWeekendsCheck.bind(this)} className="checkbox" checked={true} />
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
        <p>This sample demonstrates how to adjust the working days within a week and manage the visibility of non-working days in the timeline, enabling customized project scheduling.</p>
      </div>

      <div id="description">
        <p>
          In this example, you can customize which days of the week are considered working days using the <a target="_blank" href="https://helpej2.syncfusion.com/react/documentation/api/gantt/#workweek">workWeek</a> property.
          Simply select your preferred working days from the dropdown list in the property panel, and they will be applied to the Gantt Chart. Weekends can be highlighted using the <a target="_blank" href="https://helpej2.syncfusion.com/react/documentation/api/gantt/#highlightweekends">highlightweekends</a> property for easy identification.
        </p>
        <p>
          Non-working days are visible by default in the Gantt Chart timeline, their visibility can be customized using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#showWeekend">timelineSettings.showWeekend</a> property. Setting this to false will hide non-working days from the timeline.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
          <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
        <br/>
    <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/task-scheduling#weekendnon-working-days">documentation section</a>.</p>
      </div>
    </div>
  );
}
export default WorkWeek;

