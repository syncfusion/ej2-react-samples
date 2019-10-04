export const FileManagerSampleOrder: Object = [
    { 'path': 'file-manager/overview', 'component': 'Overview', 'name': 'Overview', 'description': 'This example demonstrates full view of the File Manager like a windows explorer UI  in a React File Manager.', 'order': '01', 'category': 'File Manager', 'api': '{"FileManager":["ajaxSettings", "view"] }'},
    { 'path': 'file-manager/custom-thumbnail', 'component': 'CustomThumbnail', 'name': 'Custom Thumbnails', 'description': 'This example demonstrates the how to use the custom thumbnails for files and folders in a React File Manager.', 'order': '01', 'category': 'File Manager', 'api': '{"FileManager":["ajaxSettings"] }',
    'sourceFiles': [
        { 'displayName': 'custom-thumbnail.tsx', 'path': 'src/file-manager/custom-thumbnail.tsx' },
        { 'displayName': 'custom-thumbnail.jsx', 'path': 'src/file-manager/custom-thumbnail.jsx' },
        { 'displayName': 'custom-thumbnail.css', 'path': 'src/file-manager/custom-thumbnail.css' }
    ] },
    { 'path': 'file-manager/default', 'component': 'Default', 'name': 'API', 'description': 'This example demonstrates how to render the File Manager without the navigation pane in a React File Manager.', 'order': '01', 'category': 'File Manager', 'api': '{"FileManager":["ajaxSettings"] }'},
    { 'path': 'file-manager/drag-drop', 'component': 'DragAndDrop', 'name': 'Drag and Drop', 'description': 'This example demonstrates the how to drag and drop the files from one location to another location in a React File Manager.', 'order': '01', 'category': 'File Manager', 'api': '{"FileManager":["ajaxSettings"] }'},
    { 'path': 'file-manager/file-upload', 'component': 'FileUpload', 'name': 'File Upload', 'description': 'This example demonstrates how to render the File Manager component inside the Dialog component in a React File Manager.', 'order': '02', 'category': 'Use Case', 'api': '{"FileManager":["ajaxSettings"] }',
    'sourceFiles': [
        { 'displayName': 'file-upload.tsx', 'path': 'src/file-manager/file-upload.tsx' },
        { 'displayName': 'file-upload.jsx', 'path': 'src/file-manager/file-upload.jsx' },
        { 'displayName': 'file-upload.css', 'path': 'src/file-manager/file-upload.css' }
    ] },
    { 'path': 'file-manager/azure-service', 'component': 'Azure', 'name': 'Azure Blob Provider', 'description': 'This example demonstrates the how to configure and use the azure cloud service in a React File Manager.', 'order': '03', 'category': 'Cloud Service Providers','api': '{"FileManager":["ajaxSettings"] }'},
    { 'path': 'file-manager/sql-server-provider', 'component': 'SqlServer', 'name': 'SQL Database Provider', 'description': 'This example demonstrates how to configure and use the sql server database service in a React File Manager.', 'order': '03', 'category': 'Cloud Service Providers', 'type':'new', 'api': '{"FileManager":["ajaxSettings", "view"] }'},
    { 'path': 'file-manager/nodejs-file-provider', 'component': 'NodeJSServer', 'name': 'NodeJS File Provider', 'description': 'This example demonstrates how to configure and use the nodejs server database service in a React File Manager.', 'order': '03', 'category': 'Cloud Service Providers', 'type':'new', 'api': '{"FileManager":["ajaxSettings", "view"] }'},
    { 'path': 'file-manager/AmazonS3Provider', 'component': 'AmazonS3Provider', 'name': 'Amazon S3 File Provider', 'description': 'This example demonstrates how to configure and use the Amazon S3 provider service in a React File Manager.', 'order': '03', 'category': 'Cloud Service Providers', 'type':'new', 'api': '{"FileManager":["ajaxSettings", "view"] }'},
    { 'path': 'file-manager/firebase', 'component': 'Firebase', 'name': 'Firebase Realtime File Provider', 'description': 'This example demonstrates how to configure and use the firebase realtime database service in a React File Manager.', 'order': '03', 'category': 'Cloud Service Providers', 'type':'new', 'api': '{"FileManager":["ajaxSettings", "view"] }'}
]
