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
require("./custom.css");
var data = require("./dataSource.json");
var Custom = (function (_super) {
    __extends(Custom, _super);
    function Custom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'countries';
        // defined the JSON of data
        _this.searchData = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { text: 'Name', value: 'Code' };
        // set the template content when the typed character(s) is not present in the list
        _this.template = '<div id="nodata"> No matched item, do you want to add it as new item in list?</div> <button id="btn" class="e-control e-btn">Add New Item</button>';
        // bind the filtering event
        _this.onFiltering = function (e) {
            var query = new ej2_data_1.Query();
            // frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            // pass the filter data source, filter query to updateData method.
            e.updateData(_this.searchData, query);
            var proxy = _this;
            if (document.getElementById('nodata')) {
                // bind click event to button which is shown in popup element when the typed character(s) is not present in the list
                document.getElementById('btn').onclick = function () {
                    // get the typed characters
                    var customValue = document.getElementById('customvalue').value;
                    // make new object based on typed characters
                    var newItem = { 'Name': customValue, 'Code': customValue };
                    // new object added to data source.
                    proxy.listObj.dataSource.push(newItem);
                    // close the popup element.
                    proxy.listObj.hidePopup();
                    // pass new object to addItem method.
                    proxy.listObj.addItem(newItem);
                    // select the newly added item.
                    proxy.listObj.value = customValue;
                };
            }
        };
        return _this;
    }
    Custom.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'customvalues' },
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "customvalue", ref: function (ComboBox) { _this.listObj = ComboBox; }, dataSource: this.searchData, filtering: this.onFiltering.bind(this), allowFiltering: true, fields: this.fields, noRecordsTemplate: this.template, placeholder: "Select a country", popupHeight: "270px" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the custom value functionalities of the ComboBox. When the typed character(s) is not present in the list, a button will be shown in the popup list. By clicking on this button, the custom value character is added in the existing list as a new item.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ComboBox allows the user to give input as ",
                    React.createElement("code", null, "custom value"),
                    " which is not required to present in the predefined set of values. By default, this support is enabled by ",
                    React.createElement("code", null, "allowCustom"),
                    "property. In this case, both text field and value field are considered as same. The custom value will be sent to post back handler when a form is about to be submitted."),
                React.createElement("p", null,
                    " More information about the Custom value feature can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/combo-box/getting-started.html#custom-values", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Custom;
}(sample_base_1.SampleBase));
exports.Custom = Custom;
