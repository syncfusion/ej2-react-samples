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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.content-wrapper {\n    width: 80%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    height: 375px;\n    margin-top: 10px;\n    width: 60%;\n    margin: auto;\n}\n\n.e-bigger .content-wrapper {\n    width: 80%;\n}\n\n.sliderwrap .e-lbl {\n    display: block;\n    font-size: 11px;\n    font-weight: 500;\n    margin-top: 15px;\n    margin-left: -10px;\n}\n\n.sliderwrap:last-child .e-lbl {\n    margin-left: -2px;\n}\n\n.slider_table td {\n    text-align: center;\n}\n\n.slider_table {\n    border: 0;\n    width: 100%\n}\n";
var Orientation = /** @class */ (function (_super) {
    __extends(Orientation, _super);
    function Orientation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Checkbox change handlers
    Orientation.prototype.enableDisableTicks = function (args) {
        this.ticks = { placement: args.checked ? 'Before' : 'None', largeStep: 20, smallStep: 5, showSmallTicks: true };
        for (var _i = 0, _a = [this.defaultObj, this.minRangeObj, this.rangeObj]; _i < _a.length; _i++) {
            var slider = _a[_i];
            // Assigning ticks values to each slider
            slider.ticks = this.ticks;
        }
    };
    Orientation.prototype.enableDisableTooltip = function (args) {
        this.tooltip = { isVisible: args.checked, placement: 'Before' };
        for (var _i = 0, _a = [this.defaultObj, this.minRangeObj, this.rangeObj]; _i < _a.length; _i++) {
            var slider = _a[_i];
            // Assigning tooltip values to each slider
            slider.tooltip = this.tooltip;
        }
    };
    Orientation.prototype.refreshTooltip = function (e) {
        if (this.defaultObj && this.rangeObj && this.minRangeObj) {
            this.defaultObj.refreshTooltip(this.defaultObj.tooltipTarget);
            this.minRangeObj.refreshTooltip(this.minRangeObj.tooltipTarget);
            this.rangeObj.refreshTooltip(this.rangeObj.tooltipTarget);
        }
    };
    Orientation.prototype.render = function () {
        var _this = this;
        if (!ej2_base_1.isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.refreshTooltip.bind(this));
        }
        return (React.createElement("div", { className: 'control-pane', style: { overflow: 'hidden' } },
            React.createElement("style", null, slidercss),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement("table", { className: "slider_table" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "sliderwrap" },
                                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider01", value: 30, orientation: 'Vertical', ref: function (slider) { _this.defaultObj = slider; } }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "sliderwrap" },
                                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider02", value: 30, type: 'MinRange', orientation: 'Vertical', ref: function (slider) { _this.minRangeObj = slider; } }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "sliderwrap" },
                                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider03", value: [30, 70], type: 'Range', orientation: 'Vertical', ref: function (slider) { _this.rangeObj = slider; } })))))))),
                React.createElement("div", { id: "slider_event", className: "col-lg-4 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                        React.createElement("div", { className: "userselect" }, "Ticks")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: this.enableDisableTicks.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                        React.createElement("div", { className: "userselect" }, "Tooltip")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingleft: 0, paddingtop: 0 } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: this.enableDisableTooltip.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of Slider component in Vertical orientation. Drag the thumb over the bar for selecting the values between min and max.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Slider component can be rendered in either horizontal or vertical orientation and this can be set through the orientation property"),
                React.createElement("p", null, "The Slider component allows the user to select a value or range of values in-between a min and max range, by dragging the thumb over the slider bar in Vertical orientation. There are three types of sliders available in Vertical Orientation:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Default - allows us to select a single value in Vertical Orientation"),
                    React.createElement("li", null, "MinRange \u2013 allows us to select a single value, but highlights with a range selection from the min value to the current handle value in Vertical Orientation"),
                    React.createElement("li", null, "Range \u2013 allows us to select a range of values with two handles, where the handles was connected with a range selection in Vertical Orientation"),
                    React.createElement("p", null, "The dragInterval is used to drag both handles using the range bar which is also applicable only to the range slider."),
                    React.createElement("p", null, "In this demo we can see the Default, MinRange and Range slider types."),
                    React.createElement("p", null,
                        "For more information, we can refer the",
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/getting-started.html?lang=es6#orientation" }, "Orientation"),
                        " section from the documentation.")))));
    };
    return Orientation;
}(sample_base_1.SampleBase));
exports.Orientation = Orientation;
