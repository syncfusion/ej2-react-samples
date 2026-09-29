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
import { updateSampleSection } from '../common/sample-base';

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
    draft: 'Draft',
    waiting: 'Waiting',
    active: 'Action required',
    approved: 'Approved',
    completed: 'Completed',
    rejected: 'Rejected'
};

const connectorIds = [
    'request-budget',
    'budget-manager',
    'manager-purchase',
    'purchase-result',
    'manager-result',
    'budget-result'
];

const connectorStyle = { strokeColor: '#94a3b8', strokeWidth: 1.6 };

function nodeInfo(type: NodeType, title: string): NodeInfo {
    return {
        type,
        title,
        status: type === 'request' ? 'draft' : 'waiting',
        statusText: type === 'request' ? 'Draft' : 'Waiting',
        primaryLabel: '',
        primaryValue: '',
        secondaryLabel: '',
        secondaryValue: '',
        message: ''
    };
}

function createNode(id: string, x: number, y: number, type: NodeType, title: string): NodeModel {
    return {
        id,
        offsetX: x,
        offsetY: y,
        width: 160,
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
            id: `${id}-status`,
            annotationType: 'Template',
            content: '',
            offset: { x: 0.5, y: -0.11 },
            width: 85,
            height: 26,
            addInfo: {
                text: type === 'request' ? 'Draft' : 'Waiting',
                status: type === 'request' ? 'draft' : 'waiting'
            } as NoteInfo
        }]
    };
}

function createConnector(
    id: string,
    sourceID: string,
    targetID: string,
    sourcePortID = `${sourceID}-right`,
    targetPortID = `${targetID}-left`
): ConnectorModel {
    return {
        id,
        sourceID,
        targetID,
        sourcePortID,
        targetPortID,
        type: 'Orthogonal',
        cornerRadius: 12,
        constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select,
        style: { ...connectorStyle },
        targetDecorator: {
            shape: 'Arrow',
            width: 9,
            height: 9,
            style: { fill: '#94a3b8', strokeColor: '#94a3b8' }
        }
    };
}

const initialNodes: NodeModel[] = (() => {
    const nodes = [
        createNode('request', 100, 100, 'request', 'Equipment request'),
        createNode('manager', 100, 300, 'manager', 'Manager review'),
        createNode('budget', 300, 100, 'budget', 'Budget check'),
        createNode('purchase', 300, 300, 'purchase', 'Purchase order'),
        createNode('result', 510, 200, 'result', 'Request outcome')
    ];
    
    // Initialize with default data so templates render properly on first load
    nodes[0].addInfo = {
        type: 'request',
        title: 'Equipment request',
        status: 'draft',
        statusText: 'Draft',
        primaryLabel: 'Item',
        primaryValue: 'Ergonomic monitors',
        secondaryLabel: 'Total',
        secondaryValue: '$2,520',
        message: '6 × $420'
    };
    
    nodes[1].addInfo = {
        type: 'manager',
        title: 'Manager review',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Requested by',
        primaryValue: 'Maya Chen',
        secondaryLabel: 'Amount',
        secondaryValue: '$2,520',
        message: 'Replace outdated design-team displays'
    };
    
    nodes[2].addInfo = {
        type: 'budget',
        title: 'Budget check',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Available',
        primaryValue: '$5,000',
        secondaryLabel: 'Requested',
        secondaryValue: '$2,520',
        message: 'Within available budget'
    };
    
    nodes[3].addInfo = {
        type: 'purchase',
        title: 'Purchase order',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Quantity',
        primaryValue: '6',
        secondaryLabel: 'Order value',
        secondaryValue: '$2,520',
        message: 'Created after all approvals'
    };
    
    nodes[4].addInfo = {
        type: 'result',
        title: 'Request outcome',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Outcome',
        primaryValue: 'Pending',
        secondaryLabel: '',
        secondaryValue: '',
        message: 'Waiting for workflow completion'
    };
    
    return nodes;
})();

