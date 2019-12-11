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
 * Dynamic gauge
 */
//tslint:disable
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var sliderValue = 60;
var SAMPLE_CSS = "\n.panel {\n    width: 105% !important;\n    height: 80px !important;\n    margin-left: 5% !important;\n    margin-top: 15% !important;\n    border-color: lightgray;\n    float: left;\n    background-color: transparent;\n}\n\n.content {\n    float: left !important;\n    margin-left: 62px !important;\n    margin-top: 6% !important;\n    text-align: left !important;\n    border: 0px solid #dddddd;\n    min-height: auto;\n    position: absolute;\n}\n\n@media screen and (max-width: 1160px) {\n    .panel {\n        width: 115% !important;\n    }\n\n    .firstcontent {\n        font-size: 13px !important;\n    }\n\n    .secondcontent {\n        font-size: 15px !important;\n    }\n}\n\n@media screen and (max-width: 990px) {\n    .panel {\n        width: 50% !important;\n        height: 80px !important;\n        margin-left: 27% !important;\n        margin-top: 0% !important;\n    }\n\n    .subgauge {\n        margin-left: 8% !important;\n        margin-top: 1% !important;\n    }\n\n    .content {\n        margin-left: 18% !important;\n        margin-top: 2% !important;\n    }\n\n    .firstcontent {\n        font-size: 16px !important;\n    }\n\n    .secondcontent {\n        font-size: 18px !important;\n    }\n}    \n\n@media screen and (max-width: 410px) {\n    #column1 {\n        margin-left: -9% !important;\n    }\n\n    .subgauge {\n        margin-left: 3% !important;\n    }\n\n    .panel {\n        width: 52% !important;\n    }\n\n    .content {\n        margin-top: 3% !important;\n    }\n}";
var AppleWatchGauge = /** @class */ (function (_super) {
    __extends(AppleWatchGauge, _super);
    function AppleWatchGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    AppleWatchGauge.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    AppleWatchGauge.prototype.load1 = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image4.svg" /></div>';
        }
    };
    AppleWatchGauge.prototype.load2 = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:15px;height:15px;" src="src/circular-gauge/images/image5.svg" /></div>';
        }
    };
    AppleWatchGauge.prototype.load3 = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image6.svg" /></div>';
        }
    };
    AppleWatchGauge.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section', style: { align: "center" } },
                React.createElement("div", { id: "gauge", className: "row" },
                    React.createElement("div", { className: "cols-sample-area", style: { align: "center" } },
                        React.createElement("div", { className: "col-lg-9 col-md-9", style: { marginLeft: '5%' } },
                            React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'gauge1', height: "400px", width: "400px" },
                                React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                            font: {
                                                fontWeight: 'Roboto',
                                                fontStyle: 'Regular',
                                                size: '0px',
                                                color: 'white'
                                            },
                                            position: 'Inside',
                                            useRangeColor: true
                                        }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                        React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img style="width:22px;height:22 px;" src="src/circular-gauge/images/image1.svg" /></div>', angle: 8, radius: '80%', zIndex: '1' }),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation2"><img style="width:20px;height:20px;" src="src/circular-gauge/images/image2.svg" /></div>', angle: 11, radius: '58%', zIndex: '1' }),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation3"><img style="width:22px;height:22px;" src="src/circular-gauge/images/image3.svg" /></div>', angle: 16, radius: '36%', zIndex: '1' })),
                                        React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '90%', startWidth: 40, endWidth: 40, color: '#E30219', opacity: 0.2 }),
                                            React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '68%', startWidth: 40, endWidth: 40, color: '#3EDE00', opacity: 0.2 }),
                                            React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '46%', startWidth: 40, endWidth: 40, color: '#18F8F6', opacity: 0.2 })),
                                        React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 65, radius: '90%', color: '#E2011A', pointerWidth: 40, type: 'RangeBar', roundedCornerRadius: 25 }),
                                            React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 43, radius: '68%', color: '#3FE000', pointerWidth: 40, type: 'RangeBar', roundedCornerRadius: 25 }),
                                            React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 58, radius: '46%', color: '#00C9E6', pointerWidth: 40, type: 'RangeBar', roundedCornerRadius: 25 })))))),
                        React.createElement("div", { className: "col-lg-3 col-md-3", style: { marginLeft: "-15%" } },
                            React.createElement("div", { className: "panel", style: { "align": "center" } },
                                React.createElement("div", { className: "subgauge", style: { float: "left", marginTop: "3%" } },
                                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load1.bind(this), id: 'gauge2', height: "65px", width: "65px" },
                                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                                    font: {
                                                        fontWeight: 'Roboto',
                                                        fontStyle: 'Regular',
                                                        size: '0px',
                                                        color: 'white'
                                                    },
                                                    position: 'Inside',
                                                    useRangeColor: true
                                                }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image1.svg" /></div>', angle: 0, radius: '0%', zIndex: '1' })),
                                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '100%', startWidth: 8, endWidth: 8, color: '#E30219', opacity: 0.2 })),
                                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 65, radius: '100%', color: '#E2011A', pointerWidth: 8, type: 'RangeBar', roundedCornerRadius: 5 })))))),
                                React.createElement("div", { className: "content" },
                                    React.createElement("span", { className: "firstcontent", style: { fontSize: "18px" } }, "MOVE"),
                                    React.createElement("span", { className: "firstcontent", style: { fontSize: "18px", color: "#f4104d" } }, "\u00A065%"),
                                    React.createElement("br", null),
                                    React.createElement("span", { className: "secondcontent", style: { color: "#f4104d", fontSize: "19px" } }, "338/520 CAL"))),
                            React.createElement("div", { className: "panel", style: { "align": "center" } },
                                React.createElement("div", { className: "subgauge", style: { float: "left", marginTop: "3%" } },
                                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load2.bind(this), id: 'gauge3', height: "65px", width: "65px" },
                                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                                    font: {
                                                        fontWeight: 'Roboto',
                                                        fontStyle: 'Regular',
                                                        size: '0px',
                                                        color: 'white'
                                                    },
                                                    position: 'Inside',
                                                    useRangeColor: true
                                                }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img style="width:17px;height:17px;" src="src/circular-gauge/images/image2.svg" /></div>', angle: 0, radius: '0%', zIndex: '1' })),
                                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '100%', startWidth: 8, endWidth: 8, color: '#3EDE00', opacity: 0.2 })),
                                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 43, radius: '100%', color: '#3FE000', pointerWidth: 8, type: 'RangeBar', roundedCornerRadius: 5 })))))),
                                React.createElement("div", { className: "content" },
                                    React.createElement("span", { className: "firstcontent", style: { fontSize: "18px" } }, "EXERCISE"),
                                    React.createElement("span", { className: "firstcontent", style: { fontSize: "18px", color: "#f4104d" } }, "\u00A06%"),
                                    React.createElement("br", null),
                                    React.createElement("span", { className: "secondcontent", style: { color: "#a6ff00", fontSize: "19px" } }, "9/30 MIN"))),
                            React.createElement("div", { className: "panel", style: { "align": "center" } },
                                React.createElement("div", { className: "subgauge", style: { float: "left", marginTop: "3%" } },
                                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load3.bind(this), id: 'gauge4', height: "65px", width: "65px" },
                                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                                    font: {
                                                        fontWeight: 'Roboto',
                                                        fontStyle: 'Regular',
                                                        size: '0px',
                                                        color: 'white'
                                                    },
                                                    position: 'Inside',
                                                    useRangeColor: true
                                                }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img style="width:25px;height:25px;" src="src/circular-gauge/images/image3.svg" /></div>', angle: 0, radius: '0%', zIndex: '1' })),
                                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '100%', startWidth: 8, endWidth: 8, color: '#18F8F6', opacity: 0.2 })),
                                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 58, radius: '100%', color: '#00C9E6', pointerWidth: 8, type: 'RangeBar', roundedCornerRadius: 5 })))))),
                                React.createElement("div", { className: "content" },
                                    React.createElement("span", { className: "firstcontent", style: { fontSize: "18px" } }, "STAND"),
                                    React.createElement("span", { className: "firstcontent", style: { fontSize: "18px", color: "#f4104d" } }, "\u00A066%"),
                                    React.createElement("br", null),
                                    React.createElement("span", { className: "secondcontent", style: { color: "#a6ff00", fontSize: "19px" } }, "7/12 HR"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample resembles the appearance of Apple watch rings, it is similar to an activity tracker which denotes the move, exercise and stand details.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to make the circular gauge look like the Apple watch rings. Ranges are rendered with rounded corners and annotations are placed to denote the move, exercise, and stand values."),
                React.createElement("p", null,
                    "For more information on ranges, refer to this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/circular-gauge/gauge-ranges" }, "documentation section"),
                    "."))));
    };
    return AppleWatchGauge;
}(sample_base_1.SampleBase));
exports.AppleWatchGauge = AppleWatchGauge;
