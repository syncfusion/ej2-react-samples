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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./data-binding.css");
var dataSource = require("./menu-data.json");
/**
 * Menu data binding sample
 */
var DataBinding = /** @class */ (function (_super) {
    __extends(DataBinding, _super);
    function DataBinding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        return _this;
    }
    DataBinding.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'menu-section' },
                    React.createElement("div", { id: 'dataBinding' },
                        React.createElement(ej2_react_navigations_1.MenuComponent, { items: this.data.dataBinding })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the way of data binding in ",
                    React.createElement("code", null, "menu"),
                    " component with JavaScript object array (local data source). Interact with ",
                    React.createElement("code", null, "menu"),
                    " using hover / click action.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The menu component loads the data through the ",
                    React.createElement("code", null, "items"),
                    " property, where the data can either be structured as hierarchical or self-referential data, i.e. mapped with id and parentId fields."),
                React.createElement("p", null, "In this demo, the component is bound with the list type data where the parent-child relation is referred by id and parentId mapping fields."),
                React.createElement("p", null,
                    "More information about menu can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/data-source-binding-and-custom-menu-items/#data-binding" }, "data binding"),
                    " section."))));
    };
    return DataBinding;
}(sample_base_1.SampleBase));
exports.DataBinding = DataBinding;
