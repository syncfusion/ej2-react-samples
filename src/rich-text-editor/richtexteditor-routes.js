"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var tools_1 = require("./tools");
var rich_text_editor_1 = require("./rich-text-editor");
var image_1 = require("./image");
var inline_1 = require("./inline");
var paste_cleanup_1 = require("./paste-cleanup");
var iframe_1 = require("./iframe");
var print_1 = require("./print");
var ajax_load_1 = require("./ajax-load");
var resize_editor_1 = require("./resize-editor");
var api_1 = require("./api");
var client_side_events_1 = require("./client-side-events");
var blog_posting_1 = require("./blog-posting");
var auto_save_1 = require("./auto-save");
var types_1 = require("./types");
var insert_emoticons_1 = require("./insert-emoticons");
var insert_special_characters_1 = require("./insert-special-characters");
var markdown_editor_1 = require("./markdown-editor");
var markdown_editor_preview_1 = require("./markdown-editor-preview");
var markdown_editor_custom_format_1 = require("./markdown-editor-custom-format");
var tribute_1 = require("./tribute");
exports.richtexteditorRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/tools', component: tools_1.Overview }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/rich-text-editor', component: rich_text_editor_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/image', component: image_1.ImageSample }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/inline', component: inline_1.Inline }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/paste-cleanup', component: paste_cleanup_1.PasteCleanupRTE }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/iframe', component: iframe_1.IFrame }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/print', component: print_1.Print }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/ajax-load', component: ajax_load_1.AjaxContent }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/resize-editor', component: resize_editor_1.ResizableEditor }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/api', component: api_1.RTEApi }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/client-side-events', component: client_side_events_1.RTEEvents }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/blog-posting', component: blog_posting_1.Forums }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/auto-save', component: auto_save_1.AutoSave }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/types', component: types_1.Type }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/insert-emoticons', component: insert_emoticons_1.InsertEmoticons }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/insert-special-characters', component: insert_special_characters_1.InsertSpecialCharacters }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/markdown-editor', component: markdown_editor_1.MarkDown }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/markdown-editor-preview', component: markdown_editor_preview_1.Preview }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/markdown-editor-custom-format', component: markdown_editor_custom_format_1.CustomFormat }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/tribute', component: tribute_1.TributeJs })));
exports.richtexteditorCategory = { "tools": { "name": "Overview", "category": "Rich Text Editor" }, "rich-text-editor": { "name": "Default Functionalities", "category": "Rich Text Editor" }, "image": { "name": "Image", "category": "Rich Text Editor" }, "inline": { "name": "Inline", "category": "Rich Text Editor" }, "paste-cleanup": { "name": "Paste from MS Word", "category": "Rich Text Editor" }, "iframe": { "name": "IFrame", "category": "Rich Text Editor" }, "print": { "name": "Print", "category": "Rich Text Editor" }, "ajax-load": { "name": "Ajax Content", "category": "Rich Text Editor" }, "resize-editor": { "name": "Resizable Editor", "category": "Rich Text Editor" }, "api": { "name": "API", "category": "Rich Text Editor" }, "client-side-events": { "name": "Events", "category": "Rich Text Editor" }, "blog-posting": { "name": "Use Case", "category": "Rich Text Editor" }, "auto-save": { "name": "Auto Save", "category": "Rich Text Editor" }, "types": { "name": "Type", "category": "Toolbar" }, "insert-emoticons": { "name": "Insert Emoticons", "category": "Custom Tool" }, "insert-special-characters": { "name": "Insert Special Characters", "category": "Custom Tool" }, "markdown-editor": { "name": "Overview", "category": "Markdown Editor" }, "markdown-editor-preview": { "name": "Preview", "category": "Markdown Editor" }, "markdown-editor-custom-format": { "name": "Custom Format", "category": "Markdown Editor" }, "tribute": { "name": "Tribute JS", "category": "Third-parties Integration" }, "defaultSample": "rich-text-editor/tools" };
