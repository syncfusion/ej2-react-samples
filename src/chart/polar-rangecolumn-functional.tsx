/**
 * Sample for Polar Series with drawType RangeColumn
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType, DataLabel, RangeColumnSeries, Category, Tooltip, ILoadedEventArgs, PolarSeries, RadarSeries, ChartTheme } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'Jan', low: 2, high: 7 }, { x: 'Feb', low: 3, high: 7 },
    { x: 'Mar', low: 3, high: 7 }, { x: 'Apr', low: 4, high: 9 },
    { x: 'May', low: 6, high: 11 }, { x: 'June', low: 8, high: 14 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarRangeColumn = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [type, setType] = useState<ChartSeriesType>('Polar');
    let chartInstance = useRef<ChartComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let loaded: EmitType<ILoadedEventArgs>;
    let droplist: { [key: string]: Object }[] = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];

    const onChartLoad = (args: ILoadedEventArgs): void => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    const change = (): void => {
        chartInstance.current.series[0].type = dropElement.current.value as ChartSeriesType;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.refresh();
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', title: 'month', labelPlacement: 'OnTicks', interval: 1, coefficient: Browser.isDevice ? 80 : 100 }} primaryYAxis={{ labelFormat: '{value}', minimum: 0, maximum: 15, interval: 5 }} title='Temperatures of Germany' loaded={onChartLoad.bind(this)} load={load.bind(this)} tooltip = {{ enable: true, header: " ", format: "<b>${point.x}</b> <br> Low : <b>${point.low}°C</b> <br> High : <b>${point.high}°C" }} legendSettings={{ visible: false }}>
                        <Inject services={[RangeColumnSeries, Tooltip, Category, PolarSeries, RadarSeries, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' low='low' high='high' type={type} drawType='RangeColumn' name="Germany" border={{ width: 3, color: 'white' }} marker={{ dataLabel: { visible: true, position: 'Top', font: { color: '#ffffff', fontWeight: '600' }, enableRotation: true } }} />
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
                <p>This sample shows minimum and maximum temperature variations in polar and radar charts using a range column series.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure polar and radar charts with a range column series. Switching between polar and radar series can be done using <b>Series Type</b> in the property panel.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#range-column" aria-label="Navigate to the documentation for Polar Range Column in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PolarRangeColumn;