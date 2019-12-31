import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Types } from './types';
import { Badge } from './badge';
import { Listview } from './listview';
import { Card } from './card';
export const avatarRoutes = (<div>
         <Route path='/:theme/avatar/default' component={Default}/>
         <Route path='/:theme/avatar/types' component={Types}/>
         <Route path='/:theme/avatar/badge' component={Badge}/>
         <Route path='/:theme/avatar/listview' component={Listview}/>
         <Route path='/:theme/avatar/card' component={Card}/>

    </div>);
export const avatarCategory = { "default": { "name": "Default", "category": "Avatar" }, "types": { "name": "Types", "category": "Avatar" }, "badge": { "name": "Badge", "category": "Integration" }, "listview": { "name": "ListView", "category": "Integration" }, "card": { "name": "Card", "category": "Integration" }, "defaultSample": "avatar/default" };
