/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Marker, Legend,
    ProjectionType, MarkersDirective, MarkerDirective, IResizeEventArgs
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { AccumulationChart, PieSeries, AccumulationTooltip, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective } from '@syncfusion/ej2-react-charts';

AccumulationChart.Inject(PieSeries, AccumulationTooltip);
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class PieMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="maps" resize={this.resize.bind(this)} loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            titleSettings= {{
                                text: 'Top 6 largest countries age group details',
                                textStyle: {
                                    size: '16px'
                                }
                            }}
                            zoomSettings={{
                                enable: false
                            }}
                            legendSettings ={{
                                visible: true,
                                
                                position: 'Bottom'
                            }}
                        >
                            <Inject services={[Marker, Legend]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/continent.json')}
                                    shapeSettings={{
                                        fill: '#E5E5E5',
                                        colorMapping: [
                                            {
                                               
                                                from: 0, to: 4, color: '#634D6F', label: '0-14 years',
                                            },
                                            {
                                                
                                                from: 5, to: 14, color: '#B34D6D', label: '15-24 years'
                                            },
                                            {
                                                
                                                from: 15, to: 59, color: '#557C5C', label: '25-54 years'
                                            },
                                            {
                                                
                                                from: 60, to: 100, color: '#5E55E2', label: '55-64 years'
                                            }
                                        ]
                    
                                    }}
                                   
                                >
                                <MarkersDirective>
                                <MarkerDirective visible={true} animationDuration={0}
                                    template='<div id="marker4" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>'
                                    dataSource={[
                                        { 'latitude': 35.746512259918504, 'longitude': 102.216796875 },
                                    ]}
                                    ></MarkerDirective>
                                    <MarkerDirective visible={true} animationDuration={0}
                                    template='<div id="marker1" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>'
                                    dataSource={[
                                        { 'latitude': 61.938950426660604, 'longitude': 97.03125 },
                                    ]}
                                    ></MarkerDirective>
                                    <MarkerDirective visible={true} animationDuration={0}
                                    template='<div id="marker2" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>'
                                    dataSource={[
                                        { 'latitude': 57.70414723434193, 'longitude': -114.08203125 }
                                    ]}
                                    ></MarkerDirective>
                                    <MarkerDirective visible={true} animationDuration={0}
                                    template='<div id="marker3" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>'
                                    dataSource={[
                                        { 'latitude': 39.90973623453719, 'longitude': -103.0078125 }
                                    ]}
                                    ></MarkerDirective>
                                    <MarkerDirective visible={true} animationDuration={0}
                                    template='<div id="marker5" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>'
                                    dataSource={[
                                        { 'latitude': -8.667918002363107, 'longitude': -52.55859375 },
                                    ]}
                                    ></MarkerDirective>
                                    <MarkerDirective visible={true} animationDuration={0}
                                    template='<div id="marker6" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>'
                                    dataSource={[
                                        { 'latitude': -23.725011735951796, 'longitude': 132.978515625}
                                    ]}
                                    ></MarkerDirective>
                                </MarkersDirective>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                {/* Source Link */}
                <div style={{float: 'right', marginright: '10px'}}>Source: 
                <a href="http://www.nationmaster.com/country-info/stats/People/Age-structure/55--64-years" target="_blank">www.nationmaster.com</a>
               
               </div>
                <div id="action-description">
               <p>
                   This sample visualizes the placing of pie charts on the maps. Pie chart is rendered with the age group detais of top 6 largest countries.
              </p>
           </div>
           <div id="description">
        <p>
          In this example, you can see how to render the pie chart as marker in map. Any custom HTML elements can be used as a marker. 
    
        </p>
    <br/>
        <p style={{fontweight: 500}}>Injecting Module</p>
        <p>
         Maps component features are segregated into individual feature-wise modules. To use marker template, you need to inject <code>Marker</code> module using <code>Maps.Inject(Marker)</code> method.
        </p>
    </div>
               
            </div>
        )
    }
    public chartCollection: AccumulationChart[] = [];
    public onMapsLoad(args: ILoadedEventArgs): void {
        let chart: AccumulationChart = new AccumulationChart({
            background: 'transparent',
        width: '70',
        height: '70',
        tooltip: {
            enable: true,
            format: '${point.x} : ${point.y}'
        },
        series: [
            {
                explode: true,
                explodeIndex: 0,
                explodeOffset: '20%',
                name: 'China',
                palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                dataSource: [
                    { 'x': '0-14 years', y: 17.2 }, { 'x': '15-24 years', y: 15.4 },
                    { 'x': '25-54 years', y: 46.9 }, { 'x': '55-64 years', y: 11.3 },
                ],
                type: 'Pie',
                xName: 'x',
                yName: 'y'
            }
        ],
		legendSettings: {visible: false}
        });
        chart.appendTo('#marker1');
        this.chartCollection.push(chart);
        let chart1: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
            {
                explode: true,
                explodeIndex: 0,
                explodeOffset: '20%',
                name: 'Russia',
                palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                dataSource: [
                    { 'x': '0-14 years', y: 16 }, { 'x': '15-24 years', y: 11.5 },
                    { 'x': '25-54 years', y: 45.9 }, { 'x': '55-64 years', y: 13.5 },
                ],
                type: 'Pie',
                xName: 'x',
                yName: 'y'
            }
        ],
        legendSettings: {visible: false}
        });
        chart1.appendTo('#marker2');
        this.chartCollection.push(chart1);
        let chart2: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Canada',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 15.5 }, { 'x': '15-24 years', y: 12.9 },
                        { 'x': '25-54 years', y: 41.4 }, { 'x': '55-64 years', y: 13.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: {visible: false}
        });
        chart2.appendTo('#marker3');
        this.chartCollection.push(chart2);
        let chart3: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'USA',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 20 }, { 'x': '15-24 years', y: 13.7 },
                        { 'x': '25-54 years', y: 40.2 }, { 'x': '55-64 years', y: 12.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: {visible: false}
        });
        chart3.appendTo('#marker4');
        this.chartCollection.push(chart3);
        let chart4: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                explodeIndex: 0,
                explodeOffset: '20%',
                name: 'Brazil',
                palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                dataSource: [
                    { 'x': '0-14 years', y: 24.2 }, { 'x': '15-24 years', y: 16.7 },
                    { 'x': '25-54 years', y: 43.6 }, { 'x': '55-64 years', y: 8.2 },
                ],
                type: 'Pie',
                xName: 'x',
                yName: 'y'
                }
            ],
            legendSettings: {visible: false}
        });
        chart4.appendTo('#marker5');
        this.chartCollection.push(chart4);
        let chart5: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Australia',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 18.1 }, { 'x': '15-24 years', y: 13.4 },
                        { 'x': '25-54 years', y: 42 }, { 'x': '55-64 years', y: 11.8 },
    
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: {visible: false}
        });
        chart5.appendTo('#marker6');
        this.chartCollection.push(chart5);
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
    };
    // custom code end
    public resize(args: IResizeEventArgs): void {
		for (let i: number = 0; i < this.chartCollection.length; i++) {			
			this.chartCollection[i].destroy();
		}
	}
}