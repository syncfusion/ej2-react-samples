/**
 * Projection sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Zoom } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import * as data from './map-data/zooming-datasource.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
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

    .slider-labeltext {
        text-align: -webkit-left;
        font-weight: 500;
        font-size: 13px;
        padding-bottom: 10px;
    }

    .slider_container {
        margin-top: 40px;
    }

    .e-bigger .slider-content-wrapper {
        width: 80%;
    }

    #height_slider .e-tab-handle::after {
        background-color: #f9920b;
    }

    #height_slider.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 0;
    }
    .highcontrast #height_slider.e-control.e-slider .e-slider-track {
        height: 10px;
        top: calc(50% - 5px);
        border-radius: 0;
    }
    .fabric .slider_container .e-slider-hover .e-slider-track, .fabric .slider_container .e-slider-container:active .e-slider-track,
    .fabric .slider_container .e-slider-container .e-slider .e-tab-track{
        background-color: #c8c8c8;
    }

    #gradient_slider.e-control.e-slider .e-range {
        height: 6px;
        top: calc(50% - 3px);
        border-radius: 5px;
        background: linear-gradient(to top left, #f9f9f9 25%, #f9920b 90%);
    }

    .fabric .slider_container .e-slider-hover .e-slider-track,
    .fabric .slider_container .e-slider-container:active .e-slider-track,
    .fabric .slider_container .e-slider-container .e-slider .e-tab-track {
        background-color: #c8c8c8;
    }

    #gradient_slider.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 5px;
    }

    #range > * {
        padding: 0px !important;
    }`;
const slidercss = `  
    .content-wrapper {
        width: 40%;
        margin: 0 auto;
        min-width: 100px;
    }`;
export class ZoomingMaps extends SampleBase {
    sliderchange(args) {
        this.mapInstance.zoomModule.toolBarZooming(args.value, 'ZoomIn');
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} zoomSettings={{
            enable: true,
            pinchZooming: true,
            toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
        }}>
                            <Inject services={[Zoom]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')} shapePropertyPath='continent' shapeDataPath='continent' dataSource={datasource} animationDuration={500} shapeSettings={{
            autofill: true,
            colorValuePath: 'color'
        }}>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Zooming</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.zooming.bind(this)} defaultChecked={true} id="zoom" style={{ marginTop: '15px' }}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Mouse wheel zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.mousewheel.bind(this)} defaultChecked={true} id="mousewheel" style={{ marginTop: '15px' }}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Pinch zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.pinching.bind(this)} defaultChecked={true} id="pinch" style={{ marginTop: '15px' }}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Single click zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.singletap.bind(this)} id="singletap" style={{ marginTop: '15px' }}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Double click zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.doubletab.bind(this)} id="doubletap" style={{ marginTop: '15px' }}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div id="range1">Animation Duration <span>&nbsp;&nbsp;&nbsp;500ms</span> </div>
                                    </td>
                                    <td>
                                        <div className="content-wrapper">
                                            <style> {slidercss} </style>
                                            <SliderComponent id="range" change={this.animationChange.bind(this)} ref={(slider) => this.animationElement = slider} name="animationRange" step={250} value={500} min={0} max={1000}/>
                                        </div>
                                    </td>
                                </tr>

                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample depicts the zooming and panning options in the maps. You can customize these options by changing the zooming option to Zooming, Mouse wheel zoom, Pinch zoom, Single-click zoom, and Double-click zoom in the Properties panel. Slider control has been placed to zoom the map at the bottom.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to zoom and pan the map. The support has been provided for zooming with toolbar, rectangle zoom, pinch zoom, mouse wheel zoom, single-click and double-click zoom
                </p>
                    <br />
                    <p style={{ fontweight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use the zooming feature, inject the <code>zoom</code> module using the Maps.Inject(zoom) method.
                     </p>
                </div>
            </div>);
    }
    onMapsLoad(args) {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    }
    ;
    mousewheel() {
        let element = (document.getElementById('mousewheel'));
        this.mapInstance.zoomSettings.mouseWheelZoom = element.checked;
        this.mapInstance.refresh();
    }
    pinching() {
        let element = (document.getElementById('pinch'));
        this.mapInstance.zoomSettings.pinchZooming = element.checked;
        this.mapInstance.refresh();
    }
    zooming() {
        let element = (document.getElementById('zoom'));
        this.mapInstance.zoomSettings.enable = element.checked;
        this.mapInstance.refresh();
    }
    doubletab() {
        let element = (document.getElementById('doubletap'));
        this.mapInstance.zoomSettings.doubleClickZoom = element.checked;
        let ele1 = document.getElementById('singletap');
        if (element.checked) {
            ele1.disabled = true;
        }
        else {
            ele1.disabled = false;
        }
        this.mapInstance.refresh();
    }
    singletap() {
        let element = (document.getElementById('singletap'));
        let ele1 = document.getElementById('doubletap');
        this.mapInstance.zoomSettings.zoomOnClick = element.checked;
        if (element.checked) {
            ele1.disabled = true;
        }
        else {
            ele1.disabled = false;
        }
        this.mapInstance.refresh();
    }
    animationChange() {
        this.mapInstance.layers[0].animationDuration = parseInt(this.animationElement.value.toString(), 10);
        this.mapInstance.refresh();
        document.getElementById('range1').innerHTML = 'Animation Duration <span>&nbsp;&nbsp;&nbsp;' + (parseInt(this.animationElement.value.toString(), 10)) + 'ms';
    }
}
