import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { BlockEditorComponent, FocusEventArgs } from '@syncfusion/ej2-react-blockeditor';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import {DialogUtility} from '@syncfusion/ej2-react-popups';
import './api.css';
import * as data from './blockData.json';

const API = () => {
  useEffect(() => {
    updateSampleSection();
    // Helper: escape HTML to display raw content safely inside dialog
    const escapeHtml = (html: string): string =>
      html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    // Reusable predefined dialog helper (single place to show alerts)
    const openDialog = (title: string, content: string, isHtml?: boolean): void => {
      let updatedContent = isHtml ? escapeHtml(content) : content;
      let dlg = DialogUtility.alert({
        title,
        content: `<pre style="white-space: pre-wrap;">${updatedContent}</pre>`,
        okButton: { text: 'OK', click: () => dlg.close() },
        isModal: true,
        position: { X: 'center', Y: 'center' },
        height: "400px",
        width: "500px",
        closeOnEscape: true
      });
    };

    // Get JSON data (entire editor) and show via predefined dialog
    document.getElementById("getJson")?.addEventListener("click", () => {
      const jsonData = apiBlockEditor.current.getDataAsJson();
      if (jsonData) {
        openDialog('JSON Data',JSON.stringify(jsonData, null, 2));
      }
    });

    // Get HTML data and show via predefined dialog (render as plain text)
    document.getElementById("getHtml")?.addEventListener("click", () => {
      const htmlData = apiBlockEditor.current.getDataAsHtml();
      if (htmlData) {
        openDialog('Editor HTML', htmlData, true);
      }
    });

    // Get block count and show via predefined dialog
    document.getElementById("getBlockCount")?.addEventListener("click", () => {
      const blockCount = apiBlockEditor.current.getBlockCount();
      if (blockCount !== undefined) {
        let dialog = DialogUtility.alert({
          title: "Block Count",
          content: `<div>Total blocks: <b>${blockCount}</b></div>`,
          okButton: { text: 'OK', click: () => dialog.close() },
          isModal: true,
          position: { X: 'center', Y: 'center' },
          width: "250px",
          closeOnEscape: true
        });
      }
    });

    document.getElementById("selectall")?.addEventListener("click", () => {
      apiBlockEditor.current.selectAllBlocks();
    });

    document.getElementById("print")?.addEventListener("click", () => {
      apiBlockEditor.current.print();
    });
  }, []);

  const apiBlockEditor = useRef(null);
  const id = useRef(null);

  // Handles changes to the read-only checkbox to toggle editable mode
  const readOnlyChange = (args: ChangeEventArgs) => {
    apiBlockEditor.current.readOnly = args.checked;
  };

  // Handles changes to the drag and drop checkbox to enable or disable block reordering
  const enableDragDropChange = (args: ChangeEventArgs) => {
    apiBlockEditor.current.enableDragAndDrop = args.checked;
  };

  // Captures the block ID when the editor receives focus
  const focus = (args: FocusEventArgs) => {
    id.current = args.blockId;
  }

  return (
    <div className='control-pane'>
        <div className="col-lg-8 control-section">
            <div className="blockeditor-api">
                <BlockEditorComponent ref={apiBlockEditor} id='api-blockeditor' blocks={data["blockDataAPI"]} focus={focus} height="600px"></BlockEditorComponent>
            </div> 
        </div>
        <div className="col-lg-4 property-section">
            <div id="property" title="Properties" className='property-panel-table'>
                <table id="property" title="Properties">
                    <tbody>
                        <tr>
                            <td>
                                <div>ReadOnly </div>
                            </td>
                            <td>
                                <div style={{ paddingTop: "0", paddingLeft: "0" }}>
                                  <CheckBoxComponent id='readonly' checked={false} change={readOnlyChange} aria-label="Readonly"></CheckBoxComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Drag and Drop </div>
                            </td>
                            <td>
                                <div style={{paddingTop: "0", paddingLeft: "0"}}>
                                   <CheckBoxComponent id='enableDragDrop' checked={true} change={enableDragDropChange} aria-label="Enable Drag and Drop"></CheckBoxComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                    <td>
                        <div>Get Data</div>
                    </td>
                    <td>
                        <div className='e-btn-group' style={{paddingTop: "0", paddingLeft: "0",margin: "10px 0 0 10px"}}>
                            <button className="e-btn" id="getJson">JSON</button>
                            <button className="e-btn" id="getHtml">HTML</button>
                        </div>
                    </td>
                </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    <button id="getBlockCount" className="btn btn-default">Get Block Count</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    <button id="selectall" className="btn btn-default">Select All Blocks</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    <button id="print" className="btn btn-default">Print</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="action-description">
        <p>This sample demonstrates the usage of API in Block Editor. Use the properties panel to change read-only mode,
            enable/disable drag and drop, get JSON data, get HTML data, get block count and select all blocks</p>
        </div>
        <div id="description">
            <p>In this demo, you can explore the API behaviors by:</p>
            <ul>
                <li>Click the <code>readOnly</code> checkbox to enable/disable editable and non-editable mode of the Block Editor.</li>
                <li>Click the <code>enableDragDrop</code> checkbox to enable/disable drag and drop functionality.</li>
                <li>Use the grouped buttons:
                <ul>
                    <li><code>JSON</code>: Shows the editor’s data as JSON in a predefined dialog.</li>
                    <li><code>HTML</code>: Shows the editor’s HTML output as text in a predefined dialog.</li>
                </ul>
                </li>
                <li>Click the <code>getBlockCount</code> button to display the total number of blocks in an predefined dialog.</li>
                <li>Click the <code>selectAllBlocks</code> button to select all content in the editor.</li>
                <li>Click the <code>print</code> button to preview the content before printing from the editor.</li>
            </ul>
        </div>
    </div>
  );
}

export default API;