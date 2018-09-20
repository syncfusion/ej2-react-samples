import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Month, TimelineViews, TimelineMonth, ScheduleComponent, ViewsDirective,
    ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './add-remove-resources.css';
import { holidayData, birthdayData, companyData, personalData } from './datasource';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * schedule add and remove resources dynamically
 */

export class AddRemoveResources extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private calendarCollections: Object[] = [
        { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
        { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
        { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
        { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
    ];

    private generateCalendarData(): Object[] {
        return [...personalData, ...companyData, ...birthdayData, ...holidayData];
    }

    private onChange(args: ChangeEventArgs): void {
        let value: number = parseInt((args.event.target as Element).getAttribute('value'), 10);
        let resourceData: Object[] = this.calendarCollections.filter((calendar: { [key: string]: Object }) => calendar.CalendarId === value);
        if (args.checked) {
            this.scheduleObj.addResource(resourceData[0], 'Calendars', value - 1);
        } else {
            this.scheduleObj.removeResource(value, 'Calendars');
        }
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent cssClass='dynamic-resource' ref={schedule => this.scheduleObj = schedule} width='100%' height='650px' selectedDate={new Date(2018, 3, 1)} group={{ resources: ['Calendars'] }}
                            eventSettings={{ dataSource: this.generateCalendarData() }} >
                            <ResourcesDirective>
                                <ResourceDirective field='CalendarId' title='Calendars' name='Calendars' allowMultiple={true}
                                    dataSource={[this.calendarCollections[0]]} textField='CalendarText' idField='CalendarId' colorField='CalendarColor'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            < ViewsDirective >
                                <ViewDirective option='Month' />
                                <ViewDirective option='TimelineWeek' />
                                <ViewDirective option='TimelineMonth' />
                            </ViewsDirective>
                            <Inject services={[Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Show / Hide Resource'>
                        <table id='property' title='Show / Hide Resource' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='1' id='personal' cssClass='personal' checked={true} label='My Calendar' disabled={true}
                                            change={this.onChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='2' id='company' cssClass='company' checked={false} label='Company'
                                            change={this.onChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='3' id='birthdays' cssClass='birthday' checked={false} label='Birthday'
                                            change={this.onChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='4' id='holidays' cssClass='holiday' checked={false} label='Holiday'
                                            change={this.onChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This demo illustrates how to dynamically add or remove resources to and from the Schedule layout.
                    </p>
                </div>

                <div id="description">
                    <p>
                        In this demo, Schedule is initially displayed with single resource with its related set of appointments. When the additional
                        checkboxes given are checked and unchecked, the respective resources gets added up or removed from the schedule layout.
                        To add new resources dynamically,
                        <code>addResource</code> method is used which accepts the arguments such as resource object, resource name (within which level, the resource
                        object to be added) and index (position where the resource needs to be added). To remove the resources dynamically,
                        <code>removeResource</code> method is used which accepts the index (position from where the resource to be removed) and resource name (within
                        which level, the resource object presents) as parameters.
                    </p>
                </div>
            </div>
        );
    }
}
