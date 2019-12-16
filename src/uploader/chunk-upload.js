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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ChunkUpload = /** @class */ (function (_super) {
    __extends(ChunkUpload, _super);
    function ChunkUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.value = 0;
        _this.ddlDatas = [
            { value: 500000, size: '500 KB' },
            { value: 1000000, size: '1 MB' },
            { value: 2000000, size: '2 MB' }
        ];
        _this.fields = { text: 'size', value: 'value' };
        _this.isInteraction = false;
        _this.asyncSettings = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove',
            chunkSize: 500000
        };
        _this.autoUpload = false;
        return _this;
    }
    ChunkUpload.prototype.onChange = function (args) {
        this.uploadObj.asyncSettings.chunkSize = parseInt(args.itemData.value, 10);
    };
    ChunkUpload.prototype.onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    // to update flag variable value for automatic pause and resume
    ChunkUpload.prototype.onPausing = function (args) {
        if (args.event !== null && !navigator.onLine) {
            this.isInteraction = true;
        }
        else {
            this.isInteraction = false;
        }
    };
    // to update flag variable value for automatic pause and resume
    ChunkUpload.prototype.onResuming = function (args) {
        if (args.event !== null && !navigator.onLine) {
            this.isInteraction = true;
        }
        else {
            this.isInteraction = false;
        }
    };
    // to prevent triggering chunk-upload failure event and to pause uploading on network failure
    ChunkUpload.prototype.onBeforeFailure = function (args) {
        var proxy = this;
        args.cancel = !this.isInteraction;
        // interval to check network availability on every 500 milliseconds
        var clearTimeInterval = setInterval(function () {
            if (navigator.onLine && !ej2_base_1.isNullOrUndefined(proxy.uploadObj.filesData[0]) && proxy.uploadObj.filesData[0].statusCode == 4) {
                proxy.uploadObj.resume(proxy.uploadObj.filesData);
                clearSetInterval();
            }
            else {
                if (!proxy.isInteraction && !ej2_base_1.isNullOrUndefined(proxy.uploadObj.filesData[0]) && proxy.uploadObj.filesData[0].statusCode == 3) {
                    proxy.uploadObj.pause(proxy.uploadObj.filesData);
                }
            }
        }, 500);
        // clear Interval after when network is available.
        function clearSetInterval() {
            clearInterval(clearTimeInterval);
        }
    };
    ChunkUpload.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row uploadpreview' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: 'upload_wrapper' },
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'chunkUpload', type: 'file', ref: function (scope) { _this.uploadObj = scope; }, asyncSettings: this.asyncSettings, autoUpload: this.autoUpload, removing: this.onRemoveFile.bind(this), pausing: this.onPausing.bind(this), resuming: this.onResuming.bind(this), chunkFailure: this.onBeforeFailure.bind(this) }))),
                React.createElement("div", { className: 'col-lg-4 property-section', id: "chunk-size" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'chunk-table' },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { className: 'chunk-td' }, "Chunk Size"),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "chunksize", index: this.value, dataSource: this.ddlDatas, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, fields: this.fields, change: this.onChange.bind(this), placeholder: "Select chunk size" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the chunk upload functionalities of the Uploader component. Browse or drag-and-drop a large file to upload with pause, resume, and retry options. "),
                React.createElement("p", null, "Also, configured property panel to change the chunk size dynamically.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "When the file size is large or transfer the file with slow network connection, the chunk upload feature slices the files and upload the sliced chunks to server in sequential order using the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/uploader/asyncSettingsModel#chunksize", target: "_blank" }, "\u00A0chunkSize"),
                    " API. It will slice the files and upload it in sequential order."),
                React.createElement("p", null, "The sample is configured with the following options:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "While uploading, you can pause the upload and resume it later."),
                    React.createElement("li", null, " If the upload fails, retry option will be enabled."),
                    React.createElement("li", null, " The sample is configured with maximum file size as `100 MB` to upload.")),
                React.createElement("h4", null, "Automatic pause and resume"),
                React.createElement("p", null,
                    "If the application lost its connection (",
                    React.createElement("code", null, "offline"),
                    "), the upload component pauses the process automatically. After the connection is up (",
                    React.createElement("code", null, "online"),
                    "), the upload component will resume its process."),
                React.createElement("p", null,
                    "More information on the Uploader instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/chunk-upload/" }, "documentation section"),
                    "."))));
    };
    return ChunkUpload;
}(sample_base_1.SampleBase));
exports.ChunkUpload = ChunkUpload;
