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
require("./code-editor.component.css");
/**
 *  Sample for code editor layout
 */
var imgStyle = {
    width: "20%",
    margin: "0 auto"
};
var paneImg = {
    margin: "auto auto 5px"
};
var lastPaneStyle = {
    padding: "auto auto 20px"
};
var CodeEditor = (function (_super) {
    __extends(CodeEditor, _super);
    function CodeEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paneSize = "53%";
        _this.minimumSize = "30%";
        return _this;
    }
    CodeEditor.prototype.bottomPaneContent = function () {
        return (React.createElement("div", { className: "splitter-editor-content" },
            React.createElement("h3", { className: "h3" }, "Preview of sample"),
            React.createElement("div", { className: "splitter-image" },
                React.createElement("img", { className: "img1", src: "https://ej2.syncfusion.com/demos/src/listview/images/albert.png", style: imgStyle }))));
    };
    ;
    CodeEditor.prototype.firstPaneContent = function () {
        return (React.createElement("div", { className: "splitter-editor-content" },
            React.createElement("h3", { className: "h3" }, "HTML"),
            React.createElement("div", { className: "code-preview" },
                "<",
                React.createElement("span", null, "!DOCTYPE html>"),
                React.createElement("div", null,
                    "<",
                    React.createElement("span", null, "html>")),
                React.createElement("div", null,
                    "<",
                    React.createElement("span", null, "body>")),
                "<",
                React.createElement("span", null, "div"),
                " id=\"custom-image\">",
                React.createElement("div", { style: paneImg },
                    "<",
                    React.createElement("span", null, "img"),
                    " src=\"src/albert.png\">"),
                React.createElement("div", null,
                    "<",
                    React.createElement("span", null, "div"),
                    ">"),
                React.createElement("div", null,
                    "<",
                    React.createElement("span", null, "/body>")),
                React.createElement("div", null,
                    "<",
                    React.createElement("span", null, "/html>")))));
    };
    ;
    CodeEditor.prototype.secondPaneContent = function () {
        return (React.createElement("div", { className: "splitter-editor-content" },
            React.createElement("h3", { className: "h3" }, "CSS"),
            React.createElement("div", { className: "code-preview" },
                React.createElement("span", null, "img { "),
                React.createElement("div", { id: "code-text" },
                    "margin:",
                    React.createElement("span", null, "0 auto;")),
                React.createElement("div", { id: "code-text" },
                    "display:",
                    React.createElement("span", null, "flex;")),
                React.createElement("div", { id: "code-text" },
                    "height:",
                    React.createElement("span", null, "70px;")),
                React.createElement("span", null, " } "))));
    };
    ;
    CodeEditor.prototype.thirdPaneContent = function () {
        return (React.createElement("div", { className: "splitter-editor-content" },
            React.createElement("h3", { className: "h3" }, "JavaScript"),
            React.createElement("div", { className: "code-preview" },
                React.createElement("span", null, "var"),
                " image = document.getElementById(\"custom-image\");",
                React.createElement("div", null, "image.addEventListener(\"click\", function() { "),
                React.createElement("div", { style: lastPaneStyle }, "// Code block for click action"),
                React.createElement("span", null, " } "))));
    };
    ;
    CodeEditor.prototype.innerSplitterElement = function () {
        var _this = this;
        return (React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "codeEditor", ref: function (splitter) { _this.innerSplitterInstance = splitter; } },
            React.createElement(ej2_react_layouts_1.PanesDirective, null,
                React.createElement(ej2_react_layouts_1.PaneDirective, { size: '29%', min: '23%', content: this.firstPaneContent }),
                React.createElement(ej2_react_layouts_1.PaneDirective, { size: '20%', min: '15%', content: this.secondPaneContent }),
                React.createElement(ej2_react_layouts_1.PaneDirective, { size: '35%', min: '35%', content: this.thirdPaneContent }))));
    };
    ;
    CodeEditor.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "target", className: "control-section code-editor" },
            React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "splitter2", height: "400px", orientation: "Vertical", ref: function (splitter) { _this.splitterInstance = splitter; } },
                React.createElement(ej2_react_layouts_1.PanesDirective, null,
                    React.createElement(ej2_react_layouts_1.PaneDirective, { content: this.innerSplitterElement.bind(this) }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: this.paneSize, min: this.minimumSize, content: this.bottomPaneContent }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the splitter control that is used to design code editor-like application using multiple panes. You can resize its panes vertically as well as horizontally.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Splitter is used to design code editor-like application using multiple panes. In this code editor layout, display HTML, CSS, and JavaScript (JS) code as horizontal panes at the top and output of sample at the bottom pane."))));
    };
    return CodeEditor;
}(sample_base_1.SampleBase));
exports.CodeEditor = CodeEditor;
