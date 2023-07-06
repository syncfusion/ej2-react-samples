import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { CalendarComponent, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { addClass } from '@syncfusion/ej2-base';
import './special-styles.css';

const Special = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [selectedValue, setSelectedValue] = useState<string>(null);
    const specialDate = (args: RenderDayCellEventArgs, name: String) => {
        let span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.firstElementChild.setAttribute('title', name + '!');
        addClass([args.element], ['e-day', 'special', name.toLowerCase()]);
        args.element.setAttribute('data-val', name + '!');
        args.element.setAttribute('title', name + '!');
        args.element.appendChild(span);
    }

    const customDates = (args: RenderDayCellEventArgs): void => {
        /*Dates need to be customized*/
        if (args.date.getDate() === 10) {
            specialDate(args, "Birthday");
        }
        if (args.date.getDate() === 15) {
            specialDate(args, "Farewell");
        }
        if (args.date.getDate() === 25) {
            specialDate(args, "Vacation");
        }
    }

    const onchange = (args: ChangedEventArgs): void => {
        let title: string | null = '';
        if (args.event) {
            /*Displays selected date in the label*/
            title = (args.event.currentTarget as HTMLElement).classList.contains('e-selected') ? (args.event.currentTarget as HTMLElement).getAttribute('data-val') : (args.event.currentTarget as HTMLElement).getElementsByClassName('e-selected').length > 0
                ? (args.event.currentTarget as HTMLElement).getElementsByClassName('e-selected')[0].getAttribute('data-val') : null;
            title = title == null ? '' : ' ( ' + title + ' )';
        }
        setSelectedValue(args.value.toLocaleDateString() + title);
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                    <CalendarComponent renderDayCell={customDates.bind(this)} change={onchange} className='e-customStyle' ></CalendarComponent>
                    <label id='date_label'>Selected Value:{selectedValue}</label>
                </div>
            </div>
            <div id="action-description">
                <p>
                    In the following sample, specific dates are <code>highlighted</code>. In desktop mode highlighted information about the date will be displayed when hovered.
                </p>
            </div>
            <div id='description'>
                <p>Special Dates sample demonstrates,
                    how to customize a specific dates in a calendar by using renderDayCell event.
                    This event gets triggered on each day cell element creation that allows
                    you to customize or disable the specific dates in calendar. Here 10, 15
                    and 25 date's are customized with custom styles by adding the <code>e-customStyle</code> class.</p>
                <p>
                    More information on the customization can be found in this <a target='_blank'
                        href='https://ej2.syncfusion.com/react/documentation/calendar/customization/#day-cell-format'> documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default Special;

