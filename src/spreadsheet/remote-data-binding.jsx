import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangeSettingsDirective, RangeSettingDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { DataManager } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './spreadsheet.css';
import { CustomAdaptor } from './CustomAdaptor';
export class RemoteDataBinding extends SampleBase {
    constructor() {
        super(...arguments);
        //Initialize DataManager.
        this.data = new DataManager({
            // Remote service url
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders',
            adaptor: new CustomAdaptor,
            crossDomain: true
        });
    }
    onDataBound() {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Shipment Details' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open' saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save' ref={(ssObj) => { this.spreadsheet = ssObj; }} dataBound={this.onDataBound.bind(this)}>
                            <SheetsDirective>
                            <SheetDirective name='Shipment Details'>
                                <RangeSettingsDirective>
                                    <RangeSettingDirective dataSource={this.data} showFieldAsHeader={false} startCell='A2'></RangeSettingDirective>
                                </RangeSettingsDirective>
                                <RowsDirective>
                                    <RowDirective>
                                        <CellsDirective>
                                            <CellDirective value='Order ID'></CellDirective>
                                            <CellDirective value='Customer Name'></CellDirective>
                                            <CellDirective value='Ship Name'></CellDirective>
                                            <CellDirective value='Ship City'></CellDirective>
                                            <CellDirective value='Ship Country'></CellDirective>
                                        </CellsDirective>
                                    </RowDirective>
                                </RowsDirective>
                                <ColumnsDirective>
                                    <ColumnDirective width={100}></ColumnDirective>
                                    <ColumnDirective width={130}></ColumnDirective>
                                    <ColumnDirective width={150}></ColumnDirective>
                                    <ColumnDirective width={200}></ColumnDirective>
                                    <ColumnDirective width={180}></ColumnDirective>
                                </ColumnsDirective>
                            </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates data binding to the <code>Spreadsheet</code> component with a remote service
        using <code>DataManager</code>.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The <code>Spreadsheet</code> supports data binding. The <code>dataSource</code> property can be assigned with
        the instance of <code>DataManager</code> to bind remote data.
                    </p>
                    <p>
                        DataManager, which will act as an interface between the service endpoint and the Spreadsheet, requires the
                        following minimum configuration to interact with the service endpoint properly:
                        <ul>
                            <li><code>DataManager > url</code> : Defines the service endpoint to fetch data.</li>
                            <li><code>DataManager > adaptor</code> : Defines the adaptor option. By default, <code>ODataAdaptor</code>
                                is used for remote binding.</li>
                        </ul>
                    </p>
                    <p>
                        Adaptor is responsible for processing the response from the service endpoint and the request to it. The
        <code>@syncfusion/ej2-data</code> package provides some predefined adaptors that are designed to interact
                                        with service endpoints. They are:
                        <ul>
                            <li><code>UrlAdaptor</code> : Use this to interact with any remote services. This is the base adaptor for
                all remote-based adaptors. </li>
                            <li><code>ODataAdaptor</code> : Use this to interact with OData endpoints.</li>
                            <li><code>ODataV4Adaptor</code> : Use this to interact with OData V4 endpoints.</li>
                            <li><code>WebApiAdaptor</code> : Use this to interact with Web API created under OData standards.</li>
                            <li><code>WebMethodAdaptor</code> : Use this to interact with web methods.</li>
                        </ul>
                    </p>
                    <p>
                        In this demo, remote data is bound by assigning service data as an instance of <code>DataManager</code> to the
                        <code>dataSource</code> property under the rangeSettings of sheet.
                    </p>
                    <p>
                        More information about remote data binding can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/documentation/spreadsheet/getting-started"> documentation</a> section.
                    </p>
                </div>
            </div>);
    }
}
