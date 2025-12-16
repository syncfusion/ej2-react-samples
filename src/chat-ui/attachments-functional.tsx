import { ChatUIComponent, UserModel } from '@syncfusion/ej2-react-interactive-chat';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './attachments.css';
import { updateSampleSection } from '../common/sample-base';
const Attachments = () => {
  useEffect(() => {
        updateSampleSection();
    }, []);
  const [user] = useState<UserModel>({
    id: 'user1',
    user: 'Paul Wilson',
    avatarUrl: './src/chat-ui/images/paul_wilson.png'
  });
  // The chat message history state (for controlled chat)
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  // Toolbar setup, with a single Clear Chat button
  const headerToolbar = {
    items: [
      {
        iconCss: 'e-icons e-refresh',
        align: 'Right' as "Right",
        tooltip: 'Clear Chat'
      }
    ],
    itemClicked: () => {
      chatRef.current.messages = [];
    }
  };

  return (
    <div className="control-pane">
      <div className="control-section chat-ui">
        <div className="attachment-chatui">
          <ChatUIComponent
            ref={chatRef}
            headerText="Paul Wilson (You)"
            headerIconCss="chat_user_avatar"
            user={user}
            messages={messages}
            emptyChatTemplate={`
              <div class="emptychat-content">
                <div class="chat-text-content">
                  <h5><span class="e-icons e-multiple-comment"></span></h5>
                  <div class="emptyChatText">No conversations yet.</div>
                </div>
                <div class="emptyChatMessage" >Type to begin or attach images, videos or files.</div>
              </div>
            `}
            enableAttachments={true}
            attachmentSettings={{
              saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
              removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save'
            }}
            headerToolbar={headerToolbar}
          />
        </div>
      </div>
      <div id="action-description">
        <p>This example demonstrates the ability for users to attach files during chat interactions, which helps provide additional context to the conversation.</p>
      </div>
      <div id="description">
        <p>
          In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chat-ui/#enableattachments">enableAttachments</a> property is set to <code>true</code> to allow users to attach files in the chat interface. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chat-ui/#attachmentsettings">attachmentSettings</a> property is used to configure the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chat-ui/attachmentSettings/#saveurl">saveUrl</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chat-ui/attachmentSettings/#removeurl">removeUrl</a>, enabling file upload functionality.
        </p>
        <p>
          Various file types such as images, videos, and documents can be attached. You can use the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chat-ui/attachmentSettings/#allowedfiletypes">allowedFileTypes</a> property within <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chat-ui/#attachmentsettings">attachmentSettings</a> to restrict uploads to specific file types. Additionally, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chat-ui/#emptychattemplate">emptyChatTemplate</a> property is used to customize the banner displayed before starting a conversation.
        </p>
      </div>
    </div>
  );
};
export default Attachments;