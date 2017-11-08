/**
 * Category Axis Sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { EmitType } from '@syncfusion/ej2-base';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, ChartTheme,
    Legend, Tooltip, BarSeries, Category, IPointRenderEventArgs, ILoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors } from '../theme-color';
import { SampleBase } from './sample-base';
export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index];
    } else {
        args.fill = materialColors[args.point.index];
    }
};
export let data: any[] = [
    { x: 'GER', y: 72 },
    { x: 'RUS', y: 103.1 },
    { x: 'BRZ', y: 139.1 },
    { x: 'IND', y: 462.1 },
    { x: 'CHN', y: 721.4 },
    { x: 'USA', y: 286.9 },
    { x: 'GBR', y: 115.1 },
    { x: 'NGR', y: 97.2 },
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Category sample
 */
export class CategoryAxis extends SampleBase<{}, {}> {


    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            title: 'Country',
                            valueType: 'Category',
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            minimum: 0,
                            maximum: 800,
                            labelFormat: Browser.isDevice ? '{value}' : '{value}M',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                            labelStyle: {
                                color: 'transparent'
                            }
                        }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        legendSettings={{ visible: false }}
                        title={Browser.isDevice ? 'Internet Users in Million – 2016' : 'Internet Users – 2016'}
                        pointRender={pointRender} loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true, format: '${point.x} : ${point.y}' }}>
                        <Inject services={[BarSeries, Legend, Tooltip, DataLabel, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' type='Bar' width={2}
                                marker={{
                                    dataLabel: {
                                        visible: true,
                                        position: 'Top', font: {
                                            fontWeight: '600',
                                            color: '#ffffff'
                                        }
                                    }
                                }}
                                name='Users'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="http://www.internetworldstats.com/top20.htm" target="_blank">www.internetworldstats.com</a>
                    </div>
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
ReactDOM.render(<CategoryAxis />, document.getElementById('sample'));