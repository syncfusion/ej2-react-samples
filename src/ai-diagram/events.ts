import { BasicShapeModel, NodeConstraints, NodeModel, Node, ISelectionChangeEventArgs, PointPort, UserHandleEventsArgs, Connector, ConnectorModel, ConnectorConstraints, DiagramComponent } from "@syncfusion/ej2-react-diagrams";
import { getPort, MindMapData, toolbarObj } from "./ai-text-to-mindmap";
import { addNode, changeUserHandlePosition, getMindMapShape, hideUserHandle, onClickDisable, removeSubChild } from "./utilitymethods";

export function selectionChange(args: ISelectionChangeEventArgs) {
    let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
    if (args.state === 'Changing') {
        if (args.type === "Addition") {
            if (args.newValue[0] instanceof Node && args.newValue[0].addInfo) {
                for (let i = 0; i < (diagram as any).selectedItems.userHandles.length; i++) {
                    let handle = (diagram as any).selectedItems.userHandles[i];
                    handle.visible = true;
                }
                if ((args.newValue[0].addInfo as any).orientation === 'Left' ||
                    (args.newValue[0].addInfo as any).orientation === 'subLeft' ||
                    (args.newValue[0].addInfo as any).orientation === 'SubLeft') {
                    hideUserHandle('leftHandle');
                    changeUserHandlePosition('leftHandle');
                    changeUserHandlePosition('devare');
                }
                else if ((args.newValue[0].addInfo as any).orientation === 'Right' ||
                    (args.newValue[0].addInfo as any).orientation === 'subRight' ||
                    (args.newValue[0].addInfo as any).orientation === 'SubRight') {
                    hideUserHandle('rightHandle');
                    changeUserHandlePosition('rightHandle');
                    changeUserHandlePosition('devare');

                }
                else if ((args.newValue[0].data as MindMapData).branch === 'Root') {
                    hideUserHandle('devare');
                }
                onClickDisable(false, args.newValue[0]);
            }
            else {
                hideUserHandle('leftHandle');
                hideUserHandle('rightHandle');
                hideUserHandle('devare');
                onClickDisable(true, args.newValue[0] as Node);
            }
        }
    }
    if (args.newValue.length === 0) {
        onClickDisable(true);
    }
}


export function historyChange() {
    let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
    if ((diagram as any).historyManager.undoStack.length > 0) {
        toolbarObj.items[0].disabled = false;
    } else {
        toolbarObj.items[0].disabled = true;
    }
    if ((diagram as any).historyManager.redoStack.length > 0) {
        toolbarObj.items[1].disabled = false;
    } else {
        toolbarObj.items[1].disabled = true;
    }
}
//Sets the default values of a node
export function getNodeDefaults(obj: NodeModel): NodeModel {
    if (obj.id !== 'textNode' && obj.data) {
        obj.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
        var empInfo = obj.data as MindMapData;
        obj.style = {
            fill: (obj.data as MindMapData).fill, strokeColor: (obj.data as MindMapData).strokeColor,
            strokeWidth: 1
        };
        if (empInfo.branch === 'Root') {
            obj.addInfo = { level: 0 };
            (obj.data as MindMapData).level = (obj.addInfo as any).level;
            (obj.data as MindMapData).orientation = empInfo.branch;
        }
        obj.addInfo = { level: (obj.data as MindMapData).level, orientation: (obj.data as MindMapData).orientation };
        (obj.shape as BasicShapeModel).cornerRadius = empInfo.branch === 'Root' ? 5 : 0;
        obj.shape = { type: 'Basic', shape: 'Ellipse' };
        obj.width = empInfo.branch === 'Root' ? 150 : 100;
        obj.height = empInfo.branch === 'Root' ? 75 : 50;
        obj.annotations = [{
            content: empInfo.Label,

        }];
    }
    var port = getPort();
    if (!(obj as Node).ports.length) {
        for (var i = 0; i < port.length; i++) {
            (obj as Node).ports.push(new PointPort(obj, 'ports', port[i], true));
        }
    }

    return obj;
}

