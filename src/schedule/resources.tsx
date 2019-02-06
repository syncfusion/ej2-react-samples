import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Month, EventFieldsMapping, Inject, PopupOpenEventArgs, ActionEventArgs, ToolbarActionArgs, ScheduleComponent, Schedule,
    ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective
} from '@syncfusion/ej2-react-schedule';
import './resources.css';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { extend, Internationalization, createElement, closest, remove, addClass, removeClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * schedule resources fare-calendar sample
 */

export class Resources extends SampleBase<{}, {}> {
    private dManager: Object[] = [];
    private initalLoad: Boolean = true;
    private scheduleObj: ScheduleComponent;
    private getAirwaysName(value: number) {
        return (value === 1) ? 'Airways 1' : (value === 2) ? 'Airways 2' : 'Airways 3';
    }
    private getAirwaysImage(value: number) {
        return (value === 1) ? 'airways-1' : (value === 2) ? 'airways-2' : 'airways-3';
    }
    private instance: Internationalization = new Internationalization();
    private getFormattedTime(date: Date) {
        return this.instance.formatDate(date, { skeleton: 'Hm' });
    }
    private onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
        if (args.requestType === 'toolbarItemRendering') {
            args.items[2].align = 'Center';
            args.items[2].suffixIcon = '';
            args.items = args.items.splice(2, 1);
        }
    }

    private onDataBinding(): void {
        if (this.initalLoad) {
            this.scheduleObj.eventSettings.dataSource = this.generateEvents(this.scheduleObj);
            this.initalLoad = false;
        }
    }

    private onDataBound(): void {
        let eventCollections: Object[] = this.scheduleObj.getCurrentViewEvents();
        eventCollections.sort((a: { [key: string]: Object }, b: { [key: string]: Object }) =>
            ((a.Fare as number) - (b.Fare as number)));
        let indexDate: Date = new Date(((eventCollections[0] as { [key: string]: Object }).StartTime as Date).getTime());
        indexDate.setHours(0, 0, 0, 0);
        let index: number = this.scheduleObj.getIndexOfDate(this.scheduleObj.activeView.renderDates, indexDate);
        let target: HTMLElement = this.scheduleObj.element.querySelectorAll('.e-work-cells')[index] as HTMLElement;
        addClass([target], 'best-price');
        target.appendChild(createElement('div', { className: 'best-price', innerHTML: 'Best Price' }));
    }

    private onPopupOpen(args: PopupOpenEventArgs): void {
        args.cancel = true;
    }

    private resourceData: Object[] = [
        { text: 'Airways 1', id: 1 },
        { text: 'Airways 2', id: 2 },
        { text: 'Airways 3', id: 3 }
    ];

    private onChange(args: ChangeEventArgs): void {
        let tdElement: HTMLElement = this.scheduleObj.element.querySelector('.best-price:not(.e-work-cells)');
        if (tdElement) {
            removeClass([closest(tdElement, 'td')], 'best-price');
            remove(tdElement);
        }
        let scheduleData: Object[] = extend([], this.dManager, null, true) as Object[];
        let selectedResource: number[] = [];
        let resourceCollection: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-resource'));
        resourceCollection.forEach((element: HTMLElement, index: number) => {
            if (element.getAttribute('aria-checked') === 'true') {
                selectedResource.push(index);
            }
        });
        let filteredData: Object[] = [];
        let resources: { [key: string]: Object }[] =
            this.scheduleObj.resourceBase.resourceCollection.slice(-1)[0].dataSource as { [key: string]: Object }[];
        for (let resource of selectedResource) {
            let data: Object[] = scheduleData.filter((event: { [key: string]: Object }) => resources[resource].id === event.AirlineId);
            filteredData = filteredData.concat(data);
        }
        filteredData = this.filterByFare(filteredData, this.scheduleObj);
        this.scheduleObj.eventSettings.dataSource = filteredData;
        this.scheduleObj.dataBind();
    }

    private filterByFare(appointments: Object[], scheduleObj: Schedule): Object[] {
        let fieldMapping: EventFieldsMapping = scheduleObj.eventFields;
        appointments.sort((object1: { [key: string]: Object }, object2: { [key: string]: Object }) => {
            let d1: number = +(object1[fieldMapping.startTime] as Date);
            let d2: number = +(object2[fieldMapping.startTime] as Date);
            let d3: number = +(object1[fieldMapping.endTime] as Date);
            let d4: number = +(object2[fieldMapping.endTime] as Date);
            return ((d1 - d2) || ((d4 - d2) - (d3 - d1)));
        });
        let renderDate: Date[] = scheduleObj.activeView.getRenderDates();
        let finalData: Object[] = [];
        for (let date of renderDate) {
            if (scheduleObj.selectedDate.getMonth() === date.getMonth()) {
                let strTime: Date = new Date(+date);
                let endTime: Date = new Date(new Date(strTime.getTime()).setHours(23, 59, 59, 59));
                let perDayData: Object[] = scheduleObj.eventBase.filterEvents(strTime, endTime, appointments);
                if (perDayData.length > 0) {
                    perDayData.sort((a: { [key: string]: Object }, b: { [key: string]: Object }) =>
                        ((a.Fare as number) - (b.Fare as number)));
                    finalData.push(perDayData[0]);
                }
            }
        }
        return finalData;
    }

    private generateEvents(scheduleObj: Schedule): Object[] {
        let collections: Object[] = [];
        let dataCollections: { [key: string]: Object }[] = [
            {
                Id: 100,
                StartTime: new Date(2018, 3, 1, 8, 30),
                EndTime: new Date(2018, 3, 1, 10, 0),
                AirlineId: 1
            }, {
                Id: 102,
                StartTime: new Date(2018, 3, 1, 11, 0),
                EndTime: new Date(2018, 3, 1, 12, 0),
                AirlineId: 2
            }, {
                Id: 103,
                StartTime: new Date(2018, 3, 1, 14, 0),
                EndTime: new Date(2018, 3, 1, 15, 0),
                AirlineId: 3
            }
        ];
        let start: Date = new Date(2018, 3, 1);
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
        this.dManager = extend([], collections, null, true) as Object[];
        let filteredCollection: Object[] = this.filterByFare(collections, scheduleObj);
        return filteredCollection;
    }

    private template(props): JSX.Element {
        return (<div className="template-wrap">
            <div className="fare-detail">${props.Fare}</div>
            <div className="airline-name" style={{ display: 'flex', paddingLeft: '5px' }}>
                <div className={"airline-logo " + this.getAirwaysImage(props.AirlineId)}></div>
                <div className="airway-name">{this.getAirwaysName(props.AirlineId)}</div>
            </div></div>);
    }

    private toolTipTemplate(props): JSX.Element {
        return (<div className="event-tooltip">
            <div className="airline-header">
                <div className={"airline-logo " + this.getAirwaysImage(props.AirlineId)}></div>
                <div className="airline-name">{this.getAirwaysName(props.AirlineId)}</div>
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
                <div className="airline-flex-col border-right">{this.getFormattedTime(props.StartTime)}</div>
                <div className="airline-flex-col margin-right text-right">{this.getFormattedTime(props.EndTime)}</div>
            </div></div>
        );
    }
    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <div className='schedule-demo-heading'>
                            Cheapest one way fares from Barcelona to Los Angeles
                    </div>
                        <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='schedule-resources' width='100%'
                            height='650px' readonly={true} selectedDate={new Date(2018, 3, 1)}
                            eventSettings={{
                                template: this.template.bind(this), enableTooltip: true,
                                tooltipTemplate: this.toolTipTemplate.bind(this)
                            }}
                            actionBegin={this.onActionBegin.bind(this)} dataBinding={this.onDataBinding.bind(this)}
                            popupOpen={this.onPopupOpen.bind(this)} dataBound={this.onDataBound.bind(this)} >
                            <ResourcesDirective>
                                <ResourceDirective field='AirlineId' title='Airline' name='Airlines' allowMultiple={true}
                                    dataSource={this.resourceData} textField='text' idField='id' >
                                </ResourceDirective>
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
                                            <CheckBoxComponent id='airways-1' cssClass='e-resource e-airways-1' checked={true}
                                                label='Airways 1' change={this.onChange.bind(this)} >
                                            </CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div className='airways-2'>
                                            <CheckBoxComponent id='airways-2' cssClass='e-resource e-airways-2' checked={true}
                                                label='Airways 2' change={this.onChange.bind(this)} ></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div className='airways-3'>
                                            <CheckBoxComponent id='airways-3' cssClass='e-resource e-airways-3' checked={true}
                                                label='Airways 3' change={this.onChange.bind(this)} >
                                            </CheckBoxComponent>
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
}
