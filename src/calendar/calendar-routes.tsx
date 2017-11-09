import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './range';
import { Disabled } from './disabled';
import { Special } from './special';
import { Culture } from './internationalization';


export const calendarRoutes = (
    <div>
         <Route  path='/:theme/calendar/default' component={ Default }/>
         <Route  path='/:theme/calendar/range' component={ Range }/>
         <Route  path='/:theme/calendar/disabled' component={ Disabled }/>
         <Route  path='/:theme/calendar/special' component={ Special }/>
         <Route  path='/:theme/calendar/internationalization' component={ Culture }/>

    </div>
)

export const calendarCategory = {"default":{"name":"Default Functionalities","category":"Calendar"},"range":{"name":"Date Range","category":"Calendar"},"disabled":{"name":"Disabled Dates","category":"Calendar"},"special":{"name":"Special Dates","category":"Calendar"},"internationalization":{"name":"Internationalization","category":"Calendar"},"defaultSample":"calendar/default"}