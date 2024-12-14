import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject,
    TextFieldSettings
} from '@syncfusion/ej2-react-pdfviewer';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { Draggable, Browser } from '@syncfusion/ej2-base';

function ESignFormDesigner() {

    React.useEffect(() => {
        updateSampleSection();
        defaultZoomFactor = true;
        initializeDraggable(textBtn.current.element, 'Textbox');
        initializeDraggable(signatureBtn.current.element, 'SignatureField');
        initializeDraggable(passwordBtn.current.element, 'Password');
        initializeDraggable(checkBoxBtn.current.element, 'CheckBox');
        initializeDraggable(radioBtn.current.element, 'RadioButton');
        initializeDraggable(dropdownBtn.current.element, 'DropDown');
        initializeDraggable(listBoxBtn.current.element, 'ListBox');
        initializeDraggable(initialBtn.current.element, 'InitialField');
        defaultZoomFactor = false;
    }, []);

    let viewer = React.useRef<PdfViewerComponent>(null);
    var userMenu = React.useRef<DropDownListComponent>(null);
    let sidebarobj = React.useRef<SidebarComponent>(null);
    let textBtn = React.useRef<ButtonComponent>(null);
    let signatureBtn = React.useRef<ButtonComponent>(null);
    let passwordBtn = React.useRef<ButtonComponent>(null);
    let checkBoxBtn = React.useRef<ButtonComponent>(null);
    let radioBtn = React.useRef<ButtonComponent>(null);
    let dropdownBtn = React.useRef<ButtonComponent>(null);
    let listBoxBtn = React.useRef<ButtonComponent>(null);
    let initialBtn = React.useRef<ButtonComponent>(null);
    let currentUserColorId: string = 'ff0000';
    let currentUser = React.useRef<string>('andrew@mycompany.com');
    let borderColor = React.useRef<string>('1px solid red');
    let isDropped: boolean = false;
    let currentFieldType: string = "";
    let fieldType: string = "";
    let userColor: string = 'rgba(255, 0, 0, 0.06)';
    let defaultFieldWidth: number = 200;
    let defaultFieldHeight: number = 24;
    let checkBoxFieldSize: number = 20;
    let radioFieldSize: number = 20;
    let SignatureFieldSize: number = 66;
    let ListFieldSize: number = 66;
    let zoomFactor: number;
    let isMobile: boolean = Browser.isDevice;
    let defaultZoomFactor : any;
    let userDetails: { [key: string]: Object }[] = [
        { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
        { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
    ];
    const fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };

    const ToolbarComponentMob = () => {
        return (
            <div>
                <ButtonComponent ref={signatureBtn} className="e-pv-e-sign-form-field-property-mob e-outline" title="Signature" onClick={signatureClickMob}>
                    <span className="e-pv-handwritten-icon e-pv-icon"  ></span>
                </ButtonComponent>
                <ButtonComponent ref={initialBtn} className="e-pv-e-sign-form-field-property-mob e-outline" title="Initial" onClick={initialClickMob}>
                    <i className="e-icons e-font-name" ></i>
                </ButtonComponent>
                <ButtonComponent ref={textBtn} className='e-pv-e-sign-form-field-property-mob e-outline' title='TextBox' onClick={textClickMob}>
                    <i className="e-icons e-text-form" ></i>
                </ButtonComponent>
                <ButtonComponent ref={passwordBtn} className='e-pv-e-sign-form-field-property-mob e-outline' title='Password' onClick={passwordClickMob}>
                    <i className="e-icons e-password" ></i>
                </ButtonComponent>
                <ButtonComponent ref={checkBoxBtn} className='e-pv-e-sign-form-field-property-mob e-outline' title='CheckBox' onClick={checkboxClickMob}>
                    <i className="e-icons e-check-box" ></i>
                </ButtonComponent>
                <ButtonComponent ref={radioBtn} className='e-pv-e-sign-form-field-property-mob e-outline' title='RadioButton' onClick={radioClickMob}>
                    <i className="e-icons e-radio-button" ></i>
                </ButtonComponent>
                <ButtonComponent ref={dropdownBtn} className='e-pv-e-sign-form-field-property-mob e-outline' title='DropDown' onClick={dropdownClickMob}>
                    <i className="e-icons e-drop-down" ></i>
                </ButtonComponent>
                <ButtonComponent ref={listBoxBtn} className='e-pv-e-sign-form-field-property-mob e-outline' title='ListBox' onClick={listboxClickMob}>
                    <i className="e-icons e-list-unordered" ></i>
                </ButtonComponent>
            </div>
        );
      };
    const dropdownComponent = () => {
        return (
            <div id='e-pv-e-sign-user-field' style={{ width: '245px', height: '37px', left: '0px' }}>
                <div className='e-pv-e-sign-user-dropdown' >
                    <DropDownListComponent ref={userMenu} id='userMenu' select={userChange} index={0} popupWidth={'215px'} dataSource={userDetails} width={'200px'} fields={fields} itemTemplate={itemTemplate} valueTemplate={valueTemplate} ></DropDownListComponent>
                </div>
            </div>
        );
    }
    
    const itemTemplate = (data) => {
        return (
            <div style={{ display: 'flex' }}>
                <img className="e-pv-e-sign-empImage" style={{ maxHeight: '35px', marginTop: '7px', marginLeft: '4px', borderRadius: '50%', border: `1px solid ${data.Mail === 'andrew@mycompany.com' ? 'red' : 'green'}` }}
                    src={'src/pdfviewer/images/employees/' + data['Eimg'] + '.png'} />
                <div>
                    <div className="e-pv-e-sign-ename" style={{ height: '18px', fontSize: '13px' }}> {data.Name} </div>
                    <div className="e-pv-e-sign-job" style={{ fontSize: '11px' }} > {data.Mail} </div>
                </div>
            </div>
        );
    }

    const valueTemplate = (data) => {
        return (<div className="e-pv-e-sign valueTemplate" style={{ display: 'flex',marginLeft:'2px' }}>
            <img className="e-pv-e-sign-value" style={{ borderRadius: '20px',marginTop: '1px', border: borderColor.current }} src={'src/pdfviewer/images/employees/' + data['Eimg'] + '.png'} height="30px" width="30px" alt="employee" />
            <div>
                <div className="e-pv-e-sign-name" style={{ fontSize: '12px', marginLeft: '12px', alignContent: 'center' }}> {data.Name} </div>
                <div className="e-pv-e-sign-job" style={{ fontSize: '10px', marginLeft: '11px', alignContent: 'center' }}> {data.Mail} </div>
            </div>
        </div>);
    };

    const signatureClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('SignatureField');
    }

    const initialClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('InitialField');
    }

    const textClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('Textbox');
    }

    const passwordClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('Password');
    }

    const checkboxClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('CheckBox');
    }

    const radioClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('RadioButton');
    }

    const dropdownClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('DropDown');
    }

    const listboxClickMob = () =>{
        viewer.current.formDesignerModule.setFormFieldMode('ListBox');
    }    

    const signatureClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('SignatureField');
    }

    const initialClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('InitialField');
    }

    const textboxClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('Textbox');
    }

    const passwordClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('Password');
    }

    const checkboxClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('CheckBox');
    }

    const radioClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('RadioButton');
    }

    const dropdownClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('DropDown');
    }

    const listboxClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        viewer.current.formDesignerModule.setFormFieldMode('ListBox');
    }

    const initializeDraggable = (element, field) => {
        if (defaultZoomFactor) {
            zoomFactor = 1;
          } else {
            zoomFactor = viewer.current.viewerBase.getZoomFactor();
          }       
        var left, top;

        let scaledWidth = defaultFieldWidth * zoomFactor;
        let scaledHeight = defaultFieldHeight * zoomFactor;

        switch (field) {
            case 'CheckBox':
            case 'RadioButton':
                scaledWidth = checkBoxFieldSize * zoomFactor;
                scaledHeight = checkBoxFieldSize * zoomFactor;
                left = 0;
                top = (checkBoxFieldSize / 2) * zoomFactor - (scaledHeight / 2);
                break;
            case 'ListBox':
                scaledHeight = ListFieldSize * zoomFactor;
                left = 90;
                top = (ListFieldSize / 2) * zoomFactor - (scaledHeight / 2);
                break;
            case 'SignatureField':
            case 'InitialField':
                scaledHeight = SignatureFieldSize * zoomFactor;
                left = 90;
                top = (SignatureFieldSize / 2) * zoomFactor - (scaledHeight / 2);
                break;
            default:
                scaledHeight = defaultFieldHeight * zoomFactor;
                left = 90;
                top = (defaultFieldHeight / 2) * zoomFactor - (scaledHeight / 2);
                break;
        }

        left = left / zoomFactor - (scaledWidth / 2);        
        const draggable = new Draggable(element, { dragArea: '#container_pageViewContainer',drag: (e) => drag(e), helper: (e) => helperClone( e,field), dragStart: () => dragStart(field), dragStop: dragStop, clone: true, cursorAt: { left: left, top: top }, enableTailMode: true, });
    }

    const drag = (e) => {
        e.event.preventDefault();
    }

    const dragStart = (fieldType) => {
        isDropped = true;
        currentFieldType = fieldType;
    }

    const dragStop = (e: any) => {
        if (e.helper && e.helper.parentNode) {
            e.helper.parentNode.removeChild(e.helper);
        }
        isDropped = false;
    }

    const helperClone = (e,fieldType: any ) => {
        if (e.sender.type == "mousemove"){
        zoomFactor = viewer.current.viewerBase.getZoomFactor();
        const cloneElement = document.createElement('div');
        cloneElement.style.width =  (defaultFieldWidth*zoomFactor) + 'px';
        cloneElement.style.height = (defaultFieldHeight*zoomFactor) + 'px';
       cloneElement.style.borderRadius = '0';
        switch (fieldType) {
          case 'SignatureField':
          case 'InitialField':
            cloneElement.style.height = (SignatureFieldSize*zoomFactor) + 'px';
            break;
          case 'CheckBox':
            cloneElement.style.height = (checkBoxFieldSize*zoomFactor) + 'px';
            cloneElement.style.width = (checkBoxFieldSize*zoomFactor) + 'px';
            break;
          case 'RadioButton':
            cloneElement.style.height = (radioFieldSize*zoomFactor) + 'px';
            cloneElement.style.width = (radioFieldSize*zoomFactor) + 'px';
            cloneElement.style.borderRadius = '50%';
            break;
          case 'ListBox':
            cloneElement.style.height = (ListFieldSize*zoomFactor) + 'px';
            break;
        }   
        cloneElement.style.backgroundColor = currentUser.current === 'andrew@mycompany.com' ? 'rgba(255, 0, 0, 0.06)' : 'rgba(0, 128, 0, 0.06';
        cloneElement.style.zIndex = '10001';
        cloneElement.style.position = 'absolute';
        cloneElement.style.pointerEvents = 'none';
        cloneElement.style.opacity='0.5';
        document.body.appendChild(cloneElement);
        return cloneElement;
    }
    else{
        return null;
    }
    }

    const pageClick = (args: any) => {
        if (isDropped) {
            isDropped = false;
            let width = defaultFieldWidth;
            let height: number = defaultFieldHeight;
            switch (currentFieldType) {
              case 'SignatureField':
              case 'InitialField':
                height = SignatureFieldSize;
                break;
              case 'CheckBox':
              case 'RadioButton':
                width = checkBoxFieldSize;
                height = checkBoxFieldSize;
                break;
              case 'ListBox':
                height = ListFieldSize;
                break;
            }
            viewer.current.formDesignerModule.addFormField(currentFieldType as any, {
              bounds: { X: args.x, Y: args.y, Width: width, Height: height}
            } as TextFieldSettings);
          }
    }

    const addFormField = (args: any) => {
        userColor = currentUser.current === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
        if (currentUser.current === "andrew@mycompany.com") {
            viewer.current.formDesigner.updateFormField(viewer.current.retrieveFormFields()[(viewer.current.formFieldCollections).length - 1], { customData:{author :'andrew'},  backgroundColor: userColor } as any);
          } else {
            viewer.current.formDesigner.updateFormField(viewer.current.retrieveFormFields()[(viewer.current.formFieldCollections).length - 1], { customData:{author :'anne'},  backgroundColor: userColor } as any);
          }
      
          var currentUserDetails = userDetails.filter(userDetail => userDetail.Mail === currentUser)[0];
          var currentFormField = viewer.current.formFieldCollections.filter(formField => formField.id === args.field.id)[0];
          if (currentUserDetails)
            (currentUserDetails.fieldIds as any).push(currentFormField);

          const signIcons = document.querySelectorAll('[id*="signIcon"]');
          signIcons.forEach(element => {
            if (viewer.current.zoomPercentage < 65) {
              (element as any).style.fontSize = '5px'
            } else if (viewer.current.zoomPercentage <= 85 && viewer.current.zoomPercentage > 65) {
              (element as any).style.fontSize = "7px";
            }
          });
    }

    const userChange = (args: any) => {
        currentUser.current = args.itemData.Mail;
        if (args.itemData.Mail == "andrew@mycompany.com") {
            borderColor.current = '1px solid red';
            currentUserColorId = 'ff0000';
        } else {
            borderColor.current = '1px solid green';
            currentUserColorId = '00ff00';
        }
    }

    const documentLoad = () => {
        viewer.current.magnification.fitToPage();
        viewer.current.designerMode = true;
    }

    const downLoadFile = () => {
        viewer.current.download();
    }

    return (<div>
        <div className='e-pv-e-sign control-section' >
            <div className="e-pv-e-sign-property-sec" >
            <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer" className={`${!isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar'}`}>
            <ItemsDirective>
              <ItemDirective prefixIcon="e-icons e-download" align="Right" text="Download" id="e-pv-e-sign-download" tooltipText="downLoad" click={downLoadFile}></ItemDirective>
            </ItemsDirective>
          </ToolbarComponent>
          <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer" className={`${isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar'}`} >
            <ItemsDirective>
              <ItemDirective template={dropdownComponent}></ItemDirective>
              <ItemDirective prefixIcon="e-icons e-download" align="Right" tooltipText="downLoad" click={downLoadFile}></ItemDirective>
            </ItemsDirective>
          </ToolbarComponent>
            </div>
            <div style={{ display:`${isMobile ? 'block' : 'flex'}`, position: 'relative' }}>
                <SidebarComponent style={{ display:`${isMobile ? 'none' : 'block'}`}} id="e-pv-e-sign-defaultSidebar" ref={sidebarobj} className="e-pv-e-sign-default-sidebar" width="200px" enableGestures={false}>
                    <div className='e-pv-e-sign-content-wrapper' style={{ marginLeft: '4px', marginTop: '14px' }} >
                        <div className="e-pv-e-sign-user-label" style={{fontSize: '16px', margin:'15px 10px 5px', fontWeight: '500px' }}>
                            Fields
                        </div>
                        <div id='e-pv-e-sign-user-field' style={{ width: '190px', height: '37px',border:'1px solid lightgray',marginBottom: '20px' }}>
                            <div className='e-pv-e-sign-user-dropdown' >
                                <DropDownListComponent ref={userMenu} id='e-pv-e-sign-userMenu' select={userChange} index={0} popupWidth={'190px'} width={'188px'} dataSource={userDetails} fields={fields} itemTemplate={itemTemplate} valueTemplate={valueTemplate} ></DropDownListComponent>
                            </div>
                        </div>
                        <div style={{ display: 'flex' ,marginLeft:'6px'}}>
                            <ButtonComponent ref={signatureBtn} className='e-pv-e-sign-form-field-property e-outline' title='Signature' onClick={signatureClick} >
                                <span className="e-pv-handwritten-icon e-pv-icon" ></span>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Signature</span>
                            </ButtonComponent>
                            <ButtonComponent ref={initialBtn} className='e-pv-e-sign-form-field-property e-outline' title='Initial' onClick={initialClick}>
                                <i className="e-icons e-font-name" ></i>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Initial</span>
                            </ButtonComponent>
                        </div>
                        <div style={{ display: 'flex' ,marginLeft:'6px'}}>
                            <ButtonComponent ref={textBtn} className='e-pv-e-sign-form-field-property e-outline' title='TextBox' onClick={textboxClick}>
                                <i className="e-icons e-text-form" ></i>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Textbox</span>
                            </ButtonComponent>
                            <ButtonComponent ref={passwordBtn} className='e-pv-e-sign-form-field-property e-outline' title='Password' onClick={passwordClick}>
                                <i className="e-icons e-password" ></i>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Password</span>
                            </ButtonComponent>
                        </div>
                        <div style={{ display: 'flex',marginLeft:'6px' }}>
                            <ButtonComponent ref={checkBoxBtn} className='e-pv-e-sign-form-field-property e-outline' title='CheckBox' onClick={checkboxClick}>
                                <i className="e-icons e-check-box" ></i>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Checkbox</span>
                            </ButtonComponent>
                            <ButtonComponent ref={radioBtn} className='e-pv-e-sign-form-field-property e-outline' title='RadioButton' onClick={radioClick}>
                                <i className="e-icons e-radio-button" ></i>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Radio</span>
                            </ButtonComponent>                            
                        </div>
                        <div style={{ display: 'flex',marginLeft:'6px' }}>
                            <ButtonComponent ref={dropdownBtn} className='e-pv-e-sign-form-field-property e-outline' title='DropDown' onClick={dropdownClick}>
                                <i className="e-icons e-drop-down" ></i>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Dropdown</span>
                            </ButtonComponent>
                            <ButtonComponent ref={listBoxBtn} className='e-pv-e-sign-form-field-property e-outline' title='ListBox' onClick={listboxClick}>
                                <i className="e-icons e-list-unordered" ></i>
                                <span style={{ fontSize: '12px', marginTop: '11px' }}>Listbox</span>
                            </ButtonComponent>
                        </div>
                    </div>
                </SidebarComponent>
                <div style={{ width:`${isMobile ? '100%' : 'calc(100% - 200px)'}`}}>
                    <PdfViewerComponent ref={viewer} id="container" enableNavigationToolbar={false} enableAnnotationToolbar={false} enableToolbar={false} documentPath="https://cdn.syncfusion.com/content/PDFViewer/Fill+and+Sign.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib" documentLoad={documentLoad} formFieldAdd={addFormField} pageClick={pageClick} downloadFileName='eSign_designMode.pdf' style={{ height: `${isMobile ? '500px' : '640px'}` }}>
                        <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
                    </PdfViewerComponent>
                </div>
                <div>
                    <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer-mob" overflowMode='Scrollable' className={`${isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar'}`}>
                        <ItemsDirective>
                            <ItemDirective template={ToolbarComponentMob}></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>
            </div>
        </div>
        <div id="action-description">
            <p>This sample enables the design of a PDF form that accommodates signatures from two different users. The form includes distinct fields for each user: when the first user is selected, specific fields can be added that apply only to that user. Upon switching the user via the dropdown menu, new fields can be added for the second user. The fields for each user are distinguishable by different background colors.</p>
        </div>
        <div id="description">
            <p>
                More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                    documentation section
                </a>.
            </p>
        </div>
    </div>
    );
}
export default ESignFormDesigner;