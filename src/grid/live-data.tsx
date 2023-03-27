import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Inject, LoadEventArgs,
    QueryCellInfoEventArgs, VirtualScroll
} from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { getTradeData } from './data';
import './live-data.css';
import { SampleBase } from '../common/sample-base';

function updateCellDetails(cell: Element | undefined, className: string): void {
    const div = document.createElement('div');
    const span1 = document.createElement('span');
    span1.classList.add('rowcell-left');
    div.classList.add(className);
    span1.innerHTML = (cell as Element).innerHTML;
    (cell as Element).innerHTML = '';
    div.appendChild(span1);
    (cell as Element).appendChild(div);
}

export class LiveStream extends SampleBase<{}, {}> {

    public grid: GridComponent | null;
    public isDataBound = true;
    public updateButton: ButtonComponent | null;
    public clearButton: ButtonComponent | null;
    public feedDelayInput: NumericTextBoxComponent | null;
    public data = getTradeData;
    public timerID: any;
    public initial: boolean = true;

    public destroyClear(args: object): void {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    }

    public dataBound(args: object): void {
        if (this.initial) {
            document.getElementById('update1')?.click();
            this.initial = false;
            this.feedDelayInput.element.addEventListener('keypress', (e: any) => {
                if (e && e.key === 'Enter' && this.feedDelayInput.element.parentElement.classList.contains('e-input-focus')) {
                    this.feedDelayInput.value = parseInt(this.feedDelayInput.element.value);
                    this.feedDelayInput.focusOut();
                    this.updateButton.element.click();
                }
            });
        }
    }

