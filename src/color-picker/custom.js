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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./custom.css");
var CustomPalette = (function (_super) {
    __extends(CustomPalette, _super);
    function CustomPalette() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.circlePaletteColors = {
            'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
        };
        _this.squarePaletteColors = {
            'custom1': ['#b80000', '#db3e00', '#fccb00', '#008b02',
                '#006b76', '#1273de', '#004dcf', '#5300eb',
                '#eb9694', '#fad0c3', '#fef3bd', '#c1e1c5',
                '#bedadc', '#c4def6', '#bed3f3', '#d4c4fb']
        };
        _this.roundedPaletteColors = {
            'custom1': ['#ff6900', '#fcb900', '#7bdcb5', '#00d084',
                '#8ed1fc', '#0693e3', '#abb8c3', '#eb144c',
                '#f78da7', '#9900ef']
        };
        _this.scrollPaletteColors = {
            'custom1': ['#ef9a9a', '#e57373', '#ef5350', '#f44336', '#f48fb1', '#f06292',
                '#ec407a', '#e91e63', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#b39ddb',
                '#9575cd', '#7e57c2', '#673AB7'],
            'custom2': ['#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#90CAF9', '#64B5F6',
                '#42A5F5', '#2196F3', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4'],
            'custom3': ['#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#A5D6A7', '#81C784',
                '#66BB6A', '#4CAF50', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#E6EE9C',
                '#DCE775', '#D4E157', '#CDDC39'],
            'custom4': ['#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FFE082', '#FFD54F',
                '#FFCA28', '#FFC107', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FFAB91',
                '#FF8A65', '#FF7043', '#FF5722']
        };
        return _this;
    }
    CustomPalette.prototype.beforeCircleTileRender = function (args) {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild(ej2_base_1.createElement('span', { className: 'e-circle-selection' }));
    };
    CustomPalette.prototype.beforeSquareTileRender = function (args) {
        args.element.classList.add('e-square-palette');
    };
    CustomPalette.prototype.beforeRoundedTileRender = function (args) {
        args.element.classList.add('e-rounded-palette');
    };
    CustomPalette.prototype.beforeScrollTileRender = function (args) {
        args.element.classList.add('e-icons');
        args.element.classList.add('e-scroll-palette');
    };
    // function to handle the ColorPicker change event
    CustomPalette.prototype.change = function (args) {
        document.getElementById('e-shirt-preview').style.backgroundColor = args.currentValue.hex;
    };
    CustomPalette.prototype.roundedPaletteChange = function (args) {
        this.defaultObj.element.nextElementSibling.querySelector('.e-selected').style.boxShadow
            = args.currentValue.hex + ' 0 0 7px';
        document.getElementById('e-shirt-preview').style.backgroundColor = args.currentValue.hex;
    };
    CustomPalette.prototype.rendereComplete = function () {
        if (ej2_base_1.Browser.isDevice) {
            document.getElementById('custom-control').classList.add('e-mobile-control');
        }
    };
    CustomPalette.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'custom-control' },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { id: "e-shirt-preview" })),
                    React.createElement("div", { id: 'custom-content', className: 'row' },
                        React.createElement("div", { className: 'col-xs-12 col-sm-12 col-lg-6 col-md-6 e-circle-wrap' },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'circle-palette', mode: 'Palette', modeSwitcher: false, inline: true, showButtons: false, columns: 4, presetColors: this.circlePaletteColors, beforeTileRender: this.beforeCircleTileRender.bind(this), change: this.change.bind(this) })),
                        React.createElement("div", { className: 'col-xs-12 col-sm-12 col-lg-6 col-md-6 e-rounded-wrap' },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'rounded-palette', mode: 'Palette', ref: function (scope) { _this.defaultObj = scope; }, modeSwitcher: false, inline: true, showButtons: false, columns: 5, presetColors: this.roundedPaletteColors, beforeTileRender: this.beforeRoundedTileRender.bind(this), change: this.roundedPaletteChange.bind(this) })),
                        React.createElement("div", { className: 'col-xs-12 col-sm-12 col-lg-6 col-md-6 e-square-wrap' },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'square-palette', mode: 'Palette', modeSwitcher: false, inline: true, showButtons: false, columns: 8, presetColors: this.squarePaletteColors, beforeTileRender: this.beforeSquareTileRender.bind(this), change: this.change.bind(this) })),
                        React.createElement("div", { className: 'col-xs-12 col-sm-12 col-lg-6 col-md-6 e-scroll-wrap' },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'scroll-palette', mode: 'Palette', modeSwitcher: false, inline: true, showButtons: false, columns: 4, presetColors: this.scrollPaletteColors, beforeTileRender: this.beforeScrollTileRender.bind(this), change: this.change.bind(this) }))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates how to customize the color palettes with different types and styles.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The ColorPicker component is a user interface to select and adjust color values. This supports various color specifications like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes."),
                React.createElement("p", null, "In this sample,"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Select the shirt color from different customized palettes. It contains circle, square, rounded edge, and multiple scroll palettes."),
                    React.createElement("li", null,
                        "Using the",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/color-picker/#presetcolors" }, "presetColors")),
                        " property, you can specify the custom colors to be loaded.")),
                React.createElement("p", null,
                    "More information about ColorPicker can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/color-picker/how-to/customize-colorpicker/" }, "documentation section"),
                    "."))));
    };
    return CustomPalette;
}(sample_base_1.SampleBase));
exports.CustomPalette = CustomPalette;
