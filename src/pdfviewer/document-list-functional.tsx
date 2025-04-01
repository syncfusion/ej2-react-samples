import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { GridComponent, ColumnsDirective, ColumnDirective,CommandColumn } from '@syncfusion/ej2-react-grids';
import { gridData } from './data';
import { updateSampleSection } from '../common/sample-base';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { SwitchComponent, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';

function DocumentList () {
  useEffect(() => {
    updateSampleSection();
  }, []);

  let viewer: PdfViewerComponent;
  let dialogInstance = useRef<DialogComponent>(null);
  const gridInstance = useRef<GridComponent>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isGridOpen, setGridOpen] = useState(true);
  let mode:any;
  const commands:any=[{type:'View',buttonOption:{cssClass:'e-icons e-eye e-flat',title:'View'}},
  {type:'Edit',buttonOption:{cssClass:'e-icons e-edit e-flat',title:'Edit'}}];

  function buttonClick (args): void {
    var viewer = (document.getElementById('container') as any).ej2_instances[0];
    viewer.documentPath=args.rowData.Url;
    dialogInstance.current.header=args.rowData.FileName;
    if(args.commandColumn.buttonOption.title=='View'){
      mode = 'View';
      setDialogOpen(true);
      setGridOpen(false);

      viewer.textFieldSettings = {
        isReadOnly: true,
      };
      viewer.radioButtonFieldSettings = {
        isReadOnly: true,
      };
      viewer.DropdownFieldSettings = {
        isReadOnly: true,
      };
      viewer.checkBoxFieldSettings = {
        isReadOnly: true,
      };
      viewer.signatureFieldSettings = {
        isReadOnly: true,
      };
      viewer.listBoxFieldSettings={
        isReadOnly:true,
      };
      viewer.passwordFieldSettings={
          isReadOnly:true,
      };
      viewer.initialFieldSettings={
          isReadOnly:true,
      };

      viewer.annotationSettings = { isLock: true , author: 'Guest' };
      viewer.enableStickyNotesAnnotation = false;
      viewer.toolbar.showAnnotationToolbar(false);
      viewer.isFormDesignerToolbarVisible = false;
      viewer.contextMenuOption = "None";
      viewer.toolbarSettings = {
        showTooltip: true,
        toolbarItems: ['OpenOption','PageNavigationTool', 'MagnificationTool', 'PanTool','PrintOption']
      };
  }
  else{
    setDialogOpen(true);
    setGridOpen(false);
    mode = 'Edit';
    viewer.textFieldSettings = {
      isReadOnly: false,
    };
    viewer.radioButtonFieldSettings = {
      isReadOnly: false,
    };
    viewer.DropdownFieldSettings = {
      isReadOnly: false,
    };
    viewer.checkBoxFieldSettings = {
      isReadOnly: false,
    };
    viewer.signatureFieldSettings = {
      isReadOnly: false,
    };
    viewer.listBoxFieldSettings={
      isReadOnly:false,
    };
    viewer.passwordFieldSettings={
        isReadOnly:false,
    };
    viewer.initialFieldSettings={
        isReadOnly:false,
    };

    viewer.annotationSettings = { isLock: false , author: 'Guest'};
    viewer.enableStickyNotesAnnotation = true;
    viewer.contextMenuOption = "Block";
    viewer.toolbarSettings = {
      showTooltip: true,
      toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool',
        'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool',
        'FormDesignerEditTool', 'FreeTextAnnotationOption', 'InkAnnotationOption',
        'ShapeAnnotationOption', 'StampAnnotation', 'SignatureOption', 'SearchOption',
        'PrintOption', 'DownloadOption'],
      annotationToolbarItems: ['HighlightTool', 'UnderlineTool', 'StrikethroughTool',
        'ColorEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'StampAnnotationTool',
        'HandWrittenSignatureTool', 'InkAnnotationTool', 'ShapeTool', 'CalibrateTool',
        'StrokeColorEditTool', 'ThicknessEditTool', 'FreeTextAnnotationTool', 'FontFamilyAnnotationTool',
        'FontSizeAnnotationTool', 'FontStylesAnnotationTool', 'FontAlignAnnotationTool',
        'FontColorAnnotationTool', 'CommentPanelTool'],
      formDesignerToolbarItems: ['TextboxTool', 'PasswordTool', 'CheckBoxTool',
        'RadioButtonTool', 'DropdownTool', 'ListboxTool', 'DrawSignatureTool', 'DeleteTool']
    };
  }
}  

