/**
 * Sample for empty for Pie chart
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries, IAccLoadedEventArgs, EmptyPointMode, AccumulationTheme } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadAccumulationChartTheme, loadChartTheme } from './theme-color';
export let data1: any[] = [
    { x: 'Action', y: 35,}, { x: 'Drama', y: 25 }, { x: 'Comedy', y: null },
    { x: 'Romance', y: 20 }, { x: 'Horror', y: 10 }, { x: 'Sci-Fi', y: null }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PieEmptyPoint = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [emptyPointMode, setEmptyPointMode] = useState<EmptyPointMode>('Drop');
    let pie = useRef<AccumulationChartComponent>(null);
    let modeElement = useRef<DropDownListComponent>(null);
    const mode = (): void => {
        pie.current.series[0].emptyPointSettings.mode = modeElement.current.value as EmptyPointMode;
        pie.current.series[0].animation.enable = false;
        pie.current.refresh();
    };
    let droplist: { [key: string]: Object }[] = [
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];    
    const onChartLoad = (args: IAccLoadedEventArgs): void => {
        let chart: Element = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    const load = (args: IAccLoadedEventArgs): void => {
        let selectedTheme: string = loadAccumulationChartTheme(args);
        if(selectedTheme === 'Bootstrap5Dark'){
            args.chart.series[0].emptyPointSettings.fill = '#FF7F7F';
        }
    };
    const textRender = (args: { text: string; point: { x: string; y: string; }; }) => {
        args.text = args.point.x + ": $" + args.point.y + "K";
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <AccumulationChartComponent id='pie-chart' ref={pie} title='Movie Genre Revenue Share' load={load.bind(this)} textRender={textRender.bind(this)} legendSettings={{ visible: false }} tooltip={{ enable: true, header: "", format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>', enableHighlight: true }} enableBorderOnMouseMove={false} loaded={onChartLoad.bind(this)}>
                        <Inject services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' radius="80%" name='Profit' borderRadius={3} border={{ width: 1, color: '#ffffff' }} dataLabel={{ visible: true, position: 'Inside', enableRotation: true, font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' } }} emptyPointSettings={{ fill: '#e6e6e6', mode: emptyPointMode }}/>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Empty Point Mode: </div></td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="selmode" change={mode.bind(this)} ref={modeElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value={emptyPointMode} />
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates the movie genre revenue share with empty point functionality in the pie series. The Mode of empty point can be changed by using <code>Empty Point Mode</code> in property panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the pie series with empty points. The empty point in the chart can be handled using the <code>EmptyPointSettings</code> property.
                </p>
                <p><code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p>
                    More information on the empty points can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/empty-points/" aria-label="Navigate to the documentation for Empty Points in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default PieEmptyPoint;
