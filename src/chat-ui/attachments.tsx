import { UserModel, ChatUIComponent, MessageModel, ToolbarSettingsModel, ToolbarItemModel } from "@syncfusion/ej2-react-interactive-chat";
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './attachments.css';

interface AttachmentsState {
  user: UserModel;
  messages: MessageModel[];
}

export class Attachments extends SampleBase<{}, AttachmentsState> {
  private chatRef = React.createRef<ChatUIComponent>();

  constructor(props: {}) {
    super(props);
    this.state = {
      user: {
        id: 'user1',
        user: 'Paul Wilson',
        avatarUrl: './src/chat-ui/images/paul_wilson.png'
      },
      messages: [] // Now the chat can be cleared!
    };
  }

  // Toolbar for the header with clear button (must use align: 'Right' as const to match required type)
  private headerToolbar: ToolbarSettingsModel = {
    items: [
      {
        iconCss: 'e-icons e-refresh',
        align: 'Right' as 'Right',
        tooltip: 'Clear Chat'
      }
    ],
    itemClicked: () => {
      this.chatRef.current.messages = [];
    }
  };

  render() {
    return (
      <div className="control-pane">
        <div className="control-section chat-ui">
          <div className="attachment-chatui">
            <ChatUIComponent
              ref={this.chatRef}
              headerText="Paul Wilson (You)"
              headerIconCss="chat_user_avatar"
              user={this.state.user}
              messages={this.state.messages}
              headerToolbar={this.headerToolbar}
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
                removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
              }}
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
  }
}