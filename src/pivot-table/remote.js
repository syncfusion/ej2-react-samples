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
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
/**
 * PivotView sample for Remote data source.
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}";
var remoteData;
var dataSourceSettings;
new ej2_data_1.DataManager({
    url: 'https://bi.syncfusion.com/northwindservice/api/orders',
    adaptor: new ej2_data_1.WebApiAdaptor,
    crossDomain: true
}).executeQuery(new ej2_data_1.Query().take(8)).then(function (e) {
    remoteData = e.result;
    dataSourceSettings = {
        dataSource: remoteData,
        expandAll: true,
        filters: [],
        columns: [{ name: 'ProductName', caption: 'Product Name' }],
        rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
        formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
        values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
    };
});
var Remote = /** @class */ (function (_super) {
    __extends(Remote, _super);
    function Remote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Remote.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', dataSourceSettings: dataSourceSettings, width: '100%', height: '300', gridSettings: { columnWidth: 120 } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates basic rendering of the pivot table bound to JSON data pulled from a remote server.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The pivot table supports JSON data source. The",
                    React.createElement("code", null, "dataSourceSettings->dataSource"),
                    " property can be assigned with the result of DataManager to bind remote data."),
                "The",
                React.createElement("code", null, "DataManager"),
                ", which will act as an interface between the service endpoint and the pivot table, will require the below minimal information to interact with service endpoint properly.",
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->url"),
                        " - Defines the service endpoint to fetch data."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->adaptor"),
                        " - Defines the adaptor option. Here,",
                        React.createElement("code", null, "WebApiAdaptor"),
                        " is used for remote binding.")),
                "In this demo, remote data is bound by assigning service data as an instance of",
                React.createElement("code", null, "DataManager"),
                " to the",
                React.createElement("code", null, "dataSourceSettings->dataSource"),
                " property.")));
    };
    return Remote;
}(sample_base_1.SampleBase));
exports.Remote = Remote;
