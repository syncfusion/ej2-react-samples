import * as React from 'react';
import {
    DiagramComponent,
    NodeModel,
    ConnectorModel,
    SnapConstraints,
    DiagramTools,
    NodeConstraints,
    PortVisibility,
    Rect,
    ConnectorConstraints
} from '@syncfusion/ej2-react-diagrams';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';

let diagram: DiagramComponent;
// Domain data: medical breakthroughs displayed as timeline nodes in a serpentine layout
const medicalBreakthroughs = [
    { id: '1', year: '1796', title: 'Smallpox Vaccine', description: 'Edward Jenner develops the first successful vaccine using cowpox, marking a historic milestone in immunology.' },
    { id: '2', year: '1846', title: 'First Use of Anesthesia', description: 'William T. G. Morton demonstrates ether anesthesia publicly, revolutionizing surgical procedures by enabling pain-free operations.' },
    { id: '3', year: '1865', title: 'Germ Theory of Disease', description: 'Louis Pasteur proves microorganisms cause disease, establishing the foundation of modern microbiology.' },
    { id: '4', year: '1882', title: 'Discovery of the Tuberculosis Bacterium', description: 'Robert Koch identifies Mycobacterium tuberculosis, paving the way for accurate TB diagnosis and effective treatment.' },
    { id: '5', year: '1895', title: 'Discovery of X-Rays', description: 'Wilhelm Röntgen discovers X-rays, transforming medical imaging and diagnostic practices worldwide.' },
    { id: '6', year: '1901', title: 'Classification of Blood Types', description: 'Karl Landsteiner classifies major blood groups (A, B, O), enabling safe and reliable blood transfusions.' },
    { id: '7', year: '1921', title: 'Discovery of Insulin', description: 'Frederick Banting and Charles Best isolate insulin, turning diabetes into a manageable chronic condition.' },
    { id: '8', year: '1923', title: 'Diphtheria Vaccine Developed', description: 'Widespread use of the diphtheria toxoid vaccine begins, drastically reducing deaths from the disease.' },
    { id: '9', year: '1928', title: 'Discovery of Penicillin', description: 'Alexander Fleming discovers the first true antibiotic, heralding the antibiotic era.' },
    { id: '10', year: '1935', title: 'Sulfonamides Introduced', description: 'Sulfonamides, the first synthetic antibiotics, are introduced to effectively treat diverse bacterial infections.' },
    { id: '11', year: '1953', title: 'DNA Structure Identified', description: 'James Watson and Francis Crick reveal the double-helix structure of DNA, laying the groundwork for modern genetics.' },
    { id: '12', year: '1955', title: 'Polio Vaccine Approved', description: 'Jonas Salk’s IPV is approved as safe and effective, drastically reducing global polio cases.' },
    { id: '13', year: '1960', title: 'Introduction of Oral Contraceptives', description: 'The FDA approves the first oral contraceptive pill, revolutionizing reproductive health and social norms.' },
    { id: '14', year: '1967', title: 'First Human Heart Transplant', description: 'Dr. Christiaan Barnard performs the first successful human heart transplant, redefining cardiac surgery.' },
    { id: '15', year: '1971', title: 'CT Scan Invented', description: 'Godfrey Hounsfield and Allan Cormack invent CT scanning, dramatically improving internal medical imaging.' },
    { id: '16', year: '1978', title: 'Birth of First IVF Baby', description: 'Louise Brown becomes the first baby born through IVF, marking a breakthrough in reproductive medicine.' },
    { id: '17', year: '1980', title: 'Smallpox Eradicated', description: 'WHO declares smallpox eradicated, a historic triumph of global vaccination efforts.' },
    { id: '18', year: '1983', title: 'HIV Identified', description: 'Luc Montagnier and Robert Gallo identify HIV as the virus responsible for AIDS.' },
    { id: '19', year: '1990', title: 'Launch of Human Genome Project', description: 'The Human Genome Project launches, aiming to map all human genes and revolutionize personalized medicine.' },
    { id: '20', year: '1996', title: 'Introduction of HAART for HIV', description: 'HAART becomes the standard HIV treatment, transforming it into a manageable chronic condition.' }
];

// Layout and visual constants (aligned with TS baseline)
const PALETTE = ['#2E86C1', '#2A6F1C', '#C25107', '#8E44AD', '#C0392B', '#40566d', '#8E7302'] as const;
const NODE_SIZE = 110; // match TS
const H_GAP = 60;
const V_GAP = 150;
const BASE_MARGIN = 50;
const CURVE_RADIUS = H_GAP * 1.5;
const CURVE_BOW_OFFSET = 70;
const CURVE_PADDING = CURVE_RADIUS + (2 * CURVE_BOW_OFFSET);
const TOTAL_MARGIN = BASE_MARGIN + CURVE_PADDING;
const INITIAL_Y = 80;

// Scroll area and padding (match TS)
const SCROLL_AREA = new Rect(0, 0, 1500, 1500);
const SCROLL_PADDING = { right: 50, bottom: 50 } as const;

