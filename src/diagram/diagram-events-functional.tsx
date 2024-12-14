// Importing required React and ReactDOM modules
import * as ReactDOM from "react-dom";
import * as React from "react";
// Importing required Syncfusion Diagram components and services
import {
    UndoRedo, DiagramContextMenu,
    DiagramComponent,
    SnapConstraints,
    Inject,
    SymbolPaletteComponent,
    IDragEnterEventArgs,
    IDragOverEventArgs,
    IDragLeaveEventArgs,
    IClickEventArgs,
    IHistoryChangeArgs,
    IDoubleClickEventArgs,
    ITextEditEventArgs,
    IScrollChangeEventArgs,
    ISelectionChangeEventArgs,
    ISizeChangeEventArgs,
    IConnectionChangeEventArgs,
    IEndChangeEventArgs,
    IPropertyChangeEventArgs,
    IDraggingEventArgs,
    IRotationEventArgs,
    ICollectionChangeEventArgs,
    IMouseEventArgs,
    NodeModel,
    SymbolInfo,
    NodeConstraints,
    ConnectorModel
} from "@syncfusion/ej2-react-diagrams";

// Importing additional Syncfusion components and utilities
import { updateSampleSection } from "../common/sample-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { getEventDetails } from './diagram-events-details';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from "@syncfusion/ej2-navigations";


/**
 * Diagram Events sample
 */

