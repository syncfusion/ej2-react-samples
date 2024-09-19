/**
 * Sample for local data
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, ILoadedEventArgs, ChartTheme, Tooltip, Crosshair, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const LocalData = () => {
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    const GetLocalData = (): any => {
        let series1: Object[] = [];
        let series2: Object[] = [];
        let point1: Object;
        let point2: Object;
        let value: number = 80;
        let value1: number = 90;
        let i: number;
        for (i = 1; i < 500; i++) {
            if (Math.random() > .5) {
                value += Math.random();
                value1 += Math.random();
            } else {
                value -= Math.random();
                value1 -= Math.random();
            }
            point1 = { x: new Date(1960, (i + 1), i), y: Math.round(value) };
            point2 = { x: new Date(1960, (i + 1), i), y: Math.round(value1) };
            series1.push(point1);
            series2.push(point2);
        }
        return { 'series1': series1, 'series2': series2 };
    }
    let data1: any[] = GetLocalData().series1;
    let data2: any[] = GetLocalData().series2;
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ skeleton: 'y', majorGridLines: { width: 0 }, valueType: 'DateTime', edgeLabelPlacement: 'Shift' }} load={load.bind(this)} primaryYAxis={{ title: 'Price', labelFormat: '${value}', rangePadding: 'None', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} crosshair={{ enable: true, line: { color: 'rgba(204,214,235,0.25)', width: Browser.isDevice ? 50 : 20 }, lineType: 'Vertical' }} legendSettings={{ visible: true, enableHighlight: true }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} width={Browser.isDevice ? '100%' : '75%'} title='Stock Price Analysis' loaded={onChartLoad.bind(this)}>
                    <Inject services={[LineSeries, DateTime, Legend, Crosshair, Highlight, Tooltip]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Product X' animation={{ enable: true }} type='Line' />
                        <SeriesDirective dataSource={data2} xName='x' yName='y' width={2} name='Product Y' animation={{ enable: true }} type='Line' />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the plotting of local data in a stock price analysis of two products over a period of time.</p>
            </div>
            <div id="description">
                <p>
                    The Charts control supports data binding. The <code>DataSource</code> property can be assigned either as list of objects or with instance of DataManager.
                </p>
                <p>In this demo, the list of objects is assigned as the data source to the Charts control. The chart can be bound to IEnumerable, IQueryable, and ObservableCollection data sources.</p>
                <p>
                    More information about the local data binding can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#local-data" aria-label="Navigate to the documentation for Local Data in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default LocalData;