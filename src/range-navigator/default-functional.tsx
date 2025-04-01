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
import { updateSampleSection } from '../common/sample-base';
import { loadRangeNavigatorTheme, regionColor, themes, borderColor } from './theme-color';
export let data: Object[] = bitCoinData;

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
 

     #tailwind-gradient-chart stop {
        stop-color: #5A61F6;
    }

	#tailwind3-gradient-chart stop {
        stop-color: #2F4074;
    }

    #tailwinddark-gradient-chart stop {
        stop-color: #8B5CF6;
    }

    #tailwind3-dark-gradient-chart stop {
        stop-color: #8029F1;
    }
 
     #bootstrap5-gradient-chart stop {
        stop-color: #FD7E14;
     }
 
     #material-dark-gradient-chart stop {
         stop-color: #9ECB08;
     }
 
     #fabric-dark-gradient-chart stop {
         stop-color: #4472c4;
     }
 
     #bootstrap-dark-gradient-chart stop {
         stop-color: #a16ee5;
     }

     #bootstrap5-dark-gradient-chart stop {
         stop-color: #8F80F4;
     }
 
     #fluent-gradient-chart stop {
         stop-color: #1AC9E6;
     }
 
     #fluent-dark-gradient-chart stop {
         stop-color: #1AC9E6;
     }

     #material3-gradient-chart stop {
         stop-color: #6355C7;
     }

     #material3-dark-gradient-chart stop {
         stop-color: #4EAAFF;
     }
 
     #fluent2-gradient-chart stop {
        stop-color: #6200EE;
    }

    #fluent2-highcontrast-gradient-chart stop {
        stop-color: #9BB449;
    }

    #fluent2-dark-gradient-chart stop {
        stop-color: #9BB449;
    }

     .chart-gradient stop[offset="0"] {
         stop-opacity: 0.9;
     }
 
     .chart-gradient stop[offset="1"] {
         stop-opacity: 0.3;
     }
     `;

function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])


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
                        load={load.bind(this)}
                        tooltip={{ enable: true, displayMode: 'Always', format: 'MM/dd/yyyy' }}
                        navigatorStyleSettings={{
                            unselectedRegionColor: 'transparent'
                        }}
                        labelFormat='MMM-yy'
                        width={Browser.isDevice ? '100%' : '80%'}
                        value={[new Date('2017-09-01'), new Date('2018-02-01')]}>
                        <Inject services={[AreaSeries, DateTime, RangeTooltip]} />
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='x' yName='y'
                                type='Area' width={2} border={{ width: 2 }}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                </div>
            </div>
            <svg style={{ height: '0' }}>
                <defs>
                    <linearGradient id="material-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap4-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap5-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap5-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent2-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent2-highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent2-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
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
                    To use date-time axis, inject the <code>DateTime</code> module using <code>RangeNavigator.Inject(DateTime)</code> method.
                    To use tooltip, inject the <code>RangeTooltip</code> module using <code>RangeNavigator.Inject(RangeTooltip)</code> method.
                </p>
            </div>
        </div>
    )


    function load(args: IRangeLoadedEventArgs): void {
        let selectedTheme: String = loadRangeNavigatorTheme(args, true);
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
        args.rangeNavigator.navigatorStyleSettings.selectedRegionColor = regionColor[themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
    };
}
export default Default;