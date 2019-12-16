import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { CharacterFormatView } from './character-formatting';
import { ParagraphFormatView } from './paragraph-formatting';
import { StylesView } from './styles';
import { BulletsAndNumberingView } from './bullets-and-numbering';
import { HyperlinksAndBookmarksView } from './links-and-bookmarks';
import { TableFormatView } from './table-formatting';
import { SectionFormatView } from './section-formatting';
import { HeadersAndFootersView } from './headers-and-footers';
import { TableOfContentsView } from './table-of-contents';
import { PrintView } from './print';
import { RightToLeftView } from './right-to-left';
import { CustomContextMenuView } from './custom-context-menu';
import { DocumentEditorAutoSave } from './auto-save';
import { DocumentEditorChart } from './chart';
import { DocumentProtection } from './document-protection';
import { Comments } from './comments';
export const documenteditorRoutes = (<div>
         <Route path='/:theme/document-editor/default' component={Default}/>
         <Route path='/:theme/document-editor/character-formatting' component={CharacterFormatView}/>
         <Route path='/:theme/document-editor/paragraph-formatting' component={ParagraphFormatView}/>
         <Route path='/:theme/document-editor/styles' component={StylesView}/>
         <Route path='/:theme/document-editor/bullets-and-numbering' component={BulletsAndNumberingView}/>
         <Route path='/:theme/document-editor/links-and-bookmarks' component={HyperlinksAndBookmarksView}/>
         <Route path='/:theme/document-editor/table-formatting' component={TableFormatView}/>
         <Route path='/:theme/document-editor/section-formatting' component={SectionFormatView}/>
         <Route path='/:theme/document-editor/headers-and-footers' component={HeadersAndFootersView}/>
         <Route path='/:theme/document-editor/table-of-contents' component={TableOfContentsView}/>
         <Route path='/:theme/document-editor/print' component={PrintView}/>
         <Route path='/:theme/document-editor/right-to-left' component={RightToLeftView}/>
         <Route path='/:theme/document-editor/custom-context-menu' component={CustomContextMenuView}/>
         <Route path='/:theme/document-editor/auto-save' component={DocumentEditorAutoSave}/>
         <Route path='/:theme/document-editor/chart' component={DocumentEditorChart}/>
         <Route path='/:theme/document-editor/document-protection' component={DocumentProtection}/>
         <Route path='/:theme/document-editor/comments' component={Comments}/>

    </div>);
export const documenteditorCategory = { "default": { "name": "Default Functionalities", "category": "DocumentEditor" }, "character-formatting": { "name": "Character Formatting", "category": "Editing Features" }, "paragraph-formatting": { "name": "Paragraph Formatting", "category": "Editing Features" }, "styles": { "name": "Styles", "category": "Editing Features" }, "bullets-and-numbering": { "name": "Bullets and Numbering", "category": "Editing Features" }, "links-and-bookmarks": { "name": "Hyperlinks and Bookmarks", "category": "Editing Features" }, "table-formatting": { "name": "Table Formatting", "category": "Editing Features" }, "section-formatting": { "name": "Section Formatting", "category": "Editing Features" }, "headers-and-footers": { "name": "Headers and Footers", "category": "Editing Features" }, "table-of-contents": { "name": "Table of Contents", "category": "Editing Features" }, "print": { "name": "Print", "category": "Print" }, "right-to-left": { "name": "Right To Left", "category": "RTL" }, "custom-context-menu": { "name": "Custom Context Menu", "category": "Customization" }, "auto-save": { "name": "Auto Save", "category": "Customization" }, "chart": { "name": "Chart Preservation", "category": "Charts" }, "document-protection": { "name": "Document Protection", "category": "Security" }, "comments": { "name": "Comments", "category": "Review" }, "defaultSample": "document-editor/default" };
