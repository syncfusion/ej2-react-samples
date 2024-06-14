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
import { updateSampleSection } from '../common/sample-base';

function LiveStream() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let grid: GridComponent | null;
    let isDataBound = true;
    let updateButton: ButtonComponent | null;
    let clearButton: ButtonComponent | null;
    let feedDelayInput: NumericTextBoxComponent | null;
    let timerID: any;
    let initial: boolean = true;

    const load = function (this: GridComponent, args: LoadEventArgs) {
        this.on('data-ready', () => {
            if (initial) {
                document.getElementById('update1')?.click();
                initial = false;
                (feedDelayInput as NumericTextBoxComponent).element.addEventListener('keypress', (e: any) => {
                    if (e && e.key === 'Enter' && (feedDelayInput as NumericTextBoxComponent).element.parentElement.classList.contains('e-input-focus')) {
                        (feedDelayInput as NumericTextBoxComponent).value = parseInt((feedDelayInput as NumericTextBoxComponent).element.value);
                        (feedDelayInput as NumericTextBoxComponent).focusOut();
                        (updateButton as ButtonComponent).element.click();
                    }
                });
            }
        });
        this.on('destroy', function () {
            if (timerID) {
                clearInterval(timerID);
                timerID = undefined;
            }
        });
    }

    const queryCellInfo = (args: QueryCellInfoEventArgs) => {
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
        } else if (isDataBound) {
            if (args.column?.field === 'Rating') {
                args.cell.innerHTML = '';
                const span = document.createElement('span');
                const span2 = document.createElement('span');
                if (args.data['Change'] === 0) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-intermediate-state-2', 'neutral', 'ic', 'side-space'], 'neutral', 'Neutral');
                } else if (args.data['Change'] < -2 && args.data['Net'] < 0) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-negc', 'e-chevron-down-double', 'below-0', 'ic', 'side-space'], 'below-0', 'Strongly Sell');
                } else if (args.data['Net'] < 0) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-negc', 'e-chevron-down', 'below-0', 'ic', 'side-space'], 'below-0', 'Sell');
                } else if (args.data['Change'] > 5 && args.data['Net'] > 10) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-posc', 'e-chevron-up-double', 'above-0', 'ic', 'side-space'], 'above-0', 'Strongly Buy');
                } else {
                    customizeRatingCell(span, span2, ['e-icons', 'e-posc', 'e-chevron-up', 'above-0', 'ic', 'side-space'], 'above-0', 'Buy');
                }
                args.cell.appendChild(span);
                args.cell.appendChild(span2);
            }
        }
        isDataBound = true;
    }
    const customizeRatingCell = (span1: Element, span2: Element, span1_class: string[], span2_class: string, span2_text: string): void => {
        span1_class.forEach((item: string) => span1.classList.add(item));        
        span2.classList.add(span2_class);
        (span2 as HTMLElement).innerText = span2_text;
    }
    const updateCellDetails = (cell: Element | undefined, className: string) => {
        const div = document.createElement('div');
        const span1 = document.createElement('span');
        span1.classList.add('rowcell-left');
        div.classList.add(className);
        span1.innerHTML = (cell as Element).innerHTML;
        (cell as Element).innerHTML = '';
        div.appendChild(span1);
        (cell as Element).appendChild(div);
    }
    const updateCellValues = () => {
        let oldValue;
        let newValue;
        for (let i = 0; grid && i < grid?.currentViewData.length; i++) {
            if (grid?.currentViewData[i] === undefined) {
                return;
            }
            let num = Math.floor(Math.random() * 99) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = grid?.currentViewData[i]['Net'];
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
            isDataBound = true;
            grid?.setCellValue(
                grid?.currentViewData[i]['id'],
                'Net',
                parseFloat(num.toFixed(2))
            );
            isDataBound = true;
            newValue = parseFloat(
                (grid?.currentViewData[i]['Net'] - oldValue).toString().substring(0, 2)
            );
            grid?.setCellValue(
                grid?.currentViewData[i]['id'],
                'Change',
                parseFloat(newValue.toFixed(2))
            );
            isDataBound = true;
            const ratingValue = grid?.currentViewData[i]['Net'] < 0 ? 'Sell' : 'Buy';
            grid?.setCellValue(grid?.currentViewData[i]['id'], 'Rating', ratingValue);
            const val = num + newValue;
            grid?.setCellValue(grid?.currentViewData[i]['id'], 'NetIncome', val);
        }
    }

    const data = getTradeData;

    const updateClick = () => {
        if (!timerID) {
            (updateButton as ButtonComponent).disabled = true;
            (feedDelayInput as NumericTextBoxComponent).enabled = false;
            (clearButton as ButtonComponent).disabled = false;
            timerID = setInterval(updateCellValues, (feedDelayInput as NumericTextBoxComponent).value);
        }
    }
    const clearClick = () => {
        if (timerID) {
            (updateButton as ButtonComponent).disabled = false;
            (feedDelayInput as NumericTextBoxComponent).enabled = true;
            (clearButton as ButtonComponent).disabled = true;
            clearInterval(timerID);
            timerID = undefined;
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'inline-block', fontSize: '14px', paddingLeft:'5px' }}>
                        Feed Delay(ms):
                    </label>
                    <NumericTextBoxComponent
                        format="N0"
                        value={1000}
                        min={10}
                        max={5000}
                        step={1}
                        width={'150px'}
                        style={{ marginLeft: '7px' }}
                        ref={(scope) => {
                            feedDelayInput = scope;
                        }}
                        aria-label="Feed delay"
                    />
                    <ButtonComponent
                        id="update1"
                        ref={(scope) => {
                            updateButton = scope;
                        }}
                        onClick={updateClick}
                        style={{ marginLeft: '10px' }}
                    >
                        Start Data Update
                    </ButtonComponent>
                    <ButtonComponent
                        id="clear"
                        ref={(scope) => {
                            clearButton = scope;
                        }}
                        onClick={clearClick}
                        style={{ marginLeft: '10px' }}
                    >
                        Stop Data Update
                    </ButtonComponent>
                </div>
                <GridComponent
                    id="livestream"
                    dataSource={data}
                    enableVirtualization={true}
                    enableVirtualMaskRow={false}
                    enableHover={false}
                    rowHeight={38}
                    height={500}
                    ref={(g) => {
                        grid = g;
                    }}
                    allowSelection={false}
                    queryCellInfo={queryCellInfo}
                    load={load}
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
export default LiveStream;
