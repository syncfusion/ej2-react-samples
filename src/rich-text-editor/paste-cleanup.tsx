/**
 * Rich Text Editor Paste Cleanup sample
 */
import { DropDownListComponent, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { HtmlEditor, Image, Inject, Link, PasteCleanup, PasteCleanupSettingsModel, QuickToolbar, RichTextEditorComponent, Toolbar, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import './paste-cleanup.css';

export class PasteCleanupRTE extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;
    private formatOption: DropDownListComponent;
    private pasteCleanupSettings: PasteCleanupSettingsModel = {
        prompt: true,
        plainText: false,
        keepFormat: false
    };
    private allowedStylePropertiesEle: HTMLInputElement;
    private allowedStylePropertiesRef: React.Ref<HTMLInputElement>;
    private deniedTagsEle: HTMLInputElement;
    private deniedTagsRef: React.Ref<HTMLInputElement>;
    private deniedAttributesEle: HTMLInputElement;
    private deniedAttributesRef: React.Ref<HTMLInputElement>;

    constructor(props) {
        super(props);
        this.allowedStylePropertiesEle = null;
        this.allowedStylePropertiesRef = element => {
            this.allowedStylePropertiesEle = element;
        };
        this.deniedTagsEle = null;
        this.deniedTagsRef = element => {
            this.deniedTagsEle = element;
        };
        this.deniedAttributesEle = null;
        this.deniedAttributesRef = element => {
            this.deniedAttributesEle = element;
        };
    }

    private popupHeight: string = '200px';
    private value: string = "prompt";
    private fields: FieldSettingsModel = { text: "text", value: "value" };
    private formatData: { [key: string]: Object }[] = [
        { text: 'Prompt', value: 'prompt' },
        { text: 'Plain Text', value: 'plainText' },
        { text: 'Keep Format', value: 'keepFormat' },
        { text: 'Clean Format', value: 'cleanFormat' }
    ];

    private formatChange = (): void => {
        if (this.formatOption.value === 'prompt') {
            this.rteObj.pasteCleanupSettings.prompt = true;
        } else if (this.formatOption.value === 'plainText') {
            this.rteObj.pasteCleanupSettings.prompt = false;
            this.rteObj.pasteCleanupSettings.plainText = true;
        } else if (this.formatOption.value === 'keepFormat') {
            this.rteObj.pasteCleanupSettings.prompt = false;
            this.rteObj.pasteCleanupSettings.plainText = false;
            this.rteObj.pasteCleanupSettings.keepFormat = true;
        } else if (this.formatOption.value === 'cleanFormat') {
            this.rteObj.pasteCleanupSettings.prompt = false;
            this.rteObj.pasteCleanupSettings.plainText = false;
            this.rteObj.pasteCleanupSettings.keepFormat = false;
        }
    }

    public rendereComplete(): void {

        let allowedStylePropsElem: HTMLElement = this.allowedStylePropertiesEle;
        let deniedTagsElem: HTMLElement = this.deniedTagsEle;
        let deniedAttrsElem: HTMLElement = this.deniedAttributesEle;
        allowedStylePropsElem.addEventListener('blur', (e: FocusEvent) => {
            this.onPasteCleanupSettingsChange((e.target as HTMLInputElement).value, 'allowedStyleProps');
        });
        deniedAttrsElem.addEventListener('blur', (e: FocusEvent) => {
            this.onPasteCleanupSettingsChange((e.target as HTMLInputElement).value, 'deniedAttrs');
        });
        deniedTagsElem.addEventListener('blur', (e: FocusEvent) => {
            this.onPasteCleanupSettingsChange((e.target as HTMLInputElement).value, 'deniedTags');
        });
        
    }

    public onPasteCleanupSettingsChange(value: any, settingsProperty: string): void {
        if (!isNullOrUndefined(value)) {
            const arrayValue = value.split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
            this.rteObj.pasteCleanupSettings[settingsProperty] = arrayValue.filter((prop) => prop !== '');
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-8'>
                    <div className='control-section' id="rteAPI">
                        <div className='rte-control-section'>
                            <RichTextEditorComponent id="PasteCleanup" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                                pasteCleanupSettings={this.pasteCleanupSettings}>
                                <p>Rich Text Editor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting word content as HTML or Markdown format.</p>
                                <p><b>Paste cleanup properties:</b></p>
                                <ul>
                                    <li>
                                        <p>prompt - specifies whether to enable the prompt when pasting in Rich Text Editor.</p>
                                    </li>
                                    <li>
                                        <p>plainText - specifies whether to paste as plain text or not in Rich Text Editor.</p>
                                    </li>
                                    <li>
                                        <p>keepFormat- specifies whether to keep or remove the format when pasting in Rich Text Editor.</p>
                                    </li>
                                    <li>
                                        <p>deniedTags - specifies the tags to restrict when pasting in Rich Text Editor.</p>
                                    </li>
                                    <li>
                                        <p>deniedAttributes - specifies the attributes to restrict when pasting in Rich Text Editor.</p>
                                    </li>
                                    <li>
                                        <p>allowedStyleProperties - specifies the allowed style properties when pasting in Rich Text Editor.</p>
                                    </li>
                                </ul>
                                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
                            </RichTextEditorComponent>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="rteAPIProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="pasteStyle" style={{ width: '100%', margin: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>Prompt </div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <DropDownListComponent id="formattingOption" dataSource={this.formatData} ref={(dropdownlist) => { this.formatOption = dropdownlist }} fields={this.fields} change={this.formatChange.bind(this)} value={this.value} popupHeight={this.popupHeight} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>Denied Tags </div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <input type="text" id="deniedTags" ref={this.deniedTagsRef} className="e-input" placeholder="'img[!href]', 'h1'" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>Denied Attributes </div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <input id="deniedAttributes" ref={this.deniedAttributesRef} type="text" className="e-input" placeholder="'id', 'title'" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>Allowed Style Properties </div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <input id="allowedStyleProperties" ref={this.allowedStylePropertiesRef} type="text" className="e-input" placeholder="'href', 'style'" />
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This example demonstrates the paste cleanup feature of the Rich Text Editor control. Copy your content from MS Word or other website, and paste it within the editor to cleanup.</p>
                </div>

                <div id="description">
                    <p>The Rich Text Editor allows to paste the HTML content from MS Word or other websites. The editor cleanup the pasted HTML content by considering the following items.</p>
                    <ul>
                        <li>The unformatted HTML element (MOS XML format) content to standard HTML elements.</li>
                        <li>The MS Office prefixed style properties is converted to proper CSS style properties.</li>
                        <li>The unwanted tags, CSS styles, and comments are removed from the copied content.</li>
                    </ul>
                    <p>The following settings are available to cleanup the content in pasteCleanup settings property:</p>
                    <ul>
                        <li>Select any option in <code>Format Option</code> drop down list for the paste content.
                            <ul>
                                <li>Select the <code>Prompt</code> option to invoke prompt dialog with paste options on pasting the content in editor.</li>
                                <li>Select the <code>Plain Text</code> option to paste the content as plain text.</li>
                                <li>Select the <code>Keep Format</code> option to keep the same format in the copied content.</li>
                                <li>Select the <code>Clean Format</code> option to remove the style format in the copied content.</li>
                            </ul>
                        </li>
                        <li>Fill the <code>denied tags</code> text box to ignore the tags when pasting HTML content. For example:
                            <ul>
                                <li><code>['a[!href]']</code> - paste the content by filtering anchor tags that don’t have the 'href' attribute.</li>
                                <li><code>['a[href, target]']</code> - paste the content by filtering anchor tags that have the 'href' and 'target' attributes.</li>
                            </ul>
                        </li>
                        <br />
                        <li>Fill the <code>denied attributes</code> to paste the content by filtering out these attributes from the content. For example:
                            <ul>
                                <code>['id', 'title']</code> - This will remove the attributes 'id' and 'title' from all tags.
                            </ul>
                        </li>
                        <br />
                        <li>Fill the <code>allowed style properties</code> to paste the content by accepting these style attributes and removing other attributes. For example:
                            <ul>
                                <code>['color', 'margin']</code> - This will allow only the style properties 'color' and 'margin' in each pasted element.
                            </ul>
                        </li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>The previous features were built as modules to be included in your application. For example, inject the <code>'PasteCleanup'</code> module using <code>Toolbar, Link, Image, QuickToolbar, Count, HtmlEditor, PasteCleanup</code> to use the paste cleanup feature.</p>
                </div>
            </div>
        );
    }
}
