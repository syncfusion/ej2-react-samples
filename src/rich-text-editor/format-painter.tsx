import { RichTextEditorComponent, HtmlEditor, Toolbar, FormatPainter, QuickToolbar, Link, Image, Table, ToolbarSettingsModel, Inject } from "@syncfusion/ej2-react-richtexteditor";
import { TextBoxComponent, FocusOutEventArgs } from "@syncfusion/ej2-react-inputs";
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';

export class FormatPainterRTE extends SampleBase<{}, {}> {

    private formatPainterRTE: RichTextEditorComponent;
    private  toolbarSettings: ToolbarSettingsModel = {
        items: ['FormatPainter', 'Bold', 'Italic', 'Underline', 'StrikeThrough',
            'SuperScript', 'SubScript', '|', 'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'SourceCode', 'Undo', 'Redo']
    };
    private setAllowedFormats (e: FocusOutEventArgs): void  {
        this.formatPainterRTE.formatPainterSettings.allowedFormats = e.value;
    }
    private setdeniedFormats (e: FocusOutEventArgs): void  {
        this.formatPainterRTE.formatPainterSettings.deniedFormats = e.value;
    }
    render() {
        return (
            <div className='control-pane'>
            <div className='col-lg-8'>
                <div className='control-section' id="rteAPI">
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="formatPainterRTE" ref={(richtexteditor) => { this.formatPainterRTE = richtexteditor }}
                            toolbarSettings={this.toolbarSettings}>
                                <h3>Format Painter</h3>
                                <p>A Format Painter is a Rich Text Editor feature allowing users to quickly{' '}
                                    <span style={{backgroundColor: 'rgb(198, 140, 83)'}}><strong>copy</strong></span>{' '}
                                    and{' '} 
                                    <span style={{backgroundColor: 'rgb(198, 140, 83)'}}><strong>paste</strong></span>{' '}
                                    formatting from one text to another. With a rich text editor, utilize the format painter as follows:
                                </p>
                                <ul>
                                    <li>
                                        Select the text whose format you want to copy.
                                    </li>
                                    <li>
                                        Click on the <strong><em>Format Painter</em></strong> button in the toolbar. It may look like a paintbrush icon.
                                    </li>
                                    <li>
                                        The cursor will change to a <strong>paintbrush</strong> icon. Click and drag the cursor over the text you want to apply the copied format.
                                    </li>
                                    <li>
                                        Release the mouse button to apply the format.
                                    </li>
                                </ul>
                                <p>
                                    Using the format painter in a rich text editor can save you time when formatting a large document, You can quickly 
                                    copy and apply formatting
                                    to <span style={{backgroundColor: 'rgb(198, 140, 83)'}}><strong>multiple sections</strong></span>. 
                                    It's a helpful tool for anyone who works with text editing regularly, such as writers, editors, and content creators.
                                </p>
                            <Inject services={[HtmlEditor, Toolbar, FormatPainter, QuickToolbar, Image, Link, Table]} />
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
                                        blur={this.setAllowedFormats}>
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
                                        blur={this.setdeniedFormats}>
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
                    <ul>
                        <li>
                            <code>span; strong; em; </code> as the input allows only the span, strong, and em format styles to be copied.
                        </li>
                    </ul>
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
                <code>[HtmlEditor, Toolbar, FormatPainter, QuickToolbar, Image, Link, Table]</code>
            </p>
            </div>
        </div>
        );
    }
};