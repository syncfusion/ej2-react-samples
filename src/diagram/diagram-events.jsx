import * as React from "react";
import { UndoRedo, DiagramContextMenu, DiagramComponent, SnapConstraints, Inject, SymbolPaletteComponent, NodeConstraints } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { getEventDetails } from './diagram-events-details';
/**
 * Diagram Events sample
 */
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
  
  .material #diagramEventsControlSection  #palette-space .e-accordion {
      border: none;
  }
  .material #diagramEventsControlSection #palette-space {
     border: 1px solid rgba(0, 0, 0, 0.12);
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

  .property-section {
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

 #diagramEventsPropertySection #EventLog {
    height: calc(100% - 50px);
    padding: 15px;
    overflow: auto;
    width: 100%;
  }`;
let diagramInstance;
//Initialize the basicshapes for the symbol palatte
let basicShapes = [
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
let connectorSymbols = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
    },
    {
        id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
    },
    {
        id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
    },
];
export class Events extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = [
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
    }
    rendereComplete() {
        document.getElementById('clearbtn').onclick = (args) => {
            let data = document.getElementById('EventLog');
            for (let i = data.childNodes.length - 1; i >= 0; i--) {
                data.removeChild(data.childNodes[i]);
            }
        };
    }
    render() {
        return (<div className="control-pane">
                <style>{SAMPLE_CSS}</style>
                <div className="col-lg-8 control-section">
                    <style>{SAMPLE_CSS}</style>
                    <div id="diagramEventsControlSection" className="content-wrapper" style={{ width: "100%", background: "white" }}>
                        <div id="palette-space" className="sb-mobile-palette">
                            <SymbolPaletteComponent id="symbolpalette" expandMode="Multiple" palettes={[
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
                iconCss: "e-ddb-icons e-connector",
                title: "Connectors"
            }
        ]} width={"100%"} height={"700px"} symbolHeight={60} symbolWidth={60} symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }} getNodeDefaults={(symbol) => {
            symbol.width = 50;
            symbol.height = 50;
            symbol.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
        }} getSymbolInfo={(symbol) => {
            return { fit: true };
        }}><Inject services={[UndoRedo, DiagramContextMenu]}/>
                            </SymbolPaletteComponent>
                        </div>
                        <div id="diagram-space" className="sb-mobile-diagram">
                            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"700px"} dragEnter={(args) => {
            getEventDetails(args);
        }} dragLeave={(args) => {
            getEventDetails(args);
        }} dragOver={(args) => {
            if (args.target) {
                getEventDetails(args);
            }
        }} click={(args) => {
            getEventDetails(args);
        }} historyChange={(args) => {
            getEventDetails(args);
        }} doubleClick={(args) => {
            getEventDetails(args);
        }} textEdit={(args) => {
            getEventDetails(args);
        }} scrollChange={(args) => {
            getEventDetails(args);
        }} selectionChange={(args) => {
            getEventDetails(args);
        }} sizeChange={(args) => {
            getEventDetails(args);
        }} connectionChange={(args) => {
            getEventDetails(args);
        }} sourcePointChange={(args) => {
            getEventDetails(args);
        }} targetPointChange={(args) => {
            getEventDetails(args);
        }} propertyChange={(args) => {
            getEventDetails(args);
        }} positionChange={(args) => {
            getEventDetails(args);
        }} rotateChange={(args) => {
            getEventDetails(args);
        }} collectionChange={(args) => {
            getEventDetails(args);
        }} mouseEnter={(args) => {
            getEventDetails(args);
        }} mouseLeave={(args) => {
            getEventDetails(args);
        }} mouseOver={(args) => {
            getEventDetails(args);
        }} contextMenuOpen={(args) => {
            getEventDetails(args);
        }} contextMenuBeforeItemRender={(args) => {
            getEventDetails(args);
        }} contextMenuClick={(args) => {
            getEventDetails(args);
        }} 
        //Sets the constraints of the SnapSettings
        snapSettings={{ constraints: SnapConstraints.None }}>
                                <Inject services={[UndoRedo, DiagramContextMenu]}/>
                            </DiagramComponent>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 property-section">
                    <div id="diagramEventsPropertySection" style={{ height: "100%", border: "1px solid #e0e0e0" }}>
                        <div className="listbox">
                            <div className="heading" style={{ height: "40px" }}><span>Client-side events</span></div>
                            <ListViewComponent id='listview-def' dataSource={this.data} showCheckBox={true} height={'calc(100% - 40px)'}>
                            </ListViewComponent>
                        </div>
                        <div className="prop-grid content" style={{ height: "50%", borderTop: "1px solid #e0e0e0" }}>
                            <div className="heading">
                                <span style={{ display: "inline-block", marginTop: "5px" }}>Event arguments</span>
                                <div className="evtbtn">
                                    <ButtonComponent id='clearbtn' content='clear'>
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div id="EventLog">
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
            </div>);
    }
}
