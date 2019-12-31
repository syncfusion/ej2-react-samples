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
 * RichTextEditor default sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./rich-text-editor.css");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rte" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "defaultRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; } },
                        React.createElement("p", null, "The rich text editor component is WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
                        React.createElement("p", null,
                            React.createElement("b", null, "Key features:")),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "Provides <IFRAME> and <DIV> modes")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Capable of handling markdown editing.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Contains a modular library to load the necessary functionality on demand.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Provides a fully customizable toolbar.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Provides HTML view to edit the source directly for developers.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Supports third-party library integration.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Allows preview of modified content before saving it.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Handles images, hyperlinks, video, hyperlinks, uploads, etc.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Contains undo/redo manager.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Creates bulleted and numbered lists."))),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default rendering of the rich text editor with minimum configuration.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The rich text editor is WYSIWYG (\"what you see is what you get\") editor that is used to create and edit content, and return valid HTML markup. The editor provides a standard toolbar to format content using its commands. The toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo the operation, HTML view, and more."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
