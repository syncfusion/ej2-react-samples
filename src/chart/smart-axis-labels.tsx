/**
 * Sample for smart axis labels
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Tooltip, DataLabel, IPointRenderEventArgs,
    ILoadedEventArgs, Category, ColumnSeries, Inject, LabelIntersectAction, EdgeLabelPlacement, ChartTheme,
    AxisPosition
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

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

export let data1: any[] = [{ x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
{ x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
{ x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
{ x: 'France', y: 45 }, { x: 'United Arab Emirates', y: 10 },
{ x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
{ x: 'Brazil', y: 76 }, { x: 'China', y: 51 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class SmartAxisLabels extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private widthElement: NumericTextBoxComponent;
    private checkElement: HTMLInputElement;
    private dropElement: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { value: 'Hide' },
        { value: 'Trim' },
        { value: 'Wrap' },
        { value: 'MultipleRows' },
        { value: 'Rotate45' },
        { value: 'Rotate90' },
        { value: 'None' }
    ];
    private change(): void {
        this.chartInstance.primaryXAxis.labelIntersectAction = this.dropElement.value as LabelIntersectAction;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private mode(): void {
        this.chartInstance.primaryXAxis.edgeLabelPlacement = this.modeElement.value as EdgeLabelPlacement;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private trim(): void {
        this.chartInstance.primaryXAxis.enableTrim = this.checkElement.checked;
        this.chartInstance.refresh();
    };
    private xwid(): void {
        this.chartInstance.primaryXAxis.maximumLabelWidth = this.widthElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private xpos(): void {
        this.chartInstance.primaryXAxis.labelPosition = this.posElement.value as AxisPosition;
        this.chartInstance.refresh();
    };
    private modeElement: DropDownListComponent;
    private modelist: { [key: string]: Object }[] = [
        { value: 'None' },
        { value: 'Hide' },
        { value: 'Shift' }
    ];
    private posElement: DropDownListComponent;
    private poslist: { [key: string]: Object }[] = [
        { value: 'Inside' },
        { value: 'Outside' }    
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{textAlign:"center"}}
                            primaryXAxis={{
                                valueType: 'Category',
                                interval: 1,
                                majorGridLines: { width: 0 },
                                labelIntersectAction: 'Hide'
                            }}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                labelStyle: { size: '0px' },
                                majorTickLines: { width: 0 },
                                majorGridLines: { width: 0 },
                                lineStyle: { width: 0 },
                            }}
                            load={this.load.bind(this)}
                            pointRender={pointRender}
                            title="Internet Users in Millions"
                            loaded={this.onChartLoad.bind(this)}
                            legendSettings={{ visible: false }}
                            tooltip={{ enable: true}}>
                            <Inject services={[Category, Category, ColumnSeries, Tooltip, DataLabel]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name="Users" type='Column' marker={{ dataLabel: { visible: true, position: Browser.isDevice ? 'Outer' : 'Top', font: { fontWeight: '600', color: Browser.isDevice ? '#404041' : '#ffffff' } } }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Intersect Action: </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent width="120px" id="selmode" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Hide" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Edge Label<br/>Placement: </div></td>
                                    <td style={{ padding: 10}}>
                                        <DropDownListComponent width="120px" id="selmode" change={this.mode.bind(this)} ref={d => this.modeElement = d} dataSource={this.modelist} fields={{ text: 'value', value: 'value' }} value="None" />
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Label Position: </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent width="120px" id="labmode" change={this.xpos.bind(this)} ref={d => this.posElement = d} dataSource={this.poslist} fields={{ text: 'value', value: 'value' }} value="Outside" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Enable Trim:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <input type="checkbox" id="trimmode" defaultChecked={false} onChange={this.trim.bind(this)} style={{ marginLeft: '-5px' }} ref={d => this.checkElement = d} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Maximum Label Width:</div>
                                    </td>
                                    <td style={{ padding: 10, width: '40%' }}>
                                        <NumericTextBoxComponent width={120} value={34} min={1} change={this.xwid.bind(this)} ref={d => this.widthElement = d} />
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
    <p>
        Labels in an axis can be placed smartly when it intersects with each other. Intersect action and edge label placement can be changed by using property panel.
    </p>
</div>
                <div id="description">
                    <p>
                        In this example, you can see how to arrange the axis labels smartly. When the Axis labels overlap with each other based on
                the chart dimensions and label size, you can use the <code>labelIntersectAction</code> property of the axis
                to avoid overlapping.
            </p>
                    <p>Chart supports the following by which can be set using <code>labelIntersectAction</code> property.
            </p>
                    <ul>
                        <li><code>Hide</code> - Hide the label when it intersect.</li>
                        <li><code>Trim</code> - Trim the label when it intersect.</li>
                        <li><code>Wrap</code> - Wrap the label when it intersect.</li>
                        <li><code>MultipleRows</code> - Arrange the label in multiple row when it intersect.</li>
                        <li><code>Rotate45</code> - Rotate the label to 45 degree when it intersect.</li>
                        <li><code>Rotate90</code> - Rotate the label to 90 degree when it intersect.</li>
                        <li><code>None</code> - Shows all the labels.</li>
                    </ul>
                    <p>Chart supports three types of edge labels placement which can be set using <code>edgeLabelPlacement</code> property.
    </p>
                    <ul>
                        <li><code>None</code> - No action will be performed.</li>
                        <li><code>Hide</code> - Edge label will be hidden .</li>
                        <li><code>Shift</code> - Shifts the edge labels.</li>
                    </ul>
                    <p>
                        More information on the smart axis labels can be found in this &nbsp;
                    <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
        
}