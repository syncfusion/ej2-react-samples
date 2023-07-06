import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { SliderComponent, NumericTextBoxComponent, ChangeEventArgs as textboxChange } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs as buttonChangeEvent } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import { TooltipDataModel, TicksDataModel, LimitDataModel, SliderOrientation } from '@syncfusion/ej2-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

const slidercss = `
.content-wrapper {
    width: 52%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 45px;
}
.e-bigger .content-wrapper {
    width: 80%;
}
.sliderwrap label {
    padding-bottom: 50px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
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
.property-custom td {
    padding: 5px;
}
.property-custom .property-panel-content {
    height: 320px;
}
`
interface Slider {
    enabled: boolean;
    minStart: number;
    minEnd: number;
    startHandleFixed: boolean;
}

interface RangeSlider {
    enabled: boolean;
    minStart: number;
    minEnd: number;
    maxStart: number;
    maxEnd: number;
    startHandleFixed: boolean;
    endHandleFixed: boolean;
}

const Limits = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [slider, SetSlider] = useState<Slider>({
      enabled: true,
      minStart: 10,
      minEnd: 40,
      startHandleFixed: false,
    });
    const [rangeSlider, SetRangeSlider] = useState<RangeSlider>({
      enabled: true,
      minStart: 10,
      minEnd: 40,
      maxStart: 60,
      maxEnd: 90,
      startHandleFixed: false,
      endHandleFixed: false,
    });
    // Instance of the control
    let minRangeObj = useRef<SliderComponent>(null);
    let rangeObj = useRef<SliderComponent>(null);
    let minEndObj = useRef<NumericTextBoxComponent>(null);

    // Initialize ticks with placement, largestep, smallstep
    let ticks: TicksDataModel = { placement: 'After', largeStep: 20, smallStep: 5, showSmallTicks: true };
    let tooltip: TooltipDataModel = { isVisible: true, placement: 'Before' };

    const minStart = (args: textboxChange) => {
        SetSlider({ ...slider, minStart: args.value });
        SetRangeSlider({ ...rangeSlider, minStart: args.value });
    }

    const minEnd = (args: textboxChange) => {
        SetSlider({ ...slider, minEnd: args.value });
        SetRangeSlider({ ...rangeSlider, minEnd: args.value });
    }

    const maxStart = (args: textboxChange) => {
        SetRangeSlider({ ...rangeSlider, maxStart: args.value });
    }

    const maxEnd = (args: textboxChange) => {
        SetRangeSlider({ ...rangeSlider, maxEnd: args.value });
    }

    const fixOneChange = (args: buttonChangeEvent) => {
        SetSlider({ ...slider, startHandleFixed: args.checked });
        SetRangeSlider({ ...rangeSlider, startHandleFixed: args.checked });
    }

    const fixTwoChange = (args: buttonChangeEvent) => {
        SetRangeSlider({ ...rangeSlider, endHandleFixed: args.checked });
    }

    const refreshTooltip = (e: any): void => {
        if ((minRangeObj as any).current && (rangeObj as any).current) {
            (minRangeObj as any).current.refreshTooltip((minRangeObj as any).tooltipTarget);
            (rangeObj as any).current.refreshTooltip((rangeObj as any).tooltipTarget);
        }
    }

    if (!isNullOrUndefined(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(this));
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-8'>
                    <div className="content-wrapper">
                        <style>{slidercss}</style>
                        <div className='sliderwrap'>
                            <label>MinRange Slider With Limits</label>
                            {/* Initialize Slider Component with ticks with placement, largestep, smallstep */}
                            <SliderComponent id='minrange' type="MinRange" value={25} min={0} max={100} ticks={ticks} limits={slider} tooltip={tooltip} ref={minRangeObj} />
                        </div>
                        <div className='sliderwrap'>
                            <label>Range Slider With Limits</label>
                            {/* Initialize Range Slider Component with ticks with placement, largestep, smallstep */}
                            <SliderComponent id='range' value={[25, 75]} min={0} max={100} type='Range' limits={rangeSlider} ticks={ticks} tooltip={tooltip} ref={rangeObj} />
                        </div>
                    </div>
                </div>
                <div id="#slider_event" className='col-lg-4 property-section property-custom'>
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">MinStart</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <NumericTextBoxComponent value={10} min={0} max={100} change={minStart.bind(this)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">MinEnd</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <NumericTextBoxComponent value={40} min={0} max={100} change={minEnd.bind(this)} ref={minEndObj}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">MaxStart</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <NumericTextBoxComponent value={60} min={0} max={100} change={maxStart.bind(this)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">MaxEnd</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <NumericTextBoxComponent value={90} min={0} max={100} change={maxEnd.bind(this)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">Lock First Handle</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <CheckBoxComponent checked={false} change={fixOneChange.bind(this)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">Lock Second Handle</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <CheckBoxComponent checked={false} change={fixTwoChange.bind(this)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the rendering of Slider component with limits. Drag the thumb over the bar for selecting the
                       values between assigned limit values. Change the values in the property pane to set different limit values.
                    </p>
                </div>
                <div id="description">
                    <p>The limits are used to limit between certain range. When the limits are assigned, draggable limited area will be
                        in the dark shadow color of the current theme. The limits APIs are explained below.
                    </p>
                    <p>
                        <table>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#minstart">minStart</a>
                                </td>
                                <td>
                                    - &nbsp;&nbsp;Used to set minimum limit value for first handle.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#minend">minEnd</a>
                                </td>
                                <td>
                                    - &nbsp;&nbsp;Used to set maximum limit value for first handle.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#maxstart">maxStart</a>
                                </td>
                                <td>
                                    - &nbsp;&nbsp;Used to set minimum limit value for second handle.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#minstart">maxEnd</a>
                                </td>
                                <td>
                                    - &nbsp;&nbsp;Used to set maximum limit value for first handle.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#starthandlefixed">startHandleFixed</a>
                                </td>
                                <td>
                                    - &nbsp;&nbsp;Used to lock the first handle in the current position.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#endhandlefixed">endHandleFixed</a>
                                </td>
                                <td>
                                    - &nbsp;&nbsp;Used to lock the second handle in the current position.
                                </td>
                            </tr>
                        </table>
                    </p>
                    <p> In this demo, Limits with MinRange and range Slider is demonstrated.</p>
                    <ul>
                        <li>MinRange Slider – In this sample, the minimum and maximum limit of the slider is set to 10 and 40 respectively.</li>
                        <li>Range Slider – In this sample, the minimum and maximum limit of the first handle is set to 10 and 40 respectively
                            and the minimum and maximum limit of the second handle is set to 60 and 90 respectively.
                        </li>
                    </ul>
                    <p>For more information, refer to the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/range-slider/limits/">limits</a> section from the documentation.</p>
                </div>
            </div>
        </div>
    )
}
export default Limits;