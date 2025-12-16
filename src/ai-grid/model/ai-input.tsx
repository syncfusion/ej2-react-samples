import { serverAIRequest } from '../backend/ai-service';
import { executeGridAction } from './GridAction';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { AIAssistViewComponent } from '@syncfusion/ej2-react-interactive-chat';
import { generateSchema } from './sf-ai-schema';

function fetchAI(text: string | undefined, grid: GridComponent, assistView: AIAssistViewComponent, columns: any) {
    let schema = generateSchema('Grid');
    let includedProps = schema.properties.props.properties;
    let includedDescription = schema.properties.props.description;
    let ignoredProps = schema.properties.ignoreProps.default;
    let ignoredDescription = schema.properties.ignoreProps.description;
    let additionalProperties = schema.additionalProperties;
    let required = schema.required;
    let confidence = schema.properties.confidence;

    let textArea = `
You are an assistant that helps users customize a table showing Gadget purchase details. You help users modify grid configuration to fit their needs.

Use the provided schema to adjust table features according to the user's request.

Current grid state: ${JSON.stringify(grid.getPersistData())}

Change only what the user explicitly asked for, not the complete state. Provide a clear explanation of what you changed.

Important: Only modify the properties that the user specifically requested. If they ask to "Find IPhone 15 Pro", only include columnVisibility in your response, not other unrelated properties.
Where possible, arugment the provided state

Grid Available columns: ${JSON.stringify(columns)} strictly ensure the actions only for this available columns, if not columns available no grid state changed,
Grid includedProps: ${JSON.stringify(includedProps)},
Grid ignoredProperties: ${JSON.stringify(ignoredProps)} must be prevent this action to change this properties,
Explanation: Based on the user request and its result,
Required result: ${JSON.stringify(required)},
confidence: ${JSON.stringify(confidence)} based on ai result,
Previous Grid Action maintaining: ${JSON.stringify(additionalProperties)},

Required Results: ${required}`

    let aiOutput = serverAIRequest({ messages: [{ role: 'system', content: textArea }, { role: 'user', content: text }] });
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
                executeGridAction(data, grid, data.includedProps);
                response = data.description;
            } else {
                response = jsonResult;
            }
        } catch (error) {
            assistView.addPromptResponse({ prompt: error, response: error });
            return;
        }
        if (data && data.confidence < 0.7) {
            aiOutput = serverAIRequest({ messages: [{ role: 'system', content: textArea }, { role: 'user', content: text }] });
        }
        assistView.addPromptResponse({ response: response });
    });
}

export { fetchAI };