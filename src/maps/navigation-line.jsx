/**
 * Projection sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Marker, MapsTooltip, MarkersDirective, MarkerDirective, NavigationLine, Zoom } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import * as data1 from './map-data/penisular-marker.json';
import * as data2 from './map-data/penisular-location.json';
let datasource1 = data1;
let datasource2 = data2;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #maps_layerIndex_0_line_Group{
        stroke-dasharray: 10px 10px;
        stroke-linejoin: round; stroke-linecap: round;
        -webkit-animation: dash 15s linear infinite;
        animation: dash 15s linear infinite;
    }
    @-webkit-keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }

    @keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }`;
export class NavigationLineMaps extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} zoomSettings={{
            enable: false,
            zoomFactor: 10
        }} projectionType='Equirectangular' titleSettings={{
            text: 'Shipping sea route between various cities',
            textStyle: {
                size: '18px'
            }
        }} mapsArea={{
            background: '#4863A0'
        }} centerPosition={{
            latitude: 25.54244147012483,
            longitude: -89.62646484375
        }}>
                            <Inject services={[Zoom, Marker, MapsTooltip, NavigationLine]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')} shapeSettings={{
            fill: '#789071'
        }} navigationLineSettings={datasource2.location}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} shape='Circle' fill='white' width={10} height={10} animationDuration={0} tooltipSettings={{
            visible: true,
            valuePath: 'title'
        }} dataSource={datasource1.marker}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true} template='<div id="marker1" style="font-size: 12px;color:white">ALTAMIRA</div>' dataSource={[{ latitude: 22.403410892712124, longitude: -100.0 }]} animationDuration={0}>
                                        </MarkerDirective>
                                        <MarkerDirective visible={true} template='<div id="marker2" style="font-size: 12px;color:white">HOUSTON</div>' dataSource={[{ latitude: 30.332197482973, longitude: -95.36270141601562 }]} animationDuration={0}>
                                              </MarkerDirective>
                                              <MarkerDirective visible={true} template='<div id="marker3" style="font-size: 12px;color:white">PANAMA CITY</div>' dataSource={[{ latitude: 30.380747605060766, longitude: -85.81283569335938 }]} animationDuration={0}>
                                                  </MarkerDirective>
                                                  <MarkerDirective visible={true} template='<div id="marker4" style="font-size: 12px;color:white">TAMPA</div>' dataSource={[{ latitude: 27.9337540167772, longitude: -81.15908447265625 }]} animationDuration={0}>
                                                       </MarkerDirective>
                                                       <MarkerDirective visible={true} template='<div id="marker5" style="font-size: 12px;color:white">PROGRESO</div>' dataSource={[{ latitude: 20.62336521195344, longitude: -89.6649169921875 }]} animationDuration={0}>
                                                       </MarkerDirective>
                                </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    
                    <div style={{ float: 'right', marginright: '10px' }}>Source: 
       <a href="http://www.lineaships.com/en/linea-peninsular/" target="_blank">www.lineaships.com</a>
    </div>
                      </div>
                <div id="action-description">
                    <p>
                    This sample illustrates the sea routes between various cities for shipping.
                    </p>
                </div>
                <div id="description">
                <p>
                     In this example, you can see how to render lines between two points in map. You can use <code>dashArray</code>, <code>width</code> and <code>color</code> properties to customize the appearance of the navigation lines. 
                </p>
                 <br />
                      <p style={{ fontweight: 500 }}>Injecting Module</p>
                          <p>
                                Maps component features are segregated into individual feature-wise modules. To use navigation lines, you need to inject <code>NavigationLine</code> module using <code>Maps.Inject(NavigationLine)</code> method
                         </p>
                </div>
            </div>);
    }
    onMapsLoad(args) {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    }
    ;
}
