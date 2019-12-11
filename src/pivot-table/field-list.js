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
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};
var FieldList = /** @class */ (function (_super) {
    __extends(FieldList, _super);
    function FieldList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldList.prototype.afterPopulate = function () {
        if (this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.updateView(this.pivotObj);
        }
    };
    FieldList.prototype.afterPivotPopulate = function () {
        if (!ej2_base_1.Browser.isDevice && this.fieldlistObj && this.pivotObj) {
            this.fieldlistObj.update(this.pivotObj);
        }
    };
    FieldList.prototype.rendereComplete = function () {
        this.fieldlistObj.updateView(this.pivotObj);
        this.fieldlistObj.update(this.pivotObj);
    };
    FieldList.prototype.ondataBound = function () {
        this.pivotObj.tooltip.destroy();
        if (ej2_base_1.Browser.isDevice) {
            this.pivotObj.element.style.width = '100%';
            this.pivotObj.allowCalculatedField = true;
            this.pivotObj.showFieldList = true;
        }
        this.pivotObj.refresh();
    };
    FieldList.prototype.onLoad = function () {
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
    FieldList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section", style: { overflow: 'auto' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return _this.pivotObj = d; }, enginePopulated: this.afterPivotPopulate.bind(this), width: '99%', height: '580', gridSettings: { columnWidth: 140 } },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.PivotFieldList] })),
                React.createElement(ej2_react_pivotview_1.PivotFieldListComponent, { id: 'PivotFieldList', ref: function (d) { return _this.fieldlistObj = d; }, enginePopulated: this.afterPopulate.bind(this), dataSourceSettings: dataSourceSettings, renderMode: "Fixed", allowCalculatedField: true, load: this.onLoad, dataBound: this.ondataBound.bind(this) },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.CalculatedField] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Excel-like field list feature of the pivot table. The pivot fields are automatically populated from the bound data source, and they can be dragged and dropped to create and alter the report at runtime.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The pivot table provides a built-in field list very similar to Microsoft Excel. The top section of the field list allows the user to add and remove fields. The bottom section of the field list allows the user to rearrange the fields between different axes, including column, row, value, and filter along with filter and sort options.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    " To show the field list independently, create as separate component namely",
                    React.createElement("code", null, " PivotFieldList"),
                    " and assign JSON data source to its",
                    React.createElement("code", null, " dataSourceSettings->dataSource"),
                    " property. Simultaneously pivot table will be populated by passing its instance in the updateView method, inside the",
                    React.createElement("code", null, " enginePopulated"),
                    " event of field list.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Additionally, user interface for calculated field, label filter, and value filter features have been enabled in this demo by setting the properties",
                    React.createElement("code", null, " allowCalculatedField"),
                    ",",
                    React.createElement("code", null, " dataSourceSettings->allowLabelFilter"),
                    " and ",
                    React.createElement("code", null, " dataSourceSettings->allowValueFilter"),
                    " to true."),
                React.createElement("p", null,
                    React.createElement("strong", null, "NOTE:"),
                    " To enable calculated field, inject",
                    React.createElement("code", null, " CalculatedField")))));
    };
    return FieldList;
}(sample_base_1.SampleBase));
exports.FieldList = FieldList;
