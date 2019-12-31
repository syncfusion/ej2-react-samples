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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.material #property tr#showon {\n    display: none;\n}\n\n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap label {\n    padding-bottom: 26px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n}\n\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n";
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Initialize tooltip with placement and showOn
        _this.defaultTooltip = { placement: 'Before', isVisible: true, showOn: 'Focus' };
        _this.rangeTooltip = { placement: 'Before', isVisible: true, showOn: 'Focus' };
        //Dropdownlist datasource values for changing tooltip placement for slider component
        _this.option = [{ text: 'Focus', value: 'Focus' }, { text: 'Hover', value: 'Hover' }, { text: 'Auto', value: 'Auto' },
            { text: 'Always', value: 'Always' }];
        _this.fields = { value: 'value', text: 'text' };
        _this.placement = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' }];
        _this.placementField = { value: 'value', text: 'text' };
        return _this;
    }
    // Handling the dropdown list change event to change slider tooltip showOn property
    Tooltip.prototype.onChange = function () {
        this.defaultObj.tooltip = { showOn: this.listObj.value };
        this.defaultObj.dataBind();
        this.rangeObj.tooltip = { showOn: this.listObj.value };
        this.rangeObj.dataBind();
    };
    Tooltip.prototype.onPlacementChange = function () {
        // Handling the dropdown list change event to change slider tooltip placement
        this.defaultObj.tooltip = { placement: this.placementObj.value };
        this.defaultObj.dataBind();
        this.rangeObj.tooltip = { placement: this.placementObj.value };
        this.rangeObj.dataBind();
    };
    // Handler used to reposition the tooltip on page scroll
    Tooltip.prototype.onScroll = function () {
        if (this.defaultObj && this.rangeObj) {
            this.defaultObj.refreshTooltip(this.defaultObj.tooltipTarget);
            this.rangeObj.refreshTooltip(this.rangeObj.tooltipTarget);
        }
    };
    Tooltip.prototype.render = function () {
        var _this = this;
        if (!ej2_base_1.isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement("style", null, slidercss),
                        React.createElement("div", { className: 'sliderwrap' },
                            React.createElement("label", null, "Default Slider"),
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider01", value: 30, showButtons: true, tooltip: this.defaultTooltip, ref: function (slider) { _this.defaultObj = slider; } })),
                        React.createElement("div", { className: 'sliderwrap' },
                            React.createElement("label", null, "Range Slider"),
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider02", value: [30, 70], showButtons: true, type: 'Range', tooltip: this.rangeTooltip, ref: function (slider) { _this.rangeObj = slider; } })))),
                React.createElement("div", { id: "#slider_event", className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Tooltip' },
                        React.createElement("table", { id: "property", title: "Tooltip", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Placement")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.placement, fields: this.placementField, index: 0, placeholder: "Select a Placement", popupHeight: "200px", ref: function (dropdownlist) { _this.placementObj = dropdownlist; }, change: this.onPlacementChange.bind(this) })))),
                                React.createElement("tr", { id: "showon" },
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "ShowOn")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.option, fields: this.fields, index: 0, placeholder: "Select a ShowOn", popupHeight: "200px", ref: function (dropdownlist) { _this.listObj = dropdownlist; }, change: this.onChange.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of Slider component with Ticks placement. Drag the thumb over the bar for selecting the values between min and max.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Ticks are the visual representation of the Slider values. The ticks are differentiated as small ticks and large ticks based on its size. The ticks position can be defined by the",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/api-ticksData.html?lang=es6#smallstep-number" }, "smallStep"),
                    " and",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/api-ticksData.html?lang=es6#smallstep-number" }, "largeStep "),
                    "properties."),
                React.createElement("p", null, " In this demo, we have demonstrated Ticks position with Default and Range Slider."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Default Slider \u2013 In this sample, the small ticks and large ticks are rendered with the frequency of 0.05 and 0.20."),
                    React.createElement("li", null, "Range Slider \u2013 In this sample, the small ticks and large ticks are rendered with the frequency of 5 and 20.")),
                React.createElement("p", null, " We can also change the Ticks placement of  Slider and Disable Slider component from the property pane."),
                React.createElement("p", null, "We can use the below property to restrict the value range for the slider:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/api-slider.html?lang=es6#step-string---number" }, "step "),
                        " - to define incremental/decremental step value for slider"),
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/api-slider.html?lang=es6#min-string---number" }, "min "),
                        " \u2013 to specify minimum value of the slider"),
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/api-slider.html?lang=es6#max-string---number" }, "max "),
                        " \u2013 to specify maximum value of the slider")),
                React.createElement("p", null, "The dragInterval is used to drag both handles using the range bar which is also applicable only to the range slider."),
                React.createElement("p", null,
                    "For more information, we can refer the",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/ticks.html?lang=es6" }, "ticks"),
                    " section from the documentation."))));
    };
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