// Zoom levels (match HTML/TS)
const ZOOM_FACTORS: { [key: string]: number } = {
    'zoom-065': 0.65,
    'zoom-075': 0.75,
    'zoom-085': 0.85,
    'zoom-1': 1
};

type State = { currentZoom: number };

export class SerpentineDiagram extends SampleBase<{}, State> {
    private diagramInstance: DiagramComponent | null = null;

    constructor(props: {}) {
        super(props);
        this.state = { currentZoom: 0.65 };
    }

    componentDidMount() {
        this.renderComplete();
    }

    renderComplete(): void {
        window.addEventListener('resize', this.handleResize);
        requestAnimationFrame(() => {
            const diagram = this.diagramInstance;
            if (!diagram) return;
            const current = diagram.scrollSettings.currentZoom || 1;
            const target = this.state.currentZoom;
            const factor = target / current;
            const focusPoint = {
                x: diagram.scrollSettings.viewPortWidth / 2,
                y: diagram.scrollSettings.viewPortHeight / 2
            };
            if (Math.abs(factor - 1) > 0.001) diagram.zoom(factor, focusPoint);
            diagram.scrollSettings.horizontalOffset = 0;
            diagram.scrollSettings.verticalOffset = 0;
            this.renderSerpentineLayout();
        });
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.renderSerpentineLayout();
    };

    handleZoom = (level: number) => {
        const diagram = this.diagramInstance;
        if (!diagram) return;

        const currentZoom = diagram.scrollSettings.currentZoom || 1;
        const zoomFactor = level / currentZoom;
        const focusPoint = {
            x: diagram.scrollSettings.viewPortWidth / 2,
            y: diagram.scrollSettings.viewPortHeight / 2
        };
        diagram.zoom(zoomFactor, focusPoint);

        this.renderSerpentineLayout();
        diagram.scrollSettings.horizontalOffset = 0;
        diagram.scrollSettings.verticalOffset = 0;
        diagram.dataBind();

        this.setState({ currentZoom: level });
    };

    private createDecorator(color: string, pivotX: number) {
        return {
            shape: 'Custom' as const,
            width: 20,
            height: 30,
            pivot: { x: pivotX },
            pathData: 'M 16 16 c -8 1 -7 1 -11 3 C 7 16 7 13 5 10 c 4 2 3 2 11 3 z',
            style: { fill: color, strokeColor: color }
        };
    }

