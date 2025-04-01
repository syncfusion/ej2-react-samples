/**
 * Sample for Step Area Series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Tooltip, StepAreaSeries, DataLabel, DateTime, IAxisLabelRenderEventArgs, ILoadedEventArgs, ITextRenderEventArgs, ChartTheme, Points } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

export let stepAreaData: Object[] = [
    { period: new Date(2023, 1, 1),  unit: 137 },
    { period: new Date(2023, 2, 1),  unit: 163 },
    { period: new Date(2023, 3, 1),  unit: 145 },
    { period: new Date(2023, 4, 1),  unit: 175 },
    { period: new Date(2023, 5, 1),  unit: 151 },
    { period: new Date(2023, 6, 1),  unit: 159 },
    { period: new Date(2023, 7, 1),  unit: 168 },
    { period: new Date(2023, 8, 1),  unit: 168 },
    { period: new Date(2023, 9, 1),  unit: 177 },
    { period: new Date(2023, 10, 1), unit: 147 },
    { period: new Date(2023, 11, 1), unit: 172 },
    { period: new Date(2024, 0, 1),  unit: 173 },
    { period: new Date(2024, 1, 2),  unit: 143 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const StepArea = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let previousYValue: number = null;

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
        previousYValue = null;
    };

    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };

    const axisLabelRender = (args: IAxisLabelRenderEventArgs): void => {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + 'K';
        }
    };

    const textRender = (args: ITextRenderEventArgs): void => {
        const point: Points = args.point;
        if (previousYValue !== null) {
            const difference: number = (point.y as number) - previousYValue;
            const triangleDirection: string = difference >= 0 ? 'border-bottom' : 'border-top';
            const triangleColor: string = difference >= 0 ? 'green' : 'red';
            const percentage: string = `${((difference / previousYValue) * 100).toFixed(1)}%`;

            args.template = `
                <div>${point.y}K</div>
                <div style="display: inline-block; vertical-align: middle;">
                    <div class="triangle" style="width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; ${triangleDirection}: 10px solid ${triangleColor}; display: inline-block; margin-right: 5px;"></div>
                </div>${percentage}`;
        }
        previousYValue = point.y as number;
    };

    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'DateTime', plotOffsetLeft: 50, plotOffsetRight: 50, labelFormat: 'MMM-yy', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ title: 'Units', opposedPosition: true, labelFormat: 'n0', minimum: 120, maximum: 200, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} width='90%' chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, showNearestTooltip: true, header: 'Unit Sold', format: '${point.x} : <b>${point.y}K</b>' }} title='Unit Sold Trend' subTitle='CM vs LM | By Month' load={load.bind(this)} loaded={onChartLoad.bind(this)} axisLabelRender={axisLabelRender.bind(this)} textRender={textRender.bind(this)}>
                    <Inject services={[StepAreaSeries, Tooltip, DataLabel, DateTime]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={stepAreaData} xName="period" yName="unit" step='Center' width={3} type="StepArea" opacity={0.5} marker={{ visible: true, width: 7, height: 7, isFilled: true, dataLabel: { visible: true, position: 'Auto', template: '<div>${point.y}K</div>' } }} border={{ width: 2 }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This React Step Area Chart example visualizes the trend of unit sales over several months. It highlights changes in sales units using a step area style, providing clear insights into how sales have fluctuated over time.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a step area chart. This series forms a step progress by connecting points through vertical and horizontal lines with the area being filled.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use step area series, we need to inject <code>StepAreaSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about area series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/step-area" aria-label="Navigate to the documentation for Step Area Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default StepArea;