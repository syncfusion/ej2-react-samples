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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./hamburger-mode.css");
var dataSource = require("./menu-data.json");
// custom code start
var ej2_base_1 = require("@syncfusion/ej2-base");
var HamburgerMenu = /** @class */ (function (_super) {
    __extends(HamburgerMenu, _super);
    function HamburgerMenu() {
        var _this = _super.call(this) || this;
        _this.data = dataSource;
        _this.state = {
            showItemOnClick: true,
            hamburgerMode: true
        };
        return _this;
    }
    // custom code start
    HamburgerMenu.prototype.menuCreated = function () {
        if (ej2_base_1.Browser.isDevice) {
            ej2_base_1.select('.property-section').remove();
            ej2_base_1.select('#layoutcontainer').removeAttribute('class');
            ej2_base_1.select('#layoutcontainer').removeAttribute('id');
            ej2_base_1.select('#menu').style.height = '363px';
        }
    };
    // custom code end
    HamburgerMenu.prototype.modeChange = function (args) {
        var container = document.querySelector('#layoutcontainer');
        switch (args.value) {
            case 'Mobile':
            case 'Tablet':
                this.menuObj.close();
                container.classList.add('deviceLayout');
                container.classList[args.value === 'Mobile' ? 'remove' : 'add']('tabletview');
                this.menuObj.element.parentElement.classList[args.value === 'Mobile' ? 'remove' : 'add']('e-menu-icon-right');
                this.setState({ showItemOnClick: true, hamburgerMode: true });
                break;
            case 'Desktop':
                container.classList.remove('deviceLayout', 'tabletview');
                this.setState({ showItemOnClick: false, hamburgerMode: false });
                break;
        }
    };
    HamburgerMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "menu-section control-section" },
                React.createElement("div", { className: "col-lg-8 control-section" },
                    React.createElement("div", { id: "hamburgerMenu" },
                        React.createElement("div", { id: 'layoutcontainer', className: "deviceLayout" },
                            React.createElement("div", { className: "speaker" },
                                React.createElement("div", { className: "camera" })),
                            React.createElement("div", { className: "layout-menu" },
                                React.createElement("div", { id: "container" },
                                    React.createElement(ej2_react_navigations_1.MenuComponent, { id: "menu", items: this.data.hamburgerData, showItemOnClick: this.state.showItemOnClick, hamburgerMode: this.state.hamburgerMode, ref: function (scope) { _this.menuObj = scope; }, created: this.menuCreated.bind(this) }))),
                            React.createElement("div", { className: "outerButton" }, " ")))),
                React.createElement("div", { className: "col-lg-4 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                        React.createElement("div", null, "View Mode")),
                                    React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                        React.createElement("div", { style: { maxWidth: '200px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { value: 'Mobile', dataSource: this.data.viewModeData, popupHeight: '200px', change: this.modeChange.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the hamburger mode in the ",
                    React.createElement("code", null, "menu"),
                    " component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Enabling the ",
                    React.createElement("code", null, "hamburgerMode"),
                    " property makes the ",
                    React.createElement("code", null, "menu"),
                    " component in adaptive view. By default, its shows header with hamburger icon in ",
                    React.createElement("code", null, "Horizontal"),
                    " orientation."),
                React.createElement("p", null,
                    "The menu shows on clicking hamburger icon. You can use the ",
                    React.createElement("code", null, "open"),
                    " and ",
                    React.createElement("code", null, "close"),
                    " methods to show / hide the menu programmatically."),
                React.createElement("p", null,
                    "More information about Menu can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/getting-started" }, "documentation"),
                    " section."))));
    };
    return HamburgerMenu;
}(sample_base_1.SampleBase));
exports.HamburgerMenu = HamburgerMenu;
