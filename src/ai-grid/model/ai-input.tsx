import { serverAIRequest } from '../backend/ai-service';
import { executeGridAction } from './GridAction';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import { AIAssistViewComponent } from '@syncfusion/ej2-react-interactive-chat';
import { generateSchema } from './sf-ai-schema';

function fetchAI(text: string | undefined, grid: GridComponent, assistView: AIAssistViewComponent, columns: any) {
    let schema = generateSchema('Grid');
    let required = schema.required;
    let state: any = JSON.parse(grid.getPersistData());
    delete state.columns;
    schema.props.properties.properties = state;

    let prompt = `You are an assistant that helps users customize a grid showing Gadget purchase details. You help users modify grid configuration to fit their needs.
Use the provided schema to adjust grid features according to the user's request.
Change only what the user explicitly asked for — do not modify unrelated parts of the state.
Provide a clear explanation of what you changed (or why nothing was changed).

### Handling Non-Grid Queries
If the user's message is clearly a casual greeting, general question, or any query unrelated to grid configuration (e.g., "Hi", "How are you?", "Who developed you?"), respond naturally and conversationally to that query only. Do not attempt to interpret it as a grid request, do not make any grid state changes, and do not mention grid features unless the user explicitly brings them up.
 
### Available Columns
These are the only valid columns you may reference (case-insensitive, allow reasonable near matches for common typos/misspellings):
${JSON.stringify(columns)}
 
Strictly validate any column name mentioned in the request against the above list. If a requested column does not exist or cannot be reasonably matched, ignore that part of the request and explain why in the response.
 
### Current grid state:
${JSON.stringify(state)}
 
### Schema:
${JSON.stringify(schema)}
 
### State structure rules:
{
  "sortSettings": { "columns": [{"field": "ColumnName", "direction": "Ascending" | "Descending"}] },
  // Empty array [] clears sorting
  "filterSettings": { "columns": [{"field": "ColumnName", "operator": ..., "value": any}] },
  // Empty array [] clears filtering
  "groupSettings": { "columns": ["ColumnName1", ...] },
  // Empty array [] clears grouping
  "pageSettings": { "pageSize": number, "currentPage": number }
}

### Additional Rules:
 
1. **Grouping Validation**  
   The grid must always display at least one data column.  
   Maximum allowed grouped columns: ${columns.length - 1}  
   If the user's request would result in groupSettings.columns.length === ${columns.length},  
   reject the change, keep previous groupSettings, and explain:  
   "Unable to group by all columns — at least one column must remain visible for data display."
 
2. **Unsupported Actions**  
   If the user requests a feature not supported (e.g., search, column hiding, export, etc.),  
   do not modify the state and explain:
   "This action is not supported in the current grid schema."
 
### Required Output Format:
${required}
 
Always respond strictly in valid JSON as defined in the required results format.`

    let aiOutput = serverAIRequest({ messages: [{ role: 'system', content: prompt }, { role: 'user', content: text }] });
    aiOutput.then((result: string) => {
        if (!result) {
            return;
        }
        let jsonResult = result;
        if (result.indexOf("```json") !== -1) {
            jsonResult = result.split("```json")[1].split("```")[0].trim();
        }
        let data;
        let response: string = '';
        try {
            if (jsonResult.indexOf('{') !== -1 && jsonResult.indexOf('}') !== -1) {
                data = JSON.parse(jsonResult);
                
            } else {
                response = jsonResult;
            }
            if (data && data.props) {
                if (data.props.groupSettings && data.props.groupSettings.columns.length === grid.columns.length) {
                    response = 'By default, the grid does not group all the columns. You must display at least one normal column in the grid.';
                } else {
                    executeGridAction(data, grid, data.includedProps);
                    response = data.explanation;
                }
                if (data.props.filterSettings && data.props.filterSettings.columns.length == 0) {
                    response = 'The grid currently has no active filters.';
                }
                else if (data.props.groupSettings && data.props.groupSettings.columns.length === 0) {
                    response = 'The grid currently has no active group column.';
                }
                else if (data.props.sortSettings && data.props.sortSettings.columns.length === 0) {
                    response = 'The grid currently has no active sort column.';
                }
            }
        } catch (error) {
            assistView.addPromptResponse({ prompt: error, response: error });
            return;
        }
        assistView.addPromptResponse({ response: response });
    });
}

export { fetchAI };