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
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./card.component.css");
// tslint:disable:max-line-length
// *  Sample for CSS Basic Layout Cards.
function swipeable() {
    var fanStructuteCard = document.querySelectorAll('#horizontal_product .e-card');
    var len = fanStructuteCard.length;
    [].slice.call(fanStructuteCard).forEach(function (ele) {
        ele.style.removeProperty('transform');
    });
    var transformRatio = 2;
    var temp;
    var divide = (parseInt((len / 2).toString(), 10));
    temp = transformRatio;
    for (var i = divide - 1; i >= 0; i--) {
        fanStructuteCard[i].style.transform = 'rotate(' + (temp) + 'deg)';
        temp += transformRatio;
    }
    transformRatio = 2;
    temp = transformRatio;
    for (var i = divide + 1; i < len; i++) {
        fanStructuteCard[i].style.transform = 'rotate(' + (-temp) + 'deg)';
        temp += transformRatio;
    }
}
var Swipeable = (function (_super) {
    __extends(Swipeable, _super);
    function Swipeable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Swipeable.prototype.rendereComplete = function () {
        var ele = document.getElementById('horizontal_product');
        swipeable();
        new ej2_base_1.Touch(ele, { swipe: this.touchSwipeHandler });
        var cards = document.querySelectorAll('#horizontal_product .e-card');
        [].slice.call(cards).forEach(function (ele) {
            ele.querySelector('img').onmousedown = function () { return false; };
        });
    };
    Swipeable.prototype.touchSwipeHandler = function (e) {
        var ele = ej2_base_1.closest(e.originalEvent.target, '.e-card');
        if (ej2_base_1.isNullOrUndefined(ele)) {
            return;
        }
        if (ele.parentElement.querySelector('.card-out')) {
            ele.parentElement.querySelector('.card-out').classList.remove('card-out');
        }
        if (ele.parentElement.querySelector('.card-out-left')) {
            ele.parentElement.querySelector('.card-out-left').classList.remove('card-out-left');
        }
        if (e.swipeDirection === 'Right') {
            ele.classList.add('card-out');
        }
        else if (e.swipeDirection === 'Left') {
            ele.classList.add('card-out-left');
        }
        else {
            return;
        }
        ele.parentElement.insertBefore(ele, ele.parentElement.children[0]);
        swipeable();
        ele.style.removeProperty('left');
    };
    Swipeable.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section card-control-section swipe_card_layout' },
                React.createElement("div", { className: "e-card-resize-container" },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "row card-layout" },
                            React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6", id: "horizontal_product" },
                                React.createElement("div", { className: "e-card e-card-horizontal" },
                                    React.createElement("img", { src: './src/card/images/newyork.png', style: { height: '214px' } }),
                                    React.createElement("div", { className: 'e-card-stacked' },
                                        React.createElement("div", { className: "e-card-content", style: { height: '175px' } }, "New York City has been described as the cultural, financial, and media capital of the world, and exerts a significant impact upon commerce and etc..."),
                                        React.createElement("div", { className: "e-card-actions" },
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-fav-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-like-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-share-icon cb-icons " }))))),
                                React.createElement("div", { className: "e-card e-card-horizontal" },
                                    React.createElement("img", { src: './src/card/images/malaysia.png', style: { height: '214px' } }),
                                    React.createElement("div", { className: 'e-card-stacked' },
                                        React.createElement("div", { className: "e-card-content", style: { height: '175px' } }, "Malaysia is one of the Southeast Asian countries, on a peninsula of the Asian continent, to a certain extent; it can be recognized as part of the Asian continent."),
                                        React.createElement("div", { className: "e-card-actions" },
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-fav-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-like-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-share-icon cb-icons " }))))),
                                React.createElement("div", { className: "e-card e-card-horizontal" },
                                    React.createElement("img", { src: './src/card/images/eiffeltower.png', style: { height: '214px' } }),
                                    React.createElement("div", { className: 'e-card-stacked' },
                                        React.createElement("div", { className: "e-card-content", style: { height: '175px' } }, "The Eiffel Tower is acknowledged as the universal symbol of Paris and France. It was originally designed by \u00C9mile Nouguier and Maurice Koechlin."),
                                        React.createElement("div", { className: "e-card-actions" },
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-fav-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-like-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-share-icon cb-icons " }))))),
                                React.createElement("div", { className: "e-card e-card-horizontal" },
                                    React.createElement("img", { src: './src/card/images/sydney.png', style: { height: '214px' } }),
                                    React.createElement("div", { className: 'e-card-stacked' },
                                        React.createElement("div", { className: "e-card-content", style: { height: '175px' } }, "Sydney is a city on the east coast of Australia. Sydney is the capital city of New South Wales. About four million people live in Sydney which makes it the biggest city in Oceania."),
                                        React.createElement("div", { className: "e-card-actions" },
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-fav-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-like-icon cb-icons " })),
                                            React.createElement("button", { style: { padding: '0px', border: '0px', height: '24px', width: '24px' } },
                                                React.createElement("span", { className: "e-share-icon cb-icons " }))))))))),
                React.createElement("div", { id: 'source_link' },
                    "Source: \u00A0",
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { href: "https://wikitravel.org/en/Malaysia", target: '_blank' }, "https://wikitravel.org/en/Malaysia"))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { href: "https://wikitravel.org/en/Sydney", target: '_blank' }, "https://wikitravel.org/en/Sydney"))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Eiffel_Tower", target: '_blank' }, "https://en.wikipedia.org/wiki/Eiffel_Tower"))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { href: "https://wikitravel.org/en/New_York_City", target: '_blank' }, "https://wikitravel.org/en/New_York_City")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates",
                    React.createElement("code", null, "card"),
                    " rendering with stacked layout. You can swipe the card in left or right direction to move the first card to last position.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The sample illustrates stacked collection of card overlapping each other, which can be bound to swipe actions to move cards one after the other. CSS animation is used to achieve swiping on every left or right swipe.",
                    React.createElement("p", null,
                        "More information about Card can be found in this",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/card/getting-started/" }, "documentation"),
                        " section. ")))));
    };
    return Swipeable;
}(sample_base_1.SampleBase));
exports.Swipeable = Swipeable;
