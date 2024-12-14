import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import './template.css';
import { CarouselComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownButton } from '@syncfusion/ej2-react-splitbuttons';
import * as data from './promptResponseData.json';

export class Template extends SampleBase<{}, {}> {
  promptSuggestionsHeader: 'Hello! Ask Questions, to better understand how your prompt interacts with AI AssistView!';

  prompts: { [key: string]: string | string[] } [] = data["defaultPromptResponseData"];

  suggestion: string [] = data["defaultSuggestions"];

  templateAiAssistView: AIAssistViewComponent;
  assistViewCarousel: CarouselComponent;

  buttonVisible: 'Visible';
  dataSource: [
    { imagePath: 'src/ai-assistview/images/moscow.jpg', title:'Moscow', suggestion: 'How do I prioritize tasks effectively?'  },
    { imagePath: 'src/ai-assistview/images/bridge.jpg', title:'Bridge', suggestion: 'How do I set daily goals in my work day?'  },
    { imagePath: 'src/ai-assistview/images/london.jpg', title:'London', suggestion: 'Steps to publish a e-book with marketing strategy'  },
    { imagePath: 'src/ai-assistview/images/tokyo.jpg', title:'Tokyo', suggestion: 'What tools or apps can help me prioritize tasks?'  }
  ];

  productTemplate = (data: any) => {
    return (
      <div className="carousel-template">
        <img src={data.imagePath} alt={data.title}/>
        <div className="e-card">
          <div className="e-card-header">
            {data.suggestion}
          </div>
        </div>
      </div>
    );
  };

  bannerViewTemplate = () => {
    return (
      <div className="banner-content">
        <h3><span className="e-icons e-assistview-icon"></span>AI Assistance</h3>
        <CarouselComponent id="bannerCarousel" ref={carousel => (this.assistViewCarousel = carousel)} width={'100%'} height={'60%'} showIndicators={false} partialVisible={false} dataSource={this.dataSource} itemTemplate={this.productTemplate} buttonsVisibility={this.buttonVisible}></CarouselComponent>
      </div>
    );
  }

  promptItemTemplate = (props: any) => {
    var prompt = props.prompt.replace('<span class="e-icons e-circle-info"></span>', '');
    return (
      <div className="promptItemContent">
        <div className="prompt-header">You
          <span className="e-icons e-user"></span>
        </div>
        <div className="assist-prompt-content">{prompt}</div>
      </div>
    );
  };

  responseItemTemplate = (props: any) => {
    return (
      <div className="responseItemContent">
        <div className="response-header">
          <span className="e-icons e-assistview-icon"></span>
          AI Assist
        </div>
        <div className="assist-response-content" dangerouslySetInnerHTML={{ __html: props.response}}></div>
      </div>
    );
  };

  promptSuggestionItemTemplate = (props: any) => {
    return (
      <div className='suggestion-item active'>
        <span className="e-icons e-circle-info"></span>
        <div className="assist-suggestion-content">{props.promptSuggestion}</div>
      </div>
  );
  };

  toolbarSettings: ToolbarSettingsModel = {
    items: [
      { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
    ]
  };

  created = () => {
    setTimeout(() => {
      this.assistViewCarousel.element.addEventListener('click', (e) => {
        var target = e.target as any;
        var prompt = '';
        if (target.tagName === 'IMG') {
            prompt = target.nextElementSibling.textContent;
        } else if (target.className === 'e-card-header') {
            prompt = target.textContent;
        }
        if (prompt) { this.templateAiAssistView.executePrompt(prompt); }
      });
    });

    new DropDownButton({
      items: [
          { text: 'Settings', iconCss: 'e-icons e-settings' },
          { separator: true },
          { text: 'Log out' }
      ],
      iconCss: 'e-icons e-user',
      cssClass: 'e-caret-hide',
    }, '#ddMenu');
  };

  promptRequest = (args: PromptRequestEventArgs) => {
    setTimeout(() => {
      var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
      var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

      this.templateAiAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
      this.templateAiAssistView.promptSuggestions = foundPrompt?.suggestions as string [] || this.suggestion;
    }, 2000);
  };

  render() {
    return (
      <div className='control-pane'>
        <div className="control-section">
          <div className="template-aiassistview">
            <AIAssistViewComponent id="aiAssistView" bannerTemplate={this.bannerViewTemplate} promptItemTemplate={this.promptItemTemplate} responseItemTemplate={this.responseItemTemplate} promptSuggestionItemTemplate={this.promptSuggestionItemTemplate} promptSuggestions={this.suggestion} promptRequest={this.promptRequest} ref={aiassistView => (this.templateAiAssistView = aiassistView)} created={this.created} promptSuggestionsHeader={this.promptSuggestionsHeader} toolbarSettings={this.toolbarSettings}></AIAssistViewComponent>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the template functionality of the AI AssistView component.</p>
        </div>
        <div id="description">
          <p>In this example, the AI AssistView component uses customizable templates for the banner, prompts, responses, and suggestions. We have used the <code>bannerViewTemplate</code>, <code>promptItemTemplate</code>, <code>responseItemTemplate</code> and <code>promptSuggestionItemTemplate</code> to define the structure and appearance of these elements.
          </p>
          <p>
            By using the <code>executePrompt</code> method you can trigger the prompt request externally and generate the output based on the <code>promptRequest</code> data returned. If found, the response will be displayed and suggestions updated.
          </p>
        </div>
      </div>
    )
  }
}
