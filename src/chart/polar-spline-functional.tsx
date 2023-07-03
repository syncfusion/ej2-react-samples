/**
 * Sample for Polar Series with drawType Spline
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, Legend, Category, SplineSeries, Tooltip, ILoadedEventArgs, PolarSeries, RadarSeries, ChartSeriesType, Highlight } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export function GetSplineData(): any {
    let cardData: Object[] = [];
    let biDirData: Object[] = [];
    let omniDirData: Object[] = [];
    let point1: Object;
    let point2: Object;
    for (let x: number = -180; x < 180; x++) {
        point1 = { x: x, y: -12.6 * (1 - Math.cos(x * 3.14 / 180)) };
        cardData.push(point1);
        point2 = { x: x, y: -3 };
        omniDirData.push(point2);
    }
    for (let x: number = -180; x < -90; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    for (let x: number = -90; x < 90; x++) {
        point1 = { x: x, y: -26 * (1 - Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    for (let x: number = 90; x < 180; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    return { 'series1': cardData, 'series2': omniDirData, 'series3': biDirData };
}
export let data1: any[] = GetSplineData().series1;
export let data2: any[] = GetSplineData().series2;
export let data3: any[] = GetSplineData().series3;
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarSpline = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [type, setType] = useState<ChartSeriesType>('Polar');
    let chartInstance = useRef<ChartComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let loaded: EmitType<ILoadedEventArgs>;

    const onChartLoad = (args: ILoadedEventArgs): void => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    const change = (): void => {
        setType(dropElement.current.value as ChartSeriesType);
        chartInstance.current.refresh();
    };
    let droplist: { [key: string]: Object }[] = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ minimum: -180, maximum: 180, interval: 30, labelFormat: '{value}°', coefficient: Browser.isDevice ? 80 : 100 }} legendSettings={{ enableHighlight :true }} load={load.bind(this)} title='Microphone Types Polar Patterns' loaded={onChartLoad.bind(this)} tooltip={{ enable: true }}>
                        <Inject services={[SplineSeries, Legend, Tooltip, Category, PolarSeries, RadarSeries, Highlight]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Cardioid (unidirectional)' type={type} drawType='Spline' dashArray='5 5 2' width={2} isClosed={false} />
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Omnidirectional' type={type} drawType='Spline' dashArray='2' width={2} isClosed={false} />
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Bidirectional' type={type} drawType='Spline' width={2} isClosed={false} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Series Type:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width={120} id="selmode" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value={type} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates polar series with spline type for the microphone type data. The switching between polar and radar series can be done by using <code>Series Type</code> in property panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the spline type charts. Spline chart connects each point in series through a curved line.
                    You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the spline. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                </p>
                <p> Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject
                    <code>SplineSeries</code>, <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/polar-radar/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PolarSpline;