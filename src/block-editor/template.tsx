import * as React from 'react';
import { BlockEditorComponent } from '@syncfusion/ej2-react-blockeditor';
import './template.css';
import { SampleBase } from '../common/sample-base';
import * as data from './blockData.json';

export class TemplateGallery extends SampleBase<{}, {}> {
  state = {
    selectedCardName: null as string | null,
    selectedCardIcon: null as string | null
  } as any;

  private editorRef: BlockEditorComponent | null = null;
  private cards = data["blockTemplate"][0].page;

  componentDidMount(): void {
     this.loadPage(this.cards[1]);
  }

  private loadPage = (pageData: any) => {
    this.setState({
      selectedCardName: pageData.name,
      selectedCardIcon: pageData.icon
    } as any);

    if (this.editorRef && typeof (this.editorRef as any).renderBlocksFromJson === 'function') {
      (this.editorRef as any).renderBlocksFromJson(pageData.blocks, true);
    }
  };

  private onCardClick = (pageData: any) => {
    (this.editorRef as any).focusIn();
    this.loadPage(pageData);
  };

  private onEditorCreated = () => {
    (this.editorRef as any).focusIn();
};

  render(): React.ReactNode {
    const { selectedCardName, selectedCardIcon } = this.state as any;

    return (
      <div className="control-pane">
        <div className="control-section blockeditor-template">

          <div className="cards-wrapper">
            <div className="fade left" />
            <div className="cards-container">
              {this.cards.map((card: any) => (
                <div
                  key={card?.name}
                  className={`template-card ${selectedCardName === card?.name ? 'active' : ''}`}
                  onClick={() => this.onCardClick(card)}
                  title={card?.name}
                >
                  <div className="card-icon-left"><span className="icon">{card?.icon}</span></div>
                  <div className="card-content">
                    <div className="card-title">{card?.name}</div>
                    <div className="card-subtitle">{card?.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="fade right" />
          </div>

           <div className="header-label" contentEditable={true} suppressContentEditableWarning>
            <span className="selectedTitle" aria-placeholder="Untitle">
              {selectedCardIcon || ''}{selectedCardName || ''}
            </span>
          </div>

          <BlockEditorComponent
            height="500px"
            ref={(be) => (this.editorRef = be)}
            id="template-gallery-blockeditor"
            created={this.onEditorCreated}
          />

        </div>

        <div id="action-description">
          <p>
            This sample demonstrates a Template Gallery for the Block Editor; use the horizontal card rail to choose a
            template, load its blocks into the editor, and customize the content with slash (<code>/</code>) commands,
            lists, and inline formatting.
          </p>
        </div>
        <div id="description">
          <p>
            This sample implements a Template Gallery for the Block Editor. A horizontal set of cards acts as a template
            picker; selecting a card loads its predefined block structure into the editor without reloading the page.
          </p>
          <ul>
            <li><b>Interactive cards:</b> Click a card to select a template with active styling for the selected item.</li>
            <li>
              <b>Dynamic loading:</b> Clicking a card calls
              <a target="_blank" href="https://ej2.syncfusion.com/angular/documentation/api/blockeditor/index-default#renderblocksfromjson">
                {' '}renderBlocksFromJson
              </a> to populate the editor with that template's blocks.
            </li>
            <li><b>Responsive behavior:</b> The card rail scrolls when content overflows.</li>
            <li><b>Templates included:</b> Blank Page, Project Brief, Team Decisions, Project Planning, and Meeting Notes.</li>
          </ul>
          <p>
            Use this gallery to kickstart common document plan projects, record decisions, run meetings, and more then
            tailor the content with headings, lists, checklists, and rich inline styles.
          </p>
        </div>
      </div>
    );
  }
}

export default TemplateGallery;