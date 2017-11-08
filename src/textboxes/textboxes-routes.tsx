import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';


export const textboxesRoutes = (
    <div>
         <Route  path='/:theme/textboxes/default' component={ Default }/>

    </div>
)

export const textboxesCategory = {"default":{"name":"Default Functionalities","category":"TextBoxes"},"defaultSample":"textboxes/default"}