import { SpeechToTextComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './use-case.css';
import { ChatUIComponent } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {

    public speechToTextObj: SpeechToTextComponent;
    public chatUIObj: ChatUIComponent;

    msgIdx = -1;
    isIndicatorVisible = false;

    public emptyChatTemplate = () => {
        <div className="empty-chat">
            <span className="e-icons e-multiple-comment"></span>
            No transcript available. Start speaking to generate a transcript.
        </div>
    }
    public typingIndicatorTemplate = () => {
        <div className="e-typing-indicator ">
            <span className="e-user-text">Transcripting</span> 
            <div className="e-indicator-wrapper">
                <span className="e-indicator"></span>
                <span className="e-indicator">
                </span><span className="e-indicator">
                </span>
            </div>
        </div>
    }

    public buttonSettings = {
        stopIconCss: 'e-icons e-listen-icon'
    }

    public onTranscriptChange= (args)=> {
        var existingMsg  = this.chatUIObj.messages[this.msgIdx];
        if(existingMsg ) {
            this.chatUIObj.updateMessage({ text: args.transcript }, existingMsg.id);
            this.chatUIObj.scrollToBottom();
        } else {
            var newMsg  = { id: 'msg-' + (this.msgIdx + 1), text: args.transcript, author: { id: 'testing-user', user: 'Testing User' } };
            this.chatUIObj.addMessage(newMsg);
        }
    
        // Show typing indicator only if it’s not visible
        if (!this.isIndicatorVisible) {
            this.chatUIObj.typingUsers = [{ id: 'testing-user', user: 'Testing User' }];
            this.isIndicatorVisible=true;
        }
    
        // Final transcript
        if (!args.isInterimResult) {
            this.msgIdx+1;
            this.speechToTextObj.transcript = '';
            this.chatUIObj.typingUsers = [];
            this.isIndicatorVisible=false;
        }
    }

    // Event handler for listening start
    public onListeningStart= ()=> {
        var sttElement = document.querySelector('#speechToText');
        this.msgIdx=this.chatUIObj.messages.length;
        sttElement.classList.add('stt-listening-state');
        this.updateStatus('Listening... Speak now...');
    }   

    // Event handler for listening stop
    public onListeningStop= (args)=> {
        var sttElement = document.querySelector('#speechToText');
        sttElement.classList.remove('stt-listening-state');
        this.chatUIObj.typingUsers = [];
        if (args.isInteracted)
            this.updateStatus('Click the mic button to start speaking...');
    }

    // Event handler for errors
    public onErrorHandler= (args)=> {
        this.updateStatus(args.errorMessage);
        if (args.error === 'unsupported-browser') {
            this.speechToTextObj.disabled = true;
        }
    }

    // Function to updates the speech recognition status message
    public updateStatus= (status)=> {
        (document.querySelector('.speech-recognition-status') as HTMLElement).innerText = status;
    }

    render() {
        return(
            <div className="control-pane">
                <div className="control-section">
                    <div className="usecase-speechToText-section e-message">
                        <div className="stt-container">
                            <SpeechToTextComponent id="speechToText" ref={(speechtotext) => {this.speechToTextObj = speechtotext}} buttonSettings={this.buttonSettings} transcriptChanged= {this.onTranscriptChange} onStart={this.onListeningStart} onStop={this.onListeningStop} onError= {this.onErrorHandler} cssClass= {"usecase-stt-btn"} />
                            <span className="speech-recognition-status">Click the mic button to start speaking...</span>
                        </div>
                        <div className="transcript-container">
                            <ChatUIComponent id="transcript-content" ref={(chatui) => {this.chatUIObj = chatui}} showHeader={false} showFooter={false} timeStampFormat= {"MMM d, h:mm a"} autoScrollToBottom={true} emptyChatTemplate={this.emptyChatTemplate} typingUsersTemplate={this.typingIndicatorTemplate} />
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates a live transcription feature that converts spoken words into text in real-time. Click the microphone button to start speaking, and the transcribed text will appear in the ChatUI component as a conversation with timestamps.
                    </p>
                </div>
                
                <div id="description">
                    <p>
                        The Speech-to-Text component captures audio input and transcribes it dynamically, updating the transcript in the <code>ChatUI</code> component. Each spoken segment is displayed as an individual message with a timestamp, ensuring a structured conversation format.
                    </p>
                    <p>
                        The integration with <code>ChatUI</code> allows real-time updates, maintaining the natural flow of conversation. This setup enhances readability and interaction, making it easier to follow and review the transcription.
                    </p>
                </div>
            </div>
        );
    }
}   