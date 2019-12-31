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
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
require("./expand-and-collapse.component.css");
/**
 *  Sample for expand/collapse
 */
var ExpandCollapse = (function (_super) {
    __extends(ExpandCollapse, _super);
    function ExpandCollapse() {
        return _super.call(this, arguments) || this;
    }
    ExpandCollapse.prototype.rightPaneContent1 = function () {
        return (React.createElement("div", { className: "splitter-content-expand" },
            React.createElement("a", { href: "https://www.syncfusion.com/ebooks/data_capture_and_extraction_with_c_sharp_succinctly", target: "_blank" }, " Data Capture and Extraction with C# Succinctly "),
            React.createElement("p", null, "Capturing and extracting information is one of the most important tasks a developer can perform, and making this task more engaging without relying entirely on specialized tools is an efficient way to improve productivity. In Data Capture and Extraction with C# Succinctly, author Ed Freitas guides readers toward getting more out of C# in minimal time. Email has become a pillar of our modern and connected society, and it now serves as a primary means of communication. Because each email is filled with valuable information, data extraction has emerged as a worthwhile skill set for developers in today\u2019s business world.")));
    };
    ;
    ExpandCollapse.prototype.rightPaneContent2 = function () {
        return (React.createElement("div", { className: "splitter-content-expand" },
            React.createElement("a", { href: "https://www.syncfusion.com/ebooks/spark", target: "_blank" }, "Spark Succinctly"),
            React.createElement("p", null, "Mastering big data requires an aptitude at every step of information processing. Post-processing, one of the most important steps, is where you find Apache Spark frequently employed. Spark Succinctly, by Marko Svaljek, addresses Spark\u2019s use in the ultimate step in handling big data. This e-book, the third installment in Svaljek\u2019s IoT series, teaches the basics of using Spark and explores how to work with RDDs, Scala and Python tasks, JSON files, and Cassandra.Many of the leading companies in the world today face the problem of big data.")));
    };
    ;
    ExpandCollapse.prototype.leftPaneContent = function () {
        return (React.createElement("div", { className: "splitter-content-expand" },
            React.createElement("a", { href: "https://www.syncfusion.com/ebooks/neuralnetworks", target: "_blank" }, "Neural Networks Using C# Succinctly"),
            React.createElement("p", null,
                "Neural networks are an exciting field of software development used to calculate outputs from input data. While the idea seems simple enough, the implications of such networks are staggering\u2014think optical character recognition, speech recognition, and regression analysis. With Neural Networks Using C# Succinctly by James McCaffrey, you\u2019ll learn how to create your own neural network to solve classification problems, or problems where the outcomes can only be one of several values. ",
                React.createElement("br", null),
                React.createElement("br", null),
                "Learn about encoding and normalizing data, activation functions and how to choose the right one, and ultimately how to train a neural network to find weights and bias values that provide accurate predictions. An artificial neural network (sometimes abbreviated ANN, or shortened to just \"neural network\" when the context is clear) is a software system that loosely models biological neurons and synapses. Before explaining exactly how neural networks work, it is useful to understand what types of problems they can solve.")));
    };
    ExpandCollapse.prototype.onCreate = function (e) {
        //Initialize Splitter component
        var cont = this.innerSplitterInstance.element.querySelectorAll(".e-pane")[1];
        cont.appendChild(this.splitterInstance.element);
    };
    ExpandCollapse.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "target", className: "control-section splitter-expand" },
            React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "Expand", separatorSize: 3, height: "350px", width: "100%", ref: function (splitter) { _this.innerSplitterInstance = splitter; } },
                React.createElement(ej2_react_layouts_1.PanesDirective, null,
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: '48%', collapsible: true, content: this.leftPaneContent }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { collapsible: true }))),
            React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "Collapse", separatorSize: 3, orientation: "Vertical", ref: function (splitter) { _this.splitterInstance = splitter; }, created: this.onCreate.bind(this) },
                React.createElement(ej2_react_layouts_1.PanesDirective, null,
                    React.createElement(ej2_react_layouts_1.PaneDirective, { collapsible: true, size: '50%', content: this.rightPaneContent1 }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { collapsible: true, content: this.rightPaneContent2 }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the expand and collapse functionalities of the Splitter control. To expand or collapse the panes, hover the mouse over the separator (divider) bar and click the corresponding icon to expand or collapse pane.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The splitter (split container) allows expanding and collapsing its split panes. You can control this behavior using the paneSettings Collapsible property. The collapsible behavior can be enabled for specific pane alone."),
                React.createElement("p", null, "When you hover the mouse over the pane's separator (divider), the expand and collapse icons will be visible. While clicking the icon, the corresponding pane is expanded or collapsed. The remaining panes automatically adjust its dimension based on the expanded or collapsed panes. These icons are visible by default in mobile devices."))));
    };
    return ExpandCollapse;
}(sample_base_1.SampleBase));
exports.ExpandCollapse = ExpandCollapse;
