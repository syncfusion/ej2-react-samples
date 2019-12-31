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
require("./sidebar-component.css");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" }, "Click/Touch the button to view the sample"),
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" },
                React.createElement("a", { className: "e-btn", id: "newTab", onClick: this.newTabClick.bind(this), target: "_blank" }, "Open in new Tab")),
            React.createElement("div", { id: "wrapper" },
                React.createElement("title", null, "Essential JS 2  for React- Sidebar > Default functionalities"),
                React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12", id: "sidebar-section" },
                    React.createElement("span", { id: "hamburger", className: "e-icons menu default", onClick: this.openClick.bind(this) }),
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "default-sidebar", ref: function (Sidebar) { return _this.sidebarobj = Sidebar; } },
                        React.createElement("div", { className: "title-header" },
                            React.createElement("div", { style: { display: 'inline-block' } }, " Sidebar "),
                            React.createElement("span", { id: "close", className: "e-icons", onClick: this.closeClick.bind(this) })),
                        React.createElement("div", { className: "sub-title" }, "Place your primary content here.")),
                    React.createElement("div", null,
                        React.createElement("div", { className: "title default" }, "Main content"),
                        React.createElement("div", { className: "sub-title" },
                            " Click the button to open / close the sidebar.",
                            React.createElement("div", { className: "center-align" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.toggleClick.bind(this), id: "toggle", className: "e-btn e-info" }, "Toggle Sidebar")),
                            React.createElement("p", null, "Click the radio button to switch the sidebar position"),
                            React.createElement("div", { className: "column" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "left", label: "Left", name: "state", checked: true, change: this.positionChange.bind(this) })),
                            React.createElement("div", { className: "column" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "right", label: "Right", name: "state", change: this.positionChange.bind(this) })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Click/Touch the button to view the Sidebar sample in new tab.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the basic ",
                    React.createElement("code", null, "Sidebar"),
                    " component. Click the toggle button to expand or collapse the sidebar."))));
    };
    //open new Tab
    Default.prototype.newTabClick = function () {
        var URL = location.href.replace(location.search, '');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/default/index.html');
    };
    // change the Sidebar position
    Default.prototype.positionChange = function (args) {
        this.sidebarobj.position = args.event.target.id == "left" ? "Left" : "Right";
        if (args.event.target.id === "right") {
            document.getElementById('hamburger').className += " e-rtl";
        }
        if (args.event.target.id === "left") {
            document.getElementById('hamburger').classList.remove("e-rtl");
        }
    };
    //open / close the sidebar
    Default.prototype.toggleClick = function () {
        this.sidebarobj.toggle();
    };
    //close the sidebar
    Default.prototype.closeClick = function () {
        this.sidebarobj.hide();
    };
    //open the sidebar
    Default.prototype.openClick = function () {
        this.sidebarobj.show();
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