// CSS styles for the sample
const SAMPLE_CSS = `#diagramEventsControlSection .sb-mobile-palette {
    width: 200px;
    height: 100%;
    float: left;
  }

 #diagramEventsControlSection .sb-mobile-palette-bar {
    display: none;
}

 #diagramEventsControlSection .sb-mobile-diagram {
    width: calc(100% - 200px);
    height: 100%;
    float: left;
    border: 1px solid #d9dedd;
  }
  

  @media (max-width: 550px) {
    #diagramEventsControlSection .sb-mobile-palette {
      z-index: 19;
      position: absolute;
      display: none;
      transition: transform 300ms linear, visibility 0s linear 300ms;
      width: 39%;
      height: 100%;
    }

    #diagramEventsControlSection .sb-mobile-palette-bar {
      display: block;
      width: 100%;
      background: #fafafa;
      padding: 10px 10px;
      border: 0.5px solid #e0e0e0;
      min-height: 40px;
    }

    #diagramEventsControlSection .sb-mobile-diagram {
      width: 100%;
      height: 100%;
      float: left;
      left: 0px;
    }

    #diagramEventsControlSection #palette-icon {
      font-size: 20px;
    }
  }

  #diagramEventsControlSection .sb-mobile-palette-open {
    position: absolute;
    display: block;
    right: 15px;
  }

  @font-face {
    font-family: "e-ddb-icons1";
    src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1tSfIAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmdC1P4gAAAcgAAAAwaGVhZBJhohMAAADQAAAANmhoZWEIVQQDAAAArAAAACRobXR4CAAAAAAAAYAAAAAIbG9jYQAYAAAAAAHAAAAABm1heHABDgAUAAABCAAAACBuYW1lm+wy9gAAAfgAAAK1cG9zdLnsYngAAASwAAAAMAABAAAEAAAAAFwEAAAAAAAD+AABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAAgNcenF8PPPUACwQAAAAAANelrs4AAAAA16WuzgAAAAAD+AN6AAAACAACAAAAAAAAAAEAAAACAAgAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAAQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAAGAAAAAIAAAAAA/gDegACAAcAACUhCQEhATUhAQQC9P6G/YoBMQFF/YqGAjf+hgH0QwAAAAAAEgDeAAEAAAAAAAAAAQAAAAEAAAAAAAEAEwABAAEAAAAAAAIABwAUAAEAAAAAAAMAEwAbAAEAAAAAAAQAEwAuAAEAAAAAAAUACwBBAAEAAAAAAAYAEwBMAAEAAAAAAAoALABfAAEAAAAAAAsAEgCLAAMAAQQJAAAAAgCdAAMAAQQJAAEAJgCfAAMAAQQJAAIADgDFAAMAAQQJAAMAJgDTAAMAAQQJAAQAJgD5AAMAAQQJAAUAFgEfAAMAAQQJAAYAJgE1AAMAAQQJAAoAWAFbAAMAAQQJAAsAJAGzIERpYWdyYW1fU2hhcGVzX0ZPTlRSZWd1bGFyRGlhZ3JhbV9TaGFwZXNfRk9OVERpYWdyYW1fU2hhcGVzX0ZPTlRWZXJzaW9uIDEuMERpYWdyYW1fU2hhcGVzX0ZPTlRGb250IGdlbmVyYXRlZCB1c2luZyBTeW5jZnVzaW9uIE1ldHJvIFN0dWRpb3d3dy5zeW5jZnVzaW9uLmNvbQAgAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAUgBlAGcAdQBsAGEAcgBEAGkAYQBnAHIAYQBtAF8AUwBoAGEAcABlAHMAXwBGAE8ATgBUAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAVgBlAHIAcwBpAG8AbgAgADEALgAwAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAdQBzAGkAbgBnACAAUwB5AG4AYwBmAHUAcwBpAG8AbgAgAE0AZQB0AHIAbwAgAFMAdAB1AGQAaQBvAHcAdwB3AC4AcwB5AG4AYwBmAHUAcwBpAG8AbgAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgECAQMABlNoYXBlcwAA)
      format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  .e-ddb-icons1 {
    font-family: "e-ddb-icons1";
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

  #diagramEventsControlSection .e-toggle-palette::before {
    content: "\e700";
  }

  
  #diagramEventsPropertySection .event-tracer {
    width: 240px;
    height: 700px;
    min-height: 700px;
    float: left;
  }

 #diagramEventsPropertySection .heading {
    color: #807f7f;
    font-size: 15px;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #d9dedd;
    padding: 10px;
  }

  #EventLog b {
    color: #388e3c;
  }

  hr {
    margin: 1px 10px 1px 0px;
    border-top: 1px solid #eee;
  }

  .diagramEventsProperty .property-section{
    padding-top: 20px;
    padding-bottom: 20px;
    height: 740px;
    padding-right: 0px;
  }

  #diagramEventsPropertySection .evtbtn { 
    float: right; 
  }

  #diagramEventsPropertySection .listbox {
    width: 100%;
    height: 50%;
  }

 #diagramEventsPropertySection .event-tracer .prop-grid {
    width: 100%;
    height: 50%;
  }

  .diagramEventsControl .control-section{
    display: flex;
  }

 #diagramEventsPropertySection #EventLog {
    height: calc(100% - 50px);
    padding: 15px;
    overflow: auto;
    width: 100%;
  }`;

let diagramInstance: DiagramComponent;
let EventLogInstance: HTMLElement;