function destroyed (): void{
  viewer.destroy();
  dialogInstance.current.destroy();
}

  function dialogClose (): void {
    setDialogOpen(false);    
  }

  function dialogOpen (): void {
    setDialogOpen(true);    
  }

  function documentLoaded() {
    if(mode == 'View'){
      viewer.enablePageOrganizer = false;
    }
    else {
      viewer.enablePageOrganizer = true;
    }
  }

  function change(args : any): void {
    if (args.checked) {
      viewer.serviceUrl = '';
    } else {
      viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
    }   
  }

  return (
    <div className="control-pane pdfviewer-document-list">
      <div id="targetElement" className="control-section col-lg-12 defaultDialogComponent dialog-target">
        <div className="flex-container">
          <label htmlFor="checked" className="switchLabel"> Standalone PDF Viewer </label>
          <div className="e-message render-mode-info">
            <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
          </div>
          <SwitchComponent cssClass="buttonSwitch" id="checked" change={change} checked={true}></SwitchComponent>
        </div>        
          <GridComponent ref={gridInstance} dataSource={gridData} commandClick={buttonClick} destroyed={destroyed}>
            <ColumnsDirective>
              <ColumnDirective headerText='File Name' headerTextAlign='Left'
                template={(props: any) => (
                  <div className="file-name-container">
                    <div className="file-name-content">
                      <div className="icon-and-text">
                        <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 3C0 1.34315 1.34315 0 3 0H13.7574C14.553 0 15.3161 0.316071 15.8787 0.87868L23.1213 8.12132C23.6839 8.68393 24 9.44699 24 10.2426V27C24 28.6569 22.6569 30 21 30H3C1.34315 30 0 28.6569 0 27V3Z" fill="#F54848" />
                          <path d="M14.5 11H22V10.5042C22 9.76949 21.7304 9.0603 21.2422 8.51114L16.9463 3.67818C15.9974 2.61074 14.6374 2 13.2092 2H13V9.5C13 10.3284 13.6716 11 14.5 11Z" fill="#FFB7B7" />
                          <path d="M16.3787 22V14.7273H21.3432V16.1549H18.1365V17.6463H21.0271V19.0774H18.1365V22H16.3787Z" fill="white" />
                          <path d="M11.7622 22H9.07397V14.7273H11.7586C12.4996 14.7273 13.1377 14.8729 13.6727 15.1641C14.2101 15.4529 14.6244 15.8696 14.9156 16.4141C15.2068 16.9562 15.3524 17.6049 15.3524 18.3601C15.3524 19.1177 15.2068 19.7687 14.9156 20.3132C14.6268 20.8577 14.2137 21.2756 13.6762 21.5668C13.1388 21.8556 12.5008 22 11.7622 22ZM10.8318 20.5014H11.6947C12.1019 20.5014 12.4464 20.4328 12.7281 20.2955C13.0122 20.1558 13.2264 19.9297 13.3709 19.6172C13.5176 19.3023 13.591 18.8833 13.591 18.3601C13.591 17.8369 13.5176 17.4202 13.3709 17.1101C13.2241 16.7976 13.0074 16.5727 12.721 16.4354C12.4369 16.2957 12.0865 16.2259 11.6699 16.2259H10.8318V20.5014Z" fill="white" />
                          <path d="M2.55054 22V14.7273H5.5548C6.09931 14.7273 6.56924 14.8338 6.9646 15.0469C7.36233 15.2576 7.66891 15.5523 7.88434 15.9311C8.09978 16.3076 8.2075 16.7455 8.2075 17.2451C8.2075 17.7469 8.09741 18.1861 7.87724 18.5625C7.65944 18.9366 7.34812 19.2266 6.94329 19.4326C6.53846 19.6385 6.05788 19.7415 5.50153 19.7415H3.64784V18.3566H5.17483C5.43998 18.3566 5.66133 18.3104 5.83889 18.2181C6.01881 18.1257 6.15494 17.9967 6.24727 17.831C6.3396 17.6629 6.38576 17.4676 6.38576 17.2451C6.38576 17.0201 6.3396 16.826 6.24727 16.6627C6.15494 16.4969 6.01881 16.3691 5.83889 16.2791C5.65897 16.1892 5.43761 16.1442 5.17483 16.1442H4.30835V22H2.55054Z" fill="white" />
                        </svg>
                        <div className="file-name-text">{props.FileName}</div>
                      </div>
                    </div>
                  </div>
                )} />
              <ColumnDirective headerText='Author' field='Author'></ColumnDirective>
              <ColumnDirective headerText='Actions' textAlign='Center' commands={commands}></ColumnDirective>
            
            </ColumnsDirective>
            <Inject services={[CommandColumn]}></Inject>
          </GridComponent>
        
          <DialogComponent id="defaultDialog" showCloseIcon={true} ref={dialogInstance} visible={isDialogOpen} minHeight={'90%'} width={'90%'} height={'90%'} isModal={true} open={dialogOpen} close={dialogClose}>
          <div className='control-section'>
            <PdfViewerComponent ref={(scope) => { viewer = scope; }} style={{ 'height': '735px' }} id="container" documentLoad={documentLoaded} resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" >
              <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
            </PdfViewerComponent>
          </div>
        </DialogComponent>
      </div>

      <div id="action-description">
        <p>This demonstration showcases the process of presenting a list of PDF documents in a grid layout and accessing the document for viewing or editing through the PDF Viewer within a dialog box.</p>
      </div>
      <div id="description">
        <p>
          More information on adding annotation programmatically can be found in this
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">documentation section</a>.
        </p>
      </div>
    </div>
  );
}

export default DocumentList;