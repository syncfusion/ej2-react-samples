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
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./custom-drop-area.css");
var Customdroparea = (function (_super) {
    __extends(Customdroparea, _super);
    function Customdroparea(props) {
        var _this = _super.call(this, props) || this;
        _this.animationSettings = { effect: 'Zoom' };
        _this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        _this.allowedExtensions = '.pdf, .png, .txt';
        _this.animationSettings = { effect: 'Zoom' };
        return _this;
    }
    Customdroparea.prototype.rendereComplete = function () {
        var _this = this;
        this.target = document.getElementById("customTarget");
        this.uploadObj.dropArea = this.target;
        document.getElementById('browse').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        document.getElementById('customdropArea').onclick = function (args) {
            var target = args.target;
            if (target.classList.contains('e-file-delete-btn')) {
                for (var i = 0; i < _this.uploadObj.getFilesData().length; i++) {
                    if (target.parentElement.parentElement.getAttribute('data-file-name') === _this.uploadObj.getFilesData()[i].name) {
                        _this.uploadObj.remove(_this.uploadObj.getFilesData()[i]);
                    }
                }
            }
            else if (target.classList.contains('e-file-remove-btn')) {
                ej2_base_1.detach(target.parentElement.parentElement);
            }
        };
    };
    Customdroparea.prototype.listTemplate = function (data) {
        return (React.createElement("span", null,
            React.createElement("span", { className: 'fileListwrapper' },
                React.createElement("span", { className: "icon template-icons sf-icon-" + data.type }),
                React.createElement("span", { className: 'upload-name file-name' },
                    data.name,
                    " (",
                    data.size,
                    " bytes)"),
                React.createElement("span", { className: 'upload-status' }, data.status)),
            React.createElement("span", { className: 'e-icons e-file-remove-btn', title: 'Remove' })));
    };
    Customdroparea.prototype.onUploadSuccess = function (args) {
        var li = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-success');
    };
    Customdroparea.prototype.onUploadFailed = function (args) {
        var li = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-failed');
    };
    Customdroparea.prototype.onUploadInProgress = function (args) {
        var progressValue = Math.round((args.e.loaded / args.e.total) * 100) + '%';
        var li = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status + '(' + progressValue + ' )';
    };
    Customdroparea.prototype.onSelect = function (args) {
        var allowedTypes = ['pdf', 'png', 'txt'];
        var modifiedFiles = [];
        for (var _i = 0, _a = args.filesData; _i < _a.length; _i++) {
            var file = _a[_i];
            if (allowedTypes.indexOf(file.type.toLowerCase()) > -1) {
                modifiedFiles.push(file);
            }
        }
        if (modifiedFiles.length > 0) {
            args.isModified = true;
            args.modifiedFiles = modifiedFiles;
        }
        else {
            args.cancel = true;
        }
    };
    Customdroparea.prototype.getLiElement = function (args) {
        var liElements = document.getElementsByClassName('e-upload')[0].querySelectorAll('.e-upload-files > li');
        var li;
        for (var i = 0; i < liElements.length; i++) {
            if (liElements[i].getAttribute('data-file-name') === args.file.name) {
                li = liElements[i];
            }
        }
        return li;
    };
    Customdroparea.prototype.onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    Customdroparea.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row uploadpreview' },
                React.createElement("div", { className: 'col-lg-12 control-section upload-custom' },
                    React.createElement("div", { className: 'customdrop_wrapper' },
                        React.createElement("div", { className: "dropArea_wrap", id: "customTarget" },
                            React.createElement("div", { className: "font-icons" },
                                React.createElement("span", { className: "e-icons sf-icon-pdf" }),
                                React.createElement("span", { className: "e-icons sf-icon-txt" }),
                                React.createElement("span", { className: "e-icons sf-icon-png" })),
                            React.createElement("span", { className: "dropText", id: "dropText" }, "Drop files here to upload")),
                        React.createElement("div", { id: "customdropArea" },
                            React.createElement("span", { id: "drop", className: "customdropArea" },
                                React.createElement("a", { href: "", id: "browse" },
                                    React.createElement("u", null, "Browse")),
                                " "),
                            React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'UploadFiles', type: 'file', ref: function (scope) { _this.uploadObj = scope; }, asyncSettings: this.asyncSettings, selected: this.onSelect.bind(this), removing: this.onRemoveFile.bind(this), progress: this.onUploadInProgress.bind(this), success: this.onUploadSuccess.bind(this), failure: this.onUploadFailed.bind(this), allowedExtensions: this.allowedExtensions, template: this.listTemplate, dropArea: this.target }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " This example demonstrates how to configure custom drop area of the Uploader. You can drop the files into specified custom drop area location to upload.  ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Uploader component allows to set any external element as drop area using the \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/uploader/#droparea" }, "dropArea"),
                    " property."),
                React.createElement("p", null,
                    "More information on the drag-and-drop can be found on this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/file-source/#drag-and-drop" }, " documentation section"),
                    "."))));
    };
    return Customdroparea;
}(sample_base_1.SampleBase));
exports.Customdroparea = Customdroparea;
