import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, Agenda,
    TimelineViews, TimelineMonth, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule timeline sample
 */

export class TimelineView extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private data: Object[] =
        extend([], (dataSource as any).scheduleData.concat((dataSource as any).timelineData), null, true) as Object[];
    private change(args: ChangeEventArgs): void {
        this.scheduleObj.selectedDate = args.value;
        this.scheduleObj.dataBind();
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent height='650px' ref={schedule => this.scheduleObj = schedule}
                            selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: this.data }}>
                            <ViewsDirective>
                                <ViewDirective option='TimelineDay' />
                                <ViewDirective option='TimelineWeek' />
                                <ViewDirective option='TimelineWorkWeek' />
                                <ViewDirective option='TimelineMonth' />
                                <ViewDirective option='Agenda' />
                            </ViewsDirective>
                            <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div className='col-md-4' style={{ paddingTop: '8px' }}>Current Date</div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div className='datepicker-control-section'>
                                            <DatePickerComponent value={new Date(2019, 0, 10)} showClearButton={false}
                                                change={this.change.bind(this)}></DatePickerComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This demo showcases how the timeline scheduler looks like with its default set of configurations.</p>
                </div>
                <div id='description'>
                    <p>
                        Like the vertical scheduler, timeline view has the similar view types such as    </p>
                    <ul>
                        <li>Timeline Day</li>
                        <li>Timeline Week</li>
                        <li>Timeline WorkWeek</li>
                        <li>Timeline Month</li>
                    </ul>
                    <p>The Agenda and MonthAgenda views shares the same layout for both the vertical and timeline views.</p>
                    <p>To use any of the timeline views such as day, week and work week in your application, the common
                        <code>TimelineViews</code> module needs to be injected using
                        <code>services</code> property under <code>Inject</code> tag. If in case, the timeline month view needs to be utilized, then
                        <code>TimelineMonth</code> module needs to be injected.
                    </p>
                </div>
            </div>
        );
    }
}