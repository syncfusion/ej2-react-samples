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
var diagram_data_1 = require("./diagram-data");
var SAMPLE_CSS = ".image-pattern-style {\n    background-color: white;\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 50px;\n    width: calc((100% - 18px) / 3);\n    cursor: pointer;\n    border: 1px solid #D5D5D5;\n    background-position: center;\n    float: left;\n}\n\n.image-pattern-style:hover {\n  border-color: gray;\n  border-width: 2px;\n}\n\n.row {\n    margin-left: 0px;\n    margin-right: 0px;\n}\n\n.row-header {\n    font-size: 15px;\n    font-weight: 500;\n}\n\n.e-selected-style {\n    border-color: #006CE6;\n    border-width: 2px;\n}\n\n.e-checkbox-wrapper .e-label {\n    font-size: 12px;\n}\n\n.diagram-control-pane .col-xs-6 {\n    padding-left: 0px;\n    padding-right: 0px;\n}";
var diagramInstance;
var marginTopObj;
var marginLeftObj;
var horizontalSpacingObj;
var verticalSpacingObj;
var ComplexHierarchicalModel = (function (_super) {
    __extends(ComplexHierarchicalModel, _super);
    function ComplexHierarchicalModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComplexHierarchicalModel.prototype.rendereComplete = function () {
        //Click Event for Appearance of the layout.
        document.getElementById("appearance").onclick = function (args) {
            var target = args.target;
            // custom code start
            var selectedElement = document.getElementsByClassName("e-selected-style");
            // custom code end
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "toptobottom":
                        updateLayout(target, "TopToBottom");
                        break;
                    case "bottomtotop":
                        updateLayout(target, "BottomToTop");
                        break;
                    case "lefttoright":
                        updateLayout(target, "LeftToRight");
                        break;
                    case "righttoleft":
                        updateLayout(target, "RightToLeft");
                        break;
                }
            }
        };
    };
    ComplexHierarchicalModel.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: 580, layout: {
                            type: "ComplexHierarchicalTree",
                            horizontalSpacing: 40,
                            verticalSpacing: 40,
                            orientation: "TopToBottom",
                            margin: { left: 10, right: 0, top: 50, bottom: 0 }
                        } //Configrues hierarchical tree layout
                        , getNodeDefaults: function (obj) {
                            //Sets the default values of nodes
                            obj.width = 40;
                            obj.height = 40;
                            //Initialize shape
                            obj.shape = {
                                type: "Basic",
                                shape: "Rectangle",
                                cornerRadius: 7
                            };
                        }, getConnectorDefaults: function (connector) {
                            //Sets the default values of connector
                            connector.type = "Orthogonal";
                            connector.cornerRadius = 7;
                            connector.targetDecorator.height = 7;
                            connector.targetDecorator.width = 7;
                            connector.style.strokeColor = "#6d6d6d";
                        }, dataSourceSettings: {
                            id: "Name",
                            parentId: "ReportingPerson",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.multiParentData),
                            doBinding: function (nodeModel, data, diagram) {
                                //Configures data source
                                //binds the external data with node
                                /* tslint:disable:no-string-literal */
                                nodeModel.style = {
                                    fill: data["fillColor"],
                                    strokeWidth: 1,
                                    strokeColor: data["border"]
                                };
                            }
                        }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan //Disables all interactions except zoom/pan
                        , snapSettings: { constraints: 0 } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.ComplexHierarchicalTree] })))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Layout Settings"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row row-header" }, "Orientation"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style  e-selected-style", id: "toptobottom", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/toptobottom.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "bottomtotop", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/bottomtotop.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "lefttoright", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/lefttoright.png')",
                                margin: "0px 3px"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "righttoleft", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/righttoleft.png')",
                                margin: "0px 3px"
                            } }))),
                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row row-header" }, "Behaviour"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px", paddingLeft: "0px" }, className: "col-xs-5" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Margin X")),
                        React.createElement("div", { className: "col-xs-7" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (marginLeftObjRef) { return (marginLeftObj = marginLeftObjRef); }, id: "marginLeft", value: 10, step: 1, format: "##.##", change: function (args) {
                                    update("left");
                                } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px", paddingLeft: "0px" }, className: "col-xs-5" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Margin Y")),
                        React.createElement("div", { className: "col-xs-7" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (marginTopObjRef) { return (marginTopObj = marginTopObjRef); }, id: "marginTop", value: 50, step: 1, format: "##.##", change: function (args) {
                                    update("top");
                                } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px", paddingLeft: "0px" }, className: "col-xs-5" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Horizontal Spacing")),
                        React.createElement("div", { className: "col-xs-7" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (horizontalSpacingObjRef) {
                                    return (horizontalSpacingObj = horizontalSpacingObjRef);
                                }, id: "horiontal", value: 40, step: 1, format: "##.##", change: function (args) {
                                    update("hspacing");
                                } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px", paddingLeft: "0px" }, className: "col-xs-5" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Vertical Spacing")),
                        React.createElement("div", { className: "col-xs-7" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (verticalSpacingObjRef) {
                                    return (verticalSpacingObj = verticalSpacingObjRef);
                                }, id: "vertical", value: 40, step: 1, format: "##.##", change: function (args) {
                                    update("vspacing");
                                } }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates a complex hierarchical template that is built from an external data source using complex hierarchical tree algorithm.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to generate a complex hierarchical tree from external data sources. You can also customize spacing between the objects in the tree. You can use the",
                    React.createElement("code", null, "horizontalSpacing"),
                    " and ",
                    React.createElement("code", null, "verticalSpacing"),
                    " ",
                    "properties of ",
                    React.createElement("code", null, "layout"),
                    " to customize the space between the objects in the tree. You can use the ",
                    React.createElement("code", null, "layoutOrientation"),
                    " ",
                    "property of",
                    React.createElement("code", null, "layout"),
                    " to change the orientation of the tree."),
                React.createElement("p", null, "To change the orientation of the tree, click the templates in the property panel."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Diagram component's features are segregated into individual feature-wise modules. To generate diagrams from an external data source, we need to Inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a hierarchical structure, we need to Inject",
                    " ",
                    React.createElement("code", null, "ComplexHierarchicalTree"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return ComplexHierarchicalModel;
}(sample_base_1.SampleBase));
exports.ComplexHierarchicalModel = ComplexHierarchicalModel;
//Apply the orientation for multiple parent layout.
function updateLayout(target, orientation) {
    diagramInstance.layout.orientation = orientation;
    diagramInstance.dataBind();
    diagramInstance.doLayout();
    target.classList.add("e-selected-style");
}
//Apply the Alignment for the layout.
function update(value) {
    if (value === "left") {
        diagramInstance.layout.margin.left = marginLeftObj.value;
    }
    else if (value === "top") {
        diagramInstance.layout.margin.top = marginTopObj.value;
    }
    else if (value === "hspacing") {
        diagramInstance.layout.horizontalSpacing = horizontalSpacingObj.value;
    }
    else if (value === "vspacing") {
        diagramInstance.layout.verticalSpacing = verticalSpacingObj.value;
    }
    diagramInstance.dataBind();
}
