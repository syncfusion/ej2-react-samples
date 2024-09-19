/**
 * Sample for Box and Whisker
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    getSaturationColor, Category, ILoadedEventArgs, ChartTheme,
    IPointRenderEventArgs, BoxAndWhiskerSeries, Tooltip, getElement, BoxPlotMode, Inject
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { fabricColors, materialColors, bootstrapColors, fluentColors, fluentDarkColors } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { Browser } from "@syncfusion/ej2/base";

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = fluentColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = fluentDarkColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % bootstrapColors.length];
    }
    args.border.color = getSaturationColor(args.fill, -0.6);
};

export let data1: any[] = [
    { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
    { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
    { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
    { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
    { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
    { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
    { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
    { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
    { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * BoxWhisker sample
 */
export class BoxWhisker extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private checkElement: HTMLInputElement;
    private loaded: EmitType<ILoadedEventArgs>;
    private change(): void {
        this.chartInstance.series[0].boxPlotMode = this.dropElement.value as BoxPlotMode;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private check(): void {
        this.chartInstance.series[0].showMean = this.checkElement.checked;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private droplist: { [key: string]: Object }[] = [
        { value: 'Normal' },
        { value: 'Exclusive' },
        { value: 'Inclusive' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>                 
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', labelIntersectAction : Browser.isDevice ? 'None' : 'Rotate45', labelRotation: Browser.isDevice ? -45 : 0, majorTickLines: {width : 0}, minorTickLines: {width: 0} }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ title: 'Age', minimum: 10, maximum: 60, interval: 10, majorGridLines: { width: 1 }, majorTickLines: { width: 0 }, lineStyle: {width: 0} }} pointRender={pointRender} load={this.load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title="Employee Age Group in Various Department" loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true }}>
                        <Inject services={[Category, BoxAndWhiskerSeries, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' type='BoxAndWhisker' marker={{ visible: true, height: 7, width: 7 }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>                   
                </div>
                <div id="action-description">
                    <p>This React Box and Whisker Chart example visualizes the employee’s age group in various departments of a company with box and whisker chart.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure a box and whisker chart or box plot. This chart is used to visualize a group of numerical data through their data quartiles. Box plots may also have lines extending vertically from the boxes (whiskers) indicating variability outside the upper and lower quartiles. Marker and DataLabel are used to represent individual data and its values.</p>
                    <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use BoxAndWhisker series, we need to inject
                        <code>BoxAndWhiskerSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Box and Whisker series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/other-types/#boxplotmode" aria-label="Navigate to the documentation for Box and Whisker in React Chart component">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}