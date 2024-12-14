import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptModel, ViewDirective, ViewsDirective } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import './custom-views.css';
import { Button } from '@syncfusion/ej2-react-buttons';
import { TextArea } from '@syncfusion/ej2-react-inputs';
import * as data from './promptResponseData.json';

export class CustomViews extends SampleBase<{}, {}> {
  promptsData: PromptModel[] = [];

  prompts:{ [key: string]: string | string[] } [] = data["defaultPromptResponseData"];

  assistInstance: AIAssistViewComponent;

  viewTemplate: string = '<div class="view-container"><h5>Custom view content</h5></div>';

  suggestions: string[] = data["defaultSuggestions"];

  created = () => {
    var textareaObj: TextArea = new TextArea({
      placeholder: "Enter your prompt...",
      rows: 5,
      resizeMode: 'None',
      input: (e) => {
        generateBtn.disabled = !e.value;
      }
    });
    textareaObj.appendTo('#promptTextarea');

    var generateBtn: Button = new Button({ cssClass: 'e-primary generate-btn', content:'Generate Prompt', disabled: true });
    generateBtn.appendTo('#generateBtn');
    generateBtn.element.addEventListener('click',() => {
      var promptValue = textareaObj.value;
      if (promptValue) {
        textareaObj.value = '';
        generateBtn.disabled = true;
        this.assistInstance.activeView = 1;
        this.assistInstance.dataBind();   
        this.updateResponseView(promptValue);
      }
    });

    this.assistInstance.element.querySelector('.view-container .suggestions').addEventListener('click',(e) => {
      if ((e.target as any).classList.contains('suggestion-item')) {
        textareaObj.value = (e.target as any).textContent;
        textareaObj.dataBind();
        generateBtn.disabled = false;
      }
    });
  };

  updateResponseView = (prompt: string) => {
      var responseView = this.assistInstance.element.querySelector('.view-container');
      var separatorElem = '<hr style="height: 1px;margin: 0;">';
      var responseItemElem = `<div class="responseItemContent e-card">
                                  <div class="response-header"><b>Prompt:</b> ${prompt}</div>${separatorElem}
                                  <div class="assist-loading-content">
                                    <div class="e-skeleton e-shimmer-wave" style="width: 100%; height: 20px;"></div>
                                    <div class="e-skeleton e-shimmer-wave" style="width: 80%; height: 20px;"></div>
                                    <div class="e-skeleton e-shimmer-wave" style="width: 100%; height: 20px;"></div>
                                  </div>
                                  ${separatorElem}
                                  <div class="options">
                                    <button id="copyBtn" class="e-btn e-normal e-skeleton e-shimmer-wave">Copy</button>
                                  </div>
                              </div>`;
      var defaultResponse = responseView.querySelector('.default-response');
      if (defaultResponse) {
          defaultResponse.remove();
      }
      responseView.innerHTML = responseItemElem + responseView.innerHTML;
      setTimeout(() => {
          var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === prompt);
          var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

          var response = foundPrompt ? foundPrompt.response : defaultResponse;
          responseView.children[0].querySelector('.assist-loading-content').innerHTML = response as string;
          var copyBtn = responseView.children[0].querySelector('#copyBtn');
          copyBtn.classList.remove('e-skeleton', 'e-shimmer-wave');
          copyBtn.addEventListener('click', (e) => {
              var textToCopy = (e.target as any).parentElement.parentElement.querySelector('.assist-loading-content').textContent;
              navigator.clipboard.writeText(textToCopy).then(() => {
                  copyBtn.textContent = 'Copied!';
                  setTimeout(() => {
                      copyBtn.textContent = 'Copy';
                  }, 1000);
              });
          });
      }, 2000);
  };

  promptViewContent = () => {
      var suggestionsElem = '';
      this.suggestions.forEach((suggestion) => {
        suggestionsElem += `<li class="suggestion-item e-card">${suggestion}</li>`;
      });
      return `<div class="view-container">
                 <textarea id="promptTextarea"></textarea>
                 <button id="generateBtn"></button>
                 <ul class="suggestions">${suggestionsElem}</ul>
              </div>`;
  };

  responseViewContent = () => {
      return `<div class="view-container response-view">
                  <div class="responseItemContent default-response e-card">
                  <span class="e-icons e-circle-info"></span>
                  No prompt provided. Please enter a prompt and click 'Generate Prompt' to see the response.</div>
              </div>`;
  };
  render() {

    return (
      <div className='control-pane'>
        <div className="control-section">
          <div className="views-aiassistview">
            <AIAssistViewComponent id="aiAssistView" ref={aiassistView => (this.assistInstance = aiassistView)} created={this.created}>
              <ViewsDirective>
                <ViewDirective type='Assist' name='Prompt' viewTemplate={this.promptViewContent()}></ViewDirective>
                <ViewDirective type='Custom' name='Response' iconCss='e-icons e-comment-show' viewTemplate={this.responseViewContent()}></ViewDirective>
                <ViewDirective type='Custom' name='Custom' viewTemplate={this.viewTemplate}></ViewDirective>
              </ViewsDirective>
            </AIAssistViewComponent>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the different view available for the AI AssistView component.</p>
        </div>
        <div id="description">
          <p>In this example, the AI AssistView component is configured with three distinct views using the <code>views</code> property.</p>
          <p>Each view displays its own unique content:</p>
            <ul>
              <li>The <code>prompt</code> view includes a textarea with a <code>Generate</code> button and displays a list of suggestions</li>
              <li>The <code>response</code> view shows the generated response with a copy option.</li>
              <li>The <code>custom</code> view allows to display the custom content.</li>
            </ul>
        </div>
      </div>
    )
  }
}
