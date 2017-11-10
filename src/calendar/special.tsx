import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './calendar-component.css';

export class Special extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                        <CalendarComponent renderDayCell={customDates} change={onchange} ></CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In the below sample, specific dates are <code>highlighted</code> to bring the additional information on those dates itself to know more on selecting. Click on the special date,the tooltip information are about the date will be displayed in the label below the Calendar.</p>  
                </div>
                <div id='description'>
                    <p>Special Dates sample demonstrates,
            how to customize a specific dates in a calendar by using renderDayCell event.
            This event gets triggered on each day cell element creation that allows
             you to customize or disable the specific dates in calendar. Here 10, 15
             and 20 date's are customized with custom styles and custom classes.</p>
                    <p>
                        More information on the customization can be found in this <a target='_blank'
                            href='http://ej2.syncfusion.com/react/documentation/calendar/customization.html#day-cell-format'>documentation</a> section.
          </p>
                </div>
            </div>
        )
    }
}
function customDates(args: RenderDayCellEventArgs): void {
    /*Date need to be customized*/
    if (args.date.getDate() === 10) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.appendChild(span);
        args.element.setAttribute('title', 'Birthday !');
        args.element.setAttribute('data-val', 'Birthday !');
    }
    if (args.date.getDate() === 15) {
        args.element.className = 'special';
        args.element.setAttribute('title', 'Farewell');
        args.element.setAttribute('data-val', 'Farewell !');
    }
    if (args.date.getDate() === 20) {
        args.element.className = 'daycell';
    }
}
function onchange(args: ChangedEventArgs): void {
    /*Displays selected date in the label*/
    let title: string = (event.currentTarget as HTMLElement).querySelector('.e-day').getAttribute('data-val');
    title = title == null ? '' : ' ( ' + title + ' )';
    (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString() + title;
}

