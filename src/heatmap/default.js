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
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}";
// custom code end
/**
 * Heatmap Default sample
 */
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                        text: 'Sales Revenue per Employee (in 1000 US$)',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert',
                            'Laura', 'Anne', 'Paul', 'Karin', 'Mario']
                    }, yAxis: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    }, load: this.load.bind(this), dataSource: this.getDatasource().dataSource },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_1.Adaptor] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the sales revenue of items sold by the employees in a week, where the revenue for the day is displayed in 1000 USD as cell data.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a heat map with the provided data source. The palette color is applied to the items in heat map. The default legend is enabled in this example to represent the items."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    " ",
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the",
                    React.createElement("code", null, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip)"),
                    " method, and use a legend by injecting the",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Legend)"),
                    " method."))));
    };
    Default.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    Default.prototype.getDatasource = function () {
        var temp = {};
        temp.dataSource = [];
        temp.xAis = [];
        temp.yAis = [];
        for (var x = 0; x < 12; x++) {
            temp.dataSource.push([]);
            temp.xAis.push(x);
            temp.yAis.push(x);
            for (var y = 0; y < 6; y++) {
                temp.dataSource[x].push(this.getRndInteger(0, 100));
            }
        }
        return temp;
    };
    Default.prototype.getRndInteger = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
