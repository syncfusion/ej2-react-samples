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
var Preloadfiles = /** @class */ (function (_super) {
    __extends(Preloadfiles, _super);
    function Preloadfiles(props) {
        var _this = _super.call(this, props) || this;
        _this.uploadWrapper = document.getElementsByClassName('e-upload')[0];
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
    Preloadfiles.prototype.rendereComplete = function () {
        this.dropElement = this.dropContainerEle;
        this.uploadObj.dropArea = this.dropElement;
        this.uploadObj.dataBind();
        this.uploadObj.element.setAttribute('name', 'UploadFiles');
    };
    Preloadfiles.prototype.onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    Preloadfiles.prototype.clearButtonClick = function () {
        this.uploadObj.clearAll();
    };
    Preloadfiles.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane', ref: this.dropContainerRef },
            React.createElement("div", { className: 'control-section uploadpreview' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement("div", { className: 'validation_wrapper' },
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'validation', type: 'file', ref: function (scope) { _this.uploadObj = scope; }, asyncSettings: this.asyncSettings, removing: this.onRemoveFile.bind(this) },
                            React.createElement(ej2_react_inputs_1.FilesDirective, null,
                                React.createElement(ej2_react_inputs_1.UploadedFilesDirective, { name: "Nature", size: 25000, type: ".png" }),
                                React.createElement(ej2_react_inputs_1.UploadedFilesDirective, { name: "TypeScript succinctly", size: 12000, type: ".pdf" }),
                                React.createElement(ej2_react_inputs_1.UploadedFilesDirective, { name: "ASP.NET", size: 17000, type: ".docx" }))))),
                React.createElement("div", { className: 'property-section preload-panel col-lg-3' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("div", { className: 'panel-style' },
                            React.createElement("button", { className: "e-btn e-css", onClick: this.clearButtonClick = this.clearButtonClick.bind(this), id: "clearbtn", title: "Clear All" }, "Clear All"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server. Also, you can achieve state persistence on page refresh."),
                React.createElement("p", null,
                    "For more information, you can refer to the Preload Files section from this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/async/#preload-files" }, "documentation section"),
                    "."),
                React.createElement("p", null, "To achieve state persistence, you can refer to this How-to section."))));
    };
    return Preloadfiles;
}(sample_base_1.SampleBase));
exports.Preloadfiles = Preloadfiles;
