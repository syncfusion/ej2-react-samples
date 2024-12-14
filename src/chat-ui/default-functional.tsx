import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ChatUIComponent, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import './default.css';
import * as data from './messageData.json';

const Default = () => {
  const chatUser1Ref = useRef<ChatUIComponent>(null);
  const chatUser2Ref = useRef<ChatUIComponent>(null);

  useEffect(() => {
    updateSampleSection();
    const chatUser1 = chatUser1Ref.current;
    const chatUser2 = chatUser2Ref.current;

    if (chatUser1 && chatUser2) {
      // Initialize the dropdown buttons
      const dropdownConfig = (chatUser) => ({
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
      });

      new DropDownButton(dropdownConfig(chatUser1), '#dduser1Menu');
      new DropDownButton(dropdownConfig(chatUser2), '#dduser2Menu');
    }
  }, []);

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

  const handleUserTyping = (args, otherChatUser) => {
    if (!args.isTyping) {
      otherChatUser.typingUsers = otherChatUser.typingUsers.filter(userItem => userItem.user !== args.user.user);
    } else {
      if (!otherChatUser.typingUsers.some(userItem => userItem.user === args.user.user)) {
        otherChatUser.typingUsers = [...otherChatUser.typingUsers, args.user];
      }
    }
  };

  const handleMessageSend = (args, sender) => {
    chatUser2Ref.current.suggestions = [];
    if (sender === 'user1') {
      chatUser2Ref.current.messages = [...chatUser2Ref.current.messages, args.message];
    } else if (sender === 'user2') {
      chatUser1Ref.current.messages = [...chatUser1Ref.current.messages, args.message];
    }
  };

  return (
    <div className='control-pane'>
      <div className="control-section chat-ui">
        <div className="default-chatui">
          <ChatUIComponent
            ref={chatUser1Ref}
            headerText='Albert'
            headerIconCss="chat_user1_avatar"
            user={{ id: 'user2', user: 'Reena', avatarUrl: './src/chat-ui/images/reena.png' }}
            messages={data["chatMessagedata"]}
            userTyping={(args) => handleUserTyping(args, chatUser2Ref.current)}
            headerToolbar={ user1ToolbarSettings }
            messageSend={(args) => handleMessageSend(args, 'user1')}
          />
          <ChatUIComponent
            ref={chatUser2Ref}
            headerText='Reena'
            headerIconCss="chat_user2_avatar"
            user={{ id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }}
            messages={data["chatMessagedata"]}
            suggestions={data["defaultChatSuggestions"]}
            userTyping={(args) => handleUserTyping(args, chatUser1Ref.current)}
            headerToolbar={ user2ToolbarSettings }
            messageSend={(args) => handleMessageSend(args, 'user2')}
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
  );
}

export default Default;