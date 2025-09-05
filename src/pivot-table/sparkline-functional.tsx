import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-react-charts';
import './sparkline.css';
import * as rData from './pivot-data/sparkLine.json';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';

/**
 * PivotView SparkLine Sample.
 */
let Pivot_Data: IDataSet[] = (rData as any).data;
let chartType = 'Column';
let isDropDownExist = true;
let chartData: string[] = ['Line', 'Column', 'Area', 'WinLoss'];
let obj = {};
let sparkline: SparklineComponent;
SparklineComponent.Inject(SparklineTooltip);
let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    dataSource: Pivot_Data,
    rows: [{ name: 'Region' }, { name: 'Product' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Month' }],
    sortSettings: [{ name: 'Month', membersOrder: ['January'] }],
    expandAll: false,
    filters: [],
    drilledMembers: [{ name: 'Region', items: ['Asia'] }]
};

function SparkLine () {

    let gridSettings = {
        columnWidth: 110,
        rowHeight: 70,
        queryCellInfo: queryCellInfo.bind(this),
        columnRender: columnRender.bind(this),
        headerCellInfo: headerCellInfo.bind(this)
    };
    let pivotObj: PivotViewComponent;

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    function queryCellInfo(args): void {
        let colIndex = Number(args.cell.getAttribute('aria-colindex')) - 1;
        if (args.data[colIndex].isGrandSum && args.data[colIndex].columnHeaders == '') {
            args.cell.innerText = '';
            let div = document.createElement('div');
            div.id = 'chart' + args.data[colIndex].rowIndex;
            div.style.marginTop = '20px';
            args.cell.appendChild(div);

            let data: any = [];
            for (let i = 1; i < Object.keys(args.data).length - 1; i++) {
                let object = {
                    x: i,
                    xval: args.data[i].columnHeaders,
                    yval: args.data[i].actualValue,
                };
                data.push(object);
            }
            obj[args.data[colIndex].rowIndex] = data;
        }
    }

    function headerCellInfo(args): void {
        if (args.cell?.column?.customAttributes?.cell.type == 'grand sum') {
            let input = document.createElement('input');
            input.type = 'text';
            input.tabIndex = 1;
            input.id = 'grandTotal_dropdown';
            args.node.style.textAlign = 'right';
            args.node.querySelector('.e-pivotcell-container').appendChild(input);
            args.node.querySelector('.e-headertext').style.alignSelf = 'unset';
            args.node.querySelector('.e-headertext').innerText = 'Total Sales Comparison';
            isDropDownExist = true;
        }
    }

    function columnRender(args): void {
        args.columns[0].width = 175;
        for (let i = 1; i < args.columns.length - 1; i++) {
            args.columns[i].width = 140;
        }
        args.columns[args.columns.length - 1].width = 500;
    }

    function onDataBound(): void {
        if (isDropDownExist) {
            isDropDownExist = false;
            let chartTypeDropDown: DropDownList = new DropDownList({
                floatLabelType: 'Auto',
                dataSource: chartData,
                value: chartType,
                width: 200,
                change: (args: any) => {
                    chartType = args.value;
                    pivotObj.refreshData();
                },
            });
            chartTypeDropDown.appendTo('#grandTotal_dropdown');
        }
        let keys = Object.keys(obj);
        for (let i = 0; i < Object.keys(obj).length; i++) {
            sparkline = new SparklineComponent({
                height: '30px',
                lineWidth: 1,
                type: chartType as any,
                valueType: 'Category',
                dataSource: obj[keys[i]],
                xName: 'xval',
                yName: 'yval',
                markerSettings: {
                    visible: ['High', 'Low'],
                    size: 3,
                },
                highPointColor: 'blue',
                lowPointColor: 'red',
                tiePointColor: 'pink',
                tooltipSettings: {
                    format: '${xval}: $ ${yval}',
                    visible: true,
                    trackLineSettings: {
                        visible: true,
                        color: '#033e96',
                        width: 1
                    }
                },
            });
            sparkline.appendTo('#chart' + keys[i]);
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section' id='pivot-table-section'>
                <PivotViewComponent id='PivotView_sparkline' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'450'} gridSettings={gridSettings}
                    showTooltip={false} dataBound={onDataBound}>
                </PivotViewComponent>
            </div>
            <div id="action-description">
                <p>This sample shows how to embed sparkline charts in Pivot Table cells to visually highlight trends and comparisons
                    in sales data. You can choose different sparkline types Line, Column, Area, or WinLoss directly from the grand
                    total header cell to analyze performance metrics at a glance.</p>
            </div>
            <div id="description">
                <p>This sample demonstrates how to embed <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/sparkline/getting-started/">Sparkline</a> charts within the
                    Pivot Table's grand total cells to visually summarize yearly sales performance across different regions.</p>
                <p>The charts are rendered by capturing relevant cell values during the <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#querycellinfo">queryCellInfo</a>
                    event and inserting the sparklines after the Pivot Table is fully rendered via the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/pivotview/#databound">dataBound</a> event.
                </p>
                <p>
                    A built-in dropdown in the grand total column header allows dynamic switching between Sparkline types at
                    runtime:</p>
                <ul>
                    <li><code>Line</code> - Displays trends with a continuous line.</li>
                    <li><code>Column</code> - Shows values as vertical bars for easy comparison.</li>
                    <li><code>Area</code> - Highlights magnitude with a filled line chart.</li>
                    <li><code>WinLoss</code> - Visualizes binary outcomes without exposing exact values.</li>
                </ul>
                <p>
                    Embedding the chart-type selector within the header keeps the interface compact and intuitive, enabling seamless
                    visual analysis with minimal performance overhead. </p>
                <br />
                <p>
                    More information on queryCellInfo can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#querycellinfo">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default SparkLine;