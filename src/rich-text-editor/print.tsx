/**
 * RichTextEditor print sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import './print.css';

export class Print extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    // set the value to RichTextEditor
    private template: string = `<p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. 
    Users can format their content using standard toolbar commands.</p>

    <p><b>Key features:</b></p>
                    
    <ul><li><p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p></li>
    <li><p>Capable of handling markdown editing.</p></li>
    <li><p>Contains a modular library to load the necessary functionality on demand.</p></li>
    <li><p>Provides a fully customizable toolbar.</p></li>
    <li><p>Provides HTML view to edit the source directly for developers.</p></li>
    <li><p>Supports third-party library integration.</p></li>
    <li><p>Allows preview of modified content before saving it.</p></li>
    <li><p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p></li>
    <li><p>Contains undo/redo manager.</p></li>
    <li><p>Creates bulleted and numbered lists.</p></li>
    </ul>`;

    // RichTextEditor items list
    private items: string[] = ['Bold',  'Italic',  'Underline',  '|',  'Formats',  'Alignments',
    'OrderedList',  'UnorderedList',  '|',  'CreateLink',  'Image',  '|',  'SourceCode',  'Undo',  'Redo', 'Print'];

    //RichTextEditor ToolbarSettings
    private toolbarSettings: object = {
        items: this.items
    };

    render() {
        return (
            <div id="dropdowndefault" className='control-pane'>
                <div className='control-section' id="rtePrint">
                    <div className="content-wrapper">
                            <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                                valueTemplate={this.template} toolbarSettings={this.toolbarSettings} >
                                <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar]} />
                            </RichTextEditorComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to print the content of the rich text editor. Click the print command which placed in toolbar of RTE to print the editor’s content.</p>
                </div>
            </div>
        );
    }
}
