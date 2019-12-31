import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default-functionality';
import { ShapeGallery } from './shape-gallery';
import { GettingStartedNodes } from './getting-started-node';
import { Connectors } from './connectors';
import { GettingStartedAnnotation } from './getting-started-annotation';
import { Port } from './port';
import { SwimLane } from './swim-lane';
import { Events } from './diagram-events';
import { Tooltip } from './tooltip';
import { HistoryManager } from './history-manager';
import { FlowExecution } from './flow-execution';
import { HtmlNode } from './custom-shapes';
import { LineRoutingSample } from './line-routing';
import { BpmnEditor } from './bpmn-editor';
import { LogicCircuit } from './logic-circuit';
import { UmlActivityDiagram } from './uml-activity';
import { NetworkShapes } from './network-diagram';
import { UMLClassDiagram } from './Uml-class-diagram';
import { HierarchicalModel } from './hierarchical-model';
import { OrganizationModel } from './organization-model';
import { Radial } from './radial-tree';
import { MindMap } from './mind-map';
import { SymmetricLayout } from './symmetric-layout';
import { ComplexHierarchicalModel } from './complex-hierarchical-tree';
import { RTLTree } from './right-to-left-tree';
import { PertChart } from './pert-chart';
import { DrawingTools } from './drawing-tool';
import { KeyBoardInteraction } from './key-board-functions';
import { UserHandle } from './quick-commands';
import { SymbolPalette } from './symbol-palette';
import { Overview } from './overview';
import { Serialization } from './serialization';
import { PrintExport } from './print-export';
import { LocalData } from './local-data';
import { RemoteData } from './remote-data';
import { Crud } from './crud';
import { VennDiagram } from './venn-diagram';
import { Fishbone } from './fishbone-diagram';
export const diagramRoutes = (<div>
         <Route path='/:theme/diagram/default-functionality' component={Default}/>
         <Route path='/:theme/diagram/shape-gallery' component={ShapeGallery}/>
         <Route path='/:theme/diagram/getting-started-node' component={GettingStartedNodes}/>
         <Route path='/:theme/diagram/connectors' component={Connectors}/>
         <Route path='/:theme/diagram/getting-started-annotation' component={GettingStartedAnnotation}/>
         <Route path='/:theme/diagram/port' component={Port}/>
         <Route path='/:theme/diagram/swim-lane' component={SwimLane}/>
         <Route path='/:theme/diagram/diagram-events' component={Events}/>
         <Route path='/:theme/diagram/tooltip' component={Tooltip}/>
         <Route path='/:theme/diagram/history-manager' component={HistoryManager}/>
         <Route path='/:theme/diagram/flow-execution' component={FlowExecution}/>
         <Route path='/:theme/diagram/custom-shapes' component={HtmlNode}/>
         <Route path='/:theme/diagram/line-routing' component={LineRoutingSample}/>
         <Route path='/:theme/diagram/bpmn-editor' component={BpmnEditor}/>
         <Route path='/:theme/diagram/logic-circuit' component={LogicCircuit}/>
         <Route path='/:theme/diagram/uml-activity' component={UmlActivityDiagram}/>
         <Route path='/:theme/diagram/network-diagram' component={NetworkShapes}/>
         <Route path='/:theme/diagram/Uml-class-diagram' component={UMLClassDiagram}/>
         <Route path='/:theme/diagram/hierarchical-model' component={HierarchicalModel}/>
         <Route path='/:theme/diagram/organization-model' component={OrganizationModel}/>
         <Route path='/:theme/diagram/radial-tree' component={Radial}/>
         <Route path='/:theme/diagram/mind-map' component={MindMap}/>
         <Route path='/:theme/diagram/symmetric-layout' component={SymmetricLayout}/>
         <Route path='/:theme/diagram/complex-hierarchical-tree' component={ComplexHierarchicalModel}/>
         <Route path='/:theme/diagram/right-to-left-tree' component={RTLTree}/>
         <Route path='/:theme/diagram/pert-chart' component={PertChart}/>
         <Route path='/:theme/diagram/drawing-tool' component={DrawingTools}/>
         <Route path='/:theme/diagram/key-board-functions' component={KeyBoardInteraction}/>
         <Route path='/:theme/diagram/quick-commands' component={UserHandle}/>
         <Route path='/:theme/diagram/symbol-palette' component={SymbolPalette}/>
         <Route path='/:theme/diagram/overview' component={Overview}/>
         <Route path='/:theme/diagram/serialization' component={Serialization}/>
         <Route path='/:theme/diagram/print-export' component={PrintExport}/>
         <Route path='/:theme/diagram/local-data' component={LocalData}/>
         <Route path='/:theme/diagram/remote-data' component={RemoteData}/>
         <Route path='/:theme/diagram/crud' component={Crud}/>
         <Route path='/:theme/diagram/venn-diagram' component={VennDiagram}/>
         <Route path='/:theme/diagram/fishbone-diagram' component={Fishbone}/>

    </div>);
