import { createElement, select, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DocumentEditor, HighlightColor } from '@syncfusion/ej2-documenteditor';
import { DropDownList, ComboBox, ChangeEventArgs, PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { ItemModel, DropDownButton, SplitButton, SplitButtonModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { Query } from '@syncfusion/ej2-data';

/**
 * Text Properties pane
 */
export class TextProperties {
    public element: HTMLElement;
    private documentEditor: DocumentEditor;
    private text: Text;
    private paragraph: Paragraph;
    private isInitial: boolean = true;
    public updateStyles(): void {
        this.paragraph.updateStyleNames();
    }
    constructor(documentEditor: DocumentEditor, id: string) {
        this.documentEditor = documentEditor;
        this.text = new Text(this.documentEditor);
        this.paragraph = new Paragraph(this.documentEditor);
        this.initializeTextProperties(id);
        this.wireEvents();
    }
    public get appliedHighlightColor(): string {
        return this.text.appliedHighlightColor;
    }
    public set appliedHighlightColor(value: string) {
        this.text.appliedHighlightColor = value;
    }
    public get appliedBulletStyle(): string {
        return this.paragraph.appliedBulletStyle;
    }
    public set appliedBulletStyle(value: string) {
        this.paragraph.appliedBulletStyle = value;
    }
    public get appliedNumberingStyle(): string {
        return this.paragraph.appliedNumberingstyle;
    }
    public set appliedNumberingStyle(value: string) {
        this.paragraph.appliedNumberingstyle = value;
    }
    public showTextProperties = (isShow: boolean): void => {
        if (isShow) {
            this.onSelectionChange();
        }
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.documentEditor.resize();
    }
    private initializeTextProperties(id: string): void {
        /* tslint:disable-next-line:max-line-length */
        this.element = createElement('div', { id: this.documentEditor.element.id + 'id_' + this.generateUniqueID(), styles: 'width:269px;' });
        this.text.initializeTextPropertiesDiv(this.element);
        this.paragraph.initializeParagraphPropertiesDiv(this.element);
        this.paragraph.updateStyleNames();
    }
    private generateUniqueID = (): string => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    public wireEvents(): void {
        this.text.wireEvent();
        this.paragraph.wireEvent();
    }
    public onSelectionChange(): void {
        this.text.onSelectionChange();
        this.paragraph.onSelectionChange();
    }
}
export class Text {
    private documentEditor: DocumentEditor;
    private textProperties: HTMLElement;
    private bold: HTMLElement;
    private italic: HTMLElement;
    private underline: HTMLElement;
    private strikethrough: HTMLElement;
    private subscript: HTMLElement;
    private superscript: HTMLElement;
    private fontColor: HTMLElement;
    private highlightColor: SplitButton;
    private highlightColorElement: HTMLElement;
    private fontColorInputElement: ColorPicker;
    private highlightColorInputElement: HTMLElement;
    private clearFormat: HTMLElement;
    private fontSize: ComboBox;
    private fontFamily: ComboBox;
    private isRetrieving: boolean = false;
    public appliedHighlightColor: string = 'rgb(255, 255, 0)';
    constructor(documentEditor: DocumentEditor) {
        this.documentEditor = documentEditor;
    }
    public initializeTextPropertiesDiv(wholeDiv: HTMLElement): void {
        this.textProperties = wholeDiv;
        let element: string = 'font_properties';
        let textDiv: HTMLElement = this.createDivTemplate(element + '_text', wholeDiv, 'padding:10px;border-bottom:0.5px solid #E0E0E0');
        let label: HTMLElement = createElement('label', { className: 'e-de-prop-label' });
        label.innerHTML = 'Text';
        textDiv.appendChild(label);
        let fontDiv: HTMLElement = this.createDivTemplate(element + '_sizeStyle', textDiv, 'display:inline-flex;');
        let fontFamilyDiv: HTMLElement = this.createDivTemplate(element + '_fontFamilyDiv', fontDiv, 'margin-right:9px;');
        let fontFamily: HTMLElement = createElement('input', {
            id: element + '_fontFamily',
            /* tslint:disable-next-line:max-line-length */
            styles: 'font-size: 12px;color: #000000;letter-spacing: 0.05px;padding-left:10px;', className: 'e-prop-font-style'
        });
        fontFamilyDiv.appendChild(fontFamily);
        this.createDropDownListForFamily(fontFamily);
        let fontSizeDiv: HTMLElement = this.createDivTemplate(element + '_fontSizeDiv', fontDiv);
        let fontSize: HTMLInputElement = createElement('input', {
            id: element + '_fontSize',
            styles: 'font-size: 12px;color: #000000;letter-spacing: 0.05px;padding-left:10px', innerHTML: 'type:number',
            className: 'e-prop-font-style',
        }) as HTMLInputElement;
        fontSizeDiv.appendChild(fontSize);
        this.createDropDownListForSize(fontSize);
        let propertiesDiv: HTMLElement = createElement('div', {
            id: element + '_properties',
            styles: 'display:inline-flex;margin-top:8px;height: 32px'
        });
        textDiv.appendChild(propertiesDiv);
        let leftDiv: HTMLElement = createElement('div', {
            id: element + '_leftDiv',
            className: 'e-de-prop-div-left e-btn-group', styles: 'display:inline-flex;height:32px;width:163px'
        });
        propertiesDiv.appendChild(leftDiv);
        // tslint:disable-next-line:max-line-length
        this.bold = this.createButtonTemplate(element + '_bold', 'e-de-icon-Bold e-font-icons', leftDiv, 'e-de-prop-font-button', '40.5', 'Bold (Ctrl+B)');
        // tslint:disable-next-line:max-line-length
        this.italic = this.createButtonTemplate(element + '_italic', 'e-de-icon-Italic e-font-icons', leftDiv, 'e-de-prop-font-button', '40.5', 'Italic (Ctrl+I)');
        // tslint:disable-next-line:max-line-length
        this.underline = this.createButtonTemplate(element + '_underline', 'e-de-icon-Underline e-font-icons', leftDiv, 'e-de-prop-font-button', '40.5', 'Underline (Ctrl+U)');
        // tslint:disable-next-line:max-line-length
        this.strikethrough = this.createButtonTemplate(element + '_strikethrough', 'e-de-icon-Strikethrough e-font-icons', leftDiv, 'e-de-prop-font-last-button', '40.5', 'Strikethrough');
        // tslint:disable-next-line:max-line-length
        let rightDiv: HTMLElement = createElement('div', { id: element + '_rightDiv', className: 'e-de-prop-div-right e-btn-group', styles: 'display:inline-flex;margin-left:8px' });
        propertiesDiv.appendChild(rightDiv);
        // tslint:disable-next-line:max-line-length
        this.superscript = this.createButtonTemplate(element + '_superscript', 'e-de-icon-Superscript e-font-icons', rightDiv, 'e-de-prop-font-button', '38.5', 'Superscript (Ctrl+Shift++)');
        // tslint:disable-next-line:max-line-length
        this.subscript = this.createButtonTemplate(element + '_subscript', 'e-de-icon-Subscript e-font-icons', rightDiv, 'e-de-prop-font-last-button', '38.5', 'Subscript (Ctrl+=)');
        // tslint:disable-next-line:max-line-length
        let leftDiv2: HTMLElement = createElement('div', { id: element + '_color', className: 'de-font-clr-picker e-de-prop-div-left', styles: 'display:inline-flex;margin-top:8px;height:32px' });
        textDiv.appendChild(leftDiv2);
        // tslint:disable-next-line:max-line-length
        this.fontColor = this.createFontColorPicker(element + '_textColor', 40.5, leftDiv2, 'Font color');
        (leftDiv2.firstElementChild.lastElementChild.lastElementChild.firstChild as HTMLElement).classList.add('e-de-icon-FontColor', 'e-font-icons');
        this.initializeHighlightColorElement();
        this.highlightColor = this.createHighlightColorSplitButton(element + '_highlightColor', 34.5, leftDiv2, 'Text highlight color');
        this.highlightColor.element.nextElementSibling.firstElementChild.classList.add('e-de-icon-HighlightColor');
        this.highlightColorInputElement = this.highlightColor.element.firstChild as HTMLElement;
        // tslint:disable-next-line:max-line-length
        this.clearFormat = this.createButtonTemplate(element + '_clearFormat', 'e-de-icon-ClearAll e-font-icons', leftDiv2, 'e-de-prop-font-last-button', '40.5', 'Clear all formatting');
    }
    private createHighlightColorSplitButton = (id: string, width: number, divElement: HTMLElement, toolTipText: string): SplitButton => {
        let buttonElement: HTMLButtonElement = createElement('button', { id: id }) as HTMLButtonElement;
        buttonElement.style.width = width + 'px';
        buttonElement.style.padding = '0px 1px 1px 1px';
        buttonElement.style.height = 30 + 'px';
        divElement.appendChild(buttonElement);
        let hgltSplitObj: SplitButton = new SplitButton({
            iconCss: 'de-hglt-color',
            target: this.highlightColorElement, close: this.closePopup, beforeOpen: this.openPopup
        });
        hgltSplitObj.appendTo(buttonElement);
        hgltSplitObj.click = (): void => {
            this.applyHighlightColor(this.highlightColorInputElement.style.backgroundColor);
        };
        (hgltSplitObj.element.firstChild as HTMLElement).style.backgroundColor = 'rgb(255, 255, 0)';
        hgltSplitObj.element.parentElement.setAttribute('title', toolTipText);
        return hgltSplitObj;
    }
    private openPopup = (): void => {
        this.highlightColorElement.style.display = 'block';
    }
    private closePopup = (): void => {
        this.highlightColorElement.style.display = 'none';
    }
    private initializeHighlightColorElement(): void {
        this.highlightColorElement = createElement('div', { id: 'highlight_color_ppty', styles: 'display:none' });
        let yellowDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#ffff00', 'yellowDiv');
        let brightGreenDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#00ff00', 'brightGreenDiv');
        let turquoiseDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#00ffff', 'turquoiseDiv');
        let hotPinkDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#ff00ff', 'hotPinkDiv');
        let blueDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#0000ff', 'blueDiv');
        let redDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#ff0000', 'redDiv');
        let darkBlueDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#000080', 'darkBlueDiv');
        let tealDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#008080', 'tealDiv');
        let greenDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#008000', 'greenDiv');
        let violetDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#800080', 'violetDiv');
        let darkRedDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#800000', 'darkRedDiv');
        let darkYellowDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#808000', 'darkYellowDiv');
        let gray50Div: HTMLDivElement = this.createHightlighColorPickerDiv('#808080', 'gray50Div');
        let gray25Div: HTMLDivElement = this.createHightlighColorPickerDiv('#c0c0c0', 'gray25Div');
        let blackDiv: HTMLDivElement = this.createHightlighColorPickerDiv('#000000', 'blackDiv');
        let nocolor: HTMLElement = createElement('div', { className: 'e-hglt-no-color' });
        this.highlightColorElement.appendChild(nocolor);
        // tslint:disable-next-line:max-line-length
        let nocolorDiv: HTMLElement = createElement('div', { styles: 'width:24px;height:24px;background-color:#ffffff;margin:3px;', id: 'noColorDiv' });
        nocolor.appendChild(nocolorDiv);
        let nocolorDivValue: HTMLElement = createElement('div', { innerHTML: 'No color', className: 'de-hglt-no-color' });
        nocolorDiv.appendChild(nocolorDivValue);
        yellowDiv.addEventListener('click', this.onHighLightColor);
        brightGreenDiv.addEventListener('click', this.onHighLightColor);
        turquoiseDiv.addEventListener('click', this.onHighLightColor);
        hotPinkDiv.addEventListener('click', this.onHighLightColor);
        blueDiv.addEventListener('click', this.onHighLightColor);
        redDiv.addEventListener('click', this.onHighLightColor);
        darkBlueDiv.addEventListener('click', this.onHighLightColor);
        tealDiv.addEventListener('click', this.onHighLightColor);
        greenDiv.addEventListener('click', this.onHighLightColor);
        violetDiv.addEventListener('click', this.onHighLightColor);
        darkRedDiv.addEventListener('click', this.onHighLightColor);
        darkYellowDiv.addEventListener('click', this.onHighLightColor);
        gray50Div.addEventListener('click', this.onHighLightColor);
        gray25Div.addEventListener('click', this.onHighLightColor);
        blackDiv.addEventListener('click', this.onHighLightColor);
        nocolor.addEventListener('click', this.onHighLightColor);
    }
    private createHightlighColorPickerDiv(backgroundColor: string, id: string): HTMLDivElement {
        let colorDiv: HTMLDivElement = createElement('div', { className: 'e-de-hglt-btn', id: id }) as HTMLDivElement;
        colorDiv.style.backgroundColor = backgroundColor;
        this.highlightColorElement.appendChild(colorDiv);
        return colorDiv;
    }
    private onHighLightColor = (event: Event): void => {
        if (this.documentEditor.selection) {
            this.applyHighlightColor((event.currentTarget as HTMLElement).style.backgroundColor);
            this.highlightColor.toggle();
        }
    }
    private applyHighlightColorAsBackground = (color: HighlightColor): void => {
        this.removeSelectedColorDiv();
        if (color === 'NoColor') {
            this.highlightColorElement.querySelector('#noColorDiv').classList.add('e-color-selected');
        } else if (color === 'Yellow') {
            this.highlightColorElement.querySelector('#yellowDiv').classList.add('e-color-selected');
        } else if (color === 'BrightGreen') {
            this.highlightColorElement.querySelector('#brightGreenDiv').classList.add('e-color-selected');
        } else if (color === 'Turquoise') {
            this.highlightColorElement.querySelector('#turquoiseDiv').classList.add('e-color-selected');
        } else if (color === 'Pink') {
            this.highlightColorElement.querySelector('#hotPinkDiv').classList.add('e-color-selected');
        } else if (color === 'Red') {
            this.highlightColorElement.querySelector('#redDiv').classList.add('e-color-selected');
        } else if (color === 'DarkBlue') {
            this.highlightColorElement.querySelector('#darkBlueDiv').classList.add('e-color-selected');
        } else if (color === 'Teal') {
            this.highlightColorElement.querySelector('#tealDiv').classList.add('e-color-selected');
        } else if (color === 'Green') {
            this.highlightColorElement.querySelector('#greenDiv').classList.add('e-color-selected');
        } else if (color === 'Violet') {
            this.highlightColorElement.querySelector('#violetDiv').classList.add('e-color-selected');
        } else if (color === 'DarkRed') {
            this.highlightColorElement.querySelector('#darkRedDiv').classList.add('e-color-selected');
        } else if (color === 'DarkYellow') {
            this.highlightColorElement.querySelector('#darkYellowDiv').classList.add('e-color-selected');
        } else if (color === 'Gray50') {
            this.highlightColorElement.querySelector('#gray50Div').classList.add('e-color-selected');
        } else if (color === 'Gray25') {
            this.highlightColorElement.querySelector('#gray25Div').classList.add('e-color-selected');
        } else if (color === 'Black') {
            this.highlightColorElement.querySelector('#blackDiv').classList.add('e-color-selected');
        } else if (color === 'Blue') {
            this.highlightColorElement.querySelector('#blueDiv').classList.add('e-color-selected');
        }
    }
    private removeSelectedColorDiv = (): void => {
        this.highlightColorElement.querySelector('#noColorDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#yellowDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#brightGreenDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#turquoiseDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#hotPinkDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#redDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#darkBlueDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#tealDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#greenDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#violetDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#darkRedDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#darkYellowDiv').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#gray50Div').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#gray25Div').classList.remove('e-color-selected');
        this.highlightColorElement.querySelector('#blackDiv').classList.remove('e-color-selected');
    }
    private applyHighlightColor = (color: string): void => {
        this.appliedHighlightColor = color;
        let hgltColor: HighlightColor = this.getHighLightColor(color);
        this.documentEditor.selection.characterFormat.highlightColor = hgltColor as HighlightColor;
    }
    private getHighLightColor = (color: string): HighlightColor => {
        switch (color) {
            case 'rgb(255, 255, 0)':
                return 'Yellow';
            case 'rgb(0, 255, 0)':
                return 'BrightGreen';
            case 'rgb(0, 255, 255)':
                return 'Turquoise';
            case 'rgb(255, 0, 255)':
                return 'Pink';
            case 'rgb(0, 0, 255)':
                return 'Blue';
            case 'rgb(255, 0, 0)':
                return 'Red';
            case 'rgb(0, 0, 128)':
                return 'DarkBlue';
            case 'rgb(0, 128, 128)':
                return 'Teal';
            case 'rgb(0, 128, 0)':
                return 'Green';
            case 'rgb(128, 0, 128)':
                return 'Violet';
            case 'rgb(128, 0, 0)':
                return 'DarkRed';
            case 'rgb(128, 128, 0)':
                return 'DarkYellow';
            case 'rgb(128, 128, 128)':
                return 'Gray50';
            case 'rgb(192, 192, 192)':
                return 'Gray25';
            case 'rgb(0, 0, 0)':
                return 'Black';
            default:
                return 'NoColor';
        }
    }
    private createDivTemplate(id: string, parentDiv: HTMLElement, style?: string): HTMLElement {
        let divElement: HTMLElement;
        if (style) {
            divElement = createElement('div', { id: id, styles: style });
        } else {
            divElement = createElement('div', { id: id });
        }
        parentDiv.appendChild(divElement);
        return divElement;

    }
    // tslint:disable-next-line:max-line-length
    private createButtonTemplate(id: string, iconcss: string, div: HTMLElement, buttonClass: string, width: string, toolTipText: string): HTMLButtonElement {
        let buttonElement: HTMLButtonElement = createElement('Button', { id: id }) as HTMLButtonElement;
        buttonElement.style.width = width + 'px';
        buttonElement.style.height = 32 + 'px';
        div.appendChild(buttonElement);
        let btn: Button = new Button({
            cssClass: buttonClass, iconCss: iconcss
        });
        btn.appendTo(buttonElement);
        buttonElement.setAttribute('title', toolTipText);
        return buttonElement;
    }
    private createFontColorPicker = (id: string, width: number, divElement: HTMLElement, toolTipText: string): HTMLInputElement => {
        let inputElement: HTMLInputElement = createElement('input', { id: id, attrs: { 'type': 'color' } }) as HTMLInputElement;
        inputElement.style.width = width + 'px';
        divElement.appendChild(inputElement);
        this.fontColorInputElement = new ColorPicker({ value: '#000000', showButtons: true }, inputElement);
        this.fontColorInputElement.element.parentElement.setAttribute('title', toolTipText);
        return inputElement;
    }
    /**
     * Adds file colot elements to parent div.
     */
    private createColorTypeInput(elemId: string): HTMLInputElement {
        let colorType: HTMLInputElement = createElement('input', {
            id: elemId,
            attrs: { 'type': 'color' }, styles: 'position:fixed; left:-100em'
        }) as HTMLInputElement;
        this.documentEditor.getDocumentEditorElement().parentElement.appendChild(colorType);
        return colorType;
    }
    private createDropDownListForSize(fontSelectElement: HTMLElement): void {
        let fontSize: string[] = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72', '96'];
        this.fontSize = new ComboBox({
            dataSource: fontSize, popupHeight: '180px',
            popupWidth: '78px', width: '78px',
            cssClass: 'e-de-prop-dropdown',
            allowCustom: true,
            showClearButton: false
        });
        this.fontSize.focus = (): void => { this.isRetrieving = false; };
        this.fontSize.value = this.documentEditor.selection.characterFormat.fontSize.toString();
        this.fontSize.appendTo(fontSelectElement);
        this.fontSize.element.parentElement.setAttribute('title', 'Font Size');
    }

    private createDropDownListForFamily(fontSelectElement: HTMLElement): void {
        let fontStyle: { [key: string]: Object }[] = [{ FontName: 'Algerian' }, { FontName: 'Arial' },
        { FontName: 'Calibri' }, { FontName: 'Cambria' }, { FontName: 'Cambria Math' }, { FontName: 'Candara' },
        { FontName: 'Courier New' }, { FontName: 'Georgia' }, { FontName: 'Impact' }, { FontName: 'Segoe Print' },
        { FontName: 'Segoe Script' }, { FontName: 'Segoe UI' }, { FontName: 'Symbol' },
        { FontName: 'Times New Roman' }, { FontName: 'Verdana' }, { FontName: 'Windings' }
        ];
        this.fontFamily = new ComboBox({
            dataSource: fontStyle,
            query: new Query().select(['FontName']),
            fields: { text: 'FontName', value: 'FontName' },
            popupHeight: '150px',
            popupWidth: '162px', width: '162px',
            cssClass: 'e-de-prop-dropdown',
            itemTemplate: '<span style="font-family: ${FontName};">${FontName}</span>',
            allowCustom: true,
            showClearButton: false
        });
        this.fontFamily.focus = (): void => { this.isRetrieving = false; };
        this.fontFamily.appendTo(fontSelectElement);
        this.fontFamily.element.parentElement.setAttribute('title', 'Font');
    }
    public wireEvent(): void {
        this.fontFamily.addEventListener('change', (): void => { this.changeFontFamily(); });
        this.fontSize.addEventListener('change', (): void => { this.changeFontSize(); });
        this.bold.addEventListener('click', (): void => { this.isRetrieving = false; this.boldAction(); });
        this.italic.addEventListener('click', (): void => { this.isRetrieving = false; this.italicAction(); });
        this.underline.addEventListener('click', (): void => { this.isRetrieving = false; this.underlineAction(); });
        this.strikethrough.addEventListener('click', (): void => { this.isRetrieving = false; this.strikethroughAction(); });
        this.superscript.addEventListener('click', (): void => { this.isRetrieving = false; this.superscriptAction(); });
        this.subscript.addEventListener('click', (): void => { this.isRetrieving = false; this.subscriptAction(); });
        /* tslint:disable-next-line:max-line-length */
        this.fontColorInputElement.addEventListener('change', (args: ColorPickerEventArgs): void => { this.isRetrieving = false; this.changeFontColor(args); });
        this.clearFormat.addEventListener('click', (): void => { this.isRetrieving = false; this.clearFormatAction(); });
    }
    public unwireEvents(): void {
        this.fontFamily.change = undefined;
        this.fontSize.change = undefined;
        this.bold.click = undefined;
        this.italic.click = undefined;
        this.underline.click = undefined;
        this.strikethrough.click = undefined;
        this.superscript.click = undefined;
        this.subscript.click = undefined;
        this.fontColorInputElement.change = undefined;
        this.highlightColorElement.click = undefined;
        this.highlightColor.click = undefined;
        this.clearFormat.click = undefined;
    }
    private boldAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleBold();
        }
    }
    private italicAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleItalic();
        }
    }
    private underlineAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleUnderline('Single');
        }
    }
    private strikethroughAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleStrikethrough();
        }
    }
    private clearFormatAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.clearFormatting();
        }
    }
    private subscriptAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleSubscript();
        }
    }
    private superscriptAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleSuperscript();
        }
    }
    private changeFontColor = (arg: ColorPickerEventArgs): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.selection) {
            this.documentEditor.selection.characterFormat.fontColor = arg.currentValue.hex;
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private changeFontFamily = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.selection && this.fontFamily.value !== '') {
            setTimeout((): void => { this.documentEditor.selection.characterFormat.fontFamily = this.fontFamily.value as string; }, 10);
        }
    }
    private changeFontSize = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.selection && this.fontSize.value !== '') {
            setTimeout((): void => { this.documentEditor.selection.characterFormat.fontSize = this.fontSize.value as number; }, 10);
        }
    }
    public onSelectionChange(): void {
        this.isRetrieving = true;
        if (this.documentEditor.selection) {
            //#region character format
            if (this.documentEditor.selection.characterFormat.fontFamily) {
                this.fontFamily.value = this.documentEditor.selection.characterFormat.fontFamily;
            } else {
                this.fontFamily.value = '';
            }
            if (this.documentEditor.selection.characterFormat.fontSize) {
                this.fontSize.value = this.documentEditor.selection.characterFormat.fontSize.toString();
            } else {
                this.fontSize.value = '';
            }
            if (this.documentEditor.selection.characterFormat.bold) {
                if (!this.bold.classList.contains('e-btn-toggle')) {
                    this.bold.classList.add('e-btn-toggle');
                }
            } else {
                if (this.bold.classList.contains('e-btn-toggle')) {
                    this.bold.classList.remove('e-btn-toggle');
                }
            }
            if (this.documentEditor.selection.characterFormat.italic) {
                if (!this.italic.classList.contains('e-btn-toggle')) {
                    this.italic.classList.add('e-btn-toggle');
                }
            } else {
                if (this.italic.classList.contains('e-btn-toggle')) {
                    this.italic.classList.remove('e-btn-toggle');
                }
            }
            if (this.documentEditor.selection.characterFormat.underline
                && this.documentEditor.selection.characterFormat.underline !== 'None') {
                if (!this.underline.classList.contains('e-btn-toggle')) {
                    this.underline.classList.add('e-btn-toggle');
                }
            } else {
                if (this.underline.classList.contains('e-btn-toggle')) {
                    this.underline.classList.remove('e-btn-toggle');
                }
            }
            if (this.documentEditor.selection.characterFormat.strikethrough
                && this.documentEditor.selection.characterFormat.strikethrough !== 'None') {
                if (!this.strikethrough.classList.contains('e-btn-toggle')) {
                    this.strikethrough.classList.add('e-btn-toggle');
                }
            } else {
                if (this.strikethrough.classList.contains('e-btn-toggle')) {
                    this.strikethrough.classList.remove('e-btn-toggle');
                }
            }
            if (this.documentEditor.selection.characterFormat.baselineAlignment
                && this.documentEditor.selection.characterFormat.baselineAlignment === 'Subscript') {
                if (!this.subscript.classList.contains('e-btn-toggle')) {
                    this.subscript.classList.add('e-btn-toggle');
                }
            } else {
                if (this.subscript.classList.contains('e-btn-toggle')) {
                    this.subscript.classList.remove('e-btn-toggle');
                }
            }
            if (this.documentEditor.selection.characterFormat.baselineAlignment
                && this.documentEditor.selection.characterFormat.baselineAlignment === 'Superscript') {
                if (!this.superscript.classList.contains('e-btn-toggle')) {
                    this.superscript.classList.add('e-btn-toggle');
                }
            } else {
                if (this.superscript.classList.contains('e-btn-toggle')) {
                    this.superscript.classList.remove('e-btn-toggle');
                }
            }
            if (this.documentEditor.selection.characterFormat.fontColor) {
                this.fontColorInputElement.value = this.documentEditor.selection.characterFormat.fontColor;
            }
            if (this.documentEditor.selection.characterFormat.highlightColor) {
                this.highlightColorInputElement.style.backgroundColor = this.appliedHighlightColor;
                this.applyHighlightColorAsBackground(this.documentEditor.selection.characterFormat.highlightColor);
            }
            //#endregion
        }
    }
}
export class Paragraph {
    private documentEditor: DocumentEditor;
    private textProperties: HTMLElement;
    private leftAlignment: HTMLElement;
    private rightAlignment: HTMLElement;
    private centerAlignment: HTMLElement;
    private justify: HTMLElement;
    private increaseIndent: HTMLElement;
    private decreaseIndent: HTMLElement;
    private lineSpacing: DropDownButton;
    private style: DropDownList;
    private isRetrieving: boolean = false;
    private styleName: string;
    public appliedBulletStyle: string = 'dot';
    public appliedNumberingstyle: string = 'arabic';
    public appliedLineSpacing: string = '';
    private noneNumberTag: HTMLElement;
    private numberList: HTMLElement;
    private lowLetter: HTMLElement;
    private upLetter: HTMLElement;
    private lowRoman: HTMLElement;
    private upRoman: HTMLElement;
    private noneBulletTag: HTMLElement;
    private dotBullet: HTMLElement;
    private circleBullet: HTMLElement;
    private squareBullet: HTMLElement;
    private flowerBullet: HTMLElement;
    private arrowBullet: HTMLElement;
    private tickBullet: HTMLElement;
    constructor(documentEditor: DocumentEditor) {
        this.documentEditor = documentEditor;
    }

