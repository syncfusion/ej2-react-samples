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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 30px;\n}\n\n.sb-mobile-prop-pane #all-option-table #desktop-checkbox-row-1,\n.sb-mobile-prop-pane #all-option-table #desktop-checkbox-row-2 {\n    display: none;\n\n}\n\n.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-1,\n.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-2,\n.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-3,\n.sb-mobile-prop-pane #all-option-table #mobile-checkbox-row-4 {\n    display: table-row;\n\n}\n\n#all-option-table #mobile-checkbox-row-1,\n#all-option-table #mobile-checkbox-row-2,\n#all-option-table #mobile-checkbox-row-3,\n#all-option-table #mobile-checkbox-row-4 {\n    display: none;\n\n}\n\n#all-option-table .property-panel-section .property-panel-content table#property tr {\n    height: 50px;\n}\n\n#all-option-sample .e-slider-container.e-horizontal {\n    margin-top: 160px;\n}\n\n#all-option-sample .e-slider-container.e-vertical {\n    margin-left: 40%;\n}\n\n#all-option-sample.content-wrapper {\n    height: 363px;\n    width: 50%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    height: 340px;\n}\n\n.e-bigger .content-wrapper {\n    width: 50%;\n}\n\n.sliderwrap label {\n    padding-bottom: 26px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n    text-align: left;\n    width: 100%;\n}\n\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n";
var APIs = /** @class */ (function (_super) {
    __extends(APIs, _super);
    function APIs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltip = { placement: 'Before', isVisible: true, showOn: 'Focus' };
        _this.ticks = { placement: 'Before', largeStep: 20 };
        _this.tooltipplacement = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' }];
        _this.ticksplacement = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' }, { text: 'Both', value: 'Both' }, { text: 'None', value: 'None' }];
        _this.fields = { value: 'value', text: 'text' };
        return _this;
    }
    APIs.prototype.onValueChange = function (args) {
        this.defaultObj.value = args.value;
    };
    APIs.prototype.onMinChange = function (args) {
        this.defaultObj.min = args.value;
    };
    APIs.prototype.onMaxChange = function (args) {
        this.defaultObj.max = args.value;
    };
    APIs.prototype.onStepChange = function (args) {
        this.defaultObj.step = args.value;
    };
    APIs.prototype.onChange = function (args) {
        this.defaultObj.tooltip.isVisible = args.checked;
    };
    APIs.prototype.onOrientationChange = function (args) {
        args.checked ? this.defaultObj.orientation = 'Vertical' : this.defaultObj.orientation = 'Horizontal';
    };
    APIs.prototype.onReadonlyChange = function (args) {
        this.defaultObj.readonly = args.checked;
    };
    APIs.prototype.onDisableChange = function (args) {
        this.defaultObj.enabled = !args.checked;
    };
    APIs.prototype.onTicksChange = function (args) {
        this.defaultObj.ticks = { placement: args.value };
    };
    APIs.prototype.onTooltipChange = function (args) {
        this.defaultObj.tooltip = { placement: args.value };
    };
    APIs.prototype.onButtonChange = function (args) {
        args.checked ? this.defaultObj.showButtons = true : this.defaultObj.showButtons = false;
    };
    APIs.prototype.refreshTooltip = function (e) {
        if (this.defaultObj) {
            this.defaultObj.refreshTooltip(this.defaultObj.tooltipTarget);
        }
    };
    APIs.prototype.sliderChange = function (args) {
        this.numbericValue.value = args.value;
    };
    APIs.prototype.render = function () {
        var _this = this;
        if (!ej2_base_1.isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.refreshTooltip.bind(this));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, slidercss),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper", id: "all-option-sample" },
                        React.createElement("div", { className: 'sliderwrap' },
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'slider', value: 30, min: 0, max: 100, change: this.sliderChange.bind(this), ticks: this.ticks, tooltip: this.tooltip, type: 'MinRange', ref: function (slider) { _this.defaultObj = slider; } })))),
                React.createElement("div", { id: "all-option-table", className: "col-lg-4 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: "100%" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Value")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 30, format: 'n0', change: this.onValueChange.bind(this), ref: function (value) { _this.numbericValue = value; } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Min")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 0, format: 'n0', change: this.onMinChange.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Max")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 100, format: 'n0', change: this.onMaxChange.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Step")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 1, change: this.onStepChange.bind(this) })))),
                                React.createElement("tr", { id: "desktop-checkbox-row-1" },
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "button", label: "Show Buttons", checked: false, change: this.onButtonChange.bind(this) }))),
                                    React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: "0", paddingTop: "10" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "disabled", label: "Disable", checked: false, change: this.onDisableChange.bind(this) })))),
                                React.createElement("tr", { id: "desktop-checkbox-row-2" },
                                    React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "readOnly", label: "Read Only", checked: false, change: this.onReadonlyChange.bind(this) }))),
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "orientation", label: "Vertical Orientation", checked: false, change: this.onOrientationChange.bind(this) })))),
                                React.createElement("tr", { id: "mobile-checkbox-row-1" },
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Show Buttons")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-button", checked: false, change: this.onButtonChange.bind(this) })))),
                                React.createElement("tr", { id: "mobile-checkbox-row-2" },
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Disabled")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-disabled", checked: false, change: this.onDisableChange.bind(this) })))),
                                React.createElement("tr", { id: "mobile-checkbox-row-3" },
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Vertical Orientation")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-orientation", checked: false, change: this.onOrientationChange.bind(this) })))),
                                React.createElement("tr", { id: "mobile-checkbox-row-4" },
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Readonly")),
                                    React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-readOnly", checked: false, change: this.onReadonlyChange.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the customization of Slider component by using its properties from property pane. Select any combination of properties from property pane to customize Slider component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo, we have rendered default slider with minimal configuration."),
                React.createElement("p", null, "we can further customize this sample with the combination of Slider properties from the property pane. For example,"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Min, Max, Value and Steps can be changed from the property pane."),
                    React.createElement("li", null, "Ticks can be enabled by selecting the Ticks placement from the property pane."),
                    React.createElement("li", null, "Tooltip can be enabled by checking Show Tooltip checkbox from property pane."),
                    React.createElement("li", null, "Vertical orientation can be enabled by checking Vertical orientation from property pane and so on.")))));
    };
    return APIs;
}(sample_base_1.SampleBase));
exports.APIs = APIs;
