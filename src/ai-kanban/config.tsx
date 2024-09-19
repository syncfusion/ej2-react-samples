export const AIKanbanSampleOrder: Object = [
    {
        'path': 'ai-kanban/task-recommendation', 
        'component': 'TaskRecommendation', 
        'name': 'AITask Recommendation', 
        'description': 'This demo showcases the Kanban AI feature.', 
        'order': '01',
        'category': 'Kanban',
        'sourceFiles': [
            { 'displayName': 'task-recommendation.tsx', 'path': 'src/ai-kanban/ai-task-recommendation.tsx' }, 
            { 'displayName': 'task-recommendation.jsx', 'path': 'src/ai-kanban/ai-task-recommendation.jsx' }
        ]
    },
    {
        'path': 'ai-kanban/sentiment-analysis', 
        'component': 'SentimentAnalysis', 
        'name': 'Sentiment Analysis', 
        'description': 'This demo showcases the Kanban AI feature.', 
        'order': '01',
        'category': 'Kanban',
        'sourceFiles': [
            { 'displayName': 'sentiment-analysis.tsx', 'path': 'src/ai-kanban/ai-sentiment-analysis.tsx' }, 
            { 'displayName': 'sentiment-analysis.jsx', 'path': 'src/ai-kanban/ai-sentiment-analysis.jsx' }
        ]
    }
];