let currentBranch = 'Left';
//Sets the default values of a connector
export function getConnectorDefaults(connector: Connector): ConnectorModel {
    let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
    connector.type = 'Bezier';
    connector.targetDecorator = { shape: 'None' };
    connector.bezierSettings.allowSegmentsReset = false;
    connector.segments = [{ type: 'Bezier' }];
    var sourceNode: any = diagram.getObject(connector.sourceID);
    var targetNode: any = diagram.getObject(connector.targetID);

    if (!sourceNode.data) {
        sourceNode.data = {};
        sourceNode.data.id = sourceNode.id;
        sourceNode.data.branch = 'Root';
        sourceNode.data.orientation = 'Root';
        sourceNode.data.level = 0;
        sourceNode.data.parentId = '';
        sourceNode.data.Label = sourceNode.annotations[0].content;
        sourceNode.addInfo = sourceNode.data;
        let nodeData: any = getMindMapShape(sourceNode);
        sourceNode.data.fill = nodeData.node.style.fill;
        sourceNode.data.strokeColor = nodeData.node.style.strokeColor;
        sourceNode.addInfo = sourceNode.data;
        sourceNode.style.fill = sourceNode.data.fill;
        sourceNode.style.strokeColor = sourceNode.data.strokeColor;
    }
    if (!targetNode.data) {
        targetNode.data = {};
        targetNode.data.id = targetNode.id;
        targetNode.data.branch = sourceNode.data.branch === 'Root'
            ? currentBranch
            : (sourceNode.data.branch === 'Left' || sourceNode.data.branch === 'subLeft' || sourceNode.data.branch === 'SubLeft' ? 'subLeft' : 'subRight');

        targetNode.data.orientation = targetNode.data.branch === 'Left' || targetNode.data.branch === 'subLeft' ? 'Left' : 'Right';
        targetNode.data.level = sourceNode.data.level + 1;
        targetNode.data.parentId = sourceNode.data.id;
        targetNode.data.Label = targetNode.annotations[0].content;
        targetNode.addInfo = targetNode.data;
        let nodeData: any = getMindMapShape(sourceNode);
        targetNode.data.fill = nodeData.node.style.fill;
        targetNode.data.strokeColor = nodeData.node.style.strokeColor;
        targetNode.addInfo = targetNode.data;
        targetNode.style.fill = targetNode.data.fill;
        targetNode.style.strokeColor = targetNode.data.strokeColor;
        currentBranch = sourceNode.data.branch === 'Root' ? currentBranch === 'Left' ? 'Right' : 'Left' : currentBranch;
    }
    if (targetNode.data && (targetNode.data.branch === 'Right' || targetNode.data.branch === 'subRight' || targetNode.data.branch === 'SubRight')) {
        connector.sourcePortID = sourceNode.ports[0].id;
        connector.targetPortID = targetNode.ports[1].id;
        connector.style = { strokeWidth: 1, strokeColor: '#8c8c8c' };
    }
    else if (targetNode.data && (targetNode.data.branch === 'Left' || targetNode.data.branch === 'subLeft' || targetNode.data.branch === 'SubLeft')) {
        connector.sourcePortID = sourceNode.ports[1].id;
        connector.targetPortID = targetNode.ports[0].id;
        connector.style = { strokeWidth: 1, strokeColor: '#8c8c8c' };
    }
    connector.constraints &= ~ConnectorConstraints.Select;
    return connector;
}

export function onUserHandleMouseDown(args: UserHandleEventsArgs) {
    if (args.element.name === 'leftHandle') {
        addNode('Right');
    }
    else if (args.element.name === 'rightHandle') {
        addNode('Left');
    }
    else if (args.element.name === 'devare') {
        let diagram: DiagramComponent = (document.querySelector('#diagram') as any).ej2_instances[0];
        if ((diagram as any).selectedItems.nodes.length > 0) {
            (diagram as any).historyManager.startGroupAction();
            removeSubChild((diagram as any).selectedItems.nodes[0], diagram);
            (diagram as any).historyManager.endGroupAction();
            diagram.doLayout();
        }
    }
}