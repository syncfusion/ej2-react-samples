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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataTypes = [
            { Type: 'Over', value: 'Over' },
            { Type: 'Push', value: 'Push' },
            { Type: 'Slide', value: 'Slide' },
            { Type: 'Auto', value: 'Auto' }
        ];
        _this.fields = { text: 'Type', value: 'value' };
        _this.showBackdrop = false;
        _this.closeOnDocumentClick = false;
        _this.waterMark = 'Select a Type';
        _this.height = '220px';
        _this.index = 3;
        return _this;
    }
    API.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" }, "Click/Touch the button to view the sample"),
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" },
                React.createElement("a", { className: "e-btn", id: "newTab", onClick: this.newTabClick.bind(this), target: "_blank" }, "Open in new tab")),
            React.createElement("div", { id: "wrapper" },
                React.createElement("title", null, "Essential JS 2 for React - Sidebar > API"),
                React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12", id: "sidebar-section" },
                    React.createElement("span", { id: "hamburger", className: "e-icons menu", onClick: this.openClick.bind(this) }),
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "default-sidebar", ref: function (Sidebar) { return _this.sidebarInstance = Sidebar; } },
                        React.createElement("div", { className: "title-header" },
                            React.createElement("div", { style: { display: 'inline-block' } }, " Sidebar "),
                            React.createElement("span", { id: "close", className: "e-icons", onClick: this.closeClick.bind(this) })),
                        React.createElement("div", { className: "sub-title" }, "Place your primary content here.")),
                    React.createElement("div", { className: "list-group" },
                        React.createElement("div", { className: "list-group-item" },
                            React.createElement("h2", { className: "title" }, "Overview"),
                            React.createElement("br", null),
                            React.createElement("p", null, "The Sidebar component is a collapsible side content placed along with the main content either in left or right side of the page."),
                            React.createElement("p", null),
                            React.createElement("br", null),
                            React.createElement("h3", { className: "title" }, "Options"),
                            React.createElement("br", null),
                            React.createElement("div", { className: "inline-element responsive" },
                                React.createElement("p", { className: "inline-element", style: { width: '70%' } },
                                    React.createElement("b", null, "Toggle"),
                                    " - Toggles the sidebar to be open or closed state."),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "toggleSidebar", className: "inline-element right", cssClass: 'e-info', isToggle: true, onClick: this.toggleSidebar.bind(this) }, "Toggle"),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: "inline-element", style: { width: '70%' } },
                                    React.createElement("b", null, "Position"),
                                    " - Allows to place the sidebar in right or left side of the page."),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "togglePosition", className: "inline-element right", cssClass: 'e-info', isToggle: true, ref: function (scope) { _this.sidebarTypesBtn = scope; }, onClick: this.onTypeChange.bind(this) }, "Right"),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: "inline-element", style: { width: '70%' } },
                                    " ",
                                    React.createElement("b", null, "Types "),
                                    " - Specifies the act of expanding or collapsing the sidebar with main content."),
                                React.createElement("div", { className: "inline-element  right", style: { width: '75px' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "types", className: "e-textbox right", dataSource: this.dataTypes, fields: this.fields, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, popupHeight: this.height, index: this.index, cssClass: 'right', change: this.onChange.bind(this) })),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: " inline-element", style: { width: '70%' } },
                                    React.createElement("b", null, "Closing on document click"),
                                    " - Allows to collapse / close the sidebar on document click."),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "documentclick", className: "inline-element right", cssClass: 'e-info', isToggle: true, ref: function (scope) { _this.documentClickBtn = scope; }, onClick: this.documentclick.bind(this) }, "True"),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: " inline-element", style: { width: '70%' } },
                                    React.createElement("b", null, "Backdrop"),
                                    " - Sets the backdrop over the main content area on open / expanded state."),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "backdrop", className: "inline-element right", cssClass: 'e-info', isToggle: true, ref: function (scope) { _this.backdropBtn = scope; }, onClick: this.backdrop.bind(this) }, "True")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Sidebar component with its features. Click/Touch the button to view the Sidebar sample in a new tab.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample allows to configure the ",
                    React.createElement("code", null, "type"),
                    ", ",
                    React.createElement("code", null, "position"),
                    ", ",
                    React.createElement("code", null, "closeOnDocumentClick"),
                    "and",
                    React.createElement("code", null, "showBackdrop"),
                    " property."))));
    };
    // open new tab
    API.prototype.newTabClick = function () {
        var URL = location.href.replace(location.search, '');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/api/index.html');
    };
    API.prototype.toggleSidebar = function () {
        this.sidebarInstance.toggle();
    };
    //close the siebar
    API.prototype.closeClick = function () {
        this.sidebarInstance.hide();
    };
    //open the sidebar
    API.prototype.openClick = function () {
        this.sidebarInstance.show();
    };
    API.prototype.documentclick = function () {
        var proxy = this;
        if (proxy.documentClickBtn.element.classList.contains('e-active')) {
            proxy.documentClickBtn.content = 'False';
            //enable the closeOnDocumentClick property
            this.sidebarInstance.closeOnDocumentClick = true;
        }
        else {
            proxy.documentClickBtn.content = 'True';
            //disable the closeOnDocumentClick property
            this.sidebarInstance.closeOnDocumentClick = false;
        }
    };
    ;
    API.prototype.onTypeChange = function () {
        var proxy = this;
        if (proxy.sidebarTypesBtn.element.classList.contains('e-active')) {
            proxy.sidebarTypesBtn.content = 'Left';
            this.sidebarInstance.position = 'Right';
            document.getElementById('hamburger').className += " e-rtl";
        }
        else {
            proxy.sidebarTypesBtn.content = 'Right';
            this.sidebarInstance.position = 'Left';
            document.getElementById('hamburger').classList.remove("e-rtl");
        }
    };
    ;
    API.prototype.backdrop = function () {
        var proxy = this;
        if (proxy.backdropBtn.element.classList.contains('e-active')) {
            proxy.backdropBtn.content = 'False';
            //enable the backdrop property
            this.sidebarInstance.showBackdrop = true;
        }
        else {
            proxy.backdropBtn.content = 'True';
            //disable the backdrop property
            this.sidebarInstance.showBackdrop = false;
        }
    };
    ;
    API.prototype.onChange = function () {
        var types = this.listObj.value;
        this.sidebarInstance.type = types;
    };
    return API;
}(sample_base_1.SampleBase));
exports.API = API;
