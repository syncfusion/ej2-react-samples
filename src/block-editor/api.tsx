import * as React from 'react';
import { BlockEditorComponent, FocusEventArgs } from '@syncfusion/ej2-react-blockeditor';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import {DialogUtility} from '@syncfusion/ej2-react-popups';
import './api.css';
import * as data from './blockData.json';
import { SampleBase } from '../common/sample-base';

export class API extends SampleBase<{}, {}> {
  apiBlockEditor: BlockEditorComponent;
  id: string;

  readOnlyChange = (args: ChangeEventArgs) => {
    this.apiBlockEditor.readOnly = args.checked;
  };

  enableDragDropChange = (args: ChangeEventArgs) => {
    this.apiBlockEditor.enableDragAndDrop = args.checked;
  };

  focus = (args: FocusEventArgs) => {
    this.id = args.blockId;
  };
  
  componentDidMount = () => {
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

    document.getElementById("getJson")?.addEventListener("click", () => {
      const jsonData = this.apiBlockEditor.getDataAsJson();
      openDialog('JSON Data', JSON.stringify(jsonData, null, 2));
    });

    document.getElementById('getHtml')?.addEventListener("click", () => {
        const htmlData = this.apiBlockEditor.getDataAsHtml();
        openDialog('Editor HTML', htmlData, true);
    });

    // Repeat for other buttons
    document.getElementById("getBlockCount")?.addEventListener("click", () => {
      const blockCount = this.apiBlockEditor.getBlockCount();
      let dialog = DialogUtility.alert({
          title: "Block Count",
        content: `<div>Total blocks: <b>${blockCount}</b></div>`,
        okButton: { text: 'OK', click: () => dialog.close() },
        isModal: true,
        position: { X: 'center', Y: 'center' },
        width: "250px",
        closeOnEscape: true
      });
    });
    document.getElementById("selectall")?.addEventListener("click", () => {
      this.apiBlockEditor.selectAllBlocks();
    });

    document.getElementById("print")?.addEventListener("click", () => {
      this.apiBlockEditor.print();
    });
  };
  render() {
    return (
      <div className='control-pane'>
        <div className="col-lg-8 control-section">
            <div className="blockeditor-api">
            <BlockEditorComponent ref={blockEditor => (this.apiBlockEditor = blockEditor)} id='api-blockeditor' blocks={data["blockDataAPI"]} focus={this.focus.bind(this)} height="600px"></BlockEditorComponent>
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
                                  <CheckBoxComponent id='readonly' checked={false} change={this.readOnlyChange.bind(this)} aria-label="Readonly"></CheckBoxComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Drag and Drop </div>
                            </td>
                            <td>
                                <div style={{paddingTop: "0", paddingLeft: "0"}}>
                                   <CheckBoxComponent id='enableDragDrop' checked={true} change={this.enableDragDropChange.bind(this)} aria-label="Enable Drag and Drop"></CheckBoxComponent>
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
      )
    }
}