    public initializeParagraphPropertiesDiv(wholeDiv: HTMLElement): void {
        this.textProperties = wholeDiv;
        let element: string = 'font_properties';
        let paragraphDiv: HTMLElement = this.createDivTemplate(element + '_paragraph', wholeDiv, 'padding:10px;');
        let label: HTMLElement = createElement('label', { styles: 'width:26px;', className: 'e-de-prop-label' });
        label.innerHTML = 'Paragraph';
        paragraphDiv.appendChild(label);
        let styleDiv: HTMLElement = this.createDivTemplate(element + '_styleDiv', paragraphDiv, 'margin-bottom: 8px;');
        // tslint:disable-next-line:max-line-length
        let styleSelect: HTMLSelectElement = createElement('input', { id: element + '_style', styles: 'width:248px;font-size: 12px;color: #000000;letter-spacing: 0.05px;padding-left:10px;' }) as HTMLSelectElement;
        styleDiv.appendChild(styleSelect);
        this.createStyleDropDownList(styleSelect);
        let indentWholeDiv: HTMLElement = this.createDivTemplate(element + '_indentWholeDiv', paragraphDiv);
        indentWholeDiv.style.display = 'flex';
        // tslint:disable-next-line:max-line-length
        let indentDiv: HTMLElement = this.createDivTemplate(element + '_indentDiv', indentWholeDiv, 'width:164px;height:32px;display:flex;');
        indentDiv.className = 'e-de-prop-div-left e-btn-group';
        // tslint:disable-next-line:max-line-length
        this.leftAlignment = this.createButtonTemplate(element + '_leftIndent', 'e-de-icon-AlignLeft e-font-icons', indentDiv, 'e-de-prop-indent-button', '40.5', 'Align left (Ctrl+L)');
        // tslint:disable-next-line:max-line-length
        this.centerAlignment = this.createButtonTemplate(element + '_centerIndent', 'e-de-icon-AlignCenter e-font-icons', indentDiv, 'e-de-prop-indent-button', '40.5', 'Center (Ctrl+E)');
        // tslint:disable-next-line:max-line-length
        this.rightAlignment = this.createButtonTemplate(element + '_rightIndent', 'e-de-icon-AlignRight e-font-icons', indentDiv, 'e-de-prop-indent-button', '40.5', 'Align right (Ctrl+R)');
        // tslint:disable-next-line:max-line-length
        this.justify = this.createButtonTemplate(element + '_justify', 'e-de-icon-Justify e-font-icons', indentDiv, 'e-de-prop-indent-last-button', '40.5', 'Justify (Ctrl+J)');
        let incDecIndentDiv: HTMLElement = this.createDivTemplate(element + '_indentDiv', indentWholeDiv, 'width:75px;height:32px;display:flex;');
        incDecIndentDiv.className = 'e-de-prop-div-left e-btn-group';
        incDecIndentDiv.style.marginLeft = '8px';
        // tslint:disable-next-line:max-line-length
        this.decreaseIndent = this.createButtonTemplate(element + '_decreaseIndent', 'e-de-icon-DecreaseIndent e-font-icons', incDecIndentDiv, 'e-de-prop-indent-button', '37', 'Decrease indent');
        // tslint:disable-next-line:max-line-length
        this.increaseIndent = this.createButtonTemplate(element + '_increaseIndent', 'e-de-icon-IncreaseIndent e-font-icons', incDecIndentDiv, 'e-de-prop-indent-last-button', '37', 'Increase indent');
        let listDiv: HTMLElement = this.createDivTemplate(element + '_listDiv', paragraphDiv, 'margin-top:8px;display:flex;');
        let lineHeight: HTMLElement = createElement('button', { id: element + '_lineHeight' });
        listDiv.appendChild(lineHeight);
        this.lineSpacing = this.createLineSpacingDropdown(lineHeight);

        let listDropDown: HTMLElement = this.createDivTemplate(element + '_listDropDiv', listDiv);
        listDropDown.className = 'de-split-button';
        listDropDown.style.paddingLeft = '10px';
        let bulletButton: HTMLElement = createElement('button', { id: element + '_bullet' });
        listDropDown.appendChild(bulletButton);
        let numberingList: HTMLElement = createElement('button', { id: element + '_numberingList' });
        listDropDown.appendChild(numberingList);
        this.createBulletListDropButton('e-de-icon-Bullets', bulletButton);
        this.createNumberListDropButton('e-de-icon-Numbering', numberingList);
    }
    private createSeperator(parentDiv: HTMLElement): void {
        let seperator: HTMLElement = createElement('div', { className: 'e-de-prop-vline' });
        parentDiv.appendChild(seperator);
    }
    private createDivTemplate(id: string, parentDiv: HTMLElement, style?: string): HTMLElement {
        let divElement: HTMLElement;
        if (style) {
            divElement = createElement('div', { id: id, styles: style });
        } else {
            divElement = createElement('div', { id: id });
        }
        parentDiv.appendChild(divElement);
        return divElement;

    }
    // tslint:disable-next-line:max-line-length
    private createButtonTemplate(id: string, iconcss: string, div: HTMLElement, buttonClass: string, width: string, toolTipText: string): HTMLButtonElement {
        let buttonElement: HTMLButtonElement = createElement('Button', { id: id }) as HTMLButtonElement;
        buttonElement.style.width = width + 'px';
        buttonElement.style.height = 32 + 'px';
        div.appendChild(buttonElement);
        let btn: Button = new Button({
            cssClass: buttonClass, iconCss: iconcss
        });
        btn.appendTo(buttonElement);
        buttonElement.setAttribute('title', toolTipText);
        return buttonElement;
    }
    private createLineSpacingDropdown(button: HTMLElement): DropDownButton {
        let items: ItemModel[] = [{
            text: 'Single'
        }, {
            text: '1.15'
        }, {
            text: '1.5'
        }, {
            text: 'Double'
        }];
        let dropdown: DropDownButton = new DropDownButton({
            items: items,
            iconCss: 'e-de-icon-LineSpacing',
            select: this.lineSpacingAction,
            cssClass: 'e-de-prop-splitbutton',
            beforeItemRender: (args: MenuEventArgs) => {
                args.element.innerHTML = '<span></span>' + args.item.text;
                let span: HTMLElement = args.element.children[0] as HTMLElement;
                if (args.item.text === this.appliedLineSpacing) {
                    span.style.marginRight = '10px';
                    span.setAttribute('class', 'e-de-selected-item');
                } else {
                    (args.element.children[0] as HTMLElement).style.marginRight = '25px';
                    (args.element.children[0] as HTMLElement).classList.remove('e-de-selected-item');
                }
            }
        });
        dropdown.appendTo(button);
        button.setAttribute('title', 'Line spacing');
        return dropdown;
    }

