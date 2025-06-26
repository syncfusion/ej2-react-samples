// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building diagrams.
import * as React from "react";
import {
    DiagramComponent,
    NodeModel,
    Node,
    ISelectionChangeEventArgs,
    SymbolPaletteComponent,
    SelectorConstraints,
    UserHandleModel,
    UserHandleEventsArgs,
    BasicShapes,
} from '@syncfusion/ej2-react-diagrams';
import { updateSampleSection } from "../common/sample-base";
import "./font-icons.css"; // Importing CSS for font icons
import { ItemDirective, ItemsDirective, ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ColorPickerComponent, NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

// Holds instances of DiagramComponent, ToolbarComponent, and HTMLElements for palette icons and spaces.
let diagramInstance: DiagramComponent;
let toolbarEditor: ToolbarComponent;
let paletteIconInstance: HTMLElement;
let paletteSpaceInstance: HTMLElement;

// Creates a basic shape node for the diagram.
const createNode = (id: string, offsetX: number, offsetY: number, width: number, height: number, shape: BasicShapes,
    annotations: any[] = [], cornerRadius: number = 0): NodeModel => (
    {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        width: width,
        height: height,
        shape: { type: "Basic", shape, cornerRadius: cornerRadius },
        annotations: annotations,
    });

// Creates a group node for organizing multiple nodes.
const createGroupNode = (id: string, children: any[], padding: any, annotations: any[]): NodeModel => (
    {
        id: id,
        children: children,
        padding: padding,
        annotations: annotations
    }
)

// Initializes nodes representing key elements in a diagram.
let nodes: NodeModel[] = [
    createNode('Diamond', 350, 250, 100, 100, 'Diamond', [{ content: 'Decision' }]),
    createNode('ellipse', 150, 250, 100, 60, 'Ellipse', [{ content: 'Start/Stop' }]),
    createNode('rectangle', 150, 400, 100, 60, 'Rectangle', [{ content: 'Process' }]),
    createNode('node1', 150, 100, 100, 55, 'Rectangle'),
    createNode('node2', 350, 100, 90, 55, 'Rectangle', [], 5),
    createGroupNode('group', ['node1', 'node2'], { left: 10, right: 10, top: 10, bottom: 10 }, [{ content: 'Group 1' }])
];

// Creates basic shapes for the symbol palette.
const createBasicShape = (id: string, shape: BasicShapes): NodeModel => ({
    id: id,
    shape: { type: "Basic", shape },
    style: { strokeWidth: 2 }
});

// Initializes basic shapes for use in the symbol palette.
let basicShapes: NodeModel[] = [
    createBasicShape('Rectangle', 'Rectangle'),
    createBasicShape('Ellipse', 'Ellipse'),
    createBasicShape('Hexagon', 'Hexagon'),
    createBasicShape('Parallelogram', 'Parallelogram'),
    createBasicShape('Triangle', 'Triangle'),
    createBasicShape('Plus', 'Plus'),
    createBasicShape('Star', 'Star'),
    createBasicShape('Pentagon', 'Pentagon'),
    createBasicShape('Heptagon', 'Heptagon'),
    createBasicShape('Octagon', 'Octagon'),
    createBasicShape('Trapezoid', 'Trapezoid'),
    createBasicShape('Decagon', 'Decagon'),
    createBasicShape('RightTriangle', 'RightTriangle'),
    createBasicShape('Cylinder', 'Cylinder'),
    createBasicShape('Diamond', 'Diamond')
];

// Initializes user handles for interaction with diagram elements.
let handles: UserHandleModel[] = [
    {
        name: 'Clone',
        pathData:
            'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
        tooltip: { content: 'Clone' },
        visible: true,
        offset: 1,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Delete',
        pathData:
            'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
        tooltip: { content: 'Delete' },
        visible: true,
        offset: 0,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Draw',
        pathData:
            'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
        tooltip: { content: 'Draw' },
        visible: true,
        offset: 0.5,
        side: 'Right',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
];

let drawingNode: any;

// CSS styles for the sample application's layout and appearance.
const sample_css = `

/* For toolbar size */
.diagram-grouping .db-toolbar-container {
    width: 100% ;
   height: 44px;
}

/* Palette Container */
.diagram-grouping .db-palette-parent {
    background-color:#fafafa;
    width: 255px!important;
    float: left;
    height:calc(100% - 28px);
}

/* Diagram Container */
.diagram-grouping .db-diagram-container {
    width:calc(100% - 260px);
    height: 100%;
    float: right;
}

/* For making toolbar selection */
.e-toolbar .e-toolbar-items .e-toolbar-item.tb-item-selected .e-tbar-btn.e-btn,
.e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.tb-item-selected {
    background: #5f6161;
}

/* Toolbar icons color */
.e-toolbar .e-toolbar-items .e-toolbar-item.tb-item-selected .e-tbar-btn .e-icons.e-btn-icon,
.e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.tb-item-selected .e-btn-icon {
    color: #ffffff;
}`;

// Define the function GroupandOrder
function GroupandOrder() {
    React.useEffect(() => {
        // Call functions to update sample section and render completion
        updateSampleSection();
        initializeMobileEvents();
    }, [])

    // Variables for managing diagram drawing state and font properties.
    let fontColor: any;
    let fontFamily: any;
    let fontSize: any;
    let fontType = [
        { type: 'Arial', text: 'Arial' },
        { type: 'Aharoni', text: 'Aharoni' },
        { type: 'Bell MT', text: 'Bell MT' },
        { type: 'Fantasy', text: 'Fantasy' },
        { type: 'Segoe UI', text: 'Segoe UI' },
        { type: 'Times New Roman', text: 'Times New Roman' },
        { type: 'Verdana', text: 'Verdana' },
    ];
    let fields = { value: 'type', text: 'text' };
    let isMobile: boolean;

    // Initialize toolbar items with icons, tooltips, and other properties.
    let toolbarItems: any = [
        { prefixIcon: 'e-icons e-group-1', tooltipText: 'Group', disabled: true, id: 'Group' },
        { prefixIcon: 'e-icons e-ungroup-1', tooltipText: 'UnGroup', disabled: true, id: 'UnGroup' },
        { type: 'Separator' },
        { prefixIcon: 'e-icons e-bring-forward', tooltipText: 'Bring Forward', disabled: true, id: 'BringForward' },
        { prefixIcon: 'e-icons e-bring-to-front', tooltipText: 'Bring To Front', disabled: true, id: 'BringToFront' },
        { prefixIcon: 'e-icons e-send-backward', tooltipText: 'Send Backward', disabled: true, id: 'SendBackward' },
        { prefixIcon: 'e-icons e-send-to-back', tooltipText: 'Send To Back', disabled: true, id: 'SendToBack' },
        { type: 'Separator' },
        { id: 'FontStyle', type: 'Input', align: 'Left', tooltipText: 'Font Style', disabled: true, template: renderFontFamilyDropdown },
        { id: 'FontSize', tooltipText: 'Font Size', align: 'Left', disabled: true, template: renderFontSizeNumericBox },
        { prefixIcon: 'e-icons e-bold', tooltipText: 'Bold', cssClass: 'tb-item-start', disabled: true, id: 'Bold' },
        { prefixIcon: 'e-icons e-italic', tooltipText: 'Italic', cssClass: 'tb-item-middle', disabled: true, id: 'Italic' },
        { prefixIcon: 'e-icons e-underline', tooltipText: 'Underline', cssClass: 'tb-item-end', disabled: true, id: 'Underline' },
        { id: 'FontColor', tooltipText: 'Font Color', align: 'Left', disabled: true, template: renderFontColorPicker }
    ];

    // Checks and applies mobile-specific behaviors.
    function initializeMobileEvents(): void {
        // Check if device is mobile
        isMobile = window.matchMedia('(max-width:550px)').matches;
        if (isMobile && paletteIconInstance) {
            paletteIconInstance.addEventListener('click', openPalette, false);
        }
    }

    // Toggles the palette's visibility on mobile devices.
    function openPalette(): void {
        isMobile = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            if (!paletteSpaceInstance.classList.contains('sb-mobile-palette-open')) {
                // Open palette
                paletteSpaceInstance.classList.add('sb-mobile-palette-open');
            } else {
                // Close palette
                paletteSpaceInstance.classList.remove('sb-mobile-palette-open');
            }
        }
    }

    // Executes actions based on the toolbar item clicked.
    function handleToolbarClick(args: any) {
        // Switch based on the tooltip text of the item
        switch (args.item.tooltipText) {
            // Group selected items
            case 'Group':
                diagramInstance.group();
                updateToolbarItems(['Group'], true);
                updateToolbarItems(['UnGroup'], false);
                break;

            // Ungroup selected items
            case 'UnGroup':
                diagramInstance.unGroup();
                break;

            // Bring selected item(s) forward
            case 'Bring Forward':
                diagramInstance.moveForward();
                break;

            // Bring selected item(s) to front
            case 'Bring To Front':
                diagramInstance.bringToFront();
                break;

            // Send selected item(s) backward
            case 'Send Backward':
                diagramInstance.sendBackward();
                break;

            // Send selected item(s) to back
            case 'Send To Back':
                diagramInstance.sendToBack();
                break;

            // Toggle bold style for selected annotation(s)
            case 'Bold':
                updateAnnotationValue('bold', args.value, null);
                break;

            // Toggle italic style for selected annotation(s)
            case 'Italic':
                updateAnnotationValue('italic', args.value, null);
                break;

            // Toggle underline style for selected annotation(s)
            case 'Underline':
                updateAnnotationValue('underline', args.value, null);
                break;
        }
        diagramInstance.dataBind();
    }

    // Updates annotation style attributes based on the provided value.
    function updateAnnotationValue(value: any, fontSize?: any, fontFamily?: any) {
        // Iterate through selected nodes in the diagram
        for (let i: number = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
            let node = diagramInstance.selectedItems.nodes[i];

            // Iterate through annotations of each node
            for (let j: number = 0; j < node.annotations.length; j++) {
                let annotationStyle: any = node.annotations[j].style;

                // Update style attributes based on the provided value
                if (value === 'fontsize') {
                    annotationStyle.fontSize = fontSize;
                } else if (value === 'fontfamily') {
                    annotationStyle.fontFamily = fontFamily.toString();
                } else if (value === 'bold') {
                    annotationStyle.bold = !annotationStyle.bold;
                } else if (value === 'italic') {
                    annotationStyle.italic = !annotationStyle.italic;
                } else if (value === 'underline') {
                    annotationStyle.textDecoration = annotationStyle.textDecoration === 'None' ? 'Underline' : 'None';
                }
            }
        }

        diagramInstance.dataBind();
    }

    // Handles custom user interactions with diagram elements.
    function onUserHandleMouseDown(args: UserHandleEventsArgs) {
        switch (args.element.name) {
            case 'Delete':
                // Remove selected elements
                diagramInstance.remove();
                break;
            case 'Clone':
                // Clone selected elements
                diagramInstance.paste(diagramInstance.selectedItems.selectedObjects);
                break;
            case 'Draw':
                // Sets drawing mode and source ID for drawing elements
                const drawingObject = diagramInstance.drawingObject;
                drawingObject.shape = {};
                (drawingObject as any).type = (drawingObject as any).type || 'Orthogonal';
                (drawingObject as any).sourceID = drawingNode.id;
                diagramInstance.dataBind();
                break;
        }
    }

    // Updates toolbar items based on diagram selection changes.
    function selectionChange(args: ISelectionChangeEventArgs) {
        if (args.state === 'Changed') {
            let selectedItems: any = diagramInstance.selectedItems.nodes;
            selectedItems = selectedItems.concat(diagramInstance.selectedItems.connectors);

            // Define toolbar item IDs for easy management
            const toolbarItemIds = ['Group', 'UnGroup', 'BringForward', 'BringToFront', 'SendBackward', 'SendToBack', 'FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];

            // Disabling toolbar items when no items are selected
            if (selectedItems.length === 0) {
                updateToolbarItems(toolbarItemIds, true);
            }
            // Handling single item selection
            else if (selectedItems.length === 1) {
                enableToolbarItems();
                disableToolbarItemsForMultiSelection(selectedItems);

                // Enabling or disabling specific toolbar items based on selection type
                const isGroup = selectedItems[0].children !== undefined && selectedItems[0].children.length > 0;
                updateToolbarItems(['UnGroup'], !isGroup);
            }
            // Handling multiple items selection
            else if (selectedItems.length > 1) {
                enableToolbarItems();
                updateToolbarItems(['Group'], false);
                updateToolbarItems(['UnGroup'], true);
                disableToolbarItemsForMultiSelection(selectedItems);
            }

            // Handling specific scenarios when nodes are selected
            if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
                diagramInstance.selectedItems = {
                    constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
                    userHandles: handles,
                };

                // Manipulating selected nodes and their properties
                if (diagramInstance.selectedItems.nodes.length > 0) {
                    drawingNode = diagramInstance.selectedItems.nodes[diagramInstance.selectedItems.nodes.length - 1];
                }
            } else {
                // Resetting selection constraints when other types are selected
                diagramInstance.selectedItems = {
                    constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle,
                };
            }
        }
    }

    // Enable or disable specific toolbar items
    function updateToolbarItems(itemIds: string[], disabled: boolean) {
        itemIds.forEach(itemId => {
            const item = toolbarEditor.items.find(item => item.id === itemId);
            if (item) {
                item.disabled = disabled;
            }
        });
    }

    // Enables specific toolbar items.
    function enableToolbarItems() {
        updateToolbarItems(['BringForward', 'BringToFront', 'SendBackward', 'SendToBack'], false);
    }

    // Disables toolbar items for multi-selected elements without annotations.
    function disableToolbarItemsForMultiSelection(selectedItems: any) {
        const annotationRelatedItems = ['FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];

        // Iterate through selected items
        for (let i: number = 0; i < selectedItems.length; i++) {
            // Check if the selected item has annotations
            if (selectedItems[i].annotations[0] !== undefined) {
                // Enable toolbar items for annotation-related functionalities
                updateToolbarItems(annotationRelatedItems, false);
            } else {
                // Disable toolbar items for annotation-related functionalities
                updateToolbarItems(annotationRelatedItems, true);
            }
        }
    }

    // Renders a dropdown for font family selection.
    function renderFontFamilyDropdown() {
        return (
            <div className="col-xs-4 column-style" style={{ marginLeft: '4px' }}>
                <DropDownListComponent
                    id="fontfamily"
                    popupWidth={150}
                    width={'150px'}
                    fields={fields}
                    placeholder={'select a font type'}
                    index={0}
                    dataSource={fontType}
                    change={(args) => {
                        updateAnnotationValue('fontfamily', null, args.value.toString());
                    }}
                    ref={(fontfamily) => (fontFamily = fontfamily)}
                />
            </div>
        );
    }

    // Renders a numeric textbox for font size selection.
    function renderFontSizeNumericBox() {
        return (
            <div className="col-xs-4 column-style">
                <NumericTextBoxComponent
                    id="fontSize"
                    width={'110px'}
                    value={12}
                    min={1}
                    max={30}
                    step={2}
                    format="##.##"
                    change={(args) => {
                        updateAnnotationValue('fontsize', args.value);
                    }}
                    ref={(fontsize) => (fontSize = fontsize)}
                />
            </div>
        );
    }

    // Renders a color picker for font color selection.
    function renderFontColorPicker() {
        return (
            <div className="col-xs-4 column-style">
                <ColorPickerComponent
                    id="fontcolor"
                    value="#000"
                    mode="Palette"
                    change={(arg) => {
                        diagramInstance.selectedItems.nodes.forEach(node => {
                            node.annotations.forEach(annotation => {
                                annotation.style.color = arg.currentValue.rgba;
                            });
                        });
                        diagramInstance.dataBind();
                    }}
                    ref={(fontcolor) => (fontColor = fontcolor)}
                />
            </div>
        );
    }

    return (
        <div className="control-pane diagram-grouping">
            <style>{sample_css}</style>
            <div className="control-section">
                <div style={{ width: '100%' }}>
                    <div className="db-toolbar-container">
                        {/* Renders toolbar items */}
                        <ToolbarComponent
                            ref={(toolbar) => (toolbarEditor = toolbar)}
                            id="toolbar_diagram"
                            clicked={handleToolbarClick}
                            items={toolbarItems} >
                        </ToolbarComponent>
                    </div>

                    {/* Renders mobile palette bar */}
                    <div className="sb-mobile-palette-bar">
                        <div
                            id="paletteIcon"
                            ref={paletteIcon => (paletteIconInstance = paletteIcon)}
                            style={{ float: 'right' }}
                            className="e-ddb-icons1 e-toggle-palette"
                        ></div>
                    </div>

                    {/* Initializes and renders a SymbolPalette control */}
                    <div id="paletteSpace"
                        ref={paletteSpace => (paletteSpaceInstance = paletteSpace)}
                        className="db-palette-parent">
                        <SymbolPaletteComponent
                            id="symbolpalette"
                            expandMode="Multiple"
                            // Initialize a default shape in symbol palettes
                            palettes={[
                                {
                                    id: 'Basic',
                                    expanded: true,
                                    symbols: basicShapes,
                                    title: 'Basic Shapes',
                                },
                            ]}
                            width={'100%'}
                            height={'500px'}
                            symbolHeight={50}
                            symbolWidth={50}
                            symbolMargin={{ left: 5, right: 5, top: 5, bottom: 10 }}
                        />
                    </div>

                    {/* Initializes and renders diagram control */}
                    <div id="diagram-space" className="db-diagram-container">
                        <DiagramComponent
                            id="diagram"
                            ref={(diagram) => (diagramInstance = diagram)}
                            width={'100%'}
                            height={'500px'}
                            selectedItems={{ constraints: SelectorConstraints.UserHandle, userHandles: handles }}
                            rulerSettings={{ showRulers: true }}
                            onUserHandleMouseDown={(args: UserHandleEventsArgs) => { onUserHandleMouseDown(args); }}
                            selectionChange={(args: ISelectionChangeEventArgs) => { selectionChange(args); }}
                            drawingObject={{ type: 'Orthogonal' }}
                            nodes={nodes}
                        />
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates how to group, ungroup, and order commands with the diagram.
                </p>
            </div>
            <div id="description">
                <p>
                    The <code>group</code> method groups diagram nodes and connectors into a single entity.
                </p>
                <p>
                    The <code>unGroup</code> method ungroups nodes and/or connectors that have been previously grouped together using the group method.
                </p>
                <p>
                    The <code>moveForward</code> and <code>bringToFront</code> methods adjust the visual order of nodes or connectors within a diagram. This method takes a single parameter that specifies the node or connector that you want to bring forward in the order.
                </p>
                <p>
                    The <code>sendBackward</code> and <code>sendToBack</code> method allows you to send a selected object to the back of the z-order (the order in which objects are stacked on top of one another).
                </p>
                <p>
                    In this sample, node annotation styles such as font family, font size, bold, italic, underline, and fontcolor can be customized.
                </p>
                <br />
            </div>
        </div>
    );
}
export default GroupandOrder;
