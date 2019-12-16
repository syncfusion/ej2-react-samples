import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './date-range';
import { Dateformat } from './date-format';
import { Disabled } from './disabled';
import { Special } from './special-dates';
import { MonthPicker } from './month-picker';


export const datepickerRoutes = (
    <div>
         <Route  path='/:theme/datepicker/default' component={ Default }/>
         <Route  path='/:theme/datepicker/date-range' component={ Range }/>
         <Route  path='/:theme/datepicker/date-format' component={ Dateformat }/>
         <Route  path='/:theme/datepicker/disabled' component={ Disabled }/>
         <Route  path='/:theme/datepicker/special-dates' component={ Special }/>
         <Route  path='/:theme/datepicker/month-picker' component={ MonthPicker }/>

    </div>
)

export const datepickerCategory = {"default":{"name":"Default Functionalities","category":"DatePicker"},"date-range":{"name":"Date Range","category":"DatePicker"},"date-format":{"name":"Format","category":"DatePicker"},"disabled":{"name":"Disabled Dates","category":"DatePicker"},"special-dates":{"name":"Special Dates","category":"DatePicker"},"month-picker":{"name":"Month Picker","category":"DatePicker"},"defaultSample":"datepicker/default"}