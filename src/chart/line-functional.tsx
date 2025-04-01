/**
 * Sample for the Line Series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, LineSeries, Legend, Double, Tooltip, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let vietnamData: Object[] = [
    { x: 2016, y: 7.8 },
    { x: 2017, y: 10.3 },
    { x: 2018, y: 15.5 },
    { x: 2019, y: 17.5 },
    { x: 2020, y: 19.5 },
    { x: 2021, y: 23.0 },
    { x: 2022, y: 20.0 },
    { x: 2023, y: 19.0 },
    { x: 2024, y: 22.1 }
];

export let indonesiaData: Object[] = [
    { x: 2016, y: 4.8 },
    { x: 2017, y: 5.2 },
    { x: 2018, y: 6.2 },
    { x: 2019, y: 7.8 },
    { x: 2020, y: 9.3 },
    { x: 2021, y: 14.3 },
    { x: 2022, y: 15.6 },
    { x: 2023, y: 16.0 },
    { x: 2024, y: 17.0 }
];

export let franceData: Object[] = [
    { x: 2016, y: 14.6 },
    { x: 2017, y: 15.5 },
    { x: 2018, y: 15.4 },
    { x: 2019, y: 14.4 },
    { x: 2020, y: 11.6 },
    { x: 2021, y: 13.9 },
    { x: 2022, y: 12.1 },
    { x: 2023, y: 10.0 },
    { x: 2024, y: 10.8 }
];

export let polandData: Object[] = [
    { x: 2016, y: 8.9 },
    { x: 2017, y: 10.3 },
    { x: 2018, y: 10.8 },
    { x: 2019, y: 9.0 },
    { x: 2020, y: 7.9 },
    { x: 2021, y: 8.5 },
    { x: 2022, y: 7.4 },
    { x: 2023, y: 6.4 },
    { x: 2024, y: 7.1 }
];

export let mexicoData: Object[] = [
    { x: 2016, y: 19.0 },
    { x: 2017, y: 20.0 },
    { x: 2018, y: 20.2 },
    { x: 2019, y: 18.4 },
    { x: 2020, y: 16.8 },
    { x: 2021, y: 18.5 },
    { x: 2022, y: 18.4 },
    { x: 2023, y: 16.3 },
    { x: 2024, y: 13.7 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;
const Line = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };

    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'Double', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }} load={load.bind(this)} primaryYAxis={{ title: 'Volume in million metric tons', labelFormat: '{value}', rangePadding: 'None', minimum: 0, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} tooltip={{ enable: true, enableHighlight: true, showNearestTooltip: true, header: '<b>${series.name}</b>', format: '${point.x} : <b>${point.y}M</b>' }} legendSettings={{ enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} title="Annual Crude Steel Production by Country (2016–2024)" subTitle="Source: wikipedia.org" loaded={onChartLoad.bind(this)}>
                    <Inject services={[LineSeries, Double, Legend, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={vietnamData} xName="x" yName="y" name="Vietnam" width={2} marker={{ visible: true, width: 7, height: 7, shape: 'Circle', isFilled: true }} type="Line"></SeriesDirective>
                        <SeriesDirective dataSource={indonesiaData} xName="x" yName="y" name="Indonesia" width={2} marker={{ visible: true, width: 6, height: 6, shape: 'Triangle', isFilled: true }} type="Line"></SeriesDirective>
                        <SeriesDirective dataSource={franceData} xName="x" yName="y" name="France" width={2} marker={{ visible: true, width: 7, height: 7, shape: 'Diamond', isFilled: true }} type="Line"></SeriesDirective>
                        <SeriesDirective dataSource={polandData} xName="x" yName="y" name="Poland" width={2} marker={{ visible: true, width: 5, height: 5, shape: 'Rectangle', isFilled: true }} type="Line"></SeriesDirective>
                        <SeriesDirective dataSource={mexicoData} xName="x" yName="y" name="Mexico" width={2} marker={{ visible: true, width: 7, height: 7, shape: 'Pentagon', isFilled: true }} type="Line"></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This React Line Chart example represents the crude steel production annual growth data with default line series in the chart.
                    Data points are enhanced with marker and tooltip.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the line type charts. Line type charts are used to represent time-dependent data, showing trends in data at equal intervals.
                    You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the line. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use line series, we need to
                    inject <code>LineSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the line series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#line-charts" aria-label="Navigate to the documentation for Line Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Line;
