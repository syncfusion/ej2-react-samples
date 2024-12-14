/**
 * Sample for column series with rounded corner
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs,
    StackingColumnSeries, LineSeries, Category, ColumnSeries, Legend, DataLabel,
    Tooltip, IPointRenderEventArgs, ITooltipRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export let data1: any[] = [
     { x: 'Niger', y: 19.1, Rate:100, text: "19.1%"},
    { x: 'Sierra Leone', y: 48.1,Rate:100, text: "48.1%"},
    { x: 'South Sudan', y: 26.8,Rate:100, text: "26.8%"},
    { x: 'Nepal', y: 64.7,Rate:100, text: "64.7%"},
    { x: 'Gambia', y: 55.5,Rate:100, text: "55.5%"},
    { x: 'Gyana', y: 88.5,Rate:100, text: "88.5%"},
    { x: 'Kenya', y: 78.0,Rate:100, text: "78.0%"},
    { x: 'Singapore', y: 96.8,Rate:100, text: "96.8%"}
];
export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric-dark') > -1) {
        if (args.series.yName == "Rate") 
            args.fill = "f9fafb";
    } else if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        if (args.series.yName == "Rate") 
            args.fill = "grey";
    } else if (selectedTheme === 'material-dark') {
        if (args.series.yName == "Rate") 
            args.fill = "f9fafb";
    } else if (selectedTheme === 'material') {
        if (args.series.yName == "Rate") 
            args.fill = "grey";
    } else if (selectedTheme === 'bootstrap5-dark') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'bootstrap5') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'bootstrap-dark') {
        if (args.series.yName == "Rate")
            args.fill = "f9fafb";
    } else if (selectedTheme === 'bootstrap') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'highcontrast') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'fluent-dark') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'fluent') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'tailwind-dark') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'tailwind') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    }
    else if (selectedTheme === 'tailwind3-dark') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'tailwind3') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    }
};
let count: number = 0;
export class RoundedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts2' style={{ textAlign: "center" }}
                        enableSideBySidePlacement={false}
                        primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 },
                        labelPosition:'Outside' }}
                        primaryYAxis={{ minimum: 0, maximum: 100,title:'Literacy Rate In Percentage',labelFormat: '{value}%', interval: 25, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Literacy rate by Country in 2015' 
                        loaded={this.onChartLoad.bind(this)}    
                        legendSettings={{ visible: false }}
                        width={Browser.isDevice ? '100%' : '77%'}
                        tooltip={{ enable: true, header:"<b>${point.x}</b>", format:"Rate : <b>${point.text}</b>" }}
                        pointRender={pointRender}
                    >
                        <Inject services={[ColumnSeries, DataLabel, Category, Tooltip]} />
                        <SeriesCollectionDirective>
                        <SeriesDirective  xName='x' yName='Rate' enableTooltip={false} columnWidth={0.8} opacity={0.5}   dataSource={data1} type='Column'   name='Tiger' cornerRadius={{ bottomLeft: 35, bottomRight: 35, topLeft: 35, topRight: 35}}>
                            </SeriesDirective>
                            <SeriesDirective  xName='x' yName='y' columnWidth={0.8} dataSource={data1} type='Column' marker={{ dataLabel: { visible: true, name: 'text', position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}  name='Tiger' cornerRadius={{ bottomLeft: 35, bottomRight: 35, topLeft: 35, topRight:35  }} >
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                     </div>
                <div id="action-description">
                    <p>
                        This sample shows the literacy rate by country in 2015 with the default column series in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the column chart. The column chart is used to compare the frequency, count, total, or average of data in different categories. You can use the <code>ChartCornerRadius</code> option to customize the vertical rectangle, resulting in a rounded column.
                    </p>
                    <br />
                    <p style={{ "fontWeight": 500 }}>Injecting Module</p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                        <code>ColumnSeries</code> module into <code>services</code>
                    </p>
                    <p>
                        More information on the column series can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column" aria-label="Navigate to the documentation for Column Chart in React Chart Component">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts2');
        chart.setAttribute('title', '');
    }; 
       
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
   
        
}