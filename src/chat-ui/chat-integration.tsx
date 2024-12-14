import * as React from 'react';
import { ChatUIComponent, ToolbarSettingsModel, MessageSendEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { SplitterComponent } from '@syncfusion/ej2-react-layouts';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './chat-integration.css';
import * as data from './messageData.json';
import { SampleBase } from '../common/sample-base';

export class ChatIntegration extends SampleBase<{}, {}> {
    chatUiInst: ChatUIComponent;
    listviewInst: ListViewComponent;

    chatMessages = {
        user1: data["integrationMessagedata"],
        admin: data["botMessagedata"],
        user2: data["walterMessagedata"],
        user3: data["lauraMessagedata"],
        team: data["teamsMessagedate"],
        user4: data["suyamaMessagedata"]
    };

    template = '<div ${if(category!==null)} class = "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar" ${else} ' +
        'class = "clearfix e-list-wrapper e-list-multi-line e-list-avatar" ${/if}> ${if(imgSrc!=="")}' +
        '<img class="e-avatar" src="./src/chat-ui/images/${imgSrc}.png" alt="image" style="border-radius: 50%;"/> ' +
        '${/if} <span class="e-list-item-header">${title} </span>' +
        '${if(message!=="")} <div class="chat_message" style="font-size: 12px;">' +
        '${message} </div> ${/if} </div>';

    handleSelect = (args) => {
        this.chatMessages[this.chatUiInst.user.id] = this.chatUiInst.messages;
        this.chatUiInst.suggestions = [];
        this.setupChatUser(args.index);
        if (args.index >= 0) this.toggleListView();
    };

    onCreated = () => {
        this.listviewInst.selectItem(data["integrationListTemplateData"][0]);
    };

    toggleListView = () => {
        const listPopup = document.getElementById('toggle-chat-list');
        if (window.innerWidth < 1200) listPopup.style.display = listPopup.style.display === 'none' || listPopup.style.display === '' ? 'block' : 'none';
    };

    setupChatUser = (index) => {
        const userSettings = [
            { headerText: 'Albert', headerIconCss: 'chat_user1_avatar', user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }, messages: this.chatMessages.user1 },
            { headerText: 'Decor bot', headerIconCss: 'chat_bot_avatar', user: { id: 'admin', user: 'Admin', avatarUrl: './src/chat-ui/images/bot.png' }, messages: this.chatMessages.admin, suggestions: data["chatSuggestions"] },
            { headerText: 'Charlie', headerIconCss: 'chat_user2_avatar', user: { id: 'user2', user: 'Charlie', avatarUrl: './src/chat-ui/images/charlie.png' }, messages: this.chatMessages.user2 },
            { headerText: 'Laura Callahan', headerIconCss: 'chat_user3_avatar', user: { id: 'user3', user: 'Laura', avatarUrl: './src/chat-ui/images/laura.png' }, messages: this.chatMessages.user3 },
            { headerText: 'New Dev Team', headerIconCss: 'chat_team_avatar', user: { id: 'team', user: 'Admin', avatarUrl: './src/chat-ui/images/calendar.png' }, messages: this.chatMessages.team },
            { headerText: 'Reena', headerIconCss: 'chat_user4_avatar', user: { id: 'user4', user: 'Albert' }, messages: this.chatMessages.user4 }
        ];
        Object.assign(this.chatUiInst, userSettings[index]);
        this.chatUiInst.dataBind();
    };

    handleMessageSend = (args: MessageSendEventArgs) => {
        this.chatUiInst.suggestions = [];
        setTimeout(() => {
            if (args.message.author.id === 'admin') {
                const foundMessage = data["botData"].find((message) => message.text === args.message.text);
                const defaultResponse = "Use any real-time data streaming service to provide chat updates.";
                const message = {
                    author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                    text: foundMessage?.reply || defaultResponse
                };
                this.chatUiInst.addMessage(message);
                this.chatUiInst.suggestions = foundMessage?.suggestions || [];
            }
        }, 500);
    };

    render() {
        const userToolbarSettings: ToolbarSettingsModel = {
            items: [
                { iconCss: 'chat-icon-phone-call', align: 'Right', tooltip: 'Audio call' }
            ]
        };
        return (
            <div className='control-pane'>
                <div className="control-section chat-integration">
                    <div className="integration-chatui">
                        <SplitterComponent paneSettings={[{ size: 'auto', resizable: false, cssClass: "chat-leftContent" }, { size: '80%', resizable: false, cssClass: "chat-rightContent" }]} created={() => this.onCreated()}>
                            <div className='chat-usecase-leftPane'>
                                <div className="chat-options-container">
                                    <ButtonComponent iconCss="e-icons e-stamp" cssClass="e-flat chat_options" iconPosition="Top"><span>Activity</span></ButtonComponent>
                                    <ButtonComponent iconCss="e-icons e-comment-show" cssClass="e-flat chat_options chat_interactable" iconPosition="Top" style={{ borderLeft: '2px solid #0f6cbd' }}  onClick={this.toggleListView}><span>Chat</span></ButtonComponent>
                                    <ButtonComponent iconCss="e-icons e-month" cssClass="e-flat chat_options" iconPosition="Top"><span>Calendar</span></ButtonComponent>
                                    <ButtonComponent iconCss="e-icons e-people" cssClass="e-flat chat_options" iconPosition="Top"><span>Teams</span></ButtonComponent>
                                </div>
                                <div id="toggle-chat-list" className="toggle-chat-listview e-card">
                                    <div id="listview_template" tabIndex={1} style={{ border: 'none' }}>
                                        <ListViewComponent
                                            dataSource={data["integrationListTemplateData"]}
                                            template={this.template}
                                            headerTitle="Chats"
                                            cssClass="e-list-template"
                                            showHeader={true}
                                            select={(args) => this.handleSelect(args)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='chat-usecase-rightPane'>
                                    <ChatUIComponent
                                        id="integration-chat"
                                        style={{ border: 'none', height: 'inherit' }}
                                        headerText="Albert"
                                        headerIconCss="chat_user1_avatar"
                                        messages={this.chatMessages.user1}
                                        user={{ id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }}
                                        headerToolbar={userToolbarSettings}
                                        messageSend={(args) => this.handleMessageSend(args)}
                                    />
                            </div>
                        </SplitterComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This example demonstrates how to design a chat application using the Chat UI component, with dynamic switching between users' messages. The Chat UI component is customized using various properties and includes a header toolbar for additional functionality.</p>
                </div>
                <div id="description">
                    <p>
                        This example demonstrates how to use the Chat UI component to display chat messages for multiple users. The chat interface allows switching between users' conversations, with bot responses triggered by user input. A header toolbar is included, and a splitter layout displays the chat alongside a list view for easy navigation.
                    </p>
                    <p>
                        The chat UI dynamically updates to reflect the selected user's conversation, providing an interactive experience with seamless switching between different chats. The responsive design ensures that the interface adapts to various screen sizes, making it user-friendly across devices.
                    </p>
                </div>
            </div>
        );
    }
}