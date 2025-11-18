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
            { 'displayName': 'grid-assistance.tsx', 'path': 'src/ai-grid/ai-assistive-grid.tsx' }, 
            { 'displayName': 'grid-assistance.jsx', 'path': 'src/ai-grid/ai-assistive-grid.jsx' },
            { 'displayName': 'GridAction.tsx', 'path': 'src/ai-grid/GridAction.tsx' },
            { 'displayName': 'GridAction.jsx', 'path': 'src/ai-grid/GridAction.jsx' },
            { 'displayName': 'AIModel.tsx', 'path': 'src/ai-grid/AIModel.tsx' },
            { 'displayName': 'AIModel.jsx', 'path': 'src/ai-grid/AIModel.jsx' }
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