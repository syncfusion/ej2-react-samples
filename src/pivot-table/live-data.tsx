import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { IDataOptions, PivotViewComponent, IDataSet, PivotChart, Inject } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ChartTheme } from '@syncfusion/ej2-react-charts';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import './live-data.css';

/**
 * PivotView LiveData Sample.
 */


export class LiveData extends SampleBase<{}, {}> {

    private pivotObj: PivotViewComponent;
    private timerID: any;
    private initial: boolean = true;
    private previousPivotValues: any;
    private updateButton: ButtonComponent;
    private clearButton: ButtonComponent;
    private feedDelayInput: NumericTextBoxComponent;
    private colourScheme: string[] = ['bg-fade', 'bg-fade1', 'bg-fade2'];

    private REGIONS = [
        {
            "Region": "North America",
            "Countries": ["Canada", "United States", "Mexico"]
        },
        {
            "Region": "Middle East",
            "Countries": ["Turkey", "Saudi Arabia"]
        },
        {
            "Region": "Europe",
            "Countries": ["Russia", "Germany", "France", "United Kingdom", "Italy"]
        },
        {
            "Region": "Africa",
            "Countries": ["South Africa"]
        },
        {
            "Region": "Asia Pacific",
            "Countries": ["Australia", "China", "India", "Indonesia",
                "Japan", "South Korea"]
        },
        {
            "Region": "South America",
            "Countries": ["Brazil"]
        },

    ];

    private DATA: IDataSet[] = [
        {
            "Category": "Agriculture",
            "Type": "Corn",
            "Spread": 0.01,
            "Open Price": 379.50,
            "Price": 379.8026,
            "Buy": 379.7976,
            "Sell": 379.8076,
            "Change": 0.3026,
            "Change(%)": 0.0797,
            "Volume": 11266
        },
        {
            "Category": "Agriculture",
            "Type": "Rice",
            "Spread": 0.01,
            "Open Price": 11.245,
            "Price": 10.4154,
            "Buy": 10.4104,
            "Sell": 10.4204,
            "Change": -0.8296,
            "Change(%)": -7.3779,
            "Volume": 220
        },
        {
            "Category": "Agriculture",
            "Type": "Wheat",
            "Spread": 0.01,
            "Open Price": 465.50,
            "Price": 465.52,
            "Buy": 465.50,
            "Sell": 465.50,
            "Change": 0.02,
            "Change(%)": 0.0043,
            "Volume": 4318
        },
        {
            "Category": "Agriculture",
            "Type": "Soybean",
            "Spread": 0.01,
            "Open Price": 1038.00,
            "Price": 1038.6171,
            "Buy": 1038.6121,
            "Sell": 1038.6221,
            "Change": 0.6171,
            "Change(%)": 0.0595,
            "Volume": 20356
        },
        {
            "Category": "Agriculture",
            "Type": "Coffee",
            "Spread": 0.01,
            "Open Price": 125.70,
            "Price": 125.69,
            "Buy": 125.70,
            "Sell": 125.70,
            "Change": -0.01,
            "Change(%)": -0.008,
            "Volume": 1654
        },
        {
            "Category": "Agriculture",
            "Type": "Cocoa",
            "Spread": 0.01,
            "Open Price": 307.00,
            "Price": 307.03,
            "Buy": 307.00,
            "Sell": 307.00,
            "Change": 0.03,
            "Change(%)": 0.001,
            "Volume": 978
        },
    ];

    private dataSourceSettings: IDataOptions = {
        dataSource: this.generateData(),
        enableSorting: true,
        columns: [{ name: 'Type' }],
        values: [{ name: 'Volume', caption: 'Volume' }, { name: 'Price', caption: 'Price' }, { name: 'Change', type: 'Avg', caption: 'Change(%)' }],
        rows: [{ name: 'Country' }],
        filters: [{ name: 'Category' }],
        formatSettings: [{ name: 'Price', format: 'C2' }, { name: 'Open Price', format: 'C2' }, { name: 'Change', format: "###.##'%'" }, { name: 'Volume', format: 'N0' }],
        expandAll: false,
        showSubTotals: false,
        showGrandTotals: false,
        emptyCellsTextContent: 'Revising',
        sortSettings: [{ name: 'Type', order: 'Ascending', membersOrder: ['Corn', 'Rice', 'Wheat', 'Soybean', 'Coffee', 'Cocoa'] }]
    };


    generateData(): any {
        const count: number = 1000;
        const currData: Object[] = [];
        let j: number = 0;
        for (let i: number = 0; i < count; i++) {
            const rand: number = Math.floor(Math.random() * Math.floor(this.DATA.length));
            const region = this.REGIONS[j];
            for (let k = 0; k < region.Countries.length; k++) {
                const data = Object.assign({}, this.DATA[rand]);
                const dataObj = {
                    ...data,
                    Region: region.Region,
                    Country: region.Countries[k]
                };
                this.randomizeObjectData(dataObj);
                currData.push(dataObj);
            }
            j++;
            j = j > 5 ? 0 : j;
        }
        return currData;
    }

