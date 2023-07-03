/**
 * Sample for Range Area Series
 */
 import * as React from 'react';
 import {
   ChartComponent,SeriesCollectionDirective,Highlight, LineSeries,ILoadedEventArgs,ISeriesRenderEventArgs,ChartTheme,Tooltip,DateTime, Crosshair,SeriesDirective,Inject,Category,RangeAreaSeries,   Zoom,
 } from '@syncfusion/ej2-react-charts';
 import { SampleBase } from '../common/sample-base';
 import { Browser } from '@syncfusion/ej2-base';
 var data = [
   {
     x: new Date(2015, 0, 1),
     HighTemp: 42.5,
     LowTemp: 12.5,
     LineTemp: 32.5,
     Text: '32.5˚C',
   },
{
     x: new Date(2015, 0, 2),
     HighTemp: 37.5,
     LowTemp: 17.5,
     LineTemp: 27.5,
     Text: '27.5˚C',
   },
   {
     x: new Date(2015, 0, 3),
     HighTemp: 47.5,
     LowTemp: 15.5,
     LineTemp: 25.5,
     Text: '25.5˚C',
   },
   {
     x: new Date(2015, 0, 4),
     HighTemp: 42.5,
     LowTemp: 18.5,
     LineTemp: 28.5,
     Text: '28.5˚C',
   },
   {
     x: new Date(2015, 0, 5),
     HighTemp: 45.5,
     LowTemp: 16.5,
     LineTemp: 28.5,
     Text: '28.5˚C',
   },
   {
     x: new Date(2015, 0, 6),
     HighTemp: 42.5,
     LowTemp: 12.5,
     LineTemp: 31.5,
     Text: '31.5˚C',
   },
   {
     x: new Date(2015, 0, 7),
     HighTemp: 43.5,
     LowTemp: 13.5,
     LineTemp: 33.5,
     Text: '33.5˚C',
   },
   {
     x: new Date(2015, 0, 8),
     HighTemp: 45.5,
     LowTemp: 15.5,
     LineTemp: 31.5,
     Text: '31.5˚C',
   },
   {
     x: new Date(2015, 0, 9),
     HighTemp: 41.7,
     LowTemp: 12.7,
     LineTemp: 25.7,
     Text: '25.7˚C',
   },
   {
     x: new Date(2015, 0, 10),
     HighTemp: 45.5,
     LowTemp: 11.5,
     LineTemp: 31.5,
     Text: '31.5˚C',
   },
   {
     x: new Date(2015, 0, 11),
     HighTemp: 43.5,
     LowTemp: 15.5,
     LineTemp: 30.5,
     Text: '30.5˚C',
   },
   {
     x: new Date(2015, 0, 12),
     HighTemp: 45.5,
     LowTemp: 21.5,
     LineTemp: 32.5,
     Text: '32.5˚C',
   },
   {
     x: new Date(2015, 0, 13),
     HighTemp: 39.5,
     LowTemp: 9.5,
     LineTemp: 20.5,
     Text: '20.5˚C',
   },
   {
     x: new Date(2015, 0, 14),
     HighTemp: 33.5,
     LowTemp: 15.5,
     LineTemp: 23.5,
     Text: '23.5˚C',
   },
   {
     x: new Date(2015, 0, 15),
     HighTemp: 38.5,
     LowTemp: 11.5,
     LineTemp: 24.5,
     Text: '24.5˚C',
   },
   {
     x: new Date(2015, 0, 16),
     HighTemp: 45.5,
     LowTemp: 14.5,
     LineTemp: 30.5,
     Text: '30.5˚C',
   },
   {
     x: new Date(2015, 0, 17),
     HighTemp: 40.5,
     LowTemp: 9.5,
     LineTemp: 20.5,
     Text: '20.5˚C',
   },
   {
     x: new Date(2015, 0, 18),
     HighTemp: 42.5,
     LowTemp: 15.5,
     LineTemp: 22.5,
     Text: '22.5˚C',
   },
   {
     x: new Date(2015, 0, 19),
     HighTemp: 40.5,
     LowTemp: 13.5,
     LineTemp: 25.5,
     Text: '25.5˚C',
   },
   {
     x: new Date(2015, 0, 20),
     HighTemp: 45.7,
     LowTemp: 20.5,
     LineTemp: 31.5,
     Text: '31.5˚C',
   },
   {
     x: new Date(2015, 0, 21),
     HighTemp: 43.5,
     LowTemp: 19.5,
     LineTemp: 34.5,
     Text: '34.5˚C',
   },
   {
     x: new Date(2015, 0, 22),
     HighTemp: 42.5,
     LowTemp: 15.5,
     LineTemp: 29.5,
     Text: '29.5˚C',
   },
   {
     x: new Date(2015, 0, 23),
     HighTemp: 45.5,
     LowTemp: 10.5,
     LineTemp: 21.5,
     Text: '21.5˚C',
   },
   {
     x: new Date(2015, 0, 24),
     HighTemp: 42.5,
     LowTemp: 13.5,
     LineTemp: 23.5,
     Text: '23.5˚C',
   },
   {
     x: new Date(2015, 0, 25),
     HighTemp: 39.5,
     LowTemp: 9.9,
     LineTemp: 20.5,
     Text: '20.5˚C',
   },
   {
     x: new Date(2015, 0, 26),
     HighTemp: 43.5,
     LowTemp: 10.5,
     LineTemp: 23.5,
     Text: '23.5˚C',
   },
   {
     x: new Date(2015, 0, 27),
     HighTemp: 42.5,
     LowTemp: 13.5,
     LineTemp: 31.5,
     Text: '31.5˚C',
   },
   {
     x: new Date(2015, 0, 28),
     HighTemp: 45.5,
     LowTemp: 13.5,
     LineTemp: 28.5,
     Text: '28.5˚C',
   },
   {
     x: new Date(2015, 0, 29),
     HighTemp: 46.5,
     LowTemp: 15.5,
     LineTemp: 34.5,
     Text: '34.5˚C',
   },
   {
     x: new Date(2015, 0, 30),
     HighTemp: 48.5,
     LowTemp: 18.5,
     LineTemp: 29.5,
     Text: '29.5˚C',
   },
   {
     x: new Date(2015, 0, 31),
     HighTemp: 45.5,
     LowTemp: 11.5,
     LineTemp: 31.5,
     Text: '31.5˚C',
   },
 ];
 const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
 export class RangeArea extends SampleBase<{},{}> {
   chartInstance;
   render() {
     return (
       <div className="control-pane">
         <style>{SAMPLE_CSS}</style>
         <div className="control-section">
           <ChartComponent
             id="charts"
             ref={(chart) => (this.chartInstance = chart)}
             style={{ textAlign: 'center' }}
             load={this.load.bind(this)}
             seriesRender={this.seriesRender.bind(this)}
             primaryXAxis={{
               valueType: 'DateTime', labelFormat: 'dd MMM', interval: 2, edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
             }}
             legendSettings={{ visible: false }}
             zoomSettings={{
               enableSelectionZooming: true,
               mode: 'X',
             }}
             primaryYAxis={{
               labelFormat: '{value}˚C',minimum: 0,maximum: 70,interval: 10,lineStyle: { width: 0 }, majorTickLines: { width: 0 }
             }}
             chartArea={{ border: { width: 0 } }}
             width={Browser.isDevice ? '100%' : '75%'}
             title="Temperature Variation"
             loaded={this.onChartLoad.bind(this)}
             tooltip={{ enable: true, shared: true, format: 'Temperature : <b>${point.tooltip}</b><br>Range : <b>${point.low} - ${point.high}</b>' }}
           >
             <Inject services={[RangeAreaSeries, LineSeries, Category, DateTime, Crosshair, Tooltip, Zoom, Highlight]}/>
             <SeriesCollectionDirective>
               <SeriesDirective dataSource={data} 
                enableTooltip={false}  border={{width: 2}}
                 xName="x"
                 high="HighTemp"
                 opacity={0.4}
                 marker={{
                   visible: false,
                   height: 7,
                   width: 7,
                   opacity: 1,
                   dataLabel: { visible: false, position: 'Outer' },
                 }}
                 low="LowTemp"
                 animation={{ enable: true }}
                 name="India"
                 type="RangeArea"
               ></SeriesDirective>
               <SeriesDirective
                 dataSource={data}
                 tooltipMappingName="Text"
                 high="HighTemp"
                 low="LowTemp"
                 width={3}
                 marker={{ visible: true, width: 7, height: 7 }}
                 xName="x"
                 yName="LineTemp"
                 type="Line"
               ></SeriesDirective>
             </SeriesCollectionDirective>
           </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This React Range Area Chart example visualizes minimum and maximum temperatures of different days with default range area series.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the range area chart. This chart is used to display continuous data points as a set of lines varying between high and low values over time intervals and across different categories.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use RangeArea series, we need to inject
                       <code>RangeAreaSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                    More information about range area series can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-area">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
        
    public seriesRender(args: ISeriesRenderEventArgs) {
        var areathemes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast'];
        var borderColor = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4'];
        args.series.border.color = borderColor[areathemes.indexOf(args.series.chart.theme.toLowerCase())];
    }
}
