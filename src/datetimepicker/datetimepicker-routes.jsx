import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './date-time-range';
import { Dateformat } from './date-time-format';
import { Disabled } from './disabled';
import { Special } from './special-dates';
export const datetimepickerRoutes = (<div>
         <Route path='/:theme/datetimepicker/default' component={Default}/>
         <Route path='/:theme/datetimepicker/date-time-range' component={Range}/>
         <Route path='/:theme/datetimepicker/date-time-format' component={Dateformat}/>
         <Route path='/:theme/datetimepicker/disabled' component={Disabled}/>
         <Route path='/:theme/datetimepicker/special-dates' component={Special}/>

    </div>);
export const datetimepickerCategory = { "default": { "name": "Default Functionalities", "category": "DateTimePicker" }, "date-time-range": { "name": "DateTime Range", "category": "DateTimePicker" }, "date-time-format": { "name": "Format", "category": "DateTimePicker" }, "disabled": { "name": "Disabled Dates", "category": "DateTimePicker" }, "special-dates": { "name": "Special Dates", "category": "DateTimePicker" }, "defaultSample": "datetimepicker/default" };
