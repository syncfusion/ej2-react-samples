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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./sidebar-list.css");
var SidebarWithList = /** @class */ (function (_super) {
    __extends(SidebarWithList, _super);
    function SidebarWithList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataList = [
            { text: 'Home' },
            { text: 'About' },
            { text: 'Careers' },
            { text: 'FAQs' },
            { text: 'Blog' },
            { text: 'Uses' },
            { text: 'Contact' }
        ];
        _this.fields = { tooltip: 'text' };
        return _this;
    }
    SidebarWithList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" }, "Click/Touch the button to view the sample"),
            React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12 center" },
                React.createElement("a", { className: "e-btn", id: "newTab", target: "_blank", onClick: this.newTabClick.bind(this) }, "Open in new Tab")),
            React.createElement("div", { id: "wrapper" },
                React.createElement("title", null, "Essential JS 2 for React - Sidebar > Sidebar with ListView "),
                React.createElement("div", { className: "col-lg-12 col-sm-12 col-md-12" },
                    React.createElement("div", { id: "head" },
                        React.createElement("div", { className: "text" }, "Menu"),
                        React.createElement("span", { id: "hamburger", className: "e-icons menu", onClick: this.openClick.bind(this) }),
                        React.createElement("div", { className: "header" }, "Header Content")),
                    React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sidebar-menu", ref: function (Sidebar) { return _this.sidebarobj = Sidebar; }, type: "Over", width: "250px" },
                        React.createElement("div", { id: "close", className: "e-icons", onClick: this.closeClick.bind(this) }),
                        React.createElement("div", { className: "content-area" },
                            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "menuList", dataSource: this.dataList, fields: this.fields, select: this.onSelect.bind(this) }))),
                    React.createElement("div", null,
                        React.createElement("div", { className: "main content textArea" }, "Application content")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " Click/Touch the button to view the Sidebar sample in new tab.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "I In this sample, the ListView component is placed inside the Sidebar for navigation."))));
    };
    //open newTab
    SidebarWithList.prototype.newTabClick = function () {
        var URL = location.href.replace(location.search, '');
        document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/sidebar-list/index.html');
    };
    //close the sidebar when list item selected
    SidebarWithList.prototype.onSelect = function (args) {
        this.sidebarobj.hide();
        document.querySelector('.textArea').textContent = args.text + ' Page Content';
    };
    //open the sidebar
    SidebarWithList.prototype.openClick = function () {
        this.sidebarobj.show();
    };
    //close the sidebar
    SidebarWithList.prototype.closeClick = function () {
        this.sidebarobj.hide();
    };
    return SidebarWithList;
}(sample_base_1.SampleBase));
exports.SidebarWithList = SidebarWithList;
