import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, TimelineViews, Inject, ResourcesDirective, ResourceDirective, Resize, DragAndDrop, PopupOpenEventArgs } from '@syncfusion/ej2-react-schedule';
import './task-progress-tracker.css';
import { createElement, extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

const TaskProgressTracker = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const scheduleObj = useRef<ScheduleComponent>(null);

    const employeeData: Record<string, any>[] = [
        { Text: 'Sarah', Id: 1, Color: '#EF4444' },
        { Text: 'John', Id: 2, Color: '#10B981' },
        { Text: 'Emma', Id: 3, Color: '#3B82F6' },
        { Text: 'Michael', Id: 4, Color: '#F59E0B' },
        { Text: 'Lisa', Id: 5, Color: '#8B5CF6' },
        { Text: 'David', Id: 6, Color: '#EC4899' }
    ];

    const eventData: Record<string, any>[] = extend([], (dataSource as any).taskData, null, true) as Record<string, any>[];

    const STATUS_MAP = {
        'pending': { icon: 'e-clock', color: '#DC2626' },
        'in-progress': { icon: 'e-play', color: '#3B82F6' },
        'review': { icon: 'e-eye', color: '#F59E0B' },
        'done': { icon: 'e-check', color: '#10B981' }
    };

    const eventTemplate = (props: Record<string, any>) => {
        const config = STATUS_MAP[props.Status] || STATUS_MAP['pending'];
        const progressText = (props.Progress || 0) + '%';
        const statusLabel = props.Status || 'pending';

        return (
            <div
                className="custom-event"
                style={{ '--status-color': config.color } as React.CSSProperties}
                title={props.Subject || 'Task'}
            >
                <div className="event-header">
                    <div className="event-subject">{props.Subject || 'Task'}</div>
                    <div className="event-progress-percent">{progressText}</div>
                </div>
                <div className="event-footer">
                    <div className="label-wrapper">
                        <span className={`e-icons ${config.icon} status-icon`}></span>
                        <span className="status-label">{statusLabel}</span>
                    </div>
                </div>
            </div>
        );
    };

    const onPopupOpen = (args: PopupOpenEventArgs): void => {
        if (args.type !== 'Editor') return;

        const dialog = args.element.closest('.e-dialog');
        if (dialog) {
            dialog.querySelectorAll('.e-repeat-parent-row, .e-recurrenceeditor').forEach((el) => {
                (el as HTMLElement).style.display = 'none';
            });
        }

        const form = args.element.querySelector('.e-schedule-form');
        if (!form) return;

        const existingCustomFields = form.querySelector('.custom-fields');
        if (existingCustomFields) {
            existingCustomFields.remove();
        }

        const container = createElement('div', { className: 'custom-fields' });

        let fullEventData = args.data;
        if (args.data.Id) {
            const foundEvent = eventData.find((e: Record<string, any>) => e.Id === args.data.Id);
            if (foundEvent) {
                fullEventData = foundEvent;
            }
        }

        const progressValue = fullEventData.Progress !== undefined && fullEventData.Progress !== null ? fullEventData.Progress : '0';
        const statusValue = fullEventData.Status || 'pending';

        container.innerHTML = [
            '<div class="e-field-group e-custom-row">',
            '  <input id="statusDropdown" name="Status" type="text" class="e-field" value="' + statusValue + '" />',
            '</div>',
            '<div class="e-field-group e-custom-row">',
            '  <div class="e-float-input e-control-wrapper e-input-group">',
            '    <input id="progressInput"',
            '      name="Progress"',
            '      type="number"',
            '      class="e-field e-input"',
            '      min="0"',
            '      max="100"',
            '      value="' + progressValue + '" />',
            '    <span class="e-float-line"></span>',
            '    <label class="e-float-text e-label-top">Progress (%)</label>',
            '  </div>',
            '</div>'
        ].join('');

        (form as HTMLElement).appendChild(container);

        const progressEl = container.querySelector('[name="Progress"]') as HTMLInputElement;

        const statusDropdown = new DropDownList({
            dataSource: [
                { text: 'Pending', value: 'pending' },
                { text: 'In-Progress', value: 'in-progress' },
                { text: 'Review', value: 'review' },
                { text: 'Done', value: 'done' }
            ],
            fields: { text: 'text', value: 'value' },
            value: statusValue,
            created: () => {
                applyStatusRules(statusValue, progressEl);
            },
            change: (e) => {
                applyStatusRules(e.value, progressEl);
            },
            placeholder: 'Status',
            floatLabelType: 'Auto'
        });
        statusDropdown.appendTo('#statusDropdown');

        progressEl.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;

            let value: number = Number(target.value) || 0;
            const currentStatus = String(statusDropdown.value || 'pending');

            if (currentStatus === 'in-progress') {
                if (value >= 99) value = 98;
                if (value < 0) value = 0;
            }
            else if (currentStatus === 'pending') {
                value = 0;
            }
            else if (currentStatus === 'review') {
                value = 99;
            }
            else if (currentStatus === 'done') {
                value = 100;
            }

            target.value = value.toString();
        });
    };

    const applyStatusRules = (status: string | number | boolean | object, progressEl: HTMLInputElement) => {
            const statusStr = String(status);
            if (statusStr === 'done') {
                progressEl.value = '100';
                progressEl.disabled = true;
            } else if (statusStr === 'review') {
                progressEl.value = '99';
                progressEl.disabled = true;
            } else if (statusStr === 'pending') {
                progressEl.value = '0';
                progressEl.disabled = true;
            } else if (statusStr === 'in-progress') {
                const currentValue = Number(progressEl.value) || 0;
                if (currentValue >= 99) {
                    progressEl.value = '98';
                }
                progressEl.disabled = false;
            } else {
                progressEl.disabled = false;
            }
        };

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent
                        cssClass='event-customization-schedule'
                        width='100%'
                        height='550px'
                        selectedDate={new Date(2026, 3, 24)}
                        currentView='TimelineWeek'
                        popupOpen={onPopupOpen}
                        startHour='09:00'
                        endHour='18:00'
                        showWeekend={false}
                        allowOverlap={false}
                        rowAutoHeight={true}
                        group={{ resources: ['Employees'] }}
                        ref={scheduleObj}
                        eventSettings={{
                            dataSource: eventData,
                            fields: {
                                id: 'Id',
                                subject: { name: 'Subject' },
                                startTime: { name: 'StartTime' },
                                endTime: { name: 'EndTime' },
                                description: { name: 'Description' },
                                status: { name: 'Status' },
                                progress: { name: 'Progress' }
                            },
                            template: eventTemplate
                        }}
                    >
                        <ViewsDirective>
                            <ViewDirective option='TimelineWeek' />
                        </ViewsDirective>
                        <ResourcesDirective>
                            <ResourceDirective
                                field='EmployeeId'
                                title='Employees'
                                name='Employees'
                                dataSource={employeeData}
                                textField='Text'
                                idField='Id'
                                colorField='Color'
                            />
                        </ResourcesDirective>
                        <Inject services={[TimelineViews, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This demo showcases an advanced task progress tracker in the Scheduler with elegant event customization, vibrant status indicators, real-time progress visualization, and interactive editing. Track and manage team task assignments with visual status icons and completion percentage indicators.</p>
            </div>
            <div id="description">
                <p>
                    The Task Progress Tracker displays team tasks with a refined visual design. Each event shows the task subject on the left and completion percentage on the right, while the status indicator icon is positioned at the bottom left with a colored background matching the task status.
                </p>
                <p><b>Status Tracking</b></p>
                <p>
                    Tasks are displayed with visual status indicators: clock icon for pending tasks, play icon for in-progress work, eye icon for tasks under review, and checkmark icon for completed tasks. Each status has a distinct color for quick visual identification.
                </p>
                <p><b>Progress Visualization</b></p>
                <p>
                    Each event displays the completion percentage in real-time. The progress indicator updates dynamically as tasks advance through different status states.
                </p>
                <p><b>Interactive Editing</b></p>
                <p>
                    Edit task details directly from the Scheduler using the editor. Customize task status and progress percentage with automatic validation rules ensuring data consistency based on the selected status.
                </p>
                <p>Looking for the full React Scheduler component overview, features, pricing, and documentation? Visit our <a href="https://www.syncfusion.com/scheduler-sdk/react-scheduler" target="_blank">React Scheduler</a> page.</p>
            </div>
        </div>
    );
}
export default TaskProgressTracker;
