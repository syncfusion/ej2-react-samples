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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        var headertext;
        // Mapping Tab items Header property
        headertext = [{ text: "Twitter", 'iconCss': 'e-twitter' },
            { text: "Facebook", 'iconCss': 'e-facebook' }, { text: "WhatsApp", 'iconCss': 'e-whatsapp' }];
        function tabContent1() {
            return (React.createElement("div", null, "Twitter is an online social networking service that enables users to send and read short 140-character messages called 'tweets'. Registered users can read and post tweets, but those who are unregistered can only read them. Users access Twitter through the website interface, SMS or mobile device app Twitter Inc. is based in San Francisco and has more than 25 offices around the world. Twitter was created in March 2006 by Jack Dorsey, Evan Williams, Biz Stone, and Noah Glass and launched in July 2006. The service rapidly gained worldwide popularity, with more than 100 million users posting 340 million tweets a day in 2012.The service also handled 1.6 billion search queries per day."));
        }
        function tabContent2() {
            return (React.createElement("div", null, "Facebook is an online social networking service headquartered in Menlo Park, California. Its website was launched on February 4, 2004, by Mark Zuckerberg with his Harvard College roommates and fellow students Eduardo Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.The founders had initially limited the website's membership to Harvard students, but later expanded it to colleges in the Boston area, the Ivy League, and Stanford University. It gradually added support for students at various other universities and later to high-school students."));
        }
        function tabContent3() {
            return (React.createElement("div", null, "WhatsApp Messenger is a proprietary cross-platform instant messaging client for smartphones that operates under a subscription business model. It uses the Internet to send text messages, images, video, user location and audio media messages to other users using standard cellular mobile numbers. As of February 2016, WhatsApp had a user base of up to one billion,[10] making it the most globally popular messaging application. WhatsApp Inc., based in Mountain View, California, was acquired by Facebook Inc. on February 19, 2014, for approximately US$19.3 billion."));
        }
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section tab-control-section' },
                React.createElement(ej2_react_navigations_1.TabComponent, { heightAdjustMode: 'Auto', id: 'defaultTab' },
                    React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: tabContent1 }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: tabContent2 }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[2], content: tabContent3 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default functionalities of the ",
                    React.createElement("code", null, "Tab"),
                    ". Click on the ",
                    React.createElement("code", null, "header"),
                    "  element to activate the corresponding Tab, and displays its ",
                    React.createElement("code", null, "content"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Tab"),
                    " is a content panel to show multiple contents in specific space one at a time."),
                React.createElement("p", null,
                    "The default sample illustrates to render simple Tab by defining header and content as ",
                    React.createElement("code", null, "items"),
                    " collections."),
                React.createElement("p", null,
                    "More information about Tab can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/tab/getting-started/" }, " documentation"),
                    " section."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
