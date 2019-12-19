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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
{ }
var SAMPLE_CSS = "\n  .e-input {\n    padding-bottom: 1px !important;\n  }\n\n  .e-summarycell.e-templatecell {\n    pointer-events:visible !important;\n  }";
{ }
var CustomAggregate = (function (_super) {
    __extends(CustomAggregate, _super);
    function CustomAggregate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.foods = [
            { food: 'Frozen seafood' },
            { food: 'Dairy' },
            { food: 'Edible' },
            { food: 'Solid crystals' },
        ];
        return _this;
    }
    CustomAggregate.prototype.customAggregateFn = function (data) {
        var sampleData = ej2_react_grids_1.getObject('result', data);
        var countLength;
        countLength = 0;
        sampleData.filter(function (item) {
            var data = ej2_react_grids_1.getObject('category', item);
            var inputEle = document.getElementById("mytext");
            var value = inputEle.value;
            if (data === value) {
                countLength++;
            }
        });
        return countLength;
    };
    CustomAggregate.prototype.custom = function (props) {
        return (React.createElement("span", null,
            " Count of ",
            React.createElement("input", { type: "text", id: "customers" }),
            ": ",
            props.Custom));
    };
    CustomAggregate.prototype.dataBound = function () {
        var _this = this;
        if (!ej2_base_1.isNullOrUndefined(this.listObj)) {
            this.listObj.destroy();
        }
        var inputEle = document.getElementById("mytext");
        var value = inputEle.value;
        this.listObj = new ej2_react_dropdowns_1.DropDownList({
            dataSource: this.foods,
            fields: { value: 'food' },
            placeholder: 'Select a Category',
            width: '130px',
            value: value,
            change: function () {
                setTimeout(function () {
                    var inputEle = document.getElementById("mytext");
                    inputEle.value = _this.listObj.value.toString();
                    _this.treegridObj.refresh();
                }, 300);
            }
        });
        this.listObj.appendTo('#customers');
    };
    CustomAggregate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("input", { type: 'hidden', value: 'Frozen seafood', id: 'mytext' }),
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.summaryData, treeColumnIndex: 1, childMapping: 'subtasks', height: '400', ref: function (treegrid) { return _this.treegridObj = treegrid; }, dataBound: this.dataBound.bind(this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'ID', headerText: 'S.No', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Name', headerText: 'Shipment Name', width: '220' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'category', headerText: 'Category', width: '230' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'units', headerText: 'Total Units', width: '130', textAlign: 'Right', type: 'number' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'unitPrice', headerText: 'Unit Price($)', width: '130', textAlign: 'Right', type: 'number', format: 'C2' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'price', headerText: 'Price($)', width: '90', textAlign: 'Right', type: 'number', format: 'C0' })),
                    React.createElement(ej2_react_treegrid_1.AggregatesDirective, null,
                        React.createElement(ej2_react_treegrid_1.AggregateDirective, { showChildSummary: false },
                            React.createElement(ej2_react_treegrid_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_treegrid_1.AggregateColumnDirective, { columnName: 'category', type: 'Custom', customAggregate: this.customAggregateFn, footerTemplate: this.custom }, " ")))),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Aggregate] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates custom aggregate functionality of the TreeGrid. In this sample, the custom aggregate value for the columns \u201CCategory\u201D is displayed in column footer with dropdown to display the count of selected category name.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The TreeGrid supports aggregates which will be displayed at the footer and every hierarchy level. The aggregate configurations can be provided by the ",
                    React.createElement("code", null, "aggregates"),
                    " property."),
                React.createElement("p", null, "The built-in aggregates are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Sum")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Average")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Min")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Max")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Count")),
                    React.createElement("li", null,
                        React.createElement("code", null, "TrueCount")),
                    React.createElement("li", null,
                        React.createElement("code", null, "FalseCount")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Custom"),
                        " - Requires the ",
                        React.createElement("code", null, "customAggregate"),
                        " property to perform aggregation. The custom aggregate value can be accessed inside template using the key ",
                        React.createElement("code", null,
                            "$",
                            'Custom'))),
                React.createElement("p", null, "In this demo, the footerTemplate property shows the custom aggregate value for the columns \u201CCategory\u201D in column footer to display the count of category name."),
                React.createElement("p", null,
                    "The template expression should be provided inside ",
                    React.createElement("code", null,
                        "$",
                        '...'),
                    " the interpolation syntax."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject ",
                    React.createElement("code", null, "Aggregate"),
                    " module in this services."),
                React.createElement("p", null, "More information about aggregate can be found in this documentation section."))));
    };
    return CustomAggregate;
}(sample_base_1.SampleBase));
exports.CustomAggregate = CustomAggregate;
