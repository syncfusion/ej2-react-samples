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
var dataSource = require("./dataSource/default-data.json");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.defaultData, id: 'id', text: 'name', child: 'subChild' };
        return _this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'tree-control_wrapper' },
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: this.fields }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the TreeView. Click on node to select it, and click on icon or double click on node to expand/collapse it. The child nodes will be loaded on expand the parent node.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "TreeView"),
                    " component is used to display the data in a hierarchical structure with the configuration options to control the way of data is presented and manipulated. It will pull the data from a data source, such as an array of JSON objects, OData web services, or DataManager binding data fields to the ",
                    React.createElement("code", null, "fields"),
                    " property."),
                React.createElement("p", null, "In this demo, the TreeView is populated with its minimum default settings."),
                React.createElement("p", null,
                    "More information on the TreeView instantiation can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/getting-started/", target: "_blank" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
