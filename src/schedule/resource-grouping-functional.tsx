import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { Week, Month, Agenda, ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, ResourceDetails, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './resource-grouping.css';
import { updateSampleSection } from '../common/sample-base';

/**
 * schedule resources group sample
 */

const Group = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const resourceData: Record<string, any>[] = [
        { AirlineName: 'Airways 1', AirlineId: 1, AirlineColor: '#EA7A57' },
        { AirlineName: 'Airways 2', AirlineId: 2, AirlineColor: '#357cd2' },
        { AirlineName: 'Airways 3', AirlineId: 3, AirlineColor: '#7fa900' }
    ];

    const getAirlineImage = (value: ResourceDetails): string => {
        let airlineName: string = getAirlineName(value);
        return airlineName.replace(' ', '-').toLowerCase();
    }

    const getAirlineName = (value: ResourceDetails): string => {
        return (((value as ResourceDetails).resourceData) ? (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] : value.resourceName) as string;
    }

    const getAirlineModel = (value: ResourceDetails): string => {
        let airlineName: string = getAirlineName(value);
        return (airlineName === 'Airways 1') ? 'CRJ 700' : (airlineName === 'Airways 2') ? 'Airbus A330' : 'ATR 72-600';
    }

    const getAirlineSeats = (value: ResourceDetails): number => {
        let airlineName: string = getAirlineName(value);
        return (airlineName === 'Airways 1') ? 50 : (airlineName === 'Airways 2') ? 75 : 100;
    }

    const generateEvents = (): Record<string, any>[] => {
        let subjectCollection: string[] = ['Barcelona to Los Angeles', 'Los Angeles to Barcelona'];
        let collections: Record<string, any>[] = [];
        let dataCollections: number[] = [1, 2, 3];
        let id: number = 1;
        for (let data of dataCollections) {
            let startDate: Date = new Date(2021, 3, 1);
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

    const resourceHeaderTemplate = (props) => {
        return (
            <div className="template-wrap">
                <div className={"airline-image " + getAirlineImage(props)}></div>
                <div className="airline-details">
                    <div className="airline-name">{getAirlineName(props)}</div>
                    <div className="airline-model"> Model no: {getAirlineModel(props)}</div>
                    <div className="airline-seats"> No.of seats: {getAirlineSeats(props)}</div>
                </div>
            </div>
        );
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <div className='schedule-demo-heading'>Flight timings between Barcelona and Los Angeles</div>
                    <ScheduleComponent cssClass='schedule-group' width='100%' height='650px' selectedDate={new Date(2021, 3, 6)} eventSettings={{ dataSource: generateEvents(), fields: { subject: { title: 'Travel Summary', name: 'Subject' }, location: { title: 'Source', name: 'Location' }, description: { title: 'Comments', name: 'Description' }, startTime: { title: 'Departure Time', name: 'StartTime' }, endTime: { title: 'Arrival Time', name: 'EndTime' } } }} group={{ resources: ['Airlines'] }} resourceHeaderTemplate={resourceHeaderTemplate}>
                        <ResourcesDirective>
                            <ResourceDirective field='AirlineId' title='Airline Name' name='Airlines' allowMultiple={true} dataSource={resourceData} textField='AirlineName' idField='AirlineId' colorField='AirlineColor' />
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
                    with scrolling content, then it is necessary to set <code>false</code> to the <code>enableCompactView</code> option within the
                    <code>group</code> property which is set to <code>true</code> by default. This option is not applicable on desktop mode. </p>
                <p>
                    Note: If the <code>group</code> property is not defined, then the default scheduler will be rendered with no grouping on layout,
                    but the appointments of all the resources will be displayed on a single scheduler.
                </p>
            </div>
        </div>
    );
}
export default Group;