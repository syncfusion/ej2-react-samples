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
require("./chip-customization.css");
var ChipCustomization = (function (_super) {
    __extends(ChipCustomization, _super);
    function ChipCustomization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // define the JSON of data
        _this.colorsData = [
            { Color: 'Chocolate', Code: '#75523C' },
            { Color: 'CadetBlue', Code: '#3B8289' },
            { Color: 'DarkOrange', Code: '#FF843D' },
            { Color: 'DarkRed', Code: '#CA3832' },
            { Color: 'Fuchsia', Code: '#D44FA3' },
            { Color: 'HotPink', Code: '#F23F82' },
            { Color: 'Indigo', Code: '#2F5D81' },
            { Color: 'LimeGreen', Code: '#4CD242' },
            { Color: 'OrangeRed', Code: '#FE2A00' },
            { Color: 'Tomato', Code: '#FF745C' }
        ];
        // maps the appropriate column to fields property
        _this.fields = { text: 'Color', value: 'Code' };
        // set the value to MultiSelect
        _this.colorValues = ['#75523C', '#4CD242', '#FF745C', '#3B8289', '#CA3832'];
        // bind the tagging event
        _this.onTagging = function (e) {
            // set the current selected item text as class to chip element.
            e.setClass(e.itemData[_this.fields.text].toLowerCase());
        };
        return _this;
    }
    ChipCustomization.prototype.render = function () {
        return (React.createElement("div", { className: 'col-lg-12 control-pane' },
            React.createElement("div", { className: 'control-section ms-chip-customize' },
                React.createElement("div", { id: 'multi-customize', className: "control-styles" },
                    React.createElement("h4", null, "Chip Customization"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "chip-customization", value: this.colorValues, dataSource: this.colorsData, fields: this.fields, mode: "Box", placeholder: "Favorite Colors", tagging: this.onTagging.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the customization of selected chip element in the MultiSelect. Type a character in the MultiSelect element or click on the element to choose one or more items from the list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiSelect allows the user to customize the selected chip element through the ",
                    React.createElement("code", null, "tagging"),
                    " event. In that event, you can set the custom classes to chip element via the event argument of the ",
                    React.createElement("code", null, "setClass"),
                    " method."),
                React.createElement("p", null,
                    "This sample illustrates how to use the favorite colors of data and set the favorite color text as custom class through",
                    React.createElement("code", null, "tagging"),
                    " event argument of the ",
                    React.createElement("code", null, "setClass"),
                    " method."))));
    };
    return ChipCustomization;
}(sample_base_1.SampleBase));
exports.ChipCustomization = ChipCustomization;
