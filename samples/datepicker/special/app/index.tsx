import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Special extends SampleBase<{}, {}> {
    private dateValue: Date = new Date('1/7/2017')
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent renderDayCell={customDates} value={this.dateValue} placeholder='Choose a date'></DatePickerComponent>
                    </div>
                </div>
            </div>
        )
    }
}
function customDates(args: RenderDayCellEventArgs): void {
    /*Date need to be customized*/
    if (+args.date === +new Date('1/2/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day federal';
        args.element.setAttribute('title', ' Federal New Year’s Day !');
        args.element.appendChild(span);
    }
    if (+args.date === +new Date('1/16/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day luther';
        args.element.setAttribute('title', 'Birthday of Martin Luther King!');
        args.element.appendChild(span);

    }
    if (+args.date === +new Date('2/20/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day washington';
        args.element.setAttribute('title', 'Washington’s Birthday!');
        args.element.appendChild(span);

    }
    if (+args.date === +new Date('5/29/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day memorial';
        args.element.setAttribute('title', 'Memorial Day!');
        args.element.appendChild(span);

    }
    if (+args.date === +new Date('7/4/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day independence';
        args.element.setAttribute('title', 'Independence Day!');
        args.element.appendChild(span);

    }
    if (+args.date === +new Date('9/4/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day labour';
        args.element.setAttribute('title', 'Labor Day!');
        args.element.appendChild(span);
    }
    if (+args.date === +new Date('10/9/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day columbus';
        args.element.setAttribute('title', 'Columbus Day!');
        args.element.appendChild(span);
    }
    if (+args.date === +new Date('11/10/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day veterans';
        args.element.setAttribute('title', 'Veterans Day!');
        args.element.appendChild(span);
    }
    if (+args.date === +new Date('11/23/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day thanksgiving';
        args.element.setAttribute('title', 'Thanksgiving Day!');
        args.element.appendChild(span);
    }
    if (+args.date === +new Date('12/25/2017')) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.className = 'special e-day christmas';
        args.element.setAttribute('title', 'Christmas Day!');
        args.element.appendChild(span);
    }
}
ReactDOM.render(<Special />, document.getElementById('sample'));