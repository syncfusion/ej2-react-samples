import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  HtmlModel,
  DiagramComponent,
  NodeModel,
  Node,
  Diagram
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
  AnnotationsDirective,
  AnnotationDirective
} from "@syncfusion/ej2-react-circulargauge";


let shape: HtmlModel = { type: "HTML" };
let node1: NodeModel = {
  id: "node",
  offsetX: 450,
  offsetY: 200,
  width: 300,
  height: 500,
  shape: shape
};
let diagramInstance: DiagramComponent;

var template = diagramTemplate;

function diagramTemplate(props) {

  if (props.id === "node") {
    return (<CircularGaugeComponent id='range-container' ref={gauge => this.gauge = gauge} >

      <AxesDirective>
        <AxisDirective startAngle={210} radius='80%' endAngle={150} minimum={0} maximum={120}
          majorTicks={{
            height: 10, offset: 5,
          }} lineStyle={{ width: 10, color: 'transparent' }}
          minorTicks={{
            height: 0
          }} labelStyle={{
            position: 'Inside',
            font: {
              size: '12px',
              fontFamily: 'Roboto', fontStyle: 'Regular'
            },
            useRangeColor: false
          }}>
          <PointersDirective>
            <PointerDirective value={65} radius='60%' pointerWidth={8} needleTail={{
              length: '18%'
            }} cap={{
              radius: 7
            }} />
          </PointersDirective>
          <RangesDirective>
            <RangeDirective start={0} end={40} color='#30B32D' />
            <RangeDirective start={40} end={80} color='#FFDD00' />
            <RangeDirective start={80} end={120} color='#F03E3E' />
          </RangesDirective>
          <AnnotationsDirective>
            <AnnotationDirective content='<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>'
              angle={0} zIndex='1' radius='30%'>
            </AnnotationDirective>
            <AnnotationDirective content='<div><span style="font-size:24px; color:#424242; font-family:Regular">65 MPH</span></div>'
              angle={180} zIndex='1' radius='40%'>
            </AnnotationDirective>
          </AnnotationsDirective>
        </AxisDirective>
      </AxesDirective>
    </CircularGaugeComponent>)
  }
}

export class HtmlNode extends SampleBase<{}, {}> {
  rendereComplete() {

    diagramInstance.fitToPage();
  }
  render() {
    return (
      <div className="control-pane">
        <div
          className="control-section"
        >
          <DiagramComponent
            id="diagram"
            ref={diagram => (diagramInstance = diagram)}
            width={"100%"}
            height={"640px"}
            nodes={[node1]}
            nodeTemplate={template.bind(this)}
            snapSettings={{ constraints: 0 }}
          />
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates how to host a HTML element inside a node. In this example, a Gauge control is hosted inside a HTML Node.
          </p>
        </div>
        <div id="description">
          <p>
            This example shows how to host a control inside a node. The
            <code>shape</code> property of the node can be used to host HTML
            content inside a node. The
            <code>content</code> property of the shape allows you to define the
            content to be hosted.
          </p>
          <br />
        </div>
      </div>
    );
  }
}

