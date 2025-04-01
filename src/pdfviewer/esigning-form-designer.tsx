import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject, TextFieldSettings} from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { Draggable,Browser } from '@syncfusion/ej2-base';

export class ESignFormDesigner extends SampleBase<{}, {}> {
    public viewer: PdfViewerComponent;
    public userMenu: DropDownListComponent;
    public sidebarobj: SidebarComponent;
    public currentUserColorId: string = 'ff0000';
    public userColor: string = 'rgba(255, 0, 0, 0.06)';
    public currentUser: string = ('andrew@mycompany.com');
    public borderColor: string = ('1px solid red');
    userDetails: { [key: string]: Object }[] = [
        { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
        { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
    ];
    fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };
    public defaultFieldWidth: number = 200;
    public defaultFieldHeight: number = 24;
    public checkBoxFieldSize: number = 20;
    public radioFieldSize: number = 20;
    public SignatureFieldSize: number = 66;
    public ListFieldSize: number = 66;
    public currentFieldType: string = '';
    public isDropped: boolean = false;
    public zoomFactor: number;
    public textBtn :ButtonComponent;
    public signatureBtn :ButtonComponent;
    public passwordBtn :ButtonComponent;
    public checkBoxBtn :ButtonComponent;
    public radioBtn :ButtonComponent;
    public dropdownBtn :ButtonComponent;
    public listBoxBtn :ButtonComponent;
    public initialBtn :ButtonComponent;
    public isMobile = Browser.isDevice;
    public defaultZoomFactor : any;
    
    componentDidMount(): void {
        this.defaultZoomFactor = true;
        this.initializeDraggable(this.textBtn.element, 'Textbox');
        this.initializeDraggable(this.signatureBtn.element, 'SignatureField');
        this.initializeDraggable(this.passwordBtn.element, 'Password');
        this.initializeDraggable(this.checkBoxBtn.element, 'CheckBox');
        this.initializeDraggable(this.radioBtn.element, 'RadioButton');
        this.initializeDraggable(this.dropdownBtn.element, 'DropDown');
        this.initializeDraggable(this.listBoxBtn.element, 'ListBox');
        this.initializeDraggable(this.initialBtn.element, 'InitialField');
        this.defaultZoomFactor = false;
      }

      ToolbarComponentMob = () => {
        return (
            <div>
                <ButtonComponent ref={(scope) => {this.signatureBtn = scope;}} className="e-pv-e-sign-form-field-property-mob e-outline" title="Signature" onClick={this.signatureClickMob}>
                    <span className="e-pv-handwritten-icon e-pv-icon" style={{ fontSize: '18px' }} ></span>
                </ButtonComponent>
                <ButtonComponent ref={(scope) => {this.initialBtn = scope;}} className="e-pv-e-sign-form-field-property-mob e-outline" title="Initial" onClick={this.initialClickMob}>
                    <i className="e-icons e-font-name" style={{ fontSize: '18px' }}></i>
                </ButtonComponent>
                <ButtonComponent ref={(scope) => {this.textBtn = scope;}} className='e-pv-e-sign-form-field-property-mob e-outline' title='TextBox' onClick={this.textClickMob}>
                    <i className="e-icons e-text-form" style={{ fontSize: '18px' }}></i>
                </ButtonComponent>
                <ButtonComponent ref={(scope) => {this.passwordBtn = scope;}} className='e-pv-e-sign-form-field-property-mob e-outline' title='Password' onClick={this.passwordClickMob}>
                    <i className="e-icons e-password" style={{ fontSize: '18px' }}></i>
                </ButtonComponent>
                <ButtonComponent ref={(scope) => {this.checkBoxBtn = scope;}} className='e-pv-e-sign-form-field-property-mob e-outline' title='CheckBox' onClick={this.checkboxClickMob}>
                    <i className="e-icons e-check-box" style={{ fontSize: '18px' }}></i>
                </ButtonComponent>
                <ButtonComponent ref={(scope) => {this.radioBtn = scope;}} className='e-pv-e-sign-form-field-property-mob e-outline' title='RadioButton' onClick={this.radioClickMob}>
                    <i className="e-icons e-radio-button" style={{ fontSize: '18px' }}></i>
                </ButtonComponent>
                <ButtonComponent ref={(scope) => {this.dropdownBtn = scope;}} className='e-pv-e-sign-form-field-property-mob e-outline' title='DropDown' onClick={this.dropdownClickMob}>
                    <i className="e-icons e-drop-down" style={{ fontSize: '18px' }}></i>
                </ButtonComponent>
                <ButtonComponent ref={(scope) => {this.listBoxBtn = scope;}} className='e-pv-e-sign-form-field-property-mob e-outline' title='ListBox' onClick={this.listboxClickMob}>
                    <i className="e-icons e-list-unordered" style={{ fontSize: '18px' }}></i>
                </ButtonComponent>
            </div>
        );
      };

      dropdownComponent = () => {
        return (
            <div id='e-pv-e-sign-user-field' style={{ width: '245px', height: '37px', left: '0px' }}>
                <div className='e-pv-e-sign-user-dropdown' >
                    <DropDownListComponent ref={(scope) => { this.userMenu = scope; }} id='this.userMenu' select={this.userChange} index={0} popupWidth={'215px'} dataSource={this.userDetails} width={'200px'} fields={this.fields} itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} ></DropDownListComponent>
                </div>
            </div>
        );
    }
    
