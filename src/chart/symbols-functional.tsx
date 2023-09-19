/**
 * Sample for Chart symbols
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, DataLabel, LineSeries, ILoadedEventArgs, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: 'World Wide', y: 12, y1: 22, y2: 38.3, y3: 50, text: 'World Wide' },
    { x: 'Europe', y: 9.9, y1: 26, y2: 45.2, y3: 63.6, text: 'Europe' },
    { x: 'Asia Pacific', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9, text: 'Asia Pacific' },
    { x: 'Latin America', y: 6.4, y1: 28, y2: 46.7, y3: 65.1, text: 'Latin America' },
    { x: 'Middle East Africa', y: 30, y1: 45.7, y2: 61.5, y3: 73, text: 'Middle East Africa' },
    { x: 'North America', y: 25.3, y1: 35.9, y2: 64, y3: 81.4, text: 'North America' }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const Symbols = () => {
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', majorGridLines: { width: 0 },  majorTickLines: {width : 0}, minorTickLines: {width: 0}, labelRotation: Browser.isDevice ? -45 : 0 }} load={load.bind(this)} primaryYAxis={{ title: 'Penetration', rangePadding: 'None', labelFormat: '{value}%', minimum: 0, lineStyle: { width: 0 }, maximum: 75, interval: 15 }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} title='FB Penetration of Internet Audience' loaded={onChartLoad.bind(this)} legendSettings={{ visible: true, enableHighlight: true }} tooltip={{ enable: true, header:"" ,format:"<b>${point.text}</b> <br> ${series.name} : <b>${point.y}</b>" }}>
                    <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y' width={2} name='2007' type='Line' marker={{ visible: true, dataLabel: { name: 'text' }, width: 8, height: 8, shape: 'Diamond', isFilled: true }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y1' width={2} name='2008' type='Line' marker={{ visible: true, dataLabel: { name: 'text' }, width: 8, height: 8, shape: 'Pentagon', isFilled: true }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y2' width={2} name='2009' type='Line' marker={{ visible: true, dataLabel: { name: 'text' }, width: 8, height: 8, shape: 'Triangle', isFilled: true }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                    <a href="http://www.marketingprofs.com/charts/2012/7064/facebook-stats-five-years-of-worldwide-growth" target="_blank">www.marketingprofs.com</a>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates Facebook users in a chart for different countries over several years. In a line-based series, data points can be annotated using symbols.</p>
            </div>
            <div id="description">
                <p>
                    Each points in a series can be represented as a symbol through marker. We can also customize the shape, size and color of a symbol through <code>marker</code> properties.
                </p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p>
                    More information on the marker can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/data-markers/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Symbols;