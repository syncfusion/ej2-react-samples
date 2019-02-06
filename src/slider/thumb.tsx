import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const slidercss = `  
.slider-content-wrapper {
    width: 40%;
    margin: 0 auto;
    min-width: 185px;
}

.slider-userselect {
    -webkit-user-select: none;
    /* Safari 3.1+ */
    -moz-user-select: none;
    /* Firefox 2+ */
    -ms-user-select: none;
    /* IE 10+ */
    user-select: none;
    /* Standard syntax */
}

.labelText {
    text-align: -webkit-left;
    font-weight: 500;
    font-size: 13px;
    padding-bottom: 10px;
}

.slider_container {
    margin-top: 40px;
}

.e-bigger .content-wrapper {
    width: 80%;
}

#square_slider.e-control.e-slider .e-handle {
    border-radius: 0%;
    background-color: #f9920b;
    border: 0;
}

#circle_slider.e-control.e-slider .e-handle {
    background-color: #f9920b;
    border-radius: 50%;
    border: 0;
}

#image_slider.e-control.e-slider .e-handle {
    background-image: url('./src/slider/images/thumb.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: #fff;kk
    border: 0;
}

#square_slider .e-tab-handle::after,
#circle_slider .e-tab-handle::after {
    background-color: #f9920b;
}

#image_slider .e-tab-handle::after {
    background-color: transparent;
}

#oval_slider.e-control.e-slider .e-handle {
    height: 25px;
    width: 8px;
    top: 3px;
    border-radius: 15px;
    background-color: #f9920b;
}
`
export class Thumb extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <style>{slidercss}</style>
                    <div className="slider-content-wrapper">
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Square</div>
                            {/* Square slider element  */}
                            <SliderComponent id="square_slider" value={30} min={0} max={100} />
                        </div>
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Circle</div>
                            {/* Circle slider element */}
                            <SliderComponent id="circle_slider" value={30} min={0} max={100} />
                        </div>
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Oval</div>
                            {/* Oval slider element   */}
                            <SliderComponent id="oval_slider" value={30} min={0} max={100} />
                        </div>
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Custom image</div>
                            {/* Image slider element    */}
                            <SliderComponent id="image_slider" value={30} min={0} max={100} />
                        </div>
                    </div>
                </div>


                <div id="action-description">
                    <p>This sample demonstrates the customization of Slider's Thumb. Drag the thumb over the bar for selecting the values between
                    min and max.
                </p>
                </div>

                <div id="description">
                    <p>In this demo, we have demonstrated the following customization of Thumb by changing CSS.</p>
                    <ul>
                        <li>Square - In this sample, Thumb has been customized to Square shape.</li>
                        <li>Circle - In this sample, Thumb has been customized to Circle shape. </li>
                        <li>Oval - In this sample, Thumb has been customized to Oval shape. </li>
                        <li>Custom image - In this sample, Thumb has been replaced with custom image. </li>
                    </ul>
                </div>
            </div>
        )
    }
}
