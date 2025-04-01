/**
 * Sample for Selection in chart
 */
import * as React from "react";
import * as ReactDOM from 'react-dom';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs,
    Selection, SelectionMode, ColumnSeries, Legend, Category, ScatterSeries, ChartTheme, HighlightMode,
    SelectionPattern, Highlight
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    ColorPickerComponent,
    ColorPickerEventArgs,
  } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'CHN', y: 17 }, { x: 'USA', y: 19 },
    { x: 'IDN', y: 29 }, { x: 'JAP', y: 13 },
    { x: 'BRZ', y: 24 }
];
export let data2: any[] = [
    { x: 'CHN', y: 54 }, { x: 'USA', y: 67 },
    { x: 'IDN', y: 65 }, { x: 'JAP', y: 61 },
    { x: 'BRZ', y: 68 }
];
export let data3: any[] = [
    { x: 'CHN', y: 9 }, { x: 'USA', y: 14 },
    { x: 'IDN', y: 6 }, { x: 'JAP', y: 26 },
    { x: 'BRZ', y: 8 }
];

export class SelectionChart extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private patternDropDownList: DropDownListComponent;
    private highlightDropDownList: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { value: 'Point' },
        { value: 'Series' },
        { value: 'Cluster' }
    ];
    private patternTypes: { [key: string]: Object }[] = [
        { value: 'None' },
        { value: 'DiagonalForward' },
        { value: 'Chessboard' },
        { value: 'Triangle' },
        { value: 'Box' },
        { value: 'HorizontalDash' }
    ];
    private patternTypes2: { [key: string]: Object }[] = [
        { value: 'None' },
        { value: 'Dots' },
        { value: 'Chessboard' },
        { value: 'Triangle' },
        { value: 'Tile' },
        { value: 'Grid' }
    ];
    private checkElement: HTMLInputElement;
    private change(): void {
        let checkBox: HTMLInputElement = document.getElementById('highlightCheckbox') as HTMLInputElement;
        this.chartInstance.selectionMode = this.dropElement.value as SelectionMode;
        if (checkBox.checked) {
            this.chartInstance.highlightMode = this.dropElement.value as HighlightMode;
        } else {
            this.chartInstance.highlightMode = 'None';
        }
        this.chartInstance.dataBind();
    }
    private check(): void {
        this.chartInstance.isMultiSelect = this.checkElement.checked;
    }

    private selectionChange(): void {
        this.chartInstance.selectionPattern = this.patternDropDownList.value as SelectionPattern;
    }

    private hightlightPatternChange(): void {
        let checkBox: HTMLInputElement = document.getElementById('highlightCheckbox') as HTMLInputElement;
        if (checkBox.checked) {
            this.chartInstance.highlightPattern = this.highlightDropDownList.value as SelectionPattern;
        } else {
            this.chartInstance.highlightPattern = 'None';
        }
    }

    private highlightChange(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.checked) {
            this.chartInstance.highlightMode = this.chartInstance.selectionMode as HighlightMode;
            this.chartInstance.highlightPattern = this.highlightDropDownList.value as SelectionPattern;
        } else {
            this.chartInstance.highlightMode = this.chartInstance.highlightPattern = 'None';
        }
    }

    // function to handle the ColorPicker change event
    private onChange(args: ColorPickerEventArgs): void {
    this.chartInstance.highlightColor = args.currentValue.hex;
    this.chartInstance.dataBind();
  }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }}
                            primaryXAxis={{
                                title: 'Countries',
                                valueType: 'Category',
                                interval: 1,
                                labelIntersectAction: 'Rotate90',
                                majorGridLines: { width: 0 }
                            }}
                            primaryYAxis={{
                                title: 'Distribution',
                                labelFormat: '{value}%',
                                interval: 20,
                                lineStyle: { width: 0 },
                                majorTickLines: { width: 0 }
                            }}
                            load={this.load.bind(this)}
                            title='Age Distribution by Country' loaded={this.onChartLoad.bind(this)}
                            legendSettings={{ visible: true, toggleVisibility: false }}
                            selectionMode='Point'
                            highlightMode='None'
                            selectionPattern='None'
                            highlightPattern='None'>
                            <Inject services={[Selection, ColumnSeries, Legend, Category, ScatterSeries, Highlight]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' width={2} yName='y' name='Age 0-14' type='Column'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data2} xName='x' width={2} yName='y' name='Age 15-64' type='Column'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data3} xName='x' width={2} yName='y' name='Age 65 & Above' type='Column'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody> <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Selection Mode:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="selmode" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Point" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div id="multiSelection">Enable Multi-selection:</div>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <div><input type="checkbox" id="select" onChange={this.check.bind(this)} ref={d => this.checkElement = d} aria-labelledby="Checkbox unchecked"/></div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Selection Patterns:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="patternMode" change={this.selectionChange.bind(this)} ref={d => this.patternDropDownList = d} dataSource={this.patternTypes} fields={{ text: 'value', value: 'value' }} value="None" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Highlight Color:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <ColorPickerComponent
                                            id="inline-palette"
                                            mode="Palette"
                                            value="null"
                                            change={this.onChange.bind(this)}
                                        ></ColorPickerComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div id="highLight">Enable Hightlight Pattern:</div>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <div><input type="checkbox" id="highlightCheckbox" onChange={this.highlightChange.bind(this)} aria-labelledby="Checkbox unchecked"/></div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Highlight Patterns:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="highpattern" change={this.hightlightPatternChange.bind(this)} ref={d => this.highlightDropDownList = d} dataSource={this.patternTypes2} fields={{ text: 'value', value: 'value' }} value="None" />
                                        </div>
                                    </td>
                                </tr></tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    This sample demonstrates the selection behavior and its mode along with the highlight and highlight patterns in the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                    In this sample, any point or series can be selected in the chart by clicking on or touching the point. You can also change the selection mode by changing the <code>Selection Mode</code> option in the properties panel. You can enable multiple selections with the <code>Enable Multi Selection</code> option. You can also select a point while loading a chart using the <code>SelectedDataIndexes</code> option.

While hovering the point, the point is highlighted using the <code>Enable Highlight</code> option, as well as you can set different highlight patterns and colors using the <code>Highlight Patterns</code> and <code>Highlight Color</code> option.
                    </p>
                    <p>
                        Tap to select a point or series, double tap and drag to enable rectangular selection in touch enabled devices.
                    </p>
                    <p>Chart supports seven mode of selection which can be set using <code>SelectionMode</code> property.
                    </p>
                    <ul>
                        <li><code>Series</code> - Select the series in chart.</li>
                        <li><code>Point</code> - Select a point in the series .</li>
                        <li><code>Cluster</code> - Select a group of points in the chart.</li>
                        <li><code>DragXY</code> - Rectangular selection with respect to both axis.</li>
                        <li><code>DragX</code> - Rectangular selection with respect to horizontal axis.</li>
                        <li><code>DragY</code> - Rectangular selection with respect to vertical axis.</li>
                        <li><code>Lasso</code> - Select free form of selection area points.</li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use selection feature, we need to inject
                        <code>Selection</code> module into <code>services</code>.
                    </p>
                    <br />
                    <p>
                        More information about selection can be found in this &nbsp;
                      <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/selection/" aria-label="Navigate to the documentation for Selection in React Chart component">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
      
}