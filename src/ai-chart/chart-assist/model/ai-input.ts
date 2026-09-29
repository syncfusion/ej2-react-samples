import { getAIResponse } from '../../../common/ai-service';

export type AxisType = 'category' | 'numerical' | 'datetime' | 'datetimecategory' | 'logarithmic';
export type ChartRequestType = 'create' | 'modify' | 'code' | 'analysis';
export type SeriesType =
    'line' | 'column' | 'bar' | 'area' | 'spline' | 'stepline' | 'steparea' | 'splinearea' |
    'multicoloredline' | 'multicoloredarea' | 'rangecolumn' | 'rangearea' | 'splinerangearea' |
    'hilo' | 'hiloopenclose' | 'candle' | 'boxandwhisker' | 'bubble' | 'scatter' |
    'stackingcolumn' | 'stackingcolumn100' | 'stackingbar' | 'stackingbar100' |
    'stackingarea' | 'stackingarea100' | 'stackingline' | 'stackingline100' |
    'stackingsteparea' | 'pareto' | 'polar' | 'radar' | 'waterfall' | 'histogram' |
    'pie' | 'doughnut' | 'funnel' | 'pyramid';

export interface ChartDataPoint extends Record<string, unknown> {
    xvalue: string | number | Date;
    yvalue?: number | number[];
    high?: number;
    low?: number;
    open?: number;
    close?: number;
    volume?: number;
    size?: number;
    minimum?: number;
    maximum?: number;
}

export interface AxisConfig extends Record<string, unknown> {
    type: AxisType;
    title?: string;
    labelRotation?: number;
    min?: number | string;
    max?: number | string;
    interval?: number;
    labelFormat?: string;
    stripLines?: Record<string, unknown>[];
}

export interface SeriesConfig extends Record<string, unknown> {
    type: SeriesType;
    name: string;
    dataSource: ChartDataPoint[];
    high?: string;
    low?: string;
    open?: string;
    close?: string;
    volume?: string;
    size?: string;
    min?: string;
    max?: string;
    tooltip?: boolean;
    fill?: string;
    width?: number;
    opacity?: number;
    dashArray?: string;
    innerRadius?: string;
    radius?: string;
    marker?: Record<string, unknown>;
    dataLabel?: Record<string, unknown>;
    errorBar?: Record<string, unknown>;
    trendlines?: Record<string, unknown>[];
    animation?: Record<string, unknown>;
}

export interface ChartConfig extends Record<string, unknown> {
    chartType: 'cartesian' | 'circular';
    title?: string;
    showLegend?: boolean;
    sideBySidePlacement?: boolean;
    xAxis?: AxisConfig[];
    yAxis?: AxisConfig[];
    series: SeriesConfig[];
    tooltip?: Record<string, unknown>;
    crosshair?: Record<string, unknown>;
    zoomSettings?: Record<string, unknown>;
    selectionMode?: string;
    highlightMode?: string;
    annotations?: Record<string, unknown>[];
    indicators?: Record<string, unknown>[];
    legendSettings?: Record<string, unknown>;
    chartArea?: Record<string, unknown>;
    palettes?: string[];
}

export interface ChartChange {
    property: string;
    previousValue: string;
    updatedValue: string;
}

export interface ChartResponse {
    CHART?: boolean;
    Text?: string;
    Code?: string;
    ChangedCode?: string;
    CodeTitle?: string;
    CodeDescription?: string;
    ShowCode?: boolean;
    ChangeSummary?: string[];
    ChartConfig?: ChartConfig;
}

interface TextResponseBlock {
    blockType: 'text';
    content: string;
}

interface ChartToolResponseBlock {
    blockType: 'tool';
    toolName: 'chart-tool';
    props: ChartConfig;
}

type AIResponseBlock = TextResponseBlock | ChartToolResponseBlock;

interface AIBlocksResponse {
    blocks: AIResponseBlock[];
}

const CIRCULAR_TYPES: SeriesType[] = ['pie', 'doughnut', 'funnel', 'pyramid'];
const RANGE_TYPES: SeriesType[] = ['rangecolumn', 'rangearea', 'splinerangearea', 'hilo'];
const FINANCIAL_TYPES: SeriesType[] = ['hiloopenclose', 'candle'];
const SUPPORTED_TYPES: SeriesType[] = [
    'line', 'column', 'bar', 'area', 'spline', 'stepline', 'steparea', 'splinearea',
    'multicoloredline', 'multicoloredarea', 'rangecolumn', 'rangearea', 'splinerangearea',
    'hilo', 'hiloopenclose', 'candle', 'boxandwhisker', 'bubble', 'scatter',
    'stackingcolumn', 'stackingcolumn100', 'stackingbar', 'stackingbar100',
    'stackingarea', 'stackingarea100', 'stackingline', 'stackingline100',
    'stackingsteparea', 'pareto', 'polar', 'radar', 'waterfall', 'histogram',
    'pie', 'doughnut', 'funnel', 'pyramid'
];
const INDICATOR_TYPES: Record<string, string> = {
    ema: 'Ema', rsi: 'Rsi', bollingerbands: 'BollingerBands', tma: 'Tma', momentum: 'Momentum',
    sma: 'Sma', atr: 'Atr', accumulationdistribution: 'AccumulationDistribution', macd: 'Macd', stochastic: 'Stochastic'
};

