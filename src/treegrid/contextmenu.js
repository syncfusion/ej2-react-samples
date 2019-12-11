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
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TreeContextMenu = /** @class */ (function (_super) {
    __extends(TreeContextMenu, _super);
    function TreeContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
        _this.contextMenuItems = ['AutoFit', 'AutoFitAll',
            'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save',
            'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'];
        _this.validationRule = { required: true };
        _this.validationRule1 = { date: true };
        _this.validationRule2 = { required: true, number: true };
        _this.editparams2 = { params: { format: 'n' } };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.pageSettings = { pageSize: 11 };
        return _this;
    }
    TreeContextMenu.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', editSettings: this.editSettings, pageSettings: this.pageSettings, contextMenuItems: this.contextMenuItems, allowSorting: 'true', allowExcelExport: 'true', allowPdfExport: 'true' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right', validationRules: this.validationRule, isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '190', validationRules: this.validationRule }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '130', textAlign: 'Right', editType: 'datepickeredit', type: 'date', format: 'yMd', validationRules: this.validationRule1 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '130', textAlign: 'Right', editType: 'datepickeredit', type: 'date', format: 'yMd', validationRules: this.validationRule1 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', editType: 'numericedit', textAlign: 'Right', validationRules: this.validationRule2, edit: this.editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right', editType: 'dropdownedit', edit: this.editparams }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.ContextMenu, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Resize, ej2_react_treegrid_1.ExcelExport, ej2_react_treegrid_1.PdfExport] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of context menu in TreeGrid component. Right click anywhere on the Grid to view context menu.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "TreeGrid has an option to show the context menu when right click on it. To configure the items in context menu, you should define either default or custom item in ",
                    React.createElement("code", null, "contextMenuItems"),
                    ".Each item will be shown based on its target. The default items are"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - Edit the current record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - Delete the current record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Save"),
                        " - Save the edited record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cancel"),
                        " - Cancel the edited state."),
                    React.createElement("li", null,
                        React.createElement("code", null, "PdfExport"),
                        " - Export the grid as Pdf format."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ExcelExport"),
                        " - Export the grid as Excel format."),
                    React.createElement("li", null,
                        React.createElement("code", null, "CsvExport"),
                        " - Export the grid as CSV format."),
                    React.createElement("li", null,
                        React.createElement("code", null, "SortAscending"),
                        " - Sort the current column in ascending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "SortDescending"),
                        " - Sort the current column in descending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "FirstPage"),
                        " - Go to the first page."),
                    React.createElement("li", null,
                        React.createElement("code", null, "PrevPage"),
                        " - Go to the previous page."),
                    React.createElement("li", null,
                        React.createElement("code", null, "LastPage"),
                        " - Go to the last page."),
                    React.createElement("li", null,
                        React.createElement("code", null, "NextPage"),
                        " - Go to the next page."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Add Row"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("code", null, "Above"),
                                " - Add a new row above the selected row"),
                            React.createElement("li", null,
                                React.createElement("code", null, "Below"),
                                " - Add a new row below the selected row")))),
                React.createElement("p", null,
                    "In this demo, Context Menu feature has enabled by defining the ",
                    React.createElement("code", null, "contextMenuItems"),
                    " property with all default items."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use context menu feature, we need to inject ",
                    React.createElement("code", null, "ContextMenu"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return TreeContextMenu;
}(sample_base_1.SampleBase));
exports.TreeContextMenu = TreeContextMenu;
