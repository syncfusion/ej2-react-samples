import * as ReactDOM from "react-dom";
import * as React from "react";
import {
  Node,
  HierarchicalTree,
  DataBinding,
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  Connector,
  SnapConstraints,
  DecoratorModel,
  Inject,
  DiagramTools
} from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";

//Initialize Diagram Nodes
let nodes: NodeModel[] = [
  {
    id: 'Equipment', width: 120, height: 40, offsetX: 300, offsetY: 80,
    annotations: [{ content: 'Equipment', style: { color: 'white' } }],
    style: { fill: '#39AFA9' }, borderColor: '05776C',
    shape: { type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z' }
  },
  {
    id: 'Environment', width: 120, height: 40, offsetX: 450, offsetY: 80,
    annotations: [{ content: 'Environment', style: { color: 'white' } }],
    style: { fill: '#39AFA9' }, borderColor: '05776C',
    shape: { type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z' }
  },
  {
    id: 'Person', width: 120, height: 40, offsetX: 600, offsetY: 80,
    annotations: [{ content: 'Person', style: { color: 'white' } }],
    style: { fill: '#39AFA9' }, borderColor: '05776C',
    shape: { type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z' }
  },
  {
    id: 'Materials', width: 120, height: 40, offsetX: 300, offsetY: 600,
    annotations: [{ content: 'Materials', style: { color: 'white' } }],
    style: { fill: '#39AFA9' }, borderColor: '05776C',
    shape: { type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z' }
  },
  {
    id: 'Machine', width: 120, height: 40, offsetX: 450, offsetY: 600,
    annotations: [{ content: 'Machine', style: { color: 'white' } }],
    style: { fill: '#39AFA9' }, borderColor: '05776C',
    shape: { type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z' }
  },
  {
    id: 'Methods', width: 120, height: 40, offsetX: 600, offsetY: 600,
    annotations: [{ content: 'Methods', style: { color: 'white' } }],
    style: { fill: '#39AFA9' }, borderColor: '05776C',
    shape: {
      type: 'Path', data: 'M 10 0 L 166 0 L 156 44 L 0 44 z'
    }
  },
  {
    id: 'ellipse1', width: 20, height: 20, offsetX: 290, offsetY: 130,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse2', width: 20, height: 20, offsetX: 323, offsetY: 183,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse3', width: 20, height: 20, offsetX: 354, offsetY: 237,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse4', width: 20, height: 20, offsetX: 440, offsetY: 130,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse5', width: 20, height: 20, offsetX: 470, offsetY: 182,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse6', width: 20, height: 20, offsetX: 590, offsetY: 130,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse7', width: 20, height: 20, offsetX: 622, offsetY: 179,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse8', width: 20, height: 20, offsetX: 660, offsetY: 221,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse9', width: 20, height: 20, offsetX: 694, offsetY: 264,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse10', width: 20, height: 20, offsetX: 354, offsetY: 460,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse11', width: 20, height: 20, offsetX: 590, offsetY: 530,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse12', width: 20, height: 20, offsetX: 660, offsetY: 460,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse13', width: 20, height: 20, offsetX: 440, offsetY: 530,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse14', width: 20, height: 20, offsetX: 510, offsetY: 460,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'ellipse15', width: 20, height: 20, offsetX: 290, offsetY: 530,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'Colorellipse1', width: 50, height: 50, offsetX: 717, offsetY: 310,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'Colorellipse2', width: 50, height: 50, offsetX: 560, offsetY: 310,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'Colorellipse3', width: 50, height: 50, offsetX: 390, offsetY: 310,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'Colorellipse4', width: 50, height: 50, offsetX: 220, offsetY: 310,
    annotations: [{ content: ' ', style: { color: 'white' } }],
    shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeColor: '#A52A2A' }
  },
  {
    id: 'Colorellipse5', width: 140, height: 90, offsetX: 900, offsetY: 310,
    annotations: [{ content: 'Productivity Increase', style: { color: 'white' } }],
    style: { fill: '#39AFA9' }, borderColor: '05776C',
    shape: { type: 'Basic', shape: 'Ellipse' }
  },
  {
    id: 'TextPrograms', width: 90, height: 20, offsetX: 189, offsetY: 130,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Text Programs' }
  },
  {
    id: 'Ventilatorssound', width: 120, height: 20, offsetX: 359, offsetY: 130,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Ventilators Sound' }
  },
  {
    id: 'Education', width: 70, height: 20, offsetX: 500, offsetY: 130,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Education' }
  },
  {
    id: 'DataBooks', width: 70, height: 20, offsetX: 213, offsetY: 183,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'DataBooks' }
  },
  {
    id: 'Fixtures', width: 70, height: 20, offsetX: 240, offsetY: 237,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Fixtures' }
  },
  {
    id: 'Noise', width: 70, height: 20, offsetX: 390, offsetY: 182,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Noise' }
  },
  {
    id: 'Motivation', width: 70, height: 20, offsetX: 535, offsetY: 182,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Motivation' }
  },
  {
    id: 'Tiredness', width: 70, height: 20, offsetX: 565, offsetY: 224,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Tiredness' }
  },
  {
    id: 'Storer', width: 70, height: 20, offsetX: 606, offsetY: 264,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Storer' }
  },
  {
    id: 'Computer', width: 70, height: 20, offsetX: 260, offsetY: 460,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Computer' }
  },
  {
    id: 'Quality', width: 120, height: 20, offsetX: 417, offsetY: 460,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Quality of Element' }
  },
  {
    id: 'Order', width: 70, height: 20, offsetX: 562, offsetY: 460,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Order' }
  },
  {
    id: 'Software', width: 70, height: 20, offsetX: 225, offsetY: 530,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Software' }
  },
  {
    id: 'Procurement', width: 70, height: 20, offsetX: 358, offsetY: 530,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Procurement' }
  },
  {
    id: 'Standardization', width: 90, height: 20, offsetX: 501, offsetY: 530,
    style: { fill: 'transparent', strokeWidth: 0 },
    shape: { type: 'Text', content: 'Standardization' }
  },
];
//Initializes the Connectors for the diagram
let connectors: ConnectorModel[] = [
  createConnector('equipellise', '5,5', 'Equipment', 'ellipse1', '#A52A2A', 2),
  createConnector('connect12', '5,5', 'ellipse1', 'ellipse2', '#A52A2A', 2),
  createConnector('connect13', '5,5', 'ellipse2', 'ellipse3', '#A52A2A', 2),
  createConnector('connect14', '5,5', 'ellipse3', 'Colorellipse3', '#A52A2A', 2),
  createConnector('connect15', '5,5', 'Environment', 'ellipse4', '#A52A2A', 2),
  createConnector('connect16', '5,5', 'ellipse4', 'ellipse5', '#A52A2A', 2),
  createConnector('connect17', '5,5', 'ellipse4', 'ellipse5', '#A52A2A', 2),
  createConnector('connect18', '5,5', 'ellipse5', 'Colorellipse2', '#A52A2A', 2),
  createConnector('connect19', '5,5', 'Person', 'ellipse6', '#A52A2A', 2),
  createConnector('connect20', '5,5', 'ellipse6', 'ellipse7', '#A52A2A', 2),
  createConnector('connect21', '5,5', 'ellipse7', 'ellipse8', '#A52A2A', 2),
  createConnector('connect22', '5,5', 'ellipse8', 'ellipse9', '#A52A2A', 2),
  createConnector('connect23', '5,5', 'ellipse9', 'Colorellipse1', '#A52A2A', 2),
  createConnector('connect24', '5,5', 'Materials', 'ellipse15', '#A52A2A', 2),
  createConnector('connect25', '5,5', 'ellipse15', 'ellipse10', '#A52A2A', 2),
  createConnector('connect26', '5,5', 'ellipse10', 'Colorellipse3', '#A52A2A', 2),
  createConnector('connect27', '5,5', 'Machine', 'ellipse13', '#A52A2A', 2),
  createConnector('connect28', '5,5', 'ellipse13', 'ellipse14', '#A52A2A', 2),
  createConnector('connect29', '5,5', 'ellipse14', 'Colorellipse2', '#A52A2A', 2),
  createConnector('connect30', '5,5', 'Methods', 'ellipse11', '#A52A2A', 2),
  createConnector('connect31', '5,5', 'ellipse11', 'ellipse12', '#A52A2A', 2),
  createConnector('connect32', '5,5', 'ellipse12', 'Colorellipse1', '#A52A2A', 2),
  createConnector('connect33', '', 'Colorellipse4', 'Colorellipse3', '#000000', 2),
  createConnector('connect34', '', 'Colorellipse3', 'Colorellipse2', '#000000', 2),
  createConnector('connect35', '', 'Colorellipse2', 'Colorellipse1', '#000000', 2),
  createConnector('connect36', '', 'Colorellipse1', 'Colorellipse5', '#000000', 2),
  createConnector('connect37', '5,5', 'TextPrograms', 'ellipse1', '#A52A2A', 2),
  createConnector('connect38', '5,5', 'DataBooks', 'ellipse2', '#A52A2A', 2),
  createConnector('connect39', '5,5', 'Fixtures', 'ellipse3', '#A52A2A', 2),
  createConnector('connect40', '5,5', 'Ventilatorssound', 'ellipse4', '#A52A2A', 2),
  createConnector('connect41', '5,5', 'Noise', 'ellipse5', '#A52A2A', 2),
  createConnector('connect42', '5,5', 'Education', 'ellipse6', '#A52A2A', 2),
  createConnector('connect43', '5,5', 'Motivation', 'ellipse7', '#A52A2A', 2),
  createConnector('connect44', '5,5', 'Tiredness', 'ellipse8', '#A52A2A', 2),
  createConnector('connect45', '5,5', 'Storer', 'ellipse9', '#A52A2A', 2),
  createConnector('connect46', '5,5', 'Software', 'ellipse15', '#A52A2A', 2),
  createConnector('connect47', '5,5', 'Computer', 'ellipse10', '#A52A2A', 2),
  createConnector('connect48', '5,5', 'Procurement', 'ellipse13', '#A52A2A', 2),
  createConnector('connect49', '5,5', 'Quality', 'ellipse14', '#A52A2A', 2),
  createConnector('connect50', '5,5', 'Order', 'ellipse12', '#A52A2A', 2),
  createConnector('connect51', '5,5', 'Standardization', 'ellipse11', '#A52A2A', 2)
];
let diagramInstance: DiagramComponent;

export class Fishbone extends SampleBase<{}, {}> {
  rendereComplete() {
    diagramInstance.fitToPage({ mode: 'Width' });
  }
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div style={{ width: "100%" }}>
            <DiagramComponent
              id="diagram"
              ref={diagram => (diagramInstance = diagram)}
              width={"100%"}
              height={"700px"}
              snapSettings={{ constraints: SnapConstraints.None }}
              nodes={nodes}
              connectors={connectors}
              getConnectorDefaults={(connector: Connector) => {
                connector.targetDecorator = { shape: 'Arrow', width: 5, height: 5 } as DecoratorModel;
                if (connector.id !== 'connect33' && connector.id !== 'connect34' &&
                  connector.id !== 'connect35' && connector.id !== 'connect36') {
                  connector.targetDecorator.style = { strokeColor: '#A52A2A', fill: '#A52A2A' };
                }
              }}
              tool={DiagramTools.ZoomPan}
            >
              <Inject services={[DataBinding, HierarchicalTree]} />
            </DiagramComponent>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample visually represents a simple fishbone diagram (Ishikawa).
             Diagram nodes and annotations are used to define fishbone diagrams. Read-only mode is enabled here.
</p>
        </div>
        <div id="description">
          <p>
            This sample shows how to create a fishbone diagram (Ishikawa) using diagram control.
            Here, zoom and pan options are enabled. The tool property of the diagram control
            allows you to enable or disable zoom and pan options.

          </p>

          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            The diagram component’s features are segregated into individual
            feature-wise modules. To generate diagrams from an external data
            source, inject <code>DataBinding</code> module using{" "}
            <code>Diagram.Inject(DataBinding)</code> method. To automatically
            arrange the objects in a hierarchical structure, inject{" "}
            <code>HierarchicalTree</code> module into <code>services</code>.
          </p>
          <br />
        </div>
      </div>
    );
  }
}



function createConnector(
  name: string, lineDashArray: string, source: string, target: string, lineColor: string, lineWidth: number): ConnectorModel {
  let connector: ConnectorModel = {};
  connector.id = name;
  connector.sourceID = source;
  connector.targetID = target;
  connector.style = {
    strokeColor: lineColor,
    strokeWidth: lineWidth,
    strokeDashArray: lineDashArray,
  };
  return connector;
}