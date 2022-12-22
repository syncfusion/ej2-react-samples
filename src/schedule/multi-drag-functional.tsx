import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Month, TimelineMonth, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * schedule multiple dragging sample
 */

function MultiDrag() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const data: Record<string, any>[] =
        extend([], (dataSource as Record<string, any>).resourceData.concat((dataSource as Record<string, any>).timelineResourceData), null, true) as Record<string, any>[];
    const ownerData: Record<string, any>[] = [
        { text: 'Nancy', id: 1, color: '#df5286' },
        { text: 'Steven', id: 2, color: '#7fa900' },
        { text: 'Robert', id: 3, color: '#ea7a57' },
        { text: 'Smith', id: 4, color: '#5978ee' },
        { text: 'Michael', id: 5, color: '#df5286' }
    ];

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2023, 0, 4)} currentView='Month' allowMultiDrag={true}
                        allowResizing={false} showQuickInfo={false} eventSettings={{ dataSource: data }} group={{ resources: ['Owners'] }} >
                        <ResourcesDirective>
                            <ResourceDirective field='TaskId' title='Owners' name='Owners'
                                dataSource={ownerData} textField='text' idField='id' colorField='color'>
                            </ResourceDirective>
                        </ResourcesDirective>
                        <ViewsDirective>
                            <ViewDirective option='Month' />
                            <ViewDirective option='TimelineMonth' />
                        </ViewsDirective>
                        <Inject services={[Month, TimelineMonth, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example showcases how to select the multiple events and drag them simultaneously. We can select multiple events by pressing the CTRL key with a click. We can also drag the multiple events from one resource to another resource.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, <code>allowMultiDrag</code> property is set as <code>true</code> to drag the multiple selected events simultaneously . We can simply reschedule the multiple events in single drag action. We can select multiple events by pressing the CTRL key. Once the events are selected, we can leave the CTRL key and start dragging the event.
                </p>
                <p>
                    Here, we can also drag the multiple events from one resource to another resource. In this case, if all the selected events are in the different resources, then all the events should be moved to the single resource which is related to the target event.
                </p>
            </div>
        </div>
    );
}
export default MultiDrag;