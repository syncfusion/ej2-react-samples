/**
 * Samples for vertical chart
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, getElement } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class VerticalChart extends SampleBase {
    constructor() {
        super(...arguments);
        this.count = 0;
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts-vertical' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} primaryXAxis={{
            title: 'Time (s)', majorGridLines: { width: 0 }
        }} load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} primaryYAxis={{
            title: 'Velocity (m/s)', majorGridLines: { width: 0 }, minimum: -15, maximum: 15, interval: 5
        }} chartArea={{ border: { width: 0 } }} isTransposed={true} width={Browser.isDevice ? '100%' : '80%'} title='Indonesia - Seismograph Analysis'>
                        <Inject services={[LineSeries]}/>
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
                        More information on the isTransposed can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        //let chart: Element = document.getElementById('charts-vertical');
        this.chartInstance.loaded = null;
        //chart.setAttribute('title', '');
        this.clrInterval =
            +setInterval(() => {
                args.chart.series[0].dataSource = this.liveData(args.chart.series[0].dataSource, args.chart.series[0]);
                args.chart.refresh();
            }, 
            // tslint:disable-next-line:align
            10);
    }
    ;
    liveData(data, series) {
        this.count = this.count + 1;
        let newData = data;
        if (this.count > 350 || getElement('charts-vertical') === null) {
            clearInterval(this.clrInterval);
        }
        else if (this.count > 300) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(0, 0) });
        }
        else if (this.count > 250) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-2, 1) });
        }
        else if (this.count > 180) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 2) });
        }
        else if (this.count > 100) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-7, 6) });
        }
        else if (this.count < 50) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 3) });
        }
        else {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-9, 9) });
        }
        return newData;
    }
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    getXValue(data) {
        return data.length;
    }
}
