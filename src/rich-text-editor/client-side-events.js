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
 * RichTextEditor events sample
 */
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./rte-events.css");
var RTEEvents = /** @class */ (function (_super) {
    __extends(RTEEvents, _super);
    function RTEEvents(props) {
        var _this = _super.call(this, props) || this;
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|', 'CreateTable',
            'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.EventLogRef = function (element) {
            _this.EventLogEle = element;
        };
        return _this;
    }
    RTEEvents.prototype.ClearClick = function () {
        this.EventLogEle.innerHTML = '';
    };
    RTEEvents.prototype.create = function () {
        this.appendElement('RichTextEditor <b>create</b> event called<hr>');
    };
    RTEEvents.prototype.actionBegin = function (args) {
        this.appendElement('<b>' + args.requestType + '</b> action is called<hr>');
        this.handleFullScreen(args);
    };
    RTEEvents.prototype.actionComplete = function (args) {
        this.appendElement('<b>' + args.requestType + '</b> action is completed<hr>');
        this.actionCompleteHandler();
    };
    RTEEvents.prototype.focus = function () {
        this.appendElement('RichTextEditor <b>focus</b> event called<hr>');
    };
    RTEEvents.prototype.blur = function () {
        this.appendElement('RichTextEditor <b>blur</b> event called<hr>');
    };
    RTEEvents.prototype.change = function () {
        this.appendElement('RichTextEditor <b>change</b> event called<hr>');
    };
    RTEEvents.prototype.toolbarClick = function () {
        this.appendElement('RichTextEditor <b>toolbar click</b> event called<hr>');
    };
    RTEEvents.prototype.beforeDialogOpen = function () {
        this.appendElement('RichTextEditor <b>beforeDialogOpen</b> event called<hr>');
    };
    RTEEvents.prototype.dialogOpen = function () {
        this.appendElement('RichTextEditor <b>dialogOpen</b> event called<hr>');
    };
    RTEEvents.prototype.dialogClose = function () {
        this.appendElement('RichTextEditor <b>dialogClose</b> event called<hr>');
    };
    RTEEvents.prototype.beforeQuickToolbarOpen = function () {
        this.appendElement('RichTextEditor <b>beforeQuickToolbarOpen</b> event called<hr>');
    };
    RTEEvents.prototype.quickToolbarOpen = function () {
        this.appendElement('RichTextEditor <b>quickToolbarOpen</b> event called<hr>');
    };
    RTEEvents.prototype.quickToolbarClose = function () {
        this.appendElement('RichTextEditor <b>quickToolbarClose</b> event called<hr>');
    };
    RTEEvents.prototype.imageSelected = function () {
        this.appendElement('RichTextEditor <b>imageSelected</b> event called<hr>');
    };
    RTEEvents.prototype.imageUploading = function () {
        this.appendElement('RichTextEditor <b>imageUploading</b> event called<hr>');
    };
    RTEEvents.prototype.imageUploadSuccess = function () {
        this.appendElement('RichTextEditor <b>imageUploadSuccess</b> event called<hr>');
    };
    RTEEvents.prototype.imageUploadFailed = function () {
        this.appendElement('RichTextEditor <b>imageUploadFailed</b> event called<hr>');
    };
    RTEEvents.prototype.imageRemoving = function () {
        this.appendElement('RichTextEditor <b>imageRemoving</b> event called<hr>');
    };
    RTEEvents.prototype.destroyed = function () {
        this.appendElement('RichTextEditor <b>destroyed</b> event called<hr>');
    };
    RTEEvents.prototype.beforeSanitizeHtml = function () {
        this.appendElement('RichTextEditor <b>beforeSanitizeHtml</b> event called<hr>');
    };
    RTEEvents.prototype.resizing = function () {
        this.appendElement('RichTextEditor <b>resizing</b> event called<hr>');
    };
    RTEEvents.prototype.resizeStart = function () {
        this.appendElement('RichTextEditor <b>resizeStart</b> event called<hr>');
    };
    RTEEvents.prototype.resizeStop = function () {
        this.appendElement('RichTextEditor <b>resizeStop</b> event called<hr>');
    };
    RTEEvents.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        this.EventLogEle.insertBefore(span, this.EventLogEle.firstChild);
    };
    RTEEvents.prototype.handleFullScreen = function (e) {
        var sbCntEle = document.querySelector('.sb-content.e-view');
        var sbHdrEle = document.querySelector('.sb-header.e-view');
        var leftBar;
        var transformElement;
        if (ej2_base_1.Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (ej2_base_1.Browser.isDevice && ej2_base_1.Browser.isIos) {
                ej2_base_1.addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            ej2_base_1.addClass([leftBar], ['e-close']);
            ej2_base_1.removeClass([leftBar], ['e-open']);
            if (!ej2_base_1.Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
            if (ej2_base_1.Browser.isDevice && ej2_base_1.Browser.isIos) {
                ej2_base_1.removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            ej2_base_1.removeClass([leftBar], ['e-close']);
            if (!ej2_base_1.Browser.isDevice) {
                ej2_base_1.addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    };
    RTEEvents.prototype.actionCompleteHandler = function () {
        var _this = this;
        setTimeout(function () {
            _this.rteObj.toolbarModule.refreshToolbarOverflow();
        }, 400);
    };
    RTEEvents.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section', id: 'rteEvent' },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "clientsideRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, toolbarSettings: this.toolbarSettings, created: this.create.bind(this), actionBegin: this.actionBegin.bind(this), actionComplete: this.actionComplete.bind(this), focus: this.focus.bind(this), blur: this.blur.bind(this), change: this.change.bind(this), toolbarClick: this.toolbarClick.bind(this), beforeDialogOpen: this.beforeDialogOpen.bind(this), dialogOpen: this.dialogOpen.bind(this), dialogClose: this.dialogClose.bind(this), beforeQuickToolbarOpen: this.beforeQuickToolbarOpen.bind(this), quickToolbarOpen: this.quickToolbarOpen.bind(this), quickToolbarClose: this.quickToolbarClose.bind(this), imageSelected: this.imageSelected.bind(this), imageUploading: this.imageUploading.bind(this), imageUploadSuccess: this.imageUploadSuccess.bind(this), imageUploadFailed: this.imageUploadFailed.bind(this), imageRemoving: this.imageRemoving.bind(this), destroyed: this.destroyed.bind(this), beforeSanitizeHtml: this.beforeSanitizeHtml.bind(this), resizing: this.resizing.bind(this), resizeStart: this.resizeStart.bind(this), resizeStop: this.resizeStop.bind(this) },
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
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.QuickToolbar] })))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "rteEventProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Event Trace", className: 'property-panel-table rte-event-panel' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "eventarea", style: { height: '245px', overflow: 'auto' } },
                                        React.createElement("span", { className: "EventLog", ref: this.EventLogRef, id: "EventLog", style: { wordBreak: 'normal' } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "evtbtn", style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", ref: function (btn) { _this.clear = btn; }, onClick: this.ClearClick.bind(this) }, "Clear")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the events that trigger on every action of the rich text editor. The event details are showcased in the event trace panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The rich text editor triggers the events based on its actions. The events can be used as an extension point to perform custom operations."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "change"),
                        " - Triggers when the editor gets blurred and changes are made to the content."),
                    React.createElement("li", null,
                        React.createElement("code", null, "focus"),
                        " - Triggers when the editor is in focus."),
                    React.createElement("li", null,
                        React.createElement("code", null, "blur"),
                        " - Triggers when focused out of the editor."),
                    React.createElement("li", null,
                        React.createElement("code", null, "actionBegin"),
                        " - Triggers before the execution of command."),
                    React.createElement("li", null,
                        React.createElement("code", null, "actionComplete"),
                        " - Triggers after the execution of command."),
                    React.createElement("li", null,
                        React.createElement("code", null, "created"),
                        " - Triggers when the component is created."),
                    React.createElement("li", null,
                        React.createElement("code", null, "beforeDialogOpen"),
                        " \u2013 Event triggers when the dialog is being opened.."),
                    React.createElement("li", null,
                        React.createElement("code", null, "dialogOpen"),
                        " \u2013 Event triggers when a dialog is opened."),
                    React.createElement("li", null,
                        React.createElement("code", null, "dialogClose"),
                        " \u2013 Event triggers after the dialog has been closed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "beforeQuickToolbarOpen"),
                        " \u2013 Event triggers when the quick toolbar is being opened."),
                    React.createElement("li", null,
                        React.createElement("code", null, "quickToolbarOpen"),
                        " \u2013 Event triggers when a quick toolbar is opened."),
                    React.createElement("li", null,
                        React.createElement("code", null, "quickToolbarClose"),
                        " \u2013 Event triggers after the quick toolbar has been closed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "imageSelected"),
                        " \u2013 Event triggers when the image is selected or dragged into the insert image dialog"),
                    React.createElement("li", null,
                        React.createElement("code", null, "imageUploading"),
                        " \u2013 Event triggers when the selected image begins to upload in the insert image dialog"),
                    React.createElement("li", null,
                        React.createElement("code", null, "imageUploadSuccess"),
                        " \u2013 Event triggers when the image is successfully uploaded to the server side"),
                    React.createElement("li", null,
                        React.createElement("code", null, "imageUploadFailed"),
                        " \u2013 Event triggers when there is an error in the image upload"),
                    React.createElement("li", null,
                        React.createElement("code", null, "imageRemoving"),
                        " \u2013 Event triggers when the selected image is cleared from the insert image dialog"),
                    React.createElement("li", null,
                        React.createElement("code", null, "destroyed"),
                        " \u2013 Triggers when the component is destroyed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "beforeSanitizeHtml"),
                        " \u2013 Event triggers before sanitize the value. It's only applicable to editorMode as `HTML`"),
                    React.createElement("li", null,
                        React.createElement("code", null, "resizing"),
                        " \u2013 Triggers only when resizing the image"),
                    React.createElement("li", null,
                        React.createElement("code", null, "resizeStart"),
                        " \u2013Triggers only when start resize the image"),
                    React.createElement("li", null,
                        React.createElement("code", null, "resizeStop"),
                        " \u2013 Triggers only when stop resize the image")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, HtmlEditor, QuickToolbar"),
                    " modules into the services."))));
    };
    return RTEEvents;
}(sample_base_1.SampleBase));
exports.RTEEvents = RTEEvents;
