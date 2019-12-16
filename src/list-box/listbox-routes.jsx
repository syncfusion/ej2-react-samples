import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { DualListBox } from './dual-list-box';
import { DragAndDrop } from './drag-and-drop';
import { CheckBox } from './checkbox';
import { Api } from './api';
export const listboxRoutes = (<div>
         <Route path='/:theme/list-box/default' component={Default}/>
         <Route path='/:theme/list-box/dual-list-box' component={DualListBox}/>
         <Route path='/:theme/list-box/drag-and-drop' component={DragAndDrop}/>
         <Route path='/:theme/list-box/checkbox' component={CheckBox}/>
         <Route path='/:theme/list-box/api' component={Api}/>

    </div>);
export const listboxCategory = { "default": { "name": "Default Functionalities", "category": "List Box" }, "dual-list-box": { "name": "Dual ListBox", "category": "List Box" }, "drag-and-drop": { "name": "Drag And Drop", "category": "List Box" }, "checkbox": { "name": "Checkbox", "category": "List Box" }, "api": { "name": "API", "category": "List Box" }, "defaultSample": "list-box/default" };
