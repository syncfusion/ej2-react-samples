import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { compile } from '@syncfusion/ej2-react-base';
import { ToastComponent, ToastAnimationSettingsModel, ToastPositionModel } from '@syncfusion/ej2-react-notifications';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { getReminderEvents } from './helper';
import { updateSampleSection } from '../common/sample-base';

/**
 * Schedule reminder sample
 */

function Reminder() {
    React.useEffect(() => {
        updateSampleSection();
        return () => {
            if (reminderInterval) {
                clearInterval(reminderInterval as number);
            }
        }
    }, [])
    let scheduleObj: ScheduleComponent;
    let toastObj: ToastComponent;
    let reminderInterval: NodeJS.Timeout | number;
    const position: ToastPositionModel = { X: 'Right', Y: 'Top' };
    const timeout: number = 0;
    const animation: ToastAnimationSettingsModel = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    }
    let data: Record<string, any>[] = getReminderEvents();

    function onCreated(): void {
        reminderInterval = setInterval(refreshEventReminder.bind(this), 5000);
    }

    function templateFn(data: Record<string, any>): string {
        const template: string = '<div class="e-toast-template"><div class="e-toast-message"><div class="e-toast-title">${Subject}</div>' +
            '<div class="e-toast-content">${StartTime.toLocaleTimeString()} - ${EndTime.toLocaleTimeString()}</div></div></div>';
        return compile(template.trim())(data) as string;
    }

    function refreshEventReminder() {
        const eventCollection: Record<string, any>[] = scheduleObj.getCurrentViewEvents();
        eventCollection.forEach((event: Record<string, any>, i: number) => {
            const dateFormat: Function = (date: Date): Date =>
                new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            const startTime: Date = dateFormat(event[scheduleObj.eventFields.startTime] as Date);
            const currentTime: Date = dateFormat(new Date(new Date().toUTCString().slice(0, -3)));
            const difference: number = currentTime.getTime() - startTime.getTime();
            if (startTime.getTime() <= currentTime.getTime() && difference > -1 && difference <= 4000) {
                toastObj.show({ template: templateFn(event) });
            }
        });
    }
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent height='550px' ref={schedule => scheduleObj = schedule} timezone='UTC'
                        eventSettings={{ dataSource: data }} created={onCreated.bind(this)}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                    <ToastComponent ref={(toast) => { toastObj = toast }}
                        cssClass='e-schedule-reminder e-toast-info' target='.e-schedule' position={position}
                        animation={animation} newestOnTop={true} showCloseButton={true} timeOut={timeout} >
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
export default Reminder;