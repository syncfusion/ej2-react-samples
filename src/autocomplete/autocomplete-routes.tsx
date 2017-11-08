import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Grouping } from './grouping-icon';
import { Data } from './data-binding';
import { Templates } from './template';
import { Highlight } from './highlight';
import { CustomFiltering } from './custom-filtering';


export const autocompleteRoutes = (
    <div>
         <Route  path='/:theme/autocomplete/default' component={ Default }/>
         <Route  path='/:theme/autocomplete/grouping-icon' component={ Grouping }/>
         <Route  path='/:theme/autocomplete/data-binding' component={ Data }/>
         <Route  path='/:theme/autocomplete/template' component={ Templates }/>
         <Route  path='/:theme/autocomplete/highlight' component={ Highlight }/>
         <Route  path='/:theme/autocomplete/custom-filtering' component={ CustomFiltering }/>

    </div>
)

export const autocompleteCategory = {"default":{"name":"Default Functionalities","category":"AutoComplete"},"grouping-icon":{"name":"Grouping and Icons","category":"AutoComplete"},"data-binding":{"name":"Data Binding","category":"AutoComplete"},"template":{"name":"Templates","category":"AutoComplete"},"highlight":{"name":"Highlight","category":"AutoComplete"},"custom-filtering":{"name":"Custom Filtering","category":"AutoComplete"},"defaultSample":"autocomplete/default"}