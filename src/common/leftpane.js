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
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_list_1 = require("./sample-list");
var index_1 = require("./index");
var component_content_1 = require("./component-content");
var isMobile;
var isTablet;
var isPc;
var sampleOrder = [];
var controlSampleData = {};
function viewSwitch(from, to, reverse) {
    var anim = new ej2_base_1.Animation({ duration: 500, timingFunction: 'ease' });
    var controlSamples = ej2_base_1.select('#controlSamples');
    controlSamples.classList.add('control-samples-animate');
    from.style.overflowY = 'hidden';
    to.style.overflowY = 'hidden';
    to.classList.remove('sb-hide');
    anim.animate(from, {
        name: reverse ? 'SlideRightOut' : 'SlideLeftOut', end: function () {
            controlSamples.classList.remove('control-samples-animate');
            from.style.overflowY = '';
            to.style.overflowY = '';
            from.classList.add('sb-hide');
        }
    });
    anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
}
function showHideControlTree() {
    var controlTree = ej2_base_1.select('#controlTree');
    var controlList = ej2_base_1.select('#controlSamples');
    var reverse = controlTree.classList.contains('sb-hide');
    reverse ? viewSwitch(controlList, controlTree, reverse) : viewSwitch(controlTree, controlList, reverse);
}
function setSelectList() {
    var hash = location.hash.split('/');
    var list = ej2_base_1.select('#controlList').ej2_instances[0];
    var control = ej2_base_1.select('[control-name="' + hash[2] + '"]') || ej2_base_1.select('[control-name="grid"]');
    if (control) {
        var data = list.dataSource;
        var samples = controlSampleData[control.getAttribute('control-name')];
        if (JSON.stringify(data) !== JSON.stringify(samples)) {
            list.dataSource = samples;
        }
        var selectSample = ej2_base_1.select('[data-path="' + '/' + hash.slice(2).join('/') + '"]', ej2_base_1.select('#controlList'));
        if (selectSample) {
            if (!ej2_base_1.select('#controlTree').classList.contains('sb-hide')) {
                showHideControlTree();
            }
            list.selectItem(selectSample);
        }
    }
    else {
        if (ej2_base_1.select('#controlList').classList.contains('sb-hide')) {
            showHideControlTree();
        }
        list.selectItem(ej2_base_1.select('[data-path="/grid/overview"]'));
    }
}
exports.setSelectList = setSelectList;
var LeftPane = /** @class */ (function (_super) {
    __extends(LeftPane, _super);
    function LeftPane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Data Source for TreeView and ListView
         */
        _this.controlSampleData = {};
        _this.samplesTreeList = _this.getTreeviewList(_this.getDataSource());
        /**
         * TreeView Configuration
         */
        _this.treeFields = { dataSource: _this.samplesTreeList, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', htmlAttributes: 'url', sortOrder: 'order' };
        /**
         * ListView Configuration
         */
        _this.fields = { id: 'id', text: 'name', groupBy: 'order', htmlAttributes: 'data' };
        _this.nodeTemplate = '<div><span class="tree-text">${name}</span>' +
            '${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">Updated</span>' +
            '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">${type}</span>${/if}${/if}</div>';
        _this.groupTemlate = '${if(items[0]["category"])}<div class="e-text-content">' +
            '<span class="e-list-text">${items[0].category}</span></div>${/if}';
        _this.template = '<div class="e-text-content ${if(type)}e-icon-wrapper${/if}"> <span class="e-list-text" role="listitem">${name}' +
            '</span>${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type}">Updated</span>' +
            '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type}">${type}</span>${/if}${/if}' +
            '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>';
        return _this;
    }
    LeftPane.prototype.componentWillMount = function () { };
    LeftPane.prototype.componentDidMount = function () {
        ej2_base_1.select('#sb-left-back').addEventListener('click', showHideControlTree);
    };
    LeftPane.prototype.rendereComplete = function () {
    };
    LeftPane.prototype.getDataSource = function () {
        if (ej2_base_1.Browser.isDevice) {
            var tempData = ej2_base_1.extend([], sample_list_1.samplesList);
            var tempLists = [];
            for (var _i = 0, tempData_1 = tempData; _i < tempData_1.length; _i++) {
                var temp = tempData_1[_i];
                if (temp.hideOnDevice == true) {
                    continue;
                }
                var data = new ej2_data_1.DataManager(temp.samples);
                temp.samples = data.executeLocal(new ej2_data_1.Query().where('hideOnDevice', 'notEqual', true));
                tempLists = tempLists.concat(temp);
            }
            return tempLists;
        }
        return sample_list_1.samplesList;
    };
    /**
     * TreeView Data Source Function
     */
    LeftPane.prototype.getTreeviewList = function (list) {
        var id = 1;
        var pid;
        var tempList = [];
        var category = '';
        var categories = [];
        var order = {};
        categories = ej2_data_1.DataUtil.distinct(list, 'category');
        for (var j = 0; j < categories.length; j++) {
            tempList = tempList.concat({ id: id, name: categories[j], order: j, hasChild: true, expanded: true });
            pid = id;
            for (var k = 0; k < list.length; k++) {
                if (list[k].category === categories[j]) {
                    id += 1;
                    tempList = tempList.concat({
                        id: id,
                        pid: pid,
                        name: list[k].name,
                        type: list[k].type,
                        url: {
                            'data-path': '/' + list[k].samples[0].path,
                            'control-name': list[k].path,
                            'name': list[k].name
                        }
                    });
                    this.controlSampleData[list[k].path] = this.getSamples(list[k].samples);
                    controlSampleData = this.controlSampleData;
                }
            }
        }
        window.sampleOrder = sampleOrder;
        return tempList;
    };
    /**
     * ListView Data Source Function
     */
    LeftPane.prototype.getSamples = function (samples) {
        var tempSamples = [];
        for (var i = 0; i < samples.length; i++) {
            tempSamples[i] = samples[i];
            tempSamples[i].data = { 'sample-name': samples[i].name, 'data-path': '/' + samples[i].path };
            tempSamples[i].id = i.toString();
            sampleOrder.push(samples[i].path);
        }
        return tempSamples;
    };
    LeftPane.prototype.controlListRefresh = function (ele) {
        var samples = this.controlSampleData[ele.getAttribute('control-name')];
        if (samples) {
            var listView = ej2_base_1.select('#controlList').ej2_instances[0];
            listView.dataSource = samples;
            showHideControlTree();
        }
    };
    LeftPane.prototype.controlSelect = function (arg) {
        component_content_1.selectDefaultTab();
        var path = (arg.node || arg.item).getAttribute('data-path');
        var curHashCollection = '/' + location.hash.split('/').slice(2).join('/');
        if (path) {
            this.controlListRefresh(arg.node || arg.item);
            if (path !== curHashCollection) {
                isMobile = window.matchMedia('(max-width:550px)').matches;
                isTablet = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
                isPc = window.matchMedia('(min-width:850px)').matches;
                index_1.sampleOverlay();
                var theme_1 = location.hash.split('/')[1] || 'material';
                if (arg.item && ((isMobile && !ej2_base_1.select('#left-sidebar').classList.contains('sb-hide')) ||
                    ((isTablet || (ej2_base_1.Browser.isDevice && isPc)) && index_1.isLeftPaneOpen()))) {
                    index_1.toggleLeftPane();
                }
                setTimeout(function () { location.hash = '#/' + theme_1 + path; }, 600);
            }
        }
    };
    LeftPane.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'sb-control-navigation' },
            React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: 'controlTree', cssClass: "sb-hide", nodeClicked: this.controlSelect = this.controlSelect.bind(this), className: 'e-view', fields: this.treeFields, nodeTemplate: this.nodeTemplate, ref: function (t) { return _this.treeControl = t; } }),
            React.createElement("div", { id: "controlSamples", className: "e-view" },
                React.createElement("div", { id: "sb-left-back", className: "back" },
                    React.createElement("div", { className: "sb-icons sb-icon-Back" }),
                    React.createElement("div", { className: 'control-name' }, "All Controls")),
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'controlList', select: this.controlSelect, actionComplete: setSelectList, className: 'e-view sb-control-list-top', fields: this.fields, dataSource: this.controlSampleData[location.hash.split('/')[2]] || this.controlSampleData.grid, groupTemplate: this.groupTemlate, template: this.template, ref: function (l) { return _this.listControl = l; } }))));
    };
    return LeftPane;
}(React.Component));
exports.LeftPane = LeftPane;
