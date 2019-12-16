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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./properties.component.css");
var Properties = /** @class */ (function (_super) {
    __extends(Properties, _super);
    function Properties() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 5;
        _this.cellSpacing = [5, 5];
        return _this;
    }
    Properties.prototype.onAdd = function () {
        this.count = this.count + 1;
        var proxy = this;
        var panel = [{
                'id': this.count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
                header: '<div>Panel ' + this.count.toString() + '</div>', content: '<div></div>'
            }];
        proxy.dashboardObj.addPanel(panel[0]);
    };
    Properties.prototype.remove = function () {
        if (this.dashboardObj.panels.length > 0) {
            for (var i = this.dashboardObj.panels.length - 1; i < this.dashboardObj.panels.length; i++) {
                this.dashboardObj.removePanel(this.dashboardObj.panels[this.dashboardObj.panels.length - 1 - i].id);
            }
        }
    };
    Properties.prototype.onCellChange = function (args) {
        this.dashboardObj.cellSpacing = [parseInt(args.value, 10), parseInt(args.value, 10)];
    };
    Properties.prototype.onChange = function (args) {
        var proxy = this;
        if (args.event.currentTarget.id === 'floating') {
            proxy.dashboardObj.allowFloating = args.checked;
        }
        if (args.event.currentTarget.id === 'resizing') {
            proxy.dashboardObj.allowResizing = args.checked;
        }
    };
    // custom code start
    Properties.prototype.onCreate = function () {
        if (document.querySelector('.container-fluid.custom')) {
            document.querySelector('.container-fluid').classList.remove('custom');
        }
    };
    // custom code end
    Properties.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "col-lg-8 control-section", id: "control_dash" },
                React.createElement("div", { className: "content-wrapper", style: { "max-width": "100%" } },
                    React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { created: this.onCreate.bind(this), id: "api_dashboard", columns: 6, cellSpacing: this.cellSpacing, ref: function (scope) { _this.dashboardObj = scope; }, allowResizing: true },
                        React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                            React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 1</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 0, col: 0 }),
                            React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 2</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 0, col: 2 }),
                            React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 3</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 0, col: 4 }),
                            React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 4</div>", content: "<div></div>", sizeX: 4, sizeY: 2, row: 2, col: 0 }),
                            React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 5</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 2, col: 4 }))))),
            React.createElement("div", { className: "col-lg-4 property-section dashboard", id: "api_property" },
                React.createElement("div", { className: "property-panel-header" }, " Properties "),
                React.createElement("div", { className: "row property-panel-content" },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("div", { className: "form-group row" },
                            React.createElement("label", { className: "col-sm-4 col-form-label form-label" }, "CellSpacing"),
                            React.createElement("span", { className: "col-sm-8" },
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { className: "col-sm-4", type: "text", placeholder: "Ex: 10", value: 10, min: 1, max: 20, floatLabelType: "Never", id: "cellSpacing", change: this.onCellChange.bind(this) }))),
                        React.createElement("div", { className: "form-group row" },
                            React.createElement("label", { className: "col-sm-4 col-form-label form-label" }, "AllowFloating"),
                            React.createElement("span", { className: "col-sm-8" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { className: "col-sm-8", name: "floating", id: "floating", checked: true, change: this.onChange.bind(this) }))),
                        React.createElement("div", { className: "form-group row" },
                            React.createElement("label", { className: "col-sm-4 col-form-label form-label" }, "AllowResizing"),
                            React.createElement("span", { className: "col-sm-8" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { name: "resizing", id: "resizing", checked: true, change: this.onChange.bind(this) }))),
                        React.createElement("div", { className: "form-group row" },
                            React.createElement("div", { className: "col-sm-12" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onAdd.bind(this), cssClass: "e-primary" }, "Add Panel"),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.remove.bind(this), cssClass: "e-danger", style: { "margin-left": "3px" } }, "Remove Panel")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the properties of DashboardLayout component from the property pane. Select any combination of properties from the property pane to customize the DashboardLayout.")),
            React.createElement("div", { id: "description" },
                "This sample allows to configure the ",
                React.createElement("code", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#cellspacing", target: "_blank" }, "cellSpacing")),
                ",",
                React.createElement("code", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowfloating", target: "_blank" }, "allowFloating")),
                " and",
                React.createElement("code", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing", target: "_blank" }, "allowResizing")),
                " properties of the dashboard layout component.")));
    };
    return Properties;
}(sample_base_1.SampleBase));
exports.Properties = Properties;
