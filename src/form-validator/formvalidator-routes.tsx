import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';


export const formvalidatorRoutes = (
    <div>
         <Route  path='/:theme/form-validator/default' component={ Default }/>

    </div>
)

export const formvalidatorCategory = {"default":{"name":"Default Functionalities","category":"Form Validator"},"defaultSample":"form-validator/default"}