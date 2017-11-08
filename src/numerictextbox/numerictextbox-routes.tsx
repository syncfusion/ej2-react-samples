import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './range';
import { Internationalization } from './internationalization';
import { Format } from './format';
import { Restrict } from './restrict';


export const numerictextboxRoutes = (
    <div>
         <Route  path='/:theme/numerictextbox/default' component={ Default }/>
         <Route  path='/:theme/numerictextbox/range' component={ Range }/>
         <Route  path='/:theme/numerictextbox/internationalization' component={ Internationalization }/>
         <Route  path='/:theme/numerictextbox/format' component={ Format }/>
         <Route  path='/:theme/numerictextbox/restrict' component={ Restrict }/>

    </div>
)

export const numerictextboxCategory = {"default":{"name":"Default Functionalities","category":"NumericTextBox"},"range":{"name":"Range Validation","category":"NumericTextBox"},"internationalization":{"name":"Internationalization","category":"NumericTextBox"},"format":{"name":"Custom Format","category":"NumericTextBox"},"restrict":{"name":"Restrict Decimals","category":"NumericTextBox"},"defaultSample":"numerictextbox/default"}