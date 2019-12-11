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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Sorting = /** @class */ (function (_super) {
    __extends(Sorting, _super);
    function Sorting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortingOptions = { columns: [{ field: 'Category', direction: 'Ascending' },
                { field: 'orderName', direction: 'Ascending' }] };
        return _this;
    }
    Sorting.prototype.orderNameChange = function (args) {
        if (args.checked) {
            this.treegridObj.sortByColumn('orderName', 'Ascending', true);
        }
        else {
            this.treegridObj.grid.removeSortColumn('orderName');
        }
    };
    Sorting.prototype.categoryChange = function (args) {
        if (args.checked) {
            this.treegridObj.sortByColumn('Category', 'Ascending', true);
        }
        else {
            this.treegridObj.grid.removeSortColumn('Category');
        }
    };
    Sorting.prototype.orderDateChange = function (args) {
        if (args.checked) {
            this.treegridObj.sortByColumn('orderDate', 'Ascending', true);
        }
        else {
            this.treegridObj.grid.removeSortColumn('orderDate');
        }
    };
    Sorting.prototype.unitsChange = function (args) {
        if (args.checked) {
            this.treegridObj.sortByColumn('units', 'Ascending', true);
        }
        else {
            this.treegridObj.grid.removeSortColumn('units');
        }
    };
    Sorting.prototype.sort = function (args) {
        if (args.requestType === 'sorting') {
            for (var _i = 0, _a = this.treegridObj.getColumns(); _i < _a.length; _i++) {
                var columns = _a[_i];
                for (var _b = 0, _c = this.treegridObj.sortSettings.columns; _b < _c.length; _b++) {
                    var sortcolumns = _c[_b];
                    if (sortcolumns.field === columns.field) {
                        this.check(sortcolumns.field, true);
                        break;
                    }
                    else {
                        this.check(columns.field, false);
                    }
                }
            }
        }
    };
    Sorting.prototype.check = function (field, state) {
        switch (field) {
            case 'orderName':
                this.orderNameObj.checked = state;
                break;
            case 'Category':
                this.categoryObj.checked = state;
                break;
            case 'orderDate':
                this.orderDateObj.checked = state;
                break;
            case 'units':
                this.unitsObj.checked = state;
                break;
        }
    };
    Sorting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sortData, treeColumnIndex: 0, childMapping: 'subtasks', allowPaging: 'true', allowSorting: 'true', sortSettings: this.sortingOptions, ref: function (treegrid) { return _this.treegridObj = treegrid; }, actionComplete: this.sort.bind(this) },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'orderName', headerText: 'Order Name', width: '220' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Category', headerText: 'Category', width: '150' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'orderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'units', headerText: 'Units', width: '130', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Sort] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null, " Order Name")),
                            React.createElement("td", { style: { width: '30%', padding: '10px 10px 10px 0px' } },
                                React.createElement("div", { className: 'col-md-6' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: this.orderNameChange.bind(this), ref: function (scope) { _this.orderNameObj = scope; } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null, " Category ")),
                            React.createElement("td", { style: { width: '30%', padding: '10px 10px 10px 0px' } },
                                React.createElement("div", { className: 'col-md-6' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: this.categoryChange.bind(this), ref: function (scope) { _this.categoryObj = scope; } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null, " Order Date ")),
                            React.createElement("td", { style: { width: '30%', padding: '10px 10px 10px 0px' } },
                                React.createElement("div", { className: 'col-md-6' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.orderDateChange.bind(this), ref: function (scope) { _this.orderDateObj = scope; } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null, " Units ")),
                            React.createElement("td", { style: { width: '30%', padding: '10px 10px 10px 0px' } },
                                React.createElement("div", { className: 'col-md-6' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.unitsChange.bind(this), ref: function (scope) { _this.unitsObj = scope; } })))))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates the TreeGrid multi sorting feature. To sort two or more columns, hold the CTRL key and click the column header.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the ",
                        React.createElement("code", null, "allowSorting"),
                        " as true."),
                    React.createElement("p", { className: "e-grid", style: { border: 'none' } },
                        "To sort a TreeGrid column by simply click the column header. The icons ",
                        React.createElement("span", { className: "e-icons e-icon-ascending" }),
                        "(ascending) and ",
                        React.createElement("span", { className: "e-icons e-icon-descending" }),
                        "(descending) specifies the sort direction of a column."),
                    React.createElement("p", null,
                        "By default, multi-sorting is enabled in TreeGrid, to sort multiple column hold ",
                        React.createElement("strong", null, "CTRL"),
                        " key and click the column header. To clear sort for a column, hold ",
                        React.createElement("strong", null, "SHIFT"),
                        " key and click the column header."),
                    React.createElement("p", null, " While using TreeGrid in a touch device, you have an option for multi sorting in single tap on the treegrid header. By tapping on the treegrid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi-sorting in single tap."),
                    React.createElement("p", null, "In this demo, "),
                    React.createElement("ul", null,
                        React.createElement("li", null, "Simply click the column header to sort a column."),
                        React.createElement("li", null, "Check the checkboxes in the properties panel to sort a column and uncheck to remove sort from a column.")),
                    React.createElement("p", null, "Injecting Module:"),
                    React.createElement("p", null,
                        "TreeGrid features are segregated into individual feature-wise modules. To use sorting feature, we need to inject",
                        React.createElement("code", null, "Sort"),
                        " module into the ",
                        React.createElement("code", null, "services"),
                        "."),
                    React.createElement("p", null, "More information on the sorting feature configuration can be found in this documentation section.")))));
    };
    return Sorting;
}(sample_base_1.SampleBase));
exports.Sorting = Sorting;
