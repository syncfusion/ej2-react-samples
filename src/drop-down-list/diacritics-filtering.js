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
var DiacriticsFiltering = (function (_super) {
    __extends(DiacriticsFiltering, _super);
    function DiacriticsFiltering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'data';
        _this.diacriticsData = data[_this.temp];
        return _this;
    }
    DiacriticsFiltering.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'default' },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "diacritics", ignoreAccent: true, dataSource: this.diacriticsData, allowFiltering: true, placeholder: "Select a value", filterBarPlaceholder: "e.g: gul" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the diacritics filter functionality of the DropDownList. Type the characters \u2018gul\u2019 in the DropDownList filterbar and it displays the suggestion list ignoring the diacritics lists.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The DropDownList filtering will ignore the ",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Diacritic", target: "_blank" }, " diacritics "),
                    " which makes it easier to filter the results in international characters lists when the ",
                    React.createElement("code", null, "ignoreAccent"),
                    " is enabled."),
                React.createElement("p", null, "This sample illustrates using the international characters data."))));
    };
    return DiacriticsFiltering;
}(sample_base_1.SampleBase));
exports.DiacriticsFiltering = DiacriticsFiltering;
