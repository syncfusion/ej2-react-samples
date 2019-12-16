import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './time-range';
import { Format } from './time-format';
import { Formatting } from './list-formatting';
export const timepickerRoutes = (<div>
         <Route path='/:theme/timepicker/default' component={Default}/>
         <Route path='/:theme/timepicker/time-range' component={Range}/>
         <Route path='/:theme/timepicker/time-format' component={Format}/>
         <Route path='/:theme/timepicker/list-formatting' component={Formatting}/>

    </div>);
export const timepickerCategory = { "default": { "name": "Default Functionalities", "category": "TimePicker" }, "time-range": { "name": "Time Range", "category": "TimePicker" }, "time-format": { "name": "Format", "category": "TimePicker" }, "list-formatting": { "name": "Time Duration", "category": "TimePicker" }, "defaultSample": "timepicker/default" };
