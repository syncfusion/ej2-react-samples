/*
* Rich Text Editor Insert Media sample
*/
import * as React from 'react';
import { RichTextEditorComponent, Toolbar, Inject, Image, Table, Link, HtmlEditor, QuickToolbar, ToolbarSettingsModel, Audio, Video } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import './insert-media.css';
// Rich Text Editor items list
export class InsertMedia extends SampleBase<{}, {}> {
    private rteObj: RichTextEditorComponent;
     // Rich Text Editor items list
    private items: string[] =  ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'Audio', 'Video', '|', 'SourceCode', 'Undo', 'Redo'];
      //Rich Text Editor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };
    render() {
        return(
            <div className='control-pane'>
                <div className='control-section' id="insertMediaRTE">
                    <div className="content-wrapper">
                        <RichTextEditorComponent id="insertMedia" ref={(richtexteditor) => { this.rteObj = richtexteditor; }} toolbarSettings={this.toolbarSettings}>
                        
                        <p>Rich Text Editor allows inserting video and audio from online sources and the local computers where you want to insert a video and audio into your content.</p>
                            <p><b>Get started with Quick Toolbar to click on a video</b></p>
                            <p>Using the quick toolbar, users can replace, align, display, dimension, and delete the selected video.</p>
                            <p><video controls>
                                <source
                                src="https://www.w3schools.com/tags/movie.mp4"
                                type="video/mp4" />
                            </video></p>   
                            <p><b>Get started with Quick Toolbar to click on an audio</b></p>
                            <p>Using the quick toolbar, users can replace, display, and delete the selected audio.</p>
                            <p><audio controls><source src="https://assets.mixkit.co/sfx/preview/mixkit-rain-and-thunder-storm-2390.mp3" type="audio/mp3" /></audio></p>
                            <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar, Audio, Video]}/>
                        </RichTextEditorComponent>
                    </div>
                </div> 
                <div id="action-description">
                    <p>This sample demonstrates the option to insert the media into the Rich Text Editor content. Click the audio and video button from the toolbar item to insert the media.</p>
                </div>
                <div id="description">
                    <p>Video tools are used to insert a video into the Rich Text Editor and click on the video to customize the video using a quick toolbar. The quick toolbar has the following items:</p>
                    <ul>
                        <li><code>Replace</code> – can replace the video with some other video.</li>
                        <li><code>Align</code> – Align the video with left, right, and justify.</li>
                        <li><code>Delete</code> – delete the video.</li>
                        <li><code>LayoutOption</code> - display the video as inline or with a break.</li>
                        <li><code>Resize</code> – can resize the video dimension with resize options.</li>
                    </ul>
                    <p>Audio tools are used to insert audio to the Rich Text Editor and click on the audio to customize the audio using a quick toolbar easily. The quick toolbar has the following items:</p>
                    <ul>
                        <li><code>Replace</code> – can replace the audio with some other audio.</li>
                        <li><code>Delete</code> – delete the audio.</li>
                        <li><code>Display</code> - display the audio as inline or with a break.</li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>Rich Text Editor features are segregated into individual feature-wise modules. To use the audio and video tool, we need to inject the audio and video module using the <code>RichTextEditor.Inject(Audio, Video)</code>.</p>
                    <p><b>Note:</b> For security reasons, the embed video URL is restricted in this demo. If you want to insert an embed URL video, set the <code>enableHtmlSanitizer</code> to false in your application.</p>
                </div>
            </div>    
        ); 
    }
}