    private createNumberListDropButton(iconcss: string, button: HTMLElement): void {
        let div: HTMLElement = createElement('div', { id: 'target', styles: 'width: 213px;height: auto;display:none' });
        let ulTag: HTMLElement = createElement('ul', {
            styles: 'display: block; outline: 0px;',
            id: 'listMenu',
            className: 'ui-wfloating-menu ui-bullets-menu de-list-container de-list-thumbnail'
        });
        div.appendChild(ulTag);
        this.noneNumberTag = this.createNumberNoneListTag(ulTag);
        this.noneNumberTag.addEventListener('click', this.numberedNoneClick);
        this.numberList = this.createNumberListTag(ulTag, '1.', '2.', '3.');
        this.numberList.addEventListener('click', this.numberedNumberDotClick);
        this.lowLetter = this.createNumberListTag(ulTag, 'a.', 'b.', 'c.');
        this.lowLetter.addEventListener('click', this.numberedLowLetterClick);
        this.upLetter = this.createNumberListTag(ulTag, 'A.', 'B.', 'C.');
        this.upLetter.addEventListener('click', this.numberedUpLetterClick);
        this.lowRoman = this.createNumberListTag(ulTag, 'i.', 'ii.', 'iii.');
        this.lowRoman.addEventListener('click', this.numberedLowRomanClick);
        this.upRoman = this.createNumberListTag(ulTag, 'I.', 'II.', 'III.');
        this.upRoman.addEventListener('click', this.numberedUpRomanClick);
        let menuOptions: SplitButtonModel = {
            target: div,
            iconCss: iconcss,
            cssClass: 'e-de-prop-splitbutton',
            beforeOpen: (): void => {
                this.updateSelectedNumberedListType(this.documentEditor.selection.paragraphFormat.listText);
                div.style.display = 'block';
            },
            beforeClose: (): void => {
                this.removeSelectedList();
                div.style.display = 'none';
            }
        };
        let dropdown: SplitButton = new SplitButton(menuOptions);
        dropdown.click = (): void => {
            this.applyLastAppliedNumbering();
        };
        dropdown.appendTo(button);
        button.parentElement.setAttribute('title', 'Numbering');
    }
    private applyLastAppliedNumbering = (): void => {
        switch (this.appliedNumberingstyle) {
            case 'arabic': this.numberedNumberDotClick(); break;
            case 'lowletter': this.numberedLowLetterClick(); break;
            case 'upletter': this.numberedUpLetterClick(); break;
            case 'lowroman': this.numberedLowRomanClick(); break;
            case 'uproman': this.numberedUpRomanClick(); break;
        }
    }
    private applyLastAppliedBullet = (): void => {
        switch (this.appliedBulletStyle) {
            case 'dot': this.bulletDotClick(); break;
            case 'circle': this.bulletCircleClick(); break;
            case 'square': this.bulletSquareClick(); break;
            case 'arrow': this.bulletArrowClick(); break;
            case 'tick': this.bulletTickClick(); break;
            case 'flower': this.bulletFlowerClick(); break;
        }
    }
    private createBulletListDropButton(iconcss: string, button: HTMLElement): void {
        let div: HTMLElement = createElement('div', { id: 'bullet_list', styles: 'width: 198px;height: auto;display:none' });
        let ulTag: HTMLElement = createElement('ul', {
            styles: 'display: block; outline: 0px;', id: 'listMenu',
            className: 'ui-wfloating-menu ui-bullets-menu de-list-container de-list-thumbnail'
        });
        div.appendChild(ulTag);
        this.noneBulletTag = this.createBulletListTag(ulTag, 'e-de-icon-bullet-none');
        this.noneBulletTag.addEventListener('click', this.numberedNoneClick);
        this.dotBullet = this.createBulletListTag(ulTag, 'e-de-icon-bullet-dot');
        this.dotBullet.addEventListener('click', this.bulletDotClick);
        this.circleBullet = this.createBulletListTag(ulTag, 'e-de-icon-bullet-circle');
        this.circleBullet.addEventListener('click', this.bulletCircleClick);
        this.squareBullet = this.createBulletListTag(ulTag, 'e-de-icon-bullet-square');
        this.squareBullet.addEventListener('click', this.bulletSquareClick);
        this.flowerBullet = this.createBulletListTag(ulTag, 'e-de-icon-bullet-flower');
        this.flowerBullet.addEventListener('click', this.bulletFlowerClick);
        this.arrowBullet = this.createBulletListTag(ulTag, 'e-de-icon-bullet-arrow');
        this.arrowBullet.addEventListener('click', this.bulletArrowClick);
        this.tickBullet = this.createBulletListTag(ulTag, 'e-de-icon-bullet-tick');
        this.tickBullet.addEventListener('click', this.bulletTickClick);
        let menuOptions: SplitButtonModel = {
            target: div,
            iconCss: iconcss,
            cssClass: 'e-de-prop-splitbutton',
            beforeOpen: (): void => {
                this.updateSelectedBulletListType(this.documentEditor.selection.paragraphFormat.listText);
                div.style.display = 'block';
            },
            beforeClose: (): void => {
                this.removeSelectedList();
                div.style.display = 'none';
            }
        };
        let dropdown: SplitButton = new SplitButton(menuOptions);
        dropdown.click = (): void => {
            this.applyLastAppliedBullet();
        };
        dropdown.appendTo(button);
        button.parentElement.setAttribute('title', 'Bullets');
    }
    private createNumberListTag(ulTag: HTMLElement, text1: string, text2: string, text3: string): HTMLElement {
        let liTag: HTMLElement = createElement('li', {
            styles: 'display:block',
            className: 'ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size'
        });
        ulTag.appendChild(liTag);
        let innerHTML: string = '<div>' + text1 + '<span class="ui-list-line"></span></div><div>' + text2 + '<span class="ui-list-line">';
        innerHTML += '</span></div><div>' + text3 + '<span class="ui-list-line"> </span></div >';
        let liInnerDiv: HTMLElement = createElement('div', {
            className: 'ui-list-header-presetmenu',
            id: 'ui-zlist0', innerHTML: innerHTML
        });
        liTag.appendChild(liInnerDiv);
        return liTag;
    }
    private updateSelectedBulletListType = (listText: string): void => {
        switch (listText) {
            case '\uf0b7':
                this.dotBullet.classList.add('de-list-item-selected');
                break;
            case '\uf06f' + '\u0020':
                this.circleBullet.classList.add('de-list-item-selected');
                break;
            case '\uf0a7':
                this.squareBullet.classList.add('de-list-item-selected');
                break;
            case '\uf076':
                this.flowerBullet.classList.add('de-list-item-selected');
                break;
            case '\uf0d8':
                this.arrowBullet.classList.add('de-list-item-selected');
                break;
            case '\uf0fc':
                this.tickBullet.classList.add('de-list-item-selected');
                break;
            default:
                this.noneBulletTag.classList.add('de-list-item-selected');
                break;
        }
    }
    private updateSelectedNumberedListType = (listText: string): void => {
        switch (listText) {
            case '1.':
                this.numberList.classList.add('de-list-item-selected');
                break;
            case 'I.':
                this.upRoman.classList.add('de-list-item-selected');
                break;
            case 'A.':
                this.upLetter.classList.add('de-list-item-selected');
                break;
            case 'a.':
                this.lowLetter.classList.add('de-list-item-selected');
                break;
            case 'i.':
                this.lowRoman.classList.add('de-list-item-selected');
                break;
            default:
                this.noneNumberTag.classList.add('de-list-item-selected');
                break;
        }
    }
    private removeSelectedList = (): void => {
        let className: string = 'de-list-item-selected';
        this.noneNumberTag.classList.remove(className);
        this.numberList.classList.remove(className);
        this.lowLetter.classList.remove(className);
        this.upLetter.classList.remove(className);
        this.lowRoman.classList.remove(className);
        this.upRoman.classList.remove(className);
        this.noneBulletTag.classList.remove(className);

        this.dotBullet.classList.remove(className);
        this.circleBullet.classList.remove(className);
        this.squareBullet.classList.remove(className);
        this.flowerBullet.classList.remove(className);
        this.arrowBullet.classList.remove(className);
        this.tickBullet.classList.remove(className);

    }
    private createNumberNoneListTag(ulTag: HTMLElement): HTMLElement {
        let liTag: HTMLElement = createElement('li', {
            styles: 'display:block;',
            className: 'ui-wfloating-menuitem ui-wfloating-menuitem-md de-list-items  de-list-item-size'
        });
        ulTag.appendChild(liTag);
        let innerHTML: string = '<div class="e-de-list-items-size"><span class="ui-bullets e-de-list-items-size"' +
            'style="display:table-cell; text-align: center; vertical-align:middle">None</span></div>';
        let liInnerDiv: HTMLElement = createElement('div', {
            className: 'ui-list-header-presetmenu e-de-list-items-size',
            id: 'ui-zlist0', innerHTML: innerHTML
        });
        liTag.appendChild(liInnerDiv);
        return liTag;
    }
    private createBulletListTag(ulTag: HTMLElement, iconCss: string): HTMLElement {
        let liTag: HTMLElement = createElement('li', {
            styles: 'display:block;',
            className: 'ui-wfloating-menuitem ui-wfloating-bullet-menuitem-md de-list-items  de-list-item-size'
        });
        ulTag.appendChild(liTag);
        let liInnerDiv: HTMLElement = createElement('div', { className: 'ui-bullet-list-header-presetmenu', id: 'ui-zlist0' });
        let spanDiv: HTMLElement = createElement('div');
        liInnerDiv.appendChild(spanDiv);
        let span: HTMLElement = createElement('span', { className: iconCss });
        spanDiv.appendChild(span);
        liTag.appendChild(liInnerDiv);
        return liTag;
    }
    private createStyleDropDownList(selectElement: HTMLElement): void {
        this.style = new DropDownList({
            dataSource: [{ StyleName: 'Normal', Class: 'e-font-icons e-edit-font' }],
            cssClass: 'e-de-prop-dropdown',
            query: new Query().select(['StyleName', 'Style']),
            fields: { text: 'StyleName', value: 'StyleName' },
            open: this.updateOptions,
            change: this.selectStyleValue,
            close: this.closeStyleValue,
            itemTemplate: '<span style="${Style}">${StyleName}</span>',
            footerTemplate: '<span class="create-style-footer">Manage Styles</span>'
        });
        this.style.appendTo(selectElement);
        selectElement.parentElement.setAttribute('title', 'Styles');
    }
    private updateOptions = (args: PopupEventArgs): void => {
        this.updateStyleNames();
        args.popup.element.getElementsByClassName('create-style-footer')[0].addEventListener('click', this.createStyle);
    }
    public updateStyleNames(): void {
        /* tslint:disable:no-any */
        this.styleName = !isNullOrUndefined((this.style as any).itemData) ? (this.style as any).itemData.StyleName : undefined;
        this.style.dataSource = this.constructStyleDropItems(this.documentEditor.getStyles('Paragraph'));
        this.style.dataBind();
        this.onSelectionChange();
    }
    private closeStyleValue = (args: any): void => {
        if (!isNullOrUndefined(this.styleName)) {
            this.style.value = this.styleName;
            this.style.dataBind();
        }
    }
    private createStyle = (): void => {
        this.style.hidePopup();
        if (!this.documentEditor.isReadOnly) {
            this.documentEditor.showDialog('Styles');
        }
    }
    private constructStyleDropItems(styles: Object[]): any {
        let collection: any = [];
        for (let styleObj of styles) {
            let obj: any = {};
            obj.StyleName = (styleObj as any).name;
            obj.Style = this.parseStyle((styleObj as any).style as string);
            collection.push(obj);
        }
        return collection;
    }
    private parseStyle(style: string): string {
        let domStyle: string = '';
        let styleObj: any = JSON.parse(style);
        let textDecoration: string = '';
        if (!isNullOrUndefined(styleObj.characterFormat.baselineAlignment) && styleObj.characterFormat.baselineAlignment !== 'Normal') {
            let vAlign: string = '';
            switch (styleObj.characterFormat.baselineAlignment) {
                case 'Superscript':
                    vAlign = 'super';
                    break;
                case 'Subscript':
                    vAlign = 'sub';
                    break;
            }
            if (vAlign.length > 1) {
                domStyle += 'vertical-align:' + vAlign + ';';
            }
        }
        if (!isNullOrUndefined(styleObj.characterFormat.underline) && styleObj.characterFormat.underline !== 'None') {
            textDecoration += 'underline ';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.strikethrough) && styleObj.characterFormat.strikethrough !== 'None') {
            textDecoration += 'line-through ';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.fontSize)) {
            domStyle += 'font-size:' + styleObj.characterFormat.fontSize + 'px;';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.fontFamily)) {
            domStyle += 'font-family:' + styleObj.characterFormat.fontFamily + ';';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.bold) && styleObj.characterFormat.bold) {
            domStyle += 'font-weight:bold;';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.italic) && styleObj.characterFormat.italic) {
            domStyle += 'font-style:italic;';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.fontColor)) {
            domStyle += 'color: ' + styleObj.characterFormat.fontColor + ';';
        }
        if (textDecoration.length > 1) {
            domStyle += 'text-decoration:' + textDecoration + ';';
        }
        return domStyle;
    }
    /* tslint:enable:no-any */
    public wireEvent(): void {
        this.leftAlignment.addEventListener('click', (): void => { this.leftAlignmentAction(); });
        this.rightAlignment.addEventListener('click', (): void => { this.rightAlignmentAction(); });
        this.centerAlignment.addEventListener('click', (): void => { this.centerAlignmentAction(); });
        this.justify.addEventListener('click', (): void => { this.justifyAction(); });
        this.increaseIndent.addEventListener('click', (): void => { this.increaseIndentAction(); });
        this.decreaseIndent.addEventListener('click', (): void => { this.decreaseIndentAction(); });
        /* tslint:disable-next-line:max-line-length */
        this.lineSpacing.addEventListener('select', (args: MenuEventArgs): void => { this.lineSpacingAction(args); });
    }
    public unwireEvents(): void {
        this.leftAlignment.click = undefined;
        this.rightAlignment.click = undefined;
        this.centerAlignment.click = undefined;
        this.justify.click = undefined;
        this.increaseIndent.click = undefined;
        this.decreaseIndent.click = undefined;
        this.lineSpacing.select = undefined;
        this.style.select = undefined;
    }
    private leftAlignmentAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleTextAlignment('Left');
        }
    }
    private lineSpacingAction = (args: MenuEventArgs) => {
        if (this.isRetrieving) {
            return;
        }
        let text: string = args.item.text;
        switch (text) {
            case 'Single':
                this.documentEditor.selection.paragraphFormat.lineSpacing = 1;
                break;
            case '1.15':
                this.documentEditor.selection.paragraphFormat.lineSpacing = 1.15;
                break;
            case '1.5':
                this.documentEditor.selection.paragraphFormat.lineSpacing = 1.5;
                break;
            case 'Double':
                this.documentEditor.selection.paragraphFormat.lineSpacing = 2;
                break;
        }
        setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
    }
    private setLineSpacing(): void {
        let lineSpacing: number = this.documentEditor.selection.paragraphFormat.lineSpacing;
        if (lineSpacing === 1) {
            this.appliedLineSpacing = 'Single';
        } else if (lineSpacing === 1.15) {
            this.appliedLineSpacing = '1.15';
        } else if (lineSpacing === 1.5) {
            this.appliedLineSpacing = '1.5';
        } else if (lineSpacing === 2) {
            this.appliedLineSpacing = 'Double';
        } else {
            this.appliedLineSpacing = '';
        }
    }
    private selectStyleValue = (args: ChangeEventArgs): void => {
        if (this.isRetrieving || !args.isInteracted) {
            return;
        }
        setTimeout((): void => { this.applyStyleValue(args); }, 10);
    }
    /* tslint:disable:no-any */
    private applyStyleValue(args: any): void {
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.applyStyle(args.itemData.StyleName);
        }
    }
    /* tslint:enable:no-any */
    private rightAlignmentAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleTextAlignment('Right');
        }
    }
    private centerAlignmentAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleTextAlignment('Center');
        }
    }

    private justifyAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.toggleTextAlignment('Justify');
        }
    }
    private increaseIndentAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.increaseIndent();
        }
    }
    private decreaseIndentAction = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editor) {
            this.documentEditor.editor.decreaseIndent();
        }
    }
    private numberedNoneClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.documentEditor.editor.clearList();
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private numberedNumberDotClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedNumberingstyle = 'arabic';
            this.documentEditor.editor.applyNumbering('%1.', 'Arabic');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private numberedUpRomanClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedNumberingstyle = 'uproman';
            this.documentEditor.editor.applyNumbering('%1.', 'UpRoman');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private numberedUpLetterClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedNumberingstyle = 'upletter';
            this.documentEditor.editor.applyNumbering('%1.', 'UpLetter');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private numberedLowLetterClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedNumberingstyle = 'lowletter';
            this.documentEditor.editor.applyNumbering('%1.', 'LowLetter');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private numberedLowRomanClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedNumberingstyle = 'lowroman';
            this.documentEditor.editor.applyNumbering('%1.', 'LowRoman');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private bulletDotClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedBulletStyle = 'dot';
            this.documentEditor.editor.applyBullet('\uf0b7', 'Symbol');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private bulletCircleClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedBulletStyle = 'circle';
            this.documentEditor.editor.applyBullet('\uf06f' + '\u0020', 'Symbol');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private bulletSquareClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedBulletStyle = 'square';
            this.documentEditor.editor.applyBullet('\uf0a7', 'Wingdings');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private bulletFlowerClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedBulletStyle = 'flower';
            this.documentEditor.editor.applyBullet('\uf076', 'Wingdings');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private bulletArrowClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedBulletStyle = 'arrow';
            this.documentEditor.editor.applyBullet('\uf0d8', 'Wingdings');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    private bulletTickClick = (): void => {
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editor) {
            this.appliedBulletStyle = 'tick';
            this.documentEditor.editor.applyBullet('\uf0fc', 'Wingdings');
            setTimeout((): void => { this.documentEditor.focusIn(); }, 30);
        }
    }
    public onSelectionChange(): void {
        this.isRetrieving = true;
        if (this.documentEditor.editor) {
            //#region paragraph format
            let style: string = this.documentEditor.selection.paragraphFormat.styleName;
            if (style) {
                this.style.value = style;
                this.style.dataBind();
            } else {
                this.style.value = '';
            }
            if (this.documentEditor.selection.paragraphFormat.textAlignment === 'Left') {
                if (!this.leftAlignment.classList.contains('e-btn-toggle')) {
                    this.leftAlignment.classList.add('e-btn-toggle');
                }
                if (this.rightAlignment.classList.contains('e-btn-toggle')) {
                    this.rightAlignment.classList.remove('e-btn-toggle');
                }
                if (this.centerAlignment.classList.contains('e-btn-toggle')) {
                    this.centerAlignment.classList.remove('e-btn-toggle');
                }
                if (this.justify.classList.contains('e-btn-toggle')) {
                    this.justify.classList.remove('e-btn-toggle');
                }
            } else if (this.documentEditor.selection.paragraphFormat.textAlignment === 'Right') {
                if (this.leftAlignment.classList.contains('e-btn-toggle')) {
                    this.leftAlignment.classList.remove('e-btn-toggle');
                }
                if (!this.rightAlignment.classList.contains('e-btn-toggle')) {
                    this.rightAlignment.classList.add('e-btn-toggle');
                }
                if (this.centerAlignment.classList.contains('e-btn-toggle')) {
                    this.centerAlignment.classList.remove('e-btn-toggle');
                }
                if (this.justify.classList.contains('e-btn-toggle')) {
                    this.justify.classList.remove('e-btn-toggle');
                }
            } else if (this.documentEditor.selection.paragraphFormat.textAlignment === 'Center') {
                if (this.leftAlignment.classList.contains('e-btn-toggle')) {
                    this.leftAlignment.classList.remove('e-btn-toggle');
                }
                if (this.rightAlignment.classList.contains('e-btn-toggle')) {
                    this.rightAlignment.classList.remove('e-btn-toggle');
                }
                if (!this.centerAlignment.classList.contains('e-btn-toggle')) {
                    this.centerAlignment.classList.add('e-btn-toggle');
                }
                if (this.justify.classList.contains('e-btn-toggle')) {
                    this.justify.classList.remove('e-btn-toggle');
                }
            } else if (this.documentEditor.selection.paragraphFormat.textAlignment === 'Justify') {
                if (this.leftAlignment.classList.contains('e-btn-toggle')) {
                    this.leftAlignment.classList.remove('e-btn-toggle');
                }
                if (this.rightAlignment.classList.contains('e-btn-toggle')) {
                    this.rightAlignment.classList.remove('e-btn-toggle');
                }
                if (this.centerAlignment.classList.contains('e-btn-toggle')) {
                    this.centerAlignment.classList.remove('e-btn-toggle');
                }
                if (!this.justify.classList.contains('e-btn-toggle')) {
                    this.justify.classList.add('e-btn-toggle');
                }
            } else if (this.documentEditor.selection.paragraphFormat.textAlignment === 'Justify') {
                if (this.leftAlignment.classList.contains('e-btn-toggle')) {
                    this.leftAlignment.classList.remove('e-btn-toggle');
                }
                if (this.rightAlignment.classList.contains('e-btn-toggle')) {
                    this.rightAlignment.classList.remove('e-btn-toggle');
                }
                if (this.centerAlignment.classList.contains('e-btn-toggle')) {
                    this.centerAlignment.classList.remove('e-btn-toggle');
                }
                if (!this.justify.classList.contains('e-btn-toggle')) {
                    this.justify.classList.add('e-btn-toggle');
                }
            }
            //#endregion
        }
        this.setLineSpacing();
        this.isRetrieving = false;
    }
}