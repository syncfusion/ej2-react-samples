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
var property_pane_1 = require("../common/property-pane");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./tab.component.css");
var Responsive = /** @class */ (function (_super) {
    __extends(Responsive, _super);
    function Responsive() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Mapping DropDownList dataSource property
        _this.oData = [
            { 'value': 'top', 'text': 'Top' }, { 'value': 'bottom', 'text': 'Bottom' },
            { 'value': 'left', 'text': 'Left' }, { 'value': 'right', 'text': 'Right' }
        ];
        // Mapping DropDownList dataSource property
        _this.mData = [
            { 'value': 'scrollable', 'text': 'Scrollable' }, { 'value': 'popup', 'text': 'Popup' }
        ];
        // Mapping DropDownList fields property
        _this.fields = { text: 'text', value: 'value' };
        // Mapping DropDownList value property
        _this.mVal = 'scrollable';
        // Mapping DropDownList value property
        _this.orientVal = 'top';
        return _this;
    }
    // Change event funtion for DropDownList component   
    Responsive.prototype.changeOrientationMode = function (e) {
        var placement = document.getElementById('orientation').value;
        this.tabObj.headerPlacement = placement;
        this.tabObj.dataBind();
    };
    // Change event funtion for DropDownList component   
    Responsive.prototype.changeOverflowMode = function (e) {
        var placement = document.getElementById('mode').value;
        if (placement === 'Popup') {
            this.tabObj.overflowMode = 'Popup';
        }
        else {
            this.tabObj.overflowMode = 'Scrollable';
        }
        this.tabObj.dataBind();
    };
    Responsive.prototype.render = function () {
        var _this = this;
        var headertext;
        // Mapping Tab items Header property
        headertext = [{ text: "HTML" }, { text: "C Sharp(C#)" }, { text: "Java" }, { text: "VB.Net" }, { text: "Xamarin" },
            { text: "ASP.NET" }, { text: "ASP.NET MVC" }, { text: "JavaScript" }];
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section tab-control-section row' },
                React.createElement("div", { className: 'col-lg-8 control-section' },
                    React.createElement(ej2_react_navigations_1.TabComponent, { ref: function (tab) { _this.tabObj = tab; }, heightAdjustMode: 'None', height: '250px' },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: 'HyperText Markup Language, commonly referred to as HTML, is the standard markup ' +
                                    'language used to create web pages. Along with CSS, and JavaScript, HTML is a cornerstone ' +
                                    'technology, used by most websites to create visually engaging web pages, user interfaces ' +
                                    'for web applications, and user interfaces for many mobile applications.[1] Web browsers ' +
                                    'can read HTML files and render them into visible or audible web pages. HTML describes ' +
                                    'the structure of a website semantically along with cues for presentation, making it a ' +
                                    'markup language, rather than a programming language.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: 'C# is intended to be a simple, modern, general-purpose, object-oriented ' +
                                    'programming language. Its development team is led by Anders Hejlsberg. The most recent ' +
                                    'version is C# 5.0, which was released on August 15, 2012.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[2], content: 'Java is a set of computer software and specifications developed by Sun Microsystems, ' +
                                    'later acquired by Oracle Corporation, that provides a system for developing application ' +
                                    'software and deploying it in a cross-mobile phones to platform computing environment. Java ' +
                                    'is used in a wide variety of computing platforms from embedded devices and enterprise servers ' +
                                    'and supercomputers. While less common, Java applets run in secure, sandboxed environments to ' +
                                    'provide many features of native applications and can be embedded in HTML pages.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[3], content: 'The command-line compiler, VBC.EXE, is installed as part of the freeware .NET ' +
                                    'Framework SDK. Mono also includes a command-line VB.NET compiler. The most recent version ' +
                                    'is VB 2012, which was released on August 15, 2012.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[4], content: 'Xamarin is a San Francisco, California based software company created in May ' +
                                    '2011[3] by the engineers that created Mono,[4] Mono for Android and MonoTouch that are ' +
                                    'cross-platform implementations of the Common Language Infrastructure (CLI) and Common ' +
                                    'Language Specifications (often called Microsoft .NET). With a C#-shared codebase,developers ' +
                                    'can use Xamarin tools to write native Android, iOS, and Windows apps with native user interfaces ' +
                                    'and share code across multiple platforms.[5] Xamarin has over 1 million developers in more ' +
                                    'than 120 countries around the World as of May 2015.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[5], content: 'ASP.NET is an open-source server-side web application framework designed for web ' +
                                    'development to produce dynamic web pages. It was developed by Microsoft to allow programmers ' +
                                    'to build dynamic web sites, web applications and web services. It was first released in January ' +
                                    '2002 with version 1.0 of the .NET Framework, and is the successor to Microsoft\'\s Active Server ' +
                                    'Pages (ASP) technology. ASP.NET is built on the Common Language Runtime (CLR), allowing ' +
                                    'programmers to write ASP.NET code using any supported .NET language. The ASP.NET SOAP extension ' +
                                    'framework allows ASP.NET components to process SOAP messages.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[6], content: 'The ASP.NET MVC is a web application framework developed by Microsoft, which implements' +
                                    ' the model–view–controller (MVC) pattern. It is open-source software, apart from the ASP.NET Web ' +
                                    'Forms component which is proprietary. In the later versions of ASP.NET, ASP.NET MVC, ASP.NET Web ' +
                                    'API, and ASP.NET Web Pages (a platform using only Razor pages) will merge into a unified MVC 6. ' +
                                    'The project is called ASP.NET vNext.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[7], content: 'JavaScript (JS) is an interpreted computer programming language. It was originally ' +
                                    'implemented as part of web browsers so that client-side scripts could interact with the ' +
                                    'user, control the browser, communicate asynchronously, and alter the document content that ' +
                                    'was displayed.[5] More recently, however, it has become common in both game development ' +
                                    'and the creation of desktop applications.' })))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table' },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Mode")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'mode', width: '90%', dataSource: this.mData, fields: this.fields, value: this.mVal, change: this.changeOverflowMode.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Header Placement")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'orientation', dataSource: this.oData, fields: this.fields, value: this.orientVal, width: '90%', change: this.changeOrientationMode.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates both ",
                    React.createElement("code", null, "scrollable"),
                    " and ",
                    React.createElement("code", null, "popup"),
                    " modes of the ",
                    React.createElement("code", null, "Tab"),
                    ". Select option from down-down to change the responsive option in property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Tab"),
                    " is adaptable to the available space when the tab items exceed the view space."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Tab"),
                    " allows to place the header section inside the Tab component either at",
                    React.createElement("code", null, "top / bottom / left / right"),
                    " position by using ",
                    React.createElement("code", null, "headerPlacement"),
                    " property."),
                React.createElement("p", null,
                    "You can assign overflowMode property value as ",
                    React.createElement("code", null, "Scrollable / Popup"),
                    ". By default scrollable mode of tab is enabled when tab item exceeds the view range. In this sample, users can change the ",
                    React.createElement("code", null, "overflowMode"),
                    " by selecting the dropdown options."),
                React.createElement("p", null,
                    "More information about Tab can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/tab/getting-started/" }, "  documentation"),
                    " section."))));
    };
    return Responsive;
}(sample_base_1.SampleBase));
exports.Responsive = Responsive;
