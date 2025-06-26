import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    DataBinding,
    DiagramComponent,
    SnapConstraints,
    Inject,
    DiagramConstraints,
    ConnectorModel,
    Diagram,
    NodeModel,
    NodeConstraints,
    BpmnDiagrams
} from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';
import { NumericTextBoxComponent, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { TooltipModel } from '@syncfusion/ej2-react-popups';
/**
 * Tooltip sample
 */

const SAMPLE_CSS = `.diagram-tooltip table{
    border-collapse: separate;
}

.diagram-tooltip #tooltipDiagramSection {
    border: 1px solid #D7D7D7;
}
.diagram-tooltip #tooltipPropertySection .property-panel-header {
    margin-left: 10px;
}`;

// Collection of relative modes for tooltip
export let modeValue: { [key: string]: Object }[] = [
    { type: 'Object', text: 'Object' },
    { type: 'Mouse', text: 'Mouse' },
];

//Collection of positions for tooltip
export let PositionValue: { [key: string]: Object }[] = [
    { type: 'TopLeft', text: 'Top Left' },
    { type: 'TopCenter', text: 'Top Center' },
    { type: 'TopRight', text: 'Top Right' },
    { type: 'BottomLeft', text: 'Bottom Left' },
    { type: 'BottomCenter', text: 'Bottom Center' },
    { type: 'BottomRight', text: 'Bottom Right' },
    { type: 'LeftTop', text: 'Left Top' },
    { type: 'LeftCenter', text: 'Left Center' },
    { type: 'LeftBottom', text: 'Left Bottom' },
    { type: 'RightTop', text: 'Right Top' },
    { type: 'RightCenter', text: 'Right Center' },
    { type: 'RightBottom', text: 'Right Bottom' },
];

//Collection of effects for tooltip
export let EffectValue: { [key: string]: Object }[] = [
    { type: 'FadeIn', text: 'Fade In' },
    { type: 'FadeOut', text: 'Fade Out' },
    { type: 'FadeZoomIn', text: 'Fade Zoom In' },
    { type: 'FadeZoomOut', text: 'Fade Zoom Out' },
    { type: 'FlipXDownIn', text: 'FlipX Down In' },
    { type: 'FlipXDownOut', text: 'FlipX Down Out' },
    { type: 'FlipXUpIn', text: 'FlipX Up In' },
    { type: 'FlipXUpOut', text: 'FlipX Up Out' },
    { type: 'FlipYLeftIn', text: 'FlipY Left In' },
    { type: 'FlipYLeftOut', text: 'FlipY Left Out' },
    { type: 'FlipYRightIn', text: 'FlipY Right In' },
    { type: 'FlipYRightOut', text: 'FlipY Right Out' },
    { type: 'ZoomIn', text: 'Zoom In' },
    { type: 'ZoomOut', text: 'Zoom Out' },
    { type: 'None', text: 'None' },
];

let diagramInstance: DiagramComponent;
let modeDropdown: DropDownListComponent;
let positionDropdown: DropDownListComponent;
let contentDropdown: DropDownListComponent;
let effectDropdown: DropDownListComponent;
//Initialize Diagram Nodes
let nodes: NodeModel[] = [
    {
        id: 'node1', width: 60, height: 60, offsetX: 35, offsetY: 120,
        annotations: [{ content: 'Customer query', offset: { x: 0.5, y: 1 }, margin: { top: 15 } }],
        tooltip: { content: 'Queries from the customer' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
    },
    {
        id: 'node2', width: 75, height: 70, offsetX: 140, offsetY: 120,
        annotations: [{ content: 'Enough details?', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Whether the provided information is enough?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
    },
    {
        id: 'node3', width: 60, height: 50, offsetX: 270, offsetY: 120,
        annotations: [{ content: 'Analyse', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Analysing the query' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } },
    },
    {
        id: 'node4', width: 75, height: 70, offsetX: 370, offsetY: 120, shape: {
            type: 'Bpmn', shape: 'Gateway',
            gateway: { type: 'Exclusive' }
        },
        tooltip: { content: 'proceed to validate?' },
    },
    {
        id: 'node5', width: 75, height: 70, offsetX: 570, offsetY: 120,
        annotations: [{ content: 'Validate', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Whether the reported/requested bug/feature is valid?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
    },
    {
        id: 'node6', width: 60, height: 60, offsetX: 720, offsetY: 120,
        tooltip: { content: 'Send the invalid message to customer' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node7', width: 60, height: 50, offsetX: 140, offsetY: 280,
        annotations: [{ content: 'Request', offset: { x: 0.50, y: 0.50 }, margin: { top: 5 } }],
        tooltip: { content: 'Requesting for more information' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Send' } } }
    },
    {
        id: 'node8', width: 60, height: 60, offsetX: 370, offsetY: 280,
        tooltip: { content: 'Share the User Guide/Knowledge Base link' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
    },
    {
        id: 'node9', width: 70, height: 50, offsetX: 570, offsetY: 280,
        annotations: [{ content: 'Log bug/feature', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Log the bug/feature' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } }
    },
    {
        id: 'node10', width: 75, height: 55, offsetX: 390, offsetY: 430,
        annotations: [{ content: 'Implement', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Fix the bug/Add the feature' },
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'SubProcess', subProcess: {
                    collapsed: false,
                    events: [{ event: 'Intermediate', trigger: 'Timer', offset: { x: 0.5, y: 1 }, width: 25, height: 25 }]
                }
            }
        }
    },
    {
        id: 'node12', width: 60, height: 60, offsetX: 265, offsetY: 430, tooltip: { content: 'Provide the solution' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node13', width: 60, height: 60, offsetX: 720, offsetY: 430, tooltip: { content: 'Share the task details' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node14', width: 60, height: 60, offsetX: 570, offsetY: 430, shape: {
            type: 'Bpmn', shape: 'Gateway',
            gateway: { type: 'Parallel' }
        },
        tooltip: { content: 'can log?' },
    },
];

//Initialize Diagram Connectors
let connectors: ConnectorModel[] = [
    { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
    { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
    { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
    {
        id: 'connector4', sourceID: 'node4', targetID: 'node5',
        annotations: [{ content: 'Feature/Bug', offset: 0.5, style: { fill: 'white', textWrapping: 'Wrap' } }]
    },
    {
        id: 'connector5', sourceID: 'node5', targetID: 'node6',
        annotations: [{ content: 'Invalid', offset: 0.5, style: { fill: 'white' } }]
    },
    { id: 'connector6', sourceID: 'node2', targetID: 'node7' },
    {
        id: 'connector7', sourceID: 'node4', targetID: 'node8',
        annotations: [{ content: 'How to?', offset: 0.5, style: { fill: 'white' } }]
    },
    { id: 'connector8', sourceID: 'node5', targetID: 'node9' },
    { id: 'connector9', sourceID: 'node14', targetID: 'node13' },
    {
        id: 'connector10', sourceID: 'node7', targetID: 'node3', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 100, direction: 'Right' }, { type: 'Orthogonal', length: 100, direction: 'Top' }]
    },
    { id: 'connector11', sourceID: 'node14', targetID: 'node10' },
    { id: 'connector12', sourceID: 'node10', targetID: 'node12' },
    { id: 'connector13', sourceID: 'node9', targetID: 'node14' },
];
export class Tooltip extends SampleBase<{}, {}> {
    private fields: object = { text: 'text', value: 'type' };
    rendereComplete() {
        diagramInstance.fitToPage({ mode: 'Width' });
    }
    render() {
        return (
            <div className='control-pane diagram-tooltip'>
                <div className='col-lg-8 control-section'>
                    <style>{SAMPLE_CSS}</style>
                    <div id="tooltipDiagramSection"  style={{ width: "100%" }}>
                        <DiagramComponent
                            id='diagram'
                            ref={diagram => (diagramInstance = diagram)}
                            width={'100%'}
                            height={'550px'}
                            nodes={nodes}
                            connectors={connectors}
                            snapSettings={{ constraints: SnapConstraints.None }}
                            getConnectorDefaults={getConnectorDefaults}
                            getNodeDefaults={getNodeDefaults}
                            tooltip={{ content: getContent(), position: 'TopLeft', relativeMode: 'Object', animation: { open: { effect: 'FadeZoomIn', delay: 0 }, close: { effect: 'FadeZoomOut', delay: 0 } } }}
                        >
                            <Inject services={[BpmnDiagrams]} />
                        </DiagramComponent>
                    </div>
                </div>
                <div id='tooltipPropertySection' className='col-lg-4 property-section'>
                    <div className='property-panel-header' style={{ marginLeft: '0px' }}>Properties</div>
                    <table id='diagramTooltipPropertyPanel' title='Properties'>
                      <tbody>
                        <tr style={{ paddingTop: "10px"}}>
                            <td>
                                <div>
                                    Relative Mode
                                </div>
                            </td>
                            <td>
                                <div style={{ paddingLeft: "15px",width:'70%' }}>
                                    <DropDownListComponent
                                        id='mode'
                                        ref={dropdown => (modeDropdown = dropdown)}
                                        dataSource={modeValue}
                                        fields={this.fields}
                                        placeholder='select a mode value'
                                        popupWidth='150'
                                        width='85%'
                                        index={0}
                                        change={(args: any) => {
                                            if (args.value === 'Mouse') {
                                                diagramInstance.tooltip.relativeMode = 'Mouse';
                                            } else {
                                                diagramInstance.tooltip.relativeMode = 'Object';
                                            }
                                            diagramInstance.dataBind();
                                        }}
                                    >
                                    </DropDownListComponent>
                                </div>
                            </td>
                        </tr>
                        <tr style={{ paddingTop: "10px"}}>
                            <td>
                                <div>
                                    Position
                               </div>
                            </td>
                            <td>
                                <div style={{ paddingLeft: "15px",width:'70%' }}>
                                    <DropDownListComponent
                                        id='position'
                                        ref={dropdown => (positionDropdown = dropdown)}
                                        dataSource={PositionValue}
                                        fields={this.fields}
                                        index={0}
                                        placeholder='select a position'
                                        popupWidth='150'
                                        width='85%'
                                        change={(args: any) => {
                                            let nodes: NodeModel[] = diagramInstance.nodes;
                                            for (let i: number = 0; i < nodes.length; i++) {
                                                if (nodes[i].tooltip) {
                                                    nodes[i].tooltip.position = args.value;
                                                    diagramInstance.dataBind();
                                                }
                                            }
                                        }}
                                    >
                                    </DropDownListComponent>
                                </div>
                            </td>
                        </tr>
                        <tr style={{ paddingTop: "10px"}}>
                            <td>
                                <div>
                                    Animation
                                </div>
                            </td>
                            <td style={{ paddingLeft: "15px" }}>
                                <NumericTextBoxComponent
                                    id='duration'
                                    value={100}
                                    min={100}
                                    max={2000}
                                    step={100}
                                     width={'85%'}
                                    change={(args: any) => {
                                        diagramInstance.tooltip.animation.close.duration = args.value;
                                        diagramInstance.tooltip.animation.open.duration = args.value;
                                        diagramInstance.dataBind();
                                    }}
                                ></NumericTextBoxComponent>
                            </td>
                        </tr>
                        <tr style={{ paddingTop: "10px"}}>
                            <td>
                                <div>
                                    Effect
                               </div>
                            </td>
                            <td>
                                <div style={{ paddingLeft: "15px" }}>
                                    <DropDownListComponent
                                        id='effect'
                                        ref={dropdown => (effectDropdown = dropdown)}
                                        dataSource={EffectValue}
                                        fields={this.fields}
                                        placeholder='select a effect'
                                        popupWidth='150'
                                        width='85%'
                                        index={0}
                                        change={(args: any) => {
                                            diagramInstance.tooltip.animation.open.effect = args.value;
                                            diagramInstance.tooltip.animation.close.effect = args.value;
                                            diagramInstance.dataBind();
                                        }}
                                    >
                                    </DropDownListComponent>
                                </div>
                            </td>
                        </tr >
                        <tr style={{ paddingTop: "20px"}}>
                            <td>Sticky Mode</td>
                            <td >
                                <CheckBoxComponent
                                    checked={false}
                                    change={(args) => {
                                        for (var j = 0; j < diagramInstance.nodes.length; j++) {
                                            if (args.checked) {
                                                (diagramInstance.tooltipObject as TooltipModel).isSticky = true;
                                                diagramInstance.nodes[j].tooltip.isSticky = true;
                                            } else {
                                                (diagramInstance.tooltipObject as TooltipModel).isSticky = false;
                                                diagramInstance.nodes[j].tooltip.isSticky = false;
                                            }
                                            diagramInstance.dataBind();
                                        }
                                    }}
                                ></CheckBoxComponent>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    
                </div>
                <div id='action-description'>
                    <p>
                    This sample demonstrates how to add the extra information to the nodes and connectors and how to show the information through
                    the common graphical user interface element.
                  </p>
                </div>
                <div id='description'>
                    <p>
                    Using diagram’s <code>tooltip</code> we can define the tooltip for the diagram nodes as well as connector. We can control the <code>animation</code>,
                    <code>position</code>, <code>effects</code> of the tooltip using <code>tooltip</code> property of the diagram. Also, we can define the custom tooltip
                    as either text or HTML element using <code>content</code> property of the tooltip. We can control the different tooltip settings
                    to each connector and node.
                   </p>
                    <br />
                </div>
            </div>
        );
    }
}
//set default value for connectors.
function getConnectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.style = { strokeWidth: 2 };
    return connector;
}
//set default value for nodes.
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.offsetX += 0.5;
    obj.offsetY += 0.5;
    obj.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
    obj.style = { strokeWidth:2 };
    return obj;
}
//set content for diagram tooltip
function getContent(): HTMLElement {
    let tooltipContent: HTMLElement = document.createElement('div');
    tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;white-space: nowrap;"> <span style="margin: 10px;"> Tooltip !!! </span> </div>';
    return tooltipContent;
}

