import * as React from 'react';
import {
    DiagramComponent,
    Inject,
    DataBinding,
    ComplexHierarchicalTree,
    DiagramTools,
    SnapConstraints,
    NodeModel,
    ConnectorModel,
    LayoutModel,
    DataSourceModel,
    IMouseEventArgs
} from '@syncfusion/ej2-react-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { familyTreeData } from './diagram-data';
import { SampleBase } from '../common/sample-base';

type Person = {
    Id: string;
    Name?: string;
    FirstName?: string;
    Tenure?: string;
    Description?: string;
    Type?: string;
    Parents?: string[];
    ImageUrl?: string;
};

type NodeUIState = {
    isOpen?: boolean;
    isDimmed?: boolean;
};

type Relations = {
    spouseOf: Map<string, string>;
    unionOf: Map<string, [string, string]>;
    parentsByChild: Map<string, string[]>;
    childrenByParent: Map<string, Set<string>>;
};

const NODE_WIDTH = 140;
const NODE_HEIGHT = 180;
const HOVER_WIDTH = 320;

const CONNECTOR_COLORS = {
    baseConnector: '#85736E',
    highlightedConnector: '#723523',
};

export default class FamilyTreeDiagram extends SampleBase<{}, {}> {
    private diagramRef = React.createRef<DiagramComponent>();

    // Mutable helpers (not React state)
    private nodeState = new Map<string, NodeUIState>();
    private originalSize = new Map<string, { width: number; height: number }>();
    private hoveredId: string | null = null;

    // Data and relations
    private readonly DATA_SOURCE: Person[] = familyTreeData as Person[];
    private RELATIONS: Relations;

    // Static diagram settings
    private readonly layout: LayoutModel = {
        type: 'ComplexHierarchicalTree',
        orientation: 'TopToBottom',
        horizontalAlignment: 'Center',
        verticalAlignment: 'Top',
        horizontalSpacing: 150,
        verticalSpacing: 50
    };

    private dataSourceSettings: DataSourceModel = {
        id: 'Id',
        parentId: 'Parents',
        dataSource: new DataManager(this.DATA_SOURCE),
        doBinding: (node: NodeModel, raw: Person) => {
            node.id = String(raw.Id);
            node.data = raw;

            if (raw.Type === 'Union') {
                node.width = 0;
                node.height = 0;
                node.shape = { type: 'Basic', shape: 'Rectangle' };
                node.style = { fill: 'transparent', strokeColor: 'transparent' };
                node.visible = false;
            } else {
                raw.ImageUrl = `./src/diagram/Images/family-tree/${raw.Name}.png`;
                node.shape = { type: 'HTML' };
                node.width = NODE_WIDTH;
                node.height = NODE_HEIGHT;
            }
        }
    };

    rendereComplete() {
        this.RELATIONS = this.buildRelations(this.DATA_SOURCE);
    }

    /* ===================== Relations ===================== */
    private buildRelations(data: Person[]): Relations {
        const unions = data.filter((d) => d.Type === 'Union');
        const spouseOf = new Map<string, string>();
        const unionOf = new Map<string, [string, string]>();
        const parentsByChild = new Map<string, string[]>();
        const childrenByParent = new Map<string, Set<string>>();

        unions.forEach((u) => {
            const [a, b] = (u.Parents ?? []) as [string, string];
            if (!a || !b) return;
            unionOf.set(u.Id, [a, b]);
            spouseOf.set(a, b);
            spouseOf.set(b, a);
        });

        data.forEach((n) => {
            if (Array.isArray(n.Parents)) {
                parentsByChild.set(n.Id, n.Parents.slice());
                n.Parents.forEach((ref) => {
                    const pr = unionOf.get(ref);
                    if (!pr) return;
                    const [pa, pb] = pr;
                    if (!childrenByParent.has(pa)) childrenByParent.set(pa, new Set());
                    if (!childrenByParent.has(pb)) childrenByParent.set(pb, new Set());
                    childrenByParent.get(pa)!.add(n.Id);
                    childrenByParent.get(pb)!.add(n.Id);
                });
            }
        });

        return { spouseOf, unionOf, parentsByChild, childrenByParent };
    }

