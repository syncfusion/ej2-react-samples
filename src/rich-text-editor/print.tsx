/**
 * Rich Text Editor print sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, PasteCleanup, Table, Video, Audio} from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './print.css';

export class Print extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    // Rich Text Editor items list
    private items: string[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
        'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo', 'Print'];

    //Rich Text Editor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id="rtePrint">
                    <div className="content-wrapper">
                        <RichTextEditorComponent id="print" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                            toolbarSettings={this.toolbarSettings} >
                                <h2>The Greatest Lessons from Nature</h2><p>Nature is a powerful teacher, offering timeless wisdom through its beauty, resilience, and harmony. Here are three of the most important lessons we can learn from nature:</p><p><strong>Adaptability &amp; Resilience</strong> 🌿<br/></p><p>Nature is constantly changing and evolving. Trees withstand storms, rivers carve through rocks, and animals adapt to new environments. Similarly, life challenges us, and, like nature, we must be flexible and resilient in order to overcome obstacles.</p><p><strong>Patience &amp; Growth</strong> 🌱</p><p>A seed does not become a tree overnight. Growth takes time, whether in nature or in our personal and professional lives. Success, wisdom, and strength develop through persistence, effort, and patience.</p><p><strong>Balance &amp; Harmony</strong> 🌎</p><p>Nature maintains a delicate balance throughout the day and night, across the seasons, and within ecosystems. It teaches us the importance of balance in our own lives between work and rest, giving and receiving, and action and reflection.</p><p><br/></p><p style={{textAlign: 'center'}}><em>“Look deep into nature, and then you will understand everything better.” <strong>– Albert Einstein</strong></em></p>
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
}
