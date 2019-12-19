import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Orientation } from './orientation';
import { Responsive } from './responsive-modes';
import { Wizard } from './wizard';


export const tabRoutes = (
    <div>
         <Route  path='/:theme/tab/default' component={ Default }/>
         <Route  path='/:theme/tab/orientation' component={ Orientation }/>
         <Route  path='/:theme/tab/responsive-modes' component={ Responsive }/>
         <Route  path='/:theme/tab/wizard' component={ Wizard }/>

    </div>
)

export const tabCategory = {"default":{"name":"Default Functionalities","category":"Tabs"},"orientation":{"name":"Orientation","category":"Tabs"},"responsive-modes":{"name":"Responsive Modes","category":"Tabs"},"wizard":{"name":"Wizard","category":"Tabs"},"defaultSample":"tab/default"}