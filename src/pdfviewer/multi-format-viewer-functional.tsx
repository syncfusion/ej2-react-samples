/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer, Inject, AjaxRequestSettings
} from '@syncfusion/ej2-react-pdfviewer';
import { updateSampleSection } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { createElement, isNullOrUndefined, EventHandler, Browser, select } from '@syncfusion/ej2-base'
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ProgressBarComponent, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-react-progressbar';

function MultiFormatViewer() {
  React.useEffect(() => {
    updateSampleSection();
    rendereComplete();
  }, [])
  let viewer: PdfViewerComponent;
  let allowedExtensions;
  let parentElement;
  let dropAreaRef = React.useRef<HTMLDivElement>(null);
  let filesData;
  let uploadObj = React.useRef<UploaderComponent>(null);
  let linear = React.useRef<ProgressBarComponent>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({ color: "" });
  let pdfViewerProgressValue = 0;
  let uploadProgressValue = 0;
  const rendereComplete = () => {
    uploadObj.current.dropArea = dropAreaRef.current;
    document.getElementById('browse').onclick = () => {
      document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
      return false;
    };
  }
  allowedExtensions = '.doc, .docx, .rtf, .docm, .dotm, .dotx, .dot, .xls, .xlsx, .pptx, .pptm, .potx, .potm .jpeg, .png, .bmp, .pdf, .jpg';
  const onSelect = (args) => {
    linear.current.value == 0;
    linear.current.refresh();
    let extensions = ['doc', 'docx', 'rtf', 'docm', 'dotm', 'dotx', 'dot', 'xls', 'xlsx', 'pptx', 'pptm', 'potx', 'potm', 'jpeg', 'png', 'bmp', 'pdf','jpg'];
    let progressBarContainer: any = document.getElementById("progressBar") as HTMLElement;
    let progressBar: any = document.getElementById("linearProgressBar") as HTMLElement;
    let progressMessage: any = document.getElementById("uploadedMessage") as HTMLElement;
    document.getElementById("fileDetails").style.display = "block";
    document.getElementById("FailedMessage").style.display = "none";
    var fileSizeValidation = document.getElementById("fileSizeValidation");
    progressBarContainer.style.display = "block";
    progressBar.style.display = "flex";
    progressMessage.style.display = "none";
    fileSizeValidation.style.display = "none";
    if (!uploadObj.current.element.querySelector('li')) {
      filesData = [];
    }
    if (isNullOrUndefined(uploadObj.current.element.querySelector('.e-upload-files'))) {
      parentElement = createElement('ul', {
        className: 'e-upload-files',
      });
      document.getElementsByClassName('e-upload')[0].appendChild(parentElement);
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
    if (validFiles[0].type != "pdf" && validFiles[0].size > 4000000) {
      fileSizeValidation.style.display = "block";
      progressBar.style.display = "none";
      document.getElementById("fileDetails").style.display = "none";
      document.getElementById('pdfviewer_container').style.display = 'none';
      args.cancel = true;
      return;
    }
    document.getElementById("fileName").innerHTML = args.filesData[0].name;
    viewer = (document.getElementById('pdfviewer') as any).ej2_instances[0];
    viewer.downloadFileName = args.filesData[0].name;
    viewer.exportAnnotationFileName = args.filesData[0].name;
    let size = document.getElementById("fileSize") as HTMLElement;
    if ((args.filesData[0].size.toString()).length <= 7) {
      size.innerHTML = ((args.filesData[0].size / 1024).toFixed(1)).toString() + " KB";
    } else {
      let kbsize = args.filesData[0].size / 1024;
      size.innerHTML = ((kbsize / 1024).toFixed(1)).toString() + " MB";
    }
    document.getElementById("fileSize");
    formSelectedData(validFiles[0], uploadObj.current);
    filesData = filesData.concat(validFiles);
    const totalProgress = calculateTotalProgress();
    updateProgressBar(totalProgress);
    (document.getElementById("progress-status") as any).innerHTML = totalProgress.toString() + "%";
  }
  const formSelectedData = (file, proxy) => {
    var liEle = createElement('li', {
      className: 'e-upload-file-list',
      attrs: {
        'data-file-name': file.name
      },
    });
    readURL(liEle, file);
    proxy.fileList.push(liEle);
  }
  const readURL = (li, args) => {
    var file = args.rawFile;
    var reader = new FileReader();
    var type = args.type;
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
          uploadProgressValue = progressValue;
          const totalProgress = calculateTotalProgress();
          updateProgressBar(totalProgress);
          (document.getElementById("progress-status") as any).innerHTML = totalProgress.toString() + "%";
        }
      })
      xhr.onreadystatechange = function (event) {
        if (xhr.responseText != "" && xhr.readyState === 4) {
          if (xhr.status === 200) {
            viewer = (document.getElementById('pdfviewer') as any).ej2_instances[0];
            viewer.documentPath = xhr.responseText;
            pdfViewerProgressValue = 20;
            const totalProgress = calculateTotalProgress();
            updateProgressBar(totalProgress);
            document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
            document.getElementById('pdfviewer_container').style.display = 'block';
          } else {
            console.error('Error:', xhr.statusText);
          }
        }
      }.bind(this);
      xhr.send(post);
    },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const documentLoad = (args) => {
    pdfViewerProgressValue = 100;
    const totalProgress = calculateTotalProgress();
    updateProgressBar(totalProgress);
    (document.getElementById("progress-status") as any).innerHTML = totalProgress.toString() + "%";
    setTimeout(() => {
      document.getElementById("linearProgressBar").style.display = "none";
      document.getElementById("uploadedMessage").style.display = "block";
      uploadProgressValue = 0;
      pdfViewerProgressValue = 0;
      linear.current.value = 0;
    }, 1000);
  };
  const calculateTotalProgress = () => {
    const totalProgress = (uploadProgressValue + pdfViewerProgressValue) / 2;
    return totalProgress;
  };
  const updateProgressBar = (progress) => {
    if (linear) {
      linear.current.value = progress;
    }
  };
  const progressLoad = (args) => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
      selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
    if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
      || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
      setStyle({ color: "White" });
    }
  };
  const ajaxRequestSuccess = (args) => {
    if (args.action === "Load") {
      pdfViewerProgressValue = 50;
      const totalProgress = calculateTotalProgress();
      updateProgressBar(totalProgress);
      document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
    }
  };
  function change(args) {
    if (args.checked) {
      viewer.serviceUrl = '';
    }
    else {
      viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
    }
    viewer.dataBind();
    viewer.load(viewer.documentPath, null);
  }
  return (<div>
    <div className='control-section' >
      <div className='content-wrapper-pdfviewer' ref={dropAreaRef} style={{ 'textAlign': 'center', 'marginBottom': '15px' }}>
        <div style={{ 'height': 'auto', 'overflow': 'auto', marginBottom: '15px' }}>
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
            <ProgressBarComponent id="linear-pdfviewer" ref={linear} type='Linear' width='250' height='60' animation={{ enable: false, duration: 2000, delay: 0 }} value={0} load={progressLoad.bind(this)}>
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
          <UploaderComponent id='fileUpload' type='file' ref={uploadObj} multiple={false} selected={onSelect} allowedExtensions={allowedExtensions} ></UploaderComponent>
        </div>
      </div>
      <div id='pdfviewer_container' style={{ display: 'none' }}>
        <div className="flex-container">
          <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
          <div className="e-message render-mode-info">
            <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
          </div>
          <SwitchComponent cssClass="buttonSwitch" id="checked" change={change} checked={true}></SwitchComponent>
        </div>
        {/* Render the PDF Viewer */}
        <PdfViewerComponent id="pdfviewer"
          className="e-pv-multi-format-pdfviewer"
          resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib"
          toolbarSettings={{
            showTooltip: true, toolbarItems: [
              "DownloadOption",
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
          documentLoad={documentLoad}
          ajaxRequestSuccess={ajaxRequestSuccess}
          zoomMode = "FitToPage"
          style={{ 'height': '640px' }}>
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
      <p>Note : The PDF conversions are performed using the appropriate libraries, while the role of the PDF Viewer is solely to display the converted PDF document.</p>
      <p>
        More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
          documentation section
        </a>.
      </p>
    </div>
  </div>
  );
}
export default MultiFormatViewer;