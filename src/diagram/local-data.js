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
var diagram_data_1 = require("./diagram-data");
var LocalData = /** @class */ (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalData.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", width: "100%", height: "490", 
                        //Configures data source
                        dataSourceSettings: {
                            id: "Name",
                            parentId: "Category",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.species),
                            //binds the external data with node
                            doBinding: function (nodeModel, data, diagram) {
                                nodeModel.annotations = [
                                    {
                                        /* tslint:disable:no-string-literal */
                                        content: data["Name"],
                                        style: { color: "black" }
                                    }
                                ];
                                /* tslint:disable:no-string-literal */
                                nodeModel.style = {
                                    fill: "#ffeec7",
                                    strokeColor: "#f5d897",
                                    strokeWidth: 1
                                };
                            }
                        }, 
                        //Configrues organizational chart layout
                        layout: {
                            type: "HierarchicalTree",
                            horizontalSpacing: 15,
                            verticalSpacing: 50,
                            margin: { top: 10, left: 10, right: 10, bottom: 0 }
                        }, 
                        //Sets the default values of nodes
                        getNodeDefaults: function (obj, diagram) {
                            //Initialize shape
                            obj.shape = { type: "Basic", shape: "Rectangle" };
                            obj.style = { strokeWidth: 1 };
                            obj.width = 95;
                            obj.height = 30;
                        }, 
                        //Sets the default values of connector
                        getConnectorDefaults: function (connector, diagram) {
                            connector.type = "Orthogonal";
                            connector.style.strokeColor = "#4d4d4d";
                            connector.targetDecorator.shape = "None";
                        }, 
                        //Disables all interactions except zoom/pan
                        tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, snapSettings: { constraints: 0 } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the classifications of species using hierarchical tree layout algorithm. Data Manager support is used to bind data with the diagram.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to generate a diagram from the saved data. The ",
                    React.createElement("code", null, "dataSourceSettings"),
                    " property can be used to map an external data source with the diagram control. The",
                    React.createElement("code", null, "id"),
                    " property of ",
                    React.createElement("code", null, "dataSourceSettings"),
                    " can be used to define a unique field of an external data. The",
                    React.createElement("code", null, "parentId"),
                    " property can be used to define the relationship between the objects."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a hierarchical structure, inject",
                    React.createElement("code", null, "DataBinding"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return LocalData;
}(sample_base_1.SampleBase));
exports.LocalData = LocalData;
