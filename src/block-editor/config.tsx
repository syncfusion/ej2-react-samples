export const BlockEditorSampleOrder: Object = [
    {
      'path': 'block-editor/overview',
      'component': 'Overview',
      'name': 'Overview',
      'type': 'update',
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
      'path': 'block-editor/pasteSettings',
      'component': 'PasteSettings',
      'name': 'Paste Cleanup',
      'description':'This demo covers important API pasteSettings of the JS Block Editor includes deniedTags, allowedStyles, keepFormat and plainText .',
      'order': '01',
      'category': 'Block Editor',
      'api':'{ "BlockEditorComponent": [ "blocks", "pasteSettings" ] }',
      'sourceFiles': [
        { 'displayName': 'pasteSettings.tsx', 'path':'src/block-editor/pasteSettings.tsx' },
        { 'displayName': 'pasteSettings.jsx', 'path':'src/block-editor/pasteSettings.jsx' },
        { 'displayName': 'blockData.json', 'path':'src/block-editor/blockData.json' }
      ]
    },
    {
      'path': 'block-editor/api',
      'component': 'API',
      'name': 'API',
      'description':'This demo covers important APIs of the JS Block Editor such as HTML encoding, read-only, Drag and Drop, and more.',
      'order': '01',
      'category': 'Block Editor',
      'api':'{ "BlockEditorComponent": ["blocks", "readOnly", "enableDragDrop", "getJsonData", "getBlockCount", "selectAllBlocks"] }',
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
      'api':'{ "BlockEditorComponent": [ "blocks", "created", "blockChange", "selectionChanged", "blockDragging", "blockDragStart", "blockDropped", "blur", "beforePaste", "afterPaste"] }',
      'sourceFiles': [
        { 'displayName': 'events.tsx', 'path':'src/block-editor/events.tsx' },
        { 'displayName': 'events.jsx', 'path':'src/block-editor/events.jsx' },
        { 'displayName': 'blockData.json', 'path':'src/block-editor/blockData.json' }
      ]
    },
        {
      'path': 'block-editor/template',
      'component': 'TemplateGallery',
      'name': 'Template Gallery',
      'description':'This demo covers fully-featured Template Gallery built with block types and table blocks of the Block Editor component',
      'order': '02',
      'category': 'Use Cases',
      'api':'{ "BlockEditorComponent": [ "blocks" ] }',
      'sourceFiles': [
        { 'displayName': 'template.tsx', 'path':'src/block-editor/template.tsx' },
        { 'displayName': 'template.jsx', 'path':'src/block-editor/template.jsx' },
        { 'displayName': 'blockData.json', 'path':'src/block-editor/blockData.json' }
      ]
    },
    {
      'path': 'block-editor/markdown',
      'component': 'MarkdownBlocks',
      'name': 'Markdown Blocks',
      'description':'This example demonstrates covers fully-featured documentation viewer built the markdown supports along with the Block Editor component',
      'order': '02',
      'category': 'Use Cases',
      'api':'{ "BlockEditorComponent": [ "blocks" ] }',
      'sourceFiles': [
        { 'displayName': 'markdown.tsx', 'path':'src/block-editor/markdown.tsx' },
        { 'displayName': 'markdown.jsx', 'path':'src/block-editor/markdown.jsx' },
        { 'displayName': 'blockData.json', 'path':'src/block-editor/blockData.json' }
      ]
    }
  ]
  