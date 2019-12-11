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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./uploader.css");
var Validation = /** @class */ (function (_super) {
    __extends(Validation, _super);
    function Validation(props) {
        var _this = _super.call(this, props) || this;
        _this.dropContainerEle = null;
        _this.dropContainerRef = function (element) {
            _this.dropContainerEle = element;
        };
        _this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        _this.minFileSize = 10000;
        _this.autoUpload = false;
        _this.allowedExtensions = '.doc, .docx, .xls, .xlsx';
        return _this;
    }
    Validation.prototype.rendereComplete = function () {
        this.uploadObj.dropArea = this.dropContainerEle;
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
        this.uploadObj.dataBind();
    };
    Validation.prototype.onFileSelected = function (args) {
        args.filesData.splice(5);
        var filesData = this.uploadObj.getFilesData();
        var allFiles = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (var i = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            args.modifiedFilesData = args.filesData;
        }
        args.isModified = true;
    };
    Validation.prototype.onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    Validation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane', ref: this.dropContainerRef },
            React.createElement("div", { className: 'control-section col-lg-12 uploadpreview' },
                React.createElement("div", { className: 'upload_wrapper' },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'validation', type: 'file', ref: function (scope) { _this.uploadObj = scope; }, asyncSettings: this.asyncSettings, selected: this.onFileSelected.bind(this), minFileSize: this.minFileSize, autoUpload: this.autoUpload, removing: this.onRemoveFile.bind(this), allowedExtensions: this.allowedExtensions }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to validate the files before uploading it to server. Only document files (DOC, DOCX, XLS, XLSX), and the files should contain minimum 10 KB and maximum 28 MB sizes to upload it into server.This sample limits maximum files count as 5 to upload.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Uploader component allows to validate the file\u2019s type, and limit the file size using allowedExtensions, minFileSize, and maxFileSize properties. You can also achieve limit the files count before uploading it using select event. "),
                React.createElement("p", null,
                    "For more information, you can refer to the Validation section from this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/validation/" }, "documentation section"),
                    "."))));
    };
    return Validation;
}(sample_base_1.SampleBase));
exports.Validation = Validation;
