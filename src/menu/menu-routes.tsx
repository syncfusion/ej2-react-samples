import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { DataBinding } from './data-binding';
import { Scrollable } from './scrollable';
import { Template } from './template';
import { HamburgerMenu } from './hamburger-mode';
import { Api } from './api';
import { ToolbarIntegration } from './toolbar-integration';


export const menuRoutes = (
    <div>
         <Route  path='/:theme/menu/default' component={ Default }/>
         <Route  path='/:theme/menu/data-binding' component={ DataBinding }/>
         <Route  path='/:theme/menu/scrollable' component={ Scrollable }/>
         <Route  path='/:theme/menu/template' component={ Template }/>
         <Route  path='/:theme/menu/hamburger-mode' component={ HamburgerMenu }/>
         <Route  path='/:theme/menu/api' component={ Api }/>
         <Route  path='/:theme/menu/toolbar-integration' component={ ToolbarIntegration }/>

    </div>
)

export const menuCategory = {"default":{"name":"Default Functionalities","category":"Menu Bar"},"data-binding":{"name":"Data Binding","category":"Menu Bar"},"scrollable":{"name":"Scrollable","category":"Menu Bar"},"template":{"name":"Template","category":"Menu Bar"},"hamburger-mode":{"name":"Hamburger Mode","category":"Menu Bar"},"api":{"name":"API","category":"Menu Bar"},"toolbar-integration":{"name":"Toolbar Integration","category":"Use Case"},"defaultSample":"menu/default"}