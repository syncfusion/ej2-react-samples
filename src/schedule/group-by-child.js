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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule resources group-bychild sample
 */
var GroupByChild = /** @class */ (function (_super) {
    __extends(GroupByChild, _super);
    function GroupByChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.resourceTeamData, null, true);
        _this.projectData = [
            { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
            { text: 'PROJECT 2', id: 2, color: '#56ca85' }
        ];
        _this.categoryData = [
            { text: 'Development', id: 1, color: '#1aaa55' },
            { text: 'Testing', id: 2, color: '#7fa900' }
        ];
        return _this;
    }
    GroupByChild.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'group-bychild', width: '100%', height: '650px', selectedDate: new Date(2018, 5, 5), currentView: 'WorkWeek', startHour: '09:00', endHour: '19:00', eventSettings: {
                            dataSource: this.data, fields: {
                                subject: { title: 'Summary', name: 'Subject' },
                                description: { title: 'Comments', name: 'Description' }
                            }
                        }, group: { byGroupID: false, resources: ['Projects', 'Categories'] } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ProjectId', title: 'Choose Project', name: 'Projects', allowMultiple: false, dataSource: this.projectData, textField: 'text', idField: 'id', colorField: 'color' }),
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'CategoryId', title: 'Category', name: 'Categories', allowMultiple: true, dataSource: this.categoryData, textField: 'text', idField: 'id', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo illustrates the work progress under two different projects which are categorized as \u201CDevelopment\u201D and \u201CTesting\u201D, since both the projects comes across the two common stages.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, there are two resource levels defined under the",
                    React.createElement("code", null, "resources"),
                    " property \u2013 one with the name",
                    React.createElement("code", null, "Projects"),
                    " and other with the name",
                    React.createElement("code", null, "Categories"),
                    " respectively. Also, both the names are defined in the",
                    React.createElement("code", null, "group"),
                    " property to allow two level hierarchical grouping. The order of grouping depends on the order of names passed onto the",
                    React.createElement("code", null, "resources"),
                    " option within",
                    React.createElement("code", null, "group"),
                    ". The requirement here is to categorize the sub-options that are common to both the projects and therefore to enable such grouping, it is necessary to set",
                    React.createElement("code", null, "byGroupID"),
                    " option within the",
                    React.createElement("code", null, "groupID"),
                    " \u2013 whereby allowing all the resources available in each child level to group under its parent resources. With this option available, we can avoid the need to provide multiple definitions of the same data to be grouped under different parent."),
                React.createElement("p", null,
                    "Also, the colors defined at the last level resources will get applied to the events of those resources by default. In case, if the colors of parent level needs to be applied to child events, then it is necessary to define the",
                    React.createElement("code", null, "resourceColorField"),
                    " option within the",
                    React.createElement("code", null, "eventSettings"),
                    " property\u00A0with the parent level resource name value."))));
    };
    return GroupByChild;
}(sample_base_1.SampleBase));
exports.GroupByChild = GroupByChild;
