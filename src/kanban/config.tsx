export const KanbanSampleOrder: Object = [
    { 'path': 'kanban/overview', 'component': 'Overview', 'name': 'Overview', 'order': '01', 'category': 'Kanban', 'api': '{"KanbanComponent": ["dataSource", "keyField", "columns", "cardSettings", "swimlaneSettings", "enableTooltip"] }', 'description': 'This example demonstrates the overview functionalities of Kanban component. Enabled most features such as templating, swimlane and more in the Kanban board.' },
    {
        'path': 'kanban/default', 'component': 'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Kanban',  'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "dialogSettings"] }',
        'description': 'The example demonstrates the default functionalities of JS Kanban with very minimal essential settings such as data source, columns, and card details.'
    },
    {
        'path': 'kanban/swimlane', 'component': 'Swimlane', 'name': 'Swimlane', 'order': '01', 'category': 'Kanban', 'api':
            '{"KanbanComponent": ["dataSource", "keyField", "columns", "cardSettings", "swimlaneSettings"] }',
        'description': 'The example explains how to configure swimlane and its related settings (sorting order, drag-and-drop, and more) in JavaScript Kanban board.'
    },
    {
        'path': 'kanban/workflow', 'component': 'Workflow', 'name': 'Workflow', 'order': '01', 'category': 'Kanban', 'api':
            '{"KanbanComponent": ["dataSource", "keyField", "columns", "cardSettings"] }',
        'description': 'The example demonstrates a workflow feature that controls the flow of cards while drag-and-drop the cards between the columns.'
    },
    {
        'path': 'kanban/stacked-header', 'component': 'StackedHeader', 'name': 'Stacked Header', 'order': '01', 'category': 'Kanban', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "stackedHeaders"] }',
        'description': 'The example explains how to add a stacked header to group logically related columns above a column header in JS Kanban.'
    },
    {
        'path': 'kanban/dialog-editing', 'component': 'DialogEditing', 'name': 'Dialog Editing', 'order': '01', 'category': 'Kanban', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "dialogSettings", "dialogOpen"] }',
        'description': 'The example explains how to handle the CRUD (Create, Read, Update, and Delete) actions on the JS Kanban cards from the application end.'
    },
    {
        'path': 'kanban/search-filter', 'component': 'SearchFilter', 'name': 'Search and Filter Cards', 'order': '01', 'category': 'Kanban',  'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "swimlaneSettings", "query"] }',
        'description': 'The example demo shows how to filter the cards and make searching when more number of cards on a JavaScript Kanban board that helps you to focus.'
    },
    {
        'path': 'kanban/sorting', 'component': 'Sorting', 'name': 'Sorting Cards', 'order': '01', 'category': 'Kanban',  'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "sortSettings"] }',
        'description': 'The example demonstrates how to sort the cards in the ascending or descending based on the data source order or indexing or custom field on the Kanban board.'
    },
    {
        'path': 'kanban/virtual-scrolling', 'component': 'VirtualScrolling', 'name': 'Virtual Scrolling', 'order': '01', 'category': 'Kanban', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "dialogSettings", "enableTooltip"] }',
        'description': 'The example demonstrates how to load a large number of cards in the React Kanban board with optimal load time using the virtual scrolling feature.'
    },
    {
        'path': 'kanban/local-data', 'component': 'LocalData', 'name': 'Local Data', 'order': '02', 'category': 'Data Binding', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings"] }',
        'description': 'The example demonstrates how to bind data to the JavaScript Kanban board from the array of JavaScript objects (JSON) or instances of Data Manager.'
    },
    {
        'path': 'kanban/remote-data', 'component': 'RemoteData', 'name': 'Remote Data', 'order': '02', 'category': 'Data Binding', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "allowDragAndDrop", "dialogOpen"] }',
        'description': 'The example demonstrates how to bind data to the JavaScript Kanban board from the array of JavaScript objects (JSON) or instances of Data Manager.'
    },
    {
        'path': 'kanban/header-template', 'component': 'HeaderTemplate', 'name': 'Header Template', 'order': '03', 'category': 'Templates', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings"] }',
        'description': 'The example demonstrates how to customize the column headers of the JS Kanban board with text, images, badges, and count using HTML templates.'
    },
    {
        'path': 'kanban/swimlane-template', 'component': 'SwimlaneTemplate', 'name': 'Swimlane Template', 'order': '03', 'category': 'Templates', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "swimlaneSettings"] }',
        'description': 'The example demonstrates how to customize the swimlane headers of the JS Kanban board using HTML templates, which is applicable to all swimlane headers.'
    },
    {
        'path': 'kanban/card-template', 'component': 'CardTemplate', 'name': 'Card Template', 'order': '03', 'category': 'Templates', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "dialogSettings" ] }',
        'description': 'The example demonstrates how to customize the JavaScript Kanban cards using templates, which is used to design beautiful cards with text, images, and more.'
    },
    {
        'path': 'kanban/tooltip-template', 'component': 'TooltipTemplate', 'name': 'Tooltip Template', 'order': '03', 'category': 'Templates', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "enableTooltip", "tooltipTemplate"] }',
        'description': 'The example demonstrates how to enable and disable the tooltip messages on JavaScript Kanban cards, and customize using templates.'
    },
    {
        'path': 'kanban/toggle-columns', 'component': 'ToggleColumns', 'name': 'Toggle Columns', 'order': '04', 'category': 'Columns', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings"] }',
        'description': 'This sample demonstrates the toggle column of JS Kanban, which is helpful to expand and collapse the columns and can be collapsed on page load also.'
    },
    {
        'path': 'kanban/show-hide', 'component': 'ShowHideColumns', 'name': 'Show/Hide Columns', 'order': '04', 'category': 'Columns', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings"] }',
        'description': 'This sample demonstrates the toggle column of JS Kanban, which is helpful to expand and collapse the columns and can be collapsed on page load also.'
    },
    {
        'path': 'kanban/wip-validation', 'component': 'WIPValidation', 'name': 'WIP Validation', 'order': '05', 'category': 'Validation', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings", "swimlaneSettings"] }',
        'description': 'The Work-in-progress (WIP) validation demo demonstrates the minimum and maximum limit of card per column or swimlane in JavaScript Kanban board.'
    },
    {
        'path': 'kanban/api', 'component': 'API', 'name': 'API', 'order': '06', 'category': 'Miscellaneous', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "columns", "cardSettings"] }',
        'description': 'The example showcases the important APIs of JavaScript Kanban in the property panel, which are used to manipulate the Kanban board dynamically.'
    },
    {
        'path': 'kanban/events', 'component': 'Events', 'name': 'Events', 'order': '06', 'category': 'Miscellaneous', 'api':
            '{"KanbanComponent": [ "dataSource", "keyField", "height", "columns", "cardSettings", "swimlaneSettings", "created", "actionBegin", "actionComplete", "actionFailure", "dataBinding", "dataBound", "cardRendered", "queryCellInfo", "cardClick", "cardDoubleClick", "dragStart", "drag", "dragStop" ] }',
        'description': 'The sample showcases the client-side events of JavaScript Kanban with event tracer, which is helpful to customize the Kanban board from application end.'
    }
]