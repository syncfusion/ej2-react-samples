import * as React from 'react';
import { Day, WorkWeek, Month, ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './group-editing.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
/**
 * schedule resources group-editing sample
 */
export class GroupEditing extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.resourceConferenceData, null, true);
        this.resourceData = [
            { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
            { Text: 'Robert', Id: 2, Color: '#357cd2' },
            { Text: 'Laura', Id: 3, Color: '#7fa900' }
        ];
    }
    getEmployeeName(value) {
        return ((value.resourceData) ?
            value.resourceData[value.resource.textField] :
            value.resourceName);
    }
    getEmployeeImage(value) {
        let resourceName = this.getEmployeeName(value);
        return resourceName.replace(' ', '-').toLowerCase();
    }
    getEmployeeDesignation(value) {
        let resourceName = this.getEmployeeName(value);
        return (resourceName === 'Margaret') ? 'Sales Representative' : (resourceName === 'Robert') ?
            'Vice President, Sales' : 'Inside Sales Coordinator';
    }
    monthEventTemplate(props) {
        return (<div className="subject">{props.Subject}</div>);
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap"><div className={"resource-image " + this.getEmployeeImage(props)}></div>
      <div className="resource-details"><div className="resource-name">{this.getEmployeeName(props)}</div>
        <div className="resource-designation">{this.getEmployeeDesignation(props)}</div></div></div>);
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='group-editing' width='100%' height='650px' selectedDate={new Date(2018, 5, 5)} currentView='WorkWeek' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{
            dataSource: this.data,
            fields: {
                subject: { title: 'Conference Name', name: 'Subject' },
                description: { title: 'Summary', name: 'Description' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' }
            }
        }} group={{ allowGroupEdit: true, resources: ['Conferences'] }}>
              <ResourcesDirective>
                <ResourceDirective field='ConferenceId' title='Attendees' name='Conferences' allowMultiple={true} dataSource={this.resourceData} textField='Text' idField='Id' colorField='Color'>
                </ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='WorkWeek'/>
                <ViewDirective option='Month' eventTemplate={this.monthEventTemplate.bind(this)}/>
                <ViewDirective option='TimelineWeek'/>
              </ViewsDirective>
              <Inject services={[Day, WorkWeek, Month, TimelineViews, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This demo illustrates the usage of single event that are shared by multiple resources.
          </p>
        </div>
        <div id="description">
          <p>
            <code>allowGroupEdit</code> option is set to true within the
            <code>group</code> property to enable the same event to be shared with multiple resources. With this property enabled, a
            single appointment object will be maintained within the appointment collection, even if it is shared by more than one resource
             – whereas the resource fields of such appointment object will hold the IDs of the multiple resources separated by commas. Any
            actions such as create, edit or delete held on any one of the event, will be reflected on all other related instances
            visible on the UI. The
            <code>allowMultiple</code> option when set as true within the
            <code>resource</code> property, will allow the user to select multiple resources from the resource field of editor window,
             while trying to create appointments.
          </p>
        </div>
      </div>);
    }
}
