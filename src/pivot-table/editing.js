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
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var pivotData = require("./pivot-data/Pivot_Data.json");
/**
 * PivotView Sample with Edit Options.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Quarter' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}";
var Editing = (function (_super) {
    __extends(Editing, _super);
    function Editing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Editing.prototype.onRadioChange = function (args) {
        var id = args.event.target.id;
        if (id === 'inline') {
            this.pivotObj.editSettings.allowCommandColumns = false;
            this.pivotObj.editSettings.mode = 'Normal';
        }
        else if (id === 'batch') {
            this.pivotObj.editSettings.allowCommandColumns = false;
            this.pivotObj.editSettings.mode = 'Batch';
        }
        else if (id === 'dialog') {
            this.pivotObj.editSettings.allowCommandColumns = false;
            this.pivotObj.editSettings.mode = 'Dialog';
        }
        else {
            this.pivotObj.editSettings.allowCommandColumns = true;
        }
    };
    Editing.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, showTooltip: false, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', gridSettings: { columnWidth: 140 }, editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' } })),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', height: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'row', style: { margin: '0px' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "inline", change: this.onRadioChange.bind(this), checked: true, label: 'Inline Editing', name: 'EditOperation', value: "Inline Editing" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'row', style: { margin: '0px' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "batch", change: this.onRadioChange.bind(this), label: 'Batch Editing', name: 'EditOperation', value: "Batch Editing" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'row', style: { margin: '0px' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "dialog", change: this.onRadioChange.bind(this), label: 'Dialog Editing', name: 'EditOperation', value: "Dialog Editing" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'row', style: { margin: '0px' } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "cc", change: this.onRadioChange.bind(this), label: 'Command Columns', name: 'EditOperation', value: "Command Columns" }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates CRUD operations performed over the raw items of any value cell in a pivot table. Different types of cell editing options are provided to make editing simpler.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In the sample, the raw items of any value cell can be viewed in a drill-through dialog by double-clicking the cell. CRUD operations can be performed by double-clicking the cells or using toolbar options. The following CRUD operations can be performed through toolbar operations for normal and batch edits:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " - To add new record, click ",
                        React.createElement("code", null, "Add"),
                        " in the toolbar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double click a cell."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete a record, click ",
                        React.createElement("code", null, "Delete"),
                        " in the toolbar after selected a row."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update"),
                        ",",
                        React.createElement("code", null, "Cancel"),
                        " - You can save or discard changes by clicking ",
                        React.createElement("code", null, "Update"),
                        "or ",
                        React.createElement("code", null, "Cancel"),
                        " in the toolbar, respectively.")),
                React.createElement("p", null,
                    "This CRUD operations can be configured in a pivot table using ",
                    React.createElement("code", null, "editSettings"),
                    " in code behind. There are also different modes to manipulate the data source."),
                React.createElement("p", null, "The available modes are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Normal"),
                        " - Editing by row."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Batch"),
                        " - Editing individual cells and bulk updating."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog"),
                        " - Editing by row with a dialog option."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Command Columns"),
                        " - An additional column appends to the data grid with icons to perform CRUD operations. Editing using cell double-click is restricted here.")))));
    };
    return Editing;
}(sample_base_1.SampleBase));
exports.Editing = Editing;
