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
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_grids_1 = require("@syncfusion/ej2-grids");
var ColumnTemplate = /** @class */ (function (_super) {
    __extends(ColumnTemplate, _super);
    function ColumnTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    ColumnTemplate.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    ColumnTemplate.prototype.rowDataBound = function (args) {
        var data = ej2_grids_1.getObject('EmployeeID', args.data);
        var spkline = args.row.querySelector('#spkline' + data);
        var spkarea = args.row.querySelector('#spkarea' + data);
        var spkwl = args.row.querySelector('#spkwl' + data);
        var line = new ej2_react_charts_1.Sparkline({
            height: '50px',
            width: '150px', load: this.load,
            lineWidth: 2,
            valueType: 'Numeric',
            fill: '#3C78EF',
            dataSource: data_1.getSparkData('line', +data)
        });
        line.appendTo(spkline);
        var column = new ej2_react_charts_1.Sparkline({
            height: '50px',
            width: '150px', load: this.load,
            type: 'Column',
            valueType: 'Numeric',
            fill: '#3C78EF',
            negativePointColor: '#f7a816',
            dataSource: data_1.getSparkData('column', +data)
        });
        column.appendTo(spkarea);
        var winloss = new ej2_react_charts_1.Sparkline({
            height: '50px',
            width: '150px', load: this.load,
            type: 'WinLoss',
            valueType: 'Numeric',
            fill: '#3C78EF',
            tiePointColor: 'darkgray',
            negativePointColor: '#f7a816',
            dataSource: data_1.getSparkData('column', +data)
        });
        winloss.appendTo(spkwl);
    };
    ColumnTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.textdata, treeColumnIndex: 0, childMapping: 'Children', height: '410', rowDataBound: this.rowDataBound.bind(this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'EmpID', headerText: 'Employee ID', width: '95' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Name', headerText: 'Name', width: '90' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'DOB', headerText: 'DOB', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'Tax per annum', width: '90', template: function (props) {
                                return (React.createElement("div", { id: "spkline" + props.EmployeeID }));
                            }, textAlign: 'Center' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'One Day Index', template: function (props) {
                                return (React.createElement("div", { id: "spkarea" + props.EmployeeID }));
                            }, textAlign: 'Center', width: '100' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: 'Year GR', template: function (props) {
                                return (React.createElement("div", { id: "spkwl" + props.EmployeeID }));
                            }, textAlign: 'Center', width: '100' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of template columns in TreeGrid. In this sample, we have presented the sparkline charts.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The TreeGrid provides a way to use a custom layout for each cell using column template feature. The ",
                    React.createElement("code", null, "columns->template"),
                    " property accepts either string or HTML element`s ID value, which will be used as the template for the cell."),
                React.createElement("p", null,
                    "In this demo, using column template, we have presented sparkLine charts for the \"Tax per annum\", \"One day index\" and \"Year GR\" columns. In ",
                    React.createElement("code", null, "columns->template"),
                    " we have assigned with the ID of a SCRIPT element whose content is used as the template."),
                React.createElement("p", null, "More information about Column Template can be found in this documentation section."))));
    };
    return ColumnTemplate;
}(sample_base_1.SampleBase));
exports.ColumnTemplate = ColumnTemplate;
var GridData = /** @class */ (function () {
    function GridData() {
    }
    return GridData;
}());
exports.GridData = GridData;
