import { Connector, ConnectorModel, DiagramComponent, NodeModel, Node, NodeConstraints, randomId, UserHandleModel, Side, MarginModel, HorizontalAlignment, VerticalAlignment, DiagramTools, IExportOptions, FileFormats, SnapConstraints } from "@syncfusion/ej2-react-diagrams";
import { diagram, MindMapData, toolbarObj } from "./ai-text-to-mindmap";
import { ClickEventArgs, MenuEventArgs } from "@syncfusion/ej2-react-navigations";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";

let workingData = [
    { id: "1", Label: "Business Planning", parentId: "", branch: "Root", fill: "#D0ECFF", hasChild: true, level: 0, strokeColor: "#D0ECFF", orientation: "Root" },
    { id: "2", Label: "Expectation", parentId: "1", branch: "Left", fill: "#C4F2E8", hasChild: true, level: 1, strokeColor: "#C4F2E8", orientation: "Left" },
    { id: "3", Label: "Requirements", parentId: "1", branch: "Right", fill: "#F7E0B3", hasChild: true, level: 1, strokeColor: "#F7E0B3", orientation: "Right" },
    { id: "4", Label: "Marketing", parentId: "1", branch: "Left", fill: "#E5FEE4", hasChild: true, level: 1, strokeColor: "#E5FEE4", orientation: "Left" },
    { id: "5", Label: "Budgets", parentId: "1", branch: "Right", fill: "#E9D4F1", hasChild: true, level: 1, strokeColor: "#E9D4F1", orientation: "Right" },
    { id: "6", Label: "Situation in Market", parentId: "1", branch: "Left", fill: "#90C8C2", hasChild: true, level: 1, strokeColor: "#90C8C2", orientation: "Left" },
    { id: "7", Label: "Product Sales", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "8", Label: "Strategy", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "9", Label: "Contacts", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "10", Label: "Customer Groups", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "11", Label: "Branding", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "12", Label: "Advertising", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "13", Label: "Competitors", parentId: "6", branch: "SubLeft", fill: "#90C8C2", hasChild: false, level: 2, strokeColor: "#90C8C2", orientation: "SubLeft" },
    { id: "14", Label: "Location", parentId: "6", branch: "SubLeft", fill: "#90C8C2", hasChild: false, level: 2, strokeColor: "#90C8C2", orientation: "SubLeft" },
    { id: "15", Label: "Director", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "16", Label: "Accounts Department", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "17", Label: "Administration", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "18", Label: "Development", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "19", Label: "Estimation", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" },
    { id: "20", Label: "Profit", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" },
    { id: "21", Label: "Funds", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" }
];
export function pushWorkingData(diagram: DiagramComponent) {
    workingData = [];
    for (let i = 0; i < diagram.nodes.length; i++) {
        let node: any = diagram.nodes[i];
        let nodeData: any = {
            id: node.id,
            Label: node.annotations ? node.annotations[0].content : 'Node',
            fill: node!.style.fill,
            branch: node.addInfo.orientation,
            strokeColor: node.style.strokeColor,
            parentId: node.data.parentId,
            level: node.addInfo.level,
            orientation: node.addInfo!.orientation,
            hasChild: false,
        };
        workingData.push(nodeData);
    }
    // Create a Set of parentIds to quickly check which ids have children
    const parentIds = new Set(workingData.map(item => item.parentId).filter(id => id !== null));

    // Iterate over the data array and set hasChild to true if id is in parentIds
    workingData.forEach(item => {
        if (parentIds.has(item.id)) {
            item.hasChild = true;
        }
    });
}
let lastFillIndex = 0;
let fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
let borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];

export function getMindMapShape(parentNode: NodeModel) {
    var sss = {};
    var node = {};
    var connector: ConnectorModel = {};
    var addInfo = parentNode.addInfo;
    node = {
        minWidth: 100, maxWidth: 100, shape: { type: 'Basic', shape: 'Rectangle' },
        annotations: [{ content: '' }],
        style: { fill: '#000000', strokeColor: '#000000' },
        addInfo: { level: (addInfo as any).level + 1 },
        offsetX: 200, offsetY: 200
    };
    connector = { type: 'Bezier', style: { strokeColor: '#000000' } };
    if ((addInfo as any).level < 1) {
        (node as Node).style.fill = fillColorCode[lastFillIndex];
        (node as Node).style.strokeColor = borderColorCode[lastFillIndex];
        ;
        if (lastFillIndex + 1 >= fillColorCode.length) {
            lastFillIndex = 0;
        }
        else {
            lastFillIndex++;
        }
    }
    else {
        (node as Node).style.strokeColor = (node as Node).style.fill = (parentNode as Node).style.fill;
    }
    connector.type = 'Bezier';
    (connector as Connector).style.strokeColor = (node as Node).style.fill;
    connector.targetDecorator = { shape: 'None' };
    (node as Node).constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
    (node as Node).ports = [
        { id: 'leftPort', offset: { x: 0, y: 0.5 } },
        { id: 'rightPort', offset: { x: 1, y: 0.5 } },
        { id: 'topPort', offset: { x: 0.5, y: 0 } },
        { id: 'bottomPort', offset: { x: 0.5, y: 1 } }];
    (sss as any).node = node;
    (sss as any).connector = connector;
    return sss;
};
var index = 1;

export function addSibilingChild() {
    var selectedNode: any = (diagram as any).selectedItems.nodes[0];
    if (selectedNode.data.branch !== 'Root') {
        var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
        var orientation_3 = selectedNodeOrientation;
        var connector1: ConnectorModel = getConnector(diagram.connectors, selectedNode.inEdges[0]) as ConnectorModel;
        diagram.startGroupAction();
        var mindmapData: any = getMindMapShape(getNode(diagram.nodes as NodeModel[], connector1.sourceID as string) as NodeModel);
        var node = mindmapData.node;
        index = index + 1;
        node.id = index.toString();
        if (node.addInfo) {
            node.addInfo.orientation = orientation_3;
        }
        else {
            node.addInfo = { 'orientation': orientation_3 };
        }
        var nodeData = {
            id: node.id,
            Label: 'Node',
            fill: node.style.fill,
            branch: orientation_3,
            strokeColor: node.style.strokeColor,
            parentId: (selectedNode.data! as MindMapData).id,
            level: node.addInfo.level,
            orientation: node.addInfo.orientation,
            hasChild: false,
        };
        node.data = {
            id: node.id,
            Label: 'Node',
            fill: node.style.fill,
            strokeColor: node.style.strokeColor,
            orientation: node.addInfo.orientation,
            branch: orientation_3,
            parentId: (selectedNode.data! as MindMapData).id,
            level: node.addInfo.level,
            hasChild: false,
        };
        var tempData = workingData.filter(
            (a) => a.id === selectedNode.data.id
        );
        tempData[0].hasChild = true;
        workingData.push(nodeData);
        diagram.add(node);
        var connector = setConnectorDefault(orientation_3, mindmapData.connector, connector1.sourceID as string, node.id);
        diagram.add(connector);
        var node1: any = getNode(diagram.nodes, node.id);
        diagram.doLayout();
        diagram.endGroupAction();
        diagram.select([node1]);
    }
}
export function addNode(orientation: string, label?: string, canSelect?: boolean) {
    var selectedNode: any = (diagram as any).selectedItems.nodes[0];
    if (selectedNode.data.branch !== 'Root') {
        var selectedNodeOrientation = selectedNode.addInfo.orientation.toString();
        orientation = selectedNodeOrientation;
    }
    diagram.startGroupAction();
    var mindmapData: any = getMindMapShape(selectedNode);
    var node = mindmapData.node;
    index = index + 1;
    node.id = index.toString();
    if (node.addInfo) {
        node.addInfo.orientation = orientation;
    }
    else {
        node.addInfo = { 'orientation': orientation };
    }
    var nodeData = {
        id: node.id,
        Label: label ? label : "Node",
        fill: node.style.fill,
        branch: orientation,
        strokeColor: node.style.strokeColor,
        parentId: selectedNode.data.id,
        level: node.addInfo.level,
        orientation: node.addInfo.orientation,
        hasChild: false,
    };
    node.data = {
        id: node.id,
        Label: label ? label : "Node",
        fill: node.style.fill,
        strokeColor: node.style.strokeColor,
        orientation: node.addInfo.orientation,
        branch: orientation,
        parentId: selectedNode.data.id,
        level: node.addInfo.level,
        hasChild: false,
    };
    var tempData = workingData.filter(
        (a) => a.id === selectedNode.data.id
    );
    tempData[0].hasChild = true;
    workingData.push(nodeData);
    diagram.add(node);
    var connector = setConnectorDefault(orientation, mindmapData.connector, selectedNode.id, node.id);
    diagram.add(connector);
    var node1: any = getNode(diagram.nodes, node.id);
    diagram.doLayout();
    diagram.endGroupAction();
    if (!canSelect) {
        diagram.select([node1]);
    }
}

export function setConnectorDefault(orientation: string, connector: Connector, sourceID: string, targetID: string) {
    connector.id = 'connector' + randomId();
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    connector.sourcePortID = 'rightPort';
    connector.targetPortID = 'leftPort';
    if (orientation === 'Right') {
        connector.sourcePortID = 'leftPort';
        connector.targetPortID = 'rightPort';
    }
    connector.style.strokeWidth = 3;
    return connector;
};

export function removeSubChild(node: Node, diagram: DiagramComponent) {
    // Process outgoing edges
    for (let i = node.outEdges.length - 1; i >= 0; i--) {
        const connector: ConnectorModel = getConnector(diagram.connectors, node.outEdges[i]) as ConnectorModel;
        const childNode: Node = getNode(diagram.nodes, connector.targetID as string) as Node;

        if (childNode && childNode.outEdges.length > 0) {
            removeSubChild(childNode, diagram);
        } else {
            for (let x = workingData.length - 1; x >= 0; x--) {
                if (workingData[x].id === (childNode?.data as MindMapData).id) {
                    workingData.splice(x, 1);
                }
            }
            diagram.remove(childNode);
        }
    }

    // Process incoming edges
    for (let j = node.inEdges.length - 1; j >= 0; j--) {
        const connector: ConnectorModel = getConnector(diagram.connectors, node.inEdges[j]) as ConnectorModel;
        const childNode: Node = getNode(diagram.nodes, connector.sourceID as string) as Node;
        let index = childNode.outEdges.indexOf(connector.id as string);

        if (childNode.outEdges.length > 1 && index === 0) {
            index = childNode.outEdges.length;
        }

        if (index > 0) {
            const node1 = childNode.outEdges[index - 1];
            const connector1 = diagram.getObject(node1);
            const node2 = getNode(diagram.nodes, (connector1 as Connector).targetID);
            diagram.select([node2] as NodeModel[]);
        } else {
            diagram.select([childNode]);
        }
    }

    // Remove the node from workingData
    for (let x = workingData.length - 1; x >= 0; x--) {
        if (workingData[x].id === (node.data as MindMapData).id) {
            workingData.splice(x, 1);
        }
    }

    // Remove the node from the diagram
    diagram.remove(node);
}

export function getConnector(connectors: ConnectorModel[], name: string) {
    for (var i = 0; i < connectors.length; i++) {
        if (connectors[i].id === name) {
            return connectors[i];
        }
    }
    return null;
};
export function getNode(nodes: NodeModel[], name: string) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].id === name) {
            return nodes[i];
        }
    }
    return null;
};
//hide the require userhandle.
export function hideUserHandle(name: string) {
    for (let i: number = 0; i < (diagram as any).selectedItems.userHandles.length; i++) {
        var handle = (diagram as any).selectedItems.userHandles[i];
        if (handle.name === name) {
            handle.visible = false;
        }
    }
}


