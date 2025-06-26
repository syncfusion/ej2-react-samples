export const ChatUISampleOrder: Object = [
  { 'path': 'chat-ui/default',
    'component': 'Default',
    'name': 'Default Functionalities',
    'description':'Displays the default setups for the ChatUI component, offering a clear view of initial configurations and preset options available.',
    'order': '01',
    'category': 'Chat UI',
    'api':'{"ChatUIComponent":["suggestions", "headerText", "headerIconCss", "messages", "user"] }',
    'sourceFiles': [
      { 'displayName': 'default.tsx', 'path': 'src/chat-ui/default.tsx' },
      { 'displayName': 'default.jsx', 'path': 'src/chat-ui/default.jsx' },
      { 'displayName': 'messageData.json', 'path': 'src/chat-ui/messageData.json' }
    ]
  },
  { 'path': 'chat-ui/loadOn-demand',
    'component': 'LoadOnDemand',
    'name': 'Load On-demand',
    'description':'Displays the loadon-demand supports in the ChatUI component, displaying initial set of messages and loads dynamically when the scroll hits top.',
    'order': '01',
    'category': 'Chat UI',
    'api':'{"ChatUIComponent":["headerText", "headerIconCss", "messages", "user", "loadOnDemand"] }',
    'sourceFiles': [
      { 'displayName': 'loadOn-demand.tsx', 'path': 'src/chat-ui/loadOn-demand.tsx' },
      { 'displayName': 'loadOn-demand.jsx', 'path': 'src/chat-ui/loadOn-demand.jsx' }
    ]
  },
  { 'path': 'chat-ui/template',
    'component': 'Template',
    'name': 'Template',
    'description':'Displays the template rendering for the ChatUI component, offering a clear view of different template configurations and preset options available.',
    'order': '01',
    'category': 'Chat UI',
    'api':'{"ChatUIComponent":["messages", "user", "emptyChatTemplate", "messageTemplate", "timeBreakTemplate", "showTimeBreak", "headerText", "headerIconCss", "messageSend"] }',
    'sourceFiles': [
      { 'displayName': 'template.tsx', 'path': 'src/chat-ui/template.tsx' },
      { 'displayName': 'template.jsx', 'path': 'src/chat-ui/template.jsx' },
      { 'displayName': 'messageData.json', 'path': 'src/chat-ui/messageData.json' }
    ]
  },
  { 'path': 'chat-ui/api',
    'component': 'API',
    'name': 'API',
    'description':'Displays the all the API of the ChatUI component, offering a different purposes and use-cases of the property options available.',
    'order': '01',
    'category': 'Chat UI',
    'type': 'update',
    'api':'{"ChatUIComponent":["suggestions", "headerText", "headerIconCss", "messages", "user"] }',
    'sourceFiles': [
      { 'displayName': 'api.tsx', 'path': 'src/chat-ui/api.tsx' },
      { 'displayName': 'api.jsx', 'path': 'src/chat-ui/api.jsx' },
      { 'displayName': 'messageData.json', 'path': 'src/chat-ui/messageData.json' }
    ]
  },
  { 'path': 'chat-ui/chat-integration',
    'component': 'ChatIntegration',
    'name': 'Use Case',
    'description':'Displays the integration of other components setups for the ChatUI component, offering a clear view of initial configurations and preset options available.',
    'order': '02',
    'category': 'Integration',
    'api':'{"ChatUIComponent":["messages", "user", "timeStampFormat", "showTimeStamp", "headerText", "headerIconCss"] }',
    'sourceFiles': [
      { 'displayName': 'chat-integration.tsx', 'path': 'src/chat-ui/chat-integration.tsx' },
      { 'displayName': 'chat-integration.jsx', 'path': 'src/chat-ui/chat-integration.jsx' },
      { 'displayName': 'messageData.json', 'path': 'src/chat-ui/messageData.json' }
    ]
  }
]
