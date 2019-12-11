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
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ej2_react_richtexteditor_2 = require("@syncfusion/ej2-react-richtexteditor");
require("./image.css");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ImageSample = /** @class */ (function (_super) {
    __extends(ImageSample, _super);
    function ImageSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = "Blob";
        _this.fields = { text: "text", value: "value" };
        _this.formatData = [
            { text: 'Blob', value: 'Blob' },
            { text: 'Base64', value: 'Base64' }
        ];
        _this.image = ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
            'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
            {
                tooltipText: 'Rotate Left',
                template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
            },
            {
                tooltipText: 'Rotate Right',
                template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
            }];
        _this.quickToolbarSettings = {
            image: _this.image
        };
        _this.onCheckChange = function (args) {
            _this.rteObj.enableAutoUrl = args.checked;
        };
        _this.ondropChange = function () {
            if (_this.formatdrop.value === 'Base64') {
                _this.rteObj.insertImageSettings.saveFormat = 'Base64';
            }
            else {
                _this.rteObj.insertImageSettings.saveFormat = 'Blob';
            }
        };
        return _this;
    }
    ImageSample.prototype.onToolbarClick = function (e) {
        var nodeObj = new ej2_react_richtexteditor_2.NodeSelection();
        var range = nodeObj.getRange(this.rteObj.contentModule.getDocument());
        var imgEle = nodeObj.getNodeCollection(range)[0];
        if (e.item.tooltipText === 'Rotate Right') {
            var transform = (imgEle.style.transform === '') ? 0 :
                parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
        }
        else if (e.item.tooltipText === 'Rotate Left') {
            var transform = (imgEle.style.transform === '') ? 0 :
                Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
        }
    };
    ImageSample.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'control-section', id: "rteAPI" },
                    React.createElement("div", { className: 'rte-control-section' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "imageRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, toolbarClick: this.onToolbarClick.bind(this), quickToolbarSettings: this.quickToolbarSettings },
                            React.createElement("p", null, "Rich Text Editor allows to insert images from online source as well as local computer where you want to insert the image in your content."),
                            React.createElement("p", null,
                                React.createElement("b", null, "Get started Quick Toolbar to click on the image")),
                            React.createElement("p", null, "It is possible to add custom style on the selected image inside the RichTextEditor through quick toolbar."),
                            React.createElement("img", { id: 'rteImageID', style: { width: '300px', height: '300px', transform: 'rotate(0deg)' }, alt: "Logo", src: "./src/rich-text-editor/images/RTEImage-Feather.png" }),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar] }))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', margin: '10px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "EnableAutoUrl")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, ref: function (scope) { _this.readonly = scope; }, change: this.onCheckChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Save Format ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "formattingOption", dataSource: this.formatData, ref: function (dropdownlist) { _this.formatdrop = dropdownlist; }, fields: this.fields, change: this.ondropChange.bind(this), value: this.value, popupHeight: "200px" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the option to insert the image to the RichTextEditor content. Click the image button from the toolbar item to insert the image.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Image tools used to insert an image to the RichTextEditor and click on the image to easily customize the image using quick toolbar. The quick toolbar has the following items"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Replace"),
                        " \u2013 can replace the image with some other image."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Align"),
                        " \u2013 Align the image with left, right and justify."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Image captions"),
                        " \u2013 set the captions for the image."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Change size"),
                        " \u2013 modify width and height of image."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " \u2013 delete the image."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Link"),
                        " \u2013 provide the link to the image."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Display"),
                        " - display the image as inline or with break."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Alternate text"),
                        " \u2013 provide the alternative text for the image if the image is not present in the location."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Custom Tools"),
                        " - \"rotation\" related commands are added as custom commands to the image element"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Resize"),
                        " \u2013 can resize the image dimension with resize options.")),
                "Quick commands are opened as context-menu on clicking the corresponding element. The commands must be passed as string collection to image, text, and link attributes of the quickToolbarSettings property.",
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module:")),
                React.createElement("p", null,
                    "RichTextEditor component features are segregated into individual feature-wise modules. To use image tool, we need to inject ",
                    React.createElement("code", null, "Image"),
                    " modules into the services."))));
    };
    return ImageSample;
}(sample_base_1.SampleBase));
exports.ImageSample = ImageSample;
