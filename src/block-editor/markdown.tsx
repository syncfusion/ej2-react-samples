import * as React from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
  SidebarComponent,
  TreeViewComponent,
  BreadcrumbComponent,
  ToolbarComponent,
  ItemDirective,
  ItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import {
  BlockEditorComponent,
  CommandItemModel,
  InlineToolbarSettingsModel,
  CommandName,
} from '@syncfusion/ej2-react-blockeditor';

import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import TurndownService from 'turndown';
import './markdownBlocks.css';

interface State {
  markdownContent: string;
  breadcrumbItems: any[];
}

export class MarkdownBlocks extends React.PureComponent<{}, State> {
  private sidebarRef: SidebarComponent | null = null;
  private treeviewRef: TreeViewComponent | null = null;
  private blockEditorRef: BlockEditorComponent | null = null;
  private closeBtnRef: ButtonComponent | null = null;
  private downloadBtnRef: ButtonComponent | null = null;

  private width: string = '220px';
  private enableDock: boolean = true;
  private dockSize: string = '33px';
  private mediaQuery: string = '(min-width: 600px)';
  private target: string = '.blockeditor-marked';
  private sidebarHeaderText: string = 'Markdown Templates';
  private turndownService = new TurndownService();

  private customToolbarItems: string[] = [
    'Bold', 'Italic', 'Underline', 'Strikethrough'
  ];
  private inlineToolbar: InlineToolbarSettingsModel = {
    enable: true,
    items: this.customToolbarItems,
  };

  private commandItems: CommandItemModel[] = [
    {
        "id": "bullet-list-command",
        "type": "BulletList",
        "groupBy": "General",
        "label": "Bullet List",
        "tooltip": "Create a bullet list",
        "iconCss": "e-icons e-list-unordered",
        "shortcut": "Ctrl+Shift+8"
      },
      {
        "id": "numbered-list-command",
        "type": "NumberedList",
        "groupBy": "General",
        "label": "Numbered List",
        "tooltip": "Create a numbered list",
        "iconCss": "e-icons e-list-ordered",
        "shortcut": "Ctrl+Shift+9"
      },
      {
        "id": "divider-command",
        "type": "Divider",
        "groupBy": "General",
        "label": "Divider",
        "tooltip": "Add a horizontal line",
        "iconCss": "e-icons e-be-divider",
        "shortcut": "Ctrl+Shift+-"
      },
      {
        "id": "code-command",
        "type": "Code",
        "groupBy": "Insert",
        "label": "Code",
        "tooltip": "Insert a code block",
        "iconCss": "e-icons e-insert-code",
        "shortcut": "Ctrl+Alt+k"
      },
      {
        "id": "table-command",
        "type": "Table",
        "groupBy": "Insert",
        "label": "Table",
        "tooltip": "Insert a table block",
        "iconCss": "e-icons e-table-2",
        "shortcut": "Ctrl+Alt+T"
      },
      {
        "id": "paragraph-command",
        "type": "Paragraph",
        "groupBy": "Text Styles",
        "label": "Paragraph",
        "tooltip": "Add a paragraph",
        "iconCss": "e-icons e-be-paragraph",
        "shortcut": "Ctrl+Alt+P"
      },
      {
        "id": "heading1-command",
        "type": "Heading",
        "groupBy": "Text Styles",
        "label": "Heading 1",
        "tooltip": "Page title or main heading",
        "iconCss": "e-icons e-be-h1",
        "shortcut": "Ctrl+Alt+1"
      },
      {
        "id": "heading2-command",
        "type": "Heading",
        "groupBy": "Text Styles",
        "label": "Heading 2",
        "tooltip": "Section heading",
        "iconCss": "e-icons e-be-h2",
        "shortcut": "Ctrl+Alt+2"
      },
      {
        "id": "heading3-command",
        "type": "Heading",
        "groupBy": "Text Styles",
        "label": "Heading 3",
        "tooltip": "Subsection heading",
        "iconCss": "e-icons e-be-h3",
        "shortcut": "Ctrl+Alt+3"
      },
      {
        "id": "heading4-command",
        "type": "Heading",
        "groupBy": "Text Styles",
        "label": "Heading 4",
        "tooltip": "Smaller heading for nested content",
        "iconCss": "e-icons e-be-h4",
        "shortcut": "Ctrl+Alt+4"
      },
      {
        "id": "quote-command",
        "type": "Quote",
        "groupBy": "Text Styles",
        "label": "Quote",
        "tooltip": "Insert a quote block",
        "iconCss": "e-icons e-blockquote",
        "shortcut": "Ctrl+Alt+Q"
      }
  ];

