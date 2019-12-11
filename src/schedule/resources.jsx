import * as React from 'react';
import { Month, Inject, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective } from '@syncfusion/ej2-react-schedule';
import './resources.css';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { extend, Internationalization, createElement, closest, remove, addClass, removeClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
/**
 * schedule resources fare-calendar sample
 */
export class Resources extends SampleBase {
    constructor() {
        super(...arguments);
        this.dManager = [];
        this.initalLoad = true;
        this.instance = new Internationalization();
        this.resourceData = [
            { text: 'Airways 1', id: 1 },
            { text: 'Airways 2', id: 2 },
            { text: 'Airways 3', id: 3 }
        ];
    }
    getAirwaysName(value) {
        return (value === 1) ? 'Airways 1' : (value === 2) ? 'Airways 2' : 'Airways 3';
    }
    getAirwaysImage(value) {
        return (value === 1) ? 'airways-1' : (value === 2) ? 'airways-2' : 'airways-3';
    }
    getFormattedTime(date) {
        return this.instance.formatDate(date, { skeleton: 'Hm' });
    }
    onActionBegin(args) {
        if (args.requestType === 'toolbarItemRendering') {
            args.items[2].align = 'Center';
            args.items[2].suffixIcon = '';
            args.items = args.items.splice(2, 1);
        }
    }
    onDataBinding() {
        if (this.initalLoad) {
            this.scheduleObj.eventSettings.dataSource = this.generateEvents(this.scheduleObj);
            this.initalLoad = false;
        }
    }
    onDataBound() {
        let eventCollections = this.scheduleObj.getCurrentViewEvents();
        eventCollections.sort((a, b) => (a.Fare - b.Fare));
        let indexDate = new Date(eventCollections[0].StartTime.getTime());
        indexDate.setHours(0, 0, 0, 0);
        let index = this.scheduleObj.getIndexOfDate(this.scheduleObj.activeView.renderDates, indexDate);
        let target = this.scheduleObj.element.querySelectorAll('.e-work-cells')[index];
        addClass([target], 'best-price');
        target.appendChild(createElement('div', { className: 'best-price', innerHTML: 'Best Price' }));
    }
    onPopupOpen(args) {
        args.cancel = true;
    }
    onChange(args) {
        let tdElement = this.scheduleObj.element.querySelector('.best-price:not(.e-work-cells)');
        if (tdElement) {
            removeClass([closest(tdElement, 'td')], 'best-price');
            remove(tdElement);
        }
        let scheduleData = extend([], this.dManager, null, true);
        let selectedResource = [];
        let resourceCollection = [].slice.call(document.querySelectorAll('.e-resource'));
        resourceCollection.forEach((element, index) => {
            if (element.getAttribute('aria-checked') === 'true') {
                selectedResource.push(index);
            }
        });
        let filteredData = [];
        let resources = this.scheduleObj.resourceBase.resourceCollection.slice(-1)[0].dataSource;
        for (let resource of selectedResource) {
            let data = scheduleData.filter((event) => resources[resource].id === event.AirlineId);
            filteredData = filteredData.concat(data);
        }
        filteredData = this.filterByFare(filteredData, this.scheduleObj);
        this.scheduleObj.eventSettings.dataSource = filteredData;
        this.scheduleObj.dataBind();
    }
    filterByFare(appointments, scheduleObj) {
        let fieldMapping = scheduleObj.eventFields;
        appointments.sort((object1, object2) => {
            let d1 = +object1[fieldMapping.startTime];
            let d2 = +object2[fieldMapping.startTime];
            let d3 = +object1[fieldMapping.endTime];
            let d4 = +object2[fieldMapping.endTime];
            return ((d1 - d2) || ((d4 - d2) - (d3 - d1)));
        });
        let renderDate = scheduleObj.activeView.getRenderDates();
        let finalData = [];
        for (let date of renderDate) {
            if (scheduleObj.selectedDate.getMonth() === date.getMonth()) {
                let strTime = new Date(+date);
                let endTime = new Date(new Date(strTime.getTime()).setHours(23, 59, 59, 59));
                let perDayData = scheduleObj.eventBase.filterEvents(strTime, endTime, appointments);
                if (perDayData.length > 0) {
                    perDayData.sort((a, b) => (a.Fare - b.Fare));
                    finalData.push(perDayData[0]);
                }
            }
        }
        return finalData;
    }
    template(props) {
        return (<div className="template-wrap">
            <div className="fare-detail">${props.Fare}</div>
            <div className="airline-name" style={{ display: 'flex', paddingLeft: '5px' }}>
                <div className={"airline-logo " + this.getAirwaysImage(props.AirlineId)}></div>
                <div className="airway-name">{this.getAirwaysName(props.AirlineId)}</div>
            </div></div>);
    }
    toolTipTemplate(props) {
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
            </div></div>);
    }
    render() {
        return (<div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <div className='schedule-demo-heading'>
                            Cheapest one way fares from Barcelona to Los Angeles
                    </div>
                        <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='schedule-resources' width='100%' height='650px' readonly={true} selectedDate={new Date(2018, 3, 1)} eventSettings={{
            template: this.template.bind(this), enableTooltip: true,
            tooltipTemplate: this.toolTipTemplate.bind(this)
        }} actionBegin={this.onActionBegin.bind(this)} dataBinding={this.onDataBinding.bind(this)} popupOpen={this.onPopupOpen.bind(this)} dataBound={this.onDataBound.bind(this)}>
                            <ResourcesDirective>
                                <ResourceDirective field='AirlineId' title='Airline' name='Airlines' allowMultiple={true} dataSource={this.resourceData} textField='text' idField='id'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option='Month'/>
                            </ViewsDirective>
                            <Inject services={[Month]}/>
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
                                            <CheckBoxComponent id='airways-1' cssClass='e-resource e-airways-1' checked={true} label='Airways 1' change={this.onChange.bind(this)}>
                                            </CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div className='airways-2'>
                                            <CheckBoxComponent id='airways-2' cssClass='e-resource e-airways-2' checked={true} label='Airways 2' change={this.onChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div className='airways-3'>
                                            <CheckBoxComponent id='airways-3' cssClass='e-resource e-airways-3' checked={true} label='Airways 3' change={this.onChange.bind(this)}>
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
            </div>);
    }
}
