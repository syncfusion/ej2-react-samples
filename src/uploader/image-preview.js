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
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./image-preview.css");
var Preview = (function (_super) {
    __extends(Preview, _super);
    function Preview(props) {
        var _this = _super.call(this, props) || this;
        // Uploader component
        _this.filesDetails = [];
        _this.filesList = [];
        _this.filesName = [];
        _this.dropAreaEle = null;
        _this.dropContainerEle = null;
        _this.dropImageEle = null;
        _this.dropContainerRef = function (element) {
            _this.dropContainerEle = element;
        };
        _this.dropAreaRef = function (element) {
            _this.dropAreaEle = element;
        };
        _this.dropImageRef = function (element) {
            _this.dropImageEle = element;
        };
        _this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        _this.allowedExtensions = '.jpg,.png,.jpeg';
        return _this;
    }
    Preview.prototype.rendereComplete = function () {
        var _this = this;
        this.dropArea = this.dropAreaEle;
        this.dropElement = this.dropContainerEle;
        if (ej2_base_1.Browser.isDevice) {
            this.dropImageEle.style.padding = '0px 10%';
        }
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
        document.getElementById('browse').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        document.getElementById('clearbtn').onclick = function () {
            if (!_this.dropElement.querySelector('ul')) {
                return;
            }
            ej2_base_1.detach(_this.dropElement.querySelector('ul'));
            _this.filesList = [];
            _this.filesDetails = [];
            _this.filesName = [];
            if (_this.dropArea.classList.contains('e-spinner-pane')) {
                ej2_react_popups_1.hideSpinner(_this.dropArea);
                ej2_base_1.detach(_this.dropElement.querySelector('.e-spinner-pane'));
            }
        };
        document.getElementById('uploadbtn').onclick = function () {
            if (_this.dropElement.querySelector('ul') && _this.filesDetails.length > 0) {
                _this.uploadObj.upload(_this.filesDetails, true);
            }
        };
        this.uploadObj.dropArea = this.dropElement;
        this.uploadObj.dataBind();
    };
    Preview.prototype.onSelect = function (args) {
        if (!this.dropElement.querySelector('li')) {
            this.filesDetails = [];
        }
        if (ej2_base_1.isNullOrUndefined(this.dropArea.querySelector('.e-upload-files'))) {
            this.parentElement = ej2_base_1.createElement('ul', { className: 'e-upload-files' });
            document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
        }
        var validFiles = this.validateFiles(args, this.filesDetails);
        if (validFiles.length === 0) {
            args.cancel = true;
            return;
        }
        for (var i = 0; i < validFiles.length; i++) {
            this.formSelectedData(validFiles[i], this);
        }
        this.filesDetails = this.filesDetails.concat(validFiles);
        args.cancel = true;
    };
    Preview.prototype.validateFiles = function (args, viewedFiles) {
        var modifiedFiles = [];
        var validFiles = [];
        var isModified = false;
        if (args.event.type === 'drop') {
            isModified = true;
            var allImages = ['png', 'jpg', 'jpeg'];
            var files_1 = args.filesData;
            for (var _i = 0, files_2 = files_1; _i < files_2.length; _i++) {
                var file = files_2[_i];
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        var files = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
        if (this.filesName.length > 0) {
            for (var _a = 0, files_3 = files; _a < files_3.length; _a++) {
                var file = files_3[_a];
                if (this.filesName.indexOf(file.name) === -1) {
                    this.filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        }
        else {
            for (var _b = 0, files_4 = files; _b < files_4.length; _b++) {
                var file = files_4[_b];
                this.filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    };
    Preview.prototype.formSelectedData = function (file, proxy) {
        var liEle = ej2_base_1.createElement('li', { className: 'e-upload-file-list', attrs: { 'data-file-name': file.name } });
        var imageTag = ej2_base_1.createElement('IMG', { className: 'upload-image', attrs: { 'alt': 'Image' } });
        var wrapper = ej2_base_1.createElement('span', { className: 'wrapper' });
        wrapper.appendChild(imageTag);
        liEle.appendChild(wrapper);
        liEle.appendChild(ej2_base_1.createElement('div', { className: 'file-name', innerHTML: file.name, attrs: { 'title': file.name } }));
        liEle.appendChild(ej2_base_1.createElement('div', { className: 'file-size', innerHTML: proxy.uploadObj.bytesToSize(file.size) }));
        var clearbtn;
        var uploadbtn;
        clearbtn = ej2_base_1.createElement('span', { id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: { 'title': 'Remove' } });
        ej2_base_1.EventHandler.add(clearbtn, 'click', this.removeFiles, proxy);
        liEle.setAttribute('title', 'Ready to Upload');
        uploadbtn = ej2_base_1.createElement('span', { className: 'e-upload-icon e-icons e-file-remove-btn', attrs: { 'title': 'Upload' } });
        uploadbtn.setAttribute('id', 'iconUpload');
        ej2_base_1.EventHandler.add(uploadbtn, 'click', this.uploadFile, proxy);
        var progressbarContainer;
        progressbarContainer = ej2_base_1.createElement('progress', { className: 'progressbar', id: 'progressBar', attrs: { value: '0', max: '100' } });
        liEle.appendChild(clearbtn);
        liEle.appendChild(uploadbtn);
        liEle.appendChild(progressbarContainer);
        this.readURL(liEle, file);
        document.querySelector('.e-upload-files').appendChild(liEle);
        proxy.filesList.push(liEle);
    };
    Preview.prototype.uploadFile = function (args) {
        this.uploadObj.upload([this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]], true);
    };
    Preview.prototype.removeFiles = function (args) {
        var removeFile = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)];
        var statusCode = removeFile.statusCode;
        if (statusCode === '2' || statusCode === '1') {
            this.uploadObj.remove(removeFile, true);
            this.uploadObj.element.value = '';
        }
        var index = this.filesList.indexOf(args.currentTarget.parentElement);
        this.filesList.splice(index, 1);
        this.filesDetails.splice(index, 1);
        this.filesName.splice(this.filesName.indexOf(removeFile.name), 1);
        if (statusCode !== '2') {
            ej2_base_1.detach(args.currentTarget.parentElement);
        }
    };
    Preview.prototype.onFileUpload = function (args) {
        var li = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        var iconEle = li.querySelector('#iconUpload');
        iconEle.style.cursor = 'not-allowed';
        iconEle.classList.add('e-uploaded');
        ej2_base_1.EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        var progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
            li.getElementsByTagName('progress')[0].value = progressValue;
        }
    };
    Preview.prototype.onUploadSuccess = function (args) {
        var _this = this;
        var spinnerElement = document.getElementById('dropArea');
        var li = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !ej2_base_1.isNullOrUndefined(li.querySelector('.progressbar'))) {
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
        if (args.operation === 'upload') {
            ej2_base_1.EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = function () {
                _this.generateSpinner(_this.dropArea);
            };
        }
        else {
            ej2_base_1.detach(li);
            ej2_react_popups_1.hideSpinner(spinnerElement);
            ej2_base_1.detach(spinnerElement.querySelector('.e-spinner-pane'));
        }
        if (!ej2_base_1.isNullOrUndefined(li)) {
            li.setAttribute('title', args.e.currentTarget.statusText);
        }
    };
    Preview.prototype.generateSpinner = function (targetElement) {
        ej2_react_popups_1.createSpinner({ target: targetElement, width: '25px' });
        ej2_react_popups_1.showSpinner(targetElement);
    };
    Preview.prototype.onUploadFailed = function (args) {
        var li = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        li.querySelector('.file-name').style.color = 'red';
        li.setAttribute('title', args.e.currentTarget.statusText);
        if (args.operation === 'upload') {
            ej2_base_1.EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
    };
    Preview.prototype.readURL = function (li, args) {
        var preview = li.querySelector('.upload-image');
        var file = args.rawFile;
        var reader = new FileReader();
        reader.addEventListener('load', function () { preview.src = reader.result; }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    Preview.prototype.onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    Preview.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane', ref: this.dropContainerRef },
            React.createElement("div", { className: 'control-section', id: 'uploadpreview' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement("div", { className: 'imagepreview' },
                        React.createElement("div", { id: 'dropArea', ref: this.dropAreaRef, className: 'dropTarget' },
                            React.createElement("span", { id: 'dropimage', ref: this.dropImageRef, className: 'file-name-drop' },
                                " Drop image (JPG, PNG) files here or ",
                                React.createElement("a", { href: "", id: 'browse' },
                                    React.createElement("u", null, "Browse")),
                                " "),
                            React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'previewfileupload', type: 'file', ref: function (upload) { return _this.uploadObj = upload; }, asyncSettings: this.asyncSettings, success: this.onUploadSuccess.bind(this), selected: this.onSelect.bind(this), removing: this.onRemoveFile.bind(this), progress: this.onFileUpload.bind(this), failure: this.onUploadFailed.bind(this), allowedExtensions: this.allowedExtensions })))),
                React.createElement("div", { className: 'property-section uploader-panel col-lg-3' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("div", { className: 'panel-style' },
                            React.createElement("button", { className: "e-btn e-css", id: "clearbtn", title: "Clear All" }, "Clear All")),
                        React.createElement("div", { className: 'panel-style' },
                            React.createElement("button", { className: "e-btn e-css", id: "uploadbtn", title: "Upload All" }, "Upload All"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to add an image preview of the uploaded files. Browse or drag-and-drop image files (PNG, JPG) to display preview for the selected files.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Uploader component allows to create preview images after uploaded it. The preview images created by reading the file using success event.  Also, the user can create preview images before uploading to server using select event."))));
    };
    return Preview;
}(sample_base_1.SampleBase));
exports.Preview = Preview;