    renderSerpentineLayout = () => {
        diagram = this.diagramInstance;
        if (!diagram || !diagram.element) return;

        const zoom = diagram.scrollSettings.currentZoom || 1;
        const effectiveWidth = (diagram.element as HTMLElement).clientWidth / zoom;

        const nodes: NodeModel[] = [];
        const connectors: ConnectorModel[] = [];

        let currentX = TOTAL_MARGIN + (NODE_SIZE / 2);
        let currentY = INITIAL_Y;
        let direction: 1 | -1 = 1;

        medicalBreakthroughs.forEach((breakthrough, index) => {
            const exceedsRight = direction === 1 && (currentX + (NODE_SIZE / 2) > effectiveWidth - TOTAL_MARGIN);
            const exceedsLeft = direction === -1 && (currentX - (NODE_SIZE / 2) < TOTAL_MARGIN);

            if (exceedsRight || exceedsLeft) {
                currentY += V_GAP;
                direction = direction === 1 ? -1 : 1;
                currentX = direction === 1
                    ? TOTAL_MARGIN + (NODE_SIZE / 2)
                    : effectiveWidth - TOTAL_MARGIN - (NODE_SIZE / 2);
            }

            const color = PALETTE[index % PALETTE.length];

            const node: NodeModel = {
                id: `breakthrough_${breakthrough.id}`,
                offsetX: currentX,
                offsetY: currentY,
                width: NODE_SIZE,
                height: NODE_SIZE,
                shape: { type: 'Basic', shape: 'Ellipse' },
                style: { fill: color, strokeColor: 'white', strokeWidth: 4 },
                annotations: [
                    { content: breakthrough.year, offset: { y: 0.3 }, style: { color: 'white', fontSize: 16, bold: true } },
                    { content: breakthrough.title, width: 80, offset: { y: 0.65 }, style: { color: 'white', fontSize: 12, textOverflow: 'Wrap', textWrapping: 'WrapWithOverflow' } }
                ],
                ports: [
                    { id: 'port_left', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
                    { id: 'port_right', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden }
                ],
                constraints: (NodeConstraints.Default | NodeConstraints.Tooltip) & ~NodeConstraints.Select,
                tooltip: {
                    content: `<p style="font-size: small;"><b>${breakthrough.title} (${breakthrough.year})</b><br/><br/>${breakthrough.description}</p>`,
                    position: 'BottomCenter',
                    relativeMode: 'Object',
                    width: 200
                }
            };

            nodes.push(node);
            currentX += direction * (NODE_SIZE + H_GAP);
        });

        for (let i = 0; i < nodes.length - 1; i++) {
            const sourceNode = nodes[i];
            const targetNode = nodes[i + 1];
            const isRowChange = sourceNode.offsetY !== targetNode.offsetY;

            let sourcePortId: 'port_left' | 'port_right';
            let targetPortId: 'port_left' | 'port_right';

            if (isRowChange) {
                const goingRight = (sourceNode.offsetX as number) < (targetNode.offsetX as number);
                sourcePortId = goingRight ? 'port_right' : 'port_left';
                targetPortId = sourcePortId;
            } else {
                const leftToRight = (sourceNode.offsetX as number) < (targetNode.offsetX as number);
                sourcePortId = leftToRight ? 'port_right' : 'port_left';
                targetPortId = leftToRight ? 'port_left' : 'port_right';
            }

            const color = sourceNode.style.fill as string;

            const connector: ConnectorModel = {
                id: `connector_${i + 1}`,
                sourceID: sourceNode.id,
                targetID: targetNode.id,
                sourcePortID: sourcePortId,
                targetPortID: targetPortId,
                style: { strokeColor: color, strokeWidth: 12 },
                targetDecorator: this.createDecorator(color, isRowChange ? 0 : 0.25),
                sourceDecorator: this.createDecorator(color, 0.25),
                constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select
            };

            if (isRowChange) {
                connector.type = 'Bezier';
                const goingRight = (sourceNode.offsetX as number) < (targetNode.offsetX as number);
                const sign = goingRight ? 1.3 : -1.3;
                const controlX =
                    (sourceNode.offsetX as number) + sign * ((NODE_SIZE / 2) + CURVE_RADIUS + (2 * CURVE_BOW_OFFSET));
                connector.segments = [{
                    type: 'Bezier',
                    point1: { x: controlX, y: (sourceNode.offsetY as number) + 5 },
                    point2: { x: controlX, y: (targetNode.offsetY as number) - 15 }
                }];
            } else {
                connector.type = 'Straight';
            }

            connectors.push(connector);
        }

        diagram = this.diagramInstance!;
        diagram.nodes = nodes;
        diagram.connectors = connectors;
        diagram.dataBind();
    };

    render() {
        return (
            <div className="control-pane serpentine-diagram-container">
                <style>{`
                    .serpentine-diagram-container { padding: 20px; background-color: #f8f9fa; min-height: 600px; }
                    .diagram-container { border: 1px solid #dee2e6; border-radius: 8px; background-color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    .diagram-header h3 { color: #495057; font-weight: 600;margin-top:0px; }
                    @media (max-width: 768px) {
                        .serpentine-diagram-container { padding: 10px; }
                        .diagram-container { min-height: 600px; }
                    }
                `}</style>
                <div className="control-section">
                    <div className="content-wrapper" style={{ width: "100%" }}>
                        <div className="diagram-header">
                            <h3 className="text-center mb-3">Medical Research Breakthroughs</h3>
                            <p className="text-muted text-center mb-4">
                                A serpentine journey through 20 pivotal medical discoveries that changed healthcare forever
                            </p>
                        </div>
                        <div className="zoom-controls-container" style={{ padding: '0 0 15px 0', textAlign: 'center' }}>
                            {Object.keys(ZOOM_FACTORS).map(id => {
                                const level = ZOOM_FACTORS[id];
                                return (
                                    <ButtonComponent
                                        key={id}
                                        id={id}
                                        isPrimary={this.state.currentZoom === level}
                                        onClick={() => this.handleZoom(level)}
                                    >
                                        {level}x
                                    </ButtonComponent>
                                );
                            })}
                        </div>
                        <div>
                           <DiagramComponent
                                id="serpentineDiagram"
                                ref={d => (this.diagramInstance = d)}
                                width="100%"
                                height="600px"
                                className="diagram-container"
                                snapSettings={{ constraints: SnapConstraints.None }}
                                scrollSettings={{ scrollableArea: SCROLL_AREA, padding: SCROLL_PADDING }}
                                tool={DiagramTools.ZoomPan}
                                nodes={[]}
                                connectors={[]}
                            />
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes a serpentine layout using the Syncfusion<sup>®</sup> EJ2 React Diagram to showcase 20 important medical research breakthroughs that transformed healthcare between 1796 and 1996.
                    </p>
                </div>
                <div id="description">
                    <p>
                        A serpentine layout arranges elements along a zigzagging or winding path. This timeline presents each breakthrough as part of a continuous sequence. When the layout reaches the edge of the view, it wraps to the next line and reverses direction, creating a true serpentine flow.    
                    </p>
                    <p>
                        <strong>Key Features:</strong>
                    </p>
                    <ul>
                        <li><strong>Dynamic Serpentine Flow:</strong> Nodes are automatically arranged in a winding path that wraps based on the available container width.</li>
                        <li><strong>Interactive Nodes:</strong> Hover over any node to see a detailed tooltip with information about the medical breakthrough.</li>
                        <li><strong>Custom Connectors:</strong> The timeline uses straight connectors for nodes in the same row and elegant bezier curves for wrapping between rows.</li>
                        <li><strong>Zoom and Pan:</strong> Use the buttons to zoom in and out at specific zoom levels.</li>
                    </ul>
                </div>
            </div>
        );
    }
}