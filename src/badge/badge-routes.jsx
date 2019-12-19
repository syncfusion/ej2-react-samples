import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Types } from './types';
import { Notification } from './notification';
import { ListView } from './listview';
import { Accordion } from './accordion';
import { Toolbar } from './toolbar';
export const badgeRoutes = (<div>
         <Route path='/:theme/badge/default' component={Default}/>
         <Route path='/:theme/badge/types' component={Types}/>
         <Route path='/:theme/badge/notification' component={Notification}/>
         <Route path='/:theme/badge/listview' component={ListView}/>
         <Route path='/:theme/badge/accordion' component={Accordion}/>
         <Route path='/:theme/badge/toolbar' component={Toolbar}/>

    </div>);
export const badgeCategory = { "default": { "name": "Default", "category": "Badge" }, "types": { "name": "Types", "category": "Badge" }, "notification": { "name": "Notification", "category": "Badge" }, "listview": { "name": "ListView", "category": "Integration" }, "accordion": { "name": "Accordion", "category": "Integration" }, "toolbar": { "name": "Toolbar", "category": "Integration" }, "defaultSample": "badge/default" };
