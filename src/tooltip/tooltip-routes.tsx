import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { TemplateTooltip } from './template';
import { AjaxContentTooltip } from './ajaxcontent';
import { DraggableTooltip } from './smartposition';


export const tooltipRoutes = (
    <div>
         <Route  path='/:theme/tooltip/default' component={ Default }/>
         <Route  path='/:theme/tooltip/template' component={ TemplateTooltip }/>
         <Route  path='/:theme/tooltip/ajaxcontent' component={ AjaxContentTooltip }/>
         <Route  path='/:theme/tooltip/smartposition' component={ DraggableTooltip }/>

    </div>
)

export const tooltipCategory = {"default":{"name":"Default Functionalities","category":"Tooltip"},"template":{"name":"Template","category":"Tooltip"},"ajaxcontent":{"name":"Ajax Content","category":"Tooltip"},"smartposition":{"name":"Smart Positioning","category":"Tooltip"},"defaultSample":"tooltip/default"}