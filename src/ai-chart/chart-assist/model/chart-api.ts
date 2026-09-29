/**
 * Comprehensive mapping of Syncfusion Chart public APIs for AI processing.
 * Organized by component and categorized by property, method, and event types.
 */

// Chart Component APIs
export const chartPublicAPIs = {
    properties: {
        // Primary Properties
        width: {
            type: 'string | number',
            description: 'Width of the chart'
        },
        height: {
            type: 'string | number',
            description: 'Height of the chart'
        },
        title: {
            type: 'string',
            description: 'Title of the chart'
        },
        subTitle: {
            type: 'string',
            description: 'Sub-title of the chart'
        },
        theme: {
            type: 'string',
            description: 'Theme of the chart',
            values: ['Material', 'Fabric', 'Bootstrap', 'HighContrastLight', 'MaterialDark', 'FabricDark', 'BootstrapDark', 'Bootstrap4', 'Bootstrap5', 'Fluent', 'FluentDark']
        },
        locale: {
            type: 'string',
            description: 'Locale of the chart'
        },
        dataSource: {
            type: 'any[]',
            description: 'Data source of the chart'
        },
        
        // Chart Area
        chartArea: {
            type: 'object',
            properties: {
                background: 'string',
                border: 'object',
                opacity: 'number'
            },
            description: 'Options to customize the chart area'
        },
        
        // Margin
        margin: {
            type: 'object',
            properties: {
                left: 'number',
                right: 'number',
                top: 'number',
                bottom: 'number'
            },
            description: 'Margin of the chart'
        },
        
        // Border
        border: {
            type: 'object',
            properties: {
                color: 'string',
                width: 'number'
            },
            description: 'Border of the chart'
        },
        
        // Background
        background: {
            type: 'string',
            description: 'Background color of the chart'
        },
        
        // Selection
        selectionMode: {
            type: 'string',
            description: 'Mode of selection',
            values: ['None', 'Point', 'Series', 'Cluster', 'DragXY', 'DragX', 'DragY']
        },
        
        // Highlight
        highlightMode: {
            type: 'string',
            description: 'Mode of highlight',
            values: ['None', 'Point', 'Series', 'Cluster']
        },
        
        // Crosshair
        crosshair: {
            type: 'object',
            properties: {
                enable: 'boolean',
                lineType: 'string',
                fill: 'string',
                lineWidth: 'number',
                lineDashArray: 'string'
            },
            description: 'Options to customize the crosshair'
        },
        
        // Zoom
        zoomSettings: {
            type: 'object',
            properties: {
                enableSelectionZooming: 'boolean',
                enableMouseWheelZooming: 'boolean',
                enablePinchZooming: 'boolean',
                enablePan: 'boolean',
                enableScrollbar: 'boolean',
                mode: 'string'
            },
            description: 'Options to customize the zooming'
        },
        
        // Tooltip
        tooltip: {
            type: 'object',
            properties: {
                enable: 'boolean',
                shared: 'boolean',
                enableMarker: 'boolean',
                header: 'string',
                format: 'string'
            },
            description: 'Options to customize the tooltip'
        },
        
        // Legend
        legendSettings: {
            type: 'object',
            properties: {
                visible: 'boolean',
                position: 'string',
                alignment: 'string',
                height: 'string',
                width: 'string'
            },
            description: 'Options to customize the legend'
        },
        
        // Palettes
        palettes: {
            type: 'string[]',
            description: 'Palette for the chart'
        }
    },
    
    methods: {
        // Export Methods
        export: {
            description: 'Export the chart to various formats',
            parameters: [
                { name: 'type', type: 'string', description: 'Export type (PNG, JPEG, SVG, PDF)' },
                { name: 'fileName', type: 'string', description: 'File name for the exported file' }
            ]
        },
        print: {
            description: 'Print the chart',
            parameters: []
        },
        
        // Series Methods
        addSeries: {
            description: 'Add a new series to the chart',
            parameters: [
                { name: 'series', type: 'object', description: 'Series object to add' }
            ]
        },
        removeSeries: {
            description: 'Remove a series from the chart',
            parameters: [
                { name: 'index', type: 'number', description: 'Index of the series to remove' }
            ]
        },
        clearSeries: {
            description: 'Clear all series from the chart',
            parameters: []
        },
        
        // Axis Methods
        addAxes: {
            description: 'Add axes to the chart',
            parameters: [
                { name: 'axes', type: 'object[]', description: 'Array of axis objects to add' }
            ]
        },
        removeAxis: {
            description: 'Remove an axis from the chart',
            parameters: [
                { name: 'name', type: 'string', description: 'Name of the axis to remove' }
            ]
        },
        
        // Selection Methods
        selectData: {
            description: 'Select data points in the chart',
            parameters: [
                { name: 'seriesIndex', type: 'number', description: 'Index of the series' },
                { name: 'pointIndex', type: 'number', description: 'Index of the point' }
            ]
        },
        clearSelection: {
            description: 'Clear selection in the chart',
            parameters: []
        },
        
        // Animation Methods
        animate: {
            description: 'Animate the chart',
            parameters: []
        },
        
        // Resize Method
        resize: {
            description: 'Resize the chart',
            parameters: [
                { name: 'width', type: 'number', description: 'New width of the chart' },
                { name: 'height', type: 'number', description: 'New height of the chart' }
            ]
        },
        
        // Data Source Methods
        setDataSource: {
            description: 'Set data source for the chart',
            parameters: [
                { name: 'dataSource', type: 'any[]', description: 'New data source' }
            ]
        },
        setSeriesData: {
            description: 'Set data for a specific series',
            parameters: [
                { name: 'seriesIndex', type: 'number', description: 'Index of the series' },
                { name: 'dataSource', type: 'any[]', description: 'New data source for the series' }
            ]
        }
    },
    
    events: {
        // Load Events
        loaded: {
            description: 'Triggers after the chart is rendered'
        },
        load: {
            description: 'Triggers before the chart is rendered'
        },
        
        // Resize Events
        resized: {
            description: 'Triggers after the chart is resized'
        },
        
        // Mouse Events
        chartMouseClick: {
            description: 'Triggers on clicking the chart'
        },
        chartMouseMove: {
            description: 'Triggers on moving the mouse over the chart'
        },
        chartMouseLeave: {
            description: 'Triggers when the mouse leaves the chart'
        },
        
        // Point Events
        pointClick: {
            description: 'Triggers on clicking a data point'
        },
        pointMove: {
            description: 'Triggers on moving the mouse over a data point'
        },
        
        // Selection Events
        chartSelection: {
            description: 'Triggers on selecting a data point or series'
        },
        chartHighlight: {
            description: 'Triggers on highlighting a data point or series'
        },
        
        // Zoom Events
        zoomComplete: {
            description: 'Triggers after zooming is completed'
        },
        zoomStart: {
            description: 'Triggers when zooming starts'
        },
        
        // Tooltip Events
        tooltipRender: {
            description: 'Triggers before rendering the tooltip'
        },
        
        // Legend Events
        legendClick: {
            description: 'Triggers on clicking the legend'
        },
        legendRender: {
            description: 'Triggers before rendering the legend'
        }
    }
};

