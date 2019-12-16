import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Popup } from './popup';
import { Alignment } from './alignment';


export const toolbarRoutes = (
    <div>
         <Route  path='/:theme/toolbar/default' component={ Default }/>
         <Route  path='/:theme/toolbar/popup' component={ Popup }/>
         <Route  path='/:theme/toolbar/alignment' component={ Alignment }/>

    </div>
)

export const toolbarCategory = {"default":{"name":"Default Functionalities","category":"Toolbar"},"popup":{"name":"Popup","category":"Toolbar"},"alignment":{"name":"Alignment","category":"Toolbar"},"defaultSample":"toolbar/default"}