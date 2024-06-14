/**
 * Sample for Step Area series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, ILoadedEventArgs, ChartTheme, SeriesCollectionDirective, SeriesDirective, Tooltip, Inject, Legend, StepAreaSeries, Highlight } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data = [
    { x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 },
    { x: 2003, y: 500 }, { x: 2004, y: 449 }, { x: 2005, y: 470 },
    { x: 2006, y: 437 }, { x: 2007, y: 458 }, { x: 2008, y: 500 },
    { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 520 }
];
export let data1 = [
    { x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 },
    { x: 2003, y: 200 }, { x: 2004, y: 229 }, { x: 2005, y: 210 },
    { x: 2006, y: 337 }, { x: 2007, y: 258 }, { x: 2008, y: 300 },
    { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 220 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const StepArea = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'Double', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} load={load.bind(this)} primaryYAxis={{ title: 'Production (Billion as kWh)', valueType: 'Double', labelFormat: '{value}B', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} legendSettings={{ enableHighlight: true }} tooltip={{ enable: true }} loaded={onChartLoad.bind(this)} title="Electricity- Production">
                    <Inject services={[StepAreaSeries, Tooltip, Legend, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName="x" yName="y" name="Renewable" width={2} type="StepArea" opacity={0.6} border={{ width: 2 }}></SeriesDirective>
                        <SeriesDirective dataSource={data1} xName="x" yName="y" name="Non-Renewable" width={2} opacity={0.6} type="StepArea" border={{ width: 2 }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This React Step Area Chart example visualizes electricity generation data using renewable and non-renewable resources  in a step area chart.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure a step area chart. This series forms a step progress by connecting points through vertical and horizontal lines with the area being filled.</p>
                <br></br>
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