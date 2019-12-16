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
 * File Manager sample with Amazon S3 file provider service
 */
var AmazonS3Provider = /** @class */ (function (_super) {
    __extends(AmazonS3Provider, _super);
    function AmazonS3Provider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://amazons3.azurewebsites.net/api/AmazonS3Provider/";
        return _this;
    }
    AmazonS3Provider.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: {
                        url: this.hostUrl + 'AmazonS3FileOperations',
                        getImageUrl: this.hostUrl + 'AmazonS3GetImage',
                        uploadUrl: this.hostUrl + 'AmazonS3Upload',
                        downloadUrl: this.hostUrl + 'AmazonS3Download'
                    }, searchSettings: { allowSearchOnTyping: false } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar, ej2_react_filemanager_1.ContextMenu] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to utilize the ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-amazon-s3-aspcore-file-provider" }, "Amazon S3 file system provider"),
                    " to manage the files in File Manager component. To run the service, create an Amazon S3 account and a S3 bucket and then register your amazon S3 client account details like ",
                    React.createElement("b", null, "bucketName"),
                    ", ",
                    React.createElement("b", null, "awsAccessKeyId"),
                    ", ",
                    React.createElement("b", null, "awsSecretKeyId"),
                    " and ",
                    React.createElement("b", null, "awsRegion"),
                    " details in ",
                    React.createElement("code", null, "RegisterAmazonS3"),
                    " method to perform the file operations.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager\u2019s upload functionality is restricted in online demo. To work with upload functionality, please download ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-amazon-s3-aspcore-file-provider" }, "Amazon S3 File Provider"),
                    " from the GitHub repository."))));
    };
    return AmazonS3Provider;
}(sample_base_1.SampleBase));
exports.AmazonS3Provider = AmazonS3Provider;
