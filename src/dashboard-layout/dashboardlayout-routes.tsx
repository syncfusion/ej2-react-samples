import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { PredefinedLayouts } from './predefined-layouts';
import { Properties } from './properties';
import { DynamicWidget } from './dynamic';
import { SEODashboard } from './analytics-dashboard';


export const dashboardlayoutRoutes = (
    <div>
         <Route  path='/:theme/dashboard-layout/default' component={ Default }/>
         <Route  path='/:theme/dashboard-layout/predefined-layouts' component={ PredefinedLayouts }/>
         <Route  path='/:theme/dashboard-layout/properties' component={ Properties }/>
         <Route  path='/:theme/dashboard-layout/dynamic' component={ DynamicWidget }/>
         <Route  path='/:theme/dashboard-layout/analytics-dashboard' component={ SEODashboard }/>

    </div>
)

export const dashboardlayoutCategory = {"default":{"name":"Default Functionalities","category":"Dashboard Layout"},"predefined-layouts":{"name":"Predefined Layouts","category":"Dashboard Layout"},"properties":{"name":"API","category":"Dashboard Layout"},"dynamic":{"name":"Editable Dashboard","category":"Dashboard Layout"},"analytics-dashboard":{"name":"SEO Analytics Dashboard","category":"Use Case"},"defaultSample":"dashboard-layout/default"}