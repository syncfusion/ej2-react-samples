/**
 * Sample for Polar Series with drawType Line
 */
import * as React from "react";
import { useEffect, useRef } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType, Tooltip, Legend, DataLabel, LineSeries, Category, ILoadedEventArgs, PolarSeries, RadarSeries, ChartTheme, Highlight } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'Jan', y: -7.1 },
    { x: 'Feb', y: -3.7 },
    { x: 'Mar', y: 0.8 },
    { x: 'Apr', y: 6.3 },
    { x: 'May', y: 13.3 },
    { x: 'Jun', y: 18.0 },
    { x: 'Jul', y: 19.8 },
    { x: 'Aug', y: 18.1 },
    { x: 'Sep', y: 13.1 },
    { x: 'Oct', y: 4.1 },
    { x: 'Nov', y: -3.8 },
    { x: 'Dec', y: -6.8 },
];
export let data2: any[] = [
    { x: 'Jan', y: -17.4 },
    { x: 'Feb', y: -15.6 },
    { x: 'Mar', y: -12.3 },
    { x: 'Apr', y: -5.3 },
    { x: 'May', y: 1.0 },
    { x: 'Jun', y: 6.9 },
    { x: 'Jul', y: 9.4 },
    { x: 'Aug', y: 7.6 },
    { x: 'Sep', y: 2.6 },
    { x: 'Oct', y: -4.9 },
    { x: 'Nov', y: -13.4 },
    { x: 'Dec', y: -16.4 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarLine = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [type, setType] = React.useState<ChartSeriesType>('Polar');
    const [isClosed, setIsClosed] = React.useState<boolean>(true);
    const [isInverse, setIsInverse] = React.useState<boolean>(false);
    const [angle, setAngle] = React.useState<number>(0);

    let chartInstance = useRef<ChartComponent>(null);
    let dropElement = useRef<DropDownListComponent>(null);
    let checkElement = useRef<HTMLInputElement>(null);
    let startangle = useRef<HTMLInputElement>(null);
    let inversed = useRef<HTMLInputElement>(null);
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    const change = (): void => {
        setType(dropElement.current.value as ChartSeriesType);
        chartInstance.current.refresh();
    };
    const closed = (): void => {
        setIsClosed(checkElement.current.checked);
        chartInstance.current.refresh();
    };
    const isInversed = (): void => {
        setIsInverse(inversed.current.checked);
        chartInstance.current.refresh();
    }
    const startAngle = (): void => {
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        setAngle(parseInt(startangle.current.value));
        chartInstance.current.refresh();
        chartInstance.current.series[0].animation.enable = true;
        chartInstance.current.series[1].animation.enable = true;
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ title: 'Months', valueType: 'Category', labelPlacement: 'OnTicks', interval: 1, coefficient: Browser.isDevice ? 80 : 100, isInversed: isInverse, startAngle: angle }} load={load.bind(this)} primaryYAxis={{ title: 'Temperature (Celsius)', minimum: -25, maximum: 25, interval: 10, edgeLabelPlacement: 'Shift', labelFormat: '{value}°C', isInversed: isInverse }} legendSettings= {{ visible: true, enableHighlight: true }} title='Alaska Weather Statistics - 2016' loaded={onChartLoad.bind(this)} tooltip={{ enable: true }}>
                        <Inject services={[LineSeries, Legend, DataLabel, Highlight, Category, PolarSeries, RadarSeries, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Germany' type='Polar' marker={{ visible: true, height: 7, width: 7, shape: 'Pentagon', isFilled: true }} width={2} />
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Italy' type='Polar' marker={{ visible: true, height: 7, width: 7, shape: 'Pentagon', isFilled: true }} width={2} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                        <a href="http://www.yr.no/place/USA/Alaska/Hatcher_Pass/statistics.html" target="_blank">www.yr.no</a>
                    </div>
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
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Closed: </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="isClosed" checked={isClosed} onChange={closed.bind(this)} style={{ marginLeft: '-5px' }} ref={checkElement} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div id="st-lbl">Start Angle: {angle}</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div data-role="rangeslider">
                                        <input type="range" defaultValue={angle} min="0" max="360" id="startangle" onChange={startAngle.bind(this)} style={{ marginLeft: '-5px' }} ref={startangle} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Inversed: </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <input type="checkbox" id="isinversed" defaultChecked={isInverse} onChange={isInversed.bind(this)} style={{ marginLeft: '-5px' }} ref={inversed} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This React Polar Radar Line Chart example visualizes data about Alaska Weather Statistics - 2016 with a default polar line series.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure polar and radar charts with a line series. The type of series can be changed using the <b>Series Type</b> dropdown list in the properties panel. Also, the angle can be changed and the series can be inversed using <code>Start Angle</code> and <code>Inversed</code> properties.
                </p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject
                    <code>LineSeries</code>, <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/polar-radar/">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default PolarLine;