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
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./external-drag-drop.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var dataSource = require("./datasource.json");
/**
 * schedule resources group-editing sample
 */
var ExternalDragDrop = /** @class */ (function (_super) {
    __extends(ExternalDragDrop, _super);
    function ExternalDragDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTreeItemDropped = false;
        _this.draggedItemId = '';
        _this.allowDragAndDrops = true;
        _this.fields = { dataSource: dataSource.waitingList, id: 'Id', text: 'Name' };
        _this.data = ej2_base_1.extend([], dataSource.hospitalData, null, true);
        _this.departmentData = [
            { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
            { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
        ];
        _this.consultantData = [
            { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
            { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
            { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
            { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
            { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
            { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
        ];
        return _this;
    }
    ExternalDragDrop.prototype.getConsultantName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    ExternalDragDrop.prototype.getConsultantImage = function (value) {
        var resourceName = this.getConsultantName(value);
        return resourceName.toLowerCase();
    };
    ExternalDragDrop.prototype.getConsultantDesignation = function (value) {
        return value.resourceData.Designation;
    };
    ExternalDragDrop.prototype.resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "specialist-category" },
                React.createElement("div", { className: "specialist-image " + this.getConsultantImage(props) }),
                React.createElement("div", { className: "specialist-name" }, this.getConsultantName(props)),
                React.createElement("div", { className: "specialist-designation" }, this.getConsultantDesignation(props)))));
    };
    ExternalDragDrop.prototype.treeTemplate = function (props) {
        return (React.createElement("div", { id: "waiting" },
            React.createElement("div", { id: "waitdetails" },
                React.createElement("div", { id: "waitlist" }, props.Name),
                React.createElement("div", { id: "waitcategory" },
                    props.DepartmentName,
                    " - ",
                    props.Description))));
    };
    ExternalDragDrop.prototype.onItemDrag = function (event) {
        if (this.scheduleObj.isAdaptive) {
            var classElement = this.scheduleObj.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                ej2_base_1.addClass([event.target], 'e-device-hover');
            }
        }
        if (document.body.style.cursor === 'not-allowed') {
            document.body.style.cursor = '';
        }
        if (event.name === 'nodeDragging') {
            var dragElementIcon = document.querySelectorAll('.e-drag-item.treeview-external-drag .e-icon-expandable');
            for (var i = 0; i < dragElementIcon.length; i++) {
                dragElementIcon[i].style.display = 'none';
            }
        }
    };
    ExternalDragDrop.prototype.onActionBegin = function (event) {
        var _this = this;
        if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
            var treeViewdata = this.treeObj.fields.dataSource;
            var filteredPeople = treeViewdata.filter(function (item) { return item.Id !== parseInt(_this.draggedItemId, 10); });
            this.treeObj.fields.dataSource = filteredPeople;
            var elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (var i = 0; i < elements.length; i++) {
                ej2_base_1.remove(elements[i]);
            }
        }
    };
    ExternalDragDrop.prototype.onTreeDragStop = function (event) {
        var treeElement = ej2_base_1.closest(event.target, '.e-treeview');
        var classElement = this.scheduleObj.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            var scheduleElement = ej2_base_1.closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                var treeviewData = this.treeObj.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    var filteredData = treeviewData.filter(function (item) { return item.Id === parseInt(event.draggedNodeData.id, 10); });
                    var cellData = this.scheduleObj.getCellDetails(event.target);
                    var resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
                    var eventData = {
                        Name: filteredData[0].Name,
                        StartTime: cellData.startTime,
                        EndTime: cellData.endTime,
                        IsAllDay: cellData.isAllDay,
                        Description: filteredData[0].Description,
                        DepartmentID: resourceDetails.resourceData.GroupId,
                        ConsultantID: resourceDetails.resourceData.Id
                    };
                    this.scheduleObj.openEditor(eventData, 'Add', true);
                    this.isTreeItemDropped = true;
                    this.draggedItemId = event.draggedNodeData.id;
                }
            }
        }
    };
    ExternalDragDrop.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper drag-sample-wrapper' },
                    React.createElement("div", { className: "schedule-container" },
                        React.createElement("div", { className: "title-container" },
                            React.createElement("h1", { className: "title-text" }, "Doctor's Appointments")),
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return _this.scheduleObj = schedule; }, cssClass: 'schedule-drag-drop', width: '100%', height: '650px', selectedDate: new Date(2018, 7, 1), currentView: 'TimelineDay', resourceHeaderTemplate: this.resourceHeaderTemplate.bind(this), eventSettings: {
                                dataSource: this.data,
                                fields: {
                                    subject: { title: 'Patient Name', name: 'Name' },
                                    startTime: { title: "From", name: "StartTime" },
                                    endTime: { title: "To", name: "EndTime" },
                                    description: { title: 'Reason', name: 'Description' }
                                }
                            }, group: { enableCompactView: false, resources: ['Departments', 'Consultants'] }, actionBegin: this.onActionBegin.bind(this), drag: this.onItemDrag.bind(this) },
                            React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'DepartmentID', title: 'Department', name: 'Departments', allowMultiple: false, dataSource: this.departmentData, textField: 'Text', idField: 'Id', colorField: 'Color' }),
                                React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ConsultantID', title: 'Consultant', name: 'Consultants', allowMultiple: false, dataSource: this.consultantData, textField: 'Text', idField: 'Id', groupIDField: "GroupId", colorField: 'Color' })),
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] }))),
                    React.createElement("div", { className: "treeview-container" },
                        React.createElement("div", { className: "title-container" },
                            React.createElement("h1", { className: "title-text" }, "Waiting List")),
                        React.createElement(ej2_react_navigations_1.TreeViewComponent, { ref: function (tree) { return _this.treeObj = tree; }, cssClass: 'treeview-external-drag', nodeTemplate: this.treeTemplate.bind(this), fields: this.fields, nodeDragStop: this.onTreeDragStop.bind(this), nodeDragging: this.onItemDrag.bind(this), allowDragAndDrop: this.allowDragAndDrops })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example illustrates how to drag and drop the events from an external source into scheduler. Here, you can drag and drop the items from TreeView control into scheduler.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, ",
                    React.createElement("code", null, "resourceHeaderTemplate"),
                    " is used to change the default appearance of the resource header column. Within the ",
                    React.createElement("code", null, "actionBegin"),
                    " event of scheduler, the dragged item from the TreeView control is removed, when it is being dragged and dropped onto the scheduler. When the item is being dropped onto the scheduler, the event editor is explicitly made to open with the target details by invoking the ",
                    React.createElement("code", null, "openEditor"),
                    " method of scheduler within the ",
                    React.createElement("code", null, "nodeDragStop"),
                    " event of TreeView."))));
    };
    return ExternalDragDrop;
}(sample_base_1.SampleBase));
exports.ExternalDragDrop = ExternalDragDrop;
