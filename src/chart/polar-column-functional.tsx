/**
 * Sample for Polar Series with drawType Column
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType, Legend, Category, ILoadedEventArgs, PolarSeries, RadarSeries, Tooltip, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { text: 'Japan', x: 'JPN', y: 137.9, y1: 127.6, y2: 108.8 },
    { text: 'Indonesia', x: 'Indonesia', y: 85.0, y1: 246.9, y2: 45.5 },
    { text: 'Russia', x: 'RUS', y: 237.1, y1: 143.5, y2: 41.2 },
    { text: 'Vietnam', x: 'VNM', y: 127.7, y1: 88.8, y2: 18.0 },
    { text: 'Pakistan', x: 'PAK', y: 126.1, y1: 179.2, y2: null },
    { text: 'Nigeria', x: 'NGA', y: 175.0, y1: 168.8, y2: 12.7 },
    { text: 'Germany', x: 'DEU', y: 113.6, y1: 81.9, y2: 46.0 },
    { text: 'Bangladesh', x: 'BGS', y: 116.0, y1: 154.7, y2: 34.6 },
    { text: 'Philippines', x: 'PHL', y: 109.5, y1: 96.7, y2: 16.6 },
    { text: 'Mexico', x: 'MEX', y: 102.7, y1: 120.8, y2: 19.8 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarColumn = () => {
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
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', labelPlacement: 'OnTicks', coefficient: Browser.isDevice ? 80 : 100, interval: 1 }} primaryYAxis={{ labelFormat: '{value}M' }} load={load.bind(this)} legendSettings= {{ visible: true, enableHighlight: true }} title="Top 10 Mobile Markets by Number of Subscriptions" loaded={onChartLoad.bind(this)} tooltip={{ enable: true, header: "", format: '<b>${point.text}</b> <br> ${series.name} : <b>${point.y}</b>' }}>
                        <Inject services={[Legend, Category, PolarSeries, RadarSeries,Highlight, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='text' yName='y' name='Population' type={type} drawType='Column' border={{ color: 'white', width: 1 }} marker={{ dataLabel: { name: 'text' } }} />
                            <SeriesDirective dataSource={data1} xName='text' yName='y1' name='Mobile Subscriptions' type={type} drawType='Column' border={{ color: 'white', width: 1 }} marker={{ dataLabel: { name: 'text' } }} />
                            <SeriesDirective dataSource={data1} xName='text' yName='y2' name='3G/4G Subscriptions' type={type} drawType='Column' border={{ color: 'white', width: 1 }} marker={{ dataLabel: { name: 'text' } }} />
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
                <p>This sample shows the top 10 mobile markets by the number of subscriptions in polar and radar charts using column series.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure polar and radar charts with a column series. Switching between polar and radar series can be done using <b>Series Type</b> in the property panel.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                    <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/polar-radar/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PolarColumn;