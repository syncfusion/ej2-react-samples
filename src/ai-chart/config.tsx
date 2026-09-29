export const AIChartSampleOrder: Object = [
     {
        'path': 'ai-chart/chart-assist', 
        'component': 'ChartGeneration', 
        'name': 'Chart Assist', 
        'description': 'This demo sample for rendering and configuring chart series using natural language prompts.', 
        'order': '13',
        'category': 'Chart',
        'type': 'New', 
        'sourceFiles': [
            { 'displayName': 'chart-assist.tsx', 'path': 'src/ai-chart/chart-assist.tsx' },
            { 'displayName': 'chart-assist.jsx', 'path': 'src/ai-chart/chart-assist.jsx' },
            { 'displayName': 'ai-generate-chart.jsx', 'path': 'src/ai-chart/chart-assist/frontend/ai-chart-generation.tsx' },
            { 'displayName': 'ai-generate-chart.jsx', 'path': 'src/ai-chart/chart-assist/frontend/ai-chart-generation.jsx' },
            { 'displayName': 'ai-input.ts', 'path': 'src/ai-chart/chart-assist/model/ai-input.ts' },
            { 'displayName': 'ai-input.js', 'path': 'src/ai-chart/chart-assist/model/ai-input.js' },
            { 'displayName': 'chart-api.ts', 'path': 'src/ai-chart/chart-assist/model/chart-api.ts' },
            { 'displayName': 'chart-api.js', 'path': 'src/ai-chart/chart-assist/model/chart-api.js' },
            { 'displayName': 'prompt-data.ts', 'path': 'src/ai-chart/chart-assist/model/prompt-data.ts' },
            { 'displayName': 'prompt-data.js', 'path': 'src/ai-chart/chart-assist/model/prompt-data.js' },
            { 'displayName': 'sf-ai-schema.ts', 'path': 'src/ai-chart/chart-assist/model/sf-ai-schema.ts' },
            { 'displayName': 'sf-ai-schema.js', 'path': 'src/ai-chart/chart-assist/model/sf-ai-schema.js' }
        ]
     },
    {
        'path': 'ai-chart/data-preprocessing', 
        'component': 'DataPreprocessing', 
        'name': 'Data Preprocessing', 
        'description': 'This demo for the AI-powered data cleaning and preprocessing for tracking hourly website visitor data.', 
        'order': '13',
        'category': 'Chart',
        'type': 'New', 
        'sourceFiles': [
            { 'displayName': 'data-preprocessing.tsx', 'path': 'src/ai-chart/data-preprocessing.tsx' },
            { 'displayName': 'data-preprocessing.jsx', 'path': 'src/ai-chart/data-preprocessing.jsx' }
        ]
    },
    {
        'path': 'ai-chart/stock-forecasting', 
        'component': 'StockForecasting', 
        'name': 'Stock Forecasting', 
        'description': 'This demo sample demonstrates how to Predict future stock values from historical series using the AI assistant panel.', 
        'order': '13',
        'type': 'New', 
        'category': 'Chart',
        'sourceFiles': [
            { 'displayName': 'stock-forecasting.tsx', 'path': 'src/ai-chart/stock-forecasting.tsx' },
            { 'displayName': 'stock-forecasting.jsx', 'path': 'src/ai-chart/stock-forecasting.jsx' }
        ]
    }
];