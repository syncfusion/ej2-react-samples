import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { CustomMask } from './custom-mask';
import { Formats } from './formats';
export const maskedtextboxRoutes = (<div>
         <Route path='/:theme/maskedtextbox/default' component={Default}/>
         <Route path='/:theme/maskedtextbox/custom-mask' component={CustomMask}/>
         <Route path='/:theme/maskedtextbox/formats' component={Formats}/>

    </div>);
export const maskedtextboxCategory = { "default": { "name": "Default Functionalities", "category": "Input Mask" }, "custom-mask": { "name": "Custom Mask", "category": "Input Mask" }, "formats": { "name": "Formats", "category": "Input Mask" }, "defaultSample": "maskedtextbox/default" };
