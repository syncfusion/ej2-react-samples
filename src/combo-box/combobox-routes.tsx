import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Grouping } from './grouping-icon';
import { Data } from './data-binding';
import { Custom } from './custom-value';
import { Filtering } from './filtering';
import { Templates } from './template';
import { Cascading } from './cascading';
import { DiacriticsFiltering } from './diacritics-filtering';


export const comboboxRoutes = (
    <div>
         <Route  path='/:theme/combo-box/default' component={ Default }/>
         <Route  path='/:theme/combo-box/grouping-icon' component={ Grouping }/>
         <Route  path='/:theme/combo-box/data-binding' component={ Data }/>
         <Route  path='/:theme/combo-box/custom-value' component={ Custom }/>
         <Route  path='/:theme/combo-box/filtering' component={ Filtering }/>
         <Route  path='/:theme/combo-box/template' component={ Templates }/>
         <Route  path='/:theme/combo-box/cascading' component={ Cascading }/>
         <Route  path='/:theme/combo-box/diacritics-filtering' component={ DiacriticsFiltering }/>

    </div>
)

export const comboboxCategory = {"default":{"name":"Default Functionalities","category":"ComboBox"},"grouping-icon":{"name":"Grouping and Icons","category":"ComboBox"},"data-binding":{"name":"Data Binding","category":"ComboBox"},"custom-value":{"name":"Custom Value","category":"ComboBox"},"filtering":{"name":"Filtering","category":"ComboBox"},"template":{"name":"Templates","category":"ComboBox"},"cascading":{"name":"Cascading","category":"ComboBox"},"diacritics-filtering":{"name":"Diacritics Filtering","category":"ComboBox"},"defaultSample":"combo-box/default"}