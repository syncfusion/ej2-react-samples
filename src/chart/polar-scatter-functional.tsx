/**
 * Sample for Polar Series with drawType Scatter
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType, Legend, Category, ILoadedEventArgs, PolarSeries, RadarSeries, ScatterSeries, Tooltip, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { loadChartTheme } from './theme-color';
export let data1: any[] = [
    { text: 'Myanmar', x: 'MMR', y: 7.3, y1: 6.3, y2: 7.5 },
    { text: 'India', x: 'IND', y: 7.9, y1: 6.8, y2: 7.2 },
    { text: 'Bangladesh', x: 'BGD', y: 6.8, y1: 6.9, y2: 6.9 },
    { text: 'Cambodia', x: 'KHM', y: 7.0, y1: 7.0, y2: 6.9 },
    { text: 'China', x: 'CHN', y: 6.9, y1: 6.7, y2: 6.6 },
    { text: 'Bhutan', x: 'BTN', y: 6.1, y1: 6.2, y2: 5.9 },
    { text: 'Iceland', x: 'ISL', y: 4.1, y1: 7.2, y2: 5.7 },
    { text: 'Nepal', x: 'NPL', y: 2.7, y1: 0.6, y2: 5.5 },
    { text: 'Pakistan', x: 'PAK', y: 4.0, y1: 4.7, y2: 5.0 },
    { text: 'Poland', x: 'POL', y: 3.9, y1: 2.7, y2: 3.4 },
    { text: 'Australia', x: 'AUS', y: 2.4, y1: 2.5, y2: 3.1 },
    { text: 'Korea', x: 'KOR', y: 2.8, y1: 2.8, y2: 2.7 },
    { text: 'Singapore', x: 'SGP', y: 1.9, y1: 2.0, y2: 2. },
    { text: 'Canada', x: 'CAN', y: 0.9, y1: 1.4, y2: 1.9 },
    { text: 'Germany', x: 'DEU', y: 1.5, y1: 1.8, y2: 1.6 },
    { text: 'Denmark', x: 'DNK', y: 1.6, y1: 1.1, y2: 1.5 },
    { text: 'France', x: 'FRA', y: 1.3, y1: 1.3, y2: 1.4 },
    { text: 'Austria', x: 'AUT', y: 1.0, y1: 1.5, y2: 1.4 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarScatter = () => {
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
        loadChartTheme(args);
    };
    const change = (): void => {
        chartInstance.current.series[0].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[1].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[2].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.series[2].animation.enable = false;
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
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', labelPlacement: 'OnTicks', interval: 1, coefficient: Browser.isDevice ? 80 : 100 }} primaryYAxis={{ labelFormat: '{value}%', minimum: 0, maximum: 8, interval: 2 }} legendSettings= {{ visible: true, enableHighlight: true }} load={load.bind(this)} title="GDP by Countries" loaded={onChartLoad.bind(this)} tooltip={{ enable: true, format: '${point.text} : <b>${point.y}%</b>', enableHighlight: true }}>
                        <Inject services={[Legend, Category, PolarSeries, RadarSeries, Highlight, ScatterSeries, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='text' yName='y' name='2015' type={type} drawType='Scatter' marker={{ height: 7, width: 7, dataLabel: { name: 'text' } }} />
                            <SeriesDirective dataSource={data1} xName='text' yName='y1' name='2016' type={type} drawType='Scatter' marker={{ height: 7, width: 7, shape: 'Diamond', dataLabel: { name: 'text' } }} />
                            <SeriesDirective dataSource={data1} xName='text' yName='y2' name='2017' type={type} drawType='Scatter' marker={{ height: 7, width: 7, shape: 'Triangle', dataLabel: { name: 'text' } }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Series Type:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width={120} id="selmode" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value={type} />
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample shows GDP growth of different countries for a few years in the polar and radar charts using the scatter series.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure polar and radar charts with a scatter series. Switching between polar and radar series can be done using the <b>Series Type</b> in the property panel.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use scatter series, we need to inject <code>ScatterSeries</code>, <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#scatter" aria-label="Navigate to the documentation for Polar Scatter in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default PolarScatter;