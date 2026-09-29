import * as React from 'react';
import {
    RichTextEditorUIComponent,
    Inject,
    SlashCommand
} from '@syncfusion/ej2-react-richtexteditor-ui';
import { SampleBase } from '../common/sample-base';
import { FULL_FEATURED_CONTENT } from './full-featured-editing-content';

export class FullFeaturedEditing extends SampleBase<{}, {}>{
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <RichTextEditorUIComponent
                        value={FULL_FEATURED_CONTENT}
                        placeholder='Type something...'
                        slashCommandSettings={{
                            enable: true
                        }}
                        toolbarSettings={{
                            items: [
                                'Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'InlineCode', '|', 'Link', 'Image', 'Table', 'CodeBlock', 'HorizontalLine', 'Quote', '|', 'Formats', 'Alignment', 'Callout', '|', 'BulletFormatList', 'NumberFormatList', 'Checklist', '|', 'Outdent', 'Indent', '|', 'FontColor', 'BackgroundColor', 'FontName', 'FontSize', '|', 'LowerCase', 'UpperCase', '|', 'Superscript', 'Subscript', '|', 'ClearFormat'
                            ]
                        }}
                        quickToolbarSettings={{
                            text: ['Bold', 'Italic', 'Underline', 'Strikethrough', 'BackgroundColor', 'FontColor', '|', 'Formats', '|', 'Link', 'Table', 'Image', 'ClearFormat']
                        }}
                    >
                        <Inject services={[SlashCommand]} />
                    </RichTextEditorUIComponent>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates the rich text editing and formatting
                        features of the Rich Text Editor UI component with a
                        comprehensive toolbar and Slash Command support.
                    </p>
                </div>

                <div id="description">
                    <p>
                        This sample demonstrates the Rich Text Editor UI component
                        with a comprehensive set of editing, formatting, and content
                        insertion features. The following configurations are used:
                    </p>

                    <ul>
                        <li>
                            <code>toolbarSettings.items</code> - Configures the
                            toolbar with text formatting, font styling, lists,
                            alignment, indentation, content insertion, and editing
                            tools.
                        </li>
                        <li>
                            <code>slashCommandSettings.enable</code> - Enables Slash
                            Command support, allowing users to access editor commands
                            by typing <code>/</code> within the editor.
                        </li>
                        <li>
                            <code>quickToolbarSettings.text</code> - Configures the
                            inline quick toolbar that appears when text is selected,
                            providing quick access to formatting and content
                            insertion tools.
                        </li>
                        <li>
                            <code>value</code> - Sets the initial content of the
                            Rich Text Editor.
                        </li>
                        <li>
                            <code>placeholder</code> - Displays placeholder text
                            when the editor does not contain any content.
                        </li>
                    </ul>

                    <p>The configured toolbar provides the following editing capabilities:</p>

                    <ul>
                        <li>
                            <code>Text Formatting</code> - Applies Bold, Italic,
                            Underline, Strikethrough, Inline Code, Subscript, and
                            Superscript formatting.
                        </li>
                        <li>
                            <code>Font</code> - Provides font family, font size,
                            font color, and background color options.
                        </li>
                        <li>
                            <code>Lists</code> - Provides bulleted, numbered, and
                            checklist list options.
                        </li>
                        <li>
                            <code>Content Insertion</code> - Allows users to insert
                            links, images, tables, callouts, horizontal lines,
                            quotes, and code blocks.
                        </li>
                        <li>
                            <code>Alignment and Indentation</code> - Provides
                            alignment and indentation options for content.
                        </li>
                        <li>
                            <code>Formats</code> - Applies predefined formats such
                            as paragraphs and headings.
                        </li>
                        <li>
                            <code>Editing</code> - Provides Undo, Redo, and Clear
                            Format operations.
                        </li>
                        <li>
                            <code>Case Conversion</code> - Converts selected text
                            to lowercase or uppercase.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}