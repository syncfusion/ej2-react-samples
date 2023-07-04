import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { TimelineViews, TimelineMonth, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './timeline-resource-grouping.css';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * schedule timeline resource grouping sample
 */

const TimelineGrouping = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data: Record<string, any>[] =
        extend([], (dataSource as Record<string, any>).resourceData.concat((dataSource as Record<string, any>).timelineResourceData), null, true) as Record<string, any>[];
    const workDays: number[] = [0, 1, 2, 3, 4, 5];
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

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent cssClass='timeline-resource-grouping' width='100%' height='650px' selectedDate={new Date(2023, 0, 4)} currentView='TimelineWeek' workDays={workDays} eventSettings={{ dataSource: data }} group={{ resources: ['Projects', 'Categories'] }} >
                        <ResourcesDirective>
                            <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false} dataSource={projectData} textField='text' idField='id' colorField='color' />
                            <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true} dataSource={categoryData} textField='text' idField='id' groupIDField='groupId' colorField='color' />
                        </ResourcesDirective>
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
            <div id="action-description">
                <p>This demo showcases how the multiple resources are grouped as well as how the events are portrayed in timeline view layouts.</p>
            </div>
            <div id="description">
                <p>
                    In the timeline view, each row depicts a single resource whereas in vertical views, each resource are grouped parallelly
                    as columns. Here, the resource grouping follows the tree-view like hierarchical grouping structure and can contain
                    any level of child resources. In this sample, we have used two level hierarchy, where the
                    <code>PROJECT 1</code> and
                    <code>PROJECT 2</code> are the parent level and the
                    <code>development</code> and
                    <code>testing</code> are child level resources which are defined using the
                    <code>resources</code> property. They are grouped in layout by making use of the
                    <code>group</code> property and its order of grouping depends on the order of names passed onto the
                    <code>resources</code> option within
                    <code>group</code>.
                </p>
                <p>
                    Also, the colors defined for the child level resources will get applied to the events of those resources by default. In case,
                    if the colors of parent level needs to be applied to those child events, then it is necessary to define the
                    <code>resourceColorField</code> option within the
                    <code>eventSettings</code> property with the parent level resource name value.
                </p>
            </div>
        </div>
    );
}
export default TimelineGrouping;