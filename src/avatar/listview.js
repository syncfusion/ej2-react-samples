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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./listview.css");
var datasource_1 = require("./datasource");
// *  Sample for CSS avatar component
var Listview = (function (_super) {
    __extends(Listview, _super);
    function Listview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Set customized list template
    Listview.prototype.listTemplate = function (data) {
        var letterAvatar = React.createElement("span", { className: 'e-avatar e-avatar-small e-avatar-circle' }, data.avatar);
        var imageAvatar = React.createElement("span", { className: data.pic + " e-avatar e-avatar-small e-avatar-circle" });
        return (React.createElement("div", { className: 'listWrapper' },
            data.avatar !== "" ? (letterAvatar) : (imageAvatar),
            React.createElement("span", { className: 'list-text' }, data.text)));
    };
    Listview.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "sample_container listview" },
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'letterAvatarList', dataSource: datasource_1.listData, headerTitle: 'Contacts', showHeader: true, sortOrder: "Ascending", template: this.listTemplate })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of avatar component into listview to create contacts applications.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The avatar can be used with other components to create various applications. Here, the avatar is used to display images or their initials from the persons contact lists."),
                React.createElement("p", null,
                    "Here, the xsmall avatar is used in circle type. To change the size of the avatar to xsmall and circle style, add",
                    React.createElement("code", null, ".e-avatar-xsmall"),
                    " and",
                    React.createElement("code", null, ".e-avatar-circle"),
                    "."))));
    };
    return Listview;
}(sample_base_1.SampleBase));
exports.Listview = Listview;
