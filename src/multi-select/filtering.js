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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./style.css");
var data = require("./dataSource.json");
var Filtering = /** @class */ (function (_super) {
    __extends(Filtering, _super);
    function Filtering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'countries';
        //define the filtering data
        _this.data = data[_this.temp];
        _this.query = new ej2_data_1.Query();
        // maps the appropriate column to fields property
        _this.fields = { text: 'Name', value: 'Code' };
        // filtering event handler to filter a country
        _this.onFiltering = ej2_base_1.debounce(function (e) {
            var query = new ej2_data_1.Query();
            //frame the query based on search string with filter type.
            query = (e.text != "") ? query.where("Name", "startswith", e.text, true) : query;
            //pass the filter data source, filter query to updateData method.
            e.updateData(_this.data, query);
        }, 400);
        return _this;
    }
    Filtering.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'multifilter', className: "control-styles" },
                    React.createElement("h4", null, "Filtering"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "comboelement", dataSource: this.data, filtering: this.onFiltering.bind(this), allowFiltering: true, fields: this.fields, placeholder: "Select countries" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the filtering functionalities of the MultiSelect. Type a character in the MultiSelect element and choose one or more items from the ",
                    React.createElement("code", null, "filtered"),
                    " list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect has built-in support to filter the data source when ",
                    React.createElement("code", null, "allowFiltering"),
                    " is enabled. It performs when characters are typed in the component. In ",
                    React.createElement("code", null, "filtering"),
                    " event, you can filter down the data source and return the resulted data to MultiSelect via ",
                    React.createElement("code", null, "updateData"),
                    " method to display its list items."),
                React.createElement("p", null,
                    "This sample illustrates that, query the data source and pass the resulted data to MultiSelect through the ",
                    React.createElement("code", null, "updateData"),
                    " method in ",
                    React.createElement("code", null, "filtering"),
                    " event."),
                React.createElement("p", null,
                    "More information on the filtering feature configuration can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/filtering.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Filtering;
}(sample_base_1.SampleBase));
exports.Filtering = Filtering;
