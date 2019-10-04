import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective,
    EventRenderedArgs, Inject, TimelineYear, Orientation
} from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule Year view sample
 */

export class Year extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private data: Object[] = this.generateEvents();
    private orientationOptions: { [key: string]: Object }[] = [
        { text: 'Horizontal', value: 'Horizontal' },
        { text: 'Vertical', value: 'Vertical' }
    ];
    private fields: object = { text: 'text', value: 'value' };

    private orientationChange(args: ChangeEventArgs): void {
        this.scheduleObj.views = [{ option: 'TimelineYear', orientation: args.value as Orientation }];
        this.scheduleObj.dataBind();
    }

    private onEventRendered(args: EventRenderedArgs): void {
        this.applyEventColor(args);
    }

    private generateEvents(count: number = 250, yearCount: number = 5, date: Date = new Date()): Object[] {
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
                EventColor: colors[n]
            });
            id++;
        }
        return dateCollections;
    }

    private applyEventColor(args: EventRenderedArgs): void {
        let eventColor: string = args.data.EventColor as string;
        if (!args.element || !eventColor) {
            return;
        } else {
            args.element.style.backgroundColor = eventColor;
        }
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent width='100%' height='555px' ref={schedule => this.scheduleObj = schedule}
                            currentView='WorkWeek' eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
                            <ViewsDirective>
                                <ViewDirective option='TimelineYear' displayName='Horizontal Year' />
                            </ViewsDirective>
                            <Inject services={[TimelineYear]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div className='col-md-4' style={{ paddingTop: '8px' }}>Orientation</div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div>
                                            <DropDownListComponent style={{ padding: '6px' }} value={'Horizontal'} dataSource={this.orientationOptions}
                                                fields={this.fields} change={this.orientationChange.bind(this)} popupWidth='180px'>
                                            </DropDownListComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id='action-description'>
                    <p>This demo showcases how the scheduler looks like in Year view with its default set of configurations.</p>
                </div>
                <div id='description'>
                    <p>
                        This demo showcases how the scheduler looks like in Year view with its default set of configurations. In this demo, the active view of Scheduler is set to
        <code>Vertical Year</code> and <code>Horizontal Year</code> view options are provided to
        <code>views</code> property.
    </p>
                    <p>
                        <strong>Module Injection</strong>
                    </p>
                    <p>To work with Year view on Scheduler – it is necessary to inject the TimelineYear module like
          using <code>services</code> property under <code>Inject</code> tag.
          </p>
                </div>
            </div>
        );
    }
}