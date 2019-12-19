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
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var diagram_data_1 = require("./diagram-data");
var SAMPLE_CSS = ".image-pattern-style {\n  background-color: white;\n  background-size: contain;\n  background-repeat: no-repeat;\n  height: 75px;\n  width: calc((100% - 12px) / 3);\n  cursor: pointer;\n  border: 1px solid #D5D5D5;\n  background-position: center;\n  float: left;\n}\n\n.image-pattern-style:hover {\n  border-color: gray;\n  border-width: 2px;\n}\n\n.property-panel-header {\npadding-top: 15px;\npadding-bottom: 15px;\n}\n\n.row {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.e-checkbox-wrapper .e-label {\n  font-size: 12px;\n}\n\n.e-selected-style {\n  border-color: #006CE6;\n  border-width: 2px;\n}\n\n.diagram-control-pane .col-xs-6 {\n  padding-left: 0px;\n  padding-right: 0px;\n}";
var diagramInstance;
var springLength;
var springfactor;
var maxiteration;
var SymmetricLayout = (function (_super) {
    __extends(SymmetricLayout, _super);
    function SymmetricLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SymmetricLayout.prototype.rendereComplete = function () {
        //used to apply the alignment of the layout.
        document.getElementById("refresh").onclick = function () {
            diagramInstance.layout.springLength = springLength.value;
            diagramInstance.layout.springFactor = springfactor.value;
            diagramInstance.layout.maxIteration = maxiteration.value;
            diagramInstance.doLayout();
        };
    };
    SymmetricLayout.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "550px", layout: {
                            type: "SymmetricalLayout",
                            springLength: 80,
                            springFactor: 0.8,
                            maxIteration: 500,
                            margin: { left: 20, top: 20 }
                        }, 
                        //Sets the parent and child relationship of DataSource.
                        dataSourceSettings: {
                            id: "Id",
                            parentId: "Source",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.data)
                        }, 
                        //Sets the constraints of the SnapSettings
                        snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                        //Sets the default values of Node
                        getNodeDefaults: function (obj, diagram) {
                            obj.height = 20;
                            obj.width = 20;
                            obj.style = { fill: "transparent", strokeWidth: 2 };
                            return obj;
                        }, 
                        //Sets the default values of connector
                        getConnectorDefaults: function (connector, diagram) {
                            connector.targetDecorator.shape = "None";
                            connector.type = "Straight";
                            return connector;
                        }, setNodeTemplate: function (obj, diagram) {
                            setNodeTemplate(obj, diagram);
                        }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.SymmetricLayout] })))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("table", { id: "property" },
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "30%" } }, " Spring Length "),
                        React.createElement("td", { style: { width: "60%" } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "springlength", ref: function (lenref) { return (springLength = lenref); }, format: "###.##", value: 80, step: 1 }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "30%" } }, "Spring Factor"),
                        React.createElement("td", { style: { width: "60%" } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "springfactor", ref: function (lenref) { return (springfactor = lenref); }, format: "###.##", value: 0.8, step: 0.1 }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "30%" } }, "Maximum Iteration"),
                        React.createElement("td", { style: { width: "60%" } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "maxiteration", ref: function (lenref) { return (maxiteration = lenref); }, format: "###.##", value: 500, step: 1 }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "50%" } }),
                        React.createElement("td", { style: { width: "50%" } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "refresh" }, "Refresh"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes a simple network template using symmetrical layout algorithm.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This view is well suited for large networks and is commonly used in network component diagrams. It is typically used with simple straight line links. This example shows how to arrange nodes in a symmetrical structure. The",
                    React.createElement("code", null, "layout"),
                    " property of the diagram can be used to enable it."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a symmetrical structure, inject ",
                    React.createElement("code", null, "SymmetricalLayout"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return SymmetricLayout;
}(sample_base_1.SampleBase));
exports.SymmetricLayout = SymmetricLayout;
//Funtion to add the Template of the Node.
function setNodeTemplate(obj, diagram) {
    var shape = { type: "Basic", shape: "Ellipse" };
    if (!obj.data.Type ||
        obj.data.Type === "Server") {
        obj.width = 30;
        obj.height = 30;
        obj.shape = {
            type: "Native",
            content: '<svg width="50" height="65"><g id="Server2_shape" fill="transparent" stroke="transparent" stroke-width="1"' +
                ' opacity="1" stroke-dasharray="" transform="translate(-15.517241379310343,-2.6329421835819375),' +
                'scale(1.7241379310344827,1.3774530437803194)" width="50" height="65"><g><g xmlns="http://www.w3.org/2000/svg">' +
                '<polygon fill="#DBD5DA" points="37.3,7.3 19.4,17.8 9.8,12.1 9.2,12.9 19,18.7 19,49 20,49 20,18.5 37.8,8.1  ">' +
                '</polygon>    <polygon fill="#E5DCE1" points="36.3,7.8 28.2,2.6 10.5,12.5 19.5,17.8  "></polygon> <polygon' +
                ' fill="#BBB5B9" points="20,18.5 37,8.6 36.9,38.4 20,47.9  "></polygon> <polygon fill="#DBD2D7" ' +
                'points="10,13.4 19,18.7 19,48.2 10,42.7  "></polygon>    <path fill="#656666" d="M19.2,49.1c-0.5,' +
                "0-0.9-0.1-1.3-0.4L10.2,44C9.4,43.5,9,42.7,9,41.8V13.6c0-0.9,0.5-1.7,1.3-2.2l16.7-9.2   c0.8-0.4,1.8-0.4," +
                "2.5,0.1L36.8,7C37.6,7.5,38,8.2,38,9.1l-0.1,28.4c0,0.9-0.5,1.7-1.3,2.2l-16.2,9.1C20.1,49,19.6,49.1,19.2,49.1z " +
                "M28.1,2.9c-0.3,0-0.5,0.1-0.7,0.2l-16.6,9.2c-0.5,0.3-0.8,0.8-0.8,1.3v28.2c0,0.5,0.3,1,0.7,1.3l7.7,4.8c0.5,0.3," +
                '1.1,0.3,1.5,0  l16.2-9.1c0.5-0.3,0.8-0.8,0.8-1.3L37,9.1c0-0.5-0.3-1-0.7-1.3L29,3.2C28.7,3,28.4,2.9,28.1,2.9z">' +
                '</path><ellipse fill="#656666"  cx="14.3" cy="40.2" rx="0.6" ry="1.1"></ellipse> <polygon fill="#656666" ' +
                'points="10.9,22.6 10.9,22.6 10.9,22.6  "></polygon> <polygon fill="#656666" class="st4ed" points="11.9,' +
                '22 11.9,23.2 16.7,26 16.7,24.9 "></polygon><polygon fill="#656666" points="10.9,18.9 10.9,18.9 10.9,18.9"></polygon>' +
                '<polygon fill="#656666" points="11.9,18.4 11.9,19.5 16.7,22.4 16.7,21.2  "></polygon></g></g></g></svg>'
        };
    }
    else {
        obj.shape = shape;
        obj.style = { fill: "orange" };
    }
}
