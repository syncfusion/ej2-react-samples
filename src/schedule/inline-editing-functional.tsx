import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScheduleComponent, TimelineViews, TimelineMonth, EventRenderedArgs, Inject, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, DragAndDrop, Resize, View, NavigatingEventArgs } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule inline editing sample
 */

const InlineEditing = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [currentView, setCurrentView] = useState<View>("TimelineWeek");
    const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).resourceData.concat((dataSource as Record<string, any>).timelineResourceData), null, true) as Record<string, any>[];
    const workDays: number[] = [0, 1, 2, 3, 4, 5];
    const categoriesData: Record<string, any>[] = [
        { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
        { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
        { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
        { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
        { text: 'Michael', id: 5, groupId: 3, color: '#df5286' }
    ];

    const onEventRendered = (args: EventRenderedArgs): void => {
        const categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
    const onNavigating = (args: NavigatingEventArgs): void => {
        setCurrentView(args.currentView as View)
    }
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent width='100%' height='650px' cssClass='inline-edit' workDays={workDays} currentView={currentView} allowInline={true} selectedDate={new Date(2023, 0, 4)} eventSettings={{ dataSource: data }} group={{ resources: ['Categories'] }} eventRendered={onEventRendered} navigating={onNavigating}>
                        <ResourcesDirective>
                            <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true} dataSource={categoriesData} textField='text' idField='id' colorField='color' />
                        </ResourcesDirective>
                        <ViewsDirective>
                            <ViewDirective option='TimelineWeek' />
                            <ViewDirective option='TimelineMonth' />
                        </ViewsDirective>
                        <Inject services={[TimelineViews, TimelineMonth, DragAndDrop, Resize]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id='action-description'>
                <p>This demo shows the experience of adding a new appointment or editing the existing appointment through inline mode. Click on the cells to add an appointment with the subject alone and click on the appointment to edit the subject of the appointment.</p>
            </div>
            <div id='description'>
                <p>The features enable user to add or edit the appointment through inline mode. Click on the cells or the existing appointments to enable inline mode. You can press the ENTER key on the selected cell or appointment.</p>
                <p>The feature activates when you enable the <code>allowInline</code> property.</p>
                <ul>
                    <li>For adding an appointment, the appointment will be created based on the selected time and subject once you focused-out or press ENTER key.</li>
                    <li>For editing an appointment, the appointment will be saved based on the modified subject.</li>
                </ul>
            </div>
        </div>
    );
}
export default InlineEditing;