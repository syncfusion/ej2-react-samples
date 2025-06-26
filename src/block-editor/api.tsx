import * as React from 'react';
import { BlockEditorComponent, FocusEventArgs } from '@syncfusion/ej2-react-blockeditor';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import './api.css';
import * as data from './blockData.json';
import { SampleBase } from '../common/sample-base';

export class API extends SampleBase<{}, {}> {
  apiBlockEditor: BlockEditorComponent;
  focusedBlock: string;

  readOnlyChange = (args: ChangeEventArgs) => {
    this.apiBlockEditor.readOnly = args.checked;
  };

  enableDragDropChange = (args: ChangeEventArgs) => {
    this.apiBlockEditor.enableDragAndDrop = args.checked;
  };

  focus = (args: FocusEventArgs) => {
    this.focusedBlock = args.blockId;
  };
  
  componentDidMount = () => {
    document.getElementById("getJson")?.addEventListener("click", () => {
      const jsonData = this.apiBlockEditor.getDataAsJson(this.focusedBlock);
      alert(JSON.stringify(jsonData, null, 2));
    });

    document.getElementById('getHtml')?.addEventListener("click", () => {
        const htmlData = this.apiBlockEditor.getDataAsHtml();
        alert(htmlData);
    });

    // Repeat for other buttons
    document.getElementById("getBlockCount")?.addEventListener("click", () => {
      alert('Total blocks: ' + this.apiBlockEditor.getBlockCount());
    });

    document.getElementById("selectall")?.addEventListener("click", () => {
      this.apiBlockEditor.selectAllBlocks();
    });

    document.getElementById("focusIn")?.addEventListener("click", () => {
      this.apiBlockEditor.focusIn();
    });

    document.getElementById("focusOut")?.addEventListener("click", () => {
      this.apiBlockEditor.focusOut();
    });

    document.getElementById("print")?.addEventListener("click", () => {
      this.apiBlockEditor.print();
    });
  };
  render() {
    return (
      <div className='control-section'>
        <div className="col-lg-8 control-section">
            <div className="control-wrapper">
                <div className="sample-container">
                    <div className="default-section">
                          <BlockEditorComponent ref={blockEditor => (this.apiBlockEditor = blockEditor)} id='api-blockeditor' blocks={data["blockDataAPI"]} focus={this.focus.bind(this)}></BlockEditorComponent>
                    </div>
                </div>
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
                                <div>Enable Drag and Drop </div>
                            </td>
                            <td>
                                <div style={{paddingTop: "0", paddingLeft: "0"}}>
                                   <CheckBoxComponent id='enableDragDrop' checked={true} change={this.enableDragDropChange.bind(this)} aria-label="Enable Drag and Drop"></CheckBoxComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    <button id="getJson" className="btn btn-default">Get JSON Data</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    <button id="getHtml" className="btn btn-default">Get HTML Data</button>
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
                                    <button id="focusIn" className="btn btn-default">Focus In</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div>
                                    <button id="focusOut" className="btn btn-default">Focus Out</button>
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
            <p>This sample demonstrates the usage of API in Block Editor. Use the properties panel to change read-only mode, enable/disable drag and drop, enable HTML encode, get JSON data, get block count, select all blocks, and control focus.</p>
        </div>
        <div id="description">
            <p>In this demo, you can explore the API behaviors by:</p>
            <ul>
                <li>Click the <code>readOnly</code> checkbox to enable/disable editable and non-editable mode of the Block Editor.</li>
                <li>Click the <code>enableDragDrop</code> checkbox to enable/disable drag and drop functionality.</li>
                <li>Click the <code>getJsonData</code> button to display the focused block JSON data in an alert window.</li>
                <li>Click the <code>getHtmlData</code> button to display the editor content as HTML in an alert window.</li>
                <li>Click the <code>getBlockCount</code> button to display the total number of blocks in an alert window.</li>
                <li>Click the <code>selectAllBlocks</code> button to select all content in the editor.</li>
                <li>Click the <code>focusIn</code> button to focus the editor.</li>
                <li>Click the <code>focusOut</code> button to remove focus from the editor.</li>
                <li>Click the <code>print</code> button to preview the content before printing from the editor.</li>
            </ul>
        </div>
      </div>
      )
    }
}