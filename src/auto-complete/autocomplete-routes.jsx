import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Grouping } from './grouping-icon';
import { Data } from './data-binding';
import { Templates } from './template';
import { Highlight } from './highlight';
import { CustomFiltering } from './custom-filtering';
import { DiacriticsFiltering } from './diacritics-filtering';
export const autocompleteRoutes = (<div>
         <Route path='/:theme/auto-complete/default' component={Default}/>
         <Route path='/:theme/auto-complete/grouping-icon' component={Grouping}/>
         <Route path='/:theme/auto-complete/data-binding' component={Data}/>
         <Route path='/:theme/auto-complete/template' component={Templates}/>
         <Route path='/:theme/auto-complete/highlight' component={Highlight}/>
         <Route path='/:theme/auto-complete/custom-filtering' component={CustomFiltering}/>
         <Route path='/:theme/auto-complete/diacritics-filtering' component={DiacriticsFiltering}/>

    </div>);
export const autocompleteCategory = { "default": { "name": "Default Functionalities", "category": "AutoComplete" }, "grouping-icon": { "name": "Grouping and Icons", "category": "AutoComplete" }, "data-binding": { "name": "Data Binding", "category": "AutoComplete" }, "template": { "name": "Templates", "category": "AutoComplete" }, "highlight": { "name": "Highlight", "category": "AutoComplete" }, "custom-filtering": { "name": "Custom Filtering", "category": "AutoComplete" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "AutoComplete" }, "defaultSample": "auto-complete/default" };
