import * as React from "react";
import { useEffect, useState, useRef } from 'react';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, ILoadedEventArgs, SplineSeries, DateTime, DataLabel, IAxisRangeCalculatedEventArgs, Series
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

const SAMPLE_CSS = `
.control-fluid {
    padding: 0px !important;
}
#spline_Series_0_Point_15_Symbol {
    -webkit-animation: opac 1s ease-out infinite;
    animation: opac 1s ease-out infinite;
}
@keyframes opac {
    0% {
        stroke-opacity: 1;
        stroke-width: 10px;
    }
    100% {
        stroke-opacity: 0;
        stroke-width: 20px;
    }
}`;

let splineData = [
    { x: new Date(2024, 5, 6, 6, 7, 3), y: 42 },
    { x: new Date(2024, 5, 6, 6, 7, 5), y: 52 },
    { x: new Date(2024, 5, 6, 6, 7, 7), y: 83 },
    { x: new Date(2024, 5, 6, 6, 7, 9), y: 75 },
    { x: new Date(2024, 5, 6, 6, 7, 11), y: 35 },
    { x: new Date(2024, 5, 6, 6, 7, 13), y: 85 },
    { x: new Date(2024, 5, 6, 6, 7, 15), y: 78 },
    { x: new Date(2024, 5, 6, 6, 7, 17), y: 29 },
    { x: new Date(2024, 5, 6, 6, 7, 19), y: 62 },
    { x: new Date(2024, 5, 6, 6, 7, 21), y: 95 },
    { x: new Date(2024, 5, 6, 6, 7, 23), y: 32 },
    { x: new Date(2024, 5, 6, 6, 7, 25), y: 76 },
    { x: new Date(2024, 5, 6, 6, 7, 27), y: 83 },
    { x: new Date(2024, 5, 6, 6, 7, 29), y: 53 },
    { x: new Date(2024, 5, 6, 6, 7, 31), y: 32 },
    { x: new Date(2024, 5, 6, 6, 7, 33), y: 75 },
];

const UpdateSpline = () => {
    let[intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        updateSampleSection();
        return () => {
            clearIntervalFn();
        };
    }, []);

    const loaded = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('spline');
        chart.setAttribute('title', '');
    };

    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
        clearIntervalFn(); // Clear any existing interval
        intervalId = setInterval(() => {
            if (document.getElementById('spline')) {
                if (args.chart && args.chart.series.length > 0 && args.chart.series[0].dataSource) {
                    var lastDataPointIndex = ((args.chart.series[0] as Series).dataSource as []).length - 1;
                    if (lastDataPointIndex >= 0) {
                        var timestamp = args.chart.series[0].dataSource[lastDataPointIndex].x;
                        var lastTimestamp = new Date(timestamp).getTime();
                        var x = new Date(lastTimestamp + 2000);
                        var y = 0;
                        if (x.getSeconds() % 3 === 0) {
                            y = Math.max(30, Math.random() * 150);
                        } else if (x.getSeconds() % 2 === 0) {
                            y = Math.max(30, Math.random() * 200);
                        } else {
                            y = Math.max(30, Math.random() * 100);
                        }
                        (args.chart.series[0] as Series).addPoint({ x: x, y: y }, 800);
                        (args.chart.series[0] as Series).removePoint(0, 800);
                    }
                }
            } else {
                clearIntervalFn();
            }
        }, 1000);
        if (intervalId) setIntervalId(intervalId);
    };

    const clearIntervalFn = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    const axisRangeCalculated = (args: IAxisRangeCalculatedEventArgs): void => {
        if (args.axis.name === 'primaryXAxis') {
            const lastPoint = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 500;
        }
    };

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='spline' style={{ textAlign: "center" }} 
                    primaryXAxis={{ valueType: 'DateTime', edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift', majorGridLines: { width: 0 }, labelRotation: Browser.isDevice ? 45 : 0, interval: 7, plotOffsetRight: 30, labelIntersectAction: 'Hide' }} 
                    primaryYAxis={{ title: 'Value', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, interval: 20 }} 
                    axisRangeCalculated={axisRangeCalculated.bind(this)}
                    chartArea={{ border: { width: 0 } }} 
                    load={load.bind(this)}
                    loaded={loaded.bind(this)} 
                    width={Browser.isDevice ? '100%' : '75%'} 
                    title='Live data' >
                    <Inject services={[SplineSeries, DateTime, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={splineData} xName='x' yName='y' type='Spline' width={2} marker={{ visible: true, isFilled: true, width: 7, height: 7 }} >
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how to add and remove data in a spline chart, allowing modification of the data at set intervals.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a spline chart to display data that updates every second using the <code>addPoint</code> method, with old data being removed using the <code>removePoint</code> method. The X-axis represents the time at which the data is added, while the Y-axis displays the data values.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use the spline series, we need to inject the <code>SplineSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the spline series can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline" aria-label="Navigate to the documentation for Spline Chart in React Chart control">documentation section</a>.
                </p>
            </div>
        </div>
    );
};

export default UpdateSpline;