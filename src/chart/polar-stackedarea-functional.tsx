/**
 * Sample for Polar Series with drawType StackingArea
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType, Legend, Category, StackingAreaSeries, ILoadedEventArgs, PolarSeries, RadarSeries, Tooltip, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'JPN', text: 'Japan', y: 5156, y1: 4849, y2: 4382, y3: 4939 },
    { x: 'DEU', text: 'Germany', y: 3754, y1: 3885, y2: 3365, y3: 3467 },
    { x: 'FRA', text: 'France', y: 2809, y1: 2844, y2: 2420, y3: 2463 },
    { x: 'GBR', text: Browser.isDevice ? 'UK' : 'United Kingdom', y: 2721, y1: 3002, y2: 2863, y3: 2629 },
    { x: 'BRA', text: 'Brazil', y: 2472, y1: 2456, y2: 1801, y3: 1799 },
    { x: 'RUS', text: 'Russia', y: 2231, y1: 2064, y2: 1366, y3: 1281 },
    { x: 'ITA', text: 'Italy', y: 2131, y1: 2155, y2: 1826, y3: 1851 },
    { x: 'IND', text: 'India', y: 1857, y1: 2034, y2: 2088, y3: 2256 },
    { x: 'CAN', text: 'Canada', y: 1843, y1: 1793, y2: 1553, y3: 1529 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarStackedArea = () => {
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
        chartInstance.current.series[0].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[1].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[2].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[3].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.series[2].animation.enable = false;
        chartInstance.current.series[3].animation.enable = false;
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
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', labelPlacement: 'OnTicks', interval: 1, coefficient: Browser.isDevice ? 80 : 100 }} load={load.bind(this)} legendSettings= {{ visible: true, enableHighlight: true }} title="GDP in Current Prices (USD Billion)" tooltip={{ enable: true }} loaded={onChartLoad.bind(this)}>
                        <Inject services={[StackingAreaSeries, Legend, Category, Highlight, PolarSeries, RadarSeries, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='text' yName='y' name='2013' type={type} drawType='StackingArea' />
                            <SeriesDirective dataSource={data1} xName='text' yName='y1' name='2014' type={type} drawType='StackingArea' />
                            <SeriesDirective dataSource={data1} xName='text' yName='y2' name='2015' type={type} drawType='StackingArea' />
                            <SeriesDirective dataSource={data1} xName='text' yName='y3' name='2016' type={type} drawType='StackingArea' />
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
                <p>This sample shows GDP growth of various countries for a few years in the polar and radar charts using the stacked area series.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure polar and radar charts with stacking area series. Switching between polar and radar series can be done using Series Type in the property panel.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject <code>StackingAreaSeries</code>, <code>PolarSeries</code> and <code>SRadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/polar-radar/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PolarStackedArea;