export const diagramCategory = { "default-functionality": { "name": "Default Functionalities", "category": "Getting Started" }, "shape-gallery": { "name": "Shapes", "category": "Getting Started" }, "getting-started-node": { "name": "Nodes", "category": "Getting Started" }, "connectors": { "name": "Connectors", "category": "Getting Started" }, "getting-started-annotation": { "name": "Annotations", "category": "Getting Started" }, "port": { "name": "Ports", "category": "Getting Started" }, "swim-lane": { "name": "SwimLane", "category": "Getting Started" }, "diagram-events": { "name": "Events", "category": "Getting Started" }, "tooltip": { "name": "Tooltip", "category": "Getting Started" }, "history-manager": { "name": "HistoryManager", "category": "Getting Started" }, "flow-execution": { "name": "Flow Execution", "category": "Getting Started" }, "custom-shapes": { "name": "Complex Shapes", "category": "Getting Started" }, "line-routing": { "name": "LineRouting", "category": "Getting Started" }, "bpmn-editor": { "name": "BPMN Editor", "category": "Use Case Diagram" }, "logic-circuit": { "name": "Logic circuit Diagram", "category": "Use Case Diagram" }, "uml-activity": { "name": "UML Activity Diagram", "category": "Use Case Diagram" }, "network-diagram": { "name": "Network Diagram", "category": "Use Case Diagram" }, "Uml-class-diagram": { "name": "UML Class Diagram", "category": "Use Case Diagram" }, "hierarchical-model": { "name": "Hierarchical Tree", "category": "Automatic Layouts" }, "organization-model": { "name": "Organization Chart", "category": "Automatic Layouts" }, "radial-tree": { "name": "Radial Tree", "category": "Automatic Layouts" }, "mind-map": { "name": "Mind Map", "category": "Automatic Layouts" }, "symmetric-layout": { "name": "Symmetric Layout", "category": "Automatic Layouts" }, "complex-hierarchical-tree": { "name": "Complex Hierarchical Tree", "category": "Automatic Layouts" }, "right-to-left-tree": { "name": "RTL Tree", "category": "Automatic Layouts" }, "pert-chart": { "name": "PERT Chart", "category": "Automatic Layouts" }, "drawing-tool": { "name": "Drawing Tools", "category": "User Interaction" }, "key-board-functions": { "name": "Keyboard Interaction", "category": "User Interaction" }, "quick-commands": { "name": "User Handle", "category": "User Interaction" }, "symbol-palette": { "name": "Symbol Palette", "category": "User Interaction" }, "overview": { "name": "Overview Panel", "category": "User Interaction" }, "serialization": { "name": "Serialization", "category": "Print and Export" }, "print-export": { "name": "Print and Export", "category": "Print and Export" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "crud": { "name": "CRUD", "category": "Data Binding" }, "venn-diagram": { "name": "Venn Diagram", "category": "Static Diagram" }, "fishbone-diagram": { "name": "Fishbone Diagram", "category": "Static Diagram" }, "defaultSample": "diagram/default-functionality" };
