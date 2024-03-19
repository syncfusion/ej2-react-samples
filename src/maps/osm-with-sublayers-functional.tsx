/**
 * OSM With SubLayer sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, MapsTooltip, Bubble, Zoom, AnnotationDirective, AnnotationsDirective } from '@syncfusion/ej2-react-maps';
import { updateSampleSection } from '../common/sample-base';
import * as africaMap from './map-data/africa.json';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const OSMSubLayer = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as MapsTheme;
        // custom code end
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="maps" load={load} titleSettings={{ text: 'Location of Africa continent in the World map', textStyle: { size: '16px' } }} zoomSettings={{ enable: true }}>
                        <Inject services={[Bubble, MapsTooltip, Zoom]} />
                        <LayersDirective>
                            <LayerDirective layerType='OSM' />
                            <LayerDirective type='SubLayer' animationDuration={0} shapeData={africaMap} shapeSettings={{ fill: '#5100a3', opacity: 0.4 }} />
                        </LayersDirective>
                    </MapsComponent>
                </div>
            </div>
            <div style={{ float: 'right' }}>
                <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
            </div>
            <br />
            {/* Source Link */}
            <div style={{ float: 'right', marginRight: '10px' }}>
                Source:<a href="https://www.whatarethe7continents.com/biggest-largest-smallest-continents/" target="_blank">Seven Continents</a>
            </div>
            <div id="action-description">
                <p>This sample visualizes the Africa continent location in the World map. Africa continent is rendered in sublayer, on the OpenStreetMap.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render geometric layers as sublayer on the OpenStreetMap. Rendered the outline of Africa continent using GeoJSON data on the top of the OSM map.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use zooming feature, inject the Zoom module using the <code>Maps.Inject(Zoom)</code> method.
                </p>
            </div>
        </div>
    )
}
export default OSMSubLayer;