import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, TimelineViewMode, Inject, Selection, Sort, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent, NumericTextBox } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';

function Timeline() {
  React.useEffect(() => {
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
  let ganttInstance: GanttComponent;
  let topTierformat: DropDownListComponent;
  let bottomTierformat: DropDownListComponent;
  let topTierCheckbox: CheckBoxComponent;
  let bottomTierCheckbox: CheckBoxComponent;
  let topTierUnit: DropDownListComponent;
  let bottomTierUnit: DropDownListComponent;
  let topTierCount: NumericTextBoxComponent;
  let bottomTierCount: NumericTextBoxComponent;
  let timelineUnitSize: NumericTextBoxComponent;
  const projectStartDate = new Date('02/03/2019');
  const projectEndDate = new Date('03/23/2019');
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
    columnIndex: 0
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
  function topTierCick(props): any {
    if (topTierCheckbox.checked) {
      ganttInstance.timelineSettings.topTier.unit = 'Week';
      topTierCount.enabled = true;
      topTierformat.enabled = true;
      topTierUnit.enabled = true;
    } else {
      ganttInstance.timelineSettings.topTier.unit = 'None';
      topTierCount.enabled = false;
      topTierformat.enabled = false;
      topTierUnit.enabled = false;
    }
  }
  function bottomTierCick(props): any {
    if (bottomTierCheckbox.checked) {
      ganttInstance.timelineSettings.bottomTier.unit = 'Day';
      bottomTierCount.enabled = true;
      bottomTierformat.enabled = true;
      bottomTierUnit.enabled = true;
    } else {
      ganttInstance.timelineSettings.bottomTier.unit = 'None';
      bottomTierCount.enabled = false;
      bottomTierformat.enabled = false;
      bottomTierUnit.enabled = false;
    }
  }
  function topTierCountchange(e): any {
    let count: number = e.value;
    ganttInstance.timelineSettings.topTier.count = count;
  }
  function bottomTierCountchange(e): any {
    let count: number = e.value;
    ganttInstance.timelineSettings.bottomTier.count = count;
  }
  function topUnitChange(e): any {
    let unit: string = e.value;
    ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      topTierformat.dataSource = yearformat;
    } else if (unit === 'Month') {
      topTierformat.dataSource = monthformat;
    } else if (unit === 'Week') {
      topTierformat.dataSource = weekformat;
    } else if (unit === 'Day') {
      topTierformat.dataSource = dayformat;
    } else {
      topTierformat.dataSource = hourformat;
    }
    topTierformat.refresh();
    updateUnitWidth(unit, 'top');
    ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
  }
  function bottomUnitChange(e): any {
    let unit: string = e.value;
    ganttInstance.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      bottomTierformat.dataSource = yearformat;
    } else if (unit === 'Month') {
      bottomTierformat.dataSource = monthformat;
    } else if (unit === 'Week') {
      bottomTierformat.dataSource = weekformat;
    } else if (unit === 'Day') {
      bottomTierformat.dataSource = dayformat;
    } else {
      bottomTierformat.dataSource = hourformat;
    }
    bottomTierformat.refresh();
    updateUnitWidth(unit, 'bottom');
    ganttInstance.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
  }
  function bottomFormatChange(e): any {
    let format: string = e.value;
    ganttInstance.timelineSettings.bottomTier.format = format.toString();
  }
  function topFormatChange(e): any {
    let format: string = e.value;
    ganttInstance.timelineSettings.topTier.format = format.toString();
  }
  function unitWidth(e): any {
    let width: number = e.value;
    ganttInstance.timelineSettings.timelineUnitSize = width;
  }
  let unitField: any = { text: 'unit', value: 'id' }
  let formatField: any = { text: 'format', value: 'id' };
  function updateUnitWidth(unit: string, tier: string): void {
    let topUnit: string = tier === 'top' ? unit : ganttInstance.timelineSettings.topTier.unit;
    let bottomUnit: string = tier === 'bottom' ? unit : ganttInstance.timelineSettings.bottomTier.unit;
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
    timelineUnitSize.value = unitWidth;
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='Timeline' ref={gantt => ganttInstance = gantt} dataSource={projectData} renderBaseline={true} allowSorting={true}
            treeColumnIndex={1} allowSelection={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate}
            taskFields={taskFields} timelineSettings={timelineSettings} highlightWeekends={true}
            height='410px' labelSettings={labelSettings} splitterSettings={splitterSettings}>
            <Inject services={[Selection, Sort, DayMarkers]} />
          </GanttComponent>
        </div>
        <div className='col-lg-4 property-section'>
          <PropertyPane title='Properties'>
            <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>Unit width</div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <NumericTextBoxComponent ref={NumericTextBox => timelineUnitSize = NumericTextBox} format='n' value={33} min={10} change={unitWidth.bind(this)}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div><b>Top tier</b></div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <CheckBoxComponent ref={CheckBox => topTierCheckbox = CheckBox} id="topTierCheck" onClick={topTierCick.bind(this)} className="checkbox" checked={true} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>Count</div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <NumericTextBoxComponent ref={NumericTextBox => topTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={topTierCountchange.bind(this)}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    Unit
                  </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <DropDownListComponent ref={DropDownList => topTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={unit} fields={unitField}
                      value='Week' change={topUnitChange.bind(this)}></DropDownListComponent>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    Format
                  </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <DropDownListComponent ref={DropDownList => topTierformat = DropDownList} id='topformat' tabIndex={1} dataSource={weekformat}
                      fields={formatField} value='MMM dd, yyyy' change={topFormatChange.bind(this)}></DropDownListComponent>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ width: '30%' }}>
                  <div><b>Bottom tier</b></div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <CheckBoxComponent ref={CheckBox => bottomTierCheckbox = CheckBox} id="bottomTierCheck" onClick={bottomTierCick.bind(this)} className="checkbox" checked={true} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>Count</div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <NumericTextBoxComponent ref={NumericTextBox => bottomTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={bottomTierCountchange.bind(this)}></NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    Unit
                  </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <DropDownListComponent ref={DropDownList => bottomTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={unit} fields={unitField}
                      value='Day' change={bottomUnitChange.bind(this)}></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>
                  <div>
                    Format
                  </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <DropDownListComponent ref={DropDownList => bottomTierformat = DropDownList} id='btFormat' tabIndex={1} dataSource={dayformat}
                      fields={formatField} value='' change={bottomFormatChange.bind(this)}></DropDownListComponent>
                  </div>
                </td>
              </tr>

            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample illustrates the different phases from planning to delivery, involved in a software development
          lifecycle.
          This sample demonstrates the different timeline modes available in Gantt chart. Options are available to change
          the unit,
          format and count of the header texts for both top and bottom timeline headers.</p>
      </div>

      <div id="description">
        <p>
          In this example, you can see how to change the timeline settings in Gantt chart. The top and bottom timeline
          header texts can be customized by using the <code>timelineSettings.topTier</code> and <code>timelineSettings.bottomTier</code> properties                                                          Using these properties, you can change the format, count, and units of the timeline header texts.
        </p>
        <p>
          Gantt chart has built-in support for many timeline modes such as minutes, hour, day, week, month and year.
        </p>
        <p>
          The default timeline headers can also be replaced with custom header texts by using the <code>formatter</code> method.
        </p>
        <p>
          Tooltip is enabled by default for the timeline headers, to see the tooltip in action, hover a point or tap on a
          point in touch enabled devices.
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
