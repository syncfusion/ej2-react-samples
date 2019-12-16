import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Types } from './types';
import { Templates } from './templates';
import { Positions } from './positions';
import { Api } from './api';


export const toastRoutes = (
    <div>
         <Route  path='/:theme/toast/default' component={ Default }/>
         <Route  path='/:theme/toast/types' component={ Types }/>
         <Route  path='/:theme/toast/templates' component={ Templates }/>
         <Route  path='/:theme/toast/positions' component={ Positions }/>
         <Route  path='/:theme/toast/api' component={ Api }/>

    </div>
)

export const toastCategory = {"default":{"name":"Default","category":"Toast"},"types":{"name":"Types","category":"Toast"},"templates":{"name":"Templates","category":"Toast"},"positions":{"name":"Positions","category":"Toast"},"api":{"name":"API","category":"Toast"},"defaultSample":"toast/default"}