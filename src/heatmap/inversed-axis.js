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
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Heatmap Inversed Axis sample
 */
var InversedAxis = /** @class */ (function (_super) {
    __extends(InversedAxis, _super);
    function InversedAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InversedAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: function (t) { return _this.heatmap = t; }, titleSettings: {
                        text: 'Population Growth Rate of the most Populous Countries',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['China', 'India', 'USA', 'Indonesia', 'Brazil', 'Pakistan',
                            'Nigeria', 'Bangladesh', 'Russia', 'Mexico'],
                        labelRotation: 45,
                        labelIntersectAction: 'None',
                        isInversed: true
                    }, yAxis: {
                        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
                            '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
                        isInversed: true
                    }, dataSource: data.inveredAxisData, cellSettings: {
                        border: { width: 0 },
                        showLabel: false,
                        format: '{value} %'
                    }, paletteSettings: {
                        palette: [{ value: 0, color: '#4b7287' },
                            { value: 0.5, color: '#b5b29f' },
                            { value: 1, color: '#F0D6AD' },
                            { value: 1.5, color: '#9da49a' },
                            { value: 2, color: '#466f86' },
                            { value: 2.5, color: '#d7c7a7' },
                            { value: 3, color: '#6e888f' },
                        ],
                    }, load: this.load.bind(this), legendSettings: {
                        visible: false
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_countries_by_oil_production", target: "_blank" }, "https://en.wikipedia.org/ "))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'XOpposedPosition', checked: true, label: 'Reverse X-Axis Origin', change: this.valueXChange.bind(this) }, " "))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'YOpposedPosition', checked: true, label: 'Reverse Y-Axis Origin', change: this.valueYChange.bind(this) }, " "))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the population growth rate of the most populous countries over the years. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to reverse the origin of the axes by means of checkbox for each axis.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to reverse the axis origin for both axes, once the axis origin has been reversed the axis data will be displayed inverted. You can reverse the axis origin by enabling the ",
                    React.createElement("code", null, "isInversed"),
                    " property for each axis."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method."))));
    };
    InversedAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    InversedAxis.prototype.valueXChange = function (args) {
        if (args.checked) {
            this.heatmap.xAxis.isInversed = true;
        }
        else {
            this.heatmap.xAxis.isInversed = false;
        }
        this.heatmap.dataBind();
    };
    InversedAxis.prototype.valueYChange = function (args) {
        if (args.checked) {
            this.heatmap.yAxis.isInversed = true;
        }
        else {
            this.heatmap.yAxis.isInversed = false;
        }
        this.heatmap.dataBind();
    };
    return InversedAxis;
}(sample_base_1.SampleBase));
exports.InversedAxis = InversedAxis;
