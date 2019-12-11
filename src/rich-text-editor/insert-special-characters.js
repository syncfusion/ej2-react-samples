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
 * RichTextEditor custom toolbar sample
 */
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./insert-special-characters.css");
var InsertSpecialCharacters = /** @class */ (function (_super) {
    __extends(InsertSpecialCharacters, _super);
    function InsertSpecialCharacters(props) {
        var _this = _super.call(this, props) || this;
        _this.selection = new ej2_react_richtexteditor_1.NodeSelection();
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
            'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
            {
                tooltipText: 'Insert Symbol',
                template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%"><div class="e-tbar-btn-text" style="font-weight: 500;"> &#937;</div></button>'
            }, '|', 'Undo', 'Redo'
        ];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.dlgButtons = [{ buttonModel: { content: "Insert", isPrimary: true }, click: _this.onInsert.bind(_this) },
            { buttonModel: { content: 'Cancel' }, click: _this.onCancel }];
        _this.header = 'Special Characters';
        _this.target = _this.rteSectionEle;
        _this.height = 'auto';
        _this.rteSpecialCharEle = null;
        _this.rteSpecialCharRef = function (element) {
            _this.rteSpecialCharEle = element;
        };
        _this.rteSectionEle = null;
        _this.rteSectionRef = function (element) {
            _this.rteSectionEle = element;
        };
        return _this;
    }
    InsertSpecialCharacters.prototype.onCreate = function () {
        var _this = this;
        this.customBtn = document.getElementById('custom_tbar');
        this.customBtn.onclick = function (e) {
            _this.rteObj.contentModule.getEditPanel().focus();
            _this.dialogObj.element.style.display = '';
            _this.range = _this.selection.getRange(document);
            _this.saveSelection = _this.selection.save(_this.range, document);
            _this.dialogObj.content = _this.rteSpecialCharEle;
            _this.dialogObj.show();
        };
    };
    InsertSpecialCharacters.prototype.dialogCreate = function () {
        var _this = this;
        this.dialogCtn = this.rteSpecialCharEle;
        this.dialogCtn.onclick = function (e) {
            var target = e.target;
            var activeEle = _this.dialogObj.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    };
    InsertSpecialCharacters.prototype.onInsert = function () {
        var activeEle = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            this.saveSelection.restore();
            this.rteObj.executeCommand('insertText', activeEle.textContent);
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
        }
        this.dialogOverlay();
    };
    InsertSpecialCharacters.prototype.dialogOverlay = function () {
        var activeEle = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        this.dialogObj.hide();
    };
    InsertSpecialCharacters.prototype.onCancel = function () {
        var activeEle = this.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        this.hide();
    };
    InsertSpecialCharacters.prototype.actionCompleteHandler = function (e) {
        if (e.requestType === 'SourceCode') {
            this.rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        }
        else if (e.requestType === 'Preview') {
            this.rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
        }
    };
    InsertSpecialCharacters.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section e-rte-custom-tbar-section', id: "rteCustomTool" },
                React.createElement("div", { className: 'rte-control-section', ref: this.rteSectionRef, id: 'rteSection' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "specialCharRTE", ref: function (scope) { _this.rteObj = scope; }, toolbarSettings: this.toolbarSettings, actionComplete: this.actionCompleteHandler.bind(this), created: this.onCreate.bind(this) },
                        React.createElement("div", { style: { display: 'block' } },
                            React.createElement("p", { style: { marginRight: '10px' } }, "The custom command \"insert special character\" is configured as the last item of the toolbar. Click on the command and choose the special character you want to include from the popup.")),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.QuickToolbar] })),
                    React.createElement(ej2_react_popups_1.DialogComponent, { id: 'customTbarDlg', ref: function (scope) { _this.dialogObj = scope; }, buttons: this.dlgButtons, overlayClick: this.dialogOverlay.bind(this), header: this.header, visible: false, showCloseIcon: false, width: '43%', target: '#rteSection', height: this.height, created: this.dialogCreate.bind(this), isModal: true }),
                    React.createElement("div", { id: "customTbarDialog", style: { display: 'none' } },
                        React.createElement("div", { id: "rteSpecial_char", ref: this.rteSpecialCharRef },
                            React.createElement("div", { className: "char_block", title: "^" }, "^"),
                            React.createElement("div", { className: "char_block", title: "_" }, "_"),
                            React.createElement("div", { className: "char_block", title: "`" }, "`"),
                            React.createElement("div", { className: "char_block", title: "{" }, "{"),
                            React.createElement("div", { className: "char_block", title: "|" }, "|"),
                            React.createElement("div", { className: "char_block", title: "}" }, "}"),
                            React.createElement("div", { className: "char_block", title: "~" }, "~"),
                            React.createElement("div", { className: "char_block", title: "\u00A0" }, "\u00A0"),
                            React.createElement("div", { className: "char_block", title: "\u00A1" }, "\u00A1"),
                            React.createElement("div", { className: "char_block", title: "\u00A2" }, "\u00A2"),
                            React.createElement("div", { className: "char_block", title: "\u00A3" }, "\u00A3"),
                            React.createElement("div", { className: "char_block", title: "\u00A4" }, "\u00A4"),
                            React.createElement("div", { className: "char_block", title: "\u00A5" }, "\u00A5"),
                            React.createElement("div", { className: "char_block", title: "\u20B9" }, "\u20B9"),
                            React.createElement("div", { className: "char_block", title: "\u00A6" }, "\u00A6"),
                            React.createElement("div", { className: "char_block", title: "\u00A7" }, "\u00A7"),
                            React.createElement("div", { className: "char_block", title: "\u00A8" }, "\u00A8"),
                            React.createElement("div", { className: "char_block", title: "\u00A9" }, "\u00A9"),
                            React.createElement("div", { className: "char_block", title: "\u00AA" }, "\u00AA"),
                            React.createElement("div", { className: "char_block", title: "\u00AB" }, "\u00AB"),
                            React.createElement("div", { className: "char_block", title: "\u00AC" }, "\u00AC"),
                            React.createElement("div", { className: "char_block", title: "\u00AD" }, "\u00AD"),
                            React.createElement("div", { className: "char_block", title: "\u00AE" }, "\u00AE"),
                            React.createElement("div", { className: "char_block", title: "\u00AF" }, "\u00AF"),
                            React.createElement("div", { className: "char_block", title: "\u00B0" }, "\u00B0"),
                            React.createElement("div", { className: "char_block", title: "\u00B1" }, "\u00B1"),
                            React.createElement("div", { className: "char_block", title: "\u00B2" }, "\u00B2"),
                            React.createElement("div", { className: "char_block", title: "\u00B3" }, "\u00B3"),
                            React.createElement("div", { className: "char_block", title: "\u00B4" }, "\u00B4"),
                            React.createElement("div", { className: "char_block", title: "\u00B5" }, "\u00B5"),
                            React.createElement("div", { className: "char_block", title: "\u00B6" }, "\u00B6"),
                            React.createElement("div", { className: "char_block", title: "\u00B7" }, "\u00B7"),
                            React.createElement("div", { className: "char_block", title: "\u00B8" }, "\u00B8"),
                            React.createElement("div", { className: "char_block", title: "\u00B9" }, "\u00B9"),
                            React.createElement("div", { className: "char_block", title: "\u00BA" }, "\u00BA"),
                            React.createElement("div", { className: "char_block", title: "\u00BB" }, "\u00BB"),
                            React.createElement("div", { className: "char_block", title: "\u00BC" }, "\u00BC"),
                            React.createElement("div", { className: "char_block", title: "\u00BD" }, "\u00BD"),
                            React.createElement("div", { className: "char_block", title: "\u00BE" }, "\u00BE"),
                            React.createElement("div", { className: "char_block", title: "\u00BF" }, "\u00BF"),
                            React.createElement("div", { className: "char_block", title: "\u00C0" }, "\u00C0"),
                            React.createElement("div", { className: "char_block", title: "\u00C1" }, "\u00C1"),
                            React.createElement("div", { className: "char_block", title: "\u00C2" }, "\u00C2"),
                            React.createElement("div", { className: "char_block", title: "\u00C3" }, "\u00C3"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample shows how to add your own commands to toolbar of the rich text editor. The ",
                    React.createElement("code", null, "\u201C\u03A9\u201D "),
                    "  command is added to insert special characters in the editor. Click the \u201C\u03A9\u201D command to show the special characters list, and then choose the character to be inserted in the editor.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The rich text editor allows you to configure your own commands to its toolbar using ",
                    React.createElement("code", null, "toolbarSettings"),
                    " property. The command can be plain text, icon, or HTML template. You can also define the order and group where the command should be included. Bind the action to the command by getting its instance. "),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, HtmlEditor, QuickToolbar"),
                    " modules into the services."))));
    };
    return InsertSpecialCharacters;
}(sample_base_1.SampleBase));
exports.InsertSpecialCharacters = InsertSpecialCharacters;
