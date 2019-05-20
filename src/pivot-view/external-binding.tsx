import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, CellSelectedObject, PivotCellSelectedEventArgs } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { HeatMap, Adaptor, ILoadedEventArgs, HeatMapTheme, Legend, Tooltip } from '@syncfusion/ej2-heatmap';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './chart.css';
/**
 * PivotView Sample with Selection feature with Heatmap integration.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSource: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    data: Pivot_Data,
    expandAll: true,
    values: [{ name: 'Sold', caption: 'Units Sold' }],
    filters: []
};

export class Integration extends SampleBase<{}, {}> {
    public onInit: boolean = true;
    public heatmap: HeatMap;
    public pivotGridObj: PivotViewComponent;
    public selectedCells: CellSelectedObject[];
    public measureList: { [key: string]: string } = {};
    public xLabels: string[] = [];
    public yLabels: string[] = [];
    public jsonDataSource: object[] = [];

    onDataBound(): void {
        if (this.onInit) {
            this.pivotGridObj.grid.selectionModule.selectCellsByRange({ cellIndex: 1, rowIndex: 1 }, { cellIndex: 3, rowIndex: 4 });
        }
    }

    onSelected(args: PivotCellSelectedEventArgs): void {
        this.selectedCells = args.selectedCellsInfo;
        if (this.selectedCells && this.selectedCells.length > 0) {
            this.frameSeries();
            this.heatmapUpdate();
        }
    }

    frameSeries(): void {
        let columnGroupObject: { [key: string]: { x: string, y: number }[] } = {};
        this.xLabels = [];
        this.yLabels = [];
        this.jsonDataSource = [];
        for (let cell of this.selectedCells) {
            if (cell.measure !== '') {
                let columnSeries: string = (this.pivotGridObj.dataSource.values.length > 1 && this.measureList[cell.measure]) ?
                    (cell.columnHeaders.toString() + ' ~ ' + this.measureList[cell.measure]) : cell.columnHeaders.toString();
                columnSeries = columnSeries == '' && cell.measure != '' ? 'Grand Total' : columnSeries;
                let rHeaders: string = cell.rowHeaders == '' && cell.currentCell.axis != 'column' ? 'Grand Total' : cell.rowHeaders.toString();
                if (columnGroupObject[columnSeries]) {
                    columnGroupObject[columnSeries].push({ x: rHeaders.toString(), y: Number(cell.value) });
                } else {
                    columnGroupObject[columnSeries] = [{ x: rHeaders.toString(), y: Number(cell.value) }];
                    this.yLabels.push(columnSeries);
                }
                if (this.xLabels.indexOf(rHeaders.toString()) == -1) {
                    this.xLabels.push(rHeaders.toString());
                }
            }
        }
        for (let xcnt: number = 0; xcnt < this.xLabels.length; xcnt++) {
            let xName: string = this.xLabels[xcnt];
            let row: object = { 'xMember': xName };
            for (let ycnt: number = 0; ycnt < this.yLabels.length; ycnt++) {
                let YName: string = this.yLabels[ycnt];
                let col: { x: string, y: number }[] = columnGroupObject[YName].filter(function (item) { return item.x == xName; });
                (row as any)[YName] = col.length > 0 ? col[0].y : '';
            }
            this.jsonDataSource.push(row);
        }
    }

    heatmapUpdate() {
        if (this.onInit) {
            this.onInit = false;
            HeatMap.Inject(Adaptor, Legend, Tooltip);
            this.heatmap = new HeatMap({
                titleSettings: {
                    text: 'Sales Analysis'
                },
                legendSettings: {
                    position: 'Top'
                },
                xAxis: {
                    title: { text: this.pivotGridObj.dataSource.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: this.xLabels,
                    labelRotation: 315
                },
                yAxis: {
                    title: { text: this.pivotGridObj.dataSource.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: this.yLabels,
                },
                dataSource: {
                    data: this.jsonDataSource,
                    isJsonData: true,
                    adaptorType: 'Table',
                    xDataMapping: 'xMember',
                },
                load: (args: ILoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as HeatMapTheme;
                },
            }, '#heatmap');
        } else {
            (this.heatmap.dataSource as any).data = this.jsonDataSource;
            this.heatmap.xAxis = {
                title: { text: this.pivotGridObj.dataSource.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: this.xLabels,
                labelRotation: 315
            };
            this.heatmap.yAxis = {
                title: { text: this.pivotGridObj.dataSource.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: this.yLabels
            };
            this.heatmap.refresh();
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section' style={{ overflow: 'auto' }}>
                    <PivotViewComponent id='PivotView' ref={d => this.pivotGridObj = d} dataSource={dataSource} width={'100%'} height={'300'} dataBound={this.onDataBound.bind(this)}
                        cellSelected={this.onSelected.bind(this)} gridSettings={{
                            columnWidth: 120, allowSelection: true,
                            selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
                        }}>
                    </PivotViewComponent>
                    <br />
                    <br />
                    <div id="heatmap" style={{ height: '450px' }}></div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates rendering Heatmap control by providing desired data from a pivot grid on selection. Not
                        only Heatmap, but any other control (including third party) can be used for this purpose.
                    </p>
                </div>
                <div id="description">
                    <p>In this sample, the cell selection feature is enabled with the api <code>allowSelection</code> property and its
                        type and mode are configured using the
                        <code>selectionSettings</code> property. The <code>cellSelected</code> event event gets fired on every selection
                        operation performed in the pivot grid. This event returns the selected cell information, like row header name,
                        column header name, measure name, and value. Based on this information, the heatmap will be plotted.
                    </p>
                </div>
            </div>
        )
    }
}