// Helper function to clone chart configuration
function cloneChartConfig(config: ChartConfig): ChartConfig {
    return JSON.parse(JSON.stringify(config));
}

// Function to apply local modifications to chart configuration
function applyLocalModification(prompt: string, config: ChartConfig): ChartConfig | null {
    const updatedConfig: ChartConfig = cloneChartConfig(config);
    
    // Handle title changes
    const titleMatch: RegExpMatchArray | null = prompt.match(/(?:change|update|set).*?title.*?(?:to\s+["'](.+?)["']|["'](.+?)["'])/i);
    if (titleMatch) {
        const newTitle: string = (titleMatch[1] || titleMatch[2] || '').trim();
        if (newTitle) {
            updatedConfig.title = newTitle;
            return updatedConfig;
        }
    }
    
    // Handle series name changes
    const seriesNameMatch: RegExpMatchArray | null = prompt.match(/(?:rename|change).*?series.*?(?:["'](.+?)["']\s+to\s+["'](.+?)["']|["'](.+?)["'])/i);
    if (seriesNameMatch) {
        const oldName: string = (seriesNameMatch[1] || seriesNameMatch[3] || '').trim();
        const newName: string = (seriesNameMatch[2] || '').trim();
        if (oldName && newName) {
            const seriesIndex: number = updatedConfig.series.findIndex(
                (series: SeriesConfig) => series.name === oldName
            );
            if (seriesIndex !== -1) {
                updatedConfig.series[seriesIndex].name = newName;
                return updatedConfig;
            }
        }
    }
    
    // Handle axis title changes
    const axisTitleMatch: RegExpMatchArray | null = prompt.match(/(?:change|update|set).*?(x|y).*?axis.*?title.*?(?:to\s+["'](.+?)["']|["'](.+?)["'])/i);
    if (axisTitleMatch) {
        const axisType: string = axisTitleMatch[1]?.toLowerCase();
        const newTitle: string = (axisTitleMatch[2] || axisTitleMatch[3] || '').trim();
        if (axisType && newTitle) {
            const axisArray: AxisConfig[] | undefined = axisType === 'x' ? updatedConfig.xAxis : updatedConfig.yAxis;
            if (axisArray && axisArray.length > 0) {
                axisArray[0].title = newTitle;
                return updatedConfig;
            }
        }
    }
    
    // Handle legend visibility changes
    if (prompt.match(/(?:show|display|enable).*?legend/i)) {
        updatedConfig.showLegend = true;
        return updatedConfig;
    }
    
    if (prompt.match(/(?:hide|remove|disable).*?legend/i)) {
        updatedConfig.showLegend = false;
        return updatedConfig;
    }
    
    // Handle tooltip visibility changes
    if (prompt.match(/(?:show|display|enable).*?tooltip/i)) {
        if (!updatedConfig.tooltip) updatedConfig.tooltip = {};
        updatedConfig.tooltip.enable = true;
        return updatedConfig;
    }
    
    if (prompt.match(/(?:hide|remove|disable).*?tooltip/i)) {
        if (!updatedConfig.tooltip) updatedConfig.tooltip = {};
        updatedConfig.tooltip.enable = false;
        return updatedConfig;
    }
    
    // Handle series color changes
    const colorMatch: RegExpMatchArray | null = prompt.match(/(?:change|update|set).*?series.*?(?:["'](.+?)["']\s+)?color.*?(?:to\s+["'](.+?)["']|["'](.+?)["'])/i);
    if (colorMatch) {
        const seriesName: string = (colorMatch[1] || '').trim();
        const newColor: string = (colorMatch[2] || colorMatch[3] || '').trim();
        if (newColor) {
            if (seriesName) {
                const seriesIndex: number = updatedConfig.series.findIndex(
                    (series: SeriesConfig) => series.name === seriesName
                );
                if (seriesIndex !== -1) {
                    updatedConfig.series[seriesIndex].fill = newColor;
                    return updatedConfig;
                }
            } else if (updatedConfig.series.length > 0) {
                updatedConfig.series[0].fill = newColor;
                return updatedConfig;
            }
        }
    }
    
    // Return null if no local modifications were applied
    return null;
}

// Function to apply public methods to chart configuration
function applyPublicMethod(config: ChartConfig, methodName: string, methodParams: any): ChartConfig | null {
    const updatedConfig: ChartConfig = cloneChartConfig(config);
    
    // Handle different public methods
    switch (methodName.toLowerCase()) {
        case 'addseries':
            if (methodParams && methodParams.series) {
                updatedConfig.series = [...updatedConfig.series, methodParams.series];
                return updatedConfig;
            }
            break;
            
        case 'removeseries':
            if (methodParams && typeof methodParams.index === 'number') {
                if (methodParams.index >= 0 && methodParams.index < updatedConfig.series.length) {
                    updatedConfig.series.splice(methodParams.index, 1);
                    return updatedConfig;
                }
            }
            break;
            
        case 'addpoint':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && methodParams.point) {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    updatedConfig.series[methodParams.seriesIndex].dataSource = [
                        ...updatedConfig.series[methodParams.seriesIndex].dataSource,
                        methodParams.point
                    ];
                    return updatedConfig;
                }
            }
            break;
            
        case 'removepoint':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && typeof methodParams.pointIndex === 'number') {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    if (methodParams.pointIndex >= 0 && methodParams.pointIndex < updatedConfig.series[methodParams.seriesIndex].dataSource.length) {
                        updatedConfig.series[methodParams.seriesIndex].dataSource.splice(methodParams.pointIndex, 1);
                        return updatedConfig;
                    }
                }
            }
            break;
            
        case 'updatepoint':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && typeof methodParams.pointIndex === 'number' && methodParams.point) {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    if (methodParams.pointIndex >= 0 && methodParams.pointIndex < updatedConfig.series[methodParams.seriesIndex].dataSource.length) {
                        updatedConfig.series[methodParams.seriesIndex].dataSource[methodParams.pointIndex] = methodParams.point;
                        return updatedConfig;
                    }
                }
            }
            break;
            
        case 'addaxis':
            if (methodParams && methodParams.axis) {
                if (updatedConfig.chartType === 'cartesian') {
                    if (!updatedConfig.xAxis) updatedConfig.xAxis = [];
                    if (!updatedConfig.yAxis) updatedConfig.yAxis = [];
                    updatedConfig.xAxis.push(methodParams.axis);
                    return updatedConfig;
                }
            }
            break;
            
        case 'removeaxis':
            if (methodParams && methodParams.name) {
                if (updatedConfig.chartType === 'cartesian' && updatedConfig.xAxis && updatedConfig.yAxis) {
                    updatedConfig.xAxis = updatedConfig.xAxis.filter((axis: AxisConfig) => axis.name !== methodParams.name);
                    updatedConfig.yAxis = updatedConfig.yAxis.filter((axis: AxisConfig) => axis.name !== methodParams.name);
                    return updatedConfig;
                }
            }
            break;
            
        case 'updateaxis':
            if (methodParams && methodParams.name && methodParams.axis) {
                if (updatedConfig.chartType === 'cartesian' && updatedConfig.xAxis && updatedConfig.yAxis) {
                    updatedConfig.xAxis = updatedConfig.xAxis.map((axis: AxisConfig) => 
                        axis.name === methodParams.name ? {...axis, ...methodParams.axis} : axis);
                    updatedConfig.yAxis = updatedConfig.yAxis.map((axis: AxisConfig) => 
                        axis.name === methodParams.name ? {...axis, ...methodParams.axis} : axis);
                    return updatedConfig;
                }
            }
            break;
            
        case 'addannotation':
            if (methodParams && methodParams.annotation) {
                if (!updatedConfig.annotations) updatedConfig.annotations = [];
                updatedConfig.annotations.push(methodParams.annotation);
                return updatedConfig;
            }
            break;
            
        case 'removeannotation':
            if (methodParams && methodParams.id) {
                if (updatedConfig.annotations) {
                    updatedConfig.annotations = updatedConfig.annotations.filter((annotation: any) => annotation.id !== methodParams.id);
                    return updatedConfig;
                }
            }
            break;
            
        case 'select':
            // This is a runtime method that doesn't affect the configuration
            return updatedConfig;
            
        case 'clearselection':
            // This is a runtime method that doesn't affect the configuration
            return updatedConfig;
            
        case 'zoomin':
        case 'zoomout':
        case 'resetzoom':
            // These are runtime methods that don't affect the configuration
            return updatedConfig;
            
        case 'showtooltip':
        case 'hidetooltip':
            // These are runtime methods that don't affect the configuration
            return updatedConfig;
            
        case 'toggleseriesvisibility':
            // This affects the series visibility property
            if (methodParams && typeof methodParams.seriesIndex === 'number') {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    updatedConfig.series[methodParams.seriesIndex].visible = 
                        !(updatedConfig.series[methodParams.seriesIndex].visible !== false);
                    return updatedConfig;
                }
            }
            break;
            
        case 'animate':
        case 'resize':
            // These are runtime methods that don't affect the configuration
            return updatedConfig;
            
        case 'setdatasource':
            if (methodParams && methodParams.dataSource) {
                updatedConfig.series = updatedConfig.series.map((series: SeriesConfig) => ({
                    ...series,
                    dataSource: methodParams.dataSource
                }));
                return updatedConfig;
            }
            break;
            
        case 'setseriesdata':
            if (methodParams && typeof methodParams.seriesIndex === 'number' && methodParams.dataSource) {
                if (methodParams.seriesIndex >= 0 && methodParams.seriesIndex < updatedConfig.series.length) {
                    updatedConfig.series[methodParams.seriesIndex].dataSource = methodParams.dataSource;
                    return updatedConfig;
                }
            }
            break;
    }
    
    // Return null if the method wasn't handled or parameters were invalid
    return null;
}

