import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, TimelineViews, Inject, EventRenderedArgs, ResourcesDirective,
    ResourceDirective, ResourceDetails, ActionEventArgs, RenderCellEventArgs, PopupOpenEventArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './timeline-resources.css';
import { extend, Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { roomData } from './datasource';

/**
 * schedule room scheduler sample
 */

export class TimelineResource extends SampleBase<{}, {}> {
    private data: Object[] = extend([], roomData, null, true) as Object[];
    private scheduleObj: ScheduleComponent;
    private instance: Internationalization = new Internationalization();
    private getRoomName(value: ResourceDetails) {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField];
    }
    private getRoomType(value: ResourceDetails) {
        return (value as ResourceDetails).resourceData.type;
    }
    private getRoomCapacity(value: ResourceDetails) {
        return (value as ResourceDetails).resourceData.capacity;
    }

    private isReadOnly(endDate: Date): boolean {
        return (endDate < new Date(2018, 6, 31, 0, 0));
    }
    private resourceHeaderTemplate(props): JSX.Element {
        return (<div className="template-wrap">
            <div className="room-name">{this.getRoomName(props)}</div>
            <div className="room-type">{this.getRoomType(props)}</div>
            <div className="room-capacity">{this.getRoomCapacity(props)}</div>
        </div>
        );
    }

    private onActionBegin(args: ActionEventArgs): void {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data: { [key: string]: Object };
            if (args.requestType === 'eventCreate') {
                data = args.data[0];
            } else if (args.requestType === 'eventChange') {
                data = args.data as { [key: string]: Object };
            }
            let groupIndex: number = this.scheduleObj.eventBase.getGroupIndexFromEvent(data);
            if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date, groupIndex as number)) {
                args.cancel = true;
            }
        }
    }
    private onEventRendered(args: EventRenderedArgs): void {
        let data: { [key: string]: Object } = args.data;
        if (this.isReadOnly(data.EndTime as Date)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    }
    private onRenderCell(args: RenderCellEventArgs): void {
        if (args.element.classList.contains('e-work-cells')) {
            if (args.date.getHours() === 13) {
                args.element.classList.add('e-read-only-cells');
                args.element.classList.add('e-lunch-break');
                args.element.innerHTML = '<span>Lunch Break </span>';
            }
            if (args.date < new Date(2018, 6, 31, 0, 0)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only-cells');
            }
        }
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            let target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
            target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
        }
    }
    private onPopupOpen(args: PopupOpenEventArgs): void {
        let data: { [key: string]: Object } = args.data as { [key: string]: Object };
        if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
            let target: HTMLElement = (args.type === 'RecurrenceAlert' ||
                args.type === 'DeleteAlert') ? data.element[0] : args.target;
            if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
                if ((target.classList.contains('e-read-only-cells')) ||
                    (!this.scheduleObj.isSlotAvailable(data.startTime as Date, data.endTime as Date, data.groupIndex as number))) {
                    args.cancel = true;
                }
            } else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
                (this.isReadOnly(data.EndTime as Date))) {
                args.cancel = true;
            }
        }
    }
    private ownerData: Object[] = [
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

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent cssClass='timeline-resource' ref={schedule => this.scheduleObj = schedule} width='100%'
                            height='650px' selectedDate={new Date(2018, 7, 1)} workHours={{ start: '08:00', end: '18:00' }}
                            timeScale={{ interval: 60, slotCount: 1 }} resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                            eventSettings={{
                                dataSource: this.data,
                                fields: {
                                    id: 'Id',
                                    subject: { title: 'Summary', name: 'Subject' },
                                    location: { title: 'Location', name: 'Location' },
                                    description: { title: 'Comments', name: 'Description' },
                                    startTime: { title: 'From', name: 'StartTime' },
                                    endTime: { title: 'To', name: 'EndTime' }
                                }
                            }}
                            eventRendered={this.onEventRendered.bind(this)} popupOpen={this.onPopupOpen.bind(this)}
                            actionBegin={this.onActionBegin.bind(this)} renderCell={this.onRenderCell.bind(this)}
                            group={{ enableCompactView: false, resources: ['MeetingRoom'] }} >
                            <ResourcesDirective>
                                <ResourceDirective field='RoomId' title='Room Type' name='MeetingRoom' allowMultiple={true}
                                    dataSource={this.ownerData} textField='text' idField='id' colorField='color'>
                                </ResourceDirective>
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
                        Here, the timeline view is grouped with single level of resources by making use of the
                        <code>group</code> property. Also, the lunch time blocking is done by applying styles on those cells through the
                        <code>renderCell</code> event. The event editor and popup is prevented to open on those blocked time slots as well as on the past bookings
                        by making use of the
                        <code>popupOpen</code> event. The
                        <code>eventRendered</code> event is utilized in order to make the bookings done on past dates as read-only. To block more than one bookings
                        per slot, the
                        <code>isSlotAvailable</code> method is used. Also, the resource header displayed at the left panel is customized to render as columns with the
                        help of
                        <code>resourceHeaderTemplate</code>. The tooltip for resource header is customized by defining the
                        <code>headerTooltipTemplate</code> property within the
                        <code>group</code> API.
                    </p>
                    <p>
                        <b>Note:</b> The dates which lies beyond the current date set to scheduler through
                        <code>selectedDate</code> property is considered as the past dates here in this sample.
                    </p>
                </div>
            </div>
        );
    }
}
