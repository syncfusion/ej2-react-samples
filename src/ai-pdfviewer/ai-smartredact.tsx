import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation,
    Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
    FormDesigner, PageOrganizer, Inject,
    ContextMenuItem,
    RectangleSettings
} from '@syncfusion/ej2-react-pdfviewer';
import { useEffect } from 'react';
import { ButtonComponent, FabComponent } from '@syncfusion/ej2-react-buttons';
import { AppBarComponent, ItemDirective, ItemsDirective, ToolbarComponent, TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-react-popups';
import { Browser } from '@syncfusion/ej2-base';

function SmartRedact() {
    // Replace the localhost web service url here
    const SERVICE_URL: string = 'Service_Url/api/pdfviewer';
    useEffect(() => {
        if (rightContainer) {
            createSpinner({ target: rightContainer });
            hideSpinner(rightContainer);
        }
        if (scanBtnObj) {
            scanBtnObj.addEventListener('click', scanBtnClicked);
        }
        if (rightContainerCloseBtn) {
            rightContainerCloseBtn.element.addEventListener('click', closeRightContainer);
        }
        if (redactAIBtn) {
            redactAIBtn.element.addEventListener('click', redactionApply);
        }
        if (redactCancelBtnObj) {
            redactCancelBtnObj.element.addEventListener('click', redactCancel);
        }
        if (parentContainer) {
            parentContainer.addEventListener('touchstart', checkClickedDiv);
        }
        if (downloadBtn) {
            downloadBtn.element.addEventListener('click', downloadClicked);
        }
        fileUploadBtn?.addEventListener('change', readFile, false);
    }, []);
    let pdfviewer: PdfViewerComponent;
    let toolbarObj: ToolbarComponent;
    let treeObj: TreeViewComponent;
    let fabButton: FabComponent;
    let redactAIBtn: ButtonComponent
    let scanBtn: ButtonComponent;
    let selectedTreeViewObj: TreeViewComponent;
    let smartRedactContainerOpen: boolean = false;
    let isFindMobileDevice: boolean = false;
    let isSelectedCategores: boolean = true;
    let IsSelectedOccurences: boolean = false;
    let selectedTreeObjData: { [key: string]: Object }[] = [];
    let redactionCount: number = 0;

    let downloadBtn: ButtonComponent;
    let scanTreeObj: HTMLElement;
    let scanBtnObj: HTMLElement;
    let selectedTreeObj: HTMLElement;;
    let textHeaderPattern: HTMLElement;
    let textHeaderRedact: HTMLElement;
    let selectedBtnObj: HTMLElement;
    let redactCancelBtnObj: ButtonComponent;
    let rightContainer: HTMLElement;
    let rightContainerBlack: HTMLElement;
    let fileUploadBtn: HTMLInputElement;
    let zoomInBtn = document.getElementById('zoominButton');
    let zoomOutBtn = document.getElementById('zoomoutButton');
    let leftContainer = document.getElementById('e-pv-smartredact-left-container');
    let parentContainer = document.querySelector('.e-pv-viewer-container');
    let rightContainerCloseBtn: ButtonComponent;

    /* Initialize the scan objects tree view */
    let treeObjData: { [key: string]: Object }[] = [
        { id: 1, name: 'Select All', hasChild: true, expanded: true, isChecked: true },
        { id: 2, pid: 1, name: 'Person Names' },
        { id: 3, pid: 1, name: 'Organization Names' },
        { id: 4, pid: 1, name: 'Email addresses' },
        { id: 5, pid: 1, name: 'Phone Numbers' },
        { id: 6, pid: 1, name: 'Addresses' },
        { id: 7, pid: 1, name: 'Dates' },
        { id: 8, pid: 1, name: 'Account Numbers' },
        { id: 9, pid: 1, name: 'Credit Card Numbers' }
    ];
    let treeObjDataChecked: { [key: string]: Object }[] = [
        { id: 1, checked: true },
        { id: 2, checked: true },
        { id: 3, checked: true },
        { id: 4, checked: true },
        { id: 5, checked: true },
        { id: 6, checked: true },
        { id: 7, checked: true },
        { id: 8, checked: true },
        { id: 9, checked: true }
    ];

    /* Function for the document download */
    function downloadClicked() {
        pdfviewer.download();
    }

    /* Function for the annotation add event */
    function annotationAdded() {
        redactionCount++;
        updateRedactButton();
    }

    /* Function for the annotation remove event */
    function annotationRemove(args: any) {
        const subject = args.annotationBounds.parentObj.properties.subject;
        selectedTreeViewObj.uncheckAll([subject]);
        redactionCount--;
        updateRedactButton();
    }

    /* Function for the pdfviewer created event */
    function sampleCreated() {
        const appbarContainer = document.getElementById('e-pv-smartredact-appbar-container');
        if (appbarContainer) {
            appbarContainer.style.display = 'block';
        }
        pdfviewer.load('Confidential_Medical_Record.pdf', '');
    }

    /* Function for the document load event */
    function documentLoaded() {
        if (fabButton) {
            fabButton.element.style.display = 'block';
        }
        isMobileDevice();
        if (smartRedactContainerOpen) {
            openSmartReact();
        }
        selectedTreeObjData = [];
        annotationCollection = [];
        redactionCount = 0;
        isSelectedCategores = true;
        IsSelectedOccurences = false;
        updateRedactButton();
    }

    /* Function for the enable or disable the redact button */
    function updateRedactButton() {
        const toolbarRedactBtn = document.getElementById('redactButton');
        if (redactionCount > 0) {
            if (toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, true);
                redactAIBtn.disabled = false;
                redactAIBtn.dataBind();
            }
        }
        else {
            if (toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, false);
                redactAIBtn.disabled = true;
                redactAIBtn.dataBind();
            }
        }
    }

    function optionsClicked(args: any) {
        var selectedNodeChecked = treeObjDataChecked.findIndex(item => item.id.toString() === args.node.dataset.uid);
        if (treeObjDataChecked[selectedNodeChecked].checked) {
            treeObj.uncheckAll([args.node.dataset.uid.toString()]);
            treeObjDataChecked[selectedNodeChecked].checked = false;
        }
        else {
            treeObj.checkAll([args.node.dataset.uid.toString()]);
            treeObjDataChecked[selectedNodeChecked].checked = true;
        }
    }

    function optionsSelect(args: any) {
        const result = args.data.find((element: any) => element.text === "Select All");
        if (result.isChecked == "false") {
            scanBtn.disabled = true;
            scanBtn.dataBind();
        }
        else {
            scanBtn.disabled = false;
            scanBtn.dataBind();
        }
    }

    function closeRightContainer() {
        if (!smartRedactContainerOpen) {
            if (!Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '75%';
                }
                pdfviewer.updateViewerContainer();
                toolbarObj.refreshOverflow();
            }
            smartRedactContainerOpen = true;
            if (fabButton) {
                fabButton.element.style.display = 'none';
            }
        }
        else {
            if (!Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '100%';
                }
                setTimeout(() => {
                    pdfviewer.updateViewerContainer();
                }, 50);
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'none';
            }
            smartRedactContainerOpen = false;
            if (fabButton) {
                fabButton.element.style.display = 'block';
            }
        }
    }

    function checkClickedDiv() {
        if (Browser.isDevice && !isFindMobileDevice) {
            if (rightContainer) {
                rightContainer.style.display = 'none';
                smartRedactContainerOpen = false;
            }
        }
    }

    function isMobileDevice() {
        //Check if the device is mobile
        var isMobile = Browser.isDevice;
        var sampleContent = document.getElementById('e-pv-smart-redact-container')
        if (isMobile) {
            var sampleContentRect = sampleContent?.getBoundingClientRect();
            var sampleContentMinWidth = 450;
            if (sampleContentRect && ((sampleContentRect.width) > sampleContentMinWidth)) {
                return false;
            } else {
                return true;
            }
        }
        isFindMobileDevice = isMobile;
    }

    /* Filter the name from the collection */
    function getNamesByIds(ids: string[], data: { [key: string]: any }[]): string[] {
        return data
            .filter(item => ids.includes(item.id.toString())) // Convert item.id to string for comparison
            .map(item => item.name);
    }

    /* Function for the aply rectangle annotation */
    function applyRectangle() {
        pdfviewer.rectangleSettings = {
            author: 'Redaction'
        };
        pdfviewer.annotation.setAnnotationMode('Rectangle');
    }
    interface Dimension {
        height: number;
        width: number;
        x: number;
        y: number;
        author: string;
        pageNumber: number;
        subject: string;
    }
    let annotationCollection: Dimension[] = [];

    /* Function for the redaction cancel button */
    function redactCancel() {
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'block';
            }
            showSpinner(rightContainer);
        }
        for (var i = 0; i < annotationCollection.length; i++) {
            if (annotationCollection[i].subject.includes("Details")) {
                const filteredCollection = pdfviewer.annotationCollection.filter(item => item.subject === annotationCollection[i].subject);
                if (filteredCollection[0]) {
                    pdfviewer.annotationModule.deleteAnnotationById(filteredCollection[0].annotationId);
                }
            }
        }
        updateRedactButton();
        selectedTreeObjData = [];
        annotationCollection = [];
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'none';
            }
            hideSpinner(rightContainer);
        }
        if (scanTreeObj && textHeaderPattern) {
            scanTreeObj.style.display = 'block';
            textHeaderPattern.style.display = 'block';
        }
        if (scanBtnObj) {
            scanBtnObj.style.display = 'flex';
        }
        if (selectedTreeObj && textHeaderRedact) {
            selectedTreeObj.style.display = 'none';
            textHeaderRedact.style.display = 'none';
        }
        if (selectedBtnObj) {
            selectedBtnObj.style.display = 'none';
        }
    }

    /* Function for the redaction apply button */
    function redactionApply() {
        if (redactAIBtn.disabled == false) {
            pdfviewer.saveAsBlob().then(function (value) {
                if (rightContainer) {
                    if (rightContainerBlack) {
                        rightContainerBlack.style.display = 'block';
                    }
                    showSpinner(rightContainer);
                }
                let data = value;
                let reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = (e) => {
                    const base64String = e.target?.result as string;
                    sendRedactionequest(base64String);
                    selectedTreeObjData = [];
                    annotationCollection = [];
                    redactionCount = 0;
                };
            });
        }
    }

    /* Function for the send request for the redaction apply */
    function sendRedactionequest(data: string) {
        var dictionary: any = {
            "hashId": data,
        };
        var post: any = JSON.stringify(dictionary);
        let url: any = SERVICE_URL + "/AIRedaction";
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {
                    if (rightContainer) {
                        if (rightContainerBlack) {
                            rightContainerBlack.style.display = 'none';
                        }
                        hideSpinner(rightContainer);
                    }
                    if (smartRedactContainerOpen) {
                        openSmartReact();
                    }
                    pdfviewer.load(response, 'null');
                    if (scanTreeObj && textHeaderPattern) {
                        scanTreeObj.style.display = 'none';
                        textHeaderPattern.style.display = 'none';
                    }
                    if (scanBtnObj) {
                        scanBtnObj.style.display = 'none';
                    }
                    if (selectedTreeObj && textHeaderRedact) {
                        selectedTreeObj.style.display = 'none';
                        textHeaderRedact.style.display = 'none';
                    }
                    if (selectedBtnObj) {
                        selectedBtnObj.style.display = 'none';
                    }
                    isSelectedCategores = true;
                    IsSelectedOccurences = false;
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        xhr.send(post);
    }

    /* Fucntion for send request for the get details from the document */
    function scanBtnClicked() {
        if (rightContainer) {
            if (rightContainerBlack) {
                rightContainerBlack.style.display = 'block';
            }
            showSpinner(rightContainer);
        }
        let data: any = pdfviewer.getRootElement();
        var hashId: any = data.ej2_instances[0].viewerBase.hashId;
        let selectedItems: string[] = treeObj.getAllCheckedNodes();
        const names: string[] = getNamesByIds(selectedItems, treeObjData);
        var dictionary: any = {
            "hashId": hashId
        };
        var post: any = JSON.stringify({
            jsonObject: dictionary,
            selectedItems: names
        });
        let url: any = SERVICE_URL + "/FindTextinDocument";
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {
                    let jsonResponse = JSON.parse(response);
                    let count = 1;
                    let pidNumber;
                    let obj = {
                        id: `SelectAll`, name: `Select All`, expanded: true, hasChild: true, isChecked: true
                    };
                    selectedTreeObjData.push(obj);
                    for (var i = 0; i < pdfviewer.viewerBase.pageCount; i++) {
                        if (jsonResponse[i].length != 0) {
                            let obj = {
                                id: `Page${i + 1}`, name: `Page ${i + 1}`, pid: 'SelectAll', expanded: true, hasChild: true, isChecked: true
                            };
                            pidNumber = `Page${i + 1}`;
                            selectedTreeObjData.push(obj);
                            for (var j = 0; j < jsonResponse[i].length; j++) {
                                let content: string = (jsonResponse[i])[j].SensitiveInformation;
                                let obj = {
                                    id: `Details${count}`, name: `${content}`, pid: pidNumber
                                };
                                let annotObj: Dimension = {
                                    width: (jsonResponse[i])[j].Bounds.Width,
                                    height: (jsonResponse[i])[j].Bounds.Height,
                                    x: (jsonResponse[i])[j].Bounds.X,
                                    y: (jsonResponse[i])[j].Bounds.Y,
                                    author: "Redaction",
                                    pageNumber: i + 1,
                                    subject: `Details${count}`
                                };
                                pdfviewer.annotation.addAnnotation("Rectangle", {
                                    width: (jsonResponse[i])[j].Bounds.Width,
                                    height: (jsonResponse[i])[j].Bounds.Height,
                                    offset: { x: (jsonResponse[i])[j].Bounds.X, y: (jsonResponse[i])[j].Bounds.Y },
                                    author: "Redaction",
                                    pageNumber: i + 1,
                                    subject: `Details${count}`
                                } as RectangleSettings);
                                annotationCollection.push(annotObj);
                                selectedTreeObjData.push(obj);
                                count++;
                            }
                        }
                    }
                    selectedTreeViewObj.fields = { dataSource: selectedTreeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
                    selectedTreeViewObj.showCheckBox = true;
                    selectedTreeViewObj.nodeChecked = nodeCheckedChange;
                    selectedTreeViewObj.nodeSelected = nodeSelected;
                    selectedTreeViewObj.dataBind();
                    if (rightContainer) {
                        if (rightContainerBlack) {
                            rightContainerBlack.style.display = 'none';
                        }
                        hideSpinner(rightContainer);
                    }
                    if (scanTreeObj && textHeaderPattern) {
                        scanTreeObj.style.display = 'none';
                        textHeaderPattern.style.display = 'none';
                    }
                    if (scanBtnObj) {
                        scanBtnObj.style.display = 'none';
                    }
                    if (selectedTreeObj && textHeaderRedact) {
                        selectedTreeObj.style.display = 'block';
                        textHeaderRedact.style.display = 'block';
                    }
                    if (selectedBtnObj) {
                        selectedBtnObj.style.display = 'flex';
                    }
                    isSelectedCategores = false;
                    IsSelectedOccurences = true;
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        xhr.send(post);
    }

    /* Function for open the document */
    function openDocument(): void {
        fileUploadBtn?.click();
    }

    /* Function for separate the page number */
    function separateNumbersAndStrings(input: string): number[] {
        const numbers: number[] = [];
        const regex = /\d+/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(input)) !== null) {
            numbers.push(parseInt(match[0], 10));
        }
        return numbers;
    }

    /* Function for node selected event */
    function nodeSelected(args: any) {
        if (args.nodeData.parentID) {
            if (args.nodeData.parentID.includes('Page')) {
                const pageNumber = separateNumbersAndStrings(args.nodeData.parentID);
                pdfviewer.navigation.goToPage(pageNumber[0]);
            }
            else {
                const pageNumber = separateNumbersAndStrings(args.nodeData.id);
                pdfviewer.navigation.goToPage(pageNumber[0]);
            }
        }
    }

    /* Function for node check event */
    function nodeCheckedChange(args: any) {
        if (args.action == "check") {
            for (var i = 0; i < args.data.length; i++) {
                if (args.data[i].id.includes("Details")) {
                    const filteredCollection = annotationCollection.filter(item => item.subject === args.data[i].id);
                    if (filteredCollection[0]) {
                        pdfviewer.annotation.addAnnotation("Rectangle", {
                            width: filteredCollection[0].width,
                            height: filteredCollection[0].height,
                            offset: { x: filteredCollection[0].x, y: filteredCollection[0].y },
                            author: "Redaction",
                            pageNumber: filteredCollection[0].pageNumber,
                            subject: filteredCollection[0].subject
                        } as RectangleSettings);
                    }
                }
            }
            updateRedactButton();
        }
        if (args.action == "uncheck") {
            for (var i = 0; i < args.data.length; i++) {
                if (args.data[i].id.includes("Details")) {
                    const filteredCollection = pdfviewer.annotationCollection.filter(item => item.subject === args.data[i].id);
                    if (filteredCollection[0]) {
                        pdfviewer.annotationModule.deleteAnnotationById(filteredCollection[0].annotationId);
                    }
                }
            }
            updateRedactButton();
        }
    }

    /* Function for read the open file */
    function readFile(args: any): void {
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                let filename: string = upoadedFiles[0].name;
                reader.readAsDataURL(uploadedFile);
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    pdfviewer.documentPath = uploadedFileUrl;
                    pdfviewer.fileName = filename;
                };
            }
        }
    }

    /* Open and close the right container */
    function openSmartReact() {
        if (!smartRedactContainerOpen) {
            if (!Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '75%';
                }
                pdfviewer.updateViewerContainer();
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'grid';
            }
            if (isSelectedCategores && !IsSelectedOccurences) {
                if (scanTreeObj && textHeaderPattern) {
                    scanTreeObj.style.display = 'block';
                    textHeaderPattern.style.display = 'block';
                }
                if (scanBtnObj) {
                    scanBtnObj.style.display = 'flex';
                }
                if (selectedTreeObj && textHeaderRedact) {
                    selectedTreeObj.style.display = 'none';
                    textHeaderRedact.style.display = 'none';
                }
                if (selectedBtnObj) {
                    selectedBtnObj.style.display = 'none';
                }
            }
            if (!isSelectedCategores && IsSelectedOccurences) {
                if (scanTreeObj && textHeaderPattern) {
                    scanTreeObj.style.display = 'none';
                    textHeaderPattern.style.display = 'none';
                }
                if (scanBtnObj) {
                    scanBtnObj.style.display = 'none';
                }
                if (selectedTreeObj && textHeaderRedact) {
                    selectedTreeObj.style.display = 'block';
                    textHeaderRedact.style.display = 'block';
                }
                if (selectedBtnObj) {
                    selectedBtnObj.style.display = 'flex';
                }
            }
            smartRedactContainerOpen = true;
            if (fabButton) {
                fabButton.element.style.display = 'none';
            }
        }
        else {
            if (!Browser.isDevice) {
                if (leftContainer) {
                    leftContainer.style.width = '100%';
                }
                setTimeout(() => {
                    pdfviewer.updateViewerContainer();
                }, 50);
                toolbarObj.refreshOverflow();
            }
            if (rightContainer) {
                rightContainer.style.display = 'none';
            }
            smartRedactContainerOpen = false;
            if (fabButton) {
                fabButton.element.style.display = 'block';
            }
        }
    }

    /* Function for the zoom in the pdfviewer */
    function zoomInClicked(): void {
        pdfviewer.magnification.zoomIn();
        updateZoomBtn();
    }

    /* Function for the zoom out the pdfviewer */
    function zoomOutClicked(): void {
        pdfviewer.magnification.zoomOut();
        updateZoomBtn();
    }

    /* Function for enable and disable zoom in adn zoom out button */
    function updateZoomBtn() {
        if (zoomInBtn && zoomOutBtn) {
            if (pdfviewer.magnificationModule.zoomFactor == 4) {
                toolbarObj.enableItems(zoomInBtn, false);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
            else if (pdfviewer.magnificationModule.zoomFactor == 0.25) {
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, false);
            }
            else {
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
        }
    }

    return (
        <>
            <div id="e-pv-smartredact-parent-container">
                <div id="e-pv-smartredact-appbar-container" style={{ display: 'none' }}>
                    <AppBarComponent id="e-pv-smartredact-defaultappbar"
                        colorMode='Primary'
                    >
                        <span className="e-pv-smartredact-regular">Smart Redact</span>
                        <div className="e-appbar-spacer"></div>
                        <ButtonComponent id="e-pv-smartredact-downloadBtn"
                            ref={btn => (downloadBtn = btn as ButtonComponent)}
                            cssClass='e-inherit' iconCss='e-icons e-download e-btn-icon e-icon-left' content='Download'
                        ></ButtonComponent>
                    </AppBarComponent>
                </div>
                <div id="e-pv-smart-redact-container">
                    <div id="e-pv-smartredact-left-container">
                        <FabComponent id="e-pv-fab-btn" title="Open AI Assist"
                            ref={fab => (fabButton = fab as FabComponent)}
                            onClick={openSmartReact}
                            iconCss='e-icons e-assistview-icon'
                            style={{ display: 'none' }}></FabComponent>
                        <ToolbarComponent id="e-pv-smartredact-toolbar" style={{ top: '0px' }}
                            ref={toolbar => (toolbarObj = toolbar as ToolbarComponent)}>
                            <ItemsDirective>
                                <ItemDirective prefixIcon="e-icons e-folder" tooltipText="Open" text="Open File" id="openButton" cssClass="e-pv-open-container" click={openDocument} />
                                <ItemDirective type="Separator" tooltipText="separator" align="Left" />
                                <ItemDirective prefixIcon="e-icons e-circle-remove" tooltipText="Zoom Out" text="Zoom Out" id="zoomoutButton" cssClass="e-pv-zoomout-container" click={zoomOutClicked} />
                                <ItemDirective prefixIcon="e-icons e-circle-add" tooltipText="Zoom In" text="Zoom In" id="zoominButton" cssClass="e-pv-zoomin-container" click={zoomInClicked} />
                                <ItemDirective type="Separator" tooltipText="separator" />
                                <ItemDirective prefixIcon="e-icons e-pv-smartredact-mark-redact" tooltipText="Mark for Redaction" text="Mark for Redaction" id="markforRedaction" cssClass="e-pv-mark-container" click={applyRectangle} />
                                <ItemDirective prefixIcon="e-icons e-redaction" tooltipText="Redaction" text="Redaction" id="redactButton" cssClass="e-pv-redact-container" click={redactionApply} />
                            </ItemsDirective>
                        </ToolbarComponent>
                        <div id="e-pv-smartredact-pdfviewer-container">
                            <PdfViewerComponent id="e-pv-smartredact-pdfviewer" style={{ height: '100%', width: '100%' }}
                                serviceUrl={SERVICE_URL}
                                ref={pdfviewerObj => (pdfviewer = pdfviewerObj as PdfViewerComponent)}
                                enableAnnotationToolbar={false}
                                enableToolbar={false}
                                enablePageOrganizer={false}
                                contextMenuSettings={{
                                    contextMenuAction: 'RightClick',
                                    contextMenuItems: [ContextMenuItem.Delete]
                                }}
                                downloadFileName="SmartRedaction.pdf"
                                zoomMode="FitToPage"
                                annotationAdd={annotationAdded}
                                annotationRemove={annotationRemove}
                                documentLoad={documentLoaded}
                                created={sampleCreated}
                            >
                                <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer]} />
                            </PdfViewerComponent>
                            <input
                                type="file"
                                ref={file => (fileUploadBtn = file as HTMLInputElement)}
                                id="e-pv-smartredact-fileUpload"
                                accept=".pdf"
                                style={{ display: 'block', visibility: 'hidden', width: '0', height: '0' }}
                            />
                        </div>
                    </div>
                    <div id="e-pv-smartredact-right-container" style={{ display: 'none' }}
                        ref={container => (rightContainer = container as HTMLElement)}
                    >
                        <div id="e-pv-right-container-header">
                            <ButtonComponent id="e-pv-right-container-close-btn"
                            ref={btn => (rightContainerCloseBtn = btn as ButtonComponent)}
                                iconCss='e-icons e-close'
                            ></ButtonComponent>
                        </div>
                        <div id="e-pv-smartredact-treeviewText-pattern" style={{ display: 'none' }}
                            ref={text => (textHeaderPattern = text as HTMLElement)}>
                            Select the following sensitive patterns to get redacted
                        </div>
                        <div id="e-pv-smartredact-treeviewText-redact" style={{ display: 'none' }}
                            ref={text => (textHeaderRedact = text as HTMLElement)}>
                            Select the following sensitive information to get redacted
                        </div>
                        <div id="e-pv-smartredact-treeViewScanObj-container" style={{ display: 'none' }}
                            ref={tree => (scanTreeObj = tree as HTMLElement)}>
                            <div id="e-pv-smartredact-treeViewScanObj">
                                <TreeViewComponent id="e-pv-smartredact-scantree"
                                    ref={tree => (treeObj = tree as TreeViewComponent)}
                                    fields={{ dataSource: treeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }}
                                    showCheckBox={true}
                                    nodeChecked={optionsSelect}
                                    nodeClicked={optionsClicked}
                                ></TreeViewComponent>
                            </div>
                        </div>
                        <div id="e-pv-smartredact-treeViewSelectedObj-container" style={{ display: 'none' }}
                            ref={tree => (selectedTreeObj = tree as HTMLElement)}>
                            <div id="e-pv-smartredact-treeViewSelectedObj">
                                <TreeViewComponent id="e-pv-smartredact-selectedTree"
                                    ref={tree => (selectedTreeViewObj = tree as TreeViewComponent)}
                                ></TreeViewComponent>
                            </div>
                        </div>
                        <div id="e-pv-right-container-footer-content" style={{ display: 'none' }}
                            ref={btn => (scanBtnObj = btn as HTMLElement)}>
                            <ButtonComponent id="e-pv-smartredact-redactScanBtn"
                                ref={btn => (scanBtn = btn as ButtonComponent)}
                                content='Scan' isPrimary={true}
                            ></ButtonComponent>
                        </div>
                        <div id="e-pv-right-container-footer-result" style={{ display: 'none' }}
                            ref={btn => (selectedBtnObj = btn as HTMLElement)}>
                            <ButtonComponent id="e-pv-smartredact-redactCancelBtn" content='Cancel'
                                ref={btn => (redactCancelBtnObj = btn as ButtonComponent)}
                            ></ButtonComponent>
                            <ButtonComponent id="e-pv-smartredact-redactApplyBtn"
                                ref={btn => (redactAIBtn = btn as ButtonComponent)}
                                content='Redact' isPrimary={true}
                            ></ButtonComponent>
                        </div>
                    </div>
                    <div id="e-pv-smartredact-right-container-blackout" style={{ display: 'none' }}
                        ref={container => (rightContainerBlack = container as HTMLElement)}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default SmartRedact