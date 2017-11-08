import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Popup } from './popup';
import { Alignment } from './alignment';
import { RTL } from './rtl';


export const toolbarRoutes = (
    <div>
         <Route  path='/:theme/toolbar/default' component={ Default }/>
         <Route  path='/:theme/toolbar/popup' component={ Popup }/>
         <Route  path='/:theme/toolbar/alignment' component={ Alignment }/>
         <Route  path='/:theme/toolbar/rtl' component={ RTL }/>

    </div>
)

export const toolbarCategory = {"default":{"name":"Default Functionalities","category":"Toolbar"},"popup":{"name":"Popup","category":"Toolbar"},"alignment":{"name":"Alignment","category":"Toolbar"},"rtl":{"name":"RTL","category":"Toolbar"},"defaultSample":"toolbar/default"}