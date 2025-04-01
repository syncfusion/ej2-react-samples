import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SpeechToTextComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './integration.css';
import { AIAssistViewComponent, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { updateSampleSection } from '../common/sample-base';
import { useEffect } from 'react';

const Integration = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const aiAssistViewObj = React.useRef(null);
    const speechToTextObj = React.useRef(null);
    const toastObj = React.useRef(null);

    const toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args) => toolbarItemClicked(args)
    }

    const bannerTemplate = () => {
        return (
            <div className="banner-info">
                <div className="e-icons e-listen-icon"></div>
                <h3>Speech To Text</h3>
                <i>Click the below mic-button to convert your voice to text.</i>
            </div>
        )
    }

    const footerTemplate = () => {
        return (
            <div className="e-footer-wrapper">
                <div id="assistview-footer" className="content-editor" contentEditable="true" placeholder="Click to speak or start typing..." onInput={toggleButtons} onKeyDown={handleKeyDown}></div>
                <div className="option-container">
                    <SpeechToTextComponent id="speechToText" ref={speechToTextObj} cssClass={'e-flat'} transcriptChanged={onTranscriptChange} onStop={onListeningStop} created={onCreated} onError={onErrorHandler} />
                    <ButtonComponent id="assistview-sendButton" className="e-assist-send e-icons" onClick={sendIconClicked} />
                </div>
            </div>
        )
    }

    const onPromptRequest = () => {
        const defaultAiassist = aiAssistViewObj.current;
        setTimeout(() => {
            defaultAiassist.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service.');
            toggleButtons();
        }, 2000);
    };

    const toolbarItemClicked = (args) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewObj.current.prompts = [];
        }
    }

    const sendIconClicked = () => {
        const assistviewFooter = document.getElementById('assistview-footer');
        aiAssistViewObj.current.executePrompt(assistviewFooter.innerText);
        assistviewFooter.innerText = "";
    };

    const onTranscriptChange = (args) => {
        const assistviewFooter = document.getElementById('assistview-footer');
        assistviewFooter.innerText = args.transcript;
    };

    const onListeningStop = () => {
        toggleButtons();
    };

    const onCreated = () => {
        toggleButtons();
    };

    const toggleButtons = () => {
        const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
        const sendButton = document.querySelector('#assistview-sendButton');
        const speechButton = document.querySelector('#speechToText');
        const hasText = assistviewFooter.innerText.trim() !== '';
        sendButton.classList.toggle('visible', hasText);
        speechButton.classList.toggle('visible', !hasText);
        if (!hasText) {
            if ((assistviewFooter.innerHTML === '<br>' || assistviewFooter.innerHTML.trim() === '')) {
                assistviewFooter.innerHTML = '';
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendIconClicked();
            event.preventDefault(); // Prevent the default behavior of the Enter key
        }
    };

    const onErrorHandler = (args) => {
        toastObj.current.content = args.errorMessage;
        if (args.error === 'unsupported-browser') {
            speechToTextObj.current.disabled = true;
            toastObj.current.show({ timeOut: 0 });
        } else {
            toastObj.current.show({ timeOut: 5000 });
        }
    }

    return (
        <div className="control-pane">
            <div className="control-section integration-control-section">
                <div className='control-wrapper'>
                    <div className="integration-speechToText-section">
                        <ToastComponent id="stt-toast" ref={toastObj} cssClass={"e-toast-danger"} target={'.integration-control-section'} position={{ X: 'Right' }} />
                        <AIAssistViewComponent id="aiAssistView" ref={aiAssistViewObj} promptRequest={onPromptRequest} bannerTemplate={bannerTemplate} footerTemplate={footerTemplate} toolbarSettings={toolbarSettings}></AIAssistViewComponent>
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
    )
}
export default Integration;