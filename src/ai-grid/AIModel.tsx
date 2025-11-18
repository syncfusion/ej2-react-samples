import { serverAIRequest } from '../common/ai-service';
import { executeGridAction } from './GridAction';
import { GridComponent} from '@syncfusion/ej2-react-grids';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { AIAssistViewComponent } from '@syncfusion/ej2-react-interactive-chat';

function fetchAI(text: string | undefined, grid: GridComponent, dialog: DialogComponent, assistView: AIAssistViewComponent, columns: Object) {
    let textArea = `Convert the following natural language query into a JSON object representing Syncfusion Query operations.

    Rules:
    - Output only the JSON object, with no extra text.
    - Available columns: ${JSON.stringify(columns)}.
    - Sort direction must be either "Ascending" or "Descending".
    
    Action Handling:
    - Include only actions explicitly mentioned in the query: filter, sort, page, group, clearFilter, clearSort, clearGroup.
    - Supported filter operators: startswith, endswith, contains, doesnotstartwith, doesnotendwith, doesnotcontain, equal, notequal, greaterthan, greaterthanorequal, lessthan, lessthanorequal, isnull, isnotnull, isempty, isnotempty, between, in, notin.
    - If the query involves only filtering, include only the "filter" key.
    - If the query involves only sorting, include only the "sort" key.
    - For clear actions:
    - Use clearFilter: [] to clear all filters.
    - Use clearSort: [] to clear all sorting.
    - Use clearGroup: [] to clear all grouping.
    - To clear specific fields, include them as arrays: clearFilter: ["field1"], clearSort: ["field2"], clearGroup: ["field3"].
    
    Supported Operations:
    - filter: [{ field, operator, value (array for "in"/"notin", otherwise single value), ignoreCase }]
    - sort: [{ field, direction }] // columns not available return []
    - page: { pageNumber }  // for page navigation not pagesize
    - group: [fields] - return group: [] if the columns not available.
    
    Additional Requirement:
    - sort/group/filter only by available columns.
    - Include a "message" field describing the interpreted query action and expected behavior.
    - Handled actions: paging, filtering, sorting, grouping.
    - If the action is not handled by this schema, need to clearly explain the action not handled in this schema and how to achieve it in Syncfusion React Grid. Dont explain the JSON structure.
    User Input: ${text}`;

    let aiOutput = serverAIRequest({ messages: [{ role: 'user', content: textArea }] });
    aiOutput.then((result: string) => {
        if (!result) {
            return;
        }
        let jsonResult = result;
        if (result.indexOf("```json") !== -1) {
            jsonResult = result.split("```json")[1].split("```")[0].trim();
        }
        let data;
        try {
            data = JSON.parse(jsonResult);
            executeGridAction(data, grid);
        } catch (error) {
            assistView.addPromptResponse({ prompt: error, response: error });
            return;
        }
        assistView.addPromptResponse({ response: data.message });
    });
}

export {fetchAI};