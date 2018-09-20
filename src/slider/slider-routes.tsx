import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Ticks } from './ticks';
import { Tooltip } from './tooltip';
import { Orientation } from './orientation';
import { Format } from './format';
import { Limits } from './limits';
import { APIs } from './api';
import { Events } from './events';
import { Thumb } from './thumb-customization';
import { Bar } from './selection-bar-customization';
import { TicksCustomization } from './ticks-customization';
import { TooltipCustomization } from './tooltip-customization';
import { Cloudpricing } from './azure-pricing';


export const sliderRoutes = (
    <div>
         <Route  path='/:theme/slider/default' component={ Default }/>
         <Route  path='/:theme/slider/ticks' component={ Ticks }/>
         <Route  path='/:theme/slider/tooltip' component={ Tooltip }/>
         <Route  path='/:theme/slider/orientation' component={ Orientation }/>
         <Route  path='/:theme/slider/format' component={ Format }/>
         <Route  path='/:theme/slider/limits' component={ Limits }/>
         <Route  path='/:theme/slider/api' component={ APIs }/>
         <Route  path='/:theme/slider/events' component={ Events }/>
         <Route  path='/:theme/slider/thumb-customization' component={ Thumb }/>
         <Route  path='/:theme/slider/selection-bar-customization' component={ Bar }/>
         <Route  path='/:theme/slider/ticks-customization' component={ TicksCustomization }/>
         <Route  path='/:theme/slider/tooltip-customization' component={ TooltipCustomization }/>
         <Route  path='/:theme/slider/azure-pricing' component={ Cloudpricing }/>

    </div>
)

export const sliderCategory = {"default":{"name":"Default Functionalities","category":"Slider"},"ticks":{"name":"Ticks","category":"Slider"},"tooltip":{"name":"Tooltip","category":"Slider"},"orientation":{"name":"Vertical Orientation","category":"Slider"},"format":{"name":"Formatting","category":"Slider"},"limits":{"name":"Limits","category":"Slider"},"api":{"name":"API","category":"Slider"},"events":{"name":"Events","category":"Slider"},"thumb-customization":{"name":"Thumb","category":"Customization"},"selection-bar-customization":{"name":"Bar","category":"Customization"},"ticks-customization":{"name":"Ticks","category":"Customization"},"tooltip-customization":{"name":"Tooltip","category":"Customization"},"azure-pricing":{"name":"Cloud Pricing","category":"Use Case"},"defaultSample":"slider/default"}