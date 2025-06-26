import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, TimelineViewMode, Inject, Selection, Sort, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent, NumericTextBox } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';

const Timeline = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    child: 'subtasks'
  };
  let ganttInstance = useRef<GanttComponent>(null);
  let topTierformat = useRef<DropDownListComponent>(null);
  let bottomTierformat = useRef<DropDownListComponent>(null);
  let topTierCheckbox = useRef<CheckBoxComponent>(null);
  let bottomTierCheckbox = useRef<CheckBoxComponent>(null);
  let topTierUnit = useRef<DropDownListComponent>(null);
  let bottomTierUnit = useRef<DropDownListComponent>(null);
  let topTierCount = useRef<NumericTextBoxComponent>(null);
  let bottomTierCount = useRef<NumericTextBoxComponent>(null);
  let timelineUnitSize = useRef<NumericTextBoxComponent>(null);
  let multitaskbarcheckbox = useRef<CheckBoxComponent>(null);
  const projectStartDate = new Date('02/03/2024');
  const projectEndDate = new Date('03/23/2024');
  const timelineSettings: any = {
    topTier: {
      format: 'MMM dd, yyyy',
      unit: 'Week',
    },
    bottomTier: {
      unit: 'Day',
    }
  };
  let labelSettings: any = {
    rightLabel: 'taskName'
  };
  let splitterSettings: any = {
    columnIndex: 1
  };
  const yearformat: { [key: string]: Object }[] = [
    { id: 'MMM "yy', format: 'Jan "18' },
    { id: 'y', format: '2018' },
    { id: 'MMMM, y', format: 'January, 18' },
  ];
  const monthformat: { [key: string]: Object }[] = [
    { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
    { id: 'MMMM', format: 'January' },
    { id: 'MMM', format: 'Jan' },
  ];
  const weekformat: { [key: string]: Object }[] = [
    { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
    { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
    { id: 'EEE MMM dd', format: 'Mon Jan 01' },
  ];
  const dayformat: { [key: string]: Object }[] = [
    { id: '', format: 'M' },
    { id: 'EEE', format: 'Mon' },
    { id: 'dd', format: '01' },
  ];
  const hourformat: { [key: string]: Object }[] = [
    { id: 'hh', format: '00' },
    { id: 'hh : mm a', format: '00 : 00 AM' },
    { id: 'h : mm a', format: '0 : 00 AM' },
  ];
  const unit: { [key: string]: Object }[] = [
    { id: 'Year', unit: 'Year' },
    { id: 'Month', unit: 'Month' },
    { id: 'Week', unit: 'Week' },
    { id: 'Day', unit: 'Day' },
    { id: 'Hour', unit: 'Hour' }
  ];
  const multitaskbarCheck = (props): any => {
    if (multitaskbarcheckbox.current.checked) {
      ganttInstance.current.enableMultiTaskbar = true;
    } else {
      ganttInstance.current.enableMultiTaskbar = false;
    }
  }
  const topTierCick = (props): any => {
    if (topTierCheckbox.current.checked) {
      ganttInstance.current.timelineSettings.topTier.unit = 'Week';
      topTierCount.current.enabled = true;
      topTierformat.current.enabled = true;
      topTierUnit.current.enabled = true;
    } else {
      ganttInstance.current.timelineSettings.topTier.unit = 'None';
      topTierCount.current.enabled = false;
      topTierformat.current.enabled = false;
      topTierUnit.current.enabled = false;
    }
  }
  const bottomTierCick = (props): any => {
    if (bottomTierCheckbox.current.checked) {
      ganttInstance.current.timelineSettings.bottomTier.unit = 'Day';
      bottomTierCount.current.enabled = true;
      bottomTierformat.current.enabled = true;
      bottomTierUnit.current.enabled = true;
    } else {
      ganttInstance.current.timelineSettings.bottomTier.unit = 'None';
      bottomTierCount.current.enabled = false;
      bottomTierformat.current.enabled = false;
      bottomTierUnit.current.enabled = false;
    }
  }
  const topTierCountchange = (e): any => {
    let count: number = e.value;
    ganttInstance.current.timelineSettings.topTier.count = count;
  }
  const bottomTierCountchange = (e): any => {
    let count: number = e.value;
    ganttInstance.current.timelineSettings.bottomTier.count = count;
  }
  const topUnitChange = (e): any => {
    let unit: string = e.value;
    ganttInstance.current.timelineSettings.topTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      topTierformat.current.dataSource = yearformat;
    } else if (unit === 'Month') {
      topTierformat.current.dataSource = monthformat;
    } else if (unit === 'Week') {
      topTierformat.current.dataSource = weekformat;
    } else if (unit === 'Day') {
      topTierformat.current.dataSource = dayformat;
    } else {
      topTierformat.current.dataSource = hourformat;
    }
    topTierformat.current.refresh();
    updateUnitWidth(unit, 'top');
    ganttInstance.current.timelineSettings.topTier.unit = unit as TimelineViewMode;
  }
  const bottomUnitChange = (e): any => {
    let unit: string = e.value;
    ganttInstance.current.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      bottomTierformat.current.dataSource = yearformat;
    } else if (unit === 'Month') {
      bottomTierformat.current.dataSource = monthformat;
    } else if (unit === 'Week') {
      bottomTierformat.current.dataSource = weekformat;
    } else if (unit === 'Day') {
      bottomTierformat.current.dataSource = dayformat;
    } else {
      bottomTierformat.current.dataSource = hourformat;
    }
    bottomTierformat.current.refresh();
    updateUnitWidth(unit, 'bottom');
    ganttInstance.current.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
  }
  const bottomFormatChange = (e): any => {
    let format: string = e.value;
    ganttInstance.current.timelineSettings.bottomTier.format = format.toString();
  }
  const topFormatChange = (e): any => {
    let format: string = e.value;
    ganttInstance.current.timelineSettings.topTier.format = format.toString();
  }
  const unitWidth = (e): any => {
    let width: number = e.value;
    ganttInstance.current.timelineSettings.timelineUnitSize = width;
  }
  let unitField: any = { text: 'unit', value: 'id' }
  let formatField: any = { text: 'format', value: 'id' };
  const updateUnitWidth = (unit: string, tier: string): void => {
    let topUnit: string = tier === 'top' ? unit : ganttInstance.current.timelineSettings.topTier.unit;
    let bottomUnit: string = tier === 'bottom' ? unit : ganttInstance.current.timelineSettings.bottomTier.unit;
    let units: string[] = ['None', 'Hour', 'Day', 'Week', 'Month', 'Year'];
    let bootomCellUnit: string;
    let unitWidth: number;
    if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) === 0) {
      bootomCellUnit = 'Day';
    } else if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) > 0) {
      bootomCellUnit = bottomUnit;
    } else if (units.indexOf(topUnit) > 0 && units.indexOf(bottomUnit) === 0) {
      bootomCellUnit = topUnit;
    } else if (units.indexOf(topUnit) <= units.indexOf(bottomUnit)) {
      bootomCellUnit = topUnit;
    } else {
      bootomCellUnit = bottomUnit;
    }
    if (bootomCellUnit === 'Year') {
      unitWidth = 2000;
    } else if (bootomCellUnit === 'Month') {
      unitWidth = 300;
    } else if (bootomCellUnit === 'Week') {
      unitWidth = 150;
    } else if (bootomCellUnit === 'Day') {
      unitWidth = 33;
    } else if (bootomCellUnit === 'Hour') {
      unitWidth = 25;
    }
    timelineUnitSize.current.value = unitWidth;
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='Timeline' ref={ganttInstance} dataSource={projectData} renderBaseline={true} allowSorting={true}
            treeColumnIndex={1} allowSelection={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate}
            taskFields={taskFields} timelineSettings={timelineSettings} highlightWeekends={true}
            height='463px' labelSettings={labelSettings} splitterSettings={splitterSettings}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' visible={false} ></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
              <ColumnDirective field='endDate' headerText='End Date'></ColumnDirective>
              <ColumnDirective field='duration' headerText='Duration'></ColumnDirective>
              <ColumnDirective field='predecessor' headerText='Dependency'></ColumnDirective>
              <ColumnDirective field='progress' headerText='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Sort, DayMarkers]} />
          </GanttComponent>
        </div>
        <div className='col-lg-4 property-section'>
        <PropertyPane title="Properties">
          <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <div>Timeline Unit Size</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={timelineUnitSize} format="n" value={33} min={10} change={unitWidth.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div><b>Top tier</b></div>
                </td>
                <td>
                  <div>
                    <CheckBoxComponent ref={topTierCheckbox} id="topTierCheck" onClick={topTierCick.bind(this)} className="checkbox" checked />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Count</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={topTierCount} id="count" format="n" min={1} max={50} value={1} className="form-control" change={topTierCountchange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Unit</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={topTierUnit} id="unit" tabIndex={1} dataSource={unit} fields={unitField} value="Week" change={topUnitChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Format</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={topTierformat} id="topformat" tabIndex={1} dataSource={weekformat} fields={formatField} value="MMM dd, yyyy" change={topFormatChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div><b>Bottom tier</b></div>
                </td>
                <td>
                  <div>
                    <CheckBoxComponent ref={bottomTierCheckbox} id="bottomTierCheck" onClick={bottomTierCick.bind(this)} className="checkbox" checked />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Count</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={bottomTierCount} id="count" format="n" min={1} max={50} value={1} className="form-control" change={bottomTierCountchange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Unit</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={bottomTierUnit} id="unit" tabIndex={1} dataSource={unit} fields={unitField} value="Day" change={bottomUnitChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Format</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={bottomTierformat} id="btFormat" tabIndex={1} dataSource={dayformat} fields={formatField} value="" change={bottomFormatChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Enable multitaskbar</div>
                </td>
                <td>
                  <div>
                    <CheckBoxComponent ref={multitaskbarcheckbox} id="multitaskbarCheck" onClick={multitaskbarCheck.bind(this)} className="checkbox" checked={false} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>

        </div>
      </div>
      <div id="action-description">
        <p>This sample allows you to customize the Gantt Chart timeline by adjusting the timeline unit size, header text format, and count for both the top and bottom tiers, and provides an option to enable the multitaskbar feature.
        </p>
      </div>

      <div id="description">
        <p>
          This example demonstrates how to effectively customize the timeline settings of a Gantt Chart.
          You can customize the timeline width by adjusting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#timelineunitsize">timelineunitsize</a> property
          in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/">timelineSettings</a>.
          The Gantt Chart supports various timeline units such as <code>minutes</code>, <code>hours</code>, <code>days</code>, <code>weeks</code>, <code>months</code>, and <code>years</code>.
          You can easily customize these units by changing the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineTierSettings/#unit">unit</a> for both top tier and bottom tier in <code>timelineSettings</code>.
          The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineTierSettings/#format">format</a> of the timeline can be customized by modifying the format value for both the top and bottom tiers.
          You can combine timeline cells in the top and bottom tiers using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineTierSettings/#count">count</a> property in <code>timelineSettings</code>.
        </p>
        <p>
          Tooltips are visible by default in the Gantt Chart timeline, You can customize the tooltip visiblity by using the  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettings/#showtooltip">showtooltip</a> property in the timeline settings.
        </p>
        <p>
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enablemultitaskbar">enablemultitaskbar</a> allows you to display multiple taskbars within a parent row, ensuring a clear overview even in collapsed states.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the
          <code>Selection</code> module. To use markers in Gantt, inject the <code>DayMarkers</code> module.
        </p>
      </div>
    </div>
  )
}

export default Timeline;
