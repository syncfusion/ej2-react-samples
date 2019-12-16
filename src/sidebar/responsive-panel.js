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
require("./responsive-panel.css");
var ResponsivePanel = /** @class */ (function (_super) {
    __extends(ResponsivePanel, _super);
    function ResponsivePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [
            {
                nodeId: '01', nodeText: 'Installation', iconCss: 'icon-microchip icon',
            },
            {
                nodeId: '02', nodeText: 'Deployment', iconCss: 'icon-thumbs-up-alt icon',
            },
            {
                nodeId: '03', nodeText: 'Quick Start', iconCss: 'icon-docs icon',
            },
            {
                nodeId: '04', nodeText: 'Components', iconCss: 'icon-th icon',
                nodeChild: [
                    { nodeId: '04-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '04-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '04-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '04-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '04-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '04-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
                ]
            },
            {
                nodeId: '05', nodeText: 'API Reference', iconCss: 'icon-code icon',
                nodeChild: [
                    { nodeId: '05-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '05-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '05-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '05-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '05-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                    { nodeId: '05-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
                ]
            },
            {
                nodeId: '06', nodeText: 'Browser Compatibility', iconCss: 'icon-chrome icon'
            },
            {
                nodeId: '07', nodeText: 'Upgrade Packages', iconCss: 'icon-up-hand icon'
            },
            {
                nodeId: '08', nodeText: 'Release Notes', iconCss: 'icon-bookmark-empty icon'
            },
            {
                nodeId: '09', nodeText: 'FAQ', iconCss: 'icon-help-circled icon'
            },
            {
                nodeId: '10', nodeText: 'License', iconCss: 'icon-doc-text icon'
            }
        ];
        _this.width = '290px';
        _this.target = '.main-content';
        _this.mediaQuery = '(min-width: 600px)';
        _this.fields = { dataSource: _this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild' };
        return _this;
    }
    ResponsivePanel.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" }, "Click/Touch the button to view the sample"),
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" },
                React.createElement("a", { className: "e-btn", id: "newTab", target: "_blank", onClick: this.newTabClick.bind(this) }, "Open in new Tab")),
            React.createElement("div", { id: "wrapper" },
                React.createElement("title", null, "Essential JS 2 for React - Sidebar > Sidebar with ListView "),
                React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12" },
                    React.createElement("div", { className: 'main-header', id: 'header-section' },
                        React.createElement("ul", { className: 'header-list' },
                            React.createElement("li", { className: 'float-left header-style icon-menu', id: 'hamburger', onClick: this.toggleClick.bind(this), ref: "sidbarToggle" }),
                            React.createElement("li", { className: 'float-left header-style nav-pane' },
                                React.createElement("b", null, "Navigation Pane")),
                            React.createElement("li", { className: 'header-style float-right support border-left' },
                                React.createElement("b", null, "Support")))),
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sidebar-treeview", ref: function (Sidebar) { return _this.sidebarobj = Sidebar; }, width: this.width, target: this.target, mediaQuery: this.mediaQuery },
                        React.createElement("div", { className: 'main-menu' },
                            React.createElement("div", { className: 'table-content' },
                                React.createElement("input", { type: 'text', placeholder: 'Search...', className: 'search-icon' }),
                                React.createElement("p", { className: 'main-menu-header' }, "TABLE OF CONTENTS")),
                            React.createElement("div", null,
                                React.createElement(ej2_react_navigations_2.TreeViewComponent, { id: 'main-treeview', fields: this.fields, expandOn: 'Click' })))),
                    React.createElement("div", { className: "main-content", id: "main-text" },
                        React.createElement("div", { className: 'sidebar-content' },
                            React.createElement("h2", { className: 'sidebar-heading' }, " Responsive Sidebar With Treeview"),
                            React.createElement("p", { className: 'paragraph-content' }, " This is a graphical aid for visualising and categorising the site, in the style of an expandable and collapsable treeview component. It auto-expands to display the node(s), if any, corresponding to the currently viewed title, highlighting that node(s) and its ancestors. Load-on-demand when expanding nodes is available where supported (most graphical browsers), falling back to a full-page reload. MediaWiki-supported caching, aside from squid, has been considered so that unnecessary re-downloads of content are avoided where possible. The complete expanded/collapsed state of the treeview persists across page views in most situations."),
                            React.createElement("p", { className: 'paragraph-content' }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                            React.createElement("div", { className: 'line' }),
                            React.createElement("h2", { className: 'sidebar-heading' }, "Lorem Ipsum Dolor"),
                            React.createElement("p", { className: 'paragraph-content' }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
                            React.createElement("div", { className: 'line' }),
                            React.createElement("h2", { className: 'sidebar-heading' }, " Lorem Ipsum Dolor"),
                            React.createElement("p", { className: 'paragraph-content' }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                            React.createElement("div", { className: 'line' }),
                            React.createElement("h2", { className: 'sidebar-heading' }, " Lorem Ipsum Dolor"),
                            React.createElement("p", { className: 'paragraph-content' }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                            React.createElement("div", { className: 'line' }),
                            React.createElement("h2", { className: 'sidebar-heading' }, " Lorem Ipsum Dolor"),
                            React.createElement("p", { className: 'paragraph-content' }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                            React.createElement("div", { className: 'line' }),
                            React.createElement("h2", { className: 'sidebar-heading' }, " Lorem Ipsum Dolor"),
                            React.createElement("p", { className: 'paragraph-content' }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " Click/Touch the button to view the Sidebar sample in new tab.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample demonstrates how to use the TreeView component inside the Sidebar for navigation purposes. The Sidebar expands when the hamburger icon at the top-left corner of the header section is clicked, and TreeView expands and collapses when the TreeView expand/collapse icon is clicked."))));
    };
    //open newTab
    ResponsivePanel.prototype.newTabClick = function () {
        var URL = location.href.replace(location.search, '');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/responsive-panel/index.html');
    };
    //toggle the sidebar
    ResponsivePanel.prototype.toggleClick = function () {
        this.sidebarobj.toggle();
    };
    return ResponsivePanel;
}(sample_base_1.SampleBase));
exports.ResponsivePanel = ResponsivePanel;