// Function to build a code response from chart configuration
function buildCodeResponse(config: ChartConfig): ChartResponse {
    return {
        CHART: false,
        Code: JSON.stringify(config, null, 2),
        CodeTitle: 'Chart Configuration',
        CodeDescription: 'Complete chart configuration JSON',
        ShowCode: true
    };
}

// Function to build a modification response
function buildModificationResponse(
    prompt: string,
    originalConfig: ChartConfig,
    updatedConfig: ChartConfig
): ChartResponse {
    return {
        CHART: true,
        Text: `Applied modification: ${prompt}`,
        ChartConfig: updatedConfig
    };
}

// Function to normalize prompt
function normalizePrompt(prompt: string): string {
    return prompt.trim().replace(/\s+/g, ' ');
}

// Function to check if it's an incomplete create request
function isIncompleteCreateRequest(prompt: string): boolean {
    const lowerPrompt: string = prompt.toLowerCase();
    return (
        lowerPrompt.includes('create') &&
        !lowerPrompt.includes('chart') &&
        !lowerPrompt.includes('graph') &&
        !lowerPrompt.includes('plot') &&
        !lowerPrompt.includes('visualize') &&
        !lowerPrompt.includes('show') &&
        !lowerPrompt.includes('display')
    );
}

// Function to get data addition clarification
function getDataAdditionClarification(prompt: string): string | null {
    const lowerPrompt: string = prompt.toLowerCase();
    if (
        lowerPrompt.includes('data') &&
        (lowerPrompt.includes('add') || lowerPrompt.includes('include')) &&
        !lowerPrompt.includes('from') &&
        !lowerPrompt.includes('with') &&
        !lowerPrompt.includes('using')
    ) {
        return 'Please specify the data source for the chart.';
    }
    return null;
}

