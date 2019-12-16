import * as React from 'react';
import { DiagramComponent } from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from "../common/sample-base";
let nodes = [
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
let connectors = [
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
export class UMLClassDiagram extends SampleBase {
    render() {
        return (<div className="control-section">
                <DiagramComponent id="diagram" width={"100%"} height={"800px"} nodes={nodes} connectors={connectors} 
        //Sets the default values of a node
        getNodeDefaults={(obj) => {
            obj.style = { fill: '#26A0DA', strokeColor: 'white' };
            return obj;
        }} 
        //Sets the default values of a connector
        getConnectorDefaults={(connector) => {
            return connector;
        }} 
        //set an label style for nodes
        setNodeTemplate={(node) => {
            if (node.annotations && node.annotations.length > 0) {
                for (let i = 0; i < node.annotations.length; i++) {
                    let annotation = node.annotations[i];
                    if (annotation && annotation.style) {
                        annotation.style.color = 'white';
                    }
                }
            }
        }}/>
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
            </div>);
    }
}
//Create a connector.
function createConnector(id, sourceID, targetID) {
    let connector = {};
    connector.id = id;
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    return connector;
}
//Create class Diagram shapes.
function createNode(id, offsetX, offsetY, className) {
    let node = {};
    node.id = id;
    node.offsetX = offsetX;
    node.offsetY = offsetY;
    node.shape = {
        type: 'UmlClassifier',
        classShape: {
            name: className
        },
        classifier: 'Class'
    };
    return node;
}
//create class Property
function createProperty(name, type) {
    return { name: name, type: type };
}
//create class Methods
function createMethods(name, type) {
    return { name: name, type: type };
}
