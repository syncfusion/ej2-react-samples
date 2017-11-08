import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Grouping } from './grouping-icon';
import { Data } from './data-binding';
import { Filtering } from './filtering';
import { Templates } from './template';
import { Cascading } from './cascading';


export const dropdownlistRoutes = (
    <div>
         <Route  path='/:theme/dropdownlist/default' component={ Default }/>
         <Route  path='/:theme/dropdownlist/grouping-icon' component={ Grouping }/>
         <Route  path='/:theme/dropdownlist/data-binding' component={ Data }/>
         <Route  path='/:theme/dropdownlist/filtering' component={ Filtering }/>
         <Route  path='/:theme/dropdownlist/template' component={ Templates }/>
         <Route  path='/:theme/dropdownlist/cascading' component={ Cascading }/>

    </div>
)

export const dropdownlistCategory = {"default":{"name":"Default Functionalities","category":"DropDownList"},"grouping-icon":{"name":"Grouping and Icons","category":"DropDownList"},"data-binding":{"name":"Data Binding","category":"DropDownList"},"filtering":{"name":"Filtering","category":"DropDownList"},"template":{"name":"Templates","category":"DropDownList"},"cascading":{"name":"Cascading","category":"DropDownList"},"defaultSample":"dropdownlist/default"}