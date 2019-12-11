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
 * RichTextEditor print sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./print.css");
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo', 'Print'];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    Print.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rtePrint" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "print", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, toolbarSettings: this.toolbarSettings },
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
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.QuickToolbar] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to print the content of the rich text editor. Click the print command which placed in toolbar of RTE to print the editor\u2019s content."))));
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
