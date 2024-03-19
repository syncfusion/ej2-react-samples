/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer,Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { createElement, isNullOrUndefined, EventHandler, Browser, select } from '@syncfusion/ej2-base'
import { isLocked } from '@syncfusion/ej2/spreadsheet';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { ProgressBarComponent, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-react-progressbar';

export class MultiFormatViewer extends SampleBase<{}, {}>{
  public viewer: PdfViewerComponent;
  public parentElement;
  public allowedExtensions;
  public dropAreaRef
  public linear
  public dropElement = null;
  public filesName = [];
  public filesData;
  public uploadObj
  public pdfViewerProgressValue = 0;
  public uploadProgressValue = 0;

  constructor(props: {}) {
    super(props)
    this.dropAreaRef = React.createRef();
    this.uploadObj = React.createRef();
    this.linear = React.createRef();
    this.allowedExtensions = '.doc, .docx, .rtf, .docm, .dotm, .dotx, .dot, .xls, .xlsx, .pptx, .pptm, .potx, .potm .jpeg, .png, .bmp, .pdf';
  }
  rendereComplete = () => {
    this.uploadObj.current.dropArea = this.dropAreaRef.current;
    document.getElementById('browse').onclick = () => {
      document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
      return false;
    };
  };

  onSelect = (args: any) => {
    this.linear.current.value == 0;
    this.linear.current.refresh();
    let extensions = ['doc', 'docx', 'rtf', 'docm', 'dotm', 'dotx', 'dot', 'xls', 'xlsx', 'pptx', 'pptm', 'potx', 'potm', 'jpeg', 'png', 'bmp', 'pdf'];
    let progressBarContainer: any = document.getElementById("progressBar") as HTMLElement;
    let progressBar: any = document.getElementById("linearProgressBar") as HTMLElement;
    let progressMessage: any = document.getElementById("uploadedMessage") as HTMLElement;
    var fileSizeValidation = document.getElementById("fileSizeValidation") as HTMLElement;
    document.getElementById("fileDetails").style.display = "block";
    document.getElementById("FailedMessage").style.display = "none";
    progressBarContainer.style.display = "block";
    progressBar.style.display = "flex";
    progressMessage.style.display = "none";
    fileSizeValidation.style.display = "none";
    if (!this.uploadObj.current.element.querySelector('li')) {
      this.filesData = [];
    }
    if (
      isNullOrUndefined(
        this.uploadObj.current.element.querySelector('.e-upload-files')
      )
    ) {
      this.parentElement = createElement('ul', {
        className: 'e-upload-files',
      });
      document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
    }
    var validFiles = args.filesData;
    if (validFiles.length === 0) {
      progressBarContainer.style.display = "block";
      progressBar.style.display = "none";
      progressMessage.style.display = "block";
      args.cancel = true;
      return;
    }
    if (!extensions.includes(validFiles[0].type)) {
      document.getElementById("FailedMessage").style.display = "block";
      document.getElementById("fileDetails").style.display = "none"
      progressBar.style.display = "none";
      progressMessage.style.display = "none";
      document.getElementById('pdfviewer_container').style.display = 'none';
      args.cancel = true;
      return;
    }
    if(validFiles[0].type != "pdf" && validFiles[0].size>4000000){
      fileSizeValidation.style.display = "block";
      progressBar.style.display = "none";
      document.getElementById("fileDetails").style.display = "none";
      document.getElementById('pdfviewer_container').style.display = 'none';
      args.cancel = true;
      return;
    }
    document.getElementById("fileName").innerHTML = args.filesData[0].name;
    let size = document.getElementById("fileSize") as HTMLElement;
    if ((args.filesData[0].size.toString()).length <= 7) {
      size.innerHTML = ((args.filesData[0].size / 1024).toFixed(1)).toString() + " KB";
    } else {
      let kbsize = args.filesData[0].size / 1024;
      size.innerHTML = ((kbsize / 1024).toFixed(1)).toString() + " MB";
    }
    document.getElementById("fileSize");
    this.formSelectedData(validFiles[0], this.uploadObj.current);
    this.filesData = this.filesData.concat(validFiles);
    const totalProgress = this.calculateTotalProgress();
    this.updateProgressBar(totalProgress);
    (document.getElementById("progress-status") as any).innerHTML = totalProgress.toString() + "%";
  }

  formSelectedData = (file, proxy) => {
    var liEle = createElement('li', {
      className: 'e-upload-file-list',
      attrs: {
        'data-file-name': file.name
      },
    });
    this.readURL(liEle, file);
    proxy.fileList.push(liEle);
  }

  readURL = (li, args) => {
    var file = args.rawFile;
    var reader = new FileReader();
    var type = args.type;
    var context = this;
    reader.addEventListener('load', function () {
      let post = JSON.stringify({
        'data': reader.result,
        'type': type
      })
      const url = "https://services.syncfusion.com/react/production/api/pdfviewer/LoadFile"
      let xhr = new XMLHttpRequest()
      xhr.open('Post', url, true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          let progressValue = Math.round((event.loaded / event.total) * 100);
          context.uploadProgressValue = progressValue;
          const totalProgress = context.calculateTotalProgress();
          context.updateProgressBar(totalProgress);
          (document.getElementById("progress-status") as any).innerHTML = totalProgress.toString() + "%";
        }
      })
      xhr.onreadystatechange = function (event) {
        if (xhr.responseText != "" && xhr.readyState === 4) {
          if (xhr.status === 200) {
            let viewer = (document.getElementById('pdfviewer') as any).ej2_instances[0];
            viewer.documentPath = xhr.responseText;
            this.pdfViewerProgressValue = 20;
            const totalProgress = context.calculateTotalProgress();
            context.updateProgressBar(totalProgress);
            document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
            document.getElementById('pdfviewer_container').style.display = 'block';
          } else {
            console.error('Error:', xhr.statusText);
          }
        }
      }.bind(this);
      xhr.send(post);
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  documentLoad = (args) => {
    this.pdfViewerProgressValue = 100;
    const totalProgress = this.calculateTotalProgress();
    this.updateProgressBar(totalProgress);
    (document.getElementById("progress-status") as any).innerHTML = totalProgress.toString() + "%";
    setTimeout(() => {
      document.getElementById("linearProgressBar").style.display = "none";
      document.getElementById("uploadedMessage").style.display = "block";
      this.uploadProgressValue = 0;
      this.pdfViewerProgressValue = 0;
      this.linear.current.value = 0;
    }, 1000);
    this.viewer.magnification.fitToPage();
  };

  ajaxRequestSuccess = (args) => {
    if (args.action === "Load") {
      this.pdfViewerProgressValue = 50;
      const totalProgress = this.calculateTotalProgress();
      this.updateProgressBar(totalProgress);
      document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
    }
  };

  calculateTotalProgress = () => {
    const totalProgress = (this.uploadProgressValue + this.pdfViewerProgressValue) / 2;
    return totalProgress;
  };
  updateProgressBar = (progress) => {
    if (this.linear) {
      this.linear.current.value = progress;
    }
  };

  progressLoad = (args) => {
    let div = document.getElementsByClassName('progressbar-label');
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
      selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
      || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
      for (let i = 0; i < div.length; i++) {
        div[i].setAttribute('style', 'color:white');
      }
    }
  }

  change = (args) => {
    if (args.checked) {
      this.viewer.serviceUrl = '';
    }
    else {
      this.viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
    }
    this.viewer.dataBind();
    this.viewer.load(this.viewer.documentPath, null);
  }
  render() {
    return (
      <div>
        <div className='control-section' >
          <div className='content-wrapper-pdfviewer' ref={(scope) => { this.dropAreaRef.current = scope }} style={{ 'textAlign': 'center', 'marginBottom': '15px' }}>
            <div style={{ 'height': 'auto', 'overflow': 'auto' }}>
              <ButtonComponent id='browse'>Browse...</ButtonComponent>
              <div>
                <p style={{ 'margin': '10px' }}>OR</p>
                <span id="drop">Drop files (Word, Excel, PowerPoint, Image, PDF)</span>
              </div>
            </div>
            <div id="progressBar" style={{ display: 'none' }}>
              <div id='fileDetails'>
                <p id="fileName"></p>
                <p id="fileSize"></p>
              </div>
              <div id='linearProgressBar' style={{ justifyContent: 'center', display: 'none' }}>
                <ProgressBarComponent id="linear-pdfviewer" ref={(scope) => { this.linear.current = scope }} type='Linear' width='250' height='60' animation={{ enable: false, duration: 2000, delay: 0 }} value={0} load={this.progressLoad.bind(this)}>
                </ProgressBarComponent>
                <span id='progress-status' style={{ padding: '18px 5px' }}></span>
              </div>
              <div id="uploadedMessage" style={{ display: 'none', marginTop: '10px' }}>
                <p style={{ color: 'rgb(110, 218, 110)' }}>File successfully uploaded...</p>
              </div>
              <div id="FailedMessage" style={{ display: 'none', marginTop: '10px' }}>
                <p style={{ color: 'red' }}>File not Supported!</p>
              </div>
              <div id="fileSizeValidation" style={{ display: 'none', marginTop: '10px' }}>
                <p style={{ color: 'rgb(203, 38, 38)' }}>Maximum file size is (4.0 MB) for this operation...</p>
              </div>
            </div>
            <div id="uploader-pdfviewer">
            <UploaderComponent id='fileUpload' type='file' ref={(scope) => { this.uploadObj.current = scope }} selected={this.onSelect.bind(this)} allowedExtensions={this.allowedExtensions}></UploaderComponent>
            </div>
          </div>
          <div id='pdfviewer_container' style={{ display: 'none' }}>

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
            <PdfViewerComponent id="pdfviewer"
              toolbarSettings={{
                showTooltip: true, toolbarItems: ["DownloadOption",
                  "UndoRedoTool",
                  "PageNavigationTool",
                  "MagnificationTool",
                  "PanTool",
                  "SelectionTool",
                  "CommentTool",
                  "SubmitForm",
                  "SearchOption",
                  "AnnotationEditTool",
                  "FormDesignerEditTool",
                  "PrintOption"]
              }}
              resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib"
              style={{ 'height': '640px' }}
              documentLoad={this.documentLoad}
              ajaxRequestSuccess={this.ajaxRequestSuccess}>
              <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]} />
            </PdfViewerComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample shows how it loads various file types like PDFs, images, and Microsoft Office documents (Word, Excel, PowerPoint) into the PDF Viewer.</p>
        </div>
        <div id="description">
          <p>
            This sample provides a hands-on demonstration of the PDF Viewer's ability to load and display a diverse range of file formats, including PDFs, images, and Microsoft Office documents such as Word, Excel, and PowerPoint files. Users can interact with the sample in the following ways:
          </p>
          <ul>
            <li>Use the Browse button to select any file of interest.</li>
            <li>Alternatively, drag and drop a chosen file into the designated file pick area.</li>
            <li>Once a valid file is selected, it will be seamlessly loaded into the PDF Viewer located below, allowing users to easily view and interact with the content.</li>
            <li>Support for various file formats, including:</li>
            <ul>
              <li>PDF - '.pdf'</li>
              <li>Excel - '.xlsx','.xls'</li>
              <li>Image - '.jpeg','.jpg','.png','.bmp'</li>
              <li>PowerPoint - '.pptx','.pptm','.potx','.potm'</li>
              <li>Word - '.doc','.docx','dot','dotx','docm','dotm','rtf'</li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }
}
