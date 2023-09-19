import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { HeatMapComponent, Tooltip, Inject, ILoadedEventArgs, HeatMapTheme, ISelectedEventArgs, SelectedCellDetails } from '@syncfusion/ej2-react-heatmap';
import * as data from './cell-seletion-data.json';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { ChartTheme, ChartComponent, Legend, ColumnSeries, Category, DataLabel, IChangedEventArgs, Tooltip as chartTooltip, ILoadedEventArgs as IChartLoadedEventsArgs, Chart, SeriesModel } from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

// custom code start
const SAMPLE_CSS: any = `
    #control-container {
        padding: 0px !important;
    }
    #source{
        float: right; margin-right: 10p
    }`;
// custom code end
/**
 * Heatmap CellSelection sample
 */
const CellSelection = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    const [series, setSeries] = useState<SeriesModel[]>((data as any).chartData);
    let heatmap = useRef<HeatMapComponent>(null);
    let chart = useRef<ChartComponent>(null);

    const cellSelected = (args: ISelectedEventArgs): void => {
        let data: SelectedCellDetails[] = args.data
        let length: number = data.length;
        let xAxis: string[] = [];
        let flag: boolean[] = []
        let series: any = [];
        let i: number;
        let columnData: any = {};
        for (i = 0; i < length; i++) {
            if (xAxis.indexOf(data[i].xLabel) === -1) {
                xAxis.push(data[i].xLabel);
                flag.push(false);
            }
        }
        for (i = 0; i < length; i++) {
            let index = xAxis.indexOf(data[i].xLabel);
            if (!flag[index]) {
                flag[index] = true;
                let column: any = {};
                column.type = 'Column';
                column.xName = 'x';
                column.yName = 'y';
                column.width = 2;
                column.name = data[i].xLabel;
                column.marker = { dataLabel: { visible: false } };
                column.dataSource = [];
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                column.dataSource.push(columnData);
                series.push(column);
            }
            else {
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                series[index].dataSource.push(columnData);
            }
        }
        setSeries(series);
        chart.current.refresh();
    };

    const load = (args: IChartLoadedEventsArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    }

    const loads = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
    };

    const Change = (): void => {
        heatmap.current.clearSelection();
        setSeries((data as any).chartData);
        chart.current.refresh();
    };

    return (
        <div>
            <div className='col-md-9 control-section'>
                {/* custom code start */}
                <style>{SAMPLE_CSS}</style>
                {/* custom code end */}
                <HeatMapComponent id='heatmap-container' style={{ height: '300px' }} ref={heatmap} titleSettings={{ text: 'Top export products 2014-2018, Value in USD million' }} xAxis={{ labels: ['Cereals', 'Meat', 'Spices', 'Tea', 'Edible Oil', 'Dairy Products', 'Wheat'] }} yAxis={{ labels: ['2014', '2015', '2016', '2017', '2018'] }} dataSource={(data as any).cellSelectionData} allowSelection={true} showTooltip={true} load={loads} cellSelected={cellSelected} paletteSettings={{ palette: [ { color: '#3C5E62 ' }, { color: '#86C843 ' } ] }}>
                    <Inject services={[Tooltip]} />
                </HeatMapComponent>
                <ChartComponent id="container1" style={{ height: '300px' }} ref={chart} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }} series={series} load={load.bind(this)} tooltip={{ enable: true }}>
                    <Inject services={[ColumnSeries, Legend, DataLabel, Category, chartTooltip]} />
                </ChartComponent>
                <div id="source">Source:
                    <a href="https://en.wikipedia.org/wiki/List_of_countries_by_oil_production" target="_blank">https://en.wikipedia.org/ </a>
                </div>
            </div>
            <div className="col-md-3 property-section">
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <ButtonComponent id="clearSelection" onClick={Change.bind(this)}>Clear Selection</ButtonComponent >
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample visualizes the revenue from the top exported products between the year 2014 and 2018, valued in USD million</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to selected the cell in heat map and render the column chart based on selected data.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the <code>Tooltip</code> module
                    using the <code>Heatmap.Inject(Tooltip)</code> method, and use a legend by injecting the <code>Legend</code> module using the
                    <code>Heatmap.Inject(Legend)</code> method.
                </p>
            </div>
        </div >
    );
}
export default CellSelection;