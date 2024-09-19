import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, StepAreaSeries, Tooltip, ILoadedEventArgs, ChartTheme, Highlight, Legend } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
/**
 * StepLine Series
 */
export let data1 = [
    { x: new Date(1980, 0, 1), y: 23 },
    { x: new Date(1981, 0, 1), y: 89 },
    { x: new Date(1982, 0, 1), y: 45 },
    { x: new Date(1983, 0, 1), y: 67 },
    { x: new Date(1984, 0, 1), y: 76 },
    { x: new Date(1985, 0, 1), y: 34 },
    { x: new Date(1986, 0, 1), y: 90 },
    { x: new Date(1987, 0, 1), y: 65 },
    { x: new Date(1988, 0, 1), y: 77 },
    { x: new Date(1989, 0, 1), y: 43 },
    { x: new Date(1990, 0, 1), y: 92 },
    { x: new Date(1991, 0, 1), y: 81 },
    { x: new Date(1992, 0, 1), y: 65 },
    { x: new Date(1993, 0, 1), y: 87 },
    { x: new Date(1994, 0, 1), y: 50 },
    { x: new Date(1995, 0, 1), y: 98 },
    { x: new Date(1996, 0, 1), y: 62 },
    { x: new Date(1997, 0, 1), y: 75 },
    { x: new Date(1998, 0, 1), y: 64 },
    { x: new Date(1999, 0, 1), y: 88 },
    { x: new Date(2000, 0, 1), y: 99 },
    { x: new Date(2001, 0, 1), y: 77 },
    { x: new Date(2002, 0, 1), y: 65 },
    { x: new Date(2003, 0, 1), y: 89 },
    { x: new Date(2004, 0, 1), y: 45 },
    { x: new Date(2005, 0, 1), y: 67 },
    { x: new Date(2006, 0, 1), y: 56 },
    { x: new Date(2007, 0, 1), y: 78 },
    { x: new Date(2008, 0, 1), y: 82 },
    { x: new Date(2009, 0, 1), y: 90 },
    { x: new Date(2010, 0, 1), y: 55 },
    { x: new Date(2011, 0, 1), y: 65 },
    { x: new Date(2012, 0, 1), y: 87 },
    { x: new Date(2013, 0, 1), y: 76 },
    { x: new Date(2014, 0, 1), y: 45 },
    { x: new Date(2015, 0, 1), y: 67 },
    { x: new Date(2016, 0, 1), y: 89 },
    { x: new Date(2017, 0, 1), y: 76 },
    { x: new Date(2018, 0, 1), y: 45 },
    { x: new Date(2019, 0, 1), y: 67 },
    { x: new Date(2020, 0, 1), y: 89 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StepLineWithoutRiser = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }}
                    primaryXAxis={{
                        minimum: new Date(1980, 0, 1),
                        maximum: new Date(2020, 0, 1),
                        valueType: 'DateTime',
                        labelFormat: 'yyyy',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 },
                        minorTickLines: { width: 0 },
                        interval: 4,
                        labelIntersectAction: 'Rotate90'
                    }}
                    primaryYAxis={{
                        interval: 20,
                        title: 'Sales in Units',
                        labelFormat: '{value}',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minimum: 0,
                        maximum: 100
                    }}
                    load={load.bind(this)}
                    width={Browser.isDevice ? '100%' : '75%'}
                    chartArea={{ border: { width: 0 } }}
                    tooltip={{ enable: true, shared: true }}
                    title='Sales of Product Over Time'
                    legendSettings={{ visible: false }}
                    loaded={onChartLoad.bind(this)}>
                    <Inject services={[StepAreaSeries, Tooltip, DateTime, Highlight, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1}
                            xName='x'
                            yName='y'
                            type='StepArea'
                            name='Product Sales'
                            opacity={0.1}
                            border={{ width: 2.5 }}
                            noRisers={true}
                            step='Center'
                            marker={{ allowHighlight: false }}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This Step Area Chart example visualizes the sales data of a product over a 50-year period using the default step
                    area series without risers.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a step area chart without vertical risers. The
                    <code>noRisers</code> feature allows the series to appear as a continuous flow without showing vertical lines
                    between points. This approach can be useful for highlighting trends without the distraction of risers.
                </p>
                <p style={{ fontWeight: 500 }}><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use step area series, you need
                    to inject the <code>StepAreaSeries</code> module using the <code>Chart.Inject(StepAreaSeries)</code> method.
                </p>
                <p>
                    More information on the step area series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/documentation/chart/Chart-types/step-area"
                        aria-label="Navigate to the documentation for Step Area Chart in TypeScript Chart control">documentation
                        section</a>.
                </p>
            </div>
        </div>
    )
}
export default StepLineWithoutRiser;
