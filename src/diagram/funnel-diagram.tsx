import * as React from 'react';
import {
    DiagramComponent, NodeModel, SnapConstraints, DiagramTools, ConnectorModel, NodeConstraints, ShapeAnnotationModel, ConnectorConstraints
} from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';

const LEVEL_COLORS = {
    level1: '#C2272D',
    level2: '#F16C0D',
    level3: '#FFC107',
    level4: '#4CB443',
    level5: '#008AE0',
    level6: '#8715BC',
};

// Tooltip Template
function getToolTemplate(iconClass: string, iconFill: string, description: string, cumulativeRate: number, conversionRate?: number): string {
    return ` 
<div style="border-radius: 8px; max-width: 240px; min-width: 180px; padding: 12px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px;">
<!-- Container for icon and description -->
<div style="display: flex; align-items: center; padding: 5px 0px;">
    <div class="${iconClass} annotation-icon" style="display: flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; background: ${iconFill}; color: #FFFFFF; border-radius: 50%; margin-right: 10px;"></div>
    <div style="font-weight: 600; font-size: 16px;">
        ${description}
    </div>
</div>
<hr style="margin: 3px; border-top: 1px solid #9CA3AF;">

<div style="display: grid; row-gap: 8px;">
    ${conversionRate !== undefined ? `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 500; opacity:0.7;">Conversion</span>
            <span style="font-weight: 600;">${conversionRate}%</span>
        </div>
    ` : ''}

    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 500; opacity:0.7;">Cumulative</span>
        <span style="font-weight: 600;">${cumulativeRate}%</span>
    </div>
</div>
</div>
`;
}

// Title Icon Annotation Template
function getIconTemplate(iconClass: string) {
    return `<div class="${iconClass}" style="width: 60px; height: 60px;display: flex; align-items: center;
            justify-content: center; font-size: 34px; color: #FFFFFF; !important;">
            </div>`;
}

// Annotation
function getStageLabel(content: string): ShapeAnnotationModel {
    return {
        content: content,
        offset: { x: 0, y: 0.5 },
        horizontalAlignment: 'Right',
        verticalAlignment: 'Bottom',
        margin: { right: 6, bottom: 4 },
        style: { fontSize: 16, textWrapping: 'NoWrap', fontFamily: 'Segoe UI' }
    };
}

export class FunnelDiagram extends SampleBase<{}, {}> {
    private diagramRef = React.createRef<DiagramComponent>();
    private diagramCreated: boolean = false;

