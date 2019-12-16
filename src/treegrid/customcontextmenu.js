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
var ej2_base_1 = require("@syncfusion/ej2-base");
var CustomContextMenu = /** @class */ (function (_super) {
    __extends(CustomContextMenu, _super);
    function CustomContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.contextMenuItems = [
            { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
            { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
            { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
            { text: 'Expand All', target: '.e-headercontent', id: 'expandall' }
        ];
        return _this;
    }
    CustomContextMenu.prototype.contextMenuOpen = function (args) {
        var elem = args.event.target;
        var row = elem.closest('.e-row');
        var uid = row && row.getAttribute('data-uid');
        var items = document.querySelectorAll('.e-menu-item');
        for (var i = 0; i < items.length; i++) {
            items.item(i).setAttribute('style', 'display: none;');
        }
        if (elem.closest('.e-row')) {
            if (ej2_base_1.isNullOrUndefined(uid) || ej2_base_1.isNullOrUndefined(ej2_base_1.getValue('hasChildRecords', this.treegridObj.grid.getRowObjectFromUID(uid).data))) {
                args.cancel = true;
            }
            else {
                var flag = ej2_base_1.getValue('expanded', this.treegridObj.grid.getRowObjectFromUID(uid).data);
                var val = flag ? 'none' : 'block';
                document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
                val = !flag ? 'none' : 'block';
                document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
            }
        }
        else {
            var len = this.treegridObj.element.querySelectorAll('.e-treegridexpand').length;
            if (len !== 0) {
                document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
            }
            else {
                document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
            }
        }
    };
    CustomContextMenu.prototype.contextMenuClick = function (args) {
        if (args.item.id === 'collapserow') {
            this.treegridObj.collapseRow(this.treegridObj.getSelectedRows()[0], this.treegridObj.getSelectedRecords()[0]);
        }
        else if (args.item.id === 'expandrow') {
            this.treegridObj.expandRow(this.treegridObj.getSelectedRows()[0], this.treegridObj.getSelectedRecords()[0]);
        }
        else if (args.item.id === 'collapseall') {
            this.treegridObj.collapseAll();
        }
        else if (args.item.id === 'expandall') {
            this.treegridObj.expandAll();
        }
    };
    CustomContextMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '400', contextMenuItems: this.contextMenuItems, contextMenuOpen: this.contextMenuOpen.bind(this), contextMenuClick: this.contextMenuClick.bind(this), ref: function (treegrid) { return _this.treegridObj = treegrid; } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '210' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '100', textAlign: 'Right', format: 'yMd', type: 'date' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', type: 'date', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.ContextMenu, ej2_react_treegrid_1.Sort] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of context menu in TreeGrid component. Right click anywhere on the Grid to view context menu.")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of custom context menu in TreeGrid component. Right click anywhere on a parent row in the TreeGrid to view custom context menu.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "TreeGrid has an option to show the custom context menu when right click on it. To configure the custom items in context menu, you should define custom item in  ",
                    React.createElement("code", null, "contextMenuItems"),
                    ". In this demo, Custom Context Menu feature has enabled by defining the custom context menu ",
                    React.createElement("code", null, "Expand the Row"),
                    " and",
                    React.createElement("code", null, "Collapse the Row"),
                    " for the parent nodes in ",
                    React.createElement("code", null, "contextMenuItems"),
                    "  property."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use context menu feature, we need to inject ",
                    React.createElement("code", null, "ContextMenu"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return CustomContextMenu;
}(sample_base_1.SampleBase));
exports.CustomContextMenu = CustomContextMenu;
