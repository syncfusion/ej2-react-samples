import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Multiline } from './multiline';


export const textboxesRoutes = (
    <div>
         <Route  path='/:theme/textboxes/default' component={ Default }/>
         <Route  path='/:theme/textboxes/multiline' component={ Multiline }/>

    </div>
)

export const textboxesCategory = {"default":{"name":"Default Functionalities","category":"TextBox"},"multiline":{"name":"Multiline TextBox","category":"TextBox"},"defaultSample":"textboxes/default"}