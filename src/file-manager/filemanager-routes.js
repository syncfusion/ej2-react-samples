"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_1 = require("./overview");
var custom_thumbnail_1 = require("./custom-thumbnail");
var default_1 = require("./default");
var drag_drop_1 = require("./drag-drop");
var file_upload_1 = require("./file-upload");
var azure_service_1 = require("./azure-service");
var sql_server_provider_1 = require("./sql-server-provider");
var nodejs_file_provider_1 = require("./nodejs-file-provider");
var AmazonS3Provider_1 = require("./AmazonS3Provider");
var firebase_1 = require("./firebase");
var FTP_file_provider_1 = require("./FTP-file-provider");
exports.filemanagerRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/overview', component: overview_1.Overview }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/custom-thumbnail', component: custom_thumbnail_1.CustomThumbnail }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/drag-drop', component: drag_drop_1.DragAndDrop }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/file-upload', component: file_upload_1.FileUpload }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/azure-service', component: azure_service_1.Azure }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/sql-server-provider', component: sql_server_provider_1.SqlServer }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/nodejs-file-provider', component: nodejs_file_provider_1.NodeJSServer }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/AmazonS3Provider', component: AmazonS3Provider_1.AmazonS3Provider }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/firebase', component: firebase_1.Firebase }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/FTP-file-provider', component: FTP_file_provider_1.FTPFileProvider })));
exports.filemanagerCategory = { "overview": { "name": "Overview", "category": "File Manager" }, "custom-thumbnail": { "name": "Custom Thumbnails", "category": "File Manager" }, "default": { "name": "API", "category": "File Manager" }, "drag-drop": { "name": "Drag and Drop", "category": "File Manager" }, "file-upload": { "name": "File Upload", "category": "Use Case" }, "azure-service": { "name": "Azure Blob Provider", "category": "Cloud Service Providers" }, "sql-server-provider": { "name": "SQL Database Provider", "category": "Cloud Service Providers" }, "nodejs-file-provider": { "name": "NodeJS File Provider", "category": "Cloud Service Providers" }, "AmazonS3Provider": { "name": "Amazon S3 File Provider", "category": "Cloud Service Providers" }, "firebase": { "name": "Firebase Realtime File Provider", "category": "Cloud Service Providers" }, "FTP-file-provider": { "name": "FTP File Provider", "category": "Cloud Service Providers" }, "defaultSample": "file-manager/overview" };
