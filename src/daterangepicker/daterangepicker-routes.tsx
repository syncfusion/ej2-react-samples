import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Minmax } from './minmax';
import { Minmaxdays } from './minmaxdays';
import { Globalization } from './globalization';
import { Presets } from './presets';


export const daterangepickerRoutes = (
    <div>
         <Route  path='/:theme/daterangepicker/default' component={ Default }/>
         <Route  path='/:theme/daterangepicker/minmax' component={ Minmax }/>
         <Route  path='/:theme/daterangepicker/minmaxdays' component={ Minmaxdays }/>
         <Route  path='/:theme/daterangepicker/globalization' component={ Globalization }/>
         <Route  path='/:theme/daterangepicker/presets' component={ Presets }/>

    </div>
)

export const daterangepickerCategory = {"default":{"name":"Default Functionalities","category":"DateRangePicker"},"minmax":{"name":"Date Range","category":"DateRangePicker"},"minmaxdays":{"name":"Restrict Range","category":"DateRangePicker"},"globalization":{"name":"Globalization","category":"DateRangePicker"},"presets":{"name":"Preset Ranges","category":"DateRangePicker"},"defaultSample":"daterangepicker/default"}