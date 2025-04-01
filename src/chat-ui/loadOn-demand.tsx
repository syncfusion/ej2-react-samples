import { MessageModel, UserModel, ChatUIComponent } from "@syncfusion/ej2-react-interactive-chat";
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './loadOn-demand.css';

interface LoadOnDemandState {
    chatMessages: MessageModel[];
}

export class LoadOnDemand extends SampleBase<{}, LoadOnDemandState> {
    currentUserModel: UserModel;
    michaleUserModel: UserModel;
    constructor(props: {}) {
        super(props);
        this.state = {
            chatMessages: [] // Initialize chatMessages as an empty array
        };
    }

    componentDidMount() {
        this.currentUserModel = {
            id: "user1",
            user: "Albert"
        };

        this.michaleUserModel = {
            id: "user2",
            user: "Michale Suyama",
            avatarUrl: './src/chat-ui/images/andrew.png'
        };

        let chatMessages: MessageModel[] = [];
        let baseDate = new Date();
        baseDate.setDate(baseDate.getDate() - 3);
        let dayIncrement = 24 * 60 * 60 * 1000;
        let authorNames = ["Albert", "Michale"];

        for (let i = 1; i <= 200; i++) {
            if (i % 50 === 1 && i !== 1) {
                // Increment the day only every 50 messages except the very first one
                baseDate = new Date(baseDate.getTime() + dayIncrement);
            }
            let authorIndex = i % 2;

            chatMessages.push({
                text: 'Message ' + i + ' from ' + authorNames[authorIndex],
                author: authorIndex === 0 ? this.currentUserModel : this.michaleUserModel,
                timeStamp: new Date((baseDate.getTime() - ((200 * 60 * 1000)) + ((60 * 1000) * i)))
            });
        }
        this.setState({ chatMessages });
    }

    render() {
        return (
            <div className="control-pane">
                <div className="control-section chat-ui">
                    <div className="loadonDemand-chatui">
                        <ChatUIComponent headerText='Michale Suyama' headerIconCss="chat_user2_avatar" showTimeBreak={true} loadOnDemand={true} user={this.currentUserModel} messages={this.state.chatMessages} />
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the load on-demand feature of the Chat UI component to render a large number of data's.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, the chat <code>messages</code> are the list of conversations between two users allowing to scroll through their conversation history.
                        The <code>loadOnDemand</code> property allows you to load more messages on demand, improving the performance and reducing load times, particularly in long conversations. Only the visible conversations are render, reducing the amount of DOM elements and improving the overall performance.It highlights the improving performance and reducing load times, particularly in long conversations.
                    </p>
                </div>
            </div>
        );
    }
}