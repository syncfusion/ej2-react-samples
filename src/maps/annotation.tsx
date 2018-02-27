/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, Annotations, Marker, MarkersDirective, MarkerDirective
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { africa_continent } from './MapData/africa_continent';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #annotation {
        color: #DDDDDD;
		font-size: 12px;
		font-family: Roboto;
        background: #3E464C;
        margin: 20px;
        padding: 10px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        width: 300px;
        -moz-box-shadow: 0px 2px 5px #666;
        -webkit-box-shadow: 0px 2px 5px #666;
        box-shadow: 0px 2px 5px #666;
    }
    .country-label {
        color: white;
        font-size: 25px;
    }`;
export class AnnotationMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            zoomSettings={{
                                enable: false
                            }}
                            annotations={[
                                {
                                    content: '#maps-annotation',
                                    x: '0%', y: '70%'
                                }, {
                                    content: '#compass-maps',
                                    x: '85%', y: '5%'
                                }
                            ]}
                        >
                            <Inject services={[Annotations, Marker]} />
                            <LayersDirective>
                                <LayerDirective shapeData={africa_continent}
                                    shapePropertyPath='name'
                                    shapeDataPath='name'
                                    shapeSettings={{
                                        fill: 'url(#grad1)'
                                    }}
                                >
                                <MarkersDirective>
                                    <MarkerDirective 
                                    visible={true} animationDuration={1}
                                    template='<h3 style="color:white">{{:name}}</h3>'
                                    dataSource={[{
                                        name: 'Africa', latitude: 13.97274101999902, longitude: 20.390625
                                    }]}
                                    >

                                    </MarkerDirective>
                                    </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                </div>
<svg height="150" width="400">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#C5494B', stopOpacity: '1' }} />
            <stop offset="100%" style={{ stopColor: '#4C134F', stopOpacity: '1' }} />
        </linearGradient>
    </defs>
</svg>
<div id="maps-annotation" style={{ display: 'none'}}>
    <div id="annotation">
        <div style={{marginLeft: '10px', fontsize:'13px' ,fontweight:500}}>
            <h5 style={{ marginLeft: '40px' }}>Facts about Africa</h5>
        </div>
        <hr />
        <div>
            <ul style={{ listStyleType: 'disc' }}>
                <li>Africa is the second largest and second most populated continent in the world.</li>
                <li style={{paddingtop:'5px'}}>Africa has 54 sovereign states and 10 non-sovereign territories.</li>
                <li style={{paddingtop:'5px'}}>Algeria is the largest country in Africa, where as Mayotte is the smallest.</li>
            </ul>
        </div>
    </div>
</div>
<div id="compass-maps" style={{ display: 'none' }}>
    <img src="src/maps/images/compass.svg" height="75px" width="75px"/>
</div>
<div style={{float: 'right', marginright: '10px'}}>Source: 
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
                <br/>
                    <p style={{fontWeight: 500}}>Injecting Module</p>
                    <p>
                         Maps component features are segregated into individual feature-wise modules. To use an annotation, inject the Annotations module using the Maps.Inject(Annotations) method.
                    </p>
                </div>
            </div>
        )
    }
    public onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as MapsTheme;
    };
}