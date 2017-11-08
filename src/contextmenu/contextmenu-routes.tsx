import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';


export const contextmenuRoutes = (
    <div>
         <Route  path='/:theme/contextmenu/default' component={ Default }/>

    </div>
)

export const contextmenuCategory = {"default":{"name":"Default Functionalities","category":"ContextMenu"},"defaultSample":"contextmenu/default"}