/**
 * Rich Text Editor insert emoticons sample
 */
import { HtmlEditor, Image, Inject, IToolbarItems, Link, NodeSelection, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, EmojiPicker } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './insert-emoticons.css';
function InsertEmoticons() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    let rteSectionEle: HTMLDivElement = null;
    let rteSectionRef: React.Ref<HTMLDivElement> = (element) => {
        rteSectionEle = element;
    }
    
    // Rich Text Editor items list
    const items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'EmojiPicker', '|', 'Undo', 'Redo'
    ];

    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };

    return (
        <div className='control-pane'>
            <div className='control-section e-rte-custom-tbar-section' id="rteCustomTool">
                <div className='rte-control-section' ref={rteSectionRef} id='rteSection'>
                    <RichTextEditorComponent id="EmotionIconstRTE" ref={(scope) => { rteObj = scope }}
                        toolbarSettings={toolbarSettings}>
                            <div style={{display: 'block;' }}><p style={{ marginRight: '10px' }}>An emoji picker in a Rich Text Editor is a tool that allows users to easily add emojis or emoticons to their text. Typically, it is a small window or panel that displays a variety of emojis, arranged in different categories, such as smileys, animals, food, and so on. Users can select the desired emoji by clicking on it or by typing its name in a search bar. </p></div>  
                        <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar, EmojiPicker]} />
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p> This sample demonstrates how to insert an emoji into the content of a Rich Text Editor. First, click the emoji button in the toolbar. This will open the emoji picker popup. Next, click on the desired emoji in the picker to insert it into the editor.
                </p>
            </div>
            <div id="description">
            <p>The <b>Emoji Picker</b> feature allows you to insert an emoji into an editor. The emoji picker has a grid of emojis grouped by categories, such as smileys, animals, food, and travel. You are able to scroll through the emojis and click on one to insert it into the editor.</p>
            <p>In this demo, to enable this feature, configure the <b>EmojiPicker</b> command in the <a target='_blank' href='https://helpej2.syncfusion.com/react/documentation/api/rich-text-editor/toolbarSettingsModel/#items'>toolbarSettings.items</a> property.</p>
            <p>You can also insert an emoji by pressing the colon (:) which will open the emoji picker. Choose an emoji from the picker and insert it into the editor. The feature also provides the option to filter emojis based on the typing character.</p>
            <p><b>Injecting Module</b></p>
            <p>The above features built as modules have to be included in your application. For example, to use image and link, we need to inject <code>HtmlEditor, Toolbar, Link, Image, QuickToolbar, EmojiPicker</code>.</p>
            </div>
        </div>
    );
}
export default InsertEmoticons;