const initialConnectors: ConnectorModel[] = [
    createConnector('request-budget', 'request', 'budget', 'request-right', 'budget-left'),
    createConnector('budget-manager', 'budget', 'manager', 'budget-bottom', 'manager-left'),
    createConnector('manager-purchase', 'manager', 'purchase', 'manager-right', 'purchase-left'),
    createConnector('purchase-result', 'purchase', 'result'),
    createConnector('manager-result', 'manager', 'result', 'manager-bottom', 'result-bottom'),
    createConnector('budget-result', 'budget', 'result', 'budget-right', 'result-left')
];

const managerHandles: UserHandleModel[] = [
    {
        name: 'approve',
        side: 'Bottom',
        offset: 0.32,
        size: 36,
        margin: { bottom: 13 },
        visible: false,
        tooltip: { content: 'Approve request' },
        disableConnectors: true
    },
    {
        name: 'reject',
        side: 'Bottom',
        offset: 0.68,
        size: 36,
        margin: { bottom: 13 },
        visible: false,
        tooltip: { content: 'Reject request' },
        disableConnectors: true
    }
];

const SAMPLE_CSS = `
.approval-sample { width: 100%; height: 560px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc; }
.approval-sample .approval-layout { display: grid; grid-template-columns: minmax(0, 1fr) 220px; height: 100%; }
.approval-sample .diagram-pane { min-width: 0; background: #f8fafc; }
.approval-sample #diagram { width: 100%; height: 100%; }
.approval-sample .properties { padding: 14px; overflow: auto; border-left: 1px solid #e2e8f0; background: #fff; color: #1e293b; }
.approval-sample .properties h3 { margin: 0 0 4px; font-size: 17px; }
.approval-sample .properties .intro { margin: 0 0 14px; color: #64748b; font-size: 10px; line-height: 1.4; }
.approval-sample .field { display: block; margin-top: 10px; }
.approval-sample .field span { display: block; margin-bottom: 4px; color: #475569; font-size: 10px; font-weight: 650; }
.approval-sample .field input, .approval-sample .field textarea { box-sizing: border-box; width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 9px; color: #1e293b; background: #fff; font: inherit; font-size: 11px; font-weight: 400; }
.approval-sample .field textarea { min-height: 56px; resize: vertical; }
.approval-sample .field input:disabled, .approval-sample .field textarea:disabled { color: #64748b; background: #f1f5f9; }
.approval-sample .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.approval-sample .actions { display: grid; grid-template-columns: 1fr auto; gap: 7px; margin-top: 13px; }
.approval-sample .actions button { min-height: 36px; border-radius: 8px; padding: 8px 11px; cursor: pointer; font-size: 11px; font-weight: 700; }
.approval-sample .actions .primary { border: 0; color: #fff; background: #4f46e5; }
.approval-sample .actions .secondary { border: 1px solid #cbd5e1; color: #334155; background: #fff; }
.approval-sample .actions button:disabled { cursor: default; opacity: .55; }
.approval-sample .validation { margin-top: 10px; padding: 8px; border-radius: 7px; color: #991b1b; background: #fef2f2; font-size: 10px; line-height: 1.4; }
.approval-sample .workflow-message { margin-top: 12px; padding: 9px; border-radius: 8px; color: #475569; background: #f1f5f9; font-size: 10px; line-height: 1.45; }
.approval-sample .node-card { box-sizing: border-box; width: 100%; height: 100%; padding: 11px 12px; overflow: hidden; border: 1px solid #dbe3ec; border-radius: 13px; color: #1e293b; background: #fff; box-shadow: 0 7px 20px rgba(15, 23, 42, .07); text-align: left; }
.approval-sample .node-card.state-active { border-color: #818cf8; box-shadow: 0 7px 22px rgba(79, 70, 229, .15); }
.approval-sample .node-card.state-approved, .approval-sample .node-card.state-completed { border-color: #a7f3d0; }
.approval-sample .node-card.state-rejected { border-color: #fecaca; }
.approval-sample .node-kicker { color: #64748b; font-size: 8px; font-weight: 750; text-transform: uppercase; letter-spacing: .07em; }
.approval-sample .node-title { margin-top: 3px; font-size: 12px; font-weight: 750; }
.approval-sample .node-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 9px; }
.approval-sample .node-metrics span { min-width: 0; padding: 7px; border-radius: 7px; background: #f8fafc; }
.approval-sample .node-metrics small, .approval-sample .node-metrics b { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.approval-sample .node-metrics small { color: #94a3b8; font-size: 8px; }
.approval-sample .node-metrics b { margin-top: 2px; font-size: 10px; }
.approval-sample .node-message { margin-top: 7px; overflow: hidden; color: #64748b; font-size: 8.5px; line-height: 1.35; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.approval-sample .type-result { display: grid; align-content: center; text-align: center; }
.approval-sample .type-result .node-metrics { grid-template-columns: 1fr; margin-top: 7px; }
.approval-sample .type-result .node-metrics span:nth-child(2) { display: none; }
.approval-sample .node-note { display: inline-flex; align-items: center; justify-content: center; min-width: 92px; height: 22px; padding: 0 8px; border: 1px solid #dbe3ec; border-radius: 99px; color: #64748b; background: #fff; box-shadow: 0 2px 7px rgba(15,23,42,.06); font-size: 8px; font-weight: 700; }
.approval-sample .node-note.state-active { color: #4338ca; border-color: #c7d2fe; background: #eef2ff; }
.approval-sample .node-note.state-approved, .approval-sample .node-note.state-completed { color: #047857; border-color: #a7f3d0; background: #ecfdf5; }
.approval-sample .node-note.state-rejected { color: #b91c1c; border-color: #fecaca; background: #fef2f2; }
.approval-sample .user-action { display: grid; place-items: center; width: 100%; height: 100%; border: 2px solid #fff; border-radius: 50%; color: #fff; box-shadow: 0 4px 12px rgba(15,23,42,.2); font-size: 17px; font-weight: 800; cursor: pointer; }
.approval-sample .action-approve { background: #059669; }
.approval-sample .action-reject { background: #dc2626; }
.approval-sample .e-diagram-endpoint-handle.e-disabled, .approval-sample .e-diagram-bezier-control-handle.e-disabled, .approval-sample .e-diagram-resize-handle.e-disabled { opacity: 0; }
@media (max-width: 850px) {
    .approval-sample .approval-layout { grid-template-columns: 1fr; grid-template-rows: 420px auto; }
    .approval-sample { height: auto; }
    .approval-sample .properties { border-top: 1px solid #e2e8f0; border-left: 0; }
}`;

