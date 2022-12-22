import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, Inject, Day, WorkWeek, Month, Week, Agenda, ViewDirective
} from '@syncfusion/ej2-react-schedule';
import { SampleBase } from '../common/sample-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
/**
 * schedule google calendar integration sample
 */

export class CalendarIntegration extends SampleBase<{}, {}> {
    private calendarId: string = 'en.usa%23holiday@group.v.calendar.google.com';
    private publicKey: string = 'AIzaSyBgbX_tgmVanBP4yafDPPXxWr70sjbKAXM';
    private dataManger: DataManager = new DataManager({
        url: 'https://www.googleapis.com/calendar/v3/calendars/' + this.calendarId + '/events?key=' + this.publicKey,
        adaptor: new WebApiAdaptor(),
        crossDomain: true
    });

    private onDataBinding(e: Record<string, any>): void {
        let items: Record<string, any>[] = (e.result as Record<string, Record<string, any>[]>).items;
        let scheduleData: Record<string, any>[] = [];
        if (items.length > 0) {
            for (let event of items) {
                let when: string = event.start.dateTime as string;
                let start: string = event.start.dateTime as string;
                let end: string = event.end.dateTime as string;
                if (!when) {
                    when = event.start.date as string;
                    start = event.start.date as string;
                    end = event.end.date as string;
                }
                scheduleData.push({
                    Id: event.id,
                    Subject: event.summary,
                    StartTime: new Date(start),
                    EndTime: new Date(end),
                    IsAllDay: !event.start.dateTime
                });
            }
        }
        e.result = scheduleData;
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper drag-sample-wrapper'>
                        <div className="schedule-container">
                            <ScheduleComponent width='100%' height='650px'  readonly={true}
                                eventSettings={{ dataSource: this.dataManger }} dataBinding={this.onDataBinding.bind(this)} currentView='Month' timezone='UTC'>
                                <ViewsDirective>
                                    <ViewDirective option='Day' />
                                    <ViewDirective option='Week' />
                                    <ViewDirective option='WorkWeek' />
                                    <ViewDirective option='Month' />
                                    <ViewDirective option='Agenda' />
                                </ViewsDirective>
                                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                            </ScheduleComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This example illustrates how to load and integrate events data from the Google Calendar into our Scheduler.
                    </p>
                </div>
                <div id="description">
                    <p> In this example, we have assigned our custom created Google Calendar url to the DataManager and assigned the
                        same to the Scheduler <code>dataSource</code> within the <code>eventSettings</code> API. Since the events data
                        retrieved from the Google Calendar will be in its own object format, therefore it needs to be resolved manually
                        within the Scheduler’s <code>dataBinding</code> event. Within this <code>dataBinding</code> event, the event fields
                        needs to be mapped properly and then assigned to the result.
                    </p>
                </div>
            </div>
        );
    }
}

