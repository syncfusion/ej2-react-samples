export const AIAssistViewSampleOrder: Object = [
  { 'path': 'ai-assistview/ai-overview',
    'component': 'Overview',
    'name': 'Overview',
    'description':'Demonstrates streaming responses, file attachments, speech-to-text input, text-to-speech output, and regenerate controls integrated in a unified interface.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["enableStreaming", "promptSuggestions", "toolbarSettings", "footerToolbarSettings", "responseToolbarSettings", "attachmentSettings", "speechToTextSettings", "bannerTemplate", "promptRequest"] }',
    'sourceFiles': [
      { 'displayName': 'ai-overview.tsx', 'path': 'src/ai-assistview/ai-overview.tsx' },
      { 'displayName': 'ai-overview.jsx', 'path': 'src/ai-assistview/ai-overview.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-default',
    'component': 'Default',
    'name': 'Default Functionalities',
    'description':'Displays the default setups for the AiAssistView component, offering a clear view of initial configurations and preset options available.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["promptRequest", "promptSuggestions", "bannerTemplate", "toolbarSettings"] }',
    'sourceFiles': [
      { 'displayName': 'ai-default.tsx', 'path': 'src/ai-assistview/ai-default.tsx' },
      { 'displayName': 'ai-default.jsx', 'path': 'src/ai-assistview/ai-default.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-custom-views',
    'component': 'CustomViews',
    'name': 'Custom Views',
    'description':'Displays various views of the AI AssistView component in React, highlighting different configurations and layout options available.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["views", "promptRequest"] }',
    'sourceFiles': [
      { 'displayName': 'ai-custom-views.tsx', 'path': 'src/ai-assistview/ai-custom-views.tsx' },
      { 'displayName': 'ai-custom-views.jsx', 'path': 'src/ai-assistview/ai-custom-views.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-streaming',
    'component': 'Streaming',
    'name': 'Streaming Response',
    'description':'Showcases the AI AssistView component in React, highlighting the streaming support how response is updated in chunks.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssitView": ["promptRequest", "promptSuggestions", "bannerTemplate", "toolbarSettings"] }',
    'sourceFiles': [
      { 'displayName': 'ai-streaming.tsx', 'path': 'src/ai-assistview/ai-streaming.tsx' },
      { 'displayName': 'ai-streaming.jsx', 'path': 'src/ai-assistview/ai-streaming.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-attachments',
    'component': 'Attachments',
    'name': 'File Attachments',
    'description':'Shows the AiAssistView component integrated with attachments, demonstrating how it interacts and fits within a larger system.',
    'order': '01',
    'category': 'Integration',
    'api':'{"AIAssistViewComponent":["promptRequest", "promptSuggestions", "bannerTemplate", "toolbarSettings", "attachmentSettings", "enableAttachments"] }',
    'sourceFiles': [
      { 'displayName': 'ai-attachments.tsx', 'path': 'src/ai-assistview/ai-attachments.tsx' },
      { 'displayName': 'ai-attachments.jsx', 'path': 'src/ai-assistview/ai-attachments.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-generative-ui',
    'component': 'GenerativeUI',
    'name': 'Generative UI Responses',
    'description':'Renders interactive UI tools like weather cards, charts, and data grids within AI responses for enhanced data visualization and interactivity.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["registerToolUI", "addPromptResponse", "bannerTemplate", "promptSuggestions", "toolbarSettings", "promptRequest"] }',
    'sourceFiles': [
      { 'displayName': 'ai-generative-ui.tsx', 'path': 'src/ai-assistview/ai-generative-ui.tsx' },
      { 'displayName': 'ai-generative-ui.jsx', 'path': 'src/ai-assistview/ai-generative-ui.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-thinking',
    'component': 'Thinking',
    'name': 'Chain of Thoughts',
    'description': 'Demonstrates the AI thinking workflow in AIAssistView, visualizing stages like searching, processing, analyzing, and summarizing in real time.',
    'order': '01',
    'category': 'AI AssistView',
    'api':'{"AIAssistViewComponent":["registerToolUI", "addPromptResponse", "bannerTemplate", "promptSuggestions", "toolbarSettings", "promptRequest"] }',
    'sourceFiles': [
      { 'displayName': 'ai-thinking.tsx', 'path': 'src/ai-assistview/ai-thinking.tsx' },
      { 'displayName': 'ai-thinking.jsx', 'path': 'src/ai-assistview/ai-thinking.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  {
      'path': 'ai-assistview/ai-loading-indicator',
      'component': 'LoadingIndicator',
      'name': 'Loading Indicator',
      'description': 'Demonstrates the AIAssistView component with customizable loading indicator templates, including dot, spinner, text, and text-with-indicator animations displayed while AI-generated responses are being processed.',
      'order': '01',
      'category': 'AI AssistView',
      'type': 'new',
      'api':'{"AIAssistViewComponent":["promptRequest", "responseAnimationTemplate", "enableStreaming", "toolbarSettings"] }',
      'sourceFiles': [
          { 'displayName': 'ai-loading-indicator.tsx', 'path': 'src/ai-assistview/ai-loading-indicator.tsx' },
          { 'displayName': 'ai-loading-indicator.jsx', 'path': 'src/ai-assistview/ai-loading-indicator.jsx' },
          { 'displayName': 'ai-loading-indicator.css', 'path': 'src/ai-assistview/ai-loading-indicator.css' }
      ]
  },
  {
      'path': 'ai-assistview/ai-mention',
      'component': 'Mentions',
      'name': 'Mentions',
      'description': 'Demonstrates the AIAssistView component with mention functionality, allowing users to trigger suggestion lists and enhance interactions with relevant references.',
      'order': '01',
      'category': 'AI AssistView',
      'type': 'new',
      'api':'{"AIAssistViewComponent":["mentions", "promptRequest", "enableStreaming", "toolbarSettings", "bannerTemplate", "promptSuggestions"] }',
      'sourceFiles': [
          { 'displayName': 'ai-mention.tsx', 'path': 'src/ai-assistview/ai-mention.tsx' },
          { 'displayName': 'ai-mention.jsx', 'path': 'src/ai-assistview/ai-mention.jsx' },
          { 'displayName': 'ai-mention.css', 'path': 'src/ai-assistview/ai-mention.css' },
          { 'displayName': 'mentionData.json', 'path': 'src/ai-assistview/mentionData.json' }
      ]
  },
  {
      'path': 'ai-assistview/ai-telemetry',
      'component': 'Telemetry',
      'name': 'Telemetry',
      'description': 'Showcases the telemetry feature of the AiAssistView control.',
      'order': '01',
      'category': 'AI AssistView',
      'type': 'new',
      'api':'{"AIAssistViewComponent":["promptRequest", "promptSuggestions", "bannerTemplate", "telemetrySettings"] }',
      'sourceFiles': [
          { 'displayName': 'ai-telemetry.tsx', 'path': 'src/ai-assistview/ai-telemetry.tsx' },
          { 'displayName': 'ai-telemetry.jsx', 'path': 'src/ai-assistview/ai-telemetry.jsx' },
          { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
      ]
  },
  { 'path': 'ai-assistview/ai-template',
    'component': 'Template',
    'name': 'Template',
    'description':'Displays the template properties of the AiAssistView component, highlighting its key features and configuration options for customization.',
    'order': '01',
    'category': 'AI AssistView',
    'type': 'update',
    'api':'{"AIAssistViewComponent":["bannerTemplate", "promptItemTemplate", "responseItemTemplate", "promptSuggestionItemTemplate", "promptSuggestions", "promptSuggestionsHeader", "promptRequest"] }',
    'sourceFiles': [
      { 'displayName': 'ai-template.tsx', 'path': 'src/ai-assistview/ai-template.tsx' },
      { 'displayName': 'ai-template.jsx', 'path': 'src/ai-assistview/ai-template.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-speech-to-text',
    'component': 'SpeechToText',
    'name': 'Speech to Text',
    'description': 'Demonstrates the AI AssistView component integrated with the built-in Speech-to-Text functionality, enabling users to interact using voice input transcribed into text.',
    'order': '02',
    'category': 'Speech',
    'api':'{ "AIAssistViewComponent": ["promptRequest", "toolbarSettings", "speechToTextSettings", "bannerTemplate", "attachmentSettings", "promptToolbarSettings", "stopRespondingClick"] }',
    'sourceFiles': [
      { 'displayName': 'ai-speech-to-text.tsx', 'path': 'src/ai-assistview/ai-speech-to-text.tsx' },
      { 'displayName': 'ai-speech-to-text.jsx', 'path': 'src/ai-assistview/ai-speech-to-text.jsx' },
      { 'displayName': 'ai-service.ts', 'path': 'src/ai-assistview/ai-service.ts' }
    ]
  },
  { 'path': 'ai-assistview/ai-text-to-speech',
    'component': 'TextToSpeech',
    'name': 'Text to Speech',
    'description':'Demonstrates the AiAssistView component integrated with Text-to-Speech functionality, allowing AI-generated responses to be vocalized for voice-based interaction.',
    'order': '02',
    'category': 'Speech',
    'api':'{"AIAssistViewComponent":["promptRequest", "toolbarSettings", "bannerTemplate", "responseToolbarSettings", "stopRespondingClick"] }',
    'sourceFiles': [
      { 'displayName': 'ai-text-to-speech.tsx', 'path': 'src/ai-assistview/ai-text-to-speech.tsx' },
      { 'displayName': 'ai-text-to-speech.jsx', 'path': 'src/ai-assistview/ai-text-to-speech.jsx' },
      { 'displayName': 'ai-service.ts', 'path': 'src/ai-assistview/ai-service.ts' }
    ]
  },
  { 'path': 'ai-assistview/ai-notion-ai-clone',
    'component': 'NotionAIClone',
    'name': 'Notion AI-like',
    'description':'Demonstrates a Notion-inspired AI AssistView with sidebar navigation, multi-model selection, and session management for advanced chat workflows.',
    'order': '03',
    'category': 'UI Customization',
    'api':'{"AIAssistViewComponent":["prompts", "promptRequest", "toolbarSettings", "footerToolbarSettings", "responseToolbarSettings", "bannerTemplate", "attachmentSettings", "speechToTextSettings"] }',
    'sourceFiles': [
      { 'displayName': 'ai-notion-ai-clone.tsx', 'path': 'src/ai-assistview/ai-notion-ai-clone.tsx' },
      { 'displayName': 'ai-notion-ai-clone.jsx', 'path': 'src/ai-assistview/ai-notion-ai-clone.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-claude-clone',
    'component': 'ClaudeClone',
    'name': 'Claude AI-like',
    'description':'Demonstrates a Claude-inspired AI AssistView with file attachments and model selector for seamless branded conversational experiences.',
    'order': '03',
    'category': 'UI Customization',
    'api':'{"AIAssistViewComponent":["promptRequest", "showHeader", "promptPlaceholder", "enableAttachments", "bannerTemplate", "footerToolbarSettings", "attachmentSettings"] }',
    'sourceFiles': [
      { 'displayName': 'ai-claude-clone.tsx', 'path': 'src/ai-assistview/ai-claude-clone.tsx' },
      { 'displayName': 'ai-claude-clone.jsx', 'path': 'src/ai-assistview/ai-claude-clone.jsx' },
      { 'displayName': 'ai-claude-clone.css', 'path': 'src/ai-assistview/ai-claude-clone.css' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-gemini-clone',
    'component': 'GeminiClone',
    'name': 'Gemini AI-like',
    'description':'Demonstrates a Gemini-inspired AI AssistView with voice input, file attachments, and model selector for interactive assistant experiences.',
    'order': '03',
    'category': 'UI Customization',
    'api':'{"AIAssistViewComponent":["promptRequest", "promptChanged", "showHeader", "promptPlaceholder", "enableAttachments", "speechToTextSettings", "bannerTemplate", "footerToolbarSettings", "attachmentSettings"] }',
    'sourceFiles': [
      { 'displayName': 'ai-gemini-clone.tsx', 'path': 'src/ai-assistview/ai-gemini-clone.tsx' },
      { 'displayName': 'ai-gemini-clone.jsx', 'path': 'src/ai-assistview/ai-gemini-clone.jsx' },
      { 'displayName': 'ai-gemini-clone.css', 'path': 'src/ai-assistview/ai-gemini-clone.css' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  {
    'path': 'ai-assistview/ai-chatgpt-clone',
    'component': 'ChatGPTClone',
    'name': 'ChatGPT AI-like',
    'type': 'new',
    'description': 'Demonstrates a ChatGPT-inspired AI AssistView with speech input, file attachments, and an inline footer toolbar for interactive assistant experiences.',
    'order': '03',
    'category': 'UI Customization',
    'api': '{"AIAssistViewComponent":["promptRequest", "showHeader", "promptPlaceholder", "enableAttachments", "speechToTextSettings", "bannerTemplate", "footerToolbarSettings", "attachmentSettings"]}',
    'sourceFiles': [
      { 'displayName': 'ai-chatgpt-clone.tsx', 'path': 'src/ai-assistview/ai-chatgpt-clone.tsx' },
      { 'displayName': 'ai-chatgpt-clone.jsx', 'path': 'src/ai-assistview/ai-chatgpt-clone.jsx' },
      { 'displayName': 'ai-chatgpt-clone.css', 'path': 'src/ai-assistview/ai-chatgpt-clone.css' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-dialog',
    'component': 'Dialog',
    'name': 'Notes Assistant',
    'description':'Shows the AiAssistView component integrated with Dialog, Fab and Splitter components, demonstrating how it interacts and fits within a larger system.',
    'order': '04',
    'category': 'Use Cases',
    'api':'{"AIAssistViewComponent":["promptSuggestions", "prompts", "promptRequest", "toolbarSettings", "bannerTemplate", "responseToolbarSettings", "cssClass"] }',
    'sourceFiles': [
      { 'displayName': 'ai-dialog.tsx', 'path': 'src/ai-assistview/ai-dialog.tsx' },
      { 'displayName': 'ai-dialog.jsx', 'path': 'src/ai-assistview/ai-dialog.jsx' },
      { 'displayName': 'promptResponseData.json', 'path': 'src/ai-assistview/promptResponseData.json' }
    ]
  },
  { 'path': 'ai-assistview/ai-models',
    'component': 'AIAssistIntegrations',
    'name': 'Multiple AI Conversation',
    'description':'Showcases the AiAssistView control to integrate with Multiple AI models and demonstrates how it interacts and generate dynamic response.',
    'order': '04',
    'category': 'Use Cases',
    'api':'{"AIAssistViewComponent":["promptSuggestions", "prompts", "responseToolbarSettings", "cssClass"] }',
    'sourceFiles': [
      { 'displayName': 'ai-models.tsx', 'path': 'src/ai-assistview/ai-models.tsx' },
      { 'displayName': 'ai-models.jsx', 'path': 'src/ai-assistview/ai-models.jsx' },
      { 'displayName': 'ai-services.ts', 'path': 'src/ai-assistview/ai-services.ts' }
    ]
  }
]
