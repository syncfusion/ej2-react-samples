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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
/**
 * Pivot Field List default sample
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 58%;\n    height: 100%;\n    float: left;\n}\n.e-pivotfieldlist {\n    width: 42%;\n    height: 100%;\n    float: right;\n}\n.e-pivotfieldlist .e-static {\n    width: 100% !important;\n}";
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    dataSource: Pivot_Data,
    expandAll: false,
    allowLabelFilter: true,
    allowValueFilter: true,
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany', 'United States'] }],
    filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};
var DeferUpdate = (function (_super) {
    __extends(DeferUpdate, _super);
    function DeferUpdate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferUpdate.prototype.afterPopulate = function () {
        if (this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.updateView(this.pivotObj);
        }
        if (this.fieldlistObj && this.pivotObj && this.fieldlistObj.isRequiredUpdate) {
            this.fieldlistObj.updateView(this.pivotObj);
        }
        this.pivotObj.notify('ui-update', this.pivotObj);
        if (!ej2_base_1.Browser.isDevice) {
            this.fieldlistObj.notify('tree-view-update', this.fieldlistObj);
        }
    };
    DeferUpdate.prototype.afterPivotPopulate = function () {
        if (!ej2_base_1.Browser.isDevice && this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.update(this.pivotObj);
        }
    };
    DeferUpdate.prototype.rendereComplete = function () {
        this.fieldlistObj.updateView(this.pivotObj);
        this.fieldlistObj.update(this.pivotObj);
    };
    DeferUpdate.prototype.ondataBound = function () {
        this.pivotObj.tooltip.destroy();
        if (ej2_base_1.Browser.isDevice) {
            this.pivotObj.element.style.width = '100%';
            this.pivotObj.allowCalculatedField = true;
            this.pivotObj.showFieldList = true;
        }
        this.pivotObj.refresh();
    };
    DeferUpdate.prototype.onLoad = function () {
        if (ej2_base_1.Browser.isDevice) {
            this.renderMode = 'Popup';
            this.target = '.control-section';
            ej2_base_1.setStyleAttribute(document.getElementById('PivotFieldList'), {
                'width': 0,
                'height': 0,
                'float': 'left',
                'display': 'none'
            });
        }
    };
    DeferUpdate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return _this.pivotObj = d; }, enginePopulated: this.afterPivotPopulate.bind(this), width: '99%', height: '620', allowDeferLayoutUpdate: true, gridSettings: { columnWidth: 140 } }),
                React.createElement(ej2_react_pivotview_1.PivotFieldListComponent, { id: 'PivotFieldList', ref: function (d) { return _this.fieldlistObj = d; }, enginePopulated: this.afterPopulate.bind(this), dataSourceSettings: dataSourceSettings, renderMode: "Fixed", allowDeferLayoutUpdate: true, allowCalculatedField: true, load: this.onLoad, dataBound: this.ondataBound.bind(this) },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.CalculatedField] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the defer layout update feature of the pivot table. The defer layout update allows users to refresh the pivot table on-demand instead of during every UI interaction.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Deferring a layout update can be useful when you need to remove or add multiple fields in a report and you don't want to update the pivot table after each change. Now, you can update a pivot table after performing all changes at the report level in the field list resulting in better performance."),
                React.createElement("p", null,
                    "In this sample, the ",
                    React.createElement("b", null, "Defer Layout Update"),
                    " option can be enabled or disabled via field list UI."),
                React.createElement("p", null,
                    "In general, this feature can be enabled by setting  ",
                    React.createElement("code", null, "allowDeferLayoutUpdate"),
                    " as true."))));
    };
    return DeferUpdate;
}(sample_base_1.SampleBase));
exports.DeferUpdate = DeferUpdate;
