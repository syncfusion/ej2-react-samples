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
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "multisection", className: 'control-section' },
                React.createElement("div", { id: "multidefault" },
                    React.createElement("div", { className: "control-styles" },
                        React.createElement("h4", null, "Default Mode"),
                        React.createElement("div", null,
                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "defaultelement", dataSource: this.sportsData, mode: "Default", fields: this.fields, placeholder: "Favorite Sports" }))),
                    React.createElement("div", { className: "control-styles" },
                        React.createElement("h4", null, "Box Mode"),
                        React.createElement("div", null,
                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "boxelement", dataSource: this.sportsData, mode: "Box", fields: this.fields, placeholder: "Favorite Sports" }))),
                    React.createElement("div", { className: "control-styles" },
                        React.createElement("h4", null, " Delimiter Mode"),
                        React.createElement("div", null,
                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "delimiterelement", dataSource: this.sportsData, mode: "Delimiter", fields: this.fields, placeholder: "Favorite Sports" }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the suggestion list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "MultiSelect"),
                    " component contains a list of predefined values, from that the user can choose a multiple values. "),
                React.createElement("p", null, "In this sample, the selected items are shown with three different UI modes in three different MultiSelect elements. That three UI modes are listed here below,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Default"),
                        " - on focus-in, the component will act in ",
                        React.createElement("code", null, "box mode"),
                        " and on blur, the component will act in ",
                        React.createElement("code", null, "delimiter mode"),
                        "."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Box"),
                        " - selected items will be visualized in chip."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Delimiter"),
                        " - selected items will be visualized in text content.")),
                React.createElement("p", null,
                    " More information on the MultiSelect instantiation can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/multi-select/getting-started/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
