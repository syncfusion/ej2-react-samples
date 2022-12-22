import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent, NumericTextBoxComponent, ChangeEventArgs as textboxChange } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs as buttonChangeEvent } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import { TooltipDataModel, TicksDataModel, LimitDataModel } from '@syncfusion/ej2-inputs';
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
function Limits() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    // Instance of the control
    let minRangeObj: SliderComponent;
    let rangeObj: SliderComponent;
    let minStartObj: NumericTextBoxComponent;
    let minEndObj: NumericTextBoxComponent;
    let maxStartObj: NumericTextBoxComponent;
    let maxEndObj: NumericTextBoxComponent;

    let fixOneObj: CheckBoxComponent;
    let fixTwoObj: CheckBoxComponent;


    // Initialize ticks with placement, largestep, smallstep
    let ticks: TicksDataModel = { placement: 'After', largeStep: 20, smallStep: 5, showSmallTicks: true };
    let tooltip: TooltipDataModel = { isVisible: true, placement: 'Before' };
    let minRangeLimits: LimitDataModel = { enabled: true, minStart: 10, minEnd: 40 };
    let rangeLimits: LimitDataModel = { enabled: true, minStart: 10, minEnd: 40, maxStart: 60, maxEnd: 90 };

    function minStart(args: textboxChange) {
        minRangeObj.limits.minStart = args.value;
        rangeObj.limits.minStart = args.value;
    }

    function minEnd(args: textboxChange) {
        minRangeObj.limits.minEnd = args.value;
        rangeObj.limits.minEnd = args.value;
    }

    function maxStart(args: textboxChange) {
        minRangeObj.limits.maxStart = args.value;
        rangeObj.limits.maxStart = args.value;
    }

    function maxEnd(args: textboxChange) {
        minRangeObj.limits.maxEnd = args.value;
        rangeObj.limits.maxEnd = args.value;
    }

    function fixOneChange(args: buttonChangeEvent) {
        minRangeObj.limits.startHandleFixed = args.checked;
        rangeObj.limits.startHandleFixed = args.checked;
    }

    function fixTwoChange(args: buttonChangeEvent) {
        minRangeObj.limits.endHandleFixed = args.checked;
        rangeObj.limits.endHandleFixed = args.checked;
    }

    function refreshTooltip(e: any): void {
        if (minEndObj && rangeObj) {
            (minRangeObj as any).refreshTooltip((minRangeObj as any).tooltipTarget);
            (rangeObj as any).refreshTooltip((rangeObj as any).tooltipTarget);
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
                            <SliderComponent id='minrange' type="MinRange" value={25} min={0} max={100} ticks={ticks} limits={minRangeLimits} ref={(slider) => { minRangeObj = slider }} tooltip={tooltip} />
                        </div>
                        <div className='sliderwrap'>
                            <label>Range Slider With Limits</label>
                            {/* Initialize Range Slider Component with ticks with placement, largestep, smallstep */}
                            <SliderComponent id='range' value={[25, 75]} min={0} max={100} type='Range' limits={rangeLimits} ticks={ticks} tooltip={tooltip} ref={(slider) => { rangeObj = slider }} />
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
                                        <NumericTextBoxComponent value={10} min={0} max={100} change={minStart.bind(this)} ref={(obj) => {
                                            minStartObj = obj;
                                        }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">MinEnd</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <NumericTextBoxComponent value={40} min={0} max={100} change={minEnd.bind(this)} ref={(obj) => {
                                            minEndObj = obj;
                                        }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">MaxStart</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <NumericTextBoxComponent value={60} min={0} max={100} change={maxStart.bind(this)} ref={(obj) => {
                                            maxStartObj = obj;
                                        }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">MaxEnd</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <NumericTextBoxComponent value={90} min={0} max={100} change={maxEnd.bind(this)} ref={(obj) => {
                                            maxEndObj = obj;
                                        }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">Lock First Handle</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <CheckBoxComponent ref={(scope) => { fixOneObj = scope; }} change={fixOneChange.bind(this)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div className="userselect">Lock Second Handle</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <CheckBoxComponent ref={(scope) => { fixTwoObj = scope; }} change={fixTwoChange.bind(this)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the rendering of Slider component with limits. Drag the thumb over the bar for selecting the
                values between assigned limit values. Change the values in the property pane to set different limit values.</p>

                </div>

                <div id="description">
                    <p>
                        The limits are used to limit between certain range. When the limits are assigned, draggable limited area will be
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
