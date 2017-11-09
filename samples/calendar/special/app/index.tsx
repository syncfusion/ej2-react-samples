import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Special extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='calendar-control-section'>
                        <CalendarComponent renderDayCell={customDates} change={onchange} ></CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
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


ReactDOM.render(<Special />, document.getElementById('sample'));