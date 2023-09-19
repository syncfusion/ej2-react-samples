/**
 * Sample for Cylindrical Column series
 */
import * as React from 'react';
import { ChartComponent, ILoadedEventArgs, ColumnSeries, Category, DataLabel, Tooltip, ChartTheme, SeriesDirective, SeriesCollectionDirective, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let  data: Object[] = [
    { x: 'China', y: 26 , tooltipMappingName:'China' },
    { x: 'Australia', y: 8, tooltipMappingName:'Australia'},
    { x: 'Germany', y: 17, tooltipMappingName:'Germany' },
    { x: 'Spain', y: 7, tooltipMappingName:'Spain' },
    { x: 'Japan', y: 12, tooltipMappingName:'Japan' },
    { x: 'USA', y: 46, tooltipMappingName:'United States' }
];

export class CylindricalColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        chartArea={{ border: { width: 0 } }}
                        title='Olympic Medal Counts - RIO'
                        primaryXAxis={{
                            valueType: 'Category',
                            interval: 1,
                            majorGridLines: { width: 0 },
                            labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
                            labelRotation: Browser.isDevice ? -45 : 0,
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Medal Count',
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                            maximum: 50,
                            interval: 10
                        }}
                        tooltip={{
                            enable: true,
                            header: "<b>${point.tooltip}</b>",
                            format: "Gold Medal: <b>${point.y}</b>"
                        }}
                        load={this.load.bind(this)}
                        width={Browser.isDevice ? '100%' : '75%'}>
                        <Inject services={[ColumnSeries, Category, DataLabel, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={data}
                                columnFacet='Cylinder'
                                type='Column'
                                xName='x'
                                yName='y'
                                width={2}
                                columnSpacing={0.1}
                                opacity= {0.75}
                                tooltipMappingName='tooltipMappingName'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the gold medal count from the Rio Olympics using a cylindrical column chart.            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can observe the rendering and configuration of a cylindrical column chart. The cylindrical column chart serves the purpose of comparing the frequency, count, total, or average of data across various categories using a cylindrical shape.                    </p>
                    <p>
                        Tooltips have been enabled in this example. To experience the tooltip functionality, simply hover over a point or tap on it in touch-enabled devices.                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use  column series, we need to inject <code>ColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the column series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    };

}