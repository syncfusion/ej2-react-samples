"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var chunk_upload_1 = require("./chunk-upload");
var custom_file_list_1 = require("./custom-file-list");
var preload_files_1 = require("./preload-files");
var file_validation_1 = require("./file-validation");
var image_preview_1 = require("./image-preview");
var file_upload_with_forms_1 = require("./file-upload-with-forms");
var custom_drop_area_1 = require("./custom-drop-area");
exports.uploaderRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/chunk-upload', component: chunk_upload_1.ChunkUpload }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/custom-file-list', component: custom_file_list_1.CustomTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/preload-files', component: preload_files_1.Preloadfiles }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/file-validation', component: file_validation_1.Validation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/image-preview', component: image_preview_1.Preview }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/file-upload-with-forms', component: file_upload_with_forms_1.Formsupport }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/custom-drop-area', component: custom_drop_area_1.Customdroparea })));
exports.uploaderCategory = { "default": { "name": "Default Functionalities", "category": "File Upload" }, "chunk-upload": { "name": "Chunk Upload", "category": "File Upload" }, "custom-file-list": { "name": "Template", "category": "File Upload" }, "preload-files": { "name": "Preload files", "category": "File Upload" }, "file-validation": { "name": "File Validation", "category": "File Upload" }, "image-preview": { "name": "Image Preview", "category": "File Upload" }, "file-upload-with-forms": { "name": "Form Support", "category": "File Upload" }, "custom-drop-area": { "name": "Custom Drop Area", "category": "File Upload" }, "defaultSample": "uploader/default" };
