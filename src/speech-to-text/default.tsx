import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { SpeechToTextComponent, TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './default.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

interface SpeechToTextDefaultState {
    languageDropdownEnabled: boolean;
    interimSwitchDisabled: boolean;
}

export class Default extends SampleBase<{}, SpeechToTextDefaultState> {
    public speechToTextObj: SpeechToTextComponent;
    public textareaObj: TextAreaComponent;
    public copyButtonObj: ButtonComponent;

    isSupportedBrowser=true;

    constructor(props: {}) {
        super(props);

        this.state = {
            languageDropdownEnabled: true,
            interimSwitchDisabled: false
        };
    }

    public miColor = [
        { text: "Normal", value: "" },
        { text: "Primary", value: "e-primary" },
        { text: "Success", value: "e-success" },
        { text: "Warning", value: "e-warning" },
        { text: "Danger", value: "e-danger" },
        { text: "Flat", value: "e-flat" },
        { text: "Info", value: "e-info" }
    ];
    public languageTypes = [
        { text: "English, US", value: "en-US" },
        { text: "German, DE", value: "de-DE" },
        { text: "Chinese, CN", value: "zh-CN" },
        { text: "French, FR", value: "fr-FR" },
        { text: "Arabic, SA", value: "ar-SA" }
    ];

    public micField = { text: "text", value: "value" };
    public languageField = { text: "text", value: "value" };

    public onTranscriptChanged = (args) => {
        if (!args.isInterimResult)
            args.transcript += ' ';

        this.textareaObj.value = args.transcript;
        this.toggleCopyButtonState();
    };
    public onListeningStart = () => {
        if (this.isSupportedBrowser) {
            if (this.textareaObj.value)
                this.speechToTextObj.transcript = this.textareaObj.value + '\n';

            this.updateStatus('Listening... Speak now...');
        } else {
            this.updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        }
        this.setState({
            languageDropdownEnabled: false,
            interimSwitchDisabled: true
        });
    };
    public onListeningStop = (args) => {
        if (this.isSupportedBrowser) {
            if (args.isInteracted)
                this.updateStatus('Click the mic button to start speaking...');
        } else {
            this.updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        }
        this.setState({
            languageDropdownEnabled: true,
            interimSwitchDisabled: false
        });
    };
    public onErrorHandler = (args) => {
        this.updateStatus(args.errorMessage);
        if (args.error === 'unsupported-browser')
            this.isSupportedBrowser= false;
    };
    public updateStatus = (status) => {
        (document.querySelector('.speech-recognition-status') as HTMLElement).innerText = status;
    };
    public handleMiColor = (args) => {
        this.speechToTextObj.cssClass = args.value;
    };
    public handleLanguageType = (args) => {
        this.speechToTextObj.lang = args.value;
    };
    public handleAllowInterimResults = (args) => {
        this.speechToTextObj.allowInterimResults = args.checked;
    };
    public handleShowTooltip = (args) => {
        this.speechToTextObj.showTooltip = args.checked;
    };
    public handleIconWithText = (args) => {
        this.speechToTextObj.buttonSettings = {
            content: args.checked ? 'Start Listening' : '',
            stopContent: args.checked ? 'Stop Listening' : ''
        };
    };
    public handleCopyButton = () => {
        const copyText = this.textareaObj.value;
        const copyBtnElem = document.querySelector('#transcript-copy-button') as HTMLElement;

        if (copyText && navigator.clipboard) {
            navigator.clipboard.writeText(copyText).then(function () {
                copyBtnElem.innerText = 'Copied!';
                setTimeout(function () {
                    copyBtnElem.innerText = 'Copy';
                }, 1000);
            }).catch(function (err) {
                console.error('Clipboard write failed', err);
            });
        }
    };

    public handleClearButton = () => {
        this.textareaObj.value = this.speechToTextObj.transcript = '';
        this.toggleCopyButtonState();
    };
    innerText: string;

    public toggleCopyButtonState = () => {
        var hasText = this.textareaObj.element.value.trim() !== '';
        this.copyButtonObj.disabled = hasText ? false : true;
    }

    render() {
        return (
            <div className="control-pane">
                <div className="col-lg-8 control-section">
                    <div className="default-speechToText-section">
                        <div className="speechToText-container">
                            <SpeechToTextComponent
                                id="speech-to-text"
                                ref={(speechtotext) => { this.speechToTextObj = speechtotext }}
                                transcriptChanged={this.onTranscriptChanged}
                                onStart={this.onListeningStart}
                                onStop={this.onListeningStop}
                                onError={this.onErrorHandler}
                            />
                            <mark className="speech-recognition-status">Click the mic button to start speaking...</mark>
                        </div>  
                        <div className="output-container">
                            <h4>Live Speech Transcription</h4>
                            <TextAreaComponent
                                id="output-textarea"
                                ref={(textarea) => { this.textareaObj = textarea }}
                                cssClass="e-outline"
                                resizeMode="None"
                                rows={10}
                                placeholder="Transcribed text will appear here..."
                                input={this.toggleCopyButtonState}
                            />
                            <div className="output-options">
                                <ButtonComponent id="transcript-copy-button" ref={(button) => { this.copyButtonObj = button }} disabled={true} onClick={this.handleCopyButton} className="e-btn">Copy</ButtonComponent>
                                <ButtonComponent id="transcript-clear-button" onClick={this.handleClearButton} className="e-btn" >Clear</ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 default-speechToText property-section">
                    <div className="property-panel-header">Properties</div>
                    <div className="property-panel-content">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Styling</td>
                                    <td>
                                        <DropDownListComponent
                                            id="stt-styling-ddl"
                                            dataSource={this.miColor}
                                            fields={this.micField}
                                            change={this.handleMiColor}
                                            index={0}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Language</td>
                                    <td>
                                        <DropDownListComponent
                                            id="stt-lang-ddl"
                                            dataSource={this.languageTypes}
                                            fields={this.languageField}
                                            change={this.handleLanguageType}
                                            index={0}
                                            enabled={this.state.languageDropdownEnabled}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Interim results</td>
                                    <td>
                                        <SwitchComponent id="interim-switch" type="checkbox" checked={true} change={this.handleAllowInterimResults} disabled={this.state.interimSwitchDisabled} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Show tooltip</td>
                                    <td>
                                        <SwitchComponent id="tooltip-switch" type="checkbox" checked={true} change={this.handleShowTooltip} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Show icon with text</td>
                                    <td>
                                        <SwitchComponent id="icon-with-text-switch" type="checkbox" checked={false} change={this.handleIconWithText} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample showcases the functionality of the SpeechToText component, which converts spoken words into text using your device’s microphone. It utilizes the built-in JavaScript SpeechRecognition API for speech processing. Speak into the microphone to see the transcribed text appear in the text area.
                    </p>
                </div>

                <div id="description">
                    <p>
                        The SpeechToText component enables real-time speech-to-text conversion using the JavaScript <code>SpeechRecognition</code> API. This demo explores its key features and customization options:
                    </p>
                    <ul>
                        <li><code>cssClass</code>: Modify the microphone button’s appearance with predefined styles such as Success, Warning, or Danger.</li>
                        <li><code>lang</code>: Select a preferred language for speech recognition.</li>
                        <li><code>allowInterimResults</code>: Choose whether to display words as you speak or only after completing a phrase.</li>
                        <li><code>showTooltip</code>: Enable or disable tooltips for additional guidance.</li>
                        <li><code>buttonSettings</code>: Configure the button to display text alongside the microphone icon.</li>
                    </ul>
                    <p>
                        These options allow you to configure the SpeechToText component to suit your needs. Try different settings in the property panel to see how they affect the component’s appearance and functionality.
                    </p>
                </div>
            </div>
        )
    }

}