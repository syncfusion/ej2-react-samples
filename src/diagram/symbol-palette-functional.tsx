import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  SymbolPaletteComponent,
  SymbolInfo,
  Diagram,
  NodeModel,
  Connector,
  ConnectorModel,
  DiagramComponent,
  Rect,
  NodeConstraints,
} from "@syncfusion/ej2-react-diagrams";

import { updateSampleSection } from "../common/sample-base";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import {
  CheckBoxComponent,
  ChangeEventArgs
} from "@syncfusion/ej2-react-buttons";
import "./font-icons.css";
import { ExpandMode } from "@syncfusion/ej2-react-navigations";

const SAMPLE_CSS = `
/* These styles are used for toolbar icons*/
  @font-face {
    font-family: 'e-ddb-icons';
    src: url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .diagram-symbolpalette .e-ddb-icons {
    font-family: 'e-ddb-icons';
    speak: none;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Icon css in dropdown */
  .diagram-symbolpalette .e-basic::before {
    content: "\e726";
  }

  .diagram-symbolpalette .e-flow::before {
    content: "\e724";
  }

  .diagram-symbolpalette .e-connector::before {
    content: "\e725";
  }

  .symbolpalette-property-section table tr td:first-child {
    width: 50%;
  }

  .symbolpalette-property-section {
    overflow: auto;
    min-width: 22%
  }

  .symbolpalette-property-section table tr td div {
     padding-top: 18px;
     padding-bottom: 15px;
  }

  .diagram-symbolpalette {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .diagram-column {
    min-height: 600px;
    box-sizing: border-box;
  }

  .diagram-column {
    padding-right: 10px;
  }

  #symbolpalette, #diagram {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
  }

  .palette-column {
    flex: 1 1 170px;
    min-width: 170px;
  }

  .diagram-column {
    flex: 3 1 500px;
    min-width: 400px;
  }

  .property-panel-section {
    flex: 1 1 200px;
    min-width: 180px;
  }

  .property-panel-header {
    padding-left: 10px;
    padding-top: 0px;
  }
`;

//Initialize the flowShapes for the symbol palatte
let flowShapes: NodeModel[] = [
  { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
  { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
  { id: "Document", shape: { type: "Flow", shape: "Document" } },
  { id: "Process", shape: { type: "Flow", shape: "Process" } },
  {
    id: "PredefinedProcess",
    shape: { type: "Flow", shape: "PreDefinedProcess" }
  },

  { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } },
  { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
  { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
];
// Initialize the basicshapes for the symbol palatte
let basicShapes: NodeModel[] = [
  { id: "Rectangle", shape: { type: "Basic", shape: "Rectangle" } },
  { id: "Ellipse", shape: { type: "Basic", shape: "Ellipse" } },
  { id: "Hexagon", shape: { type: "Basic", shape: "Hexagon" } },
  { id: "Parallelogram", shape: { type: "Basic", shape: "Parallelogram" } },
  { id: "Triangle", shape: { type: "Basic", shape: "Triangle" } },
  { id: "Pentagon", shape: { type: "Basic", shape: "Pentagon" } },
  { id: "Cylinder", shape: { type: "Basic", shape: "Cylinder" } },
  { id: "Star", shape: { type: "Basic", shape: "Star" } }
];
//Initializes connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
  {
    id: "Link1",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 30, y: 30 },
    targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
    style: { strokeWidth: 2, strokeColor: '#757575' }
  },
  {
    id: "link3",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 30, y: 30 },
    style: { strokeWidth: 2, strokeColor: '#757575' },
    targetDecorator: { shape: "None" }
  },
  {
    id: "Link21",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 30, y: 30 },
    targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
    style: { strokeWidth: 2, strokeColor: '#757575' }
  },
  {
    id: "link23",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 30, y: 30 },
    style: { strokeWidth: 2, strokeColor: '#757575' },
    targetDecorator: { shape: "None" }
  },
  {
    id: "link33",
    type: "Bezier",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 30, y: 30 },
    style: { strokeWidth: 2, strokeColor: '#757575' },
    targetDecorator: { shape: "None" }
  }
];
//Collection of expand mode
let expandMode: { [key: string]: Object }[] = [
  { type: "Single", text: "Single" },
  { type: "Multiple", text: "Multiple" }
];

