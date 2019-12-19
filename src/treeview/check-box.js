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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./dataSource/checkbox-data.json");
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.checkboxData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
        _this.showCheckBox = true;
        return _this;
    }
    Checkbox.prototype.onChange = function (args) {
        this.treeObj.autoCheck = args.checked;
    };
    Checkbox.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement("div", { className: 'tree-control_wrapper' },
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: this.fields, ref: function (scope) { _this.treeObj = scope; }, showCheckBox: this.showCheckBox }))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "check", checked: true, label: 'Auto Check', change: this.onChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the CheckBox functionalities of the TreeView. Click on any parent node's CheckBox to check/uncheck the node and its child nodes. The parent node's checked state will be determined by its child nodes checked state.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "TreeView"),
                    " component can be rendered with checkbox on the left side of each tree node. This allows the user to check more than one nodes, and this can be enabled by the ",
                    React.createElement("code", null, "showCheckBox"),
                    " property."),
                React.createElement("p", null, "In this demo, the TreeView is populated with checkbox enabled."),
                React.createElement("p", null,
                    "For more information, you can refer to the ",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/treeview/check-box.html", target: "_blank" }, "Checkboxes"),
                    " section from the documentation."))));
    };
    return Checkbox;
}(sample_base_1.SampleBase));
exports.Checkbox = Checkbox;
