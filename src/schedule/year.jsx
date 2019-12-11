import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Inject, TimelineYear } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
/**
 * Schedule Year view sample
 */
export class Year extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = this.generateEvents();
        this.orientationOptions = [
            { text: 'Horizontal', value: 'Horizontal' },
            { text: 'Vertical', value: 'Vertical' }
        ];
        this.fields = { text: 'text', value: 'value' };
    }
    orientationChange(args) {
        this.scheduleObj.views = [{ option: 'TimelineYear', orientation: args.value }];
        this.scheduleObj.dataBind();
    }
    onEventRendered(args) {
        this.applyEventColor(args);
    }
    generateEvents(count = 250, yearCount = 5, date = new Date()) {
        let names = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        let colors = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        let startDate = new Date(date.getFullYear() - 2, 0, 1);
        let endDate = new Date(date.getFullYear() + 2, 11, 31);
        let dateCollections = [];
        for (let a = 0, id = 1; a < count; a++) {
            let start = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
            let end = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
            let nCount = Math.floor(Math.random() * names.length);
            let n = Math.floor(Math.random() * colors.length);
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
    applyEventColor(args) {
        let eventColor = args.data.EventColor;
        if (!args.element || !eventColor) {
            return;
        }
        else {
            args.element.style.backgroundColor = eventColor;
        }
    }
    render() {
        return (<div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent width='100%' height='555px' ref={schedule => this.scheduleObj = schedule} currentView='WorkWeek' eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
                            <ViewsDirective>
                                <ViewDirective option='TimelineYear' displayName='Horizontal Year'/>
                            </ViewsDirective>
                            <Inject services={[TimelineYear]}/>
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
                                            <DropDownListComponent style={{ padding: '6px' }} value={'Horizontal'} dataSource={this.orientationOptions} fields={this.fields} change={this.orientationChange.bind(this)} popupWidth='180px'>
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
            </div>);
    }
}
