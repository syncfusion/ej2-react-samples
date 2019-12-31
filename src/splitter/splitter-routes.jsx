import { Route } from 'react-router-dom';
import * as React from 'react';
import { Basic } from './default';
import { ExpandCollapse } from './expand-and-collapse';
import { AccordionIntegration } from './accordion-navigation-menu';
import { DetailsView } from './details-view';
import { OutlookLayout } from './outlook-style-layout';
import { CodeEditor } from './code-editor-layout';
export const splitterRoutes = (<div>
         <Route path='/:theme/splitter/default' component={Basic}/>
         <Route path='/:theme/splitter/expand-and-collapse' component={ExpandCollapse}/>
         <Route path='/:theme/splitter/accordion-navigation-menu' component={AccordionIntegration}/>
         <Route path='/:theme/splitter/details-view' component={DetailsView}/>
         <Route path='/:theme/splitter/outlook-style-layout' component={OutlookLayout}/>
         <Route path='/:theme/splitter/code-editor-layout' component={CodeEditor}/>

    </div>);
export const splitterCategory = { "default": { "name": "Default Functionalities", "category": "Splitter" }, "expand-and-collapse": { "name": "Expand and Collapse", "category": "Splitter" }, "accordion-navigation-menu": { "name": "Accordion Navigation Menu", "category": "Use Case" }, "details-view": { "name": "Details View", "category": "Use Case" }, "outlook-style-layout": { "name": "Outlook-style Layout", "category": "Use Case" }, "code-editor-layout": { "name": "Code Editor Layout", "category": "Use Case" }, "defaultSample": "splitter/default" };
