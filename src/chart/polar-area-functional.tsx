/**
 * Sample for Polar Series with drawType Area 
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType, Legend, Category, AreaSeries, ILoadedEventArgs, PolarSeries, RadarSeries, ChartTheme, Highlight, Tooltip } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let data1: any[] = [
    { x: '2000', y: 4 }, { x: '2001', y: 3.0 },
    { x: '2002', y: 3.8 }, { x: '2003', y: 3.4 },
    { x: '2004', y: 3.2 }, { x: '2005', y: 3.9 }
];
export let data2: any[] = [
    { x: '2000', y: 2.6 }, { x: '2001', y: 2.8 },
    { x: '2002', y: 2.6 }, { x: '2003', y: 3 },
    { x: '2004', y: 3.6 }, { x: '2005', y: 3 }
];
export let data3: any[] = [
    { x: '2000', y: 2.8 }, { x: '2001', y: 2.5 },
    { x: '2002', y: 2.8 }, { x: '2003', y: 3.2 },
    { x: '2004', y: 2.9 }, { x: '2005', y: 2 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarArea = () => {
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
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', labelPlacement: 'OnTicks', interval: 1, coefficient: Browser.isDevice ? 80 : 100 }} primaryYAxis={{ title: 'Revenue in Millions', labelFormat: '{value}M' }} legendSettings= {{ visible: true, enableHighlight: true }} tooltip={{ enable: true, enableHighlight: true }} load={load.bind(this)} title="Average Sales Comparison" loaded={onChartLoad.bind(this)}>
                        <Inject services={[AreaSeries, Legend, Category, PolarSeries, RadarSeries, Highlight, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Product A' width={2} opacity={0.5} type={type} drawType='Area' border={{ color: 'transparent' }} />
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Product B' width={2} opacity={0.5} type={type} drawType='Area' border={{ color: 'transparent' }} />
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Product C' width={2} opacity={0.5} type={type} drawType='Area' border={{ color: 'transparent' }} />
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
                <p>This sample shows the average product sales comparison for 6 years in polar and radar charts.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure polar and radar charts with an area series. Switching between polar and radar series can be done using <code>Series Type</code> in the property panel
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use area series, we need to 
                    inject <code>AreaSeries</code>, <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#area" aria-label="Navigate to the documentation for Polar Area in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PolarArea;
