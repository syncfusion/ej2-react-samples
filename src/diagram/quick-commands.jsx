import * as React from "react";
import { MoveTool, randomId, SelectorConstraints, cloneObject, DiagramComponent, SnapConstraints } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 50px;
        width: calc((100% - 18px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .row {
        margin: 10px 0px 0px 0px;
    }

    .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .row-header {
        font-size: 15px;
        font-weight: 500;
        margin-top: 10px
    }

    .property-panel-header {
        padding-top: 2px;
        padding-bottom: 5px;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .container-fluid {
        padding-left: 0px;
    }

    .diagram-control-pane .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 5px;
    }`;
let diagramInstance;
//Defines the nodes collection in diagram
let nodes = [
    {
        id: "NewIdea",
        width: 150,
        height: 60,
        offsetX: 300,
        offsetY: 60,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [{ content: "New idea identified" }]
    },
    {
        id: "Meeting",
        width: 150,
        height: 60,
        offsetX: 300,
        offsetY: 155,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Meeting with board" }]
    },
    {
        id: "BoardDecision",
        width: 150,
        height: 110,
        offsetX: 300,
        offsetY: 280,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [{ content: "Board decides \n whether to proceed" }]
    },
    {
        id: "Project",
        width: 150,
        height: 100,
        offsetX: 300,
        offsetY: 430,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [{ content: "Find Project manager" }]
    },
    {
        id: "End",
        width: 150,
        height: 60,
        offsetX: 300,
        offsetY: 555,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Implement and Deliver" }]
    },
    {
        id: "Decision",
        width: 250,
        height: 60,
        offsetX: 550,
        offsetY: 60,
        shape: { type: "Flow", shape: "Card" },
        annotations: [{ content: "Decision process for new software ideas" }]
    },
    {
        id: "Reject",
        width: 150,
        height: 60,
        offsetX: 550,
        offsetY: 280,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Reject" }]
    },
    {
        id: "Resources",
        width: 150,
        height: 60,
        offsetX: 550,
        offsetY: 430,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Hire new resources" }]
    }
];
//Defines the connectors collection in diagram
let connectors = [
    {
        id: "connector1",
        type: "Straight",
        sourceID: "NewIdea",
        targetID: "Meeting"
    },
    {
        id: "connector2",
        type: "Straight",
        sourceID: "Meeting",
        targetID: "BoardDecision"
    },
    {
        id: "connector3",
        type: "Straight",
        sourceID: "BoardDecision",
        targetID: "Project"
    },
    { id: "connector4", type: "Straight", sourceID: "Project", targetID: "End" },
    {
        id: "connector5",
        type: "Straight",
        sourceID: "BoardDecision",
        targetID: "Reject"
    },
    {
        id: "connector6",
        type: "Straight",
        sourceID: "Project",
        targetID: "Resources"
    }
];
//Defines the user handle collection for nodes in diagram
let handles = [
    {
        name: "clone",
        pathData: "M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3," +
            "0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z " +
            "M68.5,72.5h-30V34.4h30V72.5z",
        visible: true,
        offset: 0,
        side: "Bottom",
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
        pathColor: "white"
    }
];
export class UserHandle extends SampleBase {
    rendereComplete() {
        diagramInstance.fitToPage();
        diagramInstance.select([diagramInstance.nodes[0]]);
        document.getElementById("appearance").onclick = (args) => {
            let target = args.target;
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "left":
                        setuserhandleposition(0, "Bottom", target);
                        break;
                    case "right":
                        setuserhandleposition(1, "Bottom", target);
                        break;
                    case "topr":
                        setuserhandleposition(0, "Right", target);
                        break;
                }
            }
            diagramInstance.dataBind();
        };
        document.getElementById("pattern").onclick = (args) => {
            let target = args.target;
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "pattern1":
                        applyuserhandlestyle("#1E90FF", target);
                        break;
                    case "pattern2":
                        applyuserhandlestyle("#3CB371", target);
                        break;
                    case "pattern3":
                        applyuserhandlestyle("#FF6347", target);
                        break;
                }
            }
            diagramInstance.dataBind();
        };
    }
    render() {
        return (<div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"600px"} nodes={nodes} connectors={connectors} selectedItems={{
            constraints: SelectorConstraints.UserHandle,
            userHandles: handles
        }} snapSettings={{ constraints: SnapConstraints.None }} 
        //set Node default value
        getNodeDefaults={(node) => {
            return {
                style: { fill: "#578CA9", strokeColor: "none" },
                annotations: [{ style: { color: "white" } }]
            };
        }} 
        //set CustomTool
        getCustomTool={getTool}>
            </DiagramComponent>
          </div>
        </div>
          <div className="col-lg-4 property-section">
            <div className="property-panel-header">Properties</div>
            <div className="row property-panel-content" id="appearance">
              <div className="row row-header">Alignment</div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="image-pattern-style e-selected-style" id="left" style={{
            backgroundImage: "url('src/diagram/Images/user-handle/bottoml.png')",
            marginRight: "4px"
        }}/>
                <div className="image-pattern-style" id="right" style={{
            backgroundImage: "url('src/diagram/Images/user-handle/bottomr.png')",
            margin: "0px 4px"
        }}/>
                <div className="image-pattern-style" id="topr" style={{
            backgroundImage: "url('src/diagram/Images/user-handle/topr.png')"
        }}/>
              </div>
            </div>
            <div className="row property-panel-content" id="pattern">
              <div className="row row-header">Appearance</div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="image-pattern-style" id="pattern1" style={{
            backgroundImage: "url('src/diagram/Images/user-handle/pattern1.png')",
            marginRight: "4px"
        }}/>
                <div className="image-pattern-style" id="pattern2" style={{
            backgroundImage: "url('src/diagram/Images/user-handle/pattern2.png')",
            margin: "0px 4px"
        }}/>
                <div className="image-pattern-style" id="pattern3" style={{
            backgroundImage: "url('src/diagram/Images/user-handle/pattern3.png')"
        }}/>
              </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample visualizes a simple flow diagram along with options to
            execute the frequently used commands using user handles.
          </p>
        </div>
        <div id="description">
          <p>
            User handles are icons that are placed around the node to run the
            frequently used commands. This example shows how to render and
            configure user handles and how to interact with the diagram using
            user handles. The <code>userHandles</code> property of the{" "}
            <code>selectedItems</code> can be used to add user handles to the
            diagram. Click the templates in the property panel, to customize the
            size, position, and appearance of the user handles.
          </p>
          <br />
        </div>
      </div>);
    }
}
//Defines the clone tool used to copy Node/Connector
class CloneTool extends MoveTool {
    mouseDown(args) {
        let newObject;
        if (diagramInstance.selectedItems.nodes.length > 0) {
            newObject = cloneObject(diagramInstance.selectedItems.nodes[0]);
        }
        else {
            newObject = cloneObject(diagramInstance.selectedItems.connectors[0]);
        }
        newObject.id += randomId();
        diagramInstance.paste([newObject]);
        args.source = diagramInstance.nodes[diagramInstance.nodes.length - 1];
        args.sourceWrapper = args.source.wrapper;
        super.mouseDown(args);
        this.inAction = true;
    }
}
//Enable the clone Tool for UserHandle.
function getTool(action) {
    let tool;
    if (action === "clone") {
        tool = new CloneTool(diagramInstance.commandHandler);
    }
    return tool;
}
//set the position of the userhandle.
function setuserhandleposition(offset, side, target) {
    diagramInstance.selectedItems.userHandles[0].offset = offset;
    diagramInstance.selectedItems.userHandles[0].side = side;
}
//set the style of the userhandle.
function applyuserhandlestyle(bgcolor, target) {
    diagramInstance.selectedItems.userHandles[0].backgroundColor = bgcolor;
    diagramInstance.selectedItems.userHandles[0].pathColor = "White";
}
