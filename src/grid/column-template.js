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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ColumnTemplate = (function (_super) {
    __extends(ColumnTemplate, _super);
    function ColumnTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = _this.gridTemplate;
        return _this;
    }
    ColumnTemplate.prototype.gridTemplate = function (props) {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, alt: props.EmployeeID })));
    };
    ColumnTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, width: 'auto', height: '359' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Employee Image', width: '180', template: this.template, textAlign: 'Center' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '125', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hire Date', width: '135', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportsTo', headerText: 'Reports To', width: '120', textAlign: 'Right' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates usage of template columns in Grid. In this sample, we have shown custom images in the Employee Image column.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid provides a way to use a custom layout for each cell using column template feature. The",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/grid/api-column.html#template" }, "columns->template")),
                    " property accepts the template for the cell."),
                React.createElement("p", null,
                    "In this demo, using column template, we have presented ",
                    React.createElement("strong", null, "Employee Image"),
                    " column as template column."))));
    };
    return ColumnTemplate;
}(sample_base_1.SampleBase));
exports.ColumnTemplate = ColumnTemplate;
