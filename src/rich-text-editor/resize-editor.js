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
 * RichTextEditor Resizable sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./resize-editor.css");
var ResizableEditor = (function (_super) {
    __extends(ResizableEditor, _super);
    function ResizableEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resize = true;
        return _this;
    }
    ResizableEditor.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rte" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "resizeRTE", enableResize: this.resize, height: '250px' },
                        React.createElement("p", null, "The rich text editor component is WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Resize, ej2_react_richtexteditor_1.QuickToolbar] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the resize operation of the rich text editor control. To resize the rich text editor, select and resize the editor using its handle (grip) at the bottom right corner of the content panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Users can create resizable rich text editor by setting the ",
                    React.createElement("code", null, "enableResize"),
                    " property to true, which is used to change the size of the rich text editor dynamically."))));
    };
    return ResizableEditor;
}(sample_base_1.SampleBase));
exports.ResizableEditor = ResizableEditor;
