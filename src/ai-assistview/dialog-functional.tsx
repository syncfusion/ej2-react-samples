import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './dialog.css';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ResponseToolbarSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import * as data from './promptResponseData.json';

const Dialog = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const assistInstance = useRef<AIAssistViewComponent>(null);
    const dialogInstance = useRef<DialogComponent>(null);

    const promptsData: PromptModel[] = [
        {
            response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
        }
    ];
    const prompts:{ [key: string]: string | string[] } [] = data["defaultPromptResponseData"];
    const suggestion: string[] = data["defaultSuggestions"];

    const bannerTemplate: string = `<div class="banner-content">
        <div class="e-icons e-assistview-icon"></div>
        <h3>AI Assistance</h3>
        <i>To get started, provide input or choose a suggestion.</i>
    </div>`;

    const leftContent = () => {
        return (
            <div className="assist-left-content">
                <div className="header">Quick Notes</div>
                <hr />
                <div className="content e-card">
                <div className="note-title">
                    <div className="heading">Planning and Requirements</div>
                    <div className="sub-heading">Outline the process of gathering input from stakeholders</div>
                </div>
                <div className="note-title e-skeleton e-skeleton-text">
                    <div className="heading">Meeting with Stakeholders</div>
                    <div className="sub-heading">Discuss strategies for conducting productive meetings with stakeholders</div>
                </div>
                <div className="note-title">
                    <div className="heading">Risk Management and Problem-Solving</div>
                    <div className="sub-heading">Offer tips on how to proactively manage challenges, including regular</div>
                </div>
                <div className="note-title">
                    <div className="heading e-skeleton e-skeleton-text"></div>
                    <div className="sub-heading e-skeleton e-skeleton-text"></div>
                </div>
                <div className="note-title">
                    <div className="heading e-skeleton e-skeleton-text"></div>
                </div>
                </div>
            </div>
        );
    };
    
    const rightContent = () => {
        return (
            <div className="right-content">
                <div className="heading">Meeting with Stakeholders</div>
                <hr />
                <div className="date-info">Tuesday, August 27, 2024</div>
                <div className="content e-card" contentEditable={true} suppressContentEditableWarning={true}>
                    <i><mark>(Open AI Assist, generate a response, and click 'Copy' from the toolbar item to get it updated here.)</mark></i>
                    Discuss strategies for conducting productive meetings with stakeholders. <br />
                    Highlight the significance of setting clear agendas, defining outcomes, and maintaining open communication. <br />
                </div>
            </div>
        );
    };

    const toolbarItemClicked = (args) => {
        if (args.item.iconCss === 'e-icons e-close') {
            dialogInstance.current.hide();
        }
        if (args.item.iconCss === 'e-icons e-assist-copy') {
            var targetElem: any = document.querySelector('.right-content .content');
            var response = assistInstance.current.prompts[args.dataIndex].response;
            if (targetElem) {
                targetElem.innerHTML += response + '<br />';
                dialogInstance.current.hide();
            }
        }
    };

    const assistViewToolbarSettings: ToolbarSettingsModel = {
        itemClicked: toolbarItemClicked,
        items: [ { iconCss: 'e-icons e-close', align: 'Right' } ]
    };

    const responseToolbarsettings: ResponseToolbarSettingsModel = {
        itemClicked: toolbarItemClicked
    };

    const fabClicked = () => {
        dialogInstance.current.show();
    };

    const promptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            var foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

            assistInstance.current.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            assistInstance.current.promptSuggestions = foundPrompt?.suggestions as string[] || suggestion;

        }, 2000);
    };
    return(
        <div className='control-pane'>
            <div className="control-section">
                <div className="dialog-aiassistview">
                    <SplitterComponent id="splitter" height='600px'>
                        <PanesDirective>
                            <PaneDirective size='22%' resizable={false} content={leftContent}></PaneDirective>
                            <PaneDirective size='78%' resizable={false} content={rightContent}></PaneDirective>
                        </PanesDirective>
                    </SplitterComponent>
                </div>
                <DialogComponent id="dialogElem" width={'440px'} height={'100%'} ref={dialogInstance} visible={false} target='.dialog-aiassistview' cssClass='custom-dialog'>
                    <AIAssistViewComponent id="aiAssistView" ref={assistInstance} cssClass='custom-aiassistview' promptSuggestions={suggestion} promptRequest={promptRequest} bannerTemplate={bannerTemplate} toolbarSettings={assistViewToolbarSettings} responseToolbarSettings={responseToolbarsettings}></AIAssistViewComponent>
                </DialogComponent>
                <FabComponent id="fabElem" iconCss='e-icons e-assistview-icon' content='AI Assist' target='.dialog-aiassistview' onClick={fabClicked}></FabComponent>
            </div>
            <div id="action-description">
                <p>This example demonstrates the usage of dialogs in the AI AssistView component. You can display the generated responses in the notes view.</p>
            </div>
            <div id="description">
                <p>In this example, the AI AssistView is shown inside a dialog component, which opens with a floating action button (FAB) click.
                    It uses predefined <code>promptSuggestions</code> that are displayed based on user configuration and a custom toolbar item as a close icon to close the dialog.
                    The <code>promptRequest</code> event finds matching prompts and displays the responses.
                </p>
            </div>
        </div>
    );
}
export default Dialog;