const nodeTemplateString: string = `
       \${if(id.includes('Script'))}
         <svg width="200" height="200">
        <path d="M 13.69 3.77 C 13.69 3.77 12.22 0.03 16.83 0 C 16.83 0 19.9 0.13 19 4.32 C 18.99 4.36 18.98 4.41 18.97 4.45 C 17.98 8.77 15.87 12.87 15.04 15.03 H 19.85 C 19.85 15.03 21.06 19.61 16.71 20 H 2.42 C 2.42 20 -1.39 18.58 0.55 14.68 L 4.24 3.84 H 0.63 C 0.63 3.84 -0.76 0.94 2.74 0.03 L 16.79 0 L 15.9 0.36 L 14.43 2.08 L 13.69 3.77 Z M 13.64 1.33 C 13.64 1.33 13.34 1.81 13.3 2.31 H 2.1 C 2.1 2.31 2.03 1.44 2.98 1.27 L 13.64 1.33 Z M 18.48 16.47 C 18.48 16.47 18.32 19.15 15.74 18.34 C 15.74 18.34 14.72 17.77 14.8 16.48 L 18.48 16.47 Z M 14.25 3.74 C 14.25 3.74 15.05 3.48 15.12 2.24 C 15.12 2.24 15.3 1.1 16.95 1.55 C 16.95 1.55 17.94 1.9 17.26 3.95 C 17.26 3.95 14.52 12.45 13.53 14.29 C 13.53 14.29 12.22 16.94 13.65 18.52 H 3.09 C 3.09 18.52 0.87 18.07 2.18 14.9 C 2.18 14.9 5.79 5.36 6.11 3.74 L 14.25 3.74 Z" visibility="visible" opacity="1" fill="skyblue" stroke="black" stroke-width="1" stroke-dasharray="none"></path>
        </svg>
        \${else if(id.includes('Settings'))}
         <svg width="200" height="200">
            <g><path d="M20,12 L20,8 L16.68,8 C16.56,7.57,16.39,7.17,16.19,6.79 L18.57,4.41 L15.73,1.58 L13.4,3.92 C12.96,3.66,12.5,3.47,12.01,3.32 L12.01,0 L8.01,0 L8.01,3.32 C7.55,3.46,7.12,3.64,6.71,3.86 L4.42,1.58 L1.59,4.41 L3.88,6.69 C3.64,7.11,3.47,7.54,3.33,8 L0,8 L0,12 L3.33,12 C3.48,12.49,3.67,12.96,3.92,13.4 L1.59,15.72 L4.41,18.55 L6.79,16.17 C7.18,16.38,7.58,16.54,8,16.67 L8,20 L12,20 L12,16.67 C12.46,16.53,12.89,16.35,13.3,16.12 L15.73,18.55 L18.55,15.72 L16.13,13.3 C16.36,12.89,16.53,12.45,16.67,12 L20,12 Z M10,13.8 C7.9,13.8,6.2,12.1,6.2,10 C6.2,7.9,7.9,6.2,10,6.2 C12.1,6.2,13.8,7.9,13.8,10 C13.8,12.1,12.1,13.8,10,13.8 Z " visibility="visible" opacity="1" role="img"  stroke="black" stroke-width="1" stroke-dasharray="none" fill="yellow"></path></g>
            <g><path d="M20,12 L20,8 L16.68,8 C16.56,7.57,16.39,7.17,16.19,6.79 L18.57,4.41 L15.73,1.58 L13.4,3.92 C12.96,3.66,12.5,3.47,12.01,3.32 L12.01,0 L8.01,0 L8.01,3.32 C7.55,3.46,7.12,3.64,6.71,3.86 L4.43,1.58 L1.59,4.41 L3.88,6.69 C3.64,7.11,3.47,7.54,3.33,8 L0,8 L0,12 L3.33,12 C3.48,12.49,3.67,12.96,3.92,13.4 L1.59,15.72 L4.42,18.55 L6.79,16.17 C7.18,16.38,7.58,16.54,8,16.67 L8,20 L12,20 L12,16.67 C12.46,16.53,12.89,16.35,13.3,16.12 L15.73,18.55 L18.56,15.72 L16.14,13.3 C16.36,12.89,16.54,12.45,16.67,12 L20,12 Z M10,13.8 C7.9,13.8,6.2,12.1,6.2,10 C6.2,7.9,7.9,6.2,10,6.2 C12.1,6.2,13.8,7.9,13.8,10 C13.8,12.1,12.1,13.8,10,13.8 Z " transform="translate(9,9)" visibility="visible" opacity="1" role="img"  stroke="black" stroke-width="1" stroke-dasharray="none" fill="grey"></path></g>
          </svg>
         \${else if(id.includes('Bluetooth'))}
         	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <!-- Blue background -->
            <rect width="24" height="24" fill="#007BFF"/>
            <!-- White Bluetooth logo with top/bottom gap -->
            <path d="M6.5 7.5L17.5 16.5L12 21V3L17.5 7.5L6.5 16.5" fill="none" stroke="white" stroke-width="2"/>
          </svg>
          \${else if(id.includes('Wi-Fi'))}
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#2196F3" height="200px" width="200px" viewBox="0 0 365.892 365.892" xml:space="preserve">
            <g>
              <circle cx="182.945" cy="286.681" r="41.494"/>
              <path d="M182.946,176.029c-35.658,0-69.337,17.345-90.09,46.398c-5.921,8.288-4.001,19.806,4.286,25.726   c3.249,2.321,6.994,3.438,10.704,3.438c5.754,0,11.423-2.686,15.021-7.724c13.846-19.383,36.305-30.954,60.078-30.954   c23.775,0,46.233,11.571,60.077,30.953c5.919,8.286,17.437,10.209,25.726,4.288c8.288-5.92,10.208-17.438,4.288-25.726   C252.285,193.373,218.606,176.029,182.946,176.029z"/>
              <path d="M182.946,106.873c-50.938,0-99.694,21.749-133.77,59.67c-6.807,7.576-6.185,19.236,1.392,26.044   c3.523,3.166,7.929,4.725,12.32,4.725c5.051-0.001,10.082-2.063,13.723-6.116c27.091-30.148,65.849-47.439,106.336-47.439   s79.246,17.291,106.338,47.438c6.808,7.576,18.468,8.198,26.043,1.391c7.576-6.808,8.198-18.468,1.391-26.043   C282.641,128.621,233.883,106.873,182.946,106.873z"/>
              <path d="M360.611,112.293c-47.209-48.092-110.305-74.577-177.665-74.577c-67.357,0-130.453,26.485-177.664,74.579   c-7.135,7.269-7.027,18.944,0.241,26.079c3.59,3.524,8.255,5.282,12.918,5.281c4.776,0,9.551-1.845,13.161-5.522   c40.22-40.971,93.968-63.534,151.344-63.534c57.379,0,111.127,22.563,151.343,63.532c7.136,7.269,18.812,7.376,26.08,0.242   C367.637,131.238,367.745,119.562,360.611,112.293z"/>
            </g>
            </svg>
        \${else if(id.includes('Meeting'))}
          <div style="width:100%; height:100%; background:#e3daf1;font-family:Arial;padding-left: 10px;">
            <div style="font-size:12px;font-weight:bold;margin-left:3px;padding-top: 16px;">📅Meeting</div>
            <div style="font-size:10px;margin-left:5px;">Team Sync @4PM</div>
            <div style="font-size:8px; color:#666;margin-left:5px;">Room 30</div>
        </div>
        \${else if(id.includes('Message'))}
        <div style="width:100%; height:100%; background:#f3e5f5;font-family:Arial;padding-left: 10px;">
            <div style="font-size:12px;font-weight:bold;margin-left:5px;padding-top: 16px;">👤 Alice</div>
            <div style="font-size:10px;margin-left:5px;">"Can we meet at 3PM?"</div>
            <div style="font-size:8px; color:#999;margin-left:5px;">2 mins ago</div>
        </div>
        \${else if(id.includes('BugFix'))}
        <div style="width:100%; height:100%; background:#fff3e0; font-family:Arial;padding-left: 10px;">
            <div style="font-size:12px;font-weight:bold;margin-left:5px;padding-top: 17px;">Bug Fix</div>
            <div style="font-size:10px;margin-left:5px;">Resolve login issue</div>
            <div style="font-size:8px; color:#999;margin-left:5px;">High Priority</div>
        </div>
        \${else if(id.includes('Weather'))}
        <div style="width:100%; height:100%; background:#e0f7fa;font-family:Arial;padding-left: 10px;">
          <div style="font-size:12px;font-weight:bold;margin-left:5px;padding-top: 25px;">🌤 28°C</div>
          <div style="font-size:10px;margin-left:5px;">Puducherry</div>
          <div style="font-size:8px; color:#666;margin-left:5px;">Humidity: 60%</div>
      </div>
    \${/if}
`;

