import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent, SliderTickEventArgs, SliderTickRenderedEventArgs } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './ticks-customization.css';

export class TicksCustomization extends SampleBase<{}, {}> {
    public ticks: object = { placement: 'Before', largeStep: 20 };
    public ticksData: object = { placement: 'Both', largeStep: 20, smallStep: 5 };
    public li: any;
    private defaultObj: SliderComponent;
    private sliderObj: SliderComponent;
    public renderingTicks(args: SliderTickEventArgs): void {
        if (args.tickElement.classList.contains('e-large')) {
            args.tickElement.classList.add('e-custom');
        }
    }
    public onrenderedSliderTicks(args: SliderTickRenderedEventArgs): void {
        this.li = args.ticksWrapper.getElementsByClassName('e-large');
        let remarks: any = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (let i: number = 0; i < this.li.length; ++i) {
            (this.li[i].querySelectorAll('.e-tick-both')[1] as HTMLElement).innerText = remarks[i];
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="slider-content-wrapper">
                        <div className="slider_container">
                            <div className="slider_container" id="slider_wrapper">
                                <div className="slider_labelText userselect">Dynamic ticks color</div>
                                {/* Ticks slider element  */}
                                <SliderComponent id={"ticks_slider"} value={20} min={0} max={100} step={5} ticks={this.ticks} type="MinRange" renderingTicks={this.renderingTicks.bind(this)} ref={(slider) => { this.defaultObj = slider }} />
                            </div>
                            <div className="slider_container">
                                <div className="slider_labelText userselect">Ticks with legends</div>
                                {/* Ticks slider element */}
                                <SliderComponent id={"slider"} value={20} min={0} max={100} type="MinRange" ticks={this.ticksData} ref={(slider) => { this.sliderObj = slider }} renderedTicks={this.onrenderedSliderTicks.bind(this)} />
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
            </div>
        )
    }
}
