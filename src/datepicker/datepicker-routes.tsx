import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './range';
import { Dateformat } from './dateformat';
import { Disabled } from './disabled';
import { Special } from './special';
import { Globalization } from './globalization';


export const datepickerRoutes = (
    <div>
         <Route  path='/:theme/datepicker/default' component={ Default }/>
         <Route  path='/:theme/datepicker/range' component={ Range }/>
         <Route  path='/:theme/datepicker/dateformat' component={ Dateformat }/>
         <Route  path='/:theme/datepicker/disabled' component={ Disabled }/>
         <Route  path='/:theme/datepicker/special' component={ Special }/>
         <Route  path='/:theme/datepicker/globalization' component={ Globalization }/>

    </div>
)

export const datepickerCategory = {"default":{"name":"Default Functionalities","category":"DatePicker"},"range":{"name":"Date Range","category":"DatePicker"},"dateformat":{"name":"Date Formats","category":"DatePicker"},"disabled":{"name":"Disabled Dates","category":"DatePicker"},"special":{"name":"Special Dates","category":"DatePicker"},"globalization":{"name":"Globalization","category":"DatePicker"},"defaultSample":"datepicker/default"}