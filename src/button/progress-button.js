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
require("./progress-button.css");
var ProgressButton = (function (_super) {
    __extends(ProgressButton, _super);
    function ProgressButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spinRight = { position: 'Right' };
        _this.spinTop = { position: 'Top' };
        _this.spinBottom = { position: 'Bottom' };
        _this.spinCenter = { position: 'Center' };
        _this.zoomOut = { effect: 'ZoomOut' };
        _this.slideLeft = { effect: 'SlideLeft' };
        _this.slideRight = { effect: 'SlideRight' };
        _this.zoomIn = { effect: 'ZoomIn' };
        _this.duration = 4000;
        return _this;
    }
    ProgressButton.prototype.contractBegin = function () {
        this.contractBtn.element.classList.add('e-round');
    };
    ProgressButton.prototype.contractEnd = function () {
        this.contractBtn.element.classList.remove('e-round');
    };
    ProgressButton.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'progress-button-section' },
                    React.createElement("div", { id: 'progress-button-control' },
                        React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Left", isPrimary: true })),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Right", isPrimary: true, spinSettings: this.spinRight }))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Top", isPrimary: true, spinSettings: this.spinTop })),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Bottom", isPrimary: true, spinSettings: this.spinBottom })))),
                        React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "roundbtn", spinSettings: this.spinCenter, animationSettings: this.zoomOut, cssClass: "e-round e-small e-success", iconCss: "e-btn-sb-icons e-play-icon" })),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "contract", content: "Contract", ref: function (scope) { _this.contractBtn = scope; }, enableProgress: true, cssClass: "e-success e-small", begin: this.contractBegin.bind(this), end: this.contractEnd.bind(this) }))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Slide Left", enableProgress: true, spinSettings: this.spinCenter, animationSettings: this.slideLeft, cssClass: "e-flat e-success" })),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Slide Right", enableProgress: true, spinSettings: this.spinCenter, animationSettings: this.slideRight, cssClass: "e-outline e-success" })))),
                        React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "zoomin", content: "Zoom In", enableProgress: true, spinSettings: this.spinCenter, animationSettings: this.zoomIn, cssClass: "e-round-corner e-danger" })),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Zoom Out", enableProgress: true, spinSettings: this.spinCenter, animationSettings: this.zoomOut, cssClass: "e-small e-danger" }))),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Download", enableProgress: true, duration: this.duration, cssClass: "e-hide-spinner e-progress-top", iconCss: "e-btn-sb-icons e-download-icon" })),
                                React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                    React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Disabled", disabled: true }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of a progress button. Clicking that button will display a spinner and a progress indicator.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The progress button visualizes the progression of an operation to indicates the user that a process is happening in the background. The progress can be shown with graphics accompanied by a textual representation."),
                React.createElement("p", null,
                    "In this sample, the progress button contains the content, spinner, progress indicator, and a list of related features that can be achieved using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/progress-button/#content" }, "content,")),
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/progress-button/#cssclass" }, "cssClass,")),
                    "and",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/progress-button/#enableprogress" }, "enableProgress")),
                    "property."),
                React.createElement("p", null,
                    "More information about progress button can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/progress-button/getting-started" }, "documentation section"),
                    "."))));
    };
    return ProgressButton;
}(sample_base_1.SampleBase));
exports.ProgressButton = ProgressButton;