  private data: any[] = [
    {
      id: 'Team_Sessions',
      name: 'Team Sessions',
      mdFile: 'src/block-editor/mdfiles/Team Sessions.md',
      selected: true,
      expanded: true,
      children: [
        { id: '1', name: 'Meeting minutes.md', mdFile: 'src/block-editor/mdfiles/Meeting minutes.md' },
        { id: '2', name: 'Brain storming.md', mdFile: 'src/block-editor/mdfiles/Brain storming.md' },
        { id: '3', name: 'Retrospective.md', mdFile: 'src/block-editor/mdfiles/Retrospective.md' },
      ]
    }
  ];
  private field = {
    dataSource: this.data,
    id: 'id',
    text: 'name',
    child: 'children'
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      markdownContent: '',
      breadcrumbItems: [{ text: 'Team' }]
    };
  }

  componentDidMount(): void {
    this.onClose();
    setTimeout(() => {
      this.loadContent('src/block-editor/mdfiles/Team Sessions.md');
      this.setState({ breadcrumbItems: [{ text: 'Team' }, { text: 'Team Sessions' }] });
    }, 100);
  }

  private createdblock = () => { };

  private renderFallbackBlocks = (message: string) => {
    const fb = [{
      id: 'fallback-block',
      blockType: 'Paragraph',
      content: [{ id: 'fallback-t', contentType: 'Text', content: message }],
      properties: { placeholder: 'Fallback content' },
      indent: 0
    }];
    if (this.blockEditorRef) {
      (this.blockEditorRef as any).renderBlocksFromJson(fb, true);
    }
  };

  private formatBreadcrumbText = (name: string): string => {
    return name?.endsWith('.md') ? name.replace(/\.md$/i, '') : name;
  };

  private loadContent = async (mdFile: string) => {
    try {
      const res = await fetch(mdFile);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const html = MarkdownConverter.toHtml(text) as any;
      this.setState({ markdownContent: html });

      if (this.blockEditorRef && html) {
        try {
          const nodeDatas = (this.blockEditorRef as any).parseHtmlToBlocks(html);
          (this.blockEditorRef as any).renderBlocksFromJson(nodeDatas, true);
        } catch (parseErr) {
          this.renderFallbackBlocks(`Parsed content from ${mdFile} failed.`);
        }
      }
    } catch (err) {
      this.renderFallbackBlocks(`Error loading ${mdFile}. Ensure file exists in /src/.`);
    }
  };

  private onOpen = () => {
      (this.treeviewRef as any).expandAll();
    if (this.closeBtnRef?.element) {
      this.closeBtnRef.element.style.left = '202px';
      this.closeBtnRef.element.classList.remove('expand-mode');
    }
    if (this.treeviewRef?.element) {
      this.treeviewRef.element.style.display = 'block';
    }
  };

  private onClose = () => {
    if (this.closeBtnRef?.element) {
      this.closeBtnRef.element.style.left = '18px';
      this.closeBtnRef.element.classList.add('expand-mode');
    }
    if (this.treeviewRef?.element) {
      this.treeviewRef.element.style.display = 'none';
    }
  };

  private openClick = () => {
    this.sidebarRef?.toggle();
  };

  private downloadMarkdown = () => {
    if (!this.blockEditorRef) {
      return;
    }
    let htmlContent = '';
    try {
      htmlContent = (this.blockEditorRef as any).getDataAsHtml();
    } catch (e) {
      return;
    }
    const markdownContent = this.turndownService.turndown(htmlContent || '');
    let fileName = 'document.md';
    const lastCrumb = this.state.breadcrumbItems?.[this.state.breadcrumbItems.length - 1]?.text;
    if (lastCrumb) {
      const safe = (lastCrumb as string).replace(/[\\/:*?"<>|]+/g, '').trim() || 'document';
      fileName = `${safe}.md`;
    }
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    try {
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
    } finally {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  private onNodeSelected = (args: any) => {
    const selectedId = args?.nodeData?.id as string;

    if (selectedId === 'Team_Sessions') {
      this.setState({ breadcrumbItems: [{ text: 'Team' }, { text: 'Team Sessions' }] });
      this.loadContent('src/block-editor/mdfiles/Team Sessions.md');
      return;
    }

    const findNodeById = (nodes: any[], id: string): any | undefined => {
      for (const n of nodes) {
        if (n.id === id) return n;
        if (n.children?.length) {
          const found = findNodeById(n.children, id);
          if (found) return found;
        }
      }
      return undefined;
    };

    const selectedNode = findNodeById(this.data, selectedId);
    if (selectedNode?.mdFile) {
      this.loadContent(selectedNode.mdFile);
      const parentID = args?.nodeData?.parentID;
      const isUnderGuideline = !!parentID && parentID === 'Team_Sessions';
      if (isUnderGuideline) {
        this.setState({
          breadcrumbItems: [
            { text: 'Team' },
            { text: 'Team Sessions' },
            { text: this.formatBreadcrumbText(selectedNode.name) }
          ]
        });
      } else {
        this.setState({
          breadcrumbItems: [
            { text: 'Team' },
            { text: this.formatBreadcrumbText(selectedNode.name) }
          ]
        });
      }
    }
  };

  render(): React.ReactNode {
    return (
      <div className='control-pane'>
        <div className="control-section blockeditor-marked">
          <SidebarComponent
            id="sidebar-treeview"
            className="sidebar-content"
            ref={(c) => (this.sidebarRef = c)}
            enableDock={this.enableDock}
            width={this.width}
            enableGestures={false}
            dockSize={this.dockSize}
            open={this.onOpen}
            close={this.onClose}
            mediaQuery={this.mediaQuery}
            target={this.target}
            isOpen={true}
          >
            <div className="sidebar-header">
              <span>{this.sidebarHeaderText}</span>
            </div>

            <div className="sb-rightpane-collapsed"><div className="labelchoose">Markdown Templates</div></div>

            <div className="main-menu">
              <ButtonComponent
                cssClass="e-btn e-round closebutton"
                iconCss="e-icons e-chevron-left"
                id="left-toc-closebtn"
                ref={(b) => (this.closeBtnRef = b)}
                onClick={this.openClick}
              />
              <TreeViewComponent
                id="main-treeview"
                ref={(t) => (this.treeviewRef = t)}
                fields={this.field as any}
                expandOn="Click"
                nodeSelected={this.onNodeSelected}
              />
            </div>
          </SidebarComponent>

          <div id="content_container" className="block-content">
            <div className="stick">
              <ToolbarComponent>
                <ItemsDirective>
                  <ItemDirective align="Left" template={() => (
                    <div className="breadcrumbcontent">
                      <BreadcrumbComponent
                        items={this.state.breadcrumbItems}
                        separatorTemplate={() => (<span className="e-icons e-chevron-right"></span>)}
                      />
                    </div>
                  )} />
                  <ItemDirective align="Right" template={() => (
                    <ButtonComponent
                      ref={(d) => (this.downloadBtnRef = d)}
                      iconCss="e-icons e-download"
                      title="Download Markdown"
                      className="downloadbutton"
                      onClick={this.downloadMarkdown}
                    />
                  )} />
                </ItemsDirective>
              </ToolbarComponent>
            </div>

            <div className="markeditor">
              <BlockEditorComponent
                ref={(be) => (this.blockEditorRef = be)}
                height="597px"
                created={this.createdblock}
                inlineToolbarSettings={this.inlineToolbar}
                commandMenuSettings={{
                  popupWidth: '298px',
                  popupHeight: '400px',
                  commands: this.commandItems,
                }}
              />
            </div>
          </div>
        </div>

        <div id="action-description">
          <p>
            This sample demonstrates the Markdown templates viewer built with Block Editor,
            complete with a sidebar navigation tree, breadcrumb, and Markdown loading, editing and Download as Markdown
            capabilities.
          </p>
        </div>

        <div id="description">
          <p>
            The Block Editor Documentation Preview is a powerful, interactive
            documentation system that combines
            <code>BlockEditor</code> with a collapsible sidebar, tree
            navigation, and Markdown rendering.
            It allows users to view, edit, and download documentation articles
            written in Markdown format.
          </p>
          <p>Key features demonstrated in this sample:</p>
          <ul>
            <li><strong>Sidebar with TreeView Navigation</strong>: Hierarchical menu
              using <code>ejs-treeview</code> to browse documentation sections.</li>
            <li><strong>Markdown Loading</strong>: Loads <code>.md</code> files
              from the <code>assets</code> folder via <code>fetch</code>.</li>
            <li><strong>Markdown to BlockEditor Conversion</strong>: Uses
              <code>MarkdownConverter</code> and <code>parseHtmlToBlocks()</code> to convert
              Markdown to rich editable blocks.
            </li>
            <li><strong>Download as Markdown</strong>: Export current editor content
              back to clean Markdown using <code>TurndownService</code>.</li>
            <li><strong>Dockable & Responsive Sidebar</strong>: Collapsible sidebar with
              smooth open/close animation and mobile-friendly behavior.</li>
            <li><strong>Real-time Editing</strong>: Full Block Editor experience —
              formatting, lists, code blocks, mentions, slash commands, and more.</li>
            <li><strong>Clean UI with Toolbar</strong>: Professional layout with
              breadcrumb and download button using Toolbar and Breadcrumb
              components.</li>
          </ul>
          <p>
            This sample serves as a complete template for building internal
            documentation portals, knowledge bases,
            technical wikis, or product guides using the Block
            Editor.
          </p>
        </div>
      </div>
    );
  }
}

export default MarkdownBlocks;