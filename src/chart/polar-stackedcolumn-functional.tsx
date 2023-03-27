/**
 * Sample for Polar Series with drawType Area
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType,
    Legend, Category, ILoadedEventArgs, PolarSeries, RadarSeries, Tooltip, ChartTheme, Highlight
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [{ x: 'N', y: 1, y1: 0.8, y2: 0.8, y3: 0.3, y4: 0.2, y5: 0.2 },
{ x: 'NNE', y: 0.9, y1: 0.7, y2: 0.7, y3: 0.3, y4: 0.2, y5: 0.2 },
{ x: 'NE', y: 0.7, y1: 0.8, y2: 0.5, y3: 1.1, y4: 1.2, y5: 0.5 },
{ x: 'ENE', y: 0.9, y1: 1, y2: 0.4, y3: 0.9, y4: 1, y5: 0.4 },
{ x: 'E', y: 0.9, y1: 0.6, y2: 0.9, y3: 0.5, y4: 0.7, y5: 0.4 },
{ x: 'ESE', y: 0.8, y1: 0.5, y2: 0.7, y3: 0.3, y4: 0.8, y5: 0.3 },
{ x: 'SE', y: 0.7, y1: 0.4, y2: 0.6, y3: 0.5, y4: 0.5, y5: 0.3 },
{ x: 'SSE', y: 1.4, y1: 0.4, y2: 0.5, y3: 0.4, y4: 0.6, y5: 0.2 },
{ x: 'S', y: 2, y1: 1.2, y2: 0.6, y3: 0.6, y4: 0.4, y5: 0.4 },
{ x: 'SSW', y: 2, y1: 2.5, y2: 2, y3: 1, y4: 0.5, y5: 0.3 },
{ x: 'SW', y: 2.2, y1: 2, y2: 1.8, y3: 1, y4: 0.4, y5: 0.2 },
{ x: 'WSW', y: 1.8, y1: 1.1, y2: 0.8, y3: 0.1, y4: 0.4, y5: 0.2 },
{ x: 'W', y: 1.6, y1: 1.8, y2: 2.1, y3: 1, y4: 0.4, y5: 0.4 },
{ x: 'WNW', y: 1.2, y1: 1.2, y2: 1.5, y3: 1.3, y4: 1.1, y5: 1.2 },
{ x: 'NW', y: 2, y1: 2.5, y2: 2, y3: 1, y4: 0.2, y5: 0.7 },
{ x: 'NNW', y: 1.8, y1: 1.1, y2: 0.8, y3: 0.1, y4: 0.4, y5: 0.2 }];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function PolarStackedColumn() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let loaded: EmitType<ILoadedEventArgs>;
    function change(): void {
        chartInstance.series[0].type = dropElement.value as ChartSeriesType;
        chartInstance.series[1].type = dropElement.value as ChartSeriesType;
        chartInstance.series[2].type = dropElement.value as ChartSeriesType;
        chartInstance.series[3].type = dropElement.value as ChartSeriesType;
        chartInstance.refresh();
    };
    let dropElement: DropDownListComponent;
    let droplist: { [key: string]: Object }[] = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                    <ChartComponent id='charts'style={{ textAlign: "center" }}  ref={chart => chartInstance = chart}
                        primaryXAxis={{
                            valueType: 'Category',
                            labelPlacement: 'OnTicks',
                            interval: 1,
                            coefficient: Browser.isDevice ? 80 : 100
                        }}
                        primaryYAxis={{
                        }}
                        load={load.bind(this)}
                        legendSettings= {{
                            visible: true,
                            enableHighlight: true
                        }}
                        title="Wind Rose Chart" loaded={onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[Tooltip, Legend,Highlight, Category, PolarSeries, RadarSeries]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='6-9'
                                type='Polar' drawType='StackingColumn' border={{ color: 'white', width: 1 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y1' name='9 -11'
                                type='Polar' drawType='StackingColumn' border={{ color: 'white', width: 1 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y2' name='11-14'
                                type='Polar' drawType='StackingColumn' border={{ color: 'white', width: 1 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y3' name='14-17'
                                type='Polar' drawType='StackingColumn' border={{ color: 'white', width: 1 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y4' name='17-20'
                                type='Polar' drawType='StackingColumn' border={{ color: 'white', width: 1 }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y5' name='23 Above'
                                type='Polar' drawType='StackingColumn' border={{ color: 'white', width: 1 }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                
            </div>
            <div id="action-description">
                <p>
                This sample shows a wind rose chart designed using polar and radar charts with a stacking column series. A wind rose chart helps visualize wind patterns, i.e., wind speed and wind direction.
                </p>
            </div>
            <div id="description">
                <p>
                In this example, you can see how to render and configure the polar and radar charts with a stacking column series. Switching between polar and radar series can be done using Series Type in the property panel.
                </p>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject
                    <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/polar-radar/">documentation section</a>.
                </p>
            </div>
        </div>
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };

    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
}
export default PolarStackedColumn;