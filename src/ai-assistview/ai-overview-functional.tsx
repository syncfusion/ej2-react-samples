import * as React from 'react';
import { useRef } from 'react';
import { AIAssistViewComponent, FooterToolbarSettingsModel, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel, PromptModel, AssistThinking, AIAssistView } from '@syncfusion/ej2-react-interactive-chat';
import { updateSampleSection } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, AxesDirective, AxisDirective, Inject as ChartInject, Legend, Tooltip, Category, ColumnSeries, SplineSeries, Selection, Highlight } from '@syncfusion/ej2-react-charts';
import './ai-overview.css';

// Inject AssistThinking module for thinking support
AIAssistView.Inject(AssistThinking);

const ChartTemplate = (args: any) => (
  <ChartComponent
    id="overviewChart"
    primaryXAxis={{
      valueType: 'Category'
    }}
    primaryYAxis={{
      minimum: 0,
      maximum: 100,
      interval: 20,
      labelFormat: '{value}°F',
      majorGridLines: { width: 1 }
    }}
    chartArea={{ border: { width: 0 } }}
    tooltip={{ enable: true, enableHighlight: true }}
    legendSettings={{ enableHighlight: true, visible: false }}
    width="700px"
    height="300px"
    title="Weather Data"
  >
    <ChartInject services={[ColumnSeries, SplineSeries, Category, Legend, Tooltip, Selection, Highlight]} />
    <AxesDirective>
      <AxisDirective
        majorGridLines={{ width: 0 }}
        rowIndex={0}
        opposedPosition={true}
        lineStyle={{ width: 0 }}
        minimum={24}
        maximum={34}
        interval={2}
        name="yAxis"
        labelFormat="{value}°C"
        majorTickLines={{ width: 0 }}
      />
    </AxesDirective>
    <SeriesCollectionDirective>
      <SeriesDirective
        dataSource={args.columnData}
        xName="x"
        yName="y"
        name="Germany"
        type="Column"
        marker={{ visible: true, height: 7, width: 7 }}
      />
      <SeriesDirective
        dataSource={args.splineData}
        xName="x"
        yName="y"
        width={2}
        name="Japan"
        type="Spline"
        yAxisName="yAxis"
        marker={{ visible: true, width: 7, height: 7, isFilled: true }}
      />
    </SeriesCollectionDirective>
  </ChartComponent>
);

