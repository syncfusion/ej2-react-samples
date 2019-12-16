import * as React from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './ticks-customization.css';
export class TicksCustomization extends SampleBase {
    constructor() {
        super(...arguments);
        this.ticks = { placement: 'Before', largeStep: 20 };
        this.ticksData = { placement: 'Both', largeStep: 20, smallStep: 5 };
    }
    renderingTicks(args) {
        if (args.tickElement.classList.contains('e-large')) {
            args.tickElement.classList.add('e-custom');
        }
    }
    onrenderedSliderTicks(args) {
        this.li = args.ticksWrapper.getElementsByClassName('e-large');
        let remarks = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (let i = 0; i < this.li.length; ++i) {
            this.li[i].querySelectorAll('.e-tick-both')[1].innerText = remarks[i];
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className="slider-content-wrapper">
                        <div className="slider_container">
                            <div className="slider_container" id="slider_wrapper">
                                <div className="slider_labelText userselect">Dynamic ticks color</div>
                                
                                <SliderComponent id={"ticks_slider"} value={20} min={0} max={100} step={5} ticks={this.ticks} type="MinRange" renderingTicks={this.renderingTicks.bind(this)} ref={(slider) => { this.defaultObj = slider; }}/>
                            </div>
                            <div className="slider_container">
                                <div className="slider_labelText userselect">Ticks with legends</div>
                                
                                <SliderComponent id={"slider"} value={20} min={0} max={100} type="MinRange" ticks={this.ticksData} ref={(slider) => { this.sliderObj = slider; }} renderedTicks={this.onrenderedSliderTicks.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the customization of Slider's Tick. Drag the thumb over the bar for selecting the values between
                    min and max.</p>
                </div>

                <div id="description">
                    <p>In this demo, we have demonstrated the following customization of Ticks using CSS.</p>
                    <ul>
                        <li>Dynamic ticks color - In this sample, Ticks has been customized to different colors by adding icon at each Ticks.</li>
                        <li>Ticks with legends - In this sample, Track has been formatted to display custom text using renderingTicks and renderedTicks events. </li>
                    </ul>
                </div>
            </div>);
    }
}
