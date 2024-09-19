/**
 * Sample for customer satisfaction in the Circular Gauge
 */

 import * as React from "react";
 import {
   CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, GaugeTheme, ILoadedEventArgs,
   RangesDirective, RangeDirective, AnnotationsDirective, AnnotationDirective, Annotations, GaugeTooltip, Legend, Inject
 } from '@syncfusion/ej2-react-circulargauge';
 import { SampleBase } from '../common/sample-base';
 
 const SAMPLE_CSS = `
     .control-fluid {
     padding: 0px !important;
     }`;
 
 export class CustomerSatisfactionScore extends SampleBase<{}, {}> {
 
   public load(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
     // custom code end
   }
 
   render() {
     return (
       <main><div className='control-pane'>
         <style>
           {SAMPLE_CSS}
         </style>
         <div className='control-section'>
           <CircularGaugeComponent load={this.load.bind(this)} id="gauge" background="transparent" height="400px" allowMargin={false} title="Customer Satisfaction Score" titleStyle={{ size: '18px', fontFamily: 'inherit' }}
             tooltip={{ enable: true, template: '<div style="font-size:18px;background:white;width:150px;color:#595959;border:1px solid #e8e8e8">Current Score: 7.5 </div>' }}
             legendSettings={{ visible: true, position: 'Bottom', width: "70%", textStyle: { fontFamily: 'inherit', size: '12px' }, }} >
             <Inject services={[Annotations, GaugeTooltip, Legend]} />
             <AxesDirective>
               <AxisDirective startAngle={270} endAngle={90} radius="100%" minimum={0} maximum={10} majorTicks={{ width: 1.5, height: 12, interval: 2, offset: 35 }}
                 lineStyle={{ width: 0 }} minorTicks={{ width: 0 }} labelStyle={{ font: { size: '14px', fontFamily: 'inherit' }, position: 'Outside', offset: -40, }} >
                 <AnnotationsDirective>
                   <AnnotationDirective content='<div style="font-size:16px;margin-top: 5px;font-family: inherit;">7.5</div>' angle={0} radius="-10%" zIndex="1" ></AnnotationDirective>
                 </AnnotationsDirective>
                 <PointersDirective>
                   <PointerDirective value={7.5} radius="70%" pointerWidth={5} needleEndWidth={2} cap={{ radius: 8, border: { width: 2 }, }} />
                   <PointerDirective value={6.5} radius="68%" type="Marker" markerShape="Rectangle" markerWidth={40} markerHeight={0.5} needleEndWidth={2} color="#0477c2"
                     animation={{ enable: false }} cap={{ radius: 0, border: { width: 0 }, }} />
                   <PointerDirective value={9.5} radius="68%" type="Marker" markerShape="Rectangle" markerWidth={40} markerHeight={0.5} needleEndWidth={2} color="#0477c2" animation={{ enable: false }} cap={{ radius: 0, border: { width: 0 }, }} />
                 </PointersDirective>
                 <RangesDirective>
                   <RangeDirective start={0} end={2} radius="80%" color="#F03E3E" startWidth={40} endWidth={40} legendText="Poor" />
                   <RangeDirective start={6.5} end={9.5} radius="110%" color="#0477c2" startWidth={120} endWidth={120} legendText="Average Score" />
                   <RangeDirective start={2} end={5} radius="80%" color="#f6961e" startWidth={40} endWidth={40} legendText="Satisfied" />
                   <RangeDirective start={5} end={8} radius="80%" color="#FFDD00" startWidth={40} endWidth={40} legendText="Good" />
                   <RangeDirective start={8} end={10} radius="80%" color="#30B32D" startWidth={40} endWidth={40} legendText="Excellent" />
                 </RangesDirective>
               </AxisDirective>
             </AxesDirective>
           </CircularGaugeComponent>
         </div>
         </div>
         <section id="action-description" aria-label="Description of Circular Gauge sample">
           <p>
             This sample shows an arc gauge with a real-time scenario of a customer satisfaction score ranging from 0 to 10.
           </p>
         </section>
         <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
           <p>
             In this example, you can see how to render an arc gauge showing customer satisfaction score. You can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel/">axes</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/">ranges</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/">annotations</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/legendSettingsModel/">legend</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tooltipSettingsModel/">tooltip</a> oriented properties to customize the appearance of the arc gauge, in order to achieve the desired outcome.
           </p>
           <p>
             More information on the arc gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
           </p>
         </section>
      </main>
     )
   }
 }