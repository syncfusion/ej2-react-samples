import * as React from 'react';
import './forum-discussion.css';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';

interface IComment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    dateLabel: string;
    timeLabel: string;
}

const ForumDiscussion: React.FC = () => {
    React.useEffect(() => {
        updateSampleSection();
    }, []);

    const rteRef = React.useRef<RichTextEditorUIComponent | null>(null);
    const listViewRef = React.useRef<ListViewComponent | null>(null);

    const userAvatar: string = 'src/rich-text-editor-ui/images/1.png';
    const userName: string = 'Selma Rose';

    const [comments, setComments] = React.useState<IComment[]>([
        {
            id: 1,
            author: 'Jane Smith',
            avatar: 'src/rich-text-editor-ui/images/2.png',
            content: 'Has anyone tried the new <b>rich text editor</b>? I love how clean the toolbar looks now.',
            dateLabel: 'Sep 3, 2026',
            timeLabel: '02:10 PM'
        },
        {
            id: 2,
            author: 'Mark Johnson',
            avatar: 'src/rich-text-editor-ui/images/3.png',
            content: 'I am also enjoying the updated UI. The <i>inline editing</i> experience feels really smooth!',
            dateLabel: 'Sep 3, 2026',
            timeLabel: '10:24 AM'
        }
    ]);

    const stripHtml = (html: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return (tempDiv.textContent || tempDiv.innerText || '').trim();
    };

    const clearEditor = (): void => {
        if (rteRef.current) {
            rteRef.current.value = '';
            rteRef.current.refresh();
        }
    };

    const commentTemplate = (data: IComment): JSX.Element => (
        <div className="comment-item">
            <img className="comment-avatar" src={data.author === userName ? userAvatar : data.avatar} alt={data.author} />
            <div className="comment-body">
                <div className="comment-actions">
                    <button className="e-btn e-icons e-copy e-icon-btn e-flat e-small action-btn copy-btn" title="Copy"></button>
                    <button className="e-btn e-icons e-trash e-icon-btn e-flat e-small action-btn delete-btn" title="Delete"></button>
                </div>
                <div className="comment-header">
                    <span className="comment-author">{data.author}</span>
                    <span className="comment-time">commented on {data.dateLabel} at {data.timeLabel}</span>
                </div>
                <div className="comment-text" dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
        </div>
    );

    const onPostClick = (): void => {
        if (!rteRef.current) { return; }
        const content: string = rteRef.current.getHtml() || '';
        if (!stripHtml(content)) {
            return;
        }
        const now: Date = new Date();
        const newComment: IComment = {
            id: now.getTime(),
            author: userName,
            avatar: userAvatar,
            content,
            dateLabel: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            timeLabel: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setComments((prev) => [newComment, ...prev]);
        clearEditor();
    };

    const onDiscardClick = (): void => {
        clearEditor();
    };

    const onCommentsClick = (e: React.MouseEvent<HTMLElement>): void => {
        const target: HTMLElement = (e.target as HTMLElement).closest('.action-btn') as HTMLElement;
        if (!target) { return; }
        const item: HTMLElement | null = target.closest('.e-list-item') as HTMLElement;
        if (!item) { return; }
        const id: number = Number(item.getAttribute('data-uid'));
        const comment: IComment | undefined = comments.find((c: IComment) => c.id === id);
        if (!comment) { return; }

        if (target.classList.contains('copy-btn')) {
            if (navigator && (navigator as any).clipboard) {
                (navigator as any).clipboard.writeText(stripHtml(comment.content));
            }
        } else if (target.classList.contains('delete-btn')) {
            setComments((prev) => prev.filter((c: IComment) => c.id !== id));
        }
    };

    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="sample-container">
                    <div className="forum-section">
                        <div className="forum-header">
                            <span className="forum-icon">&#128172;</span>
                            <span className="forum-title">Discussion</span>
                        </div>

                        <div className="forum-rte-container">
                            <img id="userAvatar" className="comment-avatar" src={userAvatar} alt={userName}></img>
                            <div className="forum-rte-input">
                                <RichTextEditorUIComponent
                                    ref={rteRef}
                                    placeholder="Write your comment..."
                                    toolbarSettings={{
                                        items: [
                                            'Bold', 'Italic', 'Underline', '|',
                                            'Formats', 'BulletFormatList', 'NumberFormatList', '|',
                                            'Link', 'Undo', 'Redo'
                                        ]
                                    }}
                                />
                                <div className="forum-button-group">
                                    <ButtonComponent
                                        id="updateBtn"
                                        cssClass="e-primary"
                                        onClick={onPostClick}
                                    >
                                        Post
                                    </ButtonComponent>
                                    <ButtonComponent
                                        id="discardBtn"
                                        cssClass="e-outline"
                                        onClick={onDiscardClick}
                                    >
                                        Discard
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>

                        <div className="comments-container">
                            <label className="comments-title">Comments</label>
                            <ListViewComponent
                                id="commentsList"
                                ref={listViewRef}
                                dataSource={comments as any}
                                template={commentTemplate as any}
                                onClick={onCommentsClick as any}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates a forum discussion component with Rich Text Editor UI and ListView for displaying and managing comments.</p>
            </div>
            <div id="description">
                <p>The Rich Text Editor UI is integrated with Syncfusion ListView component to create a forum discussion interface. Users can write formatted comments using the RTE, then submit them to display in the ListView. Each comment item shows the author's avatar, name, timestamp, and provides copy and delete action buttons.</p>
            </div>
        </div>
    );
};

export default ForumDiscussion;
