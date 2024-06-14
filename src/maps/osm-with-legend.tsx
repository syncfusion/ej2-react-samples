/**
 * OSM with legend sample
 */

 import * as React from "react";
 import * as ReactDOM from "react-dom";
 import { MapAjax } from '@syncfusion/ej2-maps';
 import {
     MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, 
     MapsTooltip, Marker, Zoom, MarkerDirective, MarkersDirective, Legend
 } from '@syncfusion/ej2-react-maps';
 import { SampleBase } from '../common/sample-base';
 const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
 
 export class OSMLegend extends SampleBase<{}, {}> {
     render() {
         return (
             <main><div className='control-pane'>
                 <style>
                     {SAMPLE_CSS}
                 </style>
                 <div className='control-section row'>
                     <div className='col-md-12'>
                         <MapsComponent id="maps" load={this.load}
                             useGroupingSeparator = {true} format = {"n"}
                             titleSettings={{ text: 'Top 10 populated cities in the World', textStyle: { size: '16px', fontFamily: 'inherit' } }}
                            legendSettings={{
                                visible: true, position: 'Float',
                                location: { x: 10, y: 262 },
                                textStyle: { color: '#000000', fontFamily: 'inherit' },
                                height:'170px', type: 'Markers', background: '#E6E6E6'
                            }}
                            zoomSettings={{ zoomFactor: 2, enable: true }}>
                             <Inject services={[Marker, Legend, MapsTooltip, Zoom]} />
                             <LayersDirective>
                                 <LayerDirective urlTemplate="https://tile.openstreetmap.org/level/tileX/tileY.png">
                                    <MarkersDirective>
                                        <MarkerDirective visible={true} shape ='Circle' legendText='name' height={15} width= {15} colorValuePath = 'color'
                                            tooltipSettings={{
                                                visible: true, valuePath: 'population', format: 'City Name: ${name} <br> Population: ${population} million',
                                                textStyle: { fontFamily: 'inherit' }
                                            }}
                                            dataSource= {[
                                                { name: 'Tokyo', latitude: 35.6805245924747, longitude: 139.76770396213337, population: 37435191, color:'#2EB6C8'},
                                                { name: 'Delhi', latitude: 28.644800, longitude: 77.216721, population: 29399141, color:'#4A97F4'},
                                                { name: 'Shanghai', latitude: 31.224361, longitude: 121.469170, population: 26317104, color:'#498082'},
                                                { name: 'Sao Paulo', latitude: -23.550424484747914, longitude: -46.646471636488315, population: 21846507, color:'#FB9E67'},
                                                { name: 'Mexico City', latitude: 19.427402397418774, longitude: -99.131123716666, population: 21671908, color:'#8F9DE3'},
                                                { name: 'Cairo ', latitude: 30.033333, longitude: 31.233334, population: 20484965, color:'#7B9FB0'},
                                                { name: 'Dhaka', latitude: 23.777176, longitude: 90.399452, population: 20283552, color:'#4DB647'},
                                                { name: 'Mumbai', latitude: 19.08492049646163, longitude: 72.87449446319248, population: 20185064, color:'#30BEFF'},
                                                { name: 'Beijing', latitude: 39.90395970055848, longitude: 116.38831272088059, population: 20035455, color:'#Ac72AD'},
                                                { name: 'Osaka', latitude: 34.69024500601642, longitude: 135.50746225677142, population: 19222665, color:'#EFE23E'}
                                            ]}>
                                        </MarkerDirective>
                                    </MarkersDirective>
                                </LayerDirective>
                             </LayersDirective>
                         </MapsComponent>
                     </div>
                 </div>   
            </div>              
                 <section id="action-description" aria-label="Description of Maps sample">
                     <p>
                     This sample illustrates the world's top 10 most populated cities by displaying markers in their locations and legend with the city names.
                     </p>
                 </section>
                 <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                     <p>
                        In this example, you can see how to display markers and a legend on the OpenStreetMap. To enable the legend, set the <code>visible</code> property in <code>legendSettings</code> to <b>true</b>, and then use properties like <code>title</code>, <code>position</code>, <code>type</code>, <code>height</code>, <code>width</code>, and so on to customize the legend.
                     </p>
                     <br/>
                     <p style={{fontWeight: 500}}>Injecting Module</p>
                     <p>
                        The maps component features are segregated into individual modules by feature. To use markers and a legend, we need to inject the <code>Marker</code> and <code>Legend</code> module into services.
                     </p>
                 </section>
            </main>
         )
     }

     public load(args: ILoadedEventArgs): void {
         // custom code start
         let theme: string = location.hash.split('/')[1];
         theme = theme ? theme : 'Material';
         args.maps.theme = ((theme.charAt(0).toUpperCase() +
         theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
         // custom code end
     };
 }