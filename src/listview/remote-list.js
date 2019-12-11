"use strict";
/**
 * ListView Remote Sample
 */
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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./listview.css");
var Remote = /** @class */ (function (_super) {
    __extends(Remote, _super);
    function Remote() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Initialize dataSource with the DataManager instance.
        _this.dataSource = new ej2_data_1.DataManager({
            url: '//js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/',
            crossDomain: true
        });
        //Initialize query with the Query instance to get specified set of data
        _this.query = new ej2_data_1.Query().from('Products').select('ProductID,ProductName').take(10);
        //Map the appropriate columns to fields property
        _this.fields = {
            id: 'ProductID', text: 'ProductName'
        };
        return _this;
    }
    Remote.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'sample-list', dataSource: this.dataSource, fields: this.fields, query: this.query, headerTitle: 'Products', showHeader: true })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Remote-data functionalities of the ListView. Click any list item to select and highlight an item.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "ListView supports ",
                    React.createElement("b", null, "data binding"),
                    " and the ",
                    React.createElement("code", null, "dataSource"),
                    " property can be assigned with the instance of ",
                    React.createElement("code", null, "DataManager"),
                    " to bind remote the data."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "DataManager"),
                    " that act as an interface between the service endpoint, and ListView will require the following minimal information to interact with the service endpoint properly."),
                React.createElement("p", null, "DataManager->url - Defines the service endpoint to fetch data."),
                React.createElement("p", null, "DataManager->adaptor - Defines the adaptor option. By default, ODataAdaptor is used for remote binding."),
                React.createElement("p", null,
                    "Adaptor is responsible for processing response and request from/to the service endpoint. ",
                    React.createElement("code", null, "@syncfusion/ej2-data"),
                    " package provides some predefined adaptors that are designed to interact with the particular service endpoints. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null, "UrlAdaptor - Use this to interact any remote services. This is the base adaptor for all remote based adaptors."),
                    React.createElement("li", null, "ODataAdaptor - Use this to interact with OData endpoints."),
                    React.createElement("li", null, "ODataV4Adaptor - Use this to interact with OData V4 endpoints."),
                    React.createElement("li", null, "WebApiAdaptor - Use this to interact with Web API created under OData standards."),
                    React.createElement("li", null, "WebMethodAdaptor - Use this to interact with web methods.")),
                React.createElement("p", null,
                    "In this sample, the remote data is bound to be a collection of ",
                    React.createElement("b", null, "Products"),
                    " data as an instance of ",
                    React.createElement("code", null, "DataManager"),
                    "."))));
    };
    return Remote;
}(sample_base_1.SampleBase));
exports.Remote = Remote;
