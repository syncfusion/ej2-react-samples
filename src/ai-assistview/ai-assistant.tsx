import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './ai-assistant.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import * as data from './promptResponseData.json';
import { DropDownButton } from '@syncfusion/ej2-react-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import { render } from 'react-dom';

export class AIAssistant extends SampleBase<{}, {}> {

    selectedConvId = "";
    isFirstPrompt = false;
    listDatas = [];
    
    aiAssistViewRef: AIAssistViewComponent;
    sidebarRef: SidebarComponent;
    listViewRef: ListViewComponent;

    assistantResponses:{ [key: string]: string | string[] } [] = data["assistantResponses"];
    
    suggestion: string[] = data["assistantSuggestions"];
    
    // AIAssistView toolbar settings
    toolbarSettings: ToolbarSettingsModel = {
        items: [
            { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
        ]
    };

    attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
    
    // ListView fields settings
    listViewFields = { 
        groupBy: 'category', 
        id: 'id', 
        text: 'text' 
    };
    
    // Banner template for AIAssistView
    bannerTemplate: string = `
        <div class="banner-content e-no-content">
            <div class="e-icons e-assistview-icon"></div>
            <h3>AI Assistance</h3>
            <div class="ai-assist-banner-subtitle">Hello, I'm Your Digital Assistant!</div>
        </div>
    `;
    
    // Templates
    listTemplate = (data: any) => {
       return (
           <div className="chat-item"><div className="chat-title">{data.text}</div></div>
       );
    }
    
    // AIAssistView created event handler
    created = () => {
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
    onListViewSelect = (args: any) => {
        if (args.isInteracted) {
            this.selectedConvId = args.data.id;
            this.updateAIAssistViewData(args.data.id);
            this.updateBannerStyle();
        }
    };
    
    // Reset button click handler
    handleReset = () => {
        this.listViewRef.dataSource = [];
        this.listViewRef.dataBind();
        
        // Clear localStorage
        localStorage.setItem('aiassist-view', JSON.stringify({}));
        
        // Reset the current conversation
        this.selectedConvId= "";
        this.aiAssistViewRef.prompts = [];
        this.aiAssistViewRef.promptSuggestions = this.suggestion;
        this.updateBannerStyle();
    };
    
    // Get current date
    getDate = (): number => {
        return Date.now();
    };
    
    // Format date
    getDateFormat = (date: number): string => {
        const today = new Date(date);
        const yyyy = today.getFullYear();
        let mm: string | number = today.getMonth() + 1; // Months start at 0!
        let dd: string | number = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        return dd + '/' + mm + '/' + yyyy;
    };
    
    // Get category for grouping
    getCategory = (key: number): string => {
        const today = this.getDateFormat(Date.now());
        const date = this.getDateFormat(key);
        
        return date === today ? "Today" : "Previous days";
    };
    
    // Check and initialize localStorage
    checkInitialLocalStorage = (isClear: boolean = false): void => {
        const aiAssistView = localStorage.getItem('aiassist-view');
        if (!aiAssistView || isClear) {
            const data = {};
            localStorage.setItem('aiassist-view', JSON.stringify(data));
        }
        this.refreshConversationList();
    };
    
    // Update banner style based on content
    updateBannerStyle = (): void => {
        const bannerElem = document.querySelector('.banner-content') as HTMLElement;
        if (this.aiAssistViewRef.prompts?.length) {
            bannerElem.classList.remove('e-no-content');
        } else {
            bannerElem.classList.add('e-no-content');
        }
    };
    
    // Check and update localStorage
    checkAndUpdateLocalStorage = (prompt: string): void => {
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView || '{}');
        const curConvDate = this.getDate();
        const prompts: any = [];
        const aiAssistViewInst = this.aiAssistViewRef;
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
        if (this.selectedConvId) {
            const convData = appData[this.selectedConvId];
            if (convData && convData.name === convData.name) {
                // Update list item text if needed
                const dataSource = this.listViewRef.dataSource as any[];
                if (dataSource) {
                    for (let k = 0; k < dataSource.length; k++) {
                        const item = dataSource[k] as any;
                        if (item && item.id === this.selectedConvId) {
                            item.text = convData.name;
                            break;
                        }
                    }
                }
                this.listViewRef.dataBind();
            }
            convData.prompts = prompts;
            convData.promptSuggestions = pSuggestions;
            localStorage.setItem('aiassist-view', JSON.stringify(appData));
        } else {
            const newConvId = curConvDate.toString();
            this.selectedConvId= newConvId;
            const convData = {
                name: prompt,
                prompts: prompts,
                promptSuggestions: pSuggestions
            };
            appData[newConvId] = convData;
            localStorage.setItem('aiassist-view', JSON.stringify(appData));
            this.refreshConversationList();
            this.listViewRef.selectItem({ index: 0 });
        }
    };
    
    // Update conversation name
    updateConversationName = (prompt: string): void => {
        if (this.isFirstPrompt && this.selectedConvId) {
            const aiAssistView = JSON.parse(localStorage.getItem('aiassist-view') || '{}');
            const convData = aiAssistView[this.selectedConvId];
            if (convData?.name === "New Conversation") {
                convData.name = prompt.slice(0, 40).trim();
                localStorage.setItem('aiassist-view', JSON.stringify(aiAssistView));
                this.refreshConversationList();
            }
            this.isFirstPrompt= false;
        }
    };
    
    // Get data for left pane (conversation list)
    getLeftPaneData = () => {
        const today = this.getDateFormat(Date.now());
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView || '{}');
        const keys = Object.keys(appData);
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
                    category: this.getCategory(numericKey),
                    time: this.getDateFormat(numericKey)
                });
            }
        }
        items.sort((a, b) => b.numericId - a.numericId);
        return items;
    };
    
    // Refresh conversation list
    refreshConversationList = (): void => {
        const listData = this.getLeftPaneData();
        this.listDatas= listData;
        this.listViewRef.dataSource = listData;
        this.listViewRef.dataBind();
    };
    
    // Update AIAssistView data
    updateAIAssistViewData = (id: string): void => {
        if (id) {
            const aiAssistView = localStorage.getItem('aiassist-view');
            const appData = JSON.parse(aiAssistView || '{}');
            const convData = appData[id];
            this.aiAssistViewRef.prompts = convData.prompts;
            this.aiAssistViewRef.promptSuggestions = convData.promptSuggestions;
        } else{
            this.aiAssistViewRef.prompts = [];
            this.aiAssistViewRef.promptSuggestions = this.suggestion;
        }
    };
    
    // Load new AI Assist conversation
    loadNewAIAssist = (): void => {
        this.selectedConvId="";
        this.isFirstPrompt=true;
        if (this.listDatas.length !== 0) {
            this.aiAssistViewRef.prompts = [];
            this.aiAssistViewRef.promptSuggestions = this.suggestion;
        }
        const curConvDate = this.getDate().toString();
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView || '{}');
        const convData = {
            name: "New Conversation",
            prompts: [],
            promptSuggestions: this.suggestion
        };
        appData[curConvDate] = convData;
        localStorage.setItem('aiassist-view', JSON.stringify(appData));
        this.refreshConversationList();
        this.selectedConvId= curConvDate;
        this.listViewRef.selectItem({ id: curConvDate })
        this.updateBannerStyle();
    };
    
    // Get AI response
    getResult = async (prompt: string) => {
        const responseObj = this.assistantResponses.find((resp) => resp.prompt === prompt);
        return responseObj ? responseObj.response : "";
    };
    
    // Execute prompt
    execute = async (prompt: string) => {
        try {
            let timeoutId = setTimeout(() => {
                    this.aiAssistViewRef.addPromptResponse(
                        "I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for."
                    );
                this.updateConversationName(prompt);
            }, 2000);
            this.aiAssistViewRef.promptSuggestions = [];           
            let finalResult: string[] = [];
            var result: any = "";
    
            setTimeout(async () => {
                const suggestionsObj = this.assistantResponses.find((resp) => resp.prompt === prompt);
                const suggestionResult = suggestionsObj 
                    ? suggestionsObj.suggestions || this.suggestion 
                    : this.suggestion;
    
                for (let i = 0; i < suggestionResult.length; i++) {
                    if (suggestionResult[i]) {
                        finalResult.push(suggestionResult[i].replace("- ", "").replace("* ", "").trim());
                    }
                }
            }, 1000);
    
            setTimeout(async () => {
                result = await this.getResult(prompt);
                this.aiAssistViewRef.addPromptResponse(result);
                this.aiAssistViewRef.promptSuggestions = finalResult;               
                this.updateBannerStyle();
                this.checkAndUpdateLocalStorage(prompt);
                this.updateConversationName(prompt);
                
                clearTimeout(timeoutId);
            }, 1000);
    
        } catch (error) {
                this.aiAssistViewRef.addPromptResponse(
                    "I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for.");
                this.aiAssistViewRef.promptSuggestions = [];            
            this.updateConversationName(prompt);
        }
        
        if (!this.listDatas || this.listDatas.length !== 0) {
            this.loadNewAIAssist();
        }
    };
    
    render() {
    
        return (
            <div className='control-pane'>
              <div className="control-section">
                  <div>
                      <div className="ai-assistant">
                          <AIAssistViewComponent 
                              id="aiAssistView"
                              ref={aiassistview => (this.aiAssistViewRef = aiassistview)}
                              promptSuggestions={this.suggestion}
                              toolbarSettings={this.toolbarSettings}
                              enableAttachments={true}
                              attachmentSettings={this.attachmentSettings}
                              promptRequest={(args) =>this.execute(args.prompt)}
                              bannerTemplate={this.bannerTemplate}
                              created={this.created}
                          />
                      </div>
                  </div>
              </div>
              <SidebarComponent 
                  id="assistantSidebar"
                  ref={sidebar => (this.sidebarRef = sidebar)}
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
                              <ItemDirective prefixIcon="e-icons e-menu" tooltipText="Toggle sidebar" align="Right" click={() => this.sidebarRef.toggle()}></ItemDirective>
                              <ItemDirective prefixIcon="e-icons e-rename" tooltipText="Start new chat" align="Right" cssClass="new-chat-button" click={this.loadNewAIAssist}></ItemDirective>
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
                              onClick={this.handleReset}
                          ></span>
                      </div>
                      <ListViewComponent
                      id="assistant-listview-grp"
                      ref={listView => (this.listViewRef = listView)}
                      dataSource={this.listDatas}
                      fields={this.listViewFields}
                      template={this.listTemplate}
                      select={this.onListViewSelect}       
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
        )
    }
}