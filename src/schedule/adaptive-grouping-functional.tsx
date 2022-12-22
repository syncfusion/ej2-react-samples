import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import {
    ScheduleComponent, Day, Week, Month, Year, Resize, DragAndDrop, Inject, ResourcesDirective, ResourceDirective, GroupModel, ViewsDirective, ViewDirective
} from '@syncfusion/ej2-react-schedule';
import './custom-view.css';
import * as dataSource from './datasource.json';

/**
 *  Schedule adaptive grouping sample
 */

function AdaptiveGrouping() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const data: Record<string, any>[] =
        extend([], (dataSource as Record<string, any>).resourceData.concat((dataSource as Record<string, any>).timelineResourceData), null, true) as Record<string, any>[]
    const projectData: Record<string, any>[] = [
        { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
        { text: 'PROJECT 2', id: 2, color: '#56ca85' },
        { text: 'PROJECT 3', id: 3, color: '#df5286' }
    ];
    const categoryData: Record<string, any>[] = [
        { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
        { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
        { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
        { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
        { text: 'Michael', id: 5, groupId: 3, color: '#df5286' },
        { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
    ];
    let group: GroupModel = { resources: ['Projects', 'Categories'] };

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper schedule-wrapper'>
                    <ScheduleComponent width='100%' height='650px' id='schedule'
                        selectedDate={new Date(2023, 0, 4)} group={group} enableAdaptiveUI={true} currentView='Month' eventSettings={{ dataSource: data }}>
                        <ViewsDirective>
                            <ViewDirective option='Day' />
                            <ViewDirective option='Week' />
                            <ViewDirective option='Month' />
                        </ViewsDirective>
                        <ResourcesDirective>
                            <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false}
                                dataSource={projectData} textField='text' idField='id' colorField='color'>
                            </ResourceDirective>
                            <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true}
                                dataSource={categoryData} textField='text' idField='id' groupIDField='groupId' colorField='color'>
                            </ResourceDirective>
                        </ResourcesDirective>
                        <Inject services={[Day, Week, Month, Year, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This demo showcases how multiple resources are grouped in compact view and how events are portrayed in the scheduler view layouts.</p>
            </div>

            <div id="description">
                <p>
                    In this demo, we have showcased the Schedule views and resource grouping in the compact view mode with the help of the <code>enableAdaptiveUI</code> property.
                    In Scheduler view, only one resource has been shown to enhance the view experience of resource events details clearly.
                </p>
            </div>
        </div>
    );
}
export default AdaptiveGrouping;