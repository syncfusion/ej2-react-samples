import {  Route } from 'react-router-dom';
import * as React from 'react';
import { BulletChartDefault } from './default';
import { BulletChartMultipleData } from './multiple-data';
import { BulletChartRightToLeft } from './right-to-left';
import { BulletChartBarCustomization } from './bar-customization';
import { BulletChartCustomization } from './customization';
import { BulletChartTooltip } from './tooltip';


export const bulletchartRoutes = (
    <div>
         <Route  path='/:theme/bullet-chart/default' component={ BulletChartDefault }/>
         <Route  path='/:theme/bullet-chart/multiple-data' component={ BulletChartMultipleData }/>
         <Route  path='/:theme/bullet-chart/right-to-left' component={ BulletChartRightToLeft }/>
         <Route  path='/:theme/bullet-chart/bar-customization' component={ BulletChartBarCustomization }/>
         <Route  path='/:theme/bullet-chart/customization' component={ BulletChartCustomization }/>
         <Route  path='/:theme/bullet-chart/tooltip' component={ BulletChartTooltip }/>

    </div>
)

export const bulletchartCategory = {"default":{"name":"Default","category":"Bullet Chart"},"multiple-data":{"name":"Multiple Data","category":"Bullet Chart"},"right-to-left":{"name":"RTL","category":"Bullet Chart"},"bar-customization":{"name":"Feature and Target Bar","category":"Bullet Chart"},"customization":{"name":"Range and Label Settings","category":"Bullet Chart"},"tooltip":{"name":"Tooltip Template","category":"Bullet Chart"},"defaultSample":"bullet-chart/default"}