// Function to get request type
function getRequestType(prompt: string, existingConfig: ChartConfig | null): ChartRequestType {
    const lowerPrompt: string = prompt.toLowerCase();
    
    if (lowerPrompt.includes('code') || lowerPrompt.includes('json') || lowerPrompt.includes('configuration')) {
        return 'code';
    }
    
    if (existingConfig && (lowerPrompt.includes('modify') || lowerPrompt.includes('change') || lowerPrompt.includes('update'))) {
        return 'modify';
    }
    
    if (lowerPrompt.includes('analyze') || lowerPrompt.includes('explain') || lowerPrompt.includes('describe')) {
        return 'analysis';
    }
    
    return 'create';
}

// Function to check if it's a chart request
function isChartRequest(prompt: string): boolean {
    const lowerPrompt: string = prompt.toLowerCase();
    return (
        lowerPrompt.includes('chart') ||
        lowerPrompt.includes('graph') ||
        lowerPrompt.includes('plot') ||
        lowerPrompt.includes('visualize') ||
        lowerPrompt.includes('show') ||
        lowerPrompt.includes('display') ||
        lowerPrompt.includes('create')
    );
}

// Function to get requested series type
function getRequestedSeriesType(prompt: string): SeriesType | null {
    const lowerPrompt: string = prompt.toLowerCase();
    
    for (const type of SUPPORTED_TYPES) {
        if (lowerPrompt.includes(type)) {
            return type;
        }
    }
    
    return null;
}

// Function to build modification prompt
function buildModificationPrompt(prompt: string, config: ChartConfig): string {
    return `Modify the following chart configuration based on this request: "${prompt}"
    
Current chart configuration:
${JSON.stringify(config, null, 2)}`;
}

// Function to get AI response text
function getAIResponseText(raw: unknown): string {
    if (typeof raw === 'string') {
        return raw;
    }
    if (raw && typeof raw === 'object') {
        // getAIResponse returns the full result envelope { response, model, usage }
        // when a systemPrompt is supplied. Prefer the inner response string so the
        // caller can parse the chart JSON it contains.
        const responseField: unknown = (raw as { response?: unknown }).response;
        if (typeof responseField === 'string') {
            return responseField;
        }
        if ('content' in raw) {
            return (raw as { content: string }).content;
        }
    }
    return JSON.stringify(raw);
}

// Function to extract JSON from response text
function extractJson(text: string): string {
    if (!text) {
        return '';
    }
    // Strip markdown code fences if present, then locate the outermost JSON object.
    const trimmed: string = text.replace(/^\uFEFF/, '').trim();
    const fenced: string | undefined = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();
    if (fenced) {
        return fenced;
    }
    const firstBrace: number = trimmed.indexOf('{');
    const lastBrace: number = trimmed.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
        return trimmed;
    }
    return trimmed.slice(firstBrace, lastBrace + 1);
}

// Function to validate chart configuration
function isChartConfig(value: unknown): value is ChartConfig {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const config: Partial<ChartConfig> = value as Partial<ChartConfig>;
    if (config.chartType !== 'cartesian' && config.chartType !== 'circular') {
        return false;
    }
    if (!Array.isArray(config.series) || config.series.length === 0) {
        return false;
    }

    return config.series.every((series: SeriesConfig) => {
        return Boolean(
            series &&
            typeof series === 'object' &&
            typeof series.type === 'string' &&
            typeof series.name === 'string' &&
            series.name.trim() &&
            Array.isArray(series.dataSource) &&
            series.dataSource.length > 0
        );
    });
}

// Function to check whether the response uses the blocks schema
function isBlocksResponse(value: unknown): value is AIBlocksResponse {
    if (!value || typeof value !== 'object') {
        return false;
    }
    return Array.isArray((value as AIBlocksResponse).blocks);
}

