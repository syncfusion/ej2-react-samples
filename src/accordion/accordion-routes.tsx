import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { AjaxContent } from './ajax';
import { Icons } from './icon';
import { RTL } from './rtl';


export const accordionRoutes = (
    <div>
         <Route  path='/:theme/accordion/default' component={ Default }/>
         <Route  path='/:theme/accordion/ajax' component={ AjaxContent }/>
         <Route  path='/:theme/accordion/icon' component={ Icons }/>
         <Route  path='/:theme/accordion/rtl' component={ RTL }/>

    </div>
)

export const accordionCategory = {"default":{"name":"Default Functionalities","category":"Accordion"},"ajax":{"name":"Ajax Content","category":"Accordion"},"icon":{"name":"Icons","category":"Accordion"},"rtl":{"name":"RTL","category":"Accordion"},"defaultSample":"accordion/default"}