/**
 * Sample for error bar
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ErrorBar, ScatterSeries, Tooltip, Category,
    ILoadedEventArgs, ErrorBarMode, ErrorBarType, ErrorBarDirection, ChartTheme,
    IPointRenderEventArgs, Inject
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
export let data1: any[] = [
    { x: 'IND', y: 24 }, { x: 'AUS', y: 20 }, { x: 'USA', y: 35 },
    { x: 'DEU', y: 27 }, { x: 'ITA', y: 30 },
    { x: 'UK', y: 41 }, { x: 'RUS', y: 26 }
];
export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = fluentColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = fluentDarkColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function  ErrorBarChart() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let checkElement: CheckBoxComponent;
    let dropElement: DropDownListComponent;
    let modeElement: DropDownListComponent;
    let lengthElement: NumericTextBoxComponent;
    let widthElement: NumericTextBoxComponent;
    let vErrElement: NumericTextBoxComponent;
    let hErrElement: NumericTextBoxComponent;
    let directionElement: DropDownListComponent;
    function change(): void {
        chartInstance.series[0].errorBar.type = dropElement.value as ErrorBarType;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    };
    function mode(): void {
        chartInstance.series[0].errorBar.mode = modeElement.value as ErrorBarMode;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    };
   function errorBarVisible(): void {
        chartInstance.series[0].errorBar.visible = checkElement.checked;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
   function errDirection(): void {
        chartInstance.series[0].errorBar.direction = directionElement.value as ErrorBarDirection;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
   function vError(): void {
        chartInstance.series[0].errorBar.verticalError = vErrElement.value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
   function hError(): void {
        chartInstance.series[0].errorBar.horizontalError = hErrElement.value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
   let type: { [key: string]: Object }[] = [
        { value: 'Fixed' },
        { value: 'Percentage' },
        { value: 'StandardDeviation' },
        { value: 'StandardError' },
        { value: 'Custom' }
    ];
    let emode: { [key: string]: Object }[] = [
        { value: 'Vertical' },
        { value: 'Horizontal' },
        { value: 'Both' }
    ];
    let directions: { [key: string]: Object }[] = [
        { value: 'Both' },
        { value: 'Minus' },
        { value: 'Plus' }
    ];
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => chartInstance = chart}
                            primaryXAxis={{
                                valueType: 'Category', interval: 1,  majorTickLines: {width : 0},
                                minorTickLines: {width: 0},
                                majorGridLines: { width: 0 }
                            }}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                labelFormat: '{value}%', minimum: 15, maximum: 45,
                                lineStyle: { width: 0 }
                            }}
                            pointRender={pointRender}
                            load={load.bind(this)}
                            title="Sales Distribution of Car by Region" loaded={onChartLoad.bind(this)}
                            tooltip={{ enable: true }}>
                            <Inject services={[ScatterSeries, Category, ErrorBar, Tooltip]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' type='Scatter' marker={{ height: 10, width: 10 }}
                                    errorBar={{ visible: true, verticalError: 3, horizontalError: 3 }} width={2} >
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Error Bar Type: </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width={120} id="type" change={change.bind(this)} ref={d => dropElement = d} dataSource={type} fields={{ text: 'value', value: 'value' }} value="Fixed" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Drawing Mode: </div></td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width={120} id="modes" change={mode.bind(this)} ref={d => modeElement = d} dataSource={emode} fields={{ text: 'value', value: 'value' }} value="Vertical" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Drawing Direction: </div></td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width={120} id="directions" change={errDirection.bind(this)} ref={d => directionElement = d} dataSource={directions} fields={{ text: 'value', value: 'value' }} value="Both" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Vertical Error:</div>
                                    </td>
                                    <td style={{ padding: 10, width: '40%' }}>
                                        <NumericTextBoxComponent width={120} value={3} min={1} max={20} step={1} change={vError.bind(this)} ref={d => vErrElement = d} />
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Horizontal Error:</div>
                                    </td>
                                    <td style={{ padding: 10, width: '40%' }}>
                                        <NumericTextBoxComponent width={120} value={3} min={1} max={20} step={1} change={hError.bind(this)} ref={d => hErrElement = d} />
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the errors in sales distribution of a car for a certain period with error bar in the chart. In property panel, the options are available to change error bar type, drawing mode, and drawing direction of error bar by means of dropdown
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the error bar charts. Line type charts are used for cartesian type
                        series. You can use error bar by set <code>visible</code> property to true. You can change the error bar
                        rendering type using <code>type</code> property like fixedValue, percentage, standardDeviation, standardError and
                        custom option of errorBar. To change the error bar line length you can use <code>verticalError</code> property.
                    </p>
                    <p>Chart supports the following error bar types.</p>
                    <ul>
                        <li><code>Fixed</code> - Renders a fixed type error bar.</li>
                        <li><code>Percentage</code> - Renders a percentage type error bar.</li>
                        <li><code>StandardDeviation</code> - Renders a standard deviation type error bar.</li>
                        <li><code>StandardError</code> - Renders a standard error type error bar.</li>
                        <li><code>Custom</code> - Renders a custom type error bar.</li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use error bar, we need to inject
                        <code>ErrorBar</code> into the <code>@services</code> section.
                    </p>
                    <p>
                        More information on the smart axis labels can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/other-types/#error-bar-chart">documentation section</a>.
                    </p>
                </div>
            </div >
        )
    function onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light") as ChartTheme;
    };
}
export default ErrorBarChart;