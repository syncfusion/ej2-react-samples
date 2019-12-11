/**
 * Default map sample
 */
//tslint:disable
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, MarkersDirective, MarkerDirective, Marker, MapsTooltip, NavigationLine } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/default-datasource.json';
let datasource = data;
const SAMPLE_CSS = `
.name {
    margin-top: -6px;
    margin-left: -6px;
    font-size: 12px;
    color: black;
    text-shadow: 0px 1px 1px lightgray;
    font-weight: 500
}

@keyframes dash {
    from {
        stroke-dashoffset: 1000;
        stroke-width: 1px;
        stroke: #D2691E;
    }

    to {
        stroke-dashoffset: 0;
        stroke-width: 1px;
    }

    40% {
        opacity: 0.7;
    }

    50%,
    100% {
        opacity: 0;
    }
}

.pulse-css {
    width: 12px;
    height: 12px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background: #D2691E;
    position: relative;
    animation-delay: 5s;
}

.pulse-css:before,
.pulse-css:after {
    content: '';
    width: 9px;
    height: 9px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background-color: #D2691E;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    transform: scale(0.5);
    animation: pulse-css1 2s linear infinite;
}

.parent_css {
    width: 13px;
    height: 13px;
    background: #D2691E;
    position: relative;
    animation-delay: 5s;
}

.parent_css:before,
.parent_css:after {
    content: '';
    width: 9px;
    height: 9px;
    background-color: #D2691E;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    transform: scale(0.5);
    animation: pulse-css1 3s linear infinite;
}

@keyframes pulse-css1 {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }

    50% {
        opacity: 0.2;
    }

    90%,
    100% {
        transform: scale(5);
        opacity: 0;
    }
}`;
export class CyberAttackMaps extends SampleBase {
    render() {
        return (<div className='control-panel'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <MapsComponent id="container" loaded={this.loaded.bind(this)} load={this.load} zoomSettings={{
            enable: false
        }} titleSettings={{
            text: 'Cyber Attack Map of United States',
            textStyle: { size: '16px' }
        }}>
                        <Inject services={[Marker, MapsTooltip, NavigationLine]}/>
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')} shapeSettings={{
            border: { color: '#D2691E', width: 0.5 },
            fill: '#FFFFE0'
        }} navigationLineSettings={[
            {
                dashArray: '5,1', visible: true,
                angle: -0.3, color: '#ffffb3',
                latitude: [15.758401, 39.864171],
                longitude: [101.155642, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: 0.4, color: '#ffffb3',
                latitude: [57.725612, 39.864171],
                longitude: [-101.802160, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [29.930938, 39.864171],
                longitude: [69.358894, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.1, color: '#ffffb3',
                latitude: [22.860388, 39.864171],
                longitude: [79.739066, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.1, color: '#ffffb3',
                latitude: [-24.763753, 39.864171],
                longitude: [134.852191, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.4, color: '#ffffb3',
                latitude: [34.611098, 39.864171],
                longitude: [104.189872, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.8, color: '#ffffb3',
                latitude: [-12.354844, 39.864171],
                longitude: [-49.017709, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.4, color: '#ffffb3',
                latitude: [3.450682, 39.864171],
                longitude: [-72.943141, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.7, color: '#ffffb3',
                latitude: [62.448268, 39.864171],
                longitude: [97.251835, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.3, color: '#ffffb3',
                latitude: [65.931163, 39.864171],
                longitude: [-45.812820, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [-21.206222, 39.864171],
                longitude: [17.122018, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [35.839969, 39.864171],
                longitude: [137.904641, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [46.582184, 39.864171],
                longitude: [2.232903, -100.854833]
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [0.390617, 39.864171],
                longitude: [37.893734, -100.854833]
            }
        ]}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} template='<div id="marker_template"><div class="pulse-css"><br /><div class="name">{{:name}}</div></div></div>' animationDuration={0} height={15} width={15} dataSource={[
            { latitude: 15.758401, longitude: 101.155642, name: 'Thailand' },
            { latitude: 57.725612, longitude: -101.802160, name: 'Canada' },
            { latitude: 39.634177, longitude: 42.410740, name: 'Turkey' },
            { latitude: 22.860388, longitude: 79.739066, name: 'India' },
            { latitude: -24.763753, longitude: 134.852191, name: 'Australia' },
            { latitude: 34.611098, longitude: 104.189872, name: 'China' },
            { latitude: -12.354844, longitude: -49.017709, name: 'Brazil' },
            { latitude: 3.450682, longitude: -72.943141, name: 'Colombia' },
            { latitude: 62.448268, longitude: 97.251835, name: 'Russia' },
            { latitude: 65.931163, longitude: -45.812820, name: 'Greenland' },
            { latitude: -21.206222, longitude: 17.122018, name: 'Namibia' },
            { latitude: 35.839969, longitude: 137.904641, name: 'Japan' },
            { latitude: 46.582184, longitude: 2.232903, name: 'France' },
            { latitude: 0.390617, longitude: 37.893734, name: 'Kenya' }
        ]}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true} template='<div id="parent_template"><div class="parent_css"><br/><div class="name" style="margin-left: -10px;margin-top: -2px">United States</div></div></div>' height={20} width={20} animationDuration={0} dataSource={[
            {
                latitude: 39.864171,
                longitude: -100.854833
            }
        ]}>

                                        </MarkerDirective>
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                <div style={{ float: 'right', marginright: '10px' }}>Source: 
       <a href="https://craft.co/youtube/locations" target="_blank">craft.co/youtube/locations</a>
       </div>
                <div id="action-description">
    <p>
        This sample depicts a cyber attack map, which displays the cyber attacks and threats from various countries to USA, using navigation lines and marker.
    </p>
</div>
<div id="description">
    <p>
        In this example, you can see how to dynamically display a navigation line with linear animation. Marker
        templates are added to denote the source and destination locations. Any custom HTML element can be used as a
        marker.
    </p>
    <br />
    <p style={{ fontWeight: 500 }}>Injecting Module</p>
    <p>
        The maps component features are segregated into individual modules by feature. To use marker template, inject
        the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method, and use the navigation lines
        by injecting the <code>NavigationLine</code> module.
    </p>
</div>
        </div>);
    }
}
