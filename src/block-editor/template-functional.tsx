import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { BlockEditorComponent } from '@syncfusion/ej2-react-blockeditor';
import './template.css';
import * as data from './blockData.json';
import { updateSampleSection } from '../common/sample-base';

const TemplateGallery = () => {

  const editorRef = useRef<BlockEditorComponent | null>(null);

  const cards = data["blockTemplate"][0].page;

  const [selectedCardName, setSelectedCardName] = useState<string | null>(null);
  const [selectedCardIcon, setSelectedCardIcon] = useState<string | null>(null);

  const onEditorCreated = useCallback(() => {
      (editorRef.current as any).focusIn();
  }, []);

  const loadPage = (pageData: any) => {
    setSelectedCardName(pageData.name);
    setSelectedCardIcon(pageData.icon);

    if (editorRef.current && typeof (editorRef.current as any).renderBlocksFromJson === 'function') {
      (editorRef.current as any).renderBlocksFromJson(pageData.blocks, true);
    }
  };

  const handleCardClick = (page: any) => {
    (editorRef.current as any).focusIn();
    loadPage(page);
  };

  useEffect(() => {
    updateSampleSection();
    loadPage(cards[1]);
  }, []);

  return (
    <div className="control-pane">
      <div className="control-section blockeditor-template">

        <div className="cards-wrapper">
          <div className="fade left" />
          <div className="cards-container">
            {cards.map((card: any) => (
              <div
                key={card?.name}
                className={`template-card ${selectedCardName === card?.name ? 'active' : ''}`}
                onClick={() => handleCardClick(card)}
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
          ref={editorRef}
          id="template-gallery-blockeditor"
          created={onEditorCreated}
        />

      </div>

      <div id="action-description">
        <p>
          This sample demonstrates a Template Gallery for the Block Editor; use the horizontal card rail to choose a
          template, load its blocks into the editor, and customize the content with slash (/) commands, lists, and
          inline formatting.
        </p>
      </div>
      <div id="description">
        <p>
          This sample implements a Template Gallery for the Block Editor. A horizontal set of cards acts as a template picker;
          selecting a card loads its predefined block structure into the editor without reloading the page.
        </p>
        <ul>
          <li><b>Interactive cards:</b> Click a card to select a template with active styling for the selected item.</li>
          <li><b>Dynamic loading:</b> Clicking a card calls renderBlocksFromJson to populate the editor with that template's blocks.</li>
          <li><b>Responsive behavior:</b> The card rail scrolls when content overflows.</li>
          <li><b>Templates included:</b> Blank Page, Project Brief, Team Decisions, Project Planning, and Meeting Notes.</li>
        </ul>
        <p>
          Use this gallery to kickstart common document plan projects, record decisions, run meetings, and more then tailor
          the content with headings, lists, checklists, and rich inline styles.
        </p>
      </div>
    </div>
  );
};

export default TemplateGallery;