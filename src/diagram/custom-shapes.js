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
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var htmlcontent = '<div id="gauge" style="height:100%; width:100%; overflow:hidden;"> </div>';
var shape = { type: "HTML", content: htmlcontent };
var node1 = {
    id: "node",
    offsetX: 450,
    offsetY: 200,
    width: 300,
    height: 300,
    shape: shape
};
var diagramInstance;
var HtmlNode = (function (_super) {
    __extends(HtmlNode, _super);
    function HtmlNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlNode.prototype.rendereComplete = function () {
        getHtmlContent();
        diagramInstance.fitToPage();
    };
    HtmlNode.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "640px", nodes: [node1], snapSettings: { constraints: 0 } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to host a HTML element inside a node. In this example, a Gauge control is hosted inside a HTML Node.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to host a control inside a node. The",
                    React.createElement("code", null, "shape"),
                    " property of the node can be used to host HTML content inside a node. The",
                    React.createElement("code", null, "content"),
                    " property of the shape allows you to define the content to be hosted."),
                React.createElement("br", null))));
    };
    return HtmlNode;
}(sample_base_1.SampleBase));
exports.HtmlNode = HtmlNode;
//Add Gauge control to Diagram.
function getHtmlContent() {
    var div = document.getElementById("gauge");
    var circularGauge = new ej2_react_circulargauge_1.CircularGaugeComponent({
        load: function (args) {
            var selectedTheme = location.hash.split("/")[1];
            selectedTheme = selectedTheme ? selectedTheme : "Material";
            args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1));
        },
        axes: [
            {
                lineStyle: { width: 10, color: "transparent" },
                labelStyle: {
                    position: "Inside",
                    useRangeColor: false,
                    font: { size: "12px", fontFamily: "Roboto", fontStyle: "Regular" }
                },
                majorTicks: { height: 10, offset: 5, color: "#9E9E9E" },
                minorTicks: { height: 0 },
                annotations: [
                    {
                        content: '<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>',
                        radius: "30%",
                        angle: 0,
                        zIndex: "1"
                    },
                    {
                        content: '<div><span style="font-size:20px; color:#424242; font-family:Regular">65 MPH</span></div>',
                        radius: "40%",
                        angle: 180,
                        zIndex: "1"
                    }
                ],
                startAngle: 210,
                endAngle: 150,
                minimum: 0,
                maximum: 120,
                radius: "80%",
                ranges: [
                    { start: 0, end: 40, color: "#30B32D" },
                    { start: 40, end: 80, color: "#FFDD00" },
                    { start: 80, end: 120, color: "#F03E3E" }
                ],
                pointers: [
                    {
                        value: 65,
                        radius: "60%",
                        color: "#757575",
                        pointerWidth: 8,
                        cap: { radius: 7, color: "#757575" },
                        needleTail: { length: "18%", color: "#757575" }
                    }
                ]
            }
        ]
    });
    circularGauge.appendTo("#gauge");
    return div;
}
