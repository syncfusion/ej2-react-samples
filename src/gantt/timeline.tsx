import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, TimelineViewMode, Inject, Selection, Sort, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent, NumericTextBox } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import {  DateRangePickerComponent } from '@syncfusion/ej2-react-calendars'

export class Timeline extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    child: 'subtasks'
  };
  private ganttInstance: GanttComponent;
  private topTierformat: DropDownListComponent;
  private bottomTierformat: DropDownListComponent;
  private topTierCheckbox: CheckBoxComponent;
  private bottomTierCheckbox: CheckBoxComponent;
  private topTierUnit: DropDownListComponent;
  private bottomTierUnit: DropDownListComponent;
  private topTierCount: NumericTextBoxComponent;
  private bottomTierCount: NumericTextBoxComponent;
  private timelineUnitSize: NumericTextBoxComponent;
  private multitaskbarcheckbox: CheckBoxComponent;
  public projectStartDate = new Date('02/05/2025');
  public projectEndDate = new Date('03/23/2025');
  public timelineSettings: any = {
    topTier: {
      format: 'MMM dd, yyyy',
      unit: 'Week',
    },
    bottomTier: {
      unit: 'Day',
    }
  };
  private labelSettings: any = {
    rightLabel: 'taskName'
  };
  private splitterSettings: any = {
    columnIndex: 1
  };
  public yearformat: { [key: string]: Object }[] = [
    { id: 'MMM "yy', format: 'Jan "18' },
    { id: 'y', format: '2018' },
    { id: 'MMMM, y', format: 'January, 18' },
  ];
  public monthformat: { [key: string]: Object }[] = [
    { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
    { id: 'MMMM', format: 'January' },
    { id: 'MMM', format: 'Jan' },
  ];
  public weekformat: { [key: string]: Object }[] = [
    { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
    { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
    { id: 'EEE MMM dd', format: 'Mon Jan 01' },
  ];
  public dayformat: { [key: string]: Object }[] = [
    { id: '', format: 'M' },
    { id: 'EEE', format: 'Mon' },
    { id: 'dd', format: '01' },
  ];
  public hourformat: { [key: string]: Object }[] = [
    { id: 'hh', format: '00' },
    { id: 'hh : mm a', format: '00 : 00 AM' },
    { id: 'h : mm a', format: '0 : 00 AM' },
  ];
  public unit: { [key: string]: Object }[] = [
    { id: 'Year', unit: 'Year' },
    { id: 'Month', unit: 'Month' },
    { id: 'Week', unit: 'Week' },
    { id: 'Day', unit: 'Day' },
    { id: 'Hour', unit: 'Hour' }
  ];
  public topTierCountchange(e): any {
    let count: number = e.value;
    this.ganttInstance.timelineSettings.topTier.count = count;
  }
  public bottomTierCountchange(e): any {
    let count: number = e.value;
    this.ganttInstance.timelineSettings.bottomTier.count = count;
  }
  public topUnitChange(e): any {
    let unit: string = e.value;
    this.ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      this.topTierformat.dataSource = this.yearformat;
    } else if (unit === 'Month') {
      this.topTierformat.dataSource = this.monthformat;
    } else if (unit === 'Week') {
      this.topTierformat.dataSource = this.weekformat;
    } else if (unit === 'Day') {
      this.topTierformat.dataSource = this.dayformat;
    } else {
      this.topTierformat.dataSource = this.hourformat;
    }
    this.topTierformat.value = this.topTierformat.dataSource[0].id;
    this.updateUnitWidth(unit, 'top');
    this.ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
  }
  public bottomUnitChange(e): any {
    let unit: string = e.value;
    this.ganttInstance.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      this.bottomTierformat.dataSource = this.yearformat;
    } else if (unit === 'Month') {
      this.bottomTierformat.dataSource = this.monthformat;
    } else if (unit === 'Week') {
      this.bottomTierformat.dataSource = this.weekformat;
    } else if (unit === 'Day') {
      this.bottomTierformat.dataSource = this.dayformat;
    } else {
      this.bottomTierformat.dataSource = this.hourformat;
    }
    this.bottomTierformat.value = this.bottomTierformat.dataSource[0].id;
    this.updateUnitWidth(unit, 'bottom');
    this.ganttInstance.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
  }
  public bottomFormatChange(e): any {
    let format: string = e.value;
    this.ganttInstance.timelineSettings.bottomTier.format = format.toString();
  }
  public topFormatChange(e): any {
    let format: string = e.value;
    this.ganttInstance.timelineSettings.topTier.format = format.toString();
  }
  public unitWidth(e): any {
    let width: number = e.value;
    this.ganttInstance.timelineSettings.timelineUnitSize = width;
  }
  public multitaskbarCheck(props): any {
    if (this.multitaskbarcheckbox.checked) {
      this.ganttInstance.enableMultiTaskbar = true;
    } else {
      this.ganttInstance.enableMultiTaskbar = false;
    }
  }
  private unitField: any = { text: 'unit', value: 'id' }
  private formatField: any = { text: 'format', value: 'id' };
  private startDateValue: Date = new Date('02/05/2025');
  private endDateValue: Date = new Date('03/23/2025');
  public changeDateRange = (args: any): void => {
    this.ganttInstance.timelineSettings.viewStartDate = isNullOrUndefined(args.startDate) ? 'auto' : args.startDate;
    this.ganttInstance.timelineSettings.viewEndDate = isNullOrUndefined(args.endDate) ? 'auto' : args.endDate;
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <GanttComponent id='Timeline' ref={gantt => this.ganttInstance = gantt} dataSource={projectData} renderBaseline={true} allowSorting={true}
              treeColumnIndex={1} allowSelection={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
              taskFields={this.taskFields} timelineSettings={this.timelineSettings} highlightWeekends={true}
              height='650px' taskbarHeight={25} rowHeight={46} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}>
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
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{width: '35%'}}>
                      <div>Timeline Range</div>
                    </td>
                    <td style={{width: '65%'}}>
                      <div>
                        <DateRangePickerComponent startDate={this.startDateValue} endDate={this.endDateValue} change={this.changeDateRange.bind(this)}></DateRangePickerComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                       <div>Timeline Unit Size</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.timelineUnitSize = NumericTextBox} format='n' value={33} min={10} change={this.unitWidth.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td colSpan={2} style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div><b>Top Tier</b></div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Count</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.topTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={this.topTierCountchange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Unit</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.topTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={this.unit} fields={this.unitField}
                          value='Week' change={this.topUnitChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Format</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.topTierformat = DropDownList} id='topformat' tabIndex={1} dataSource={this.weekformat}
                          fields={this.formatField} value='MMM dd, yyyy' change={this.topFormatChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div><b>Bottom Tier</b></div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Count</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.bottomTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={this.bottomTierCountchange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Unit</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.bottomTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={this.unit} fields={this.unitField}
                          value='Day' change={this.bottomUnitChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Format</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.bottomTierformat = DropDownList} id='btFormat' tabIndex={1} dataSource={this.dayformat}
                          fields={this.formatField} value='' change={this.bottomFormatChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '35%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Multiple Taskbars</div>
                    </td>
                    <td style={{ width: '65%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div id='multitaskbar' style={{paddingTop: '0px', paddingLeft: '0px'}}>
                        <CheckBoxComponent ref={CheckBox => this.multitaskbarcheckbox = CheckBox} id="multitaskbarCheck" onClick={this.multitaskbarCheck.bind(this)} className="checkbox" checked={false} />
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
  
  private updateUnitWidth(unit: string, tier: string): void {
   let topUnit: string = tier === 'top' ? unit : this.ganttInstance.timelineSettings.topTier.unit;
   let bottomUnit: string = tier === 'bottom' ? unit : this.ganttInstance.timelineSettings.bottomTier.unit;
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
   this.timelineUnitSize.value = unitWidth;
   }  
}
