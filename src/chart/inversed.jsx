/**
 * Sample for Inversed axis
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, Legend, Tooltip, DataLabel } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';
export let labelRender = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    }
    else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
export let data = [
    { x: '2008', y: 15.1 }, { x: '2009', y: 16 }, { x: '2010', y: 21.4 },
    { x: '2011', y: 18 }, { x: '2012', y: 16.2 }, { x: '2013', y: 11 },
    { x: '2014', y: 7.6 }, { x: '2015', y: 1.5 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class InversedAxis extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'Category',
            opposedPosition: true,
            isInversed: true,
            majorGridLines: { width: 0 }
        }} load={this.load.bind(this)} primaryYAxis={{
            edgeLabelPlacement: 'Shift',
            labelIntersectAction: 'Rotate45',
            isInversed: true,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        }} pointRender={labelRender} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} title='Exchange Rate (INR per USD)' width={Browser.isDevice ? '100%' : '60%'} loaded={this.onChartLoad.bind(this)} tooltip={{
            enable: true
        }}>
                        <Inject services={[ColumnSeries, Category, Legend,
            Tooltip, DataLabel]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' type='Column' name='Rate' marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates inversed axis in chart to plot exchange rate over a period.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to inverse an axis in chart. Here both the X and Y axis are inversed using <code>isInversed</code> property.
    </p>
                    <p> DataLabel are used to represent individual data and its value.</p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
    </p>
                    <p>
                        More information on inversed axis can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#isInversed">documentation section</a>.
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
