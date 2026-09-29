/**
 * Sample for Stacked Column with Smart Labels
 */
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    Legend,
    Category,
    StackingColumnSeries,
    Tooltip,
    Highlight,
    DataLabel,
    ILoadedEventArgs,
    ITextRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

export let data1: Object[] = [
    { x: 'Q1 2025', samsung: 72.3, apple: 56.2, xiaomi: 42.7, oppo: 7.4, vivo: 5.2, others: 70.7 },
    { x: 'Q2 2025', samsung: 75.9, apple: 57.1, xiaomi: 43.9, oppo: 6.2, vivo: 3.9, others: 4.9 },
    { x: 'Q3 2025', samsung: 80.1, apple: 60.3, xiaomi: 46.0, oppo: 4.8, vivo: 3.9, others: 78.9 },
    { x: 'Q4 2025', samsung: 85.5, apple: 62.7, xiaomi: 48.9, oppo: 6.4, vivo: 5.8, others: 81.5 }
];

const SERIES_COLORS: string[] = ['#6355C7', '#00AEE0', '#FFB400', '#4CAF50', '#E56590', '#9B59B6'];
const SMALL_VALUE_THRESHOLD: number = 3;

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const StackedSmartLabels = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const chartInstance: React.RefObject<ChartComponent> = useRef<ChartComponent>(null);

    const onChartLoad = (args: ILoadedEventArgs): void => {
        const chart = document.getElementById('charts');
        if (chart) {
            chart.setAttribute('title', '');
        }
    };

    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };

    const createSmartLabelSettings = (seriesColor: string): any => {
        return {
            visible: true,
            position: 'Top',
            format: '{value}M',
            labelIntersectAction: 'RelocateHorizontally',
            font: {
                color: '#FFFFFF',
                fontWeight: '700',
                size: Browser.isDevice ? '10px' : '12px',
                fontFamily: 'Segoe UI'
            },
            margin: { left: 24, right: 24, top: 12, bottom: 12 },
            smartLabelSettings: {
                background: seriesColor,
                border: { color: seriesColor, width: 1.5 },
                connectorLineStyle: { color: seriesColor, width: 2 },
                pointerShape: 'Arrow'
            },
            rx: 7,
            ry: 7
        };
    };

    const hideTinyLabels = (args: ITextRenderEventArgs): void => {
        if (!args.point || typeof args.point.y !== 'number') {
            return;
        }
        if (args.point.y < SMALL_VALUE_THRESHOLD) {
            args.cancel = true;
        }
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent
                    id='charts'
                    ref={chartInstance}
                    style={{ textAlign: 'center' }}
                    primaryXAxis={{
                        valueType: 'Category',
                        visible: true,
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 }
                    }}
                    primaryYAxis={{
                        visible: true,
                        title: 'Shipments (Millions of Units)',
                        labelFormat: '{value}M',
                        minimum: 0,
                        maximum: 400,
                        interval: 50,
                        majorGridLines: { color: '#E2E8F0', width: 1 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 }
                    }}
                    chartArea={{ background: 'transparent', border: { width: 0 } }}
                    width='100%'
                    title='Global Smartphone Shipments by Vendor (2025)'
                    subTitle='Smart labels automatically reposition small stacked-segment labels to avoid overlap.'
                    legendSettings={{ visible: true, position: 'Bottom', enableHighlight: true }}
                    tooltip={{
                        enable: true,
                        shared: true,
                        format: '${series.name}: <b>${point.y}</b>',
                        header: '${point.x}'
                    }}
                    load={load.bind(this)}
                    loaded={onChartLoad.bind(this)}
                    textRender={hideTinyLabels}
                >
                    <Inject services={[StackingColumnSeries, Category, DataLabel, Tooltip, Legend, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='samsung' type='StackingColumn' name='Samsung' fill={SERIES_COLORS[0]} columnWidth={0.5} marker={{ dataLabel: createSmartLabelSettings(SERIES_COLORS[0]) }} />
                        <SeriesDirective dataSource={data1} xName='x' yName='apple' type='StackingColumn' name='Apple' fill={SERIES_COLORS[1]} columnWidth={0.5} marker={{ dataLabel: createSmartLabelSettings(SERIES_COLORS[1]) }} />
                        <SeriesDirective dataSource={data1} xName='x' yName='xiaomi' type='StackingColumn' name='Xiaomi' fill={SERIES_COLORS[2]} columnWidth={0.5} marker={{ dataLabel: createSmartLabelSettings(SERIES_COLORS[2]) }} />
                        <SeriesDirective dataSource={data1} xName='x' yName='oppo' type='StackingColumn' name='OPPO' fill={SERIES_COLORS[3]} columnWidth={0.5} marker={{ dataLabel: createSmartLabelSettings(SERIES_COLORS[3]) }} />
                        <SeriesDirective dataSource={data1} xName='x' yName='vivo' type='StackingColumn' name='vivo' fill={SERIES_COLORS[4]} columnWidth={0.5} marker={{ dataLabel: createSmartLabelSettings(SERIES_COLORS[4]) }} />
                        <SeriesDirective dataSource={data1} xName='x' yName='others' type='StackingColumn' name='Others' fill={SERIES_COLORS[5]} columnWidth={0.5} marker={{ dataLabel: createSmartLabelSettings(SERIES_COLORS[5]) }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id='action-description'>
                <p>
                    This React stacked column chart example demonstrates smart labels on stacked segments.
                    Data labels are automatically repositioned when space is limited, so the chart stays readable.
                </p>
            </div>
            <div id='description'>
                <p>
                    This example demonstrates the smart label feature in a stacked column chart.
                    When a stacked segment does not have enough space to display a data label, the label is automatically moved outside the segment and connected using a callout line.
                </p>
                <p>
                    <code>Smart Labels</code> provide intelligent label placement with the following features:
                </p>
                <ul>
                    <li>Automatic repositioning of labels when space is limited</li>
                    <li>Connector lines linking relocated labels to their corresponding segments</li>
                    <li>Series-based label and connector styling</li>
                    <li>Customizable label formatting and positioning options</li>
                </ul>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                </p>
                <p style={{ fontWeight: 500 }}><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking column series with smart labels, we need
                    to inject <code>StackingColumnSeries</code> and <code>DataLabel</code> modules.
                </p>
                <p>
                    More information on the stacking column series with smart labels can be found in this <a target='_blank' href='https://ej2.syncfusion.com/documentation/chart/data-labels/' aria-label='Navigate to the documentation for Smart Labels in React Chart component'>documentation section</a>.
                </p>
            </div>
        </div>
    );
};

export default StackedSmartLabels;
