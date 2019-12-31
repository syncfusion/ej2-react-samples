import { Route } from 'react-router-dom';
import * as React from 'react';
import { Overview } from './overview';
import { CustomThumbnail } from './custom-thumbnail';
import { Default } from './default';
import { DragAndDrop } from './drag-drop';
import { FileUpload } from './file-upload';
import { Azure } from './azure-service';
import { SqlServer } from './sql-server-provider';
import { NodeJSServer } from './nodejs-file-provider';
import { AmazonS3Provider } from './AmazonS3Provider';
import { Firebase } from './firebase';
import { FTPFileProvider } from './FTP-file-provider';
export const filemanagerRoutes = (<div>
         <Route path='/:theme/file-manager/overview' component={Overview}/>
         <Route path='/:theme/file-manager/custom-thumbnail' component={CustomThumbnail}/>
         <Route path='/:theme/file-manager/default' component={Default}/>
         <Route path='/:theme/file-manager/drag-drop' component={DragAndDrop}/>
         <Route path='/:theme/file-manager/file-upload' component={FileUpload}/>
         <Route path='/:theme/file-manager/azure-service' component={Azure}/>
         <Route path='/:theme/file-manager/sql-server-provider' component={SqlServer}/>
         <Route path='/:theme/file-manager/nodejs-file-provider' component={NodeJSServer}/>
         <Route path='/:theme/file-manager/AmazonS3Provider' component={AmazonS3Provider}/>
         <Route path='/:theme/file-manager/firebase' component={Firebase}/>
         <Route path='/:theme/file-manager/FTP-file-provider' component={FTPFileProvider}/>

    </div>);
export const filemanagerCategory = { "overview": { "name": "Overview", "category": "File Manager" }, "custom-thumbnail": { "name": "Custom Thumbnails", "category": "File Manager" }, "default": { "name": "API", "category": "File Manager" }, "drag-drop": { "name": "Drag and Drop", "category": "File Manager" }, "file-upload": { "name": "File Upload", "category": "Use Case" }, "azure-service": { "name": "Azure Blob Provider", "category": "Cloud Service Providers" }, "sql-server-provider": { "name": "SQL Database Provider", "category": "Cloud Service Providers" }, "nodejs-file-provider": { "name": "NodeJS File Provider", "category": "Cloud Service Providers" }, "AmazonS3Provider": { "name": "Amazon S3 File Provider", "category": "Cloud Service Providers" }, "firebase": { "name": "Firebase Realtime File Provider", "category": "Cloud Service Providers" }, "FTP-file-provider": { "name": "FTP File Provider", "category": "Cloud Service Providers" }, "defaultSample": "file-manager/overview" };
