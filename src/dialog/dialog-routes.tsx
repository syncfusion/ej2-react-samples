import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Basic } from './basic';
import { Modal } from './modal';
import { AjaxContent } from './ajax';
import { RTL } from './rtl';


export const dialogRoutes = (
    <div>
         <Route  path='/:theme/dialog/basic' component={ Basic }/>
         <Route  path='/:theme/dialog/modal' component={ Modal }/>
         <Route  path='/:theme/dialog/ajax' component={ AjaxContent }/>
         <Route  path='/:theme/dialog/rtl' component={ RTL }/>

    </div>
)

export const dialogCategory = {"basic":{"name":"Basic Usage","category":"Dialog"},"modal":{"name":"Modal","category":"Dialog"},"ajax":{"name":"Ajax Content","category":"Dialog"},"rtl":{"name":"RTL","category":"Dialog"},"defaultSample":"dialog/basic"}