"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
var CustomAdaptor_1 = require("./CustomAdaptor");
var RemoteDataBinding = /** @class */ (function (_super) {
    __extends(RemoteDataBinding, _super);
    function RemoteDataBinding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Initialize DataManager.
        _this.data = new ej2_data_1.DataManager({
            // Remote service url
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders',
            adaptor: new CustomAdaptor_1.CustomAdaptor,
            crossDomain: true
        });
        return _this;
    }
    RemoteDataBinding.prototype.onDataBound = function () {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Shipment Details' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
        }
    };
    RemoteDataBinding.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { _this.spreadsheet = ssObj; }, dataBound: this.onDataBound.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Shipment Details' },
                            React.createElement(ej2_react_spreadsheet_1.RangeSettingsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeSettingDirective, { dataSource: this.data, showFieldAsHeader: false, startCell: 'A2' })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Order ID' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Customer Name' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Ship Name' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Ship City' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Ship Country' })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 150 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 200 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 180 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates data binding to the ",
                    React.createElement("code", null, "Spreadsheet"),
                    " component with a remote service using ",
                    React.createElement("code", null, "DataManager"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Spreadsheet"),
                    " supports data binding. The ",
                    React.createElement("code", null, "dataSource"),
                    " property can be assigned with the instance of ",
                    React.createElement("code", null, "DataManager"),
                    " to bind remote data."),
                React.createElement("p", null,
                    "DataManager, which will act as an interface between the service endpoint and the Spreadsheet, requires the following minimum configuration to interact with the service endpoint properly:",
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "DataManager > url"),
                            " : Defines the service endpoint to fetch data."),
                        React.createElement("li", null,
                            React.createElement("code", null, "DataManager > adaptor"),
                            " : Defines the adaptor option. By default, ",
                            React.createElement("code", null, "ODataAdaptor"),
                            "is used for remote binding."))),
                React.createElement("p", null,
                    "Adaptor is responsible for processing the response from the service endpoint and the request to it. The",
                    React.createElement("code", null, "@syncfusion/ej2-data"),
                    " package provides some predefined adaptors that are designed to interact with service endpoints. They are:",
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "UrlAdaptor"),
                            " : Use this to interact with any remote services. This is the base adaptor for all remote-based adaptors. "),
                        React.createElement("li", null,
                            React.createElement("code", null, "ODataAdaptor"),
                            " : Use this to interact with OData endpoints."),
                        React.createElement("li", null,
                            React.createElement("code", null, "ODataV4Adaptor"),
                            " : Use this to interact with OData V4 endpoints."),
                        React.createElement("li", null,
                            React.createElement("code", null, "WebApiAdaptor"),
                            " : Use this to interact with Web API created under OData standards."),
                        React.createElement("li", null,
                            React.createElement("code", null, "WebMethodAdaptor"),
                            " : Use this to interact with web methods."))),
                React.createElement("p", null,
                    "In this demo, remote data is bound by assigning service data as an instance of ",
                    React.createElement("code", null, "DataManager"),
                    " to the",
                    React.createElement("code", null, "dataSource"),
                    " property under the rangeSettings of sheet."),
                React.createElement("p", null,
                    "More information about remote data binding can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/spreadsheet/getting-started" }, " documentation"),
                    " section."))));
    };
    return RemoteDataBinding;
}(sample_base_1.SampleBase));
exports.RemoteDataBinding = RemoteDataBinding;
