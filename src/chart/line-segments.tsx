/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Tooltip, ILoadedEventArgs, AnnotationsDirective, AnnotationDirective, DateTime, MultiColoredLineSeries, ChartAnnotation, SegmentsDirective, SegmentDirective, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let lineZoneData = [
    { x: new Date(1895, 0, 1), y: 84.07 },
    { x: new Date(1896, 0, 1), y: 60.96 },
    { x: new Date(1897, 0, 1), y: 60.71 },
    { x: new Date(1898, 0, 1), y: 61.72 },
    { x: new Date(1899, 0, 1), y: 66.04 },
    { x: new Date(1900, 0, 1), y: 44.2 },
    { x: new Date(1901, 0, 1), y: 50.55 },
    { x: new Date(1902, 0, 1), y: 36.83 },
    { x: new Date(1903, 0, 1), y: 57.66 },
    { x: new Date(1904, 0, 1), y: 45.97 },
    { x: new Date(1905, 0, 1), y: 55.37 },
    { x: new Date(1906, 0, 1), y: 64.26 },
    { x: new Date(1907, 0, 1), y: 69.85 },
    { x: new Date(1908, 0, 1), y: 46.23 },
    { x: new Date(1909, 0, 1), y: 69.6 },
    { x: new Date(1910, 0, 1), y: 54.61 },
    { x: new Date(1911, 0, 1), y: 62 },
    { x: new Date(1912, 0, 1), y: 49.53 },
    { x: new Date(1913, 0, 1), y: 72.9 },
    { x: new Date(1914, 0, 1), y: 63.5 },
    { x: new Date(1915, 0, 1), y: 69.85 },
    { x: new Date(1916, 0, 1), y: 96.27 },
    { x: new Date(1917, 0, 1), y: 55.63 },
    { x: new Date(1918, 0, 1), y: 61.21 },
    { x: new Date(1919, 0, 1), y: 48.51 },
    { x: new Date(1920, 0, 1), y: 56.13 },
    { x: new Date(1921, 0, 1), y: 53.34 },
    { x: new Date(1922, 0, 1), y: 51.56 },
    { x: new Date(1923, 0, 1), y: 62 },
    { x: new Date(1924, 0, 1), y: 50.8 },
    { x: new Date(1925, 0, 1), y: 58.17 },
    { x: new Date(1926, 0, 1), y: 59.94 },
    { x: new Date(1927, 0, 1), y: 44.96 },
    { x: new Date(1928, 0, 1), y: 32.51 },
    { x: new Date(1929, 0, 1), y: 59.94 },
    { x: new Date(1930, 0, 1), y: 65.53 },
    { x: new Date(1931, 0, 1), y: 39.62 },
    { x: new Date(1932, 0, 1), y: 82.55 },
    { x: new Date(1933, 0, 1), y: 57.15 },
    { x: new Date(1934, 0, 1), y: 46.23 },
    { x: new Date(1935, 0, 1), y: 60.96 },
    { x: new Date(1936, 0, 1), y: 73.15 },
    { x: new Date(1937, 0, 1), y: 92.71 },
    { x: new Date(1938, 0, 1), y: 53.59 },
    { x: new Date(1939, 0, 1), y: 62.99 },
    { x: new Date(1940, 0, 1), y: 49.02 },
    { x: new Date(1941, 0, 1), y: 52.58 },
    { x: new Date(1942, 0, 1), y: 40.13 },
    { x: new Date(1943, 0, 1), y: 56.64 },
    { x: new Date(1944, 0, 1), y: 47.75 },
    { x: new Date(1945, 0, 1), y: 45.72 },
    { x: new Date(1946, 0, 1), y: 64.26 },
    { x: new Date(1947, 0, 1), y: 61.72 },
    { x: new Date(1948, 0, 1), y: 50.29 },
    { x: new Date(1949, 0, 1), y: 80.26 },
    { x: new Date(1950, 0, 1), y: 85.34 },
    { x: new Date(1951, 0, 1), y: 59.44 },
    { x: new Date(1952, 0, 1), y: 62 },
    { x: new Date(1953, 0, 1), y: 66.8 },
    { x: new Date(1954, 0, 1), y: 64.52 },
    { x: new Date(1955, 0, 1), y: 42.67 },
    { x: new Date(1956, 0, 1), y: 57.66 },
    { x: new Date(1957, 0, 1), y: 53.85 },
    { x: new Date(1958, 0, 1), y: 58.17 },
    { x: new Date(1959, 0, 1), y: 55.63 },
    { x: new Date(1960, 0, 1), y: 57.4 },
    { x: new Date(1961, 0, 1), y: 37.59 },
    { x: new Date(1962, 0, 1), y: 56.13 },
    { x: new Date(1963, 0, 1), y: 39.88 },
    { x: new Date(1964, 0, 1), y: 61.72 },
    { x: new Date(1965, 0, 1), y: 59.44 },
    { x: new Date(1966, 0, 1), y: 59.94 },
    { x: new Date(1967, 0, 1), y: 54.36 },
    { x: new Date(1968, 0, 1), y: 55.12 },
    { x: new Date(1969, 0, 1), y: 76.45 },
    { x: new Date(1970, 0, 1), y: 53.09 },
    { x: new Date(1971, 0, 1), y: 51.56 },
    { x: new Date(1972, 0, 1), y: 59.18 },
    { x: new Date(1973, 0, 1), y: 62.99 },
    { x: new Date(1974, 0, 1), y: 80.01 },
    { x: new Date(1975, 0, 1), y: 66.29 },
    { x: new Date(1976, 0, 1), y: 44.7 },
    { x: new Date(1977, 0, 1), y: 40.13 },
    { x: new Date(1978, 0, 1), y: 80.52 },
    { x: new Date(1979, 0, 1), y: 84.07 },
    { x: new Date(1980, 0, 1), y: 67.06 },
    { x: new Date(1981, 0, 1), y: 24.89 },
    { x: new Date(1982, 0, 1), y: 72.14 },
    { x: new Date(1983, 0, 1), y: 52.83 },
    { x: new Date(1984, 0, 1), y: 34.29 },
    { x: new Date(1985, 0, 1), y: 36.07 },
    { x: new Date(1986, 0, 1), y: 36.83 },
    { x: new Date(1987, 0, 1), y: 55.12 },
    { x: new Date(1988, 0, 1), y: 50.04 },
    { x: new Date(1989, 0, 1), y: 52.07 },
    { x: new Date(1990, 0, 1), y: 70.61 },
    { x: new Date(1991, 0, 1), y: 60.2 },
    { x: new Date(1992, 0, 1), y: 52.83 },
    { x: new Date(1993, 0, 1), y: 81.28 },
    { x: new Date(1994, 0, 1), y: 56.9 },
    { x: new Date(1995, 0, 1), y: 80.77 },
    { x: new Date(1996, 0, 1), y: 71.63 },
    { x: new Date(1997, 0, 1), y: 71.37 },
    { x: new Date(1998, 0, 1), y: 85.09 },
    { x: new Date(1999, 0, 1), y: 79.5 },
    { x: new Date(2000, 0, 1), y: 54.36 },
    { x: new Date(2001, 0, 1), y: 46.99 },
    { x: new Date(2002, 0, 1), y: 51.05 },
    { x: new Date(2003, 0, 1), y: 33.78 },
    { x: new Date(2004, 0, 1), y: 50.04 },
    { x: new Date(2005, 0, 1), y: 68.58 },
    { x: new Date(2006, 0, 1), y: 66.29 },
    { x: new Date(2007, 0, 1), y: 56.39 },
    { x: new Date(2008, 0, 1), y: 56.13 },
    { x: new Date(2009, 0, 1), y: 40.64 },
    { x: new Date(2010, 0, 1), y: 66.55 },
    { x: new Date(2011, 0, 1), y: 41.91 },
    { x: new Date(2012, 0, 1), y: 53.09 },
    { x: new Date(2013, 0, 1), y: 60.2 },
    { x: new Date(2014, 0, 1), y: 34.8 },
    { x: new Date(2015, 0, 1), y: 46.48 },
    { x: new Date(2016, 0, 1), y: 51.82 },
    { x: new Date(2017, 0, 1), y: 82.04 },
    { x: new Date(2018, 0, 1), y: 46.99 },
    { x: new Date(2019, 0, 1), y: 65.02 },
    { x: new Date(2020, 0, 1), y: 70.1 },
    { x: new Date(2021, 0, 1), y: 53.09 },
    { x: new Date(2022, 0, 1), y: 41.66 },
    { x: new Date(2023, 0, 1), y: 74.68 },
    { x: new Date(2024, 0, 1), y: 82.8 },
    { x: new Date(2025, 0, 1), y: 35.31 }
];
let content = "<div style='color:#228B22; font-weight:bold; font-size:14px'>Medium</div>";
let content1 = "<div style='color:#0047AB; font-weight:bold;font-size:14px'>High</div>";
let content2 = "<div style='color:#D32F2F; font-weight:bold; font-size:14px'>Low</div>";

