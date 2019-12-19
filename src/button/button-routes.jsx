import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { ButtonGroup } from './button-group';
import { CheckBox } from './checkbox';
import { RadioButton } from './radio-button';
import { DropDownButton } from './dropdown-button';
import { SplitButton } from './split-button';
import { Switch } from './switch';
import { ProgressButton } from './progress-button';
export const buttonRoutes = (<div>
         <Route path='/:theme/button/default' component={Default}/>
         <Route path='/:theme/button/button-group' component={ButtonGroup}/>
         <Route path='/:theme/button/checkbox' component={CheckBox}/>
         <Route path='/:theme/button/radio-button' component={RadioButton}/>
         <Route path='/:theme/button/dropdown-button' component={DropDownButton}/>
         <Route path='/:theme/button/split-button' component={SplitButton}/>
         <Route path='/:theme/button/switch' component={Switch}/>
         <Route path='/:theme/button/progress-button' component={ProgressButton}/>

    </div>);
export const buttonCategory = { "default": { "name": "Default Functionalities", "category": "Button" }, "button-group": { "name": "Button Group", "category": "Button" }, "checkbox": { "name": "Checkbox", "category": "Button" }, "radio-button": { "name": "Radio Button", "category": "Button" }, "dropdown-button": { "name": "Dropdown Menu", "category": "Button" }, "split-button": { "name": "Split Button", "category": "Button" }, "switch": { "name": "Switch", "category": "Button" }, "progress-button": { "name": "Progress Button", "category": "Button" }, "defaultSample": "button/default" };
