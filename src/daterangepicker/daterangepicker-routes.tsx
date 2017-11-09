import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { daterange } from './daterange';
import { dayspan } from './dayspan';
import { Globalization } from './globalization';
import { Presets } from './presets';


export const daterangepickerRoutes = (
    <div>
         <Route  path='/:theme/daterangepicker/default' component={ Default }/>
         <Route  path='/:theme/daterangepicker/daterange' component={ daterange }/>
         <Route  path='/:theme/daterangepicker/dayspan' component={ dayspan }/>
         <Route  path='/:theme/daterangepicker/globalization' component={ Globalization }/>
         <Route  path='/:theme/daterangepicker/presets' component={ Presets }/>

    </div>
)

export const daterangepickerCategory = {"default":{"name":"Default Functionalities","category":"DateRangePicker"},"daterange":{"name":"Date Range","category":"DateRangePicker"},"dayspan":{"name":"Day Span","category":"DateRangePicker"},"globalization":{"name":"Globalization","category":"DateRangePicker"},"presets":{"name":"Preset Ranges","category":"DateRangePicker"},"defaultSample":"daterangepicker/default"}