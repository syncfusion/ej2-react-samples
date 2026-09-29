import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Image, Count, Link, QuickToolbar, ToolbarSettingsModel, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-react-richtexteditor';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './form-validation.css';

function FormValidationFunctional () {
    const rteRef = React.useRef<RichTextEditorComponent>(null);
    const [validationMessage, setValidationMessage] = React.useState('');
    const minCharacters = 20;
    
    const toolbarSettings: ToolbarSettingsModel = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', '|', 'BlockQuote', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'SourceCode', '|', 'Undo', 'Redo']
    };

    const onSubmit = (): void => {
        const editPanel: HTMLElement = rteRef.current?.contentModule.getEditPanel() as HTMLElement;
        const plainText: string = editPanel?.innerText.trim() || '';
        
        if (plainText.length < minCharacters) {
            setValidationMessage('Please enter at least 20 characters');
        } else {
            setValidationMessage('');
            alert('Form submitted successfully');
        }
    }

    const onReset = (): void => {
        if (rteRef.current) {
            rteRef.current.value = '';
            rteRef.current.dataBind();
        }
        setValidationMessage('');
    }

    return (
        <div className='control-pane'>
            <div className='control-section' id="rteFormValidation">
                <div className='content-wrapper'>
                <div className='rte-control-section'>
                    <RichTextEditorComponent 
                        id="formValidationRTE" 
                        ref={rteRef}
                        showCharCount={true}
                        toolbarSettings={toolbarSettings}
                        placeholder="Type something"
                        maxLength={100}
                    >
                        <Inject services={[HtmlEditor, Toolbar, Count, Image, Link, QuickToolbar, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat]} />
                    </RichTextEditorComponent>
                    <div className='validation-message'>
                        {validationMessage}
                    </div>
                    <div className='button-container'>
                        <ButtonComponent onClick={onSubmit} cssClass='e-primary'>
                            Submit
                        </ButtonComponent>
                        <ButtonComponent onClick={onReset}>
                            Reset
                        </ButtonComponent>
                    </div>
                </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates form validation with the Rich Text Editor. The editor validates that the content has at least 20 characters before allowing form submission.</p>
            </div>
            <div id="description">
                <p>The Rich Text Editor validates the minimum length of content before submission. The validation message appears below the editor if the content length is less than 20 characters. The Reset button clears both the editor content and validation state.</p>
            </div>
        </div>
    );
}

export default FormValidationFunctional;
