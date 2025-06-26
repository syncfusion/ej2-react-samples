import * as React from 'react';
import './bottom-toolbar.css';
import { ChatUIComponent } from '@syncfusion/ej2-react-interactive-chat';
import { RichTextEditorComponent, ToolbarSettingsModel, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker,Inject } from '@syncfusion/ej2-react-richtexteditor';

export const BottomToolbar = () => {
  const chatRTERef = React.useRef<RichTextEditorComponent | null>(null);
  const chatUIRef = React.useRef<ChatUIComponent>(null);

  const currentUserModel = {
    id: 'user1',
    user: 'Albert',
  };

  const michaleUserModel = {
    id: 'user2',
    user: 'Michale Suyama',
    avatarUrl: '//ej2.syncfusion.com/demos/src/chat-ui/images/andrew.png',
  };

  const chatMessages = [
    {
      author: currentUserModel,
      text: 'Hi Michale, are we on track for the deadline?',
    },
    {
      author: michaleUserModel,
      text: 'Yes, the design phase is complete.',
    },
    {
      author: currentUserModel,
      text: 'I will review it and send feedback by today.',
    },
    {
      author: michaleUserModel,
      text: 'Okay.',
    },
  ];

  const sendMessage = () => {
    const chatRTE = chatRTERef.current;
    if (chatRTE && chatRTE.value && chatRTE.value.length > 0) {
      const message = chatRTE.value;
      chatRTE.value = '';
      chatRTE.dataBind();
      chatUIRef.current?.addMessage({
        author: currentUserModel,
        text: message,
      });
      chatRTE.clearUndoRedo();
      chatRTE.focusIn();
    }
  };

  const cancelMessage = () => {
    const chatRTE = chatRTERef.current;
    if (chatRTE) {
      chatRTE.value = '';
      chatRTE.dataBind();
      chatRTE.clearUndoRedo();
      chatRTE.focusIn();
    }
  };

  const footerTemplate = () => (
    <div className="custom-footer">
      <RichTextEditorComponent
        ref={chatRTERef}
        placeholder="Type something..."
        toolbarSettings={
          {
            position: 'Bottom',
            items: [
              'Bold',
              'Italic',
              'Underline',
              'InlineCode',
              '|',
              'FontColor',
              'BackgroundColor',
              '|',
              'Alignments',
              'Blockquote',
              '|',
              'OrderedList',
              'UnorderedList',
              '|',
              'CreateLink',
              'Image',
              'CreateTable',
              'EmojiPicker',
            ],
          } as ToolbarSettingsModel
        }
    >
       <Inject services={[Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker]} />
      </RichTextEditorComponent>
      <button id="sendMessage" className="e-btn e-primary e-icons e-send e-send-1 e-icon-btn e-small" style={{ float: 'right', margin: '4px' }} onClick={sendMessage}></button>
      <button id="cancelMessage" className="e-btn e-secondary e-icons e-trash e-icon-btn e-small" style={{ float: 'right', margin: '4px' }} onClick={cancelMessage}></button>
    </div>
  );

  return (
    <div className="control-section">
      <div className="sample-container">
        <div className="chat-section">
          <ChatUIComponent
            ref={chatUIRef}
            headerText="Michale Suyama"
            headerIconCss="chat_user2_avatar"
            messages={chatMessages}
            user={currentUserModel}
            showTimeBreak={true}
            loadOnDemand={true}
            messageToolbarSettings= {{
              items: [
                  { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
                  { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
              ]
            }}
            footerTemplate={footerTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomToolbar;