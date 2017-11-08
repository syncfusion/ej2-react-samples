import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { CheckBox } from './check-box';
import { RadioButton } from './radio-button';


export const buttonRoutes = (
    <div>
         <Route  path='/:theme/button/default' component={ Default }/>
         <Route  path='/:theme/button/check-box' component={ CheckBox }/>
         <Route  path='/:theme/button/radio-button' component={ RadioButton }/>

    </div>
)

export const buttonCategory = {"default":{"name":"Default Functionalities","category":"Button"},"check-box":{"name":"CheckBox","category":"Button"},"radio-button":{"name":"RadioButton","category":"Button"},"defaultSample":"button/default"}