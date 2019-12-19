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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
require("./style.css");
var data = require("./dataSource.json");
var Data = (function (_super) {
    __extends(Data, _super);
    function Data() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'countries';
        // define the JSON of country data
        _this.countries = data[_this.temp];
        // maps the appropriate column to fields property
        _this.localFields = { text: 'Name', value: 'Code' };
        // bind the DataManager instance to dataSource property
        _this.data = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
            adaptor: new ej2_data_1.WebApiAdaptor,
            crossDomain: true
        });
        // bind the Query instance to query property
        _this.query = new ej2_data_1.Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
        // maps the remote data column to fields property
        _this.remoteFields = { text: 'FirstName', value: 'EmployeeID' };
        return _this;
    }
    Data.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "multilocal", className: "control-styles" },
                    React.createElement("h4", null, " Local Data"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "localData", dataSource: this.countries, fields: this.localFields, placeholder: "Select countries" }))),
                React.createElement("div", { id: "multiremote", className: "control-styles" },
                    React.createElement("h4", null, "Remote Data"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "remoteData", dataSource: this.data, query: this.query, fields: this.remoteFields, sortOrder: "Ascending", placeholder: "Select names" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the different data binding supports of the DropDownList. Click the MultiSelect element and choose one or more items from the suggestion list. At the very first time, when clicked on the remote data MultiSelect, the loader icon will be shown until the remote request get the data from server and display it.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect loads the data either from local data sources or remote data services through the ",
                    React.createElement("code", null, "dataSource"),
                    " property. It supports the data type of ",
                    React.createElement("code", null, "array"),
                    " or ",
                    React.createElement("code", null, "DataManager"),
                    "."),
                React.createElement("p", null, "The DataManager, that act as an interface between service endpoint and MultiSelect, will require the following minimal information to interact with service endpoint properly."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->url"),
                        " - Defines the service endpoint to fetch data."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->adaptor"),
                        " - Defines the adaptor option. By default, ",
                        React.createElement("code", null, "ODataAdaptor"),
                        " is used for remote binding.")),
                React.createElement("p", null,
                    "Adaptor is responsible for processing response and request from/to the service endpoint.",
                    React.createElement("code", null, "@syncfusion/ej2-data"),
                    " package provides some predefined adaptors that are designed to interact with particular service endpoints. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "UrlAdaptor"),
                        " - Use this to interact any remote services."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ODataAdaptor"),
                        " - Use this to interact with OData endpoints."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ODataV4Adaptor"),
                        " - Use this to interact with OData V4 endpoints."),
                    React.createElement("li", null,
                        React.createElement("code", null, "WebApiAdaptor"),
                        " - Use this to interact with Web API created under OData standards."),
                    React.createElement("li", null,
                        React.createElement("code", null, "WebMethodAdaptor"),
                        " - Use this to interact with web methods.")),
                React.createElement("p", null,
                    "In this sample, the local data is bound to a collection of sports data and the remote data is bound to a collection of customer data as an instance of ",
                    React.createElement("code", null, "DataManager"),
                    "."),
                React.createElement("p", null,
                    " More information on the data binding feature configuration can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/data-binding.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Data;
}(sample_base_1.SampleBase));
exports.Data = Data;
