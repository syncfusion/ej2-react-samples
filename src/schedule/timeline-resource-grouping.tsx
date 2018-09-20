import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    TimelineViews, TimelineMonth, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective,
    ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './timeline-resource-grouping.css';
import { resourceData, timelineResourceData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 * schedule timeline resource grouping sample
 */

export class TimelineGrouping extends SampleBase<{}, {}> {
    private data: Object[] = extend([], resourceData.concat(timelineResourceData), null, true) as Object[];
    private projectData: Object[] = [
        { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
        { text: 'PROJECT 2', id: 2, color: '#56ca85' },
        { text: 'PROJECT 3', id: 3, color: '#df5286' }
    ];
    private categoryData: Object[] = [
        { text: 'Development', id: 1, color: '#df5286' },
        { text: 'Testing', id: 2, color: '#7fa900' }
    ];

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent cssClass='timeline-resource-grouping' width='100%' height='650px' selectedDate={new Date(2018, 3, 4)}
                            currentView='TimelineWeek' eventSettings={{
                                dataSource: this.data
                            }}
                            group={{ byGroupID: false, resources: ['Projects', 'Categories'] }} >
                            <ResourcesDirective>
                                <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false}
                                    dataSource={this.projectData} textField='text' idField='id' colorField='color'>
                                </ResourceDirective>
                                <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true}
                                    dataSource={this.categoryData} textField='text' idField='id' colorField='color'>
                                </ResourceDirective>
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
                    <p>
                        This demo showcases how the multiple resources are grouped as well as how the events are portrayed in timeline view layouts.
                </p>
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
}