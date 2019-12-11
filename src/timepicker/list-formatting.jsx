import * as React from 'react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './list-style.css';
export class Formatting extends SampleBase {
    constructor() {
        super(...arguments);
        this.value = new Date();
    }
    // scrollTo value will be assigned only if the timepicker value is not null or undefined and is a valid value.
    onOpen(args) {
        if (this.timeObj.value && !isNaN(+this.timeObj.value))
            //assign the current value as the scrollTo value
            this.timeObj.scrollTo = this.timeObj.value;
    }
    //item render event handler
    itemRenderHandler(args) {
        // inner element declaration for text
        let span = document.createElement('span');
        if (args.value.getHours() === 0 && args.value.getMinutes() === 0 && args.value.getSeconds() === 0) {
            //assign the initial value to the variable
            this.startTime = args.value;
        }
        //get the minutes details
        let minutes = (+args.value - +this.startTime) / 60000;
        //get the hours details
        let hours = parseInt('' + (minutes / 60), 10);
        let mins = (minutes % 60) / 6;
        //displayed text formation for each LI element.
        let minText;
        if (minutes === 0 || minutes === 30) {
            minText = minutes + ' mins';
        }
        else {
            minText = (mins > 0) ? ('.' + mins) : '';
        }
        span.innerHTML = ' (' + ((hours > 0) ? (hours + minText + ' hrs') : ('' + ' mins')) + ')';
        //disable the specific time from the selection
        if ((minutes / 60) % 3 === 0) {
            //disable the time values by addeding the e-disabled class.
            args.element.classList.add('e-disabled');
        }
        //append the custom SPAN element into LI element
        args.element.appendChild(span);
    }
    render() {
        return (<div className='control-pane default'>
                <div className='control-section'>
                    <div className='timepicker-control-section'>
                        <TimePickerComponent cssClass='e-custom-style' value={this.value} ref={Timepicker => this.timeObj = Timepicker} open={this.onOpen.bind(this)} itemRender={this.itemRenderHandler.bind(this)}></TimePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the popup list element in specific time duration. Click/Touch the TimePicker popup icon to select the desired value.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        The Time Duration sample illustrates, how to customize or disable the time values in time list popup by using
                    <code>itemRender</code> event. Here, all the time values has addition information on duration between them in sequence and some of the values are
                    disabled through itemRender event by adding the <code>e-disabled</code> class.By using the
                    <code>scrollTo</code> can set the scroll position to the given value when no value is selected or the selected value is not availble in
                    the timepicker popup list.
          </p>
                    <p> 	More information about TimePicker and it's configuration can be found in the  <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#adding-timepicker-component-to-the-application'>documentation</a>  section.
          </p>
                </div>
            </div>);
    }
}