const Overview = () => {
  const overviewPromptResponseData: { [key: string]: string | string[] }[] = data["overviewPromptResponseData"];
  const overviewSuggestions: string[] = data["overviewSuggestions"];

  const assistInstance = useRef<AIAssistViewComponent>(null);
  const abortControllerRef = useRef<AbortController | undefined>();

  const registerToolUIs = () => {
    if (!assistInstance.current) return;

    (assistInstance.current as any).registerToolUI({
      toolName: 'weather-chart',
      template: ChartTemplate,
    });
  };

  const onCreated = (): void => {
    updateSampleSection();
    registerToolUIs();

    // Set default prompts after tools are registered
    const defaultPrompts: PromptModel[] = [
      {
        prompt: 'How does the weather vary throughout the week in Germany and Japan?',
      blocks: [
        {
          blockType: 'thinking',
          title: 'Thinking',
          collapsible: true,
            collapsed: true,
          isActive: false,
          stages: [
            {
              iconCss: 'e-icons e-search',
              status: 'completed',
              content: 'Searching for weather data from external sources and retrieving weekly forecasts for both Germany and Japan.',
              editableContext: [
                { name: 'Query Type', value: 'Weather Analysis', type: 'Variable' }
              ]
            }
          ]
        },
        {
          blockType: 'text',
          content: '**Weekly Weather Overview**<p>The chart below shows temperature variations across the week. The column series represents daily temperature highs, while the spline series reflects a smoother trend of average temperatures.</p>'
        },
        {
          blockType: 'tool',
          toolName: 'weather-chart',
          props: {
            columnData: [
              { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
              { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
              { x: 'Sat', y: 50 }
            ],
            splineData: [
              { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
              { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
              { x: 'Sat', y: 34 }
            ]
          }
        },
        {
          blockType: 'text',
          content: '**Key Insights:** The bar values indicate a sharp temperature spike on Tuesday and Wednesday, suggesting very hot conditions mid-week. Meanwhile, the spline line shows a relatively stable average temperature trend throughout the week. This difference highlights short-term heat surges compared to overall steady climatic conditions.'
        }
      ]
      }
    ];

    assistInstance.current.prompts = defaultPrompts;
  };

  const toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
    if (args.item.iconCss === 'e-icons e-refresh') {
      assistInstance.current.prompts = [];
      stopResponse();
    }
  };

  const assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right', tooltip: 'Start new chat' }],
    itemClicked: toolbarItemClicked
  };

  const footerToolbarSettings: FooterToolbarSettingsModel = {
        toolbarPosition: 'Bottom',
        items: [
            { iconCss: 'e-icons e-assist-send', align: 'Right' },
            { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left', tooltip: 'Attach File' },
      { iconCss: 'e-icons e-assist-speech-to-text', align: 'Left' }
        ]
  };

  const responseToolbarSettings: any = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
      { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
      { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' }
    ]
  };

  const attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  const bannerTemplate: string = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <i>Ask anything. Create faster. Work smarter with AI.</i>
  </div>`;

  const speechToTextSettings = {
    enable: true
  };

  const getRandomResponse = (regeneratedResponses: any): string => {
    if (Array.isArray(regeneratedResponses)) {
      return regeneratedResponses[Math.floor(Math.random() * regeneratedResponses.length)];
    }
    return regeneratedResponses;
  };

  const promptRequest = async (args: PromptRequestEventArgs) => {
    abortControllerRef.current = new AbortController();
    const foundPrompt = (overviewPromptResponseData || []).find((p: any) => p.prompt === args.prompt);
    const responseHtml = await getAIResponse(args as any, abortControllerRef.current);
    assistInstance.current.addPromptResponse(responseHtml);
    assistInstance.current.promptSuggestions = foundPrompt?.suggestions as string[] || overviewSuggestions || [];
  };

  const stopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }

  return (
    <div className='control-pane'>
      <div className="control-section">
        <div className="overview-aiassistview">
          <AIAssistViewComponent
            id="aiAssistView"
            enableStreaming={true}
            promptSuggestions={overviewSuggestions}
            toolbarSettings={assistViewToolbarSettings}
            footerToolbarSettings={footerToolbarSettings}
            responseToolbarSettings={responseToolbarSettings}
            enableAttachments={true}
            attachmentSettings={attachmentSettings}
            speechToTextSettings={speechToTextSettings}
            bannerTemplate={bannerTemplate}
            promptRequest={promptRequest}
            stopRespondingClick={stopResponse}
            created={onCreated}
            ref={assistInstance}
          />
        </div>
      </div>

      <div id="action-description">
        <p>This sample demonstrates an Overview UI that integrates streaming responses, generative UI responses, thinking workflow visualization, file attachments, speech-to-text input, text-to-speech playback and regenerate controls.</p>
      </div>
      <div id="description">
        <p>The Overview sample composes multiple features from other samples into a single, reusable layout:</p>
        <ul>
          <li><code>Generative UI</code> for rendering structured AI responses including text, and tools in a conversational layout.</li>
          <li><code>Thinking blocks</code> to visualize AI workflow stages such as searching, processing, analyzing, and summarizing in real time.</li>
          <li><code>Streaming</code> responses rendered in real time using <code>addPromptResponse</code>.</li>
          <li><code>File attachments</code> via the built-in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#attachmentsettings">attachmentSettings</a>.</li>
          <li><code>Speech-to-text</code> voice input using the browser <code>SpeechRecognition</code> via <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#speechtotextsettings">speechToTextSettings</a>.</li>
          <li><code>Text-to-speech</code> playback using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#responsetoolbarsettings">responseToolbarSettings</a> audio control.</li>
          <li><code>Regenerate</code> control to retry AI responses for a selected prompt.</li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;