import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, Day, TimelineViews, Inject, ResourcesDirective,
    ResourceDirective, DragAndDrop, Resize, DragEventArgs, ActionEventArgs
} from '@syncfusion/ej2-react-schedule';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import './event-buffer.css';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule Event Buffer sample
 * Demonstrates the new bufferBefore / bufferAfter feature on a resource-grouped
 * Timeline view, scoped to a single Operating Room per resource per slot and
 * rendered with a custom bufferTemplate.
 */

interface RoomData {
    RoomId: number;
    RoomText: string;
    Specialty: string;
    RoomColor: string;
    Icon: string;
}

const roomData: RoomData[] = [
    { RoomId: 1, RoomText: 'Cardiac Surgery Suite', Specialty: 'Cardiology', RoomColor: '#ef4444', Icon: '\u2764' },
    { RoomId: 2, RoomText: 'Orthopedic Center', Specialty: 'Orthopedics', RoomColor: '#2563eb', Icon: '🦴' },
    { RoomId: 3, RoomText: 'Neuroscience Unit', Specialty: 'Neurology', RoomColor: '#8b5cf6', Icon: '🧠' },
    { RoomId: 4, RoomText: 'Pediatric Care Suite', Specialty: 'Pediatrics', RoomColor: '#10b981', Icon: '👶' },
    { RoomId: 5, RoomText: 'Emergency Trauma Bay', Specialty: 'Emergency', RoomColor: '#f97316', Icon: '🚑' },
    { RoomId: 6, RoomText: 'Diagnostic Imaging Center', Specialty: 'Radiology', RoomColor: '#0ea5e9', Icon: '🔬' }
];

const subjects: Record<string, string[]> = {
    Cardiology: ['Cardiac Checkup', 'Heart Valve Assessment', 'Stress Test', 'ECG Review'],
    Orthopedics: ['Knee Replacement', 'Bone Fracture Review', 'Spine Consultation'],
    Neurology: ['Neurology Evaluation', 'Brain MRI Review'],
    Pediatrics: ['Child Wellness Exam', 'Vaccination Follow-up'],
    Emergency: ['Trauma Assessment', 'Emergency Consultation'],
    Radiology: ['MRI Scan Review', 'CT Scan Analysis']
};

const generateEvents = (date: Date): Record<string, any>[] => {
    const events: Record<string, any>[] = [];
    let id = date.getDate() * 100;

    roomData.forEach((room) => {
        const roomSubjects = subjects[room.Specialty] || ['Procedure'];

        const startPatterns = [
            { hour: 9, minute: 0 },
            { hour: 9, minute: 15 },
            { hour: 9, minute: 30 },
            { hour: 9, minute: 45 }
        ];
        const secondPatterns = [
            { hour: 11, minute: 0 },
            { hour: 11, minute: 15 },
            { hour: 11, minute: 30 },
            { hour: 11, minute: 45 }
        ];

        const pattern1 = startPatterns[Math.floor(Math.random() * startPatterns.length)];
        const pattern2 = secondPatterns[Math.floor(Math.random() * secondPatterns.length)];

        const createEvent = (startHour: number, startMinute: number): Record<string, any> => {
            const duration = [75, 90][Math.floor(Math.random() * 2)];
            const bufferBefore = [30, 45, 60][Math.floor(Math.random() * 3)];
            const bufferAfter = [30, 45, 60][Math.floor(Math.random() * 3)];
            const subject = roomSubjects[Math.floor(Math.random() * roomSubjects.length)];

            const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, startMinute);
            const endTime = new Date(startTime.getTime() + duration * 60000);

            return {
                Id: id++,
                Subject: subject,
                StartTime: startTime,
                EndTime: endTime,
                IsAllDay: false,
                RoomId: room.RoomId,
                RequiredSkill: room.Specialty,
                bufferBefore: bufferBefore,
                bufferAfter: bufferAfter
            };
        };

        events.push(createEvent(pattern1.hour, pattern1.minute));
        events.push(createEvent(pattern2.hour, pattern2.minute));
    });

    return events;
};

const generateAllEvents = (selectedDate: Date): Record<string, any>[] => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);

    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    return [
        ...generateEvents(previousDate),
        ...generateEvents(selectedDate),
        ...generateEvents(nextDate)
    ];
};

