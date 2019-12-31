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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ColumnFormat = (function (_super) {
    __extends(ColumnFormat, _super);
    function ColumnFormat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = { type: 'dateTime', format: 'M/d/yyyy' };
        _this.columnNames = [
            { id: 'price', name: 'Price' },
            { id: 'orderDate', name: 'Order Date' }
        ];
        _this.priceFormat = [
            { id: 'n2', format: 'n2' },
            { id: 'n3', format: 'n3' },
            { id: 'c2', format: 'c2' },
            { id: 'c3', format: 'c3' },
            { id: 'p2', format: 'p2' },
            { id: 'p3', format: 'p3' }
        ];
        _this.dateFormat = [
            { id: 'M/d/yyyy', format: 'Short Date' },
            { id: 'dddd, MMMM dd, yyyy', format: 'Long Date' },
            { id: 'MMMM, yyyy', format: 'Month/Year' },
            { id: 'MMMM, dd', format: 'Month/Day' }
        ];
        return _this;
    }
    ColumnFormat.prototype.change = function (args) {
        var columnName = args.value.toString();
        if (columnName === 'price') {
            this.dropdownObj2.dataSource = this.priceFormat;
            var priceColumn = this.treegridObj.getColumnByField('price');
            this.dropdownObj2.value = priceColumn.format.toString();
        }
        if (columnName === 'orderDate') {
            this.dropdownObj2.dataSource = this.dateFormat;
            var format = this.treegridObj.getColumnByField('orderDate').format;
            this.dropdownObj2.value = format.format;
        }
    };
    ColumnFormat.prototype.change2 = function (args) {
        var formatval = args.value;
        var columnName = this.dropdownObj.value.toString();
        if (columnName === 'price') {
            this.treegridObj.getColumnByField(columnName).format = formatval;
        }
        if (columnName === 'orderDate') {
            this.treegridObj.getColumnByField(columnName).format = { format: formatval, type: 'date' };
        }
        this.treegridObj.refreshColumns();
    };
    ColumnFormat.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.formatData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', ref: function (treegrid) { return _this.treegridObj = treegrid; }, pageSettings: { pageCount: 5 } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'orderID', headerText: 'Order ID', width: '110', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'orderName', headerText: 'Order Name', width: '200' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'orderDate', headerText: 'Order Date', width: '190', type: 'date', format: this.format, textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'price', headerText: 'Price', width: '120', format: 'c2', textAlign: 'Right', type: 'number' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Column ")),
                                React.createElement("td", { style: { width: '80%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columns", change: this.change.bind(this), dataSource: this.columnNames, fields: { text: 'name', value: 'id' }, value: "price", popupWidth: '100%', ref: function (dropdown) { return _this.dropdownObj = dropdown; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, " Format ")),
                                React.createElement("td", { style: { width: '70%', padding: '10px 10px 10px 0px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "format", change: this.change2.bind(this), dataSource: this.priceFormat, fields: { text: 'format', value: 'id' }, value: "c2", popupWidth: '100%', ref: function (dropdown) { return _this.dropdownObj2 = dropdown; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the way of displaying the content of TreeGrid columns based on the specified format. In this sample, format of columns can be changed dynamically through property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Format is the process of customizing the particular column data/values based on specific culture. The TreeGrid uses Internalization library to format number and date values. The format can be specified by using ",
                    React.createElement("code", null, "format"),
                    " property of columns."),
                React.createElement("p", null, "In this demo, select the column and format from the property panel to format the corresponding column values."),
                React.createElement("p", null, "More information about Column Formatting can be found in this documentation section."))));
    };
    return ColumnFormat;
}(sample_base_1.SampleBase));
exports.ColumnFormat = ColumnFormat;
