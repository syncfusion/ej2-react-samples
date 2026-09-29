import * as React from 'react';
import { useEffect, useRef } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2/base';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject as ChartInject, LineSeries, DateTime, Legend, Tooltip, Category, StackingColumnSeries, Selection, Highlight } from '@syncfusion/ej2-react-charts';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import * as data from './promptResponseData.json';
import { getAIResponse } from '../common/ai-service';
import './ai-generative-ui.css';

const GenerativeUI = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);

  const generativeSuggestions: string[] = data["generativeSuggestions"];
  const toolSystemPrompt: any = data["toolSystemPrompt"];
  const promptsData: any = data["promptsData"];
  const currentChartConfig = useRef<any>({});
  const currentGridConfig = useRef<any>({});

  const assistInstance = useRef<AIAssistViewComponent>(null);
  const abortControllerRef = useRef<AbortController | undefined>();

  const toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
    if (args.item.iconCss === 'e-icons e-refresh') {
      assistInstance.current.prompts = [];
      assistInstance.current.promptSuggestions = generativeSuggestions;
      stopResponse();
    }
  };

  const assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: toolbarItemClicked
  };

  const bannerTemplate: string = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>AI Assistance Generative UI</h3>
    <i>Render interactive tools such as weather cards, charts, data grids etc directly inside AI responses.</i>
  </div>`;

  const processChartConfig = (args: any): void => {
    const chartConfig = {
      dataSource: args.dataSource || args.data || [],
      xField: args.xField || args.xName,
      yField: args.yField || args.yName,
      chartType: args.chartType || args.type || 'Line',
      title: args.title || '',
      xAxisTitle: args.xAxisTitle,
      yAxisTitle: args.yAxisTitle,
      enableTooltip: args.enableTooltip,
      enableLegend: args.enableLegend
    };

    if (chartConfig.chartType === 'Pie' || chartConfig.chartType === 'Doughnut') {
      chartConfig.chartType = 'Line';
    }

    currentChartConfig.current = chartConfig;
  };

  const processGridConfig = (args: any): void => {
    const data = args.data || [];
    const gridConfig = {
      data: data,
      columns: args.columns || (
        data.length
          ? Object.keys(data[0]).map((field: string) => ({
              field: field,
              headerText: field,
              width: 150
            }))
          : []
      )
    };

    currentGridConfig.current = gridConfig;
  };

  const ChartTemplate = (args: any) => (
    <ChartComponent
      id="generativeChart"
      primaryXAxis={{
        valueType: 'Category',
        title: currentChartConfig.current.xAxisTitle || currentChartConfig.current.xField,
        labelIntersectAction: 'Rotate45',
      }}
      primaryYAxis={{
        title: currentChartConfig.current.yAxisTitle || currentChartConfig.current.yField,
      }}
      tooltip={{
        enable: currentChartConfig.current.enableTooltip !== false
      }}
      legendSettings={{
        visible: currentChartConfig.current.enableLegend !== false
      }}
      title={currentChartConfig.current.title}
    >
      <ChartInject services={[LineSeries, DateTime, Legend, Tooltip, StackingColumnSeries, Category, Selection, Highlight]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={currentChartConfig.current.dataSource}
          xName={currentChartConfig.current.xField}
          yName={currentChartConfig.current.yField}
          type={currentChartConfig.current.chartType}
          marker={{ visible: true }}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );

  const GridTemplate = (args: any) => (
    <GridComponent
      dataSource={currentGridConfig.current.data}
      allowPaging={false}
      pageSettings={{ pageSize: 8 }}
      width="fit-content"
    >
      <ColumnsDirective>
        {currentGridConfig.current.columns?.map((column: any, index: number) => (
          <ColumnDirective
            key={index}
            field={column.field}
            headerText={column.headerText}
            width={column.width}
            textAlign={column.textAlign}
          />
        ))}
      </ColumnsDirective>
      <Inject services={[Page]} />
    </GridComponent>
  );

  const WeatherTemplate = (args: any): any => {
    const defaults = {
      location: 'Unknown Location',
      temperature: '--',
      condition: '--',
      humidity: '--',
      windSpeed: '--'
    };

    const data = Object.assign({}, defaults, args);

    return (<div tabIndex={0} className="e-card" id="weather_card" role="button">
      <div className="e-card-header">
        <div className="e-card-header-caption">
          <div className="e-card-header-title">{data.location}</div>
          <div className="e-card-sub-title">{data.condition}</div>
        </div>
      </div>

      <div className="e-card-header weather_report">
        <div className="e-card-header-image"></div>

        <div className="e-card-header-caption">
          <div className="e-card-header-title">{data.temperature}</div>
          <div className="e-card-sub-title">
            Humidity: {data.humidity}
          </div>
          <div className="e-card-sub-title">
            Wind: {data.windSpeed}
          </div>
        </div>
      </div>
    </div>);
  };

  const registerToolUIs = (): void => {
    assistInstance.current.registerToolUI({
      toolName: 'weather-card',
      template: WeatherTemplate,
    });

    assistInstance.current.registerToolUI({
      toolName: 'chart-tool',
      template: ChartTemplate,
      handler: (container: HTMLElement, args: any) => {
        processChartConfig(args);
      }
    });

    assistInstance.current.registerToolUI({
      toolName: 'grid-tool',
      template: GridTemplate,
      handler: (container: HTMLElement, args: any) => {
        processGridConfig(args);
      }
    });
  };

  const onCreated = (): void => {
    registerToolUIs();
    assistInstance.current.prompts = promptsData;
  };

  const promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    abortControllerRef.current = new AbortController();
    try {
      const aiArgs = {
        prompt: args.prompt,
        systemPrompt: toolSystemPrompt
      };
    
      const reply = await getAIResponse(aiArgs, abortControllerRef.current);
    
      const jsonText =
        reply.response ||
        '{}';
    
      const aiData = JSON.parse(jsonText);
    
      assistInstance.current.addPromptResponse({
        blocks: aiData.blocks || [{
          blockType: 'text',
          content: 'We could not reach the AI service; please try again later.'
        }]
      });
    } catch (error) {
      assistInstance.current.addPromptResponse(
        'We could not reach the AI service; please try again later.'
      );
    }
  };

  const stopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }

  return (
    <div className='control-pane'>
      <div className="control-section">
        <div className="generative-aiassistview">
          <AIAssistViewComponent
            id="aiAssistView"
            bannerTemplate={bannerTemplate}
            promptSuggestionsHeader="Suggested Prompts"
            promptSuggestions={generativeSuggestions}
            enableStreaming={true}
            showClearButton={true}
            toolbarSettings={assistViewToolbarSettings}
            promptRequest={promptRequest}
            stopRespondingClick={stopResponse}
            created={onCreated}
            ref={assistInstance}
          />
        </div>
      </div>

      <div id="action-description">
        <p>This sample demonstrates rendering interactive UI tools like weather cards, charts, and grids within AI responses for enhanced data visualization.</p>
      </div>
      <div id="description">
        <p>This sample demonstrates registering custom UI tools like weather cards, charts, and grids in responses.</p>
        <ul>
          <li>The <code>addPromptResponse</code> method adds AI responses to the AIAssistView by accepting a blocks array that defines content structure. Tools are registered using <code>registerToolUI()</code>, which defines a template and handler function for rendering.</li>
          <li>Tool registration - Three registered tools deliver rich content: <code>weather-card</code> for forecast displays, <code>chart-tool</code> for GDP growth visualization, and <code>sales-grid</code> for regional performance data.</li>
          <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> - Customizes the initial banner content with icon and heading.</li>
          <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptsuggestions">promptSuggestions</a> - Provides predefined prompts for weather forecasts, sales analysis, and economic trend data.</li>
          <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> - Handles prompt execution and dynamically renders custom tools.</li>
          <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#enablestreaming">enableStreaming</a> - Enables real-time response streaming with simulated delay.</li>
        </ul>
      </div>
    </div>
  );
};

export default GenerativeUI;