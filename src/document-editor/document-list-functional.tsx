import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, CommandColumn } from '@syncfusion/ej2-react-grids';
import './default.component.css';
import { gridData } from './word-data';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
DocumentEditorContainerComponent.Inject(Toolbar);
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { defaultDocument, characterFormat, paragraphFormat, styles, weblayout } from './data';

interface Dictionary {
  [key: string]: object;
}

const DocumentList = () => {
  useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, []);

  const [dictionary, setDictionary] = useState<Dictionary>({
    'Getting Started.docx': defaultDocument,
    'Character Formatting.docx': characterFormat,
    'Paragraph Format.docx': paragraphFormat,
    'Style.docx': styles,
    'Web Layout.docx': weblayout
  });

  const commands: any = [
    { type: 'View', buttonOption: { cssClass: "e-icons e-eye e-flat" } },
    { type: 'Edit', buttonOption: { cssClass: "e-icons e-edit e-flat" } }];

  let dialogInstance = useRef<DialogComponent>(null);
  const gridInstance = useRef<GridComponent>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isGridOpen, setGridOpen] = useState(true);
  let hostUrl: string = "https://services.syncfusion.com/react/production/api/documenteditor/";
  let container = useRef<DocumentEditorContainerComponent>(null);
  let titleBar: TitleBar;

  const onLoadDefault = (): void => {
    titleBar.updateDocumentTitle();
    container.current.documentChange = (): void => {
      titleBar.updateDocumentTitle();
      container.current.documentEditor.focusIn();
    };
    container.current.documentEditorSettings.showRuler = true;
  };

  const rendereComplete = (): void => {
    window.onbeforeunload = function () {
      return "Want to save your changes?";
    };
    container.current.documentEditor.pageOutline = "#E0E0E0";
    container.current.documentEditor.acceptTab = true;
    container.current.documentEditor.resize();
    titleBar = new TitleBar(
      document.getElementById("documenteditor_titlebar"),
      container.current.documentEditor,
      true, false, dialogInstance.current
    );
    onLoadDefault();
  };

  const dialogClose = (): void => {
    setDialogOpen(false);
  }

  const dialogOpen = (): void => {
    setDialogOpen(true);
    container.current.documentEditor.resize();
  }

  const onCommandClicked = (args): void => {
    const cssClass = args.target.className;

    if (cssClass.includes('e-icons e-eye e-flat')) {
      setDialogOpen(true);
      setGridOpen(false);

      if (dictionary.hasOwnProperty(args.rowData.FileName)) {
        container.current.documentEditor.open(JSON.stringify(dictionary[args.rowData.FileName]));
      }
      container.current.documentEditor.isReadOnly = true;
      container.current.documentEditor.enableContextMenu = false;
      container.current.resize();
      const downloadButton = document.getElementById("documenteditor-share") as HTMLButtonElement | null;
      if (downloadButton) {
        downloadButton.style.display = "none";
      }
      const closeButton = document.getElementById("de-close") as HTMLButtonElement | null;
      if (closeButton) {
        closeButton.style.display = "block";
      }
      container.current.documentEditor.documentName = args.rowData.FileName.replace(".docx", "");
      document.getElementById("documenteditor_title_name").textContent = container.current.documentEditor.documentName;
      container.current.toolbarItems = ['Open', 'Separator', 'Find'];

    }
    else if (cssClass.includes('e-icons e-edit e-flat')) {
      setDialogOpen(true);
      setGridOpen(false);

      if (dictionary.hasOwnProperty(args.rowData.FileName)) {
        container.current.documentEditor.open(JSON.stringify(dictionary[args.rowData.FileName]));
      }
      container.current.documentEditor.isReadOnly = false;
      container.current.documentEditor.enableContextMenu = true;
      container.current.resize();
      const downloadButton = document.getElementById("documenteditor-share") as HTMLButtonElement | null;
      if (downloadButton) {
        downloadButton.style.display = "block";
      }
      const closeButton = document.getElementById("de-close") as HTMLButtonElement | null;
      if (closeButton) {
        closeButton.style.display = "block";
      }
      container.current.documentEditor.documentName = args.rowData.FileName.replace(".docx", "");
      document.getElementById("documenteditor_title_name").textContent = container.current.documentEditor.documentName;
      container.current.toolbarItems = ['New', 'Open', 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields'];
    }
  }

  return (
    <div className="control-pane documenteditor-list-sample">
      <GridComponent ref={gridInstance} dataSource={gridData} commandClick={onCommandClicked}>
        <ColumnsDirective>
          <ColumnDirective headerText='File Name'
            template={(props: any) => (
              <div className="file-name-container">
                <div className="file-name-content">
                  <div className="icon-and-text">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3C3 1.34315 4.34315 0 6 0H16.7574C17.553 0 18.3161 0.316071 18.8787 0.87868L26.1213 8.12132C26.6839 8.68393 27 9.44699 27 10.2426V27C27 28.6569 25.6569 30 24 30H6C4.34315 30 3 28.6569 3 27V3Z" fill="#4889EF" />
                      <path d="M17.5 11H25V10.5042C25 9.76949 24.7304 9.0603 24.2422 8.51114L19.9463 3.67818C18.9974 2.61074 17.6374 2 16.2092 2H16V9.5C16 10.3284 16.6716 11 17.5 11Z" fill="#D6E5FE" />
                      <path d="M10.3044 12H10.8868H11.104H11.6817L12.6231 16.3922L13.3963 12H15L13.5719 19H12.777H12.5552H11.8943L10.993 15.0093L10.1103 19H9.44945H9.22761H8.42808L7 12H8.60832L9.38188 16.3816L10.3044 12Z" fill="white" />
                      <rect x="7" y="21" width="16" height="2" rx="1" fill="white" />
                      <rect x="7" y="25" width="11" height="2" rx="1" fill="white" />
                    </svg>
                    <div className="file-name-text">{props.FileName}</div>
                  </div>
                </div>
              </div>
            )} />
          <ColumnDirective headerText='Author' field='Author'></ColumnDirective>
          <ColumnDirective headerText='Actions' commands={commands} textAlign='Center'></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[CommandColumn]} />
      </GridComponent>
      <DialogComponent id="defaultDialog" ref={dialogInstance} isModal={true} visible={isDialogOpen} width={'90%'} height={'90%'} zIndex={1500} open={dialogOpen} close={dialogClose}>
        <div>
          <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
          <div id="documenteditor_container_body">
            <DocumentEditorContainerComponent showPropertiesPane={false}
              id="container" height='780px'
              ref={container}
              style={{ display: "block" }}
              serviceUrl={hostUrl}
              zIndex={3000} 
              enableToolbar={true}
              locale="en-US"
            />
          </div>
        </div>
      </DialogComponent>

      <div id="action-description">
        <p>This demonstration showcases the process of presenting a list of Word documents in a grid layout and accessing
          the document for viewing or editing through the Document Editor within a dialog box.</p>
      </div>
      <div id="description">
        <p>In this example, you can view the document in either view or edit mode using the Document Editor.</p>
        <p>For more information about the features of the Document Editor, please refer to the
          <a target="_blank"
            href="https://ej2.syncfusion.com/documentation/document-editor/overview">
            documentation section</a>.
        </p>
      </div>
    </div>
  );
}

export default DocumentList;
