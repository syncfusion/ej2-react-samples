import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Customization } from './custom';
import { Print } from './print-export';
export const smithchartRoutes = (<div>
         <Route path='/:theme/smith-chart/default' component={Default}/>
         <Route path='/:theme/smith-chart/custom' component={Customization}/>
         <Route path='/:theme/smith-chart/print-export' component={Print}/>

    </div>);
export const smithchartCategory = { "default": { "name": "Default", "category": "Smith Chart" }, "custom": { "name": "Customization", "category": "Smith Chart" }, "print-export": { "name": "Print and Export", "category": "Smith Chart" }, "defaultSample": "smith-chart/default" };
