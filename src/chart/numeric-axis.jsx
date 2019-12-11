/**
 * Sample for numeric axis
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, DataLabel, Tooltip, Legend } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { x: 16, y: 2 }, { x: 17, y: 14 },
    { x: 18, y: 7 }, { x: 19, y: 7 },
    { x: 20, y: 10 }
];
export let data2 = [
    { x: 16, y: 7 }, { x: 17, y: 7 },
    { x: 18, y: 11 }, { x: 19, y: 8 },
    { x: 20, y: 24 }
];
export let labelRender = (args) => {
    if (args.axis.orientation === 'Horizontal') {
        args.cancel = args.value === 15 || args.value === 21;
    }
};
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class Numeric extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
            title: 'Death Overs',
            minimum: 15,
            maximum: 21,
            interval: 1,
            majorGridLines: { width: 0 }
        }} load={this.load.bind(this)} primaryYAxis={{
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        }} axisLabelRender={labelRender} width={Browser.isDevice ? '100%' : '60%'} chartArea={{ border: { width: 0 } }} title='England vs West Indies' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, format: '${point.x}th Over : <b>${point.y} Runs</b>' }}>
                        <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' fill='#1e90ff' marker={{
            dataLabel: {
                visible: true,
                position: 'Top',
                font: {
                    fontWeight: '600'
                }
            }
        }} name='England' type='Column' width={2}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' fill='#b22222' marker={{
            dataLabel: {
                visible: true,
                position: 'Top',
                font: {
                    fontWeight: '600'
                }
            }
        }} name='West Indies' type='Column' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="http://www.espncricinfo.com/icc-world-twenty20-2016/engine/current/match/951373.html" target="_blank">www.espncricinfo.com</a>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample demonstrates the rendering of numeric axis in the chart with England and West indies cricket match data.
            </p>
                </div>
                <div id="description">
                    <p>
                        Numeric axis is used to plot numeric data in chart. To render numeric axis, set <code>valueType</code> in axis to <code>Double</code>.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <p>
                        More information on the Numeric axis can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#valuetype-valuetype">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
}
