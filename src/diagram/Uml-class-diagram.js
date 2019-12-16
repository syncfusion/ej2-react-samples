"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var nodes = [
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
var connectors = [
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
var UMLClassDiagram = /** @class */ (function (_super) {
    __extends(UMLClassDiagram, _super);
    function UMLClassDiagram() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UMLClassDiagram.prototype.render = function () {
        return (React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", width: "100%", height: "800px", nodes: nodes, connectors: connectors, 
                //Sets the default values of a node
                getNodeDefaults: function (obj) {
                    obj.style = { fill: '#26A0DA', strokeColor: 'white' };
                    return obj;
                }, 
                //Sets the default values of a connector
                getConnectorDefaults: function (connector) {
                    return connector;
                }, 
                //set an label style for nodes
                setNodeTemplate: function (node) {
                    if (node.annotations && node.annotations.length > 0) {
                        for (var i = 0; i < node.annotations.length; i++) {
                            var annotation = node.annotations[i];
                            if (annotation && annotation.style) {
                                annotation.style.color = 'white';
                            }
                        }
                    }
                } }),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample represents the hospital management system using diagram's built-in UML class diagram shapes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to create class shapes using diagram ",
                    React.createElement("code", null, "UMLClass"),
                    " shapes. The ",
                    React.createElement("code", null, "type"),
                    " property of the",
                    React.createElement("code", null, "shape"),
                    " can be used to create ",
                    React.createElement("code", null, "UMLClass"),
                    " nodes. The ",
                    React.createElement("code", null, "shape"),
                    " property of the shape allows you to create UML Class shapes."))));
    };
    return UMLClassDiagram;
}(sample_base_1.SampleBase));
exports.UMLClassDiagram = UMLClassDiagram;
//Create a connector.
function createConnector(id, sourceID, targetID) {
    var connector = {};
    connector.id = id;
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    return connector;
}
//Create class Diagram shapes.
function createNode(id, offsetX, offsetY, className) {
    var node = {};
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
