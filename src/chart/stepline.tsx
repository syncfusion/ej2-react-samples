/**
 * Sample for Step line series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Double, StepLineSeries, Tooltip, ILoadedEventArgs, Highlight, ITooltipRenderEventArgs, DataLabel } from '@syncfusion/ej2-react-charts';
import { loadChartTheme } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let stepLineData: Object[] = [
    { x: 2007, y: 6.0, album: 'High School Musical 2', artist: 'Various Artists' },
    { x: 2008, y: 6.8, album: 'Viva la Vida or Death and All His Friends', artist: 'Coldplay' },
    { x: 2009, y: 8.3, album: 'I Dreamed a Dream', artist: 'Susan Boyle' },
    { x: 2010, y: 5.7, album: 'Recovery', artist: 'Eminem' },
    { x: 2011, y: 18.1, album: '21', artist: 'Adele' },
    { x: 2012, y: 8.3, album: '21', artist: 'Adele' },
    { x: 2013, y: 4.0, album: 'Midnight Memories', artist: 'One Direction' },
    { x: 2014, y: 10.0, album: 'Frozen', artist: 'Various Artists' },
    { x: 2015, y: 17.4, album: '25', artist: 'Adele' },
    { x: 2016, y: 2.5, album: 'Lemonade', artist: 'Beyoncé' },
    { x: 2017, y: 6.1, album: '÷', artist: 'Ed Sheeran' },
    { x: 2018, y: 3.5, album: 'The Greatest Showman', artist: 'Hugh Jackman & Various Artists' },
    { x: 2019, y: 3.3, album: '5x20 All the Best!! 1999–2019', artist: 'Arashi' },
    { x: 2020, y: 4.8, album: 'Map of the Soul: 7', artist: 'BTS' },
    { x: 2021, y: 4.68, album: '30', artist: 'Adele' },
    { x: 2022, y: 7.2, album: 'Greatest Works of Art', artist: 'Jay Chou' },
    { x: 2023, y: 6.4, album: 'FML', artist: 'Seventeen' },
    { x: 2024, y: 5.6, album: 'The Tortured Poets Department', artist: 'Taylor Swift' }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StepLine extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Double', minimum: 2006, maximum: 2025, interval: 3, edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }} load={this.load.bind(this)} primaryYAxis={{ minimum: 0, maximum: 20, interval: 4, title: 'Sales in million', labelFormat: '{value}', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false, enableHighlight: true }} tooltip={{ enable: true, showNearestTooltip: true, header: "<b>${point.x}</b>", enableHighlight: true, enableMarker: false }} loaded={this.onChartLoad.bind(this)} title='Worldwide Best-Selling Albums by Year' subTitle='Source: wikipedia.org' tooltipRender={this.tooltipRender.bind(this)}>
                        <Inject services={[StepLineSeries, Tooltip, Double, Highlight, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={stepLineData} xName='x' yName='y' width={3} type='StepLine' marker={{ dataLabel: { visible: true, font: { fontWeight: '600' } } }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This React StepLine Chart visualizes the global best-selling albums by year from 2001 to 2024.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a step line type chart. This chart forms a step-like progression by connecting points using vertical and horizontal lines. <code>Markers</code> are used to represent individual data points and their values.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use step line series, we need to inject <code>StepLineSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the step line series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/step-line" aria-label="Navigate to the documentation for Step Line Chart in React Chart component">documentation section</a>.
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
        loadChartTheme(args);
    };

    public tooltipRender(args: ITooltipRenderEventArgs): void {
        let data: any = args.series.dataSource[args.point.index];
        args.text = `Sales: <b>${data.y}M</b><br/>Album: <b>${data.album}</b><br/>Artist: <b>${data.artist}</b>`;
    };

}