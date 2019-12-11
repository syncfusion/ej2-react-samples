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
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
require("./tribute.css");
var TributeJs = /** @class */ (function (_super) {
    __extends(TributeJs, _super);
    function TributeJs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TributeJs.prototype.onCreate = function () {
        var _this = this;
        var script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tributejs/3.7.3/tribute.min.js";
        script.async = true;
        document.head.appendChild(script);
        script.onload = function () {
            var tribute = new Tribute({
                values: [
                    { key: 'Phil Heartman', value: 'pheartman' },
                    { key: 'Gordon Ramsey', value: 'gramsey' },
                    { key: 'Jordan Humphreys', value: 'jhumphreys' },
                    { key: 'Howard Johnson', value: 'hjohnson' }
                ]
            });
            tribute.attach(_this.rteObj.inputElement);
        };
    };
    TributeJs.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'rteImage' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "defaultRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, placeholder: "Type @ to get the employee list with their email IDs.", created: this.onCreate.bind(this) },
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to integrate the third-party library `Tribute JS` (Mentions library) into the Rich Text Editor. Type @ to open autocomplete popup with employee list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Rich Text Editor allows you to integrate the third-party libraries such as Tribute JS or At JS for mentions. If you want to tag or address someone directly during a conversation, the mentions library will be helpful. Type @ to show autocomplete popup with a list of matching items based on the provided key-value pair."),
                React.createElement("p", null, "For example, type '@' in the above sample to show the employee list with their mail IDs in the autocomplete popup."))));
    };
    return TributeJs;
}(sample_base_1.SampleBase));
exports.TributeJs = TributeJs;
