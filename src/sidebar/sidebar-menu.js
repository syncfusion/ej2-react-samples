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
var ej2_react_navigations_2 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./sidebar-menu.css");
var SidebarWithMenu = /** @class */ (function (_super) {
    __extends(SidebarWithMenu, _super);
    function SidebarWithMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mediaQuery = '(min-width: 600px)';
        _this.menuItems = [
            {
                text: 'Overview',
                iconCss: 'icon-globe icon',
                items: [
                    { text: 'All Data' },
                    { text: 'Category2' },
                    { text: 'Category3' }
                ]
            },
            {
                text: 'Notification',
                iconCss: 'icon-bell-alt icon',
                items: [
                    { text: 'Message' },
                    { text: 'Facebook' },
                    { text: 'Twitter' }
                ]
            },
            {
                text: 'Comments',
                iconCss: 'icon-comment-inv-alt2 icon',
                items: [
                    { text: 'Category1' },
                    { text: 'Category2' },
                    { text: 'Category3' }
                ]
            },
            {
                text: 'Bookmarks',
                iconCss: 'icon-bookmark icon',
                items: [
                    { text: 'All Comments' },
                    { text: 'Add Comments' },
                    { text: 'Delete Comments' }
                ]
            },
            {
                text: 'Images',
                iconCss: 'icon-picture icon',
                items: [
                    { text: 'Add Name' },
                    { text: 'Add Mobile Number' },
                    { text: 'Add Imaage' },
                ]
            },
            {
                text: 'Users ',
                iconCss: 'icon-user icon',
                items: [
                    { text: 'Mobile1' },
                    { text: 'Mobile2' },
                    { text: 'Telephone' }
                ]
            },
            {
                text: 'Settings',
                iconCss: 'icon-eye icon',
                items: [
                    { text: 'Change Profile' },
                    { text: 'Add Name' },
                    { text: 'Add Details' }
                ]
            },
            {
                text: 'Info',
                iconCss: 'icon-tag icon',
                items: [
                    { text: 'Facebook' },
                    { text: 'Mobile' },
                ]
            }
        ];
        _this.AccountMenuItem = [
            {
                text: 'Account',
                items: [
                    { text: 'Profile' },
                    { text: 'Sign out' },
                ]
            }
        ];
        _this.enableDock = true;
        _this.dockSize = '52px';
        _this.width = '220px';
        _this.target = '.main-content';
        return _this;
    }
    SidebarWithMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" }, "Click/Touch the button to view the sample"),
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" },
                React.createElement("a", { className: "e-btn", id: "newTab", target: "_blank", onClick: this.newTabClick.bind(this) }, "Open in new Tab")),
            React.createElement("div", { id: "wrapper" },
                React.createElement("title", null, "Essential JS 2 for React - Sidebar > Sidebar with ListView "),
                React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12" },
                    React.createElement("div", { className: "header-section dock-menu", id: "header" },
                        React.createElement("ul", { className: "header-list" },
                            React.createElement("li", { id: "hamburger", className: "icon-menu icon list", onClick: this.openClick.bind(this) }),
                            React.createElement("input", { type: "text", placeholder: "Search...", className: "search-icon list" }),
                            React.createElement("li", { className: "right-header list" },
                                React.createElement("div", { className: "horizontal-menu" },
                                    React.createElement(ej2_react_navigations_2.MenuComponent, { items: this.AccountMenuItem, cssClass: 'dock-menu' }))),
                            React.createElement("li", { className: "right-header list support" }, "Support"),
                            React.createElement("li", { className: "right-header list tour" }, "Tour"))),
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sidebar-menu", ref: function (Sidebar) { return _this.sidebarobj = Sidebar; }, enableDock: this.enableDock, mediaQuery: this.mediaQuery, dockSize: this.dockSize, width: this.width, target: this.target },
                        React.createElement("div", { className: "main-menu" },
                            React.createElement("p", { className: "main-menu-header" }, "MAIN"),
                            React.createElement(ej2_react_navigations_2.MenuComponent, { items: this.menuItems, orientation: 'Vertical', cssClass: 'dock-menu' })),
                        React.createElement("div", { className: "action" },
                            React.createElement("p", { className: "main-menu-header" }, "ACTION"),
                            React.createElement("button", { className: "e-btn action-btn", id: "action-button" }, "+ Button"))),
                    React.createElement("div", { className: "main-content", id: "maintext" },
                        React.createElement("div", { className: "sidebar-menu-content" },
                            React.createElement("div", null, " Responsive Sidebar with Menu"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " Click/Touch the button to view the Sidebar sample in new tab.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample demonstrates how to use the Menu component inside the Sidebar for navigation purposes. Initially, the Sidebar renders in the dock state with icons, and expands when the hamburger icon at the top-left corner of the header section is clicked."))));
    };
    //open newTab
    SidebarWithMenu.prototype.newTabClick = function () {
        var URL = location.href.replace(location.search, '');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/sidebar-menu/index.html');
    };
    //open the sidebar
    SidebarWithMenu.prototype.openClick = function () {
        this.sidebarobj.toggle();
    };
    return SidebarWithMenu;
}(sample_base_1.SampleBase));
exports.SidebarWithMenu = SidebarWithMenu;
