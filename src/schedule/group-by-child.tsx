import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective,
  ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * schedule resources group-bychild sample
 */

export class GroupByChild extends SampleBase<{}, {}> {
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).resourceTeamData, null, true) as Record<string, any>[];
  private projectData: Record<string, any>[] = [
    { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
    { text: 'PROJECT 2', id: 2, color: '#56ca85' }
  ];
  private categoryData: Record<string, any>[] = [
    { text: 'Development', id: 1, color: '#1aaa55' },
    { text: 'Testing', id: 2, color: '#7fa900' }
  ];

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='group-bychild' width='100%' height='650px' selectedDate={new Date(2021, 5, 5)}
              currentView='WorkWeek' startHour='09:00' endHour='19:00' eventSettings={{
                dataSource: this.data, fields: {
                  subject: { title: 'Summary', name: 'Subject' },
                  description: { title: 'Comments', name: 'Description' }
                }
              }}
              group={{ byGroupID: false, resources: ['Projects', 'Categories'] }} >
              <ResourcesDirective>
                <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false}
                  dataSource={this.projectData} textField='text' idField='id' colorField='color'>
                </ResourceDirective>
                <ResourceDirective field='CategoryId' title='Category' name='Categories' allowMultiple={true}
                  dataSource={this.categoryData} textField='text' idField='id' colorField='color'>
                </ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='WorkWeek' />
                <ViewDirective option='Month' />
                <ViewDirective option='Agenda' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This demo illustrates the work progress under two different projects which are categorized as “Development” and “Testing”,
            since both the projects comes across the two common stages.
          </p>
        </div>
        <div id="description">
          <p>
            In this demo, there are two resource levels defined under the <code>resources</code> property – one with the name
            <code>Projects</code> and other with the name <code>Categories</code> respectively. Also, both the names are defined in the
            <code>group</code> property to allow two level hierarchical grouping. The order of grouping depends on the order of names
            passed onto the <code>resources</code> option within <code>group</code>. The requirement here is to categorize the sub-options
            that are common to both the projects and therefore to enable such grouping, it is necessary to set <code>byGroupID</code> option within the
            <code>groupID</code> – whereby allowing all the resources available in each child level to group under its parent resources.
            With this option available, we can avoid the need to provide multiple definitions of the same data to be grouped under
            different parent.
          </p>
          <p>
            Also, the colors defined at the last level resources will get applied to the events of those resources by default. In case,
            if the colors of parent level needs to be applied to child events, then it is necessary to define the
            <code>resourceColorField</code> option within the <code>eventSettings</code> property with the parent level resource name value.
          </p>
        </div>
      </div>
    );
  }
}