import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { CustomMask } from './custommask';
import { Formats } from './formats';


export const maskedtextboxRoutes = (
    <div>
         <Route  path='/:theme/maskedtextbox/default' component={ Default }/>
         <Route  path='/:theme/maskedtextbox/custommask' component={ CustomMask }/>
         <Route  path='/:theme/maskedtextbox/formats' component={ Formats }/>

    </div>
)

export const maskedtextboxCategory = {"default":{"name":"Default Functionalities","category":"MaskedTextBox"},"custommask":{"name":"Custom Mask","category":"MaskedTextBox"},"formats":{"name":"Formats","category":"MaskedTextBox"},"defaultSample":"maskedtextbox/default"}