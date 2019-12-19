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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
/**
 * PivotView Sample with Calculated Fields.
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}";
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' },
        { name: 'Sold', caption: 'Units Sold' }, { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    calculatedFieldSettings: [
        {
            name: 'Total',
            formula: '"Sum(In_Stock)"+"Sum(Sold)"'
        }
    ]
};
var CalculatedFieldClass = (function (_super) {
    __extends(CalculatedFieldClass, _super);
    function CalculatedFieldClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalculatedFieldClass.prototype.btnClick = function () {
        this.pivotObj.calculatedFieldModule.createCalculatedFieldDialog();
    };
    CalculatedFieldClass.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, showFieldList: true, width: '100%', height: '300', allowCalculatedField: true, gridSettings: { columnWidth: 140 } },
                        React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.FieldList] }))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("div", { style: { float: 'Right', marginRight: '10px' } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-primary', onClick: this.btnClick.bind(this) }, "Calculated Field"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In this sample, ",
                    React.createElement("b", null, "Total Units"),
                    " acts as the calculated field. Users can insert a new basic arithmetic expression based on the existing measure items either through a dialog at runtime or through code behind.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The calculated field feature allows users to create custom fields which are not present in the actual data. Users can create these fields using basic mathematical expression collaborating with existing fields. Calculated fields can be created through UI dialog as well as code behind and it can be enabled by setting ",
                    React.createElement("code", null, "allowCalculatedField"),
                    " as true. The",
                    React.createElement("code", null, " calculatedFieldSettings"),
                    " property is available to configure the calculated field in code behind.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "The pivot table features are segregated into individual modules. To add calculated field, we need to inject",
                    React.createElement("code", null, " CalculatedField"),
                    " module into the",
                    React.createElement("code", null, " services"),
                    "."))));
    };
    return CalculatedFieldClass;
}(sample_base_1.SampleBase));
exports.CalculatedFieldClass = CalculatedFieldClass;
