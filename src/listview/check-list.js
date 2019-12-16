"use strict";
/**
 * ListView CheckList Sample
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
require("./listview.css");
var listData_1 = require("./listData");
var Checklist = /** @class */ (function (_super) {
    __extends(Checklist, _super);
    function Checklist() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Map the appropriate columns to fields property
        _this.fields = { groupBy: 'category' };
        return _this;
    }
    Checklist.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "flat-list" },
                    React.createElement("h4", null, "Flat List"),
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: "sample-list-flat", dataSource: listData_1.flatList, showCheckBox: true })),
                React.createElement("div", { id: "group-list" },
                    React.createElement("h4", null, "Group List"),
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: "sample-list-group", dataSource: listData_1.groupData, fields: this.fields, showCheckBox: true }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the checkbox functionalities of the ListView. Click multiple list item to check or uncheck the items.")),
            React.createElement("div", { id: "description", className: "descriptionLayout" },
                React.createElement("p", null,
                    "ListView component support checkbox feature which used to select multiple items from the list. This feature can be enabled by the property ",
                    React.createElement("code", null, "showCheckBox"),
                    "."),
                React.createElement("p", null, "In this sample, the checkbox is enabled on default list and group list."))));
    };
    return Checklist;
}(sample_base_1.SampleBase));
exports.Checklist = Checklist;
