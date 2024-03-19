import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, VirtualScroll, Inject } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

/**
 * PivotView Default Sample.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}

.image {
    position: absolute;
    background-repeat: no-repeat;
    background-image: url('src/grid/images/spinner.gif');
    background-position: center;
    width: 16px;
    height: 28px;
}

.e-bigger .image {
    height: 36px;
}

#popup {
    position: absolute;
    background-color: transparent;
    display: none;
    z-index: 100;
}

#performanceTime {
    float: right;
    margin-top: 3px;
    margin-right: 27px;
}

.e-bigger #performanceTime{
    margin-top: 8px;
}`;

let dataSourceSettings: IDataOptions = {
    dataSource: [],
    enableSorting: false,
    expandAll: true,
    formatSettings: [{ name: 'Price', format: 'C0' }],
    rows: [{ name: 'ProductID' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
};

let customername: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
    'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
let city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
    'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
let applyBtn: ButtonComponent;
let pivotObj: PivotViewComponent;
let date1: number;
let date2: number;
let isInit: boolean;
function data(count: number) {
    let result: Object[] = [];
    let dt: number = 0;
    for (let i: number = 1; i < (count + 1); i++) {
        dt++;
        let round: string;
        let toString: string = i.toString();
        if (toString.length === 1) {
            round = '0000' + (i);
        }
        else if (toString.length === 2) {
            round = '000' + i;
        }
        else if (toString.length === 3) {
            round = '00' + i;
        } else if (toString.length === 4) {
            round = '0' + i;
        } else {
            round = toString;
        }
        result.push({
            ProductID: 'PRO-' + round,
            City: city[Math.round(Math.random() * city.length)] || city[0],
            Year: "FY " + (dt + 2013),
            CustomerName: customername[Math.round(Math.random() * customername.length)] || customername[0],
            Price: Math.round(Math.random() * 5000) + 5000,
            Sold: Math.round(Math.random() * 80) + 10,
        });
        if (dt / 2 == 1) {
            dt = 0;
        }
    }
    return result;
};

function show(): void {
    document.getElementById('popup').style.display = 'inline-block';
};

function VirtualScrolling () {

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    function onClick(args: any): void {
        show();
        isInit = true;
        pivotObj.dataSourceSettings.dataSource = data(100000) as IDataSet[];
        date1 = new Date().getTime();
    }

    function onDataBound(): void {
        if ((pivotObj.dataSourceSettings.dataSource as IDataSet[]).length > 0) {
            if (date1 && isInit) {
                date2 = new Date().getTime();
                document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) / 1000 + ' sec';
            }
            isInit = false;
            applyBtn.disabled = true;
            document.getElementById('popup').style.display = 'none';
        }
        if (Browser.isDevice && pivotObj && pivotObj.enableRtl) {
            document.querySelector('.control-section').classList.add('e-rtl');
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div id="btn-control" style={{ marginBottom: '5px' }}>
                    <ButtonComponent id='apply' className='e-info' ref={(scope) => { applyBtn = scope; }} onClick={onClick.bind(this)} isPrimary={true}>Load 100K Data</ButtonComponent>
                    <span id="popup">
                        <span id="gif" className="image"></span>
                    </span>
                    <span id="performanceTime">Time Taken: 0 sec</span>
                </div>
                <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={dataSourceSettings} enableVirtualization={true} width={Browser.isDevice ? '100%' : 1200} height={300}
                    gridSettings={{ columnWidth: 140 }} dataBound={onDataBound} virtualScrollSettings={{ allowSinglePage: true }}>
                    <Inject services={[VirtualScroll]} />
                </PivotViewComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the virtual scrolling option available for vertically and horizontally loading records and showing a large number of records with ease.</p>
            </div>
            <div id="description">
                <p>The pivot table provides an optimized way to render rows and columns inside the view-port alone without
                    calculating the value of the entire pivot. To enable virtual scrolling, set <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/pivotview/#enablevirtualization">
                        enableVirtualization</a> property to <b>true</b>.
                </p>
                <p>
                    In this sample, the <code>allowSinglePage</code> property is enabled by default, allowing
                    only the current page data to be displayed in the pivot table view. Previously, we were showing both the previous and
                    next pages along with the current page. The recent change has been introduced to enhance performance.
                </p>
                <p>
                    <strong>Injecting Module:</strong>
                </p>
                <p>
                    The pivot table features are segregated into individual modules. To use the virtual scrolling option, we
                    need to inject the
                    <code> VirtualScroll</code> module using the
                    <code> services</code> tag.
                </p>
                <br />
                <p>
                    More information on the virtual scrolling can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/documentation/pivotview/virtual-scrolling">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default VirtualScrolling;
