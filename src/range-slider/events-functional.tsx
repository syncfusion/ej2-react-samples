import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import { SliderComponent, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
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
`
const Events = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [eventLog, setEventLog] = useState('');
    let defaultObj = useRef<SliderComponent>(null);
    let defaultTooltip: object = { isVisible: true, placement: 'Before', showOn: 'Focus' };
    let defaultTicks: object = { placement: 'Both', largeStep: 20, smallStep: 5, showSmallTicks: true };
    //Handler for create event trace
    const onCreated = (): void => {
        appendElement('Slider control has been <b>created</b><hr>');
    }
    //Handler for change event trace
    const onChange = (args: SliderChangeEventArgs): void => {
        appendElement('Slider value is <b>changing</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Handler for changed event trace
    const onChanged = (args: SliderChangeEventArgs): void => {
        appendElement('Slider value has been <b>changed</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Display event log
    const appendElement = (html: string): void => {
        setEventLog(prevLog => `${html}${prevLog}`);
    }
    // Clears the event log details
    const onclick = (): void => {
        setEventLog('');
    }
    const refreshTooltip = (e: any): void => {
        if ((defaultObj as any).current) {
            (defaultObj as any).current.refreshTooltip((defaultObj as any).tooltipTarget);
        }
    }
    if (!isNullOrUndefined(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(this));
    }
    return (
        <div className='control-pane'>
            <style>{slidercss}</style>
            <div className='control-section'>
                <div className='col-lg-8'>
                    <div className="content-wrapper" >
                        <div className='sliderwrap'>
                            {/* Initialize Slider Component with type MinRange */}
                            <SliderComponent id='minrange' value={30} type='MinRange' tooltip={defaultTooltip} ticks={defaultTicks} ref={defaultObj} changed={onChanged.bind(this)} created={onCreated.bind(this)} change={onChange.bind(this)} />
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
                                            {/* Event log element  */}
                                            <span className="EventLog" id="EventLog" style={{ wordBreak: "normal" }} dangerouslySetInnerHTML={{ __html: eventLog }}></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="evtbtn" style={{ paddingBottom: '10px' }}>
                                            {/* Event log element  */}
                                            <input id="clear" type="button" className="btn btn-default" value="Clear" onClick={onclick} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the events that have been triggered on the Slider operations with the help of Event Trace panel.
                    Drag the thumb over the bar between min and max to know the event details.
                </p>
            </div>
            <div id="description">
                <p>Slider component triggers event based on its actions. The events can be used as an extension point to perform custom operations.</p>
                <p>In this demo, Slider performs following action like created, change, changed Which can be traced by event trace panel.</p>
                <ul>
                    <li>created - Triggers when Slider is created.</li>
                    <li>change - Triggers when the Slider value is changed.</li>
                    <li>changed - Triggers when the Slider action is completed with change in Slider value.</li>
                </ul>
                <p>
                    For more information, we can refer the
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#events">events</a> API from the documentation.
                </p>
            </div>
        </div>
    )
}
export default Events;