    private relatedSet(personId: string) {
        const people = new Set<string>([personId]);
        const spouse = this.RELATIONS.spouseOf.get(personId);
        if (spouse) people.add(spouse);

        // parents via unions
        const parentUnions = new Set(this.RELATIONS.parentsByChild.get(personId) ?? []);
        parentUnions.forEach((u) => (this.RELATIONS.unionOf.get(u) ?? []).forEach((p) => people.add(p)));

        // children
        const kids = this.RELATIONS.childrenByParent.get(personId);
        if (kids) kids.forEach((k) => people.add(k));

        // unions tying hovered/spouse to children
        const unions = new Set<string>(parentUnions);
        const spouseOrSelf = new Set([personId, ...(spouse ? [spouse] : [])]);
        (kids ?? new Set<string>()).forEach((childId) => {
            const parents = this.RELATIONS.parentsByChild.get(childId) ?? [];
            parents.forEach((u) => {
                const pair = this.RELATIONS.unionOf.get(u);
                if (pair && (spouseOrSelf.has(pair[0]) || spouseOrSelf.has(pair[1]))) {
                    unions.add(u);
                }
            });
        });

        const nodeSet = new Set<string>(people);
        unions.forEach((u) => nodeSet.add(u));
        return { people, nodeSet };
    }

    /* ===================== Template ===================== */
    private getUpdatedTemplate(data: Person, UI: NodeUIState): string {
        const isOpen = !!UI.isOpen;
        const isDim = !!UI.isDimmed;

        const containerCls = [
            'person-node-container',
            isOpen ? 'is-open' : '',
            isDim ? 'is-dim' : ''
        ].filter(Boolean).join(' ');

        const name = data.Name ?? '';
        const first = data.FirstName ?? '';
        const tenure = data.Tenure ?? '';
        const desc = data.Description ?? '';

        return `
<div class="${containerCls}">
  <div class="person-card">
    <div class="person-image-circle">
      ${data.ImageUrl ? `<img src="${data.ImageUrl}" class="person-image" alt="${name}" />` : ''}
    </div>
    <div class="person-header">
      <div class="person-full-name">${name}</div>
      <div class="person-first-name">${first}</div>
      <div class="person-tenure">${tenure}</div>
    </div>
    <div class="person-bio">${desc}</div>
  </div>
</div>`;
    }

    // HTML node template
    private setNodeTemplate = (node: NodeModel) => {
        const data = node.data as Person | undefined;
        if (!data || data.Type === 'Union') return;
        const UI = this.nodeState.get(data.Id) ?? {};
        node.shape = { type: 'HTML', content: this.getUpdatedTemplate(data, UI) };
    };

    // Connector Defaults
    private getConnectorDefaults = (connector: ConnectorModel) => {
        connector.type = 'Orthogonal';
        connector.style = { strokeColor: CONNECTOR_COLORS.baseConnector, strokeWidth: 2 };
        connector.targetDecorator = { shape: 'None' };
        connector.cornerRadius = 5;
        return connector;
    };

    /* ===================== Node Sizing ===================== */
    private expandNodeWidth(id: string) {
        const diagram = this.diagramRef.current;
        if (!diagram) return;
        const node = diagram.getObject(id) as NodeModel | null;
        if (!node || (node.data as Person)?.Type === 'Union') return;
        if (!this.originalSize.has(id)) {
            this.originalSize.set(id, { width: node.width!, height: node.height! });
        }
        node.width = HOVER_WIDTH;
    }

    private restoreNodeSize(id: string) {
        const diagram = this.diagramRef.current;
        if (!diagram) return;
        const node = diagram.getObject(id) as NodeModel | null;
        if (!node) return;
        const orig = this.originalSize.get(id);
        if (orig) {
            node.width = orig.width;
            node.height = orig.height;
        }
    }

