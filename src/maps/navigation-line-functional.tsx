/**
 * Navigation Line sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Marker, MapsTooltip, MarkersDirective, MarkerDirective, NavigationLine, Zoom } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as data1 from './map-data/penisular-marker.json';
import * as data2 from './map-data/penisular-location.json';
import * as worldMap from './map-data/world-map.json';
let datasource1: any = data1 as any;
let datasource2: any = data2 as any;
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
const NavigationLineMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const onMapsLoad = (): void => {
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
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="maps" loaded={onMapsLoad} load={load} zoomSettings={{ enable: false, zoomFactor: 10 }} projectionType='Equirectangular' titleSettings={{ text: 'Shipping sea route between various cities', textStyle: { size: '18px' } }} mapsArea={{ background: '#4863A0' }} centerPosition={{ latitude: 25.54244147012483, longitude: -89.62646484375 }}>
                        <Inject services={[Zoom, Marker, MapsTooltip, NavigationLine]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap} shapeSettings={{ fill: '#789071' }} navigationLineSettings={datasource2.location}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} shape='Circle' fill='white' width={10} height={10} animationDuration={0} tooltipSettings={{ visible: true, valuePath: 'title' }} dataSource={datasource1.marker} />
                                    <MarkerDirective visible={true} template='<div id="marker1" style="font-size: 12px;color:white">ALTAMIRA</div>' dataSource={[{ latitude: 22.403410892712124, longitude: -100.0 }]} animationDuration={0} />
                                    <MarkerDirective visible={true} template='<div id="marker2" style="font-size: 12px;color:white">HOUSTON</div>' dataSource={[{ latitude: 30.332197482973, longitude: -95.36270141601562 }]} animationDuration={0} />
                                    <MarkerDirective visible={true} template='<div id="marker3" style="font-size: 12px;color:white">PANAMA CITY</div>' dataSource={[{ latitude: 30.380747605060766, longitude: -85.81283569335938 }]} animationDuration={0} offset={{ x: 0, y: -15 }} />
                                    <MarkerDirective visible={true} template='<div id="marker4" style="font-size: 12px;color:white">TAMPA</div>' dataSource={[{ latitude: 27.9337540167772, longitude: -81.15908447265625 }]} animationDuration={0} />
                                    <MarkerDirective visible={true} template='<div id="marker5" style="font-size: 12px;color:white">PROGRESO</div>' dataSource={[{ latitude: 20.62336521195344, longitude: -89.6649169921875 }]} animationDuration={0} />
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>
                    Source:<a href="http://www.lineaships.com/en/linea-peninsular/" target="_blank">www.lineaships.com</a>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample illustrates the sea routes between various cities for shipping.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>
                    In this example, you can see how to render lines between two points in map. You can use <code>dashArray</code>, <code>width</code> and <code>color</code> properties to customize the appearance of the navigation lines.
                </p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use navigation lines, you need to inject <code>NavigationLine</code> module using <code>Maps.Inject(NavigationLine)</code> method
                </p>
            </section>
        </main>
    )
}
export default NavigationLineMaps;