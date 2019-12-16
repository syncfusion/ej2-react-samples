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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var diagramInstance;
var dialogInstance;
var toolbarObj;
var sourceID;
var targetID;
var sourceDropdown;
var targetDropdown;
var nodeData = [];
var Crud = /** @class */ (function (_super) {
    __extends(Crud, _super);
    function Crud(props) {
        var _this = _super.call(this) || this;
        _this.fields = { text: 'Label', value: 'Name' };
        _this.buttons = [{
                click: _this.dlgButtonClick,
                buttonModel: {
                    content: 'Update',
                    isPrimary: true
                }
            }];
        return _this;
    }
    Crud.prototype.content = function (data) {
        return (React.createElement("div", null,
            React.createElement("div", { className: 'showLabel' },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: 'Description', floatLabelType: 'Always', placeholder: 'Description' })),
            React.createElement("div", { className: 'showLabel', style: { paddingTop: '14px' } },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: 'Color', floatLabelType: 'Always', placeholder: 'Color' })),
            React.createElement("div", { className: 'showDropdown' },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'SourceId', ref: function (dropdown) { return (sourceDropdown = dropdown); }, change: function (args) {
                        sourceID = args.value;
                    }, created: function (args) {
                        sourceDropdown.fields = { text: 'Label', value: 'Name' };
                        sourceDropdown.dataSource = getDataSource();
                        sourceDropdown.dataBind();
                    } })),
            React.createElement("div", { className: 'showDropdown', style: { paddingTop: '14px' } },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'TargetId', ref: function (dropdown) { return (targetDropdown = dropdown); }, change: function (args) {
                        targetID = args.value;
                    }, created: function (args) {
                        targetDropdown.fields = { text: 'Label', value: 'Name' };
                        targetDropdown.dataSource = getDataSource();
                        targetDropdown.dataBind();
                    } }))));
    };
    // custom code start
    Crud.prototype.dlgButtonClick = function () {
        var dialogHeader = dialogInstance.header;
        var description = document.getElementById('Description').value;
        var color = document.getElementById('Color').value;
        var selectedItem;
        if (diagramInstance.selectedItems.nodes.length > 0) {
            selectedItem = diagramInstance.selectedItems.nodes[0];
        }
        if (diagramInstance.selectedItems.connectors.length > 0) {
            selectedItem = diagramInstance.selectedItems.connectors[0];
        }
        if (dialogHeader === 'Add') {
            var node = {
                id: 'node' + ej2_react_diagrams_1.randomId(),
                style: { fill: color },
                Description: description,
                Color: color,
                Id: Math.floor(Math.random() * 1000 + 100)
            };
            var connector = {
                id: 'connector' + ej2_react_diagrams_1.randomId(),
                sourceID: selectedItem.id,
                targetID: node.id,
                Id: Math.floor(Math.random() * 1000 + 100)
            };
            diagramInstance.add(node);
            diagramInstance.add(connector);
            diagramInstance.doLayout();
            diagramInstance.insertData();
            nodeData.push({ Name: node.id, Label: description });
            sourceDropdown.dataSource = getDataSource();
            sourceDropdown.dataBind();
            targetDropdown.dataSource = getDataSource();
            targetDropdown.dataBind();
        }
        else {
            if (selectedItem instanceof ej2_react_diagrams_1.Connector) {
                selectedItem.sourceID = sourceID ? sourceID : selectedItem.sourceID;
                selectedItem.targetID = targetID ? targetID : selectedItem.targetID;
                diagramInstance.dataBind();
                diagramInstance.doLayout();
            }
            else {
                selectedItem.Description = description;
                selectedItem.Color = color;
                selectedItem.annotations[0].content = description;
                selectedItem.style.fill = color;
                diagramInstance.dataBind();
            }
            diagramInstance.updateData();
        }
        dialogInstance.hide();
    };
    // custom code end
    Crud.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { style: { width: '100%', height: '10%' } },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: 'toolbar_diagram', ref: function (toolbar) { return (toolbarObj = toolbar); }, items: [
                            {
                                tooltipText: 'Add',
                                prefixIcon: 'e-ddb-crudicons e-add',
                                id: 'Add',
                                text: 'Add'
                            },
                            {
                                type: 'Separator'
                            },
                            {
                                tooltipText: 'Edit',
                                prefixIcon: 'e-ddb-crudicons e-update',
                                id: 'Edit',
                                text: 'Edit'
                            },
                            {
                                type: 'Separator'
                            },
                            {
                                tooltipText: 'Delete',
                                prefixIcon: 'e-ddb-crudicons e-delete',
                                id: 'Delete',
                                text: 'Delete'
                            }
                        ], clicked: function (args) {
                            var selectedItem;
                            if (diagramInstance.selectedItems.nodes.length > 0) {
                                selectedItem = diagramInstance.selectedItems.nodes[0];
                            }
                            if (diagramInstance.selectedItems.connectors.length > 0) {
                                selectedItem = diagramInstance.selectedItems.connectors[0];
                            }
                            if (selectedItem) {
                                switch (args.item.tooltipText) {
                                    case 'Add':
                                        openDialog('Add', '', '', true);
                                        break;
                                    case 'Edit':
                                        if (selectedItem instanceof ej2_react_diagrams_1.Connector) {
                                            var sourceNode = diagramInstance.getObject(selectedItem.sourceID);
                                            var targetNode = diagramInstance.getObject(selectedItem.targetID);
                                            openDialog('Edit', sourceNode.Description, targetNode.Description, false);
                                        }
                                        else {
                                            openDialog('Edit', selectedItem.Description, selectedItem.Color, true);
                                        }
                                        break;
                                    case 'Delete':
                                        diagramInstance.remove(selectedItem);
                                        diagramInstance.doLayout();
                                        diagramInstance.removeData();
                                        var element = { Name: selectedItem.id, Label: selectedItem.Description };
                                        var index = nodeData.indexOf(element);
                                        nodeData.splice(index, 1);
                                        sourceDropdown.dataSource = getDataSource();
                                        sourceDropdown.dataBind();
                                        targetDropdown.dataSource = getDataSource();
                                        targetDropdown.dataBind();
                                }
                            }
                        }, created: function (args) {
                            enableToolbarItems(false);
                        } })),
                React.createElement("div", { style: { width: '100%', height: '80%', borderWidth: '0 1px 1px 1px', borderStyle: 'solid', borderColor: '#D7D7D7' } },
                    React.createElement("div", { id: 'diagram-space', className: 'sb-mobile-diagram' },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: 'diagram', ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '600px', snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, dataSourceSettings: {
                                id: 'Name',
                                //set an URL to perform CRUD operations with node in database
                                crudAction: {
                                    read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetNodes',
                                    create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddNodes',
                                    update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateNodes',
                                    destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteNodes',
                                    customFields: ['Id', 'Description', 'Color']
                                },
                                connectionDataSource: {
                                    id: 'Name',
                                    sourceID: 'SourceNode',
                                    targetID: 'TargetNode',
                                    //set an URL to perform CRUD operations with connector in database
                                    crudAction: {
                                        read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetConnectors',
                                        create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddConnectors',
                                        update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateConnectors',
                                        destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteConnectors',
                                        customFields: ['Id']
                                    }
                                }
                            }, layout: {
                                type: 'HierarchicalTree',
                                verticalSpacing: 40,
                            }, getNodeDefaults: function (obj) {
                                obj.width = 100;
                                obj.height = 50;
                                obj.shape = { type: 'Basic', shape: 'Rectangle' };
                                obj.style = { strokeWidth: 1, strokeColor: '#DDDDDD' };
                                return obj;
                            }, getConnectorDefaults: function (connector) {
                                connector.type = 'Orthogonal';
                                connector.style.fill = '#707070';
                                connector.style.strokeColor = '#707070';
                                connector.targetDecorator = {
                                    style: {
                                        strokeColor: '#707070',
                                        fill: '#707070'
                                    },
                                };
                                return connector;
                            }, selectionChange: function (args) {
                                if (args.state === 'Changing') {
                                    if (args.newValue.length > 0) {
                                        if (args.newValue[0] instanceof ej2_react_diagrams_1.Node) {
                                            enableToolbarItems(true);
                                        }
                                        else {
                                            toolbarObj.enableItems(document.getElementById(toolbarObj.items[0].id).parentElement, false);
                                            toolbarObj.enableItems(document.getElementById(toolbarObj.items[2].id).parentElement, true);
                                            toolbarObj.enableItems(document.getElementById(toolbarObj.items[4].id).parentElement, false);
                                        }
                                    }
                                    else {
                                        enableToolbarItems(false);
                                    }
                                }
                            }, sourcePointChange: function (args) {
                                if (args.state === 'Completed') {
                                    if (!args.connector.targetID || !args.connector.sourceID) {
                                        args.cancel = true;
                                    }
                                }
                            }, targetPointChange: function (args) {
                                if (args.state === 'Completed') {
                                    if (!args.connector.targetID || !args.connector.sourceID) {
                                        args.cancel = true;
                                    }
                                }
                            }, setNodeTemplate: function (obj) {
                                obj.annotations = [{ style: { color: 'black' } }];
                                obj.annotations[0].content = obj.Description;
                                obj.style = { fill: obj.Color };
                                if (obj.Id === 1) {
                                    //delete constraints for an root node
                                    obj.constraints = ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Delete;
                                }
                            } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] }))))),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: 'editDialog', ref: function (dialog) { return (dialogInstance = dialog); }, width: '300px', visible: false, isModal: true, showCloseIcon: true, content: this.content, buttons: this.buttons }),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates generating a diagram by reading data from the database, and updating it with newly inserted/updated/deleted nodes and connectors through web services.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "This example shows how the user reads the data source and performs add, edit, delete of data in the data source at runtime. The ",
                    React.createElement("code", null, "crudAction"),
                    " property of the ",
                    React.createElement("code", null, "dataSourceSettings"),
                    " and ",
                    React.createElement("code", null, "crudAction"),
                    " property of the",
                    React.createElement("code", null, "connectionDataSource"),
                    " allow you to define the server-side method name for ",
                    React.createElement("code", null, "create"),
                    ", ",
                    React.createElement("code", null, "read"),
                    ", ",
                    React.createElement("code", null, "update"),
                    ", and",
                    React.createElement("code", null, "delete"),
                    " operations."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "insertData"),
                    " method is used to send the newly added/inserted data from client to server side. Likewise,",
                    React.createElement("code", null, "updateData"),
                    " and ",
                    React.createElement("code", null, "removeData"),
                    " are used to send the updated and deleted diagram elements to the server."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module using ",
                    React.createElement("code", null,
                        "provide: ",
                        [ej2_react_diagrams_1.DataBinding]),
                    " method. To automatically arrange the objects in an Hierarchical chart, inject ",
                    React.createElement("code", null, "HierarchicalTree"),
                    " module using ",
                    React.createElement("code", null,
                        "provide: ",
                        [ej2_react_diagrams_1.HierarchicalTree]),
                    " method."))));
    };
    return Crud;
}(sample_base_1.SampleBase));
exports.Crud = Crud;
// custom code start
function enableToolbarItems(isEnableItem) {
    toolbarObj.enableItems(document.getElementById(toolbarObj.items[0].id).parentElement, isEnableItem);
    toolbarObj.enableItems(document.getElementById(toolbarObj.items[2].id).parentElement, isEnableItem);
    toolbarObj.enableItems(document.getElementById(toolbarObj.items[4].id).parentElement, isEnableItem);
}
function openDialog(title, description, color, isNode) {
    dialogInstance.header = title;
    if (isNode) {
        hideClassElement('.showDropdown', 'none');
        hideClassElement('.showLabel', 'block');
        document.getElementById('Description').value = description;
        document.getElementById('Color').value = color;
    }
    else {
        hideClassElement('.showDropdown', 'block');
        hideClassElement('.showLabel', 'none');
        document.getElementById('SourceId').value = description;
        document.getElementById('TargetId').value = color;
    }
    dialogInstance.show();
}
function hideClassElement(className, display) {
    var i;
    var showDropdown = document.querySelectorAll(className);
    for (i = 0; i < showDropdown.length; i++) {
        showDropdown[i].style.display = display;
    }
}
// custom code end
function getDataSource() {
    var i;
    nodeData = [];
    for (i = 0; i < diagramInstance.nodes.length; i++) {
        var node = diagramInstance.nodes[i];
        var element = { Name: node.id, Label: node.Description };
        nodeData.push(element);
    }
    return nodeData;
}
