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
 * File Manager full functionalities sample
 */
var Overview = (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
        return _this;
    }
    Overview.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "overview_file", ajaxSettings: {
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }, view: "Details" },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the full features of the File Manager that includes",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#navigationpanesettings", target: "_blank" }, " toolbar"),
                    ", ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings", target: "_blank" }, " navigation pane"),
                    " and ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#detailsviewsettings", target: "_blank" }, " details view."))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                    "on your machine and run the demo."))));
    };
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
