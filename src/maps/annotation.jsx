/**
 * Projection sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Annotations, Marker, MarkersDirective, MarkerDirective } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
export class AnnotationMaps extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} zoomSettings={{
            enable: false
        }} annotations={[
            {
                content: '#maps-annotation',
                x: '0%', y: '70%'
            }, {
                content: '#compass-maps',
                x: '85%', y: '5%'
            }
        ]}>
                            <Inject services={[Annotations, Marker]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/africa-continent.json')} shapePropertyPath='name' shapeDataPath='name' shapeSettings={{
            fill: 'url(#grad1)'
        }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} animationDuration={1} template='<h3 style="color:white">{{:name}}</h3>' dataSource={[{
                name: 'Africa', latitude: 13.97274101999902, longitude: 20.390625
            }]}>

                                    </MarkerDirective>
                                    </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                </div>
<svg height="150" width="400">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#C5494B', stopOpacity: '1' }}/>
            <stop offset="100%" style={{ stopColor: '#4C134F', stopOpacity: '1' }}/>
        </linearGradient>
    </defs>
</svg>
<div id="maps-annotation" style={{ display: 'none' }}>
    <div id="annotation">
        <div style={{ marginLeft: '10px', fontsize: '13px', fontweight: 500 }}>
            <h5 style={{ marginLeft: '40px' }}>Facts about Africa</h5>
        </div>
        <hr />
        <div>
            <ul style={{ listStyleType: 'disc' }}>
                <li>Africa is the second largest and second most populated continent in the world.</li>
                <li style={{ paddingtop: '5px' }}>Africa has 54 sovereign states and 10 non-sovereign territories.</li>
                <li style={{ paddingtop: '5px' }}>Algeria is the largest country in Africa, where as Mayotte is the smallest.</li>
            </ul>
        </div>
    </div>
</div>
<div id="compass-maps" style={{ display: 'none' }}>
    <img src="src/maps/images/compass.svg" alt="Direction compass" height="75px" width="75px"/>
</div>

<div style={{ float: 'right', marginright: '10px' }}>Source: 
       <a href="https://en.wikipedia.org/wiki/Africa" target="_blank">en.wikipedia.org</a>
    </div>
                <div id="action-description">
                    <p>
                    This sample depicts the facts about Africa in an annotation. The shape of Africa is filled with gradient color.
                    </p>
                </div>
                <div id="description">
                <p>
                In this example, you can see how to render a map with the provided GeoJSON data. Group of shapes can be combined to form a layer of the map. You can bind the desired colors from the data source to the map shapes. The marker template is used to display the names for shapes. Legend is enabled in this example to represent each continent.
                </p>
                <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                         Maps component features are segregated into individual feature-wise modules. To use an annotation, inject the Annotations module using the Maps.Inject(Annotations) method.
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
