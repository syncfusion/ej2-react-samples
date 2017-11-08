import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Grouping } from './grouping-icon';
import { Data } from './data-binding';
import { Custom } from './custom-value';
import { Filtering } from './filtering';
import { Templates } from './template';
import { Cascading } from './cascading';


export const comboboxRoutes = (
    <div>
         <Route  path='/:theme/combobox/default' component={ Default }/>
         <Route  path='/:theme/combobox/grouping-icon' component={ Grouping }/>
         <Route  path='/:theme/combobox/data-binding' component={ Data }/>
         <Route  path='/:theme/combobox/custom-value' component={ Custom }/>
         <Route  path='/:theme/combobox/filtering' component={ Filtering }/>
         <Route  path='/:theme/combobox/template' component={ Templates }/>
         <Route  path='/:theme/combobox/cascading' component={ Cascading }/>

    </div>
)

export const comboboxCategory = {"default":{"name":"Default Functionalities","category":"ComboBox"},"grouping-icon":{"name":"Grouping and Icons","category":"ComboBox"},"data-binding":{"name":"Data Binding","category":"ComboBox"},"custom-value":{"name":"Custom Value","category":"ComboBox"},"filtering":{"name":"Filtering","category":"ComboBox"},"template":{"name":"Templates","category":"ComboBox"},"cascading":{"name":"Cascading","category":"ComboBox"},"defaultSample":"combobox/default"}