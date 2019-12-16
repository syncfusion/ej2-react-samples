"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var custom_dialog_1 = require("./custom-dialog");
var modal_dialog_1 = require("./modal-dialog");
var template_1 = require("./template");
var dialog_contents_via_ajax_1 = require("./dialog-contents-via-ajax");
var draggable_1 = require("./draggable");
var resizable_1 = require("./resizable");
var position_1 = require("./position");
var animation_1 = require("./animation");
var multiple_dialogs_1 = require("./multiple-dialogs");
var components_dialog_1 = require("./components-dialog");
exports.dialogRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/default', component: default_1.DefaultFunctionalities }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/custom-dialog', component: custom_dialog_1.Basic }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/modal-dialog', component: modal_dialog_1.Modal }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/template', component: template_1.Template }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/dialog-contents-via-ajax', component: dialog_contents_via_ajax_1.AjaxContent }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/draggable', component: draggable_1.Draggable }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/resizable', component: resizable_1.Resizable }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/position', component: position_1.Positioning }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/animation', component: animation_1.Animation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/multiple-dialogs', component: multiple_dialogs_1.MultipleDialogs }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/components-dialog', component: components_dialog_1.ComponentsDialog })));
exports.dialogCategory = { "default": { "name": "Default Functionalities", "category": "Dialog" }, "custom-dialog": { "name": "Custom Dialogs", "category": "Dialog" }, "modal-dialog": { "name": "Modal", "category": "Dialog" }, "template": { "name": "Template", "category": "Dialog" }, "dialog-contents-via-ajax": { "name": "Ajax Content", "category": "Dialog" }, "draggable": { "name": "Draggable", "category": "Dialog" }, "resizable": { "name": "Resizable", "category": "Dialog" }, "position": { "name": "Positioning", "category": "Dialog" }, "animation": { "name": "Animation", "category": "Dialog" }, "multiple-dialogs": { "name": "Multiple Dialogs", "category": "Dialog" }, "components-dialog": { "name": "Components inside Dialog", "category": "Dialog" }, "defaultSample": "dialog/default" };
