import * as React from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
const slidercss = `
.content-wrapper {
    width: 52%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 60px;
}

.userselect {
    -webkit-user-select: none;
    /* Safari 3.1+ */
    -moz-user-select: none;
    /* Firefox 2+ */
    -ms-user-select: none;
    /* IE 10+ */
    user-select: none;
    /* Standard syntax */
}

#EventLog b {
    color: #388e3c;
}

hr {
    margin-top: 6px;
    margin-bottom: 6px;
}

`;
export class Events extends SampleBase {
    constructor() {
        super(...arguments);
        this.defaultTooltip = { isVisible: true, placement: 'Before', showOn: 'Focus' };
        this.defaultTicks = { placement: 'Both', largeStep: 20, smallStep: 5, showSmallTicks: true };
    }
    //Handler for create event trace
    onCreated() {
        this.appendElement('Slider control has been <b>created</b><hr>');
    }
    //Handler for change event trace
    onChange(args) {
        this.appendElement('Slider value is <b>changing</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Handler for changed event trace
    onChanged(args) {
        this.appendElement('Slider value has been <b>changed</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Display event log
    appendElement(html) {
        let span = document.createElement('span');
        span.innerHTML = html;
        let log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    // Clears the event log details
    onclick() {
        document.getElementById('EventLog').innerHTML = '';
    }
    refreshTooltip(e) {
        if (this.defaultObj) {
            this.defaultObj.refreshTooltip(this.defaultObj.tooltipTarget);
        }
    }
    render() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.refreshTooltip.bind(this));
        }
        return (<div className='control-pane'>
                <style>{slidercss}</style>
                <div className='control-section'>
                    <div className='col-lg-8'>
                        <div className="content-wrapper">
                            <div className='sliderwrap'>
                                
                                <SliderComponent id='minrange' value={30} type='MinRange' tooltip={this.defaultTooltip} ticks={this.defaultTicks} ref={(slider) => { this.defaultObj = slider; }} changed={this.onChanged.bind(this)} created={this.onCreated.bind(this)} change={this.onChange.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div id="slider_event" className="col-lg-4 property-section">
                        <PropertyPane title='Properties'>
                            <table id="property" title="Event Trace" className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="eventarea" style={{ height: '245px', overflow: 'auto' }}>
                                                
                                                <span className="EventLog" id="EventLog" style={{ wordbreak: 'normal' }}></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="evtbtn" style={{ paddingbottom: '10px' }}>
                                                
                                                <input id="clear" type="button" className="btn btn-default" value="Clear" onClick={this.onclick}/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the events that have been triggered on the Slider operations with the help of Event Trace panel.
                 Drag the thumb over the bar between min and max to know the event details.
                 </p>
                </div>

                <div id="description">
                    <p>Slider component triggers event based on its actions. The events can be used as an extension point to perform custom
                     operations.
                     </p>
                    <p>In this demo, Slider performs following action like created, change, changed Which can be traced by event trace panel.</p>
                    <ul>
                        <li>created - Triggers when Slider is created.</li>
                        <li>changee - Triggers when the Slider value is changed.</li>
                        <li>changed - Triggers when the Slider action is completed with change in Slider value.</li>
                    </ul>
                    <p>For more information, we can refer the
                     <a target="_blank" href="http://ej2.syncfusion.com/documentation/slider/api-slider.html?lang=es6#events">events</a> API from the documentation.</p>
                </div>
            </div>);
    }
}
