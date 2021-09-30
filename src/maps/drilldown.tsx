/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, ILoadEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, Selection, Highlight, IShapeSelectedEventArgs, MarkersDirective, MarkerDirective, Marker, MapsTooltip
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as data from './map-data/default-datasource.json';
let datasource: any = data as any;
// Data ref
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
let touchmove: boolean;
export class DrilldownMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private change(): void {
        this.mapInstance.baseLayerIndex = 0;
        this.mapInstance.refresh();
        let button: HTMLElement = document.getElementById('button');
        button.style.display = 'none';
        document.getElementById('content').innerHTML = 'Click on a shape to drill';
        document.getElementById('category').style.visibility = 'hidden';
        document.getElementById('text').innerHTML = '';
        document.getElementById('symbol').style.visibility = 'hidden';
    }
    private shapeSelected(args: IShapeSelectedEventArgs) {
        let shape: Object = (args.shapeData as ShapeData).continent;
        if(this.mapInstance.baseLayerIndex === 0 && !touchmove) {
            if (shape === 'Africa') {
                this.mapInstance.baseLayerIndex = 1;
                this.mapInstance.refresh();
            } else if (shape === 'Europe') {
                this.mapInstance.baseLayerIndex = 2;
                this.mapInstance.refresh();
            } else if (shape === 'Asia') {
                this.mapInstance.baseLayerIndex = 3;
                this.mapInstance.refresh();
            } else if (shape === 'North America') {
                this.mapInstance.baseLayerIndex = 4;
                this.mapInstance.refresh();
            } else if (shape === 'South America') {
                this.mapInstance.baseLayerIndex = 5;
                this.mapInstance.refresh();
            } else if (shape === 'Australia') {
                this.mapInstance.baseLayerIndex = 6;
                this.mapInstance.refresh();
            }
            
            let button: HTMLElement = document.getElementById('button');
            button.style.display = 'block';
            document.getElementById('content').innerHTML = '';
            document.getElementById('category').style.visibility = 'visible';
            document.getElementById('text').innerHTML = shape as string;
            document.getElementById('symbol').style.visibility = 'visible';
            
        }
        touchmove = false;
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                <div id="button" className="backLabel">
                <a id="category" onClick={this.change.bind(this)} style={{visibility:'hidden', display:'inline-block', fontsize:16}}>  
                    <h5>WorldMap</h5>
                    </a>
                    <p style={{visibility:'hidden', display:'inline-block'}} id="symbol">&nbsp;&gt;&gt;&nbsp;</p>
                    <p id="text" style={{display:'inline-block', fontSize:16}}></p>
                </div>

               
                <div className='col-md-12'>
                    <MapsComponent id="maps" ref={m => this.mapInstance = m}  loaded={this.loaded} load={this.load} shapeSelected={this.shapeSelected.bind(this)}
                        zoomSettings={{
                            enable: false
                        }}
                        
                    >
                        <Inject services={[Selection, Highlight, Marker, MapsTooltip]} />
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')} layerType='Geometry'
                                shapePropertyPath='continent'
                                shapeDataPath='continent'
                                dataSource={datasource.default}
                                shapeSettings={{
                                    colorValuePath: 'drillColor'
                                }}
                                selectionSettings={{
                                    enable: false
                                }}
                                tooltipSettings= {{
                                    visible: true,
                                    valuePath:'continent'
                                }}
                                
                            >
                            <MarkersDirective>
                                    <MarkerDirective visible={true}
                                        template='<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>'
                                        animationDuration={0}
                                        dataSource={markers}
                                    >
                                    </MarkerDirective>
                                </MarkersDirective>
                            </LayerDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/africa.json')} layerType='Geometry'
                                shapeSettings={{
                                    fill: '#80306A'
                                }}
                                highlightSettings={{

                                    enable: true,
                                    fill: '#80306A'
                                }}
                                tooltipSettings= {{
                                    visible: true,
                                    valuePath:'name'
                                }}
                            >
                            </LayerDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/europe.json')} layerType='Geometry'
                                shapeSettings={{
                                    fill: '#622D6C'
                                }}
                                highlightSettings={{
                                    enable: true,
                                    fill: '#622D6C'
                                }}
                                tooltipSettings= {{
                                    visible: true,
                                    valuePath:'name'
                                }}
                            >
                            </LayerDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/asia.json')} layerType='Geometry'
                                shapeSettings={{
                                    fill: '#462A6D'
                                }}
                                highlightSettings={{
                                    enable: true,
                                    fill: '#462A6D'
                                }}
                                tooltipSettings= {{
                                    visible: true,
                                    valuePath:'name'
                                }}
                            >
                            </LayerDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/north-america.json')} layerType='Geometry'
                                shapeSettings={{
                                    fill: '#C13664'
                                }}
                                highlightSettings={{
                                    enable: true,
                                    fill: '#C13664'
                                }}
                                tooltipSettings= {{
                                    visible: true,
                                    valuePath:'name'
                                }}
                            >
                            </LayerDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/south-america.json')} layerType='Geometry'
                                shapeSettings={{
                                    fill: '#9C3367'
                                }}
                                highlightSettings={{
                                    enable: true,
                                    fill: '#9C3367'
                                }}
                                tooltipSettings= {{
                                    visible: true,
                                    valuePath:'name'
                                }}
                            >
                            </LayerDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/oceania.json')} layerType='Geometry'
                                shapeSettings={{
                                    fill: '#2A2870'
                                }}
                                highlightSettings={{
                                    enable: true,
                                    fill: '#2A2870'
                                }}
                                tooltipSettings= {{
                                    visible: true,
                                    valuePath:'name'
                                }}
                            >
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
            </div>
            <div><i><p id="content" style={{fontSize: '16px',color:'grey',textAlign:'center'}}>Click on a shape to drill</p></i></div>
            <div id="action-description">
                <p>
                This sample demonstrates drill down with all the continents in the initial view. By clicking a continent, you can view all the countries available in that continent.
                </p>
            </div>
            <div id="description">
              <p>
                 In this example, you can see how to display an another layer by clicking a shape in previous layer. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices
             </p>
            </div>
            </div >
        )
    }
    //public onMapsLoad(args: ILoadedEventArgs): void {
    //};
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
    };
    public loaded(args: ILoadEventArgs): void {        
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
        let mapsSVG: HTMLElement = document.getElementById('mapdrilldown_svg') as HTMLElement;
        if (mapsSVG) {
            mapsSVG.addEventListener('touchmove', (e: MouseEvent) => { touchmove = true; }, false);
        }
    };
// custom code end
}