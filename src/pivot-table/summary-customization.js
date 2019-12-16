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
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./summary-customization.css");
/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    drilledMembers: [{ name: 'Country', items: ['France'] }],
    filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    showGrandTotals: false
};
var values = [
    { Name: 'Country' },
    { Name: 'Year' }
];
var field = { text: 'Name' };
var placeholder = "Select fields to hide its sub-totals";
var SummaryCustomization = /** @class */ (function (_super) {
    __extends(SummaryCustomization, _super);
    function SummaryCustomization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SummaryCustomization.prototype.onChange = function (args) {
        this.pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: true } }, true);
        this.pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
        this.pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
        if (args.value === 'Column') {
            this.pivotObj.dataSourceSettings.showColumnGrandTotals = false;
        }
        else if (args.value === 'Row') {
            this.pivotObj.dataSourceSettings.showRowGrandTotals = false;
        }
        else if (args.value === 'Both') {
            this.pivotObj.dataSourceSettings.showGrandTotals = false;
        }
    };
    SummaryCustomization.prototype.select = function (args) {
        for (var i = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = false;
            }
        }
        for (var i = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = false;
            }
        }
    };
    SummaryCustomization.prototype.removed = function (args) {
        for (var i = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = true;
            }
        }
        for (var i = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = true;
            }
        }
    };
    SummaryCustomization.prototype.open = function (args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    };
    SummaryCustomization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { _this.pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '400', gridSettings: { columnWidth: 140 } })),
            React.createElement("div", { className: "col-lg-4 property-section pivot-table-property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', height: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { fontWeight: 600, fontSize: '13px' } }, "Hide grand totals"))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio1", change: this.onChange.bind(this), label: 'Row', name: 'Total', value: "Row" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio2", change: this.onChange.bind(this), label: 'Column', name: 'Total', value: "Column" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio3", checked: true, change: this.onChange.bind(this), label: 'Both', name: 'Total', value: "Both" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { fontWeight: 600, fontSize: '13px' } }, "Hide sub-totals"))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "checkbox", dataSource: values, fields: field, mode: "CheckBox", showClearButton: true, enableSelectionOrder: false, showDropDownIcon: true, placeholder: placeholder, select: this.select.bind(this), removed: this.removed.bind(this), open: this.open.bind(this) },
                                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates showing and hiding grand totals and subtotals in rows, columns, or both at runtime. Also, end users can specify and hide subtotals of specific fields.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, you can hide grand totals in row, column, or both using radio buttons available under the ",
                    React.createElement("b", null, "Hide grand totals"),
                    " category. To hide grand totals in both row and column, set the property ",
                    React.createElement("code", null, "dataSourceSettings->showGrandTotals"),
                    " as false. To hide the row and column grand totals separately, set the property ",
                    React.createElement("code", null, "dataSourceSettings->showRowGrandTotals"),
                    " and ",
                    React.createElement("code", null, "dataSourceSettings->showColumnGrandTotals"),
                    "as false."),
                React.createElement("p", null,
                    "Also, in this sample, you can hide subtotals for specific fields too. It can be achieved by selecting appropriate fields from the drop-down available under the ",
                    React.createElement("b", null, "Hide sub-totals"),
                    " category. To hide subtotals for a specific field, set the ",
                    React.createElement("code", null, "showSubTotals"),
                    " property as false inside the field definition."))));
    };
    return SummaryCustomization;
}(sample_base_1.SampleBase));
exports.SummaryCustomization = SummaryCustomization;