//set the value for UserHandle element
function applyHandle(handle: UserHandleModel, side: Side, offset: number, margin: MarginModel, halignment: HorizontalAlignment, valignment: VerticalAlignment) {
    handle.side = side;
    handle.offset = offset;
    handle.margin = margin;
    handle.horizontalAlignment = halignment;
    handle.verticalAlignment = valignment;
}
//Change the Position of the UserHandle.
export function changeUserHandlePosition(change: string) {
    for (var i: number = 0; i < (diagram as any).selectedItems.userHandles.length; i++) {
        var handle = (diagram as any).selectedItems.userHandles[i];
        if (handle.name === 'devare' && change === 'leftHandle') {
            applyHandle(handle, 'Left', 1, { top: 0, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');

        } else if (handle.name === 'devare' && change === 'rightHandle') {
            applyHandle(handle, 'Right', 1, { top: 0, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
        }
    }
}

export function getOrientation() {
    var leftChildCount = 0;
    var rightChildCount = 0;
    var orientation;
    if ((diagram as any).selectedItems.nodes[0].data.branch === "Root") {
        for (var i = 0; i < diagram.nodes.length; i++) {
            if (diagram.nodes[i].addInfo && (diagram as any).nodes[i].addInfo.level === 1) {
                if ((diagram as any).nodes[i].addInfo.orientation === "Left") {
                    leftChildCount++;
                } else {
                    rightChildCount++;
                }
            }
        }
        orientation = leftChildCount > rightChildCount ? "Right" : "Left";
    } else {
        var selectedNodeOrientation = (diagram as any).selectedItems.nodes[0].addInfo.orientation.toString();
        orientation = selectedNodeOrientation;
    }
    return orientation;

}

export function toolbarClick(args: ClickEventArgs) {
    let item = args.item.tooltipText;
    switch (item) {
        case 'Undo':
            diagram.undo();
            break;
        case 'Redo':
            diagram.redo();
            break;
        case 'Select Tool':
            diagram.clearSelection();
            diagram.tool = DiagramTools.Default;
            break;
        case 'Pan Tool':
            diagram.clearSelection();
            diagram.tool = DiagramTools.ZoomPan;
            break;
        case 'Add Child':
            var orientation = getOrientation();
            addNode(orientation);
            break;
        case 'Add Sibling':
            addSibilingChild();
            break;
    }
    diagram.dataBind();
}

export function onClickDisable(args: boolean, node?: Node) {
    if (args === false) {
        toolbarObj.items[6].disabled = false;
        toolbarObj.items[8].disabled = false;
        if (((node as NodeModel).addInfo as any).level !== 0) {
            toolbarObj.items[7].disabled = false;
        } else {
            toolbarObj.items[7].disabled = true;
        }
    }
    else if (args === true) {
        toolbarObj.items[6].disabled = true;
        toolbarObj.items[7].disabled = true;
        toolbarObj.items[8].disabled = true;
    }
}

export function zoomChange(args: MenuEventArgs) {
    let zoomCurrentValue: DropDownButtonComponent = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
    let currentZoom: number = diagram.scrollSettings.currentZoom!;
    let zoom: any = {};
    switch (args.item.text) {
        case 'Zoom In':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            zoomCurrentValue.content = (diagram.scrollSettings.currentZoom! * 100).toFixed() + '%';
            break;
        case 'Zoom Out':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            zoomCurrentValue.content = (diagram.scrollSettings.currentZoom! * 100).toFixed() + '%';
            break;
        case 'Zoom to Fit':
            zoom.zoomFactor = 1 / currentZoom - 1;
            diagram.zoomTo(zoom);
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom as any;
            break;
        case 'Zoom to 50%':
            if (currentZoom === 0.5) {
                currentZoom = 0;
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                diagram.zoomTo(zoom);
            }
            else {
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                diagram.zoomTo(zoom);
            }
            break;
        case 'Zoom to 100%':
            if (currentZoom === 1) {
                currentZoom = 0;
                zoom.zoomFactor = (1 / currentZoom) - 1;
                diagram.zoomTo(zoom);
            }
            else {
                zoom.zoomFactor = (1 / currentZoom) - 1;
                diagram.zoomTo(zoom);
            }
            break;
        case 'Zoom to 200%':
            if (currentZoom === 2) {
                currentZoom = 0;
                zoom.zoomFactor = (2 / currentZoom) - 1;
                diagram.zoomTo(zoom);
            }
            else {
                zoom.zoomFactor = (2 / currentZoom) - 1;
                diagram.zoomTo(zoom);
            }
            break;
    }

    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %';

}

//To update the layout based on the orientation
export function updateOrientation(diagram: any) {
    for (var i = 0; i < diagram.connectors.length; i++) {
        var connector = diagram.connectors[i];
        if (diagram.layout.orientation === "Vertical") {
            if (connector.sourcePortID === "rightPort" && connector.targetPortID === "leftPort") {
                connector.sourcePortID = 'bottomPort';
                connector.targetPortID = "topPort";
            }
            if (connector.sourcePortID === "leftPort" && connector.targetPortID === "rightPort") {
                connector.sourcePortID = 'topPort';
                connector.targetPortID = 'bottomPort';
            }
        } else if (diagram.layout.orientation === "Horizontal") {
            if (connector.sourcePortID === "bottomPort" && connector.targetPortID === "topPort") {
                connector.sourcePortID = 'rightPort';
                connector.targetPortID = "leftPort";
            }
            if (connector.sourcePortID === "topPort" && connector.targetPortID === "bottomPort") {
                connector.sourcePortID = 'leftPort';
                connector.targetPortID = 'rightPort';
            }
        }
    }
}

export function download(data: string) {
    if ((window.navigator as any).msSaveBlob) {
        let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
        let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        let ele = document.createElement('a');
        ele.href = dataString;
        ele.download = 'Diagram.json';
        document.body.appendChild(ele);
        ele.click();
        ele.remove();
    }
}

export function menuClick(args: MenuEventArgs) {
    let option = args.item.text?.toLowerCase().replace(/\s+/g, '');
    let btnZoomIncrement = (document.getElementById('btnZoomIncrement') as any).ej2_instances[0];

    switch (option) {
        case 'new':
            diagram.clear();
            diagram.loadDiagram('{"width":"100%","height":"100%","snapSettings":{"constraints":0,"gridType":"Lines","verticalGridlines":{"lineIntervals":[1.25,18.75,0.25,19.75,0.25,19.75,0.25,19.75,0.25,19.75]},"horizontalGridlines":{"lineIntervals":[1.25,18.75,0.25,19.75,0.25,19.75,0.25,19.75,0.25,19.75]}},"tool":1,"layout":{"type":"MindMap","horizontalSpacing":50,"verticalSpacing":50,"getBranch":{},"enableAnimation":true,"connectionPointOrigin":"SamePoint","arrangement":"Nonlinear","enableRouting":false,"fixedNode":"sZIN0"},"selectedItems":{"constraints":4096,"userHandles":[{"name":"leftHandle","pathData":"M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z","backgroundColor":"black","pathColor":"white","side":"Left","offset":0.5,"margin":{"top":10,"bottom":0,"left":0,"right":10},"horizontalAlignment":"Left","verticalAlignment":"Top"},{"name":"rightHandle","pathData":"M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z","backgroundColor":"black","pathColor":"white","side":"Right","offset":0.5,"margin":{"top":10,"bottom":0,"left":10,"right":0},"horizontalAlignment":"Right","verticalAlignment":"Top"},{"name":"devare","pathData":"M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.7696.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.0491.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z","backgroundColor":"black","pathColor":"white","side":"Top","offset":0.5,"margin":{"top":0,"bottom":0,"left":0,"right":0},"horizontalAlignment":"Center","verticalAlignment":"Center"}],"nodes":[],"connectors":[],"wrapper":null,"selectedObjects":[]},"dataSourceSettings":{"id":"id","parentId":"parentId","dataSource":{"dateParse":true,"timeZoneHandling":true,"requests":[],"dataSource":{"json":[{"id":"1","Label":"Root","fill":"#D0ECFF","branch":"Root","hasChild":true,"level":0,"strokeColor":"#80BFEA","orientation":"Root"}],"offline":true,"dataType":"json"},"defaultQuery":{"subQuery":null,"isChild":false,"distincts":[],"queries":[{"fn":"onTake","e":{"nos":7}}],"key":"","fKey":"","expands":[],"sortedColumns":[],"groupedColumns":[],"params":[],"lazyLoad":[]},"adaptor":{"options":{"from":"table","requestType":"json","sortBy":"sorted","select":"select","skip":"skip","group":"group","take":"take","search":"search","count":"requiresCounts","where":"where","aggregates":"aggregates","expand":"expand"},"type":{},"pvt":{}}},"root":"1","dataManager":null,"crudAction":{"read":""},"connectionDataSource":{"dataManager":null},"dataMapSettings":[]},"getNodeDefaults":{},"getConnectorDefaults":{},"getCustomTool":{},"selectionChange":{},"rulerSettings":{"showRulers":true,"dynamicGrid":true,"horizontalRuler":{"orientation":"Horizontal","interval":10,"segmentWidth":100,"thickness":25,"tickAlignment":"RightOrBottom","arrangeTick":null},"verticalRuler":{"orientation":"Vertical","interval":10,"segmentWidth":100,"thickness":25,"tickAlignment":"RightOrBottom","arrangeTick":null}},"created":{},"keyDown":{},"historyChange":{},"textEdit":{},"drop":{},"scrollChange":{},"enableRtl":false,"locale":"en-US","scrollSettings":{"currentZoom":1,"viewPortWidth":1330,"viewPortHeight":629.6614379882812,"horizontalOffset":0,"verticalOffset":-0.33,"padding":{"left":0,"right":0,"top":0,"bottom":0},"scrollLimit":"Diagram","minZoom":0.2,"maxZoom":30},"enablePersistence":false,"backgroundColor":"transparent","constraints":500,"contextMenuSettings":{},"mode":"SVG","layers":[{"id":"default_layer","visible":true,"lock":false,"objects":["sZIN0"],"zIndex":0,"objectZIndex":0}],"nodes":[{"id":"sZIN0","data":{"id":"1","Label":"Root","fill":"#D0ECFF","branch":"Root","hasChild":true,"level":0,"strokeColor":"#80BFEA","orientation":"Root"},"shape":{"type":"Basic","cornerRadius":5,"shape":"Ellipse"},"ports":[{"id":"leftPort","offset":{"x":0,"y":0.5},"visibility":2,"style":{"fill":"black","strokeColor":"black","opacity":1,"strokeDashArray":"","strokeWidth":1},"inEdges":[],"outEdges":[],"height":12,"width":12,"shape":"Square","margin":{"right":0,"bottom":0,"left":0,"top":0},"horizontalAlignment":"Center","verticalAlignment":"Center"},{"id":"rightPort","offset":{"x":1,"y":0.5},"visibility":2,"style":{"fill":"black","strokeColor":"black","opacity":1,"strokeDashArray":"","strokeWidth":1},"inEdges":[],"outEdges":[],"height":12,"width":12,"shape":"Square","margin":{"right":0,"bottom":0,"left":0,"top":0},"horizontalAlignment":"Center","verticalAlignment":"Center"}],"zIndex":0,"constraints":5240810,"style":{"fill":"#D0ECFF","strokeColor":"#80BFEA","strokeWidth":1,"gradient":{"type":"None"},"strokeDashArray":"","opacity":1},"addInfo":{"level":0,"orientation":"Root"},"expandIcon":{"shape":"None","height":10,"width":10,"fill":"white","borderColor":"black","offset":{"x":0.5,"y":1}},"collapseIcon":{"shape":"None","height":10,"width":10,"fill":"white","borderColor":"black","offset":{"x":0.5,"y":1}},"width":150,"height":75,"annotations":[{"id":"VgDkd","content":"Root","annotationType":"String","style":{"strokeWidth":0,"strokeColor":"transparent","fill":"transparent","bold":false,"textWrapping":"WrapWithOverflow","color":"black","whiteSpace":"CollapseSpace","fontFamily":"Arial","fontSize":12,"italic":false,"opacity":1,"strokeDashArray":"","textAlign":"Center","textOverflow":"Wrap","textDecoration":"None"},"hyperlink":{"link":"","hyperlinkOpenState":"NewTab","content":"","textDecoration":"None"},"constraints":4,"visibility":true,"rotateAngle":0,"margin":{"right":0,"bottom":0,"left":0,"top":0},"horizontalAlignment":"Center","verticalAlignment":"Center","offset":{"x":0.5,"y":0.5}}],"container":null,"offsetX":665,"offsetY":314.8307189941406,"visible":true,"horizontalAlignment":"Left","verticalAlignment":"Top","backgroundColor":"transparent","borderColor":"none","borderWidth":0,"rotateAngle":0,"pivot":{"x":0.5,"y":0.5},"margin":{},"flip":"None","wrapper":{"actualSize":{"width":150,"height":75},"offsetX":665,"offsetY":314.8307189941406},"flipMode":"All","isExpanded":true,"fixedUserHandles":[],"excludeFromLayout":false,"inEdges":[],"outEdges":[],"parentId":"","processId":"","umlIndex":-1,"isPhase":false,"isLane":false}],"connectors":[],"diagramSettings":{"inversedAlignment":true},"pageSettings":{"boundaryConstraints":"Infinity","width":null,"orientation":"Landscape","height":null,"background":{"source":"","color":"transparent"},"showPageBreaks":false,"fitOptions":{"canFit":false}},"basicElements":[],"tooltip":{"content":""},"commandManager":{"commands":[{"name":"leftChild","canExecute":{},"execute":{},"gesture":{"key":9},"parameter":""},{"name":"rightChild","canExecute":{},"execute":{},"gesture":{"key":9,"keyModifiers":4},"parameter":""},{"name":"showShortCut","canExecute":{},"execute":{},"gesture":{"key":112},"parameter":""},{"name":"FitToPage","canExecute":{},"execute":{},"gesture":{"key":119},"parameter":""},{"name":"boldLabel","canExecute":{},"execute":{},"gesture":{"key":66,"keyModifiers":1},"parameter":""},{"name":"italicLabel","canExecute":{},"execute":{},"gesture":{"key":73,"keyModifiers":1},"parameter":""},{"name":"underlineLabel","canExecute":{},"execute":{},"gesture":{"key":85,"keyModifiers":1},"parameter":""},{"name":"deleteNode","canExecute":{},"execute":{},"gesture":{"key":8},"parameter":""},{"name":"removeNode","canExecute":{},"execute":{},"gesture":{"key":46},"parameter":""},{"name":"expandCollapse","canExecute":{},"execute":{},"gesture":{"key":32},"parameter":""},{"name":"expandCollapseParent","canExecute":{},"execute":{},"gesture":{"key":69,"keyModifiers":1},"parameter":""},{"gesture":{"key":13},"canExecute":{},"execute":{},"name":"sibilingChildTop","parameter":""},{"name":"newDiagram","canExecute":{},"execute":{},"gesture":{"key":78,"keyModifiers":1},"parameter":""},{"name":"saveDiagram","canExecute":{},"execute":{},"gesture":{"key":83,"keyModifiers":1},"parameter":""},{"name":"openDiagram","canExecute":{},"execute":{},"gesture":{"key":79,"keyModifiers":1},"parameter":""},{"name":"navigationDown","canExecute":{},"execute":{},"gesture":{"key":40},"parameter":""},{"name":"navigationUp","canExecute":{},"execute":{},"gesture":{"key":38},"parameter":""},{"name":"navigationLeft","canExecute":{},"execute":{},"gesture":{"key":37},"parameter":""},{"name":"navigationRight","canExecute":{},"execute":{},"gesture":{"key":39},"parameter":""}]},"version":17.1}');
            workingData = [{ id: '1', Label: 'Root', branch: 'Root', hasChild: true, level: 0, fill: "#D0ECFF", strokeColor: "#80BFEA", orientation: 'Root', parentId: '' },];
            break;
        case 'open':
            (document.getElementsByClassName('e-file-select-wrap') as any)[0].querySelector('button').click();
            break;
        case 'save':
            download(diagram.saveDiagram());
            break;
        case 'print':
            let printOptions: IExportOptions = {};
            printOptions.multiplePage = false;
            diagram.print(printOptions);
            break;
        case 'jpg':
        case 'png':
        case 'svg':
            onselectExport(option)
            break;
        case 'undo':
            diagram.undo();
            break;
        case 'redo':
            diagram.redo();
            break;
        case 'cut':
            diagram.cut();
            break;
        case 'copy':
            diagram.copy();
            break;
        case 'paste':
            diagram.paste();
            break;
        case 'delete':
            diagram.remove();
            break;
        case 'selectall':
            diagram.selectAll();
            break;
        case 'fittoscreen':
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
        case 'showrulers':
            diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
        case 'zoomin':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            btnZoomIncrement.content = Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %';
            break;
        case 'zoomout':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            btnZoomIncrement.content = Math.round(diagram.scrollSettings.currentZoom! * 100) + ' %';
            break;
        case 'showtoolbar':
            let toolbar = document.getElementById('toolbarEditor') as HTMLElement;
            toolbar.style.display = toolbar.style.display === 'none' ? 'block' : 'none';
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
        case 'showlines':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints! ^ SnapConstraints.ShowLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
        case 'showshortcuts':
            var node1 = document.getElementById('shortcutDiv') as HTMLElement;
            node1.style.visibility = node1.style.visibility === "hidden" ? node1.style.visibility = "visible" : node1.style.visibility = "hidden";
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
        case 'showpagebreaks':
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            diagram.pageSettings.showPageBreaks = !diagram.pageSettings.showPageBreaks;
            break;
    }

}



//Export the diagraming object based on the format.
function onselectExport(option: string) {
    let exportOptions: IExportOptions = {};
    exportOptions.format = option.toUpperCase() as FileFormats;
    exportOptions.mode = 'Download';
    exportOptions.region = 'Content';
    exportOptions.fileName = 'Export';
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagram.exportDiagram(exportOptions);
}

export function loadDiagram(event: any) {
    diagram.loadDiagram(event.target.result);
    diagram.fitToPage({ mode: 'Page' });
    updateOrientation(diagram)
    workingData = [];
    if (diagram.dataSourceSettings.dataSource && diagram.dataSourceSettings.dataSource.dataSource.json && diagram.dataSourceSettings.dataSource.dataSource.json.length > 0) {
        for (let i = 0; i < diagram.dataSourceSettings.dataSource.dataSource.json.length; i++) {
            let treeData: any = diagram.dataSourceSettings.dataSource.dataSource.json[i];
            workingData.push(treeData);
        }
    }
    pushWorkingData(diagram);
}