/**
 * Default map sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, MarkersDirective, MarkerDirective, Marker, Legend, Zoom, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as data from './map-data/default-datasource.json';
import * as worldMap from './map-data/world-map.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
let markers: object[] = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -25.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -55.54687499999999 }
];
const DefaultMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let data: object[] = [
        { latitude: 37.6276571, longitude: -122.4276688, name: 'San Bruno' },
        { latitude: 33.5302186, longitude: -117.7418381, name: 'Laguna Niguel' },
        { latitude: 40.7424509, longitude: -74.0081468, name: 'New York' },
        { latitude: -23.5268201, longitude: -46.6489927, name: 'Bom Retiro' },
        { latitude: 43.6533855, longitude: -79.3729994, name: 'Toronto' },
        { latitude: 48.8773406, longitude: 2.3299627, name: 'Paris' },
        { latitude: 52.4643089, longitude: 13.4107368, name: 'Berlin' },
        { latitude: 19.1555762, longitude: 72.8849595, name: 'Mumbai' },
        { latitude: 35.6628744, longitude: 139.7345469, name: 'Minato' },
        { latitude: 51.5326602, longitude: -0.1262422, name: 'London' },
    ];
    const onMapsLoad = (args: ILoadedEventArgs): void => {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as MapsTheme;
        // custom code end
    };
    return (
        <main><div className='control-panel'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <MapsComponent id="maps" loaded={onMapsLoad.bind(this)} load={load} zoomSettings={{ enable: false }} legendSettings={{ visible: true }} titleSettings={{ text: 'YouTube office locations', textStyle: { size: '16px' } }}>
                    <Inject services={[Marker, Legend, MapsTooltip]} />
                    <LayersDirective>
                        <LayerDirective shapeData={worldMap} shapePropertyPath='continent' shapeDataPath='continent' dataSource={datasource.default} shapeSettings={{ colorValuePath: 'color' }}>
                            <MarkersDirective>
                                <MarkerDirective visible={true} template='<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>' animationDuration={0} dataSource={markers} />
                                <MarkerDirective visible={true} shape='Image' imageUrl='src/maps/images/ballon.png' height={20} width={20} animationDuration={0} tooltipSettings={{ visible: true, valuePath: 'name' }} dataSource={data} />
                            </MarkersDirective>
                        </LayerDirective>
                    </LayersDirective>
                </MapsComponent>
            </div>
            {/* Source Link */}
            <div style={{ float: 'right', marginRight: '10px' }}>
                Source:<a href="https://craft.co/youtube/locations" target="_blank">craft.co/youtube/locations</a>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample visualizes the continents in the world by rendering these in a map layer. Also marks the office locations of YouTube in the world using markers. </p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>In this example, you can see how to render a map with the provided GeoJSON data. Group of shapes can be combined to form a layer of the map. You can bind the desired colors from the data source to the map shapes. The marker template is used to display the names for shapes. Legend is enabled in this example to represent each continent.</p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use a legend, inject the <code>Legend</code> module using the <code>Maps.Inject(Legend)</code> method.
                </p>
            </section>
        </main>
    )
}
export default DefaultMaps;