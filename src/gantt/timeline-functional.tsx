import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, TimelineViewMode, Inject, Selection, Sort, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent, NumericTextBox } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

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
  const projectStartDate = new Date('02/05/2025');
  const projectEndDate = new Date('03/23/2025');
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
    topTierformat.current.value = topTierformat.current.dataSource[0].id;
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
    bottomTierformat.current.value = bottomTierformat.current.dataSource[0].id;
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
  let startDateValue: Date = new Date('02/05/2025');
  let endDateValue: Date = new Date('03/23/2025');
  const changeDateRange = (args: any): void => {
    ganttInstance.current.timelineSettings.viewStartDate = isNullOrUndefined(args.startDate) ? 'auto' : args.startDate;
    ganttInstance.current.timelineSettings.viewEndDate = isNullOrUndefined(args.endDate) ? 'auto' : args.endDate; 
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='Timeline' ref={ganttInstance} dataSource={projectData} renderBaseline={true} allowSorting={true}
            treeColumnIndex={1} allowSelection={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate}
            taskFields={taskFields} timelineSettings={timelineSettings} highlightWeekends={true}
            height='650px' taskbarHeight={25} rowHeight={46} labelSettings={labelSettings} splitterSettings={splitterSettings}>
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
              <col style={{ width: '35%' }} />
              <col style={{ width: '65%' }} />
            </colgroup>
            <tbody>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Timeline Range</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <DateRangePickerComponent startDate={startDateValue} endDate={endDateValue} change={changeDateRange.bind(this)}></DateRangePickerComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Timeline Unit Size</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <NumericTextBoxComponent ref={timelineUnitSize} format="n" value={33} min={10} change={unitWidth.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{width: '35%'}}>
                  <div><b>Top Tier</b></div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Count</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <NumericTextBoxComponent ref={topTierCount} id="count" format="n" min={1} max={50} value={1} className="form-control" change={topTierCountchange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Unit</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <DropDownListComponent ref={topTierUnit} id="unit" tabIndex={1} dataSource={unit} fields={unitField} value="Week" change={topUnitChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Format</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <DropDownListComponent ref={topTierformat} id="topformat" tabIndex={1} dataSource={weekformat} fields={formatField} value="MMM dd, yyyy" change={topFormatChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{width: '35%'}}>
                  <div><b>Bottom Tier</b></div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Count</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <NumericTextBoxComponent ref={bottomTierCount} id="count" format="n" min={1} max={50} value={1} className="form-control" change={bottomTierCountchange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Unit</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <DropDownListComponent ref={bottomTierUnit} id="unit" tabIndex={1} dataSource={unit} fields={unitField} value="Day" change={bottomUnitChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Format</div>
                </td>
                <td style={{width: '65%'}}>
                  <div>
                    <DropDownListComponent ref={bottomTierformat} id="btFormat" tabIndex={1} dataSource={dayformat} fields={formatField} value="" change={bottomFormatChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{width: '35%'}}>
                  <div>Multiple Taskbars</div>
                </td>
                <td style={{width: '65%'}}>
                  <div id='multitaskbar' style={{paddingTop: '0px', paddingLeft: '0px'}}>
                    <CheckBoxComponent ref={multitaskbarcheckbox} id="multitaskbarCheck" onClick={multitaskbarCheck.bind(this)} className="checkbox" checked={false} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>

        </div>
      </div>
      <style>
        {`.fluent2-dark #multitaskbar .e-frame, .fluent2 #multitaskbar .e-frame, .fluent2-highcontrast #multitaskbar .e-frame{
              margin: 0px;
          }`
        }
      </style>
      <div id="action-description">
        <p>This sample allows you to customize the Gantt Chart timeline by adjusting the timeline unit size, header text format, and count for both the top and bottom tiers, and provides an option to enable the multitaskbar feature.
        </p>
      </div>

      <div id="description">
        <p>This demo illustrates how to customize the timeline settings in a Gantt Chart. It covers:</p>
        <ul>
            <li><b>Timeline Date Range:</b> Define the timeline view's start and end dates using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelinesettings#viewstartdate">viewStartDate</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelinesettings#viewenddate">viewEndDate</a>.</li>
            <li><b>Timeline Cell Width:</b> Adjusted using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#timelineunitsize">timelineUnitSize</a> property.</li>
            <li><b>Cell Combination:</b> Merge multiple timeline cells using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineTierSettings/#count">count</a> property.</li>
            <li><b>Timeline Units:</b> Supports minutes, hours, days, weeks, months, and years. Units can be configured for both top and bottom tiers.</li>
            <li><b>Timeline Format:</b> Customizable by modifying the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineTierSettings/#format">format</a> value for each tier.</li>
            <li><b>Multiple Taskbars:</b> Enabled with <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enablemultitaskbar">enableMultiTaskbar</a> to display multiple taskbars within a collapsed parent row.</li>
        </ul>
        <p>These settings highlight how the timeline can be customized to support different tiers, unit sizes, and ranges, while also enabling multiple task visualization within the same view.</p>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/timeline/timeline">documentation section</a>.</p>
      </div>
    </div>
  )
}

export default Timeline;
