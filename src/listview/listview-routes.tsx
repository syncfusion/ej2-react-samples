import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Remote } from './remote-list';
import { Nested } from './nested-list';
import { RTL } from './rtl';


export const listviewRoutes = (
    <div>
         <Route  path='/:theme/listview/default' component={ Default }/>
         <Route  path='/:theme/listview/remote-list' component={ Remote }/>
         <Route  path='/:theme/listview/nested-list' component={ Nested }/>
         <Route  path='/:theme/listview/rtl' component={ RTL }/>

    </div>
)

export const listviewCategory = {"default":{"name":"Default Functionalities","category":"ListView"},"remote-list":{"name":"Remote Data","category":"ListView"},"nested-list":{"name":"Nested List","category":"ListView"},"rtl":{"name":"RTL","category":"ListView"},"defaultSample":"listview/default"}