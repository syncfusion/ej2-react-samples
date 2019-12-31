import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Template } from './template';
import { DataGrid } from './grid';
export const querybuilderRoutes = (<div>
         <Route path='/:theme/query-builder/default' component={Default}/>
         <Route path='/:theme/query-builder/template' component={Template}/>
         <Route path='/:theme/query-builder/grid' component={DataGrid}/>

    </div>);
export const querybuilderCategory = { "default": { "name": "Default Functionalities", "category": "Query Builder" }, "template": { "name": "Template", "category": "Query Builder" }, "grid": { "name": "Integration with Data Grid", "category": "Query Builder" }, "defaultSample": "query-builder/default" };