// Function to convert the AI blocks schema to the ChartResponse used by the renderer
function convertBlocksResponse(response: AIBlocksResponse): ChartResponse | undefined {
    const textBlock: TextResponseBlock | undefined = response.blocks.find(
        (block: AIResponseBlock): block is TextResponseBlock => {
            return block.blockType === 'text' &&
                typeof block.content === 'string' &&
                block.content.trim().length > 0;
        }
    );
    const chartBlock: ChartToolResponseBlock | undefined = response.blocks.find(
        (block: AIResponseBlock): block is ChartToolResponseBlock => {
            return block.blockType === 'tool' &&
                block.toolName === 'chart-tool' &&
                isChartConfig(block.props);
        }
    );

    if (chartBlock) {
        return {
            CHART: true,
            Text: textBlock?.content || 'The requested chart has been generated.',
            ChartConfig: chartBlock.props
        };
    }
    if (textBlock) {
        return {
            CHART: false,
            Text: textBlock.content
        };
    }
    return undefined;
}

// Function to normalize response
function normalizeResponse(json: string): ChartResponse | undefined {
    const trimmedResponse: string = json.trim();
    if (!trimmedResponse) {
        console.error('The AI service returned an empty response.');
        return undefined;
    }
    if (!trimmedResponse.startsWith('{') && !trimmedResponse.startsWith('[')) {
        console.error('The AI service returned a non-JSON response:', trimmedResponse);
        return undefined;
    }

    try {
        const parsed: unknown = JSON.parse(trimmedResponse);
        if (isBlocksResponse(parsed)) {
            return convertBlocksResponse(parsed);
        }
        if (parsed && typeof parsed === 'object') {
            const response: ChartResponse = parsed as ChartResponse;
            if (response.ChartConfig && !isChartConfig(response.ChartConfig)) {
                console.error('The AI response contains an invalid chart configuration.');
                return undefined;
            }
            return response;
        }
    } catch (error) {
        console.error('Failed to parse AI response:', error, trimmedResponse);
    }
    return undefined;
}

export async function fetchChartConfig(
    prompt: string,
    existingConfig?: ChartConfig | null,
    controller?: AbortController
): Promise<ChartResponse> {
    const signal: AbortSignal | undefined = controller?.signal;
    const normalizedPrompt: string = normalizePrompt(prompt);
    if (!normalizedPrompt) {
        return { CHART: false, Text: 'Enter a chart request or modification.' };
    }
    if (isIncompleteCreateRequest(normalizedPrompt)) {
        return {
            CHART: false,
            Text: 'Please specify the chart you want to create. For example: "Create a pie chart showing product category distribution."'
        };
    }
    const clarification: string | null = getDataAdditionClarification(normalizedPrompt);
    if (clarification) {
        return { CHART: false, Text: clarification };
    }
    const requestType: ChartRequestType = getRequestType(normalizedPrompt, existingConfig);
    if (requestType === 'code' && existingConfig) {
        return buildCodeResponse(existingConfig);
    }
    if (requestType === 'modify' && existingConfig) {
        // First try to apply local modifications
        const locallyUpdated: ChartConfig | null = applyLocalModification(normalizedPrompt, existingConfig);
        if (locallyUpdated) {
            return buildModificationResponse(normalizedPrompt, existingConfig, locallyUpdated);
        }
        
        // If local modifications didn't work, try to apply public methods
        const methodMatch: RegExpMatchArray | null = normalizedPrompt.match(/(?:call|invoke|execute|run|apply)\s+(.+?)\s+method/i);
        if (methodMatch) {
            const methodName: string = methodMatch[1].trim();
            // Extract method parameters from the prompt (simplified approach)
            const methodParams: any = {};
            const paramsMatch: RegExpMatchArray | null = normalizedPrompt.match(/with\s+parameters?\s+(.+)/i);
            if (paramsMatch) {
                try {
                    // Try to parse parameters as JSON
                    methodParams.params = JSON.parse(paramsMatch[1].trim());
                } catch (e) {
                    // If parsing fails, use the raw string
                    methodParams.params = paramsMatch[1].trim();
                }
            }
            const methodUpdated: ChartConfig | null = applyPublicMethod(existingConfig, methodName, methodParams);
            if (methodUpdated) {
                return buildModificationResponse(normalizedPrompt, existingConfig, methodUpdated);
            }
        }
    }
    if (requestType === 'create' && !isChartRequest(normalizedPrompt)) {
        return { CHART: false, Text: 'Describe the chart or visualization you want to create.' };
    }
    const requestedType: SeriesType | null = getRequestedSeriesType(normalizedPrompt);
    const circularRequest: boolean = requestType === 'modify'
        ? existingConfig?.chartType === 'circular' && !requestedType
        : Boolean(requestedType && CIRCULAR_TYPES.includes(requestedType));
    const aiPrompt: string = requestType === 'modify' && existingConfig
        ? buildModificationPrompt(prompt, existingConfig)
        : prompt;
    let responseText: string = '';
    try {
        const raw: unknown = await getAIResponse({
            prompt: aiPrompt,
            systemPrompt: chartSystemPrompt
        }, controller);
        responseText = getAIResponseText(raw);
        if (!responseText.trim()) {
            return {
                CHART: false,
                Text: 'The AI service returned an empty response. Please try again.'
            };
        }

        const trimmedResponse: string = responseText.trim();
        if (!trimmedResponse.startsWith('{') && !trimmedResponse.startsWith('```')) {
            console.error('The AI service returned a non-JSON response:', responseText);
            const lowerResponse: string = trimmedResponse.toLowerCase();
            if (
                lowerResponse.includes('forbidden') ||
                lowerResponse.includes('unauthorized') ||
                lowerResponse.includes('access denied')
            ) {
                return {
                    CHART: false,
                    Text: 'The AI service rejected the request. Verify the API authorization and server access configuration.'
                };
            }
            if (
                lowerResponse.includes('rate limit') ||
                lowerResponse.includes('quota') ||
                lowerResponse.includes('too many requests') ||
                lowerResponse.includes('you have reached')
            ) {
                return {
                    CHART: false,
                    Text: 'The AI service request limit has been reached. Please try again later.'
                };
            }
        }
    } catch (error) {
        if (signal?.aborted) {
            throw error;
        }
        console.error('Unable to retrieve the AI chart response:', error);
        return {
            CHART: false,
            Text: 'Unable to contact the AI service. Verify the API endpoint, authorization, and network configuration.'
        };
    }

    const extractedResponse: string = extractJson(responseText);
    const normalizedResponse: ChartResponse | undefined = normalizeResponse(extractedResponse);
    if (normalizedResponse) {
        return normalizedResponse;
    }
    return {
        CHART: false,
        Text: 'The AI service did not return valid chart data. Verify the server response and try again.'
    };
}

