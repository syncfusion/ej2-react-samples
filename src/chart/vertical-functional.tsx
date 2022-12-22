/**
 * Samples for vertical chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, LineSeries, ILoadedEventArgs, Series, ChartTheme, getElement
} from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function VerticalChart() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let count: number = 0;
    let clrInterval: number;
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='charts-vertical' ref={chart => chartInstance = chart} style={{ textAlign: "center" }}
                    primaryXAxis={{
                        title: 'Time (s)', majorGridLines: { width: 0 }
                    }}
                    load={load.bind(this)}
                    loaded={onChartLoad.bind(this)}
                    primaryYAxis={{
                        title: 'Velocity (m/s)', majorGridLines: { width: 0 }, minimum: -15, maximum: 15, interval: 5
                    }}
                    chartArea={{ border: { width: 0 } }}
                    isTransposed={true}
                    width={Browser.isDevice ? '100%' : '75%'}
                    title='Indonesia - Seismograph Analysis'>
                    <Inject services={[LineSeries]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective width={2} dataSource={[{ x: 0, y: 0 }]} xName='x' yName='y' type='Line' animation={{ enable: false }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates the vertical chart by changing the orientation of x-axis to vertical and y-axis to horizontal.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the vertical type charts.
                    To render a chart in vertical manner, you can use <code>isTransposed</code> in chart.
                </p>
                <p>
                    More information on the isTransposed can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
            </div>
        </div>
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        //let chart: Element = document.getElementById('charts-vertical');
        args.chart.loaded = null;
        //chart.setAttribute('title', '');
        clrInterval =
            +setInterval(() => {
                args.chart.series[0].dataSource = liveData(args.chart.series[0].dataSource as any[], args.chart.series[0] as Series);
                args.chart.refresh();
            },
                // tslint:disable-next-line:align
                10);
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
    function liveData(data: any[], series: Series): any[] {
        count = count + 1;
        let newData: any[] = data;
        if (count > 350 || getElement('charts-vertical') === null) {
            clearInterval(clrInterval);
        } else if (count > 300) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(0, 0) });
        } else if (count > 250) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-2, 1) });
        } else if (count > 180) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-3, 2) });
        } else if (count > 100) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-7, 6) });
        } else if (count < 50) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-3, 3) });
        } else {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-9, 9) });
        }
        return newData;
    }
    function getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    function getXValue(data: any[]): number {
        return data.length;
    }
}
export default VerticalChart;