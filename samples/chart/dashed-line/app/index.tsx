import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    LineSeries, Crosshair, DateTime, Legend, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

export let data1: any[] = [
    { x: new Date(2005, 0, 1), y: 12 }, { x: new Date(2006, 0, 1), y: 10.6 },
    { x: new Date(2007, 0, 1), y: 15.6 }, { x: new Date(2008, 0, 1), y: 38.6 },
    { x: new Date(2009, 0, 1), y: 27.4 }, { x: new Date(2010, 0, 1), y: 23.5 },
    { x: new Date(2011, 0, 1), y: 16.6 }
];
export let data2: any[] = [
    { x: new Date(2005, 0, 1), y: 9.5 }, { x: new Date(2006, 0, 1), y: 19.9 },
    { x: new Date(2007, 0, 1), y: 25.2 }, { x: new Date(2008, 0, 1), y: 36 },
    { x: new Date(2009, 0, 1), y: 16.6 }, { x: new Date(2010, 0, 1), y: 14.2 }, { x: new Date(2011, 0, 1), y: 10.3 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #charts_Series_1,
    #charts_Series_0 {
        stroke-dasharray: 10px 10px;
        stroke-linejoin: round; stroke-linecap: round;
        -webkit-animation: dash 1s linear infinite;
        animation: dash 1s linear infinite;
    }

    #charts_Series_0_Point_3_Symbol {
        -webkit-animation: opac 1s ease-out infinite;
        animation: opac 1s ease-out infinite;
    }

    @-webkit-keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }

    @keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }

    @keyframes opac {
        0% {
            stroke-opacity: 1;
            stroke-width: 0px;
        }
        100% {
            stroke-opacity: 0;
            stroke-width: 10px;
        }
    }`;
/**
 * DashedLine sample
 */
export class DashedLine extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            labelFormat: 'y',
                            intervalType: 'Years',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            labelFormat: '{value}%',
                            rangePadding: 'None',
                            minimum: 0,
                            maximum: 40,
                            interval: 10,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true, shared: true }}
                        crosshair={{
                            enable: true,
                            line: {
                                color: 'rgba(204,214,235,0.25)',
                                width: Browser.isDevice ? 50 : 20,
                            },
                            lineType: 'Vertical'
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        title='Fruits Production Statistics' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, DateTime, Legend, Tooltip, Crosshair]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Banana' dashArray='5'
                                width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Apple'
                                width={2} marker={{ visible: true, width: 10, height: 10, shape: 'Diamond' }} dashArray='10' type='Line'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
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

ReactDOM.render(<DashedLine />, document.getElementById('sample'));