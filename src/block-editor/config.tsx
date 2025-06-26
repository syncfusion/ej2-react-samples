export const BlockEditorSampleOrder: Object = [
    {
      'path': 'block-editor/overview',
      'component': 'Overview',
      'name': 'Overview',
      'description':'This demo describes basic and advanced features of the Block Editor component with all its tools and functionalities.',
      'order': '01',
      'category': 'Block Editor',
      'api':'{"BlockEditorComponent":["blocks"] }',
      'sourceFiles': [
        { 'displayName': 'overview.tsx', 'path': 'src/block-editor/overview.tsx' },
        { 'displayName': 'overview.jsx', 'path': 'src/block-editor/overview.jsx' },
        { 'displayName': 'blockData.json', 'path': 'src/block-editor/blockData.json' }
      ]
    },
    {
      'path': 'block-editor/api',
      'component': 'API',
      'name': 'API',
      'description':'This demo covers important APIs of the JS Block Editor such as HTML encoding, read-only, Drag and Drop, and more.',
      'order': '01',
      'category': 'Block Editor',
      'api':'{ "BlockEditorComponent": ["blocks", "readOnly", "enableDragDrop", "enableHtmlEncode", "getJsonData", "getBlockCount", "selectAllBlocks", "focusIn", "focusOut"] }',
      'sourceFiles': [
        { 'displayName': 'api.tsx', 'path':'src/block-editor/api.tsx' },
        { 'displayName': 'api.jsx', 'path':'src/block-editor/api.jsx' },
        { 'displayName': 'blockData.json', 'path':'src/block-editor/blockData.json' }
      ]
    },
    {
      'path': 'block-editor/events',
      'component': 'Events',
      'name': 'Events',
      'description':'This demo showcases how to handle and interact with various event actions provided by the Block Editor component.',
      'order': '01',
      'category': 'Block Editor',
      'api':'{ "BlockEditorComponent": [ "blocks", "created", "contentChanged", "selectionChanged", "blockAdded", "blockRemoved", "blockMoved", "blockDrag", "blockDragStart", "blockDrop", "focus", "blur" ] }',
      'sourceFiles': [
        { 'displayName': 'events.tsx', 'path':'src/block-editor/events.tsx' },
        { 'displayName': 'events.jsx', 'path':'src/block-editor/events.jsx' },
        { 'displayName': 'blockData.json', 'path':'src/block-editor/blockData.json' }
      ]
    }
  ]
  