/**
 * Sample for Hilo Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    HiloSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { chartData, chartValues } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
    let date1: Date=new Date('2017, 1, 1');
    let returnValue: any=  chartData.filter(filterValue);
    function filterValue(value:{x:Date,high:number,low:number} ):any {
     if(value.x >= date1){
         return value.x,value.high,value.low;
        }
    }
export class Hilo extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }} primaryYAxis={{ title: 'Price', minimum: 10, maximum: 180, interval: 20, labelFormat: '${value}', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} legendSettings={{ visible: false }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true, enableMarker: false, header: "", format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b>" }} crosshair={{ enable: false, lineType: 'Vertical', line: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} title='AAPL Historical' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartValues} xName='period' yName='low' name='Apple Inc' type='Hilo' low='low' high='high' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This React Hilo Chart example visualizes the AAPL stock price with a default Hilo series in the chart. The tooltip and crosshair show information about the stock price.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure the HILO series. This series shows the high and low stock values over a given period of time.</p>
                    <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Hilo series, we need to inject
                        <code>HiloSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Hilo series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/financial-types/#hilo" aria-label="Navigate to the documentation for Hilo in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div >
        )    
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}