function PurchaseApprovalWorkflow(): JSX.Element {
    const diagramRef = React.useRef<DiagramComponent | null>(null);
    const stageRef = React.useRef<Stage>('draft');
    const rejectionReasonRef = React.useRef<'budget' | 'manager' | undefined>(undefined);
    const runTokenRef = React.useRef(0);
    const pendingTimerRef = React.useRef<number | undefined>(undefined);
    const actionLockedRef = React.useRef(false);
    const requestRef = React.useRef<RequestData>({
        item: 'Ergonomic monitors',
        requester: 'Maya Chen',
        reason: 'Replace outdated design-team displays',
        quantity: 6,
        unitPrice: 420,
        budget: 5000
    });

    React.useEffect(() => {
        updateSampleSection();
        return () => {
            runTokenRef.current++;
            if (pendingTimerRef.current !== undefined) {
                window.clearTimeout(pendingTimerRef.current);
            }
        };
    }, []);

    function diagram(): DiagramComponent {
        return diagramRef.current as DiagramComponent;
    }

    function byId<T extends HTMLElement>(id: string): T {
        return document.getElementById(id) as T;
    }

    function total(): number {
        const request = requestRef.current;
        return request.quantity * request.unitPrice;
    }

    function getNode(id: string): NodeModel {
        return diagram().getObject(id) as NodeModel;
    }

    function setNode(id: string, changes: Partial<NodeInfo>): void {
        const node = getNode(id);
        node.addInfo = { ...(node.addInfo as NodeInfo), ...changes };
        diagram().refreshTemplate(node);
    }

    function setStatus(id: string, status: Status, text = statusLabels[status]): void {
        const node = getNode(id);
        setNode(id, { status, statusText: text });
        const note = node.annotations![0];
        note.addInfo = { text, status } as NoteInfo;
        diagram().refreshTemplate(note, node);
    }

    function setConnector(id: string, status: 'default' | 'active' | 'completed' | 'rejected'): void {
        const connector = diagram().getObject(id) as ConnectorModel;
        const color = status === 'active'
            ? '#4f46e5'
            : status === 'completed'
                ? '#059669'
                : status === 'rejected'
                    ? '#dc2626'
                    : '#94a3b8';
        connector.style = { strokeColor: color, strokeWidth: status === 'default' ? 1.6 : 2.2 };
        if (connector.targetDecorator?.style) {
            connector.targetDecorator.style.fill = color;
            connector.targetDecorator.style.strokeColor = color;
        }
        diagram().dataBind();
    }

    function refreshAllContent(): void {
        const request = requestRef.current;
        const amount = total();
        const stage = stageRef.current;
        const rejectionReason = rejectionReasonRef.current;
        setNode('request', {
            primaryLabel: 'Item', primaryValue: request.item,
            secondaryLabel: 'Total', secondaryValue: money.format(amount),
            message: `${request.quantity} × ${money.format(request.unitPrice)}`
        });
        setNode('manager', {
            primaryLabel: 'Requested by', primaryValue: request.requester,
            secondaryLabel: 'Amount', secondaryValue: money.format(amount),
            message: request.reason
        });
        setNode('budget', {
            primaryLabel: 'Available', primaryValue: money.format(request.budget),
            secondaryLabel: 'Requested', secondaryValue: money.format(amount),
            message: amount <= request.budget ? 'Within available budget' : 'Budget limit exceeded'
        });
        setNode('purchase', {
            primaryLabel: 'Quantity', primaryValue: String(request.quantity),
            secondaryLabel: 'Order value', secondaryValue: money.format(amount),
            message: 'Created after all approvals'
        });
        setNode('result', {
            primaryLabel: 'Outcome',
            primaryValue: stage === 'completed' ? 'Purchase successful' : stage === 'rejected' ? 'Purchase rejected' : 'Pending',
            secondaryLabel: '',
            secondaryValue: '',
            message: stage === 'completed'
                ? `${request.quantity} items approved for ${money.format(amount)}`
                : rejectionReason === 'budget'
                    ? 'The request exceeds the available budget'
                    : rejectionReason === 'manager'
                        ? 'The request was declined by the manager'
                        : 'Waiting for workflow completion'
        });
    }

    function validateRequest(): string[] {
        const request = requestRef.current;
        const errors: string[] = [];
        if (!request.item.trim()) errors.push('Enter an equipment name.');
        if (!request.requester.trim()) errors.push('Enter a requester name.');
        if (!request.reason.trim()) errors.push('Enter a business reason.');
        if (!Number.isFinite(request.quantity) || request.quantity < 1) errors.push('Quantity must be at least 1.');
        if (!Number.isFinite(request.unitPrice) || request.unitPrice <= 0) errors.push('Unit price must be greater than 0.');
        return errors;
    }

    function showValidation(errors: string[]): void {
        const box = byId<HTMLElement>('validationMessage');
        box.hidden = errors.length === 0;
        box.textContent = errors.join(' ');
    }

    function clearPendingWork(): void {
        runTokenRef.current++;
        if (pendingTimerRef.current !== undefined) {
            window.clearTimeout(pendingTimerRef.current);
            pendingTimerRef.current = undefined;
        }
        actionLockedRef.current = false;
    }

    function delay(ms: number, token: number): Promise<boolean> {
        return new Promise((resolve) => {
            pendingTimerRef.current = window.setTimeout(() => {
                pendingTimerRef.current = undefined;
                resolve(token === runTokenRef.current);
            }, ms);
        });
    }

    function updateManagerHandles(): void {
        if (!diagramRef.current) return;
        const selected = diagram().selectedItems.nodes?.[0] as NodeModel | undefined;
        const show = selected?.id === 'manager' && stageRef.current === 'manager' && !actionLockedRef.current;
        diagram().selectedItems.userHandles?.forEach((handle: UserHandleModel) => {
            handle.visible = show;
        });
        diagram().dataBind();
    }

    function setInputsDisabled(disabled: boolean): void {
        ['propertyItem', 'propertyRequester', 'propertyReason', 'propertyQuantity', 'propertyUnitPrice'].forEach((id) => {
            byId<HTMLInputElement | HTMLTextAreaElement>(id).disabled = disabled;
        });
    }

    async function submitRequest(): Promise<void> {
        const errors = validateRequest();
        showValidation(errors);
        if (errors.length) return;
        clearPendingWork();
        setInputsDisabled(true);
        setStatus('request', 'approved', 'Submitted');
        setConnector('request-budget', 'active');
        setStatus('budget', 'active', 'Checking budget');
        byId<HTMLButtonElement>('submitRequest').disabled = true;
        byId<HTMLButtonElement>('resetWorkflow').disabled = false;
        byId<HTMLElement>('workflowMessage').textContent = 'Checking the available budget before requesting manager approval…';
        const token = ++runTokenRef.current;
        if (!(await delay(700, token))) return;
        if (total() > requestRef.current.budget) {
            stageRef.current = 'rejected';
            rejectionReasonRef.current = 'budget';
            setStatus('budget', 'rejected', 'Insufficient budget');
            setConnector('request-budget', 'rejected');
            setConnector('budget-result', 'rejected');
            setStatus('result', 'rejected');
            refreshAllContent();
            diagram().select([getNode('result')]);
            byId<HTMLElement>('workflowMessage').textContent = 'Request rejected because the purchase exceeds the available budget.';
            return;
        }
        stageRef.current = 'manager';
        setStatus('budget', 'approved', 'Budget approved');
        setConnector('request-budget', 'completed');
        setConnector('budget-manager', 'active');
        setStatus('manager', 'active', 'Decision required');
        diagram().select([getNode('manager')]);
        updateManagerHandles();
        byId<HTMLElement>('workflowMessage').textContent = 'Budget approved. Manager decision required. Use Approve or Reject below the Manager Review node.';
    }

    function handleManagerDecision(action: string): void {
        if (stageRef.current !== 'manager' || actionLockedRef.current) return;
        actionLockedRef.current = true;
        updateManagerHandles();
        if (action === 'approve') void approveRequest();
        if (action === 'reject') rejectRequest();
    }

    async function approveRequest(): Promise<void> {
        const token = ++runTokenRef.current;
        setStatus('manager', 'approved');
        setConnector('budget-manager', 'completed');
        setConnector('manager-purchase', 'active');
        stageRef.current = 'purchase';
        setStatus('purchase', 'active', 'Creating order');
        byId<HTMLElement>('workflowMessage').textContent = 'Budget approved. Creating the purchase order…';
        if (!(await delay(800, token))) return;
        setStatus('purchase', 'completed', 'Order created');
        setConnector('manager-purchase', 'completed');
        setConnector('purchase-result', 'completed');
        stageRef.current = 'completed';
        setStatus('result', 'completed', 'Successful');
        refreshAllContent();
        diagram().select([getNode('result')]);
        byId<HTMLElement>('workflowMessage').textContent = 'Purchase approved and the order was created successfully.';
        actionLockedRef.current = false;
    }

    function rejectRequest(): void {
        clearPendingWork();
        stageRef.current = 'rejected';
        rejectionReasonRef.current = 'manager';
        setStatus('manager', 'rejected', 'Declined');
        setConnector('budget-manager', 'completed');
        setConnector('manager-result', 'rejected');
        setStatus('result', 'rejected');
        refreshAllContent();
        diagram().select([getNode('result')]);
        byId<HTMLElement>('workflowMessage').textContent = 'The manager declined the request. No budget check or purchase order was created.';
    }

    function resetWorkflow(): void {
        clearPendingWork();
        stageRef.current = 'draft';
        rejectionReasonRef.current = undefined;
        setInputsDisabled(false);
        showValidation([]);
        ['request', 'manager', 'budget', 'purchase', 'result'].forEach((id) =>
            setStatus(id, id === 'request' ? 'draft' : 'waiting')
        );
        connectorIds.forEach((id) => setConnector(id, 'default'));
        refreshAllContent();
        diagram().select([getNode('request')]);
        updateManagerHandles();
        byId<HTMLButtonElement>('submitRequest').disabled = false;
        byId<HTMLButtonElement>('resetWorkflow').disabled = true;
        byId<HTMLElement>('workflowMessage').textContent = 'Enter the request details, then submit it for manager approval.';
    }

    function readForm(): void {
        const request = requestRef.current;
        request.item = byId<HTMLInputElement>('propertyItem').value;
        request.requester = byId<HTMLInputElement>('propertyRequester').value;
        request.reason = byId<HTMLTextAreaElement>('propertyReason').value;
        request.quantity = Number(byId<HTMLInputElement>('propertyQuantity').value);
        request.unitPrice = Number(byId<HTMLInputElement>('propertyUnitPrice').value);
        showValidation([]);
        refreshAllContent();
    }

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
                                ref={(value: DiagramComponent) => { diagramRef.current = value; }}
                                width="100%"
                                height="100%"
                                nodes={initialNodes}
                                connectors={initialConnectors}
                                nodeTemplate="#node-template"
                                annotationTemplate="#annotation-template"
                                userHandleTemplate="#user-handle-template"
                                selectedItems={{ userHandles: managerHandles }}
                                tool={DiagramTools.SingleSelect | DiagramTools.ZoomPan}
                                snapSettings={{ gridType: 'Dots' }}
                                created={() => {
                                    diagram().zoomTo({ zoomFactor: 0.45 });
                                    diagram().fitToPage();
                                    refreshAllContent();
                                    resetWorkflow();
                                }}
                                selectionChange={() => window.setTimeout(updateManagerHandles, 0)}
                                getNodeDefaults={(node: NodeModel) => {
                                    node.constraints = NodeConstraints.Default &
                                        ~(NodeConstraints.Resize | NodeConstraints.Rotate | NodeConstraints.Drag);
                                    return node;
                                }}
                                onUserHandleMouseDown={(args: UserHandleEventsArgs) =>
                                    handleManagerDecision(args.element?.name || '')
                                }
                            />
                        </div>
                        <aside className="properties" aria-label="Purchase request details">
                            <h3>Purchase request</h3>
                            <p className="intro">Submit a valid equipment request. The budget is checked first, then the workflow pauses at Manager Review for approval.</p>
                            <label className="field"><span>Equipment</span><input id="propertyItem" defaultValue="Ergonomic monitors" onInput={readForm} /></label>
                            <label className="field"><span>Requester</span><input id="propertyRequester" defaultValue="Maya Chen" onInput={readForm} /></label>
                            <label className="field"><span>Business reason</span><textarea id="propertyReason" defaultValue="Replace outdated design-team displays" onInput={readForm} /></label>
                            <div className="field-row">
                                <label className="field"><span>Quantity</span><input id="propertyQuantity" type="number" min="1" defaultValue="6" onInput={readForm} /></label>
                                <label className="field"><span>Unit price</span><input id="propertyUnitPrice" type="number" min="1" defaultValue="420" onInput={readForm} /></label>
                            </div>
                            <div id="validationMessage" className="validation" hidden></div>
                            <div className="actions">
                                <button id="submitRequest" className="primary" onClick={() => void submitRequest()}>Submit request</button>
                                <button id="resetWorkflow" className="secondary" onClick={resetWorkflow} disabled>Reset</button>
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

export default PurchaseApprovalWorkflow;
