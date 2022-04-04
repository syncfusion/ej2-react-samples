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

/**
 * Tooltip sample
 */

const SAMPLE_CSS = `#tooltipDiagramSection .image-pattern-style {
    background-color: white;
    background-size: contain;
    background-repeat: no-repeat;
    height: 75px;
    width: calc((100% - 12px) / 3);
    cursor: pointer;
    border: 1px solid #D5D5D5;
    background-position: center;
    float: left;
}

#tooltipDiagramSection .image-pattern-style:hover {
    border-color: gray;
    border-width: 2px;
}

#tooltipDiagramSection .row {
    margin-left: 0px;
    margin-right: 0px;
}

#tooltipDiagramSection .row-header {
    font-size: 13px;
    font-weight: 500;
}

#tooltipDiagramSection .e-selected-style {
    border-color: #006CE6;
    border-width: 2px;
}

#tooltipDiagramSection .e-checkbox-wrapper .e-label {
    font-size: 12px;
}
.content-wrapper {
    border: 1px solid #D7D7D7;
}
#tooltipPropertySection .property-panel-header {
    margin-left: 10px;
}`;

// FontType Collection
export let modevalue: { [key: string]: Object }[] = [
    { type: 'Object', text: 'Object' },
    { type: 'Mouse', text: 'Mouse' },
];

// FontType Collection
export let PositionValue: { [key: string]: Object }[] = [
    { type: 'TopLeft', text: 'TopLeft' },
    { type: 'TopCenter', text: 'TopCenter' },
    { type: 'TopRight', text: 'TopRight' },
    { type: 'BottomLeft', text: 'BottomLeft' },
    { type: 'BottomCenter', text: 'BottomCenter' },
    { type: 'BottomRight', text: 'BottomRight' },
    { type: 'LeftTop', text: 'LeftTop' },
    { type: 'LeftCenter', text: 'LeftCenter' },
    { type: 'LeftBottom', text: 'LeftBottom' },
    { type: 'RightTop', text: 'RightTop' },
    { type: 'RightCenter', text: 'RightCenter' },
    { type: 'RightBottom', text: 'RightBottom' },
];

//FontType Collection
export let EffectValue: { [key: string]: Object }[] = [
    { type: 'FadeIn', text: 'FadeIn' },
    { type: 'FadeOut', text: 'FadeOut' },
    { type: 'FadeZoomIn', text: 'FadeZoomIn' },
    { type: 'FadeZoomOut', text: 'FadeZoomOut' },
    { type: 'FlipXDownIn', text: 'FlipXDownIn' },
    { type: 'FlipXDownOut', text: 'FlipXDownOut' },
    { type: 'FlipXUpIn', text: 'FlipXUpIn' },
    { type: 'FlipXUpOut', text: 'FlipXUpOut' },
    { type: 'FlipYLeftIn', text: 'FlipYLeftIn' },
    { type: 'FlipYLeftOut', text: 'FlipYLeftOut' },
    { type: 'FlipYRightIn', text: 'FlipYRightIn' },
    { type: 'FlipYRightOut', text: 'FlipYRightOut' },
    { type: 'ZoomIn', text: 'ZoomIn' },
    { type: 'ZoomOut', text: 'ZoomOut' },
    { type: 'None', text: 'None' },
];

export let contentValue: { [key: string]: Object }[] = [
    { type: 'HTML Element', text: 'HTML Element' },
    { type: 'Text', text: 'Text' },
];


