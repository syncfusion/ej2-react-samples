/**
 * Sample for Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme,
    Legend, Category, Tooltip, ColumnSeries, ILoadedEventArgs, DataLabel, Highlight
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1 = [{ x: 'GBR', y: 27, r:'Great Britain'  }, { x: 'CHN', y: 26 , r:'China' }, { x: 'AUS', y: 8, r:'Australia'}, { x: 'RUS', y: 19, r:'Russia' }, { x: 'GER', y: 17, r:'Germany' }, { x: 'UA', y: 2, r:'Ukraine' }, { x: 'ES', y: 7, r:'Spain' }, { x: 'UZB', y: 4, r:'Uzbekistan' }, { x: 'JPN', y: 12, r:'Japan' }, { x: 'NL', y: 8, r:'NetherLand' }, { x: 'USA', y: 46, r:'United States' }];
export let data2 = [{ x: 'GBR', y: 23 , r:'Great Britain'}, { x: 'CHN', y: 18, r:'China'}, { x: 'AUS', y: 11, r:'Australia' }, { x: 'RUS', y: 17, r:'Russia' }, { x: 'GER', y: 10, r:'Germany' }, { x: 'UA', y: 5, r:'Ukraine'}, { x: 'ES', y: 4, r:'Spain' }, { x: 'UZB', y: 2, r:'Uzbekistan' }, { x: 'JPN', y: 8, r:'Japan' }, { x: 'NL', y: 7, r:'NetherLand' }, { x: 'USA', y: 37, r:'United States' }];
export let data3 = [{ x: 'GBR', y: 17 , r:'Great Britain'}, { x: 'CHN', y: 26, r:'China' }, { x: 'AUS', y: 10, r:'Australia' }, { x: 'RUS', y: 20, r:'Russia' }, { x: 'GER', y: 15, r:'Germany' }, { x: 'UA', y: 24, r:'Ukraine' }, { x: 'ES', y: 6, r:'Spain' }, { x: 'UZB', y: 7, r:'Uzbekistan' }, { x: 'JPN', y: 8, r:'Japan' }, { x: 'NL', y: 4, r:'NetherLand' }, { x: 'USA', y: 38, r:'United States' }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class Column extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}    legendSettings={{ enableHighlight :true }} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines : {width:0} }}  primaryYAxis={{
                        title: 'Medal Count',
                        majorTickLines: { width: 0 },lineStyle: {width: 0}, maximum : 50 , interval: 10,
                    }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} tooltip={{ enable: true, header:"<b>${point.tooltip}</b>", shared: true}} width={Browser.isDevice ? '100%' : '75%'} title='Olympic Medal Counts - RIO'  loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel, Highlight]} />
                        <SeriesCollectionDirective >
                            <SeriesDirective dataSource={data1}  tooltipMappingName='r' xName='x' columnSpacing={0.1} yName='y' name='Gold' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2}   tooltipMappingName='r' xName='x' columnSpacing={0.1} yName='y' name='Silver' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3}  tooltipMappingName='r' xName='x' columnSpacing={0.1} yName='y' name='Bronze' type='Column'>
                            </SeriesDirective>

                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This React column chart example visualizes the medal count from the Rio Olympics with the default column series in the chart.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure a column chart. The column chart is used to compare the frequency, count, total, or average of data in different categories.
                   </p>
                    <p>
                    Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                       <code>ColumnSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the column series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#column-charts">documentation section</a>.
                  </p>
                </div>
            </div>
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
         if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.font.color = '#000000';
            args.chart.series[1].marker.dataLabel.font.color = '#000000';
            args.chart.series[2].marker.dataLabel.font.color = '#000000';
            }
    };
        
}
