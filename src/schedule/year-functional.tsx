import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective,
    ResourceDirective, EventRenderedArgs, Inject, Year as YearView, TimelineYear
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './schedule-component.css';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';

/**
 * Schedule Year view sample
 */

function Year() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let scheduleObj: ScheduleComponent;
    const categoriesData: Object[] = [
        { text: 'Nancy', id: 1, color: '#df5286' },
        { text: 'Steven', id: 2, color: '#7fa900' },
        { text: 'Robert', id: 3, color: '#ea7a57' },
        { text: 'Smith', id: 4, color: '#5978ee' },
        { text: 'Michael', id: 5, color: '#df5286' }
    ];
    const data: Object[] = generateEvents();
    const months: Record<string, any>[] = [
        { text: 'January', value: 0 },
        { text: 'February', value: 1 },
        { text: 'March', value: 2 },
        { text: 'April', value: 3 },
        { text: 'May', value: 4 },
        { text: 'June', value: 5 },
        { text: 'July', value: 6 },
        { text: 'August', value: 7 },
        { text: 'September', value: 8 },
        { text: 'October', value: 9 },
        { text: 'November', value: 10 },
        { text: 'December', value: 11 }
    ];
    const fields: Object = { text: 'text', value: 'value' };

    function onEventRendered(args: EventRenderedArgs): void {
        let eventColor: string = args.data.EventColor as string;
        if (!args.element || !eventColor) {
            return;
        } else {
            args.element.style.backgroundColor = eventColor;
        }
    }

    function firstMonthOfYear(args: Record<string, any>): void {
        scheduleObj.firstMonthOfYear = args.value as number;
    }

    function numberOfMonths(args: Record<string, any>): void {
        scheduleObj.monthsCount = args.value as number;
    }

    function generateEvents(count: number = 250, date: Date = new Date()): Object[] {
        let names: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        let colors: string[] = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c', '#fdd835', '#748ffc',
            '#9775fa', '#df5286', '#7fa900', '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        let startDate: Date = new Date(date.getFullYear() - 2, 0, 1);
        let endDate: Date = new Date(date.getFullYear() + 2, 11, 31);
        let dateCollections: Object[] = [];
        for (let a: number = 0, id: number = 1; a < count; a++) {
            let start: Date = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
            let end: Date = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
            let nCount: number = Math.floor(Math.random() * names.length);
            let n: number = Math.floor(Math.random() * colors.length);
            dateCollections.push({
                Id: id,
                Subject: names[nCount],
                StartTime: new Date(start.getTime()),
                EndTime: new Date(end.getTime()),
                IsAllDay: (id % 10) ? true : false,
                EventColor: colors[n],
                TaskId: (id % 5) + 1
            });
            id++;
        }
        return dateCollections;
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-9 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent width='100%' height='555px' cssClass="year-view" ref={schedule => scheduleObj = schedule}
                        eventSettings={{ dataSource: data }} firstMonthOfYear={0} monthsCount={12} eventRendered={onEventRendered.bind(this)}>
                        <ResourcesDirective>
                            <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true}
                                dataSource={categoriesData} textField='text' idField='id' colorField='color'>
                            </ResourceDirective>
                        </ResourcesDirective>
                        <ViewsDirective>
                            <ViewDirective option='Year' isSelected={true} />
                            <ViewDirective option='TimelineYear' displayName='Horizontal TimelineYear' />
                            <ViewDirective option='TimelineYear' displayName='Vertical TimelineYear' orientation="Vertical" group={{ resources: ['Categories'] }} />
                        </ViewsDirective>
                        <Inject services={[YearView, TimelineYear, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div className='col-lg-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table year-property-panel'>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <DropDownListComponent id="firstMonthElement" placeholder="First month of year" floatLabelType="Always" fields={fields}
                                            value={0} dataSource={months} change={firstMonthOfYear.bind(this)}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <NumericTextBoxComponent id="numberOfMonthsElement" placeholder="Number of months" floatLabelType="Always" format='###.##'
                                            min={1} max={24} value={12} change={numberOfMonths.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id='action-description'>
                <p>
                    This example showcases the year and timeline year views of the Scheduler with the firstMonthOfYear and monthCount properties customizations.
                    Once the property value has been changed in the properties, it will be reflected in the Scheduler.
                </p>
            </div>
            <div id='description'>
                <p>
                    In this demo, we have showcased the year and timeline year views that help to view the appointment in an annual calendar view.
                    The view options are enabled by using the views property. In the <code>TimelineYear</code>, <code>Horizontal</code> and <code>Vertical</code>
                    orientations are available to view the events with a different layout. Also this demo explains the customization of the different
                    starting month of the year using <code>firstMonthOfYear</code> property and the number of months using the <code>monthsCount</code> property.
                </p>
                <p>
                    <strong>Module Injection</strong>
                </p>
                <p>To work with Year view on Scheduler – it is necessary to inject the Year and TimelineYear module like using <code>services</code> property under <code>Inject</code> tag.</p>
            </div>
        </div>
    );
}
export default Year;