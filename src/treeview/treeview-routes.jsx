import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Icons } from './icons';
import { Checkbox } from './check-box';
import { Editing } from './node-editing';
import { MultiSelect } from './multiple-selection';
import { Dragdrop } from './drag-and-drop';
import { Template } from './template';
import { LocalData } from './local-data';
import { RemoteData } from './remote-data';
export const treeviewRoutes = (<div>
         <Route path='/:theme/treeview/default' component={Default}/>
         <Route path='/:theme/treeview/icons' component={Icons}/>
         <Route path='/:theme/treeview/check-box' component={Checkbox}/>
         <Route path='/:theme/treeview/node-editing' component={Editing}/>
         <Route path='/:theme/treeview/multiple-selection' component={MultiSelect}/>
         <Route path='/:theme/treeview/drag-and-drop' component={Dragdrop}/>
         <Route path='/:theme/treeview/template' component={Template}/>
         <Route path='/:theme/treeview/local-data' component={LocalData}/>
         <Route path='/:theme/treeview/remote-data' component={RemoteData}/>

    </div>);
export const treeviewCategory = { "default": { "name": "Default Functionalities", "category": "TreeView" }, "icons": { "name": "Icons and Images", "category": "TreeView" }, "check-box": { "name": "Checkbox", "category": "TreeView" }, "node-editing": { "name": "Node Editing", "category": "TreeView" }, "multiple-selection": { "name": "Multiple Selection", "category": "TreeView" }, "drag-and-drop": { "name": "Drag and Drop", "category": "TreeView" }, "template": { "name": "Template", "category": "TreeView" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "defaultSample": "treeview/default" };
