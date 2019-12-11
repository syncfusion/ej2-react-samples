"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentEditorSampleOrder = [
    { 'path': 'document-editor/default', 'name': 'Default Functionalities', 'component': 'Default', 'order': '01', 'category': 'DocumentEditor', 'description': 'The Document Editor component is used to create, edit, view, and print Word documents in web applications.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/character-formatting', 'name': 'Character Formatting', 'component': 'CharacterFormatView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports character formatting such as bold, italic, underline, subscript, superscript, font color, and more.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/paragraph-formatting', 'name': 'Paragraph Formatting', 'component': 'ParagraphFormatView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports paragraph formatting such as indentation, paragraph spacing, line spacing, and text alignment.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/styles', 'name': 'Styles', 'component': 'StylesView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports both built-in and custom styles for character format and paragraph format.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/bullets-and-numbering', 'name': 'Bullets and Numbering', 'component': 'BulletsAndNumberingView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports bullets and numbering. Both single list and multi-level lists can be added.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/links-and-bookmarks', 'name': 'Hyperlinks and Bookmarks', 'component': 'HyperlinksAndBookmarksView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports hyperlinks and bookmarks. The link can be a file, mail, webpage, or bookmark.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/table-formatting', 'name': 'Table Formatting', 'component': 'TableFormatView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports table formatting such as cell margins, cell spacing, horizontal merge, vertical merge, border styles, background color, and more.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/section-formatting', 'name': 'Section Formatting', 'component': 'SectionFormatView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports section formatting such as page size, page margins, header distance, and footer distance.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/headers-and-footers', 'name': 'Headers and Footers', 'component': 'HeadersAndFootersView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports headers and footers. Different headers and footers can be added to the first page, odd pages, and even pages.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/table-of-contents', 'name': 'Table of Contents', 'component': 'TableOfContentsView', 'order': '02', 'category': 'Editing Features', 'description': 'The Document Editor supports table of contents with options for including hyperlink, page number, right-aligned tabs, and styles.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/print', 'name': 'Print', 'component': 'PrintView', 'description': 'The Document Editor component is used to view and print Word documents in web applications by injecting only the modules that are necessary.', 'order': '03', 'category': 'Print', 'api': '{"DocumentEditor":["enablePrint","documentName","pageOutline","viewChange","documentChange","zoomFactorChange"]}' },
    { 'path': 'document-editor/right-to-left', 'name': 'Right To Left', 'component': 'RightToLeftView', 'description': 'The Document Editor supports right to left for users who use right-to-left languages (Arabic, Hebrew, Urdu, etc.).', 'category': 'RTL', 'api': '{"DocumentEditor":["enableRtl"]}' },
    { 'path': 'document-editor/custom-context-menu', 'name': 'Custom Context Menu', 'component': 'CustomContextMenuView', 'description': 'The Document Editor supports custom options for users who use to add custom options in context menu.', 'order': '05', 'category': 'Customization', 'api': '{"ContextMenu":["addCustomMenu", "customContextMenuSelect", "customContextMenuBeforeOpen"]}' },
    { 'path': 'document-editor/auto-save', 'name': 'Auto Save', 'component': 'DocumentEditorAutoSave', 'description': 'The Document Editor supports auto save functionality to let the users for saving the documents automatically at customized time interval.', 'order': '05', 'category': 'Customization', 'api': '{"ContextMenu":["addCustomMenu", "customContextMenuSelect", "customContextMenuBeforeOpen"]}' },
    { 'path': 'document-editor/chart', 'name': 'Chart Preservation', 'component': 'DocumentEditorChart', 'order': '06', 'category': 'Charts', 'description': 'The Document Editor supports chart preservation for users who use to view their business reports with intuitive graphical data visualization.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/document-protection', 'name': 'Document Protection', 'component': 'DocumentProtection', 'order': '07', 'category': 'Security', 'description': 'The Document Editor provides document protection supports to restrict the types of changes can be made to the document by a user/user group.', 'api': '{"DocumentEditor":["isReadOnly","enableAllModules","acceptTab","documentName","pageOutline","selection","editor","editorHistory","enableLocalPaste","pageCount","zoomFactor","documentChange","viewChange","selectionChange","requestNavigate","contentChange","open","print","openBlank","focusIn","save","showDialog","showOptionsPane","fitPage","getStyleNames","resize","scrollToPage"],"Selection":["contextType","characterFormat","paragraphFormat","sectionFormat","cellFormat","imageFormat","goToPage","goToHeader","goToFooter","closeHeaderFooter"],"SelectionCharacterFormat":["bold","italic","underline","fontFamily","fontSize","fontColor","highlightColor","strikethrough","baselineAlignment"],"SelectionParagraphFormat":["textAlignment","lineSpacing","styleName"],"SelectionSectionFormat":["differentFirstPage","differentOddAndEvenPages","headerDistance","footerDistance"],"SelectionCellFormat":["topMargin","bottomMargin","leftMargin","rightMargin","verticalAlignment","background"],"SelectionImageFormat":["width","height","resize"],"Editor":["insertImage","toggleBold","toggleItalic","toggleUnderline","toggleStrikethrough","toggleSubscript","toggleSuperscript","toggleTextAlignment","increaseIndent","decreaseIndent","applyNumbering","applyBullet","applyStyle","clearList","clearFormatting","canMergeCells","mergeCells","applyBorders","insertPageNumber","insertTableOfContents","insertRow","insertColumn","deleteRow","deleteColumn"],"EditorHistory":["undo","redo","canUndo","canRedo"]}' },
    { 'path': 'document-editor/comments', 'name': 'Comments', 'component': 'Comments', 'order': '08', 'category': 'Review', 'type': 'new', 'description': 'The Document Editor component supports add and edit comments in a Word document for comment discussion.' }
];
