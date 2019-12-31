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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var FilterMenu = (function (_super) {
    __extends(FilterMenu, _super);
    function FilterMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterType = [
            { text: 'Menu', value: 'Menu' },
            { text: 'Excel', value: 'Excel' }
        ];
        _this.modes = [
            { text: 'Parent', value: 'Parent' },
            { text: 'Child', value: 'Child' },
            { text: 'Both', value: 'Both' },
            { text: 'None', value: 'None' },
        ];
        return _this;
    }
    FilterMenu.prototype.onChange = function (sel) {
        var type = sel.value.toString();
        this.treegridInstance.filterSettings.type = type;
        this.treegridInstance.clearFiltering();
    };
    FilterMenu.prototype.onChange2 = function (sel) {
        var mode = sel.value.toString();
        this.treegridInstance.filterSettings.hierarchyMode = mode;
        this.treegridInstance.clearFiltering();
    };
    FilterMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, ref: function (treegrid) { return _this.treegridInstance = treegrid; }, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', allowFiltering: 'true', filterSettings: { type: 'Menu', hierarchyMode: 'Parent' } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '90', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '180' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Page] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Filter Type ")),
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "seltype", change: this.onChange.bind(this), dataSource: this.filterType, value: "Menu" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Hierarchy Mode ")),
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.onChange2.bind(this), dataSource: this.modes, value: "Parent" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " This sample demonstrates the way of filtering TreeGrid columns using menu and excel filter UI. In this sample, click the filtering icon from column header to show filter UI for a particular column. You can change the filter type from the properties panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The filtering feature enables the user to view the reduced amount of records based on filter criteria. It can be enabled by setting ",
                    React.createElement("code", null, "allowFiltering"),
                    " property as true."),
                React.createElement("p", null, "TreeGrid supports the following filter types. They are "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "FilterBar")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Menu")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Excel"))),
                "you can change the filter type by setting ",
                React.createElement("code", null, "filterSettings->type"),
                React.createElement("p", null, "TreeGrid provides support for a set of filtering modes with hierarchyMode property. The below are the type of filter mode available in TreeGrid. "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Parent"),
                        " - This is the default filter hierarchy mode in TreeGrid.The filtered records are displayed with its parent records, if the filtered records not have any parent record then the filtered record only displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Child"),
                        " - The filtered records are displayed with its child record, if the filtered records do not have any child record then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - The filtered records are displayed with its both parent and child record. If the filtered records do not have any parent and child record then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Only the filtered records are displayed.")),
                React.createElement("p", null, " In this demo, filter menu enabled by default, you can switch to other hierarchy mode of filtering by using dropdown."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use filtering feature, we need to inject",
                    React.createElement("code", null, "Filter"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information filter configuration can be found in this documentation section."))));
    };
    return FilterMenu;
}(sample_base_1.SampleBase));
exports.FilterMenu = FilterMenu;
