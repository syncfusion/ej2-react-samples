export const AIAssistViewSampleOrder: Object = [
  { 'path': 'ai-assistview/default',
    'component': 'Default',
    'name': 'Default Functionalities',
    'description':'Displays the default setups for the AiAssistView component, offering a clear view of initial configurations and preset options available.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["promptRequest", "promptSuggestions", "bannerTemplate", "toolbarSettings"] }',
    'sourceFiles': [
      { 'displayName': 'default.tsx', 'path': 'src/ai-assistview/default.tsx' },
      { 'displayName': 'default.jsx', 'path': 'src/ai-assistview/default.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/custom-views',
    'component': 'CustomViews',
    'name': 'Custom Views',
    'description':'Displays various views of the AI AssistView component in React, highlighting different configurations and layout options available.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["views", "promptRequest"] }',
    'sourceFiles': [
      { 'displayName': 'custom-views.tsx', 'path': 'src/ai-assistview/custom-views.tsx' },
      { 'displayName': 'custom-views.jsx', 'path': 'src/ai-assistview/custom-views.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/template',
    'component': 'Template',
    'name': 'Template',
    'description':'Displays the template properties of the AiAssistView component, highlighting its key features and configuration options for customization.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["bannerTemplate", "promptItemTemplate", "responseItemTemplate", "promptSuggestionItemTemplate", "promptSuggestions", "promptSuggestionsHeader", "promptRequest"] }',
    'sourceFiles': [
      { 'displayName': 'template.tsx', 'path': 'src/ai-assistview/template.tsx' },
      { 'displayName': 'template.jsx', 'path': 'src/ai-assistview/template.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/dialog',
    'component': 'Dialog',
    'name': 'Dialog',
    'description':'Shows the AiAssistView component integrated with Dialog, Fab and Splitter components, demonstrating how it interacts and fits within a larger system.',
    'order': '02',
    'category': 'Integration',
    'api':'{"AIAssistViewComponent":["promptSuggestions", "prompts", "promptRequest", "toolbarSettings", "bannerTemplate", "responseToolbarSettings", "cssClass"] }',
    'sourceFiles': [
      { 'displayName': 'dialog.tsx', 'path': 'src/ai-assistview/dialog.tsx' },
      { 'displayName': 'dialog.jsx', 'path': 'src/ai-assistview/dialog.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  }
]
