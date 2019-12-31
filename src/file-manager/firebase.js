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
 * File Manager sample with firebase realtime database service
 */
var Firebase = (function (_super) {
    __extends(Firebase, _super);
    function Firebase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://realtime-firebase.azurewebsites.net/";
        return _this;
    }
    Firebase.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "firebase", ajaxSettings: {
                        url: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations',
                        getImageUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage',
                        uploadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload',
                        downloadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to utilize the Firebase realtime cloud storage database with File Manager component.To run the service, create an ",
                    React.createElement("a", { target: "_blank", href: "https://console.firebase.google.com/" }, "firebase realtime database"),
                    " and then register the firebase realtime database ",
                    React.createElement("b", null, "Rest API link"),
                    " and ",
                    React.createElement("b", null, "root node"),
                    " name using ",
                    React.createElement("code", null, "RegisterFirebaseRealtimeDB"),
                    " method to perform the file operations.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on."),
                React.createElement("b", null, "Note: "),
                "File Manager's upload functionality is restricted in online demo. To work with upload functionality, please download ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-firebase-realtime-database-aspcore-file-provider" }, "ej2-firebase-realtime-database-aspcore-file-provider"),
                " from the GitHub repository.")));
    };
    return Firebase;
}(sample_base_1.SampleBase));
exports.Firebase = Firebase;
