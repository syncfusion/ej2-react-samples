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
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var sample_base_1 = require("../common/sample-base");
require("./split-button.css");
var SplitButton = /** @class */ (function (_super) {
    __extends(SplitButton, _super);
    function SplitButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [
            {
                text: 'Paste',
                iconCss: 'e-btn-icons e-paste'
            },
            {
                text: 'Paste Special',
                iconCss: 'e-btn-icons e-paste-special'
            },
            {
                text: 'Paste as Formula',
                iconCss: 'e-btn-icons e-paste-formula'
            },
            {
                text: 'Paste as Hyperlink',
                iconCss: 'e-btn-icons e-paste-hyperlink'
            }
        ];
        _this.addDisabled = function (args) {
            if (args.item.text !== 'Paste') {
                args.element.classList.add('e-disabled');
            }
        };
        return _this;
    }
    SplitButton.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'splitbutton-section' },
                    React.createElement("div", { id: 'splitbutton-control' },
                        React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: "col-xs-12 col-sm-6 col-lg-3 col-md-3" },
                                React.createElement(ej2_react_splitbuttons_1.SplitButtonComponent, { items: this.items, iconCss: 'e-btn-icons e-paste' })),
                            React.createElement("div", { className: "col-xs-12 col-sm-6 col-lg-3 col-md-3" },
                                React.createElement(ej2_react_splitbuttons_1.SplitButtonComponent, { items: this.items, content: 'Paste' })),
                            React.createElement("div", { className: "col-xs-12 col-sm-6 col-lg-3 col-md-3" },
                                React.createElement(ej2_react_splitbuttons_1.SplitButtonComponent, { items: this.items, content: 'Paste', iconCss: 'e-btn-icons e-paste' })),
                            React.createElement("div", { className: "col-xs-12 col-sm-6 col-lg-3 col-md-3" },
                                React.createElement(ej2_react_splitbuttons_1.SplitButtonComponent, { items: this.items, content: 'Paste', iconCss: 'e-btn-icons e-paste', beforeItemRender: this.addDisabled })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the SplitButton. By clicking primary button default action will be triggered and clicking secondary button will display popup with list of action items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The SplitButton component has primary and secondary buttons. Primary button is used to select default action and secondary button is used to toggle contextual overlays for displaying list of action items. It can contain both text and images."),
                React.createElement("p", null,
                    "In this sample, SplitButton contains icon, content and list of action items, and can be added using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/split-button/#iconcss" }, "iconCss,")),
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/split-button/#content" }, "content")),
                    "and",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/split-button/#items" }, "items")),
                    "property."),
                React.createElement("p", null,
                    "More information about SplitButton can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/split-button/getting-started" }, "documentation section"),
                    "."))));
    };
    return SplitButton;
}(sample_base_1.SampleBase));
exports.SplitButton = SplitButton;
