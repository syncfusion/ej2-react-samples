"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var character_formatting_1 = require("./character-formatting");
var paragraph_formatting_1 = require("./paragraph-formatting");
var styles_1 = require("./styles");
var bullets_and_numbering_1 = require("./bullets-and-numbering");
var links_and_bookmarks_1 = require("./links-and-bookmarks");
var table_formatting_1 = require("./table-formatting");
var section_formatting_1 = require("./section-formatting");
var headers_and_footers_1 = require("./headers-and-footers");
var table_of_contents_1 = require("./table-of-contents");
var print_1 = require("./print");
var right_to_left_1 = require("./right-to-left");
var custom_context_menu_1 = require("./custom-context-menu");
var auto_save_1 = require("./auto-save");
var chart_1 = require("./chart");
var document_protection_1 = require("./document-protection");
var comments_1 = require("./comments");
exports.documenteditorRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/character-formatting', component: character_formatting_1.CharacterFormatView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/paragraph-formatting', component: paragraph_formatting_1.ParagraphFormatView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/styles', component: styles_1.StylesView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/bullets-and-numbering', component: bullets_and_numbering_1.BulletsAndNumberingView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/links-and-bookmarks', component: links_and_bookmarks_1.HyperlinksAndBookmarksView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/table-formatting', component: table_formatting_1.TableFormatView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/section-formatting', component: section_formatting_1.SectionFormatView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/headers-and-footers', component: headers_and_footers_1.HeadersAndFootersView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/table-of-contents', component: table_of_contents_1.TableOfContentsView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/print', component: print_1.PrintView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/right-to-left', component: right_to_left_1.RightToLeftView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/custom-context-menu', component: custom_context_menu_1.CustomContextMenuView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/auto-save', component: auto_save_1.DocumentEditorAutoSave }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/chart', component: chart_1.DocumentEditorChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/document-protection', component: document_protection_1.DocumentProtection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/comments', component: comments_1.Comments })));
exports.documenteditorCategory = { "default": { "name": "Default Functionalities", "category": "DocumentEditor" }, "character-formatting": { "name": "Character Formatting", "category": "Editing Features" }, "paragraph-formatting": { "name": "Paragraph Formatting", "category": "Editing Features" }, "styles": { "name": "Styles", "category": "Editing Features" }, "bullets-and-numbering": { "name": "Bullets and Numbering", "category": "Editing Features" }, "links-and-bookmarks": { "name": "Hyperlinks and Bookmarks", "category": "Editing Features" }, "table-formatting": { "name": "Table Formatting", "category": "Editing Features" }, "section-formatting": { "name": "Section Formatting", "category": "Editing Features" }, "headers-and-footers": { "name": "Headers and Footers", "category": "Editing Features" }, "table-of-contents": { "name": "Table of Contents", "category": "Editing Features" }, "print": { "name": "Print", "category": "Print" }, "right-to-left": { "name": "Right To Left", "category": "RTL" }, "custom-context-menu": { "name": "Custom Context Menu", "category": "Customization" }, "auto-save": { "name": "Auto Save", "category": "Customization" }, "chart": { "name": "Chart Preservation", "category": "Charts" }, "document-protection": { "name": "Document Protection", "category": "Security" }, "comments": { "name": "Comments", "category": "Review" }, "defaultSample": "document-editor/default" };
