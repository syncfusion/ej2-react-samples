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
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./accordion-navigation-menu.component.css");
// Splitter sample with accordion integration
var AccordionIntegration = (function (_super) {
    __extends(AccordionIntegration, _super);
    function AccordionIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ListData1 = [
            { text: "Grid", id: "1" },
            { text: "Schedule", id: "2" },
            { text: "Chart", id: "7" }
        ];
        _this.ListData2 = [
            { text: "Grid", id: "3" },
            { text: "Schedule", id: "4" },
            { text: "Chart", id: "8" }
        ];
        _this.ListData3 = [
            { text: "Grid", id: "5" },
            { text: "Schedule", id: "6" },
            { text: "Chart", id: "9" }
        ];
        return _this;
    }
    AccordionIntegration.prototype.rendereComplete = function () {
        this.list2.element.style.display = "none";
        this.list3.element.style.display = "none";
    };
    AccordionIntegration.prototype.expand = function (e) {
        if (e.isExpanded && [].indexOf.call(this.items, e.item) === 0) {
            if (e.element.querySelectorAll(".e-list-parent").length > 0) {
                return;
            }
        }
        if (e.isExpanded && [].indexOf.call(this.items, e.item) === 1) {
            if (e.element.querySelectorAll(".e-list-parent").length > 0) {
                return;
            }
        }
        if (e.isExpanded && [].indexOf.call(this.items, e.item) === 2) {
            if (e.element.querySelectorAll(".e-list-parent").length > 0) {
                return;
            }
        }
    };
    AccordionIntegration.prototype.onSelect = function (e) {
        var _this = this;
        var listid = e.item.dataset.uid;
        switch (listid) {
            case "1":
                var ajax = new ej2_base_1.Ajax("./src/splitter/aspnet-grid-ajax.html", "GET", true);
                ajax.send().then();
                ajax.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "2":
                var ajax1 = new ej2_base_1.Ajax("./src/splitter/aspnet-schedule-ajax.html", "GET", true);
                ajax1.send().then();
                ajax1.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "3":
                var ajax2 = new ej2_base_1.Ajax("./src/splitter/aspnetmvc-grid-ajax.html", "GET", true);
                ajax2.send().then();
                ajax2.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "4":
                var ajax3 = new ej2_base_1.Ajax("./src/splitter/aspnetmvc-schedule-ajax.html", "GET", true);
                ajax3.send().then();
                ajax3.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "5":
                var ajax4 = new ej2_base_1.Ajax("./src/splitter/javascript-grid-ajax.html", "GET", true);
                ajax4.send().then();
                ajax4.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "6":
                var ajax5 = new ej2_base_1.Ajax("./src/splitter/javascript-schedule-ajax.html", "GET", true);
                ajax5.send().then();
                ajax5.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "7":
                var ajax6 = new ej2_base_1.Ajax("./src/splitter/aspnet-chart-ajax.html", "GET", true);
                ajax6.send().then();
                ajax6.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "8":
                var ajax7 = new ej2_base_1.Ajax("./src/splitter/aspnetmvc-chart-ajax.html", "GET", true);
                ajax7.send().then();
                ajax7.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
            case "9":
                var ajax8 = new ej2_base_1.Ajax("./src/splitter/javascript-chart-ajax.html", "GET", true);
                ajax8.send().then();
                ajax8.onSuccess = function (data) {
                    _this.splitterInstance.paneSettings[1].content = data;
                };
                break;
        }
    };
    AccordionIntegration.prototype.expanding = function (e) {
        var index = e.index;
        switch (index) {
            case 0:
                this.splitterInstance.paneSettings[1].content =
                    "<div class = 'accordion-splitter-content'><h4>About ASP.NET</h4>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface.</div>";
                break;
            case 1:
                this.splitterInstance.paneSettings[1].content =
                    "<div class = 'accordion-splitter-content'> <h4>About ASP.NET MVC</h4>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications. The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages.</div>";
                break;
            case 2:
                this.splitterInstance.paneSettings[1].content =
                    "<div class = 'accordion-splitter-content'> <h4>About JavaScript</h4>JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications.</div>";
                break;
        }
    };
    AccordionIntegration.prototype.accordionElement = function () {
        var _this = this;
        return (React.createElement(ej2_react_navigations_1.AccordionComponent, { id: "split_pane1", ref: function (accordion) { return (_this.accordionInstance = accordion); }, expanding: this.expanding.bind(this), expanded: this.expand.bind(this) },
            React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: "ASP.NET", content: this.splitlist1.bind(this), expanded: true }),
                React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: "ASP.NET MVC", content: this.splitlist2.bind(this) }),
                React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: "JavaScript", content: this.splitlist3.bind(this) }))));
    };
    ;
    AccordionIntegration.prototype.splitlist1 = function () {
        return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "split-list1", dataSource: this.ListData1, select: this.onSelect.bind(this) }));
    };
    ;
    AccordionIntegration.prototype.splitlist2 = function () {
        var _this = this;
        return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "split-list2", ref: function (listview) { _this.list2 = listview; }, dataSource: this.ListData2, select: this.onSelect.bind(this) }));
    };
    ;
    AccordionIntegration.prototype.splitlist3 = function () {
        var _this = this;
        return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "split-list3", ref: function (listview) { _this.list3 = listview; }, dataSource: this.ListData3, select: this.onSelect.bind(this) }));
    };
    ;
    AccordionIntegration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "accordionSplitter", className: "control-section" },
            React.createElement("div", { id: "splitter-01", className: "splitter-custom" },
                React.createElement(ej2_react_layouts_1.SplitterComponent, { height: "288px", width: "100%", ref: function (splitter) { return (_this.splitterInstance = splitter); } },
                    React.createElement(ej2_react_layouts_1.PanesDirective, null,
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "35%", min: "30%", content: this.accordionElement.bind(this) }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: "65%", min: "45%" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the Accordion control that can be integrated within the split pane. Select the product from the left pane to display the corresponding product details on the right pane.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Splitter is the layout user interface (UI) control and allows integrating other JavaScript UI controls within its pane. In this sample, the Splitter control is used to design navigation menu-like application using JavaScript Accordion control. The Accordion control is integrated within left pane to display the product menu and selected product details on right pane."))));
    };
    return AccordionIntegration;
}(sample_base_1.SampleBase));
exports.AccordionIntegration = AccordionIntegration;
