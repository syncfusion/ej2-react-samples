import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Api } from './api';


export const chipsRoutes = (
    <div>
         <Route  path='/:theme/chips/default' component={ Default }/>
         <Route  path='/:theme/chips/api' component={ Api }/>

    </div>
)

export const chipsCategory = {"default":{"name":"Default Functionalities","category":"Chips"},"api":{"name":"API","category":"Chips"},"defaultSample":"chips/default"}