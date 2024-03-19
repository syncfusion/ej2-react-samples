/**
 * Custom Context Menu PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent, CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';

export class CustomContextMenu extends SampleBase<{}, {}> {
    public viewer: PdfViewerComponent;
    public enableObj: CheckBoxComponent;
    public positionObj: CheckBoxComponent;
    public menuItems = [
        {
            text: 'Search In Google',
            id: 'search_in_google',
            iconCss: 'e-icons e-de-ctnr-find'
        },
        {
            text: 'Lock Annotation',
            iconCss: 'e-icons e-lock',
            id: 'lock_annotation'
        },
        {
            text: 'Unlock Annotation',
            iconCss: 'e-icons e-unlock',
            id: 'unlock_annotation'
        },
        {
            text: 'Lock Form Fields',
            iconCss: 'e-icons e-lock',
            id: 'read_only_true'
        },
        {
            text: 'Unlock Form Fields',
            iconCss: 'e-icons e-unlock',
            id: 'read_only_false'
        },
    ];
    render() {
        return (<div>
            <div className='col-lg-9 control-section pdfviewer-control-section'>
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
                <PdfViewerComponent ref={(scope) => { this.viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" documentLoad={this.documentLoad} customContextMenuSelect={this.customContextMenuSelect} customContextMenuBeforeOpen={this.customContextMenuBeforeOpen} style={{ 'height': '640px' }}>
                    <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
                </PdfViewerComponent>
            </div>
            <div className='col-lg-3 property-section-pdfviewer'>
                <div className="pdfviewer-property-container">
                    <h5><b>Properties</b></h5>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td className='pdfviewer-contextmenu-checkbox-label'>Hide Default Context Menu</td>
                            <td>
                                <CheckBoxComponent ref={(scope) => { this.enableObj = scope; }} id="hide-default-context-menu" change={this.contextmenuHelper} ></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className='pdfviewer-contextmenu-checkbox-label'>Add Custom option at bottom</td>
                            <td>
                                <CheckBoxComponent ref={(scope) => { this.positionObj = scope; }} id="show-custom-menu-bottom" change={this.contextmenuHelper} ></CheckBoxComponent>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="action-description">
                <p>Explore how to tailor context menus for PDF pages, annotations, and form fields in this sample.</p>
            </div>
            <div id="description">
            <p>
                This customization empowers users to add new context menus on PDF pages, annotations, and form fields. In this sample:
            </p>
            <ul>
                <li>Selecting text on pages reveals a custom context menu, enabling users to search for the selected text on Google.</li>
                <li>Annotations and Form fields can be locked directly from the context menu.</li>
                <li>Customization is achieved using the following APIs:</li>
                <ul>
                    <li>Customize the context menu by selectively displaying custom options, hiding existing menu items, controlled by boolean parameters in the <code>addCustomMenu()</code> method.</li>
                    <li>Position custom menu items either above or below existing ones, adjusting boolean parameters in the <code>addCustomMenu()</code> method.</li>
                    <li>Tailor the visibility of custom menu items using the <code>customContextMenuBeforeOpen</code> event.</li>
                    <li>Implement specific functionalities for custom options through the <code>customContextMenuSelect</code> event.</li>
                </ul>
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

    change = (args: any) => {
        if (args.checked) {
            this.viewer.serviceUrl = '';
        } else {
            this.viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
        }
        this.viewer.dataBind();
        this.viewer.load(this.viewer.documentPath, null);
    }

    documentLoad(args: any): void {
        this.viewer.addCustomMenu(this.menuItems, false, false);
    }

    customContextMenuSelect(args: any): void {
        switch (args.id) {
            case 'search_in_google':
                for (var i = 0; i < this.viewer.textSelectionModule.selectionRangeArray.length; i++) {
                    var content = this.viewer.textSelectionModule.selectionRangeArray[i].textContent;
                    if ((this.viewer.textSelectionModule.isTextSelection) && (/\S/.test(content))) {
                        window.open('http://google.com/search?q=' + content);
                    }
                }
                break;
            case 'lock_annotation':
                this.lockAnnotations(args);
                break;
            case 'unlock_annotation':
                this.unlockAnnotations(args);
                break;
            case 'read_only_true':
                this.setReadOnlyTrue(args);
                break;
            case 'read_only_false':
                this.setReadOnlyFalse(args);
                break;
            default:
                break;
        }
    }

    customContextMenuBeforeOpen(args: any): void {
        for (var i = 0; i < args.ids.length; i++) {
            var search = document.getElementById(args.ids[i]);
            if (search) {
                search.style.display = 'none';
                if (args.ids[i] === 'search_in_google' && (this.viewer.textSelectionModule) && this.viewer.textSelectionModule.isTextSelection) {
                    search.style.display = 'block';
                } else if (args.ids[i] === "lock_annotation" || args.ids[i] === "unlock_annotation") {
                    var isLockOption = args.ids[i] === "lock_annotation";
                    for (var j = 0; j < this.viewer.selectedItems.annotations.length; j++) {
                        var selectedAnnotation: any = this.viewer.selectedItems.annotations[j];
                        if (selectedAnnotation && selectedAnnotation.annotationSettings) {
                            var shouldDisplay = (isLockOption && !selectedAnnotation.annotationSettings.isLock) ||
                                (!isLockOption && selectedAnnotation.annotationSettings.isLock);
                            search.style.display = shouldDisplay ? 'block' : 'none';
                        }
                    }
                } else if ((args.ids[i] === "read_only_true" || args.ids[i] === "read_only_false") && this.viewer.selectedItems.formFields.length !== 0) {
                    var isReadOnlyOption = args.ids[i] === "read_only_true";
                    for (var j = 0; j < this.viewer.selectedItems.formFields.length; j++) {
                        var selectedFormFields = this.viewer.selectedItems.formFields[j];
                        if (selectedFormFields) {
                            var selectedFormField = this.viewer.selectedItems.formFields[j].isReadonly;
                            var displayMenu = (isReadOnlyOption && !selectedFormField) || (!isReadOnlyOption && selectedFormField);
                            search.style.display = displayMenu ? 'block' : 'none';
                        }
                    }
                } else if (args.ids[i] === 'formfield properties' && this.viewer.selectedItems.formFields.length !== 0) {
                    search.style.display = 'block';
                }
            }
        }
    }

    lockAnnotations(args: any): void {
        for (var i = 0; i < this.viewer.annotationCollection.length; i++) {
            if (this.viewer.annotationCollection[i].uniqueKey === this.viewer.selectedItems.annotations[0].id) {
                this.viewer.annotationCollection[i].annotationSettings.isLock = true;
                this.viewer.annotationCollection[i].isCommentLock = true;
                this.viewer.annotation.editAnnotation(this.viewer.annotationCollection[i]);
            }
            args.cancel = false;
        }
    }

    unlockAnnotations(args: any): void {
        for (var i = 0; i < this.viewer.annotationCollection.length; i++) {
            if (this.viewer.annotationCollection[i].uniqueKey === this.viewer.selectedItems.annotations[0].id) {
                this.viewer.annotationCollection[i].annotationSettings.isLock = false;
                this.viewer.annotationCollection[i].isCommentLock = false;
                this.viewer.annotation.editAnnotation(this.viewer.annotationCollection[i]);
            }
            args.cancel = false;
        }
    }

    setReadOnlyTrue(args: any): void {
        var selectedFormFields = this.viewer.selectedItems.formFields;
        for (var i = 0; i < selectedFormFields.length; i++) {
            var selectedFormField = selectedFormFields[i];
            if (selectedFormField) {
                this.viewer.formDesignerModule.updateFormField(selectedFormField, {
                    isReadOnly: true,
                } as any);
            }
            args.cancel = false;
        }
    }

    setReadOnlyFalse(args: any): void {
        var selectedFormFields = this.viewer.selectedItems.formFields;
        for (var i = 0; i < selectedFormFields.length; i++) {
            var selectedFormField = selectedFormFields[i];
            if (selectedFormField) {
                this.viewer.formDesignerModule.updateFormField(selectedFormField, {
                    isReadOnly: false,
                } as any);
            }
            args.cancel = false;
        }
    }

    contextmenuHelper(args: ChangeEventArgs): void {
        this.viewer.addCustomMenu(this.menuItems, this.enableObj.checked, this.positionObj.checked);
    }
}