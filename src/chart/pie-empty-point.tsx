/**
 * Sample for empty for Pie chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries, IAccLoadedEventArgs, EmptyPointMode,
    AccumulationTheme
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'Action', y: 35,}, { x: 'Drama', y: 25 }, { x: 'Comedy', y: null },
    { x: 'Romance', y: 20 }, { x: 'Horror', y: 10 }, { x: 'Sci-Fi', y: null }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class PieEmptyPoint extends SampleBase<{}, {}> {
    private pie: AccumulationChartComponent;
    private modeElement: DropDownListComponent;
    private mode(): void {
        this.pie.series[0].emptyPointSettings.mode = this.modeElement.value as EmptyPointMode;
        this.pie.series[0].animation.enable = false;
        this.pie.refresh();
    };
    private droplist: { [key: string]: Object }[] = [
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                <div className='col-md-8'>
                <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie} title='Movie Genre Revenue Share' load={this.load.bind(this)} textRender={this.textRender.bind(this)} legendSettings={{ visible: false }} tooltip={{ enable: true,header:"", format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>', enableHighlight: true }}   enableBorderOnMouseMove={false} loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]}/>
                            <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' radius="80%" name='Profit' borderRadius={3} border={{ width: 1, color: '#ffffff' }} dataLabel={{ visible: true, position: 'Inside', enableRotation: true, font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' } }} emptyPointSettings={{ fill: '#e6e6e6' }}> 
                                </AccumulationSeriesDirective>
                            </AccumulationSeriesCollectionDirective>
                        </AccumulationChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody> <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Empty Point Mode: </div></td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="selmode" change={this.mode.bind(this)} ref={d => this.modeElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Drop" />
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
                    <p>
                        <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                    <p>
                        More information on the empty points can be found in this &nbsp;
                    <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/empty-points/" aria-label="Navigate to the documentation for Empty Points in React Accumulation Chart component">documentation section</a>.
                </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: IAccLoadedEventArgs): void {
        let chart: Element = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
        
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as AccumulationTheme;
            args.chart.series[0]!.dataLabel!.font!.color = selectedTheme === 'bootstrap5-dark' || selectedTheme === 'tailwind-dark' ? 'black' : args.chart.series[0]?.dataLabel?.font?.color;
    };
    
    textRender(args: { text: string; point: { x: string; y: string; }; })
    {
        args.text = args.point.x + ": $" + args.point.y + "K";
    }
        
}