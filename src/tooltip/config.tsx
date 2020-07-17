export const TooltipSampleOrder: Object = [{
    'path': 'tooltip/default',
    'component': 'Default',
    'name': 'Default Functionalities',
    'order': '04',
    'category': 'Tooltip',
    'description': 'Default rendering of the Essential JS 2 Tooltip control, which will open when hovering or tapping and holding, and can be displayed in 12 different positions.',
    'api': '{"TooltipComponent": ["content", "appendTo", "position"]}'
},
{
    'path': 'tooltip/template',
    'component': 'TemplateTooltip',
    'name': 'Template',
    'order': '04',
    'category': 'Tooltip',
    'description': 'Demo of the Essential JS 2 Tooltip control template functionality, which allows HTML content to be rendered in tooltips.',
    'api': '{"TooltipComponent": ["content", "target", "beforeRender", "showTipPointer", "offsetX", "width", "appendTo"]}',
    'sourceFiles': [{ 'displayName': 'template.tsx', 'path': 'src/tooltip/template.tsx' },{ 'displayName': 'template.jsx', 'path': 'src/tooltip/template.jsx' },{ 'displayName': 'tooltip-sample.css', 'path': 'src/tooltip/tooltip-sample.css' }]
},
{
    'path': 'tooltip/ajaxcontent',
    'component': 'AjaxContentTooltip',
    'name': 'Ajax Content',
    'order': '04',
    'category': 'Tooltip',
    'description': 'Demo of the Essential JS 2 Tooltip control loading dynamic content in tooltips through Ajax from JSON files.',
    'api': '{"TooltipComponent": ["content", "target", "beforeRender", "position", "dataBind", "appendTo"]}',
    'sourceFiles': [{ 'displayName': 'ajaxcontent.tsx', 'path': 'src/tooltip/ajaxcontent.tsx' },{ 'displayName': 'ajaxcontent.jsx', 'path': 'src/tooltip/ajaxcontent.jsx' },{ 'displayName': 'tooltip-sample.css', 'path': 'src/tooltip/tooltip-sample.css' },{ 'displayName': 'tooltipdata.json', 'path': 'src/tooltip/tooltipdata.json' }]
},
{
    'path': 'tooltip/smartposition',
    'component': 'DraggableTooltip',
    'name': 'Smart Positioning',
    'order': '04',
    'category': 'Tooltip',
    'description': 'Demo of the Essential JS 2 Tooltip control smart (flexible) positioning based on the view port dimensions.',
    'api': '{"TooltipComponent": ["content", "target", "animation", "open", "offsetX", "close", "refresh", "appendTo"]}'
},
{
    'path': 'tooltip/tooltip-menu',
    'component': 'TooltipMenu',
    'name': 'Tooltip Menu',
    'order': '04',
    'category': 'Tooltip',
    'description': 'Demo of Essential JS 2 Tooltip control customization to look like a menu using toolbar and listview controls.',
    'api': '{"TooltipComponent": ["content", "target", "open",  "close", "refresh"]}',
    'sourceFiles': [{ 'displayName': 'tooltip-menu.tsx', 'path': 'src/tooltip/tooltip-menu.tsx' },{ 'displayName': 'tooltip-menu.jsx', 'path': 'src/tooltip/tooltip-menu.jsx' },{ 'displayName': 'tooltip-menu.css', 'path': 'src/tooltip/tooltip-menu.css' }]
},
{
    'path': 'tooltip/html-content',
    'component': 'HtmlContentTooltip',
    'name': 'HTML Content',
    'order': '04',
    'category': 'Tooltip',
    'description': 'Demo of Essential JS 2 Tooltip control customization as an HTML page using HTML tags to display a template content.',
    'api': '{"TooltipComponent": ["content", "target", "open",  "close", "refresh"]}',
    'sourceFiles': [{ 'displayName': 'html-content.tsx', 'path': 'src/tooltip/html-content.tsx' },{ 'displayName': 'html-content.jsx', 'path': 'src/tooltip/html-content.jsx' },{ 'displayName': 'html-content.css', 'path': 'src/tooltip/html-content.css' }]
},
{
    'path': 'tooltip/api',
    'component': 'ApiTooltip',
    'name': 'API',
    'order': '04',
    'category': 'Tooltip',
    'description': 'Essential JS 2 Tooltip control demo showcasing the most frequently used API combinations, like content, height, width, open, sticky mode, and more.',
    'api': '{"TooltipComponent": ["content", "target", "open",  "close", "refresh", "width", "height", "opensOn"]}',
    'sourceFiles': [{ 'displayName': 'api.tsx', 'path': 'src/tooltip/api.tsx' },{ 'displayName': 'api.jsx', 'path': 'src/tooltip/api.jsx' },{ 'displayName': 'api.css', 'path': 'src/tooltip/api.css' }]
}
]