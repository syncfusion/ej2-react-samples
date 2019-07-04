import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { ContextMenu, MenuEventArgs, MenuItemModel, ContextMenuModel } from '@syncfusion/ej2-navigations';
import { TitleBar } from './title-bar';
import { GETTTING_STARTED } from './data';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class CustomContextMenuView extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;
    public rendereComplete(): void {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
        // creating Custom Options
        let menuItems: MenuItemModel[] = [
            {
                text: 'Search In Google',
                id: 'search_in_google',
                iconCss: 'e-icons e-de-ctnr-find'
            }];
        // adding Custom Options
        this.container.documentEditor.contextMenu.addCustomMenu(menuItems, false);
        // custom Options Select Event
        this.container.documentEditor.customContextMenuSelect = (args: any): void => {
            let item: any = args.id;
            this.handleCustomMenuId(item);
        };
        this.container.documentEditor.customContextMenuBeforeOpen = (args: any): void => {
            let search: any = document.getElementById(args.ids[0]);
            search.style.display = 'none';
            let searchContent: string = this.container.documentEditor.selection.text;
            if (!this.container.documentEditor.selection.isEmpty && /\S/.test(searchContent)) {
                search.style.display = 'block';
            }
        };
    }
    render() {
        return (<div className='control-pane'>
            <div className='control-section'>
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block', 'height': '590px' }}
                        enableToolbar={true} locale='en-US' />
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates how to add custom option in context menu and some customization for context menu.</p>
            </div>
            <div id="description">
                <p>In this example, custom options added to search the selected text in google. The custom options will be visible after selecting the text.</p>
                <p style={{ 'display': 'block' }}>Context Menu Customization Features</p>
                <ul>
                    <li>Hide existing menu item and show custom menu item alone. It will be achieved by passing boolean value in second parameter of addCustomMenu() method</li>
                    <li>Show the custom menu item in bottom of the exisiting item. It will be achieved by passing boolean value in third parameter of addCustomMenu() method</li>
                    <li>Customize visibility of the added custom menu item. It will be achieved using the customContextMenuBeforeOpen Event</li>
                    <li>Custom Option Functionality achieved by using the customContextMenuSelect Event</li>
                </ul>
                <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/">documentation section.</a>
                </p>
            </div>
            <script>{
                window.onbeforeunload = function () {
                    return 'Want to save your changes?';
                }
            }
            </script>
        </div>);
    }

    // custom Options Functionality
    handleCustomMenuId = (item: string): void => {
        let id: string = this.container.documentEditor.element.id;
        switch (item) {
            case id + 'search_in_google':
                let searchContent: string = this.container.documentEditor.selection.text;
                if (!this.container.documentEditor.selection.isEmpty && /\S/.test(searchContent)) {
                    window.open('http://google.com/search?q=' + searchContent);
                }
                break;
        }
    }

    onLoadDefault = (): void => {
        this.container.documentEditor.open(GETTTING_STARTED);
        this.container.documentEditor.documentName = 'Custom Context Menu';
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}