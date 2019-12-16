import * as React from 'react';
import { GanttComponent, Inject, Selection, Sort, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { projectData, projectResources } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
export class Timeline extends SampleBase {
    constructor() {
        super(...arguments);
        this.taskFields = {
            id: 'taskID',
            name: 'taskName',
            startDate: 'startDate',
            endDate: 'endDate',
            duration: 'duration',
            progress: 'progress',
            dependency: 'predecessor',
            child: 'subtasks'
        };
        this.projectStartDate = new Date('02/03/2019');
        this.projectEndDate = new Date('03/23/2019');
        this.timelineSettings = {
            topTier: {
                format: 'MMM dd, yyyy',
                unit: 'Week',
            },
            bottomTier: {
                unit: 'Day',
            }
        };
        this.labelSettings = {
            rightLabel: 'taskName'
        };
        this.splitterSettings = {
            columnIndex: 0
        };
        this.yearformat = [
            { id: 'MMM "yy', format: 'Jan "18' },
            { id: 'y', format: '2018' },
            { id: 'MMMM, y', format: 'January, 18' },
        ];
        this.monthformat = [
            { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
            { id: 'MMMM', format: 'January' },
            { id: 'MMM', format: 'Jan' },
        ];
        this.weekformat = [
            { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
            { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
            { id: 'EEE MMM dd', format: 'Mon Jan 01' },
        ];
        this.dayformat = [
            { id: 'EEE, dd', format: 'Mon, 01' },
            { id: 'E', format: 'Mon' },
            { id: 'dd', format: '01' },
        ];
        this.hourformat = [
            { id: 'hh', format: '00' },
            { id: 'hh : mm a', format: '00 : 00 AM' },
            { id: 'h : mm a', format: '0 : 00 AM' },
        ];
        this.unit = [
            { id: 'Year', unit: 'Year' },
            { id: 'Month', unit: 'Month' },
            { id: 'Week', unit: 'Week' },
            { id: 'Day', unit: 'Day' },
            { id: 'Hour', unit: 'Hour' }
        ];
        this.unitField = { text: 'unit', value: 'id' };
        this.formatField = { text: 'format', value: 'id' };
    }
    topTierCick(props) {
        if (this.topTierCheckbox.checked) {
            this.ganttInstance.timelineSettings.topTier.unit = 'Week';
            this.topTierCount.enabled = true;
            this.topTierformat.enabled = true;
            this.topTierUnit.enabled = true;
        }
        else {
            this.ganttInstance.timelineSettings.topTier.unit = 'None';
            this.topTierCount.enabled = false;
            this.topTierformat.enabled = false;
            this.topTierUnit.enabled = false;
        }
    }
    bottomTierCick(props) {
        if (this.bottomTierCheckbox.checked) {
            this.ganttInstance.timelineSettings.bottomTier.unit = 'Day';
            this.bottomTierCount.enabled = true;
            this.bottomTierformat.enabled = true;
            this.bottomTierUnit.enabled = true;
        }
        else {
            this.ganttInstance.timelineSettings.bottomTier.unit = 'None';
            this.bottomTierCount.enabled = false;
            this.bottomTierformat.enabled = false;
            this.bottomTierUnit.enabled = false;
        }
    }
    topTierCountchange(e) {
        let count = e.value;
        this.ganttInstance.timelineSettings.topTier.count = count;
    }
    bottomTierCountchange(e) {
        let count = e.value;
        this.ganttInstance.timelineSettings.bottomTier.count = count;
    }
    topUnitChange(e) {
        let unit = e.value;
        this.ganttInstance.timelineSettings.topTier.unit = unit;
        if (unit === 'Year') {
            this.topTierformat.dataSource = this.yearformat;
        }
        else if (unit === 'Month') {
            this.topTierformat.dataSource = this.monthformat;
        }
        else if (unit === 'Week') {
            this.topTierformat.dataSource = this.weekformat;
        }
        else if (unit === 'Day') {
            this.topTierformat.dataSource = this.dayformat;
        }
        else {
            this.topTierformat.dataSource = this.hourformat;
        }
        this.topTierformat.refresh();
        this.updateUnitWidth(unit, 'top');
        this.ganttInstance.timelineSettings.topTier.unit = unit;
    }
    bottomUnitChange(e) {
        let unit = e.value;
        this.ganttInstance.timelineSettings.bottomTier.unit = unit;
        if (unit === 'Year') {
            this.bottomTierformat.dataSource = this.yearformat;
        }
        else if (unit === 'Month') {
            this.bottomTierformat.dataSource = this.monthformat;
        }
        else if (unit === 'Week') {
            this.bottomTierformat.dataSource = this.weekformat;
        }
        else if (unit === 'Day') {
            this.bottomTierformat.dataSource = this.dayformat;
        }
        else {
            this.bottomTierformat.dataSource = this.hourformat;
        }
        this.bottomTierformat.refresh();
        this.updateUnitWidth(unit, 'bottom');
        this.ganttInstance.timelineSettings.bottomTier.unit = unit;
    }
    bottomFormatChange(e) {
        let format = e.value;
        this.ganttInstance.timelineSettings.bottomTier.format = format.toString();
    }
    topFormatChange(e) {
        let format = e.value;
        this.ganttInstance.timelineSettings.topTier.format = format.toString();
    }
    unitWidth(e) {
        let width = e.value;
        this.ganttInstance.timelineSettings.timelineUnitSize = width;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <GanttComponent id='Timeline' ref={gantt => this.ganttInstance = gantt} dataSource={projectData} renderBaseline={true} allowSorting={true} treeColumnIndex={1} allowSelection={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} taskFields={this.taskFields} timelineSettings={this.timelineSettings} highlightWeekends={true} height='410px' resourceNameMapping='resourceName' resourceIDMapping='resourceId' resources={projectResources} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}>
              <Inject services={[Selection, Sort, DayMarkers]}/>
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
                        <NumericTextBoxComponent ref={NumericTextBox => this.timelineUnitSize = NumericTextBox} format='n' value={33} min={10} change={this.unitWidth.bind(this)}></NumericTextBoxComponent>
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
                      <CheckBoxComponent ref={CheckBox => this.topTierCheckbox = CheckBox} id="topTierCheck" onClick={this.topTierCick.bind(this)} className="checkbox" checked={true}></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Count</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <NumericTextBoxComponent ref={NumericTextBox => this.topTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={this.topTierCountchange.bind(this)}></NumericTextBoxComponent>
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
                      <DropDownListComponent ref={DropDownList => this.topTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={this.unit} fields={this.unitField} value='Week' change={this.topUnitChange.bind(this)}></DropDownListComponent>
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
                      <DropDownListComponent ref={DropDownList => this.topTierformat = DropDownList} id='topformat' tabIndex={1} dataSource={this.weekformat} fields={this.formatField} value='MMM dd, yyyy' change={this.topFormatChange.bind(this)}></DropDownListComponent>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ width: '30%' }}>
                    <div><b>Bottom tier</b></div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <CheckBoxComponent ref={CheckBox => this.bottomTierCheckbox = CheckBox} id="bottomTierCheck" onClick={this.bottomTierCick.bind(this)} className="checkbox" checked={true}></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Count</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <NumericTextBoxComponent ref={NumericTextBox => this.bottomTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={this.bottomTierCountchange.bind(this)}></NumericTextBoxComponent>
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
                      <DropDownListComponent ref={DropDownList => this.bottomTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={this.unit} fields={this.unitField} value='Day' change={this.bottomUnitChange.bind(this)}></DropDownListComponent>
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
                      <DropDownListComponent ref={DropDownList => this.bottomTierformat = DropDownList} id='btFormat' tabIndex={1} dataSource={this.dayformat} fields={this.formatField} change={this.bottomFormatChange.bind(this)}></DropDownListComponent>
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
      </div>);
    }
    updateUnitWidth(unit, tier) {
        let topUnit = tier === 'top' ? unit : this.ganttInstance.timelineSettings.topTier.unit;
        let bottomUnit = tier === 'bottom' ? unit : this.ganttInstance.timelineSettings.bottomTier.unit;
        let units = ['None', 'Hour', 'Day', 'Week', 'Month', 'Year'];
        let bootomCellUnit;
        let unitWidth;
        if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = 'Day';
        }
        else if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) > 0) {
            bootomCellUnit = bottomUnit;
        }
        else if (units.indexOf(topUnit) > 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = topUnit;
        }
        else if (units.indexOf(topUnit) <= units.indexOf(bottomUnit)) {
            bootomCellUnit = topUnit;
        }
        else {
            bootomCellUnit = bottomUnit;
        }
        if (bootomCellUnit === 'Year') {
            unitWidth = 2000;
        }
        else if (bootomCellUnit === 'Month') {
            unitWidth = 300;
        }
        else if (bootomCellUnit === 'Week') {
            unitWidth = 150;
        }
        else if (bootomCellUnit === 'Day') {
            unitWidth = 33;
        }
        else if (bootomCellUnit === 'Hour') {
            unitWidth = 25;
        }
        this.timelineUnitSize.value = unitWidth;
    }
}
