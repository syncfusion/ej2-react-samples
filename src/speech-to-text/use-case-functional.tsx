import { SpeechToTextComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './use-case.css';
import { ChatUIComponent } from '@syncfusion/ej2-react-interactive-chat';
import { updateSampleSection } from '../common/sample-base';
import { useEffect, useRef, useState } from 'react';

const UseCase = () => {

    useEffect(() => {
        updateSampleSection();
    }, []);

    const speechToTextObj = useRef(null);
    const chatUIObj = useRef(null);

    const [msgIdx, setmsgIdx] = useState(-1);
    const [isIndicatorVisible, setisIndicatorVisible] = useState(false);

    const emptyChatTemplate = () => {
        return (
            <div className="empty-chat">
                <span className="e-icons e-multiple-comment"></span>
                No transcript available. Start speaking to generate a transcript.
            </div>
        )
    }
    const typingIndicatorTemplate = () => {
        return (
            <div className="e-typing-indicator ">
                <span className="e-user-text">Transcripting</span>
                <div className="e-indicator-wrapper">
                    <span className="e-indicator"></span>
                    <span className="e-indicator">
                    </span><span className="e-indicator">
                    </span>
                </div>
            </div>
        )
    }

    const buttonSettings = {
        stopIconCss: 'e-icons e-listen-icon'
    }

    const onTranscriptChange = (args) => {
        var existingMsg = chatUIObj.current.messages[msgIdx];
        if (existingMsg) {
            chatUIObj.current.updateMessage({ text: args.transcript }, existingMsg.id);
            chatUIObj.current.scrollToBottom();
        } else {
            var newMsg = { id: 'msg-' + (msgIdx + 1), text: args.transcript, author: { id: 'testing-user', user: 'Testing User' } };
            chatUIObj.current.addMessage(newMsg);
        }

        // Show typing indicator only if it’s not visible
        if (!isIndicatorVisible) {
            chatUIObj.current.typingUsers = [{ id: 'testing-user', user: 'Testing User' }];
            setisIndicatorVisible(true);
        }

        // Final transcript
        if (!args.isInterimResult) {
            msgIdx + 1;
            speechToTextObj.current.transcript = '';
            chatUIObj.current.typingUsers = [];
            setisIndicatorVisible(false);
        }
    }

    // Event handler for listening start
    const onListeningStart = () => {
        var sttElement = document.querySelector('#speechToText');
        setmsgIdx(chatUIObj.current.messages.length);
        sttElement.classList.add('stt-listening-state');
        updateStatus('Listening... Speak now...');
    }

    // Event handler for listening stop
    const onListeningStop = (args) => {
        var sttElement = document.querySelector('#speechToText');
        sttElement.classList.remove('stt-listening-state');
        chatUIObj.current.typingUsers = [];
        if (args.isInteracted)
            updateStatus('Click the mic button to start speaking...');
    }

    // Event handler for errors
    const onErrorHandler = (args) => {
        updateStatus(args.errorMessage);
        if (args.error === 'unsupported-browser') {
            speechToTextObj.current.disabled = true;
        }
    }

    // Function to updates the speech recognition status message
    const updateStatus = (status) => {
        (document.querySelector('.speech-recognition-status') as HTMLElement).innerText = status;
    }

    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="usecase-speechToText-section e-message">
                    <div className="stt-container">
                        <SpeechToTextComponent id="speechToText" ref={speechToTextObj} buttonSettings={buttonSettings} transcriptChanged={onTranscriptChange} onStart={onListeningStart} onStop={onListeningStop} onError={onErrorHandler} cssClass={"usecase-stt-btn"} />
                        <span className="speech-recognition-status">Click the mic button to start speaking...</span>
                    </div>
                    <div className="transcript-container">
                        <ChatUIComponent id="transcript-content" ref={chatUIObj} showHeader={false} showFooter={false} timeStampFormat={"MMM d, h:mm a"} autoScrollToBottom={true} emptyChatTemplate={emptyChatTemplate} typingUsersTemplate={typingIndicatorTemplate} />
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
    )
}
export default UseCase;