    itemTemplate = (data) => {
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

    valueTemplate = (data) => {
        return (<div className="e-pv-e-sign valueTemplate" style={{ display: 'flex',marginLeft:'2px' }}>
            <img className="e-pv-e-sign-value" style={{ borderRadius: '20px',marginTop: '1px', border: this.borderColor }} src={'src/pdfviewer/images/employees/' + data['Eimg'] + '.png'} height="30px" width="30px" alt="employee" />
            <div>
                <div className="e-pv-e-sign-name" style={{ fontSize: '12px', marginLeft: '12px', alignContent: 'center' }}> {data.Name} </div>
                <div className="e-pv-e-sign-job" style={{ fontSize: '10px', marginLeft: '11px', alignContent: 'center' }}> {data.Mail} </div>
            </div>
        </div>);
    };

     signatureClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('SignatureField');
    }

     initialClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('InitialField');
    }

     textClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('Textbox');
    }

     passwordClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('Password');
    }

     checkboxClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('CheckBox');
    }

     radioClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('RadioButton');
    }

     dropdownClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('DropDown');
    }

     listboxClickMob = () =>{
        this.viewer.formDesignerModule.setFormFieldMode('ListBox');
    } 
    
     signatureClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('SignatureField');
    }

     initialClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('InitialField');
    }

     textboxClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('Textbox');
    }

     passwordClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('Password');
    }

     checkboxClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('CheckBox');
    }

     radioClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('RadioButton');
    }

     dropdownClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('DropDown');
    }

     listboxClick = (e) =>{
        if (e?.nativeEvent.sourceCapabilities.firesTouchEvents)
        this.viewer.formDesignerModule.setFormFieldMode('ListBox');
    }


    initializeDraggable = (element, field) => {
        if (this.defaultZoomFactor) {
            this.zoomFactor = 1;
          } else {
            this.zoomFactor = this.viewer.viewerBase.getZoomFactor();
          }           
          var left, top;
    
        let scaledWidth = this.defaultFieldWidth * this.zoomFactor;
        let scaledHeight = this.defaultFieldHeight * this.zoomFactor;
    
        switch (field) {
          case 'CheckBox':
          case 'RadioButton':
            scaledWidth = this.checkBoxFieldSize * this.zoomFactor;
            scaledHeight = this.checkBoxFieldSize * this.zoomFactor;
            left = 0;
            top = (this.checkBoxFieldSize / 2) * this.zoomFactor - (scaledHeight / 2);
            break;
          case 'ListBox':
            scaledHeight = this.ListFieldSize * this.zoomFactor;
            left = 90;
            top = (this.ListFieldSize / 2) * this.zoomFactor - (scaledHeight / 2);
            break;
          case 'SignatureField':
          case 'InitialField':
            scaledHeight = this.SignatureFieldSize * this.zoomFactor;
            left = 90;
            top = (this.SignatureFieldSize / 2) * this.zoomFactor - (scaledHeight / 2);
            break;
          default:
            scaledHeight = this.defaultFieldHeight * this.zoomFactor;
            left = 90;
            top = (this.defaultFieldHeight / 2) * this.zoomFactor - (scaledHeight / 2);
            break;
        }
    
        left = left / this.zoomFactor - (scaledWidth / 2);       
        const draggable = new Draggable(element, { dragArea: '#container_pageViewContainer', helper: (e: any) => this.helperClone(e,field), drag: (e) =>this.drag(e),dragStart: () => this.dragStart(field), dragStop: this.dragStop, clone: true, cursorAt: { left: left, top: top }, enableTailMode: true, });
    }
    drag = (e) => {
        e.event.preventDefault();
    }

    dragStart = (fieldType) => {
        this.currentFieldType = fieldType;
        this.isDropped = true;
    }

    dragStop = (e: any) => {
        if (e.helper && e.helper.parentNode) {
            e.helper.parentNode.removeChild(e.helper);
          }  
          this.isDropped = false;
    }

    helperClone = (e,fieldType: any) => {
        if (e.sender.type == "mousemove"){

        this.zoomFactor = this.viewer.viewerBase.getZoomFactor();
        const cloneElement = document.createElement('div');
        cloneElement.style.width = (this.defaultFieldWidth*this.zoomFactor) + 'px';
        cloneElement.style.height = (this.defaultFieldHeight*this.zoomFactor) + 'px';
        cloneElement.style.borderRadius = '0';
        switch (fieldType) {
          case 'SignatureField':
          case 'InitialField':
            cloneElement.style.height = (this.SignatureFieldSize*this.zoomFactor) + 'px';
            break;
          case 'CheckBox':
            cloneElement.style.height = (this.checkBoxFieldSize*this.zoomFactor) + 'px';
            cloneElement.style.width = (this.checkBoxFieldSize*this.zoomFactor) + 'px';
            break;
          case 'RadioButton':
            cloneElement.style.height = (this.radioFieldSize*this.zoomFactor) + 'px';
            cloneElement.style.width = (this.radioFieldSize*this.zoomFactor) + 'px';
            cloneElement.style.borderRadius = '50%';
            break;
          case 'ListBox':
            cloneElement.style.height = (this.ListFieldSize*this.zoomFactor) + 'px';
            break;
        }   
        cloneElement.style.backgroundColor = this.currentUser === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
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

    pageClick = (args: any) => {
        if (this.isDropped) {
            this.isDropped = false;
            let width = this.defaultFieldWidth;
            let height: number = this.defaultFieldHeight;
            switch (this.currentFieldType) {
              case 'SignatureField':
              case 'InitialField':
                height = this.SignatureFieldSize;
                break;
              case 'CheckBox':
              case 'RadioButton':
                width = this.checkBoxFieldSize;
                height = this.checkBoxFieldSize;
                break;
              case 'ListBox':
                height = this.ListFieldSize;
                break;
            }
            this.viewer?.formDesignerModule.addFormField(this.currentFieldType as any, {
              bounds: { X: args.x, Y: args.y, Width: width, Height: height}
            } as TextFieldSettings);
          }
    }  
   
    addFormField = (args: any) => {
        this.userColor = this.currentUser  === 'andrew@mycompany.com' ? 'rgba(255, 0, 0, 0.06)' : 'rgba(0, 128, 0, 0.06)';
        if (this.currentUser === "andrew@mycompany.com") {
            this.viewer.formDesigner.updateFormField(this.viewer.retrieveFormFields()[(this.viewer.formFieldCollections).length - 1], { customData:{author :'andrew'},  backgroundColor: this.userColor } as any);
          } else {
            this.viewer.formDesigner.updateFormField(this.viewer.retrieveFormFields()[(this.viewer.formFieldCollections).length - 1], { customData:{author :'anne'},  backgroundColor: this.userColor } as any);
          }
      
          var currentUserDetails = this.userDetails.filter(userDetail => userDetail.Mail === this.currentUser)[0];
          var currentFormField = this.viewer.formFieldCollections.filter(formField => formField.id === args.field.id)[0];
          if (currentUserDetails)
            (currentUserDetails.fieldIds as any).push(currentFormField);

          const signIcons = document.querySelectorAll('[id*="signIcon"]');
          signIcons.forEach(element => {
            if (this.viewer.zoomPercentage < 65) {
              (element as any).style.fontSize = '5px'
            } else if (this.viewer.zoomPercentage <= 85 && this.viewer.zoomPercentage > 65) {
              (element as any).style.fontSize = "7px";
            }
          });
    }

    userChange = (args: any) => {
        this.currentUser = args.itemData.Mail;
        if (args.itemData.Mail == "andrew@mycompany.com") {
            this.borderColor = '1px solid red';
            this.currentUserColorId = 'ff0000';
        } else {
            this.borderColor = '1px solid green';
            this.currentUserColorId = '00ff00';
        }
    }

    documentLoad = () => {
        this.viewer.designerMode = true;
    }

    downLoadFile = () => {
        this.viewer.download();
    }
    render(): React.ReactNode {
        return (<div>
            <div className='e-pv-e-sign control-section' >
                <div className="e-pv-e-sign-property-sec" >
                <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer" className={`${!this.isMobile ? 'e-pv-sign-show-toolbar ' : '.e-pv-sign-hide-toolbar'}`}>
            <ItemsDirective>
              <ItemDirective prefixIcon="e-icons e-download" align="Right" text="Download" id="e-pv-e-sign-download" tooltipText="downLoad" click={this.downLoadFile}></ItemDirective>
            </ItemsDirective>
          </ToolbarComponent>
          <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer" className={`${this.isMobile ? 'e-pv-sign-show-toolbar ' : '.e-pv-sign-hide-toolbar'}`} >
            <ItemsDirective>
              <ItemDirective template={this.dropdownComponent}></ItemDirective>
              <ItemDirective prefixIcon="e-icons e-download" align="Right" tooltipText="downLoad" click={this.downLoadFile}></ItemDirective>
            </ItemsDirective>
          </ToolbarComponent>
                </div>
                <div style={{ display:`${this.isMobile ? 'block' : 'flex'}`, position: 'relative' }}>
                    <SidebarComponent style={{ display:`${this.isMobile ? 'none' : 'block'}`}} id="e-pv-e-sign-defaultSidebar" ref={(scope) => { this.sidebarobj = scope; }} className="e-pv-e-sign default-sidebar" width="200px" enableGestures={false}>
                        <div className='e-pv-e-sign-content-wrapper' style={{ marginLeft: '4px', marginTop: '14px' }} >
                            <div className="e-pv-e-sign-user-label" style={{fontSize: '16px', margin:'15px 10px 5px', fontWeight: '500px' }}>
                                Fields
                            </div>
                            <div id='e-pv-e-sign-user-field' style={{ width: '190px', height: '37px',border:'1px solid lightgray',marginBottom: '20px' }}>
                            <div className='e-pv-e-sign-user-dropdown' >
                            <DropDownListComponent ref={(scope) => { this.userMenu = scope; }} id='e-pv-e-sign-userMenu' select={this.userChange} index={0} popupWidth={'190px'} dataSource={this.userDetails} width={'188px'} fields={this.fields} itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate} ></DropDownListComponent>
                            </div>
                        </div>
                            <div style={{ display: 'flex' ,marginLeft:'6px'}}>                       
                                <ButtonComponent ref={(scope) => {this.signatureBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='Signature' onClick={this.signatureClick}>
                                    <span className="e-pv-handwritten-icon e-pv-icon" style={{ fontSize: '18px' }}></span>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Signature</span>
                                </ButtonComponent>
                                <ButtonComponent  ref={(scope) => {this.initialBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='Initial'  onClick={this.initialClick}>
                                    <i className="e-icons e-font-name" style={{ fontSize: '18px' }}></i>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Initial</span>
                                </ButtonComponent>
                            </div>
                            <div style={{ display: 'flex',marginLeft:'6px' }}>
                                <ButtonComponent  ref={(scope) => {this.textBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='TextBox'  onClick={this.textboxClick} >
                                    <i className="e-icons e-text-form" style={{ fontSize: '18px' }}></i>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Textbox</span>
                                </ButtonComponent>
                                <ButtonComponent  ref={(scope) => {this.passwordBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='Password'  onClick={this.passwordClick} >
                                    <i className="e-icons e-password" style={{ fontSize: '18px' }}></i>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Password</span>
                                </ButtonComponent>                                
                            </div>
                            <div style={{ display: 'flex',marginLeft:'6px' }}>
                            <   ButtonComponent   ref={(scope) => {this.checkBoxBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='CheckBox'  onClick={this.checkboxClick} >
                                    <i className="e-icons e-check-box" style={{ fontSize: '18px' }}></i>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Checkbox</span>
                                </ButtonComponent>
                                <ButtonComponent  ref={(scope) => {this.radioBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='RadioButton' onClick={this.radioClick} >
                                    <i className="e-icons e-radio-button" style={{ fontSize: '18px' }}></i>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Radio</span>
                                </ButtonComponent>
                                
                            </div>
                            <div style={{ display: 'flex',marginLeft:'6px' }}>
                             <ButtonComponent  ref={(scope) => {this.dropdownBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='DropDown'  onClick={this.dropdownClick} >
                                    <i className="e-icons e-drop-down" style={{ fontSize: '18px' }}></i>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Dropdown</span>
                                </ButtonComponent>
                                <ButtonComponent  ref={(scope) => {this.listBoxBtn = scope;}} className='e-pv-e-sign-form-field-property e-outline' title='ListBox'  onClick={this.listboxClick}>
                                    <i className="e-icons e-list-unordered" style={{ fontSize: '18px' }}></i>
                                    <span style={{ fontSize: '12px', marginTop: '11px' }}>Listbox</span>
                                </ButtonComponent>
                               
                            </div>
                        </div>
                    </SidebarComponent>
                </div>
                <div style={{ width:`${this.isMobile ? '100%' : 'calc(100% - 200px)'}`}}>
                    <PdfViewerComponent ref={(scope) => { this.viewer = scope; }} id="container" enableNavigationToolbar={false} enableAnnotationToolbar={false} enableToolbar={false} documentPath="https://cdn.syncfusion.com/content/PDFViewer/Fill+and+Sign.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib" zoomMode="FitToPage" documentLoad={this.documentLoad} formFieldAdd={this.addFormField} pageClick={this.pageClick} downloadFileName='eSign_designMode.pdf' style={{ 'height': '640px' }}>
                        <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
                    </PdfViewerComponent>
                </div>
                <div>
                    <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer-mob" className={`${this.isMobile ? 'e-pv-sign-show-toolbar ' : 'e-pv-sign-hide-toolbar'}`}>
                        <ItemsDirective>
                            <ItemDirective template={this.ToolbarComponentMob}></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>

            </div>

            <div id="action-description">
                <p>This sample enables two different users to sign the document. The first user must fill out and sign their designated fields, which are visible only to them. Once the first user has completed their section, the second user can be selected to fill out and sign their own fields. After both users have signed, the document can be finalized.</p>
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
}
