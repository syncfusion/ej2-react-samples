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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./dock.css");
var Dock = (function (_super) {
    __extends(Dock, _super);
    function Dock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enableDock = true;
        _this.dockSize = '72px';
        _this.width = '220px';
        return _this;
    }
    Dock.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" }, "Click/Touch the button to view the sample"),
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" },
                React.createElement("a", { className: "e-btn", id: "newTab", target: "_blank", onClick: this.newTabClick.bind(this) }, "Open in new tab")),
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12", id: "sidebar-section" },
                React.createElement("div", { id: "wrapper" },
                    React.createElement("title", null, "Essential JS 2 for React - Sidebar > Dock"),
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "dockSidebar", ref: function (Sidebar) { return _this.dockBar = Sidebar; }, enableDock: this.enableDock, dockSize: this.dockSize, width: this.width },
                        React.createElement("div", { className: "dock" },
                            React.createElement("ul", null,
                                React.createElement("li", { className: "sidebar-item", id: "toggle", onClick: this.toggleClick.bind(this) },
                                    React.createElement("span", { className: "e-icons expand" }),
                                    React.createElement("span", { className: "e-text", title: "menu" }, "Menu")),
                                React.createElement("li", { className: "sidebar-item" },
                                    React.createElement("span", { className: "e-icons home" }),
                                    React.createElement("span", { className: "e-text", title: "home" }, "Home")),
                                React.createElement("li", { className: "sidebar-item" },
                                    React.createElement("span", { className: "e-icons profile" }),
                                    React.createElement("span", { className: "e-text", title: "profile" }, "Profile")),
                                React.createElement("li", { className: "sidebar-item" },
                                    React.createElement("span", { className: "e-icons info" }),
                                    React.createElement("span", { className: "e-text", title: "info" }, "Info")),
                                React.createElement("li", { className: "sidebar-item" },
                                    React.createElement("span", { className: "e-icons settings" }),
                                    React.createElement("span", { className: "e-text", title: "settings" }, "Settings"))))),
                    React.createElement("div", { id: "main-content container-fluid col-md-12 " },
                        React.createElement("div", { className: "title" }, "Main content"),
                        React.createElement("div", { className: "sub-title" },
                            React.createElement("div", { className: "center-align" },
                                React.createElement("p", null, "Click the radio button to switch the sidebar position"),
                                React.createElement("div", { className: "column" },
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "left", label: "Left", name: "state", checked: true, change: this.positionChange.bind(this) })),
                                React.createElement("div", { className: "column" },
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "right", label: "Right", name: "state", change: this.positionChange.bind(this) }))))))),
            React.createElement("div", { id: "action-description" }, "Click/Touch the button to view the Sidebar sample in new tab."),
            React.createElement("div", { id: "description" }, "This sample demonstrates the dock state. Here the list item has icon with text representation. On dock state only the icon listed out to interact.")));
    };
    // open new Tab
    Dock.prototype.newTabClick = function () {
        var URL = location.href.replace(location.search, '');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/docking-sidebar/index.html');
    };
    Dock.prototype.positionChange = function (args) {
        //RadioButton change event handler
        this.dockBar.position = args.event.target.id == "left" ? "Left" : "Right";
    };
    // open / close the sidebar
    Dock.prototype.toggleClick = function () {
        this.dockBar.toggle();
    };
    return Dock;
}(sample_base_1.SampleBase));
exports.Dock = Dock;
