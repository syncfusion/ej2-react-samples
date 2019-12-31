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
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./default.css");
var data = require("./dataSource.json");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // define the JSON of data
        _this.temp = 'sportsData';
        _this.sportsData = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { text: 'Game', value: 'Id' };
        // set the value to select an item based on mapped value at initial rendering
        _this.value = 'Game3';
        return _this;
    }
    Default.prototype.onChange = function () {
        var value = document.getElementById('value');
        var text = document.getElementById('text');
        // update the text and value property values in property panel based on selected item in DropDownList
        value.innerHTML = this.listObj.value === null ? 'null' : this.listObj.value.toString();
        text.innerHTML = this.listObj.text === null ? 'null' : this.listObj.text;
    };
    // call the change event's function after initialized the component.
    Default.prototype.rendereComplete = function () {
        this.onChange();
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "dropdowndefault", className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement("div", { id: 'default' },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "games", dataSource: this.sportsData, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, fields: this.fields, change: this.onChange.bind(this), placeholder: "Select a game", value: this.value, popupHeight: "220px" })))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', style: { width: '100%', margin: '10px' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '5px', width: '25%' } }, "Value"),
                                React.createElement("td", null,
                                    ":",
                                    React.createElement("span", { id: 'value', style: { paddingLeft: '10px' } }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '5px', width: '25%' } }, "Text"),
                                React.createElement("td", null,
                                    ":",
                                    React.createElement("span", { id: 'text', style: { paddingLeft: '10px' } }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default functionalities of the DropDownList. Click the DropDownList element and select an item from the ",
                    React.createElement("code", null, "options"),
                    " list. The selected item's ",
                    React.createElement("code", null, "value"),
                    " and ",
                    React.createElement("code", null, "text"),
                    " property values will be shown the in property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "DropDownList"),
                    " component contains a list of predefined values from that the user can choose a single value. "),
                React.createElement("p", null,
                    "The default sample illustrates the use of DropDownList that allows the end-users to select an item from the ",
                    React.createElement("code", null, "options"),
                    " list. The selected item's ",
                    React.createElement("code", null, "value"),
                    " and ",
                    React.createElement("code", null, "text"),
                    " property values will be displayed in the property panel."),
                React.createElement("p", null,
                    " More information on the DropDownList instantiation can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/drop-down-list/getting-started/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
