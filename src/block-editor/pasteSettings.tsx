import * as React from 'react';
import { BlockEditorComponent } from '@syncfusion/ej2-react-blockeditor';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './pasteSettings.css';
import * as data from './blockData.json';

export class PasteSettings extends SampleBase<{}, {}> {
    private blockEditorRef = React.createRef<BlockEditorComponent>();
    private formatOptionRef = React.createRef<DropDownListComponent>();
    private deniedTagsRef = React.createRef<TextBoxComponent>();
    private allowedStylePropertiesRef = React.createRef<TextBoxComponent>();

    private pasteSettings = {
        deniedTags: ['script', 'iframe'],
        plainText: false,
        keepFormat: true,
        allowedStyles: []
    };

    private formatData = [
        { Id: 'plainText', Format: 'Plain Text' },
        { Id: 'keepFormat', Format: 'Keep Format' }
    ];

    private fields = { text: 'Format', value: 'Id' };
    private height = '200px';
    private value = 'keepFormat';

    private formatChange = () => {
        if (!this.blockEditorRef.current) {
            return;
        }
        const newPasteSettings = { ...this.pasteSettings };
        if (this.formatOptionRef.current?.value === 'plainText') {
            newPasteSettings.plainText = true;
            newPasteSettings.keepFormat = false;
        } else if (this.formatOptionRef.current?.value === 'keepFormat') {
            newPasteSettings.plainText = false;
            newPasteSettings.keepFormat = true;
        }
        this.pasteSettings = newPasteSettings;
        this.blockEditorRef.current.dataBind();
    };

    private deniedTagChange = () => {
        if (!this.deniedTagsRef.current?.value) return;
        this.onPasteCleanupSettingsChange(this.deniedTagsRef.current.value, 'deniedTags');
    };

    private allowStyleChange = () => {
        if (!this.allowedStylePropertiesRef.current?.value) return;
        this.onPasteCleanupSettingsChange(this.allowedStylePropertiesRef.current.value, 'allowedStyles');
    };

    private onPasteCleanupSettingsChange = (value: string, settingsProperty: string) => {
        if (!this.blockEditorRef.current) {
            return;
        }
        if (value) {
            const arrayValue = value.split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
            this.pasteSettings[settingsProperty] = arrayValue.filter(prop => prop !== '');
            this.blockEditorRef.current.dataBind();
        }
    };

    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section">
                    <div className="blockeditor-paste">
                        <BlockEditorComponent 
                            ref={this.blockEditorRef} 
                            id='block-editor' 
                            height="600px"
                            blocks={data["blockDataPaste"]} 
                            pasteCleanupSettings={this.pasteSettings}
                        />
                    </div>
                </div>
                <div className="col-lg-4 property-section">
                    <div className="property-panel-header">
                        <div id="property" title="Properties" className="property-panel-table">
                            <table id="property" title="Properties">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>Format Option</div>
                                        </td>
                                        <td>
                                            <div>
                                                <DropDownListComponent 
                                                    id='formatOption' 
                                                    ref={this.formatOptionRef}
                                                    dataSource={this.formatData} 
                                                    change={this.formatChange}
                                                    value={this.value}
                                                    fields={this.fields}
                                                    popupHeight={this.height}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>Denied Tags</div>
                                        </td>
                                        <td>
                                            <div>
                                                <TextBoxComponent 
                                                    ref={this.deniedTagsRef}
                                                    cssClass="e-input"
                                                    placeholder="'img[!href]', 'h1'"
                                                    blur={this.deniedTagChange}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>Allowed Style Properties</div>
                                        </td>
                                        <td>
                                            <div>
                                                <TextBoxComponent 
                                                    ref={this.allowedStylePropertiesRef}
                                                    cssClass="e-input"
                                                    placeholder="'href', 'style'"
                                                    blur={this.allowStyleChange}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates the Block Editor <code>pasteCleanupSettings</code> property allows you to define various options to control how content is pasted into the editor.
                    </p>
                </div>

                <div id="description">
                    <p>The following settings are available to cleanup the content in pasteCleanup settings property:</p>
                    <ul>
                        <li>Select any option in <code>Format Option</code> drop down list for the paste content.</li>
                        <ul>
                            <li>Select the <code>Plain Text</code> option to paste the content as plain text.</li>
                            <li>Select the <code>Keep Format</code> option to keep the same format in the copied content.</li>
                        </ul>
                        <li>Fill the <code>denied tags</code> text box to ignore the tags when pasting HTML content.</li>
                        <ul>
                            <li><code>['a[!href]']</code> - paste the content by filtering anchor tags that don’t have the 'href' attribute.</li>
                            <li><code>['a[href, target]']</code> - paste the content by filtering anchor tags that have the 'href' and 'target' attributes</li>
                        </ul>
                        <li>Fill the <code>allowed style</code> properties to paste the content by accepting these style attributes and removing other attributes. For example:</li>
                        <ul>
                            <li><code>['color', 'margin']</code> - This will allow only the style properties 'color' and 'margin' in each pasted element.</li>
                        </ul>
                    </ul>
                </div>
            </div>
        );
    }
}