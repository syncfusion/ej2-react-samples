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
require("./timeline-resource-grouping.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule timeline resource grouping sample
 */
var TimelineGrouping = (function (_super) {
    __extends(TimelineGrouping, _super);
    function TimelineGrouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.resourceData.concat(dataSource.timelineResourceData), null, true);
        _this.projectData = [
            { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
            { text: 'PROJECT 2', id: 2, color: '#56ca85' },
            { text: 'PROJECT 3', id: 3, color: '#df5286' }
        ];
        _this.categoryData = [
            { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
            { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
            { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
            { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
            { text: 'Micheal', id: 5, groupId: 3, color: '#df5286' },
            { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
        ];
        return _this;
    }
    TimelineGrouping.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'timeline-resource-grouping', width: '100%', height: '650px', selectedDate: new Date(2018, 3, 4), currentView: 'TimelineWeek', eventSettings: {
                            dataSource: this.data
                        }, group: { resources: ['Projects', 'Categories'] } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ProjectId', title: 'Choose Project', name: 'Projects', allowMultiple: false, dataSource: this.projectData, textField: 'text', idField: 'id', colorField: 'color' }),
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Category', name: 'Categories', allowMultiple: true, dataSource: this.categoryData, textField: 'text', idField: 'id', groupIDField: 'groupId', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo showcases how the multiple resources are grouped as well as how the events are portrayed in timeline view layouts.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In the timeline view, each row depicts a single resource whereas in vertical views, each resource are grouped parallelly as columns. Here, the resource grouping follows the tree-view like hierarchical grouping structure and can contain any level of child resources. In this sample, we have used two level hierarchy, where the",
                    React.createElement("code", null, "PROJECT 1"),
                    " and",
                    React.createElement("code", null, "PROJECT 2"),
                    " are the parent level and the",
                    React.createElement("code", null, "development"),
                    " and",
                    React.createElement("code", null, "testing"),
                    " are child level resources which are defined using the",
                    React.createElement("code", null, "resources"),
                    " property. They are grouped in layout by making use of the",
                    React.createElement("code", null, "group"),
                    " property and its order of grouping depends on the order of names passed onto the",
                    React.createElement("code", null, "resources"),
                    " option within",
                    React.createElement("code", null, "group"),
                    "."),
                React.createElement("p", null,
                    "Also, the colors defined for the child level resources will get applied to the events of those resources by default. In case, if the colors of parent level needs to be applied to those child events, then it is necessary to define the",
                    React.createElement("code", null, "resourceColorField"),
                    " option within the",
                    React.createElement("code", null, "eventSettings"),
                    " property with the parent level resource name value."))));
    };
    return TimelineGrouping;
}(sample_base_1.SampleBase));
exports.TimelineGrouping = TimelineGrouping;
