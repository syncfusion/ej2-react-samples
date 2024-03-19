/**
 * Flight routes sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Marker, MapsTooltip, MarkersDirective, MarkerDirective, NavigationLine, Zoom, ShapeSettingsModel } from '@syncfusion/ej2-react-maps';
import { updateSampleSection } from '../common/sample-base';
import * as data1 from './map-data/curved-datasource.json';
import * as data2 from './map-data/navigation-datasource.json';
import * as worldMap from './map-data/world-map.json';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const CurvedMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let markerTemplate = '<div id="marker1" style="font-size:12px;color:black;font-weight:500">{{:name}}' + "</div>";
    let datasource1: any = data1 as any;
    let datasource2: any = data2 as any;
    let shapeSettings: ShapeSettingsModel = {
        colorValuePath: 'name',
        fill: '#fcfbf9',
        border: { width: 0.1, color: 'black' },
        colorMapping: [
            { value: 'China', color: '#f7d083' },
            { value: 'India', color: '#FFFE99' },
        ],
    };
    const onMapsLoad = (): void => {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="maps" loaded={onMapsLoad} load={load} centerPosition={{ latitude: 30.41078179084589, longitude: 90.52734374999999 }} zoomSettings={{ enable: false, zoomFactor: 3.5 }} mapsArea={{ background: '#AEE2FA' }} titleSettings={{ text: 'Flights from India to China', textStyle: { size: '16px' } }}>
                        <Inject services={[Marker, MapsTooltip, NavigationLine, Zoom]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap} shapeDataPath={'name'} shapePropertyPath={'name'} dataSource={[{ name: 'India' }, { name: 'China' }]} shapeSettings={shapeSettings} navigationLineSettings={datasource2.navigation}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} shape='Circle' fill='white' width={4} animationDuration={0} border={{ color: 'black', width: 1 }} dataSource={datasource1.location} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'New Delhi', 'latitude': 28.6139391, 'longitude': 77.2090212 }]} offset={{ x: -50, y: 10 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Mumbai', 'latitude': 19.0759837, 'longitude': 72.8776559 }]} offset={{ x: 0, y: 12 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Chennai', 'latitude': 13.0826802, 'longitude': 80.2707184 }]} offset={{ x: 0, y: 12 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Kolkata', 'latitude': 22.572646, 'longitude': 88.363895 }]} offset={{ x: 0, y: 12 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Kunming', 'latitude': 24.880095, 'longitude': 102.832891 }]} offset={{ x: 0, y: 12 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Beijing', 'latitude': 39.9041999, 'longitude': 116.4073963 }]} offset={{ x: 0, y: 12 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Shanghai', 'latitude': 31.2303904, 'longitude': 121.4737021 }]} offset={{ x: 0, y: 12 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Hong Kong', 'latitude': 22.396428, 'longitude': 114.109497 }]} offset={{ x: 20, y: 20 }} template={markerTemplate} animationDuration={0} />
                                    <MarkerDirective visible={true} dataSource={[{ 'name': 'Guangzhou', 'latitude': 23.12911, 'longitude': 113.264385 }]} offset={{ x: 35, y: -10 }} template={markerTemplate} animationDuration={0} />
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>
                    Source:<a href="https://www.tibettravel.org/nepal-map/nepal-india-map.html" target="_blank">www.tibettravel.org</a>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the flight routes from India to China.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render the curved lines between two points in a map. You can use the dashArray, width, and color properties to customize the appearance of the navigation lines..</p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a maker in touch enabled devices.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p> Maps component features are segregated into individual feature-wise modules. To use the navigation lines, inject the NavigationLines module using the Maps.Inject(NavigationLines)method.</p>
            </div>
        </div>
    )
}
export default CurvedMaps;