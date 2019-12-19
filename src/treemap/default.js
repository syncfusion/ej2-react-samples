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
 * Default sample for treemap
 */
var React = require("react");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/car-sales.json");
var datasource = data;
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t\t}";
// custom code end
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Default.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    /* tslint:disable:no-string-literal */
    Default.prototype.itemMove = function (args) {
        args.item['data'].Sales = args.item['weight'];
        args.treemap.tooltipSettings.format = args.item['groupIndex'] === 0 ? 'Country: ${Continent}<br>Sales: ${Sales}' :
            'Country: ${Continent}<br>Company: ${Company}<br>Sales: ${Sales}';
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treemap_1.TreeMapComponent, { itemClick: this.itemMove.bind(this), itemMove: this.itemMove.bind(this), load: this.load.bind(this), id: 'treemap-container', titleSettings: {
                        text: 'Car Sales by Country - 2017',
                        textStyle: { size: '15px' }
                    }, rangeColorValuePath: 'Sales', format: "n", useGroupingSeparator: true, dataSource: datasource.car_sale, legendSettings: {
                        visible: true,
                        position: 'Top',
                        shape: 'Rectangle'
                    }, palette: ['#C33764', '#AB3566', '#993367', '#853169', '#742F6A', '#632D6C', '#532C6D', '#412A6F', '#312870', '#1D2671'], tooltipSettings: { visible: true }, weightValuePath: 'Sales', leafItemSettings: {
                        labelPath: 'Company',
                        border: { color: 'white', width: 0.5 }
                    } },
                    React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapLegend, ej2_react_treemap_1.TreeMapTooltip] }),
                    React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                        React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'Continent', border: { color: 'white', width: 0.5 } })))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://www.factorywarrantylist.com/car-sales-by-country.html/", target: "_blank" }, "www.factorywarrantylist.com")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the sales of cars across various countries in 2017 by rendering the countries at the top level and car manufacturing companies as leaf items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a TreeMap with the provided data source. The palette color is applied to the items in TreeMap. The default legend is enabled in this example to represent the items at the top level.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "TreeMap component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapTooltip)"),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapLegend)"),
                    " method."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
