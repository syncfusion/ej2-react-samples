import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { BlockEditorComponent } from '@syncfusion/ej2-react-blockeditor';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './events.css';
import * as data from './blockData.json';

const API = () => {
  useEffect(() => {
    updateSampleSection();
    document.getElementById("clear")?.addEventListener("click", () => {
        document.getElementById('eventLog').innerHTML = '';
    });
  }, []);

    const created = () => {
        appendElement('BlockEditor <b>created</b> event called<hr>');
    }

    const contentChanged = () => {
        appendElement('BlockEditor <b>contentChanged</b> event called<hr>');
    }

    const selectionChanged = () => {
        appendElement('BlockEditor <b>selectionChanged</b> event called<hr>');
    }

    const blockAdded = () => {
        appendElement('BlockEditor <b>blockAdded</b> event called<hr>');
    }

    const blockRemoved = () => {
        appendElement('BlockEditor <b>blockRemoved</b> event called<hr>');
    }

    const blockMoved = () => {
        appendElement('BlockEditor <b>blockMoved</b> event called<hr>');
    }

    const blockDrag = () => {
        appendElement('BlockEditor <b>blockDrag</b> event called<hr>');
    }

    const blockDragStart = () => {
        appendElement('BlockEditor <b>blockDragStart</b> event called<hr>');
    }

    const blockDrop = () => {
        appendElement('BlockEditor <b>blockDrop</b> event called<hr>');
    }

    const focusEvent = () => {
        appendElement('BlockEditor <b>focus</b> event called<hr>');
    }

    const blurEvent = () => {
        appendElement('BlockEditor <b>blur</b> event called<hr>');
    }

    const beforePaste = () => {
        appendElement('BlockEditor <b>beforePaste</b> event called<hr>');
    }

    const afterPaste = () => {
        appendElement('BlockEditor <b>afterPaste</b> event called<hr>');
    }

    const undoRedoPerformed = () => {
        appendElement('BlockEditor <b>undoRedoPerformed</b> event called<hr>');
    } 

    const appendElement = (html) => {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('eventLog');
        log.insertBefore(span, log.firstChild);
    }

  return (
    <div className='control-section'>
        <div className="col-lg-8 control-section">
            <div className="content-wrapper">
                <div id="events-blockeditor"></div>
                <BlockEditorComponent id='events-blockeditor' blocks={data["blockDataEvents"]} created={created} contentChanged={contentChanged} blockAdded={blockAdded} blockRemoved={blockRemoved} blockMoved={blockMoved} blockDrag={blockDrag} blockDragStart={blockDragStart} blockDrop={blockDrop} focus={focusEvent} blur={blurEvent} selectionChanged={selectionChanged} beforePaste={beforePaste} afterPaste={afterPaste} undoRedoPerformed={undoRedoPerformed}></BlockEditorComponent>
            </div>
        </div>
        <div className="col-lg-4 property-section">
            <table id="property" title="Event Trace" className="property-panel-table">
                <tbody>
                    <tr>
                        <td>
                            <div className="eventarea" style={{ height: "245px", overflow: "auto" }}>
                                <span id="eventLog" style={{wordBreak: "normal"}}></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="evtbtn" style={{paddingBottom: "10px"}}>
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
                <li><code>contentChanged</code> - Triggers when the content of the block editor is changed.</li>
                <li><code>selectionChanged</code> - Triggers when the selection in the block editor changes.</li>
                <li><code>blockAdded</code> - Triggers when a new block is added to the editor.</li>
                <li><code>blockRemoved</code> - Triggers when a block is removed from the editor.</li>
                <li><code>blockMoved</code> - Triggers when a block is moved within the editor.</li>
                <li><code>blockDrag</code> - Triggers during the dragging operation of a block.</li>
                <li><code>blockDragStart</code> - Triggers when the drag operation for a block starts.</li>
                <li><code>blockDrop</code> - Triggers when a block is dropped after a drag operation.</li>
                <li><code>focus</code> - Triggers when the block editor gains focus.</li>
                <li><code>blur</code> - Triggers when the block editor loses focus.</li>
                <li><code>beforePaste</code> - Triggers before pasting the content in the block editor.</li>
                <li><code>afterPaste</code> - Triggers after pasting the content in the block editor.</li>
                <li><code>undoRedoPerformed</code> - Triggers when the undo/redo actions are performed in the block editor.</li>
            </ul>
        </div>
    </div>
  );
}

export default API;