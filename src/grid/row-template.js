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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var instance = new ej2_base_1.Internationalization();
var RowTemplate = /** @class */ (function (_super) {
    __extends(RowTemplate, _super);
    function RowTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = function (value) {
            return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
        };
        _this.template = _this.gridTemplate;
        return _this;
    }
    RowTemplate.prototype.gridTemplate = function (props) {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (React.createElement("tr", { className: "templateRow" },
            React.createElement("td", { className: "photos" },
                React.createElement("img", { src: src, alt: props.EmployeeID })),
            React.createElement("td", { className: "details" },
                React.createElement("table", { className: "CardTable", cellPadding: 3, cellSpacing: 2 },
                    React.createElement("colgroup", null,
                        React.createElement("col", { style: { width: "50%" } }),
                        React.createElement("col", { style: { width: "50%" } })),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "CardHeader" }, "First Name "),
                            React.createElement("td", null,
                                props.FirstName,
                                " ")),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "CardHeader" }, "Last Name"),
                            React.createElement("td", null,
                                props.LastName,
                                " ")),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "CardHeader" }, "Title"),
                            React.createElement("td", null, props.Title)),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "CardHeader" }, "Birth Date"),
                            React.createElement("td", null,
                                " ",
                                this.format(props.BirthDate))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "CardHeader" }, "Hire Date"),
                            React.createElement("td", null, this.format(props.HireDate))))))));
    };
    RowTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, rowTemplate: this.template.bind(this), width: 'auto', height: '335' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'EmployeeImage', width: '180', textAlign: 'Center', field: 'OrderID' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Employee Details', width: '300', textAlign: 'Left', field: 'CustomerName' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the row template feature. In this sample, we have rendered each Grid row using the template.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid provides a way to use a custom layout for its rows using template feature. The",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#rowtemplate" }, "rowTemplate")),
                    " property accepts the template for the row."),
                React.createElement("p", null, "In this demo, we have presented Employee Information with Employee Photo in the first column and employee details like Name, Address etc. in the second column."))));
    };
    return RowTemplate;
}(sample_base_1.SampleBase));
exports.RowTemplate = RowTemplate;
