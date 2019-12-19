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
 * File Manager sample with SQL service
 */
var SqlServer = (function (_super) {
    __extends(SqlServer, _super);
    function SqlServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ng2jq.syncfusion.com/ej2-sql-service/";
        return _this;
    }
    SqlServer.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: {
                        url: this.hostUrl + 'api/FileManager/Fileoperations',
                        getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar, ej2_react_filemanager_1.ContextMenu] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to utilize the ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-sql-server-database-aspcore-file-provider" }, "SQL server file system provider"),
                    " with File Manager component. To run the service, configure the SQL server database connection using the ",
                    React.createElement("code", null, "SetSQLConnection"),
                    " method to set the connection name, table name and rootId of the SQL table.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager\u2019s upload functionality is restricted in online demo. To work with upload functionality, please download ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-sql-server-database-aspcore-file-provider" }, "SQL Database Provider"),
                    " from the GitHub repository."))));
    };
    return SqlServer;
}(sample_base_1.SampleBase));
exports.SqlServer = SqlServer;
