import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { compile } from '@syncfusion/ej2-react-base';
import { ToastComponent, ToastAnimationSettingsModel, ToastPositionModel } from '@syncfusion/ej2-react-notifications';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { getReminderEvents } from './helper';
import { updateSampleSection } from '../common/sample-base';

/**
 * Schedule reminder sample
 */

const Reminder = () => {
    useEffect(() => {
        updateSampleSection();
        return () => {
            if (reminderInterval) {
                clearInterval(reminderInterval as number);
            }
        }
    }, [])
    let scheduleObj = useRef<ScheduleComponent>(null);
    let toastObj = useRef<ToastComponent>(null);
    let reminderInterval: NodeJS.Timeout | number;
    const position: ToastPositionModel = { X: 'Right', Y: 'Top' };
    const timeout: number = 0;
    const animation: ToastAnimationSettingsModel = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    }
    let data: Record<string, any>[] = getReminderEvents();

    const onCreated = (): void => {
        reminderInterval = setInterval(refreshEventReminder, 5000);
    }

    const templateFn = (data: Record<string, any>): string => {
        const template: string = '<div class="e-toast-template"><div class="e-toast-message"><div class="e-toast-title">${Subject}</div>' +
            '<div class="e-toast-content">${StartTime.toLocaleTimeString()} - ${EndTime.toLocaleTimeString()}</div></div></div>';
        return compile(template.trim())(data) as string;
    }

    const refreshEventReminder = () => {
        const eventCollection: Record<string, any>[] = scheduleObj.current.getCurrentViewEvents();
        eventCollection.forEach((event: Record<string, any>, i: number) => {
            const dateFormat = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            const startTime: Date = dateFormat(event[scheduleObj.current.eventFields.startTime] as Date);
            const currentTime: Date = dateFormat(new Date(new Date().toUTCString().slice(0, -3)));
            const difference: number = currentTime.getTime() - startTime.getTime();
            if (startTime.getTime() <= currentTime.getTime() && difference > -1 && difference <= 4000) {
                toastObj.current.show({ template: templateFn(event) });
            }
        });
    }
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent height='550px' ref={scheduleObj} timezone='UTC' eventSettings={{ dataSource: data }} created={onCreated}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                    <ToastComponent ref={toastObj} cssClass='e-schedule-reminder e-toast-info' target='.e-schedule' position={position} animation={animation} newestOnTop={true} showCloseButton={true} timeOut={timeout} />
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