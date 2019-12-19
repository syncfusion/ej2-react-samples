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
 * File Manager sample with azure service
 */
var Azure = (function (_super) {
    __extends(Azure, _super);
    function Azure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-azure-aspcore-service.azurewebsites.net/";
        return _this;
    }
    Azure.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "azure-file", ajaxSettings: {
                        url: this.hostUrl + 'api/AzureFileManager/AzureFileOperations',
                        getImageUrl: this.hostUrl + 'api/AzureFileManager/AzureGetImage',
                        uploadUrl: this.hostUrl + 'api/AzureFileManager/AzureUpload',
                        downloadUrl: this.hostUrl + 'api/AzureFileManager/AzureDownload'
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to utilize the Azure blob storage with File Manager component. To run the service, create the Azure blob storage account and register the Azure storage details like ",
                    React.createElement("i", null,
                        React.createElement("b", null, "account name")),
                    ", ",
                    React.createElement("i", null,
                        React.createElement("b", null, "password")),
                    ", and ",
                    React.createElement("i", null,
                        React.createElement("b", null, "blob name")),
                    " details within the ",
                    React.createElement("code", null, "RegisterAzure"),
                    " method.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager\u2019s upload functionality is restricted in online demo. To work with upload functionality, please download ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-azure-aspcore-file-provider" }, "Azure Blob Provider"),
                    " from the GitHub repository."),
                React.createElement("p", null,
                    React.createElement("b", null, "NuGet Package:"),
                    " NuGet package of ",
                    React.createElement("a", { target: "_blank", href: "https://www.nuget.org/packages/Syncfusion.EJ2.FileManager.AzureFileProvider.AspNet.Core" },
                        React.createElement("b", null, "ASP.NET Core Azure file system provider")),
                    " is now available on ",
                    React.createElement("a", { target: "_blank", href: "https://www.nuget.org/" }, "nuget.org"),
                    "."))));
    };
    return Azure;
}(sample_base_1.SampleBase));
exports.Azure = Azure;
