/**
 * Zooming sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Zoom } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { SliderComponent, Slider, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import * as data from './map-data/zooming-datasource.json';
import * as worldMap from './map-data/world-map.json';
let datasource: any = data as any;
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
const ZoomingMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [range1, setRange1] = useState<string>('500ms');
    const [isDisableSingleTab, setIsDisableSingleTab] = useState<boolean>(false);
    const [isDisableDoubleTab, setIsDisableDoubleTab] = useState<boolean>(false);
    let mapInstance = useRef<MapsComponent>(null);
    let animationElement = useRef<SliderComponent>(null);
    const onMapsLoad = (args: ILoadedEventArgs): void => {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as MapsTheme;
        // custom code end
    };
    const mousewheel = (args: any): void => {
        mapInstance.current.zoomSettings.mouseWheelZoom = args.currentTarget.checked;
        mapInstance.current.refresh();
    };
    const pinching = (args: any): void => {
        mapInstance.current.zoomSettings.pinchZooming = args.currentTarget.checked;
        mapInstance.current.refresh();
    };
    const zooming = (args: any): void => {
        mapInstance.current.zoomSettings.enable = args.currentTarget.checked;
        mapInstance.current.refresh();
    };
    const panning = (args: any): void => {
        mapInstance.current.zoomSettings.enablePanning = args.currentTarget.checked;
        mapInstance.current.refresh();
    };
    const doubletab = (args: any): void => {
        mapInstance.current.zoomSettings.doubleClickZoom = args.currentTarget.checked;
        setIsDisableSingleTab(args.currentTarget.checked);
        mapInstance.current.refresh();
    };
    const singletap = (args: any): void => {
        mapInstance.current.zoomSettings.zoomOnClick = args.currentTarget.checked;
        setIsDisableDoubleTab(args.currentTarget.checked);
        mapInstance.current.refresh();
    };
    const animationChange = () => {
        mapInstance.current.layers[0].animationDuration = parseInt(animationElement.current.value.toString(), 10);
        mapInstance.current.refresh();
        setRange1(parseInt(animationElement.current.value.toString(), 10) + 'ms');
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <MapsComponent id="maps" loaded={onMapsLoad} load={load} ref={mapInstance} zoomSettings={{ enable: true, pinchZooming: true, toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'] }}>
                        <Inject services={[Zoom]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap} shapePropertyPath='continent' shapeDataPath='continent' dataSource={datasource} animationDuration={500} shapeSettings={{ autofill: true, colorValuePath: 'color' }} />
                        </LayersDirective>
                    </MapsComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: '-10px' }}>
                           <tbody>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Zooming</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={zooming.bind(this)} defaultChecked={true} id="zoom" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Panning</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={panning.bind(this)} defaultChecked={true} id="panning" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Mouse wheel zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={mousewheel.bind(this)} defaultChecked={true} id="mousewheel" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Pinch zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={pinching.bind(this)} defaultChecked={true} id="pinch" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Single click zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={singletap.bind(this)} id="singletap" style={{ marginLeft: '0px' }} disabled={isDisableSingleTab}  />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Double click zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={doubletab.bind(this)} id="doubletap" style={{ marginLeft: '0px' }} disabled={isDisableDoubleTab} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ marginTop: '-15px' }}>Animation Duration </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div className="content-wrapper" style={{ paddingLeft: '0px', marginTop: '-20px' }}>
                                        <SliderComponent id="range" change={animationChange} ref={animationElement} name="animationRange" step={250} value={500} min={0} max={1000} width={'70%'} />
                                    </div>
                                </td>
                                <td style={{ width: '10%' }}>
                                    <div style={{ textAlign: 'center', paddingLeft: '0px', marginTop: '-20px', marginLeft: '-20px' }}>
                                        <span id='range1'>{range1}</span>
                                    </div>
                                </td>
                            </tr>
                           </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample depicts the zooming and panning options in the maps. You can customize these options by changing the Zooming, Panning, Mouse wheel zoom, Pinch zoom, Single-click zoom, and Double-click zoom in the Properties panel.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to zoom and pan the map. The support has been provided for zooming with the toolbar, rectangle zoom, pinch zoom, mouse wheel zoom, single-click, and double-click zoom.Panning can be enabled or disabled using the Panning option. When it is disabled, the map will switch to zooming mode.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use the zooming feature, inject the <code>zoom</code> module using the Maps.Inject(zoom) method.
                </p>
            </div>
        </div>
    )
}
export default ZoomingMaps;