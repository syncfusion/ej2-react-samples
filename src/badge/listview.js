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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
require("./listview.css");
var listData_1 = require("./listData");
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Map fields
        _this.fields = { groupBy: 'type' };
        return _this;
    }
    ListView.prototype.listTemplate = function (data) {
        return (React.createElement("div", { className: 'listWrapper', style: { width: 'inherit', height: 'inherit' } },
            React.createElement("span", { className: data.icons + " list_svg" }, "\u00A0"),
            React.createElement("span", { className: 'list_text' }, data.text),
            React.createElement("span", { className: data.badge, style: { float: 'right', marginTop: '16px', fontSize: '12px' } }, data.messages)));
    };
    ListView.prototype.onActionComplete = function () {
        var list = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0];
        list.style.display = 'none';
    };
    ListView.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section badge-samples' },
                React.createElement("div", { className: "sample_container badge-list" },
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: "lists", dataSource: listData_1.dataSource, fields: this.fields, headerTitle: 'Inbox', showHeader: true, template: this.listTemplate, actionComplete: this.onActionComplete.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of badges into the listview component to display the new e-mails count.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The badge can be integrated into the listview with the help of templates. The listview uses so many real-time use cases with badges to achieve different applications."),
                React.createElement("p", null, "Here, default badges are used and there is no need to customize the badge size because the component will automatically adjust the size based on the container element."),
                React.createElement("p", null, "In this samples, different types of colors are used to indicate their priorities of the notification."))));
    };
    return ListView;
}(sample_base_1.SampleBase));
exports.ListView = ListView;
