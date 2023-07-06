import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Day, Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop, GroupModel } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
import { ChangeEventArgs, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

/**
 * schedule resources group-bydate sample
 */

const GroupByDate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).resourceData, null, true) as Record<string, any>[];
  const [group, setGroup] = useState<GroupModel>({ byDate: true, hideNonWorkingDays: true, resources: ['Owners'] });
  const resourceData: Record<string, any>[] = [
    { text: 'Alice', id: 1, color: '#1aaa55', workDays: [1, 2, 3, 4] },
    { text: 'Smith', id: 2, color: '#7fa900', workDays: [2, 3, 5] },
  ];
  const onChange = (args: ChangeEventArgs): void => {
    setGroup({...group, hideNonWorkingDays: args.checked ? true : false});
  }
  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <CheckBoxComponent checked={true} label='Hide non working days' change={onChange}></CheckBoxComponent>
          <br />
          <br />
          <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2023, 0, 6)} eventSettings={{ dataSource: data, fields: { subject: { title: 'Task', name: 'Subject' }, location: { title: 'Project Name', name: 'Location' }, description: { title: 'Comments', name: 'Description' } } }} group={group} >
            <ResourcesDirective>
              <ResourceDirective field='TaskId' title='Assignee' name='Owners' allowMultiple={true} dataSource={resourceData} textField='text' idField='id' colorField='color' workDaysField='workDays' />
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
export default GroupByDate;