import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Diagram,
    ConnectorEditing,
    DiagramComponent,
    Inject,
    NodeModel,
    ConnectorModel,
    FlowShapeModel,
    FlowchartLayout,
    DataBinding,
    DiagramTools,
} from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DataManager } from '@syncfusion/ej2-data';
Diagram.Inject(ConnectorEditing);


let diagramInstance: DiagramComponent;
const SAMPLE_CSS = `
  /* Container for diagram and property panel */
    .diagram-flowchartLayout .control-section {
        width: 75%;
        float: left; /* Keep the diagram section on the left */
        border-right: 1px solid #D5D5D5;
    }
    .diagram-flowchartLayout .property-panel-header {
        font-size: larger;
        margin-left: 10px;
    }
    .diagram-flowchartLayout .input-element {
        margin-left: 10px;
        width: 50%;
    }

    /* Property panel style */
    .diagram-flowchartLayout .flow-property-section {
        width: 24%; /* Adjusted to fill the remaining space */
        float: right; /* Ensure the property panel is on the right */
        padding: 10px;
    }

    /* Align labels and inputs within the property panel */
    .diagram-flowchartLayout .row {
        margin-left: 0;
        margin-right: 0;
        padding-top: 8px;
    }

    .diagram-flowchartLayout .property-panel-content .row {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .diagram-flowchartLayout .property-panel-content label {
        flex: 1;
        font-weight: normal;
        margin-left: 10px;
    }

    .diagram-flowchartLayout .property-panel-content input {
        flex: 2;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    } 
`;

