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
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
require("./outlook-style-layout.component.css");
/**
 *  Sample for outlook style using splitter
 */
var OutlookLayout = (function (_super) {
    __extends(OutlookLayout, _super);
    function OutlookLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = [
            { Name: 'Selma Tally', content: 'Apology marketing email', content2: 'Hello Ananya Singleton', id: '1', order: 0 },
            { Name: 'Illa Russo', content: 'Annual conference', content2: 'Hi jeani Moresa', id: '4', order: 0 },
            { Name: 'Camden Macmellon', content: 'Reference request- Camden hester', content2: 'Hello Kerry Best', order: 0 },
            { Name: 'Garth Owen', content: 'Application for job Title', content2: 'Hello Illa Russo', id: '2', order: 0 },
            { Name: 'Ursula Patterson', content: 'Programmaer Position Applicant', content2: 'Hello Kerry best', id: '2', order: 0 }
        ];
        _this.data = _this.dataSource;
        _this.paneSize1 = "28%";
        _this.minimumSize1 = "27%";
        _this.paneSize2 = "33%";
        _this.minimumSize2 = "23%";
        _this.paneSize3 = "37%";
        _this.minimumSize3 = "30%";
        //Set customized list template
        _this.listTemplate = '<div class="settings e-list-wrapper e-list-multi-line e-list-avatar">' +
            '<span class="e-list-item-header">${Name}</span>' +
            '<span class="e-list-content">${content}</span>' +
            '</div>';
        //Set customized group-header template
        _this.grouptemplate = '<div class="e-list-wrapper"><span class="e-list-item-content"></span></div>';
        //Map the appropriate columns to fields property
        _this.listFields = { text: 'Name', groupBy: 'order' };
        _this.mailBox = [
            { id: 1, name: 'Favorites', hasChild: true },
            { id: 2, pid: 1, name: 'Sales Reports', count: '4' },
            { id: 3, pid: 1, name: 'Sent Items' },
            { id: 4, pid: 1, name: 'Marketing Reports ', count: '6' },
            { id: 5, name: 'Andrew Fuller', hasChild: true, expanded: true },
            { id: 6, pid: 5, name: 'Inbox', selected: true, count: '20' },
            { id: 7, pid: 5, name: 'Drafts', count: '5' },
            { id: 15, pid: 5, name: 'Archive' },
            { id: 8, pid: 5, name: 'Deleted Items' },
            { id: 9, pid: 5, name: 'Sent Items' },
            { id: 10, pid: 5, name: 'Sales Reports', count: '4' },
            { id: 11, pid: 5, name: 'Marketing Reports', count: '6' },
            { id: 12, pid: 5, name: 'Outbox' },
            { id: 13, pid: 5, name: 'Junk Email' },
            { id: 14, pid: 5, name: 'RSS Feed' },
            { id: 15, pid: 5, name: 'Trash' }
        ];
        _this.treeFields = { dataSource: _this.mailBox, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
        return _this;
    }
    OutlookLayout.prototype.nodeTemplate = function (data) {
        return (React.createElement("div", null,
            React.createElement("div", { className: "treeviewdiv" },
                React.createElement("div", { className: "textcontent" },
                    React.createElement("span", { className: "treeName" }, data.name)),
                data.count &&
                    React.createElement("div", { className: "countcontainer" },
                        React.createElement("span", { className: "treeCount e-badge e-badge-primary" }, data.count)))));
    };
    ;
    OutlookLayout.prototype.content1 = function () {
        return (React.createElement("div", { className: 'splitter-content' },
            React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'splitter-tree', fields: this.treeFields, nodeTemplate: this.nodeTemplate })));
    };
    ;
    OutlookLayout.prototype.content2 = function () {
        var _this = this;
        return (React.createElement("div", { className: 'splitter-content' },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'groupedList-split', fields: this.listFields, className: 'splitter-list', dataSource: this.dataSource, cssClass: 'e-list-template', groupTemplate: this.grouptemplate, template: this.listTemplate, ref: function (listview) { _this.listViewObj = listview; } })));
    };
    ;
    OutlookLayout.prototype.content3 = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'splitter-content' },
                React.createElement("div", { style: { width: '100%', padding: '15px' } },
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("button", { className: 'e-btn e-flat e-outline' }, "To...")),
                            React.createElement("td", { id: 'firstname-target' },
                                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "firstname" }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("button", { className: 'e-btn e-flat e-outline' }, "Cc...")),
                            React.createElement("td", { id: 'lastname-target' },
                                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "lastname" }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { id: 'subject-text' }, "Subject")),
                            React.createElement("td", { id: 'subject-target' },
                                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "subject" }))))),
                React.createElement("div", { className: 'forum' },
                    React.createElement("div", { id: 'createpostholder' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "outlookRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, height: "262px" },
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar] })),
                        React.createElement("div", { id: 'buttonSection' },
                            React.createElement("button", { className: 'e-btn e-primary', id: 'send' }, "Send"),
                            React.createElement("button", { className: 'e-btn', id: 'discard' }, "Discard")))))));
    };
    ;
    OutlookLayout.prototype.onSplitterResize = function () {
        this.rteObj.refreshUI();
    };
    OutlookLayout.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "target", className: "control-section outlook-style" },
            React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "splitter1", height: "493px", width: "100%", ref: function (splitter) { _this.splitterInstance = splitter; }, resizing: this.onSplitterResize.bind(this) },
                React.createElement(ej2_react_layouts_1.PanesDirective, null,
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: this.paneSize1, min: this.minimumSize1, content: this.content1.bind(this) }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: this.paneSize2, min: this.minimumSize2, content: this.content2.bind(this) }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: this.paneSize3, min: this.minimumSize3, content: this.content3.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the splitter control that is used to design outlook-like application using multiple horizontal panes. You can resize its panes horizontally to increase dimension.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The splitter control is used to create outlook-like user interface application using multiple panes with horizontal orientation. To create outlook-style user interface, use TreeView, ListView, and RichTextEditor controls within split panes. The TreeView control is used to display mail folders at left pane and ListView to display details of mail items, and RichTextEditor to create new mail."))));
    };
    return OutlookLayout;
}(sample_base_1.SampleBase));
exports.OutlookLayout = OutlookLayout;
