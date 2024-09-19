import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  DiagramComponent,
  SymbolInfo,
  IDragEnterEventArgs,
  SymbolPaletteComponent,
  NodeModel,
  ConnectorModel,
  Connector,
  PaletteModel,
  ShapeAnnotationModel,
  UmlClassifierShapeModel
} from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import "./font-icons.css";

let diagramInstance: DiagramComponent;
let paletteIconInstance: HTMLElement;
let paletteSpaceInstance: HTMLElement;
//Initialize nodes for the diagram.
let nodes: NodeModel[] = [
  {
    id: 'Patient',
    shape: {
      type: 'UmlClassifier',
      classShape: {
        name: 'Patient',
        attributes: [
          createProperty('accepted', 'Date'),
          createProperty('sickness', 'History'),
          createProperty('prescription', 'String[*]'),
          createProperty('allergies', 'String[*]')
        ],
        methods: [createMethods('getHistory', 'History')]
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel,
    offsetX: 200,
    offsetY: 250
  },
  {
    id: 'Doctor',
    shape: {
      type: 'UmlClassifier',
      classShape: {
        name: 'Doctor',
        attributes: [
          createProperty('specialist', 'String[*]'),
          createProperty('locations', 'String[*]')
        ]
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel,
    offsetX: 240,
    offsetY: 545
  },
  {
    id: 'Person',
    shape: {
      type: 'UmlClassifier',
      classShape: {
        name: 'Person',
        attributes: [
          createProperty('name', 'Name'),
          createProperty('title', 'String[*]'),
          createProperty('gender', 'Gender')
        ]
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel,
    offsetX: 405,
    offsetY: 105
  },
  {
    id: 'Hospital',
    shape: {
      type: 'UmlClassifier',
      classShape: {
        name: 'Hospital',
        attributes: [
          createProperty('name', 'Name'),
          createProperty('address', 'Address'),
          createProperty('phone', 'Phone')
        ],
        methods: [createMethods('getDepartment', 'String')]
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel,
    offsetX: 638,
    offsetY: 100
  },
  {
    id: 'Department',
    shape: {
      type: 'UmlClassifier',
      classShape: {
        name: 'Department',
        methods: [createMethods('getStaffCount', 'Int')]
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel,
    offsetX: 638,
    offsetY: 280
  },
  {
    id: 'Staff',
    shape: {
      type: 'UmlClassifier',
      classShape: {
        name: 'Staff',
        attributes: [
          createProperty('joined', 'Date'),
          createProperty('education', 'string[*]'),
          createProperty('certification', 'string[*]'),
          createProperty('languages', 'string[*]')
        ],
        methods: [
          createMethods('isDoctor', 'bool'),
          createMethods('getHistory', 'bool')
        ]
      },
      classifier: 'Class'
    } as UmlClassifierShapeModel,
    offsetX: 635,
    offsetY: 455
  },
  createNode('OperationStaff', 410, 455, 'OperationStaff'),
  createNode('Nurse', 410, 545, 'Nurse'),
  createNode('Surgeon', 240, 665, 'Surgeon'),
  createNode('AdministrativeStaff', 632, 605, 'AdministrativeStaff'),
  createNode('FrontDeskStaff', 630, 695, 'FrontDeskStaff'),
  createNode('TechnicalStaff', 928, 445, 'TechnicalStaff'),
  createNode('Technician', 815, 535, 'Technician'),
  createNode('Technologist', 1015, 535, 'Technologist'),
  createNode('SurgicalTechnologist', 1015, 630, 'SurgicalTechnologist')
];
//Initialize connector for the diagram.
let connectors: ConnectorModel[] = [
  createConnector('connect1', 'Patient', 'Person'),
  createConnector('connect2', 'Person', 'Hospital'),
  createConnector('connect3', 'Department', 'Hospital'),
  createConnector('connect4', 'OperationStaff', 'Patient'),
  createConnector('connect5', 'Doctor', 'OperationStaff'),
  createConnector('connect6', 'Nurse', 'OperationStaff'),
  createConnector('connect7', 'Surgeon', 'Doctor'),
  createConnector('connect8', 'FrontDeskStaff', 'AdministrativeStaff'),
  createConnector('connect9', 'Technician', 'TechnicalStaff'),
  createConnector('connect10', 'Technologist', 'TechnicalStaff'),
  createConnector('connect11', 'SurgicalTechnologist', 'Technologist'),
  createConnector('connect12', 'Staff', 'Department'),
  createConnector('connect13', 'Staff', 'Person'),
  createConnector('connect14', 'OperationStaff', 'Staff'),
  createConnector('connect15', 'AdministrativeStaff', 'Staff'),
  createConnector('connect16', 'TechnicalStaff', 'Staff')
];

//Create a connector.
function createConnector( id: string, sourceID: string, targetID: string ): ConnectorModel {
  let connector: ConnectorModel = {};
  connector.id = id;
  connector.sourceID = sourceID;
  connector.targetID = targetID;
  return connector;
}

//Create class Diagram shapes.
function createNode( id: string, offsetX: number, offsetY: number, className: string ): NodeModel {
  let node: NodeModel = {};
  node.id = id;
  node.offsetX = offsetX;
  node.offsetY = offsetY;
  node.shape = {
    type: 'UmlClassifier',
    classShape: {
      name: className
    },
    classifier: 'Class'
  } as UmlClassifierShapeModel;
  return node;
}

//create class Property
function createProperty(name: string, type: string): object {
  return { name: name, type: type };
}

//create class Methods
function createMethods(name: string, type: string): object {
  return { name: name, type: type };
}
function UMLClassDiagram() {
  React.useEffect(() => {
    updateSampleSection();
    renderComplete();
  }, [])
  function renderComplete() {
    addEvents();
    diagramInstance.fitToPage();
  }
  let isMobile: boolean;
//To enhance the functionality of a webpage for mobile devices by adding a click event listener 
  function addEvents(): void {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      let paletteIcon: HTMLElement = paletteIconInstance;
      if (paletteIcon) {
        paletteIcon.addEventListener('click', openPalette, false);
      }
    }
  }
  //To manage the visibility state of the palette space on a webpage for mobile devices
  function openPalette(): void {
    let paletteSpace: HTMLElement = paletteSpaceInstance;
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
      if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
        paletteSpace.classList.add('sb-mobile-palette-open');
      } else {
        paletteSpace.classList.remove('sb-mobile-palette-open');
      }
    }
  }
  // Initializes the palettes to be displayed in the symbol palette.
  let palettes: PaletteModel[] = [
    {
        id: 'UmlActivity', expanded: true, title: 'UML Classifier Nodes', symbols: [
        {
            id: 'class',
            shape: {
                type: 'UmlClassifier',
                classShape: {
                    attributes: [
                        { name: 'accepted', type: 'Date', isSeparator: true },
                        { name: 'sickness', type: 'History' },
                        { name: 'prescription', type: 'String[*]' },
                        { name: 'allergies', type: 'String[*]' }
                    ],
                    methods: [{ name: 'getHistory', style: {}, parameters: [{ name: 'Date', style: {} }], type: 'History' }],
                    name: 'Patient'
                },
                classifier: 'Class'
            },
        },
        {
            id: 'Interface',
            shape: {
                type: 'UmlClassifier',
                interfaceShape: {
                    name: "Bank Account",
                    attributes: [{
                            name: "owner",
                            type: "String[*]", style: {}
                        },
                        {
                            name: "balance",
                            type: "Dollars"
                        }],
                    methods: [{
                            name: "deposit", style: {},
                            parameters: [{
                                    name: "amount",
                                    type: "Dollars",
                                    style: {}
                                }],
                        }]
                },
                classifier: 'Interface'
            },
        },
        {
            id: 'Enumeration',
            shape: {
                type: 'UmlClassifier',
                enumerationShape: {
                    name: 'AccountType',
                    members: [
                        {
                            name: 'Checking Account', style: {}
                        },
                        {
                            name: 'Savings Account'
                        },
                        {
                            name: 'Credit Account'
                        }
                    ]
                },
                classifier: 'Enumeration'
            },
        },
        ]
    },
    {
      id: 'umlConnectorrs', expanded: true, title: 'UML Classifier Connectors', symbols: [
        {
          id: 'Composition',
          sourcePoint: { x: 100, y: 200 },
          targetPoint: { x: 200, y: 300 },
          type: 'Straight',
          shape: { type: 'UmlClassifier', relationship: 'Composition' }
      },
      {
          id: 'BiDirectional',
          type: 'Straight',
          sourcePoint: { x: 300, y: 200 },
          targetPoint: { x: 400, y: 300 },
          shape: { type: 'UmlClassifier', relationship: 'Aggregation', associationType: 'BiDirectional' }
      },
      {
          id: 'Directional',
          type: 'Straight',
          sourcePoint: { x: 500, y: 200 },
          targetPoint: { x: 600, y: 300 },
          shape: { type: 'UmlClassifier', relationship: 'Association', associationType: 'Directional' }
      },
      {
          id: 'Association',
          type: 'Straight',
          sourcePoint: { x: 700, y: 200 },
          targetPoint: { x: 800, y: 300 },
          shape: { type: 'UmlClassifier', relationship: 'Association' }
      },
      {
          id: 'Inheritance',
          type: 'Straight',
          sourcePoint: { x: 900, y: 200 },
          targetPoint: { x: 1000, y: 300 },
          shape: { type: 'UmlClassifier', relationship: 'Inheritance' }
      },
      {
          id: 'Interfaces',
          type: 'Straight',
          sourcePoint: { x: 100, y: 400 },
          targetPoint: { x: 200, y: 500 },
          shape: { type: 'UmlClassifier', relationship: 'Interface' }
      },
      {
          id: 'Dependency',
          type: 'Straight',
          sourcePoint: { x: 300, y: 400 },
          targetPoint: { x: 400, y: 500 },
          shape: { type: 'UmlClassifier', relationship: 'Dependency' }
      },
      {
          id: 'Realization',
          type: 'Straight',
          sourcePoint: { x: 500, y: 400 },
          targetPoint: { x: 600, y: 500 },
          shape: { type: 'UmlClassifier', relationship: 'Realization' }
      },
      {
          id: "OneToMany",
          type: 'Straight',
          sourcePoint: {
              x: 700,
              y: 400
          },
          targetPoint: {
              x: 800,
              y: 500
          },
          annotations: [{
                  margin: {
                      top: 10,
                      left: 10,
                      right: 10,
                      bottom: 20
                  }
              }
          ],
          shape: {
              type: "UmlClassifier",
              relationship: 'Dependency',
              multiplicity: {
                  type: 'OneToMany',
                  source: {
                      optional: true,
                      lowerBounds: '89',
                      upperBounds: '67'
                  },
                  target: { optional: true, lowerBounds: '78', upperBounds: '90' }
              }
          }
      },
      {
          id: "ManyToMany",
          sourcePoint: {
              x: 900,
              y: 400
          },
          targetPoint: {
              x: 1000,
              y: 500
          },
          annotations: [{
                  margin: {
                      top: 10,
                      left: 10,
                      right: 10,
                      bottom: 20
                  }
              }
          ],
          shape: {
              type: "UmlClassifier",
              relationship: 'Dependency',
              multiplicity: {
                  type: 'ManyToMany',
                  source: {
                      optional: true,
                      lowerBounds: '89',
                      upperBounds: '67'
                  },
                  target: { optional: true, lowerBounds: '78', upperBounds: '90' }
              }
          }
      },
      {
          id: "OneToOne",
          sourcePoint: { x: 100, y: 600 },
          targetPoint: { x: 200, y: 700 },
          annotations: [{
                  margin: {
                      top: 10,
                      left: 10,
                      right: 10,
                      bottom: 20
                  }
              }
          ],
          shape: {
              type: "UmlClassifier",
              relationship: 'Dependency',
              multiplicity: {
                  type: 'OneToOne',
                  source: {
                      optional: true,
                      lowerBounds: '89',
                      upperBounds: '67'
                  },
                  target: { optional: true, lowerBounds: '78', upperBounds: '90' }
              }
          }
      },
      {
          id: "ManyToOne",
          sourcePoint: { x: 300, y: 600 },
          targetPoint: { x: 400, y: 700 },
          annotations: [{
                  margin: {
                      top: 10,
                      left: 10,
                      right: 10,
                      bottom: 20
                  }
              }
          ],
          shape: {
              type: "UmlClassifier",
              relationship: 'Dependency',
              multiplicity: {
                  type: 'ManyToOne',
                  source: {
                      optional: true,
                      lowerBounds: '89',
                      upperBounds: '67'
                  },
                  target: { optional: true, lowerBounds: '78', upperBounds: '90' }
              }
          }
      },
      {
          id: "OneToMany",
          sourcePoint: { x: 500, y: 600 },
          targetPoint: { x: 600, y: 700 },
          annotations: [{
                  margin: {
                      top: 10,
                      left: 10,
                      right: 10,
                      bottom: 20
                  }
              }
          ],
          shape: {
              type: "UmlClassifier",
              relationship: 'Dependency',
              multiplicity: {
                  type: 'OneToMany',
              }
          }
      }
      ]
    }
  ];
  
  return (
    <div className="control-pane">
      <div className="control-section">
        <div style={{ width: "100%" }}>
          <div className="sb-mobile-palette-bar">
            <div id="palette-icon" style={{ float: "right" }} className="e-ddb-icons1 e-toggle-palette"></div>
          </div>
          <div
            id="palette-space" className="sb-mobile-palette"
          >
            <SymbolPaletteComponent
              id="symbolpalette"
              expandMode="Multiple"
              palettes={palettes}
              width={"100%"}
              height={"700px"}
              symbolHeight={90}
              symbolWidth={90}
              getNodeDefaults={(symbol: NodeModel): void => {
                symbol.width = 100;
                symbol.height = 100;
            }}
              symbolMargin={{left: 12, right: 12, top: 12, bottom: 12 }}
              getSymbolInfo={(symbol: NodeModel): SymbolInfo => {
                  return { fit: true,description: { text: symbol.id, } ,tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
              }}

            />
          </div>
          <div
            id="diagram-space" className="sb-mobile-diagram"
          >
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"700px"}
              nodes={nodes}
              connectors={connectors} 
               //Sets the default values of a connector
               getConnectorDefaults={(connector: ConnectorModel) => {
                return connector;
                }}
                 //Sets the Node style for DragEnter element.
              dragEnter={(args: IDragEnterEventArgs): void => {
                if(args.element instanceof Connector){
                  args.element.targetPoint.x += 100;
                  args.element.targetPoint.y += 20
                }
              }}
              //Sets the default values of a node
              getNodeDefaults={(node: NodeModel) => {
                node.style = { fill: '#26A0DA', strokeColor: 'white' };
                if (node.annotations && node.annotations.length > 0) {
                  for (let i: number = 0; i < node.annotations.length; i++) {
                      let annotation: ShapeAnnotationModel = node.annotations[i];
                      if(annotation && annotation.style) {
                            annotation.style.color = 'white';
                      }
                    }
                  }
                return node;
              }}
            >
              </DiagramComponent>
          </div>
        </div>
      </div>
      <div id="action-description">
             <p>
             This sample represents the hospital management system using diagram's built-in UML class diagram shapes.
             </p>
      </div>
      <div id="description">
             <p>
               This example shows how to create class shapes using diagram <code>UMLClass</code> shapes. The <code>type</code> property of the
               <code>shape</code> can be used to create <code>UMLClass</code> nodes. The <code>shape</code> property of the shape allows you to create UML
               Class shapes.
           </p>
      </div>
    </div>
  );
}
export default UMLClassDiagram;