import * as React from "react";
import { SymbolPaletteComponent, DiagramComponent, PortVisibility, SnapConstraints } from "@syncfusion/ej2-react-diagrams";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { SampleBase } from "../common/sample-base";
import "./font-icons.css";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
/* tslint:disable */
/* tslint:enable */
let diagramInstance;
let symbolPaletteInstance;
let uploadBoxInstance;
let buttonInstance;
//Initializes the ports for the nodes.
let port = [
    { id: 'port1', offset: { x: 0, y: 0.5 } },
    { id: 'port2', offset: { x: 1, y: 0.5 } },
    { id: 'port3', offset: { x: 0.5, y: 0.1 } },
    { id: 'port4', offset: { x: 0.5, y: 0.92 } }
];
let portrc = [
    { id: 'port1', offset: { x: 0.05, y: 0.5 } },
    { id: 'port2', offset: { x: 1, y: 0.5 } },
    { id: 'port3', offset: { x: 0.85, y: 0.1 } },
    { id: 'port4', offset: { x: 0.6, y: 0.97 } }
];
let porthmi = [
    { id: 'port1', offset: { x: 0.34, y: 0.5 } },
    { id: 'port2', offset: { x: 0.75, y: 0.5 } },
    { id: 'port3', offset: { x: 0.5, y: 0.05 } },
    { id: 'port4', offset: { x: 0.6, y: 0.9 } }
];
let port2 = [
    { id: 'port1', offset: { x: 0.45, y: 0.5 } },
    { id: 'port2', offset: { x: 0.97, y: 0.5 } },
    { id: 'port3', offset: { x: 0.5, y: 0.97 } }
];
let portmo = [
    { id: 'port1', offset: { x: 0.02, y: 0.6 } },
    { id: 'port2', offset: { x: 0.98, y: 0.625 } },
    { id: 'port3', offset: { x: 0.5, y: 0.3 } },
    { id: 'port4', offset: { x: 0.5, y: 0.97 } }
];
let nodes = [
    {
        id: 'Server1', offsetX: 80, offsetY: 75,
        shape: { type: 'Native', content: template1 },
        annotations: [{ content: 'Server', offset: { x: 0.5, y: 0 }, margin: { bottom: 10 } }],
        ports: port
    },
    {
        id: 'WorkStation1', offsetX: 250, offsetY: 75,
        shape: { type: 'Native', content: template2 },
        annotations: [{ content: 'Work Station', margin: { bottom: 25 }, offset: { x: 1.4, y: 0.2 } }],
        ports: port2
    },
    {
        id: 'WorkStation2', offsetX: 350, offsetY: 75,
        shape: { type: 'Native', content: template2 },
        ports: port2
    },
    {
        id: 'modem1', offsetX: 450, offsetY: 125,
        shape: { type: 'Native', content: template3 },
        annotations: [{ content: 'Modem', margin: { right: 25 }, offset: { x: 0, y: 0.5 } }],
        ports: portmo
    },
    {
        id: 'modem2', offsetX: 525, offsetY: 175,
        shape: { type: 'Native', content: template3 },
        annotations: [{ content: 'Modem1', margin: { bottom: 10 }, offset: { x: 0.5, y: 0 } }],
        ports: portmo
    },
    {
        id: 'RemoteController1', offsetX: 600, offsetY: 125,
        shape: { type: 'Native', content: template4 },
        annotations: [{ content: 'Remote Controller', margin: { bottom: 10 }, offset: { x: 0.5, y: 0 } }],
        ports: portrc
    },
    {
        id: 'modem3', offsetX: 350, offsetY: 205,
        shape: { type: 'Native', content: template3 },
        annotations: [{ content: 'Modem4', margin: { left: 35 }, offset: { x: 1, y: 0.5 } }],
        ports: portmo
    },
    {
        id: 'modem4', offsetX: 450, offsetY: 245,
        shape: { type: 'Native', content: template3 },
        annotations: [{ content: 'Modem2', offset: { x: 0.5, y: 1.3 } }],
        ports: portmo
    },
    {
        id: 'modem5', offsetX: 350, offsetY: 330,
        shape: { type: 'Native', content: template3 },
        annotations: [{ content: 'Modem3', margin: { right: 25 }, offset: { x: 0, y: 0.5 } }],
        ports: portmo
    },
    {
        id: 'WorkStation3', offsetX: 600, offsetY: 250,
        shape: { type: 'Native', content: template2 },
        annotations: [{ content: 'Remote Work Staions', margin: { top: 12 }, offset: { x: 0.5, y: 1 } }],
        ports: port2
    },
    {
        id: 'WorkStation4', offsetX: 600, offsetY: 335,
        shape: { type: 'Native', content: template2 },
        annotations: [{ content: 'Portable Work Staions', margin: { top: 12 }, offset: { x: 0.5, y: 1 } }],
        ports: port2
    },
    {
        id: 'RemoteController2', offsetX: 80, offsetY: 400,
        shape: { type: 'Native', content: template4 },
        annotations: [{ content: 'Control Logic', margin: { top: 8 }, offset: { x: 0.5, y: 1 } }],
        ports: portrc
    },
    {
        id: 'RemoteController3', offsetX: 500, offsetY: 400,
        shape: { type: 'Native', content: template4 },
        annotations: [{ content: 'Control Logic', margin: { top: 8 }, offset: { x: 0.5, y: 1 } }],
        ports: portrc
    },
    {
        id: 'AnalogIO', offsetX: 160, offsetY: 500,
        shape: { type: 'Native', content: template5 },
        annotations: [{ content: 'Analog IO', margin: { top: 13 }, offset: { x: 0.5, y: 1 } }],
        ports: porthmi
    },
    {
        id: 'sensor', offsetX: 260, offsetY: 500,
        shape: { type: 'Native', content: template6 },
        annotations: [{ content: 'Sensor', margin: { top: 10 }, offset: { x: 0.5, y: 1 } }],
        ports: port
    },
    {
        id: 'DeviceDriver1', offsetX: 360, offsetY: 500,
        shape: { type: 'Native', content: template7 },
        annotations: [{ content: 'DriverA', offset: { x: 0.5, y: 1.3 } }],
        ports: porthmi
    },
    {
        id: 'DeviceDriver2', offsetX: 460, offsetY: 500,
        shape: { type: 'Native', content: template7 },
        annotations: [{ content: 'DriverB', offset: { x: 0.5, y: 1.3 } }],
        ports: porthmi
    },
    {
        id: 'DeviceDriver3', offsetX: 550, offsetY: 500,
        shape: { type: 'Native', content: template7 },
        annotations: [{ content: 'DriverC', offset: { x: 0.5, y: 1.3 } }],
        ports: porthmi
    },
    {
        id: 'HMI', offsetX: 625, offsetY: 450,
        shape: { type: 'Native', content: template8 },
        annotations: [{ content: 'HMI', offset: { x: 0.5, y: 1.3 } }],
        ports: port
    },
    {
        id: 'controlNet', offsetX: 218.5, offsetY: 380,
        shape: { type: 'Text', content: 'Control Net', }
    },
    {
        id: 'etherNet', offsetX: 218.5, offsetY: 190,
        shape: { type: 'Text', content: 'Ethernet', }
    },
    {
        id: 'deviceNet', offsetX: 345.5, offsetY: 555,
        shape: { type: 'Text', content: 'Device Net', }
    },
    {
        id: 'connector1', offsetX: 99, offsetY: 175
    },
    {
        id: 'connector2', offsetX: 250, offsetY: 125
    },
    {
        id: 'connector3', offsetX: 99, offsetY: 300
    },
    {
        id: 'connector4', offsetX: 178, offsetY: 435
    },
    {
        id: 'connector5', offsetX: 378, offsetY: 435
    },
    {
        id: 'connector6', offsetX: 370, offsetY: 380
    }
];
let connectors = [
    {
        id: 'connectora', sourceID: 'Server1', targetID: 'WorkStation1',
        targetPortID: 'port1'
    },
    {
        id: 'connectorawork', sourceID: 'WorkStation1', targetID: 'WorkStation2',
        sourcePortID: 'port2', targetPortID: 'port1'
    },
    {
        id: 'connectoraworkm', sourceID: 'WorkStation2', targetID: 'modem1', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        targetPortID: 'port3', sourcePortID: 'port2'
    },
    {
        id: 'connectorm1m2', sourceID: 'modem2', targetID: 'modem1', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        sourcePortID: 'port1', targetPortID: 'port4'
    },
    {
        id: 'connectorm2m3', sourceID: 'modem2', targetID: 'RemoteController1', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        sourcePortID: 'port2', targetPortID: 'port4'
    },
    {
        id: 'connectorws2m3', sourceID: 'WorkStation2', targetID: 'modem3',
        sourcePortID: 'port3', targetPortID: 'port3'
    },
    {
        id: 'connectorws2m4', sourceID: 'modem4', targetID: 'modem3', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        sourcePortID: 'port1', targetPortID: 'port4'
    },
    {
        id: 'connectorm3m4', sourceID: 'modem5', targetID: 'modem3',
        sourcePortID: 'port3', targetPortID: 'port4'
    },
    {
        id: 'connectorm4ws3', sourceID: 'modem5', targetID: 'WorkStation4',
        sourcePortID: 'port2', targetPortID: 'port1'
    },
    {
        id: 'connectorm4m5', sourceID: 'modem4', targetID: 'WorkStation3',
        sourcePortID: 'port2', targetPortID: 'port1'
    },
    {
        id: 'connectorr2r3', sourceID: 'RemoteController2', targetID: 'RemoteController3',
        targetPortID: 'port1'
    },
    {
        id: 'connectorr2r3qq', sourceID: 'Server1', targetID: 'RemoteController2',
        sourcePortID: 'port4'
    },
    {
        id: 'connectorm3se1', sourceID: 'modem3', targetID: 'Server1', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        sourcePortID: 'port1', targetPortID: 'port4'
    },
    {
        id: 'connectorws2aio1', sourceID: 'RemoteController2', targetID: 'AnalogIO',
        type: 'Orthogonal', sourcePortID: 'port2', targetPortID: 'port3'
    },
    {
        id: 'connectorb', sourceID: 'RemoteController2', targetID: 'sensor', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        sourcePortID: 'port2', targetPortID: 'port3'
    },
    {
        id: 'connectord1', sourceID: 'RemoteController2', targetID: 'DeviceDriver1', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        sourcePortID: 'port2', targetPortID: 'port3'
    },
    {
        id: 'connectord2', sourceID: 'RemoteController2', targetID: 'DeviceDriver2', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 25 }],
        sourcePortID: 'port2', targetPortID: 'port3'
    },
    {
        id: 'connectordh1d3', sourceID: 'HMI', targetID: 'DeviceDriver3', type: 'Orthogonal',
        sourcePortID: 'port1', targetPortID: 'port3'
    },
    {
        id: 'connectordh1d2', sourceID: 'HMI', type: 'Orthogonal', targetID: 'DeviceDriver2',
        sourcePortID: 'port1', targetPortID: 'port3'
    }
];
let snapSettings = {
    constraints: SnapConstraints.None
};
let symbols = [
    //add the flow shapes to the symbol palette
    { id: 'server', shape: { type: 'Native', content: template1 } },
    { id: 'workStation', shape: { type: 'Native', content: template2 } },
    { id: 'modem', shape: { type: 'Native', content: template3 } },
    { id: 'remoteController', shape: { type: 'Native', content: template4 } },
    { id: 'hmi', shape: { type: 'Native', content: template8 } },
    { id: 'analogIO', shape: { type: 'Native', content: template5 } },
    { id: 'sensor', shape: { type: 'Native', content: template6 } },
    { id: 'deviceDriver', shape: { type: 'Native', content: template7 } },
    { id: 'Virtual-Server-Copy', shape: { type: 'Native', content: template10 } },
    { id: 'user', shape: { type: 'Native', content: template11 } },
    { id: 'User-group', shape: { type: 'Native', content: template12 } },
    { id: 'UPS', shape: { type: 'Native', content: template13 } },
    { id: 'Tablet', shape: { type: 'Native', content: template14 } },
    { id: 'Switch', shape: { type: 'Native', content: template15 } },
    { id: 'Subwoofer', shape: { type: 'Native', content: template16 } },
    { id: 'Speaker', shape: { type: 'Native', content: template17 } },
    { id: 'Security-camera', shape: { type: 'Native', content: template18 } },
    { id: 'arrow1', shape: { type: 'Path', data: arrow } }
];
let sourcePoint = { x: 0, y: 0 };
let targetPoint = { x: 40, y: 40 };
let targetDecorator = { shape: 'Arrow' };
let style = { strokeWidth: 2 };
// initializes the connector symbols to the UML Shapes in the symbol palette.
let connectorSymbols = [
    {
        id: 'link11', type: 'Straight', sourcePoint: sourcePoint, targetPoint: targetPoint,
        targetDecorator: targetDecorator, style: style
    },
    {
        id: 'link12', type: 'Orthogonal', sourcePoint: sourcePoint, targetPoint: targetPoint,
        targetDecorator: targetDecorator, style: style
    }
];
// Initializes the palettes to be displayed in the symbol palette.
let palettes = [
    { id: 'network', expanded: true, symbols: symbols, title: 'Network Shapes' },
    { id: 'connectors', expanded: true, symbols: connectorSymbols, title: 'Connectors' }
];
let dropElement = document.getElementsByClassName("control-fluid")[0];
const SAMPLE_CSS = `
@font-face {
  font-family: 'e-ddb-icons1';
  src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1tSfIAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmdC1P4gAAAcgAAAAwaGVhZBJhohMAAADQAAAANmhoZWEIVQQDAAAArAAAACRobXR4CAAAAAAAAYAAAAAIbG9jYQAYAAAAAAHAAAAABm1heHABDgAUAAABCAAAACBuYW1lm+wy9gAAAfgAAAK1cG9zdLnsYngAAASwAAAAMAABAAAEAAAAAFwEAAAAAAAD+AABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAAgNcenF8PPPUACwQAAAAAANelrs4AAAAA16WuzgAAAAAD+AN6AAAACAACAAAAAAAAAAEAAAACAAgAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAAQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAAGAAAAAIAAAAAA/gDegACAAcAACUhCQEhATUhAQQC9P6G/YoBMQFF/YqGAjf+hgH0QwAAAAAAEgDeAAEAAAAAAAAAAQAAAAEAAAAAAAEAEwABAAEAAAAAAAIABwAUAAEAAAAAAAMAEwAbAAEAAAAAAAQAEwAuAAEAAAAAAAUACwBBAAEAAAAAAAYAEwBMAAEAAAAAAAoALABfAAEAAAAAAAsAEgCLAAMAAQQJAAAAAgCdAAMAAQQJAAEAJgCfAAMAAQQJAAIADgDFAAMAAQQJAAMAJgDTAAMAAQQJAAQAJgD5AAMAAQQJAAUAFgEfAAMAAQQJAAYAJgE1AAMAAQQJAAoAWAFbAAMAAQQJAAsAJAGzIERpYWdyYW1fU2hhcGVzX0ZPTlRSZWd1bGFyRGlhZ3JhbV9TaGFwZXNfRk9OVERpYWdyYW1fU2hhcGVzX0ZPTlRWZXJzaW9uIDEuMERpYWdyYW1fU2hhcGVzX0ZPTlRGb250IGdlbmVyYXRlZCB1c2luZyBTeW5jZnVzaW9uIE1ldHJvIFN0dWRpb3d3dy5zeW5jZnVzaW9uLmNvbQAgAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAUgBlAGcAdQBsAGEAcgBEAGkAYQBnAHIAYQBtAF8AUwBoAGEAcABlAHMAXwBGAE8ATgBUAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAVgBlAHIAcwBpAG8AbgAgADEALgAwAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAdQBzAGkAbgBnACAAUwB5AG4AYwBmAHUAcwBpAG8AbgAgAE0AZQB0AHIAbwAgAFMAdAB1AGQAaQBvAHcAdwB3AC4AcwB5AG4AYwBmAHUAcwBpAG8AbgAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgECAQMABlNoYXBlcwAA) format('truetype');
  font-weight: normal;
  font-style: normal;
}

.e-ddb-icons1 {
  font-family: 'e-ddb-icons1';
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

.e-toggle-palette::before {
  content: "\e700"
}
.sb-mobile-palette {
  width:215px;
  height:559px;
  float:left;
}
.sb-mobile-palette-bar {
  display: none;
}
.sb-mobile-diagram {
  width:calc(100% - 217px);
  height: 559px;
  float: left;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-left: none;
}
.container-fluid{
  padding-bottom: 15px;
}
.e-upload
{
  height: 0px;
  width: 0px;
  display: none !important;
  border: none !important;
}
#dropArea {
  height: 50px;
  padding: 7px;
  text-align: center;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.12);
  /* border-top: none; */
}
@media (max-width: 550px) {
  .sb-mobile-palette {
      z-index: 19;
      position: absolute;
      display: none;
      transition: transform 300ms linear, visibility 0s linear 300ms;
      width:39%;
      height:100%;
  }
  .sb-mobile-diagram {
      width: 100%;
      height: 100%;
      float: left;
      left: 0px;
  }
  .sb-mobile-palette-bar {
      display: block;
      width: 100%;
      background:#fafafa;
      padding: 10px 10px;
      border:0.5px solid #e0e0e0;
      min-height: 40px;
  }
  #palette-icon {
      font-size: 20px; 
  }
}
.sb-mobile-palette-open {
  position: absolute;
  display: block;
  right: 15px;
}
.e-file-select-wrap {
  display: none;
}
.material #networkDiagram #palette-space .e-accordion {
  border: none;
}

.material #networkDiagram #palette-space {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.material #dropArea {
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.12);
}
.fabric #networkDiagram .sb-mobile-diagram {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
.bootstrap #networkDiagram .sb-mobile-diagram {
  height: 554px;
  margin-top: 5px;
  border-radius: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
`;
export class NetworkShapes extends SampleBase {
    btnClick() {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
    }
    render() {
        return (<div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <div id="networkDiagram" style={{ width: "100%", height: "600px" }}>
            <div className="sb-mobile-palette-bar">
              <div id="palette-icon" style={{ float: "right", role: "button" }} className="e-ddb-icons1 e-toggle-palette"></div>
            </div>
            <div id="palette-space" className="sb-mobile-palette">
              <SymbolPaletteComponent id="symbolpalette" ref={symbolpalette => (symbolPaletteInstance = symbolpalette)} expandMode="Multiple" palettes={palettes} //set default value for Node.
         getNodeDefaults={getSymbolDefaults} getSymbolInfo={getSymbolInfo} width={"100%"} height={"calc(100% - 50px)"} symbolHeight={48} symbolWidth={48}/>
              <div id="dropArea">
                <ButtonComponent ref={browse => (buttonInstance = browse)} onClick={this.btnClick.bind(this)} id="browse" cssClass='e-primary'>Import SVG Files</ButtonComponent>
                <UploaderComponent id="uploadFiles" type="file" ref={uploadFiles => (uploadBoxInstance = uploadFiles)} asyncSettings={{
            saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
            removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove"
        }} success={onUploadSuccess} removing={onFileRemove} dropArea={dropElement}/>
              </div>
            </div>

            <div id="diagram-space" className="sb-mobile-diagram">
              <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"100%"} nodes={nodes} connectors={connectors} getNodeDefaults={getNodeDefaults} getConnectorDefaults={getConnectorDefaults} snapSettings={snapSettings}/>
            </div>
          </div>
        </div>
        <div id="action-description">
        <p>
        This sample visualizes graphical layout of a network diagram using diagram's<code> Native </code> nodes feature.
       </p>
        </div>
        <div id="description">
        <p>
        This example shows how to host a <code>Native (SVG)</code> content inside a node. The <code>shape</code> property of the node can be
        used to host SVG content inside a node. The <code>content</code> property of the shape allows you to define the content to
        be hosted.
        </p>
          <br />
        </div>
      </div>);
    }
    rendereComplete() {
        diagramInstance.fitToPage();
        addEvents();
    }
}
let id = 0;
function onUploadSuccess(arg) {
    let file1 = arg.file;
    let file = file1.rawFile;
    let reader = new FileReader();
    reader.addEventListener("load", (event) => {
        let shape;
        let shapeContent = event.target.result;
        shape = {
            id: "newshape" + id.toString(),
            shape: { type: "Native", content: shapeContent }
        };
        symbolPaletteInstance.addPaletteItem("network", shape);
    });
    id++;
    reader.readAsText(file);
    uploadBoxInstance.clearAll();
}
function getNodeDefaults(node) {
    node.style.strokeColor = '#5C90DF';
    node.style.fill = 'transparent';
    if (node.annotations.length !== 0) {
        node.annotations[0].style.color = 'black';
        node.annotations[0].style.fontSize = 12;
        node.annotations[0].style = {
            textWrapping: 'NoWrap',
        };
    }
    if (node.ports.length !== 0) {
        for (let i = 0; i < node.ports.length; i++) {
            node.ports[i].visibility = PortVisibility.Hidden;
        }
    }
    if (node.shape.type === 'Native') {
        if (node.id === 'Server1') {
            node.width = 50;
            node.height = 65;
        }
        else if (node.id === 'WorkStation1' || node.id === 'WorkStation2' ||
            node.id === 'WorkStation3' || node.id === 'WorkStation4') {
            node.width = 60;
            node.height = 40;
        }
        else if (node.id === 'RemoteController1' || node.id === 'RemoteController2' ||
            node.id === 'RemoteController3') {
            node.width = 25;
            node.height = 50;
        }
        else if (node.id === 'modem1' || node.id === 'modem2' || node.id === 'modem3' ||
            node.id === 'modem4' || node.id === 'modem5' || node.id === 'sensor') {
            node.width = 40;
            node.height = 30;
        }
        else if (node.id === 'DeviceDriver1' || node.id === 'DeviceDriver2' ||
            node.id === 'DeviceDriver3') {
            node.width = 30;
            node.height = 33;
        }
        else if (node.id === 'AnalogIO' || node.id === 'HMI') {
            node.width = 40;
            node.height = 50;
        }
        node.shape.scale = 'Stretch';
    }
    if (node.shape.type === 'Text') {
        node.width = 127;
        node.height = 40;
        node.style = { bold: true, fontSize: 16 };
    }
    if (node.id === 'connector1' || node.id === 'connector2' || node.id === 'connector3' ||
        node.id === 'connector4' || node.id === 'connector5' || node.id === 'connector6') {
        if (node.id !== 'connector2' && node.id !== 'connector6') {
            node.rotateAngle = 270;
        }
        node.width = 50;
        node.height = 20;
        node.style = { strokeColor: '#5C90DF', fill: 'white' };
        node.shape = { type: 'Path', data: arrow };
    }
    return node;
}
function getConnectorDefaults(connector) {
    connector.targetDecorator = {
        shape: 'Arrow', width: 8, height: 8,
        style: { fill: '#5C90DF', strokeColor: '#5C90DF' }
    };
    connector.style.strokeColor = '#5C90DF';
    if (connector.annotations.length !== 0) {
        connector.annotations[0].style.fill = 'white';
    }
    return connector;
}
function getSymbolInfo(symbol) {
    return { fit: true };
}
function getSymbolDefaults(symbol) {
    if (symbol.id === 'arrow1') {
        symbol.width = 75;
        symbol.height = 60;
        symbol.offsetX = 160;
        symbol.offsetY = 135;
        symbol.style.strokeColor = '#5C90DF';
        symbol.style.fill = 'white';
    }
    else {
        if (symbol.id === 'remoteController') {
            symbol.width = 25;
        }
        else {
            symbol.width = 40;
        }
        symbol.height = 40;
        symbol.offsetX = 20;
        symbol.offsetY = 20;
        symbol.shape.scale = 'Stretch';
    }
}
function onFileRemove(args) {
    args.postRawFile = false;
}
let isMobile;
function addEvents() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        let paletteIcon = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}
