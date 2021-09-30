import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { compile } from '@syncfusion/ej2-react-base';
import { ToastComponent, ToastAnimationSettingsModel, ToastPositionModel } from '@syncfusion/ej2-react-notifications';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { getReminderEvents } from './helper';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule reminder sample
 */

export class Reminder extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private toastObj: ToastComponent;
    public reminderInterval: NodeJS.Timeout | number;
    public position: ToastPositionModel = { X: 'Right', Y: 'Top' };
    public timeout: number = 0;
    public animation: ToastAnimationSettingsModel = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    }
    public data: Record<string, any>[] = getReminderEvents();

    private onCreated(): void {
        this.reminderInterval = setInterval(this.refreshEventReminder.bind(this), 5000);
    }

    private templateFn(data: Record<string, any>): string {
        const template: string = '<div class="e-toast-template"><div class="e-toast-message"><div class="e-toast-title">${Subject}</div>' +
            '<div class="e-toast-content">${StartTime.toLocaleTimeString()} - ${EndTime.toLocaleTimeString()}</div></div></div>';
        return compile(template.trim())(data) as string;
    }

    private refreshEventReminder() {
        const eventCollection: Record<string, any>[] = this.scheduleObj.getCurrentViewEvents();
        eventCollection.forEach((event: Record<string, any>, i: number) => {
            const dateFormat: Function = (date: Date): Date =>
                new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            const startTime: Date = dateFormat(event[this.scheduleObj.eventFields.startTime] as Date);
            const currentTime: Date = dateFormat(new Date(new Date().toUTCString().slice(0, -3)));
            const difference: number = currentTime.getTime() - startTime.getTime();
            if (startTime.getTime() <= currentTime.getTime() && difference > -1 && difference <= 4000) {
                this.toastObj.show({ template: this.templateFn(event) });
            }
        });
    }

    public componentWillUnmount() {
        if (this.reminderInterval) {
            clearInterval(this.reminderInterval as number);
        }
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent height='550px' ref={schedule => this.scheduleObj = schedule} timezone='UTC'
                            eventSettings={{ dataSource: this.data }} created={this.onCreated.bind(this)}>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                        <ToastComponent ref={(toast) => { this.toastObj = toast }}
                            cssClass='e-schedule-reminder e-toast-info' target='.e-schedule' position={this.position}
                            animation={this.animation} newestOnTop={true} showCloseButton={true} timeOut={this.timeout} >
                        </ToastComponent>
                    </div>
                </div>
                <div id='action-description'>
                    <p>
                        This demo showcases an event reminder notification that will be displayed after 5 seconds of sample getting loaded.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        In this example, the <code>Toast</code> component is used to show the reminder notification. The reminder
                        notification will be displayed after 5 seconds. We can also customize the notification interval as per our
                        needs.
                    </p>
                </div>
            </div>
        );
    }
}