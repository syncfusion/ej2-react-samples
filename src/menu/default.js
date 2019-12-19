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
require("./default.css");
/**
 * Menu default sample
 */
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Menu items definition
        _this.menuItems = [
            {
                text: 'File',
                iconCss: 'em-icons e-file',
                items: [
                    { text: 'Open', iconCss: 'em-icons e-open' },
                    { text: 'Save', iconCss: 'em-icons e-save' },
                    { separator: true },
                    { text: 'Exit' }
                ]
            },
            {
                text: 'Edit',
                iconCss: 'em-icons e-edit',
                items: [
                    { text: 'Cut', iconCss: 'em-icons e-cut' },
                    { text: 'Copy', iconCss: 'em-icons e-copy' },
                    { text: 'Paste', iconCss: 'em-icons e-paste' }
                ]
            },
            {
                text: 'View',
                items: [
                    {
                        text: 'Toolbars',
                        items: [
                            { text: 'Menu Bar' },
                            { text: 'Bookmarks Toolbar' },
                            { text: 'Customize' },
                        ]
                    },
                    {
                        text: 'Zoom',
                        items: [
                            { text: 'Zoom In' },
                            { text: 'Zoom Out' },
                            { text: 'Reset' },
                        ]
                    },
                    { text: 'Full Screen' }
                ]
            },
            {
                text: 'Tools',
                items: [
                    { text: 'Spelling & Grammar' },
                    { text: 'Customize' },
                    { separator: true },
                    { text: 'Options' }
                ]
            },
            {
                text: 'Help'
            }
        ];
        return _this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'menu-section' },
                    React.createElement("div", { className: 'menu-control' },
                        React.createElement(ej2_react_navigations_1.MenuComponent, { items: this.menuItems })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates default functionalities of the ",
                    React.createElement("code", null, "menu"),
                    " component. Interact with ",
                    React.createElement("code", null, "menu"),
                    " using hover / click action.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The menu component is a graphical user interface that serves as navigation header for your application or site. It provides a list of commands that can be carried out using the ",
                    React.createElement("code", null, "items"),
                    " property."),
                React.createElement("p", null,
                    "In this demo, the menu is rendered with default type of ",
                    React.createElement("b", null, "Horizontal"),
                    " orientation. Using ",
                    React.createElement("code", null, "orientation"),
                    " property, you can change the orientation to ",
                    React.createElement("b", null, "Vertical"),
                    "."),
                React.createElement("p", null, "In mobile, the parent menu becomes scrollable if its size exceeds the viewport size."),
                React.createElement("p", null,
                    "More information about menu can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/getting-started" }, "documentation"),
                    " section."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
