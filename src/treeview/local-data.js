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
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./local-data.css");
var dataSource = require("./dataSource/local-data.json");
var SAMPLE_CSS = "\n.control-section {\n    overflow: auto;\n}";
var LocalData = (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        // Hierarchical data source for TreeView component
        _this.fields = { dataSource: _this.data.hierarchicalData, id: 'code', text: 'name', child: 'countries' };
        // Self-referential list data source for TreeView component
        _this.listfields = { dataSource: _this.data.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
        return _this;
    }
    LocalData.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-6 nested-data' },
                    React.createElement("div", { className: 'content' },
                        React.createElement("h4", null, "Hierarchical Data"),
                        React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'tree', fields: this.fields }))),
                React.createElement("div", { className: 'col-lg-6 list-data' },
                    React.createElement("div", { className: 'content' },
                        React.createElement("h4", null, "List Data"),
                        React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'listtree', fields: this.listfields })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the binding of local data to the TreeView. Click on node to select it, and click on icon or double click on node to expand/collapse it.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The TreeView component loads the data through the ",
                    React.createElement("code", null, "dataSource"),
                    " property, where the data can be either local data or remote data. In case of local data, the data structure can be hierarchical data or list data (with self-referential format i.e., mapped with the ",
                    React.createElement("b", null, "id"),
                    " and ",
                    React.createElement("b", null, "parentID"),
                    " fields)."),
                React.createElement("p", null,
                    "In this demo, the first TreeView is bound with the hierarchical data that contains array of nested objects. And the second TreeView is bound with the list type data where the parent-child relation is referred by the ",
                    React.createElement("b", null, "id"),
                    " and ",
                    React.createElement("b", null, "parentID"),
                    " mapping fields."),
                React.createElement("p", null,
                    "For more information, you can refer to the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/data-binding/", target: "_blank" }, "Data Binding"),
                    " section from the documentation."))));
    };
    return LocalData;
}(sample_base_1.SampleBase));
exports.LocalData = LocalData;
