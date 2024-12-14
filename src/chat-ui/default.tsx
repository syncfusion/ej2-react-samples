import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ChatUIComponent, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import './default.css';
import * as data from './messageData.json';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {
  chatUser1Ref: ChatUIComponent;
  chatUser2Ref: ChatUIComponent;

  componentDidMount() {
    const chatUser1 = this.chatUser1Ref;
    const chatUser2 = this.chatUser2Ref;
    if (chatUser1 && chatUser2) {
      this.initializeDropdown(chatUser1, '#dduser1Menu');
      this.initializeDropdown(chatUser2, '#dduser2Menu');
    }
  }

  initializeDropdown(chatUser: ChatUIComponent, buttonId: string) {
    const dropdownConfig = {
      items: [
        { text: 'Mute', iconCss: 'e-icons e-eye-slash' },
        { separator: true },
        { text: 'Delete', iconCss: 'e-icons e-trash' }
      ],
      iconCss: 'e-icons e-more-horizontal-1',
      cssClass: 'e-caret-hide',
      select: (args: MenuEventArgs) => {
        if (['Mute', 'Unmute'].includes(args.item.text)) {
          args.item.text = args.item.text === 'Mute' ? 'Unmute' : 'Mute';
        }
        if (args.item.text === 'Delete') {
          chatUser.messages = [];
        }
      }
    };
    new DropDownButton(dropdownConfig, buttonId);
  }

  handleUserTyping = (args, otherChatUser: ChatUIComponent | null) => {
    if (!args.isTyping) {
      if (otherChatUser) {
        otherChatUser.typingUsers = otherChatUser.typingUsers.filter(userItem => userItem.user !== args.user.user);
      }
    } else {
      if (otherChatUser && !otherChatUser.typingUsers.some(userItem => userItem.user === args.user.user)) {
        otherChatUser.typingUsers = [...otherChatUser.typingUsers, args.user];
      }
    }
  }

  handleMessageSend = (args, sender) => {
    this.chatUser2Ref.suggestions = [];
    if (sender === 'user1') {
      this.chatUser2Ref.messages = [...this.chatUser1Ref.messages, args.message];
    } else if (sender === 'user2') {
      this.chatUser1Ref.messages = [...this.chatUser2Ref.messages, args.message];
    }
  };

  render() {
    const user1ToolbarSettings: ToolbarSettingsModel = {
      items: [
        { type: 'Input', template: '<button id="dduser1Menu" style="border: none; background: none !important;"></button>', align: 'Right' }
      ]
    };

    const user2ToolbarSettings: ToolbarSettingsModel = {
      items: [
        { type: 'Input', template: '<button id="dduser2Menu" style="border: none; background: none !important;"></button>', align: 'Right' }
      ]
    };

    return (
      <div className='control-pane'>
        <div className="control-section chat-ui">
          <div className="default-chatui">
            <ChatUIComponent
              headerText='Albert'
              headerIconCss="chat_user1_avatar"
              user={{ id: 'user2', user: 'Reena', avatarUrl: './src/chat-ui/images/reena.png' }}
              messages={data["chatMessagedata"]}
              userTyping={(args) => this.handleUserTyping(args, this.chatUser2Ref)}
              headerToolbar={user1ToolbarSettings}
              messageSend={(args) => this.handleMessageSend(args, 'user1')}
            />
            <ChatUIComponent
              headerText='Reena'
              headerIconCss="chat_user2_avatar"
              user={{ id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }}
              messages={data["chatMessagedata"]}
              suggestions={data["defaultChatSuggestions"]}
              userTyping={(args) => this.handleUserTyping(args, this.chatUser1Ref)}
              headerToolbar={user2ToolbarSettings}
              messageSend={(args) => this.handleMessageSend(args, 'user2')}
            />
            </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the features of the Chat UI component, designed to simulate a real-time chat interface. It highlights customizable elements like headers, avatars, synchronized messaging update, and real-time typing indicators.</p>
        </div>
        <div id="description">
          <p>
            In this example, two Chat UI web components are used to represent users <b>Albert</b> and <b>Reena</b>, each with a unique header, avatar, and toolbar. Messages are instantly synchronized between the two users through the <code>messageSend</code> event, while typing indicators are shown in the other chat interface via the <code>userTyping</code> event, adding a more interactive feel.
            This example demonstrates how to use the Chat UI component to display chat messages for multiple users. The chat interface allows switching between users' conversations, with bot responses triggered by user input. A header toolbar is included, and a splitter layout displays the chat alongside a list view for easy navigation.
          </p>
        </div>
      </div>
      )
    }
}