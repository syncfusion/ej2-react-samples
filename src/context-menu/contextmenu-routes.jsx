import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
export const contextmenuRoutes = (<div>
         <Route path='/:theme/context-menu/default' component={Default}/>

    </div>);
export const contextmenuCategory = { "default": { "name": "Default Functionalities", "category": "Context Menu" }, "defaultSample": "context-menu/default" };
