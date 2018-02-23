export const SidebarSampleOrder:Object = [
    { 'path': 'sidebar/default', 'component':'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Sidebar', 'api': '{ "SidebarComponent": ["type", "position", "showBackdrop", "closeOnDocumentClick", "change", "mediaQuery"] }' },
    { 'path': 'sidebar/dock', 'component':'Dock', 'name': 'Dock', 'order': '01', 'category': 'Sidebar', 'api': '{ "Sidebar": ["enableDock", "dockSize", "contextTo"]}' },
    { 'path': 'sidebar/api', 'component':'API', 'name': 'API', 'order': '01', 'category': 'Sidebar', 'api': '{ "Sidebar": ["showBackdrop", "position", "types", "closeOnDocumentClick"] }'},
    { 'path': 'sidebar/sidebar-list', 'component':'SidebarWithList', 'name': 'Sidebar With ListView', 'order': '01', 'category': 'Sidebar', 'api': '{ "Sidebar": ["open", "close"] }'}
]