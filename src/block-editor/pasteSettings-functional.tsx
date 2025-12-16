import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BlockEditorComponent } from '@syncfusion/ej2-react-blockeditor';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import './pasteSettings.css';
import * as data from './blockData.json';

const PasteSettings = () => {
    const blockEditorRef = useRef(null);
    const formatOptionRef = useRef(null);
    const deniedTagsRef = useRef(null);
    const allowedStylePropertiesRef = useRef(null);

    const [pasteSettings, setPasteSettings] = useState({
        deniedTags: ['script', 'iframe'],
        plainText: false,
        keepFormat: true,
        allowedStyles: []
    });

    const formatData = [
        { Id: 'plainText', Format: 'Plain Text' },
        { Id: 'keepFormat', Format: 'Keep Format' }
    ];

    const fields = { text: 'Format', value: 'Id' };
    const height = '200px';
    const [value, setValue] = useState('keepFormat');

    useEffect(() => {
        updateSampleSection();
    }, []);

    const formatChange = () => {
        if (!blockEditorRef.current) {
            return;
        }
        const newPasteSettings = { ...pasteSettings };
        if (formatOptionRef.current.value === 'plainText') {
            newPasteSettings.plainText = true;
            newPasteSettings.keepFormat = false;
        } else if (formatOptionRef.current.value === 'keepFormat') {
            newPasteSettings.plainText = false;
            newPasteSettings.keepFormat = true;
        }
        setPasteSettings(newPasteSettings);
        blockEditorRef.current.dataBind();
    };

    const deniedTagChange = () => {
        if (!deniedTagsRef.current?.value) return;
        onPasteCleanupSettingsChange(deniedTagsRef.current.value, 'deniedTags');
    };

    const allowStyleChange = () => {
        if (!allowedStylePropertiesRef.current?.value) return;
        onPasteCleanupSettingsChange(allowedStylePropertiesRef.current.value, 'allowedStyles');
    };

    const onPasteCleanupSettingsChange = (value, settingsProperty) => {
        if (!blockEditorRef.current) {
            return;
        }
        if (value) {
            const arrayValue = value.split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
            const newPasteSettings = { 
                ...pasteSettings, 
                [settingsProperty]: arrayValue.filter(prop => prop !== '')
            };
            setPasteSettings(newPasteSettings);
            blockEditorRef.current.dataBind();
        }
    };

    return (
        <div className='control-pane'>
            <div className="col-lg-8 control-section">
                <div className="blockeditor-paste">
                    <div id='paste-blockeditor'></div>
                    <BlockEditorComponent 
                        ref={blockEditorRef} 
                        id='block-editor' 
                        height="600px"
                        blocks={data["blockDataPaste"]} 
                        pasteCleanupSettings={pasteSettings}
                    />
                </div>
            </div>
            <div className="col-lg-4 property-section">
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
                                                ref={formatOptionRef}
                                                dataSource={formatData} 
                                                change={formatChange}
                                                value={value}
                                                fields={fields}
                                                popupHeight={height}
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
                                                ref={deniedTagsRef}
                                                cssClass="e-input"
                                                placeholder="'img[!href]', 'h1'"
                                                blur={deniedTagChange}
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
                                                ref={allowedStylePropertiesRef}
                                                cssClass="e-input"
                                                placeholder="'href', 'style'"
                                                blur={allowStyleChange}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
};

export default PasteSettings;