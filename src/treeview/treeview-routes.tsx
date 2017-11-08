import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Icons } from './icons';
import { Checkbox } from './checkbox';
import { Editing } from './editing';
import { MultiSelect } from './multiselect';
import { Dragdrop } from './dragdrop';
import { Template } from './template';
import { RTL } from './rtl';
import { LocalData } from './localdata';
import { RemoteData } from './remotedata';


export const treeviewRoutes = (
    <div>
         <Route  path='/:theme/treeview/default' component={ Default }/>
         <Route  path='/:theme/treeview/icons' component={ Icons }/>
         <Route  path='/:theme/treeview/checkbox' component={ Checkbox }/>
         <Route  path='/:theme/treeview/editing' component={ Editing }/>
         <Route  path='/:theme/treeview/multiselect' component={ MultiSelect }/>
         <Route  path='/:theme/treeview/dragdrop' component={ Dragdrop }/>
         <Route  path='/:theme/treeview/template' component={ Template }/>
         <Route  path='/:theme/treeview/rtl' component={ RTL }/>
         <Route  path='/:theme/treeview/localdata' component={ LocalData }/>
         <Route  path='/:theme/treeview/remotedata' component={ RemoteData }/>

    </div>
)

export const treeviewCategory = {"default":{"name":"Default Functionalities","category":"TreeView"},"icons":{"name":"Icons and Images","category":"TreeView"},"checkbox":{"name":"Checkbox","category":"TreeView"},"editing":{"name":"Node Editing","category":"TreeView"},"multiselect":{"name":"Multiple Selection","category":"TreeView"},"dragdrop":{"name":"Drag and Drop","category":"TreeView"},"template":{"name":"Template","category":"TreeView"},"rtl":{"name":"RTL","category":"TreeView"},"localdata":{"name":"Local Data","category":"Data Binding"},"remotedata":{"name":"Remote Data","category":"Data Binding"},"defaultSample":"treeview/default"}