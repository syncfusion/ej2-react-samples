/**
 * Sample for Candle Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, LastValueLabel, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries, Crosshair, StripLine, ChartTheme, SeriesDirective, Inject, IAxisRangeCalculatedEventArgs, Series, ChartAnnotation, IPointRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

let value: number = 180;
let getData = (): { series: Candlestick[] } => {
    let series: Candlestick[] = [];
    let point: Candlestick;
    for (let i: number = 0; i < 30; i++) {
        let change: number;
        if (i < 10 && !(i === 3 || i === 4 || i === 7)) {
            change = -(Math.random() * 10);
        } 
        else if ((i >= 10 || i === 3 || i === 4 || i === 7 || i === 23 || i === 24 || i === 27) && i < 20 && !(i === 13 || i === 14 || i === 17)) {
            change = (Math.random() * 10);
        }
        else if ((i >= 20 || i === 13 || i === 14 || i === 17) && !(i === 23 || i === 24 || i === 27)) {
            change = -(Math.random() * 10);
        } 
        else {
            change = 0;
        }
        value = value + change;
        value += Math.random() * 0.1;
        if (value > 240) {
            value = 240;
        }
        if (value < 140) {
            value = 140;
        }
        let open: number = value + Math.round(Math.random() * 12);
        let low: number = Math.min(value, open) - Math.round(Math.random() * 8);
        let high: number = Math.max(value, open) + Math.round(Math.random() * 14);
        point = {
            x: new Date(2000, 5, 2, 2, 0, i),
            close: value,
            open: open,
            low: low,
            high: high
        };
        series.push(point);
    }
    return { series: series };
};
let data: Candlestick[] = getData().series;
let incVal: number = 0;
let updateVal: number = data.length;
let pointAdded: boolean = false;
interface Candlestick {
    open: number;
    close: number;
    high: number;
    low: number;
    x: Date;
}

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
    /**
     * Candle sample
     */
  
export class Candle extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <div className="row">
                        <ChartComponent id='stock' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} load={this.load.bind(this)} primaryXAxis={{ valueType: 'DateTime', interval: 4, crosshairTooltip: { enable: true }, edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift', majorGridLines: { width: 0 } }} primaryYAxis={{ interval: 20, minimum: 120, opposedPosition: true, lineStyle: { width: 0 }, crosshairTooltip: { enable: true }, majorGridLines: { width: 1 }, majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '90%'} chartArea={{ border: { width: 0 } }} title="AAPL Historical" crosshair={{ enable: true, dashArray: '5,5' }} pointRender = {this.pointRender.bind(this)}   axisRangeCalculated={this.axisRangeCalculated.bind(this)}>
                            <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair, ChartAnnotation, LastValueLabel]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective type='Candle' bearFillColor='#2ecd71' bullFillColor='#e74c3d' dataSource={data} columnWidth={0.4} xName='x' low='low' high='high' open='open' close='close' lastValueLabel={{enable: true, background: 'red', dashArray: '3,2', lineWidth: 0.5, font: {size: '10px'}}} />
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the animation in the candle chart when existing data is updated or new data is added.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the candlestick series to display data that updates every second and adds new data every five seconds. The chart demonstrates how to set up a last value label that follows the latest data.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use the candle series, we need to inject
                        <code>CandleSeries</code> module using <code>Chart.Inject(CandleSeries)</code> method.
                    </p>
                    <p>
                        More information on the candle series can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/financial-types/#candle" aria-label="Navigate to the documentation for Candle Chart in React Chart control">documentation section</a>.
                    </p>
                </div>
            </div >
        )
    }
    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            let lastPoint: Object = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 2500;
            let firstPoint: Object = args.axis.series[0].points[0].x;
            args.minimum = new Date(Number(firstPoint)).getTime() + 500;
        }
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        
        setInterval(function () {
            let newData1: Candlestick[] = [];
            pointAdded = true;
            for (let i: number = 0; i < (args.chart.series[0].dataSource as Object[]).length; i++) {
                newData1.push(Object.assign({}, args.chart.series[0].dataSource[i]));
            }
            if (newData1.length > 0) {
                const lastIndex: number = newData1.length - 1;
                const previousClose: number = newData1[lastIndex].close;
                newData1[lastIndex].close += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5;
                newData1[lastIndex].close = Math.min(Math.min(Math.max(newData1[lastIndex].close, newData1[lastIndex].low + 5), newData1[lastIndex].high - 5), newData1[lastIndex].open - 2);
                if (previousClose === newData1[lastIndex].close) {
                    newData1[lastIndex].close -= 1;
                }
            }
            if (incVal < 10) {
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData1);
                    incVal++;
                }
            }
            else {
                let change: number = (Math.random() < 0.49 ? 1 : -1) * Math.random() * 10;
                value += change;
                if (value > 200) {
                    value = 200;
                } else if (value < 160) {
                    value = 160;
                }
                value += Math.random() * 0.1;
                let open = value + Math.round(Math.random() * 12);
                let low = Math.min(value, open) - Math.round(Math.random() * 8);
                let high = Math.max(value, open) + Math.round(Math.random() * 15);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].addPoint({ x: new Date(2000, 5, 2, 2, 0, updateVal), high: high, low: low, open: open, close: value });
                }
                incVal = 0;
                updateVal++;
            }
        }, 1000);
    };

    public pointRender(args: IPointRenderEventArgs): void {
        args.series.lastValueLabel.background = args.fill;
    }

}
