import * as React from 'react';
import { useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule OverlapEvents sample
 */

const OverlapEvents = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleOverlapData, null, true) as Record<string, any>[];

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent width='100%' height='550px' selectedDate={new Date(2025, 1, 12)} eventSettings={{ dataSource: data }} allowOverlap={false}>
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
                    This demo explains how to restrict overlapping appointments within the same time range in the React Scheduler component.</p>
            </div>
            <div id="description">
                <p> This example uses the Scheduler's <code>allowOverlap</code> API to prevent overlapping events. By default, it's <code>true</code>, allowing overlaps. When set to <code>false</code>, events cannot be added, edited, dragged, or resized to overlap with others.</p>
            </div>
        </div>
    );
}
export default OverlapEvents;