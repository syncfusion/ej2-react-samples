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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./api.css");
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api() {
        var _this = _super.call(this) || this;
        _this.type = [{ mode: 'Picker' }, { mode: 'Palette' }];
        _this.ddlFields = { text: 'mode', value: 'mode' };
        _this.state = {
            colorValue: '#0db1e7',
            mode: 'Picker',
            disabled: false,
            showButtons: true,
            modeSwitcher: true
        };
        return _this;
    }
    Api.prototype.onDdlChange = function (args) {
        this.setState({ mode: args.value });
    };
    Api.prototype.onDisableChange = function (args) {
        this.setState({ disabled: args.checked });
    };
    Api.prototype.onButtonChange = function (args) {
        this.setState({ showButtons: args.checked });
    };
    Api.prototype.onModeChange = function (args) {
        this.setState({ modeSwitcher: args.checked });
    };
    Api.prototype.changeValue = function (e) {
        var val = e.target.value;
        // Sets to color picker default color value if user types the invalid hex code.
        this.setState({ colorValue: val && val.length > 2 ? (val[0] !== '#' ? "#" + val : val) : '#008000' });
    };
    Api.prototype.rendereComplete = function () {
        this.refs.hexInput.value = this.state.colorValue;
    };
    Api.prototype.onChange = function (args) {
        this.refs.hexInput.value = args.currentValue.hex;
    };
    Api.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'api-control', className: 'col-lg-8' },
                    React.createElement("h4", null, "Choose a color"),
                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'color-picker', mode: this.state.mode, disabled: this.state.disabled, showButtons: this.state.showButtons, value: this.state.colorValue, modeSwitcher: this.state.modeSwitcher, change: this.onChange.bind(this) })),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Value")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                        React.createElement("div", { style: { maxWidth: '200px' } },
                                            React.createElement("input", { id: "hex-input", ref: "hexInput", type: "text", className: "e-input", maxLength: 9, onInput: this.changeValue.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", null, "Mode")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                        React.createElement("div", { style: { maxWidth: '200px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: this.type, fields: this.ddlFields, value: 'Picker', change: this.onDdlChange.bind(this), popupHeight: "220px" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', paddingTop: '13px' } },
                                        React.createElement("div", null, "Disable")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '13px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "disabled", checked: false, change: this.onDisableChange.bind(this) }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', paddingTop: '15px' } },
                                        React.createElement("div", null, "Show Buttons")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '15px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "button", checked: true, change: this.onButtonChange.bind(this) }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%', paddingTop: '15px', paddingBottom: '10px' } },
                                        React.createElement("div", null, "Mode Switcher")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '15px', paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mode-switch", checked: true, change: this.onModeChange.bind(this) })))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates customization of the ColorPicker component by using its properties from the property pane. Select any combination of properties from the property pane to customize the ColorPicker component.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The ColorPicker is a user interface to select and adjust color values. This supports various color specifications like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes."),
                React.createElement("p", null, "In this sample, ColorPicker is rendered with default configuration."),
                React.createElement("p", null, "This sample can be customized further with the combination of ColorPicker properties from the property pane. For example,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Control (apply/cancel) buttons can be enabled or disabled using",
                        React.createElement("i", null, "Show Buttons"),
                        " checkbox from the property pane."),
                    React.createElement("li", null,
                        "You can select the color by entering the color value in the property pane",
                        React.createElement("i", null, "Value"),
                        " textbox."),
                    React.createElement("li", null,
                        "You can switch to 'Picker' and 'Palette' modes by clicking and selecting the mode from",
                        React.createElement("i", null, "Select Mode"),
                        " dropdownlist."),
                    React.createElement("li", null,
                        "you can enable or disable the ColorPicker using",
                        React.createElement("i", null, "Disabled"),
                        " checkbox from property pane."),
                    React.createElement("li", null,
                        "you can enable or disable the mode switcher using",
                        React.createElement("i", null, "Mode Switcher"),
                        " checkbox from property pane.")),
                React.createElement("p", null,
                    "More information about ColorPicker can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/color-picker/" }, "documentation section"),
                    "."))));
    };
    return Api;
}(sample_base_1.SampleBase));
exports.Api = Api;
