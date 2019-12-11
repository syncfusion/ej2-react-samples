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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var Filtering = /** @class */ (function (_super) {
    __extends(Filtering, _super);
    function Filtering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filData = [
            { id: '1', category: 'All' },
            { id: '2', category: 'Beverages' },
            { id: '3', category: 'Condiments' },
            { id: '4', category: 'Confections' },
            { id: '5', category: 'Dairy Products' },
            { id: '6', category: 'Grains/Cereals' },
            { id: '7', category: 'Meat/Poultry' },
            { id: '8', category: 'Produce' },
            { id: '9', category: 'Seafood' }
        ];
        _this.fields = { text: 'category', value: 'id' };
        return _this;
    }
    Filtering.prototype.onChange = function (sel) {
        if (sel.itemData.category === 'All') {
            this.gridInstance.clearFiltering();
        }
        else {
            this.gridInstance.filterByColumn('CategoryName', 'equal', sel.itemData.category);
        }
    };
    Filtering.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { style: { padding: '14px 0' } },
                    React.createElement("div", { className: "select-wrap" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: this.filData, fields: this.fields, change: this.onChange.bind(this), placeholder: "Select category to filter", width: "200px" }))),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.categoryData, allowPaging: true, ref: function (grid) { return _this.gridInstance = grid; }, pageSettings: { pageSize: 10, pageCount: 5 }, allowFiltering: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CategoryName', headerText: 'Category Name', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'QuantityPerUnit', headerText: 'Quantity PerUnit', width: '180', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Units In Stock', width: '150', textAlign: 'Right' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid Default Filtering feature. In this sample, type the value in the filterbar and press enter to filter particular column.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The filtering feature enables the user to view the reduced amount of records based on filter criteria. It can be enabled by setting ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowfiltering-boolean' }, "allowFiltering")),
                    " property as true. A filter bar row will be rendered next to header which allows the end-users to filter data by entering text within its cells."),
                React.createElement("p", null, "Filterbar uses two modes which specifies how to start filtering. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "OnEnter"),
                        " - Enabled by default, filter will be initiated after pressing ",
                        React.createElement("code", null, "Enter"),
                        " key."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Immediate"),
                        " - Filter will start after user ends typing. This uses a time delay of ",
                        React.createElement("i", null, "1500ms"),
                        "to initiate filter after use stops typing. It can be overridden using the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#filtersettings-filtersettingsmodel' }, "filterSettings->immediateModeDelay")),
                        " property.")),
                React.createElement("p", null,
                    "In this demo, you can either select the ",
                    React.createElement("strong", null, "Category Name"),
                    " from the SELECT element or type the text in the filter bar cells to filter the Grid. "),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use filtering feature, we need to inject",
                    React.createElement("code", null, "Filter"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the filter configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#filtersettings-filtersettingsmodel' }, "documentation section"),
                    "."),
                " ")));
    };
    return Filtering;
}(sample_base_1.SampleBase));
exports.Filtering = Filtering;
