import { DocumentEditor, ContextType, TableOfContentsSettings } from '@syncfusion/ej2-documenteditor';
import { createElement } from '@syncfusion/ej2-base';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ItemModel, DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ToolBar } from './tool-bar';

/**
 * TOC Properties pane
 */
export class TocProperties {
    private documentEditor: DocumentEditor;
    public element: HTMLElement;
    private elementId: string;
    private template1Div: HTMLElement;
    private contentStyle: DropDownList;
    private contentStyleLevel: DropDownList;
    private showPageNumber: CheckBox;
    private rightalignPageNumber: CheckBox;
    private hyperlink: CheckBox;
    private borderBtn: Button;
    private borderSize: DropDownButton;
    private borderStyle: DropDownButton;
    private updateBtn: Button;
    private cancelBtn: Button;
    private borderLevelStyle: DropDownList;
    public headerDiv: HTMLElement;
    private closeButton: HTMLElement;
    public toolbar: ToolBar;
    private prevContext: ContextType;
    constructor(docEditor: DocumentEditor) {
        this.documentEditor = docEditor;
        this.elementId = this.documentEditor.element.id;
        this.initializeTocPane();
    }

    private initializeTocPane = (): void => {
        // tslint:disable-next-line:max-line-length
        this.element = createElement('div', { id: this.elementId + '_tocProperties', styles: 'padding:9px;width:269px' });
        this.tocHeaderDiv();
        this.initTemplates();
        this.tocOptionsDiv();
        this.contentStylesDropdown();
        this.checkboxContent();
        this.buttonDiv();
        this.wireEvents();
        this.updateTocProperties();
    }
    private updateTocProperties = (): void => {
        this.rightalignPageNumber.checked = true;
        this.showPageNumber.checked = true;
        this.hyperlink.checked = true;
    }
    private wireEvents = (): void => {
        this.cancelBtn.element.addEventListener('click', (): void => { this.onClose(); });
        this.updateBtn.element.addEventListener('click', this.onInsertToc);
        this.closeButton.addEventListener('click', (): void => { this.onClose(); });
    }
    private onClose = (): void => {
        if (this.toolbar.showPropertiesPane
            && this.toolbar.previousContext !== 'TableOfContents') {
            this.toolbar.showPropertiesPaneOnSelection();
        } else {
            this.toolbar.showPropertiesPane = false;
            this.showTocPane(false);
            this.toolbar.enableDisablePropertyPaneButton(false);
            this.toolbar.propertiesPane.showPropertiesPane(false);
        }
    }
    private tocHeaderDiv = (): void => {
        let headerDiv: HTMLElement = createElement('div', {
            id: this.elementId + 'toc_id',
            styles: 'display: block;'
        });
        this.element.appendChild(headerDiv);
        let title: HTMLElement = createElement('label', {
            className: 'e-de-prop-header-label'
        });
        title.textContent = 'Table of Contents';
        headerDiv.appendChild(title);
        this.closeButton = createElement('span', {
            className: 'e-de-icon-Close',
            styles: 'cursor: pointer;float:right;display:inline-block;color: #4A4A4A;'
        });
        headerDiv.appendChild(this.closeButton);
    }
    private initTemplates = (): void => {
        this.template1();
        // tslint:disable-next-line:max-line-length
        let div: HTMLElement = createElement('div', { styles: 'display:block;border-top: 1px solid #E0E0E0;margin-bottom:5px' }); this.element.appendChild(div);
    }

    private template1 = (): void => {
        this.template1Div = createElement('div', {
            className: 'toc-template1'
        });
        this.element.appendChild(this.template1Div);
        let templateContent1: HTMLElement = createElement('div', {
            className: 'toc-template1-content1'
        });
        templateContent1.textContent = 'HEADING______ 1';
        this.template1Div.appendChild(templateContent1);
        let templateContent2: HTMLElement = createElement('div', {
            className: 'toc-template1-content2'
        });
        templateContent2.textContent = 'HEADING______ 2';
        this.template1Div.appendChild(templateContent2);
        let templateContent3: HTMLElement = createElement('div', {
            className: 'toc-template1-content3'
        });
        templateContent3.textContent = 'HEADING______ 3';
        this.template1Div.appendChild(templateContent3);
    }

