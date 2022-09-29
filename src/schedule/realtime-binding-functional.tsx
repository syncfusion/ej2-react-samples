import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, ActionEventArgs, NavigatingEventArgs, View } from '@syncfusion/ej2-react-schedule';
import { updateSampleSection } from '../common/sample-base';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';

/**
 * Schedule realtime binding sample
 */

function RealTimeBinding() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let connection: HubConnection;
    const data: Record<string, any>[] = extend([], (dataSource as any).scheduleData, null, true) as Record<string, any>[];
    let isHubConnected: boolean = false;
    let scheduleObj: ScheduleComponent;

    function onCreated() {
        const url: string = 'https://ej2.syncfusion.com/aspnetcore/scheduleHub/';
        connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false }).withAutomaticReconnect().build();
        connection.on('ReceiveData', (action: string, data: View | Record<string, any>[]) => {
            if (action == 'view') {
                scheduleObj.currentView = data as View;
            }
            if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                scheduleObj.eventSettings.dataSource = data as Record<string, any>[];
            }
        });

        connection.start().then(() => { isHubConnected = true; }).catch(() => { isHubConnected = false; });
    }

    function onNavigating(args: NavigatingEventArgs): void {
        if (args.action == 'view' && isHubConnected) {
            connection.invoke('SendData', args.action, args.currentView);
        }
    }

    function onActionComplete(args: ActionEventArgs): void {
        if (isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
            connection.invoke('SendData', args.requestType, scheduleObj.eventSettings.dataSource);
        }
    }

    function componentWillUnmount(): void {
        if (connection) {
            connection.stop().then(() => { isHubConnected = false; }).catch((err) => { console.log(err); });
        }
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent ref={(schedule: ScheduleComponent) => scheduleObj = schedule} height='550px' selectedDate={new Date(2021, 0, 10)}
                        eventSettings={{ dataSource: data }} created={onCreated.bind(this)} actionComplete={onActionComplete.bind(this)} navigating={onNavigating.bind(this)}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div id='action-description'>
                <p>This demo showcases the way of binding signalR services to Scheduler component. Here, the SignalR is used to bind the data with Scheduler.</p>
            </div>
            <div id='description'>
                <p>
                    In this sample, we have used the <code>navigating</code> event to invoke the scheduler control’s view change action and <code>actionComplete</code>
                    event to update the scheduler data source after performing the CRUD operations. The SignalR will bind the data in order to corresponding event call.
                </p>
            </div>
        </div>
    );
}
export default RealTimeBinding;