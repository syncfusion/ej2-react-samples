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
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var DefaultFunctionalities = /** @class */ (function (_super) {
    __extends(DefaultFunctionalities, _super);
    function DefaultFunctionalities(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog: true
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.buttons = [{
                click: _this.dlgButtonClick,
                buttonModel: {
                    content: 'Learn More',
                    isPrimary: true
                }
            }];
        _this.animationSettings = { effect: 'None' };
        return _this;
    }
    DefaultFunctionalities.prototype.buttonClick = function () {
        this.setState({ hideDialog: true });
    };
    DefaultFunctionalities.prototype.dlgButtonClick = function () {
        window.open('https://www.syncfusion.com/company/about-us');
    };
    DefaultFunctionalities.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = "block";
    };
    DefaultFunctionalities.prototype.dialogOpen = function () {
        this.buttonEle.style.display = "none";
    };
    DefaultFunctionalities.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'targetElement', className: 'control-section col-lg-12 defaultDialog dialog-target' },
                React.createElement("button", { className: "e-control e-btn dlgbtn", ref: this.buttonRef, onClick: this.buttonClick.bind(this), id: "dialogBtn" }, " Open"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultdialog", showCloseIcon: true, animationSettings: this.animationSettings, visible: this.state.hideDialog, width: '500px', ref: function (dialog) { return _this.dialogInstance = dialog; }, target: '#targetElement', header: 'About SYNCFUSION Succinctly Series', buttons: this.buttons, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) },
                    React.createElement("div", null,
                        React.createElement("div", null,
                            "In the Succinctly series, Syncfusion created a robust free library of more than 130 technical e-books formatted for PDF, Kindle, and EPUB.",
                            React.createElement("br", null),
                            React.createElement("br", null),
                            "The Succinctly series was born in 2012 out of a desire to provide concise technical e-books for software developers Each title in the Succinctly series is written by a carefully chosen expert and provides essential content in about 100 pages.")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the default rendering of the dialog component with minimum configuration. Click close or press ESC  to close the dialog. Click \u201Copen\u201D to show the dialog again, if it is closed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The dialog component is used to display information and get input from the user. The dialog component is classified as modal and non-modal dialog depend on its interaction with parent application."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Modal - It creates overlay that disable interaction with the parent application, and user should respond with modal before continuing with other applications."),
                    React.createElement("li", null, "Non-modal - It does not prevent user interaction with parent application.")))));
    };
    return DefaultFunctionalities;
}(sample_base_1.SampleBase));
exports.DefaultFunctionalities = DefaultFunctionalities;
