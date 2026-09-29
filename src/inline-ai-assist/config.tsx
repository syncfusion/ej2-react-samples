export const InlineAIAssistSampleOrder: Object = [
  { 'path': 'inline-ai-assist/ai-overview',
    'component': 'Overview',
    'name': 'Overview',
    'description':'Demonstrates the Inline AI Assist component in an email draft assistant scenario with AI-powered editing capabilities.',
    'order': '01',
    'category': 'Inline AI Assist',
    'api':'{"InlineAIAssist": ["promptRequest", "relateTo", "commandSettings", "responseSettings"] }',
    'sourceFiles': [
      { 'displayName': 'ai-overview.tsx', 'path': 'src/inline-ai-assist/ai-overview.tsx' },
      { 'displayName': 'ai-overview.jsx', 'path': 'src/inline-ai-assist/ai-overview.jsx' },
      { 'displayName': 'ai-overview.css', 'path': 'src/inline-ai-assist/ai-overview.css' }
    ]
  },
   { 'path': 'inline-ai-assist/ai-speech-to-text',
    'component': 'SpeechToText',
    'name': 'Speech To Text',
    'type': 'new',
    'description':'Demonstrates the Inline AI Assist component with built-in speech-to-text support for voice input.',
    'order': '02',
    'category': 'Speech',
    'api':'{"InlineAIAssist": ["promptRequest", "relateTo", "commandSettings", "responseSettings", "speechToTextSettings"] }',
    'sourceFiles': [
      { 'displayName': 'ai-speech-to-text.tsx', 'path': 'src/inline-ai-assist/ai-speech-to-text.tsx' },
      { 'displayName': 'ai-speech-to-text.jsx', 'path': 'src/inline-ai-assist/ai-speech-to-text.jsx' },
      { 'displayName': 'ai-speech-to-text.css', 'path': 'src/inline-ai-assist/ai-speech-to-text.css' }
    ]
  },
  { 'path': 'inline-ai-assist/ai-rich-text-editor',
    'ignoreOnBuild': true,
    'component': 'RichTextEditor',
    'name': 'Rich Text Editor',
    'description':'Demonstrates the Inline AI Assist component in an email draft assistant scenario with AI-powered editing capabilities.',
    'order': '03',
    'category': 'Integration',
    'api':'{"InlineAIAssist": ["promptRequest", "relateTo", "commandSettings", "responseSettings", "responseMode"] }',
    'sourceFiles': [
      { 'displayName': 'ai-rich-text-editor.tsx', 'path': 'src/inline-ai-assist/ai-rich-text-editor.tsx' },
      { 'displayName': 'ai-rich-text-editor.jsx', 'path': 'src/inline-ai-assist/ai-rich-text-editor.jsx' },
      { 'displayName': 'ai-rich-text-editor.css', 'path': 'src/inline-ai-assist/ai-rich-text-editor.css' }
    ]
  }
]
