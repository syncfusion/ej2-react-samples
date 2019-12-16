import * as React from 'react';
import { Day, Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
/**
 * schedule resources group-bydate sample
 */
export class GroupByDate extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.resourceData, null, true);
        this.resourceData = [
            { text: 'Alice', id: 1, color: '#1aaa55' },
            { text: 'Smith', id: 2, color: '#7fa900' },
        ];
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2018, 3, 1)} eventSettings={{
            dataSource: this.data, fields: {
                subject: { title: 'Task', name: 'Subject' },
                location: { title: 'Project Name', name: 'Location' },
                description: { title: 'Comments', name: 'Description' }
            }
        }} group={{ byDate: true, resources: ['Owners'] }}>
              <ResourcesDirective>
                <ResourceDirective field='TaskId' title='Assignee' name='Owners' allowMultiple={true} dataSource={this.resourceData} textField='text' idField='id' colorField='color'>
                </ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='Month'/>
                <ViewDirective option='Agenda'/>
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This demo illustrates the daily tasks of two employees grouped by date-wise.
          </p>
        </div>

        <div id="description">
          <p>
            In this demo, there are 2 resources defined namely
            <strong>Alice</strong> and
            <strong>Smith</strong> under the resource
            <code>dataSource</code>. The Scheduler can be switched to group by date, by setting
            <code>true</code> to the option
            <code>byDate</code> within the
            <code>group</code> property.
          </p>
        </div>
      </div>);
    }
}
