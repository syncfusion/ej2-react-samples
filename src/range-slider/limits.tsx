import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent, NumericTextBoxComponent, ChangeEventArgs as textboxChange } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
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
export class Limits extends SampleBase<{}, {}> {
    // Instance of the control
    private minRangeObj: SliderComponent;
    private rangeObj: SliderComponent;
    private minStartObj: NumericTextBoxComponent;
    private minEndObj: NumericTextBoxComponent;
    private maxStartObj: NumericTextBoxComponent;
    private maxEndObj: NumericTextBoxComponent;

    private fixOneObj: CheckBoxComponent;
    private fixTwoObj: CheckBoxComponent;


    // Initialize ticks with placement, largestep, smallstep
    private ticks: TicksDataModel = { placement: 'After', largeStep: 20, smallStep: 5, showSmallTicks: true };
    private tooltip: TooltipDataModel = { isVisible: true, placement: 'Before' };
    private minRangeLimits: LimitDataModel = { enabled: true, minStart: 10, minEnd: 40 };
    private rangeLimits: LimitDataModel = { enabled: true, minStart: 10, minEnd: 40, maxStart: 60, maxEnd: 90 };

    private minStart(args: textboxChange) {
        this.minRangeObj.limits.minStart = args.value;
        this.rangeObj.limits.minStart = args.value;
    }

    private minEnd(args: textboxChange) {
        this.minRangeObj.limits.minEnd = args.value;
        this.rangeObj.limits.minEnd = args.value;
    }

    private maxStart(args: textboxChange) {
        this.minRangeObj.limits.maxStart = args.value;
        this.rangeObj.limits.maxStart = args.value;
    }

    private maxEnd(args: textboxChange) {
        this.minRangeObj.limits.maxEnd = args.value;
        this.rangeObj.limits.maxEnd = args.value;
    }

    private fixOneChange(args: buttonChangeEvent) {
        this.minRangeObj.limits.startHandleFixed = args.checked;
        this.rangeObj.limits.startHandleFixed = args.checked;
    }

    private fixTwoChange(args: buttonChangeEvent) {
        this.minRangeObj.limits.endHandleFixed = args.checked;
        this.rangeObj.limits.endHandleFixed = args.checked;
    }

    public refreshTooltip(e: any): void {
        if (this.minEndObj && this.rangeObj) {
            (this.minRangeObj as any).refreshTooltip((this.minRangeObj as any).tooltipTarget);
            (this.rangeObj as any).refreshTooltip((this.rangeObj as any).tooltipTarget);
        }
    }

    render() {
        if (!isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.refreshTooltip.bind(this));
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
                                <SliderComponent id='minrange' value={25} min={0} max={100} ticks={this.ticks} limits={this.minRangeLimits} ref={(slider) => { this.minRangeObj = slider }} tooltip={this.tooltip} />
                            </div>
                            <div className='sliderwrap'>
                                <label>Range Slider With Limits</label>
                                {/* Initialize Range Slider Component with ticks with placement, largestep, smallstep */}
                                <SliderComponent id='range' value={[25, 75]} min={0} max={100} type='Range' limits={this.rangeLimits} ticks={this.ticks} tooltip={this.tooltip} ref={(slider) => { this.rangeObj = slider }} />
                            </div>
                        </div>
                    </div>
                    <div id="#slider_event" className='col-lg-4 property-section property-custom'>
                        <PropertyPane title='Properties'>
                            <table id="property" title="Properties">
                                <tbody>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div id="minStartLabel" className="userselect">MinStart</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <NumericTextBoxComponent value={10} min={0} max={100} change={this.minStart.bind(this)} ref={(obj) => {
                                                this.minStartObj = obj;
                                            }} aria-labelledby="minStartLabel"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div id="minEndLabel" className="userselect">MinEnd</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <NumericTextBoxComponent value={40} min={0} max={100} change={this.minEnd.bind(this)} ref={(obj) => {
                                                this.minEndObj = obj;
                                            }} aria-labelledby="minEndLabel"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div id="maxStartLabel" className="userselect">MaxStart</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <NumericTextBoxComponent value={60} min={0} max={100} change={this.maxStart.bind(this)} ref={(obj) => {
                                                this.maxStartObj = obj;
                                            }} aria-labelledby="maxStartLabel"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div id="maxEndLabel" className="userselect">MaxEnd</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <NumericTextBoxComponent value={90} min={0} max={100} change={this.maxEnd.bind(this)} ref={(obj) => {
                                                this.maxEndObj = obj;
                                            }} aria-labelledby="maxEndLabel"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div id="lockFirstHandleLabel" className="userselect">Lock First Handle</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <CheckBoxComponent ref={(scope) => { this.fixOneObj = scope; }} change={this.fixOneChange.bind(this)}  aria-labelledby="lockFirstHandleLabel"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div id="lockSecondHandleLabel" className="userselect">Lock Second Handle</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <CheckBoxComponent ref={(scope) => { this.fixTwoObj = scope; }} change={this.fixTwoChange.bind(this)}  aria-labelledby="lockSecondHandleLabel"/>
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
}
