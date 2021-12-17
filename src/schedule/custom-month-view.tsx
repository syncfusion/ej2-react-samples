import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { generateObject } from './helper';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule custom month view sample
 */

export class CustomMonthView extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent height='650px' eventSettings={{ dataSource: generateObject(new Date(2021, 11, 19).getTime(), new Date(2022, 2, 12).getTime(), true) }}>
                            <ViewsDirective>
                                <ViewDirective option='Month' displayDate={new Date(2022, 0, 16)} numberOfWeeks={4} />
                            </ViewsDirective>
                            <Inject services={[Month, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div id='action-description'>
                    <p>
                        This demo showcases how to customize the starting week of the month and also customize the number of weeks to be
                        rendered in month view.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this demo, the starting week of the month view can be customized by using the <code>displayDate</code>
                        property and also the number of weeks to be rendered in a month view can be customized by using the
                        <code>numberOfWeeks</code> property. These properties have been configured under the <code>ViewDirective</code>.
                        <code>displayDate</code> and <code>numberOfWeeks</code> properties can be applicable only for month view.
                    </p>
                </div>
            </div>
        );
    }
}