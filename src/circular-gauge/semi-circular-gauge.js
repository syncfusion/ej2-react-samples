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
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var SemiGauge = (function (_super) {
    __extends(SemiGauge, _super);
    function SemiGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Code for Property Panel
    SemiGauge.prototype.angleChange = function (e) {
        var centerX = document.getElementById('centerX');
        var centerY = document.getElementById('centerY');
        if (e.checked) {
            this.gauge.centerX = null;
            this.gauge.centerY = null;
            this.gauge.moveToCenter = true;
            centerX.disabled = true;
            centerY.disabled = true;
        }
        else {
            this.gauge.centerX = centerX.value + '%';
            this.gauge.centerY = centerY.value + '%';
            centerX.disabled = false;
            centerY.disabled = false;
            this.gauge.moveToCenter = false;
        }
        this.gauge.refresh();
    };
    SemiGauge.prototype.start = function () {
        var min = +this.startElement.value;
        document.getElementById('rangeStart').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + min + '°';
        this.gauge.axes[0].startAngle = min;
        this.gauge.refresh();
    };
    SemiGauge.prototype.end = function () {
        var max = +this.endElement.value;
        document.getElementById('rangeEnd').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + max + '°';
        this.gauge.axes[0].endAngle = max;
        this.gauge.refresh();
    };
    SemiGauge.prototype.radius = function () {
        var radius = +this.radiusElement.value;
        document.getElementById('radius1').innerHTML = 'Radius <span> &nbsp;&nbsp;&nbsp;' + radius + '%';
        this.gauge.axes[0].radius = '' + radius + '%';
        this.gauge.refresh();
    };
    SemiGauge.prototype.centerX = function () {
        var max = +this.xElement.value;
        document.getElementById('center1').innerHTML = 'Center X <span> &nbsp;&nbsp;&nbsp;' + max + '%';
        this.gauge.centerX = '' + max + '%';
        this.gauge.refresh();
    };
    SemiGauge.prototype.centerY = function () {
        var max = +this.yElement.value;
        document.getElementById('center2').innerHTML = 'Center Y <span> &nbsp;&nbsp;&nbsp;' + max + '%';
        this.gauge.centerY = '' + max + '%';
        this.gauge.refresh();
    };
    SemiGauge.prototype.hideLabel = function () {
        var labelIntersect = document.getElementById('hidelabel').checked;
        this.gauge.axes[0].hideIntersectingLabel = labelIntersect;
        this.gauge.refresh();
    };
    SemiGauge.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    SemiGauge.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), ref: function (gauge) { return _this.gauge = gauge; }, id: 'gauge' },
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '80%', startAngle: 270, endAngle: 90, minimum: 0, maximum: 100, hideIntersectingLabel: true, lineStyle: { width: 0, color: '#0450C2' }, labelStyle: {
                                font: {
                                    fontWeight: 'normal'
                                },
                                position: 'Outside',
                                autoAngle: true
                            }, majorTicks: { position: 'Inside', width: 2, height: 12, interval: 4 }, minorTicks: { position: 'Inside', width: 1, height: 5, interval: 2 } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: false }, value: 30, radius: '75%', color: '#FF9200', pointerWidth: 7, cap: {
                                        radius: 8,
                                        color: '#565656',
                                        border: { width: 0 }
                                    }, needleTail: {
                                        color: '#FF9200',
                                        length: '13%'
                                    } })))))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'rangeStart' },
                                        "Start Angle ",
                                        React.createElement("span", null, " \u00A0\u00A0\u00A0270\u00B0"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "start", defaultValue: "270", min: "0", max: "360", style: { width: '90%' }, onChange: this.start.bind(this), ref: function (d) { return _this.startElement = d; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'rangeEnd' },
                                        "End Angle ",
                                        React.createElement("span", null, " \u00A0\u00A0\u00A090\u00B0"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "end", defaultValue: "90", min: "0", max: "360", style: { width: '90%' }, onChange: this.end.bind(this), ref: function (d) { return _this.endElement = d; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'radius1' },
                                        "Radius ",
                                        React.createElement("span", null, " \u00A0\u00A0\u00A080%"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "radius", defaultValue: "80", min: "0", max: "100", style: { width: '90%' }, onChange: this.radius.bind(this), ref: function (d) { return _this.radiusElement = d; } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Radius based on angle")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: '0px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'angle', change: this.angleChange.bind(this), ref: function (d) { return _this.angleElement = d; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'center1' },
                                        "Center X ",
                                        React.createElement("span", null, " \u00A0\u00A0\u00A050%"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "centerX", defaultValue: "50", min: "0", max: "100", style: { width: '90%' }, onChange: this.centerX.bind(this), ref: function (d) { return _this.xElement = d; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'center2' },
                                        "Center Y ",
                                        React.createElement("span", null, " \u00A0\u00A0\u00A050%"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "centerY", defaultValue: "50", min: "0", max: "100", style: { width: '90%' }, onChange: this.centerY.bind(this), ref: function (d) { return _this.yElement = d; } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Hide intersecting labels")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: '0px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'hidelabel', checked: true, change: this.hideLabel.bind(this), ref: function (d) { return _this.angleElement = d; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the rendering of circular gauge with modified angles. The gauge can be customized using the options in properties panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the circular gauge with modified start and end angles to form semi or quarter circular gauges. By enabling the radius based on angle option, the radius of circular gauge will be calculated based on the start and end angles. You can also hide the intersect labels using `hideIntersectingLabel` property."),
                React.createElement("p", null,
                    "For more information on ranges, refer to this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation"),
                    " section."))));
    };
    return SemiGauge;
}(sample_base_1.SampleBase));
exports.SemiGauge = SemiGauge;
