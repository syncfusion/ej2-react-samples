import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  Day, Week, Month, Agenda, ScheduleComponent, ViewsDirective,
  ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
import { ChangeEventArgs, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

/**
 * schedule resources group-bydate sample
 */

export class GroupByDate extends SampleBase<{}, {}> {
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).resourceData, null, true) as Record<string, any>[];
  private scheduleObj: ScheduleComponent;
  private resourceData: Record<string, any>[] = [
    { text: 'Alice', id: 1, color: '#1aaa55', workDays: [1, 2, 3, 4] },
    { text: 'Smith', id: 2, color: '#7fa900', workDays: [2, 3, 5] }
  ];
  private onChange(args: ChangeEventArgs): void {
    if (args.checked) {
      this.scheduleObj.group.hideNonWorkingDays = true;
    }
    else {
      this.scheduleObj.group.hideNonWorkingDays = false;
    }
  }
  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <CheckBoxComponent checked={true} label='Hide non working days' change={this.onChange.bind(this)}></CheckBoxComponent>
            <br></br>
            <ScheduleComponent ref={schedule => this.scheduleObj = schedule} width='100%' height='650px' selectedDate={new Date(2023, 0, 6)}
              eventSettings={{
                dataSource: this.data, fields: {
                  subject: { title: 'Task', name: 'Subject' },
                  location: { title: 'Project Name', name: 'Location' },
                  description: { title: 'Comments', name: 'Description' }
                }
              }}
              group={{ byDate: true, hideNonWorkingDays: true, resources: ['Owners'] }} >
              <ResourcesDirective>
                <ResourceDirective field='TaskId' title='Assignee' name='Owners' allowMultiple={true}
                  dataSource={this.resourceData} textField='text' idField='id' colorField='color' workDaysField='workDays'>
                </ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='Month' />
                <ViewDirective option='Agenda' />
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This demo illustrates the daily tasks of two employees grouped by date-wise.</p>
        </div>
        <div id="description">
          <p>
            In this demo, there are 2 resources defined namely <strong>Alice</strong> and <strong>Smith</strong> under the resource
            <code>dataSource</code>. The Scheduler can be switched to group by date, by setting <code>true</code> to the option
            <code>byDate</code> within the <code>group</code> property.
          </p>
          <p>
            The different work days for the each resources are provided by using the <code>workDaysField</code> property and the Scheduler
            will be displayed the provided dates alone when <code>hideNonWorkingDays</code> property set as <code>true</code>.
          </p>
        </div>
      </div>
    );
  }
}