//Initialize the basicshapes for the symbol palatte
let basicShapes: NodeModel[] = [
    { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
    { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
    { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
    { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
    { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
    { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
    { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
    { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
    { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
    { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
    { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } },
    { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' } },
    { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' } },
    { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' } },
    { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
];

//Initializes connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }
    },
    {
        id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'None' }
    },
    {
        id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }
    },
    {
        id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'None' }
    },
    {
        id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'None' }
    },
];

//function for handling the diagram events
function Events() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    // Data for the list view displaying event names
    let data: { [key: string]: Object }[] = [
        { text: 'Drag enter', id: 'dragEnter' },
        { text: 'Drag leave', id: 'dragLeave' },
        { text: 'Drag over', id: 'dragOver' },
        { text: 'Click', id: 'click', isChecked: true },
        { text: 'History change', id: 'historyChange', isChecked: true },
        { text: 'Double click', id: 'doubleClick' },
        { text: 'Text edit', id: 'textEdit', isChecked: true },
        { text: 'Scroll change', id: 'scrollChange' },
        { text: 'Selection change', id: 'selectionChange', isChecked: true },
        { text: 'Size change', id: 'sizeChange', isChecked: true },
        { text: 'Connection change', id: 'connectionChange', isChecked: true },
        { text: 'SourcePoint change', id: 'sourcePointChange' },
        { text: 'TargetPoint change', id: 'targetPointChange' },
        { text: 'Position change', id: 'positionChange', isChecked: true },
        { text: 'Rotate change', id: 'rotateChange', isChecked: true },
        { text: 'Collection change', id: 'collectionChange', isChecked: true },
        { text: 'Mouse enter', id: 'mouseEnter' },
        { text: 'Mouse leave', id: 'mouseLeave' },
        { text: 'Mouse over', id: 'mouseOver' },
        { text: 'Context menu open', id: 'contextMenuOpen' },
        { text: 'Context menu before item render', id: 'contextMenuBeforeItemRender' },
        { text: 'Context menu click', id: 'contextMenuClick' }
    ];
    // Function to clear event log when clear button is clicked
    function rendereComplete() {
        let data: HTMLElement = EventLogInstance;
        for (let i: number = data.childNodes.length - 1; i >= 0; i--) {
            data.removeChild(data.childNodes[i]);
        }
    }
    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="diagramEventsControl">
            <div className="col-lg-8 control-section">
                <style>{SAMPLE_CSS}</style>
                <div id="diagramEventsControlSection" className="content-wrapper" style={{ width: "100%", background: "white" }}>
                    <div id="palette-space" className="sb-mobile-palette">
                        <SymbolPaletteComponent
                            id="symbolpalette"
                            expandMode="Multiple"
                            palettes={[
                                {
                                    id: "basic",
                                    expanded: true,
                                    symbols: basicShapes,
                                    iconCss: "e-ddb-icons e-basic",
                                    title: "Basic Shapes"
                                },
                                {
                                    id: "connectors",
                                    expanded: true,
                                    symbols: connectorSymbols,
                                    iconCss: "e-ddb-icons e-diagram-connector",
                                    title: "Connectors"
                                }
                            ]}
                            width={"100%"}
                            height={"700px"}
                            symbolHeight={60}
                            symbolWidth={60}
                            symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                            getNodeDefaults={(symbol: NodeModel): void => {
                                symbol.width = 50;
                                symbol.height = 50;
                                symbol.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
                                symbol.style.strokeColor = '#757575';
                            }}
                            getConnectorDefaults= {(connector: ConnectorModel): void => {
                                connector.style = { strokeWidth: 1 , strokeColor: '#757575' };
                            }}
                            getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                                return { fit: true };
                            }} 
                        ><Inject services={[UndoRedo, DiagramContextMenu]} />
                        </SymbolPaletteComponent>
                    </div>
                    <div id="diagram-space" className="sb-mobile-diagram">
                        <DiagramComponent
                            id="diagram"
                            ref={diagram => (diagramInstance = diagram)}
                            width={"100%"}
                            height={"700px"}
                            dragEnter={(args: IDragEnterEventArgs) => {
                                getEventDetails(args);
                            }}
                            dragLeave={(args: IDragLeaveEventArgs) => {
                                getEventDetails(args);
                            }}
                            dragOver={(args: IDragOverEventArgs) => {
                                if (args.target) {
                                    getEventDetails(args);
                                }
                            }}
                            click={(args: IClickEventArgs) => {
                                getEventDetails(args);
                            }}
                            historyChange={(args: IHistoryChangeArgs) => {
                                getEventDetails(args);
                            }}
                            doubleClick={(args: IDoubleClickEventArgs) => {
                                getEventDetails(args);
                            }}
                            textEdit={(args: ITextEditEventArgs) => {
                                getEventDetails(args);
                            }}
                            scrollChange={(args: IScrollChangeEventArgs) => {
                                getEventDetails(args);
                            }}
                            selectionChange={(args: ISelectionChangeEventArgs) => {
                                if (args.state === 'Changed') {
                                    getEventDetails(args);
                                }
                            }}
                            sizeChange={(args: ISizeChangeEventArgs) => {
                                if (args.state === 'Completed') {
                                    getEventDetails(args);
                                }
                            }}
                            connectionChange={(args: IConnectionChangeEventArgs) => {
                                if (args.state === 'Changed') {
                                    getEventDetails(args);
                                }
                            }}
                            sourcePointChange={(args: IEndChangeEventArgs) => {
                                if (args.state === 'Completed') {
                                    getEventDetails(args);
                                }
                            }}
                            targetPointChange={(args: IEndChangeEventArgs) => {
                                if (args.state === 'Completed') {
                                    getEventDetails(args);
                                }
                            }}
                            propertyChange={(args: IPropertyChangeEventArgs) => {
                                getEventDetails(args);
                            }}
                            positionChange={(args: IDraggingEventArgs) => {
                                if (args.state === 'Completed') {
                                    getEventDetails(args);
                                }
                            }}
                            rotateChange={(args: IRotationEventArgs) => {
                                if (args.state === 'Completed') {
                                    getEventDetails(args);
                                }
                            }}
                            collectionChange={(args: ICollectionChangeEventArgs) => {
                                if (args.state === 'Changed') {
                                    getEventDetails(args);
                                }
                            }}
                            mouseEnter={(args: IMouseEventArgs) => {
                                getEventDetails(args);
                            }}
                            mouseLeave={(args: IMouseEventArgs) => {
                                getEventDetails(args);
                            }}
                            mouseOver={(args: IMouseEventArgs) => {
                                getEventDetails(args);
                            }}
                            contextMenuOpen={(args: BeforeOpenCloseMenuEventArgs) => {
                                getEventDetails(args);
                            }}
                            contextMenuBeforeItemRender={(args: MenuEventArgs) => {
                                getEventDetails(args);
                            }}
                            contextMenuClick={(args: MenuEventArgs) => {
                                getEventDetails(args);
                            }}
                            contextMenuSettings={{
                                show: true
                            }}
                            //Sets the constraints of the SnapSettings
                            snapSettings={{ constraints: SnapConstraints.None }}
                        >
                            <Inject services={[UndoRedo, DiagramContextMenu]} />
                        </DiagramComponent>
                    </div>
                </div>
            </div>
            </div>
              {/* Section for event list and details */}
            <div className="diagramEventsProperty">
            <div className="col-lg-4 property-section">
                <div id="diagramEventsPropertySection" style={{ height: "100%", border: "1px solid #e0e0e0" }}>
                    <div className="listbox">
                        <div className="heading" style={{ height: "40px" }}><span>Client-side events</span></div>
                        <ListViewComponent
                            id='listview-def'
                            dataSource={data}
                            showCheckBox={true}
                            height={'calc(100% - 40px)'}
                        >
                        </ListViewComponent>
                    </div>
                    <div className="prop-grid content" style={{ height: "50%", borderTop: "1px solid #e0e0e0" }}>
                        <div className="heading">
                            <span style={{ display: "inline-block", marginTop: "5px" }}>Event arguments</span>
                            <div className="evtbtn">
                                <ButtonComponent
                                    id='clearbtn'
                                    content='clear'
                                    onClick={rendereComplete}
                                >
                                </ButtonComponent>
                            </div>
                        </div>
                        <div id="EventLog" ref={EventLog => (EventLogInstance = EventLog)} >
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualize what are the client side events are available in the diagram.
                </p>
            </div>
            <div id="description">
                <p>
                    Diagram events are the actions that can be detected by <code>JavaScript</code> and the event argument are the information
                    about the event that has occurred. Some time we want to execute some JavaScript when and event occurs, such as when the
                    user clicks on the node. We can achieve this scenario using <code>click</code> event of the diagram. So, in this shows
                    how to hook all the diagram events and how to handle its <code>arguments</code>.
                </p>
                <br />
            </div>
        </div>
    );
}
export default Events;