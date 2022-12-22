import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';

const emptyCss = `
.property-panel-table div {
  padding-top: 0px}`;
function WorkWeek() {

  React.useEffect(() => {
    updateSampleSection();
  }, []);

  let ganttInstance: GanttComponent;
  let multiselectObj: MultiSelectComponent;
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
  function select(args: any): void {
    let workingDays: any = extend([], multiselectObj.value, [], true);
    workingDays.push(args.itemData.day);
    ganttInstance.workWeek = workingDays;
  };
  function removed(args: any): void {
    let index = ganttInstance.workWeek.indexOf(args.itemData.day);
    if (index !== -1) {
      ganttInstance.workWeek = (multiselectObj.value as string[]);
    }
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
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const workWeek: any = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const projectStartDate: Date = new Date('03/24/2019');
  const projectEndDate: Date = new Date('07/06/2019');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='WorkWeek' ref={gantt => ganttInstance = gantt} dataSource={projectNewData} treeColumnIndex={1}
            highlightWeekends={true} taskFields={taskFields} labelSettings={labelSettings} height='410px'
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
                <col style={{ width: '30%' }} />
                <col style={{ width: '70%' }} />
              </colgroup>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    <h5>Working Days</h5>
                  </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div style={{ paddingTop: '0px' }}>
                    <MultiSelectComponent ref={multiselect => multiselectObj = multiselect} id="WorkWeek" style={{ padding: '2px;' }} mode="CheckBox" value={defaultValue}
                      dataSource={workDays} showDropDownIcon={true} popupHeight='350px' fields={{ text: 'day', value: 'id' }}
                      select={select.bind(this)} removed={removed.bind(this)}>
                      <Inject services={[CheckBoxSelection]}></Inject>
                    </MultiSelectComponent>
                  </div>
                </td>
              </tr>
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
  );
}
export default WorkWeek;

