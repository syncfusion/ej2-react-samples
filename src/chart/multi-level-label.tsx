/**
 * Sample for smart axis labels
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Tooltip, DataLabel, IPointRenderEventArgs, MultiLevelLabel,
    ILoadedEventArgs, Category, ColumnSeries, Inject, LabelIntersectAction, EdgeLabelPlacement, ChartTheme,
    AxisPosition
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};

export let data1: any[] = [{ x: 'Grapes', y: 28 }, { x: 'Apples', y: 87 },
{ x: 'Pears', y: 42 }, { x: 'Grapes', y: 13 },
{ x: 'Apples', y: 13 }, { x: 'Pears', y: 10 },
{ x: 'Tomato', y: 31 }, { x: 'Potato', y: 96 },
{ x: 'Cucumber', y: 41 }, { x: 'Onion', y: 59 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class Multilevellabels extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div>
                        <ChartComponent id='charts' style={{ textAlign: "center" }}
                            primaryXAxis={{
                                valueType: 'Category', labelRotation: 90,
                                border: { width: 1, type: 'Rectangle' },
                                isIndexed: true, interval: 1, majorGridLines: { width: 0 },
                                multiLevelLabels: (Browser.isDevice ? ([
                                    {
                                        border: { type: 'Rectangle' },
                                        categories: [
                                            { start: -0.5, end: 2.5, text: 'In Season', },
                                            { start: 2.5, end: 5.5, text: 'Out of Season', },
                                            { start: 5.5, end: 7.5, text: 'In Season', },
                                            { start: 7.5, end: 9.5, text: 'Out of Season', },
                                        ]
                                    }, {
                                        border: { type: 'Rectangle' },
                                        textStyle: { fontWeight: 'Bold' },
                                        categories: [
                                            { start: -0.5, end: 5.5, text: 'Fruits', },
                                            { start: 5.5, end: 9.5, text: 'Vegetables', },
                                        ]
                                    }]) : [
                                        {
                                            border: { type: 'Rectangle' },
                                            categories: [
                                                { start: -0.5, end: 0.5, text: 'Seedless', },
                                                { start: 0.5, end: 2.5, text: 'Seeded', },
                                                { start: 2.5, end: 3.5, text: 'Seedless', },
                                                { start: 3.5, end: 5.5, text: 'Seeded', },
                                                { start: 5.5, end: 6.5, text: 'Seedless', },
                                                { start: 6.5, end: 7.5, text: 'Seeded', },
                                                { start: 7.5, end: 8.5, text: 'Seedless', },
                                                { start: 8.5, end: 9.5, text: 'Seeded', }
                                            ]
                                        }, {
                                            border: { type: 'Rectangle' },
                                            categories: [
                                                { start: -0.5, end: 2.5, text: 'In Season', },
                                                { start: 2.5, end: 5.5, text: 'Out of Season', },
                                                { start: 5.5, end: 7.5, text: 'In Season', },
                                                { start: 7.5, end: 9.5, text: 'Out of Season', },
                                            ]
                                        }, {
                                            border: { type: 'Rectangle' },
                                            textStyle: { fontWeight: 'Bold' },
                                            categories: [
                                                { start: -0.5, end: 5.5, text: 'Fruits', },
                                                { start: 5.5, end: 9.5, text: 'Vegetables', },
                                            ]
                                        }])
                            }}
                            width={Browser.isDevice ? '100%' : '75%'}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                minimum: 0, maximum: 120, interval: 30,
                                majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                            }}
                            load={this.load.bind(this)}
                            pointRender={pointRender}
                            title="Fruits and Vegetables - Season"
                            loaded={this.onChartLoad.bind(this)}
                            legendSettings={{ visible: false }}
                            tooltip={{ enable: true }}>
                            <Inject services={[Category, Category, ColumnSeries, Tooltip, DataLabel, MultiLevelLabel]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' type='Column' marker={{ dataLabel: { visible: true, position: 'Outer' } }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        Axis labels are placed based on the start and end range values and we can add any number of labels to an axis.
    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to group axis labels.
                You can customize text in each level by using <code>alignment</code>, <code>overflow</code>, <code>textSytle</code> and <code>border</code> properties.
            </p>
                    <p>Axis labels in each level can be arranged smartly using <code>overflow</code> property.
            </p>
                    <ul>
                        <li><code>Trim</code> - Trim the label when it intersect.</li>
                        <li><code>Wrap</code> - Wrap the label when it intersect.</li>
                        <li><code>None</code> - Shows all the labels.</li>
                    </ul>
                    <p>Border of the axis labels can be customized by using <code>type</code> property.
            </p>
                    <ul>
                        <li><code>Rectangle</code></li>
                        <li><code>Brace</code></li>
                        <li><code>WithoutTopBorder</code></li>
                        <li><code>WithoutTopandBottomBorder</code></li>
                        <li><code>CurlyBrace</code></li>
                        <li><code>withoutBorder</code>.</li>
                    </ul>
                    <p>
                        More information on the multi level labels can be found in this &nbsp;
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark") as ChartTheme;
    };
        
}