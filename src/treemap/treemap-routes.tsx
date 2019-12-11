import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Layout } from './layout';
import { Drilldown } from './drilldown';
import { Customization } from './customization';
import { Datalabel } from './label';
import { Tooltip } from './tooltip';
import { Legend } from './election';
import { ColorMapping } from './color-mapping';
import { Selection } from './selection';
import { Print } from './print';
import { Pie } from './pie';
import { RTL } from './rtl';


export const treemapRoutes = (
    <div>
         <Route  path='/:theme/treemap/default' component={ Default }/>
         <Route  path='/:theme/treemap/layout' component={ Layout }/>
         <Route  path='/:theme/treemap/drilldown' component={ Drilldown }/>
         <Route  path='/:theme/treemap/customization' component={ Customization }/>
         <Route  path='/:theme/treemap/label' component={ Datalabel }/>
         <Route  path='/:theme/treemap/tooltip' component={ Tooltip }/>
         <Route  path='/:theme/treemap/election' component={ Legend }/>
         <Route  path='/:theme/treemap/color-mapping' component={ ColorMapping }/>
         <Route  path='/:theme/treemap/selection' component={ Selection }/>
         <Route  path='/:theme/treemap/print' component={ Print }/>
         <Route  path='/:theme/treemap/pie' component={ Pie }/>
         <Route  path='/:theme/treemap/rtl' component={ RTL }/>

    </div>
)

export const treemapCategory = {"default":{"name":"Default Functionalities","category":"TreeMap"},"layout":{"name":"Layout","category":"TreeMap"},"drilldown":{"name":"Drilldown","category":"TreeMap"},"customization":{"name":"Customization","category":"TreeMap"},"label":{"name":"Data Label","category":"TreeMap"},"tooltip":{"name":"Tooltip","category":"TreeMap"},"election":{"name":"Legend","category":"TreeMap"},"color-mapping":{"name":"Color Mapping","category":"TreeMap"},"selection":{"name":"Selection & Highlight","category":"TreeMap"},"print":{"name":"Print & Export","category":"TreeMap"},"pie":{"name":"Treemap with Pie","category":"TreeMap"},"rtl":{"name":"RTL","category":"TreeMap"},"defaultSample":"treemap/default"}