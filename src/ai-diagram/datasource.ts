import { ConnectorModel, FlowShapes, NodeModel } from "@syncfusion/ej2-react-diagrams";
import { ItemModel, MenuItemModel } from "@syncfusion/ej2-react-navigations";

export let data = [
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

  export let zoomMenuItems: ItemModel[] = [
    { text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Zoom to Fit' }, { text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' }, { text: 'Zoom to 200%' },
  ];
  // Menu items definition
  export let menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New', iconCss: 'e-icons e-circle-add' }, { separator: true }, { text: 'Open', iconCss: 'e-icons e-folder-open' },
        { text: 'Save', iconCss: 'e-icons e-save' },
        {
          text: 'Export', iconCss: 'e-export e-icons', items: [
            { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }
          ]
        },
        { text: 'Print', iconCss: 'e-print e-icons' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Undo', iconCss: 'e-icons e-undo' }, { text: 'Redo', iconCss: 'e-icons e-redo' }, { separator: true },
        { text: 'Cut', iconCss: 'e-cut e-icons' }, { text: 'Copy', iconCss: 'e-copy e-icons' },
        { text: 'Paste', iconCss: 'e-icons e-paste' }, { text: 'Delete', iconCss: 'e-trash e-icons' }, { separator: true },
        { text: 'Select All', iconCss: 'e-icons e-select-all' },
      ]
    },
    {
      text: 'View',
      items: [
        { text: 'Zoom In', iconCss: 'e-zoom-in e-icons' }, { text: 'Zoom Out', iconCss: 'e-zoom-out e-icons' }, { separator: true },
        { text: 'Fit To Screen', iconCss: 'e-icons e-zoom-to-fit' }, { separator: true },
        { text: 'Show Rulers', iconCss: 'e-icons e-check' },
        { text: 'Show Lines', iconCss: 'e-icons e-check' },
      ]
    },
    {
      text: 'Window',
      items: [
        { text: 'Show Toolbar', iconCss: 'e-icons e-check' },
        { text: 'Show Shortcuts', iconCss: '' },
      ]
    },
  ];

export const flowchartData = [
    { id: "A", name: "Start", shape: "Terminator", color: "#90EE90", parentId: null, stroke: "#333", strokeWidth: 1 },
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

export function toolbarItems() {
    let items: ItemModel[] = [
        { prefixIcon: 'e-icons e-circle-add', tooltipText: 'New Diagram' },
        { prefixIcon: 'e-icons e-folder-open', tooltipText: 'Open Diagram', },
        { prefixIcon: 'e-icons e-save', tooltipText: 'Save Diagram' },
        { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram' },
        { type: 'Input', tooltipText: 'Export Diagram', template: '<button id="exportBtn" style="width:100%;"></button>' },
        { type: 'Separator' },
        { prefixIcon: 'e-pan e-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start pan-item' },
        { prefixIcon: 'e-mouse-pointer e-icons', tooltipText: 'Select Tool', cssClass: 'tb-item-middle tb-item-selected' },
        { type: 'Separator' },
        {
            cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>', align: 'Right'
        },
    ];
    return items;
}
// To create flow shape
function getFlowShape(id: string, shapeType: FlowShapes): NodeModel {
    let flowshape: NodeModel = { id: id, shape: { type: 'Flow', shape: shapeType } };
    return flowshape;
}
//Initializes flow shapes for the symbol palette 
export const flowShapes: NodeModel[] = [
    getFlowShape('Terminator', 'Terminator'), getFlowShape('Process', 'Process'), getFlowShape('Decision', 'Decision'),
    getFlowShape('Document', 'Document'), getFlowShape('PreDefinedProcess', 'PreDefinedProcess'), getFlowShape('PaperTap', 'PaperTap'),
    getFlowShape('DirectData', 'DirectData'), getFlowShape('SequentialData', 'SequentialData'), getFlowShape('Sort', 'Sort'),
    getFlowShape('MultiDocument', 'MultiDocument'), getFlowShape('Collate', 'Collate'), getFlowShape('Or', 'Or'), getFlowShape('Extract', 'Extract'),
    getFlowShape('Merge', 'Merge'), getFlowShape('OffPageReference', 'OffPageReference'), getFlowShape('SequentialAccessStorage', 'SequentialAccessStorage'),
    getFlowShape('Annotation', 'Annotation'), getFlowShape('Annotation2', 'Annotation2'), getFlowShape('Data', 'Data'),
    getFlowShape('Card', 'Card'), getFlowShape('Delay', 'Delay'),
];
export const exportItems: ItemModel[] = [
    { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }
];

//Initializes connector symbols for the symbol palette 
export const connectorSymbols: ConnectorModel[] = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
        id: 'link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'Arrow' }
    },
    {
        id: 'Link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeDashArray: '5,2', strokeColor: '#757575' }
    },
    {
        id: 'Link4', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'None', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeDashArray: '5,2', strokeColor: '#757575' }
    },
];
