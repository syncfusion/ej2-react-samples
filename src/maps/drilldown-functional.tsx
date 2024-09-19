/**
 * Drilldown sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, ILoadEventArgs, MapsTheme, LayersDirective, LayerDirective, Selection, Highlight, IShapeSelectedEventArgs, MarkersDirective, MarkerDirective, Marker, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as data from './map-data/default-datasource.json';
import * as worldMap from './map-data/world-map.json';
import * as africa from './map-data/africa.json';
import * as europe from './map-data/europe.json';
import * as asia from './map-data/asia.json';
import * as northAmerica from './map-data/north-america.json';
import * as southAmerica from './map-data/south-america.json';
import * as oceania from './map-data/oceania.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .backLabel:hover {
        cursor: pointer;
    }`;
let markers: object[] = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -23.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -54.54687499999999 }
];
interface ShapeData {
    continent?: string;
}
type Visibility = "hidden" | "visible";
let touchmove: boolean;
const DrilldownMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [button, setButton] = useState<string>('');
    const [content, setContent] = useState<string>('Click on a shape to drill');
    const [category, setCategory] = useState<Visibility>('hidden');
    const [text, setText] = useState<string>('');
    const [symbol, setSymbol] = useState<Visibility>('hidden');
    let mapInstance = useRef<MapsComponent>(null);
    const change = (): void => {
        mapInstance.current.baseLayerIndex = 0;
        mapInstance.current.refresh();
        setButton('none');
        setContent('Click on a shape to drill');
        setCategory('hidden');
        setText('');
        setSymbol('hidden');
    };
    const shapeSelected = (args: IShapeSelectedEventArgs) => {
        let shape: Object = (args.shapeData as ShapeData).continent;
        if (mapInstance.current.baseLayerIndex === 0 && !touchmove) {
            if (shape === 'Africa') {
                mapInstance.current.baseLayerIndex = 1;
                mapInstance.current.refresh();
            } else if (shape === 'Europe') {
                mapInstance.current.baseLayerIndex = 2;
                mapInstance.current.refresh();
            } else if (shape === 'Asia') {
                mapInstance.current.baseLayerIndex = 3;
                mapInstance.current.refresh();
            } else if (shape === 'North America') {
                mapInstance.current.baseLayerIndex = 4;
                mapInstance.current.refresh();
            } else if (shape === 'South America') {
                mapInstance.current.baseLayerIndex = 5;
                mapInstance.current.refresh();
            } else if (shape === 'Australia') {
                mapInstance.current.baseLayerIndex = 6;
                mapInstance.current.refresh();
            }
            setButton('block');
            setContent('');
            setCategory('visible');
            setText(shape as string);
            setSymbol('visible');
        }
        touchmove = false;
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as MapsTheme;
        // custom code end
    };
    const loaded = (): void => {
        // custom code start
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
        let mapsSVG: HTMLElement = document.getElementById('mapdrilldown_svg');
        if (mapsSVG) {
            mapsSVG.addEventListener(
                'touchmove',
                (e: MouseEvent) => {
                    touchmove = true;
                },
                false
            );
        }
        // custom code end
    };
    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div id="button" className="backLabel" style={{ display: button }}>
                    <a id="category" onClick={change} style={{ visibility: category, display: 'inline-block', fontSize: 16 }}>
                        <h5>WorldMap</h5>
                    </a>
                    <p style={{ visibility: symbol, display: 'inline-block' }} id="symbol">&nbsp;&gt;&gt;&nbsp;</p>
                    <p id="text" style={{ display: 'inline-block', fontSize: 16 }}>{text}</p>
                </div>
                <div className='col-md-12'>
                    <MapsComponent id="maps" ref={mapInstance} loaded={loaded} load={load} shapeSelected={shapeSelected.bind(this)} zoomSettings={{ enable: false }}>
                        <Inject services={[Selection, Highlight, Marker, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap} shapePropertyPath='continent' shapeDataPath='continent' dataSource={datasource.default} shapeSettings={{ colorValuePath: 'drillColor' }} selectionSettings={{ enable: false }} tooltipSettings={{ visible: true, valuePath: 'continent' }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} template='<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>' animationDuration={0} dataSource={markers} />
                                </MarkersDirective>
                            </LayerDirective>
                            <LayerDirective shapeData={africa} shapeSettings={{ fill: '#80306A' }} highlightSettings={{ enable: true, fill: '#80306A' }} tooltipSettings={{ visible: true, valuePath: 'name' }} />
                            <LayerDirective shapeData={europe} shapeSettings={{ fill: '#622D6C' }} highlightSettings={{ enable: true, fill: '#622D6C' }} tooltipSettings={{ visible: true, valuePath: 'name' }} />
                            <LayerDirective shapeData={asia} shapeSettings={{ fill: '#462A6D' }} highlightSettings={{ enable: true, fill: '#462A6D' }} tooltipSettings={{ visible: true, valuePath: 'name' }} />
                            <LayerDirective shapeData={northAmerica} shapeSettings={{ fill: '#C13664' }} highlightSettings={{ enable: true, fill: '#C13664' }} tooltipSettings={{ visible: true, valuePath: 'name' }} />
                            <LayerDirective shapeData={southAmerica} shapeSettings={{ fill: '#9C3367' }} highlightSettings={{ enable: true, fill: '#9C3367' }} tooltipSettings={{ visible: true, valuePath: 'name' }} />
                            <LayerDirective shapeData={oceania} shapeSettings={{ fill: '#2A2870' }} highlightSettings={{ enable: true, fill: '#2A2870' }} tooltipSettings={{ visible: true, valuePath: 'name' }} />
                        </LayersDirective>
                    </MapsComponent>
                </div>
            </div>
            <div>
                <i>
                    <p id="content" style={{ fontSize: '16px', color: 'grey', textAlign: 'center' }}>{content}</p>
                </i>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample demonstrates drill down with all the continents in the initial view. By clicking a continent, you can view all the countries available in that continent.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>In this example, you can see how to display an another layer by clicking a shape in previous layer. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices</p>
            </section>
        </main>
    )
}
export default DrilldownMaps;