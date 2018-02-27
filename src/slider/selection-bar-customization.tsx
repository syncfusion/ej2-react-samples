import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './bar.css';

export class Bar extends SampleBase<{}, {}> {
    // Handler used for slider created event
    public onCreated(): void {
        let sliderTrack: any = document.getElementById('dynamic_color_slider').querySelector('.e-range');
        let sliderHandle: any = document.getElementById('dynamic_color_slider').querySelector('.e-handle');
        sliderHandle.style.backgroundColor = 'green';
        sliderTrack.style.backgroundColor = 'green';
    }
    public onChange(args: SliderChangeEventArgs): void {
        let sliderTrack: any = document.getElementById('dynamic_color_slider').querySelector('.e-range');
        let sliderHandle: any = document.getElementById('dynamic_color_slider').querySelector('.e-handle');
        if (args.value > 0 && args.value <= 25) {
            // Change handle and range bar color to green when
            sliderTrack.style.backgroundColor = 'green';
            sliderHandle.style.backgroundColor = 'green';
        } else if (args.value > 25 && args.value <= 50) {
            // Change handle and range bar color to royal blue
            sliderTrack.style.backgroundColor = 'royalblue';
            sliderHandle.style.backgroundColor = 'royalblue';
        } else if (args.value > 50 && args.value <= 75) {
            // Change handle and range bar color to dark orange
            sliderTrack.style.backgroundColor = 'darkorange';
            sliderHandle.style.backgroundColor = 'darkorange';
        } else if (args.value > 75 && args.value <= 100) {
            // Change handle and range bar color to red
            sliderTrack.style.backgroundColor = 'red';
            sliderHandle.style.backgroundColor = 'red';
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="col-lg-12 control-section">
                        <div className="slider-content-wrapper">
                            <div className="slider_container">
                                <div className="slider-labeltext slider_userselect">Height</div>
                                <SliderComponent id="height_slider" value={30} min={0} max={100} />
                            </div>
                            <div className="slider_container">
                                <div className="slider-labeltext slider_userselect">Gradient color</div>
                                <SliderComponent id="gradient_slider" value={50} min={0} max={100} type="MinRange" />
                            </div>
                            <div className="slider_container">
                                <div className="slider-labeltext slider_userselect">Dynamic thumb and selection bar color</div>
                                <SliderComponent id="dynamic_color_slider" value={20} min={0} max={100} type="MinRange" created={this.onCreated.bind(this)} change={this.onChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>


                <div id="action-description">
                    <p>This sample demonstrates the customization of Slider's selection bar. Drag the thumb over the bar for selecting the values
                between min and max.</p>
                </div>

                <div id="description">
                    <p>In this demo, customization of track using CSS is demonstrated.</p>
                    <ul>
                        <li>Height - In this sample, track has been customized to custom height. Here, thumb has to be adjusted based on the
                        track height.</li>
                        <li>Gradient color - In this sample, track has been customized with gradient color. </li>
                        <li>Dynamic thumb and selection bar color - In this sample, track and thumb has been customized to different colors for
                        different intervals by using created and change event. </li>
                    </ul>
                </div>
            </div>
        )
    }
}
