import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Filter, Toolbar, ColumnsDirective, ColumnDirective, Selection } from '@syncfusion/ej2-react-gantt';
import { filteredData } from './data';
import { SampleBase } from '../common/sample-base';

export class Filtering extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public projectStartDate = new Date('07/16/1969 01:00:00 AM');
  public projectEndDate = new Date('07/25/1969');
  public timelineSettings: any = {
    timelineUnitSize: 60,
    topTier: {
      format: 'MMM dd, yyyy',
      unit: 'Day',
    },
    bottomTier: {
      unit: 'Hour',
      format: 'h.mm a'
    },
  };
  public splitterSettings: any = {
    columnIndex: 3
  };
  public toolbar: any = ['Search'];
  public dayWorkingTime: any = [{ from: 0, to: 24 }]
  public labelSettings: any = {
    rightLabel: 'TaskName'
  };
  public actionCompleteEvent(args): any {
    if (args.requestType == "filterafteropen" && (args.columnName === "StartDate" || args.columnName === "EndDate")) {
      args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(1969, 5, 1);
      args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(1969, 8, 30);
      args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].showTodayButton = false;
      args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
    }
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Filtering' dataSource={filteredData} durationUnit='Hour' treeColumnIndex={0} toolbar={this.toolbar}
            allowFiltering={true} includeWeekend={true} allowSorting={true} dateFormat='MM/dd/yyyy hh:mm:ss'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} taskFields={this.taskFields}
            timelineSettings={this.timelineSettings} splitterSettings={this.splitterSettings}
            labelSettings={this.labelSettings} dayWorkingTime={this.dayWorkingTime}
            height='410px' actionComplete={this.actionCompleteEvent.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='TaskName' headerText='Task Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
              <ColumnDirective field='Duration' headerText='Duration'></ColumnDirective>
              <ColumnDirective field='EndDate' headerText='End Date'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Filter, Toolbar, Selection]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Apollo_11#Launch_and_flight_to_lunar_orbit"
              target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample visualizes the manned lunar mission, which landed the first human on the Moon using the Apollo 11
              spacecraft in the year 1969.
              This sample demonstrates the Filtering feature available in Gantt chart. You can
              filter a particular column using filter menu available in the columns. This sample is also enabled with toolbar
        searching option, using which you can filter the Gantt content across all the columns.</p>
        </div>

        <div id="description">
          <p>
            The filtering feature enables the user to view reduced amount of records based on filter criteria. The column
        menu filtering can be enabled by setting <code>allowFiltering</code> property as <code>true</code> and toolbar
                    search box can
                    be enabled
        by including the search item in the <code>toolbar</code> property.
        Gantt chart also provides support for a set of filtering modes with <code>hierarchyMode</code> property. The
                    below are the
                    type of filter mode available in Gantt chart.
        <li><code>Parent</code> - This is the default filter hierarchy mode in Gantt chart. The filtered records are
                        displayed with its
                        parent records, if the filtered records not have any parent record then the filtered record alone will be
            displayed.</li>
            <li><code>Child</code> - The filtered records are displayed with its child record, if the filtered records do
                not have any
            child record then only the filtered records are displayed.</li>
            <li><code>Both</code> - The filtered records are displayed with its both parent and child record. If the
                filtered records do
            not have any parent and child record then only the filtered records are displayed.</li>
            <li><code>None</code> - Only the filtered records are displayed.</li>
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use filtering feature, we need
            to inject <code>Filter</code> module, and use the toolbar support we need to inject <code>Toolbar</code> module.
            To use a selection, inject the <code>Selection</code> module.
          </p>
        </div>
      </div>
    )
  }
}
