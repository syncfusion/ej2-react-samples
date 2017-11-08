import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Data } from './data-binding';
import { Grouping } from './grouping';
import { Templates } from './template';
import { Filtering } from './filtering';
import { CustomTag } from './customtag';


export const multiselectRoutes = (
    <div>
         <Route  path='/:theme/multiselect/default' component={ Default }/>
         <Route  path='/:theme/multiselect/data-binding' component={ Data }/>
         <Route  path='/:theme/multiselect/grouping' component={ Grouping }/>
         <Route  path='/:theme/multiselect/template' component={ Templates }/>
         <Route  path='/:theme/multiselect/filtering' component={ Filtering }/>
         <Route  path='/:theme/multiselect/customtag' component={ CustomTag }/>

    </div>
)

export const multiselectCategory = {"default":{"name":"Default Functionalities","category":"MultiSelect"},"data-binding":{"name":"Data Binding","category":"MultiSelect"},"grouping":{"name":"Grouping","category":"MultiSelect"},"template":{"name":"Templates","category":"MultiSelect"},"filtering":{"name":"Filtering","category":"MultiSelect"},"customtag":{"name":"Custom Values","category":"MultiSelect"},"defaultSample":"multiselect/default"}