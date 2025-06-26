import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ResponseToolbarSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import './dialog.css';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import * as data from './promptResponseData.json';

export class Dialog extends SampleBase<{}, {dialogVisibility: boolean}> {

  assistInstance: AIAssistViewComponent;
  constructor(props: {}) {
    super(props);
    this.state = {
      dialogVisibility: false
    };
  }
  promptsData: PromptModel[] = [
    {
      response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
    }
  ];
  prompts: { [key: string]: string | string[] } [] = data["defaultPromptResponseData"];

  suggestion: string [] = data["defaultSuggestions"];

  bannerTemplate = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>AI Assistance</h3>
    <i>To get started, provide input or choose a suggestion.</i>
  </div>`;

  leftContent = () => {
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

  rightContent = () => {
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

  toolbarItemClicked = (args) => {
    if (args.item.iconCss === 'e-icons e-close') {
      this.setState({ dialogVisibility: false });
    }
    if (args.item.iconCss === 'e-icons e-assist-copy') {
      var targetElem: any = document.querySelector('.right-content .content');
      var response = this.assistInstance.prompts[args.dataIndex].response;
      if (targetElem) {
        this.setState({
          dialogVisibility: false
        });
        targetElem.innerHTML += response + '<br />';
      }
    }
  };

  assistViewToolbarSettings: ToolbarSettingsModel = {
    itemClicked: this.toolbarItemClicked,
    items: [ { iconCss: 'e-icons e-close', align: 'Right' } ]
  };

  responseToolbarsettings: ResponseToolbarSettingsModel = {
    itemClicked: this.toolbarItemClicked
  };

  promptRequest = (args: PromptRequestEventArgs) => {
    setTimeout(() => {
      var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
      var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

      this.assistInstance.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
      this.assistInstance.promptSuggestions = foundPrompt?.suggestions as string[] || this.suggestion;

    }, 2000);
  };

  fabClicked = () => {
    this.setState({ dialogVisibility: true });
  };

  render() {

    return (
      <div className='control-pane'>
        <div className="control-section">
          <div className="dialog-aiassistview">
            <SplitterComponent id="splitter" height='600px'>
              <PanesDirective>
                <PaneDirective size='22%' resizable={false} content={this.leftContent}></PaneDirective>
                <PaneDirective size='78%' resizable={false} content={this.rightContent}></PaneDirective>
              </PanesDirective>
            </SplitterComponent>
          </div>
          <DialogComponent id="dialogElem" width={'440px'} height={'100%'} visible={this.state.dialogVisibility} target='.dialog-aiassistview' cssClass='custom-dialog'>
            <AIAssistViewComponent id="aiAssistView" ref={aiassistView => (this.assistInstance = aiassistView)} cssClass='custom-aiassistview' promptSuggestions={this.suggestion} promptRequest={this.promptRequest} bannerTemplate={this.bannerTemplate} toolbarSettings={this.assistViewToolbarSettings} responseToolbarSettings={this.responseToolbarsettings}></AIAssistViewComponent>
          </DialogComponent>
          <FabComponent id="fabElem" iconCss='e-icons e-assistview-icon' content='AI Assist' target='.dialog-aiassistview' onClick={this.fabClicked}></FabComponent>
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
    )
  }
}
