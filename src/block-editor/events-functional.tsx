import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { BlockEditorComponent, BlockAction, BlockChange, BlockChangedEventArgs, ToolbarItemClickEventArgs } from '@syncfusion/ej2-react-blockeditor';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './events.css';
import * as data from './blockData.json';

const API = () => {
    useEffect(() => {
        updateSampleSection();
        const clearBtn = document.getElementById('clear');
        const handler = () => {
            const log = document.getElementById('eventLog');
            if (log) log.innerHTML = '';
        };
        clearBtn?.addEventListener('click', handler);
        return () => clearBtn?.removeEventListener('click', handler);
    }, []);

    // Triggers after the Block Editor is rendered completely
    const created = () => {
        appendElement('BlockEditor <b>created</b> event called<hr>');
    }

    const inlineToolbar={
            itemClick: (args: ToolbarItemClickEventArgs) => {
                // Log specific inline toolbar item click event to event log
                appendElement(`BlockEditor inline toolbar <b>${args.item.command}</b> clicked<hr>`);
            }
        };
    // Handles the blockChange event by logging details of changes made to the blocks, including insertions, deletions, movements, and updates
    const blockChangeEvent = (args: BlockChangedEventArgs) => {
        const changesCount = args.changes.length;
        if (changesCount === 0) return;

        const actionCounts: { [key in BlockAction]?: number } = {};
        args.changes.forEach((change: BlockChange) => {
            actionCounts[change.action] = (actionCounts[change.action] || 0) + 1;
        });

        const messages: string[] = [];
        const plural = (count: number | undefined, noun: string) =>
            count === 1 ? `${count} ${noun}` : `${count} ${noun}s`;

        if (actionCounts.Insertion) messages.push(`${plural(actionCounts.Insertion, 'block')} inserted`);
        if (actionCounts.Deletion) messages.push(`${plural(actionCounts.Deletion, 'block')} deleted`);
        if (actionCounts.Moved) messages.push(`${plural(actionCounts.Moved, 'block')} moved`);
        if (actionCounts.Update) messages.push(`${plural(actionCounts.Update, 'block')} updated`);

        appendElement(`BlockEditor <b>blockChanged</b> event called: ${messages.join(', ')}<hr>`);
    };

    // Triggers when the selection in the block editor changes
    const selectionChanged = () => {
        appendElement('BlockEditor <b>selectionChanged</b> event called<hr>');
    }

    // Triggers during the dragging operation of a block
    const blockDragging = () => {
        appendElement('BlockEditor <b>blockDragging</b> event called<hr>');
    }

    // Triggers when the drag operation for a block starts
    const blockDragStart = () => {
        appendElement('BlockEditor <b>blockDragStart</b> event called<hr>');
    }

    // Triggers when a block is dropped after a drag operation
    const blockDropped = () => {
        appendElement('BlockEditor <b>blockDropped</b> event called<hr>');
    }

    // Triggers when the block editor gains focus
    const focusEvent = () => {
        appendElement('BlockEditor <b>focus</b> event called<hr>');
    }

    // Triggers when the block editor loses focus
    const blurEvent = () => {
        appendElement('BlockEditor <b>blur</b> event called<hr>');
    }

    // Triggers before pasting the content in the block editor
    const beforePaste = () => {
        appendElement('BlockEditor <b>beforePaste</b> event called<hr>');
    }

    // Triggers after pasting the content in the block editor
    const afterPaste = () => {
        appendElement('BlockEditor <b>afterPaste</b> event called<hr>');
    }

    // Appends an HTML element to the event log panel
    const appendElement = (html: string) => {
        const span = document.createElement('span');
        span.innerHTML = html;
        const log = document.getElementById('eventLog');
        if (log) log.insertBefore(span, log.firstChild);
    };

    return (
        <div className='control-pane'>
            <div className="col-lg-8 control-section">
                <div className="blockeditor-events">
                    <div id="events-blockeditor"></div>
                    <BlockEditorComponent id='events-blockeditor' blocks={data["blockDataEvents"]} height="600px" created={created} blockChanged={blockChangeEvent} blockDragStart={blockDragStart} blockDragging={blockDragging} blockDropped={blockDropped} focus={focusEvent} blur={blurEvent} selectionChanged={selectionChanged} beforePasteCleanup={beforePaste} afterPasteCleanup={afterPaste} inlineToolbarSettings={inlineToolbar} ></BlockEditorComponent>
                </div>
            </div>
            <div className="col-lg-4 property-section">
                <div className="property-panel-header"> Properties </div>
                <table id="property" title="Event Trace" className="property-panel-table">
                    <tbody>
                        <tr>
                            <td>
                                <div className="eventarea" style={{ height: "245px", overflow: "auto" }}>
                                    <span id="eventLog" style={{ wordBreak: "normal" }}></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="evtbtn" style={{ paddingBottom: "10px" }}>
                                    <ButtonComponent id='clear' content='Clear'></ButtonComponent>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the events that trigger on every action of the Block Editor. The event details are showcased in the event trace panel.</p>
            </div>

            <div id="description">
                <p>The Block Editor triggers events based on its actions. These events can be used as extension points to perform custom operations.</p>
                <ul>
                    <li><code>created</code> - Triggers after the Block Editor is rendered completely.</li>
                    <li><code>blockChanged</code> - Triggers when the editor blocks are changed. This event provides details about the changes made to the blocks, including insertions, deletions, movements, and updates.</li>
                    <li><code>selectionChanged</code> - Triggers when the selection in the block editor changes.</li>
                    <li><code>blockDragging</code> - Triggers during the dragging operation of a block.</li>
                    <li><code>blockDragStart</code> - Triggers when the drag operation for a block starts.</li>
                    <li><code>blockDropped</code> - Triggers when a block is dropped after a drag operation.</li>
                    <li><code>focus</code> - Triggers when the block editor gains focus.</li>
                    <li><code>blur</code> - Triggers when the block editor loses focus.</li>
                    <li><code>beforePasteCleanup</code> - Triggers before pasting the content in the block editor.</li>
                    <li><code>afterPasteCleanup</code> - Triggers after pasting the content in the block editor.</li>
                </ul>
            </div>
        </div>
    );
}

export default API;