// Accumulation Chart Component APIs
export const accumulationChartPublicAPIs = {
    properties: {
        // Primary Properties
        width: {
            type: 'string | number',
            description: 'Width of the accumulation chart'
        },
        height: {
            type: 'string | number',
            description: 'Height of the accumulation chart'
        },
        title: {
            type: 'string',
            description: 'Title of the accumulation chart'
        },
        subTitle: {
            type: 'string',
            description: 'Sub-title of the accumulation chart'
        },
        theme: {
            type: 'string',
            description: 'Theme of the accumulation chart',
            values: ['Material', 'Fabric', 'Bootstrap', 'HighContrastLight', 'MaterialDark', 'FabricDark', 'BootstrapDark', 'Bootstrap4', 'Bootstrap5', 'Fluent', 'FluentDark']
        },
        locale: {
            type: 'string',
            description: 'Locale of the accumulation chart'
        },
        dataSource: {
            type: 'any[]',
            description: 'Data source of the accumulation chart'
        },
        
        // Background
        background: {
            type: 'string',
            description: 'Background color of the accumulation chart'
        },
        
        // Selection
        selectionMode: {
            type: 'string',
            description: 'Mode of selection',
            values: ['None', 'Point', 'Series', 'Cluster']
        },
        
        // Highlight
        highlightMode: {
            type: 'string',
            description: 'Mode of highlight',
            values: ['None', 'Point', 'Series', 'Cluster']
        },
        
        // Tooltip
        tooltip: {
            type: 'object',
            properties: {
                enable: 'boolean',
                shared: 'boolean',
                enableMarker: 'boolean',
                header: 'string',
                format: 'string'
            },
            description: 'Options to customize the tooltip'
        },
        
        // Legend
        legendSettings: {
            type: 'object',
            properties: {
                visible: 'boolean',
                position: 'string',
                alignment: 'string',
                height: 'string',
                width: 'string'
            },
            description: 'Options to customize the legend'
        },
        
        // Palettes
        palettes: {
            type: 'string[]',
            description: 'Palette for the accumulation chart'
        }
    },
    
    methods: {
        // Export Methods
        export: {
            description: 'Export the accumulation chart to various formats',
            parameters: [
                { name: 'type', type: 'string', description: 'Export type (PNG, JPEG, SVG, PDF)' },
                { name: 'fileName', type: 'string', description: 'File name for the exported file' }
            ]
        },
        print: {
            description: 'Print the accumulation chart',
            parameters: []
        },
        
        // Selection Methods
        selectData: {
            description: 'Select data points in the accumulation chart',
            parameters: [
                { name: 'pointIndex', type: 'number', description: 'Index of the point' }
            ]
        },
        clearSelection: {
            description: 'Clear selection in the accumulation chart',
            parameters: []
        },
        
        // Animation Methods
        animate: {
            description: 'Animate the accumulation chart',
            parameters: []
        },
        
        // Resize Method
        resize: {
            description: 'Resize the accumulation chart',
            parameters: [
                { name: 'width', type: 'number', description: 'New width of the chart' },
                { name: 'height', type: 'number', description: 'New height of the chart' }
            ]
        },
        
        // Data Source Methods
        setDataSource: {
            description: 'Set data source for the accumulation chart',
            parameters: [
                { name: 'dataSource', type: 'any[]', description: 'New data source' }
            ]
        }
    },
    
    events: {
        // Load Events
        loaded: {
            description: 'Triggers after the accumulation chart is rendered'
        },
        load: {
            description: 'Triggers before the accumulation chart is rendered'
        },
        
        // Resize Events
        resized: {
            description: 'Triggers after the accumulation chart is resized'
        },
        
        // Mouse Events
        accumulationChartMouseClick: {
            description: 'Triggers on clicking the accumulation chart'
        },
        accumulationChartMouseMove: {
            description: 'Triggers on moving the mouse over the accumulation chart'
        },
        accumulationChartMouseLeave: {
            description: 'Triggers when the mouse leaves the accumulation chart'
        },
        
        // Point Events
        pointClick: {
            description: 'Triggers on clicking a data point'
        },
        pointMove: {
            description: 'Triggers on moving the mouse over a data point'
        },
        
        // Selection Events
        chartSelection: {
            description: 'Triggers on selecting a data point'
        },
        chartHighlight: {
            description: 'Triggers on highlighting a data point'
        },
        
        // Tooltip Events
        tooltipRender: {
            description: 'Triggers before rendering the tooltip'
        },
        
        // Legend Events
        legendClick: {
            description: 'Triggers on clicking the legend'
        },
        legendRender: {
            description: 'Triggers before rendering the legend'
        }
    }
};

