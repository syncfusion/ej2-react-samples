export const UploaderSampleOrder:Object = [
    { 'path': 'uploader/default', 'component':'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Uploader', 'api': '{ "Uploader": ["autoUpload", "asyncSettings", "success", "dropArea"]}' },
    { 'path': 'uploader/customtemplate', 'component':'CustomTemplate', 'name': 'Template', 'order': '01', 'category': 'Uploader', 'api': '{"Uploader": [ "asyncSettings", "success", "dropArea", "selected", "progress", "failure", "removing" ]}' },
    { 'path': 'uploader/preloadfiles', 'component':'Preloadfiles', 'name': 'Preload files', 'order': '01', 'category': 'Uploader', 'api': '{"Uploader": [ "asyncSettings", "success", "dropArea", "files", "failure", "removing" ]}' },
    { 'path': 'uploader/validation', 'component':'Validation', 'name': 'File Validation', 'order': '01', 'category': 'Uploader', 'api': '{"Uploader": [ "asyncSettings", "autoUpload", "minFileSize", "allowedExtensions", "success", "dropArea", "selected" ]}' },
    { 'path': 'uploader/preview', 'component':'Preview', 'name': 'Image Preview', 'order': '01', 'category': 'Uploader', 'api': '{"Uploader": [ "asyncSettings", "failure", "progress", "template", "allowedExtensions", "success", "dropArea", "selected" ]}' }
]
