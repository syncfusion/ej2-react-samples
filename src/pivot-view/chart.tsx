import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { Pivot_Data } from './data-source'
import { IGridValues, IAxisSet, PivotEngine } from '@syncfusion/ej2-pivotview';
import { Chart, Category, Legend, Tooltip, ColumnSeries, Series, LineSeries, SeriesModel, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { extend } from '@syncfusion/ej2-base';
import './chart.css';

/**
 * PivotView Sample with Chart integration.
 */

let dataSource: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    data: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' }],
    filters: []
};

export class ChartIntegration extends SampleBase<{}, {}> {
    public onInit: boolean = true;
    public measure: string = 'In Stock';
    public engineModule: PivotEngine;
    public chart: Chart;
    public pivotGridObj: PivotViewComponent;
    public measureOptions: { [key: string]: Object }[] = [{
        id: 'In Stock',
        type: 'In Stock'
    },
    {
        id: 'Unit Sold',
        type: 'Unit Sold'
    }
    ];

    onChange(args: ChangeEventArgs): void {
        this.measure = args.value.toString();
        this.onChartLoad();
    }
    onChartLoad(): void {
        if (this.onInit && this.pivotGridObj) {
            this.onInit = false;
            this.engineModule = extend({}, this.pivotGridObj.engineModule, null, true) as PivotEngine;
        }
        if (this.engineModule) {
            let valuesContent: IGridValues = this.engineModule.valueContent;
            let data: IGridValues = [];
            for (let cCnt: number = 0; cCnt < valuesContent.length; cCnt++) {
                if (!valuesContent[cCnt][0].type) {
                    data[cCnt] = valuesContent[cCnt];
                }
            }
            let chartSeries: SeriesModel[];
            for (let cCnt: number = 0; cCnt < 1; cCnt++) {
                if (data[cCnt]) {
                    for (let rCnt: number = this.measure === 'In Stock' ? 1 : (this.measure ? 2 : 1); rCnt < Object.keys(data[cCnt]).length; rCnt++) {
                        if (data[cCnt][rCnt] && !(this.engineModule.pivotValues[0][rCnt] as IAxisSet).type && !data[cCnt][rCnt].type && rCnt > 0) {
                            let colText: string = (this.engineModule.pivotValues[0][rCnt] as IAxisSet).formattedText;
                            if (!chartSeries) {
                                chartSeries = [{
                                    dataSource: data,
                                    xName: cCnt + '.valueSort.levelName',
                                    yName: rCnt + '.value',
                                    type: 'Column',
                                    name: colText
                                }];
                            } else {
                                chartSeries.push({
                                    dataSource: data,
                                    xName: cCnt + '.valueSort.levelName',
                                    yName: rCnt + '.value',
                                    type: 'Column',
                                    name: colText
                                });
                            }
                            rCnt++;
                        }
                    }
                }
            }
            if (this.chart && this.chart.element) {
                this.chart.primaryYAxis = {
                    title: this.measure
                };
                this.chart.primaryXAxis = {
                    valueType: 'Category',
                    title: 'Country',
                    labelIntersectAction: 'Rotate45'
                };
                this.chart.series = chartSeries;
                this.chart.refresh();
            } else {
                Chart.Inject(ColumnSeries, LineSeries, Legend, Tooltip, Category);
                this.chart = new Chart({
                    title: 'Sales Analysis',
                    legendSettings: {
                        visible: true
                    },
                    tooltip: {
                        enable: true
                    },
                    primaryYAxis: {
                        title: this.measure || 'In Stock',
                    },
                    primaryXAxis: {
                        valueType: 'Category',
                        title: 'Country',
                        labelIntersectAction: 'Rotate45'
                    },
                    series: chartSeries,
                    load: (args: ILoadedEventArgs) => {
                        let selectedTheme: string = location.hash.split('/')[1];
                        selectedTheme = selectedTheme ? selectedTheme : 'Material';
                        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
                    }
                }, '#chart');
                this.chart.refresh();
            }
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section'>
                    <PivotViewComponent id='PivotView' ref={d => this.pivotGridObj = d} dataSource={dataSource} width={'100%'} height={'300'} dataBound={this.onChartLoad} gridSettings={{ columnWidth: 120 }}>
                    </PivotViewComponent>
                    <br />
                    <br />
                    <div id="chart" style={{ height: '450px' }}></div>
                    <div id='ddldiv' style={{ float: 'right', marginRight: '10px' }}>
                        <DropDownListComponent change={this.onChange.bind(this)} width={120} id="etype" index={0} enabled={true} dataSource={this.measureOptions} fields={{ text: 'type', value: 'id' }} />
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the integration of pivotgrid data into a simple chart widget.</p>
                </div>
                <div id="description">
                    <p>In this sample, the stock and sales of certain products, across different countries over certain fiscal years are acquired
                        from the pivotgrid and plotted in the chart widget as series. The
                        <b> stock</b> and
                        <b> sales</b> values can be switched using the drop-down list located on the top-right corner of the chart widget.
                    </p>
                    <p>
                        Since we have only a simple chart now, we have bound the aggregated pivotgrid data alone without the major UI interaction
                        like drill-down. On pivotchart implementation in the near future, we will provide rich UI interaction.
                    </p>
                </div>
            </div>
        )
    }
}