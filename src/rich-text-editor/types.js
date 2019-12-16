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
 * RichTextEditor toolbar types sample
 */
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./types.css");
var Type = /** @class */ (function (_super) {
    __extends(Type, _super);
    function Type() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // RichTextEditor items list
        _this.items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|',
            'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        _this.toolbarSettings = {
            type: ej2_react_richtexteditor_1.ToolbarType.Expand,
            items: _this.items,
            enableFloating: false
        };
        _this.ddlValue = [
            { Id: '1', Text: 'Expand' },
            { Id: '2', Text: 'MultiRow' }
        ];
        // maps the appropriate column to fields property
        _this.fields = { text: 'Text', value: 'Id' };
        // set the value to select an item based on mapped value at initial rendering
        _this.ddlSelectedValue = '1';
        return _this;
    }
    Type.prototype.onChange = function (args) {
        switch (args.value) {
            case '1':
                this.rteObj.toolbarSettings.type = ej2_react_richtexteditor_1.ToolbarType.Expand;
                break;
            case '2':
                this.rteObj.toolbarSettings.type = ej2_react_richtexteditor_1.ToolbarType.MultiRow;
                break;
        }
    };
    Type.prototype.onFloatChange = function (args) {
        this.rteObj.toolbarSettings.enableFloating = args.checked;
    };
    Type.prototype.handleFullScreen = function (e) {
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
    Type.prototype.actionCompleteHandler = function () {
        var _this = this;
        setTimeout(function () { _this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
    };
    Type.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'rteTypes' },
                React.createElement("div", { className: 'col-lg-8', style: { paddingBottom: '20px' } },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "typesRTE", ref: function (scope) { _this.rteObj = scope; }, floatingToolbarOffset: 0, toolbarSettings: this.toolbarSettings, actionBegin: this.handleFullScreen.bind(this), actionComplete: this.actionCompleteHandler.bind(this) },
                        React.createElement("p", null, "The rich text editor is WYSIWYG (\"what you see is what you get\") editor useful to create and edit content, and return the valid HTML markup or markdown of the content"),
                        React.createElement("p", null,
                            React.createElement("b", null, "Toolbar")),
                        React.createElement("ol", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "Toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo operations, HTML view, etc ")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Toolbar is fully customizable "))),
                        React.createElement("p", null,
                            React.createElement("b", null, "Links")),
                        React.createElement("ol", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "You can insert a hyperlink with its corresponding dialog ")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Attach a hyperlink to the displayed text. ")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Customize the quick toolbar based on the hyperlink "))),
                        React.createElement("p", null,
                            React.createElement("b", null, "Validation")),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "The editor\u2019s content can be validated on form submission by applying validation rules and validation message"))),
                        React.createElement("p", null,
                            React.createElement("b", null, "Locale.")),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "The editor provides an option to localize its static strings to adapt the editor to a local language."))),
                        React.createElement("p", null,
                            React.createElement("b", null, "Image.")),
                        React.createElement("ol", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "Allows you to insert images from an online source as well as the local computer ")),
                            React.createElement("li", null,
                                React.createElement("p", null, "You can upload an image ")),
                            React.createElement("li", null,
                                React.createElement("p", null, "Provides an option to customize quick toolbar for an image "))),
                        React.createElement("img", { alt: "Logo", src: "./src/rich-text-editor/images/RTEImage-Feather.png" }),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.QuickToolbar] }))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', margin: '10px' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: '10px', paddingBottom: '10px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "types", dataSource: this.ddlValue, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, fields: this.fields, change: this.onChange.bind(this), floatLabelType: 'Auto', placeholder: "Types", index: 0, popupHeight: '220px' })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: '10px' } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: 'Enable Floating', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onFloatChange.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the different behavior of toolbar support in the rich text editor. Change the toolbar type as multiRow or expand from the property panel to see its appearance . Check or uncheck the floating toolbar in property panel to look on its behavior.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("code", null, "Floating"),
                    ": set boolean value to toolbarSettings.enableFloating property to enable or disable the floating toolbar."),
                React.createElement("p", null,
                    " The rich text editor allows you to configure different types of toolbar using ",
                    React.createElement("code", null, "toolbarSettings.type"),
                    " property. The types of toolbar are: "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Expand"),
                        ": The toolbar hides the overflowing items in the next row. Click the expand arrow to view overflowing toolbar items"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Multi Row"),
                        ": The toolbar hides the overflowing items in the next row.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar"),
                    " modules into the services."))));
    };
    return Type;
}(sample_base_1.SampleBase));
exports.Type = Type;
