import * as React from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2/base';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject as ChartInject, LineSeries, DateTime, Legend, Tooltip, Category, StackingColumnSeries, Selection, Highlight } from '@syncfusion/ej2-react-charts';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import * as data from './promptResponseData.json';
import { getAIResponse } from '../common/ai-service';
import './ai-generative-ui.css';
import * as ReactDOM from 'react-dom/client';

export class GenerativeUI extends SampleBase<{}, {}> {
  generativeSuggestions: string[] = data["generativeSuggestions"];
  toolSystemPrompt: any = data["toolSystemPrompt"];
  promptsData: any = data["promptsData"];
  currentChartConfig: any = {};
  currentGridConfig: any = {};

  assistInstance: AIAssistViewComponent;
  abortController: AbortController | undefined;

  toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
    if (args.item.iconCss === 'e-icons e-refresh') {
      this.assistInstance.prompts = [];
      this.assistInstance.promptSuggestions = this.generativeSuggestions;
      this.stopResponse();
    }
  };

  assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: this.toolbarItemClicked
  };

  bannerTemplate: string = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>AI Assistance Generative UI</h3>
    <i>Render interactive tools such as weather cards, charts, data grids etc directly inside AI responses.</i>
  </div>`;

  processChartConfig = (args: any): void => {
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

    this.currentChartConfig = chartConfig;
  };

  processGridConfig = (args: any): void => {
    const data = args.data || [];

    const gridConfig = {
      data,
      columns:
        args.columns ||
        (data.length
          ? Object.keys(data[0]).map((field: string) => ({
              field,
              headerText: field,
              width: 150
            }))
          : [])
    };

    this.currentGridConfig = gridConfig;
  };

  // Matches the .ts pattern: register tools in `created`, then set prompts imperatively
  // so tools are always registered before prompts are rendered
  onCreated = (): void => {
    this.registerToolUIs();
    this.assistInstance.prompts = this.promptsData;
  };

  private registerToolUIs(): void {

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

    this.assistInstance.registerToolUI({
      toolName: 'weather-card',
      template: WeatherTemplate ,
    });

    const ChartTemplate = (args: any) => (
      <ChartComponent
        id="generativeChart"
        primaryXAxis={{
          valueType: 'Category',
          title:
            this.currentChartConfig.xAxisTitle ||
            this.currentChartConfig.xField,
          labelIntersectAction: 'Rotate45',
          majorGridLines: { width: 0 },
          minorGridLines: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          lineStyle: { width: 0 }
        }}
        primaryYAxis={{
          title:
            this.currentChartConfig.yAxisTitle ||
            this.currentChartConfig.yField,
          majorGridLines: { width: 1 },
          minorGridLines: { width: 1 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          lineStyle: { width: 0 }
        }}
        tooltip={{
          enable: this.currentChartConfig.enableTooltip !== false
        }}
        legendSettings={{
          visible: this.currentChartConfig.enableLegend !== false
        }}
        chartArea={{ border: { width: 0 } }}
        title={this.currentChartConfig.title}
      >
        <ChartInject services={[LineSeries, DateTime, Legend, Tooltip, StackingColumnSeries, Category, Selection, Highlight]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={this.currentChartConfig.dataSource}
            xName={this.currentChartConfig.xField}
            yName={this.currentChartConfig.yField}
            type={this.currentChartConfig.chartType}
            marker={{ visible: true }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    );

    this.assistInstance.registerToolUI({
      toolName: 'chart-tool',
      template: ChartTemplate,
      handler: (container: HTMLElement, args: any) => {
        this.processChartConfig(args);
      }
    });

    const GridTemplate = (args: any) => (
      <GridComponent
        dataSource={this.currentGridConfig.data}
        allowPaging={false}
        pageSettings={{ pageSize: 8 }}
        width="fit-content"
      >
        <ColumnsDirective>
          {this.currentGridConfig.columns?.map((column: any, index: number) => (
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

    this.assistInstance.registerToolUI({
      toolName: 'sales-grid',
      template: GridTemplate,
      handler: (container: HTMLElement, args: any) => {
        this.processGridConfig(args);
      }
    });
  }

  promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
      this.abortController = new AbortController();
      try {
        const aiArgs = {
          prompt: args.prompt,
          systemPrompt: this.toolSystemPrompt
        };
      
        const reply = await getAIResponse(aiArgs, this.abortController);
      
        const jsonText = reply.response || '{}';
      
        const aiData = JSON.parse(jsonText);
      
        this.assistInstance.addPromptResponse({
          blocks: aiData.blocks || [
            {
              blockType: 'text',
              content: 'We could not reach the AI service; please try again later.'
            }
          ]
        });
      } catch (error) {
        this.assistInstance.addPromptResponse({
          blocks: [
            {
              blockType: 'text',
              content: 'We could not reach the AI service; please try again later.'
            }
          ]
        });
      }
    };

  stopResponse = () => {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className="control-section">
          <div className="generative-aiassistview">
            <AIAssistViewComponent
              id="aiAssistView"
              bannerTemplate={this.bannerTemplate}
              promptSuggestionsHeader="Suggested Prompts"
              promptSuggestions={this.generativeSuggestions}
              enableStreaming={true}
              showClearButton={true}
              toolbarSettings={this.assistViewToolbarSettings}
              promptRequest={this.promptRequest}
              stopRespondingClick={this.stopResponse}
              created={this.onCreated}
              ref={(aiassistView) => (this.assistInstance = aiassistView)}
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
  }
}