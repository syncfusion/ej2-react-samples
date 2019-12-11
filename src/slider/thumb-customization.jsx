import * as React from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
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

.material.e-bigger .e-slider-container.e-horizontal #image_slider.e-slider .e-handle,
.material .e-slider-container.e-bigger.e-horizontal #image_slider.e-slider .e-handle {
    top: calc(50% - 7px);
}

.material.e-bigger .e-slider-container.e-horizontal #image_slider.e-slider .e-handle.e-handle-active,
.material .e-slider-container.e-bigger.e-horizontal #image_slider.e-slider .e-handle.e-handle-active {
    top: calc(50% - 6px);
    transform: scale(1.3) !important;
}

.e-bigger .e-slider-container.e-horizontal #image_slider.e-slider .e-handle,
.e-slider-container.e-bigger.e-horizontal #image_slider.e-slider .e-handle {
    top: calc(50% - 9px);
}

#image_slider.e-control.e-slider .e-handle {
    height: 25px;
    width: 24px;
    background-size: 24px;

}

.material #image_slider.e-control.e-slider .e-handle {
    height: 20px;
    width: 20px;
    background-size: 20px;

}

.material #image_slider.e-control.e-slider .e-handle {
    background-image: url('./src/slider/images/thumb-mat.png');
    background-repeat: no-repeat;
    background-color: transparent;
    border: 0;
}

#image_slider.e-control.e-slider .e-handle {
    background-image: url('./src/slider/images/thumb.png');
    background-repeat: no-repeat;
    background-color: transparent;
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
`;
export class Thumb extends SampleBase {
    constructor() {
        super(...arguments);
        this.ticks = {
            placement: 'After'
        };
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <style>{slidercss}</style>
                    <div className="slider-content-wrapper">
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Square</div>
                            
                            <SliderComponent id="square_slider" value={30} min={0} max={100}/>
                        </div>
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Circle</div>
                            
                            <SliderComponent id="circle_slider" value={30} min={0} max={100}/>
                        </div>
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Oval</div>
                            
                            <SliderComponent id="oval_slider" value={30} min={0} max={100}/>
                        </div>
                        <div className="slider_container">
                            <div className="labelText slider-userselect">Custom image</div>
                            
                            <SliderComponent id="image_slider" value={30} min={0} max={100} ticks={this.ticks}/>
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
            </div>);
    }
}
