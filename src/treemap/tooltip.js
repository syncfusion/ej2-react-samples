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
 * Tooltip sample for treemap
 */
var React = require("react");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/airport-count.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Tooltip.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Tooltip.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', tooltipSettings: {
                            visible: true,
                            template: '<div id="Tooltip">' +
                                '<div id="displayAirports" style="border-radius: 5px;padding-left: 10px;padding-right: 10px;padding-bottom: 6px;padding-top: 6px;background: #EFEFEF;height:45px;width:150px;border: 1px #919191;box-shadow: 0px, 2px;">' +
                                '<div id="airplaneicon"><img src = "src/treemap/image/airplane.svg"; style="background-repeat: no-repeat;float:left;height:32px;width:32px;"/></div>' +
                                '<div id="value" style="margin-top: 5px;color: #585C60;font-family: Roboto-Bold;font-size: 16px;">' +
                                '<span id="label" style="padding-left: 8px;color: #5D5D5D;font-family: Roboto-Regular;font-size: 16px;">Airports: </span><b style="margin-left: 5px">${Count}</b></div></div>' +
                                '</div>'
                        }, titleSettings: {
                            text: 'Country wise International Airport count in South America',
                            textStyle: {
                                size: '15px'
                            }
                        }, dataSource: datasource.airport, weightValuePath: 'Count', equalColorValuePath: 'Count', legendSettings: {
                            visible: true,
                            position: 'Top',
                            shape: 'Rectangle'
                        }, leafItemSettings: {
                            showLabels: true,
                            labelPath: 'State',
                            labelPosition: 'Center',
                            labelStyle: {
                                size: '13px'
                            },
                            fill: '#6699cc',
                            colorMapping: [
                                {
                                    value: 25,
                                    color: '#634D6F'
                                },
                                {
                                    value: 12,
                                    color: '#B34D6D'
                                },
                                {
                                    value: 9,
                                    color: '#557C5C'
                                },
                                {
                                    value: 7,
                                    color: '#44537F'
                                },
                                {
                                    value: 6,
                                    color: '#637392'
                                },
                                {
                                    value: 3,
                                    color: '#7C754D'
                                },
                                {
                                    value: 2,
                                    color: '#2E7A64'
                                },
                                {
                                    value: 1,
                                    color: '#95659A'
                                },
                            ]
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip, ej2_react_treemap_1.TreeMapLegend] })))),
            React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_international_airports_by_country", target: "_blank" }, "en.wikipedia.org")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the number of international airports available in various countries in South America. On hover, the items details will be displayed in tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to apply equal color mapping and apply colors to TreeMap items based on certain value.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Tooltip template is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."))));
    };
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
