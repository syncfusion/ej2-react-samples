import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { generateObject } from './helper';
import { updateSampleSection } from '../common/sample-base';

/**
 * Schedule custom month view sample
 */

const CustomMonthView = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent height='650px' eventSettings={{ dataSource: generateObject(new Date(2021, 11, 19).getTime(), new Date(2022, 2, 12).getTime(), true) }}>
                        <ViewsDirective>
                            <ViewDirective option='Month' displayDate={new Date(2022, 0, 16)} numberOfWeeks={4} maxEventsPerRow={3} />
                        </ViewsDirective>
                        <Inject services={[Month, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id='action-description'>
                <p>
                    This demo showcases how to customize the starting week of the month, the number of weeks rendered, and 
                    the maximum number of events rendered in month view.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo, the starting week of the month view is customized by using the <code>displayDate</code>
                    property. The number of weeks rendered in a month is customized by using the <code>numberOfWeeks</code>
                    property and the maximum number of events displayed in a single row is customized by using the
                    <code>maxEventsPerRow</code> property. These properties have been configured under the <code>views</code>
                    property view options. <code>displayDate</code> and <code>numberOfWeeks</code> properties can be applicable only
                    for month view. The <code>maxEventsPerRow</code> property is only applicable for month, timeline, and timeline
                    year views.
                </p>
            </div>
        </div>
    );
}
export default CustomMonthView;