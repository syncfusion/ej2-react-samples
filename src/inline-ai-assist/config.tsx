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
  { 'path': 'inline-ai-assist/ai-rich-text-editor',
    'component': 'RichTextEditor',
    'name': 'Rich Text Editor',
    'description':'Demonstrates the Inline AI Assist component in an email draft assistant scenario with AI-powered editing capabilities.',
    'order': '01',
    'category': 'Inline AI Assist',
    'api':'{"InlineAIAssist": ["promptRequest", "relateTo", "commandSettings", "responseSettings", "responseMode"] }',
    'sourceFiles': [
      { 'displayName': 'ai-rich-text-editor.tsx', 'path': 'src/inline-ai-assist/ai-rich-text-editor.tsx' },
      { 'displayName': 'ai-rich-text-editor.jsx', 'path': 'src/inline-ai-assist/ai-rich-text-editor.jsx' },
      { 'displayName': 'ai-rich-text-editor.css', 'path': 'src/inline-ai-assist/ai-rich-text-editor.css' }
    ]
  }
]
