import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective,
    EventRenderedArgs, Inject, Year as YearView, TimelineYear
} from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule Year view sample
 */

export class Year extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private categoriesData: Object[] = [
        { text: 'Nancy', id: 1, color: '#df5286' },
        { text: 'Steven', id: 2, color: '#7fa900' },
        { text: 'Robert', id: 3, color: '#ea7a57' },
        { text: 'Smith', id: 4, color: '#5978ee' },
        { text: 'Micheal', id: 5, color: '#df5286' }
    ];
    private data: Object[] = this.generateEvents();

    private onEventRendered(args: EventRenderedArgs): void {
        let eventColor: string = args.data.EventColor as string;
        if (!args.element || !eventColor) {
            return;
        } else {
            args.element.style.backgroundColor = eventColor;
        }
    }

    private generateEvents(count: number = 250, date: Date = new Date()): Object[] {
        let names: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        let colors: string[] = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        let startDate: Date = new Date(date.getFullYear() - 2, 0, 1);
        let endDate: Date = new Date(date.getFullYear() + 2, 11, 31);
        let dateCollections: Object[] = [];
        for (let a: number = 0, id: number = 1; a < count; a++) {
            let start: Date = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
            let end: Date = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
            let nCount: number = Math.floor(Math.random() * names.length);
            let n: number = Math.floor(Math.random() * colors.length);
            dateCollections.push({
                Id: id,
                Subject: names[nCount],
                StartTime: new Date(start.getTime()),
                EndTime: new Date(end.getTime()),
                IsAllDay: (id % 10) ? true : false,
                EventColor: colors[n],
                TaskId: (id % 5) + 1
            });
            id++;
        }
        return dateCollections;
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent width='100%' height='555px' ref={schedule => this.scheduleObj = schedule}
                            eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
                            <ResourcesDirective>
                                <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true}
                                    dataSource={this.categoriesData} textField='text' idField='id' colorField='color'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option='Year' />
                                <ViewDirective option='TimelineYear' displayName='Horizontal TimelineYear' isSelected={true} />
                                <ViewDirective option='TimelineYear' displayName='Vertical TimelineYear' orientation="Vertical" group={{ resources: ['Categories'] }} />
                            </ViewsDirective>
                            <Inject services={[YearView, TimelineYear, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This demo shows the experience of showing the annual year events in a single view with different orientations.</p>
                </div>
                <div id='description'>
                    <p>
                        In this demo, we have showcased the year and timeline year views that help to view the appointment in an annual calendar view. The view options are enabled by using the views property.
                        In the <code>TimelineYear</code>, <code>Horizontal</code> and <code>Vertical</code> orientations are available to view the events with a different layout.
                    </p>
                    <p>
                        <strong>Module Injection</strong>
                    </p>
                    <p>To work with Year view on Scheduler – it is necessary to inject the Year and TimelineYear module like using <code>services</code> property under <code>Inject</code> tag.</p>
                </div>
            </div>
        );
    }
}