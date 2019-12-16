import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Dock } from './docking-sidebar';
import { API } from './api';
import { SidebarWithMenu } from './sidebar-menu';
import { ResponsivePanel } from './responsive-panel';
import { SidebarWithList } from './sidebar-list';
export const sidebarRoutes = (<div>
         <Route path='/:theme/sidebar/default' component={Default}/>
         <Route path='/:theme/sidebar/docking-sidebar' component={Dock}/>
         <Route path='/:theme/sidebar/api' component={API}/>
         <Route path='/:theme/sidebar/sidebar-menu' component={SidebarWithMenu}/>
         <Route path='/:theme/sidebar/responsive-panel' component={ResponsivePanel}/>
         <Route path='/:theme/sidebar/sidebar-list' component={SidebarWithList}/>

    </div>);
export const sidebarCategory = { "default": { "name": "Default Functionalities", "category": "Sidebar" }, "docking-sidebar": { "name": "Dock", "category": "Sidebar" }, "api": { "name": "API", "category": "Sidebar" }, "sidebar-menu": { "name": "Sidebar Menu", "category": "Sidebar" }, "responsive-panel": { "name": "Responsive Panel", "category": "Sidebar" }, "sidebar-list": { "name": "Sidebar With ListView", "category": "Sidebar" }, "defaultSample": "sidebar/default" };
