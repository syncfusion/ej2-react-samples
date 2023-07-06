/**
 * Sample for key performance indicator in the Circular Gauge
 */

 import * as React from "react";
 import {
   CircularGaugeComponent, AxesDirective, AxisDirective,
   PointersDirective, PointerDirective, GaugeTheme, ILoadedEventArgs, RangesDirective, RangeDirective, AnnotationsDirective, AnnotationDirective,
   Annotations, Gradient, Inject
 } from '@syncfusion/ej2-react-circulargauge';
 import { SampleBase } from '../common/sample-base';
 
 const SAMPLE_CSS = `
     .control-fluid { padding: 0px !important;} #gauge_Annotations_0 { line-height: 0.5;}
     .triangle-up { width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 10px; }
     .text { font-family:inherit; font-size:30px; text-align:center; }
     .percentage { font-family:inherit; font-size:44px; text-align:center; margin-left:-8px; }
     .e-view.tailwind div.triangle-up, .e-view.tailwind-dark div.triangle-up { margin-top: 7px;  }
     .e-view.material div.triangle-up, .e-view.material-dark div.triangle-up, .e-view.bootstrap-dark div.triangle-up,
     .e-view.bootstrap div.triangle-up, .e-view.bootstrap4 div.triangle-up {
     width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 5px; }
     @media screen and (max-width: 420px) {
       .text { font-size:20px; text-align:center; margin-left: 10px; }
       .percentage { font-size:30px; text-align:center; }
       .triangle-up { width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 15px; }
       .e-view.tailwind div.triangle-up, .e-view.tailwind-dark div.triangle-up { margin-top: 14px; }
       .e-view.material div.triangle-up, .e-view.material-dark div.triangle-up, .e-view.bootstrap-dark div.triangle-up,
       .e-view.bootstrap div.triangle-up, .e-view.bootstrap4 div.triangle-up {
       width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 10px; }
     }
   `;
 
 export class KeyPerformanceIndicator extends SampleBase<{}, {}> {
 
   public load(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
     // custom code end
   }
 
   public rangeLinearGradient: Object = {
     startValue: '0%',
     endValue: '60%',
     colorStop: [
       { color: 'white', offset: '10%', opacity: 0.9 },
       { color: '#84cbb5', offset: '90%', opacity: 0.9 },
     ],
   };
 
   render() {
     return (
       <div className='control-pane'>
         <style>
           {SAMPLE_CSS}
         </style>
         <div className='control-section'>
           <CircularGaugeComponent load={this.load.bind(this)} id="gauge" background="transparent" >
             <Inject services={[Annotations, Gradient]} />
             <AxesDirective>
               <AxisDirective startAngle={220} endAngle={140} radius="90%" minimum={0} maximum={100} majorTicks={{ width: 0, }} lineStyle={{ width: 0 }} minorTicks={{ width: 0 }} labelStyle={{ font: { size: '0px' }, position: 'Outside', offset: -18, }}>
                 <AnnotationsDirective>
                   <AnnotationDirective content='<div class="triangle-up"></div>' angle={279} radius="33%" zIndex="1" ></AnnotationDirective>
                   <AnnotationDirective content='<div class="text" style="color:#84cbb5;">Current</div>' angle={0} radius="25%" zIndex="1" ></AnnotationDirective>
                   <AnnotationDirective content='<div class="percentage" style="color:#84cbb5;">76.6%</div>' angle={125} radius="12%" zIndex="1"></AnnotationDirective>
                   <AnnotationDirective content='<div style="font-size:22px;font-family:inherit;">0</div>' angle={213} radius="83%" zIndex="1" ></AnnotationDirective>
                   <AnnotationDirective content='<div style="font-size:22px;font-family:inherit;">100</div>' angle={150} radius="83%" zIndex="1" ></AnnotationDirective>
                 </AnnotationsDirective>
                 <PointersDirective>
                   <PointerDirective value={30} radius="82%" type="Marker" markerShape="Circle" markerWidth={30} markerHeight={30} animation={{ enable: false, }} color="#bdbdbf" />
                   <PointerDirective value={50} radius="82%" type="Marker" markerShape="Circle" markerWidth={30} markerHeight={30} animation={{ enable: false, }} color="#626866" />
                   <PointerDirective value={79} radius="92%" type="Marker" markerShape="InvertedTriangle" markerWidth={30} markerHeight={30} color="#b6b6b6" />
                 </PointersDirective>
                 <RangesDirective>
                   <RangeDirective start={0} end={100} radius="90%" color="#e3e3e3" roundedCornerRadius={20} startWidth={30} endWidth={30} />
                   <RangeDirective start={30} end={50} radius="90%" linearGradient={this.rangeLinearGradient} startWidth={30} endWidth={30} />
                 </RangesDirective>
               </AxisDirective>
             </AxesDirective>
           </CircularGaugeComponent>
         </div>
         <div id="action-description">
           <p>
             This sample shows an arc gauge with a key performance indicator (KPI), which is a measurable value that shows how an organization meets key business objectives.
           </p>
         </div>
         <div id="description">
           <p>
             In this example, you can see how to render an arc gauge showing key performance indicator (KPI). You can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel/">axes</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/">ranges</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/">pointers</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/">annotations</a> oriented properties to customize the appearance of the arc gauge, in order to achieve the desired outcome.
           </p>
           <p>
             More information on the arc gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
           </p>
         </div>
       </div>
     )
   }
 }
