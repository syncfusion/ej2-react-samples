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
require("./inline.css");
var data = require("./dataSource.json");
var Inline = /** @class */ (function (_super) {
    __extends(Inline, _super);
    function Inline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'employees';
        // define the JSON of data
        _this.employeesData = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { text: 'Name' };
        return _this;
    }
    Inline.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'inline', style: { padding: '100px 100px 100px 250px' } },
                    React.createElement("span", { id: "contentText" },
                        "React top expert of this week is",
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "inline", cssClass: "inlinecss", dataSource: this.employeesData, fields: this.fields, placeholder: "Select an employee", popupHeight: "200px", width: "60px", popupWidth: "140px", value: 'Michael' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The DropDownList appearing in line with highlighted content. Click that DropDownList value content and select an item from the popup list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The DropDownList component can be rendered in line with other content and you can override the styles of the dropdownlist component."),
                React.createElement("p", null, "This sample illustrates using the user's data that has been used and customized DropDownList border."))));
    };
    return Inline;
}(sample_base_1.SampleBase));
exports.Inline = Inline;
