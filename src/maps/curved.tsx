/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    Marker, MapsTooltip, MarkersDirective, MarkerDirective, NavigationLine, Zoom
} from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import { markerLocation } from './map-data/map-location';
import { data } from './map-data/navigation-data';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
let markerTemplate = '<div id="marker1" style="font-size:12px;color:black;font-weight:500">{{:name}}'+'</div>'
export class CurvedMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            centerPosition={{
                                latitude: 30.41078179084589,
                                longitude: 90.52734374999999
                            }}
                            zoomSettings={{
                                enable: false,
                                zoomFactor: 3.5
                            }}
                            mapsArea={{
                                background: '#AEE2FA'
                            }}
                            titleSettings={{
                                text: 'Flights from India to China',
                                textStyle: {
                                    size: '16px'
                                }
                              }}
                        >
                            <Inject services={[Marker, MapsTooltip, NavigationLine, Zoom]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax(location.origin + location.pathname + 'src/maps/map-data/world-map.json')}
                                    shapeDataPath = {'name'}
                                    shapePropertyPath = {'name'}
                                    dataSource = {[
                                        {
                                            name: 'India'
                                        },
                                        {
                                            name: 'China'
                                        }
                                    ]}
                                    shapeSettings={{
                                        colorValuePath: 'name',
                                        fill: '#fcfbf9',
                                        border: {
                                            width: 0.1,
                                            color: 'black'
                                        },
                                        colorMapping: [
                                            {
                                                value: 'China',
                                                color: '#f7d083'
                                            },
                                            {
                                                value: 'India',
                                                color: '#FFFE99'
                                            }
                                        ]
                                    }}
                                    navigationLineSettings={data}
                                >
                                <MarkersDirective>
                                    <MarkerDirective visible={true} shape='Circle' fill='white' width={4}  animationDuration={0} border={{color:'black', width:1}}
                                    dataSource={markerLocation}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            { 'name' : 'New Delhi',
                                            'latitude': 28.6139391,
                                            'longitude': 77.2090212
                                            }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: -50,
                                            y: 10
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Mumbai',
                                                'latitude':  19.0759837,
                                                'longitude':  72.8776559
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 0,
                                            y: 12
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Chennai',
                                                'latitude':  13.0826802,
                                                'longitude': 80.2707184
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 0,
                                            y: 12
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Kolkata',
                                                'latitude':  22.572646,
                                                'longitude':  88.363895
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 0,
                                            y: 12
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Kunming',
                                                'latitude': 24.880095,
                                                'longitude':  102.832891
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 0,
                                            y: 12
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Beijing',
                                                'latitude':  39.9041999,
                                                'longitude':  116.4073963
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 0,
                                            y: 12
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Shanghai',
                                                'latitude': 31.2303904,
                                                'longitude': 121.4737021
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 0,
                                            y: 12
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Hong Kong',
                                                'latitude': 22.396428,
                                                'longitude': 114.109497
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 20,
                                            y: 20
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                    <MarkerDirective visible={true}
                                    dataSource={
                                        [
                                            {
                                                'name' : 'Guangzhou',
                                                'latitude': 23.12911,
                                                'longitude': 113.264385
                                              }
                                        ]
                                    }
                                    offset={
                                        {
                                            x: 35,
                                            y: -10
                                        }
                                    }
                                    template = {markerTemplate}
                                    animationDuration = {0}
                                    >
                                    </MarkerDirective>
                                </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    <div style={{float: 'right' ,marginright: '10px'}}>Source: 
                        <a href="https://www.tibettravel.org/nepal-map/nepal-india-map.html" target="_blank">www.tibettravel.org</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    This sample demonstrates the flight routes from India to China.
                    </p>
                </div>
                <div id="description">
                <p>
                     In this example, you can see how to render the curved lines between two points in a map. You can use the dashArray, width, and color properties to customize the appearance of the navigation lines..
                </p>
	                <p>
                    	Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a maker in touch enabled devices.	
	                </p>
                    <br/>
                         <p style={{fontweight: 500}}>Injecting Module</p>
                            <p>
                               Maps component features are segregated into individual feature-wise modules. To use the navigation lines, inject the NavigationLines module using the Maps.Inject(NavigationLines)method.
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