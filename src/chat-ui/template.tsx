import * as React from 'react';
import { ChatUIComponent } from '@syncfusion/ej2-react-interactive-chat';
import './template.css';
import * as data from './messageData.json';
import { SampleBase } from '../common/sample-base';

export class Template extends SampleBase<{}, {}> {
    chatUiInst: ChatUIComponent;

    componentDidMount() {
        // Initial bot message with suggestions
        setTimeout(() => {
            const message = {
                author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                text: data["templateMessagedata"][0].text,
                suggestions: data["templateMessagedata"][0].suggestions
            };
            this.chatUiInst.addMessage(message);
            this.bindClickAction();
        }, 1500);
    }

    emptyChatTemplate = () => (
        <div className="emptychat-content">
            <h3><span className="e-icons e-comment-show"></span></h3>
            <div className="emptyChatText" style={{fontSize: '16px'}}>Just a second, we're preparing your chat...</div>
        </div>
    );

    messageTemplate = (context) => {
        const isAdmin = context.message.author.id === 'admin';
        const userImage = !isAdmin ? (
            <img className="message-user" src={context.message.author.avatarUrl} alt="User Avatar" />
        ) : null;
        const suggestions = context.message.suggestions && context.message.suggestions.length > 0 && !isAdmin ? (
            <div className="message-suggestions">
                {context.message.suggestions.map((suggestion, index) => (
                    <button key={index} className="suggestion-button e-btn e-primary e-outline">{suggestion}</button>
                ))}
            </div>
        ) : null;
        return (
            <div className='message-wrapper'>
                <div className='message-template'>
                    {userImage}
                    <div className="message-items e-card">
                        <div className="message-text" dangerouslySetInnerHTML={{ __html: context.message.text}}></div>
                    </div>
                </div>
                <div className="suggestion-container">
                    {suggestions}
                </div>
            </div>
        );
    };

    timeBreakTemplate = (context) => {
        let dateText = context.messageDate.toDateString() === new Date().toDateString() ? 'Today' : context.messageDate;
        return (
            <div className="timebreak-template">{dateText}</div>
        );
    };

    bindClickAction = () => {
        setTimeout(() => {
            if (this.chatUiInst) {
                this.chatUiInst.element.querySelectorAll('.suggestion-button').forEach(suggestion => {
                    suggestion.addEventListener('click', () => this.handleSuggestionClick(suggestion));
                });
            }
        });
    };

    handleSuggestionClick = (suggestion) => {
        const templateChatUI = this.chatUiInst;
        if (templateChatUI) {
            const message = data["templateMessagedata"].find((message) => message.text === suggestion.innerText);
            if (message) {
                templateChatUI.addMessage(message.text);
                setTimeout(() => {
                    const messageModel = {
                        author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                        text: message.reply,
                        suggestions: message.suggestions
                    };
                    templateChatUI.addMessage(messageModel);
                    this.bindClickAction();
                    if (message.suggestions.length === 0) { templateChatUI.showFooter = true; }
                }, 500);
                suggestion.parentElement.innerHTML = '';
            }
        }
    };

    handleMessageSend = () => {
        setTimeout(() => {
            const defaultResponse = "Unfortunately, I don't have information on that. Use any real-time data streaming service to provide chat updates.";
            const message = {
                author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                text: defaultResponse
            };
            this.chatUiInst.addMessage(message);
        }, 500);
    };

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="template-chatui">
                            <ChatUIComponent
                                headerText="Order Assistant"
                                headerIconCss="chat-bot"
                                showTimeBreak={true}
                                showFooter={false}
                                autoScrollToBottom={true}
                                user={{ id: 'admin', user: 'Admin', avatarUrl: './src/chat-ui/images/bot.png' }}
                                emptyChatTemplate={this.emptyChatTemplate}
                                messageTemplate={this.messageTemplate}
                                timeBreakTemplate={this.timeBreakTemplate}
                                messageSend={() => this.handleMessageSend()}
                            />
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the template functionality of the Chat UI component, showing how you can customize various elements of the chat interface. It highlights the ability to adjust the appearance of message items, time breaks, and empty chat screens using templates.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, a bot provides order tracking updates by customizing each message using the templates. The <code>messageTemplate</code> property controls the layout of messages, including the avatar, message content, and suggestions. The <code>timeBreakTemplate</code> adjusts the display of time breaks, showing either "Today" or the specific date.
                    </p>
                    <p>
                        The bot sends a default response when a message is sent, and suggestions appear below the message. When a suggestion is clicked, the bot replies with a new message or set of suggestions, demonstrating how templates enhance the interaction flow within the Chat UI component.
                    </p>
                </div>
            </div>
        );
    }
}