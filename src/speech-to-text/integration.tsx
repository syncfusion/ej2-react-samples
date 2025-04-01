import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SpeechToTextComponent, TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './default.css';
import { SampleBase } from '../common/sample-base';
import { AIAssistViewComponent, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';

export class Default extends SampleBase<{}, {}> {

    public aiAssistViewObj: AIAssistViewComponent;
    public speechToTextObj: SpeechToTextComponent;
    public toastObj: ToastComponent;

    public toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args) => this.toolbarItemClicked(args)
    }

    public bannerTemplate = () => {
        return (<div className="banner-info">
            <div className="e-icons e-listen-icon"></div>
            <h3>Speech To Text</h3>
            <i>Click the below mic-button to convert your voice to text.</i>
        </div>)
    }

    public footerTemplate = () => {
        return (
            <div className="e-footer-wrapper">
                <div id="assistview-footer" className="content-editor" contentEditable="true" placeholder="Click to speak or start typing..." onInput={this.toggleButtons} onKeyDown={this.handleKeyDown}></div>
                <div className="option-container">
                    <SpeechToTextComponent id="speechToText" ref={(speechtotext) => { this.speechToTextObj = speechtotext }} transcriptChanged={this.onTranscriptChange} onStop={this.onListeningStop} created={this.onCreated} onError={this.onErrorHandler} />
                    <ButtonComponent id="assistview-sendButton" className="e-assist-send e-icons" onClick={this.sendIconClicked} />
                </div>
            </div>
        )
    }

    public onPromptRequest = () => {
        const defaultAiassist = this.aiAssistViewObj;
        setTimeout(() => {
            defaultAiassist.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service.');
            this.toggleButtons();
        }, 2000);
    };

    public toolbarItemClicked = (args) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            this.aiAssistViewObj.prompts = [];
        }
    }

    public sendIconClicked = () => {
        const assistviewFooter = document.getElementById('assistview-footer');
        this.aiAssistViewObj.executePrompt(assistviewFooter.innerText);
        assistviewFooter.innerText = "";
    };

    public onTranscriptChange = (args) => {
        const assistviewFooter = document.getElementById('assistview-footer');
        assistviewFooter.innerText = args.transcript;
    };

    public onListeningStop = () => {
        this.toggleButtons();
    };

    public onCreated = () => {
        this.toggleButtons();
    };

    public toggleButtons = () => {
        const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
        const sendButton = document.querySelector('#assistview-sendButton');
        const speechButton = document.querySelector('#speech-to-text');
        const hasText = assistviewFooter.innerText.trim() !== '';
        sendButton.classList.toggle('visible', hasText);
        speechButton.classList.toggle('visible', !hasText);
        if (!hasText) {
            if ((assistviewFooter.innerHTML === '<br>' || assistviewFooter.innerHTML.trim() === '')) {
                assistviewFooter.innerHTML = '';
            }
        }
    };

    public handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.sendIconClicked();
            e.preventDefault();
        }
    };

    public onErrorHandler = (args) => {
        this.toastObj.content = args.errorMessage;
        if (args.error === 'unsupported-browser') {
            this.speechToTextObj.disabled = true;
            this.toastObj.show({ timeOut: 0 });
        } else {
            this.toastObj.show({ timeOut: 5000 });
        }
    }


    render() {
        return (
            <div className="control-pane">
                <div className="control-section integration-control-section">
                    <div className='control-wrapper'>
                        <div className="integration-speechToText-section">
                            <ToastComponent id="stt-toast" ref={(toast) => { this.toastObj = toast }} cssClass={"e-toast-danger"} target={'.integration-control-section'} position={{ X: 'Right' }} />
                            <AIAssistViewComponent id="aiAssistView" ref={(assistview) => { this.aiAssistViewObj = assistview }} promptRequest={this.onPromptRequest} bannerTemplate={this.bannerTemplate} footerTemplate={this.footerTemplate} toolbarSettings={this.toolbarSettings}></AIAssistViewComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the integration of SpeechToText with the AI AssistView component. It allows users to convert spoken words into text in real time and use the transcribed content as input for AI-based interactions.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the SpeechToText component captures and transcribes spoken input into text, which is displayed in an editable area. Users can modify the transcribed text or send it directly to the AI AssistView for processing.
                    </p>
                    <p>
                        The AI AssistView responds based on the provided input. A toolbar option is available to clear the conversation history, and a toast notification alerts users to any speech recognition errors.
                    </p>
                </div>
            </div>
        );
    }
}