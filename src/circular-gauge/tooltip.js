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
/**
 * Sample for tooltip
 */
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #templateWrap img {\n        border-radius: 30px;\n        width: 30px;\n        height: 30px;\n        margin: 0 auto;\n    }\n\t #templateWrap {\n        background: #fff;\n        padding: 3px;\n        border-radius: 2px;\n    }\n    #templateWrap .des {\n        float: right;\n        padding-left: 10px;\n        line-height: 30px;\n    }";
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Tooltip.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Tooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-12' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { title: 'Tooltip Customization', loaded: this.onChartLoad.bind(this), tooltipRender: this.tooltipRender.bind(this), dragEnd: this.dragEnd.bind(this), id: 'tooltip-container', ref: function (gauge) { return _this.gauge = gauge; }, enablePointerDrag: true, load: this.load.bind(this), titleStyle: { size: '15px', color: 'grey' }, tooltip: {
                            enable: true,
                            type: ['Range', 'Pointer'],
                            enableAnimation: false
                        } },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.GaugeTooltip] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 240, endAngle: 120, radius: '90%', minimum: 0, maximum: 120, majorTicks: {
                                    color: 'white', offset: -5, height: 12
                                }, lineStyle: { width: 0 }, minorTicks: {
                                    width: 0
                                }, labelStyle: {
                                    useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Roboto' }
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '60%', cap: {
                                            radius: 10, border: { color: '#33BCBD', width: 5 }
                                        }, animation: {
                                            enable: true, duration: 1500
                                        }, color: '#33BCBD' })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 50, radius: '102%', color: '#3A5DC8', startWidth: 10, endWidth: 10 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 50, end: 120, radius: '102%', color: '#33BCBD', startWidth: 10, endWidth: 10 }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the tooltip of pointer value and ranges in gauge. To see the tooltip in action, hover pointer or tap the pointer")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample visualizes the tooltip of pointer value and ranges in gauge. To see the tooltip in action, hover pointer or tap the pointer"),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "Circular gauge component features are segregated into individual feature-wise modules. To use tooltip, we need to inject",
                    React.createElement("code", null, "GaugeTooltip"),
                    " module into services."),
                React.createElement("p", null,
                    "More information on the tooltip can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    Tooltip.prototype.onChartLoad = function (args) {
        document.getElementById('tooltip-container').setAttribute('title', '');
    };
    ;
    Tooltip.prototype.tooltipRender = function (args) {
        var imageName;
        var borderColor;
        var textColor;
        if (args.pointer) {
            imageName = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? 'min' : 'max');
            borderColor = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? '#3A5DC8' : '#33BCBD');
            textColor = this.gauge.theme.toLowerCase() === 'highcontrast' ? 'White' : borderColor;
            if (this.gauge.theme.toLowerCase() === 'highcontrast') {
                args.tooltip.template = '<div id="templateWrap" style="border:2px solid ' + borderColor +
                    ';background-color:black"><img src="src/circular-gauge/images/' + imageName + '.png"/><div class="des" style="color: ' +
                    textColor + '"><span>${value} MPH</span></div></div>';
            }
            else {
                args.tooltip.template = '<div id="templateWrap" style="border:2px solid ' + borderColor +
                    '"><img src="src/circular-gauge/images/' + imageName + '.png"/><div class="des" style="color: ' +
                    borderColor + '"><span>${value} MPH</span></div></div>';
            }
        }
        else if (args.range) {
            imageName = ((args.range.start >= 0 && args.range.end <= 50)) ? 'min' : 'max';
            borderColor = ((args.range.start >= 0 && args.range.end <= 50)) ? '#3A5DC8' : '#33BCBD';
            textColor = this.gauge.theme.toLowerCase() === 'highcontrast' ? 'White' : borderColor;
            var start = args.range.start;
            var end = args.range.end;
            if (this.gauge.theme.toLowerCase() === 'highcontrast') {
                args.tooltip.rangeSettings.template = '<div id=templateWrap style="padding:5px;border:2px solid' + borderColor + ';color: ' +
                    textColor + ';background-color:black"><img src="src/circular-gauge/images/' + imageName +
                    '.png"/> <span>' + start + ' - ' + end + ' MPH  </span> </div>';
            }
            else {
                args.tooltip.rangeSettings.template = '<div id=templateWrap style="padding:5px;border:2px solid' + borderColor + ';color: ' +
                    borderColor + '"><img src="src/circular-gauge/images/' + imageName +
                    '.png"/> <span>' + start + ' - ' + end + ' MPH  </span> </div>';
            }
        }
    };
    ;
    Tooltip.prototype.dragEnd = function (args) {
        if (args.currentValue >= 0 && args.currentValue <= 50) {
            args.pointer.color = "#3A5DC8";
            args.pointer.cap.border.color = "#3A5DC8";
        }
        else {
            args.pointer.color = "#33BCBD";
            args.pointer.cap.border.color = "#33BCBD";
        }
        args.pointer.value = args.currentValue;
        args.pointer.animation.enable = false;
        this.gauge.refresh();
    };
    ;
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
