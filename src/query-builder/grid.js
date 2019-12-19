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
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_data_1 = require("@syncfusion/ej2-data");
var data_source_1 = require("./data-source");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./grid.css");
var DataGrid = (function (_super) {
    __extends(DataGrid, _super);
    function DataGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datamanager = new ej2_data_1.DataManager(data_source_1.hardwareData);
        _this.query = new ej2_data_1.Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status']);
        _this.columnData = [
            {
                field: 'TaskID', label: 'TaskID', type: 'number', operators: [{ key: 'equal', value: 'equal' },
                    { key: 'greaterthan', value: 'greaterthan' }, { key: 'lessthan', value: 'lessthan' }]
            },
            { field: 'Name', label: 'Name', type: 'string' },
            { field: 'Category', label: 'Category', type: 'string' },
            { field: 'SerialNo', label: 'SerialNo', type: 'string' },
            { field: 'InvoiceNo', label: 'InvoiceNo', type: 'string' },
            { field: 'Status', label: 'Status', type: 'string' }
        ];
        _this.importRules = {
            'condition': 'or',
            'rules': [{
                    'label': 'Category',
                    'field': 'Category',
                    'type': 'string',
                    'operator': 'equal',
                    'value': 'Laptop'
                }]
        };
        return _this;
    }
    DataGrid.prototype.updateRule = function (args) {
        var predicate = this.qbObj.getPredicate(args.rule);
        if (ej2_base_1.isNullOrUndefined(predicate)) {
            this.gridObj.query = new ej2_data_1.Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status']);
        }
        else {
            this.gridObj.query = new ej2_data_1.Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status'])
                .where(predicate);
        }
        this.gridObj.refresh();
    };
    DataGrid.prototype.onGridCreated = function () {
        this.updateRule({ rule: this.qbObj.getValidRules(this.qbObj.rule) });
    };
    DataGrid.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section qb-section' },
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-lg-12 control-section qb-section' },
                        React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { width: '100%', dataSource: data_source_1.hardwareData, columns: this.columnData, rule: this.importRules, ruleChange: this.updateRule.bind(this), ref: function (scope) { _this.qbObj = scope; } })),
                    React.createElement("div", { className: 'col-lg-12 control-section qb-section' },
                        React.createElement("div", { className: 'content-wrapper' },
                            React.createElement(ej2_react_grids_1.GridComponent, { allowPaging: true, dataSource: this.datamanager, width: '100%', ref: function (scope) { _this.gridObj = scope; }, query: this.query, created: this.onGridCreated.bind(this) },
                                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'TaskID', headerText: 'Task ID', width: '120', textAlign: 'Right' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Name', headerText: 'Name', width: '140' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Category', headerText: 'Category', width: '140', textAlign: 'Right' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'SerialNo', headerText: 'Serial No', width: '130' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'InvoiceNo', headerText: 'Invoice No', width: '120' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Status', headerText: 'Status', width: '120' })),
                                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] })))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the integration of Grid component to showcase the data population based on the created filters using Query Builder component.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "This sample illustrates the way to integrate the Grid component to Query Builder. The Grid component will be refreshed while editing the filters in Query Builder."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    ;
    return DataGrid;
}(sample_base_1.SampleBase));
exports.DataGrid = DataGrid;
