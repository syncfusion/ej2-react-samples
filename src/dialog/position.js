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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./position.css");
var Positioning = (function (_super) {
    __extends(Positioning, _super);
    function Positioning(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog: true
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.position = { X: 'center', Y: 'center' };
        _this.footerTemplate = '<span id="posvalue" style="float:left;margin-left:8px;padding:10px;">Position: { X: "Center", Y: "Center" }</span>';
        return _this;
    }
    Positioning.prototype.buttonClick = function (args) {
        this.setState({ hideDialog: true });
    };
    //Bind the overlayClick event
    Positioning.prototype.changePosition = function (event) {
        this.defaultDialogInstance.position = { X: event.currentTarget.value.split(" ")[0], Y: event.currentTarget.value.split(" ")[1] };
        document.getElementById('posvalue').innerHTML = 'Position: {X: "' + event.currentTarget.value.split(" ")[0] + '", Y: "' + event.currentTarget.value.split(" ")[1] + '"}';
        var txt = event.target.parentElement.querySelector('.e-label').innerText.split(" ");
        document.getElementById('posvalue').innerHTML = 'Position: { X: "' + txt[0] + '", Y: "' + txt[1] + '" }';
    };
    Positioning.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    };
    Positioning.prototype.dialogOpen = function () {
        this.setState({ hideDialog: true });
        this.buttonEle.style.display = 'none';
    };
    Positioning.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'target', className: 'col-lg-12 control-section dialog-position' },
                React.createElement("button", { className: 'e-control e-btn dlgbtn', ref: this.buttonRef, onClick: this.buttonClick.bind(this), id: 'dialogBtn' }, "Open Dialog"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'positionDialog', header: 'Choose a Dialog Position', visible: this.state.hideDialog, showCloseIcon: true, position: this.position, footerTemplate: this.footerTemplate, width: '452px', ref: function (positionDialog) { return _this.defaultDialogInstance = positionDialog; }, target: '#target', open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this), closeOnEscape: false },
                    React.createElement("table", { id: 'poschange' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio1', label: 'Left Top', value: 'left top', name: 'xy', onClick: this.changePosition.bind(this) })),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio2', label: 'Center Top', value: 'center top', name: 'xy', onClick: this.changePosition.bind(this) })),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio3', label: 'Right Top', value: 'right top', name: 'xy', onClick: this.changePosition.bind(this) }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio4', label: 'Left Center', value: 'left center', name: 'xy', onClick: this.changePosition.bind(this) })),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio5', checked: true, label: 'Center Center', value: 'center center', name: 'xy', onClick: this.changePosition.bind(this) })),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio6', label: 'Right Center', value: 'right center', name: 'xy', onClick: this.changePosition.bind(this) }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio7', label: 'Left Bottom', value: 'left bottom', name: 'xy', onClick: this.changePosition.bind(this) })),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio8', label: 'Center Bottom', value: 'center bottom', name: 'xy', onClick: this.changePosition.bind(this) })),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'radio9', label: 'Right Bottom', value: 'right bottom', name: 'xy', onClick: this.changePosition.bind(this) })))))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This example demonstrates how to position the dialog component. Select the appropriate radio button to position where the dialog is displayed. The current position of the dialog is at the bottom.  Enable the \"open dialog\" button to reopen the dialog if it is closed.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "By default, the dialog is displayed in the center of the target container. Use the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#position" }, "position"),
                        " property to set location where the dialog displays relative to the target. The property point-out the horizontal and vertical coordinates. You can set position with specific X and Y coordinates in pixel values."),
                    React.createElement("p", null,
                        "More information on the positioning of Dialog can be found in the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#positioning" }, "documentation section"),
                        ".")))));
    };
    return Positioning;
}(sample_base_1.SampleBase));
exports.Positioning = Positioning;
