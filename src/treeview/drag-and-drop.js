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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./drag-and-drop.css");
var dataSource = require("./dataSource/drag-data.json");
var Dragdrop = /** @class */ (function (_super) {
    __extends(Dragdrop, _super);
    function Dragdrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.id = 1;
        // Render the first TreeView by mapping its fields property with data source properties
        _this.field = { dataSource: _this.data.dragData1, id: 'id', text: 'name', child: 'child' };
        _this.allowDragAndDrop = true;
        // Render the second TreeView by mapping its fields property with data source properties     
        _this.fields = { dataSource: _this.data.dragData2, id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
        _this.allowDragAndDrops = true;
        return _this;
    }
    Dragdrop.prototype.onDragStop = function (args) {
        var targetEle = ej2_base_1.closest(args.target, '.e-droppable');
        targetEle = targetEle ? targetEle : args.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
            args.cancel = true;
            var newData = [];
            if (args.draggedNode.classList.contains('e-active')) {
                var dragNode = ej2_base_1.closest(args.draggedNode, '.e-treeview');
                var selNodes = dragNode.ej2_instances[0].selectedNodes;
                for (var i = 0, len = selNodes.length; i < len; i++) {
                    var nodeEle = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    var nodeText = nodeEle.textContent;
                    var newNode = { id: 'l' + this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                    this.id++;
                    newData.push(newNode);
                }
            }
            else {
                var text = 'text';
                var nodeText = args.draggedNodeData[text];
                var newNode = { id: 'l' + this.id, text: nodeText, class: 'custom-delete', iconId: 'i' + this.id };
                this.id++;
                newData.push(newNode);
            }
            // Add collection of node to ListView
            this.listObj.addItem(newData, undefined);
        }
    };
    // Add the custom action for delete icon in ListView
    Dragdrop.prototype.onCreate = function () {
        var _this = this;
        document.getElementById('list').addEventListener('mousedown', function (event) {
            if (event.target.classList.contains('custom-delete')) {
                var node = ej2_base_1.closest(event.target, 'li');
                _this.listObj.removeItem(node);
            }
        });
        document.getElementById('overlay').addEventListener('mousedown', function (event) {
            document.getElementById('overlay').style.display = 'none';
        });
    };
    Dragdrop.prototype.actionBegin = function () {
        var listObj = this;
    };
    Dragdrop.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-12 control-section custom-tree" },
                React.createElement("div", { className: "control-wrapper" },
                    React.createElement("div", { className: "col-lg-4 tree1-data" },
                        React.createElement("h4", null, "TreeView-1"),
                        React.createElement("div", { className: "content" },
                            React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'tree1', fields: this.field, nodeDragStop: this.onDragStop.bind(this), created: this.onCreate.bind(this), allowDragAndDrop: this.allowDragAndDrop }))),
                    React.createElement("div", { className: "col-lg-4 tree2-data" },
                        React.createElement("h4", null, "TreeView-2"),
                        React.createElement("div", { className: "content" },
                            React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'tree2', fields: this.fields, nodeDragStop: this.onDragStop.bind(this), allowDragAndDrop: this.allowDragAndDrops }))),
                    React.createElement("div", { className: "col-lg-4 tree3-data" },
                        React.createElement("h4", null, "ListView"),
                        React.createElement("div", { className: "content" },
                            React.createElement("div", { id: "list" },
                                React.createElement(ej2_react_lists_1.ListViewComponent, { id: "list", className: "e-droppable", dataSource: [], ref: function (list) { _this.listObj = list; }, actionComplete: this.actionBegin.bind(this), cssClass: 'custom-list', template: "<div><span>${text}</span><span id=${iconId} class=${class}></span></div>" })))),
                    React.createElement("div", { id: "overlay" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the drag and drop functionality of TreeView. A drag and drop image is present at the top of the sample which hides on clicking the sample. To drag and drop node, select and drag the desired node and drop it on the target node or external container.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "TreeView"),
                    " component allows users to drag any node and drop it on any other node in the same or different tree using ",
                    React.createElement("code", null, "allowDragAndDrop"),
                    " property. Additionally, it supports dropping a tree node to an external container using ",
                    React.createElement("code", null, "nodeDragStop"),
                    " event of the TreeView"),
                React.createElement("p", null,
                    "For more information, you can refer to the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/drag-and-drop/", target: "_blank" }, "Drag and Drop"),
                    " section from the documentation."))));
    };
    return Dragdrop;
}(sample_base_1.SampleBase));
exports.Dragdrop = Dragdrop;
