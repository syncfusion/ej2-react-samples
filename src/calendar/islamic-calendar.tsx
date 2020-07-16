import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, RenderDayCellEventArgs, ChangedEventArgs, Islamic , Inject  } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { addClass, Internationalization } from '@syncfusion/ej2-base';
import './islamic-calendar.css';

export class IslamicCalendar extends SampleBase<{}, {}> {
    public globalize: Internationalization = new Internationalization('en');
    public calendarMode: any = 'Islamic';
    public valueChange(args: ChangedEventArgs): void {
        (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + this.globalize.formatDate(args.value, { type: 'date', format: 'ddMMMyyyy', calendar: 'islamic' });
    }
    public disableDate(args: RenderDayCellEventArgs) {
        /*Date need to be disabled*/
        if (args.date.getDate() === 2 || args.date.getDate() === 10 || args.date.getDate() === 28) {
            args.isDisabled = true;
        }
        if (args.date.getDate() === 13) {
            let span: HTMLElement;
            span = document.createElement('span');
            args.element.children[0].className += 'e-day sf-icon-cup highlight';
            addClass([args.element], ['special', 'e-day', 'dinner']);
            args.element.setAttribute('data-val', ' Dinner !');
            args.element.appendChild(span);
        }
        if (args.date.getDate() === 23) {
            args.element.children[0].className += 'e-day sf-icon-start highlight';
            let span: HTMLElement;
            span = document.createElement('span');
            span.setAttribute('class', 'sf-icons-star highlight');
            //use the imported method to add the multiple classes to the given element
            addClass([args.element], ['special', 'e-day', 'holiday']);
            args.element.setAttribute('data-val', ' Holiday !');
            args.element.appendChild(span);
        }
    }
    render() {
        return (
            <div className='control-pane e-react-islamic-calendar'>
                <div className='control-section'>
                    <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                        <CalendarComponent calendarMode={this.calendarMode} renderDayCell={this.disableDate.bind(this)} change={this.valueChange}>
                        <Inject services={[Islamic]} />
                        </CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    The following sample demonstrates the hijri(islamic) calendar with disabled dates and special dates. In desktop
        mode, hover over the special day to know the special information about the day.</p>
                </div>
                <div id='description'>
                    <p>The <code>Islamic calendar</code> is a extended feature which renders the calendar components based on the
        hijri calendar year. Also, we can globalize the hijri calendar to arabic culture.</p>
                    <p>
                        More information on the customization can be found in this <a target='_blank'
                            href='https://ej2.syncfusion.com/react/documentation/calendar/customization/#day-cell-format'> documentation</a> section.
          </p>
                </div>
            </div>
        )
    }
}