    private nodes: NodeModel[] = [
        // Title Node
        {
            id: 'title',
            offsetX: 150, offsetY: -40,
            width: 250, height: 50,
            annotations: [
                {
                    content: 'Marketing Funnel', offset: { x: 0.5, y: 0.2 },
                    style: { color: '#111827', fontSize: 24, fontFamily: 'Segoe UI' }
                },
                {
                    content: 'Measuring Campaign Effectiveness', offset: { x: 0.5, y: 0.7 },
                    style: { color: '#6B7280', fontSize: 16, fontFamily: 'Segoe UI', }
                }
            ],
            constraints: NodeConstraints.None,
            style: { strokeColor: 'transparent' }
        },
        // First level of the funnel.
        {
            // Unique identifier for the node.
            id: 'awareness',
            offsetX: 150,
            offsetY: 100,
            width: 560,
            height: 80,
            annotations: [{
                content: '10,000',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            // Trapezoidal shape defined by SVG path data.
            shape: { type: 'Path', data: 'M560 0H0L56.7194 80H503.281L560 0Z' },
            // Visual style for the node.
            style: { fill: LEVEL_COLORS.level1, strokeColor: 'transparent' },
            // Tooltip for showing conversion rates
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: getToolTemplate('sf-icon-ads-exposure', LEVEL_COLORS.level1, 'Ad Exposure', 100)
            },
            // Port for connecting label
            ports: [{ id: 'port', offset: { x: 0.9, y: 0.8 } }],
        },
        // Second level of the funnel.
        {
            id: 'interest',
            offsetX: 150,
            offsetY: 180,
            width: 446,
            height: 80,
            annotations: [{
                content: '6,500',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M503 80H57L113.648 160H446.352L503 80Z' },
            style: { fill: LEVEL_COLORS.level2, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: getToolTemplate('sf-icon-page-visits', LEVEL_COLORS.level2, 'Page Visits', 65, 65.00)
            },
            ports: [{ id: 'port', offset: { x: 0.89, y: 0.8 } }],
        },
        // Third level of the funnel.
        {
            id: 'consideration',
            offsetX: 150,
            offsetY: 260,
            width: 334,
            height: 80,
            annotations: [{
                content: '3,800',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M447 160H113L169.869 240H390.131L447 160Z' },
            style: { fill: LEVEL_COLORS.level3, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: getToolTemplate('sf-icon-sign-up', LEVEL_COLORS.level3, 'Sign Ups', 38, 58.46)
            },
            ports: [{ id: 'port', offset: { x: 0.85, y: 0.8 } }],
        },
        // Fourth level of the funnel.
        {
            id: 'intent',
            offsetX: 150,
            offsetY: 340,
            width: 220,
            height: 80,
            annotations: [{
                content: '2,000',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M170 240L226.801 320H333.199L390 240H170Z' },
            style: { fill: LEVEL_COLORS.level4, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: getToolTemplate('sf-icon-demo-request', LEVEL_COLORS.level4, 'Demo Requests', 20, 52.63)
            },
            ports: [{ id: 'port', offset: { x: 0.8, y: 0.8 } }],
        },
        // Fifth level of the funnel.
        {
            id: 'purchase',
            offsetX: 150,
            offsetY: 420,
            width: 106,
            height: 80,
            annotations: [{
                content: '1,200',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M333 320H227V400H333V320Z' },
            style: { fill: LEVEL_COLORS.level5, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: getToolTemplate('sf-icon-orders', LEVEL_COLORS.level5, 'Orders', 12, 60.00)
            },
            ports: [{ id: 'port', offset: { x: 0.9, y: 0.8 } }],
        },
        // Sixth and final level of the funnel.
        {
            id: 'retention',
            offsetX: 150,
            offsetY: 500,
            width: 106,
            height: 80,
            annotations: [{
                content: '800',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M227 480H333V400H227V480Z' },
            style: { fill: LEVEL_COLORS.level6, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: getToolTemplate('sf-icon-engagement', LEVEL_COLORS.level6, 'Subscribed Users', 8, 66.67)
            },
            ports: [{ id: 'port', offset: { x: 0.9, y: 0.8 } }],
        },
        // Labels
        {
            id: 'awareness_label', offsetX: 620, offsetY: 100, width: 60, height: 60,
            annotations: [
                { template: getIconTemplate('sf-icon-ads-exposure') },
                getStageLabel('Ad Exposure')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: LEVEL_COLORS.level1, strokeColor: LEVEL_COLORS.level1 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'interest_label', offsetX: 620, offsetY: 180, width: 60, height: 60,
            annotations: [
                { template: getIconTemplate('sf-icon-page-visits') },
                getStageLabel('Page Visits')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: LEVEL_COLORS.level2, strokeColor: LEVEL_COLORS.level2 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'consideration_label', offsetX: 620, offsetY: 260, width: 60, height: 60,
            annotations: [
                { template: getIconTemplate('sf-icon-sign-up') },
                getStageLabel('Sign Ups')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: LEVEL_COLORS.level3, strokeColor: LEVEL_COLORS.level3 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'intent_label', offsetX: 620, offsetY: 340, width: 60, height: 60,
            annotations: [
                { template: getIconTemplate('sf-icon-demo-request') },
                getStageLabel('Demo Requests')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: LEVEL_COLORS.level4, strokeColor: LEVEL_COLORS.level4 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'purchase_label', offsetX: 620, offsetY: 420, width: 60, height: 60,
            annotations: [
                { template: getIconTemplate('sf-icon-orders') },
                getStageLabel('Orders')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: LEVEL_COLORS.level5, strokeColor: LEVEL_COLORS.level5 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'retention_label', offsetX: 620, offsetY: 500, width: 60, height: 60,
            annotations: [
                { template: getIconTemplate('sf-icon-engagement') },
                getStageLabel('Subscribed Users')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: LEVEL_COLORS.level6, strokeColor: LEVEL_COLORS.level6 },
            constraints: NodeConstraints.InConnect
        },
    ];
    // Connectors
    private connectors: ConnectorModel[] = [
        {
            sourceID: 'awareness', sourcePortID: 'port',
            targetID: 'awareness_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: LEVEL_COLORS.level1 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 124 } },
                { type: 'Straight', point: { x: 455, y: 98 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'interest', sourcePortID: 'port',
            targetID: 'interest_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: LEVEL_COLORS.level2 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 204 } },
                { type: 'Straight', point: { x: 455, y: 178 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'consideration', sourcePortID: 'port',
            targetID: 'consideration_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: LEVEL_COLORS.level3 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 284 } },
                { type: 'Straight', point: { x: 455, y: 258 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'intent', sourcePortID: 'port',
            targetID: 'intent_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: LEVEL_COLORS.level4 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 364 } },
                { type: 'Straight', point: { x: 455, y: 338 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'purchase', sourcePortID: 'port',
            targetID: 'purchase_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: LEVEL_COLORS.level5 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 444 } },
                { type: 'Straight', point: { x: 455, y: 418 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'retention', sourcePortID: 'port',
            targetID: 'retention_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: LEVEL_COLORS.level6 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 524 } },
                { type: 'Straight', point: { x: 455, y: 498 } },
            ],
            constraints: ConnectorConstraints.None
        },
    ];
    render() {
        return (
            <div className="control-pane diagram-control-pane">
                <style>{funnelCss}</style>
                <div className="control-section funnel-diagram-container" style={{ opacity: 0 }}>
                    {/* Initializes and renders diagram control */}
                    <DiagramComponent
                        ref={this.diagramRef}
                        id="diagram"
                        width="100%"
                        height="675px"
                        nodes={this.nodes}
                        connectors={this.connectors}
                        snapSettings={{
                            constraints: SnapConstraints.None
                        }}
                        created={() => {
                            this.diagramCreated = true;
                            // Fit the diagram to the page on creation.
                            this.diagramRef.current.fitToPage();
                            setTimeout(() => {
                                // show diagram
                                const container = document.querySelector('.funnel-diagram-container') as HTMLElement;
                                if (container) {
                                    container.style.opacity = '1';
                                }
                            }, 10)
                        }}
                        load={() => {
                            if (this.diagramCreated) {
                                this.diagramRef.current.fitToPage();
                            }
                        }}
                    >
                    </DiagramComponent>
                </div>
                <div id="action-description">
                    <p>
                        The funnel diagram is built using the Syncfusion<sup>®</sup> EJ2 React Diagram component, and it visually represents the conversion flow of users through a marketing campaign. The diagram is structured as a vertically stacked funnel, narrowing from top to bottom to indicate decreasing user counts at each stage of the customer journey.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Each funnel stage is constructed using customizable node shapes that reflect its width and value, while distinct colors enhance visual clarity. Interactive tooltip display conversion and cumulative rates on hover, and labels indicate the purpose of each stage. This structured visual approach helps marketers quickly assess performance and identify areas for improvement.
                    </p>
                </div>
            </div>
        );
    }
}

const funnelCss = `
@font-face {
font-family: 'Funnel Diagram Icon';
src:
url(data:application/x-font-ttf;charset=utf-8;base64,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bCBEaWFncmFtIEljb25SZWd1bGFyRnVubmVsIERpYWdyYW0gSWNvbkZ1bm5lbCBEaWFncmFtIEljb25WZXJzaW9uIDEuMEZ1bm5lbCBEaWFncmFtIEljb25Gb250IGdlbmVyYXRlZCB1c2luZyBTeW5jZnVzaW9uIE1ldHJvIFN0dWRpb3d3dy5zeW5jZnVzaW9uLmNvbQAgAEYAdQBuAG4AZQBsACAARABpAGEAZwByAGEAbQAgAEkAYwBvAG4AUgBlAGcAdQBsAGEAcgBGAHUAbgBuAGUAbAAgAEQAaQBhAGcAcgBhAG0AIABJAGMAbwBuAEYAdQBuAG4AZQBsACAARABpAGEAZwByAGEAbQAgAEkAYwBvAG4AVgBlAHIAcwBpAG8AbgAgADEALgAwAEYAdQBuAG4AZQBsACAARABpAGEAZwByAGEAbQAgAEkAYwBvAG4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAdQBzAGkAbgBnACAAUwB5AG4AYwBmAHUAcwBpAG8AbgAgAE0AZQB0AHIAbwAgAFMAdAB1AGQAaQBvAHcAdwB3AC4AcwB5AG4AYwBmAHUAcwBpAG8AbgAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwECAQMBBAEFAQYBBwEIAAxhZHMtZXhwb3N1cmULcGFnZS12aXNpdHMHc2lnbi11cAxkZW1vLXJlcXVlc3QGb3JkZXJzCmVuZ2FnZW1lbnQAAAA=) format('truetype');
font-weight: normal;
font-style: normal;
}

[class^="sf-icon-"], [class*=" sf-icon-"] {
 font-family: 'Funnel Diagram Icon' !important;
speak: none;
font-size: 24px;
font-style: normal;
font-weight: normal;
font-variant: normal;
text-transform: none;
line-height: 1;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

.sf-icon-ads-exposure:before { content: "\\e700"; }
.sf-icon-page-visits:before { content: "\\e701"; }
.sf-icon-sign-up:before { content: "\\e702"; }
.sf-icon-demo-request:before { content: "\\e703"; }
.sf-icon-orders:before { content: "\\e704"; }
.sf-icon-engagement:before { content: "\\e705"; }
`