/**
 * Default PDF Viewer sample
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
 ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, Inject, FormDesigner, TextFieldSettings, RadioButtonFieldSettings, InitialFieldSettings, CheckBoxFieldSettings, SignatureFieldSettings } from '@syncfusion/ej2-react-pdfviewer';
 import { SampleBase } from '../common/sample-base'; 
 import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
 import './pdf.component.css';
 
 export class FormDesignerComponent extends SampleBase<{}, {}> {
    public viewer: PdfViewerComponent;
   render() {
     return ( <div>
         <div className='control-section'>
             <div className="flex-container">
                 <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
                 <div className="e-message render-mode-info">
                     <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                 </div>
                 <div>
                     <SwitchComponent cssClass="buttonSwitch" id="checked" change={this.change} checked={true}></SwitchComponent>
                 </div>
             </div>
             {/* Render the PDF Viewer */}
             <PdfViewerComponent id="container"  ref={(scope) => { this.viewer = scope; }} documentPath="https://cdn.syncfusion.com/content/pdf/form-designer.pdf"  documentLoad={this.documentLoaded} validateFormFields={this.validateFormFields} enableFormFieldsValidation={true} showNotificationDialog={false} style={{ 'height': '640px' }}>
                 <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]} />
             </PdfViewerComponent>
           </div>
         <div id="action-description">
         <p>This sample demonstrates the creation of the supported Form fields in the PDF Viewer such as Textbox, Password, Checkbox, Radio Button, Drop Down, List box, Signature, and Initial. We can also customize these fields and can include new fields through the user interaction by switching to the designer mode.</p>
        </div>
  
         <div id="description">
         <p>
         More information on form designer support can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
         documentation section
         </a>.
         </p>
         </div>
         </div>
     );
   }
   documentLoaded = (args) => {
     if(args.documentName === 'form-designer.pdf')
     {       
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "First Name", bounds: { X: 146, Y: 229, Width: 150, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "Middle Name", bounds: { X: 338, Y: 229, Width: 150, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "Last Name", bounds: { X: 530, Y: 229, Width: 150, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("RadioButton", {bounds: { X: 148, Y: 289, Width:18, Height:18}, name: "Gender", isSelected: false } as RadioButtonFieldSettings);
      this.viewer.formDesignerModule.addFormField("RadioButton", {bounds: { X: 292, Y: 289, Width:18, Height:18}, name: "Gender", isSelected: false } as RadioButtonFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "DOB Month", bounds: { X: 146, Y: 320, Width: 35, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "DOB Date", bounds: { X: 193, Y: 320, Width: 35, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", { name: "DOB Year", bounds: { X: 242, Y: 320, Width: 35, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("InitialField", {name: "Agree", bounds: { X: 148, Y: 408, Width:200, Height:43} } as InitialFieldSettings); 
      this.viewer.formDesignerModule.addFormField("InitialField", {name: "Do Not Agree", bounds: { X: 148, Y: 466, Width:200, Height:43} } as InitialFieldSettings); 
      this.viewer.formDesignerModule.addFormField("CheckBox", {name: "Text Message", bounds: { X: 56, Y: 664, Width:20, Height:20}, isChecked:false } as CheckBoxFieldSettings);
      this.viewer.formDesignerModule.addFormField("CheckBox", {name: "Email", bounds: { X: 242, Y: 664, Width:20, Height:20}, isChecked:false } as CheckBoxFieldSettings);
      this.viewer.formDesignerModule.addFormField("CheckBox", {name: "Appointment Reminder", bounds: { X: 56, Y: 740, Width:20, Height:20}, isChecked:false } as CheckBoxFieldSettings);
      this.viewer.formDesignerModule.addFormField("CheckBox", {name: "Request for Customerservice", bounds: { X: 56, Y: 778, Width:20, Height:20}, isChecked:false } as CheckBoxFieldSettings);
      this.viewer.formDesignerModule.addFormField("CheckBox", {name: "Information Billing", bounds: { X: 290, Y: 740, Width:20, Height:20}, isChecked:false } as CheckBoxFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "My Email", bounds: { X: 146, Y: 850, Width: 200, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "My Phone", bounds: { X: 482, Y: 850, Width: 200, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("SignatureField", {name: "Sign", bounds: { X: 57, Y: 923, Width:200, Height:43} } as SignatureFieldSettings); 
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "DOS Month", bounds: { X: 386, Y: 923, Width: 35, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", {name: "DOS Date", bounds: { X: 434, Y: 923, Width: 35, Height: 24 } } as TextFieldSettings);
      this.viewer.formDesignerModule.addFormField("Textbox", { name: "DOS Year", bounds: { X: 482, Y: 923, Width: 35, Height: 24 } } as TextFieldSettings);
        }
    }
    change = (args) => {
        if (args.checked) {
            this.viewer.serviceUrl = '';
        }
        else {
            this.viewer.serviceUrl = 'https://ej2services.syncfusion.com/react/development/api/pdfviewer';
        }
        this.viewer.dataBind();
        this.viewer.load(this.viewer.documentPath, null);
    }
  validateFormFields = (args) => {
    var errorMessage = "Required Field(s): ";
    var forms = this.viewer.formFieldCollections;
    var flag = false;
    var radioGroupName = "";
    for (var i = 0; i < forms.length; i++) {
        var text = "";
        if (forms[i].isRequired == true)
        {
            if (forms[i].type.toString() == "Checkbox" && forms[i].isChecked == false) {
                text = forms[i].name;
            }
            else if (forms[i].type == "RadioButton" && flag == false) {
                radioGroupName = forms[i].name;
                if(forms[i].isSelected == true)
                    flag = true;
            }
            else if (forms[i].type.toString() != "Checkbox" && forms[i].type != "RadioButton" &&  forms[i].value == ""){
                text = forms[i].name;
            }
            if(text != "")
            {                    
                if (errorMessage == "Required Field(s): ") {
                    errorMessage += text;
                }
                else {
                    errorMessage += ", " + text;
                }
            }
        }
    }
    if(!flag && radioGroupName != "")
    {
        if(errorMessage == "Required Field(s): ")
            errorMessage += radioGroupName;
        else
            errorMessage += ", " + radioGroupName;
    }
    if (errorMessage != "Required Field(s): ") {
        this.viewer.showNotificationPopup(errorMessage);
    }
  }
}