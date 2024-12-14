import * as React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, DataLabel, ILoadedEventArgs, IPointRenderEventArgs, IAxisRangeCalculatedEventArgs, ChartTheme, sort } from '@syncfusion/ej2-react-charts';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluent2Colors, fluent2DarkColors, pointTailwindColors, pointTailwindDarkColors, pointTailwind3Colors, pointTailwind3DarkColors } from './theme-color';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
  .control-fluid {
    padding: 0px !important;
  }
`;

const labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2') {
        args.fill = fluent2Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2-dark') {
        args.fill = fluent2DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind') {
        args.fill = pointTailwindColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind-dark') {
        args.fill = pointTailwindDarkColors[args.point.index % 10];
    } 
    else if (selectedTheme === 'tailwind3') {
        args.fill = pointTailwind3Colors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind3-dark') {
        args.fill = pointTailwind3DarkColors[args.point.index % 10];
    }
    else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};

let updatedData: Object[] = [
    { x: 'India', y: 97.21 },
    { x: 'France', y: 95.21 },
    { x: 'Indonesia', y: 62.74 },
    { x: 'Iceland', y: 61.71 },
    { x: 'United States', y: 57.97 },
    { x: 'Greece', y: 57.51 },
    { x: 'Iran', y: 55.31 },
    { x: 'Canada', y: 48.76 },
    { x: 'Finland', y: 48.50 },
    { x: 'Brazil', y: 45.13 },

];
let updatedData2: Object[] = [
    { x: 'India', y: 102.54 },
    { x: 'France', y: 90.76 },
    { x: 'Indonesia', y: 64.61 },
    { x: 'Iceland', y: 70.95 },
    { x: 'United States', y: 61.52 },
    { x: 'Greece', y: 49.03 },
    { x: 'Iran', y: 33.05 },
    { x: 'Canada', y: 59.83 },
    { x: 'Finland', y: 43.13 },
    { x: 'Brazil', y: 55.56 },
];
let updatedData3: Object[] = [
    { x: 'India', y: 99.33 },
    { x: 'France', y: 94.50 },
    { x: 'Indonesia', y: 64.86 },
    { x: 'Iceland', y: 77.86 },
    { x: 'United States', y: 62.14 },
    { x: 'Greece', y: 47.73 },
    { x: 'Iran', y: 39.97 },
    { x: 'Canada', y: 66.53 },
    { x: 'Finland', y: 43.15 },
    { x: 'Brazil', y: 50.02 }
];
let updatedData4: Object[] = [
    { x: 'India', y: 98.85 },
    { x: 'France', y: 101.11 },
    { x: 'Indonesia', y: 60.72 },
    { x: 'Iceland', y: 71.09 },
    { x: 'United States', y: 60.97 },
    { x: 'Greece', y: 52.07 },
    { x: 'Iran', y: 37.99 },
    { x: 'Canada', y: 58.35 },
    { x: 'Finland', y: 43.41 },
    { x: 'Brazil', y: 58.61 }
];
let updatedData5: Object[] = [
    { x: 'India', y: 100.02 },
    { x: 'France', y: 100.55 },
    { x: 'Indonesia', y: 62.84 },
    { x: 'Iceland', y: 89.05 },
    { x: 'United States', y: 59.46 },
    { x: 'Greece', y: 54.04 },
    { x: 'Iran', y: 42.58 },
    { x: 'Canada', y: 59.90 },
    { x: 'Finland', y: 46.18 },
    { x: 'Brazil', y: 65.06 }
];
let updatedData6: Object[] = [
    { x: 'India', y: 102.54 },
    { x: 'France', y: 103.56 },
    { x: 'Indonesia', y: 60.23 },
    { x: 'Iceland', y: 94.00 },
    { x: 'United States', y: 59.39 },
    { x: 'Greece', y: 50.11 },
    { x: 'Iran', y: 34.23 },
    { x: 'Canada', y: 60.40 },
    { x: 'Finland', y: 44.73 },
    { x: 'Brazil', y: 50.04 }
];
let updatedData7: Object[] = [
    { x: 'India', y: 98.84 },
    { x: 'France', y: 101.95 },
    { x: 'Indonesia', y: 60.86 },
    { x: 'Iceland', y: 89.51 },
    { x: 'United States', y: 58.26 },
    { x: 'Greece', y: 53.20 },
    { x: 'Iran', y: 34.28 },
    { x: 'Canada', y: 57.22 },
    { x: 'Finland', y: 42.99 },
    { x: 'Brazil', y: 51.68 }
];
let updatedData8: Object[] = [
    { x: 'India', y: 100.41 },
    { x: 'France', y: 108.54 },
    { x: 'Indonesia', y: 56.44 },
    { x: 'Iceland', y: 107.98 },
    { x: 'United States', y: 57.75 },
    { x: 'Greece', y: 56.34 },
    { x: 'Iran', y: 35.53 },
    { x: 'Canada', y: 57.49 },
    { x: 'Finland', y: 43.32 },
    { x: 'Brazil', y: 64.56 }
];
let updatedData9: Object[] = [
    { x: 'India', y: 104.45 },
    { x: 'France', y: 102.07 },
    { x: 'Indonesia', y: 61.19 },
    { x: 'Iceland', y: 97.05 },
    { x: 'United States', y: 59.53 },
    { x: 'Greece', y: 55.61 },
    { x: 'Iran', y: 41.84 },
    { x: 'Canada', y: 64.13 },
    { x: 'Finland', y: 43.69 },
    { x: 'Brazil', y: 64.73 }
];
let updatedData10: Object[] = [
    { x: 'India', y: 111.84 },
    { x: 'France', y: 95.53 },
    { x: 'Indonesia', y: 55.15 },
    { x: 'Iceland', y: 85.79 },
    { x: 'United States', y: 59.53 },
    { x: 'Greece', y: 58.93 },
    { x: 'Iran', y: 46.53 },
    { x: 'Canada', y: 59.52 },
    { x: 'Finland', y: 45.67 },
    { x: 'Brazil', y: 67.84 }
];

class UpdateColumnDataSource extends SampleBase<{}, {}> {
    private chart: ChartComponent;
    private intervalId: any;
    private yearIndex: number = 2;

    private updateClearInterval = (): void => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    private onChartLoad = (args: ILoadedEventArgs): void => {
        let  chart:  Element  =  document.getElementById('data-sorting-container');
        chart.setAttribute('title',  '');
    };

    private load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;

        this.updateClearInterval();
        this.intervalId = setInterval(() => {
            let container: HTMLElement = document.getElementById('data-sorting-container');
            if (container && container.id === args.chart.element.id) {
                let newData: Object[] = (eval('updatedData' + this.yearIndex) || []).map((item: { x: string; y: number; }) => {
                    return { x: item.x, y: item.y };
                });
                if (this.chart.series.length > 0) {
                    let newSource: Object[] = sort(newData, ['y'], true);
                    this.chart.series[0].setData(newSource, 1400);
                }
                this.yearIndex = this.yearIndex < 10 ? this.yearIndex + 1 : 2;
            } else {
                this.updateClearInterval();
            }
        }, 2000);
    }

    private axisRangeCalculated = (args: IAxisRangeCalculatedEventArgs): void => {
        if (args.axis.name === 'primaryYAxis') {
            if (args.maximum > 120) {
                args.interval = 30;
            }
            else {
                args.interval = 20;
            }
            if (args.maximum > 150) {
                args.maximum = 150;
            }
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section row'>
                    <ChartComponent
                        style={{ textAlign: 'center' }}
                        id='data-sorting-container'
                        ref={chart => this.chart = chart as ChartComponent}
                        primaryXAxis={{
                            valueType: 'Category',
                            majorGridLines: { width: 0 },
                            border: { width: 0 },
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            labelRotation: -90,
                            labelIntersectAction:'None',
                            interval: 1
                        }}
                        primaryYAxis={{
                            interval: 30,
                            title: 'Nitrogen Fertilizer Use (KG/Ha)',
                            labelFormat: '{value}',
                            border: { width: 0 },
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        title='Nitrogen Fertilizer Usage'
                        pointRender={labelRender}
                        width={Browser.isDevice ? '100%' : '75%'}
                        load={this.load.bind(this)}
                        loaded={this.onChartLoad.bind(this)}
                        axisRangeCalculated={this.axisRangeCalculated}
                    >
                        <Inject services={[ColumnSeries, Category, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={updatedData}
                                xName='x'
                                yName='y'
                                type='Column'
                                animation={{ enable: true }}
                                marker={{ visible: false, dataLabel: { visible: true, position: 'Top', format: '{value}', enableRotation: Browser.isDevice?true: false, angle : -90, font: { color: '#ffffff' } } }}
                                cornerRadius={{ topLeft: 5, topRight: 5 }}
                                columnWidth={0.7}
                            />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This column chart demonstrates the dynamic updating of data in real-time. The chart visualizes nitrogen fertilizer use per hectare of cropland, updating every few seconds to show sorted data over a span of years.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can observe how the column chart updates dynamically with sorted data using the <code>setData</code> method. The data shows nitrogen fertilizer usage from 2010 to 2019, and the chart periodically updates and sorts its data to reflect the latest information.
                    </p>
                    <p style={{ fontWeight: 500 }}><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to
                        inject <code>ColumnSeries</code> module using <code>Chart.Inject(ColumnSeries)</code> method.
                    </p>
                    <p>
                        More information on the column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/documentation/chart/Chart-types/column"
                            aria-label="Navigate to the documentation for Column Chart in TypeScript Chart control"> documentation
                            section</a>.
                    </p>
                </div>
            </div>
        );
    }
}

export default UpdateColumnDataSource;
