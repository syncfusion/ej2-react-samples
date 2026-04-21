export const AIGridSampleOrder: Object = [
    {
        'path': 'ai-grid/assistive-grid', 
        'component': 'AssistiveGrid', 
        'name': 'Assistive Grid', 
        'description': 'This demo shows the data operations on natural language using AI feature in Data Grid.', 
        'order': '01', 
        'type': 'New', 
        'category': 'Data Grid', 
        'sourceFiles': [
            { 'displayName': 'assistive-grid.tsx', 'path': 'src/ai-grid/frontend/ai-assistive-grid.tsx' }, 
            { 'displayName': 'assistive-grid.jsx', 'path': 'src/ai-grid/frontend/ai-assistive-grid.jsx' },
            { 'displayName': 'assistive-grid.css', 'path': 'src/ai-grid/frontend/assistive-grid.css' },
            { 'displayName': 'ai-input.tsx', 'path': 'src/ai-grid/model/ai-input.tsx' },
            { 'displayName': 'ai-input.jsx', 'path': 'src/ai-grid/model/ai-input.jsx' },
            { 'displayName': 'Grid Action.tsx', 'path': 'src/ai-grid/model/GridAction.tsx' },
            { 'displayName': 'Grid Action.jsx', 'path': 'src/ai-grid/model/GridAction.jsx' },
            { 'displayName': 'ai-schema.ts', 'path': 'src/ai-grid/model/sf-ai-schema.ts' },
            { 'displayName': 'ai-schema.js', 'path': 'src/ai-grid/model/sf-ai-schema.js' }
        ]
    },
    {
        'path': 'ai-grid/anomaly-detection', 
        'component': 'AnomalyDetection', 
        'name': 'Anomaly Detection', 
        'description': 'This demo shows the Anomaly Detection AI feature in Data Grid.', 
        'order': '01',
        'category': 'Data Grid',
        'sourceFiles': [
            { 'displayName': 'anomaly-detection.tsx', 'path': 'src/ai-grid/ai-anomaly-detection.tsx' }, 
            { 'displayName': 'anomaly-detection.jsx', 'path': 'src/ai-grid/ai-anomaly-detection.jsx' }
        ]
    },
    {
        'path': 'ai-grid/semantic-filtering', 
        'component': 'SemanticFiltering', 
        'name': 'Semantic Filtering (Embedding)', 
        'description': 'This demo shows the predictive data entry AI feature in Data Grid.', 
        'order': '01',
        'category': 'Data Grid',
        'sourceFiles': [
            { 'displayName': 'semantic-filtering.tsx', 'path': 'src/ai-grid/ai-semantic-filtering.tsx' }, 
            { 'displayName': 'semantic-filtering.jsx', 'path': 'src/ai-grid/ai-semantic-filtering.jsx' }
        ]
    }
];