import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './bottom-toolbar.css';
import { ChatUIComponent, MessageModel } from '@syncfusion/ej2-react-interactive-chat';
import { RichTextEditorComponent, ToolbarSettingsModel, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker, Inject } from '@syncfusion/ej2-react-richtexteditor';

export class BottomToolbar extends SampleBase<{}, {}> {
  private chatRTE: RichTextEditorComponent | null = null;
  private chatUIRef = React.createRef<ChatUIComponent>();

  currentUserModel = {
    id: 'user1',
    user: 'Albert',
  };

  michaleUserModel = {
    id: 'user2',
    user: 'Michale Suyama',
    avatarUrl: '//ej2.syncfusion.com/demos/src/chat-ui/images/andrew.png',
  };

  chatMessages: MessageModel[] = [
    { author: this.currentUserModel, text: 'Hi Michale, are we on track for the deadline?' },
    { author: this.michaleUserModel, text: 'Yes, the design phase is complete.' },
    { author: this.currentUserModel, text: 'I will review it and send feedback by today.' },
    { author: this.michaleUserModel, text: 'Okay.' },
  ];

  footerTemplate = () => {
    return (
      <div className="custom-footer">
        <RichTextEditorComponent
          ref={(rte) => (this.chatRTE = rte)}
          toolbarSettings={{
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
          }}
          placeholder="Type something..."
        >
        <Inject services={[Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker]} />
        </RichTextEditorComponent>
        <button id="sendMessage" className="e-btn e-primary e-icons e-send e-send-1 e-icon-btn e-small" style={{ float: 'right', margin: '4px' }} onClick={this.sendMessage}></button>
        <button id="cancelMessage" className="e-btn e-secondary e-icons e-trash e-icon-btn e-small" style={{ float: 'right', margin: '4px' }} onClick={this.cancelMessage}></button>
      </div>
    );
  }

  isValidContent = (html) => {

    if (!html || html.trim().length === 0)
        return false;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    // Check for meaningful text
    const textContent = tempDiv.innerHTML.replace(/<br\s*\/?>/gi, '').replace(/&nbsp;/gi, '').replace(/<[^>]*>/g, '').trim();
    if (textContent.length > 0)
        return true;
    // Check for media elements
    const mediaTags = ['img', 'table', 'audio', 'video', 'iframe'];
    for (var tag of mediaTags) {
        if (tempDiv.getElementsByTagName(tag).length > 0)
            return true;
        }
    return false;
  }

  sendMessage = () => {
    if (this.chatRTE && this.chatRTE.value && this.chatRTE.value.length > 0) {
      const message = this.chatRTE.value;
      if (this.isValidContent(message)) {
        this.chatRTE.value = '';
        this.chatRTE.dataBind();
        this.chatUIRef.current?.addMessage({
          author: this.currentUserModel,
          text: message,
        });
        this.chatRTE.clearUndoRedo();
        this.chatRTE.focusIn();
      }
    }
  };

  cancelMessage = () => {
    if (this.chatRTE) {
      this.chatRTE.value = '';
      this.chatRTE.dataBind();
      this.chatRTE.clearUndoRedo();
      this.chatRTE.focusIn();
    }
  };

  render() {
    return (
        <div className="control-section">
            <div className="sample-container">
            <div className="chat-section">
                <ChatUIComponent
                ref={this.chatUIRef}
                headerText="Michale Suyama"
                headerIconCss="chat_user2_avatar"
                messages={this.chatMessages}
                user={this.currentUserModel}
                showTimeBreak={true}
                loadOnDemand={true}
                messageToolbarSettings= {{
                    items: [
                        { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
                        { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
                    ]
                }}
                footerTemplate={this.footerTemplate}
                />
            </div>
            </div>
        </div>
    );
  }
}