export class EventBuffer extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private dialogRef: DialogComponent;
    private surgeryData: Record<string, any>[];

    constructor(props: {}, context: {}) {
        super(props, context);
        this.surgeryData = generateAllEvents(new Date());
    }

    private bufferTemplate = (args: any): JSX.Element => {
        const isBefore = args.bufferType === 'before';
        const duration = isBefore ? args.data.bufferBefore : args.data.bufferAfter;
        const iconSrc = isBefore
            ? 'https://ej2.syncfusion.com/demos/src/schedule/images/health-day.svg'
            : 'https://ej2.syncfusion.com/demos/src/schedule/images/cancer-day.svg';

        // 1) duration < 10 -> hide completely
        if (duration < 10) {
            return <></>;
        }

        const currentView: string | undefined = this.scheduleObj && this.scheduleObj.currentView;
        const isDayView = currentView === 'Day';

        if (isDayView) {
            // Day view
            // 10 <= duration <= 15 -> text only
            // duration > 15 -> image + text
            return duration > 15 && (
                <div className="buffer-minimal">
                        <img
                            className="buffer-svg-icon"
                            src={iconSrc}
                            alt=""
                        />
                    <span className="buffer-duration">{duration} min</span>
                </div>
            );
        }

        // TimelineDay / TimelineWeek views
        // 10 <= duration <= 20 -> image only
        // duration > 20 -> image + text
        return (
            <div className="buffer-minimal">
                <img
                    className="buffer-svg-icon"
                    src={iconSrc}
                    alt=""
                />
                {duration > 20 && (
                    <span className="buffer-duration">{duration} min</span>
                )}
            </div>
        );
    };

    private headerIndentTemplate(): JSX.Element {
        if (this.scheduleObj && this.scheduleObj.currentView === 'Day') {
            return null;
        }

        return (
            <div className="resource-header-title">
                <div className="resource-header-main">Operating Rooms</div>
                <div className="resource-header-sub">Surgery Suites</div>
            </div>
        );
    }

    private resourceHeaderTemplate(props: any): JSX.Element {
        return (
            <div className="medical-resource">
                <div
                    className="medical-resource-icon"
                >
                    {props.resourceData.Icon}
                </div>
                <div className="medical-resource-content">
                    <div className="medical-resource-specialty">
                        {props.resourceData.Specialty}
                    </div>
                </div>
            </div>
        );
    }

    private onDragStop(args: DragEventArgs): void {
        const data: any = Array.isArray(args.data) ? args.data[0] : args.data;
        const room = roomData.find((r) => r.RoomId === data.RoomId);
        if (!room) {
            return;
        }
        // Cancel the drag when the room's specialty doesn't match the event's RequiredSkill
        if (room.Specialty !== data.RequiredSkill) {
            args.cancel = true;

            this.dialogRef.setProperties({
                enableRtl:
                    this.scheduleObj.element.classList.contains('e-rtl')
            });

            if (this.dialogRef) {
                this.dialogRef.show();
            }
        }
    }

    private onActionBegin(args: ActionEventArgs): void {
        if (args.requestType === 'eventCreate') {
            const records = args.data as Record<string, any>[];

            records.forEach((event) => {
                const room = roomData.find((r) => r.RoomId === event.RoomId);

                if (room) {
                    event.RequiredSkill = room.Specialty;
                }
            });
        }
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <DialogComponent
                            ref={dialog => this.dialogRef = dialog}
                            visible={false}
                            isModal={true}
                            width="320px"
                            header="Alert"
                            showCloseIcon={true}
                            animationSettings={{ effect: 'Zoom', duration: 400, delay: 0 }}
                            content="Events cannot be scheduled in this operating room because it does not match the required specialty."
                            buttons={[
                                {
                                    click: () => this.dialogRef && this.dialogRef.hide(),
                                    buttonModel: { content: 'Ok', isPrimary: true }
                                }
                            ]}>
                        </DialogComponent>
                        <ScheduleComponent
                            cssClass='medical-scheduler'
                            ref={schedule => this.scheduleObj = schedule}
                            width='100%'
                            height="650px"
                            workHours={{ start: '08:00', end: '18:00' }}
                            selectedDate={new Date()}
                            headerIndentTemplate={this.headerIndentTemplate.bind(this)}
                            resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                            currentView='TimelineDay'
                            allowOverlap={false}
                            dragStop={this.onDragStop.bind(this)}
                            actionBegin={this.onActionBegin.bind(this)}
                            group={{ resources: ['Rooms'] }}
                            timeScale={{ enable: true, interval: 60, slotCount: 4 }}
                            eventSettings={{
                                dataSource: this.surgeryData,
                                enableBuffer: true,
                                bufferTemplate: this.bufferTemplate,
                                fields: {
                                    bufferBefore: { name: 'bufferBefore' },
                                    bufferAfter: { name: 'bufferAfter' }
                                }
                            }}
                        >
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='TimelineDay' />
                                <ViewDirective option='TimelineWeek' />
                            </ViewsDirective>
                            <ResourcesDirective>
                                <ResourceDirective
                                    field='RoomId'
                                    title='Operating Room'
                                    name='Rooms'
                                    dataSource={roomData}
                                    textField='RoomText'
                                    idField='RoomId'
                                    colorField='RoomColor'
                                />
                            </ResourcesDirective>
                            <Inject services={[Day, TimelineViews, DragAndDrop, Resize]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This surgery scheduling demo highlights efficient operating room management using configurable pre-procedure and post-procedure buffer times within the Scheduler. Plan surgeries with dedicated preparation and recovery periods, reduce scheduling overlaps, maximize operating room utilization, and streamline healthcare appointment coordination.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/schedule/eventSettings#enablebuffer">
                            <code>enableBuffer</code>
                        </a> property of <code>eventSettings</code> activates the buffer feature. The
                        <code>bufferBefore</code> and <code>bufferAfter</code> field mappings (in minutes) are configured
                        through <code>eventSettings.fields</code>, and a custom <code>bufferTemplate</code> renders an icon
                        and the buffer duration inside the buffer pill. Conflict detection with <code>allowOverlap=false</code>
                        also flags the buffered reserved range, and drag-and-drop is restricted to the room matching the
                        event&rsquo;s required specialty.
                    </p>
                    <p>
                        Buffers are supported across timeline and vertical time-grid views (Day, Week, WorkWeek, Timeline Day,
                        Timeline Week, Timeline WorkWeek) and re-anchor on the EVENT edges during drag and resize previews.
                    </p>
                    <p>
                        Looking for the full React Scheduler component overview, features, pricing, and documentation? Visit our
                        <a target="_blank" href="https://www.syncfusion.com/react-components/react-scheduler"> React Scheduler</a> component page.
                    </p>
                </div>
            </div>
        );
    }
}