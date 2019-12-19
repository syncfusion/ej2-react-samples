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
require("./uploader.css");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default(props) {
        var _this = _super.call(this, props) || this;
        _this.dropContainerEle = null;
        _this.dropContainerRef = function (element) {
            _this.dropContainerEle = element;
        };
        _this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        return _this;
    }
    Default.prototype.rendereComplete = function () {
        this.uploadObj.dropArea = this.dropContainerEle;
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
        this.uploadObj.dataBind();
    };
    Default.prototype.onChange = function (args) {
        this.uploadObj.autoUpload = args.checked;
        this.uploadObj.clearAll();
    };
    Default.prototype.onChanged = function (args) {
        this.uploadObj.sequentialUpload = args.checked;
        this.uploadObj.clearAll();
    };
    Default.prototype.onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane', ref: this.dropContainerRef },
            React.createElement("div", { className: 'control-section row uploadpreview' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement("div", { className: 'upload_wrapper' },
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: function (scope) { _this.uploadObj = scope; }, asyncSettings: this.asyncSettings, removing: this.onRemoveFile.bind(this) }))),
                React.createElement("div", { className: 'property-section col-lg-3' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("div", { className: 'panel-style' },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Auto Upload', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChange.bind(this) })),
                        React.createElement("div", { className: 'panel-style' },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: 'Sequential Upload', ref: function (scope) { _this.checkboxObj1 = scope; }, change: this.onChanged.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the default functionalities of the file upload component with auto upload and sequential upload options. Browse or drag-and-drop the files which you want to upload to the server and upload it.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Uploader component is useful to upload images, documents, and other files. By default, the component allows to upload multiple files to browse and upload it to server. The selected files append to the file list that contains file details such as name, type, and size."),
                React.createElement("p", null, "You can manage the files in server after received the uploaded files. When the files are successfully uploaded to server, the remove button will be change to bin button. The uploaded files can be removed by click on the bin button."),
                React.createElement("p", null, "The progress bar displays for each file upload to denote its upload progress. Once the file upload gets success, the progress bar disappear and corresponding upload status message will be displayed in same place."),
                React.createElement("p", null,
                    "More information on the Uploader instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
