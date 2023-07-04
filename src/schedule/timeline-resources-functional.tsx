import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, TimelineViews, Inject, EventRenderedArgs, ResourcesDirective, ResourceDirective, ResourceDetails, ActionEventArgs, RenderCellEventArgs, PopupOpenEventArgs, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './timeline-resources.css';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * schedule room scheduler sample
 */

const TimelineResource = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).roomData, null, true) as Record<string, any>[];
    let scheduleObj = useRef<ScheduleComponent>(null);
    const ownerData: Record<string, any>[] = [
        { text: 'Jammy', id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
        { text: 'Tweety', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
        { text: 'Nestle', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' },
        { text: 'Phoenix', id: 4, color: '#fec200', capacity: 15, type: 'Conference' },
        { text: 'Mission', id: 5, color: '#df5286', capacity: 25, type: 'Conference' },
        { text: 'Hangout', id: 6, color: '#00bdae', capacity: 10, type: 'Cabin' },
        { text: 'Rick Roll', id: 7, color: '#865fcf', capacity: 20, type: 'Conference' },
        { text: 'Rainbow', id: 8, color: '#1aaa55', capacity: 8, type: 'Cabin' },
        { text: 'Swarm', id: 9, color: '#df5286', capacity: 30, type: 'Conference' },
        { text: 'Photogenic', id: 10, color: '#710193', capacity: 25, type: 'Conference' }
    ];

    const getRoomName = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField];
    }

    const getRoomType = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData.type;
    }

    const getRoomCapacity = (value: ResourceDetails) => {
        return (value as ResourceDetails).resourceData.capacity;
    }

    const isReadOnly = (endDate: Date): boolean => {
        return (endDate < new Date(2021, 6, 31, 0, 0));
    }

    const resourceHeaderTemplate = (props) => {
        return (
            <div className="template-wrap">
                <div className="room-name">{getRoomName(props)}</div>
                <div className="room-type">{getRoomType(props)}</div>
                <div className="room-capacity">{getRoomCapacity(props)}</div>
            </div>
        );
    }

    const onActionBegin = (args: ActionEventArgs): void => {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
            args.cancel = !scheduleObj.current.isSlotAvailable(data);
        }
    }

    const onEventRendered = (args: EventRenderedArgs): void => {
        let data: Record<string, any> = args.data;
        if (isReadOnly(data.EndTime as Date)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    }

    const onRenderCell = (args: RenderCellEventArgs): void => {
        if (args.element.classList.contains('e-work-cells')) {
            if (args.date < new Date(2021, 6, 31, 0, 0)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only-cells');
            }
        }
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            let target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
            target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
        }
    }

    const onPopupOpen = (args: PopupOpenEventArgs): void => {
        let data: Record<string, any> = args.data as Record<string, any>;
        if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
            let target: HTMLElement = (args.type === 'RecurrenceAlert' ||
                args.type === 'DeleteAlert') ? args.element[0] : args.target;
            if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
                if ((target.classList.contains('e-read-only-cells')) ||
                    (!scheduleObj.current.isSlotAvailable(data))) {
                    args.cancel = true;
                }
            } else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
                (isReadOnly(data.EndTime as Date))) {
                args.cancel = true;
            }
        }
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent cssClass='timeline-resource' ref={scheduleObj} width='100%' height='650px' selectedDate={new Date(2021, 7, 2)} workHours={{ start: '08:00', end: '18:00' }} timeScale={{ interval: 60, slotCount: 1 }} resourceHeaderTemplate={resourceHeaderTemplate} eventSettings={{ dataSource: data, fields: { id: 'Id', subject: { title: 'Summary', name: 'Subject' }, location: { title: 'Location', name: 'Location' }, description: { title: 'Comments', name: 'Description' }, startTime: { title: 'From', name: 'StartTime' }, endTime: { title: 'To', name: 'EndTime' } } }} eventRendered={onEventRendered} popupOpen={onPopupOpen} actionBegin={onActionBegin} renderCell={onRenderCell} group={{ enableCompactView: false, resources: ['MeetingRoom'] }} >
                        <ResourcesDirective>
                            <ResourceDirective field='RoomId' title='Room Type' name='MeetingRoom' allowMultiple={true} dataSource={ownerData} textField='text' idField='id' colorField='color' />
                        </ResourcesDirective>
                        < ViewsDirective >
                            <ViewDirective option='TimelineDay' />
                            <ViewDirective option='TimelineWeek' />
                        </ViewsDirective>
                        < Inject services={[TimelineViews, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This demo showcases the scheduler that lists out the meeting rooms of an office and its availability. The slots which are
                    already booked and the lunch time can’t be allowed for any new bookings. Also, the existing bookings which were made
                    on past dates were not allowed to edit as well as the new bookings on those past dates will also be not allowed.
                </p>
            </div>

            <div id="description">
                <p>
                    Here, the timeline view is grouped with single level of resources by making use of the <code>group</code> property.
                    Also, the lunch time blocking is done by block event. The event editor and popup is prevented to open on those blocked time slots as well as on the past bookings
                    by making use of the <code>popupOpen</code> event. The <code>eventRendered</code> event is utilized in order to make the bookings done on past dates as read-only.
                    To block more than one bookings per slot, the <code>isSlotAvailable</code> method is used. Also, the resource header displayed at the left panel is customized to
                    render as columns with the help of <code>resourceHeaderTemplate</code>. The tooltip for resource header is customized by defining the
                    <code>headerTooltipTemplate</code> property within the <code>group</code> API.
                </p>
                <p>
                    <b>Note:</b> The dates which lies beyond the current date set to scheduler through <code>selectedDate</code> property is considered as the past dates here in this sample.
                </p>
            </div>
        </div>
    );
}
export default TimelineResource;