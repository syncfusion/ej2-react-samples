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
require("./sample.css");
var instance = new ej2_base_1.Internationalization();
var DetailTemplate = (function (_super) {
    __extends(DetailTemplate, _super);
    function DetailTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = function (value) {
            return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
        };
        _this.template = _this.gridTemplate;
        return _this;
    }
    DetailTemplate.prototype.gridTemplate = function (props) {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (React.createElement("table", { className: "detailtable", style: { width: "100%" } },
            React.createElement("colgroup", null,
                React.createElement("col", { style: { width: "35%" } }),
                React.createElement("col", { style: { width: "35%" } }),
                React.createElement("col", { style: { width: "30%" } })),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { rowSpan: 4, className: 'images' },
                        React.createElement("img", { className: 'photo', src: src, alt: props.EmployeeID })),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "First Name: "),
                        " ",
                        props.FirstName),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Postal Code: "),
                        " ",
                        props.PostalCode)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Last Name: "),
                        " ",
                        props.LastName),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "City: "),
                        " ",
                        props.City)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Title: "),
                        " ",
                        props.Title),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Phone: "),
                        " ",
                        props.HomePhone)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Address: "),
                        " ",
                        props.Address),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "HireDate: "),
                        " ",
                        this.format(props.HireDate))))));
    };
    DetailTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, detailTemplate: this.template.bind(this), width: 'auto' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'First Name', width: '110' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'LastName', headerText: 'Last Name', width: '110' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '110' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.DetailRow] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the detail template feature. Click the expand button in each Grid row to show the detailed information about a row.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The detail row template provides an additional information about a data row which can show or hide by clicking on expand or collapse button. The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#detailtemplate" }, "detailTemplate")),
                    " property accepts the template for the detail row."),
                React.createElement("p", null, "In this demo, we have presented Employee Information with image in the detail row."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use Detail row feature, we need to inject ",
                    React.createElement("code", null, "DetailRow"),
                    " module into the ",
                    React.createElement("code", null, "services")))));
    };
    return DetailTemplate;
}(sample_base_1.SampleBase));
exports.DetailTemplate = DetailTemplate;
