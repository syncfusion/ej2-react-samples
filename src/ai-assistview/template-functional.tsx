import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './template.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { CarouselComponent, CarouselButtonVisibility } from '@syncfusion/ej2-react-navigations';
import { DropDownButton } from '@syncfusion/ej2-react-splitbuttons';
import * as data from './promptResponseData.json';

const Template = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const   promptSuggestionsHeader: string = 'Hello! Ask Questions, to better understand how your prompt interacts with AI AssistView!';

    const prompts: { [key: string]: string | string[] } [] = data["defaultPromptResponseData"];
    const suggestion: string [] = data["defaultSuggestions"];

    const templateAiAssistView = useRef<AIAssistViewComponent>(null);

    const assistViewCarousel = useRef<CarouselComponent>(null);

    const buttonVisible: CarouselButtonVisibility = 'Visible';

    const dataSource = [
        { imagePath: 'src/ai-assistview/images/moscow.jpg', title:'Moscow', suggestion: 'How do I prioritize tasks effectively?'  },
        { imagePath: 'src/ai-assistview/images/bridge.jpg', title:'Bridge', suggestion: 'How do I set daily goals in my work day?'  },
        { imagePath: 'src/ai-assistview/images/london.jpg', title:'London', suggestion: 'Steps to publish a e-book with marketing strategy'  },
        { imagePath: 'src/ai-assistview/images/tokyo.jpg', title:'Tokyo', suggestion: 'What tools or apps can help me prioritize tasks?'  }
    ];

    const productTemplate = (data: any) => {
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

    const bannerViewTemplate = () => {
        return (
            <div className="banner-content">
                <h3><span className="e-icons e-assistview-icon"></span>AI Assistance</h3>
                <CarouselComponent id="bannerCarousel" ref={assistViewCarousel} width={'100%'} height={'60%'} buttonsVisibility={buttonVisible} showIndicators={false} partialVisible={true} dataSource={dataSource} itemTemplate={productTemplate}></CarouselComponent>
            </div>
        );
    }

    const promptTemplate = (props: any) => {
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

    const responseTemplate = (props: any) => {
        return (
            <div className="responseItemContent">
                <div className="response-header">
                    <span className="e-icons e-assistview-icon"></span>
                    AI AssistView
                </div>
                <div className="assist-response-content" dangerouslySetInnerHTML={{ __html: props.response}}></div>
            </div>
        );
    };

    const promptSuggestionItemTemplate = (props: any) => {
        return (
            <div className='suggestion-item active'>
                <span className="e-icons e-circle-info"></span>
                <div className="assist-suggestion-content">{props.promptSuggestion}</div>
            </div>
        );
    };

    const toolbarSettings: ToolbarSettingsModel = {
        items: [
            { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
        ]
    };

    const created = () => {
        setTimeout(() => {
            assistViewCarousel.current.element.addEventListener('click', (e) => {
                var target = e.target as any;
                var prompt = '';
                if (target.tagName === 'IMG') {
                    prompt = target.nextElementSibling.textContent;
                } else if (target.className === 'e-card-header') {
                    prompt = target.textContent;
                }
                if (prompt) { templateAiAssistView.current.executePrompt(prompt); }
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

    const promptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            var foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
      
            templateAiAssistView.current.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            templateAiAssistView.current.promptSuggestions = foundPrompt?.suggestions as string [] || suggestion;
          }, 2000);
    };

    return(
        <div className='control-pane'>
            <div className="control-section">
                <div className="template-aiassistview"> 
                    <AIAssistViewComponent id="aiAssistView" bannerTemplate={bannerViewTemplate} promptItemTemplate={promptTemplate} responseItemTemplate={responseTemplate} promptSuggestionItemTemplate={promptSuggestionItemTemplate} promptSuggestionsHeader={promptSuggestionsHeader} promptSuggestions={suggestion} promptRequest={promptRequest} ref={templateAiAssistView} toolbarSettings={toolbarSettings} created={created}></AIAssistViewComponent>
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
    );
}
export default Template;
