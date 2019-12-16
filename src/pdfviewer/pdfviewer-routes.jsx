import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { CustomToolbar } from './custom-toolbar';
import { RightToLeft } from './right-to-left';
import { FormFilling } from './form-filling';
export const pdfviewerRoutes = (<div>
         <Route path='/:theme/pdfviewer/default' component={Default}/>
         <Route path='/:theme/pdfviewer/custom-toolbar' component={CustomToolbar}/>
         <Route path='/:theme/pdfviewer/right-to-left' component={RightToLeft}/>
         <Route path='/:theme/pdfviewer/form-filling' component={FormFilling}/>

    </div>);
export const pdfviewerCategory = { "default": { "name": "Default", "category": "PDF Viewer" }, "custom-toolbar": { "name": "Custom Toolbar", "category": "PDF Viewer" }, "right-to-left": { "name": "Right To Left", "category": "PDF Viewer" }, "form-filling": { "name": "Form Filling", "category": "PDF Viewer" }, "defaultSample": "pdfviewer/default" };
