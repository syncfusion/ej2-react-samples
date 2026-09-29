import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Count, Image, Link, QuickToolbar, ToolbarSettingsModel, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-react-richtexteditor';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './form-validation.css';

export class FormValidation extends SampleBase<{}, { validationMessage: string }> {

    private rteObj: RichTextEditorComponent;
    private validationEle: HTMLDivElement | null;
    private validationRef: React.Ref<HTMLDivElement>;
    private minCharacters: number = 20;

    private toolbarSettings: ToolbarSettingsModel = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', '|', 'BlockQuote', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'SourceCode', '|', 'Undo', 'Redo']
    };

    constructor(props) {
        super(props);
        this.state = {
            validationMessage: ''
        };
        this.validationRef = element => {
            this.validationEle = element;
        };
    }

    private onSubmit = (): void => {
        const editPanel: HTMLElement = this.rteObj.contentModule.getEditPanel() as HTMLElement;
        const plainText: string = editPanel.innerText.trim();
        
        if (plainText.length < this.minCharacters) {
            this.setState({
                validationMessage: 'Please enter at least 20 characters'
            });
        } else {
            this.setState({
                validationMessage: ''
            });
            alert('Form submitted successfully');
        }
    }

    private onReset = (): void => {
        this.rteObj.value = '';
        this.setState({
            validationMessage: ''
        });
        this.rteObj.dataBind();
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id="rteFormValidation">
                    <div className='content-wrapper'>
                    <div className='rte-control-section'>
                        <RichTextEditorComponent 
                            id="formValidationRTE" 
                            ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                            showCharCount={true}
                            toolbarSettings={this.toolbarSettings}
                            placeholder="Type something"
                            maxLength={100}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Count, Image, Link, QuickToolbar, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat]} />
                        </RichTextEditorComponent>
                        <div className='validation-message' ref={this.validationRef}>
                            {this.state.validationMessage}
                        </div>
                        <div className='button-container'>
                            <ButtonComponent onClick={this.onSubmit} cssClass='e-primary'>
                                Submit
                            </ButtonComponent>
                            <ButtonComponent onClick={this.onReset}>
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
}
