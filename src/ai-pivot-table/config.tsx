export const AIPivotTableSampleOrder: Object = [
    {
        'path': 'ai-pivot-table/assistive-pivot', 
        'component': 'AssistivePivot', 
        'name': 'Assistive Pivot', 
        'description': 'This demo shows the data operations on natural language using AI feature in Pivot Table.', 
        'order': '01', 
        'type': 'New', 
        'category': 'Pivot Table',
        'sourceFiles': [
            { 'displayName': 'pivot-assistance.tsx', 'path': 'src/ai-pivot-table/frontend/ai-assistive-pivot.tsx' }, 
            { 'displayName': 'pivot-assistance.jsx', 'path': 'src/ai-pivot-table/frontend/ai-assistive-pivot.jsx' },
            { 'displayName': 'PivotAction.tsx', 'path': 'src/ai-pivot-table/model/PivotAction.tsx' },
            { 'displayName': 'PivotAction.jsx', 'path': 'src/ai-pivot-table/model/PivotAction.jsx' }
        ]
    },
    {
        'path': 'ai-pivot-table/smart-pivot', 
        'component': 'SmartPivot', 
        'name': 'Smart Pivot', 
        'description': 'This demo showcases the Pivot Table AI feature.', 
        'order': '01',
        'category': 'Pivot Table',
        'sourceFiles': [
            { 'displayName': 'smart-pivot.tsx', 'path': 'src/ai-pivot-table/ai-smart-pivot.tsx' }, 
            { 'displayName': 'smart-pivot.jsx', 'path': 'src/ai-pivot-table/ai-smart-pivot.jsx' }
        ]
    }
];