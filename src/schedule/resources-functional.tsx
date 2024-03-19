import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
    Month, EventFieldsMapping, Inject, PopupOpenEventArgs, ActionEventArgs, ToolbarActionArgs, ScheduleComponent, Schedule,
    ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective
} from '@syncfusion/ej2-react-schedule';
import './resources.css';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { extend, Internationalization, createElement, closest, remove, addClass, removeClass } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * schedule resources fare-calendar sample
 */

const Resources = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let dManager: Record<string, any>[] = []; let initialLoad: Boolean = true;
    let scheduleObj = useRef<ScheduleComponent>(null);
    const instance: Internationalization = new Internationalization();
    const resourceData: Record<string, any>[] = [
        { text: 'Airways 1', id: 1 },
        { text: 'Airways 2', id: 2 },
        { text: 'Airways 3', id: 3 }
    ];

    const getAirwaysName = (value: number) => {
        return (value === 1) ? 'Airways 1' : (value === 2) ? 'Airways 2' : 'Airways 3';
    }

    const getAirwaysImage = (value: number) => {
        return (value === 1) ? 'airways-1' : (value === 2) ? 'airways-2' : 'airways-3';
    }

    const getFormattedTime = (date: Date) => {
        return instance.formatDate(date, { skeleton: 'Hm' });
    }

    const onActionBegin = (args: ActionEventArgs & ToolbarActionArgs): void => {
        if (args.requestType === 'toolbarItemRendering') {
            args.items[2].align = 'Center';
            args.items[2].suffixIcon = '';
            args.items = args.items.splice(2, 1);
        }
    }

    const onDataBinding = (): void => {
        if (initialLoad) {
            scheduleObj.current.eventSettings.dataSource = generateEvents(scheduleObj.current);
            initialLoad = false;
        }
    }

    const onDataBound = (): void => {
        let eventCollections: Record<string, any>[] = scheduleObj.current.getCurrentViewEvents();
        eventCollections.sort((a: Record<string, number>, b: Record<string, number>) => a.Fare - b.Fare);
        let indexDate: Date = new Date(((eventCollections[0] as Record<string, any>).StartTime as Date).getTime());
        indexDate.setHours(0, 0, 0, 0);
        let index: number = scheduleObj.current.getIndexOfDate(scheduleObj.current.activeView.renderDates, indexDate);
        let target: HTMLElement = scheduleObj.current.element.querySelectorAll('.e-work-cells')[index] as HTMLElement;
        addClass([target], 'best-price');
        target.appendChild(createElement('div', { className: 'best-price', innerHTML: 'Best Price' }));
    }

    const onPopupOpen = (args: PopupOpenEventArgs): void => {
        args.cancel = true;
    }

    const onChange = (args: ChangeEventArgs): void => {
        let tdElement: HTMLElement = scheduleObj.current.element.querySelector('.best-price:not(.e-work-cells)');
        if (tdElement) {
            removeClass([closest(tdElement, 'td')], 'best-price');
            remove(tdElement);
        }
        let scheduleData: Record<string, any>[] = extend([], dManager, null, true) as Record<string, any>[];
        let selectedResource: number[] = [];
        const propertyTable: HTMLTableElement = document.querySelector('.property-panel-table');
        let resourceCollection: HTMLElement[] = [].slice.call(propertyTable.querySelectorAll('.e-resource'));
        resourceCollection.forEach((element: HTMLElement, index: number) => {
            let resEle: Element | null = element.querySelector('.e-icons');
            if (resEle && resEle.classList.contains('e-check')) {
               selectedResource.push(index);
            }
        });
        let filteredData: Record<string, any>[] = [];
        let resources: Record<string, any>[] =
            scheduleObj.current.resourceBase.resourceCollection.slice(-1)[0].dataSource as Record<string, any>[];
        for (let resource of selectedResource) {
            let data: Record<string, any>[] = scheduleData.filter((event: Record<string, any>) => resources[resource].id === event.AirlineId);
            filteredData = filteredData.concat(data);
        }
        filteredData = filterByFare(filteredData, scheduleObj.current);
        scheduleObj.current.eventSettings.dataSource = filteredData;
        scheduleObj.current.dataBind();
    }

    const filterByFare = (appointments: Record<string, any>[], scheduleObj: Schedule): Record<string, any>[] => {
        let fieldMapping: EventFieldsMapping = scheduleObj.eventFields;
        appointments.sort((object1: Record<string, any>, object2: Record<string, any>) => {
            let d1: number = +(object1[fieldMapping.startTime] as Date);
            let d2: number = +(object2[fieldMapping.startTime] as Date);
            let d3: number = +(object1[fieldMapping.endTime] as Date);
            let d4: number = +(object2[fieldMapping.endTime] as Date);
            return ((d1 - d2) || ((d4 - d2) - (d3 - d1)));
        });
        let renderDate: Date[] = scheduleObj.activeView.getRenderDates();
        let finalData: Record<string, any>[] = [];
        for (let date of renderDate) {
            if (scheduleObj.selectedDate.getMonth() === date.getMonth()) {
                let strTime: Date = new Date(+date);
                let endTime: Date = new Date(new Date(strTime.getTime()).setHours(23, 59, 59, 59));
                let perDayData: Record<string, any>[] = scheduleObj.eventBase.filterEvents(strTime, endTime, appointments);
                if (perDayData.length > 0) {
                    perDayData.sort((a: Record<string, any>, b: Record<string, any>) =>
                        ((a.Fare as number) - (b.Fare as number)));
                    finalData.push(perDayData[0]);
                }
            }
        }
        return finalData;
    }

    const generateEvents = (scheduleObj: Schedule): Record<string, any>[] => {
        let collections: Record<string, any>[] = [];
        let dataCollections: Record<string, any>[] = [
            {
                Id: 100,
                StartTime: new Date(2021, 3, 1, 8, 30),
                EndTime: new Date(2021, 3, 1, 10, 0),
                AirlineId: 1
            }, {
                Id: 102,
                StartTime: new Date(2021, 3, 1, 11, 0),
                EndTime: new Date(2021, 3, 1, 12, 0),
                AirlineId: 2
            }, {
                Id: 103,
                StartTime: new Date(2021, 3, 1, 14, 0),
                EndTime: new Date(2021, 3, 1, 15, 0),
                AirlineId: 3
            }
        ];
        let start: Date = new Date(2021, 3, 1);
        let dateCollections: Date[] = Array.apply(null, { length: 30 })
            .map((value: number, index: number) => { return new Date(start.getTime() + (1000 * 60 * 60 * 24 * index)); });
        let id: number = 1;
        let day: number = 0;
        for (let date of dateCollections) {
            let resource: number = 1;
            for (let data of dataCollections) {
                let strDate: Date = new Date((data.StartTime as Date).getTime());
                let endDate: Date = new Date((data.EndTime as Date).getTime());
                collections.push({
                    Id: id,
                    StartTime: new Date(strDate.setDate(strDate.getDate() + day)),
                    EndTime: new Date(endDate.setDate(endDate.getDate() + day)),
                    AirlineId: resource,
                    Fare: ((Math.random() * 500) + 100).toFixed(2)
                });
                resource += 1;
                id += 1;
            }
            day += 1;
        }
        dManager = extend([], collections, null, true) as Record<string, any>[];
        let filteredCollection: Record<string, any>[] = filterByFare(collections, scheduleObj);
        return filteredCollection;
    }

    const template = (props) => {
        return (
            <div className="template-wrap">
                <div className="fare-detail">${props.Fare}</div>
                <div className="airline-name" style={{ display: 'flex', paddingLeft: '5px' }}>
                    <div className={"airline-logo " + getAirwaysImage(props.AirlineId)}></div>
                    <div className="airway-name">{getAirwaysName(props.AirlineId)}</div>
                </div>
            </div>
        );
    }

    const toolTipTemplate = (props) => {
        return (
            <div className="event-tooltip">
                <div className="airline-header">
                    <div className={"airline-logo " + getAirwaysImage(props.AirlineId)}></div>
                    <div className="airline-name">{getAirwaysName(props.AirlineId)}</div>
                </div>
                <div className="airline-details text-size">
                    <div className="airline-title">Fare Details:</div>
                    <div className="airline-fare">${props.Fare} per person</div>
                </div>
                <div className="airline-flex-row text-size">
                    <div className="airline-flex-col airline-title border-right">Arrival</div>
                    <div className="airline-flex-col airline-title text-right">Depature</div>
                </div>
                <div className="airline-flex-row text-size">
                    <div className="airline-flex-col border-right">{getFormattedTime(props.StartTime)}</div>
                    <div className="airline-flex-col margin-right text-right">{getFormattedTime(props.EndTime)}</div>
                </div>
            </div>
        );
    }
    return (
        <div className='schedule-control-section'>
            <div className='col-lg-9 control-section'>
                <div className='control-wrapper'>
                    <div className='schedule-demo-heading'>Cheapest one way fares from Barcelona to Los Angeles</div>
                    <ScheduleComponent ref={scheduleObj} cssClass='schedule-resources' width='100%' height='650px' readonly={true} selectedDate={new Date(2021, 3, 1)} eventSettings={{ template: template.bind(this), enableTooltip: true, tooltipTemplate: toolTipTemplate.bind(this) }} actionBegin={onActionBegin} dataBinding={onDataBinding} popupOpen={onPopupOpen} dataBound={onDataBound} >
                        <ResourcesDirective>
                            <ResourceDirective field='AirlineId' title='Airline' name='Airlines' allowMultiple={true} dataSource={resourceData} textField='text' idField='id' />
                        </ResourcesDirective>
                        < ViewsDirective >
                            <ViewDirective option='Month' />
                        </ViewsDirective>
                        < Inject services={[Month]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div className='col-lg-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <div className='airways-1'>
                                        <CheckBoxComponent id='airways-1' cssClass='e-resource e-airways-1' checked={true} label='Airways 1' change={onChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <div className='airways-2'>
                                        <CheckBoxComponent id='airways-2' cssClass='e-resource e-airways-2' checked={true} label='Airways 2' change={onChange} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <div className='airways-3'>
                                        <CheckBoxComponent id='airways-3' cssClass='e-resource e-airways-3' checked={true} label='Airways 3' change={onChange} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This demo illustrates how to customize the scheduler to showcase it as an
                    <strong>Airfare calendar</strong> depicting the lowest available price on each day of a month for a specific route,
                    say between Barcelona and Los Angeles.
                </p>
            </div>

            <div id="description">
                <p>
                    In this demo, Scheduler initially displays the fare of the airline service which offers lowest price on each day by
                    comparing between the 3 available airlines. Here, the 3 airline services acts as the Scheduler resources.
                    Appointment collection has been dynamically generated for a month (for all the 3 resources) within the
                    <code>generateEvents</code> method and then filtered externally based on the ascending Fare value within the
                    <code>filterByFare</code> method. Since each day of the Scheduler needs to display only a single appointment showing
                    the fare value, therefore it’s been queried to take only the first 30 values from the sorted list and assigned it
                    to the Schedule
                    <code>dataSource</code>. Here, the filtering process needs to be carried out during the
                    <code>databinding</code> event and therefore, the dataSource of Scheduler is assigned within this event.
                </p>
                <p>
                    Scheduler has been rendered in a readonly mode and therefore no editing actions are allowed here.
                    To customize the look of the appointments that displays the fare value,
                    <code>template</code> option within the
                    <code>eventSettings</code> is being used. To highlight the day that holds the overall lowest price of a month,
                    the background color of that day’s cell is customized within the
                    <code>dataBound</code> event. Also, the tooltip has been enabled with
                    <code>template</code> option to display the flight details in a customized style.
                </p>
            </div>
        </div>
    );
}
export default Resources;