//Initializes the data source for the layout
const flowchartData = [
    { id: "A", name: "Start", shape: "Terminator", color: "#90EE90", parentId: null as any, stroke: "#333", strokeWidth: 1 },
    { id: "B", name: "Open the browser and go to Amazon site", shape: "Rectangle", color: "#1759B7", parentId: ["A"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "C", name: "Already a customer?", shape: "Decision", color: "#2F95D8", parentId: ["B"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "D", name: "Create an account", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "E", name: "Enter login information", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "F", name: "Search for the book in the search bar", shape: "Predefined Process", color: "#1759B7", parentId: ["E", "D"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "G", name: "Select the preferred book", shape: "Rectangle", color: "#1759B7", parentId: ["F"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "H", name: "Is the book new or used?", shape: "Rectangle", color: "#2F95D8", parentId: ["G"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "I", name: "Select the new book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "J", name: "Select the used book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "K", name: "Add to Cart & Proceed to Checkout", shape: "Rectangle", color: "#1759B7", parentId: ["I", "J"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "L", name: "Enter shipping and payment details", shape: "Rectangle", color: "#1759B7", parentId: ["K", "M"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "M", name: "Is the information correct?", shape: "Decision", color: "#2F95D8", parentId: ["L"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "N", name: "Review and place the order", shape: "Rectangle", color: "#1759B7", parentId: ["M"], label: ["True"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "O", name: "End", shape: "Terminator", color: "#8E44CC", parentId: ["N"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 }
];

export class FlowchartLayoutSample extends SampleBase<{}, {}> {
    // Method to fit diagramInstance to page width
    rendereComplete() {
        diagramInstance.fitToPage({ mode: 'Width' });
    }
    render() {
        return (
            <div className="diagram-flowchartLayout">
                <style>{SAMPLE_CSS}</style>
                <div className="control-section">
                    <div className="control-wrapper">
                        <div style={{ width: '100%', background: 'white', border: '1px solid #D5D5D5' }}>
                            <DiagramComponent
                                id="diagram"
                                ref={(diagram) => (diagramInstance = diagram)}
                                width={'100%'}
                                height={'700px'}
                                scrollSettings={{scrollLimit: 'Infinity', padding: { bottom: 50, right: 50 }}}
                                rulerSettings={{ showRulers: true }}
                                getNodeDefaults={getNodeDefaults}
                                getConnectorDefaults={getConnectorDefaults}
                                tool={DiagramTools.ZoomPan}
                                layout={{
                                    type: 'Flowchart',
                                    orientation: 'TopToBottom',
                                    flowchartLayoutSettings: {
                                        yesBranchDirection: 'LeftInFlow',
                                        noBranchDirection: 'RightInFlow',
                                        yesBranchValues: ['Yes', 'True'],
                                        noBranchValues: ['No', 'False']
                                    },
                                    verticalSpacing: 50,
                                    horizontalSpacing: 50
                                }}
                                dataSourceSettings={{
                                    id: 'id',
                                    parentId: 'parentId',
                                    dataSource: new DataManager(flowchartData)
                                }}
                            >
                                <Inject services={[FlowchartLayout, DataBinding]} />
                            </DiagramComponent>
                        </div>
                    </div>
                </div>
                <div className="flow-property-section">
                    <div className="property-panel-header" style={{ marginLeft: '10px' }}>Properties</div>
                    <div
                        className="row property-panel-content"
                        style={{ paddingTop: '10px' }}
                    >
                        <div className="row">
                            <label>Orientation</label>
                            <div className="input-element">
                                <DropDownListComponent
                                    id="orientation"
                                    index={0}
                                    change={orientationChange}
                                    dataSource={[{ text: 'Top to bottom', value: 'TopToBottom' }, { text: 'Left to right', value: 'LeftToRight' }]}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label>Yes branch direction</label>
                            <div className="input-element">
                                <DropDownListComponent
                                    id="yesBranchDirection"
                                    index={0}
                                    change={yesBranchDirectionChange}
                                    dataSource={[{ text: 'Left in flow', value: 'LeftInFlow' }, { text: 'Right in flow', value: 'RightInFlow' }, { text: 'Same as flow', value: 'SameAsFlow' }]}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label>No branch direction</label>
                            <div className="input-element">
                                <DropDownListComponent
                                    id="noBranchDirection"
                                    index={1}
                                    change={noBranchDirectionChange}
                                    dataSource={[{ text: 'Left in flow', value: 'LeftInFlow' }, { text: 'Right in flow', value: 'RightInFlow' }, { text: 'Same as flow', value: 'SameAsFlow' }]}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label>Horizontal spacing</label>
                            <div className="input-element">
                                <NumericTextBoxComponent
                                    id="horizontalSpacing"
                                    change={horizontalSpacingChange}
                                    min={20}
                                    max={120}
                                    value={50}
                                    format='###.##'
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label>Vertical spacing</label>
                            <div className="input-element">
                                <NumericTextBoxComponent
                                    id="verticalSpacing"
                                    change={verticalSpacingChange}
                                    min={30}
                                    max={120}
                                    value={50}
                                    format='###.##'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the flow chart layout algorithm that is used to automatically arrange the flow chart shapes.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample illustrates the flowchart layout algorithm that is used to automatically arrange the flow shapes.
                    </p>
                    <p>
                        This example shows how to generate a flowchart layout from an external data source. The spacing between
                        the objects
                        can also be customized in the chart. The
                        <code>horizontalSpacing</code> and
                        <code>verticalSpacing</code> properties of
                        <code>layout</code> can be used to customize the space between objects in a tree. The
                        <code>orientation</code> property of
                        <code>layout</code> can be used to change the orientation of the chart. The
                        <code>flowchartLayoutSettings</code> property of
                        <code>layout</code> can be used to configure the flow chart layout settings. The
                        <code>yesBranchDirection</code> and <code>noBranchDirection</code> properties of the flowchartLayoutSettings is used to define the flow direction of the yes and no branch connectors.
                    </p>

                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        The diagram component’s features are segregated into individual feature-wise modules. To generate diagrams from
                        an external
                        data source, inject
                        <code>DataBinding</code> module using
                        <code>Diagram.Inject(DataBinding)</code> method. To automatically arrange the objects in a flowchart layout
                        format, inject
                        <code>FlowchartLayout</code> module using
                        <code>Diagram.Inject(FlowchartLayout)</code> method.
                    </p>
                </div>
            </div>
        );
    }
}

function getNodeDefaults(node: NodeModel) {
    node.width = 150;
    node.height = 50;
    if ((node.shape as FlowShapeModel).shape === 'Decision') {
        node.width = 120;
        node.height = 100;
    }
    return node;
}

//Setting default connector values
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';
    if(connector.annotations && connector.annotations.length > 0){
        connector.annotations[0].style.fill = 'white';
        connector.annotations[0].style.color = 'black';
    }
    return connector;
}

function orientationChange(args: ChangeEventArgs) {
    let value: string = args.value as string;
    diagramInstance.layout.orientation = value === 'Top to bottom' ? 'TopToBottom' : 'LeftToRight';
    diagramInstance.dataBind();
}

function yesBranchDirectionChange(args: ChangeEventArgs) {
    let value: string = args.value as string;
    diagramInstance.layout.flowchartLayoutSettings.yesBranchDirection = value === 'Same as flow' ? 'SameAsFlow' : value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
    diagramInstance.doLayout();
}

function noBranchDirectionChange(args: ChangeEventArgs) {
    let value: string = args.value as string;
    diagramInstance.layout.flowchartLayoutSettings.noBranchDirection = value === 'Same as flow' ? 'SameAsFlow' : value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
    diagramInstance.doLayout();

}

function horizontalSpacingChange(args: ChangeEventArgs) {
    let value: number = args.value as number;
    diagramInstance.layout.horizontalSpacing = value;
    diagramInstance.dataBind();
}

function verticalSpacingChange(args: ChangeEventArgs) {
    let value: number = args.value as number;
    diagramInstance.layout.verticalSpacing = value;
    diagramInstance.dataBind();
}
