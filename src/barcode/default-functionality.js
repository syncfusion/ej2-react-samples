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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_barcode_generator_1 = require("@syncfusion/ej2-react-barcode-generator");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_2 = require("@syncfusion/ej2-react-inputs");
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var canShowError = false;
var customFn = function (args) {
    if (canShowError) {
        return false;
    }
    return true;
};
var options = {
    rules: {
        'textbox_0': { minLength: [customFn, 'Invalid input'] },
    }
};
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.rendereComplete = function () {
        var div = document.getElementsByClassName('sb-property-border')[0];
        this.formObject = new ej2_inputs_1.FormValidator('#form1', options);
        div.style.left = '63%';
    };
    //public canShowError: boolean = false;
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, sample_css),
            React.createElement("div", { className: "col-lg-8 control-section", style: { width: "64%" } },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%", height: "590px" } },
                    React.createElement("div", { className: 'center' },
                        React.createElement("div", { className: 'centercontrol' },
                            React.createElement(ej2_react_barcode_generator_1.BarcodeGeneratorComponent, { id: "barcode", ref: function (barcode) { return (barcodeInstance = barcode); }, width: "200px", invalid: function (arg) {
                                    canShowError = true;
                                    _this.formObject.validate();
                                }, height: "150px", mode: 'SVG', type: 'Codabar', value: '123456789' }))),
                    React.createElement("div", { className: 'allowedText' },
                        React.createElement("span", { style: { fontWeight: 600 } }, " Allowed Input characters :"),
                        " support 16 letters: 0-9, -, $, :, /, ., + and start/stop characters A-D'"))),
            React.createElement("div", { className: "col-lg-4 property-section", style: { paddingRight: "0px", paddingLeft: "18px" } },
                React.createElement("div", { className: "property-panel-header" }, "Appearance"),
                React.createElement("div", { id: "propertypanel", className: "e-remove-selection" },
                    React.createElement("div", { className: "property-section-content" },
                        React.createElement("div", { className: "row sb-child-row" },
                            React.createElement("div", { className: "col-xs-2 top", style: { paddingLeft: "0px" } }, "Value"),
                            React.createElement("div", { className: "col-xs-10", style: { paddingLeft: "0px" } },
                                React.createElement("form", { id: "form1", method: "post" },
                                    React.createElement("div", { id: 'barcodevaluediv' },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: function (value) { return (barcodeValueInstance = value); }, value: '123456789', id: 'textbox_0', change: valueOnChange })))))),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "col-xs-2 top", style: { paddingLeft: "0px", paddingRight: "20px" } }, "Width"),
                            React.createElement("div", { className: "col-xs-3", style: { width: "33%", paddingLeft: "0px" } },
                                React.createElement(ej2_react_inputs_2.NumericTextBoxComponent
                                //ref={widthRef => (portWidthNum = widthRef)}
                                , { 
                                    //ref={widthRef => (portWidthNum = widthRef)}
                                    id: "width", enabled: true, format: "###.##", value: 200, step: 2, min: 150, max: 250, change: barcodewidthChange })),
                            React.createElement("div", { className: "rightProperty" }, "height"),
                            React.createElement("div", { className: "col-xs-3", style: { width: "33%", paddingLeft: "0px" } },
                                React.createElement(ej2_react_inputs_2.NumericTextBoxComponent
                                //ref={widthRef => (portWidthNum = widthRef)}
                                , { 
                                    //ref={widthRef => (portWidthNum = widthRef)}
                                    id: "width", enabled: true, format: "###.##", value: 150, step: 2, min: 100, max: 200, change: barcodeheightChange })))),
                    React.createElement("div", { className: "row sb-child-row", style: { marginTop: "20px" } },
                        React.createElement("div", { className: "col-xs-6", style: { paddingLeft: "0px" } },
                            React.createElement("div", { className: "col-xs-1", style: { paddingLeft: "0px" } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "textVisibility", checked: true, change: textVisibility })),
                            React.createElement("div", { className: "col-xs-10" }, "Text Visibility")),
                        React.createElement("div", { className: "col-xs-4", style: { paddingLeft: '0px', marginLeft: '13px' } },
                            React.createElement("div", { className: "col-xs-1", style: { paddingLeft: '0px' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "svgMode", checked: true, change: modeChange })),
                            React.createElement("div", { className: "svgTextClass" }, "SVG Mode"))),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", { style: { marginTop: "2px" } },
                            React.createElement("div", { className: "col-xs-2", style: { marginTop: "5px", paddingLeft: '0' } }, "BG Color"),
                            React.createElement("div", { className: "col-xs-4", style: { marginLeft: "0px" } },
                                React.createElement(ej2_react_inputs_2.ColorPickerComponent, { id: "bgcolor", value: "#000", change: barCodeColorChange })),
                            React.createElement("div", { className: "col-xs-2", style: { width: '18%', paddingLeft: '12px', marginTop: '5px' } }, "Fore Color"),
                            React.createElement("div", { className: "col-xs-3", style: { paddingLeft: "2px" } },
                                React.createElement(ej2_react_inputs_2.ColorPickerComponent, { id: "forecolor", value: "#000", change: foreColorChange })))),
                    React.createElement("div", { className: "property-panel-header" }, "Margin"),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", { className: "col-xs-2 top", style: { paddingLeft: '0px' } }, "Left"),
                        React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                            React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginLeft", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginLeft })),
                        React.createElement("div", { className: "rightProperty" }, "Right"),
                        React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                            React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginRight", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginRight }))),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", { className: "col-xs-2 top", style: { paddingLeft: '0px' } }, "Top"),
                        React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                            React.createElement("div", { style: { paddingBottom: '8px' } },
                                React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginbottom", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginTop }))),
                        React.createElement("div", { className: "rightProperty" }, "Bottom"),
                        React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                            React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginBottom", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginBottom })))),
                React.createElement("div", { className: "property-panel-header" }, " Text Properties"),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-2 top", style: { paddingLeft: '0px' } }, "Top"),
                    React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                        React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "TextmarginTop", enabled: true, format: "###.##", value: 0, step: 1, min: -10, max: 20, change: TextmarginTopChange })),
                    React.createElement("div", { className: "rightProperty" }, "Bottom"),
                    React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                        React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "TextmarginTop", enabled: true, format: "###.##", value: 0, step: 1, min: -10, max: 20, change: TextmarginBottomChangeChange }))),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-2", style: { paddingLeft: '0px' } }, "Position"),
                    React.createElement("div", { className: "textPropertyClass" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "position", popupWidth: 150, width: "100%", value: 'Bottom', index: 0, dataSource: positionList, change: updatePosition, ref: function (fontfamily) { return (position = fontfamily); } }))),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-2", style: { paddingLeft: '0px' } }, "Alignment"),
                    React.createElement("div", { className: "textPropertyClass" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "position", popupWidth: 150, width: "100%", value: 'Center', index: 0, dataSource: alignmentValue, change: updateAlignment, ref: function (fontfamily) { return (alignment = fontfamily); } }))),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-3 top", style: { width: '17%', paddingLeft: '0px' } }, "Display Text"),
                    React.createElement("div", { className: "textProperty" },
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: function (value) { return (barcodetextInstance = value); }, value: '123456789', change: textOnChange })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes a barcode that is designed to be accurately read even when printed with dot matrix printers. This type of barcode is widely used in applications that require serial numbers, such as blood bank management, slips for door-to door delivery services, and member cards.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample shows a codabar with a character set of 16 letters with four start and stop characters. The `type` property can be used to set the barcode type as `Codabar`."),
                React.createElement("br", null))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
