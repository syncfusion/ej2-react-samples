import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-treegrid';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { LoadEventArgs, QueryCellInfoEventArgs } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import { getTradeData } from './data';
import './live-data.css'


function LiveStream() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let treegrid: TreeGridComponent | null;
    let isDataBound = true;
    let updateButton: ButtonComponent | null;
    let clearButton: ButtonComponent | null;
    let feedDelayInput: NumericTextBoxComponent | null;
    let timerID: any;
    let initial: boolean = true;

    const load = function (this: TreeGridComponent, args: LoadEventArgs) {
        this.grid.on('data-ready', () => {
            if (initial) {
                document.getElementById('update1')?.click();
                initial = false;
                (feedDelayInput as NumericTextBoxComponent).element.addEventListener('keypress', (e: any) => {
                    if (e && e.key === 'Enter' && (feedDelayInput as any).element.parentElement.classList.contains('e-input-focus')) {
                        (feedDelayInput as NumericTextBoxComponent).value = parseInt((feedDelayInput as NumericTextBoxComponent).element.value);
                        (feedDelayInput as NumericTextBoxComponent).focusOut();
                        (updateButton as ButtonComponent).element.click();
                    }
                });
            }
        });
        this.grid.on('destroy', function () {
            if (timerID) {
                clearInterval(timerID);
                timerID = undefined;
            }
        });
    }

    const queryCellInfo = (args: QueryCellInfoEventArgs) => {
        if (args.column?.field === 'Ltp') {
            if ((args.data as any)['Ltp'] < 3000) {
                args.cell?.classList.remove('e-increase');
                args.cell?.classList.add('e-decrease');
            } else if ((args.data as any)['Ltp'] > 3000) {
                args.cell?.classList.remove('e-decrease');
                args.cell?.classList.add('e-increase');
            }
        } else if (args.column?.field === 'PercentageChange') {
            if ((args.data as any)['PercentageChange'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column?.field === 'Change') {
            if ((args.data as any)['Change'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column?.field === 'Index Funds' && (args.data as any)['hasChildRecords']) {
            (args as any).cell.getElementsByClassName('e-treecell')[0].classList.add('e-parent');
        }
        isDataBound = true;
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
        for (let i = 0; i < (treegrid as any).grid.currentViewData.length; i++) {
            if ((treegrid as any).grid.currentViewData[i] === undefined) {
                return;
            }
            let num = Math.floor(Math.random() * 40) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = (treegrid as any).grid.currentViewData[i]['Change'];
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
            const maxChange = 2 - (treegrid as any).grid.currentViewData[i]['Change'];
            const minChange = -2 - (treegrid as any).grid.currentViewData[i]['Change'];
            const newChange = Math.max(Math.min(num, maxChange), minChange);
            (treegrid as any).grid.setCellValue(
                (treegrid as any).grid.currentViewData[i]['id'],
                'Change',
                parseFloat(newChange.toFixed(2))
            );
            isDataBound = true;
            let newPercentageChange: number;
            if ((treegrid as any).grid.currentViewData[i]['indexfunds'] === "NIFTY 50") {
                newPercentageChange = Math.max(Math.min(newChange, 2), -2);
            } else if ((treegrid as any).grid.currentViewData[i]['indexfunds'] === "NIFTY BANK") {
                newPercentageChange = Math.max(Math.min(newChange, 4), -4);
            } else {
                const maxPercentageChange = 2 - (treegrid as any).grid.currentViewData[i]['PercentageChange'];
                const minPercentageChange = -2 - (treegrid as any).grid.currentViewData[i]['PercentageChange'];
                newPercentageChange = Math.max(Math.min(newChange, maxPercentageChange), minPercentageChange);
            }
            (treegrid as any).grid.setCellValue(
                (treegrid as any).grid.currentViewData[i]['id'],
                'PercentageChange',
                parseFloat(newPercentageChange.toFixed(2))
            );
            isDataBound = true;
            const val = (treegrid as any).grid.currentViewData[i]['Ltp'] + newPercentageChange;
            (treegrid as any).grid.setCellValue((treegrid as any).grid.currentViewData[i]['id'], 'Ltp', val);
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
            <label htmlFor="feedDelayInput" style={{ display: 'inline-block',fontSize: '14px', paddingLeft: '5px' }}>
                        <b>Feed Delay(ms):</b>
                    </label>
                    <NumericTextBoxComponent
                        id="feedDelayInput"
                        format="N0"
                        value={1000}
                        min={100}
                        max={5000}
                        step={1}
                        width={'150px'}
                        style={{ marginLeft: '7px' }}
                        ref={(scope) => {
                            feedDelayInput = scope;
                        }}
                        aria-label="Feed Delay in milliseconds"
                    />
                    <ButtonComponent
                        id="update1"
                        ref={(scope) => {
                            updateButton = scope;
                        }}
                        onClick={updateClick}
                        style={{ marginLeft: '10px' }}
                        aria-label="Start Data Update"
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
                        aria-label="Stop Data Update"
                    >
                        Stop Data Update
                    </ButtonComponent>
                </div>
                <TreeGridComponent
                    id="livestream"
                    dataSource={data}
                    enableHover={false}
                    treeColumnIndex={1}
                    childMapping='subtasks'
                    height={350}
                    ref={(g) => {
                        treegrid = g;
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
                            field="indexfunds"
                            headerText="Index Funds"
                            width="200"
                        />
                        <ColumnDirective
                            field="Ltp"
                            headerText="Last Traded Price"
                            width="150"
                            format="C2"
                            textAlign="Right"
                        />
                        <ColumnDirective
                            field="Change"
                            headerText="Change"
                            width="100"
                            format="C2"
                            type="number"
                            textAlign="Right"
                        />
                        <ColumnDirective field="PercentageChange" width="110" headerText="% Change" format="N0" textAlign="Right" />
                        <ColumnDirective
                            field="Open"
                            headerText="Open Price"
                            width="150"
                        />
                        <ColumnDirective
                            field="High"
                            width="190"
                            headerText="High Price"
                        />
                        <ColumnDirective
                            field="Low"
                            width="150"
                            headerText="Low Price"
                        />
                        <ColumnDirective
                            field="Weekhigh"
                            width="130"
                            headerText="52W H"
                        />
                        <ColumnDirective
                            field="Weeklow"
                            width="130"
                            headerText="52W L"
                        />
                    </ColumnsDirective>
                </TreeGridComponent>
                <br/>
                    <p>
                        <b>
                            Disclaimer :
                        </b>The index fund data showcased in this sample is for demonstration purposes only and does not reflect
                        actual or
                        real-time data.
                    </p>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how frequently Tree Grid cells are updated in real-time data at a set interval.
                </p>
            </div>

            <div id="description">
                <p> The updating of Tree Grid cells can be done without any performance lagging by using the 
                    <a target="_blank"
                    href="https://ej2.syncfusion.com/documentation/api/treegrid/#setcellvalue">setCellValue
                    </a> method.
                    The style of Tree Grid cells can be customized using the 
                    <a target="_blank"
                    href="https://ej2.syncfusion.com/documentation/api/treegrid/#querycellinfo">queryCellInfo
                    </a> event.
                </p>
                <p>In this demo,</p>
                <ul>
                    <li> Clicking the start update button triggers automatic updates of 
                        Tree Grid cells at the interval set in the feed
                        delay
                        text box which is a milliseconds format.</li>
                    <li> Clicking the stop update button will halt the automatic updating of Tree Grid cells.</li>
                </ul>
                <p>
                    More information on the Tree Grid instantiation can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/treegrid/getting-started/'> documentation section.</a>
                </p>
            </div>
        </div>
    )
}
export default LiveStream;
