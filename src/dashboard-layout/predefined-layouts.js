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
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var panel_data_1 = require("./panel-data");
require("./predefined-layouts.component.css");
var PredefinedLayouts = /** @class */ (function (_super) {
    __extends(PredefinedLayouts, _super);
    function PredefinedLayouts() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headerCount = 1;
        _this.panels = panel_data_1.panelData;
        _this.cellSpacing = [5, 5];
        return _this;
    }
    PredefinedLayouts.prototype.reset = function () {
        var proxy = this;
        var selectedElement = document.getElementsByClassName('e-selected-style');
        this.dashboardObj.removeAll();
        this.initializeTemplate(selectedElement[0], proxy);
    };
    PredefinedLayouts.prototype.initializeTemplate = function (element, proxy) {
        var updatePanels = [];
        var index = parseInt(element.getAttribute('data-id'), 10) - 1;
        var panel = Object.keys(proxy.panels[index]).map(function (panelIndex) {
            return proxy.panels[index][panelIndex];
        });
        for (var i = 0; i < panel.length; i++) {
            var panelModelValue = {
                id: i.toString(),
                row: panel[i].row,
                col: panel[i].col,
                sizeX: panel[i].sizeX,
                sizeY: panel[i].sizeY,
                header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
                content: '<div class="panel-content">Content Area</div>'
            };
            updatePanels.push(panelModelValue);
        }
        proxy.dashboardObj.panels = updatePanels;
    };
    PredefinedLayouts.prototype.rendereComplete = function () {
        var proxy = this;
        document.getElementById('templateContainer').onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName('e-selected-style');
            if (selectedElement.length) {
                selectedElement[0].classList.remove('e-selected-style');
            }
            if (target.className === 'image-pattern-style') {
                proxy.dashboardObj.removeAll();
                proxy.initializeTemplate(args.target, proxy);
            }
            target.classList.add('e-selected-style');
        };
    };
    // custom code start
    PredefinedLayouts.prototype.onCreate = function () {
        if (document.querySelector('.container-fluid.custom')) {
            document.querySelector('.container-fluid').classList.remove('custom');
        }
    };
    //custom code end
    PredefinedLayouts.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "col-lg-8 control-section", id: "predefine_control" },
                React.createElement("div", { className: "content-wrapper", style: { "max-width": "100%" } },
                    React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { created: this.onCreate.bind(this), columns: 6, ref: function (scope) { _this.dashboardObj = scope; }, id: "predefine_dashboard", cellSpacing: this.cellSpacing },
                        React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                            React.createElement(ej2_react_layouts_1.PanelDirective, { row: 0, col: 0, sizeX: 4, sizeY: 3, content: "<div class='panel-content'>Content Area</div>", header: "<div class='e-header-text'>Header Area</div><div class='header-border'></div>" }),
                            React.createElement(ej2_react_layouts_1.PanelDirective, { row: 0, col: 4, sizeX: 2, sizeY: 3, content: "<div class='panel-content'>Content Area</div>", header: "<div class='e-header-text'>Header Area</div><div class='header-border'></div>" }),
                            React.createElement(ej2_react_layouts_1.PanelDirective, { row: 3, col: 0, sizeX: 6, sizeY: 3, content: "<div class='panel-content'>Content Area</div>", header: "<div class='e-header-text'>Header Area</div><div class='header-border'></div>" }))))),
            React.createElement("div", { className: "col-lg-4 property-section dashboard", id: "dash_property" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "row property-panel-content" },
                    React.createElement("div", { className: "row row-header" }, "Choose dashboard layout"),
                    React.createElement("div", { id: "templateContainer" },
                        React.createElement("div", { className: "row", style: { "padding-top": "3px" } },
                            React.createElement("div", { className: "image-pattern-style e-selected-style", id: "template1", "data-id": "1" }),
                            React.createElement("div", { className: "image-pattern-style", id: "template2", "data-id": "2" }),
                            React.createElement("div", { className: "image-pattern-style", id: "template3", "data-id": "3" })),
                        React.createElement("div", { className: "row", style: { "padding-top": "3px" } },
                            React.createElement("div", { className: "image-pattern-style", id: "template4", "data-id": "4" }),
                            React.createElement("div", { className: "image-pattern-style", id: "template5", "data-id": "5" }),
                            React.createElement("div", { className: "image-pattern-style", id: "template6", "data-id": "6" })))),
                React.createElement("div", { className: "col-sm-12 col-xs-12 col-lg-12 col-md-12 reset", style: { "padding": "10px" } },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "reset", onClick: this.reset.bind(this) }, "Reset"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates, the functionality of dynamically updating the panels inside the DashboardLayout by selecting it from the pre-defined values in the properties panel. Go to the properties panel section and select any of the pre-defined layout, based on selection the panles are updated in the dashboard layout dynamically inside the DashboardLayout. Click the ",
                    React.createElement("code", null, "reset"),
                    " button to reset the panels settings of the layout.")),
            React.createElement("div", { id: "description" }, "This sample demonstrates how to update the panels dynamically in the dashboard layout component.")));
    };
    return PredefinedLayouts;
}(sample_base_1.SampleBase));
exports.PredefinedLayouts = PredefinedLayouts;