var sample_css = " \n.column-style {\n  display: table;\n  height: 35px;\n  padding-right: 4px;\n  padding-left: 0px;\n  width: calc((100% - 12px) / 3);\n}\n\n.row {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n\n.row-header {\n  font-size: 15px;\n  font-weight: 500;\n}\n\n.labelstyle {\n  padding-top: 10px;\n  float: left;\n  padding-right: 10px\n}\n\n.propertystyle {\n  padding-top: 22px;\n  font-weight: 600;\n  font-size: 15px;\n}\n\n.sb-child-row {\n  margin-top: 8px;\n}\n\n.center {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  min-width: 280px;\n  width: auto;\n  border: 2px solid lightgray;\n  min-height: 40%;\n  padding-top: 35px;\n}\n\n.col-lg-4-property-section {\n  width: 36%;\n}\n\n.rightProperty {\n  margin-top: 10px;\n  width: 16.66666667%;\n  float: left;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n.textProperty {\n  width: 81%;\n  padding-left: 0px;\n  padding-right: 0;\n  float: left;\n  position: relative;\n  min-height: 1px;\n}\n\n.sb-mobile-prop-pane .svgTextClass {\n  width: 40px;\n  padding-left: 24px;\n}\n\n.svgTextClass {\n  width: 100px;\n  float: left;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n\n\n.sb-mobile-prop-pane .rightProperty {\n  padding-left: 2px;\n}\n\n.sb-mobile-prop-pane .textPropertyClass {\n  padding-left: 30px;\n}\n\n.sb-mobile-prop-pane .textProperty {\n  padding-left: 30px;\n  width: 77%\n}\n\n.textPropertyClass {\n  width: 83.33333333%;\n  float: left;\n  padding-left: 0px;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n}\n\n.allowedText {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n.errorMessage {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n.errorMessage {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n\n.top {\n  margin-top: 10px;\n}\n\n.centercontrol {\n  margin: auto;\n  width: 200px;\n  height: 150px;\n}\n\n#password-info {\n  position: absolute;\n  margin-top: 30px;\n}\n.sb-child-row {\n  margin-top: 8px;\n}\n\n\n.sb-property-border sb-prop-md-4{\n  left: 64%\n}\n\n.property-panel-header {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n  padding-left: 10px\n}\n\n\n.center {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  min-width: 280px;\n  width: auto;\n  border: 2px solid lightgray;\n  min-height: 40%;\n  padding-top: 35px;\n}\n";
var barcodeInstance;
var position;
var alignment;
var barcodeValueInstance;
var barcodetextInstance;
function valueOnChange(args) {
    var divElement = document.getElementById('barcodevaluediv');
    divElement.children[0].className = 'e-input-group e-control-wrapper';
    barcodeValueInstance.cssClass = 'e-input-group e-control-wrapper';
    barcodeValueInstance.dataBind();
    barcodeInstance.value = args.value.toString();
    barcodetextInstance.value = args.value.toString();
}
var positionList = [
    { type: 'Bottom', text: 'Bottom' },
    { type: 'Top', text: 'Top' },
];
var alignmentValue = [
    { type: 'Left', text: 'Left' },
    { type: 'Right', text: 'Right' },
    { type: 'Center', text: 'Center' },
];
function barcodewidthChange(args) {
    barcodeInstance.width = args.value.toString();
}
function barcodeheightChange(args) {
    barcodeInstance.height = args.value.toString();
}
function textVisibility(args) {
    barcodeInstance.displayText.visibility = args.checked;
}
function modeChange(args) {
    barcodeInstance.mode = args.checked ? 'SVG' : 'Canvas';
}
function barCodeColorChange(args) {
    barcodeInstance.backgroundColor = args.currentValue.hex;
}
function foreColorChange(args) {
    barcodeInstance.foreColor = args.currentValue.hex;
}
function barcodeMarginLeft(args) {
    barcodeInstance.margin.left = args.value;
}
function barcodeMarginRight(args) {
    barcodeInstance.margin.right = args.value;
}
function barcodeMarginTop(args) {
    barcodeInstance.margin.top = args.value;
}
function barcodeMarginBottom(args) {
    barcodeInstance.margin.bottom = args.value;
}
function TextmarginTopChange(args) {
    barcodeInstance.displayText.margin.top = args.value;
}
function TextmarginBottomChangeChange(args) {
    barcodeInstance.displayText.margin.bottom = args.value;
}
function updatePosition(value) {
    var positionValue = value.value;
    barcodeInstance.displayText.position = (positionValue);
}
function updateAlignment(value) {
    var alignnValue = value.value;
    barcodeInstance.displayText.alignment = (alignnValue);
}
function textOnChange(args) {
    barcodeInstance.displayText.text = args.value.toString();
}
