import * as React from 'react';
import './forum-discussion.css';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';

interface IComment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    dateLabel: string;
    timeLabel: string;
}

export class ForumDiscussion extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorUIComponent | null = null;
    private listViewObj: ListViewComponent | null = null;

    private userAvatar: string = 'src/rich-text-editor-ui/images/1.png';
    private userName: string = 'Selma Rose';

    private comments: IComment[] = [
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
    ];

    private commentTemplate = (data: IComment): JSX.Element => (
        <div className="comment-item">
            <img className="comment-avatar" src={data.author === this.userName ? this.userAvatar : data.avatar} alt={data.author} />
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

    private stripHtml(html: string): string {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return (tempDiv.textContent || tempDiv.innerText || '').trim();
    }

    private clearEditor = (): void => {
        if (this.rteObj) {
            this.rteObj.value = '';
            this.rteObj.refresh();
        }
    };

    public onPostClick = (): void => {
        if (!this.rteObj) { return; }
        const content: string = this.rteObj.getHtml() || '';
        if (!this.stripHtml(content)) {
            return;
        }
        const now: Date = new Date();
        const newComment: IComment = {
            id: now.getTime(),
            author: this.userName,
            avatar: this.userAvatar,
            content: content,
            dateLabel: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            timeLabel: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        this.comments = [newComment, ...this.comments];
        if (this.listViewObj) {
            this.listViewObj.dataSource = this.comments as any;
        }
        this.clearEditor();
    };

    public onDiscardClick = (): void => {
        this.clearEditor();
    };

    public onCommentsClick = (e: React.MouseEvent<HTMLElement>): void => {
        const target: HTMLElement = (e.target as HTMLElement).closest('.action-btn') as HTMLElement;
        if (!target) { return; }
        const item: HTMLElement | null = target.closest('.e-list-item') as HTMLElement;
        if (!item) { return; }
        const id: number = Number(item.getAttribute('data-uid'));
        const comment: IComment | undefined = this.comments.find((c: IComment) => c.id === id);
        if (!comment) { return; }

        if (target.classList.contains('copy-btn')) {
            if (navigator && (navigator as any).clipboard) {
                (navigator as any).clipboard.writeText(this.stripHtml(comment.content));
            }
        } else if (target.classList.contains('delete-btn')) {
            this.comments = this.comments.filter((c: IComment) => c.id !== id);
            if (this.listViewObj) {
                this.listViewObj.dataSource = this.comments as any;
            }
        }
    };

    render() {
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
                                <img id="userAvatar" className="comment-avatar" src={this.userAvatar} alt={this.userName}></img>
                                <div className="forum-rte-input">
                                    <RichTextEditorUIComponent
                                        ref={(scope) => { this.rteObj = scope; }}
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
                                            onClick={this.onPostClick}
                                        >
                                            Post
                                        </ButtonComponent>
                                        <ButtonComponent
                                            id="discardBtn"
                                            cssClass="e-outline"
                                            onClick={this.onDiscardClick}
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
                                    ref={(scope) => { this.listViewObj = scope; }}
                                    dataSource={this.comments as any}
                                    template={this.commentTemplate as any}
                                    onClick={this.onCommentsClick as any}
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
    }
}
