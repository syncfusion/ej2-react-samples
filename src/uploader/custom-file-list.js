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
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./custom-file-list.css");
var CustomTemplate = (function (_super) {
    __extends(CustomTemplate, _super);
    function CustomTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.filesDetails = [];
        _this.filesList = [];
        _this.removeFiles = _this.removeFiles.bind(_this);
        _this.dropAreaEle = null;
        _this.dropContainerEle = null;
        _this.dropRef = function (element) {
            _this.dropAreaEle = element;
        };
        _this.dropContainerRef = function (element) {
            _this.dropContainerEle = element;
        };
        _this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        return _this;
    }
    CustomTemplate.prototype.onSuccess = function (args) {
        var spinnerElement = this.dropAreaEle;
        var li = this.dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            var progressBar = li.getElementsByTagName('progress')[0];
            li.querySelector('.close-icon-container').classList.add('delete-icon');
            ej2_base_1.detach(li.getElementsByTagName('progress')[0]);
            li.querySelector('.file-size').style.display = 'inline-block';
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = function () {
                ej2_popups_1.createSpinner({ target: spinnerElement, width: '25px' });
                ej2_popups_1.showSpinner(spinnerElement);
            };
            li.querySelector('.close-icon-container').onkeydown = function (e) {
                if (e.keyCode === 13) {
                    ej2_popups_1.createSpinner({ target: spinnerElement, width: '25px' });
                    ej2_popups_1.showSpinner(spinnerElement);
                }
            };
        }
        else {
            this.filesDetails.splice(this.filesList.indexOf(li), 1);
            this.filesList.splice(this.filesList.indexOf(li), 1);
            this.uploadObj.element.value = '';
            ej2_base_1.detach(li);
            ej2_popups_1.hideSpinner(spinnerElement);
            ej2_base_1.detach(spinnerElement.querySelector('.e-spinner-pane'));
        }
        ej2_base_1.EventHandler.add(li.querySelector('.close-icon-container'), 'click', this.removeFiles, this);
    };
    CustomTemplate.prototype.onFileSelect = function (args) {
        if (ej2_base_1.isNullOrUndefined(this.dropAreaEle.querySelector('.upload-list-root'))) {
            this.parentElement = ej2_base_1.createElement('div', { className: 'upload-list-root' });
            this.parentElement.appendChild(ej2_base_1.createElement('ul', { className: 'ul-element' }));
            this.dropAreaEle.appendChild(this.parentElement);
        }
        for (var i = 0; i < args.filesData.length; i++) {
            this.formSelectedData(args.filesData[i], this); // create the LI element for each file Data
        }
        this.filesDetails = this.filesDetails.concat(args.filesData);
        this.uploadObj.upload(args.filesData, true);
        args.cancel = true;
    };
    CustomTemplate.prototype.formSelectedData = function (selectedFiles, proxy) {
        var liEle = ej2_base_1.createElement('li', { className: 'file-lists', attrs: { 'data-file-name': selectedFiles.name } });
        liEle.appendChild(ej2_base_1.createElement('span', { className: 'file-name ', innerHTML: selectedFiles.name }));
        liEle.appendChild(ej2_base_1.createElement('span', { className: 'file-size ', innerHTML: this.uploadObj.bytesToSize(selectedFiles.size) }));
        if (selectedFiles.statusCode === '1') {
            this.progressbarContainer = ej2_base_1.createElement('span', { className: 'progress-bar-container' });
            this.progressbarContainer.appendChild(ej2_base_1.createElement('progress', { className: 'progress', attrs: { value: '0', max: '100' } }));
            liEle.appendChild(this.progressbarContainer);
        }
        else {
            liEle.querySelector('.file-name').classList.add('upload-fails');
        }
        var closeIconContainer = ej2_base_1.createElement('span', { className: 'e-icons close-icon-container' });
        ej2_base_1.EventHandler.add(closeIconContainer, 'click', this.removeFiles, proxy);
        liEle.appendChild(closeIconContainer);
        document.querySelector('.ul-element').appendChild(liEle);
        this.filesList.push(liEle);
    };
    CustomTemplate.prototype.onFileUpload = function (args) {
        var li = this.dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        ej2_base_1.EventHandler.remove(li.querySelector('.close-icon-container'), 'click', this.removeFiles);
        var progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue)) {
            li.getElementsByTagName('progress')[0].value = progressValue; // Updating the progress bar value
        }
    };
    CustomTemplate.prototype.onUploadFailed = function (args) {
        var li = this.dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        ej2_base_1.EventHandler.add(li.querySelector('.close-icon-container'), 'click', this.removeFiles, this);
        li.querySelector('.file-name ').classList.add('upload-fails');
        if (args.operation === 'upload') {
            ej2_base_1.detach(li.querySelector('.progress-bar-container'));
        }
    };
    CustomTemplate.prototype.removeFiles = function (args) {
        var status = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)].statusCode;
        if (status === '2') {
            this.uploadObj.remove(this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]);
        }
        else {
            ej2_base_1.detach(args.currentTarget.parentElement);
        }
    };
    CustomTemplate.prototype.onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    CustomTemplate.prototype.rendereComplete = function () {
        var _this = this;
        document.getElementById('browse').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        this.dropElement = this.dropContainerEle;
        document.getElementById('clearbtn').onclick = function () {
            if (!document.getElementsByClassName('upload-list-root')[0]) {
                return;
            }
            ej2_base_1.detach(document.getElementsByClassName('upload-list-root')[0]);
            _this.filesList = [];
            _this.filesDetails = [];
        };
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
        this.uploadObj.dropArea = this.dropElement;
        this.uploadObj.dataBind();
        if (ej2_base_1.Browser.isDevice) {
            this.uploadObj.dropArea.querySelector('drop').style.padding = '4% 13%';
        }
    };
    CustomTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane', ref: this.dropContainerRef },
            React.createElement("div", { className: 'control-section uploadpreview' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement("div", { className: 'template_wrapper' },
                        React.createElement("div", { id: 'dropArea', className: 'dropArea', ref: this.dropRef },
                            React.createElement("span", { id: 'drop', className: 'file-name-span drop' },
                                " Drop files here or ",
                                React.createElement("a", { href: "", id: 'browse' },
                                    React.createElement("u", null, "Browse")),
                                " "),
                            React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: function (scope) { _this.uploadObj = scope; }, asyncSettings: this.asyncSettings, success: this.onSuccess.bind(this), removing: this.onRemoveFile.bind(this), selected: this.onFileSelect.bind(this), progress: this.onFileUpload.bind(this), failure: this.onUploadFailed.bind(this), dropArea: this.dropElement })))),
                React.createElement("div", { className: 'property-section template-panel col-lg-3' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("div", { className: 'custom-panel' },
                            React.createElement("button", { className: "e-btn e-css", id: "clearbtn", title: "Clear All" }, "Clear All"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to customize the file list with template. Browse or select the files to view the file list template.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Uploader component allows to customize its file list using template property. The template used for each file in file list."),
                React.createElement("p", null,
                    "For more information, you can refer to the Template section from this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/template/#custom-template" }, "documentation section"),
                    "."))));
    };
    return CustomTemplate;
}(sample_base_1.SampleBase));
exports.CustomTemplate = CustomTemplate;
