/**
 * Sample for Column series
 */
import * as React from "react";
import { useEffect, useRef } from 'react';

import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, ILoadedEventArgs, LineSeries, DataLabel, IMouseEventArgs, Series, IAxisRangeCalculatedEventArgs, Tooltip
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
let chartData: Object[] = [
    { x: 20, y: 20 }, { x: 80, y: 80 }
];

const ClickAddPoint = () => {
    let chartInstance = useRef<ChartComponent>(null);
    useEffect(() => {
        updateSampleSection();
    }, [])

    const loaded = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('AddPoint');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    
    const axisRangeCalculated = (args: IAxisRangeCalculatedEventArgs): void  => {
        if (args.axis.name === 'primaryXAxis') {
            if (args.interval < 10) {
                args.maximum = args.maximum + 10;
                args.minimum = args.minimum - 10;
                args.interval = 10;
            }
        }
        if (args.axis.name === 'primaryYAxis') {
            if (args.maximum <= 60) {
                args.interval = 10;
            }
        }
    };

    const chartMouseClick = (args: IMouseEventArgs): void => {
        let isRemoved: boolean = false;
        if (args.axisData) {
            for (let i: number = 0; i < (chartInstance.current.series[0] as Series).points.length; i++) {
                const markerWidth: number = (chartInstance.current.series[0] as Series).marker.width / 2;
                let roundedX: number = Math.round(args.axisData['primaryXAxis']) + markerWidth;
                let roundedY: number = Math.round(args.axisData['primaryYAxis']) + markerWidth;
                let pointX: number = Math.round((chartInstance.current.series[0] as Series).points[i].x as number) + markerWidth;
                let pointY: number = Math.round((chartInstance.current.series[0] as Series).points[i].y as number) + markerWidth;
                if ((roundedX === pointX || roundedX + 1 === pointX || roundedX - 1 === pointX) &&
                    (roundedY === pointY || roundedY + 1 === pointY || roundedY - 1 === pointY)) {
                    if ((chartInstance.current.series[0] as Series).points.length > 1) {
                        const points = (chartInstance.current.series[0] as Series).points;
                        const duration: number = i === 0 || i === points[points.length - 1].index ? 500 : 0;
                        chartInstance.current.series[0].removePoint(i, duration);
                    }
                    isRemoved = true;
                }
            }
            if (!isRemoved) {
                chartInstance.current.series[0].addPoint({ x: Math.round(args.axisData['primaryXAxis']), y: Math.round(args.axisData['primaryYAxis']) });
            }
        }
    };

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='AddPoint' ref={chartInstance} style={{ textAlign: "center" }}
                    primaryXAxis={{
                        edgeLabelPlacement: 'Shift',
                        rangePadding: 'Additional',
                        majorGridLines: { width: 0 }
                    }} primaryYAxis={{
                        title: 'Value', interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                    }} chartMouseClick={chartMouseClick.bind(this)} axisRangeCalculated={axisRangeCalculated.bind(this)}
                    tooltip={{ enable: true, enableHighlight: true }}
                    chartArea={{ border: { width: 0 } }} load={load.bind(this)} loaded={loaded.bind(this)} width={Browser.isDevice ? '100%' : '70%'} title='User supplied data' >
                    <Inject services={[LineSeries, DataLabel, Tooltip]} />
                    <SeriesCollectionDirective >
                        <SeriesDirective dataSource={chartData} xName='x' yName='y' type='Line' width={3} marker={{ visible: true, isFilled: true, border: { width: 2, color: 'White' }, width: 13, height: 13 }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a chart that allows end users to add new data and update the existing data source by clicking in the chart area. Additionally, clicking on an existing point will remove that data from the existing data source.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, the X-Axis and Y-Axis data of the currently clicked location are retrieved from the <code>chartMouseClick</code> event arguments and converted into a new point. This point is then added to the existing data source using the <code>addPoint</code> method. If a point with the same coordinates already exists, it will be removed from the data source using the <code>removePoint</code> method.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use the line series, we need to inject the <code>LineSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the line series can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/line" aria-label="Navigate to the documentation for Line Chart in React Chart control">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default ClickAddPoint;
