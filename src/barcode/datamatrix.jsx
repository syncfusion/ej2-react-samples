import * as React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent, FormValidator } from '@syncfusion/ej2-react-inputs';
import { DataMatrixGeneratorComponent } from "@syncfusion/ej2-react-barcode-generator";
import { SampleBase } from "../common/sample-base";
import { NumericTextBoxComponent, ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
let canShowError = false;
let customFn = (args) => {
    if (canShowError) {
        return false;
    }
    return true;
};
let options = {
    rules: {
        'textbox_0': { minLength: [customFn, 'Invalid input'] },
    }
};
export class DataMatrix extends SampleBase {
    rendereComplete() {
        let div = document.getElementsByClassName('sb-property-border')[0];
        this.formObject = new FormValidator('#form1', options);
        div.style.left = '63%';
    }
    render() {
        return (<div className="control-pane">
        <style>{sample_css}</style>
        <div className="col-lg-8 control-section" style={{ width: "64%" }}>
        <div className="content-wrapper" style={{ width: "100%", height: "590px" }}>
            <div className='center'>
              <div className='centercontrol'>
                <DataMatrixGeneratorComponent id="barcode" ref={barcode => (barcodeInstance = barcode)} width={"200px"} displayText={{ visibility: false }} invalid={(arg) => {
            canShowError = true;
            this.formObject.validate();
        }} height={"150px"} mode='SVG' type='DataMatrix' value='WWW.Syncfusion.com'></DataMatrixGeneratorComponent>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 property-section" style={{ width: "36%", paddingRight: "0px", paddingLeft: "18px" }}>
          <div className="property-panel-header">Appearance</div>
          <div id="propertypanel" className="e-remove-selection">
            <div className="property-section-content">
              <div className="row sb-child-row">
                <div className="col-xs-2 top" style={{ paddingLeft: "0px" }}>
                  Value
                </div>
                <div className="col-xs-10" style={{ paddingLeft: "0px" }}>
                <form id="form1" method="post">
                  <div id='barcodevaluediv'>
                    <TextBoxComponent ref={value => (barcodeValueInstance = value)} value='WWW.Syncfusion.com' id='textbox_0' change={valueOnChange}/>
                  </div>
                  </form>
                </div>
                
              </div>
            </div>
            <div className="row sb-child-row">
              <div>
                <div className="col-xs-2 top" style={{ paddingLeft: "0px", paddingRight: "20px" }}>
                  Width
                    </div>
                <div className="col-xs-3" style={{ width: "33%", paddingLeft: "0px" }}>
                  <NumericTextBoxComponent 
        //ref={widthRef => (portWidthNum = widthRef)}
        id="width" enabled={true} format={"###.##"} value={200} step={2} min={150} max={250} change={barcodewidthChange}/>
                </div>
                <div className="rightProperty">
                  height
                    </div>
                <div className="col-xs-3" style={{ width: "33%", paddingLeft: "0px" }}>
                  <NumericTextBoxComponent 
        //ref={widthRef => (portWidthNum = widthRef)}
        id="width" enabled={true} format={"###.##"} value={150} step={2} min={100} max={200} change={barcodeheightChange}/>
                </div>
              </div>
            </div>
            <div className="row sb-child-row" style={{ marginTop: "20px" }}>
              <div className="col-xs-6" style={{ paddingLeft: "0px" }}>
                <div className="col-xs-1" style={{ paddingLeft: "0px" }}>
                  <CheckBoxComponent id="textVisibility" checked={true} change={textVisibility}/>
                </div>
                <div className="col-xs-10">Text Visibility</div>
              </div>
              <div className="col-xs-4" style={{ paddingLeft: '0px', marginLeft: '13px' }}>
                <div className="col-xs-1" style={{ paddingLeft: '0px' }}>
                  <CheckBoxComponent id="svgMode" checked={true} change={modeChange}/>
                </div>
                <div className="svgTextClass">SVG Mode</div>
              </div>

            </div>
            <div className="row sb-child-row">
              <div style={{ marginTop: "2px" }}>
                <div className="col-xs-2" style={{ marginTop: "0px" }}>BG Color</div>
                <div className="col-xs-4" style={{ marginLeft: "0px" }}>
                  <ColorPickerComponent id="bgcolor" value="#000" change={barCodeColorChange}/>
                </div>
                <div className="col-xs-2" style={{ width: '18%', paddingLeft: '12px', marginTop: '5px' }}>Fore Color</div>
                <div className="col-xs-3" style={{ paddingLeft: "2px" }}>
                  <ColorPickerComponent id="forecolor" value="#000" change={foreColorChange}/>
                </div>
              </div>
            </div>
            <div className="property-panel-header">Margin</div>
            <div className="row sb-child-row">
              <div className="col-xs-2 top" style={{ paddingLeft: '0px' }}>Left</div>
              <div className="col-xs-3" style={{ width: '33%', paddingLeft: '0px' }}>
                <NumericTextBoxComponent id="marginLeft" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginLeft}/>
              </div>
              <div className="rightProperty">Right</div>
              <div className="col-xs-3" style={{ width: '33%', paddingLeft: '0px' }}>
                <NumericTextBoxComponent id="marginRight" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginRight}/>
                
              </div>
            </div>
            <div className="row sb-child-row">
              <div className="col-xs-2 top" style={{ paddingLeft: '0px' }}>Top</div>
              <div className="col-xs-3" style={{ width: '33%', paddingLeft: '0px' }}>
                <div style={{ paddingBottom: '8px' }}>
                  <NumericTextBoxComponent id="marginbottom" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginTop}/>
                </div>
              </div>
              <div className="rightProperty">Bottom</div>
              <div className="col-xs-3" style={{ width: '33%', paddingLeft: '0px' }}>
                <NumericTextBoxComponent id="marginBottom" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginBottom}/>
              </div>
            </div>
          </div>
          <div className="row sb-child-row">
            <div className="col-xs-2 top" style={{ paddingLeft: '0px' }}>DataMatrix Size</div>
            <div className="col-xs-3" style={{ width: '33%', paddingLeft: '0px' }}>
                <div className="padding-bottom: 8px">
                    
                    <DropDownListComponent id="matrixSizeId" popupWidth={150} width={"100%"} value='Auto' index={0} dataSource={matrixSize} change={matrixSizenChange} ref={fontfamily => (alignment = fontfamily)}/>
                </div>
            </div>
        </div>
        <div className="row sb-child-row">
            <div className="col-xs-2 top" style={{ paddingLeft: '0px' }}>DataMatrix Encoding</div>
            <div className="col-xs-3" style={{ width: '33%', paddingLeft: '0px' }}>
                <div style={{ paddingBottom: '8px' }}>
                <DropDownListComponent id="pdfDataMatrixEncodingValueId" popupWidth={150} width={"100%"} value='Auto' index={0} dataSource={pdfDataMatrixEncodingValue} change={encodingChange} ref={fontfamily => (alignment = fontfamily)}/>
                    
                </div>
            </div>
        </div>
          
        </div>
        <div id="action-description">
          <p>
          This sample displays encoded numerals or text as an optical label using solid adjacent borders in an L-shape and two other borders consisting of alternating dark and light cells or modules. Within these borders are rows and columns of cells that encode information.
          </p>
        </div>
        <div id="description">
          <p>
          This example shows how to display encoded text or numerical values as the label using the Barcode component. The `type` property can be used to set the barcode type as data matrix. The data matrix encoding type can be set using the `encoding` property of the Barcode component and the data matrix size can be defined using the `size` property of the component. 
          </p>

          
          <br />

        </div>
      </div>);
    }
}
const sample_css = ` 
.column-style {
  display: table;
  height: 35px;
  padding-right: 4px;
  padding-left: 0px;
  width: calc((100% - 12px) / 3);
}

.row {
  margin-left: 0px;
  margin-right: 0px;
}

.row-header {
  font-size: 15px;
  font-weight: 500;
}

.labelstyle {
  padding-top: 10px;
  float: left;
  padding-right: 10px
}

.propertystyle {
  padding-top: 22px;
  font-weight: 600;
  font-size: 15px;
}

.sb-child-row {
  margin-top: 8px;
}

.center {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  min-width: 280px;
  width: auto;
  border: 2px solid lightgray;
  min-height: 40%;
  padding-top: 35px;
}

.col-lg-4-property-section {
  width: 36%;
}

.rightProperty {
  margin-top: 10px;
  width: 16.66666667%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.textProperty {
  width: 81%;
  padding-left: 0px;
  padding-right: 0;
  float: left;
  position: relative;
  min-height: 1px;
}

.sb-mobile-prop-pane .svgTextClass {
  width: 40px;
  padding-left: 24px;
}

.svgTextClass {
  width: 100px;
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}



.sb-mobile-prop-pane .rightProperty {
  padding-left: 2px;
}

.sb-mobile-prop-pane .textPropertyClass {
  padding-left: 30px;
}

.sb-mobile-prop-pane .textProperty {
  padding-left: 30px;
  width: 77%
}

.textPropertyClass {
  width: 83.33333333%;
  float: left;
  padding-left: 0px;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
}

.allowedText {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  width: auto;
  height: auto;
}

.errorMessage {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  width: auto;
  height: auto;
}

.errorMessage {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  width: auto;
  height: auto;
}


.top {
  margin-top: 10px;
}

.centercontrol {
  margin: auto;
  width: 200px;
  height: 150px;
}

#password-info {
  position: absolute;
  margin-top: 30px;
}
.sb-child-row {
  margin-top: 8px;
}


.sb-property-border sb-prop-md-4{
  left: 64%
}

.property-panel-header {
  padding-top: 15px;
  padding-bottom: 15px;
}


.row-header {
  font-size: 13px;
  font-weight: 500;
  padding-left: 10px
}


.center {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  min-width: 280px;
  width: auto;
  border: 2px solid lightgray;
  min-height: 40%;
  padding-top: 35px;
}
`;
//FontType Collection
let pdfDataMatrixEncodingValue = [
    { value: 'Auto', text: 'Auto' },
    { value: 'ASCII', text: 'ASCII' },
    { value: 'ASCIINumeric', text: 'ASCIINumeric' },
    { value: 'Base256', text: 'Base256' },
];
//FontType Collection
let matrixSize = [
    { value: '0', text: 'Auto' },
    { value: '6', text: 'Size10x10' },
    { value: '12', text: 'Size12x12' },
    { value: '20', text: 'Size14x14' },
    { value: '23', text: 'Size16x16' },
    { value: '24', text: 'Size18x18' },
    { value: '24', text: 'Size20x20' },
    { value: '24', text: 'Size22x22' },
    { value: '24', text: 'Size24x24' },
    { value: '24', text: 'Size26x26' },
    { value: '24', text: 'Size32x32' },
    { value: '24', text: 'Size36x36' },
    { value: '24', text: 'Size40x40' },
    { value: '24', text: 'Size44x44' },
    { value: '24', text: 'Size48x48' },
    { value: '24', text: 'Size52x52' },
    { value: '24', text: 'Size64x64' },
    { value: '24', text: 'Size72x72' },
    { value: '24', text: 'Size80x80' },
    { value: '24', text: 'Size88x88' },
    { value: '24', text: 'Size96x96' },
    { value: '24', text: 'Size104x104' },
    { value: '24', text: 'Size120x120' },
    { value: '24', text: 'Size132x132' },
    { value: '24', text: 'Size144x144' },
    { value: '24', text: 'Size8x18' },
    { value: '24', text: 'Size8x32' },
    { value: '24', text: 'Size12x26' },
    { value: '24', text: 'Size12x36' },
    { value: '24', text: 'Size16x36' },
    { value: '24', text: 'Size16x48' },
];
let barcodeInstance;
let alignment;
let barcodeValueInstance;
let barcodetextInstance;
function valueOnChange(args) {
    let divElement = document.getElementById('barcodevaluediv');
    divElement.children[0].className = 'e-input-group e-control-wrapper';
    barcodeValueInstance.cssClass = 'e-input-group e-control-wrapper';
    barcodeValueInstance.dataBind();
    barcodeInstance.value = args.value.toString();
    barcodetextInstance.value = args.value.toString();
}
let positionList = [
    { type: 'Bottom', text: 'Bottom' },
    { type: 'Top', text: 'Top' },
];
let alignmentValue = [
    { type: 'Left', text: 'Left' },
    { type: 'Right', text: 'Right' },
    { type: 'Center', text: 'Center' },
];
function encodingChange(args) {
    barcodeInstance.encoding = (args.itemData.value.toString());
}
function barcodewidthChange(args) {
    barcodeInstance.width = args.value.toString();
}
function barcodeheightChange(args) {
    barcodeInstance.height = args.value.toString();
}
function textVisibility(args) {
    barcodeInstance.displayText.visibility = args.checked;
}
function matrixSizenChange(args) {
    barcodeInstance.size = (Number(args.itemData.value));
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
