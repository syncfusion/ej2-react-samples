import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { AIAssistViewComponent, ToolbarSettingsModel, PromptRequestEventArgs, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-interactive-chat';
import { pivotProductData } from '../datasource';
import { createRef } from "react";
import { fetchAI } from '../model/ai-input';
import { useEffect } from "react";
import { updateAISampleSection } from '../../common/sample-base';
import './assistive-pivot.css';
import { CalculatedField, GroupingBar, FieldList, Toolbar, PivotViewComponent, type IDataOptions, Inject, ConditionalFormatting, NumberFormatting } from '@syncfusion/ej2-react-pivotview';

let dialog!: DialogComponent;
let pivotObj!: PivotViewComponent;
let assistView!: AIAssistViewComponent;
let suggestionListRef = createRef<any>();

function AIAssistivePivot() {
    useEffect(() => {
        updateAISampleSection();
    }, [])

    let dataSourceSettings: IDataOptions = {
        enableSorting: true,
        allowLabelFilter: true,
        allowValueFilter: true,
        columns: [{name: 'Year'}, {name: 'Quarter'}],
        rows: [{ name: 'Country', expandAll: true}, {name: 'Product_Categories'}],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        dataSource: pivotProductData,
        expandAll: false,
        values: [{ name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
        sortSettings: [{name: 'Year', order:"Ascending"}],
        filterSettings: [{name: 'Quarter', items: ['Q3'], type: 'Exclude'}],
        conditionalFormatSettings: [
            {
                measure: 'Amount',
                value1: 250000,
                conditions: 'LessThan',
                style: {
                    backgroundColor: '#FF005C',
                    color: 'white',
                    fontFamily: 'Tahoma',
                    fontSize: '12px'
                },
                applyGrandTotals: false
            },
            {
                value1: 10000,
                measure: 'Sold',
                conditions: 'GreaterThan',
                style: {
                    backgroundColor: '#35B65A',
                    color: 'white',
                    fontFamily: 'Tahoma',
                    fontSize: '12px'
                },
                applyGrandTotals: false
            }
        ],
        showSubTotals: false
    };

    // Handles the Grid toolbar button click action. If the AI Assist button clicked shows the AI Assist dialog.
    const toolbarClick = (args: any) => {
        if (args.item.id === 'ai-assist-btn') {
            const gridRect = pivotObj.element.getBoundingClientRect();
            const toolbarRect = document.getElementById('ai-pivotpivot-toolbar')!.getBoundingClientRect();
            const targetRect = (args.originalEvent.target as HTMLElement).closest('.e-toolbar-item').getBoundingClientRect();
            const x = targetRect.left - (parseInt(dialog.width.toString()));
            const y = (toolbarRect.top + toolbarRect.height);
            dialog.position = { X: x, Y: y };
            dialog.show();
        }
    }

    // Toolbar options for Grid with AI Assist button.
    const toolbarOptions: any = ['FieldList', 'Grid', 'Chart', {text: 'AI Assist', tooltipText: 'AI Assist', prefixIcon: 'e-assistview-icon', id: 'ai-assist-btn', align: 'Right', click: toolbarClick.bind(this) }];

    // Configures toolbar settings for AI assist dialog.
    const toolbarSettings: ToolbarSettingsModel = {
        items: [
            { tooltip: 'Start New Chat', iconCss: 'e-icons e-rename', align: 'Right' },
            { tooltip: 'Clear', iconCss: 'e-icons e-refresh', align: 'Right' },
            { tooltip: 'Close', iconCss: 'e-icons e-icon-dlg-close', align: 'Right' },
        ],
        itemClicked: (args) => {
            if (args.item.iconCss === 'e-icons e-icon-dlg-close') {
                dialog.hide()
            }
            if (args.item.iconCss === 'e-icons e-rename') {
                assistView.prompts = [];
            }
            if (args.item.iconCss === 'e-icons e-refresh') {
                assistView.prompts = [];
                pivotObj.setProperties({
                    dataSourceSettings: dataSourceSettings,
                    displayOption: { view: 'Both', primary: 'Table' }
                });
                pivotObj.refresh();
            }
        }
    };

    // Renders response template for AI prompts.
    const responseTemplate = (props: { prompt: string, response: string }) => {
        return (
            <div className="response-item-content">
                <div className="response-header">
                    <span className="e-icons e-assistview-icon"></span>
                    {props.response}
                </div>
            </div>
        );
    };

    // Handles prompt request execution.
    const onPromptRequest = (args: PromptRequestEventArgs) => {
        assistView.scrollToBottom();
        const dataSourceSettings = JSON.parse(pivotObj.getPersistData()).dataSourceSettings;
        fetchAI(args.prompt, pivotObj, assistView, dataSourceSettings);
    };
    
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (!dialog.visible) return;
            const dialogElement = document.querySelector('#ai-assist-dialog.e-dialog');
            if (dialogElement && !dialogElement.contains(event.target as Node)) {
                dialog.hide();
            }
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);

    const suggestions = ["Sort Country field by descending", "Show only data from France and Germany", "Change the Sold field aggregation from sum to avg", "Clear filtering"];

    // Renders footer template with suggestion list.
    const dialogFooterTemplate = () => {
        const handleClick = (text: string) => {
            assistView.executePrompt(text);
        };
        return (
            <div className="e-suggestions">
                <div className="e-suggestion-header">Suggestions</div>
                <div className="e-suggestion-list">
                    <ul ref={suggestionListRef}>
                        {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleClick(suggestion)}>
                            {suggestion}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    const beforeToolbarRender = (args: any) => {
        for (var i = 0; i < args.customToolbar.length; i++) {
            var prefixIcon = args.customToolbar[i].prefixIcon ? args.customToolbar[i].prefixIcon : '';
            if (prefixIcon.includes('e-toolbar-fieldlist')) {
                delete args.customToolbar[i].align;
            }
        }
    }

    return (
         <div>
            <div id='assistive-pivot'>
                <DialogComponent ref={(dialogIns: DialogComponent) => dialog = dialogIns as DialogComponent} id='ai-assist-dialog' width='500px' visible={false} height='500px' footerTemplate={dialogFooterTemplate}>
                    <AIAssistViewComponent id="ai-pivot-aiassistview" ref={(assist: AIAssistViewComponent) => assistView = assist as AIAssistViewComponent} toolbarSettings={toolbarSettings} promptRequest={onPromptRequest} promptSuggestionsHeader='Suggestions' responseItemTemplate={responseTemplate} >
                        <ViewsDirective>
                            <ViewDirective type='Assist' name=' Ask AI'></ViewDirective>
                        </ViewsDirective>
                    </AIAssistViewComponent>
                </DialogComponent>
                 <PivotViewComponent id='ai-pivot' ref={(pivot: PivotViewComponent) => pivotObj = pivot as PivotViewComponent} dataSourceSettings={dataSourceSettings} width={'100%'} height={'650'} gridSettings={{ columnWidth: 140 }}
                    displayOption= {{ view: 'Both', primary: 'Table' }} enableValueSorting={true} allowCalculatedField={true} showGroupingBar={true} showFieldList={true} showToolbar={true} allowConditionalFormatting={true} allowNumberFormatting={true} toolbar={toolbarOptions} toolbarRender={beforeToolbarRender}>
                    <Inject services={[GroupingBar, FieldList, CalculatedField, Toolbar, ConditionalFormatting, NumberFormatting]} />
                </PivotViewComponent>
            </div>
        </div>
    )
}

export { AIAssistivePivot };
