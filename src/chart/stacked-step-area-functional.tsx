/**
 * Sample for Stacked Step Area series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, StackingStepAreaSeries, ILoadedEventArgs, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
export let data: any[] = [
    { x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 }, { x: 2003, y: 500 },
    { x: 2004, y: 449 }, { x: 2005, y: 470 }, { x: 2006, y: 437 }, { x: 2007, y: 458 },
    { x: 2008, y: 500 }, { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 520 }
];
export let data1: any[] = [
    { x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 }, { x: 2003, y: 200 },
    { x: 2004, y: 229 }, { x: 2005, y: 210 }, { x: 2006, y: 337 }, { x: 2007, y: 258 },
    { x: 2008, y: 300 }, { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 220 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StackedStepArea = () => {
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
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Double', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} load={load.bind(this)} primaryYAxis={{ title: 'Production (Billion as kWh)', valueType: 'Double', labelFormat: '{value}B', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ enableHighlight: true }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} loaded={onChartLoad.bind(this)} title='Electricity- Production'>
                    <Inject services={[StackingStepAreaSeries, Legend, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y' name='Renewable' type='StackingStepArea' fill="#56CCF2" opacity={0.5} border={{ width: 2.5 }} />
                        <SeriesDirective dataSource={data1} xName='x' yName='y' name='Non-Renewable' type='StackingStepArea' opacity={0.5} fill="#2F80ED" border={{ width: 2.5 }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample visualizes the data about electricity production using stacked stepped area chart.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the stacked step area chart. Both <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/marker/" aria-label="Navigate to the documentation for Data markers in React Chart component">marker</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/dataLabel/" aria-label="Navigate to the documentation for DataLabel in React Chart component">dataLabel</a> are used to represent individual data and its value.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking step area series, we need to inject <code>StackingStepArea</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the area type series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-step-area" aria-label="Navigate to the documentation for Stacked Step Area Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default StackedStepArea;