import * as React from "react";
import { SymbolPaletteComponent } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import "./font-icons.css";
const SAMPLE_CSS = `.property-panel-header {
padding-top: 15px;
padding-bottom: 15px;
}

.row {
  margin-left: 0px;
  margin-right: 0px;
}

.row-header {
  font-size: 13px;
  font-weight: 500;
}

.diagram-control-pane .col-xs-6 {
  padding-left: 0px;
  padding-right: 0px;
}`;
//Initialize the flowshapes for the symbol palatte
let flowshapes = [
    { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
    { id: "Process", shape: { type: "Flow", shape: "Process" } },
    { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
    { id: "Document", shape: { type: "Flow", shape: "Document" } },
    {
        id: "PreDefinedProcess",
        shape: { type: "Flow", shape: "PreDefinedProcess" }
    },
    { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
    { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
    { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } }
];
let basicShapes = [
    { id: "Rectangle", shape: { type: "Basic", shape: "Rectangle" } },
    { id: "Ellipse", shape: { type: "Basic", shape: "Ellipse" } },
    { id: "Parallelogram", shape: { type: "Basic", shape: "Parallelogram" } },
    { id: "Triangle", shape: { type: "Basic", shape: "Triangle" } },
    { id: "Hexagon", shape: { type: "Basic", shape: "Hexagon" } },
    { id: "Pentagon", shape: { type: "Basic", shape: "Pentagon" } },
    { id: "Cylinder", shape: { type: "Basic", shape: "Cylinder" } },
    { id: "Star", shape: { type: "Basic", shape: "Star" } }
];
//Initializes connector symbols for the symbol palette
let connectorSymbols = [
    {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link3",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "Link21",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link23",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "link33",
        type: "Bezier",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    }
];
let expandMode = [
    { type: "Single", text: "Single" },
    { type: "Multiple", text: "Multiple" }
];
let palette;
let size;
let expand;
export class SymbolPalette extends SampleBase {
    render() {
        return (<div className="control-pane">
        <div className="col-lg-8 control-section" id="palette-space">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <SymbolPaletteComponent id="symbolpalette" ref={symbolpal => (palette = symbolpal)} expandMode={"Multiple"} allowDrag={true} palettes={[
            {
                id: "flow",
                expanded: true,
                symbols: flowshapes,
                title: "Flow Shapes",
                iconCss: "e-diagram-icons1 e-diagram-flow"
            },
            {
                id: "basic",
                expanded: true,
                symbols: basicShapes,
                title: "Basic Shapes",
                iconCss: "e-diagram-icons1 e-diagram-basic"
            },
            {
                id: "connectors",
                expanded: true,
                symbols: connectorSymbols,
                title: "Connectors",
                iconCss: "e-diagram-icons1 e-diagram-connector"
            }
        ]} enableAnimation={true} width={"100%"} height={"100%"} symbolWidth={80} symbolHeight={80} //set Node default value
         getNodeDefaults={this.nodeDefaults.bind(this)} getSymbolInfo={this.symbolInfo.bind(this)} symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}/>
          </div>
        </div>

        <div className="col-lg-4 property-section">
        <div className="property-panel-header">Properties</div>
          <table id="property" title="Properties">
            <tr>
              <td style={{ width: "45%" }}>
                <div>Expandable: </div>
              </td>
              <td style={{ width: "60%" }}>
                
                <DropDownListComponent id="expand" index={1} ref={expandRef => (expand = expandRef)} dataSource={expandMode} change={() => {
            palette.expandMode = expand.value;
            palette.dataBind();
        }}/>
              </td>
            </tr>
            <tr>
              <td style={{ width: "45%" }}>
                <div>Symbol Size: </div>
              </td>
              <td style={{ width: "60%" }}>
                
                <NumericTextBoxComponent id="size" value={80} min={40} max={100} width={120} step={5} format="##.##" change={() => {
            palette.symbolHeight = size.value;
            palette.symbolWidth = size.value;
        }} ref={sizeRef => (size = sizeRef)}/>
              </td>
            </tr>
            <tr>
              <td style={{ width: "45%", paddingBottom: "10px" }}>
                <div>Animation: </div>
              </td>
              <td style={{ width: "60%", paddingBottom: "10px" }}>
                
                <CheckBoxComponent id="animation" checked={true} change={onAnimationChange}/>
              </td>
            </tr>
            <tr>
              <td style={{ width: "45%", paddingBottom: "10px" }}>
                <div>Item Text: </div>
              </td>
              <td style={{ width: "60%", paddingBottom: "10px" }}>
                <CheckBoxComponent id="itemtext" change={onItemTextChange}/>
              </td>
            </tr>
            <tr>
              <td style={{ width: '45%', paddingBottom: '10px' }}>
                <div>Header Icon: </div>
              </td>
              <td style={{ width: '60%', paddingBottom: '10px' }}>
                <CheckBoxComponent id="headericon" checked={true} change={onHeaderIconChange}/>
              </td>

            </tr>
          </table>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the customizable options of symbol palette.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to add shapes to symbol palette and customize
            the symbol palette. The
            <code>symbols</code> property can be used to add shapes to symbol
              palette. The
            <code>symbolWidth</code> and
            <code>symbolHeight</code> properties allow you to define the size of
              the symbols.
          </p>
          <p>
            In this example, options to enable/disable animation, show/hide
            symbol descriptions are provided.
          </p>
          <br />
        </div>
      </div>);
    }
    nodeDefaults(symbol) {
        if (symbol.id === "Terminator" || symbol.id === "Process") {
            symbol.width = 80;
            symbol.height = 40;
        }
        else if (symbol.id === "Document" ||
            symbol.id === "PreDefinedProcess" ||
            symbol.id === "PaperTap" ||
            symbol.id === "DirectData") {
            symbol.width = 50;
            symbol.height = 40;
        }
        symbol.style = { strokeWidth: 2 };
        return symbol;
    }
    symbolInfo(symbol) {
        symbol.fit = true;
        return symbol;
    }
}
function onAnimationChange(args) {
    palette.enableAnimation = args.checked;
}
//Add or Remove the Text for Symbol palette item.
function onItemTextChange(args) {
    if (args.checked) {
        palette.getSymbolInfo = (symbol) => {
            if (symbol.text !== undefined) {
                return { description: { text: symbol.text, overflow: "Wrap" } };
            }
            return { description: { text: symbol.id } };
        };
    }
    else {
        palette.getSymbolInfo = (symbol) => {
            return { description: { text: "" } };
        };
    }
    palette.dataBind();
}
function onHeaderIconChange(args) {
    for (let i = 0; i < palette.palettes.length; i++) {
        if (args.checked) {
            if (i === 0) {
                palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-basic';
            }
            else if (i === 1) {
                palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-flow';
            }
            else if (i === 2) {
                palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-connector';
            }
        }
        else {
            palette.palettes[i].iconCss = '';
        }
    }
}
