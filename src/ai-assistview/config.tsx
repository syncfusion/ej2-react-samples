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
  { 'path': 'ai-assistview/streaming',
    'component': 'Streaming',
    'name': 'Streaming Response',
    'description':'Showcases the AI AssistView component in React, highlighting the streaming support how response is updated in chunks.',
    'order': '01',
    'category': 'AI AssistView',
    'type': 'update',
    'api':'{"AIAssitView": ["promptRequest", "promptSuggestions", "bannerTemplate", "toolbarSettings"] }',
    'sourceFiles': [
      { 'displayName': 'streaming.tsx', 'path': 'src/ai-assistview/streaming.tsx' },
      { 'displayName': 'streaming.jsx', 'path': 'src/ai-assistview/streaming.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/attachments',
    'component': 'Attachments',
    'name': 'File Attachments',
    'description':'Shows the AiAssistView component integrated with attachments, demonstrating how it interacts and fits within a larger system.',
    'order': '01',
    'category': 'Integration',
    'api':'{"AIAssistViewComponent":["promptRequest", "promptSuggestions", "bannerTemplate", "toolbarSettings", "attachmentSettings", "enableAttachments"] }',
    'sourceFiles': [
      { 'displayName': 'attachments.tsx', 'path': 'src/ai-assistview/attachments.tsx' },
      { 'displayName': 'attachments.jsx', 'path': 'src/ai-assistview/attachments.jsx' },
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
    'name': 'Notes Assistant',
    'description':'Shows the AiAssistView component integrated with Dialog, Fab and Splitter components, demonstrating how it interacts and fits within a larger system.',
    'order': '02',
    'category': 'Use Cases',
    'api':'{"AIAssistViewComponent":["promptSuggestions", "prompts", "promptRequest", "toolbarSettings", "bannerTemplate", "responseToolbarSettings", "cssClass"] }',
    'sourceFiles': [
      { 'displayName': 'dialog.tsx', 'path': 'src/ai-assistview/dialog.tsx' },
      { 'displayName': 'dialog.jsx', 'path': 'src/ai-assistview/dialog.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-models',
    'component': 'AIAssistIntegrations',
    'name': 'Multiple AI Models',
    'description':'Showcases the AiAssistView control to integrate with Multiple AI models and demonstrates how it interacts and generate dynamic response.',
    'order': '02',
    'category': 'Use Cases',
    'api':'{"AIAssistViewComponent":["promptSuggestions", "prompts", "responseToolbarSettings", "cssClass"] }',
    'sourceFiles': [
      { 'displayName': 'ai-models.tsx', 'path': 'src/ai-assistview/ai-models.tsx' },
      { 'displayName': 'ai-models.jsx', 'path': 'src/ai-assistview/ai-models.jsx' },
      { 'displayName': 'ai-services.ts', 'path': 'src/ai-assistview/ai-services.ts' }
    ]
  },
  { 'path': 'ai-assistview/speech-to-text',
    'component': 'SpeechToText',
    'name': 'Speech to Text',
    'type': 'update',
    'description': 'Demonstrates the AI AssistView component integrated  the built-in Speech-to-Text functionality, enabling users to interact using voice input transcribed into text.',
    'order': '03',
    'category': 'Speech',
    'api':'{ "AIAssistViewComponent": ["promptRequest", "toolbarSettings", "speechToTextSettings", "bannerTemplate", "attachmentSettings", "promptToolbarSettings", "stopRespondingClick"] }',
    'sourceFiles': [
      { 'displayName': 'speech-to-text.tsx', 'path': 'src/ai-assistview/speech-to-text.tsx' },
      { 'displayName': 'speech-to-text.jsx', 'path': 'src/ai-assistview/speech-to-text.jsx' },
      { 'displayName': 'ai-service.ts', 'path': 'src/ai-assistview/ai-service.ts' }
    ]
  },
  { 'path': 'ai-assistview/text-to-speech',
    'component': 'TextToSpeech',
    'name': 'Text to Speech',
    'description':'Demonstrates the AiAssistView component integrated with Text-to-Speech functionality, allowing AI-generated responses to be vocalized for voice-based interaction.',
    'order': '03',
    'category': 'Speech',
    'api':'{"AIAssistViewComponent":["promptRequest", "toolbarSettings", "bannerTemplate", "responseToolbarSettings", "stopRespondingClick"] }',
    'sourceFiles': [
      { 'displayName': 'text-to-speech.tsx', 'path': 'src/ai-assistview/text-to-speech.tsx' },
      { 'displayName': 'text-to-speech.jsx', 'path': 'src/ai-assistview/text-to-speech.jsx' },
      { 'displayName': 'ai-service.ts', 'path': 'src/ai-assistview/ai-service.ts' }
    ]
  }
]