    private tocOptionsDiv = (): void => {
        let optionsDiv: HTMLElement = createElement('div', {
            className: 'toc-optionsDiv'
        });
        this.element.appendChild(optionsDiv);
        let label: HTMLElement = createElement('label', { className: 'e-de-prop-label' });
        label.textContent = 'Options';
        optionsDiv.appendChild(label);
    }

    private createDropdownOption(ulTag: HTMLElement, text: string): HTMLElement {
        let liTag: HTMLElement = createElement('li', {
            styles: 'display:block',
            className: 'ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size'
        });
        ulTag.appendChild(liTag);
        let innerHTML: string;
        if (text === 'None') {
            innerHTML = '<div>' + text + '</div>';
        } else if (text === '1.5px') {
            // tslint:disable-next-line:max-line-length
            innerHTML = '<div>' + text + '<span class="ui-list-line" style="margin-left:10px;border-bottom-width:' + text + '"></span></div>';
        } else {
            // tslint:disable-next-line:max-line-length
            innerHTML = '<div>' + text + '<span class="ui-list-line" style="margin-left:20px;border-bottom-width:' + text + '"></span></div>';
        }
        let liInnerDiv: HTMLElement = createElement('div', {
            className: 'ui-list-header-presetmenu',
            id: 'ui-zlist0', innerHTML: innerHTML
        });
        liTag.appendChild(liInnerDiv);
        return liTag;
    }
    public createDropDownBtn(id: string, parentDiv: HTMLElement, iconCss: string, content: string[], selectedIndex: number): DropDownList {
        let buttonElement: HTMLButtonElement = createElement('input', { id: id }) as HTMLButtonElement;
        parentDiv.appendChild(buttonElement);
        // tslint:disable-next-line:max-line-length  
        let dropDownBtn: DropDownList = new DropDownList({ index: selectedIndex, dataSource: content, width: '75px', popupWidth: '75px', cssClass: 'e-de-prop-font-button' }, buttonElement);
        return dropDownBtn;
    }

    private contentStylesDropdown = (): void => {
        let contentStyleElement: HTMLElement = createElement('div', { id: 'contentstyle_div', styles: 'margin-bottom: 10px;' });
        contentStyleElement.setAttribute('title', 'Number of heading or outline levels to be shown in table of contents.');
        this.element.appendChild(contentStyleElement);
        // let items: ItemModel[] = [{ text: '___________', id: 'solid' }];

        // this.borderStyle = this.createDropDownBtn(
        //     this.elementId + '_borderStyleDiv',
        //     'width:120px;height:28px;margin-top:8px', contentStyleElement, 'e-de-icon-stroke-size', 'Solid', items
        // );
        let label: HTMLElement = createElement('label', { className: 'e-de-prop-sub-label', styles: 'margin-right:8px;' });
        label.textContent = 'Levels';
        contentStyleElement.appendChild(label);
        this.element.appendChild(contentStyleElement);
        let dataSource: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.borderLevelStyle = this.createDropDownBtn(
            this.elementId + '_borderLevelDiv',
            contentStyleElement, '', dataSource, 2
        );
        /* tslint:disable:no-any */
        this.borderLevelStyle.change = (args: any): void => {
            this.borderLevelStyle.value = args.item.value;
        };
        /* tslint:enable:no-any */
        this.element.appendChild(contentStyleElement);
    }

