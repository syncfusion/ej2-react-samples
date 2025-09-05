import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './ai-assistant.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import * as data from './promptResponseData.json';
import { DropDownButton } from '@syncfusion/ej2-react-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';

const AIAssistant = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

        const [selectedConvId, setSelectedConvId] = useState<string>("");
        const [isFirstPrompt, setIsFirstPrompt] = useState<boolean>(false);
        const [listData, setListData] = useState<any[]>([]);
    
        const aiAssistViewRef = useRef<AIAssistViewComponent>(null);
        const sidebarRef = useRef<SidebarComponent>(null);
        const listViewRef = useRef<ListViewComponent>(null);

        const assistantResponses:{ [key: string]: string | string[] } [] = data["assistantResponses"];
    
        const suggestion: string[] = data["assistantSuggestions"];
    
        // AIAssistView toolbar settings
        const toolbarSettings: ToolbarSettingsModel = {
            items: [
                { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
            ]
        };

        const attachmentSettings = {
            saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
        };
    
        // ListView fields settings
        const listViewFields = { 
            groupBy: 'category', 
            id: 'id', 
            text: 'text' 
        };
    
        // Banner template for AIAssistView
        const bannerTemplate: string = `
            <div class="banner-content e-no-content">
                <div class="e-icons e-assistview-icon"></div>
                <h3>AI Assistance</h3>
                <div class="ai-assist-banner-subtitle">Hello, I'm Your Digital Assistant!</div>
            </div>
        `;
    
        // Initialize components and load data
        useEffect(() => {
            checkInitialLocalStorage();
        }, []);
    
        // Templates
        const listTemplate = (data: any) => {
           return (
               <div className="chat-item"><div className="chat-title">{data.text}</div></div>
           );
        }
    
        // AIAssistView created event handler
        const created = () => {
            new DropDownButton({
                content: 'Profile',
                items: [
                    { text: 'Settings', iconCss: 'e-icons e-settings' },
                    { separator: true },
                    { text: 'Log out', iconCss: 'e-icons e-export' }
                ],
                iconCss: 'e-icons e-user',
                cssClass: 'sign-in-button',
            }, '#ddMenu');
        };
    
        // ListView item selected event handler
        const onListViewSelect = (args: any) => {
            if (args.isInteracted) {
                setSelectedConvId(args.data.id);
                updateAIAssistViewData(args.data.id);
                updateBannerStyle();
            }
        };
    
        // Reset button click handler
        const handleReset = () => {
            listViewRef.current.dataSource = [];
            listViewRef.current.dataBind();
            localStorage.setItem('aiassist-view', JSON.stringify({}));
            setSelectedConvId("");
            aiAssistViewRef.current.prompts = [];
            aiAssistViewRef.current.promptSuggestions = suggestion;
            updateBannerStyle();
        };
    
        // Get current date
        const getDate = (): number => {
            return Date.now();
        };
    
        // Format date
        const getDateFormat = (date: number): string => {
            const today = new Date(date);
            const yyyy = today.getFullYear();
            let mm: string | number = today.getMonth() + 1; // Months start at 0!
            let dd: string | number = today.getDate();
            
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            
            return dd + '/' + mm + '/' + yyyy;
        };
    
        // Get category for grouping
        const getCategory = (key: number): string => {
            const today = getDateFormat(Date.now());
            const date = getDateFormat(key);
            
            return date === today ? "Today" : "Previous days";
        };
    
        // Check and initialize localStorage
        const checkInitialLocalStorage = (isClear: boolean = false): void => {
            const aiAssistView = localStorage.getItem('aiassist-view');
            if (!aiAssistView || isClear) {
                const data = {};
                localStorage.setItem('aiassist-view', JSON.stringify(data));
            }
            refreshConversationList();
        };
    
        // Update banner style based on content
        const updateBannerStyle = (): void => {
            const bannerElem = document.querySelector('.banner-content') as HTMLElement;
            if (aiAssistViewRef.current?.prompts?.length) {
                bannerElem.classList.remove('e-no-content');
            } else {
                bannerElem.classList.add('e-no-content');
            }
        };
    
        // Check and update localStorage
        const checkAndUpdateLocalStorage = (prompt: string): void => {
            const aiAssistView = localStorage.getItem('aiassist-view');
            const appData = JSON.parse(aiAssistView || '{}');
            const curConvDate = getDate();
            const prompts: any = [];
            const aiAssistViewInst = aiAssistViewRef.current;
            const orgPrompts = aiAssistViewInst.prompts || [];
            for (let i = 0; i < orgPrompts.length; i++) {
                const tPrompt = {
                    prompt: orgPrompts[i].prompt || "",
                    response: orgPrompts[i].response || ""
                };
                prompts.push(tPrompt);
            }
            const pSuggestions: string[] = [];
            const orgPSuggestions = aiAssistViewInst?.promptSuggestions || [];
            for (let j = 0; j < orgPSuggestions.length; j++) {
                pSuggestions.push(orgPSuggestions[j]);
            }
            if (selectedConvId) {
                const convData = appData[selectedConvId];
                if (convData && convData.name === convData.name) {
                    const dataSource = listViewRef.current?.dataSource as any[];
                    if (dataSource) {
                        for (let k = 0; k < dataSource.length; k++) {
                            const item = dataSource[k] as any;
                            if (item && item.id === selectedConvId) {
                                item.text = convData.name;
                                break;
                            }
                        }
                    }
                    if (listViewRef.current) {
                        listViewRef.current.dataBind();
                    }
                }
                convData.prompts = prompts;
                convData.promptSuggestions = pSuggestions;
                localStorage.setItem('aiassist-view', JSON.stringify(appData));
            } else {
                const newConvId = curConvDate.toString();
                setSelectedConvId(newConvId);
                const convData = {
                    name: prompt,
                    prompts: prompts,
                    promptSuggestions: pSuggestions
                };
                appData[newConvId] = convData;
                localStorage.setItem('aiassist-view', JSON.stringify(appData));
                refreshConversationList();
                if (listViewRef.current) {
                    listViewRef.current.selectItem({ index: 0 });
                }
            }
        };
    
        // Update conversation name
        const updateConversationName = (prompt: string): void => {
            if (isFirstPrompt && selectedConvId) {
                const aiAssistView = JSON.parse(localStorage.getItem('aiassist-view') || '{}');
                const convData = aiAssistView[selectedConvId];
                if (convData?.name === "New Conversation") {
                    convData.name = prompt.slice(0, 40).trim();
                    localStorage.setItem('aiassist-view', JSON.stringify(aiAssistView));
                    
                    refreshConversationList();
                }
                setIsFirstPrompt(false);
            }
        };
    
        // Get data for left pane (conversation list)
        const getLeftPaneData = () => {
            const today = getDateFormat(Date.now());
            const aiAssistView = localStorage.getItem('aiassist-view');
            const appData = JSON.parse(aiAssistView || '{}');
            const keys = Object.keys(appData);
    
            // Create array of items with their numeric IDs for proper sorting
            const items: any = [];
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const numericKey = parseInt(key);
                const convData = appData[key];
                if (convData && convData.name) {
                    const name = convData.name.split('\n')[0];
    
                    items.push({
                        text: name,
                        id: key,
                        numericId: numericKey, // Extra field for sorting
                        category: getCategory(numericKey),
                        time: getDateFormat(numericKey)
                    });
                }
            }
            items.sort((a, b) => b.numericId - a.numericId);
            return items;
        };
    
        // Refresh conversation list
        const refreshConversationList = (): void => {
            const listData = getLeftPaneData();
            setListData(listData);
            listViewRef.current.dataSource = listData;
            listViewRef.current.dataBind();
        };
    
        // Update AIAssistView data
        const updateAIAssistViewData = (id: string): void => {
            if (id && aiAssistViewRef.current) {
                const aiAssistView = localStorage.getItem('aiassist-view');
                const appData = JSON.parse(aiAssistView || '{}');
                const convData = appData[id];
                aiAssistViewRef.current.prompts = convData.prompts;
                aiAssistViewRef.current.promptSuggestions = convData.promptSuggestions;
            } else{
                aiAssistViewRef.current.prompts = [];
                aiAssistViewRef.current.promptSuggestions = suggestion;
            }
        };
    
        // Load new AI Assist conversation
        const loadNewAIAssist = (): void => {
            setSelectedConvId("");
            setIsFirstPrompt(true);
            if (listData.length !== 0) {
                aiAssistViewRef.current.prompts = [];
                aiAssistViewRef.current.promptSuggestions = suggestion;
            }
            const curConvDate = getDate().toString();
            const aiAssistView = localStorage.getItem('aiassist-view');
            const appData = JSON.parse(aiAssistView || '{}');
            const convData = {
                name: "New Conversation",
                prompts: [],
                promptSuggestions: suggestion
            };
            appData[curConvDate] = convData;
            localStorage.setItem('aiassist-view', JSON.stringify(appData));
            refreshConversationList();
            setSelectedConvId(curConvDate);
            if (listViewRef.current) {
                listViewRef.current.selectItem({ id: curConvDate });
            }
            updateBannerStyle();
        };
    
        // Get AI response
        const getResult = async (prompt: string) => {
            const responseObj = assistantResponses.find((resp) => resp.prompt === prompt);
            const result = responseObj.response;
            return result;
        };
    
        // Execute prompt
        const execute = async (prompt: string) => {
            try {
                let timeoutId = setTimeout(() => {
                        aiAssistViewRef.current?.addPromptResponse(
                            "I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for."
                        );
                    updateConversationName(prompt);
                }, 2000);
                aiAssistViewRef.current.promptSuggestions = [];           
                let finalResult: string[] = [];
                var result: any = "";
                setTimeout(async () => {
                    const suggestionsObj = assistantResponses.find((resp) => resp.prompt === prompt);
                    const suggestionResult = suggestionsObj 
                        ? suggestionsObj.suggestions || suggestion 
                        : suggestion;
                    for (let i = 0; i < suggestionResult.length; i++) {
                        if (suggestionResult[i]) {
                            finalResult.push(suggestionResult[i].replace("- ", "").replace("* ", "").trim());
                        }
                    }
                }, 1000);
                setTimeout(async () => {
                    result = await getResult(prompt);
                    aiAssistViewRef.current.addPromptResponse(result);
                    aiAssistViewRef.current.promptSuggestions = finalResult;               
                    updateBannerStyle();
                    checkAndUpdateLocalStorage(prompt);
                    updateConversationName(prompt);
                    
                    clearTimeout(timeoutId);
                }, 1000);
            } catch (error) {
                if (aiAssistViewRef.current) {
                    aiAssistViewRef.current.addPromptResponse(
                        "I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for."
                    );
                    aiAssistViewRef.current.promptSuggestions = [];
                }
                updateConversationName(prompt);
            }
            if (!listData || listData.length === 0) {
                loadNewAIAssist();
            }
        };
    
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div>
                        <div className="ai-assistant">
                            <AIAssistViewComponent 
                                id="aiAssistView"
                                ref={aiAssistViewRef}
                                promptSuggestions={suggestion}
                                toolbarSettings={toolbarSettings}
                                enableAttachments={true}
                                attachmentSettings= {attachmentSettings}
                                promptRequest={(args) =>execute(args.prompt)}
                                bannerTemplate={bannerTemplate}
                                created={created}
                            />
                        </div>
                    </div>
                </div>
                <SidebarComponent 
                    id="assistantSidebar"
                    ref={sidebarRef}
                    width="260px"
                    target=".ai-assistant"
                    position="Left"
                    enableDock={true}
                    dockSize="75px"
                    enableGestures={false}>
                    <div className="assistant-sidebar-header">
                        <ToolbarComponent id="assistantToolbar">
                            <ItemsDirective>
                                <ItemDirective prefixIcon="e-icons e-assistview-icon" tooltipText="Ai-Assistant"></ItemDirective>
                                <ItemDirective prefixIcon="e-icons e-menu" tooltipText="Toggle sidebar" align="Right" click={() => sidebarRef.current?.toggle()}></ItemDirective>
                                <ItemDirective prefixIcon="e-icons e-rename" tooltipText="Start new chat" align="Right" cssClass="new-chat-button" click={loadNewAIAssist}></ItemDirective>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>
                    <div className="assistant-sidebar-content">
                        <div className="assistant-listview-option" tabIndex={1}>
                            <div className="e-icons e-multiple-comment"></div>
                            <div className="header-conversation">Chat Conversations</div>
                            <span 
                                className="e-icons e-refresh" 
                                title="Reset" 
                                id="resetButton"
                                onClick={handleReset}
                            ></span>
                        </div>
                        <ListViewComponent 
                        id="assistant-listview-grp"
                        ref={listViewRef}
                        dataSource={listData}
                        fields={listViewFields}
                        template={listTemplate}
                        select={onListViewSelect}               
                        />
                    </div>
                </SidebarComponent>
    
                <div id="action-description">
                    <p>This sample demonstrates an AI chat assistant with conversation management. Users can create new conversations and receive AI-generated responses with relevant suggestions.</p>
                </div>
                <div id="description">
                    <p>The AI AssistView component in this example showcases integration of an AI assistant with conversation history management which includes:</p>
                    <ul>
                        <li>Sidebar with organized conversation history, categorized by date (Today and Previous days)</li>
                        <li>Customizable banner interface using <code>bannerTemplate</code> for guidance messages</li>
                        <li>Intelligent follow-up suggestions after each response via <code>promptSuggestions</code></li>
                        <li>Local storage integration for persisting conversation history across sessions</li>
                        <li>Toolbar with convenient actions: new chat, toggle sidebar, and user profile</li>
                    </ul>
                    <p>This example demonstrates how to build an AI assistant interface with conversation management, providing users with a seamless and productive AI interaction experience.</p>
                </div>
            </div>
        );
    };
export default AIAssistant;