    private renderNode(id: string) {
        const diagram = this.diagramRef.current;
        if (!diagram) return;
        const node = diagram.getObject(id) as NodeModel | null;
        if (!node || (node.data as Person)?.Type === 'Union') return;
        const data = node.data as Person;
        const UI = this.nodeState.get(id) ?? {};
        node.shape = { type: 'HTML', content: this.getUpdatedTemplate(data, UI) };
    }

    /* ===================== Highlight Connectors ===================== */
    private paintConnectors(nodeSet: Set<string>) {
        const diagram = this.diagramRef.current;
        if (!diagram) return;
        diagram.connectors.forEach((connector: ConnectorModel) => {
            const sourceConn = connector.sourceID as string;
            const targetConn = connector.targetID as string;
            const hasRelations =
                !!(sourceConn && targetConn && nodeSet.has(sourceConn) && nodeSet.has(targetConn));
            connector.style = {
                strokeColor: hasRelations ? CONNECTOR_COLORS.highlightedConnector : CONNECTOR_COLORS.baseConnector,
                opacity: hasRelations ? 1 : 0.2
            };
        });
    }

    /* ===================== Hover logic ===================== */
    private focusHover(id: string) {
        const diagram = this.diagramRef.current;
        if (!diagram) return;

        const { people, nodeSet } = this.relatedSet(id);

        if (this.hoveredId && this.hoveredId !== id) {
            this.restoreNodeSize(this.hoveredId);
        }

        // Compute UI state for all person nodes
        diagram.nodes.forEach((n: NodeModel) => {
            if ((n.data as Person)?.Type === 'Union') return;
            const nodeId = String(n.id);
            const isDimmed = nodeId !== id && !people.has(nodeId);
            const isOpen = nodeId === id;
            this.nodeState.set(nodeId, { isDimmed, isOpen });
            this.renderNode(nodeId); // rebuild HTML with classes baked in
        });

        this.expandNodeWidth(id);
        this.paintConnectors(nodeSet);

        this.hoveredId = id;
        diagram.dataBind();
    }

    private clearHover = () => {
        const diagram = this.diagramRef.current;
        if (!diagram) return;

        if (this.hoveredId) {
            this.restoreNodeSize(this.hoveredId);
            this.hoveredId = null;
        }

        diagram.nodes.forEach((n: NodeModel) => {
            if ((n.data as Person)?.Type === 'Union') return;
            const nodeId = String(n.id);
            this.nodeState.set(nodeId, { isOpen: false, isDimmed: false });
            this.renderNode(nodeId);
        });

        diagram.connectors.forEach((connector: ConnectorModel) => {
            connector.style = {
                strokeColor: CONNECTOR_COLORS.baseConnector,
                strokeWidth: 2,
                opacity: 1
            };
        });

        diagram.dataBind();
    };

    /* ===================== Events ===================== */
    private onMouseEnter = (args: IMouseEventArgs) => {
        const node = (args?.actualObject as any) || null;
        if (!node || node.sourceID || node.targetID || (node.data && node.data.Type === 'Union')) return;
        this.focusHover(String(node.id));
    };

    private onMouseLeave = () => {
        this.clearHover();
    };

    private ondataLoaded = () => {
        setTimeout(() => {
            const diagram = this.diagramRef.current;
            if (!diagram) return;
            diagram.fitToPage();
            // show diagram
            const container = document.querySelector('.family-tree') as HTMLElement;
            if (container) {
                container.style.opacity = '1';
            }
        }, 10)
    }

