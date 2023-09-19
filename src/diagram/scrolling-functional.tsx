import * as ReactDOM from "react-dom";
import * as React from "react";
import {
    DiagramComponent,
    Node,
    Diagram,
    Inject,
    UndoRedo,
    NodeModel,
    GridlinesModel,
    Rect,
    SymbolPaletteComponent,
    Connector,
    IDragEnterEventArgs,
    ConnectorModel,
  } from '@syncfusion/ej2-react-diagrams';
import { updateSampleSection } from "../common/sample-base";
import "./font-icons.css";
import {
    TextBoxComponent,
  } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
Diagram.Inject(UndoRedo);


/**
 * Diagram Default sample
 */
 let basicShapes: NodeModel[] = [
    {
      id: 'rectangle',
      shape: { type: 'Basic', shape: 'Rectangle' },
    },
    {
      id: 'ellipse',
      shape: { type: 'Basic', shape: 'Ellipse' },
    },
    {
      id: 'triangle',
      shape: { type: 'Basic', shape: 'Triangle' },
    },
    {
      id: 'plus',
      shape: { type: 'Basic', shape: 'Plus' },
    },
    {
      id: 'star',
      shape: { type: 'Basic', shape: 'Star' },
    },
    {
      id: 'pentagon',
      shape: { type: 'Basic', shape: 'Pentagon' },
    },
    {
      id: 'heptagon',
      shape: { type: 'Basic', shape: 'Heptagon' },
    },
    {
      id: 'octagon',
      shape: { type: 'Basic', shape: 'Octagon' },
    },
    {
      id: 'trapezoid',
      shape: { type: 'Basic', shape: 'Trapezoid' },
    },
    {
      id: 'decagon',
      shape: { type: 'Basic', shape: 'Decagon' },
    },
    {
      id: 'rightTriangle',
      shape: { type: 'Basic', shape: 'RightTriangle' },
    },
    {
      id: 'parallelogram',
      shape: { type: 'Basic', shape: 'Parallelogram' },
    },
  ];
  //Initialize the flowshapes for the symbol palatte
  let flowShapes: NodeModel[]  = [
    { id: 'terminator1', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'process1', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'extract1', shape: { type: 'Flow', shape: 'Extract' } },
    { id: 'manualOperation1', shape: { type: 'Flow', shape: 'ManualOperation' } },
    { id: 'merge1', shape: { type: 'Flow', shape: 'Merge' } },
    {
      id: 'offPageReference1',
      shape: { type: 'Flow', shape: 'OffPageReference' },
    },
    {
      id: 'sequentialAccessStorage1',
      shape: { type: 'Flow', shape: 'SequentialAccessStorage' },
    },
    { id: 'annotation1', shape: { type: 'Flow', shape: 'Annotation' } },
    { id: 'annotation21', shape: { type: 'Flow', shape: 'Annotation2' } },
    { id: 'data1', shape: { type: 'Flow', shape: 'Data' } },
    { id: 'summingJunction1', shape: { type: 'Flow', shape: 'SummingJunction' } },
    { id: 'or1', shape: { type: 'Flow', shape: 'Or' } },
    { id: 'internalStorage1', shape: { type: 'Flow', shape: 'InternalStorage' } },
    { id: 'card1', shape: { type: 'Flow', shape: 'Card' } },
    { id: 'delay1', shape: { type: 'Flow', shape: 'Delay' } },
    { id: 'decision1', shape: { type: 'Flow', shape: 'Decision' } },
    { id: 'document1', shape: { type: 'Flow', shape: 'Document' } },
    {
      id: 'preDefinedProcess1',
      shape: { type: 'Flow', shape: 'PreDefinedProcess' },
    },
    { id: 'paperTap1', shape: { type: 'Flow', shape: 'PaperTap' } },
    { id: 'directData1', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'sequentialData1', shape: { type: 'Flow', shape: 'SequentialData' } },
    { id: 'sort1', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'multiDocument1', shape: { type: 'Flow', shape: 'MultiDocument' } },
    { id: 'collate1', shape: { type: 'Flow', shape: 'Collate' } },
  ];

  let connectorSymbols: ConnectorModel[] = [
    {
      id: "Link1",
      type: "Orthogonal",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: "link3",
      type: "Orthogonal",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: "None" },
    },
    {
      id: "Link21",
      type: "Straight",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: "link23",
      type: "Straight",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: "None" }
    },
    {
      id: "link33",
      type: "Bezier",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: "None" }
    }
  ];
  
  let interval: number[];
  interval = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
    0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  ];
  let gridlines:GridlinesModel = {
    lineColor: '#e0e0e0',
    lineIntervals: interval,
  };
  const sample_css = `
  .db-text {
      float: left;
      width: 20px;
      text-align: center;
      height: auto;
      margin-top: 4px;
      color: #8C8C8C;
  }
  
  .db-text-input {
      width: calc(100% - 15px);
      padding: 2px 2px 0px 0px;
  }
  
  .db-text-input input {
      width: 100%;
      height: 100%;
      border: none;
  }
  .row{
    margin-right:-15px;
    margin-left:-15px;
  }
  .e-tab .e-content .e-item{
    font-size:14px;
  }
  
    `;
