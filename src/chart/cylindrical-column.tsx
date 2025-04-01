/**
 * Sample for Cylindrical Column series
 */
import * as React from 'react';
import { ChartComponent, ILoadedEventArgs, ColumnSeries, Category, DataLabel, Tooltip, SeriesDirective, SeriesCollectionDirective, Inject, Legend } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { loadChartTheme } from './theme-color';

export let cylindricalData: Object[] = [
    { year: '2017 - 18', energy: 228.0 },
    { year: '2018 - 19', energy: 261.8 },
    { year: '2019 - 20', energy: 294.3 },
    { year: '2020 - 21', energy: 297.5 },
    { year: '2021 - 22', energy: 322.6 },
    { year: '2022 - 23', energy: 365.59 },
];

export class CylindricalColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        chartArea={{ border: { width: 0 } }}
                        title='Year-wise Renewable Energy Generation Trends in India'
                        subTitle='Source: wikipedia.org'
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
                            title: 'Total Renewable Power (TWh)',
                            labelFormat: '{value}TWh',
                            minimum: 150,
                            maximum: 400,
                            interval: 50,
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 }
                        }}
                        tooltip={{
                            enable: true,
                            header: '<b>${point.x}</b>',
                            format: '${series.name}: <b>${point.y}</b>'
                        }}
                        legendSettings={{ visible: false }}
                        load={this.load.bind(this)}
                        loaded={this.onChartLoad.bind(this)}
                        width={Browser.isDevice ? '100%' : '75%'}>
                        <Inject services={[ColumnSeries, Category, DataLabel, Tooltip, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={cylindricalData}
                                columnFacet='Cylinder'
                                type='Column'
                                name='India'
                                xName='year'
                                yName='energy'
                                columnSpacing={0.3}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the year-wise renewable energy generation trends in India using a cylindrical column chart. The chart displays the total renewable energy generation in terawatt-hours (TWh) for each year from 2017 to 2023.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can observe the rendering and configuration of a cylindrical column chart. The cylindrical column chart serves the purpose of comparing the frequency, count, total, or average of data across various categories using a cylindrical shape.</p>
                    <p>
                        Tooltips have been enabled in this example. To experience the tooltip functionality, simply hover over a point or tap on it in touch-enabled devices.                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use  column series, we need to inject <code>ColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the column series can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/column#cylindrical-column-chart" aria-label="Navigate to the documentation for Cylindrical Column in React Chart component">documentation section</a>.
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
        loadChartTheme(args);
    };

}