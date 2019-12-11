import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Data } from './data-binding';
import { Grouping } from './grouping';
import { Templates } from './template';
import { Filtering } from './filtering';
import { CustomTag } from './custom-value';
import { ChipCustomization } from './chip-customization';
import { CheckBox } from './checkbox';
import { CheckBoxGrouping } from './grouping-with-checkbox';
import { SelectionLimit } from './selection-limit';
import { DiacriticsFiltering } from './diacritics-filtering';
export const multiselectRoutes = (<div>
         <Route path='/:theme/multi-select/default' component={Default}/>
         <Route path='/:theme/multi-select/data-binding' component={Data}/>
         <Route path='/:theme/multi-select/grouping' component={Grouping}/>
         <Route path='/:theme/multi-select/template' component={Templates}/>
         <Route path='/:theme/multi-select/filtering' component={Filtering}/>
         <Route path='/:theme/multi-select/custom-value' component={CustomTag}/>
         <Route path='/:theme/multi-select/chip-customization' component={ChipCustomization}/>
         <Route path='/:theme/multi-select/checkbox' component={CheckBox}/>
         <Route path='/:theme/multi-select/grouping-with-checkbox' component={CheckBoxGrouping}/>
         <Route path='/:theme/multi-select/selection-limit' component={SelectionLimit}/>
         <Route path='/:theme/multi-select/diacritics-filtering' component={DiacriticsFiltering}/>

    </div>);
export const multiselectCategory = { "default": { "name": "Default Functionalities", "category": "MultiSelect Dropdown" }, "data-binding": { "name": "Data Binding", "category": "MultiSelect Dropdown" }, "grouping": { "name": "Grouping", "category": "MultiSelect Dropdown" }, "template": { "name": "Templates", "category": "MultiSelect Dropdown" }, "filtering": { "name": "Filtering", "category": "MultiSelect Dropdown" }, "custom-value": { "name": "Custom Values", "category": "MultiSelect Dropdown" }, "chip-customization": { "name": "Chip Customization", "category": "MultiSelect Dropdown" }, "checkbox": { "name": "CheckBox", "category": "MultiSelect Dropdown" }, "grouping-with-checkbox": { "name": "Grouping with CheckBox", "category": "MultiSelect Dropdown" }, "selection-limit": { "name": "Selection Limit", "category": "MultiSelect Dropdown" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "MultiSelect Dropdown" }, "defaultSample": "multi-select/default" };
