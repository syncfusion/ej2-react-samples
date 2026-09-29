import * as React from 'react';
import {
    ConnectorConstraints,
    ConnectorModel,
    DiagramComponent,
    DiagramTools,
    NodeConstraints,
    NodeModel,
    PortVisibility,
    UserHandleEventsArgs,
    UserHandleModel
} from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from '../common/sample-base';

type Stage = 'draft' | 'manager' | 'budget' | 'purchase' | 'completed' | 'rejected';
type Status = 'draft' | 'waiting' | 'active' | 'approved' | 'completed' | 'rejected';
type NodeType = 'request' | 'manager' | 'budget' | 'purchase' | 'result';

interface RequestData {
    item: string;
    requester: string;
    reason: string;
    quantity: number;
    unitPrice: number;
    budget: number;
}

interface NodeInfo {
    type: NodeType;
    title: string;
    status: Status;
    statusText: string;
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
    message: string;
}

interface NoteInfo {
    text: string;
    status: Status;
}

const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

const statusLabels: Record<Status, string> = {
    draft: 'Draft', waiting: 'Waiting', active: 'Action required',
    approved: 'Approved', completed: 'Completed', rejected: 'Rejected'
};

const connectorIds = [
    'request-budget', 'budget-manager', 'manager-purchase',
    'purchase-result', 'manager-result', 'budget-result'
];

const connectorStyle = { strokeColor: '#94a3b8', strokeWidth: 1.6 };

function nodeInfo(type: NodeType, title: string): NodeInfo {
    return {
        type, title,
        status: type === 'request' ? 'draft' : 'waiting',
        statusText: type === 'request' ? 'Draft' : 'Waiting',
        primaryLabel: '', primaryValue: '', secondaryLabel: '',
        secondaryValue: '', message: ''
    };
}

