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
var ReactDOM = require("react-dom");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var data_source_1 = require("./data-source");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./card.component.css");
var card;
var cardEle;
var cardObj = data_source_1.cardBook;
var data = [];
var multiSelectData = [];
var searchData = [];
var searchValCount = 0;
var filterCategory = [{ Name: 'Client-Side', Code: 'client' }, { Name: 'Server-Side', Code: 'server' }, { Name: 'Front-End', Code: 'ui' }];
var emptyData = true;
/*  Initialize MultiSelect component */
var multiselectComp;
function cardRendering(cardObj) {
    var errorContent = document.querySelector('.tile_layout .row.error');
    if (cardObj.length > 0) {
        errorContent.style.display = 'none';
        cardObj.forEach(function (data, index) {
            cardEle = document.getElementById('card_sample_' + (++index));
            if (cardEle) {
                ReactDOM.render(React.createElement(CardRender, { data: data }), cardEle);
            }
        });
    }
    else {
        errorContent.style.display = 'flex';
    }
}
/* Funtion for Destroying Cards */
function destroyAllCard() {
    var cards = document.querySelectorAll('.card-control-section .e-card');
    [].slice.call(cards).forEach(function (el) {
        ReactDOM.unmountComponentAtNode(el.parentElement);
    });
}
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tile.prototype.rendereComplete = function () {
        var _this = this;
        multiselectComp = new ej2_dropdowns_1.MultiSelect({
            // set the local data to dataSource property
            dataSource: filterCategory,
            // map the appropriate columns to fields property
            fields: { text: 'Name', value: 'Code' },
            // set the placeholder to MultiSelect input element
            placeholder: 'Search by categories',
            select: this.multiSelectFun,
            removed: this.multiSelectRemove,
        });
        multiselectComp.appendTo('#local');
        cardRendering(cardObj);
        document.getElementById('search_Card').onkeyup = function (e) {
            if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && emptyData)) {
                return;
            }
            var inputVal = e.target.value;
            inputVal.length === 0 ? emptyData = true : emptyData = false;
            _this.searchFilter(inputVal);
        };
    };
    /* Remove event function for multiSelect component */
    Tile.prototype.multiSelectRemove = function (e) {
        var cardDa = searchData.length > 0 ? searchData : (multiSelectData.length > 0 ? multiSelectData : cardObj);
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = cardDa;
            destroyAllCard();
            cardRendering(cardObj);
        }
        else if (multiselectComp.value.length === 0 && searchValCount > 0) {
            this.searchFilter(document.getElementById('search_Card').value);
        }
        else if (multiselectComp.value.length === 0) {
            destroyAllCard();
            multiSelectData = cardDa;
            cardRendering(cardDa);
        }
        else {
            var keywords = e.itemData.Code.split(',');
            var dublicate_1;
            keywords.forEach(function (key) {
                dublicate_1 = new ej2_data_1.DataManager(cardObj).executeLocal(new ej2_data_1.Query().where('cardImage.tag', 'Contains', key, true));
                dublicate_1.forEach(function (da) {
                    if (cardDa.indexOf(da) !== -1) {
                        cardDa.splice(cardDa.indexOf(da), 1);
                    }
                });
                multiSelectData = cardDa;
            });
            destroyAllCard();
            cardRendering(multiSelectData);
        }
    };
    Tile.prototype.multiSelectFun = function (e) {
        var keywords = e.itemData.Code.split(',');
        var dublicate;
        var cardDa = searchData.length > 0 ? searchData : cardObj;
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = [];
        }
        keywords.forEach(function (key) {
            dublicate = new ej2_data_1.DataManager(cardDa).executeLocal(new ej2_data_1.Query().where('cardImage.tag', 'Contains', key, true));
            if (dublicate.length === 0) {
                multiSelectData = [];
                destroyAllCard();
                return;
            }
            dublicate.forEach(function (da) {
                if (multiSelectData.indexOf(da) === -1) {
                    multiSelectData.push(da);
                }
            });
        });
        destroyAllCard();
        cardRendering(multiSelectData);
    };
    /* Function for Filtering Cards */
    Tile.prototype.searchFilter = function (key) {
        searchValCount = key.length;
        var predicate = new ej2_data_1.Predicate('cardContent', 'Contains', key, true);
        predicate = predicate.or('cardImage.title', 'Contains', key, true).or('header_title', 'Contains', key, true).or('header_subtitle', 'Contains', key, true);
        var cardDa = (multiSelectData.length > 0 && multiselectComp.value.length > 0) ? multiSelectData : cardObj;
        searchData = data = new ej2_data_1.DataManager(cardDa).executeLocal(new ej2_data_1.Query().where(predicate));
        destroyAllCard();
        cardRendering(data);
    };
    Tile.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section card-control-section tile_layout" },
                React.createElement("div", { className: "row filter" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", required: true, id: "search_Card" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text", style: { fontSize: '14px' } }, "Enter text to search"))),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 tile_search" },
                        React.createElement("input", { type: "text", id: "local" }))),
                React.createElement("div", { className: 'row e-card-layout', style: { textAlign: 'center' } },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "row error", style: { display: 'none', minHeight: '150px' } },
                            React.createElement("div", { className: "e-error-content", style: { margin: 'auto', height: 'inherit', fontSize: '18px', fontWeight: 500, color: 'inherit' } }, "No results found. Please try a different search.")),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_1', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_2', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_3', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_4', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_5', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_6', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_7', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_8', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_9', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_10', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_11', className: 'card_sample' })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: 'card_sample_12', className: 'card_sample' })))),
                React.createElement("div", { id: 'source_link' },
                    "Source: \u00A0",
                    React.createElement("a", { href: "https://www.syncfusion.com/ebooks/", target: '_blank' }, "https://www.syncfusion.com/ebooks"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates filter and search of the ",
                    React.createElement("code", null, "card"),
                    " based on categories, and text containing the card. You can use search box to search cards, and you can filter choosing categories in multi-select component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Card is a small container in which user can show defined content in specific structure and it is flexible and extensible. This sample demonstrates to render the",
                    React.createElement("code", null, "Card"),
                    " Using",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/common/template-engine/" }, " Template Engine"),
                    " and it can be filtered based on",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/data/getting-started/" }, "data Manager"),
                    ".",
                    React.createElement("p", null,
                        " More information about Card can be found in this",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/card/getting-started/" }, "documentation"),
                        " section. ")))));
    };
    return Tile;
}(sample_base_1.SampleBase));
exports.Tile = Tile;
var CardRender = /** @class */ (function (_super) {
    __extends(CardRender, _super);
    function CardRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headerTitleSubCheck = _this.props.data.header_title.length > 0 || _this.props.data.header_subtitle.length > 0;
        _this.headerCheck = _this.props.data.header_title.length > 0 || _this.props.data.header_subtitle.length > 0 || _this.props.data.header_img.length > 0;
        _this.bgimageUrl = "url(" + _this.props.data.cardImage.url + ")";
        return _this;
    }
    CardRender.prototype.render = function () {
        return (React.createElement("div", { className: this.props.data.isHorizontal ? 'e-card e-card-horizontal' : 'e-card' },
            this.props.data.cardImage && React.createElement("div", { className: 'e-card-image', style: { backgroundImage: this.bgimageUrl } },
                " ",
                this.props.data.cardImage.title && React.createElement("div", { className: 'e-card-title' }, this.props.data.cardImage.title),
                " "),
            this.props.data.cardTitle && React.createElement("div", { className: 'e-card-title' }, this.props.data.cardTitle),
            this.headerCheck &&
                React.createElement("div", { className: 'e-card-header' },
                    this.props.data.header_img && React.createElement("div", { className: this.props.data.header_img.isRounded ? 'e-card-header-image e-card-corner' : 'e-card-header-image e-card-corner' }),
                    this.headerTitleSubCheck &&
                        React.createElement("div", { className: 'e-card-header-caption' },
                            this.props.data.header_title && React.createElement("div", { className: 'e-card-header-title' }, this.props.data.header_title),
                            this.props.data.header_subtitle && React.createElement("div", { className: 'e-card-sub-title' }, this.props.data.header_subtitle))),
            this.props.data.cardContent && React.createElement("div", { className: 'e-card-content' }, this.props.data.cardContent),
            this.props.data.card_action_btn &&
                React.createElement("div", { className: this.props.data.card_action_btn.isVertical ? 'e-card-actions e-card-vertical' : 'e-card-actions' }, this.props.data.card_action_btn.action_btns.map(function (actBtn) {
                    return actBtn.tag === "a" ? React.createElement("a", { key: actBtn.text, href: actBtn.href, target: actBtn.target, className: 'e-btn e-outline e-primary' },
                        " ",
                        actBtn.text) : React.createElement("button", { key: actBtn.text, className: 'e-card-btn' }, actBtn.text);
                }))));
    };
    return CardRender;
}(React.Component));
