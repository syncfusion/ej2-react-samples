/**
 * Sample for Crosshair in chart
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, AxesDirective, AxisDirective, Inject, LineSeries, HiloOpenCloseSeries, Crosshair, DateTime, ILoadedEventArgs, ChartTheme, Zoom, Category, SplineAreaSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { axesData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Crosshair sample
 */
const SAMPLE_CSS = `
    #control-container {
        padding: 0px !important;
    }

    #material-gradient-chart stop {
        stop-color: #00bdae;
    }

    #fabric-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #bootstrap4-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #fluent-gradient-chart stop {
        stop-color: #1AC9E6;
    }
    #fluent-dark-gradient-chart stop {
        stop-color: #1AC9E6;
    }

    #highcontrast-gradient-chart stop {
        stop-color: #79ECE4;
    }

    #tailwind-gradient-chart stop {
        stop-color: #5A61F6;
    }

    #tailwind3-gradient-chart stop {
        stop-color: #2F4074;
    }

    #bootstrap5-gradient-chart stop {
        stop-color: #FD7E14;
    }

    #material-dark-gradient-chart stop {
        stop-color: #9ECB08;
    }

    #fabric-dark-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-dark-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #tailwind-dark-gradient-chart stop {
        stop-color: #8B5CF6;
    }

    #tailwind3-dark-gradient-chart stop {
        stop-color: #8029F1;
    }

    #bootstrap5-dark-gradient-chart stop {
        stop-color: #FD7E14;
    }

    #material3-gradient-chart stop {
        stop-color: #6355C7;
    }

    #material3-dark-gradient-chart stop {
        stop-color: #4EAAFF;
    }

    #fluent2-gradient-chart stop {
        stop-color: #6200EE;
    }

    #fluent2-highcontrast-gradient-chart stop {
        stop-color: #9BB449;
    }

    #fluent2-dark-gradient-chart stop {
        stop-color: #9BB449;
    }

    .chart-gradient stop[offset="0"] {
        stop-opacity: 0.50;
    }

    .chart-gradient stop[offset="0.3"] {
        stop-opacity: 0.40;
    }
    .chart-gradient stop[offset="0.6"] {
        stop-opacity: 0.2;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0;
    }
`
const CrosshairChart = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    const theme = (selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
    let borderColor: string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
    const fill = 'url(#' + selectedTheme + '-gradient-chart)';
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        args.chart.series[0].border = { width: 2, color: borderColor[themes.indexOf(args.chart.theme.toLowerCase())] };
    };
    return (
        <div className='control-pane'>
                         <style>{SAMPLE_CSS}</style>
                <svg style={{ height: 0 }}>
  <defs>
    <linearGradient id="material-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="fabric-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="bootstrap-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="bootstrap4-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="tailwind-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="tailwind3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0"></stop>
        <stop offset="0.3"></stop>
        <stop offset="0.6"></stop>
        <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="bootstrap5-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="material-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="fabric-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="bootstrap-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="tailwind-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="tailwind3-dark-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="0.3"></stop>
            <stop offset="0.6"></stop>
            <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="bootstrap5-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="fluent-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="fluent-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="material3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="fluent2-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="fluent2-highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
    <linearGradient id="fluent2-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0"></stop>
      <stop offset="0.3"></stop>
      <stop offset="0.6"></stop>
      <stop offset="1"></stop>
    </linearGradient>
  </defs>
</svg>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }}                        primaryXAxis={{
                            valueType: 'Category',
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                        }}
                        load={load.bind(this)}
                        primaryYAxis={{
                            title: "Stock Value",
                            crosshairTooltip: { enable: true },
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                            maximum: 318,
                            minimum: 288
                        }}
                        tooltip={{
                            enable: true,
                            shared: true,
                            location: { x: 70, y:52 },
                            format: '<b>${point.x}</b> <br>Stock Price : <b>${point.y}</b>',
                            header: '',
                            enableMarker: false
                        }}
                        chartArea={{border:{width: 0}}}
                        width={Browser.isDevice ? '100%' : '75%'}
                        title='Intraday Stock Price Movement' loaded={onChartLoad.bind(this)}
                        crosshair={{ enable: true, snapToData: true, dashArray: '5,5' }}
                        legendSettings={{ visible: false }}>
                        <Inject services={[SplineAreaSeries, Crosshair, Category, DateTime, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource= {[
                                        { time: '09:00', value: 289.92 },
                                        { time: '09:05', value: 289.33 },
                                        { time: '09:10', value: 289.73 },
                                        { time: '09:15', value: 299.39 },
                                        { time: '09:20', value: 298.95 },
                                        { time: '09:25', value: 297.14 },
                                        { time: '09:30', value: 297.13 },
                                        { time: '09:35', value: 296.63 },
                                        { time: '09:40', value: 293.42 },
                                        { time: '09:45', value: 295.84 },
                                        { time: '09:50', value: 297.90 },
                                        { time: '09:55', value: 298.07 },
                                        { time: '10:00', value: 300.50 },
                                        { time: '10:05', value: 300.75 },
                                        { time: '10:10', value: 301.39 },
                                        { time: '10:15', value: 305.91 },
                                        { time: '10:20', value: 305.19 },
                                        { time: '10:25', value: 304.72 },
                                        { time: '10:30', value: 304.40 },
                                        { time: '10:35', value: 303.64 },
                                        { time: '10:40', value: 302.80 },
                                        { time: '10:45', value: 302.08 },
                                        { time: '10:50', value: 301.90 },
                                        { time: '10:55', value: 300.62 },
                                        { time: '11:00', value: 297.24 },
                                        { time: '11:05', value: 297.49 },
                                        { time: '11:10', value: 297.37 },
                                        { time: '11:15', value: 297.10 },
                                        { time: '11:20', value: 296.84 },
                                        { time: '11:25', value: 296.07 },
                                        { time: '11:30', value: 292.96 },
                                        { time: '11:35', value: 296.05 },
                                        { time: '11:40', value: 294.97 },
                                        { time: '11:45', value: 297.45 },
                                        { time: '11:50', value: 291.37 },
                                        { time: '11:55', value: 296.01 },
                                        { time: '12:00', value: 294.21 },
                                        { time: '12:05', value: 294.77 },
                                        { time: '12:10', value: 293.22 },
                                        { time: '12:15', value: 293.50 },
                                        { time: '12:20', value: 293.78 },
                                        { time: '12:25', value: 295.67 },
                                        { time: '12:30', value: 294.68 },
                                        { time: '12:35', value: 294.21 },
                                        { time: '12:40', value: 293.31 },
                                        { time: '12:45', value: 298.67 },
                                        { time: '12:50', value: 292.96 },
                                        { time: '12:55', value: 293.29 },
                                        { time: '13:00', value: 293.65 },
                                        { time: '13:05', value: 293.60 },
                                        { time: '13:10', value: 293.43 },
                                        { time: '13:15', value: 292.48 },
                                        { time: '13:20', value: 292.21 },
                                        { time: '13:25', value: 291.46 },
                                        { time: '13:30', value: 292.20 },
                                        { time: '13:35', value: 293.68 },
                                        { time: '13:40', value: 291.76 },
                                        { time: '13:45', value: 291.40 },
                                        { time: '13:50', value: 290.75 },
                                        { time: '13:55', value: 294.13 },
                                        { time: '14:00', value: 296.75 },
                                        { time: '14:05', value: 297.97 },
                                        { time: '14:10', value: 299.41 },
                                        { time: '14:15', value: 300.87 },
                                        { time: '14:20', value: 300.82 },
                                        { time: '14:25', value: 301.87 },
                                        { time: '14:30', value: 300.80 },
                                        { time: '14:35', value: 301.33 },
                                        { time: '14:40', value: 301.83 },
                                        { time: '14:45', value: 303.68 },
                                        { time: '14:50', value: 303.01 },
                                        { time: '14:55', value: 303.97 },
                                        { time: '15:00', value: 303.86 },
                                        { time: '15:05', value: 306.28 },
                                        { time: '15:10', value: 304.54 },
                                        { time: '15:15', value: 304.23 },
                                        { time: '15:20', value: 301.14 },
                                        { time: '15:25', value: 302.12 },
                                        { time: '15:30', value: 301.91 },
                                        { time: '15:35', value: 304.58 },
                                        { time: '15:40', value: 302.32 },
                                        { time: '15:45', value: 302.89 },
                                        { time: '15:50', value: 302.45 },
                                        { time: '15:55', value: 302.12 },
                                        { time: '16:00', value: 302.76 },
                                        { time: '16:05', value: 303.23 },
                                        { time: '16:10', value: 303.98 },
                                        { time: '16:15', value: 304.54 },
                                        { time: '16:20', value: 304.01 },
                                        { time: '16:25', value: 304.67 },
                                        { time: '16:30', value: 305.12 },
                                        { time: '16:35', value: 305.45 },
                                        { time: '16:40', value: 306.23 },
                                        { time: '16:45', value: 306.87 },
                                        { time: '16:50', value: 306.32 },
                                        { time: '16:55', value: 307.98 },
                                        { time: '17:00', value: 310.65 },
                                        { time: '17:05', value: 309.43 },
                                        { time: '17:10', value: 308.21 },
                                        { time: '17:15', value: 307.89 },
                                        { time: '17:20', value: 307.54 },
                                        { time: '17:25', value: 305.32 },
                                        { time: '17:30', value: 305.76 },
                                        { time: '17:35', value: 304.23 },
                                        { time: '17:40', value: 304.65 },
                                        { time: '17:45', value: 304.01 },
                                        { time: '17:50', value: 304.43 },
                                        { time: '17:55', value: 305.76 },
                                        { time: '18:00', value: 305.12 },
                                        { time: '18:05', value: 306.45 },
                                        { time: '18:10', value: 306.23 },
                                        { time: '18:15', value: 304.98 },
                                        { time: '18:20', value: 304.65 },
                                        { time: '18:25', value: 304.32 },
                                        { time: '18:30', value: 304.98 },
                                        { time: '18:35', value: 303.65 },
                                        { time: '18:40', value: 303.32 },
                                        { time: '18:45', value: 303.01 },
                                        { time: '18:50', value: 302.76 },
                                        { time: '18:55', value: 301.54 },
                                        { time: '19:00', value: 301.32 },
                                        { time: '19:05', value: 301.21 },
                                        { time: '19:10', value: 300.43 },
                                        { time: '19:15', value: 300.76 },
                                        { time: '19:20', value: 301.12 },
                                        { time: '19:25', value: 301.54 },
                                        { time: '19:30', value: 300.89 },
                                        { time: '19:35', value: 300.23 },
                                        { time: '19:40', value: 300.56 },
                                        { time: '19:45', value: 299.87 }
                                ]}
                                border={{ width: 1.5 }}
                                xName='time' width={2}
                                yName='value'
                                name="Stock Value"
                                fill= {fill}
                                type="SplineArea"
                                animation={{enable: false}} >
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample depicts the crosshair behavior in the charts. To view the crosshair and its tooltip, hover over the chart or tap on it in touch-enabled devices.</p>
            </div>
            <div id="description">
                <p>The crosshair is used to inspect or focus on an individual data point using a vertical and a horizontal line. You can enable the crosshair using the <a target="_blank" href="https://ej2.syncfusion.com/documentation/api/chart/crosshairSettings/#enable" aria-label="Navigate to the enable property reference for TypeScript Chart CrosshairSettings">enable</a> property in the <code>chartCrosshairSettings</code> class and customize its tooltip by using the <code>chartAxisCrosshairTooltip</code> in the axis.
                </p>
                <p>
                    The <code>snapToData</code> property snaps the crosshair to the nearest data point instead of following the exact mouse position, providing a more precise focus on data points.
                </p>
                <br />
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Crosshair, we need to inject <code>Crosshair</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the Crosshair can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball" aria-label="Navigate to the documentation for Crosshair in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default CrosshairChart;