export class LineZone extends SampleBase<{}, {}> {
    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'DateTime', minimum: new Date(1895, 0, 1), maximum: new Date(2025, 0, 1), edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}mm', title: 'Precipitation (mm)', minimum: 10, maximum: 100, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} tooltip={{ enable: true, showNearestTooltip: true, enableAnimation: false, header: '<b>Rainfall</b>', format: '${point.x} : <b>${point.y}</b>', enableHighlight: true }} legendSettings={{ visible: false }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title="Annual Mean Precipitation in the United States (1895-2025)" subTitle='Source: ncei.noaa.gov' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[MultiColoredLineSeries, ChartAnnotation, DateTime, Tooltip, Highlight]} />
                        <AnnotationsDirective>
                            <AnnotationDirective content={content} coordinateUnits='Point' verticalAlignment='Middle' x={new Date(1959, 0, 1)} y={65}></AnnotationDirective>
                            <AnnotationDirective content={content1} coordinateUnits='Point' verticalAlignment='Middle' x={new Date(1916, 0, 1)} y={96.27}></AnnotationDirective>
                            <AnnotationDirective content={content2} coordinateUnits='Point' verticalAlignment='Middle' x={new Date(1981, 0, 1)} y={24.89}></AnnotationDirective>
                        </AnnotationsDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={lineZoneData} xName="x" width={2} yName="y" type="MultiColoredLine" segmentAxis="Y" marker={{ visible: true, isFilled: true, border: { width: 2, color: 'white' } }}>
                                <SegmentsDirective>
                                    <SegmentDirective value={50} color="#D32F2F"></SegmentDirective>
                                    <SegmentDirective value={65} color="#228B22"></SegmentDirective>
                                    <SegmentDirective color="#0047AB"></SegmentDirective>
                                </SegmentsDirective>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample visualizes the annual mean rainfall in Australia with multi-colored line series in the chart. Data points are enhanced with segments and tooltips.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the points in a particular range by using <code>MultiColoredLine</code> series.
                        Points under the range can be configured with <code>color</code> and <code>dashArray</code> properties in the ChartSegment.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use line series,
                        we need to inject <code>MultiColoredLineSeries</code> module using <code>Chart.Inject(MultiColoredLineSeries)</code> method.
                    </p>
                    <p>
                        More information on the line series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#line-charts" aria-label="Navigate to the documentation for Line Chart in React Chart component">documentation section</a>.
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