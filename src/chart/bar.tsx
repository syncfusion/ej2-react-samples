/**
 * Sample for Bar series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    DataLabel, BarSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme, Highlight
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
    { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 } , { x: 'Italy', y: 1.50 } , { x: 'Canada', y: 3.05 }
];
export let data2: any[] = [
    { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
    { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 } , { x: 'Italy', y: 2.40 } , { x: 'Canada', y: 2.04 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Bar sample
 */
export class Bar extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div>
                        <ChartComponent id='charts' style={{ textAlign: "center" }}    legendSettings={{ enableHighlight :true }}
                            primaryXAxis={{
                                valueType: 'Category',
                                title: 'Country',
                                majorGridLines: { width: 0 }
                            }}
                            primaryYAxis={{
                                labelFormat: '{value}%',
                                title: 'GDP (In Percentage)',
                                edgeLabelPlacement: 'Shift',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                            }}
                            chartArea={{ border: { width: 0 } }}
                            load={this.load.bind(this)}
                            width={Browser.isDevice ? '100%' : '75%'}
                            title='GDP by Country in 2017' loaded={this.onChartLoad.bind(this)}
                            tooltip={{ enable: true }}>
                            <Inject services={[BarSeries, DataLabel, Category, Legend, Tooltip, Highlight]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' type='Bar' columnSpacing={0.1} name='GDP' width={2} marker={{
                                }}>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data2} xName='x' yName='y' type='Bar'  columnSpacing={0.1} name='Share in World' width={2}
                                >
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.gov.uk/" target='_blank'>www.gov.uk</a>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This React bar chart example visualizes GDP data by country for the year 2017 with a default bar series.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the bar chart. The bar chart is similar to the column chart, but the orientation of the y-axis is horizontal rather than vertical.
                  </p>
                    <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices. 
                 </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject
                   <code>BarSeries</code> module into <code>services</code>.
                 </p>
                    <p>
                        More information on the bar series can be found in this &nbsp;
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/bar">documentation section</a>.
                 </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast')  as ChartTheme;
    };
        
}
