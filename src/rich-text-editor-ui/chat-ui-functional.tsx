import * as React from 'react';
import './chat-ui.css';
import { ChatUIComponent, UserModel } from '@syncfusion/ej2-react-interactive-chat';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { updateSampleSection } from '../common/sample-base';

interface IChatMessage {
    id: string;
    text: string;
    author: UserModel;
    replyTo?: {
        user: UserModel;
        text: string;
        messageID: string;
    };
}

const currentUserModel: UserModel = { id: 'user1', user: 'Albert' };
const michaleUserModel: UserModel = {
    id: 'user2',
    user: 'Michale Suyama',
    avatarUrl: 'src/rich-text-editor-ui/images/2.png'
};

const chatMessages: IChatMessage[] = [
    { id: 'chat-message-1', author: currentUserModel,  text: 'Hi Michale, are we on track for the deadline?' },
    { id: 'chat-message-2', author: michaleUserModel, text: 'Yes, the design phase is complete.' },
    { id: 'chat-message-3', author: currentUserModel,  text: 'I will review it and send feedback by today.' },
    { id: 'chat-message-4', author: michaleUserModel, text: 'Okay.' }
];

function ChatUi() {
    const editorRef = React.useRef<RichTextEditorUIComponent | null>(null);

    const messageCountRef = React.useRef<number>(chatMessages.length);
    const selectedReplyRef = React.useRef<IChatMessage | null>(null);

    React.useEffect(() => {
        updateSampleSection();
    }, []);

    const stripHtml = (html: string): string => {
        return html.replace(/<[^>]*>/g, '').trim();
    };

    const onRteCreated = (): void => {
        const sendBtn: HTMLElement | null =
            (editorRef.current as any)?.element?.querySelector
                ? (editorRef.current as any).element.querySelector('#editor_toolbar_send_tbar') as HTMLElement
                : null;
        if (!sendBtn) { return; }
        sendBtn.classList.remove('e-tbar-btn');
        sendBtn.classList.add('e-primary');
        sendBtn.onclick = (): void => {
            const rte: any = editorRef.current;
            if (!rte) { return; }

            const html: string = rte.getHtml();
            const plainText: string = stripHtml(html);
            if (!plainText) { return; }

            const newMessage: IChatMessage = {
                id: `chat-message-${++messageCountRef.current}`,
                author: currentUserModel,
                text: html
            };

            if (selectedReplyRef.current) {
                newMessage.replyTo = {
                    user: selectedReplyRef.current.author,
                    text: selectedReplyRef.current.text,
                    messageID: selectedReplyRef.current.id
                };
            }

            if (rte && rte.element) {
                const chatEl: HTMLElement | null = rte.element.closest('#chatContainer');
                const chatUIInstance: any = (chatEl as any)?.ej2_instances?.[0];
                if (chatUIInstance && typeof chatUIInstance.addMessage === 'function') {
                    chatUIInstance.addMessage(newMessage);
                }
            }

            const chatEl: HTMLElement | null =
                (editorRef.current as any)?.element?.closest?.('#chatContainer') as HTMLElement;
            const replyPreview: HTMLElement | null =
                chatEl?.querySelector('.e-footer .e-reply-wrapper') || null;
            if (replyPreview) { replyPreview.remove(); }

            selectedReplyRef.current = null;
            rte.value = '';
            rte.dataBind();
            rte.focusIn();
        };
    };

    const onMessageToolbarItemClicked = (args: any): void => {
        const item: any = args.item.properties || args.item;
        if (item && item.tooltipText === 'Reply') {
            selectedReplyRef.current = (args.message.properties || args.message) as IChatMessage;
        }
    };

    const footerTemplate = (): JSX.Element => (
        <div className="custom-footer">
            <RichTextEditorUIComponent
                id="editor"
                ref={editorRef}
                placeholder="Type a message..."
                valueFormat="html"
                created={onRteCreated}
                slashCommandSettings={{ enable: true }}
                toolbarSettings={{
                    position: 'Bottom',
                    items: [
                        'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
                        'BulletFormatList', 'NumberFormatList', '|',
                        'Formats', 'FontColor', 'FontSize', 'BackgroundColor', '|',
                        'Quote', 'Link', 'CodeBlock', 'Image', '|',
                        {
                            align: 'Right',
                            id: 'send_tbar',
                            tooltipText: 'Send Message',
                            actionId: 'sendMessage',
                            prefixIcon: 'e-icons e-send'
                        } as any
                    ]
                }}
            />
        </div>
    );

    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="sample-container">
                    <div className="chat-section">
                        <ChatUIComponent
                            id="chatContainer"
                            headerText="Michale Suyama"
                            headerIconCss="chat_user2_avatar"
                            messages={chatMessages as any}
                            user={currentUserModel}
                            showTimeBreak={true}
                            loadOnDemand={true}
                            footerTemplate={footerTemplate}
                            messageToolbarSettings={{
                                itemClicked: onMessageToolbarItemClicked as any
                            }}
                        />
                    </div>
                </div>
            </div>

            <div id="action-description">
                <p>
                    This sample demonstrates how the Chat UI component
                    can be paired with the Rich Text Editor UI to
                    compose rich messages. Type into the composer at
                    the bottom of the chat and press the{' '}
                    <b>Send</b> toolbar button to append a formatted
                    message to the conversation. Use the per-message{' '}
                    <b>Reply</b> action to attach a context reply to
                    your next composed message.
                </p>
            </div>

            <div id="description">
                <p>
                    The <code>ChatUIComponent</code> exposes a{' '}
                    <code>footerTemplate</code> slot that renders
                    custom content beneath the message list. In this
                    sample we mount an instance of{' '}
                    <code>RichTextEditorUIComponent</code> into the
                    footer so users can format their outgoing
                    messages with bold, italics, lists, and color
                    before sending.
                </p>
                <p>
                    The send handler reads HTML from the editor via{' '}
                    <code>getHtml()</code>, builds a{' '}
                    <code>MessageModel</code>, and calls{' '}
                    <code>addMessage()</code> on the chat instance so
                    the message appears in the conversation with the
                    correct author, timestamp, and (optional)
                    reply context.
                </p>
            </div>
        </div>
    );
}

export default ChatUi;
