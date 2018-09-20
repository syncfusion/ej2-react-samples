import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { IScrollChangeEventArgs, DiagramComponent, NodeModel, ConnectorModel, BasicShapeModel, Node, Connector, Diagram, DiagramTools } from '@syncfusion/ej2-react-diagrams'
import { SampleBase } from '../common/sample-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ToolbarComponent, ClickEventArgs } from '@syncfusion/ej2-react-navigations';

let shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle', cornerRadius: 10 };

let nodes: NodeModel[] = [
    {
        id: 'sourceNode1', width: 100, height: 50, offsetX: 120, offsetY: 100,
        style: { strokeColor: '#666666', fill: '#90EE90' },
        annotations: [{ content: 'Source Document', margin: { left: 15, right: 15, bottom: 15, top: 15 } }]
    },
    {
        id: 'censusNode2', width: 100, height: 75, offsetX: 120, offsetY: 225,
        shape: { type: 'Basic', shape: 'Diamond' },
        style: { strokeColor: '#666666', fill: '#87CEEB' },
        annotations: [{ content: 'Census Record', margin: { left: 15, right: 15, bottom: 15, top: 15 } }]
    },
    {
        id: 'booksNode3', width: 100, height: 75, offsetX: 120, offsetY: 350,
        shape: { type: 'Basic', shape: 'Diamond' },
        style: { strokeColor: '#666666', fill: '#87CEEB' },
        annotations: [{ content: 'Books and Magazine' }]
    },
    {
        id: 'recordNode4', width: 125, height: 50, offsetX: 320, offsetY: 225,
        style: { strokeColor: '#666666', fill: '#90EE90' },
        annotations: [{ content: 'Record Template' }]
    },
    {
        id: 'traditionalNode5', width: 125, height: 50, offsetX: 320, offsetY: 350,
        style: { strokeColor: '#666666', fill: '#90EE90' },
        annotations: [{ content: 'Traditional Template' }]
    },
    {
        id: 'nontraditionalNode6', width: 135, height: 50, offsetX: 120, offsetY: 450,
        style: { strokeColor: '#666666', fill: '#90EE90' },
        annotations: [{ content: 'Nontraditional' }]
    },
];

let connectors: ConnectorModel[] = [
    { id: 'flowChartConnector1', sourceID: 'sourceNode1', targetID: 'censusNode2' },
    {
        id: 'flowChartConnector2', sourceID: 'censusNode2', targetID: 'booksNode3',
        annotations: [{ content: 'No', style: { fill: 'White' } }]
    },
    {
        id: 'flowChartConnector3', sourceID: 'booksNode3', targetID: 'nontraditionalNode6',
        annotations: [{ content: 'No', style: { fill: 'White' } }]
    },
    {
        id: 'flowChartConnector4', sourceID: 'censusNode2', targetID: 'recordNode4',
        annotations: [{ content: 'Yes', style: { fill: 'White' } }]
    },
    {
        id: 'flowChartConnector5', sourceID: 'booksNode3', targetID: 'traditionalNode5',
        annotations: [{ content: 'Yes', style: { fill: 'White' } }]
    },
];

let diagramInstance: DiagramComponent;
let zoomFactor: NumericTextBoxComponent;
let horizontalOffset: NumericTextBoxComponent;
let verticalOffset: NumericTextBoxComponent;

export class ZoomPan extends SampleBase<{}, {}>{
    rendereComplete() {
        diagramInstance.scrollChange = (args: IScrollChangeEventArgs) => {
            horizontalOffset.value = args.newValue.HorizontalOffset;
            verticalOffset.value = args.newValue.VerticalOffset;
        };
        diagramInstance.fitToPage();
    }
    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section">
                    <ToolbarComponent id="toolbar_default"
                        clicked={onItemClick}
                        items={[
                            {
                                type: 'Button', tooltipText: 'ZoomIn', text: 'ZoomIn', prefixIcon: 'e-diagram-icons e-zoomin'
                            },
                            {
                                type: 'Button', tooltipText: 'ZoomOut', text: 'ZoomOut', prefixIcon: 'e-diagram-icons e-zoomout'
                            },
                            {
                                type: 'Button', tooltipText: 'Pan', text: 'Pan', prefixIcon: 'sf-icon-Pan'
                            },
                            {
                                type: 'Button', tooltipText: 'Reset', text: 'Reset', prefixIcon: 'e-diagram-icons e-reset'
                            },
                        ]} />

                    <div className="content-wrapper">
                        <DiagramComponent id='diagram' ref={diagram => diagramInstance = diagram}
                            width={'100%'}
                            height={'580px'}
                            mode={'SVG'}
                            nodes={nodes}
                            connectors={connectors}>
                        </DiagramComponent>
                    </div>
                </div>

                <div className="col-lg-4 property-section">
                    <div className="property-panel-header">
                        Properties
    </div>
                    <table id="property" title="Properties" style={{ width: '100%' }}>
                        <tr>
                            <td>Zoom Factor</td>
                            <td>
                                <NumericTextBoxComponent ref={zoomFactorRef => zoomFactor = zoomFactorRef}
                                    id="zoomFact" style={{ width: '90px' }} min={0.2} max={30} step={0.2} value={0.2} />
                            </td>
                        </tr>
                        <tr>
                            <td>Horizontal Offset</td>
                            <td>
                                <NumericTextBoxComponent ref={horizontalOffsetRef => horizontalOffset = horizontalOffsetRef}
                                    id="horOffset" style={{ width: '90px' }} min={0} max={1000} step={1} value={0} />
                            </td>
                        </tr>
                        <tr>
                            <td>Vertical Offset</td>
                            <td>
                                <NumericTextBoxComponent ref={verticalOffsetRef => verticalOffset = verticalOffsetRef}
                                    id="verOffset" style={{ width: '90px' }} min={0} max={1000} step={1} value={0} />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

function onItemClick(args: ClickEventArgs): void {
    switch (args.item.tooltipText) {
        case 'ZoomIn':
            diagramInstance.zoomTo({ zoomFactor: Number(zoomFactor.value), type: 'ZoomIn' });
            break;
        case 'ZoomOut':
            diagramInstance.zoomTo({ zoomFactor: Number(zoomFactor.value), type: 'ZoomOut' });
            break;
        case 'Pan':
            diagramInstance.tool = DiagramTools.ZoomPan;
            break;
        case 'Reset':
            diagramInstance.reset();
            diagramInstance.fitToPage();
            break;
    }
}