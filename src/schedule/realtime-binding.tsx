import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, ActionEventArgs, NavigatingEventArgs, View } from '@syncfusion/ej2-react-schedule';
import { SampleBase } from '../common/sample-base';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';

/**
 * Schedule realtime binding sample
 */

export class RealTimeBinding extends SampleBase<{}, {}> {
    private connection: HubConnection;
    private data: Record<string, any>[] = extend([], (dataSource as any).scheduleData, null, true) as Record<string, any>[];
    private isHubConnected: boolean = false;
    private scheduleObj: ScheduleComponent;

    public onCreated() {
        const url: string = 'https://ej2.syncfusion.com/aspnetcore/scheduleHub/';
        this.connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false }).withAutomaticReconnect().build();
        this.connection.on('ReceiveData', (action: string, data: View | Record<string, any>[]) => {
            if (action == 'view') {
                this.scheduleObj.currentView = data as View;
            }
            if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                this.scheduleObj.eventSettings.dataSource = data as Record<string, any>[];
            }
        });

        this.connection.start().then(() => { this.isHubConnected = true; }).catch(() => { this.isHubConnected = false; });
    }

    private onNavigating(args: NavigatingEventArgs): void {
        if (args.action == 'view' && this.isHubConnected) {
            this.connection.invoke('SendData', args.action, args.currentView);
        }
    }

    private onActionComplete(args: ActionEventArgs): void {
        if (this.isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
            this.connection.invoke('SendData', args.requestType, this.scheduleObj.eventSettings.dataSource);
        }
    }

    public componentWillUnmount(): void {
        if (this.connection) {
            this.connection.stop().then(() => { this.isHubConnected = false; }).catch((err) => { console.log(err); });
        }
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent ref={(schedule: ScheduleComponent) => this.scheduleObj = schedule} height='550px' selectedDate={new Date(2021, 0, 10)}
                            eventSettings={{ dataSource: this.data }} created={this.onCreated.bind(this)} actionComplete={this.onActionComplete.bind(this)} navigating={this.onNavigating.bind(this)}>
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
}