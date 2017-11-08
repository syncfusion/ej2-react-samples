import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './range';
import { Labels } from './labels';
import { AnnotationsSample } from './annotation';
import { Customization } from './customization';
import { Direction } from './direction';
import { Axes } from './axes';
import { Drag } from './drag';
import { Tooltip } from './tooltip';
import { Image } from './image';
import { Pointers } from './pointers';
import { SampleData } from './sampledata';


export const circulargaugeRoutes = (
    <div>
         <Route  path='/:theme/circulargauge/default' component={ Default }/>
         <Route  path='/:theme/circulargauge/range' component={ Range }/>
         <Route  path='/:theme/circulargauge/labels' component={ Labels }/>
         <Route  path='/:theme/circulargauge/annotation' component={ AnnotationsSample }/>
         <Route  path='/:theme/circulargauge/customization' component={ Customization }/>
         <Route  path='/:theme/circulargauge/direction' component={ Direction }/>
         <Route  path='/:theme/circulargauge/axes' component={ Axes }/>
         <Route  path='/:theme/circulargauge/drag' component={ Drag }/>
         <Route  path='/:theme/circulargauge/tooltip' component={ Tooltip }/>
         <Route  path='/:theme/circulargauge/image' component={ Image }/>
         <Route  path='/:theme/circulargauge/pointers' component={ Pointers }/>
         <Route  path='/:theme/circulargauge/sampledata' component={ SampleData }/>

    </div>
)

export const circulargaugeCategory = {"default":{"name":"Default","category":"CIRCULAR GAUGE"},"range":{"name":"Range","category":"CIRCULAR GAUGE"},"labels":{"name":"Tick and Labels","category":"CIRCULAR GAUGE"},"annotation":{"name":"Annotations","category":"CIRCULAR GAUGE"},"customization":{"name":"Gauge Customization","category":"CIRCULAR GAUGE"},"direction":{"name":"Direction Compass","category":"CIRCULAR GAUGE"},"axes":{"name":"Multiple Axis","category":"AXES"},"drag":{"name":"Pointer Drag","category":"USER INTERACTION"},"tooltip":{"name":"Tooltip","category":"USER INTERACTION"},"image":{"name":"Pointer Image","category":"POINTER"},"pointers":{"name":"Pointer Customization","category":"POINTER"},"sampledata":{"name":"Data Sample","category":"Live"},"defaultSample":"circulargauge/default"}