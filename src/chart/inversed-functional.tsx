/**
 * Sample for Inversed axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    ColumnSeries, Category, Legend, IPointRenderEventArgs,
    Tooltip, DataLabel, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { loadChartTheme, pointRenderEvent } from './theme-color';
import { updateSampleSection } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';


export let data: any[] = [
    { x: '2008', y: 1.5 }, { x: '2009', y: 7.6 }, { x: '2010', y: 11 },
    { x: '2011', y: 16.2 }, { x: '2012', y: 18 }, { x: '2013', y: 21.4 },
    { x: '2014', y: 16 }, { x: '2015', y: 17.1 }
]
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function InversedAxis() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }}
                    primaryXAxis={{
                        valueType: 'Category',
                        opposedPosition: true,
                        isInversed: true,
                        majorGridLines: { width: 0 },
                        majorTickLines : {width : 0},
                        minorTickLines : {width : 0}
                    }}
                    load={load.bind(this)}
                    primaryYAxis={{
                        edgeLabelPlacement: 'Shift',
                        labelIntersectAction: 'Rotate45',
                        isInversed: true,
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelStyle: {
                            color: 'transparent'
                        }
                    }}
                    pointRender={pointRender}
                    chartArea={{ border: { width: 0 } }}
                    legendSettings={{ visible: false }}
                    title='Exchange Rate (INR per USD)'
                    width={Browser.isDevice ? '100%' : '75%'} loaded={onChartLoad.bind(this)}
                    tooltip={{
                        enable: true
                    }}>
                    <Inject services={[ColumnSeries, Category, Legend,
                        Tooltip, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} xName='x' yName='y' type='Column' name='Rate'
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                This sample uses an inverse axis in a chart to plot an exchange rate over a period of time.
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
                    More information on inversed axis can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#isInversed" aria-label="Navigate to the documentation for Inversed Axis in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    function pointRender(args: IPointRenderEventArgs): void {
        pointRenderEvent(args);
    }
    function load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };
    
}
export default InversedAxis;