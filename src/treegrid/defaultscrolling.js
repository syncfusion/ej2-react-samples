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
var DefaultScrolling = (function (_super) {
    __extends(DefaultScrolling, _super);
    function DefaultScrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultScrolling.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, childMapping: 'subtasks', treeColumnIndex: 1, height: '400' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '100', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '230' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '200', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '200', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '110', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '110', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '110' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'approved', headerText: 'Approved', textAlign: 'Center', width: '110' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the TreeGrid component with the horizontal and vertical scrollbars to view the exceeded TreeGrid content.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The TreeGrid will show scrollbar when the content exceeds the element width or height. The vertical and horizontal scrollbar will be displayed based on the following criteria."),
                React.createElement("ul", null,
                    React.createElement("li", null, "The vertical scrollbar appears when the total height of rows present in TreeGrid exceeds its element height."),
                    React.createElement("li", null, "The horizontal scrollbar appears when the sum of column`s width exceeds TreeGrid element width.")),
                React.createElement("p", null,
                    "The TreeGrid provides a way to use a custom layout for its rows using template feature. The",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#height" }, "height")),
                    " and  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#width" }, "width")),
                    " property is used to set the TreeGrid height and width respectively. The value of these properties can be a numeric value, pixel(",
                    React.createElement("code", null, "px"),
                    ") or percentage (",
                    React.createElement("code", null, "%"),
                    ")."),
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#height" }, "height")),
                    " and  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#width" }, "width")),
                    "  property of the TreeGrid is set to ",
                    React.createElement("strong", null,
                        React.createElement("em", null, "400")),
                    " and ",
                    React.createElement("strong", null,
                        React.createElement("em", null, "auto")),
                    "respectively. Now, the TreeGrid will render with vertical scrollbar when the total height of rows exceeds its element height and horizontal scrollbar will appear when the total column width exceeds the element width."))));
    };
    return DefaultScrolling;
}(sample_base_1.SampleBase));
exports.DefaultScrolling = DefaultScrolling;
