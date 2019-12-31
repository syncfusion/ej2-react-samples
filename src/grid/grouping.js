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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var refresh;
var Grouping = (function (_super) {
    __extends(Grouping, _super);
    function Grouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupOptions = { showGroupedColumn: false, columns: ['Country'] };
        return _this;
    }
    Grouping.prototype.dataBound = function () {
        if (refresh) {
            this.gridInstance.groupColumn('Country');
            refresh = false;
        }
    };
    Grouping.prototype.load = function () {
        refresh = this.refreshing;
    };
    Grouping.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.inventoryData, allowPaging: true, ref: function (grid) { return _this.gridInstance = grid; }, pageSettings: { pageCount: 5 }, allowGrouping: true, groupSettings: this.groupOptions, allowSorting: true, height: "320", dataBound: this.dataBound.bind(this), load: this.load },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Inventor', headerText: 'Inventor Name', width: '180' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'NumberofPatentFamilies', headerText: 'Number of Patent Families', width: '220', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Active', headerText: 'Active', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Mainfieldsofinvention', headerText: 'Main fields of invention', width: '200' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Group, ej2_react_grids_1.Sort] })),
                React.createElement("div", { className: "e-dsalign" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_prolific_inventors", target: '_blank' }, "Wikipedia: List of Prolific inventors"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates grouping feature of the Grid component. In this sample, the Grid data is grouped against Country column. To group any other column simply drag the column header and drop on the group drop area.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid control has options to group the records based on the required column. When grouping is applied, grouped records are organized into a hierarchical structure to facilitate easier expansion and collapse of records. To enable grouping, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowgrouping-boolean" }, "allowGrouping")),
                    " property as true."),
                React.createElement("p", null, "Columns can be grouped by simply dragging the column header and drop on the group drop area."),
                React.createElement("p", null, "In this demo, to group a specify column, drag and drop the column in the group drop area."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use grouping feature, we need to inject",
                    React.createElement("code", null, "Group"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the grouping feature configuration can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#groupsettings-groupsettingsmodel" }, " documentation section"),
                    "."))));
    };
    return Grouping;
}(sample_base_1.SampleBase));
exports.Grouping = Grouping;