function createNode(id: string, x: number, y: number, type: NodeType, title: string): NodeModel {
    return {
        id, offsetX: x, offsetY: y, width: 160,
        height: type === 'result' ? 140 : 135,
        shape: { type: 'HTML' },
        style: { fill: 'transparent', strokeColor: 'transparent' },
        addInfo: nodeInfo(type, title),
        ports: [
            { id: `${id}-left`, offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
            { id: `${id}-right`, offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
            { id: `${id}-top`, offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Hidden },
            { id: `${id}-bottom`, offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Hidden }
        ],
        annotations: [{
            id: `${id}-status`, annotationType: 'Template', content: '',
            offset: { x: 0.5, y: -0.11 }, width: 85, height: 26,
            addInfo: {
                text: type === 'request' ? 'Draft' : 'Waiting',
                status: type === 'request' ? 'draft' : 'waiting'
            } as NoteInfo
        }]
    };
}

function createConnector(
    id: string, sourceID: string, targetID: string,
    sourcePortID = `${sourceID}-right`, targetPortID = `${targetID}-left`
): ConnectorModel {
    return {
        id, sourceID, targetID, sourcePortID, targetPortID,
        type: 'Orthogonal', cornerRadius: 12,
        constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select,
        style: { ...connectorStyle },
        targetDecorator: {
            shape: 'Arrow', width: 9, height: 9,
            style: { fill: '#94a3b8', strokeColor: '#94a3b8' }
        }
    };
}

const nodes: NodeModel[] = (() => {
    const nodeList = [
        createNode('request', 100, 100, 'request', 'Equipment request'),
        createNode('manager', 100, 300, 'manager', 'Manager review'),
        createNode('budget', 300, 100, 'budget', 'Budget check'),
        createNode('purchase', 300, 300, 'purchase', 'Purchase order'),
        createNode('result', 510, 200, 'result', 'Request outcome')
    ];
    
    // Initialize with default data so templates render properly on first load
    nodeList[0].addInfo = {
        type: 'request', title: 'Equipment request', status: 'draft', statusText: 'Draft',
        primaryLabel: 'Item', primaryValue: 'Ergonomic monitors',
        secondaryLabel: 'Total', secondaryValue: '$2,520', message: '6 × $420'
    };
    
    nodeList[1].addInfo = {
        type: 'manager', title: 'Manager review', status: 'waiting', statusText: 'Waiting',
        primaryLabel: 'Requested by', primaryValue: 'Maya Chen',
        secondaryLabel: 'Amount', secondaryValue: '$2,520', message: 'Replace outdated design-team displays'
    };
    
    nodeList[2].addInfo = {
        type: 'budget', title: 'Budget check', status: 'waiting', statusText: 'Waiting',
        primaryLabel: 'Available', primaryValue: '$5,000',
        secondaryLabel: 'Requested', secondaryValue: '$2,520', message: 'Within available budget'
    };
    
    nodeList[3].addInfo = {
        type: 'purchase', title: 'Purchase order', status: 'waiting', statusText: 'Waiting',
        primaryLabel: 'Quantity', primaryValue: '6',
        secondaryLabel: 'Order value', secondaryValue: '$2,520', message: 'Created after all approvals'
    };
    
    nodeList[4].addInfo = {
        type: 'result', title: 'Request outcome', status: 'waiting', statusText: 'Waiting',
        primaryLabel: 'Outcome', primaryValue: 'Pending',
        secondaryLabel: '', secondaryValue: '', message: 'Waiting for workflow completion'
    };
    
    return nodeList;
})();

const connectors: ConnectorModel[] = [
    createConnector('request-budget', 'request', 'budget', 'request-right', 'budget-left'),
    createConnector('budget-manager', 'budget', 'manager', 'budget-bottom', 'manager-left'),
    createConnector('manager-purchase', 'manager', 'purchase', 'manager-right', 'purchase-left'),
    createConnector('purchase-result', 'purchase', 'result'),
    createConnector('manager-result', 'manager', 'result', 'manager-bottom', 'result-bottom'),
    createConnector('budget-result', 'budget', 'result', 'budget-right', 'result-left')
];

const managerHandles: UserHandleModel[] = [
    { name: 'approve', side: 'Bottom', offset: 0.32, size: 36, margin: { bottom: 13 }, visible: false, tooltip: { content: 'Approve request' }, disableConnectors: true },
    { name: 'reject', side: 'Bottom', offset: 0.68, size: 36, margin: { bottom: 13 }, visible: false, tooltip: { content: 'Reject request' }, disableConnectors: true }
];

const SAMPLE_CSS = `
.approval-sample { width:100%; height:560px; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#f8fafc; }
.approval-sample .approval-layout { display:grid; grid-template-columns:minmax(0,1fr) 220px; height:100%; }
.approval-sample .diagram-pane { min-width:0; background:#f8fafc; }
.approval-sample #diagram { width:100%; height:100%; }
.approval-sample .properties { padding:14px; overflow:auto; border-left:1px solid #e2e8f0; background:#fff; color:#1e293b; }
.approval-sample .properties h3 { margin:0 0 4px; font-size:17px; }
.approval-sample .properties .intro { margin:0 0 14px; color:#64748b; font-size:10px; line-height:1.4; }
.approval-sample .field { display:block; margin-top:10px; }
.approval-sample .field span { display:block; margin-bottom:4px; color:#475569; font-size:10px; font-weight:650; }
.approval-sample .field input,.approval-sample .field textarea { box-sizing:border-box; width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:8px 9px; color:#1e293b; background:#fff; font:inherit; font-size:11px; font-weight:400; }
.approval-sample .field textarea { min-height:56px; resize:vertical; }
.approval-sample .field input:disabled,.approval-sample .field textarea:disabled { color:#64748b; background:#f1f5f9; }
.approval-sample .field-row { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.approval-sample .actions { display:grid; grid-template-columns:1fr auto; gap:7px; margin-top:13px; }
.approval-sample .actions button { min-height:36px; border-radius:8px; padding:8px 11px; cursor:pointer; font-size:11px; font-weight:700; }
.approval-sample .actions .primary { border:0; color:#fff; background:#4f46e5; }
.approval-sample .actions .secondary { border:1px solid #cbd5e1; color:#334155; background:#fff; }
.approval-sample .actions button:disabled { cursor:default; opacity:.55; }
.approval-sample .validation { margin-top:10px; padding:8px; border-radius:7px; color:#991b1b; background:#fef2f2; font-size:10px; line-height:1.4; }
.approval-sample .workflow-message { margin-top:12px; padding:9px; border-radius:8px; color:#475569; background:#f1f5f9; font-size:10px; line-height:1.45; }
.approval-sample .node-card { box-sizing:border-box; width:100%; height:100%; padding:11px 12px; overflow:hidden; border:1px solid #dbe3ec; border-radius:13px; color:#1e293b; background:#fff; box-shadow:0 7px 20px rgba(15,23,42,.07); text-align:left; }
.approval-sample .node-card.state-active { border-color:#818cf8; box-shadow:0 7px 22px rgba(79,70,229,.15); }
.approval-sample .node-card.state-approved,.approval-sample .node-card.state-completed { border-color:#a7f3d0; }
.approval-sample .node-card.state-rejected { border-color:#fecaca; }
.approval-sample .node-kicker { color:#64748b; font-size:8px; font-weight:750; text-transform:uppercase; letter-spacing:.07em; }
.approval-sample .node-title { margin-top:3px; font-size:12px; font-weight:750; }
.approval-sample .node-metrics { display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:9px; }
.approval-sample .node-metrics span { min-width:0; padding:7px; border-radius:7px; background:#f8fafc; }
.approval-sample .node-metrics small,.approval-sample .node-metrics b { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.approval-sample .node-metrics small { color:#94a3b8; font-size:8px; }
.approval-sample .node-metrics b { margin-top:2px; font-size:10px; }
.approval-sample .node-message { margin-top:7px; overflow:hidden; color:#64748b; font-size:8.5px; line-height:1.35; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
.approval-sample .type-result { display:grid; align-content:center; text-align:center; }
.approval-sample .type-result .node-metrics { grid-template-columns:1fr; margin-top:7px; }
.approval-sample .type-result .node-metrics span:nth-child(2) { display:none; }
.approval-sample .node-note { display:inline-flex; align-items:center; justify-content:center; min-width:92px; height:22px; padding:0 8px; border:1px solid #dbe3ec; border-radius:99px; color:#64748b; background:#fff; box-shadow:0 2px 7px rgba(15,23,42,.06); font-size:8px; font-weight:700; }
.approval-sample .node-note.state-active { color:#4338ca; border-color:#c7d2fe; background:#eef2ff; }
.approval-sample .node-note.state-approved,.approval-sample .node-note.state-completed { color:#047857; border-color:#a7f3d0; background:#ecfdf5; }
.approval-sample .node-note.state-rejected { color:#b91c1c; border-color:#fecaca; background:#fef2f2; }
.approval-sample .user-action { display:grid; place-items:center; width:100%; height:100%; border:2px solid #fff; border-radius:50%; color:#fff; box-shadow:0 4px 12px rgba(15,23,42,.2); font-size:17px; font-weight:800; cursor:pointer; }
.approval-sample .action-approve { background:#059669; }
.approval-sample .action-reject { background:#dc2626; }
.approval-sample .e-diagram-endpoint-handle.e-disabled,.approval-sample .e-diagram-bezier-control-handle.e-disabled,.approval-sample .e-diagram-resize-handle.e-disabled { opacity:0; }
@media (max-width:850px) { .approval-sample .approval-layout { grid-template-columns:1fr; grid-template-rows:420px auto; } .approval-sample { height:auto; } .approval-sample .properties { border-top:1px solid #e2e8f0; border-left:0; } }
`;

export class PurchaseApprovalWorkflow extends SampleBase<{}, {}> {
    private diagramInstance!: DiagramComponent;
    private stage: Stage = 'draft';
    private rejectionReason: 'budget' | 'manager' | undefined;
    private runToken: number = 0;
    private pendingTimer: number | undefined;
    private actionLocked: boolean = false;
    private request: RequestData = {
        item: 'Ergonomic monitors', requester: 'Maya Chen',
        reason: 'Replace outdated design-team displays', quantity: 6,
        unitPrice: 420, budget: 5000
    };

    componentWillUnmount(): void {
        this.clearPendingWork();
    }

    private byId<T extends HTMLElement>(id: string): T {
        return document.getElementById(id) as T;
    }

    private total(): number {
        return this.request.quantity * this.request.unitPrice;
    }

    private getNode(id: string): NodeModel {
        return this.diagramInstance.getObject(id) as NodeModel;
    }

    private setNode(id: string, changes: Partial<NodeInfo>): void {
        const node = this.getNode(id);
        node.addInfo = { ...(node.addInfo as NodeInfo), ...changes };
        this.diagramInstance.refreshTemplate(node);
    }

    private setStatus(id: string, status: Status, text: string = statusLabels[status]): void {
        const node = this.getNode(id);
        this.setNode(id, { status, statusText: text });
        const note = node.annotations![0];
        note.addInfo = { text, status } as NoteInfo;
        this.diagramInstance.refreshTemplate(note, node);
    }

    private setConnector(id: string, status: 'default' | 'active' | 'completed' | 'rejected'): void {
        const connector = this.diagramInstance.getObject(id) as ConnectorModel;
        const color = status === 'active' ? '#4f46e5' : status === 'completed' ? '#059669' : status === 'rejected' ? '#dc2626' : '#94a3b8';
        connector.style = { strokeColor: color, strokeWidth: status === 'default' ? 1.6 : 2.2 };
        if (connector.targetDecorator && connector.targetDecorator.style) {
            connector.targetDecorator.style.fill = color;
            connector.targetDecorator.style.strokeColor = color;
        }
        this.diagramInstance.dataBind();
    }

    private refreshAllContent(): void {
        const amount = this.total();
        this.setNode('request', { primaryLabel: 'Item', primaryValue: this.request.item, secondaryLabel: 'Total', secondaryValue: money.format(amount), message: `${this.request.quantity} × ${money.format(this.request.unitPrice)}` });
        this.setNode('manager', { primaryLabel: 'Requested by', primaryValue: this.request.requester, secondaryLabel: 'Amount', secondaryValue: money.format(amount), message: this.request.reason });
        this.setNode('budget', { primaryLabel: 'Available', primaryValue: money.format(this.request.budget), secondaryLabel: 'Requested', secondaryValue: money.format(amount), message: amount <= this.request.budget ? 'Within available budget' : 'Budget limit exceeded' });
        this.setNode('purchase', { primaryLabel: 'Quantity', primaryValue: String(this.request.quantity), secondaryLabel: 'Order value', secondaryValue: money.format(amount), message: 'Created after all approvals' });
        this.setNode('result', {
            primaryLabel: 'Outcome',
            primaryValue: this.stage === 'completed' ? 'Purchase successful' : this.stage === 'rejected' ? 'Purchase rejected' : 'Pending',
            secondaryLabel: '', secondaryValue: '',
            message: this.stage === 'completed' ? `${this.request.quantity} items approved for ${money.format(amount)}` : this.rejectionReason === 'budget' ? 'The request exceeds the available budget' : this.rejectionReason === 'manager' ? 'The request was declined by the manager' : 'Waiting for workflow completion'
        });
    }

    private validateRequest(): string[] {
        const errors: string[] = [];
        if (!this.request.item.trim()) errors.push('Enter an equipment name.');
        if (!this.request.requester.trim()) errors.push('Enter a requester name.');
        if (!this.request.reason.trim()) errors.push('Enter a business reason.');
        if (!Number.isFinite(this.request.quantity) || this.request.quantity < 1) errors.push('Quantity must be at least 1.');
        if (!Number.isFinite(this.request.unitPrice) || this.request.unitPrice <= 0) errors.push('Unit price must be greater than 0.');
        return errors;
    }

    private showValidation(errors: string[]): void {
        const box = this.byId<HTMLElement>('validationMessage');
        box.hidden = errors.length === 0;
        box.textContent = errors.join(' ');
    }

    private clearPendingWork(): void {
        this.runToken++;
        if (this.pendingTimer !== undefined) {
            window.clearTimeout(this.pendingTimer);
            this.pendingTimer = undefined;
        }
        this.actionLocked = false;
    }

    private delay(ms: number, token: number): Promise<boolean> {
        return new Promise((resolve) => {
            this.pendingTimer = window.setTimeout(() => {
                this.pendingTimer = undefined;
                resolve(token === this.runToken);
            }, ms);
        });
    }

    private updateManagerHandles = (): void => {
        const selected = this.diagramInstance.selectedItems.nodes?.[0] as NodeModel | undefined;
        const show = selected?.id === 'manager' && this.stage === 'manager' && !this.actionLocked;
        this.diagramInstance.selectedItems.userHandles?.forEach((handle: UserHandleModel) => { handle.visible = show; });
        this.diagramInstance.dataBind();
    };

    private setInputsDisabled(disabled: boolean): void {
        ['propertyItem', 'propertyRequester', 'propertyReason', 'propertyQuantity', 'propertyUnitPrice'].forEach((id) => {
            this.byId<HTMLInputElement | HTMLTextAreaElement>(id).disabled = disabled;
        });
    }

    private submitRequest = async (): Promise<void> => {
        const errors = this.validateRequest();
        this.showValidation(errors);
        if (errors.length) return;
        this.clearPendingWork();
        this.setInputsDisabled(true);
        this.setStatus('request', 'approved', 'Submitted');
        this.setConnector('request-budget', 'active');
        this.setStatus('budget', 'active', 'Checking budget');
        this.byId<HTMLButtonElement>('submitRequest').disabled = true;
        this.byId<HTMLButtonElement>('resetWorkflow').disabled = false;
        this.byId<HTMLElement>('workflowMessage').textContent = 'Checking the available budget before requesting manager approval…';
        const token = ++this.runToken;
        if (!(await this.delay(700, token))) return;
        if (this.total() > this.request.budget) {
            this.stage = 'rejected'; this.rejectionReason = 'budget';
            this.setStatus('budget', 'rejected', 'Insufficient budget');
            this.setConnector('request-budget', 'rejected');
            this.setConnector('budget-result', 'rejected');
            this.setStatus('result', 'rejected');
            this.refreshAllContent();
            this.diagramInstance.select([this.getNode('result')]);
            this.byId<HTMLElement>('workflowMessage').textContent = 'Request rejected because the purchase exceeds the available budget.';
            return;
        }
        this.stage = 'manager';
        this.setStatus('budget', 'approved', 'Budget approved');
        this.setConnector('request-budget', 'completed');
        this.setConnector('budget-manager', 'active');
        this.setStatus('manager', 'active', 'Decision required');
        this.diagramInstance.select([this.getNode('manager')]);
        this.updateManagerHandles();
        this.byId<HTMLElement>('workflowMessage').textContent = 'Budget approved. Manager decision required. Use Approve or Reject below the Manager Review node.';
    };

    private handleManagerDecision(action: string): void {
        if (this.stage !== 'manager' || this.actionLocked) return;
        this.actionLocked = true;
        this.updateManagerHandles();
        if (action === 'approve') void this.approveRequest();
        if (action === 'reject') this.rejectRequest();
    }

    private approveRequest = async (): Promise<void> => {
        const token = ++this.runToken;
        this.setStatus('manager', 'approved');
        this.setConnector('budget-manager', 'completed');
        this.setConnector('manager-purchase', 'active');
        this.stage = 'purchase';
        this.setStatus('purchase', 'active', 'Creating order');
        this.byId<HTMLElement>('workflowMessage').textContent = 'Budget approved. Creating the purchase order…';
        if (!(await this.delay(800, token))) return;
        this.setStatus('purchase', 'completed', 'Order created');
        this.setConnector('manager-purchase', 'completed');
        this.setConnector('purchase-result', 'completed');
        this.stage = 'completed';
        this.setStatus('result', 'completed', 'Successful');
        this.refreshAllContent();
        this.diagramInstance.select([this.getNode('result')]);
        this.byId<HTMLElement>('workflowMessage').textContent = 'Purchase approved and the order was created successfully.';
        this.actionLocked = false;
    };

    private rejectRequest(): void {
        this.clearPendingWork();
        this.stage = 'rejected'; this.rejectionReason = 'manager';
        this.setStatus('manager', 'rejected', 'Declined');
        this.setConnector('budget-manager', 'completed');
        this.setConnector('manager-result', 'rejected');
        this.setStatus('result', 'rejected');
        this.refreshAllContent();
        this.diagramInstance.select([this.getNode('result')]);
        this.byId<HTMLElement>('workflowMessage').textContent = 'The manager declined the request. No budget check or purchase order was created.';
    }

    private resetWorkflow = (): void => {
        this.clearPendingWork();
        this.stage = 'draft'; this.rejectionReason = undefined;
        this.setInputsDisabled(false); this.showValidation([]);
        ['request', 'manager', 'budget', 'purchase', 'result'].forEach((id) => this.setStatus(id, id === 'request' ? 'draft' : 'waiting'));
        connectorIds.forEach((id) => this.setConnector(id, 'default'));
        this.refreshAllContent();
        this.diagramInstance.select([this.getNode('request')]);
        this.updateManagerHandles();
        this.byId<HTMLButtonElement>('submitRequest').disabled = false;
        this.byId<HTMLButtonElement>('resetWorkflow').disabled = true;
        this.byId<HTMLElement>('workflowMessage').textContent = 'Enter the request details, then submit it for manager approval.';
    };

    private readForm = (): void => {
        this.request.item = this.byId<HTMLInputElement>('propertyItem').value;
        this.request.requester = this.byId<HTMLInputElement>('propertyRequester').value;
        this.request.reason = this.byId<HTMLTextAreaElement>('propertyReason').value;
        this.request.quantity = Number(this.byId<HTMLInputElement>('propertyQuantity').value);
        this.request.unitPrice = Number(this.byId<HTMLInputElement>('propertyUnitPrice').value);
        this.showValidation([]);
        this.refreshAllContent();
    };

    private onCreated = (): void => {
        this.diagramInstance.zoomTo({ zoomFactor: 0.45 });
        this.diagramInstance.fitToPage();
        this.refreshAllContent();
        this.resetWorkflow();
    };

    private onUserHandleMouseDown = (args: UserHandleEventsArgs): void => {
        this.handleManagerDecision(args.element?.name || '');
    };

    render(): JSX.Element {
        return (
            <div className="control-pane">
                <style>{SAMPLE_CSS}</style>
                <script id="node-template" type="text/x-template">
                    {`<div class="node-card type-\${addInfo.type} state-\${addInfo.status}">
                        <div class="node-kicker">\${addInfo.type}</div>
                        <div class="node-title">\${addInfo.title}</div>
                        <div class="node-metrics">
                            <span><small>\${addInfo.primaryLabel}</small><b>\${addInfo.primaryValue}</b></span>
                            <span><small>\${addInfo.secondaryLabel}</small><b>\${addInfo.secondaryValue}</b></span>
                        </div>
                        <div class="node-message">\${addInfo.message}</div>
                    </div>`}
                </script>
                <script id="annotation-template" type="text/x-template">
                    {`<div class="node-note state-\${addInfo.status}">\${addInfo.text}</div>`}
                </script>
                <script id="user-handle-template" type="text/x-template">
                    {`<div class="user-action action-\${name}" title="\${if(name === 'approve')}Approve request\${else}Reject request\${/if}">
                        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                            \${if(name === 'approve')}<path d="M4 10.5l3.5 3.5L16 5.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>\${else}<path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path>\${/if}
                        </svg>
                    </div>`}
                </script>
                <div className="control-section">
                    <div className="approval-sample">
                        <div className="approval-layout">
                            <div className="diagram-pane">
                                <DiagramComponent
                                    id="diagram"
                                    ref={(diagram: DiagramComponent) => (this.diagramInstance = diagram)}
                                    width="100%" height="100%" nodes={nodes} connectors={connectors}
                                    nodeTemplate="#node-template"
                                    annotationTemplate="#annotation-template"
                                    userHandleTemplate="#user-handle-template"
                                    selectedItems={{ userHandles: managerHandles }}
                                    tool={DiagramTools.SingleSelect | DiagramTools.ZoomPan}
                                    snapSettings={{ gridType: 'Dots' }}
                                    created={this.onCreated}
                                    selectionChange={() => window.setTimeout(this.updateManagerHandles, 0)}
                                    getNodeDefaults={(node: NodeModel) => {
                                        node.constraints = NodeConstraints.Default & ~(NodeConstraints.Resize | NodeConstraints.Rotate | NodeConstraints.Drag);
                                        return node;
                                    }}
                                    onUserHandleMouseDown={this.onUserHandleMouseDown}
                                />
                            </div>
                            <aside className="properties" aria-label="Purchase request details">
                                <h3>Purchase request</h3>
                                <p className="intro">Submit a valid equipment request. The budget is checked first, then the workflow pauses at Manager Review for approval.</p>
                                <label className="field"><span>Equipment</span><input id="propertyItem" defaultValue="Ergonomic monitors" onInput={this.readForm} /></label>
                                <label className="field"><span>Requester</span><input id="propertyRequester" defaultValue="Maya Chen" onInput={this.readForm} /></label>
                                <label className="field"><span>Business reason</span><textarea id="propertyReason" defaultValue="Replace outdated design-team displays" onInput={this.readForm} /></label>
                                <div className="field-row">
                                    <label className="field"><span>Quantity</span><input id="propertyQuantity" type="number" min="1" defaultValue="6" onInput={this.readForm} /></label>
                                    <label className="field"><span>Unit price</span><input id="propertyUnitPrice" type="number" min="1" defaultValue="420" onInput={this.readForm} /></label>
                                </div>
                                <div id="validationMessage" className="validation" hidden></div>
                                <div className="actions">
                                    <button id="submitRequest" className="primary" onClick={this.submitRequest}>Submit request</button>
                                    <button id="resetWorkflow" className="secondary" onClick={this.resetWorkflow} disabled>Reset</button>
                                </div>
                                <div id="workflowMessage" className="workflow-message">Enter the request details, then submit it for manager approval.</div>
                            </aside>
                        </div>
                    </div>
                </div>
                 <div id="action-description">
                    <p>
                        This sample demonstrates an equipment purchase approval workflow using the <a href="https://www.syncfusion.com/react-components/react-diagram" target="_blank">React Diagram</a>. It visualizes the end-to-end process, from request submission and budget validation to manager approval, purchase order creation, and final outcome tracking.
                    </p>
                </div>

                <div id="description">
                    <p>
                    This sample showcases an interactive equipment purchase approval workflow using the <a href="https://www.syncfusion.com/react-components/react-diagram" target="_blank">React Diagram</a>. HTML nodes display purchase details for each stage, while connectors represent the workflow path and annotation templates display the current status of each stage. The <code>refreshTemplate</code> API updates the node and annotation templates at runtime.
                    </p>
                    <p>
                        The workflow validates the equipment name, requester, business reason, quantity, and unit price before allowing a request to be submitted. When the user clicks the <b>Submit Request</b> button, the workflow first checks the available budget. If the request is within the available budget, the workflow pauses at <b>Manager Review</b> and displays <b>Approve</b> and <b>Reject</b> handles on the selected manager node. Approval creates a purchase order and moves the request toward completion, while rejection or an insufficient budget follows the red path to a rejected outcome. The <b>Reset</b> option clears the workflow and prepares it for a new request.
                    </p>
                </div>
            </div>
        );
    }
}