    private checkboxContent = (): void => {
        let checkboxElement: HTMLElement = createElement('div', { id: 'toc_checkboxDiv', styles: 'margin-bottom:20px' });
        this.element.appendChild(checkboxElement);
        let showPageNumberDiv: HTMLElement = createElement('div', { className: 'e-de-prop-sub-label' });
        showPageNumberDiv.setAttribute('title', 'Show page numbers in table of contents.');
        checkboxElement.appendChild(showPageNumberDiv);
        // tslint:disable-next-line:max-line-length
        let showpagenumberCheckboxElement: HTMLElement = createElement('input', { id: 'showpagenumber', styles: 'width:12px;height:12px;margin-bottom:8px', className: 'e-de-prop-sub-label' });
        showPageNumberDiv.appendChild(showpagenumberCheckboxElement);
        this.showPageNumber = new CheckBox({
            label: 'Show page numbers',
        });
        this.showPageNumber.appendTo(showpagenumberCheckboxElement);
        let rightAlignDiv: HTMLElement = createElement('div', { className: 'e-de-prop-sub-label' });
        rightAlignDiv.setAttribute('title', 'Right align page numbers in table of contents.');
        checkboxElement.appendChild(rightAlignDiv);
        // tslint:disable-next-line:max-line-length
        let rightalignpagenumberCheckboxElement: HTMLElement = createElement('input', { id: 'rightalignpagenumber', styles: 'width:12px;height:12px', className: 'e-de-prop-sub-label' });
        rightAlignDiv.appendChild(rightalignpagenumberCheckboxElement);
        this.rightalignPageNumber = new CheckBox({
            label: 'Right align page numbers',
        });
        this.rightalignPageNumber.appendTo(rightalignpagenumberCheckboxElement);
        let hyperlinkDiv: HTMLElement = createElement('div', { className: 'e-de-prop-sub-label' });
        hyperlinkDiv.setAttribute('title', 'Use hyperlinks instead of page numbers.');
        checkboxElement.appendChild(hyperlinkDiv);
        // tslint:disable-next-line:max-line-length
        let hyperlinkCheckboxElement: HTMLElement = createElement('input', { id: 'hyperlinkdiv', styles: 'width:12px;height:12px', className: 'e-de-prop-sub-label' });
        hyperlinkDiv.appendChild(hyperlinkCheckboxElement);
        this.hyperlink = new CheckBox({
            label: 'Use hyperlinks',
        });
        this.hyperlink.appendTo(hyperlinkCheckboxElement);
    }

    private buttonDiv = (): void => {
        let footerElement: HTMLElement = createElement('div', { id: 'footerDiv', styles: 'float:right' });
        this.element.appendChild(footerElement);
        let updatebuttoncontentStyleElement: HTMLElement = createElement('button', { id: 'footerupdatebuttonDiv' });
        footerElement.appendChild(updatebuttoncontentStyleElement);
        this.updateBtn = new Button({
            content: 'Update', cssClass: 'btn-update', isPrimary: true
        });
        this.updateBtn.appendTo(updatebuttoncontentStyleElement);

        let cancelbuttoncontentStyleElement: HTMLElement = createElement('button', { id: 'footercancelbuttonDiv' });
        footerElement.appendChild(cancelbuttoncontentStyleElement);
        this.cancelBtn = new Button({
            content: 'Cancel', cssClass: 'btn-cancel'
        });
        this.cancelBtn.appendTo(cancelbuttoncontentStyleElement);
    }

    public showTocPane = (isShow: boolean, prevContextType?: ContextType): void => {
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.updateBtn.content = this.documentEditor.selection.contextType === 'TableOfContents' ? 'Update' : 'Insert';
        this.prevContext = this.documentEditor.selection.contextType;
        this.documentEditor.resize();
        if (isShow) {
            this.updateBtn.element.focus();
        }
    }

    private onInsertToc = (): void => {
        // tslint:disable-next-line:max-line-length
        let tocSettings: TableOfContentsSettings = {
            startLevel: 1,
            endLevel: parseInt(this.borderLevelStyle.value as string, 0),
            includeHyperlink: this.hyperlink.checked,
            includePageNumber: this.showPageNumber.checked,
            rightAlign: this.rightalignPageNumber.checked
        };
        this.documentEditor.editor.insertTableOfContents(tocSettings);
    }
}