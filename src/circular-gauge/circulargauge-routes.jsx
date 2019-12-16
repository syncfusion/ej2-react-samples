import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Range } from './range';
import { Labels } from './labels';
import { AnnotationsSample } from './annotation';
import { Customization } from './customization';
import { SemiGauge } from './semi-circular-gauge';
import { ArcGauge } from './arc-gauge';
import { Circle } from './legend';
import { Direction } from './direction';
import { Image } from './image';
import { Pointers } from './pointers';
import { Axes } from './axes';
import { Drag } from './drag';
import { Tooltip } from './tooltip';
import { SampleData } from './sample-data';
import { AppleWatchGauge } from './apple-watch-rings';
import { Speedometer } from './speedometer';
export const circulargaugeRoutes = (<div>
         <Route path='/:theme/circular-gauge/default' component={Default}/>
         <Route path='/:theme/circular-gauge/range' component={Range}/>
         <Route path='/:theme/circular-gauge/labels' component={Labels}/>
         <Route path='/:theme/circular-gauge/annotation' component={AnnotationsSample}/>
         <Route path='/:theme/circular-gauge/customization' component={Customization}/>
         <Route path='/:theme/circular-gauge/semi-circular-gauge' component={SemiGauge}/>
         <Route path='/:theme/circular-gauge/arc-gauge' component={ArcGauge}/>
         <Route path='/:theme/circular-gauge/legend' component={Circle}/>
         <Route path='/:theme/circular-gauge/direction' component={Direction}/>
         <Route path='/:theme/circular-gauge/image' component={Image}/>
         <Route path='/:theme/circular-gauge/pointers' component={Pointers}/>
         <Route path='/:theme/circular-gauge/axes' component={Axes}/>
         <Route path='/:theme/circular-gauge/drag' component={Drag}/>
         <Route path='/:theme/circular-gauge/tooltip' component={Tooltip}/>
         <Route path='/:theme/circular-gauge/sample-data' component={SampleData}/>
         <Route path='/:theme/circular-gauge/apple-watch-rings' component={AppleWatchGauge}/>
         <Route path='/:theme/circular-gauge/speedometer' component={Speedometer}/>

    </div>);
export const circulargaugeCategory = { "default": { "name": "Default Functionalities", "category": "Circular Gauge" }, "range": { "name": "Range", "category": "Circular Gauge" }, "labels": { "name": "Tick and Labels", "category": "Circular Gauge" }, "annotation": { "name": "Annotations", "category": "Circular Gauge" }, "customization": { "name": "Gauge Customization", "category": "Circular Gauge" }, "semi-circular-gauge": { "name": "Semi-Circular Gauge", "category": "Circular Gauge" }, "arc-gauge": { "name": "Arc Gauge", "category": "Circular Gauge" }, "legend": { "name": "Legend", "category": "Circular Gauge" }, "direction": { "name": "Direction Compass", "category": "Circular Gauge" }, "image": { "name": "Pointer Image", "category": "Pointer" }, "pointers": { "name": "Pointer Customization", "category": "Pointer" }, "axes": { "name": "Multiple Axis", "category": "Axes" }, "drag": { "name": "Pointer Drag", "category": "User Interaction" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "sample-data": { "name": "Data Sample", "category": "Use Cases" }, "apple-watch-rings": { "name": "Apple Watch Rings", "category": "Use Cases" }, "speedometer": { "name": "Speedometer", "category": "Use Cases" }, "defaultSample": "circular-gauge/default" };
