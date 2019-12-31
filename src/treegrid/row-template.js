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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./row-template.css");
var instance = new ej2_base_1.Internationalization();
var RowTemplate = (function (_super) {
    __extends(RowTemplate, _super);
    function RowTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = function (value) {
            return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
        };
        _this.template = _this.treegridTemplate;
        return _this;
    }
    RowTemplate.prototype.treegridTemplate = function (props) {
        var src = 'src/treegrid/images/' + props.FullName + '.png';
        return (React.createElement("tr", null,
            React.createElement("td", { className: "border", style: { paddingLeft: '18px' } },
                React.createElement("div", null, props.EmpID)),
            React.createElement("td", { className: "border", style: { padding: '10px 0px 0px 20px' } },
                React.createElement("div", { style: { fontSize: '14px' } },
                    props.Name,
                    React.createElement("p", { style: { fontSize: '9px' } }, props.Designation))),
            React.createElement("td", { className: "border" },
                React.createElement("div", null,
                    React.createElement("div", { style: { position: 'relative', display: 'inline-block' } },
                        React.createElement("img", { className: "tempimg", src: src })),
                    React.createElement("div", { style: { display: 'inline-block' } },
                        React.createElement("div", { style: { padding: '5px' } }, props.Address),
                        React.createElement("div", { style: { padding: '5px' } }, props.Country),
                        React.createElement("div", { style: { padding: '5px', fontSize: '12px' } }, props.Contact)))),
            React.createElement("td", { className: "border", style: { paddingLeft: '20px' } },
                React.createElement("div", null, this.format(props.DOB)))));
    };
    RowTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.textdata, childMapping: 'Children', rowTemplate: this.template.bind(this), treeColumnIndex: 0, rowHeight: '83', height: '335' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'Employee ID', width: '180', field: 'EmpID' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'Employee Name', field: 'Name' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'Employee Details', width: '350', field: 'Address' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'DOB', editType: 'datepicker', field: 'DOB' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the TreeGrid component with the row template feature. In this sample, we have rendered each TreeGrid row using the template.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The TreeGrid provides a way to use a custom layout for its rows using template feature. The",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/treegrid/row/#row-template" }, "rowTemplate")),
                    " property accepts either string or HTML element`s ID value, which will be used as the template for the row."),
                React.createElement("p", null, "In this demo, we have presented Employee Information with Employee Photo and employee details like Name, Address etc."))));
    };
    return RowTemplate;
}(sample_base_1.SampleBase));
exports.RowTemplate = RowTemplate;
