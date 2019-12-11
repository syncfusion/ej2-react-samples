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
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'sportsData';
        // define the JSON of data
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
        value.innerHTML = this.listObj.value === null ? 'null' : this.listObj.value.toString();
        text.innerHTML = this.listObj.text === null ? 'null' : this.listObj.text;
    };
    // call the change event's function after initialized the component.
    Default.prototype.rendereComplete = function () {
        this.onChange();
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: 'combodefault', className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement("div", { id: 'default' },
                            React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "games", dataSource: this.sportsData, ref: function (combobox) { _this.listObj = combobox; }, fields: this.fields, change: this.onChange.bind(this), placeholder: "Select a game", value: this.value, popupHeight: "220px" })))),
                React.createElement("div", { id: 'combopanel', className: 'col-lg-4 property-section' },
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
                    "This sample demonstrates the default functionalities of the ComboBox. Type a character in the ComboBox element or click the drodown icon to choose an item from the ",
                    React.createElement("code", null, "options"),
                    " list. The selected item's ",
                    React.createElement("code", null, "value"),
                    " and ",
                    React.createElement("code", null, "text"),
                    " property values will be shown in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "ComboBox"),
                    " component allows the user to type a value, or choose an option from the list of predefined options."),
                React.createElement("p", null,
                    " More information on the ComboBox instantiation can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/combo-box/getting-started/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
