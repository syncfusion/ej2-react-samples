import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective,
    TimelineMonth, getWeekNumber, Inject, CellTemplateArgs, EventRenderedArgs,
    HeaderRowDirective, HeaderRowsDirective, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './resources.css';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';

/**
 * schedule header rows sample
 */

export class HeaderRows extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as any).headerRowData, null, true) as Object[];
    private scheduleObj: ScheduleComponent;
    private instance: Internationalization = new Internationalization();
    private getMonthDetails(value: CellTemplateArgs) {
        return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'yMMMM' });
    }
    private getWeekDetails(value: CellTemplateArgs) {
        return 'Week ' + getWeekNumber((value as CellTemplateArgs).date);;
    }

    private monthTemplate(props): JSX.Element {
        return (<span className="month">{this.getMonthDetails(props)}</span>);
    }

    private weekTemplate(props): JSX.Element {
        return (<span className="week">{this.getWeekDetails(props)}</span>);
    }
    private onEventRendered(args: EventRenderedArgs): void {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent ref={schedule => this.scheduleObj = schedule} width='100%'
                            height='650px' selectedDate={new Date(2018, 0, 1)}
                            eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
                            <HeaderRowsDirective>
                                <HeaderRowDirective option='Month' template={this.monthTemplate.bind(this)} />
                                <HeaderRowDirective option='Week' template={this.weekTemplate.bind(this)} />
                                <HeaderRowDirective option='Date' />
                            </HeaderRowsDirective>
                            < ViewsDirective >
                                <ViewDirective option='TimelineMonth' interval={12} />
                            </ViewsDirective>
                            < Inject services={[TimelineMonth, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This demo showcases how to display the additional header rows on timeline view. In this demo, an additional row for displaying
        <b>month</b> and
        <b>week number</b> has been added.
    </p>
                </div>

                <div id="description">
                    <p>
                        Unlike the usual date and time rows, timeline view can be displayed with additional header rows to display the years, months
                        and week numbers. To do so, define the
        <code>headerRows</code> property which accepts an array of object and each object includes the
        <code>option</code> API to define the specific header row type such as
        <code>Year</code>,
        <code>Month</code>,
        <code>Week</code> and
        <code>Date</code>. The object also includes the
        <code>template</code> option to provide label customization on these rows. This
        <code>headerRows</code> property is application only on timeline views.
    </p>

                </div>
            </div>
        );
    }
}