    dataBound(): void {
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

    destroyClear(): void {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    }

    randomizeObjectData(dataObj: any): any {
        const changeP = "Change(%)";
        const res: any = this.generateNewPrice(dataObj.Price, dataObj.Volume);
        dataObj.Change = res.Price - dataObj.Price;
        dataObj.Price = res.Price;
        dataObj[changeP] = res.ChangePercent;
        dataObj.Volume = res.Volume;
    }
    generateNewPrice(oldPrice: any, oldVolume: any): any {
        let rnd: number = Math.random();
        rnd = Math.round(rnd * 100) / 100;
        const volatility: number = 15;
        let newPrice: number = 0;
        let newVolume: number = 0;
        let changePercent: number = 2 * volatility * rnd;
        if (changePercent > volatility) {
            changePercent -= (2 * volatility);
        }
        let changeVolumnPercent: number = 2 * (volatility - 5) * rnd;
        if (changeVolumnPercent > (volatility - 5)) {
            changeVolumnPercent -= (2 * (volatility - 5));
        }
        let changeAmount: number = oldPrice * (changePercent / 100);
        newPrice = oldPrice + changeAmount;
        let changeVolume: number = oldVolume * (changeVolumnPercent / 100);
        newVolume = oldVolume + changeVolume;
        newPrice = Math.round(newPrice * 100) / 100;
        newVolume = Math.round((newVolume * 100) / 100);
        const result = { Price: 0, ChangePercent: 0, Volume: 0 };
        changePercent = Math.round(changePercent * 100) / 100;
        result.Price = newPrice;
        result.ChangePercent = changePercent;
        result.Volume = newVolume;
        return result;
    }

    updateCellValues(): void {
        if (!isNullOrUndefined(this.pivotObj)) {
            if (this.pivotObj.pivotValues.length > 0) {
                if (!this.previousPivotValues) {
                    this.previousPivotValues = this.pivotObj.pivotValues;
                }
                this.previousPivotValues = this.pivotObj.pivotValues;
            }
            this.pivotObj.dataSourceSettings.dataSource = this.generateData();
        }
    };
    updateClick(): void {
        if (!this.timerID) {
            this.updateButton.disabled = true;
            this.feedDelayInput.enabled = false;
            this.clearButton.disabled = false;
            this.timerID = setInterval(this.updateCellValues.bind(this), this.feedDelayInput.value);
        }
    };
    clearClick(): void {
        if (this.timerID) {
            this.updateButton.disabled = false;
            this.feedDelayInput.enabled = true;
            this.clearButton.disabled = true;
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    };
    cellTemplate(args: any): any {
        if (args != null && args.cellInfo) {
            if (args.cellInfo.axis === 'value') {
                if (args.cellInfo.axis === 'value' && !args.cellInfo.isGrandSum && args.cellInfo.actualText === 'Change') {
                    args.targetCell.classList.add(this.cellColour(args.cellInfo.value));
                }
            }
        }
    };
    cellColour(value: any): string {
        let colorIndex: number = value < 0 ? 0 : value > 0 ? 1 : 2;
        return this.colourScheme[colorIndex];
    };
    chartOnLoad(args: any): void {
        // eslint-disable-next-line no-restricted-globals
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark") as ChartTheme;
    }

    render() {
        this.updateClick = this.updateClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.dataBound = this.dataBound.bind(this);
        this.destroyClear = this.destroyClear.bind(this);
        this.randomizeObjectData = this.randomizeObjectData.bind(this);
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div style={{ marginBottom: '10px' }}>
                        <h4 style={{ display: 'inline-block', fontSize: '14px', paddingLeft: '5px' }}>
                            <strong>Feed Delay(ms)</strong>:
                        </h4>
                        <NumericTextBoxComponent format="N0" value={5000} min={5000} step={1000} width={'150px'} style={{ marginLeft: '7px' }} ref={(scope: NumericTextBoxComponent) => { this.feedDelayInput = scope; }} />
                        <ButtonComponent id="update1" ref={(scope) => { this.updateButton = scope; }} onClick={this.updateClick.bind(this)} style={{ marginLeft: '10px' }}>
                            Start Updating...
                        </ButtonComponent>
                        <ButtonComponent id="clear" ref={(scope) => { this.clearButton = scope; }} onClick={this.clearClick.bind(this)} style={{ marginLeft: '10px' }}>
                            Stop Updating...
                        </ButtonComponent>
                    </div>
                    <PivotViewComponent id='PivotView-LiveData' destroyed={this.destroyClear.bind(this)} dataSourceSettings={this.dataSourceSettings} displayOption={{ view: 'Both' }} width={'100%'} height={'350'} gridSettings={{ columnWidth: 100 }} chartSettings={{
                        value: 'Price',
                        legendSettings: { visible: false },
                        chartSeries: { type: "Column" }, load: this.chartOnLoad.bind(this),
                        zoomSettings: {
                            enableScrollbar: false,
                            toolbarItems: [],
                            enableSelectionZooming: false,
                        },
                    }}
                        dataBound={this.dataBound} ref={(g) => { this.pivotObj = g; }} cellTemplate={this.cellTemplate.bind(this)}>
                        <Inject services={[PivotChart]} />
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p> This sample demonstrates how frequently the pivot table and the pivot chart are updated with real-time data
                        at a given time interval.</p>
                </div>
                <div id="description">
                    <p>Both the pivot table and the pivot chart are receiving real-time data and
                        periodically updating themselves every 5000 milliseconds. Furthermore, in this demonstration,
                    </p>
                    <ul>
                        <li>
                            The <strong>"Feed Delay"</strong> numeric text box can be used to change the time interval.
                        </li>
                        <li>
                            The <strong>"Start Updating..."</strong> button causes the pivot table to automatically update at the interval
                            specified in the <strong>"Feed Delay"</strong> numeric text box, which is measured in milliseconds.
                        </li>
                        <li>
                            The pivot table's automatic updating can be stopped by selecting the <strong>"Stop Updating..."</strong> button.
                        </li>
                        <li>
                            Displayed the <strong>"Change(%)"</strong> values in the pivot table as red for negative values and
                            green for positive values using the cell template concept.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}