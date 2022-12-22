/**
 * Sample for Category Axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { EmitType } from '@syncfusion/ej2-base';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, ChartTheme,
    Legend, Tooltip, BarSeries, Category, IPointRenderEventArgs, ILoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { updateSampleSection } from '../common/sample-base';
export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = fluentColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = fluentDarkColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
export let data: any[] = [
    { x: 'Germany', y: 72, country: 'GER: 72' },
    { x: 'Russia', y: 103, country: 'RUS: 103' },
    { x: 'Brazil', y: 139, country: 'BRZ: 139' },
    { x: 'India', y: 462, country: 'IND: 462' },
    { x: 'China', y: 721, country: 'CHN: 721' },
    { x: 'United States<br>Of America', y: 286, country: 'USA: 286' },
    { x: 'Great Britain', y: 115, country: 'GBR: 115' },
    { x: 'Nigeria', y: 97, country: 'NGR: 97' },
];

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
/**
 * Category sample
 */
function CategoryAxis() {
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
                            majorGridLines: { width: 0 },
                            enableTrim: false,
                            majorTickLines: {width : 0},
                            minorTickLines: {width: 0}
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
                        load={load.bind(this)}
                        width={Browser.isDevice ? '100%' : '75%'}
                        chartArea={{ border: { width: 0 } }}
                        legendSettings={{ visible: false }}
                        title={Browser.isDevice ? 'Internet Users in Million – 2016' : 'Internet Users – 2016'}
                        pointRender={pointRender} loaded={onChartLoad.bind(this)}
                        tooltip={{ enable: true, format: '${point.tooltip}' }}>
                        <Inject services={[BarSeries, Legend, Tooltip, DataLabel, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' type='Bar' width={2} tooltipMappingName='country'
                                marker={{
                                    dataLabel: {
                                        visible: true,
                                        position: Browser.isDevice ? 'Outer': 'Top', font: {
                                            fontWeight: '600',
                                            color: Browser.isDevice ? '' : '#ffffff',
                                            size: '11px'
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
                <div id="action-description">
                    <p>
                        This sample demonstrates the rendering of category axis in the chart with internet users of different countries.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Category axis is used to represent the categories in data. To render category axis, set <code>valueType</code> in axis to <code>Category</code>.
                        Category label can placed between the ticks or on the ticks, based on <code>labelPlacement</code> property.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Category axis, we need to inject
                        <code>Category</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Category axis can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#valuetype-valuetype">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    };
}
export default CategoryAxis;