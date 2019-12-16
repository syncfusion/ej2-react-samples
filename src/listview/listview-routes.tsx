import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Remote } from './remote-list';
import { Checklist } from './check-list';
import { Nested } from './nested-list';
import { UiVirtualization } from './virtualization';
import { Template } from './template';
import { GroupTemplate } from './group-template';
import { CallHistory } from './call-history';


export const listviewRoutes = (
    <div>
         <Route  path='/:theme/listview/default' component={ Default }/>
         <Route  path='/:theme/listview/remote-list' component={ Remote }/>
         <Route  path='/:theme/listview/check-list' component={ Checklist }/>
         <Route  path='/:theme/listview/nested-list' component={ Nested }/>
         <Route  path='/:theme/listview/virtualization' component={ UiVirtualization }/>
         <Route  path='/:theme/listview/template' component={ Template }/>
         <Route  path='/:theme/listview/group-template' component={ GroupTemplate }/>
         <Route  path='/:theme/listview/call-history' component={ CallHistory }/>

    </div>
)

export const listviewCategory = {"default":{"name":"Default Functionalities","category":"ListView"},"remote-list":{"name":"Remote Data","category":"ListView"},"check-list":{"name":"Checklist","category":"ListView"},"nested-list":{"name":"Nested List","category":"ListView"},"virtualization":{"name":"Virtualization","category":"ListView"},"template":{"name":"Template","category":"Customization"},"group-template":{"name":"Group Template","category":"Customization"},"call-history":{"name":"Call History","category":"Use Case"},"defaultSample":"listview/default"}