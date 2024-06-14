/**
 * Rich Text Editor print sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './print.css';
function Print() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    // Rich Text Editor items list
    const items: string[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
        'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo', 'Print'];
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    return (
        <div className='control-pane'>
            <div className='control-section' id="rtePrint">
                <div className="content-wrapper">
                    <RichTextEditorComponent id="print" ref={(richtexteditor) => { rteObj = richtexteditor }}
                        toolbarSettings={toolbarSettings} >
                        <p>The Rich Text Editor component is a WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
                            Users can format their content using standard toolbar commands.</p>
                        <p><b>Key features:</b></p>
                        <ul><li><p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p></li>
                            <li><p>Capable of handling markdown editing.</p></li>
                            <li><p>Contains a modular library to load the necessary functionality on demand.</p></li>
                            <li><p>Provides a fully customizable toolbar.</p></li>
                            <li><p>Provides HTML view to edit the source directly for developers.</p></li>
                            <li><p>Supports third-party library integration.</p></li>
                            <li><p>Allows a preview of modified content before saving it.</p></li>
                            <li><p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p></li>
                            <li><p>Contains undo/redo manager.</p></li>
                            <li><p>Creates bulleted and numbered lists.</p></li>
                        </ul>
                        <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to print the content of the Rich Text Editor. Click the print command which placed in toolbar of RTE to print the editor’s content.</p>
            </div>
        </div>
    );
}
export default Print;
