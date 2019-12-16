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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
var defaultcss = "\n#all-property-table .property-panel-section .property-panel-content table#property tr {\n    height: 50px;\n}";
/**
 * File Manager API sample
 */
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
        return _this;
    }
    Default.prototype.toolCheck = function (args) {
        this.fmObj.toolbarSettings.visible = args.checked;
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("style", null, defaultcss),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "api_filemanager", ref: function (scope) { _this.fmObj = scope; }, ajaxSettings: {
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }, view: "LargeIcons", navigationPaneSettings: { visible: false } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "all-property-table", className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: "userselect" }, "Toolbar")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "tool_check", checked: true, change: this.toolCheck.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default rendering of the File Manager with minimum configuration.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                    "on your machine and run the demo."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
