import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';

const emptyCss=`
.property-panel-table div {
  padding-top: 0px}`;
export class WorkWeek extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  public multiselectObj: MultiSelectComponent;
  private showWeekendCheckbox: CheckBoxComponent;
  private highlightWeekendsCheckbox: CheckBoxComponent;
  public workDays: { [key: string]: Object }[] = [
        { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' },
  ];
  public defaultValue: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  private select(args: any): void {
    let workingDays: any = extend([], this.multiselectObj.value, [], true);
    workingDays.push(args.itemData.day);
    this.ganttInstance.workWeek = workingDays;
  };
  private removed(args: any): void {
    let index = this.ganttInstance.workWeek.indexOf(args.itemData.day);
    if (index !== -1) {
      this.ganttInstance.workWeek = (this.multiselectObj.value as string[]);
    }
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
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public workWeek: any = ["Monday", "Tuesday", "Wednesday","Thursday","Friday"];
  public projectStartDate: Date = new Date('03/24/2024');
  public projectEndDate: Date = new Date('07/06/2024');
  public splitterSettings = {
    columnIndex: 1
  };
  public showWeekendCheck(props): any {
    if (this.showWeekendCheckbox.checked) {
      this.ganttInstance.timelineSettings.showWeekend = true;
    } else {
      this.ganttInstance.timelineSettings.showWeekend = false;
    }
  }
  public highlightWeekendsCheck(props): any {
    if (this.highlightWeekendsCheckbox.checked) {
      this.ganttInstance.highlightWeekends = true;
    } else {
      this.ganttInstance.highlightWeekends = false;
    }
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <GanttComponent id='WorkWeek' ref={gantt => this.ganttInstance = gantt} dataSource={projectNewData} treeColumnIndex={1}
              highlightWeekends={true} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
              splitterSettings={this.splitterSettings} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Selection, DayMarkers ]} />
            </GanttComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <tbody>
              <colgroup>
                <col style={{width:'30%'}} />
                <col style={{width:'70%'}} />
              </colgroup>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>
                      <label htmlFor="WorkWeek">Working Days</label>
                    </div>
                  </td>
                  <td style={{ width: '70%', paddingBottom: '10px', }}>
                    <div style={{ paddingTop: '0px'}}>
                    <MultiSelectComponent ref={multiselect=> this.multiselectObj = multiselect} id="WorkWeek" style={{ padding: '2px' }} mode="CheckBox" value={this.defaultValue}
                          dataSource={this.workDays} showDropDownIcon={true} popupHeight='350px' fields={{ text: 'day', value: 'id' }}
                          select={this.select.bind(this)} removed={this.removed.bind(this)}>
                          <Inject services={[CheckBoxSelection]}></Inject>
                      </MultiSelectComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                    <td style={{ width: '42%', paddingBottom: '10px', paddingTop: '10px' }}>
                      <div>Show Weekend</div>
                    </td>
                    <td style={{ width: '70%'}}>
                      <div>
                        <CheckBoxComponent ref={CheckBox => this.showWeekendCheckbox = CheckBox} id="showWeekendCheck" onClick={this.showWeekendCheck.bind(this)} className="checkbox" checked={true} />
                      </div>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: '30%',paddingBottom: '10px', paddingTop: '10px'  }}>
                      <div>Highlight Weekends</div>
                    </td>
                    <td style={{ width: '70%' }}>
                      <div>
                        <CheckBoxComponent ref={CheckBox => this.highlightWeekendsCheckbox = CheckBox} id="highlightWeekendsCheck" onClick={this.highlightWeekendsCheck.bind(this)} className="checkbox" checked={true} />
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
            <p>
              In this example, you can customize which days of the week are considered working days using the <a target="_blank" href="https://helpej2.syncfusion.com/react/documentation/api/gantt/#workweek">workWeek</a> property.
              Simply select your preferred working days from the dropdown list in the property panel, and they will be applied to the Gantt Chart. Weekends can be highlighted using the <a target="_blank" href="https://helpej2.syncfusion.com/react/documentation/api/gantt/#highlightweekends">highlightweekends</a> property for easy identification.
            </p>
            <p>
              Non-working days are visible by default in the Gantt Chart timeline, their visibility can be customized using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#showWeekend">timelineSettings.showWeekend</a> property. Setting this to false will hide non-working days from the timeline.
            </p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
            <code>Selection</code>, <code>DayMarkers</code> modules.
          </p>
        </div>
      </div>
    )
  }
}
