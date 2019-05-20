/**
 * Sample for Default Range Navigator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    RangeNavigatorComponent, AreaSeries, ChartTheme, DateTime, Inject, RangeTooltip,
    RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, IRangeLoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { bitCoinData } from './default-data';
import { SampleBase } from '../common/sample-base';

export let data: Object[] = bitCoinData;
export let themes: string[] = ['Material' , 'Fabric' , 'Bootstrap' , 'Highcontrast']
export let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
export let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #title{
        font-size: 15px;
        font-style: normal;
        font-family: "Segoe UI";
        font-weight: 500;
        text-anchor: middle;
        transform: none;
        opacity: 1;
    }
    #rangenavigator {
        transform: translate(0, 25%);
    }

    #material-gradient-chart stop {
        stop-color: #00bdae;
    }

    #fabric-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #bootstrap4-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #highcontrast-gradient-chart stop {
        stop-color: #79ECE4;
    }

    .chart-gradient stop[offset="0"] {
        stop-opacity: 0.9;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0.3;
    }
    `;

export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row" style={{ textAlign: "center" }}>
                        <div id="title">Bitcoin (USD) Price Range</div>
                    </div>
                    <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' style={{ textAlign: "center" }}
                        valueType='DateTime'
                        load={this.load.bind(this)}
                        tooltip={{ enable: true, displayMode: 'Always',format: 'MM/dd/yyyy' }}
                        navigatorStyleSettings={{
                            unselectedRegionColor: 'transparent'
                        }}
                        labelFormat='MMM-yy'
                        width={Browser.isDevice ? '100%' : '80%'}
                        value={[new Date('2017-09-01'), new Date('2018-02-01')]}>
                        <Inject services={[AreaSeries, DateTime, RangeTooltip]} />
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='x' yName='y' 
                                type='Area' width={2} border={{width:2}}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                </div>
                </div>
                <svg style={{ height: '0' }}>
                <defs>
                    <linearGradient id="material-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap4-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="highcontrast-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                </defs>
            </svg>
            <div id="action-description">
            <p>
                This sample visualizes the bitcoin price range with area series in the range navigator. 
                Selected range values are enhanced with tooltip.
            </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render and configure the range navigator with area type series. <code>Tooltip</code> is used to represent selected data value. 
                You can also use <code>selectedRegionColor</code> and <code>unselectedRegionColor</code> properties to customize selected and unselected area in range navigator.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    The range navigator component features are segregated into individual feature-wise modules. 
                    To use date-time axis, inject the
                    <code>DateTime</code> module using
                    <code>RangeNavigator.Inject(DateTime)</code> method.To use tooltip, inject the
                    <code>RangeTooltip</code> module using
                    <code>RangeNavigator.Inject(RangeTooltip)</code> method.
                </p>
            </div>
            </div>
        )
    }
        // custom code start
    public load(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark") as ChartTheme;
        let rangeTheme: string= args.rangeNavigator.theme;
        args.rangeNavigator.series[0].fill = 'url(#' + rangeTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(rangeTheme)];
        args.rangeNavigator.navigatorStyleSettings.selectedRegionColor= regionColor[themes.indexOf(rangeTheme)];
    };
        // custom code end
}