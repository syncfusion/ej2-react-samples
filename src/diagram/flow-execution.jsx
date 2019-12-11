import * as React from "react";
import { Node, DataBinding, DiagramComponent, SnapConstraints, Inject } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
let nodes = [];
let port1 = { id: 'port1', offset: { x: 0.5, y: 1 } };
let port = { id: 'port', offset: { x: 1, y: 0.5 } };
nodes.push(CreateNodes('node1', 100, 125, 'Terminator', 'Begin', 100, 35));
nodes.push(CreateNodes('node2', 300, 125, 'Process', 'Specify collection', 120, 25, [port]));
nodes.push(CreateNodes('node3', 500, 125, 'Decision', 'Particulars \n required?', 100, 50, [port1]));
nodes.push(CreateNodes('node4', 730, 125, 'Process', 'Specify particulars', 90, 25));
nodes.push(CreateNodes('node5', 500, 225, 'Process', 'Design collection', 100, 25, [port]));
nodes.push(CreateNodes('node6', 500, 320, 'Process', 'Cluster of events', 100, 25));
nodes.push(CreateNodes('node7', 500, 420, 'Process', 'Start the process', 100, 25));
nodes.push(CreateNodes('node8', 730, 320, 'Process', 'Record and analyze \n results', 170, 25, [port]));
nodes.push(CreateNodes('node9', 730, 420, 'Terminator', 'End ', 100, 35));
let connectors = [];
connectors.push(CreateConnector('connector1', 'node1', 'node2', ''));
connectors.push(CreateConnector('connector2', 'node2', 'node3', ''));
connectors.push(CreateConnector('connector3', 'node3', 'node4', 'Yes'));
connectors.push(CreateConnector('connector4', 'node3', 'node5', 'No'));
connectors.push(CreateConnector('connector5', 'node5', 'node6', ''));
connectors.push(CreateConnector('connector6', 'node6', 'node7', ''));
connectors.push(CreateConnector('connector7', 'node8', 'node6', ''));
connectors.push(CreateConnector('connector8', 'node7', 'node9', ''));
connectors.push(CreateConnector('connector10', 'node4', 'node5', '', 'Orthogonal', 'Bottom', 'port', 220));
let SAMPLE_CSS = `
#flowExecitionPropertySection .row {
            margin-left: 0px;
            margin-right: 0px;
        }

        #flowExecitionPropertySection .col-xs-7 {
            width: 300px;
        }

        #flowExecitionPropertySection .col-xs-7 {
            padding-left: 0px;
            padding-right: 0px;
        }

        #flowExecitionControlSection.content-wrapper {
            border: 1px solid #D7D7D7;
        }
`;
let diagramInstance;
export class FlowExecution extends SampleBase {
    renderComplete() {
        diagramInstance.select([diagramInstance.nodes[2]]);
        diagramInstance.selectionChange = (arg) => {
            applyChanges(selectedButton);
        };
    }
    render() {
        return (<div className="control-pane1">
        <div className="col-lg-8 control-section">
          <style>{SAMPLE_CSS}</style>
          <div id="flowExecitionControlSection" className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"600px"} nodes={nodes} snapSettings={{ constraints: SnapConstraints.None }} connectors={connectors} created={(args) => {
            diagramInstance.select([diagramInstance.nodes[2]]);
        }} selectionChange={(args) => {
            applyChanges(selectedButton);
        }}>
              <Inject services={[DataBinding]}/>
            </DiagramComponent>
          </div>
        </div>
        <div id="flowExecitionPropertySection" className="col-lg-4 property-section">
          <div className="property-panel-header"> Choose a flow</div>
          <div className="row property-panel-content" id="appearance">
            <div className="row property-panel-content">
              <div className="row">
                <div className="col-xs-7">
                  <RadioButtonComponent id="UnhighlightAll" name='radio' value='UnhighlightAll' label='None' change={(args) => {
            buttonChange(args);
        }}/>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="col-xs-7">
                  <RadioButtonComponent id="LinksInto" name='radio' value='LinksInto' label='Incoming connections' change={(args) => {
            buttonChange(args);
        }}/>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="col-xs-7">
                  <RadioButtonComponent id="LinksOutOf" name='radio' value='LinksOutOf' label='Outgoing connections' change={(args) => {
            buttonChange(args);
        }}/>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="col-xs-7">
                  <RadioButtonComponent id="LinksConnected" name='radio' value='LinksConnected' label='Incoming and outgoing connections' change={(args) => {
            buttonChange(args);
        }} checked={true}/>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="col-xs-7">
                  <RadioButtonComponent id="NodesInto" name='radio' value='NodesInto' label='Incoming nodes' change={(args) => {
            buttonChange(args);
        }}/>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="col-xs-7">
                  <RadioButtonComponent id="NodesOutOf" name='radio' value='NodesOutOf' label='Outgoing nodes' change={(args) => {
            buttonChange(args);
        }}/>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="col-xs-7">
                  <RadioButtonComponent id="NodesConnected" name='radio' value='NodesConnected' label='Incoming and outgoing nodes' change={(args) => {
            buttonChange(args);
        }}/>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="col-xs-7">
                  <RadioButtonComponent id="NodesReachable" name='radio' value='NodesReachable' label='Adjacent nodes' change={(args) => {
            buttonChange(args);
        }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates how we can process and get the consecutive nodes and connectors respectively.
          </p>
        </div>
        <div id="description">
          <p>
            We can get the inward connections and outward connections of the node using <code>inEdges</code> and <code>outEdges</code>        properties of the node. By using this connector’s name collection, we can find the node using <code>getObject</code>.
        And also, we can get the nodes connected on the connector using <code>sourceNode</code> and <code>targetNode</code>        properties of the connector. method can be used to print the diagrams.
          </p>
          <br />
        </div>
      </div>);
    }
}
function CreateConnector(name, source, target, content, type, direction, targePort, length) {
    let connector = {};
    connector.id = name;
    connector.sourceID = source;
    connector.targetID = target;
    connector.style = { strokeWidth: 2 };
    let annotation = {};
    annotation.content = content;
    annotation.style = { fill: 'white' };
    connector.annotations = [annotation];
    connector.style.strokeColor = '#8D8D8D';
    connector.targetDecorator = {};
    connector.targetDecorator.style = {};
    connector.targetDecorator.style.strokeColor = '#8D8D8D';
    connector.targetDecorator.style.fill = '#8D8D8D';
    if (targePort) {
        connector.targetPortID = targePort;
    }
    let segment = {};
    if (type) {
        connector.type = type;
        segment.direction = direction;
        segment.type = type;
        segment.length = length;
        connector.segments = [segment];
    }
    return connector;
}
function CreateNodes(name, offsetX, offsetY, shape, content, width, height, ports) {
    let node = {};
    node.id = name;
    node.offsetX = offsetX;
    node.width = 150;
    node.height = 50;
    node.offsetY = offsetY;
    let annotations = {};
    annotations.content = content;
    node.annotations = [annotations];
    node.shape = { type: 'Flow', shape: shape };
    node.style = { fill: '#FBF6E1', strokeColor: '#E8DFB6', strokeWidth: 2 };
    if (ports) {
        node.ports = ports;
    }
    return node;
}
let highLightedObjects = [];
let selectedButton = 'LinksConnected';
function buttonChange(args) {
    applyChanges(args.event.srcElement.id);
    selectedButton = args.event.srcElement.id;
}
function applyChanges(id) {
    Unhighlight();
    switch (id) {
        case 'LinksInto':
            linkedIn();
            break;
        case 'LinksOutOf':
            LinksOut();
            break;
        case 'LinksConnected':
            LinksConnector();
            break;
        case 'NodesInto':
            NodesIn();
            break;
        case 'NodesOutOf':
            NodesOut();
            break;
        case 'NodesConnected':
            NodesConnect();
            break;
        case 'NodesReachable':
            NodeReachable();
            break;
    }
}
function linkedIn() {
    if (diagramInstance.selectedItems.nodes.length) {
        let node = diagramInstance.selectedItems.nodes[0].inEdges;
        for (let i = 0; i < node.length; i++) {
            let index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[node[i]]);
            highLightedObjects.push(node[i]);
            diagramInstance.connectors[index].style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function LinksOut() {
    if (diagramInstance.selectedItems.nodes.length) {
        let node = diagramInstance.selectedItems.nodes[0].outEdges;
        for (let i = 0; i < node.length; i++) {
            let index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[node[i]]);
            highLightedObjects.push(node[i]);
            diagramInstance.connectors[index].style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function LinksConnector() {
    LinksOut();
    linkedIn();
}
function NodesIn() {
    if (diagramInstance.selectedItems.nodes.length) {
        let node = diagramInstance.selectedItems.nodes[0].inEdges;
        for (let i = 0; i < node.length; i++) {
            let nodeId = diagramInstance.nameTable[node[i]].sourceID;
            highLightedObjects.push(nodeId);
            let index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[nodeId]);
            diagramInstance.nodes[index].style.strokeColor = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function NodesOut() {
    if (diagramInstance.selectedItems.nodes.length) {
        let node = diagramInstance.selectedItems.nodes[0].outEdges;
        for (let i = 0; i < node.length; i++) {
            let nodeId = diagramInstance.nameTable[node[i]].targetID;
            highLightedObjects.push(nodeId);
            let index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[nodeId]);
            diagramInstance.nodes[index].style.strokeColor = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function NodesConnect() {
    NodesOut();
    NodesIn();
}
function NodeReachable() {
    if (diagramInstance.selectedItems.nodes.length) {
        let connectors = diagramInstance.selectedItems.nodes[0].outEdges;
        let nodeList = foundNode(connectors, []);
        for (let i = 0; i < nodeList.length; i++) {
            let index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[nodeList[i]]);
            highLightedObjects.push(nodeList[i]);
            diagramInstance.connectors[index].style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#1413F8';
            diagramInstance.dataBind();
        }
    }
}
function foundNode(list, nodeList) {
    for (let i = 0; i < list.length; i++) {
        let connector = diagramInstance.nameTable[list[i]];
        if (nodeList.indexOf(connector.id) > -1) {
            break;
        }
        if (!connector.annotations[0] || (connector.annotations[0] && connector.annotations[0].content !== 'No')) {
            nodeList.push(connector.id);
        }
        if (diagramInstance.nameTable[connector.targetID].outEdges.length) {
            if (list.indexOf(connector.targetID) === -1) {
                foundNode(diagramInstance.nameTable[connector.targetID].outEdges, nodeList);
            }
        }
    }
    return nodeList;
}
function Unhighlight() {
    for (let i = highLightedObjects.length - 1; i >= 0; i--) {
        if (diagramInstance.nameTable[highLightedObjects[i]] instanceof Node) {
            let index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[highLightedObjects[i]]);
            diagramInstance.nodes[index].style.strokeColor = '#E8DFB6';
            diagramInstance.dataBind();
        }
        else {
            let index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[highLightedObjects[i]]);
            diagramInstance.connectors[index].style.strokeColor = '#8D8D8D';
            diagramInstance.connectors[index].targetDecorator.style.strokeColor = '#8D8D8D';
            diagramInstance.connectors[index].targetDecorator.style.fill = '#8D8D8D';
            diagramInstance.dataBind();
        }
    }
    highLightedObjects = [];
}
