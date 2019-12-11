import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './date-range';
import { Disabled } from './disabled';
import { Special } from './special-dates';
import { MultipleSelection } from './multi-selection';
import { MonthPicker } from './month-picker';
import { IslamicCalendar } from './islamic-calendar';


export const calendarRoutes = (
    <div>
         <Route  path='/:theme/calendar/default' component={ Default }/>
         <Route  path='/:theme/calendar/date-range' component={ Range }/>
         <Route  path='/:theme/calendar/disabled' component={ Disabled }/>
         <Route  path='/:theme/calendar/special-dates' component={ Special }/>
         <Route  path='/:theme/calendar/multi-selection' component={ MultipleSelection }/>
         <Route  path='/:theme/calendar/month-picker' component={ MonthPicker }/>
         <Route  path='/:theme/calendar/islamic-calendar' component={ IslamicCalendar }/>

    </div>
)

export const calendarCategory = {"default":{"name":"Default Functionalities","category":"Calendar"},"date-range":{"name":"Date Range","category":"Calendar"},"disabled":{"name":"Disabled Dates","category":"Calendar"},"special-dates":{"name":"Special Dates","category":"Calendar"},"multi-selection":{"name":"Multiple Selection","category":"Calendar"},"month-picker":{"name":"Month Picker","category":"Calendar"},"islamic-calendar":{"name":"Islamic Calendar","category":"Calendar"},"defaultSample":"calendar/default"}