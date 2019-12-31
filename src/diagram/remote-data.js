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
var RemoteData = (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoteData.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", width: "100%", height: "490", layout: {
                        type: "HierarchicalTree",
                        margin: { left: 0, right: 0, top: 100, bottom: 0 },
                        verticalSpacing: 40,
                        getLayoutInfo: function (node, options) {
                            if (options.level === 3) {
                                node.style.fill = "#3c418d";
                            }
                            if (options.level === 2) {
                                node.style.fill = "#108d8d";
                                options.type = "Center";
                                options.orientation = "Horizontal";
                            }
                            if (options.level === 1) {
                                node.style.fill = "#822b86";
                            }
                        }
                    }, 
                    //Sets the default values of nodes
                    getNodeDefaults: function (obj) {
                        obj.width = 80;
                        obj.height = 40;
                        //Initialize shape
                        obj.shape = { type: "Basic", shape: "Rectangle" };
                        obj.style = { fill: "#048785", strokeColor: "Transparent" };
                    }, 
                    //Sets the default values of connector
                    getConnectorDefaults: function (connector) {
                        connector.type = "Orthogonal";
                        connector.style.strokeColor = "#048785";
                        connector.targetDecorator.shape = "None";
                    }, 
                    //Configures data source
                    dataSourceSettings: {
                        id: "EmployeeID",
                        parentId: "ReportsTo",
                        dataSource: new ej2_data_1.DataManager({
                            url: "https://mvc.syncfusion.com/Services/Northwnd.svc/",
                            crossDomain: true
                        }, new ej2_data_1.Query()
                            .from("Employees")
                            .select("EmployeeID,ReportsTo,FirstName")
                            .take(9)),
                        //binds the external data with node
                        doBinding: function (nodeModel, data, diagram) {
                            nodeModel.annotations = [
                                {
                                    /* tslint:disable:no-string-literal */
                                    content: data["FirstName"],
                                    style: { color: "white" }
                                }
                            ];
                        }
                    }, 
                    //Disables all interactions except zoom/pan
                    tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, snapSettings: { constraints: 0 } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates binding remote data with the diagram using the Data Manager support.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to generate a diagram from remote data such as REST APIs. The",
                    React.createElement("code", null, "dataSourceSettings"),
                    " property can be used to map an external data source with the diagram control. The",
                    React.createElement("code", null, "id"),
                    " property of",
                    React.createElement("code", null, "dataSourceSettings"),
                    " can be used to define a unique field of an external data. The",
                    React.createElement("code", null, "parentId"),
                    " property can be used to define the relationship between objects. The",
                    React.createElement("code", null, "dataManager"),
                    " property can be used to fetch data from web services."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject",
                    React.createElement("code", null, "DataBinding"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a hierarchical structure, inject",
                    React.createElement("code", null, "DataBinding"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return RemoteData;
}(sample_base_1.SampleBase));
exports.RemoteData = RemoteData;
