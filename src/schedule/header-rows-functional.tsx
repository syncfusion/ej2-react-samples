import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, TimelineMonth, getWeekNumber, Inject, CellTemplateArgs, EventRenderedArgs, HeaderRowDirective, HeaderRowsDirective, Resize, DragAndDrop, getWeekLastDate } from '@syncfusion/ej2-react-schedule';
import './resources.css';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';

/**
 * schedule header rows sample
 */

const HeaderRows = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).headerRowData, null, true) as Record<string, any>[];
    const scheduleObj = useRef<ScheduleComponent>(null);
    const instance: Internationalization = new Internationalization();

    const getMonthDetails = (value: CellTemplateArgs) => {
        return instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'yMMMM' });
    }

    const getWeekDetails = (value: CellTemplateArgs) => {
        return 'Week ' + getWeekNumber(getWeekLastDate(value.date, 0));
    }

    const monthTemplate = (props) => {
        return (<span className="month">{getMonthDetails(props)}</span>);
    }

    const weekTemplate = (props) => {
        return (<span className="week">{getWeekDetails(props)}</span>);
    }

    const onEventRendered = (args: EventRenderedArgs): void => {
        applyCategoryColor(args, scheduleObj.current.currentView);
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent ref={scheduleObj} width='100%' height='650px' selectedDate={new Date(2021, 0, 1)} eventSettings={{ dataSource: data }} eventRendered={onEventRendered}>
                        <HeaderRowsDirective>
                            <HeaderRowDirective option='Month' template={monthTemplate} />
                            <HeaderRowDirective option='Week' template={weekTemplate} />
                            <HeaderRowDirective option='Date' />
                        </HeaderRowsDirective>
                        < ViewsDirective >
                            <ViewDirective option='TimelineMonth' interval={12} />
                        </ViewsDirective>
                        <Inject services={[TimelineMonth, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This demo showcases how to display the additional header rows on timeline view. In this demo, an additional row for displaying
                    <b>month</b> and <b>week number</b> has been added.
                </p>
            </div>
            <div id="description">
                <p>
                    Unlike the usual date and time rows, timeline view can be displayed with additional header rows to display the years, months
                    and week numbers. To do so, define the <code>headerRows</code> property which accepts an array of object and each object includes the
                    <code>option</code> API to define the specific header row type such as <code>Year</code>, <code>Month</code>, <code>Week</code> and
                    <code>Date</code>. The object also includes the <code>template</code> option to provide label customization on these rows. This
                    <code>headerRows</code> property is application only on timeline views.
                </p>
            </div>
        </div>
    );
}
export default HeaderRows;