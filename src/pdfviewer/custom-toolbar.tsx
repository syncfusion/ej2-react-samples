import * as React from 'react';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, Annotation, FormFields, FormDesigner,
  ThumbnailView, Print, TextSelection, TextSearch,PageOrganizer, Inject, StandardBusinessStampItem, SignStampItem, DynamicStampItem
} from '@syncfusion/ej2-react-pdfviewer';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs, MenuComponent } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
let viewer: PdfViewerComponent;

export class CustomToolbar extends SampleBase<{}, {}> {
  public viewer: PdfViewerComponent;
  public toolbar: ToolbarComponent;
  public currentPageNumber: string = '1';
  public fileName: string = '';
  public matchCase: boolean;
  public searchText: string = '';
  public prevMatchCase = false;
  public isInkEnabled = false;
  public searchActive: boolean = false;

  componentDidMount(): void {
    viewer = (document.getElementById('container') as any).ej2_instances[0];
  }
  stampTemplate() {
    const onItemSelect = function (args: any) {
      var stampId = args.element.id;
      var stampText = args.element.innerText;
      if (stampId === 'Dynamic' && stampText != null) {
        if (stampText === 'Revised') {
          viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Revised);
        } else if (stampText == 'Reviewed') {
          viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Reviewed);
        } else if (stampText == 'Received') {
          viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Received);
        } else if (stampText == 'Confidential') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            DynamicStampItem.Confidential
          );
        } else if (stampText == 'Approved') {
          viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Approved);
        } else if (stampText == 'NotApproved') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            DynamicStampItem.NotApproved
          );
        }
      }
      if (stampId === 'Sign Here' && stampText != null) {
        if (stampText === 'Witness') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            SignStampItem.Witness
          );
        } else if (stampText == 'Initial Here') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            SignStampItem.InitialHere
          );
        } else if (stampText == 'Sign Here') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            SignStampItem.SignHere
          );
        } else if (stampText == 'Accepted') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            SignStampItem.Accepted
          );
        } else if (stampText == 'Rejected') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            SignStampItem.Rejected
          );
        }
      }
      if (stampId === 'Standard Business' && stampText != null) {
        if (stampText === 'Approved') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.Approved
          );
        } else if (stampText == 'Not Approved') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.NotApproved
          );
        } else if (stampText == 'Draft') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.Draft
          );
        } else if (stampText == 'Final') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.Final
          );
        } else if (stampText == 'Completed') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.Completed
          );
        } else if (stampText == 'Confidential') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.Confidential
          );
        } else if (stampText == 'For Public Release') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.ForPublicRelease
          );
        } else if (stampText == 'Not For Public Release') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.NotForPublicRelease
          );
        } else if (stampText == 'For Comment') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.ForComment
          );
        } else if (stampText == 'Void') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.Void
          );
        } else if (stampText == 'Preliminary Results') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.PreliminaryResults
          );
        } else if (stampText == 'Information Only') {
          viewer.annotation.setAnnotationMode(
            'Stamp',
            undefined,
            undefined,
            StandardBusinessStampItem.InformationOnly
          );
        }
      }
    }
    const data = [
      {
        iconCss: 'e-icons e-stamp',
        items: [
          {
            text: 'Dynamic',
            items: [
              { text: 'Revised', id: 'Dynamic' },
              { text: 'Reviewed', id: 'Dynamic' },
              { text: 'Received', id: 'Dynamic' },
              { text: 'Confidential', id: 'Dynamic' },
              { text: 'Approved', id: 'Dynamic' },
              { text: 'Not Approved', id: 'Dynamic' },
            ],
          },
          {
            text: 'Sign Here',
            items: [
              { text: 'Witness', id: 'Sign Here' },
              { text: 'Initial Here', id: 'Sign Here' },
              { text: 'Sign Here', id: 'Sign Here' },
              { text: 'Accepted', id: 'Sign Here' },
              { text: 'Rejected', id: 'Sign Here' },
            ],
          },
          {
            text: 'Standard Business',
            items: [
              { text: 'Approved', id: 'Standard Business' },
              { text: 'Not Approved', id: 'Standard Business' },
              { text: 'Draft', id: 'Standard Business' },
              { text: 'Final', id: 'Standard Business' },
              { text: 'Completed', id: 'Standard Business' },
              { text: 'Confidential', id: 'Standard Business' },
              { text: 'For Public Release', id: 'Standard Business' },
              { text: 'Not For Public Release', id: 'Standard Business' },
              { text: 'For Comment', id: 'Standard Business' },
              { text: 'Void', id: 'Standard Business' },
              { text: 'Preliminary Results', id: 'Standard Business' },
              { text: 'Information Only', id: 'Standard Business' },
            ],
          },
        ],
      },
    ];
    return (
      <MenuComponent
        items={data}
        showItemOnClick={true}
        select={onItemSelect}
      ></MenuComponent>
    );
  }
  signTemplate() {
    const signMenu = [{
      iconCss: "e-icons e-signature",
      items:
        [
          { text: "Add Signature" },
          { text: "Add Initial" },

        ]
    }];
    const onsignatureCilck = function (event: any) {
      let signatureText = event.element.innerText;
      let editAnnotationToolbar: HTMLElement = document.getElementById(
        'editAnnotationToolbar'
      ) as HTMLElement;
      if (editAnnotationToolbar.style.display === 'block') {
        if (signatureText === 'Add Signature') {
          viewer.annotation.setAnnotationMode('HandWrittenSignature');
        } else if (signatureText === 'Add Initial') {
          viewer.annotation.setAnnotationMode('Initial');
        }
      }

      let formFieldToolbar: HTMLElement = document.getElementById(
        'formFieldToolbar'
      ) as HTMLElement;
      if (formFieldToolbar.style.display === 'block') {
        if (signatureText === 'Add Signture') {
          viewer.formDesignerModule.setFormFieldMode('SignatureField');
        } else if (signatureText === 'Add Initial') {
          viewer.formDesignerModule.setFormFieldMode('InitialField');
        }
      }
    }
    return (
      <MenuComponent
        items={signMenu}
        showItemOnClick={true}
        select={onsignatureCilck}
      ></MenuComponent>
    )
  }

  formFieldSignTemplate() {
    const signMenu = [{
      iconCss: "e-icons e-signature",
      items:
        [
          { text: "Add Signature" },
          { text: "Add Initial" },

        ]
    }];
    const onsignatureCilck = function (event: any) {
      let signatureText = event.element.innerText;
      let editAnnotationToolbar: HTMLElement = document.getElementById(
        'editAnnotationToolbar'
      ) as HTMLElement;
      if (editAnnotationToolbar.style.display === 'block') {
        if (signatureText === 'Add Signature') {
          viewer.annotation.setAnnotationMode('HandWrittenSignature');
        } else if (signatureText === 'Add Initial') {
          viewer.annotation.setAnnotationMode('Initial');
        }
      }

      let formFieldToolbar: HTMLElement = document.getElementById(
        'formFieldToolbar'
      ) as HTMLElement;
      if (formFieldToolbar.style.display === 'block') {
        if (signatureText === 'Add Signature') {
          viewer.formDesignerModule.setFormFieldMode('SignatureField');
        } else if (signatureText === 'Add Initial') {
          viewer.formDesignerModule.setFormFieldMode('InitialField');
        }
      }
    }
    return (
      <MenuComponent
        items={signMenu}
        showItemOnClick={true}
        select={onsignatureCilck}
      ></MenuComponent>
    )
  }
  public wireEvent: Function;


  rendereComplete() {
    this.wireEvent();

  }
  render() {
    function template() {
      return (
        <div style={{margin: '0px 6px'}}><span className='e-pv-total-page-number' id='totalPage'>of 0</span></div>
      );
    }
    function inputTemplate() {
      return (
        <div><input type='text' className='e-input-group e-pv-current-page-number' id='currentPage' /></div>
      );
    }
    this.wireEvent = function () {
      let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
      inputElement.addEventListener('click', currentPageClicked.bind(this));
      inputElement.addEventListener('keypress', onCurrentPageBoxKeypress.bind(this));
      inputElement.value = this.currentPageNumber;
    }


    const disableInkAnnotation = function (args: any) {
      if (this.isInkEnabled) {
        viewer.annotation.setAnnotationMode("None");
        this.isInkEnabled = false;
      }
    }
    const clickHandler = function (args: ClickEventArgs) {
      switch (args.item.id) {
        case 'file_Open':
          {
            disableInkAnnotation.bind(this);
            let fileUpload = document.getElementById(
              'fileUpload'
            ) as HTMLInputElement;
            fileUpload.click();
            let editAnnotationToolbarElement: HTMLElement =
              document.getElementById('editAnnotationToolbar') as HTMLElement;
            if (editAnnotationToolbarElement.style.display === 'block')
              editAnnotationToolbarElement.style.display = 'none';

            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display === 'block')
              textSearchToolbarElement.style.display = 'none';

            let formFieldToolbarElement: HTMLElement = document.getElementById(
              'formFieldToolbar'
            ) as HTMLElement;
            if (formFieldToolbarElement.style.display === 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            }
          }
          break;
        case 'save':
          {
            disableInkAnnotation.bind(this);
            let editAnnotationToolbarElement: HTMLElement =
              document.getElementById('editAnnotationToolbar') as HTMLElement;
            if (editAnnotationToolbarElement.style.display == 'block')
              editAnnotationToolbarElement.style.display = 'none';

            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display == 'block')
              textSearchToolbarElement.style.display = 'none';

            let formFieldToolbarElement: HTMLElement = document.getElementById(
              'formFieldToolbar'
            ) as HTMLElement;
            if (formFieldToolbarElement.style.display == 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            }
            viewer.download();
          }
          break;
        case 'previous_page':
          disableInkAnnotation.bind(this);
          viewer.navigation.goToPreviousPage();
          break;
        case 'next_page':
          disableInkAnnotation.bind(this);
          viewer.navigation.goToNextPage();
          break;
        case 'fit_to_page':
          viewer.magnification.fitToPage();
          break;
        case 'zoom_in':
          {
            viewer.magnification.zoomIn();

            let editAnnotationToolbarElement: HTMLElement =
              document.getElementById('editAnnotationToolbar') as HTMLElement;
            if (editAnnotationToolbarElement.style.display === 'block')
              editAnnotationToolbarElement.style.display = 'none';

            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display === 'block')
              textSearchToolbarElement.style.display = 'none';

            let formFieldToolbarElement: HTMLElement = document.getElementById(
              'formFieldToolbar'
            ) as HTMLElement;
            if (formFieldToolbarElement.style.display === 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            }
          }
          break;
        case 'zoom_out':
          {
            viewer.magnification.zoomOut();
            let editAnnotationToolbarElement: HTMLElement =
              document.getElementById('editAnnotationToolbar') as HTMLElement;
            if (editAnnotationToolbarElement.style.display === 'block')
              editAnnotationToolbarElement.style.display = 'none';
            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display === 'block')
              textSearchToolbarElement.style.display = 'none';

            let formFieldToolbarElement: HTMLElement = document.getElementById(
              'formFieldToolbar'
            ) as HTMLElement;
            if (formFieldToolbarElement.style.display === 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            }
          }
          break;
        case 'text_selection_tool':
          {
            disableInkAnnotation.bind(this);
            viewer.interactionMode = 'TextSelection';
            let editAnnotationToolbarElement: HTMLElement =
              document.getElementById('editAnnotationToolbar') as HTMLElement;
            if (editAnnotationToolbarElement.style.display === 'block')
              editAnnotationToolbarElement.style.display = 'none';
            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display === 'block')
              textSearchToolbarElement.style.display = 'none';

            let formFieldToolbarElement: HTMLElement = document.getElementById(
              'formFieldToolbar'
            ) as HTMLElement;
            if (formFieldToolbarElement.style.display === 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            }
          }
          break;
        case 'pan_tool':
          {
            disableInkAnnotation.bind(this);
            viewer.interactionMode = 'Pan';
            let editAnnotationToolbarElement: HTMLElement =
              document.getElementById('editAnnotationToolbar') as HTMLElement;
            if (editAnnotationToolbarElement.style.display === 'block')
              editAnnotationToolbarElement.style.display = 'none';
            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display === 'block')
              textSearchToolbarElement.style.display = 'none';
            let formFieldToolbarElement: HTMLElement = document.getElementById(
              'formFieldToolbar'
            ) as HTMLElement;
            if (formFieldToolbarElement.style.display === 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            }
          }
          break;
        case 'find_text': {
          disableInkAnnotation.bind(this);
          let editAnnotationToolbarElement: HTMLElement = document.getElementById(
            'editAnnotationToolbar'
          ) as HTMLElement;
          if (editAnnotationToolbarElement.style.display === 'block')
            editAnnotationToolbarElement.style.display = 'none';
          let textSearchToolbarElement: HTMLElement = document.getElementById(
            'textSearchToolbar'
          ) as HTMLElement;
          if (textSearchToolbarElement.style.display === 'block')
            textSearchToolbarElement.style.display = 'none';
          else textSearchToolbarElement.style.display = 'block';
          let formFieldToolbarElement: HTMLElement = document.getElementById(
            'formFieldToolbar'
          ) as HTMLElement;
          if (formFieldToolbarElement.style.display === 'block') {
            formFieldToolbarElement.style.display = 'none';
            viewer.designerMode = false;
          }
          break;
        }
        case 'print':
          {
            disableInkAnnotation.bind(this);
            viewer.print.print();
            let editAnnotationToolbarElement: HTMLElement =
              document.getElementById('editAnnotationToolbar') as HTMLElement;
            if (editAnnotationToolbarElement.style.display == 'block')
              editAnnotationToolbarElement.style.display = 'none';
            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display == 'block')
              textSearchToolbarElement.style.display = 'none';

            let formFieldToolbarElement: HTMLElement = document.getElementById(
              'formFieldToolbar'
            ) as HTMLElement;
            if (formFieldToolbarElement.style.display == 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            }
          }
          break;
        case 'highlights':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Highlight');
          break;
        case 'underline':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Underline');
          break;
        case 'strikethrough':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Strikethrough');
          break;
        case 'edit_annotation':
          disableInkAnnotation.bind(this);
          let formFieldToolbarElement: HTMLInputElement = document.getElementById(
            'formFieldToolbar'
          ) as HTMLInputElement;
          if (formFieldToolbarElement.style.display === 'block') {
            formFieldToolbarElement.style.display = 'none';
            viewer.designerMode = false;
          }
          let textSearchToolbarElement: HTMLElement = document.getElementById(
            'textSearchToolbar'
          ) as HTMLElement;
          if (textSearchToolbarElement.style.display === 'block')
            textSearchToolbarElement.style.display = 'none';

          let editAnnotationToolbar = document.getElementById(
            'editAnnotationToolbar'
          ) as HTMLInputElement;
          if (editAnnotationToolbar !== null) {
            if (editAnnotationToolbar.style.display === 'block') {
              editAnnotationToolbar.style.display = 'none';
            } else {
              editAnnotationToolbar.style.display = 'block';
            }
          }
          break;
        case 'line':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Line');
          break;
        case 'arrow':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Arrow');
          break;
        case 'rectangle':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Rectangle');
          break;
        case 'circle':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Circle');
          break;
        case 'polygon':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Polygon');
          break;
        case 'calibrate_distance':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('Distance');
          break;
        case 'calibrate_perimeter':
          disableInkAnnotation.bind(this);
          viewer.annotation.setAnnotationMode('Perimeter');
          break;
        case 'calibrate_area':
          disableInkAnnotation.bind(this);
          viewer.annotation.setAnnotationMode('Area');
          break;
        case 'calibrate_radius':
          disableInkAnnotation.bind(this);
          viewer.annotation.setAnnotationMode('Radius');
          break;
        case 'calibrate_volume':
          disableInkAnnotation.bind(this);
          viewer.annotation.setAnnotationMode('Volume');
          break;
        case 'freeText':
          disableInkAnnotation.bind(this);
          viewer.annotationModule.setAnnotationMode('FreeText');
          break;
        case 'signature':
        case 'formField_signature':
          {
            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display === 'block') {
              textSearchToolbarElement.style.display = 'none';
            }
          }
          break;
        case 'ink':
          if (!this.isInkEnabled) {
            viewer.annotation.setAnnotationMode("Ink");
            this.isInkEnabled = true;
          }
          else {
            viewer.annotation.setAnnotationMode("None");
            this.isInkEnabled = false;
          }
          viewer.annotationModule.setAnnotationMode('Ink');
          break;
        case 'textbox':
          viewer.formDesignerModule.setFormFieldMode('Textbox');
          break;
        case 'password':
          viewer.formDesignerModule.setFormFieldMode('Password');
          break;
        case 'checkbok':
          viewer.formDesignerModule.setFormFieldMode('CheckBox');
          break;
        case 'radio_button':
          viewer.formDesignerModule.setFormFieldMode('RadioButton');
          break;
        case 'drop_down':
          viewer.formDesignerModule.setFormFieldMode('DropDown');
          break;
        case 'list_box':
          viewer.formDesignerModule.setFormFieldMode('ListBox');
          break;
        case 'add_form_field':
          {
            let editAnnotationToolbar = document.getElementById(
              'editAnnotationToolbar'
            ) as HTMLInputElement;
            if (editAnnotationToolbar.style.display === 'block') {
              editAnnotationToolbar.style.display = 'none';
            }
            let textSearchToolbarElement: HTMLElement = document.getElementById(
              'textSearchToolbar'
            ) as HTMLElement;
            if (textSearchToolbarElement.style.display === 'block') {
              textSearchToolbarElement.style.display = 'none';
            }

            let formFieldToolbarElement: HTMLInputElement =
              document.getElementById('formFieldToolbar') as HTMLInputElement;
            if (formFieldToolbarElement.style.display === 'block') {
              formFieldToolbarElement.style.display = 'none';
              viewer.designerMode = false;
            } else {
              formFieldToolbarElement.style.display = 'block';
              viewer.designerMode = true;
            }
          }
          break;
      }
    }
    const updatePageNavigation = function () {
      if (this.viewer.currentPageNumber === 1) {
        this.toolbar.enableItems(document.getElementById('previous_page').parentElement, false);
        this.toolbar.enableItems(document.getElementById('next_page').parentElement, true);
      } else if (viewer.currentPageNumber === viewer.pageCount) {
        this.toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
        this.toolbar.enableItems(document.getElementById('next_page').parentElement, false);
      } else {
        this.toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
        this.toolbar.enableItems(document.getElementById('next_page').parentElement, true);
      }
    }
    const currentPageClicked = function (args: any) {
      let currentPage: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
      currentPage.select();
    }
    const checkSearchActive = function (args: any) {
      if(viewer && viewer.textSearchModule && !this.searchActive) {
        viewer.textSearchModule.clearAllOccurrences();
      }
    }
    const onPageChange = function (args: any) {
      this.currentPageNumber = viewer.currentPageNumber.toString();
      let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
      inputElement.value = this.currentPageNumber;
      updatePageNavigation.bind(this);
    }
    const onCurrentPageBoxKeypress = (event) => {
      let currentPageBox: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
      if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 13) {
        event.preventDefault();
        return false;
      }
      else {
        var currentPageNumber = parseInt(currentPageBox.value);
        if (event.which === 13) {
          if (currentPageNumber > 0 && currentPageNumber <= viewer.pageCount) {
            viewer.navigation.goToPage(currentPageNumber);
          }
          else {
            currentPageBox.value = viewer.currentPageNumber.toString();
          }
        }
        return true;
      }
    }
    const documentLoaded = function (args: any) {
      document.addEventListener('click', checkSearchActive.bind(this));
      viewer = (document.getElementById('container') as any).ej2_instances[0];
      var pageCount = document.getElementById('totalPage');
      pageCount.textContent = 'of ' + viewer.pageCount;
      updatePageNavigation.bind(this);
      let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
      inputElement.addEventListener('click', currentPageClicked.bind(this));
      inputElement.addEventListener('keypress', onCurrentPageBoxKeypress.bind(this));
      inputElement.value = this.currentPageNumber;
    }
    return (<div>
      <div className='control-section'>
        <div className="flex-container">
          <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
          <div className="e-message render-mode-info">
            <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
          </div>
          <SwitchComponent cssClass="buttonSwitch" id="checked" change={this.change} checked={true}></SwitchComponent>
        </div>
        <div>
          <div className='e-pdf-toolbar'>
            <ToolbarComponent ref={(scope) => { this.toolbar = scope; }} clicked={clickHandler.bind(this)}>
              <ItemsDirective>
                <ItemDirective prefixIcon='e-icons e-folder' id='file_Open' tooltipText='Open'></ItemDirective>
                <ItemDirective prefixIcon='e-icons e-save' tooltipText="Save" id='save'></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-chevron-left" id='previous_page' tooltipText="Previous Page" align="Center"></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-chevron-right" id='next_page' tooltipText="Next Page" align="Center"></ItemDirective>
                <ItemDirective template={inputTemplate} tooltipText="Page Number" type="Input" align="Center"></ItemDirective>
                <ItemDirective template={template} align="Center" tooltipText="Page Number"></ItemDirective>
                <ItemDirective type="Separator" tooltipText="separator" align="Center"></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-mouse-pointer" id="text_selection_tool" align="Center" tooltipText="Text Selection tool" />
                <ItemDirective prefixIcon="e-icons e-pan" id="pan_tool" align="Center" tooltipText="Pan Mode" />
                <ItemDirective type="Separator" tooltipText="separator" align="Center"></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-annotation-edit" tooltipText="Edit Annotation" id="edit_annotation" align="Center" ></ItemDirective>
                <ItemDirective type="Separator" align="Center" tooltipText="separator"></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-split-vertical" tooltipText="Add and Edit Form Fields" id="add_form_field" align="Center"></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-search" tooltipText="Find Text" id="find_text" align="Right" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-print" tooltipText="Print" id='print' align="Right"></ItemDirective>
              </ItemsDirective>
            </ToolbarComponent>
          </div>
          <div id="editAnnotationToolbar" style={{ display: 'none' }}>
            <ToolbarComponent clicked={clickHandler}>
              <ItemsDirective>
                <ItemDirective prefixIcon="e-icons e-highlight-color" tooltipText="Highlight" id="highlights" align="Center"></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-underline" tooltipText="Underline" id="underline" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-strikethrough" tooltipText="Strikethrough" id="strikethrough" align="Center" ></ItemDirective>
                <ItemDirective type="Separator" tooltipText="separator" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-line" tooltipText="Add Line" id="line" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-arrow-right-up" tooltipText="Add Arrow" id="arrow" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-rectangle" tooltipText="Add Reactangle" id="rectangle" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-circle" tooltipText="Add Circle" id="circle" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-pentagon" tooltipText="Add Polygon" id="polygon" align="Center" ></ItemDirective>
                <ItemDirective type="Separator" tooltipText="separator" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-length" tooltipText="Calibrate Distance" id="calibrate_distance" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-perimeter" tooltipText="Calibrate Perimeter" id="calibrate_perimeter" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-area" tooltipText="Calibrate Area" id="calibrate_area" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-radius" tooltipText="Calibrate Radius" id="calibrate_radius" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-volume" tooltipText="Calibrate Volume" id="calibrate_volume" align="Center" ></ItemDirective>
                <ItemDirective type="Separator" tooltipText="separator" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-text-annotation" tooltipText="Free Text" id="freeText" align="Center" ></ItemDirective>
                <ItemDirective type="Separator" tooltipText="separator" align="Center" ></ItemDirective>
                <ItemDirective template={this.stampTemplate} tooltipText="Add Stamp" id="stamp" align="Center" ></ItemDirective>
                <ItemDirective type="Separator" tooltipText="separator" align="Center" ></ItemDirective>
                <ItemDirective template={this.signTemplate} tooltipText="Add Signature" id="signature" align="Center" ></ItemDirective>
                <ItemDirective type="Separator" tooltipText="separator" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-style" id="ink" align="Center" ></ItemDirective>
              </ItemsDirective>
            </ToolbarComponent>
          </div>
          <div
            id="formFieldToolbar"
            style={{ display: 'none' }}
            className="e-tbar-btn:hover e-tbar-btn:focus">
            <ToolbarComponent clicked={clickHandler}>
              <ItemsDirective>
                <ItemDirective prefixIcon="e-icons e-text-form" tooltipText="Textbox" id="textbox" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-password" tooltipText="Password" id="password" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-check-box" tooltipText="Checkbok" id="checkbok" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-radio-button" tooltipText="Radio Button" id="radio_button" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-drop-down" tooltipText="Drop Down" id="drop_down" align="Center" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-list-unordered" tooltipText="List Box" id="list_box" align="Center" ></ItemDirective>
                <ItemDirective template={this.formFieldSignTemplate} tooltipText="ADD SIGNATURE" id="formField_signature" align="Center" ></ItemDirective>
              </ItemsDirective>
            </ToolbarComponent>
          </div>
          <div
            id="textSearchToolbar"
            style={{ display: 'none', marginLeft: '840px' }}>
            <div
              className="e-pv-search-bar"
              id="container_search_box"
              style={{ right: '0px' }}>
              <div
                className="e-pv-search-bar-elements"
                id="container_search_box_elements">
                <div
                  className="e-input-group e-pv-search-input"
                  id="container_search_input_container">
                  <input
                    className="e-input"
                    id="container_search_input"
                    type="text"
                    placeholder="Find in document"
                    onKeyPress={this.searchInputKeypressed}
                    onChange={this.inputChange}/>
                  <span
                    className="e-input-group-icon e-input-search-group-icon e-icons e-search"
                    id="container_search_box-icon"
                    onClick={this.searchClickHandler}></span>
                </div>
                <button
                  className="e-btn e-icon-btn e-pv-search-btn e-icons e-chevron-left"
                  id="container_prev_occurrence"
                  type="button"
                  disabled
                  aria-label="Previous Search text">
                  <span
                    className="e-pv-icon-search e-pv-prev-search-icon"
                    id="container_prev_occurrenceIcon"
                    onClick={this.previousTextSearch}></span>
                </button>
                <button
                  className="e-btn e-icon-btn e-pv-search-btn e-icons e-chevron-right"
                  id="container_next_occurrence"
                  type="button"
                  disabled
                  aria-label="Next Search text">
                  <span
                    className="e-pv-icon-search e-pv-next-search-icon"
                    id="container_next_occurrenceIcon"
                    onClick={this.nextTextSearch}></span>
                </button>
              </div>
              <div
                className="e-pv-match-case-container"
                id="container_match_case_container">
                <div
                  className="e-checkbox-wrapper e-wrapper e-pv-match-case">
                  <label htmlFor="container_match_case">
                    <input
                      id="container_match_case"
                      type="checkbox"
                      className="e-control e-checkbox e-lib"
                      onClick={this.checkBoxChanged}/>
                    <span
                      className="e-ripple-container"
                      data-ripple="true"></span>
                    <span
                      id="checkboxSpan"
                      className="e-icons e-frame"
                    ></span>
                    <span className="e-label">Match case</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Render the PDF Viewer */}
          <PdfViewerComponent id="container" ref={(scope) => { viewer = scope; }} enableToolbar={false} enableNavigationToolbar={false} enableAnnotationToolbar={false} enableCommentPanel={false}
            documentLoad={documentLoaded}
            pageChange={onPageChange}
            resourceUrl="https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib"
            documentPath="https://cdn.syncfusion.com/content/pdf/hive-succinctly.pdf"
            style={{ 'display': 'block', 'height': '640px' }}>
            <Inject services={[Magnification, Navigation, LinkAnnotation, BookmarkView, FormFields, FormDesigner,PageOrganizer,
              ThumbnailView, Print, TextSelection, TextSearch, Annotation]} />
          </PdfViewerComponent>
          <input type="file" id="fileUpload" accept=".pdf" onChange={this.readFile.bind(this)} style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }} />
          <div className='e-pdf-toolbar' id="magnificationToolbarItems">
            <ToolbarComponent id="magnificationToolbar" clicked={clickHandler.bind(this)}>
              <ItemsDirective >
                <ItemDirective prefixIcon="e-pv-fit-page" id='fit_to_page' tooltipText="Fit to page" ></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-circle-add" id='zoom_in' tooltipText="Zoom in"></ItemDirective>
                <ItemDirective prefixIcon="e-icons e-circle-remove" id='zoom_out' tooltipText="Zoom out" ></ItemDirective>
              </ItemsDirective>
            </ToolbarComponent>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This example illustrates the process of crafting a customized toolbar within the PDF Viewer, allowing you to incorporate specific tools tailored to your needs.</p>
      </div>
      <div id="description">
        <p>
          This sample demonstrate how to perform the PDF Viewer core functionalities using a custom toolbar.In this example, you can see PDF Viewer control API in action to perform the functionalities
        </p>
        <ul>
          <li>Load document - <code>viewer.load(fileName, password)</code></li>
          <li>Save - <code>viewer.download()</code></li>
          <li>Go to Previous Page - <code>viewer.navigation.goToPreviousPage()</code></li>
          <li>Go to Next Page - <code>viewer.navigation.goToNextPage()</code></li>
          <li>Go to Page - <code>viewer.navigation.goToPage(pageindex)</code></li>
          <li>TextSelection  - <code>textSelection()</code></li>
          <li>Pan  - <code>panMode()</code></li>
          <li>Annotation Edit - <code>openEditAnnotation()</code></li>
          <li>FormFields Edit - <code>addEditFormFields()</code></li>
          <li>Search Text - <code>viewer.textSearch.searchText(searchText,isMatchCase)</code></li>
          <li>Search Next - <code>viewer.textSearch.searchNext()</code></li>
          <li>Search Previous - <code>viewer.textSearch.searchPrevious()</code></li>
          <li>Cancel Search Text - <code>viewer.textSearch.cancelTextSearch()</code></li>
          <li>Print - <code>viewer.print.print()</code></li>
          <li>Fit To Page - <code>viewer.magnification.fitToPage()</code></li>
          <li>Zoom In - <code>viewer.magnification.zoomIn()</code></li>
          <li>Zoom Out - <code>viewer.magnification.zoomOut()</code></li>
        </ul>
        <p>
          More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
            documentation section
          </a>.
        </p>
      </div>
    </div>
    );
  }

  public readFile(evt) {
    let uploadedFiles = evt.target.files;
    let uploadedFile = uploadedFiles[0];
    this.fileName = uploadedFile.name;
    let reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    let uploadedFileName: string = this.fileName;
    reader.onload = function (e) {
      let uploadedFileUrl: string = (e.currentTarget as any).result;
      viewer.documentPath = uploadedFileUrl;
      viewer.downloadFileName = viewer.fileName = uploadedFileName;
      var pageCount = document.getElementById('totalPage');
      pageCount.textContent = 'of ' + viewer.pageCount;
    }
  }
  change(args) {
    if (args.checked) {
      viewer.serviceUrl = '';
    }
    else {
      viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
    }
    viewer.dataBind();
    viewer.load(viewer.documentPath, null);
  }

  public searchInputKeypressed(event) {
    if (event.key === 'Enter') {
      this.initiateTextSearch();
    }
  }
  public initiateTextSearch() {
    const textsearchPrevElement = document.getElementById('container_prev_occurrence') as HTMLButtonElement;
    const textsearchNextElement = document.getElementById('container_next_occurrence') as HTMLButtonElement;
    const textsearchElement = document.getElementById('container_search_box-icon') as HTMLElement;
    if (textsearchPrevElement && textsearchNextElement && textsearchElement) {
      textsearchPrevElement.disabled = false;
      textsearchNextElement.disabled = false;
      textsearchElement.classList.add('e-close');
      textsearchElement.classList.remove('e-search');
      textsearchPrevElement.addEventListener("click", this.previousTextSearch);
      textsearchNextElement.addEventListener("click", this.nextTextSearch);
      if (this.searchText !== (document.getElementById('container_search_input') as HTMLInputElement).value || this.prevMatchCase !== this.matchCase) {
        viewer.textSearch.cancelTextSearch();
        this.searchText = (document.getElementById('container_search_input') as HTMLInputElement).value;
        this.searchActive = true;
        viewer.textSearch.searchText(this.searchText, this.matchCase);
        this.prevMatchCase = this.matchCase;
      }
      else {
        this.nextTextSearch();
      }
    }
  }
  public inputChange(): void {
    viewer.textSearchModule.clearAllOccurrences();
    this.searchActive = false;
    if((document.getElementById('container_search_input') as HTMLInputElement).value == '') {
      this.updateSearchInputIcon(true);
      viewer.textSearch.cancelTextSearch();
      this.searchText = '';
    }
  }
  public searchClickHandler(): void {
    var searchBtn = document.getElementById('container_search_box-icon');
    if (searchBtn.classList.contains('e-search')) {
      viewer.textSearch.cancelTextSearch();
      this.initiateTextSearch();
      this.updateSearchInputIcon(false);
      this.searchText = '';
    }
    else if (searchBtn.classList.contains('e-close')) {
      var searchInput = document.getElementById('container_search_input') as HTMLInputElement;
      this.updateSearchInputIcon(true);
      searchInput.value = '';
      searchInput.focus();
      viewer.textSearch.cancelTextSearch();
      this.searchText = '';
    }
  }
  public updateSearchInputIcon(isEnable: Boolean) {
    var searchBtn = document.getElementById('container_search_box-icon');
    if (isEnable) {
      searchBtn.classList.add('e-search');
      searchBtn.classList.remove('e-close');
    }
    else {
      searchBtn.classList.add('e-close');
      searchBtn.classList.remove('e-search');
    }
  }
  public nextTextSearch() {
    viewer.textSearchModule.searchNext();
    this.searchActive = true;
  }
  public previousTextSearch() {
    viewer.textSearchModule.searchPrevious();
    this.searchActive = true;
  }
  public checkBoxChanged(event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      const matchcaseElement = document.getElementById('container_match_case') as HTMLInputElement;
      if (matchcaseElement) {
        matchcaseElement.checked = true;
      }
      this.matchCase = true;
      const checkboxSpanElement = document.getElementById('checkboxSpan');
      if (checkboxSpanElement) {
        checkboxSpanElement.classList.add('e-check');
      }
    } else {
      this.matchCase = false;
      const checkboxSpanElement = document.getElementById('checkboxSpan');
      if (checkboxSpanElement) {
        checkboxSpanElement.classList.remove('e-check');
      }
    }
  }
  public onPageChanged() {
    let currentPageNumber = viewer.currentPageNumber;
    let inputElement: HTMLInputElement = document.getElementById(
      'currentPage'
    ) as HTMLInputElement;
    inputElement.value = currentPageNumber.toString();
  }
}