    public queryCellInfo(this: LiveStream, args: QueryCellInfoEventArgs): void {
        if (args.column?.field === 'NetIncome') {
            if ((args.data as object)['Net'] < 0) {
                args.cell?.classList.remove('e-increase');
                args.cell?.classList.add('e-decrease');
            } else if ((args.data as object)['Net'] > 0) {
                args.cell?.classList.remove('e-decrease');
                args.cell?.classList.add('e-increase');
            }
        } else if (args.column?.field === 'Change') {
            if ((args.data as object)['Change'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column?.field === 'Net') {
            if ((args.data as object)['Net'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (this.isDataBound) {
            if (args.column?.field === 'Rating') {
                args.cell.innerHTML = '';
                const span = document.createElement('span');
                const span2 = document.createElement('span');
                if ((args.data as object)['Change'] === 0) {
                    span.classList.add('e-icons');
                    span.classList.add('e-intermediate-state-2');
                    span.classList.add('neutral');
                    span.classList.add('ic');
                    span.classList.add('side-space');
                    span2.classList.add('neutral');
                    (span2 as HTMLElement).innerText = 'Neutral';
                    args.cell?.appendChild(span);
                    args.cell?.appendChild(span2);
                } else if ((args.data as object)['Change'] < -2 && (args.data as object)['Net'] < 0) {
                    span.classList.add('e-negc');
                    span.classList.add('e-icons');
                    span.classList.add('e-chevron-down-double');
                    span.classList.add('below-0');
                    span.classList.add('ic');
                    span.classList.add('side-space');
                    span2.classList.add('below-0');
                    (span2 as HTMLElement).innerText = 'Strongly Sell';
                    args.cell?.appendChild(span);
                    args.cell?.appendChild(span2);
                } else if ((args.data as object)['Net'] < 0) {
                    span.classList.add('e-negc');
                    span.classList.add('e-icons');
                    span.classList.add('e-chevron-down');
                    span.classList.add('below-0');
                    span.classList.add('ic');
                    span.classList.add('side-space');
                    span2.classList.add('below-0');
                    (span2 as HTMLElement).innerText = 'Sell';
                    args.cell?.appendChild(span);
                    args.cell?.appendChild(span2);
                } else if ((args.data as object)['Change'] > 5 && (args.data as object)['Net'] > 10) {
                    span.classList.add('e-posc');
                    span.classList.add('e-icons');
                    span.classList.add('e-chevron-up-double');
                    span.classList.add('above-0');
                    span.classList.add('ic');
                    span.classList.add('side-space');
                    span2.classList.add('above-0');
                    (span2 as HTMLElement).innerText = 'Strongly Buy';
                    args.cell?.appendChild(span);
                    args.cell?.appendChild(span2);
                } else {
                    span.classList.add('e-posc');
                    span.classList.add('e-icons');
                    span.classList.add('e-chevron-up');
                    span.classList.add('above-0');
                    span.classList.add('ic');
                    span.classList.add('side-space');
                    span2.classList.add('above-0');
                    (span2 as HTMLElement).innerText = 'Buy';
                    args.cell?.appendChild(span);
                    args.cell?.appendChild(span2);
                }
            }
        }
        this.isDataBound = true;
    }

    public updateCellValues(): void {
        let oldValue;
        let newValue;
        for (let i = 0; this.grid && i < this.grid?.currentViewData.length; i++) {
            if (this.grid?.currentViewData[i] === undefined) {
                return;
            }
            let num = Math.floor(Math.random() * 99) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = this.grid?.currentViewData[i]['Net'];
            if (i % 2 === 0) {
                num = num * 0.25;
            } else if (i % 3 === 0) {
                num = num * 0.83;
            } else if (i % 5 === 0) {
                num = num * 0.79;
            } else if (i % 4 === 0) {
                num = num * 0.42;
            } else {
                num = num * 0.51;
            }
            this.isDataBound = true;
            this.grid?.setCellValue(
                this.grid?.currentViewData[i]['id'],
                'Net',
                parseFloat(num.toFixed(2))
            );
            this.isDataBound = true;
            newValue = parseFloat(
                (this.grid?.currentViewData[i]['Net'] - oldValue).toString().substring(0, 2)
            );
            this.grid?.setCellValue(
                this.grid?.currentViewData[i]['id'],
                'Change',
                parseFloat(newValue.toFixed(2))
            );
            this.isDataBound = true;
            const ratingValue = this.grid?.currentViewData[i]['Net'] < 0 ? 'Sell' : 'Buy';
            this.grid?.setCellValue(this.grid?.currentViewData[i]['id'], 'Rating', ratingValue);
            const val = num + newValue;
            this.grid?.setCellValue(this.grid?.currentViewData[i]['id'], 'NetIncome', val);
        }
    }

    public updateClick() {
        if (!this.timerID) {
            (this.updateButton as ButtonComponent).disabled = true;
            (this.feedDelayInput as NumericTextBoxComponent).enabled = false;
            (this.clearButton as ButtonComponent).disabled = false;
            this.timerID = setInterval(this.updateCellValues.bind(this), (this.feedDelayInput as NumericTextBoxComponent).value);
        }
    }
    public clearClick() {
        if (this.timerID) {
            (this.updateButton as ButtonComponent).disabled = false;
            (this.feedDelayInput as NumericTextBoxComponent).enabled = true;
            (this.clearButton as ButtonComponent).disabled = true;
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    }
    render() {
        this.updateClick = this.updateClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.queryCellInfo = this.queryCellInfo.bind(this);
        this.dataBound = this.dataBound.bind(this);
        this.destroyClear = this.destroyClear.bind(this);
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div style={{ marginBottom: '10px' }}>
                        <h4 style={{ display: 'inline-block', fontSize: '14px', paddingLeft: '5px' }}>
                            Feed Delay(ms):
                        </h4>
                        <NumericTextBoxComponent
                            format="N0"
                            value={1000}
                            min={10}
                            max={5000}
                            step={1}
                            width={'150px'}
                            style={{ marginLeft: '7px' }}
                            ref={(scope) => {
                                this.feedDelayInput = scope;
                            }}
                        />
                        <ButtonComponent
                            id="update1"
                            ref={(scope) => {
                                this.updateButton = scope;
                            }}
                            onClick={this.updateClick}
                            style={{ marginLeft: '10px' }}
                        >
                            Start Data Update
                        </ButtonComponent>
                        <ButtonComponent
                            id="clear"
                            ref={(scope) => {
                                this.clearButton = scope;
                            }}
                            onClick={this.clearClick}
                            style={{ marginLeft: '10px' }}
                        >
                            Stop Data Update
                        </ButtonComponent>
                    </div>
                    <GridComponent
                        id="livestream"
                        dataSource={getTradeData}
                        enableVirtualization={true}
                        enableVirtualMaskRow={false}
                        enableHover={false}
                        rowHeight={38}
                        height={500}
                        ref={(g) => {
                            this.grid = g;
                        }}
                        allowSelection={false}
                        queryCellInfo={this.queryCellInfo}
                        destroyed={this.destroyClear}
                        dataBound={this.dataBound}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                field="id"
                                headerText="ID"
                                width="140"
                                isPrimaryKey={true}
                                visible={false}
                            />
                            <ColumnDirective
                                field="CountryCode"
                                headerText="Ticker"
                                width="70"
                            />
                            <ColumnDirective
                                field="Change"
                                headerText="Change % 1D"
                                width="100"
                                format="N0"
                                textAlign="Right"
                            />
                            <ColumnDirective
                                field="Net"
                                headerText="Net"
                                width="100"
                                format="C2"
                                type="number"
                                textAlign="Right"
                            />
                            <ColumnDirective field="Rating" width="150" headerText="Technical Rating 1D" />
                            <ColumnDirective
                                field="NetIncome"
                                headerText="Net Income"
                                width="150"
                                format="C2"
                                type="number"
                                textAlign="Right"
                            />
                            <ColumnDirective
                                field="Sector"
                                width="160"
                                headerText="Sector"
                            />
                            <ColumnDirective
                                field="EmployeeCount"
                                width="130"
                                headerText="Employee Count"
                                textAlign="Right"
                            />
                        </ColumnsDirective>
                        <Inject services={[VirtualScroll]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates how frequently Grid cells are updated in real-time data at a set interval.
                    </p>
                </div>

                <div id="description">
                    <p> The updating of Grid cells can be done without any performance lagging by using the <code>setCellValue</code>
                        method.
                        The style of Grid cells can be customized using the <code>queryCellInfo</code> event.</p>
                    <p>In this demo,</p>
                    <ul>
                        <li> Clicking the start update button triggers automatic updates of Grid cells at the interval set in the feed delay
                            text box which is a milliseconds format.</li>
                        <li> Clicking the stop update button will halt the automatic updating of Grid cells.</li>
                    </ul>
                    <p>
                        More information on the queryCellInfo can be found in this
                        <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#querycellinfo"> documentation
                            section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
