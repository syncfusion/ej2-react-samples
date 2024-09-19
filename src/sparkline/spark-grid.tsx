/**
 * Sample for sparkline in grid
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { enableRipple } from '@syncfusion/ej2-base';
import {
    SparklineComponent, SparklineTheme,
    ISparklineLoadedEventArgs
} from '@syncfusion/ej2-react-charts';
import { GridComponent, ColumnsDirective, ColumnDirective, TextAlign } from '@syncfusion/ej2-react-grids';
import { orderdata } from './data-source';
import { SampleBase } from '../common/sample-base';
enableRipple(true);
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export interface GridData {
    EmployeeID: string;
}

export class SparkGrid extends SampleBase<{}, {}> {
    private sparklineInstance: SparklineComponent;
    public load(args: ISparklineLoadedEventArgs): void {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Fluent2';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as SparklineTheme;
    }

    private lineData: Object[] = [
        [0, 6, 4, 1, 3, 2, 5],
        [5, 4, 6, 3, 1, 2, 0],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [2, 4, 0, 3, 5, 6, 1],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6]
    ];
    private columnData: Object[] = [
        [0, 6, -4, 1, -3, 2, 5],
        [5, -4, 6, 3, -1, 2, 0],
        [6, 4, 0, 3, -2, 5, 1],
        [4, -6, 3, 0, 1, -2, 5],
        [3, 5, -6, -4, 0, 1, 2],
        [1, -3, 4, -2, 5, 0, 6],
        [2, 4, 0, -3, 5, -6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, -6, 4, 1, -3, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [4, 6, -3, 0, 1, 2, 5],
        [3, -5, -6, 4, 0, 1, 2],
        [1, 3, -4, -2, 5, 0, 6],
        [2, -4, 0, -3, 5, 6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, 6, 4, -1, -3, 2, 5],
        [6, -4, 0, -3, 2, 5, 1],
        [4, 6, -3, 0, -1, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [3, 5, 6, -4, 0, 1, 2],
        [1, 3, -4, 2, -5, 0, 6]
    ];

    private getSparkData: Function = (type: string, count: number) => {
        if (type === 'line') {
            return this.lineData[count];
        } else {
            return this.columnData[count];
        }
    };

    private renderSparkline() {
        setTimeout(() => {
            for (let i: number = 1; i < 21; i++) {
                let line: SparklineComponent = new SparklineComponent({
                    height: '50px',
                    width: '150px',
                    lineWidth: 2,
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    dataSource: this.getSparkData('line', i)
                });
                line.appendTo('#spkline' + i);
                let column: SparklineComponent = new SparklineComponent({
                    height: '50px',
                    width: '150px',
                    type: 'Column',
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    negativePointColor: '#f7a816',
                    dataSource: this.getSparkData('column', i)
                });
                column.appendTo('#spkarea' + i);
                let winloss: SparklineComponent = new SparklineComponent({
                    height: '50px',
                    width: '150px',
                    type: 'WinLoss',
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    tiePointColor: 'darkgray',
                    negativePointColor: '#f7a816',
                    dataSource: this.getSparkData('column', i)
                });
                winloss.appendTo('#spkwl' + i);
            }
            // tslint:disable-next-line:align 
        }, 500);
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <GridComponent dataSource={orderdata} resizing={this.renderSparkline.bind(this)} load={this.renderSparkline.bind(this)}
                        allowSelection={false}
                        enableHover={true}
                        height='400'>
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='ID' textAlign='Right' width='40' />
                            <ColumnDirective field='CustomerID' headerText='Name' width='60' />
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='65' format='yMd' textAlign='Right' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='70' />
                            <ColumnDirective headerText='Tax per annum' template={(props: GridData) => {
                                return (<div id={"spkline" + props.EmployeeID}></div>);
                            }} textAlign='Center' width='100' />
                            <ColumnDirective headerText='One Day Index' template={(props: GridData) => {
                                return (<div id={"spkarea" + props.EmployeeID}></div>);
                            }} textAlign='Center' width='100' />
                            <ColumnDirective headerText='Year GR' template={(props: GridData) => {
                                return (<div id={"spkwl" + props.EmployeeID}></div>);
                            }} textAlign='Center' width='100' />
                        </ColumnsDirective>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates rendering sparklines in data grid control.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render sparkline inside the data grid control.
                     </p>
                </div>
            </div>
        )
    }
}
