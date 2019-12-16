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
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var gData = require("./pivot-data/gData.json");
require("./grouping.css");
/**
 * PivotView Grouping Sample
 */
/* tslint:disable */
var data = gData.data;
var selectedGroups = ['Years', 'Months', 'Days'];
var groupData = ['Years', 'Quarters', 'Months', 'Days'];
var dataSourceSettings = {
    dataSource: ej2_base_1.extend([], data, null, true),
    expandAll: false,
    enableSorting: true,
    formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Sold', format: 'N0' },
        { name: 'Date', type: 'date', format: 'dd/MM/yyyy-hh:mm a' }],
    rows: [{ name: 'Date', caption: 'Date' }],
    columns: [{ name: 'Product_ID', caption: 'Product ID' },
        { name: 'Products', caption: 'Products' }],
    values: [{ name: 'Sold', caption: 'Unit Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [],
    groupSettings: [{ name: 'Date', type: 'Date', groupInterval: ['Years', 'Months', 'Days'] },
        { name: 'Product_ID', type: 'Number', rangeInterval: 4 }]
};
var Grouping = /** @class */ (function (_super) {
    __extends(Grouping, _super);
    function Grouping() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grouping.prototype.beforeColumnsRender = function (args) {
        if (args.dataSourceSettings.rows.length > 3 && args.columns[0].width <= 250) {
            args.columns[0].width = 285;
        }
    };
    Grouping.prototype.applyGroupSettings = function (args) {
        if (args.name === 'select') {
            if (selectedGroups.indexOf(args.itemData) === -1) {
                selectedGroups.push(args.itemData);
            }
        }
        else {
            if (selectedGroups.indexOf(args.itemData) > -1) {
                var index = selectedGroups.indexOf(args.itemData);
                selectedGroups.splice(index, 1);
            }
        }
    };
    Grouping.prototype.onClick = function () {
        var groupSettings = [];
        if (selectedGroups.length > 0) {
            groupSettings.push({ name: 'Date', type: 'Date', groupInterval: selectedGroups });
        }
        if (this.numberGroup.value > 1) {
            groupSettings.push({ name: 'Product_ID', type: 'Number', rangeInterval: this.numberGroup.value });
        }
        this.pivotObj.dataSourceSettings.groupSettings = groupSettings;
    };
    ;
    Grouping.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section', id: 'pivot-table-section', style: { overflow: 'initial' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { _this.pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '450', showGroupingBar: true, gridSettings: { columnWidth: 140, columnRender: this.beforeColumnsRender } },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.GroupingBar] }))),
            React.createElement("div", { className: "col-lg-4 property-section pivot-table-property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', height: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Group Date by:")),
                                React.createElement("td", { style: { paddingBottom: '16px' } },
                                    React.createElement("div", { className: "datecls" },
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "dategroup", dataSource: groupData, mode: "CheckBox", enableSelectionOrder: false, showDropDownIcon: true, popupWidth: '150', width: '150', value: selectedGroups, placeholder: 'Search group', filterBarPlaceholder: 'Search group', select: this.applyGroupSettings.bind(this), removed: this.applyGroupSettings.bind(this) },
                                            React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                            React.createElement("tr", { className: "input2cls", style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Group Product ID by:")),
                                React.createElement("td", { style: { paddingBottom: '16px' } },
                                    React.createElement("div", { className: "numbercls" },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "numbergroup", ref: function (scope) { _this.numberGroup = scope; }, value: 4, width: '150', placeholder: 'Example: 4', format: '###', min: 1, max: 10 })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { float: 'right', marginRight: "4px" } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'group-apply', onClick: this.onClick.bind(this), isPrimary: true }, "Apply")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates grouping dates in year, quarter, month, etc., and number types in ranges like 1\u20135, 6\u201310, etc. in row and column headers of the pivot table.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, the date type can be separated and showcased individually as year, quarter, month, or day by selecting the appropriate option from the ",
                    React.createElement("b", null, "Group date"),
                    " by drop-down list. Also, numbers can be grouped by entering the appropriate value in the ",
                    React.createElement("b", null, "Group Product ID"),
                    " by giving a range number in the the numeric text box."),
                React.createElement("p", null,
                    "Grouping can be applied through code-behind using the ",
                    React.createElement("code", null, "groupSettings"),
                    " object in the pivot table along with the following properties:"),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '10px 0', width: '130px' } },
                            React.createElement("code", null, "name:")),
                        React.createElement("td", null, "Specifies the normal field.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "type:")),
                        React.createElement("td", null, "Specifies the field type for applying the group settings. For example, date formatted fields should be in Date type and number formatted fields should be in Number type.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "groupInterval :")),
                        React.createElement("td", null, "Specifies the interval for date fields in years, quarters, months, etc.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "rangeInterval :")),
                        React.createElement("td", null, "Specifies the interval value to group the number field."))))));
    };
    return Grouping;
}(sample_base_1.SampleBase));
exports.Grouping = Grouping;
