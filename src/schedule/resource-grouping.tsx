import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Week, Month, Agenda, ScheduleComponent, TreeViewArgs, ResourcesDirective,
    ResourceDirective, ViewsDirective, ViewDirective, ResourceDetails, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import './resource-grouping.css';
import { SampleBase } from '../common/sample-base';

/**
 * schedule resources group sample
 */

export class Group extends SampleBase<{}, {}> {
    private resourceData: Object[] = [
        { AirlineName: 'Airways 1', AirlineId: 1, AirlineColor: '#EA7A57' },
        { AirlineName: 'Airways 2', AirlineId: 2, AirlineColor: '#357cd2' },
        { AirlineName: 'Airways 3', AirlineId: 3, AirlineColor: '#7fa900' }
    ];

    private getAirlineImage(value: ResourceDetails | TreeViewArgs): string {
        let airlineName: string = this.getAirlineName(value);
        return airlineName.replace(' ', '-').toLowerCase();
    }

    private getAirlineName(value: ResourceDetails | TreeViewArgs): string {
        return (((value as ResourceDetails).resourceData) ?
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] :
            (value as TreeViewArgs).resourceName) as string;
    }

    private getAirlineModel(value: ResourceDetails | TreeViewArgs): string {
        let airlineName: string = this.getAirlineName(value);
        return (airlineName === 'Airways 1') ? 'CRJ 700' : (airlineName === 'Airways 2') ? 'Airbus A330' : 'ATR 72-600';
    }

    private getAirlineSeats(value: ResourceDetails | TreeViewArgs): number {
        let airlineName: string = this.getAirlineName(value);
        return (airlineName === 'Airways 1') ? 50 : (airlineName === 'Airways 2') ? 75 : 100;
    }

    private generateEvents(): Object[] {
        let subjectCollection: string[] = ['Barcelona to Los Angeles', 'Los Angeles to Barcelona'];
        let collections: Object[] = [];
        let dataCollections: number[] = [1, 2, 3];
        let id: number = 1;
        for (let data of dataCollections) {
            let startDate: Date = new Date(2018, 3, 1);
            startDate.setMilliseconds(1000 * 60 * 60 * .5 * (data - 1));
            let lastDate: Date = new Date((+startDate) + (1000 * 60 * 60 * 24 * 30));
            for (let date: Date = startDate; date.getTime() < lastDate.getTime(); date = new Date(date.getTime() + (1000 * 60 * 60 * 5))) {
                let strDate: Date = new Date(+date);
                let endDate: Date = new Date((+strDate) + (1000 * 60 * 60 * (2.5 + (0.5 * data))));
                collections.push({
                    Id: id,
                    Subject: subjectCollection[id % 2],
                    StartTime: new Date(+strDate),
                    EndTime: new Date(+endDate),
                    AirlineId: data
                });
                id += 1;
            }
        }
        return collections;
    }

    private resourceHeaderTemplate(props): JSX.Element {
        return (<div className="template-wrap"><div className={"airline-image " + this.getAirlineImage(props)}></div>
            <div className="airline-details"><div className="airline-name">{this.getAirlineName(props)}</div>
                <div className="airline-model"> Model no: {this.getAirlineModel(props)}</div>
                <div className="airline-seats"> No.of seats: {this.getAirlineSeats(props)}</div></div></div>
        );
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <div className='schedule-demo-heading'>
                            Flight timings between Barcelona and Los Angeles
                        </div>
                        <ScheduleComponent cssClass='schedule-group' width='100%' height='650px' selectedDate={new Date(2018, 3, 1)}
                            eventSettings={{
                                dataSource: this.generateEvents(), fields: {
                                    subject: { title: 'Travel Summary', name: 'Subject' },
                                    location: { title: 'Source', name: 'Location' },
                                    description: { title: 'Comments', name: 'Description' },
                                    startTime: { title: 'Departure Time', name: 'StartTime' },
                                    endTime: { title: 'Arrival Time', name: 'EndTime' }
                                }
                            }} group={{ resources: ['Airlines'] }} resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}>
                            <ResourcesDirective>
                                <ResourceDirective field='AirlineId' title='Airline Name' name='Airlines' allowMultiple={true}
                                    dataSource={this.resourceData} textField='AirlineName' idField='AirlineId' colorField='AirlineColor'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            < ViewsDirective >
                                <ViewDirective option='Week' />
                                <ViewDirective option='Month' />
                                <ViewDirective option='Agenda' />
                            </ViewsDirective>
                            <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This demo illustrates the timings of different flight services on a specific route say between Barcelona and
                         Los Angeles, on a daily basis. Here, the Scheduler is grouped based on the 3 Airline services.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this demo, the scheduler has been grouped with multiple resources by making use of the property
                       <code>group</code>. The resources to be grouped depends on the values of
                       <code>resources</code> option within the
                       <code>group</code> property, which accepts the array of resource names. The resource header has been customized
                        by making use of the <code>resourceHeaderTemplate</code> property.
                    </p>
                    <p>
                        In mobile mode, when the grouping is enabled, the resources will be listed out in a treeview as a side-panel which
                        opens or closes, on clicking the hamburger icon at the resource header. Only a single resource will be viewable at
                        a time, due to the space constraints on mobile. If in case, the users want to view the grouped layout on mobile
                        with scrolling content, then it is necessary to set
                        <code>false</code> to the
                        <code>enableCompactView</code> option within the
                        <code>group</code> property which is set to
                        <code>true</code> by default. This option is not applicable on desktop mode. </p>
                    <p>
                        Note: If the
                        <code>group</code> property is not defined, then the default scheduler will be rendered with no grouping on layout,
                         but the appointments of all the resources will be displayed on a single scheduler.
                    </p>
                </div>
            </div>
        );
    }
}