let diagramInstance: DiagramComponent;
let modeDropdown: DropDownListComponent;
let positionDropdown: DropDownListComponent;
let contentDropdown: DropDownListComponent;
let effectDropdown: DropDownListComponent;

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
            <div className='control-pane'>
                <div className='col-lg-8 control-section'>
                    <style>{SAMPLE_CSS}</style>
                    <div id="tooltipDiagramSection" className="content-wrapper" style={{ width: "100%" }}>
                        <DiagramComponent
                            id='diagram'
                            ref={diagram => (diagramInstance = diagram)}
                            width={'100%'}
                            height={'645px'}
                            nodes={nodes}
                            connectors={connectors}
                            snapSettings={{ constraints: SnapConstraints.None }}
                            getConnectorDefaults={getConnectorDefaults}
                            getNodeDefaults={getNodeDefaults}
                            tooltip={{ content: getcontent(), position: 'TopLeft', relativeMode: 'Object', animation: { open: { effect: 'FadeZoomIn', delay: 0 }, close: { effect: 'FadeZoomOut', delay: 0 } } }}
                        >
                            <Inject services={[BpmnDiagrams]} />
                        </DiagramComponent>
                    </div>
                </div>
                <div id='tooltipPropertySection' className='col-lg-4 property-section'>
                    <div className='property-panel-header' style={{ marginLeft: '0px' }}>Properties</div>
                    <table id='property' title='Properties'>
                        <tr>
                            <td>
                                <div>
                                    Relative Mode
                                </div>
                            </td>
                            <td>
                                <div style={{ paddingLeft: "15px" }}>
                                    <DropDownListComponent
                                        id='mode'
                                        ref={dropdown => (modeDropdown = dropdown)}
                                        dataSource={modevalue}
                                        fields={this.fields}
                                        placeholder='select a mode value'
                                        popupWidth='150'
                                        width='100%'
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
                        <tr>
                            <td>
                                <div>
                                    Position
                               </div>
                            </td>
                            <td>
                                <div style={{ paddingLeft: "15px" }}>
                                    <DropDownListComponent
                                        id='position'
                                        ref={dropdown => (positionDropdown = dropdown)}
                                        dataSource={PositionValue}
                                        fields={this.fields}
                                        index={0}
                                        placeholder='select a position'
                                        popupWidth='150'
                                        width='100%'
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
                        <tr>
                            <td></td>
                            <td>
                                <div id='textContentDiv' className='row' style={{ display: 'none' }}>
                                    <div>
                                        <TextBoxComponent
                                            id='textContent'
                                            placeholder='Enter text content'
                                            floatLabelType='Auto'
                                            change={(args: any) => {
                                                diagramInstance.tooltip.content = args.value.toString();
                                                diagramInstance.dataBind();
                                            }}
                                        >
                                        </TextBoxComponent>
                                    </div>
                                </div>
                                <div id='htmlContentDiv' className='row' style={{ display: 'none' }}>
                                    <div>
                                        <TextBoxComponent
                                            id='htmlContent'
                                            placeholder='Enter html content'
                                            floatLabelType='Auto'
                                            change={(args: any) => {
                                                let tooltipContent: HTMLDivElement = document.createElement('div');
                                                let Description: any = args.value.toString();
                                                tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;corner-radius:2px;white-space: nowrap;"> <span style="margin: 10px;"> ' + Description + ' </span>';
                                                diagramInstance.tooltip.content = tooltipContent;
                                                diagramInstance.dataBind();
                                            }}
                                        >
                                        </TextBoxComponent>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    Animation
                                </div>
                            </td>
                            <td style={{ paddingLeft: "15px" }}>
                                <NumericTextBoxComponent
                                    id='duration'
                                    value={1000}
                                    min={1000}
                                    max={6000}
                                    step={100}
                                    change={(args: any) => {
                                        diagramInstance.tooltip.animation.close.duration = args.value;
                                        diagramInstance.tooltip.animation.open.duration = args.value;
                                        diagramInstance.dataBind();
                                    }}
                                ></NumericTextBoxComponent>
                            </td>
                        </tr>
                        <tr>
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
                                        width='100%'
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
                        </tr>
                    </table>
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
function getConnectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.style = { strokeWidth: 2 };
    return connector;
}
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.offsetX += 0.5;
    obj.offsetY += 0.5;
    obj.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
    obj.style = { strokeWidth:2 };
    return obj;
}
function getcontent(): HTMLElement {
    let tooltipContent: HTMLElement = document.createElement('div');
    tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;white-space: nowrap;"> <span style="margin: 10px;"> Tooltip !!! </span> </div>';
    return tooltipContent;
}

