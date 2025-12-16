import * as React from 'react';
import { BlockEditorComponent, BlockAction, BlockChange, BlockChangedEventArgs, ToolbarItemClickEventArgs } from '@syncfusion/ej2-react-blockeditor';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './events.css';
import * as data from './blockData.json';
import { SampleBase } from '../common/sample-base';

export class API extends SampleBase<{}, {}> {
    // Triggers after the Block Editor is rendered completely
    created = () => {
        this.appendElement('BlockEditor <b>created</b> event called<hr>');
    }

    inlineToolbar={
        itemClick: (args: ToolbarItemClickEventArgs) => {
            // Log specific inline toolbar item click event to event log
            this.appendElement(`BlockEditor inline toolbar <b>${args.item.command}</b> clicked<hr>`);
        }
    };

    // Handles the blockChange event by logging details of changes made to the blocks, including insertions, deletions, movements, and updates
    blockChangeEvent = (args: BlockChangedEventArgs) => {
        const changesCount = args.changes.length;
        if (changesCount === 0) return;

        const actionCounts: { [key in BlockAction]?: number } = {};
        args.changes.forEach((change: BlockChange) => {
            actionCounts[change.action] = (actionCounts[change.action] || 0) + 1;
        });

        const messages: string[] = [];
        const plural = (count: number, noun: string) => (count === 1 ? `${count} ${noun}` : `${count} ${noun}s`);

        if (actionCounts.Insertion) messages.push(`${plural(actionCounts.Insertion, 'block')} inserted`);
        if (actionCounts.Deletion) messages.push(`${plural(actionCounts.Deletion, 'block')} deleted`);
        if (actionCounts.Moved) messages.push(`${plural(actionCounts.Moved, 'block')} moved`);
        if (actionCounts.Update) messages.push(`${plural(actionCounts.Update, 'block')} updated`);

        const logMessage = `BlockEditor <b>blockChanged</b> event called: ${messages.join(', ')}<hr>`;
        this.appendElement(logMessage);
    };

    // Triggers when the selection in the block editor changes
    selectionChanged = () => {
        this.appendElement('BlockEditor <b>selectionChanged</b> event called<hr>');
    }

    // Triggers when the drag operation for a block starts
    blockDragStart = () => {
        this.appendElement('BlockEditor <b>blockDragStart</b> event called<hr>');
    }

    // Triggers during the dragging operation of a block
    blockDragging = () => {
        this.appendElement('BlockEditor <b>blockDragging</b> event called<hr>');
    };

    // Triggers when a block is dropped after a drag operation
    blockDropped = () => {
        this.appendElement('BlockEditor <b>blockDropped</b> event called<hr>');
    };

    // Triggers when the block editor gains focus
    focusEvent = () => {
        this.appendElement('BlockEditor <b>focus</b> event called<hr>');
    }

    // Triggers when the block editor loses focus
    blurEvent = () => {
        this.appendElement('BlockEditor <b>blur</b> event called<hr>');
    }

    // Triggers before pasting the content in the block editor
    beforePaste = () => {
        this.appendElement('BlockEditor <b>beforePaste</b> event called<hr>');
    }

    // Triggers after pasting the content in the block editor
    afterPaste = () => {
        this.appendElement('BlockEditor <b>afterPaste</b> event called<hr>');
    }

    // Appends an HTML element to the event log panel
    appendElement = (html: string) => {
        const span = document.createElement('span');
        span.innerHTML = html;
        const log = document.getElementById('eventLog');
        if (log) log.insertBefore(span, log.firstChild);
    };
    // Sets up the clear button event listener after the component mounts
    componentDidMount() {
        document.getElementById('clear')?.addEventListener('click', () => {
            const el = document.getElementById('eventLog');
            if (el) el.innerHTML = '';
        });
    }
    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section">
                    <div className="blockeditor-events">
                        <div id="events-blockeditor"></div>
                        <BlockEditorComponent id='events-blockeditor' height="600px" blocks={data["blockDataEvents"]} created={this.created.bind(this)} blockChanged={this.blockChangeEvent.bind(this)} blockDragStart={this.blockDragStart.bind(this)} blockDragging={this.blockDragging.bind(this)} blockDropped={this.blockDropped.bind(this)} focus={this.focusEvent.bind(this)} blur={this.blurEvent.bind(this)} selectionChanged={this.selectionChanged.bind(this)} beforePasteCleanup={this.beforePaste.bind(this)} afterPasteCleanup={this.afterPaste.bind(this)} inlineToolbarSettings={this.inlineToolbar}></BlockEditorComponent>
                    </div>
                </div>
                <div className="col-lg-4 property-section">
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
        )
    }
}