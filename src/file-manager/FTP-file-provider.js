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
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with File Transfer Protocol
 */
var FTPFileProvider = (function (_super) {
    __extends(FTPFileProvider, _super);
    function FTPFileProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-ftp-aspcore-service.azurewebsites.net/";
        return _this;
    }
    FTPFileProvider.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "ftp", ajaxSettings: {
                        url: this.hostUrl + 'api/FTPProvider/FTPFileOperations',
                        getImageUrl: this.hostUrl + 'api/FTPProvider/FTPGetImage',
                        uploadUrl: this.hostUrl + 'api/FTPProvider/FTPUpload',
                        downloadUrl: this.hostUrl + 'api/FTPProvider/FTPDownload'
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to utilize the ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-ftp-aspcore-file-provider" }, "File Transfer Protocol file system provider"),
                    " to manage the files in the File Manager component. To run the service, create a FTP connection, and then configure the FTP details such as ",
                    React.createElement("i", null,
                        React.createElement("b", null, "host name")),
                    ", ",
                    React.createElement("i", null,
                        React.createElement("b", null, "user name")),
                    ", and ",
                    React.createElement("i", null,
                        React.createElement("b", null, "password")),
                    " in the ",
                    React.createElement("code", null, "SetFTPConnection"),
                    " method to perform the file operations.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on."),
                React.createElement("b", null, "Note: "),
                "File Manager's upload functionality is restricted in online demo. To work with upload functionality, please download ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-ftp-aspcore-file-provider" }, "ej2-ftp-aspcore-file-provider"),
                " from the GitHub repository.")));
    };
    return FTPFileProvider;
}(sample_base_1.SampleBase));
exports.FTPFileProvider = FTPFileProvider;
