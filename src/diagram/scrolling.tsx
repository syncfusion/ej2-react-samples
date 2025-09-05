import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    DiagramComponent,
    Node,
    Diagram,
    Inject,
    UndoRedo,
    NodeModel,
    Rect,
    SymbolPaletteComponent,
    IDragEnterEventArgs,
    ConnectorModel,
  } from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';
import "./font-icons.css";
  import {
    TextBoxComponent,
  } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
Diagram.Inject(UndoRedo);

//Initialize the basicshapes for the symbol palatte
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
  //Initialize the flowshapes for the symbol palette
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
  //Initialize the connector for the symbol palatte 
  let connectorSymbols: ConnectorModel[] = [
    {
      id: "orthogonal",
      type: "Orthogonal",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { style: {  fill: '#757575' } },
    },
    {
      id: "Orthogonal",
      type: "Orthogonal",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: "None" },
    },
    {
      id: "straight",
      type: "Straight",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: {style: {fill: '#757575' } },
    },
    {
      id: "Straight",
      type: "Straight",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: "None" }
    },
    {
      id: "bezier",
      type: "Bezier",
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: "None" }
    }
  ];
  const sample_css = `
  .diagram-scroll .property-panel-header{
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    font-weight: 600;
    font-size: 15px;
  }
  .diagram-scroll .db-text-input {
      width: calc(100% - 15px);
      padding: 2px 2px 0px 0px;
  }
  
  .diagram-scroll .row{
    margin-right:-15px;
    margin-left:-15px;
  }`;

let diagramInstance: DiagramComponent;
let fontFamily:any;
let scrollableDivInstance:any;
let autoScrollDivInstance: any;
let paletteIconInstance: HTMLElement;
let paletteSpaceInstance: HTMLElement;
let fields:any = { text: 'text', value: 'value' };
let scrollLimitDatasource:any = [
  { text: 'Infinity', value: 'Infinity' },
  { text: 'Diagram', value: 'Diagram' },
  { text: 'Limited', value: 'Limited' },
];
let scrollableArea:any = new Rect(0, 0, 1500, 1500);
  
  export class ScrollingSample extends SampleBase<{}, {}> {
    renderComplete() {
        addEvents();
      }
    render() {
      return (
        <div className="control-pane diagram-scroll">
          <style>{sample_css}</style>
        <div className="control-section">
          <div style={{ width: '100%' }}>
            <div className="sb-mobile-palette-bar">
              <div
                id="palette-icon"  ref={(paletteIcon) => (paletteIconInstance = paletteIcon)}
                style={{ float: 'right' }}
                className="e-ddb-icons1 e-toggle-palette"
              ></div>
            </div>
            <div
              id="palette-space" ref={(paletteSpace) => (paletteSpaceInstance = paletteSpace)}
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
                getConnectorDefaults={getConnectorDefaults}
                getNodeDefaults={(symbol:any) => {
                  let obj = symbol;
                  if (obj.id === 'terminator1' || obj.id === 'process1') {
                    obj.width = 80;
                    obj.height = 40;
                  } else if (
                    obj.id === 'decision1' ||
                    obj.id === 'document1' ||
                    obj.id === 'preDefinedProcess1' ||
                    obj.id === 'paperTap1' ||
                    obj.id === 'directData1' ||
                    obj.id === 'multiDocument1' ||
                    obj.id === 'data1'
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
                rulerSettings={{ showRulers: true }}
                pageSettings={{ width: 1500, height: 1500 }}
                scrollSettings={{
                  scrollLimit: 'Infinity',
                  canAutoScroll: true,
                  autoScrollBorder: { left: 30, right: 30, top: 30, bottom: 30 },
                  scrollableArea: scrollableArea,
                }}
                getConnectorDefaults={getConnectorDefaults}
                created={() => {
                  let scrollElement:any = scrollableDivInstance;
                  scrollElement.className = 'disabledbutton';
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
                    obj.annotations = [
                      { style: { color: 'white', fill: 'transparent' } },
                    ];
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
                style={{ paddingTop: '14px' }}
              >
                <span className="db-prop-text-style db-spacing-text">
                  Scroll Limit
                </span>
              </div>
              <div
                className="col-xs-7 db-col-left"
                style={{ paddingTop: '10px', paddingRight: '0px' }}
              >
                <div className="db-text-input">
                  <DropDownListComponent
                    id="scrollLimit"
                    fields={fields}
                    value={'Infinity'}
                    dataSource={scrollLimitDatasource}
                    change={(args) => {
                      let element = scrollableDivInstance
                      element.className =
                        args.value === 'Limited' ? '' : 'disabledbutton';
                      diagramInstance.scrollSettings.scrollLimit = args.value;
                    }}
                    ref={(fontfamily) => (fontFamily = fontfamily)}
                  />
                </div>
              </div>
            </div>
            <div id="scrollableDiv"  ref={(scrollableDiv) => (scrollableDivInstance = scrollableDiv)}>
              <div className="property-panel-header">Scrollable Area</div>
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6"
                  style={{ paddingRight: '15px', width: '175px' }}
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
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6"
                  style={{ paddingRight: '15px', width: '175px' }}
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
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6 db-col-left"
                  style={{ width: '175px' }}
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
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6 db-col-right"
                  style={{ width: '175px' }}
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
                      value="10"
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
                    let autoScrollElement:any =autoScrollDivInstance;
                    if (args.checked) {
                      autoScrollElement.className = '';
                      diagramInstance.scrollSettings.canAutoScroll = true;
                    } else {
                      autoScrollElement.className = 'disabledbutton';
                      diagramInstance.scrollSettings.canAutoScroll = false;
                    }
                  }}
                />
              </div>
            </div>
            <div id="autoScrollDiv" style={{ marginTop: '30px' }} ref={(autoScrollDiv) => (autoScrollDivInstance = autoScrollDiv)}>
              <div className="property-panel-header">AutoScroll border</div>
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6 db-col-left"
                  style={{ width: '175px' }}
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
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6 db-col-right"
                  style={{ width: '175px' }}
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
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6 db-col-left"
                  style={{ width: '175px' }}
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
              <div className="row db-prop-row" style={{ paddingTop: '10px' }}>
                <div
                  className="col-xs-6 db-col-right"
                  style={{ width: '175px' }}
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
  }
  let isMobile: boolean;
//To enhance the functionality of a webpage for mobile devices by adding a click event listener 
  function addEvents(): void {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      let paletteIcon: HTMLElement = paletteIconInstance;
      if (paletteIcon) {
        paletteIcon.addEventListener('click', openPalette, false);
      }
    }
  }
//To manage the visibility state of the palette space on a webpage for mobile devices
  function openPalette(): void {
    let paletteSpace: HTMLElement = paletteSpaceInstance;
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
        paletteSpace.classList.add('sb-mobile-palette-open');
      } else {
        paletteSpace.classList.remove('sb-mobile-palette-open');
      }
    }
  }
  //Sets the default values for a connector
  var color = '#757575';
  function getConnectorDefaults(connector: ConnectorModel): void{
    connector.style.strokeWidth = 1;
    connector.style.strokeColor = color;
    connector.targetDecorator.style.fill = color;
    connector.targetDecorator.style.strokeColor = color;
  }
