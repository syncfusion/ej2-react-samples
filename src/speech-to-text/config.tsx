export const SpeechToTextSampleOrder: Object = [
  { 
    'path': 'speech-to-text/default',
    'component': 'Default',
    'name': 'Default Functionalities',
    'order': '01',
    'category': 'Speech To Text',
    'api': '{ "SpeechToText": ["lang", "allowInterimResults", "showTooltip", "buttonSettings", "transcriptChanged", "onStart", "onStop", "onError", "cssClass"] }',
    'description': 'This example demonstrates the default features of the Syncfusion JavaScript SpeechToText control, including speech recognition, and customization.',
    'sourceFiles': [{ 'displayName': 'default.tsx', 'path': 'src/speech-to-text/default.tsx' },
                    { 'displayName': 'default.jsx', 'path': 'src/speech-to-text/default.jsx' },
                    { 'displayName': 'default.css', 'path': 'src/speech-to-text/default.css' }
                  ]
  },
  { 
    'path': 'speech-to-text/use-case',
    'component': 'UseCase',
    'name': 'Use Case',
    'order': '02',
    'category': 'Integration',
    'api': '{ "SpeechToText": ["buttonSettings", "transcriptChanged", "onStart", "onStop", "onError", "cssClass"] }',
    'description': 'Explore how to integrate the SpeechToText control into real-world applications for seamless voice-to-text conversion and enhanced usability.',
    'sourceFiles': [{ 'displayName': 'use-case.tsx', 'path': 'src/speech-to-text/use-case.tsx' },
                    { 'displayName': 'use-case.jsx', 'path': 'src/speech-to-text/use-case.jsx' },
                    { 'displayName': 'use-case.css', 'path': 'src/speech-to-text/use-case.css' }
                  ]
  },
  { 
      'path': 'speech-to-text/integration',
      'component': 'Integration',
      'name': 'AI AssistView',
      'order': '02',
      'category': 'Integration',
      'api': '{ "SpeechToText": ["transcriptChanged", "onStart", "onStop", "onError", "cssClass"] }',
      'description': 'Demonstrates to integrate the SpeechToText control with AI AssistView to enable real-time voice-to-text interaction for AI-powered chat experiences.',
      'sourceFiles': [{ 'displayName': 'integration.tsx', 'path': 'src/speech-to-text/integration.tsx' },
                      { 'displayName': 'integration.jsx', 'path': 'src/speech-to-text/integration.jsx' },
                      { 'displayName': 'integration.css', 'path': 'src/speech-to-text/integration.css' }
                    ]
  }
]