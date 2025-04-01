import { RichTextEditorComponent, HtmlEditor, Toolbar, FormatPainter, QuickToolbar, Link, Image, Table, Audio, Video, ToolbarSettingsModel, Inject, PasteCleanup} from "@syncfusion/ej2-react-richtexteditor";
import { TextBoxComponent, FocusOutEventArgs } from "@syncfusion/ej2-react-inputs";
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';

function FormatPainterRTE(){
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let formatPainterRTE: RichTextEditorComponent;
    const toolbarSettings: ToolbarSettingsModel = {
        items: ['FormatPainter', 'Bold', 'Italic', 'Underline', 'StrikeThrough',
            'SuperScript', 'SubScript', '|', 'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'SourceCode', 'Undo', 'Redo']
    }
    function setAllowedFormats (e: FocusOutEventArgs): void  {
        formatPainterRTE.formatPainterSettings.allowedFormats = e.value;
    }
    function setdeniedFormats (e: FocusOutEventArgs): void  {
        formatPainterRTE.formatPainterSettings.deniedFormats = e.value;
    }
    return (
        <div className='control-pane'>
            <div className='col-lg-8'>
                <div className='control-section' id="rteAPI">
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="formatPainterRTE" ref={(richtexteditor) => { formatPainterRTE = richtexteditor }}
                            toolbarSettings={toolbarSettings}>
                            <h3>Format Painter in Rich Text Editor</h3><p>The <strong data-start="50" data-end="68">Format Painter</strong> allows you to quickly copy and apply text formatting within the editor, saving time and ensuring consistency.</p><h5>How to Use Format Painter?</h5><ul><li><strong>Select the text</strong> with the formatting you want to copy.</li><li>Click the <strong>Format Painter</strong> button (paintbrush icon) in the toolbar.</li><li>The cursor changes to a <strong>paintbrush</strong> icon.</li><li><strong>Click and drag</strong> over the text where you want to apply the copied format.</li><li>Release the mouse button, and the formatting will be applied.</li></ul><h5>Why Use Format Painter?</h5><ul><li><strong>Saves time</strong> when formatting large documents.</li><li><strong>Ensures consistency</strong> in text styles. </li><li><strong>Easy to use</strong> for writers, editors, and content creators.</li></ul>
                            <Inject services={[HtmlEditor, Toolbar, FormatPainter, QuickToolbar, Image, Link, Table, PasteCleanup, Audio, Video]} />
                        </RichTextEditorComponent>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 property-section' id="rteAPIProperty">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className="pasteStyle" style={{ width: '100%', margin: '10px' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Allowed Formats</div>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <TextBoxComponent id="allowedFormatInput" cssClass="e-outline" floatLabelType= 'Never'  
                                        placeholder= 'span; strong; em; sup, sub; code;'
                                        blur={setAllowedFormats}>
                                        </TextBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Denied Formats</div>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <TextBoxComponent id="deniedFormatInput" cssClass="e-outline" floatLabelType= 'Never'  
                                        placeholder= "span(important)[title]{background-color,color};"
                                        blur={setdeniedFormats}>
                                        </TextBoxComponent>                                
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This demo demonstrates the Format Painter feature of the Rich Text Editor component. With Format Painter, copy and apply styles from one content to another.</p>
            </div>
            <div id="description">
            <p>The <b>Format Painter</b> feature allows you to copy the formats and apply them to content that has no formatting thus saving the time to reformat the content.</p>
            <ul>
                <li>
                    Format painter can be accessed via the toolbar or the keyboard shortcuts.
                </li>
                <li>
                    The sticky mode can be enabled by double-clicking the toolbar button, and it can be utilized to apply a format to multiple locations.            
                </li>
            </ul>
            <p><b>Keyboard Shortcut:</b></p>
            <ul>
                <li>
                    <kbd>ALT + SHIFT + C</kbd> - Copy the selection format or current range.
                </li>
                <li>
                    <kbd>ALT + SHIFT + V</kbd> - Paint the copied format.
                </li>
                <li>
                    <kbd>ESC</kbd> - Remove the previously copied format and disable the sticky mode.
                </li>
            </ul>
            <p>The following settings are available to customize the format painter in the <code>formatPainterSettings</code> property.</p>
            <ul>
                <li><p>Fill the <code>Allowed Formats</code> input with selectors only whose format styles will be allowed. For example: </p></li>
                        <li>
                            <code>span; strong; em; </code> as the input allows only the span, strong, and em format styles to be copied.
                        </li>
                    <li><p>Fill the <code>Denied Formats</code> input with selectors only whose format styles will be explicitly prohibited. For example:</p>
                    <ul>
                        <li>
                            <code>span(important)[title]{'{'}background-color,color{'}'}</code> as the input will remove only the <code>important</code> class, 
                            <code>title</code> attribute, <code>color</code> and <code>background-color</code>
                            of the span element. All other format styles will be copied. 
                        </li>
                    </ul>
                </li>
            </ul>
            <p><b>Injecting Modules:</b></p>
            <p>The Format Painter feature is segregated as an individual module. To use the format painter you can import and then inject it into the RichTextEditor.</p>
            <p>
                To use Rich Text Editor feature, we need to inject  <code>'FormatPainter'</code> module using inject component and then adding the modules in the services prop. 
                <code>[HtmlEditor, Toolbar, FormatPainter, QuickToolbar, Image, Link, Table, Audio, Video, PasteCleanup]</code>
            </p>
            </div>
        </div>
    )
}

export default FormatPainterRTE;
	