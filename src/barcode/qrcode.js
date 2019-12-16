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
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
//import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
var ej2_react_inputs_2 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
//import { ChangeEventArgs } from "@syncfusion/ej2-calendars";
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
var QrCode = /** @class */ (function (_super) {
    __extends(QrCode, _super);
    function QrCode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QrCode.prototype.rendereComplete = function () {
        var div = document.getElementsByClassName('sb-property-border')[0];
        this.formObject = new ej2_inputs_1.FormValidator('#form1', options);
        div.style.left = '63%';
    };
    QrCode.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, sample_css),
            React.createElement("div", { className: "col-lg-8 control-section", style: { width: "64%" } },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%", height: "590px" } },
                    React.createElement("div", { className: 'center' },
                        React.createElement("div", { className: 'centercontrol' },
                            React.createElement(ej2_react_barcode_generator_1.QRCodeGeneratorComponent, { id: "barcode", ref: function (barcode) { return (barcodeInstance = barcode); }, width: "200px", displayText: { visibility: false }, invalid: function (arg) {
                                    canShowError = true;
                                    _this.formObject.validate();
                                }, height: "150px", mode: 'SVG', type: 'QRCode', value: 'Syncfusion' }))))),
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
                            React.createElement("div", { className: "col-xs-2", style: { marginTop: "0px" } }, "BG Color"),
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
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-2 top", style: { paddingLeft: '0px' } }, "Version"),
                    React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                        React.createElement("div", { className: "padding-bottom: 8px" },
                            React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "version", enabled: true, format: "###.##", value: 1, step: 1, min: 1, max: 40, change: versionChange })))),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-2 top", style: { paddingLeft: '0px' } }, "Error Correction Level"),
                    React.createElement("div", { className: "col-xs-3", style: { width: '33%', paddingLeft: '0px' } },
                        React.createElement("div", { className: "padding-bottom: 8px" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "position", popupWidth: 150, width: "100%", value: 'Medium', index: 0, dataSource: errorCorrectionLevel, change: errorCorrectionChange, ref: function (fontfamily) { return (alignment = fontfamily); } }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample displays a machine-readable optical label that contains information about the item to which it is attached. The information may be a location, a URL, an address book, etc.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This example shows how to display a URL as the optical label using the Barcode component. The `type` property can be used to set the barcode type as one-dimensional or two-dimensional. The `version` property is used to set the version of the QR barcode. Also, the Barcode component provides support to set the error correction level on a QR-type barcode by using the `errorCorrectionLevel` property."),
                React.createElement("br", null))));
    };
    return QrCode;
}(sample_base_1.SampleBase));
exports.QrCode = QrCode;
var sample_css = " \n.column-style {\n  display: table;\n  height: 35px;\n  padding-right: 4px;\n  padding-left: 0px;\n  width: calc((100% - 12px) / 3);\n}\n\n.row {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n\n.row-header {\n  font-size: 15px;\n  font-weight: 500;\n}\n\n.labelstyle {\n  padding-top: 10px;\n  float: left;\n  padding-right: 10px\n}\n\n.propertystyle {\n  padding-top: 22px;\n  font-weight: 600;\n  font-size: 15px;\n}\n\n.sb-child-row {\n  margin-top: 8px;\n}\n\n.center {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  min-width: 280px;\n  width: auto;\n  border: 2px solid lightgray;\n  min-height: 40%;\n  padding-top: 35px;\n}\n\n.col-lg-4-property-section {\n  width: 36%;\n}\n\n.rightProperty {\n  margin-top: 10px;\n  width: 16.66666667%;\n  float: left;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n.textProperty {\n  width: 81%;\n  padding-left: 0px;\n  padding-right: 0;\n  float: left;\n  position: relative;\n  min-height: 1px;\n}\n\n.sb-mobile-prop-pane .svgTextClass {\n  width: 40px;\n  padding-left: 24px;\n}\n\n.svgTextClass {\n  width: 100px;\n  float: left;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n\n\n.sb-mobile-prop-pane .rightProperty {\n  padding-left: 2px;\n}\n\n.sb-mobile-prop-pane .textPropertyClass {\n  padding-left: 30px;\n}\n\n.sb-mobile-prop-pane .textProperty {\n  padding-left: 30px;\n  width: 77%\n}\n\n.textPropertyClass {\n  width: 83.33333333%;\n  float: left;\n  padding-left: 0px;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n}\n\n.allowedText {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n.errorMessage {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n.errorMessage {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n\n.top {\n  margin-top: 10px;\n}\n\n.centercontrol {\n  margin: auto;\n  width: 200px;\n  height: 150px;\n}\n\n#password-info {\n  position: absolute;\n  margin-top: 30px;\n}\n.sb-child-row {\n  margin-top: 8px;\n}\n\n\n.sb-property-border sb-prop-md-4{\n  left: 64%\n}\n\n.property-panel-header {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n  padding-left: 10px\n}\n\n\n.center {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  min-width: 280px;\n  width: auto;\n  border: 2px solid lightgray;\n  min-height: 40%;\n  padding-top: 35px;\n}\n";
var barcodeInstance;
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
var errorCorrectionLevel = [
    { value: '7', text: 'Low' },
    { value: '15', text: 'Medium' },
    { value: '25', text: 'Quartile' },
    { value: '30', text: 'High' },
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
function versionChange(args) {
    barcodeInstance.version = args.value;
}
function errorCorrectionChange(args) {
    barcodeInstance.errorCorrectionLevel = (Number(args.itemData.value));
}
