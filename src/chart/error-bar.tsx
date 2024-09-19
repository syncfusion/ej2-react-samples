/**
 * Sample for error bar
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ErrorBar, ScatterSeries, Tooltip, Category, ILoadedEventArgs, ErrorBarMode, ErrorBarType, ErrorBarDirection, ChartTheme, ColumnSeries, Inject, IPointRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Browser } from "@syncfusion/ej2/base";

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
export class ErrorBarChart extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private checkElement: CheckBoxComponent;
    private dropElement: DropDownListComponent;
    private modeElement: DropDownListComponent;
    private lengthElement: NumericTextBoxComponent;
    private widthElement: NumericTextBoxComponent;
    private vErrElement: NumericTextBoxComponent;
    private hErrElement: NumericTextBoxComponent;
    private directionElement: DropDownListComponent;
    private change(): void {
        this.chartInstance.series[0].errorBar.type = this.dropElement.value as ErrorBarType;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private mode(): void {
        this.chartInstance.series[0].errorBar.mode = this.modeElement.value as ErrorBarMode;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private errorBarVisible(): void {
        this.chartInstance.series[0].errorBar.visible = this.checkElement.checked;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private errDirection(): void {
        this.chartInstance.series[0].errorBar.direction = this.directionElement.value as ErrorBarDirection;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private vError(): void {
        this.chartInstance.series[0].errorBar.verticalError = this.vErrElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private hError(): void {
        this.chartInstance.series[0].errorBar.horizontalError = this.hErrElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private type: { [key: string]: Object }[] = [
        { value: 'Fixed' },
        { value: 'Percentage' },
        { value: 'StandardDeviation' },
        { value: 'StandardError' },
        { value: 'Custom' }
    ];
    private emode: { [key: string]: Object }[] = [
        { value: 'Vertical' },
        { value: 'Horizontal' },
        { value: 'Both' }
    ];
    private directions: { [key: string]: Object }[] = [
        { value: 'Both' },
        { value: 'Minus' },
        { value: 'Plus' }
    ];
    public tooltipRender = (args): void => {
        args.text =  '<b>'+args.data.pointX + ' Count'  + ': ' + args.data.pointY  + '</b> (error range: ' + (args.data.pointY - args.series.visiblePoints[args.data.pointIndex].verticalError / 2 ) + '-' + (args.data.pointY + args.series.visiblePoints[args.data.pointIndex].verticalError / 2 ) + ')';
    };
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section ' style={{ textAlign: "center" }}>
                    <ChartComponent id='charts' primaryXAxis={{ valueType: 'Category', interval: 1,  majorTickLines: {width : 0}, minorTickLines: {width: 0}, majorGridLines: { width: 0 }, labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice ? "None" : "Rotate45"}} chartArea={{ border: { width: 0 } }} primaryYAxis={{ minimum: 0, maximum: 1250, interval: 250, lineStyle: { width: 0 }, title: 'Quantity' }} load={this.load.bind(this)} tooltipRender={this.tooltipRender.bind(this)} highlightColor= '' width={Browser.isDevice ? '100%' : '75%'} pointRender={pointRender.bind(this)} title="Quantity vs Items" loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true,  enableMarker: false }}>
                        <Inject services={[ScatterSeries, Category, ColumnSeries, ErrorBar, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' type='Column' marker={{ height: 10, width: 10 }} errorBar={{ visible: true, verticalError: 'error'}} width={2} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample shows the errors in the quantity of different items with an error bar chart.</p>
                </div>                
                <div id="description">
                    <p>In this example, you can see how to render and configure the error bar chart. An error bar chart is used to indicate the error or uncertainty in the reported measurement.</p>
                    <p>Chart supports the following error bar types.</p>
                    <ul>
                        <li><code>Fixed</code> - Renders a fixed type error bar.</li>
                        <li><code>Percentage</code> - Renders a percentage type error bar.</li>
                        <li><code>StandardDeviation</code> - Renders a standard deviation type error bar.</li>
                        <li><code>StandardError</code> - Renders a standard error type error bar.</li>
                        <li><code>Custom</code> - Renders a custom type error bar.</li>
                    </ul>
                    <p>
                        The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/tooltip/" aria-label="Navigate to the Tooltip property reference for React Chart">tooltip</a> is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        The Charts component’s features are segregated into individual feature modules. To use error bar, we need to inject <code>ErrorBar</code> into the <code>@services</code> section.
                    </p>
                    <p>
                        More information on the error bar can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/other-types/#error-bar-chart" aria-label="Navigate to the documentation for Error Bar in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>
        )   
    }
    public onChartLoad(args: ILoadedEventArgs): void {
                    document.getElementById('charts').setAttribute('title', '');
                };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
        replace(/light/i, "Light").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast')  as ChartTheme;
    };
        
}