import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './range';
import { Globalization } from './globalization';
import { Format } from './format';


export const timepickerRoutes = (
    <div>
         <Route  path='/:theme/timepicker/default' component={ Default }/>
         <Route  path='/:theme/timepicker/range' component={ Range }/>
         <Route  path='/:theme/timepicker/globalization' component={ Globalization }/>
         <Route  path='/:theme/timepicker/format' component={ Format }/>

    </div>
)

export const timepickerCategory = {"default":{"name":"Default Functionalities","category":"TimePicker"},"range":{"name":"Time Range","category":"TimePicker"},"globalization":{"name":"Globalization","category":"TimePicker"},"format":{"name":"Time Fomat","category":"TimePicker"},"defaultSample":"timepicker/default"}