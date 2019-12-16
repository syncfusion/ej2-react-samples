"use strict";
/**
 * ListView GroupTemplate Sample
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
require("./group-template.css");
var listData_1 = require("./listData");
var GroupTemplate = /** @class */ (function (_super) {
    __extends(GroupTemplate, _super);
    function GroupTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Map the appropriate columns to fields property
        _this.fields = { text: 'Name', groupBy: 'order' };
        return _this;
    }
    //Set customized list template
    GroupTemplate.prototype.listTemplate = function (data) {
        return (React.createElement("div", { className: "settings e-list-wrapper e-list-multi-line e-list-avatar" },
            React.createElement("span", { className: "icon " + data.class + " e-avatar" }),
            React.createElement("span", { className: "e-list-item-header" }, data.Name),
            React.createElement("span", { className: "e-list-content" }, data.content)));
    };
    //Set customized group-header template
    GroupTemplate.prototype.groupTemplate = function (data) {
        return (React.createElement("div", { className: "e-list-wrapper" },
            React.createElement("span", { className: "e-list-item-content" }, data.items[0].category)));
    };
    GroupTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'groupedList', dataSource: listData_1.groupDataSource, headerTitle: 'Settings', showHeader: true, fields: this.fields, cssClass: "e-list-template", template: this.listTemplate, groupTemplate: this.groupTemplate })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Group Templates functionalities of ListView. Click any list item from the settings option to select and highlight an option.")),
            React.createElement("div", { id: "description", className: "descriptionLayout" },
                React.createElement("p", null,
                    "ListView component has an option to custom design the group header title with the help of ",
                    React.createElement("code", null, "groupTemplate"),
                    " property."),
                React.createElement("p", null,
                    "In this example, both the group header and list item is customized using the",
                    React.createElement("code", null, "groupTemplate"),
                    " and ",
                    React.createElement("code", null, "template"),
                    " property."))));
    };
    return GroupTemplate;
}(sample_base_1.SampleBase));
exports.GroupTemplate = GroupTemplate;
