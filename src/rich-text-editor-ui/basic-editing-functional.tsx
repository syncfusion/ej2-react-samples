import * as React from 'react';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { updateSampleSection } from '../common/sample-base';
import { EDITOR_CONTENT } from './basic-editing-content';

function BasicEditing() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <RichTextEditorUIComponent
                    value={EDITOR_CONTENT}
                    placeholder='Type something.'
                    toolbarSettings={{
                        items: [
                            'Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'Subscript', 'Superscript', '|', 'FontColor', 'BackgroundColor',  '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table' , '|', 'NumberedList', 'BulletList', '|', 'Quote', 'ClearFormat'
                        ]
                    }}
                />
            </div>

            <div id="action-description">
                    <p>This sample demonstrates the Rich Text Editor UI component with a basic toolbar configured for essential editing tasks. The toolbar includes essential formatting options such as text styling (bold, italic, underline), text formatting (strikethrough), text formats (headings, paragraphs), text alignment, and rich content insertion (links and images). Additionally, color customization tools for text and background colors are included to provide users with common styling capabilities needed for basic content creation.</p>
                </div>
                <div id="description">
                    <p>This configuration is designed for a lightweight editing experience. It uses the default editor setup so you can
                        create and edit content with standard formatting tools while keeping the integration simple.</p>
                </div>
        </div>
    );
}

export default BasicEditing;