// Common API utilities
interface ChartAPIParameter {
    name: string;
    type: string;
    description?: string;
}

interface ChartAPIProperty {
    type?: string;
    description?: string;
    values?: string[];
    properties?: Record<string, string>;
}

interface ChartAPIMethod {
    description?: string;
    parameters?: ChartAPIParameter[];
}

interface ChartAPIEvent {
    description?: string;
}

interface ChartAPICollection {
    properties?: Record<string, ChartAPIProperty>;
    methods?: Record<string, ChartAPIMethod>;
    events?: Record<string, ChartAPIEvent>;
}

export const chartAPIUtils = {
    formatAPIsForAI(apis: ChartAPICollection): string {
        let result: string = '';

        if (apis.properties) {
            result += 'Properties:\n';

            for (const [key, value] of Object.entries(apis.properties) as Array<[string, ChartAPIProperty]>) {
                result += `- ${key}: ${value.type || 'any'} - ${value.description || ''}\n`;

                if (Array.isArray(value.values) && value.values.length > 0) {
                    result += `  Values: ${value.values.join(', ')}\n`;
                }
            }

            result += '\n';
        }

        if (apis.methods) {
            result += 'Methods:\n';

            for (const [key, value] of Object.entries(apis.methods) as Array<[string, ChartAPIMethod]>) {
                result += `- ${key}: ${value.description || ''}\n`;

                if (Array.isArray(value.parameters) && value.parameters.length > 0) {
                    result += '  Parameters:\n';

                    for (const parameter of value.parameters) {
                        result += `    - ${parameter.name}: ${parameter.type} - ${parameter.description || ''}\n`;
                    }
                }
            }

            result += '\n';
        }

        if (apis.events) {
            result += 'Events:\n';

            for (const [key, value] of Object.entries(apis.events) as Array<[string, ChartAPIEvent]>) {
                result += `- ${key}: ${value.description || ''}\n`;
            }

            result += '\n';
        }

        return result;
    },

    getAllChartAPIs(): string {
        let result: string = 'Chart Component APIs:\n\n';

        result += this.formatAPIsForAI(chartPublicAPIs);
        result += 'Accumulation Chart Component APIs:\n\n';
        result += this.formatAPIsForAI(accumulationChartPublicAPIs);

        return result;
    }
};