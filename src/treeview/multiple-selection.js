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
require("./treeview.css");
var dataSource = require("./dataSource/multiSelect-data.json");
var MultiSelect = (function (_super) {
    __extends(MultiSelect, _super);
    function MultiSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.multiSelectData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', selected: 'isSelected' };
        _this.allowMultiSelection = true;
        return _this;
    }
    MultiSelect.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'tree-control_wrapper' },
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: this.fields, allowMultiSelection: this.allowMultiSelection }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the multiple node selection functionalities of the TreeView. To select multiple nodes, press the CTRL key and select the desired nodes; or select any node and by pressing SHIFT key select another node, this selects all the nodes in-between the selected nodes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "TreeView"),
                    " component allows to select multiple nodes by enabling the ",
                    React.createElement("code", null, "allowMultiSelection"),
                    " property."),
                React.createElement("p", null, "In this demo, the TreeView is enabled with multiple selection"),
                React.createElement("p", null,
                    "For more information, refer to the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/multiple-selection/", target: "_blank" }, "Multi Selection"),
                    " section from the documentation."))));
    };
    return MultiSelect;
}(sample_base_1.SampleBase));
exports.MultiSelect = MultiSelect;