let palette: SymbolPaletteComponent;
let size: NumericTextBoxComponent;
let expand: DropDownListComponent;
let diagramInstance: DiagramComponent;
let paletteIconInstance: HTMLElement;
let paletteSpaceInstance: HTMLElement;
let scrollableArea = new Rect(0, 0, 1500, 1500);
let isItemText = false;
let symbolSize = 50;
let htmlSymbolWidth = 91;
let htmlSymbolHeight = 100;

//Initializes the symbol palette
function SymbolPalette() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  //set Node default value
  function symbolDefaults(symbol: NodeModel): NodeModel {
    if (symbol.shape.type === 'HTML') {
      symbol.width = htmlSymbolWidth;
      symbol.height = htmlSymbolHeight;
    }
    symbol.style = { strokeWidth: 2, strokeColor: '#757575' };
    return symbol;
  }
  function nodeDefaults(node: NodeModel) {
    if (node.id.includes("BugFix")) {
      node.constraints = NodeConstraints.Default;
      node.tooltip.content = "";
    }
    return node;
  }
  function symbolInfo(symbol: NodeModel): SymbolInfo {
    if (symbol.shape.type === 'HTML') {
      return { width: htmlSymbolWidth, height: htmlSymbolHeight, fit: true };
    }
    return { width: symbolSize, height: symbolSize, fit: true };
  }
  //Enable or disable the animation for symbol palette
  function onAnimationChange(args: ChangeEventArgs): void {
    palette.enableAnimation = args.checked;
  }
  //Add or Remove the search for Symbol palette.
  function handleshowSearch(args: ChangeEventArgs) {
    if (args.checked) {
      palette.enableSearch = true;
    } else {
      palette.enableSearch = false;
    }
  }

  //Add or Remove the Text for Symbol palette item.
  function onItemTextChange(args: ChangeEventArgs): void {
    isItemText = args.checked;
    updateGetSymbolInfo();
  }
  function updateGetSymbolInfo(): void {
    palette.getSymbolInfo = (symbol: Symbol): SymbolInfo => {
      let object = {
        width: (symbol.shape.type === 'HTML')
          ? htmlSymbolWidth : symbolSize,

        height: (symbol.shape.type === 'HTML')
          ? isItemText ? htmlSymbolHeight + 20 : htmlSymbolHeight
          : symbolSize,
        fit: true,

        description: {
          text: isItemText
            ? (symbol.id === "BugFix" ? "Bug Fix" : symbol.id)
            : ''
        }
      }
      return object;
    }
    palette.refresh();
  }
  //Enable or disable the headerIcon for symbol palette headers
  function onHeaderIconChange(args: ChangeEventArgs): void {
    for (let i: number = 0; i < palette.palettes.length; i++) {
      if (args.checked) {
        if (i === 0) {
          palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-basic';
        } else if (i === 1) {
          palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-flow';
        } else if (i === 2) {
          palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-connector';
        }
      } else {
        palette.palettes[i].iconCss = '';
      }
    }
  }

  interface Symbol extends NodeModel {
    text?: string;
  }

  function SVGTemplate(): NodeModel[] {

    let svgnodes: NodeModel[] = [
      {
        id: 'Script', shape: { type: 'Native', scale: 'Stretch' }, width: 80, height: 80
      },
      {
        id: 'Settings', shape: { type: 'Native', scale: 'Stretch' }, width: 80, height: 80
      },
      {
        id: 'Bluetooth', shape: { type: 'Native', scale: 'Stretch' }, width: 70, height: 70
      },
      {
        id: 'Wi-Fi', shape: { type: 'Native', scale: 'Stretch' }, width: 70, height: 55
      },

    ];
    return svgnodes;
  }
  function HTMLTemplate() {
    let htmlNodes: NodeModel[] =
      [
        {
          id: 'Meeting', shape: { type: 'HTML' }, width: 80, height: 80
        },
        {
          id: 'Message', shape: { type: 'HTML' }, width: 80, height: 80
        },
        {
          id: 'Weather', shape: { type: 'HTML' }, width: 70, height: 55
        }, {
          id: 'BugFix', shape: { type: 'HTML' }, width: 70, height: 70, tooltip: { content: 'Bug Fix' }, constraints: NodeConstraints.Tooltip
        },

      ];
    return htmlNodes;
  }

  return (
    <div>
      <script
        id="nodeTemplate"
        type="text/x-template"
        dangerouslySetInnerHTML={{ __html: nodeTemplateString }}
      />

      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <div className="diagram-symbolpalette" style={{ width: '100%' }} >
          <div className="palette-column">
            <div className="sb-mobile-palette-bar">
              <div
                id="palette-icon"
                ref={(paletteIcon) => (paletteIconInstance = paletteIcon)}
                role="button"
                className="e-ddb-icons1 e-toggle-palette"
              ></div>
            </div>
            {/* Column 1: Palette */}

            <SymbolPaletteComponent
              id="symbolpalette"
              ref={(symbolpal: SymbolPaletteComponent) => (palette = symbolpal)}
              expandMode={'Multiple'}
              palettes={[
                {
                  id: 'flow',
                  expanded: true,
                  symbols: flowShapes,
                  title: 'Flow Shapes',
                  iconCss: 'e-diagram-icons1 e-diagram-flow',
                },
                {
                  id: 'basic',
                  expanded: true,
                  symbols: basicShapes,
                  title: 'Basic Shapes',
                  iconCss: 'e-diagram-icons1 e-diagram-basic',
                },
                {
                  id: 'connectors',
                  expanded: true,
                  symbols: connectorSymbols,
                  title: 'Connectors',
                  iconCss: 'e-diagram-icons1 e-diagram-connector',
                },
                {
                  id: 'nodeSVG',
                  expanded: true,
                  symbols: SVGTemplate(),
                  title: 'SVG Shapes'
                },
                {
                  id: 'nodeHtml',
                  expanded: true,
                  symbols: HTMLTemplate(),
                  title: 'HTML Shapes'
                }
              ]}
              enableAnimation={true}
              enableSearch={true}
              width={'100%'}
              height={'900px'}
              nodeTemplate='#nodeTemplate'
              getNodeDefaults={symbolDefaults.bind(this)}
              getSymbolInfo={symbolInfo.bind(this)}
              symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
            />
          </div>

          {/* Column 2: Diagram (expands to fill space) */}
          <div className="diagram-column">
            <DiagramComponent
              id="diagram"
              ref={(diagram: DiagramComponent) => (diagramInstance = diagram)}
              width={'100%'}
              height={'900px'}
              rulerSettings={{ showRulers: true }}
              pageSettings={{ width: 1500, height: 1500 }}
              getNodeDefaults={nodeDefaults.bind(this)}
              nodeTemplate='#nodeTemplate'
              scrollSettings={{
                scrollLimit: 'Infinity',
                canAutoScroll: true,
                autoScrollBorder: { left: 10, right: 10, top: 10, bottom: 10 },
                scrollableArea: scrollableArea,
              }}
            ></DiagramComponent>
          </div>
          {/* Column 3: Properties */}
          <div className="symbolpalette-property-section">
            <div className="property-panel-section" style={{ paddingLeft: '5px' }}>
              <div className="property-panel-header" style={{ paddingLeft: '0px' }}>Properties</div>
              <div className="property-panel-content">
                <table id="property" title="Properties" style={{ width: '100%', height: '100%' }}>
                  <tr style={{ height: "50px" }}>
                    <td>
                      <div>Expandable </div>
                    </td>
                    <td >
                      {/* DropDownList is used to change the expandMode of the Symbolpallete. */}
                      <div style={{ paddingLeft: '20px', paddingTop: '10px' }}>
                        <DropDownListComponent
                          id="expand"
                          index={1}
                          width={120}
                          ref={(expandRef: DropDownListComponent) => (expand = expandRef)}
                          dataSource={expandMode}
                          change={() => {
                            palette.expandMode = expand.value as ExpandMode;
                            palette.dataBind();
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "50px" }}>
                    <td >
                      <div>Symbol Size </div>
                    </td>
                    <td >
                      {/* NumericTextBox is used to apply the size of the Symbol. */}
                      <div style={{ paddingLeft: '20px', paddingTop: '10px' }}>
                        <NumericTextBoxComponent
                          id="size"
                          value={50}
                          min={40}
                          max={90}
                          width={120}
                          step={5}
                          format="##.##"
                          change={(args) => {
                            if (symbolSize != args.value) {
                              symbolSize = args.value;
                              updateGetSymbolInfo();
                            }
                          }}
                          ref={(sizeRef: NumericTextBoxComponent) => (size = sizeRef)}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "50px" }}>
                    <td >
                      <div style={{ paddingTop: '14px' }}>Animation </div>
                    </td>
                    <td >
                      {/* Enable or disable the animation of the symbol palette. */}
                      <div style={{ paddingTop: '10px', paddingLeft: '20px' }}>
                        <CheckBoxComponent
                          id="animation"
                          checked={true}
                          change={onAnimationChange}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "50px" }}>
                    <td >
                      <div style={{ paddingTop: '14px' }}>Item Text </div>
                    </td>
                    <td>
                      <div style={{ paddingTop: '10px', paddingLeft: '20px' }}>
                        <CheckBoxComponent id="itemtext" change={onItemTextChange} />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "50px" }}>
                    <td >
                      <div style={{ paddingTop: '14px' }}>Header Icon </div>
                    </td>
                    <td >
                      <div style={{ paddingTop: '10px', paddingLeft: '20px' }}>
                        <CheckBoxComponent id="headericon" checked={true} change={onHeaderIconChange} />
                      </div>
                    </td>

                  </tr>
                  <tr style={{ height: "50px" }}>
                    <td >
                      <div style={{ paddingTop: '14px' }}>Show Search TextBox </div>
                    </td>
                    <td >
                      <div style={{ paddingTop: '10px', paddingLeft: '20px' }}>
                        <CheckBoxComponent
                          id="showsearch"
                          checked={true}
                          change={handleshowSearch}
                        />
                      </div>
                    </td>

                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the customizable options of symbol palette.
        </p>
      </div>
      <div id="description">
        <p>
          This example demonstrates how to add shapes to a symbol palette and customize their appearance using the Syncfusion Diagram component. Symbol sizes can be adjusted using the <code>width</code> and <code>height</code> properties via the <code>getSymbolInfo</code> method.
        </p>
        <p>Additional features include:</p>
        <ul>
          <li>Enabling or disabling animation using the <code>enableAnimation</code> property.</li>
          <li>Activating search functionality with the <code>enableSearch</code> property, allowing users to find symbols by ID or search tags</li>
        </ul>
        <p>Note: The size of <b>"HTML Shapes"</b> in the symbol palette is restricted at runtime when modifying symbol size property, to maintain a consistent layout and visual appearance.</p>
        <br />
      </div>
    </div>
  );
}
export default SymbolPalette;

