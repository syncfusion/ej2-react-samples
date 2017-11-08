import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Orientation } from './orientation';
import { Responsive } from './responsive-modes';
import { RTL } from './rtl';


export const tabRoutes = (
    <div>
         <Route  path='/:theme/tab/default' component={ Default }/>
         <Route  path='/:theme/tab/orientation' component={ Orientation }/>
         <Route  path='/:theme/tab/responsive-modes' component={ Responsive }/>
         <Route  path='/:theme/tab/rtl' component={ RTL }/>

    </div>
)

export const tabCategory = {"default":{"name":"Default Functionalities","category":"Tab"},"orientation":{"name":"Orientation","category":"Tab"},"responsive-modes":{"name":"Responsive Modes","category":"Tab"},"rtl":{"name":"RTL","category":"Tab"},"defaultSample":"tab/default"}