    render() {
        return (
            <div className="control-pane">
                <style>{familytreeCss}</style>
                <div className="control-section family-tree" style={{ opacity: 0 }}>
                    <DiagramComponent
                        id="diagram"
                        ref={this.diagramRef}
                        width={'100%'}
                        height={'600px'}
                        snapSettings={{ constraints: SnapConstraints.None }}
                        tool={DiagramTools.ZoomPan}
                        layout={this.layout}
                        dataSourceSettings={this.dataSourceSettings}
                        setNodeTemplate={this.setNodeTemplate}
                        getConnectorDefaults={this.getConnectorDefaults}
                        mouseEnter={this.onMouseEnter}
                        mouseLeave={this.onMouseLeave}
                        dataLoaded={this.ondataLoaded}
                    >
                        <Inject services={[DataBinding, ComplexHierarchicalTree]} />
                    </DiagramComponent>

                    <div id="action-description">
                        <p>
                            This sample showcases a family tree built with the Syncfusion<sup>®</sup> EJ2 React Diagram, illustrating complex hierarchical relationships through customizable node templates, interactive hover details, and relation-based highlighting.
                        </p>
                    </div>

                    <div id="description">
                        <p>
                            The diagram uses a complex hierarchical tree layout to automatically arrange family members in a clear, top-to-bottom structure. Each node is rendered using a custom HTML template that displays the individual’s photo, name, and lifespan. On hover, the node expands to reveal relationship details, while related members are highlighted and all other nodes are dimmed to enhance focus.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const familytreeCss = `
/* Diagram surface */
.family-tree {
    background: #FFFFFF;
}

.family-tree .e-diagram {
    background: transparent;
}

.family-tree #diagramcontent {
    overflow: hidden !important;
}

/* ===================== Node base ===================== */
.family-tree .person-node-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #FFDBD1;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .16);
    box-sizing: border-box;
    position: relative;
    transition: opacity 0.5s ease;
    will-change: transform;
    user-select: none;
}

.family-tree .person-node-container:hover {
    cursor: default !important;
    background: #f5e1a7;
}

/* Dim state driven by template */
.family-tree .person-node-container.is-dim {
    opacity: 0.25;
    filter: grayscale(50%);
    transition: opacity 0.2s ease-out, filter 0.3s ease;
}

/* ===================== Open state driven by template ===================== */
.family-tree .person-node-container.is-open .person-image-circle {
    position: absolute;
    top: 10px;
    left: 10px;
    margin: 0;
    width: 80px;
    height: 80px;
}

.family-tree .person-node-container.is-open .person-header {
    text-align: left;
    margin-left: 90px;
}

.family-tree .person-node-container.is-open .person-bio {
    max-height: 200px;
    opacity: 1;
}

.family-tree .person-node-container.is-open .person-full-name {
    display: block;
    font-size: 20px;
    text-align: left;
}

.family-tree .person-node-container.is-open .person-first-name {
    display: none;
}

.family-tree .person-node-container.is-open .person-tenure {
    font-size: 16px;
    text-align: left;
}

/* ===================== Card layout ===================== */
.family-tree .person-card {
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 8.5px;
    padding: 12px 8px 3px;
    border-radius: 10px;
    border: 2px solid #85736E;
    height: 100%;
    width: 100%;
    position: relative;
}

/* ===================== Avatar ===================== */
.family-tree .person-image-circle {
    width: 98px;
    height: 98px;
    border-radius: 50%;
    margin: 0 auto;
    background: #f0f0f0;
    border: 3px solid #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.family-tree .person-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* ===================== Header/Text ===================== */
.family-tree .person-header {
    text-align: center;
    line-height: 1.2;
    position: relative;
    z-index: 1;
}

.family-tree .person-first-name,
.family-tree .person-full-name {
    font-weight: 600;
    font-size: 21px;
    line-height: 1.2;
    text-align: center;
    color: #723523;
}

/* By default show first name only; full name appears when is-open */
.family-tree .person-full-name {
    display: none;
}

.family-tree .person-tenure {
    font-size: 15px;
    color: #53433F;
    opacity: 0.85;
    margin-top: 4px;
    text-align: center;
}

/* ===================== Bio ===================== */
.family-tree .person-bio {
    color: #723523;
    font-size: 18px;
    line-height: 1.35;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    margin-left: 90px;
    transition: opacity 0.2s ease;
}

/* ===================== Diagram visuals ===================== */

/* Node width transition (diagram updates width on hover) */
.family-tree [id$='_html_element'] {
    transition: all 80ms ease;
}

/* Connector animation */
.family-tree [id$='_path'] {
    transition: opacity 0.4s ease, stroke 0.4s ease, stroke-width 0.4s ease;
}`