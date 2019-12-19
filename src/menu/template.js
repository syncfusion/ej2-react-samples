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
var dataSource = require("./template-data.json");
require("./template.css");
/**
 * Menu Template sample
 */
var Template = (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Template datasource
        _this.menuitems = dataSource.templateData;
        // Menu fields definition
        _this.menuFields = { text: ['category', 'value'], children: ['options'] };
        return _this;
    }
    // Template to render Menu items
    Template.prototype.menuTemplate = function (data) {
        return (data.category ? React.createElement("span", null, data.category) :
            (data.value) ?
                React.createElement("div", { style: { width: '100%', display: 'flex', justifyContent: 'space-between' } },
                    data.url ? React.createElement("img", { className: "e-avatar e-avatar-small", src: "src/menu/images/" + data.url + ".png" }) : '',
                    React.createElement("span", { style: { width: '100%' } }, data.value),
                    data.count ? React.createElement("span", { className: "e-badge e-badge-success" }, data.count) : '') :
                React.createElement("div", { tabIndex: 0, className: "e-card" },
                    React.createElement("div", { className: "e-card-header" },
                        React.createElement("div", { className: "e-card-header-caption" },
                            React.createElement("div", { className: "e-card-header-title" }, "About Us"))),
                    React.createElement("div", { className: "e-card-content" }, data.about.value),
                    React.createElement("div", { className: "e-card-actions" },
                        React.createElement("button", { className: "e-btn e-outline", style: { pointerEvents: 'auto' } }, "Read More"))));
    };
    Template.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'menu-section' },
                    React.createElement("div", { className: 'template-menu-control' },
                        React.createElement(ej2_react_navigations_1.MenuComponent, { items: this.menuitems, fields: this.menuFields, template: this.menuTemplate, cssClass: "e-template-menu" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the template functionalities of the ",
                    React.createElement("code", null, "menu"),
                    " component. Interact with ",
                    React.createElement("code", null, "menu"),
                    " using hover / click to display sub menu pop-up items with its customized templates.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The menu component has an option to customize menu items using the ",
                    React.createElement("code", null, "template"),
                    " property, so that the menu items can be rendered according to the requirement."),
                React.createElement("p", null,
                    "In this demo, the below customization are demonstrated.",
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "Header menu items and the 'Products' sub menu items represents the customization of default rendering of li elements i.e. ",
                            React.createElement("b", null, "data.category"),
                            " in template."),
                        React.createElement("li", null,
                            "'Services' sub menu item represent the customization of li element with ",
                            React.createElement("code", null, "badge"),
                            " component."),
                        React.createElement("li", null,
                            "'About Us' sub menu item showed with ",
                            React.createElement("code", null, "card"),
                            " component in a single li."))),
                React.createElement("p", null,
                    "For more information, refer to the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/data-source-binding-and-custom-menu-items/#custom-menu-items" }, "templates"),
                    " section in the documentation."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
