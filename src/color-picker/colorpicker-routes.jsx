import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Inline } from './inline';
import { CustomPalette } from './custom';
import { Api } from './api';
export const colorpickerRoutes = (<div>
         <Route path='/:theme/color-picker/default' component={Default}/>
         <Route path='/:theme/color-picker/inline' component={Inline}/>
         <Route path='/:theme/color-picker/custom' component={CustomPalette}/>
         <Route path='/:theme/color-picker/api' component={Api}/>

    </div>);
export const colorpickerCategory = { "default": { "name": "Default Functionalities", "category": "Color Picker" }, "inline": { "name": "Inline Mode", "category": "Color Picker" }, "custom": { "name": "Custom Palettes", "category": "Color Picker" }, "api": { "name": "API", "category": "Color Picker" }, "defaultSample": "color-picker/default" };
