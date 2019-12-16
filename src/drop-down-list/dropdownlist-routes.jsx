import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Grouping } from './grouping-icon';
import { Data } from './data-binding';
import { Filtering } from './filtering';
import { Templates } from './template';
import { Cascading } from './cascading';
import { Inline } from './inline';
import { DiacriticsFiltering } from './diacritics-filtering';
export const dropdownlistRoutes = (<div>
         <Route path='/:theme/drop-down-list/default' component={Default}/>
         <Route path='/:theme/drop-down-list/grouping-icon' component={Grouping}/>
         <Route path='/:theme/drop-down-list/data-binding' component={Data}/>
         <Route path='/:theme/drop-down-list/filtering' component={Filtering}/>
         <Route path='/:theme/drop-down-list/template' component={Templates}/>
         <Route path='/:theme/drop-down-list/cascading' component={Cascading}/>
         <Route path='/:theme/drop-down-list/inline' component={Inline}/>
         <Route path='/:theme/drop-down-list/diacritics-filtering' component={DiacriticsFiltering}/>

    </div>);
export const dropdownlistCategory = { "default": { "name": "Default Functionalities", "category": "Dropdown List" }, "grouping-icon": { "name": "Grouping and Icons", "category": "Dropdown List" }, "data-binding": { "name": "Data Binding", "category": "Dropdown List" }, "filtering": { "name": "Filtering", "category": "Dropdown List" }, "template": { "name": "Templates", "category": "Dropdown List" }, "cascading": { "name": "Cascading", "category": "Dropdown List" }, "inline": { "name": "Inline", "category": "Dropdown List" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "Dropdown List" }, "defaultSample": "drop-down-list/default" };