let diagramInstance: DiagramComponent;
let fontFamily:any;
function ScrollingSample() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  function rendereComplete() {
    addEvents();
  }
  let fields:any = { text: 'text', value: 'value' };
  let scrollLimitDatasource:any = [
    { text: 'Infinity', value: 'Infinity' },
    { text: 'Diagram', value: 'Diagram' },
    { text: 'Limited', value: 'Limited' },
  ];
  let scrollableArea:any = new Rect(0, 0, 1500, 1500);
  let isMobile: boolean;

  function addEvents(): void {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      let paletteIcon: HTMLElement = document.getElementById('palette-icon');
      if (paletteIcon) {
        paletteIcon.addEventListener('click', openPalette, false);
      }
    }
  }
  function openPalette(): void {
    let paletteSpace: HTMLElement = document.getElementById('palette-space');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
        paletteSpace.classList.add('sb-mobile-palette-open');
      } else {
        paletteSpace.classList.remove('sb-mobile-palette-open');
      }
    }
  }
  return (
<div className="control-pane">
<style>{sample_css}</style>
        <div className="control-section">
          <div style={{ width: '100%' }}>
            <div className="sb-mobile-palette-bar">
              <div
                id="palette-icon"
                style={{ float: 'right' }}
                className="e-ddb-icons1 e-toggle-palette"
              ></div>
            </div>
            <div
              id="palette-space"
              className="sb-mobile-palette"
              style={{ width: '20%', float: 'left' }}
            >
              <SymbolPaletteComponent
                id="symbolpalette"
                expandMode="Single"
                palettes={[
                  {
                    id: 'basic',
                    expanded: true,
                    symbols: basicShapes,
                    iconCss: 'e-diagram-icons1 e-diagram-basic',
                    title: 'Basic Shapes',
                  },
                  {
                    id: 'flow',
                    expanded: false,
                    symbols: flowShapes,
                    iconCss: 'e-diagram-icons1 e-diagram-flow',
                    title: 'Flow Shapes',
                  },
                  {
                    id: "connectors",
                    expanded: false,
                    symbols: connectorSymbols,
                    iconCss: "e-diagram-icons1 e-diagram-connector",
                    title: "Connectors"
                  }
                ]}
                width={'100%'}
                height={'700px'}
                symbolHeight={60}
                symbolWidth={60}
                getNodeDefaults={(symbol:any) => {
                  let obj = symbol;
                  if (obj.id === 'terminator' || obj.id === 'process') {
                    obj.width = 80;
                    obj.height = 40;
                  } else if (
                    obj.id === 'decision' ||
                    obj.id === 'document' ||
                    obj.id === 'preDefinedProcess' ||
                    obj.id === 'paperTap' ||
                    obj.id === 'directData' ||
                    obj.id === 'multiDocument' ||
                    obj.id === 'data'
                  ) {
                    obj.width = 50;
                    obj.height = 40;
                  } else {
                    obj.width = 50;
                    obj.height = 50;
                  }
                  obj.style.strokeColor = '#757575';
                }}
                symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                getSymbolInfo={(symbol:any) => {
                  return { fit: true };
                }}
              />
            </div>
            <div
              id="diagram-space"
              className="sb-mobile-diagram"
              style={{ width: '59%', float: 'left' }}
            >
              <DiagramComponent
                id="diagram"
                ref={(diagram) => (diagramInstance = diagram)}
                width={'100%'}
                height={'700px'}
                snapSettings={{
                  horizontalGridlines: gridlines,
                  verticalGridlines: gridlines,
                }}
                rulerSettings={{ showRulers: true }}
                pageSettings={{ width: 1500, height: 1500 }}
                scrollSettings={{
                  scrollLimit: 'Infinity',
                  canAutoScroll: true,
                  autoScrollBorder: { left: 30, right: 30, top: 30, bottom: 30 },
                  scrollableArea: scrollableArea,
                }}
                getNodeDefaults={(node:NodeModel) => {
                  if (node.width === undefined) {
                    node.width = 145;
                  } else {
                    var ratio = 100 / node.width;
                    node.width = 100;
                    node.height *= ratio;
                  }
                  node.style = { fill: '#357BD2', strokeColor: 'white' };
                  node.annotations = [
                    { style: { color: 'white', fill: 'transparent' } },
                  ];
                  return node;
                }} //Sets the default values of a connector
                getConnectorDefaults={(connector:Connector) => {
                  if (connector.id.indexOf('connector') !== -1) {
                    connector.type = 'Orthogonal';
                    connector.targetDecorator = {
                      shape: 'Arrow',
                      width: 10,
                      height: 10,
                    };
                  }
                }}
                created={() => {
                  let element2:any = document.getElementById('scrollableDiv');
                  element2.className = 'disabledbutton';
                }}
                //Sets the Node style for DragEnter element.
                dragEnter={(args:IDragEnterEventArgs) => {
                  let obj:any = args.element;
                  if (obj instanceof Node) {
                    let oWidth = obj.width;
                    let oHeight = obj.height;
                    let ratio = 100 / obj.width;
                    obj.width = 100;
                    obj.height *= ratio;
                    obj.offsetX += (obj.width - oWidth) / 2;
                    obj.offsetY += (obj.height - oHeight) / 2;
                    obj.style = { fill: '#357BD2', strokeColor: 'white' };
                  }
                }}
              >
               <Inject services={[UndoRedo]} />
              </DiagramComponent>
            </div>
            <div id="properties" style={{ width: '20%', float: 'right' }}>
            <div className="property-panel-header">Properties</div>
            <div className="row db-prop-row">
              <div
                className="col-xs-5 db-col-right db-prop-text-style"
                style={{ paddingTop: '10px' }}
              >
                <span className="db-prop-text-style db-spacing-text">
                  Scroll Limit
                </span>
              </div>
              <div
                className="col-xs-7 db-col-left"
                style={{ paddingTop: '5px', paddingRight: '0px' }}
              >
                <div className="db-text-input">
                  <DropDownListComponent
                    id="scrollLimit"
                    fields={fields}
                    value={'Infinity'}
                    dataSource={scrollLimitDatasource}
                    change={(args) => {
                      let element = document.getElementById('scrollableDiv');
                      element.className =
                        args.value === 'Limited' ? '' : 'disabledbutton';
                      diagramInstance.scrollSettings.scrollLimit = args.value;
                    }}
                    ref={(fontfamily) => (fontFamily = fontfamily)}
                  />
                </div>
              </div>
            </div>
            <div id="scrollableDiv">
              <div className="property-panel-header">Scrollable Area</div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6"
                  style={{ paddingRight: '15px', width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span className="texstyle" style={{ display: 'block' }}>
                      X
                    </span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="x"
                      value="10"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.scrollableArea.x =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6"
                  style={{ paddingRight: '15px', width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span className="texstyle" style={{ width: 'fit-content' }}>
                      Y
                    </span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="y"
                      value="10"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.scrollableArea.y =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6 db-col-left"
                  style={{ width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span className="texstyle">Width</span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="width"
                      value="1500"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.scrollableArea.width =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6 db-col-right"
                  style={{ width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span className="texstyle">Height</span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="height"
                      value="1500"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.scrollableArea.height =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: '5px', marginTop: '20px' }}>
              <div style={{ float: 'left' }}>Enable AutoScroll</div>
              <div style={{ float: 'left', marginLeft: '10px' }}>
                <CheckBoxComponent
                  id="EnableScroll"
                  checked={true}
                  change={(args:any) => {
                    let element4:any = document.getElementById('autoScrollDiv');
                    if (args.checked) {
                      element4.className = '';
                      diagramInstance.scrollSettings.canAutoScroll = true;
                    } else {
                      element4.className = 'disabledbutton';
                      diagramInstance.scrollSettings.canAutoScroll = false;
                    }
                  }}
                />
              </div>
            </div>
            <div id="autoScrollDiv" style={{ marginTop: '30px' }}>
              <div className="property-panel-header">AutoScroll border</div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6 db-col-left"
                  style={{ width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span>Left</span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="left"
                      value="30"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.autoScrollBorder.left =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6 db-col-right"
                  style={{ width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span>Top</span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="top"
                      value="30"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.autoScrollBorder.top =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6 db-col-left"
                  style={{ width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span>Right</span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="right"
                      value="30"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.autoScrollBorder.right =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row db-prop-row" style={{ paddingTop: '1px' }}>
                <div
                  className="col-xs-6 db-col-right"
                  style={{ width: '150px' }}
                >
                  <div
                    style={{ width: '40%', float: 'left', marginTop: '5px' }}
                  >
                    <span>Bottom</span>
                  </div>
                  <div
                    style={{
                      width: '60%',
                      float: 'right',
                      paddingLeft: '20px',
                    }}
                  >
                    <TextBoxComponent
                      id="bottom"
                      value="30"
                      change={(args:any) => {
                        diagramInstance.scrollSettings.autoScrollBorder.bottom =
                          Number(args.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div id="action-description">
            <p>
                This example illustrates how to scroll a diagram using vertical and horizontal scrollbars. The scroll limit property helps limit the scrolling area.
            </p>
        </div>
        <div id="description">
            <p>
                The scroll limit allows you to define the scrollable region of the Diagram while scrolling the page with a mouse.
            </p>
            <p> 
                The scrollSettings <code>scrollLimit</code> property allows you to define the scrollable region of a Diagram. You may scroll inside the designated region if the scrollLimit is set to <code>limited</code>. When the scrollLimit is set to <code>Diagram</code>, you can scroll within the Diagram content. When the scrollLimit is set to <code>Infinity</code>, it allows infinite scrolling.
            </p>
            <p>
                The scrollSettings <code>autoScrollBorder</code> property is used to specify the distance from the edge of a control at which auto-scrolling should occur. 
            </p>
            <br />
        </div>
      </div>
  );
}
export default ScrollingSample;