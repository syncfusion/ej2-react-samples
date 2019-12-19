export const TreeViewSampleOrder = [
    { 'path': 'treeview/default', 'component': 'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'TreeView', 'description': 'This demo demonstrates the basic tree view component that display the data in a hierarchical structure with the configuration options.', 'api': '{"TreeViewComponent":["fields"] }', 'sourceFiles': [
            { 'displayName': 'default.tsx', 'path': 'src/treeview/icons.tsx' },
            { 'displayName': 'default.jsx', 'path': 'src/treeview/icons.jsx' },
            { 'displayName': 'default-data.json', 'path': 'src/treeview/dataSource/default-data.json' }
        ] },
    { 'path': 'treeview/icons', 'component': 'Icons', 'name': 'Icons and Images', 'order': '01', 'category': 'TreeView', 'description': 'The tree view nodes can be rendered with any custom icons. This sample demonstrated like a file system with custom icons and images.', 'api': '{"TreeViewComponent":["fields","sortOrder"] }', 'sourceFiles': [
            { 'displayName': 'icons.tsx', 'path': 'src/treeview/icons.tsx' },
            { 'displayName': 'icons.jsx', 'path': 'src/treeview/icons.jsx' },
            { 'displayName': 'icons.css', 'path': 'src/treeview/icons.css' },
            { 'displayName': 'icons-data.json', 'path': 'src/treeview/dataSource/icons-data.json' }
        ]
    },
    { 'path': 'treeview/check-box', 'component': 'Checkbox', 'name': 'Checkbox', 'order': '01', 'category': 'TreeView', 'description': 'This demo demonstrates the tree view with checkbox functionality, this allows the user to check more than one tree nodes.', 'api': '{"TreeViewComponent":["fields","showCheckBox"] }', 'sourceFiles': [
            { 'displayName': 'check-box.tsx', 'path': 'src/treeview/check-box.tsx' },
            { 'displayName': 'check-box.jsx', 'path': 'src/treeview/check-box.jsx' },
            { 'displayName': 'checkbox-data.json', 'path': 'src/treeview/dataSource/checkbox-data.json' }
        ] },
    { 'path': 'treeview/node-editing', 'component': 'Editing', 'name': 'Node Editing', 'order': '01', 'category': 'TreeView', 'description': 'This demo showcases the node editing functionality of tree view, you can edit any node text by double click on it or pressing F2.', 'api': '{"TreeViewComponent":["fields","allowEditing"] }', 'sourceFiles': [
            { 'displayName': 'node-editing.tsx', 'path': 'src/treeview/node-editing.tsx' },
            { 'displayName': 'node-editing.jsx', 'path': 'src/treeview/node-editing.jsx' },
            { 'displayName': 'nodeEdit-data.json', 'path': 'src/treeview/dataSource/nodeEdit-data.json' }
        ] },
    { 'path': 'treeview/multiple-selection', 'component': 'MultiSelect', 'name': 'Multiple Selection', 'order': '01', 'category': 'TreeView', 'hideOnDevice': true, 'description': 'The TreeView component allows to select multiple nodes by pressing CTRL key, also can select the range of nodes by pressing SHIFT key.', 'api': '{"TreeViewComponent":["fields","allowMultiSelection"] }', 'sourceFiles': [
            { 'displayName': 'multiple-selection.tsx', 'path': 'src/treeview/multiple-selection.tsx' },
            { 'displayName': 'multiple-selection.jsx', 'path': 'src/treeview/multiple-selection.jsx' },
            { 'displayName': 'multiSelect-data.json', 'path': 'src/treeview/dataSource/multiSelect-data.json' }
        ] },
    { 'path': 'treeview/drag-and-drop', 'component': 'Dragdrop', 'name': 'Drag and Drop', 'order': '01', 'category': 'TreeView', 'hideOnDevice': true, 'description': 'The tree view nodes can be drag and drop from one position to another, also the drop can be done to another tree view or other external container.', 'api': '{"TreeViewComponent":["fields","allowDragAndDrop","allowMultiSelection","nodeDragStop"] }', 'sourceFiles': [
            { 'displayName': 'drag-and-drop.tsx', 'path': 'src/treeview/drag-and-drop.tsx' },
            { 'displayName': 'drag-and-drop.jsx', 'path': 'src/treeview/drag-and-drop.jsx' },
            { 'displayName': 'drag-and-drop.css', 'path': 'src/treeview/drag-and-drop.css' },
            { 'displayName': 'drag-data.json', 'path': 'src/treeview/dataSource/drag-data.json' }
        ] },
    { 'path': 'treeview/template', 'component': 'Template', 'name': 'Template', 'order': '01', 'category': 'TreeView', 'description': 'The tree view node can be customized through the template option. In this demo the tree view nodes are templated like an mail system.', 'api': '{"TreeViewComponent":["fields","cssClass","nodeTemplate"] }', 'sourceFiles': [
            { 'displayName': 'template.tsx', 'path': 'src/treeview/template.tsx' },
            { 'displayName': 'template.jsx', 'path': 'src/treeview/template.jsx' },
            { 'displayName': 'template.css', 'path': 'src/treeview/template.css' },
            { 'displayName': 'template-data.json', 'path': 'src/treeview/dataSource/template-data.json' }
        ] },
    { 'path': 'treeview/local-data', 'component': 'LocalData', 'name': 'Local Data', 'order': '02', 'category': 'Data Binding', 'description': 'This demo demonstrates the binding of local data to the tree view. The local data structure can be hierarchical data or list data.', 'api': '{"TreeViewComponent":["fields"] }', 'sourceFiles': [
            { 'displayName': 'local-data.tsx', 'path': 'src/treeview/local-data.tsx' },
            { 'displayName': 'local-data.jsx', 'path': 'src/treeview/local-data.jsx' },
            { 'displayName': 'local-data.json', 'path': 'src/treeview/dataSource/local-data.json' },
            { 'displayName': 'local-data.css', 'path': 'src/treeview/local-data.css' }
        ] },
    { 'path': 'treeview/remote-data', 'component': 'RemoteData', 'name': 'Remote Data', 'order': '02', 'category': 'Data Binding', 'description': 'This demo for Essential JS 2 treeview control shows how to bind the data from a remote data service.', 'api': '{"TreeViewComponent":["fields","created","dataBound"] }' }
];
