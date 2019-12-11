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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
{ }
var SAMPLE_CSS = "\n    .e-header {\n        margin-left: 12px;\n    }";
{ }
var HeaderTemplate = /** @class */ (function (_super) {
    __extends(HeaderTemplate, _super);
    function HeaderTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", null,
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.headerData, treeColumnIndex: 0, childMapping: 'subtasks', allowPaging: 'true' },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', width: '220', headerTemplate: function () {
                                    return (React.createElement("div", null,
                                        React.createElement("img", { src: "src/treegrid/images/__Task name.png", width: "20", height: "20", className: "e-image" }),
                                        React.createElement("b", { className: 'e-header' }, "Task Name")));
                                } }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', format: 'yMd', type: 'date', textAlign: 'Right', headerTemplate: function () {
                                    return (React.createElement("div", null,
                                        React.createElement("img", { src: "src/treegrid/images/__Start name.png", width: "20", height: "20", className: "e-image" }),
                                        React.createElement("b", { className: 'e-header' }, "Start Date")));
                                } }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'resourceId', textAlign: 'Right', headerTemplate: function () {
                                    return (React.createElement("div", null,
                                        React.createElement("img", { src: "src/treegrid/images/__Resources.png", width: "20", height: "20", className: "e-image" }),
                                        React.createElement("b", { className: 'e-header' }, "Resources")));
                                } }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', textAlign: 'Right', headerTemplate: function () {
                                    return (React.createElement("div", null,
                                        React.createElement("img", { src: "src/treegrid/images/__Duration.png", width: "20", height: "20", className: "e-image" }),
                                        React.createElement("b", { className: 'e-header' }, "Duration")));
                                } }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'progress', textAlign: 'Right', headerTemplate: function () {
                                    return (React.createElement("div", null,
                                        React.createElement("img", { src: "src/treegrid/images/__progress.png", width: "20", height: "20", className: "e-image" }),
                                        React.createElement("b", { className: 'e-header' }, "Progress")));
                                } })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the TreeGrid header template feature. In this sample, we have shown custom icons in the column headers.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The TreeGrid provides a way to define a custom element in header element. ",
                    React.createElement("code", null, "columns->headertemplate"),
                    " property accepts either string or HTML element`s ID value, which will be used as the template for the header cell."),
                React.createElement("p", null, " In this demo, we have render customized template for all column headers."),
                React.createElement("p", null, " More information about Header template can be found in this documentation section."))));
    };
    return HeaderTemplate;
}(sample_base_1.SampleBase));
exports.HeaderTemplate = HeaderTemplate;
