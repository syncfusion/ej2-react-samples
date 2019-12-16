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
require("./icons.css");
var dataSource = require("./dataSource/icons-data.json");
var Icons = /** @class */ (function (_super) {
    __extends(Icons, _super);
    function Icons() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.iconData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };
        return _this;
    }
    Icons.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'control_wrapper' },
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: "treeview", fields: this.fields, sortOrder: 'Ascending' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the node can be configured by icons/images in TreeView. Click on icon or double click on node to expand/collapse it, and show the icons/images that configured with nodes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "TreeView"),
                    " component has the built-in option to customize each node's appearance with the icons and images by mapping the ",
                    React.createElement("code", null, "iconCss"),
                    " and ",
                    React.createElement("code", null, "imageUrl"),
                    " fields."),
                React.createElement("p", null, "In this demo, the TreeView is showcased like a file system with custom icons and images."))));
    };
    return Icons;
}(sample_base_1.SampleBase));
exports.Icons = Icons;
