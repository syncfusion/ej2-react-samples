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
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./toolbar-integration.css");
var dataSource = require("./menu-data.json");
var ToolbarIntegration = (function (_super) {
    __extends(ToolbarIntegration, _super);
    function ToolbarIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.searchTemplate = '<div class="e-input-group"><input class="e-input" type="text" placeholder="Search" /><span class="e-input-group-icon em-icons e-search"></span></div>';
        return _this;
    }
    ToolbarIntegration.prototype.menuTemplate = function () {
        return (React.createElement(ej2_react_navigations_1.MenuComponent, { id: "menuele", items: this.data.toolbarIntegrationData }));
    };
    ToolbarIntegration.prototype.ddbTemplate = function () {
        return (React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "userDBtn", content: 'Andrew', created: this.onCreated.bind(this), items: this.data.userData }));
    };
    ToolbarIntegration.prototype.onCreated = function () {
        this.tbObj.refreshOverflow();
        ej2_base_1.removeClass([this.tbObj.element.querySelector('.e-shopping-cart')], 'e-icons');
    };
    ToolbarIntegration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "menu-control", className: 'control-section' },
                React.createElement("div", { className: 'toolbar-menu-control' },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar", ref: function (scope) { _this.tbObj = scope; } },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.menuTemplate.bind(this) }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.searchTemplate, align: 'Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.ddbTemplate.bind(this), align: 'Right' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'em-icons e-shopping-cart', align: 'Right' }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the real use case of ",
                    React.createElement("code", null, "menu"),
                    " component in web application.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Menu utilizes the ",
                    React.createElement("code", null, "items"),
                    " property to represent the menu bar in web application. In this demo, the menu component is integrated with toolbar along with customized search input box, dropdownbutton component and added shopping cart item using toolbar default option."),
                React.createElement("p", null,
                    "More information about menu can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/use-case-scenarios/#menu-in-toolbar" }, "documentation"),
                    " section."))));
    };
    return ToolbarIntegration;
}(sample_base_1.SampleBase));
exports.ToolbarIntegration = ToolbarIntegration;
