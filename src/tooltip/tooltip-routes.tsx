import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { TemplateTooltip } from './template';
import { AjaxContentTooltip } from './ajaxcontent';
import { DraggableTooltip } from './smartposition';
import { TooltipMenu } from './tooltip-menu';
import { HtmlContentTooltip } from './html-content';
import { ApiTooltip } from './api';


export const tooltipRoutes = (
    <div>
         <Route  path='/:theme/tooltip/default' component={ Default }/>
         <Route  path='/:theme/tooltip/template' component={ TemplateTooltip }/>
         <Route  path='/:theme/tooltip/ajaxcontent' component={ AjaxContentTooltip }/>
         <Route  path='/:theme/tooltip/smartposition' component={ DraggableTooltip }/>
         <Route  path='/:theme/tooltip/tooltip-menu' component={ TooltipMenu }/>
         <Route  path='/:theme/tooltip/html-content' component={ HtmlContentTooltip }/>
         <Route  path='/:theme/tooltip/api' component={ ApiTooltip }/>

    </div>
)

export const tooltipCategory = {"default":{"name":"Default Functionalities","category":"Tooltip"},"template":{"name":"Template","category":"Tooltip"},"ajaxcontent":{"name":"Ajax Content","category":"Tooltip"},"smartposition":{"name":"Smart Positioning","category":"Tooltip"},"tooltip-menu":{"name":"Tooltip Menu","category":"Tooltip"},"html-content":{"name":"HTML Content","category":"Tooltip"},"api":{"name":"API","category":"Tooltip"},"defaultSample":"tooltip/default"}