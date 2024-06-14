/**
 * Sample for Stacking Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, StackingColumnSeries, Tooltip, ILoadedEventArgs, ChartTheme, IAxisLabelRenderEventArgs, Highlight
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: any[] = [
    { x: '2013', y: 9628912 },
    { x: '2014', y: 9609326 },
    { x: '2015', y: 7485587 },
    { x: '2016', y: 7793066 },
    { x: '2017', y: 6856880 }];
export let data2: any[] = [
    { x: '2013', y: 4298390 },
    { x: '2014', y: 4513769 },
    { x: '2015', y: 4543838 },
    { x: '2016', y: 4999266 },
    { x: '2017', y: 5235842 }];
export let data3: any[] = [
    { x: '2013', y: 2842133 },
    { x: '2014', y: 3016710 },
    { x: '2015', y: 3034081 },
    { x: '2016', y: 2945295 },
    { x: '2017', y: 3302336 }];
export let data4: any[] = [
    { x: '2013', y: 2006366  },
    { x: '2014', y: 2165566  },
    { x: '2015', y: 2279503  },
    { x: '2016', y: 2359756  },
    { x: '2017', y: 2505741  }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}  legendSettings={{ enableHighlight :true }}
                        primaryXAxis={{
                            majorGridLines: { width: 0 },
                            minorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 },
                            interval: 1,
                            lineStyle: { width: 0 },
                            labelIntersectAction: 'Rotate45',
                            valueType: 'Category'
                        }}
                        primaryYAxis={{
                            title: 'Vehicles Production (In Millions)',
                            lineStyle: { width: 0 },               
                            majorTickLines: { width: 0 },
                            majorGridLines: { width: 1 },
                            minorGridLines: { width: 1 },
                            minorTickLines: { width: 0 },
                            labelFormat: '{value}',
                        }}
                        width={Browser.isDevice ? '100%' : '75%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Motor Vehicle Production by Manufacturer' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}
                        axisLabelRender={this.axisLabelRender.bind(this)}>
                        <Inject services={[StackingColumnSeries, Category, Legend, Tooltip, Highlight]} />
                        <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' name='General Motors' columnWidth={0.6} border={{width:1,color:"white"}} type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Honda' columnWidth={0.6} border={{width:1,color:"white"}} type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Suzuki' columnWidth={0.6} border={{width:1,color:"white"}} type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data4} xName='x' yName='y' name='BMW' columnWidth={0.6} border={{width:1,color:"white"}} type='StackingColumn'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026" target="_blank">www.cyberagent.co.jp</a>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This React stacked column chart example visualizes motor vehicle production by manufacturer with a default stacked column series. The legend in the sample shows more information about those series.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render and configure the stacked column chart. The stacked column chart stacks points in the series vertically. You can also use the <code>StackingGroup</code> property to group stacked collections based on category.
                    </p>
                    <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject
                          <code>StackingColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the stacked column series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-column" aria-label="Navigate to the documentation for Stacked Column Chart in React Chart component">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };

    public axisLabelRender(args: IAxisLabelRenderEventArgs) : void {
        {
            args.text = args.text.replace("0000000","0M").replace("000000", "M");
        };
    }
        
}