// Chart system prompt with comprehensive API information
export const chartSystemPrompt: string = `
You are an expert AI Chart Assistant integrated into the Syncfusion React AI AssistView component. Determine whether the user is requesting chart generation, data-to-chart conversion, chart modification, or chart analysis.

Always return exactly one valid JSON object. Do not include markdown, code fences, comments, explanations, JavaScript, TypeScript, React markup, HTML, or text outside the JSON object.

For chart generation, data-to-chart conversion, and chart modification requests, return exactly this block structure:
{
  "blocks": [
    {
      "blockType": "text",
      "content": "Concise description of the generated chart or applied modification"
    },
    {
      "blockType": "tool",
      "toolName": "chart-tool",
      "props": {
        "chartType": "cartesian",
        "title": "Meaningful chart title",
        "showLegend": true,
        "sideBySidePlacement": true,
        "legendSettings": {
          "visible": true,
          "position": "Auto"
        },
        "chartArea": {
          "border": {
            "width": 0
          }
        },
        "tooltip": {
          "enable": true,
          "shared": false,
          "enableMarker": true
        },
        "crosshair": {
          "enable": false,
          "lineType": "Both"
        },
        "zoomSettings": {
          "enableSelectionZooming": false,
          "enableMouseWheelZooming": false,
          "enablePinchZooming": false,
          "enablePan": false,
          "enableScrollbar": false,
          "mode": "XY"
        },
        "selectionMode": "None",
        "highlightMode": "None",
        "palettes": [
          "#1089E9",
          "#08CDAA"
        ],
        "xAxis": [
          {
            "type": "category",
            "title": "X-axis title",
            "labelRotation": 0,
            "stripLines": [
              {
                "start": 1,
                "size": 1,
                "color": "#808080",
                "opacity": 0.25,
                "visible": true,
                "zIndex": "Behind",
                "text": "Target range"
              }
            ]
          }
        ],
        "yAxis": [
          {
            "type": "numerical",
            "title": "Y-axis title",
            "min": 0,
            "stripLines": []
          }
        ],
        "annotations": [
          {
            "content": "Peak value",
            "coordinateUnits": "Point",
            "region": "Chart",
            "x": "Dec",
            "y": 100
          }
        ],
        "indicators": [
          {
            "type": "Sma",
            "seriesName": "Series name",
            "xName": "xvalue",
            "close": "yvalue",
            "high": "high",
            "low": "low",
            "open": "open",
            "volume": "volume",
            "period": 14,
            "fill": "#6063ff",
            "width": 2
          }
        ],
        "series": [
          {
            "type": "line",
            "name": "Series name",
            "dataSource": [
              {
                "xvalue": "Sample",
                "yvalue": 100
              }
            ],
            "tooltip": true,
            "fill": "#1089E9",
            "width": 2,
            "opacity": 1,
            "dashArray": "",
            "marker": {
              "visible": true,
              "width": 7,
              "height": 7,
              "shape": "Circle",
              "isFilled": true,
              "dataLabel": {
                "visible": false
              }
            },
            "dataLabel": {
              "visible": false
            },
            "errorBar": {
              "visible": false
            },
            "trendlines": [],
            "animation": {
              "enable": true
            }
          }
        ]
      }
    }
  ]
}

For chart analysis requests that do not request a generated or modified chart, return exactly this text-only JSON structure:
{
  "blocks": [
    {
      "blockType": "text",
      "content": "Concise chart analysis"
    }
  ]
}

Comprehensive API Information for Chart Components:
Primary X-Axis Properties:
- title: string (axis title)
- labelRotation: number (rotation angle for labels)
- labelStyle: { color: string, fontFamily: string, fontSize: string, fontWeight: string }
- range: { minimum: number, maximum: number, interval: number }
- visible: boolean (visibility of axis)
- opposedPosition: boolean (position on opposite side)
- valueType: string (category, dateTime, dateTimeCategory, logarithmic, double)
- labelFormat: string (format for labels)
- majorGridLines: { width: number, color: string, dashArray: string }
- minorGridLines: { width: number, color: string, dashArray: string }
- majorTickLines: { width: number, color: string, size: number }
- minorTickLines: { width: number, color: string, size: number }
- lineStyle: { width: number, color: string, dashArray: string }
- stripLines: array of strip line objects

Data Label Properties:
- visible: boolean (visibility of data labels)
- position: string (inside, outside, auto, top, bottom, middle, etc.)
- font: { color: string, fontFamily: string, fontSize: string, fontWeight: string }
- margin: { left: number, right: number, top: number, bottom: number }
- border: { color: string, width: number }
- rx: number (horizontal corner radius)
- ry: number (vertical corner radius)
- backgroundColor: string (background color)

Marker Properties:
- visible: boolean (visibility of markers)
- shape: string (circle, rectangle, triangle, diamond, pentagon, verticalLine, horizontalLine, etc.)
- size: { height: number, width: number }
- fill: string (fill color)
- border: { color: string, width: number }

Scrollbar Settings:
- enableZoom: boolean (enable zooming)
- enableScroll: boolean (enable scrolling)
- height: number (height of scrollbar)
- width: number (width of scrollbar)
- color: string (color of scrollbar)
- borderColor: string (border color of scrollbar)
- borderWidth: number (border width of scrollbar)

Stack Label Settings:
- visible: boolean (visibility of stack labels)
- format: string (format for stack labels)
- font: { color: string, fontFamily: string, fontSize: string, fontWeight: string }
- textAlignment: string (near, center, far)
- margin: { left: number, right: number, top: number, bottom: number }
- border: { color: string, width: number }
  rx: number (horizontal corner radius)
  ry: number (vertical corner radius)
  backgroundColor: string (background color)

Rules:
1. Always return one root JSON object containing exactly one "blocks" array. Never return plain text outside JSON.
2. For chart-producing requests, return exactly two blocks in this order: one nonempty text block followed by one "chart-tool" block.
3. For analysis-only requests, return exactly one nonempty text block and omit all tool blocks.
4. Use only "chart-tool" for chart output. Never return "code-tool", "change-summary-tool", or another tool name. The React application generates code and change summaries locally.
5. The chart-tool props must contain the complete chart configuration, including a meaningful title, a nonempty series array, and nonempty dataSource arrays.
6. Use "cartesian" for axis-based trends, comparisons, distributions, financial data, ranges, relationships, and values.
7. Use "circular" only for Pie, Doughnut, Funnel, and Pyramid series.
8. Cartesian charts must include nonempty xAxis and yAxis arrays.
9. Circular charts must omit xAxis, yAxis, crosshair, zoomSettings, indicators, axis strip lines, error bars, and trendlines.
10. Do not mix Cartesian and circular series in one chart configuration.
11. Use lowercase schema values for chartType, axis type, and series type. Use the documented PascalCase values for selection, highlighting, annotation, strip-line, zoom, and indicator settings.
12. Supported Cartesian series types are "line", "column", "bar", "area", "spline", "stepline", "steparea", "splinearea", "multicoloredline", "multicoloredarea", "rangecolumn", "rangearea", "splinerangearea", "hilo", "hiloopenclose", "candle", "boxandwhisker", "bubble", "scatter", "stackingcolumn", "stackingcolumn100", "stackingbar", "stackingbar100", "stackingarea", "stackingarea100", "stackingline", "stackingline100", "stackingsteparea", "pareto", "polar", "radar", "waterfall", and "histogram".
13. Supported circular series types are "pie", "doughnut", "funnel", and "pyramid".
14. Infer the most suitable series type. Use line, spline, or step line for trends; column or bar for comparisons; area for magnitude over time; stacking series for composition across categories; scatter or bubble for relationships; histogram for distributions; range series for intervals; financial series for market data; and circular series for part-to-whole or progressive-stage data.
15. Every series must contain a meaningful name and at least one valid data point.
16. Every data point must contain "xvalue". Do not return "x", "xField", "yField", or ordinary-series "xName" and "yName" mapping properties.
17. Ordinary series points must contain a finite numeric "yvalue".
18. Range Column, Range Area, Spline Range Area, and Hilo points must contain finite numeric "high" and "low" values. A redundant yvalue is not required.
19. Hilo Open Close and Candle points must contain finite numeric "high", "low", "open", and "close" values. Include "volume" when available or required.
20. Bubble points must contain finite numeric "yvalue" and "size" values.
21. Box-and-Whisker points must contain "yvalue" as a nonempty array of finite numbers.
22. Use the specialized series mapping names "high", "low", "open", "close", "volume", "size", "min", and "max" only when required by the selected series type.
23. Preserve every valid user-supplied value, category, date, series name, title, axis setting, feature, and explicitly requested style.
24. When the user supplies no data values, generate realistic representative sample data relevant to the request. Clearly identify representative data in the text block.
25. Never replace user-supplied data with representative data.
26. For yearly monthly trends, generate all 12 months unless the user requests another period. For quarterly trends, generate all four quarters.
27. When multiple groups or measures are supplied, create separate series with consistent xvalue categories.
28. Use meaningful chart and axis titles. Do not display "xvalue" or "yvalue" as an axis title.
29. Use a Category axis for textual categories, a Numerical axis only when every X value is numeric, a DateTime axis only for unambiguous ISO 8601 dates, and a DateTimeCategory axis when date order and category spacing must be preserved.
30. Use a Logarithmic axis only when all applicable values are positive and span a sufficiently large range.
31. Include axis minimum and maximum bounds only when requested or clearly appropriate. When both are provided, minimum must be less than maximum.
32. Strip lines belong inside the applicable xAxis or yAxis item. Include valid "start", positive "size", "color", "opacity", "visible", and "zIndex" values. Include "text" only when a label is needed.
33. For a category-axis strip line, use valid category-index positions when required by the renderer. Do not invent a category absent from the series data.
34. Do not add duplicate strip lines during a modification. Circular charts must not contain strip lines.
35. Annotation "content" must contain plain text only. Never return HTML, React markup, a CSS selector, an element ID, encoded markup, or a template reference.
36. Point annotation coordinates must match an existing xvalue and a valid Y value. Use "Point" or "Pixel" for coordinateUnits and "Chart" or "Series" for region.
37. The React application renders annotation content through an inline React template. Do not return external annotation-template elements.
38. If custom tooltip content is requested, return supported plain tooltip settings only. Never return HTML, React markup, an external element ID, a CSS selector, or template values such as "#Female-Material".
39. Zoom is supported only for Cartesian charts. Use enableSelectionZooming, enableMouseWheelZooming, enablePinchZooming, enablePan, enableScrollbar, and mode only as requested or already configured.
40. Crosshair is supported only for Cartesian charts. Use "Both", "Vertical", or "Horizontal" for lineType.
41. Allowed selectionMode values are "None", "Point", "Series", "Cluster", "DragXY", "DragX", and "DragY". Allowed highlightMode values are "None", "Point", "Series", and "Cluster".
42. Supported indicators are "Ema", "Rsi", "BollingerBands", "Tma", "Momentum", "Sma", "Atr", "AccumulationDistribution", "Macd", and "Stochastic".
43. Indicators are valid only for compatible Cartesian series. "seriesName" must exactly match an existing series name, "xName" must be "xvalue", and "period" must be a positive number.
44. For ordinary numerical series indicators, use "close": "yvalue". For financial indicators, use the appropriate "close", "high", "low", "open", and "volume" mappings.
45. For data labels, use marker.dataLabel for Cartesian series and series.dataLabel for circular series when applicable.
46. Add error bars and trendlines only to compatible Cartesian series and only when requested, already configured, or required.
47. Use "doughnut" as the series type for Doughnut charts. The React renderer maps it to a Pie accumulation series and applies a nonzero innerRadius.
48. Use sideBySidePlacement true for grouped Column or Bar comparisons unless the user explicitly requests overlap or the existing configuration uses another setting.
49. Default showLegend to true, tooltip.enable to true, selectionMode to "None", and highlightMode to "None" unless the user requests otherwise.
50. Preserve marker, dataLabel, errorBar, trendlines, animation, fill, width, opacity, dashArray, innerRadius, radius, chartArea, legendSettings, and palettes when already configured.
51. For chart modifications, treat the supplied existing configuration as the source of truth.
52. For modifications, return the complete updated chart configuration, not only changed properties.
53. Preserve every property, series, data point, axis, feature, and style not explicitly changed.
54. Do not remove tooltip, legend, crosshair, zoom, selection, highlighting, annotations, strip lines, indicators, data labels, error bars, trendlines, animation, chart area, palettes, or specialized mappings unless explicitly requested.
55. Do not create a second chart, an additional chart-tool block, or a duplicate unchanged chart for one modification request.
56. If a requested modification cannot be applied unambiguously, return a text-only blocks response explaining the required information. Do not return an unchanged chart-tool block.
57. Do not return empty required strings, empty series arrays, empty dataSource arrays, undefined values, null numeric values, NaN, Infinity, JavaScript functions, or trailing commas.
58. Do not add unsupported properties or properties disallowed by the supplied structured-output schema.
59. For chart creation, the text block must briefly identify the chart type, represented data, and whether the values are user-provided or representative. Mention the series count when multiple series are present.
60. For chart modification, the text block must describe only the applied changes. Do not repeat the full chart analysis.
61. Before responding, validate the block count and order, tool name, chart family, required axes, series compatibility, specialized point fields, finite values, indicator compatibility, annotation content, strip lines, and preservation of all unrequested settings.
62. When handling font properties for data labels, use the font object with color, fontFamily, fontSize, and fontWeight properties.
63. When handling axis title properties, use the title property directly on the axis object.
64. When handling label rotation, use the labelRotation property on the axis object with values between -360 and 360.
65. When handling axis range properties, use the minimum, maximum, and interval properties on the axis object.
66. When handling axis visibility, use the visible property on the axis object.
67. When handling marker properties, use the marker object with visible, shape, size, fill, and border properties.
68. When handling scrollbar settings, use the scrollbarSettings object with enableZoom, enableScroll, height, width, color, borderColor, borderWidth properties.
69. When handling stack label settings, use the stackLabel object with visible, format, font, textAlignment, margin, border, rx, ry, and backgroundColor properties.
`.trim();