import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Container } from './container';
import { Data } from './data';
import { Ranges } from './ranges';
import { Axes } from './axes';
import { Annotation } from './annotation';
import { Tooltip } from './tooltip';
import { Style } from './style';


export const lineargaugeRoutes = (
    <div>
         <Route  path='/:theme/linear-gauge/default' component={ Default }/>
         <Route  path='/:theme/linear-gauge/container' component={ Container }/>
         <Route  path='/:theme/linear-gauge/data' component={ Data }/>
         <Route  path='/:theme/linear-gauge/ranges' component={ Ranges }/>
         <Route  path='/:theme/linear-gauge/axes' component={ Axes }/>
         <Route  path='/:theme/linear-gauge/annotation' component={ Annotation }/>
         <Route  path='/:theme/linear-gauge/tooltip' component={ Tooltip }/>
         <Route  path='/:theme/linear-gauge/style' component={ Style }/>

    </div>
)

export const lineargaugeCategory = {"default":{"name":"Default Functionalities","category":"Linear Gauge"},"container":{"name":"Container","category":"Linear Gauge"},"data":{"name":"Data Sample","category":"Linear Gauge"},"ranges":{"name":"Ranges","category":"Linear Gauge"},"axes":{"name":"Axes and Pointers","category":"Linear Gauge"},"annotation":{"name":"Annotation","category":"Linear Gauge"},"tooltip":{"name":"Tooltip","category":"Linear Gauge"},"style":{"name":"Styles","category":"Linear Gauge"},"defaultSample":"linear-gauge/default"}