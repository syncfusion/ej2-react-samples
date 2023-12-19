/**
 * MultipleLayer sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, ProjectionType, Marker, MarkerDirective, Zoom, DataLabel, MarkersDirective, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as data from './map-data/california.json';
let datasource: any = data as any;
import * as data1 from './map-data/texas.json';
let datasource1: any = data1 as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    
    .svgcircle{
        -webkit-animation: opac 1.5s ease-out infinite;
        animation: opac 1.5s ease-out infinite;
    }
    @keyframes opac {
        0% {
            stroke-opacity: 0.8;
            strokeWidth: 0px;
        }
        100% {
            stroke-opacity: 0;
            strokeWidth: 8px;
        }
    }`;
const MultilayerMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onMapsLoad = (): void => {
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
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="maps" loaded={onMapsLoad} load={load} zoomSettings={{ enable: true, pinchZooming: true }} titleSettings={{ text: 'Samsung Semiconductor office locations in USA', textStyle: { size: '16px' } }}>
                        <Inject services={[Marker, Zoom, DataLabel, Marker, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/usa.json')} shapeSettings={{ fill: '#E5E5E5', border: { color: 'black', width: 0.1 } }} dataLabelSettings={{ visible: true, labelPath: 'iso_3166_2', smartLabelMode: 'Hide', textStyle: { color: 'black' } }} />
                            <LayerDirective shapeData={datasource} type='SubLayer' shapeSettings={{ fill: 'rgba(141, 206, 255, 0.6)', border: { color: '#1a9cff', width: 0.25 } }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} width={20} fill='white' height={20} template='<svg id="markertemplate" width="20" height="20" style={{display:none}}><circle class="svgcircle" cx=10 cy=10 r=6 stroke="rgba(77, 77, 77, 0.8)" fill="rgba(0, 77, 153, 0.8)"/></svg>' dataSource={[{ latitude: 37.3382082, longitude: -121.8863286, name: 'San Jose' }]} tooltipSettings={{ visible: true, valuePath: 'name', format: '<b>${name}</b><br>Regional Office,<br>Research and Development Center' }} />
                                    <MarkerDirective visible={true} dataSource={[{ latitude: 37.09023980307208, longitude: -119.35546875000001 }]} template='<div style="color:black;">CA</div>' />
                                </MarkersDirective>
                            </LayerDirective>
                            <LayerDirective shapeData={datasource1} type='SubLayer' shapeSettings={{ fill: 'rgba(141, 206, 255, 0.5)', border: { color: '#1a9cff', width: 0.25 } }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} animationDuration={0} fill='white' width={20} height={20} template='<svg id="markertemplate" width="20" height="20" style={{display:none}}><circle class="svgcircle" cx=10 cy=10 r=6 stroke="rgba(77, 77, 77, 0.8)" fill="rgba(0, 77, 153, 0.8)"/></svg>' dataSource={[{ latitude: 30.267153, longitude: -97.7430608, name: 'Austin' }]} tooltipSettings={{ visible: true, valuePath: 'name', format: '<b>${name}</b><br>Manufacturing Center,<br>Research and Development Center' }} />
                                    <MarkerDirective visible={true} dataSource={[{ latitude: 31.80289258670676, longitude: -98.96484375 }]} template='<div style="color:black;">TX</div>' />
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
            </div>
            {/* Source Link */}
            <div style={{ float: 'right', marginRight: '10px' }}>
                Source:<a href="http://www.samsung.com/semiconductor/about-us/location/" target="_blank">www.samsung.com</a>
            </div>
            <div id="action-description">
                <p>This sample depicts the layers along with sublayers. Countries in the African and Australian continents are rendered in the sublayers.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a sublayer in map. Sublayers are used to render the desired shapes over the existing layers. Any number of sublayers can be added to a map. You can use the <code>fill</code>, <code>width</code>, and <code>color</code> properties in the border to customize the appearance of the shapes.
                </p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.</p>
            </div>
        </div>
    )
}
export default MultilayerMaps;