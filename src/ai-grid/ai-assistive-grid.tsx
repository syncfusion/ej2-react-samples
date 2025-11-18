import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, Sort, Filter, Group, Page, Search, ToolbarItems, FilterSettingsModel, ColumnModel } from '@syncfusion/ej2-react-grids';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { AIAssistViewComponent, ToolbarSettingsModel, PromptRequestEventArgs, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-interactive-chat';
import { purchaseDetails, PurchaseDetailsArgs } from './datasource';
import { createRef } from "react";
import { fetchAI } from './AIModel';
import { useEffect } from "react";
import { updateAISampleSection } from '../common/sample-base';
import './assistive-grid.css';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

let assistView!: AIAssistViewComponent;
let dialog!: DialogComponent;
let grid!: GridComponent;
let suggestionListRef = createRef<any>();

function AIAssistiveGrid() {
    useEffect(() => {
        updateAISampleSection();
    }, [])

    // Toolbar options for Grid with AI Assist button.
    const toolbarOptions: object[] = [{text: 'AI Assist', tooltipText: 'AI Assist', prefixIcon: 'e-assistview-icon', id: 'ai-assist-btn', align: 'Right' }];

    // Handles the Grid toolbar button click action. If the AI Assist button clicked shows the AI Assist dialog.
    const toolbarClick = (args: ClickEventArgs) => {
        if (args.item.id === 'ai-assist-btn') {
            const gridRect = grid.element.getBoundingClientRect();
            const toolbarRect = document.getElementById('ai-grid_toolbarItems')!.getBoundingClientRect();
            const targetRect = (args.originalEvent.target as HTMLElement).closest('.e-toolbar-item').getBoundingClientRect();
            const x = targetRect.left - gridRect.left - (parseInt(dialog.width.toString()));
            const y = (toolbarRect.top + toolbarRect.height) - gridRect.top;
            dialog.position = { X: x, Y: y };
            dialog.show();
        }
    }

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
                grid.setProperties({
                    sortSettings: { columns: [] },
                    filterSettings: { columns: [] },
                    groupSettings: { columns: [] },
                });
                grid.refresh();
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
        (assistView as any).stopResponding.classList.remove('e-btn-active');
        assistView.scrollToBottom();
        const columns = grid.columns.map((col: any) => { return { field: col.field } });
        columns.forEach((col: { field: string, values: string[] }) => {
            if (col.field === 'status') {
                col.values = ['Completed', 'Pending', 'Failed', 'Processing'];
            }
            else if (col.field === 'paymentMethod') {
                col.values = ['Cheque', 'Credit Card', 'Paypal', 'Online Transfer'];
            }
        })
        fetchAI(args.prompt, grid, dialog, assistView, columns);
    };

    // Sets up suggestion list click handler.
    const created = (): void => {
        suggestionListRef.current.addEventListener('click', (event: any) => {
            if (event.target.tagName === 'LI') {
                const clickedPill = event.target;
                const pillText = clickedPill.textContent;
                assistView.executePrompt(pillText);
            }
        });
    }

    // Renders footer template with suggestion list.
    const dialogFooterTemplate = () => {
        return (
            <div className="e-suggestions">
                <div className="e-suggestion-header">Suggestions</div>
                <div className="e-suggestion-list">
                    <ul ref={suggestionListRef}>
                        <li>Find iPhone 15 Pro</li>
                        <li>Sort Amount from lowest to highest</li>
                        <li>Payment status not completed</li>
                        <li>Group status column</li>
                        <li>Clear Filtering</li>
                        <li>Clear Sorting</li>
                        <li>Remove Grouping</li>
                    </ul>
                </div>
            </div>
        );
    }

    const filterSettings: FilterSettingsModel = { type: 'Excel' };

    return (
        <div>
            <div id='assistive-grid'>
                <DialogComponent ref={(dialogIns: DialogComponent) => dialog = dialogIns as DialogComponent} target='#ai-grid' id='ai-assist-dialog' width='500px' visible={false} height='500px' footerTemplate={dialogFooterTemplate} created={created}>
                    <AIAssistViewComponent id="ai-grid-aiassistview" ref={(assist: AIAssistViewComponent) => assistView = assist as AIAssistViewComponent} toolbarSettings={toolbarSettings} promptRequest={onPromptRequest} promptSuggestionsHeader='Suggestions' responseItemTemplate={responseTemplate} >
                        <ViewsDirective>
                            <ViewDirective type='Assist' name=' Ask AI'></ViewDirective>
                        </ViewsDirective>
                    </AIAssistViewComponent>
                </DialogComponent>
                <GridComponent ref={(gridIns: GridComponent) => grid = gridIns as GridComponent} id="ai-grid" height={650} dataSource={purchaseDetails} allowFiltering={true} allowSorting={true} allowGrouping={true} filterSettings={filterSettings} allowPaging={true} toolbar={toolbarOptions} toolbarClick={toolbarClick} >
                    <ColumnsDirective>
                        <ColumnDirective field="TransactionID" headerText="Transaction ID" width="160"
                        />
                        <ColumnDirective field="CustomerName" headerText="Customer Name" width="220" textAlign="Center"
                            template={(data: PurchaseDetailsArgs) => (
                                <div >
                                    <p>{data.CustomerName}</p>
                                    <p className="email">{data.Email}</p>
                                </div>
                            )} />
                        <ColumnDirective field="ProductName" headerText="Product" width="208" textAlign="Left"
                            template={(data: PurchaseDetailsArgs) => (
                                <div className='product-items'>
                                    <img className="rounded" src={`src/ai-grid/images/sales-transactions-table/${data.ProductImage}`} width={40} height={40} alt="product image" />
                                    <p>{data.ProductName}</p>
                                </div>
                            )}
                        />
                        <ColumnDirective field="Quantity" headerText="Quantity" width="140" textAlign="Right" />
                        <ColumnDirective field="Amount" headerText="Amount" width="130" format="c2" textAlign="Right" />
                        <ColumnDirective field="PurchaseDate" headerText="Purchase Date" width="180" format={{ type: "date", format: "MM/dd/yyyy" }} textAlign="Right" />
                        <ColumnDirective field="PaymentMethod" headerText="Payment Method" width="200" />
                        <ColumnDirective field="Status" headerText="Status" width="120" textAlign='Right'
                            template={(data: PurchaseDetailsArgs) => (
                                <div >
                                    <span className={`e-badge ${data.Status === "Completed" ? "e-badge-success" : data.Status === "Pending" ? "e-badge-info" : data.Status === "Processing" ? "e-badge-warning" : data.Status === "Failed" ? "e-badge-danger" : ""} !px-2`}>{data.Status}</span>
                                </div>
                            )}
                        />
                    </ColumnsDirective>
                    <Inject services={[Toolbar, Sort, Filter, Group, Page, Search]} />
                </GridComponent>
            </div>
        </div>
    )
}

export { AIAssistiveGrid };
