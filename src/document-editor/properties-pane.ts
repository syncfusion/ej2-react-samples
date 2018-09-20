import { DocumentEditor } from '@syncfusion/ej2-documenteditor';
import { TextProperties } from './text-properties-pane';
import { TableProperties } from './table-properties-pane';
import { HeaderFooterProperties } from './header-footer-pane';
import { ImageProperties } from './image-properties-pane';
import { TocProperties } from './table-of-contents-pane';
import { createElement } from '@syncfusion/ej2-base';

/**
 * Represents properties pane.
 */
export class PropertiesPane {
    private documentEditor: DocumentEditor;
    public textProperties: TextProperties;
    public tableProperties: TableProperties;
    public headerFooterProperties: HeaderFooterProperties;
    public imageProperties: ImageProperties;
    public tocProperties: TocProperties;
    public element: HTMLElement;
    // tslint:disable-next-line:max-line-length
    constructor(docEditor: DocumentEditor, text: TextProperties, table: TableProperties, headerFooter: HeaderFooterProperties, image: ImageProperties, toc: TocProperties) {
        this.documentEditor = docEditor;
        this.textProperties = text;
        this.tableProperties = table;
        this.imageProperties = image;
        this.headerFooterProperties = headerFooter;
        this.tocProperties = toc;
        this.initializeProperitesPane();
    }
    private initializeProperitesPane = (): void => {
        this.element = createElement('div', { className: 'e-de-property-pane' });
        this.element.appendChild(this.textProperties.element);
        this.element.appendChild(this.tableProperties.element);
        this.element.appendChild(this.headerFooterProperties.element);
        this.element.appendChild(this.imageProperties.element);
        this.element.appendChild(this.tocProperties.element);
        this.documentEditor.element.parentElement.appendChild(this.element);
    }
    public showPropertiesPane = (isShow: boolean): void => {
        this.element.style.display = isShow ? 'block' : 'none';
        this.documentEditor.resize();
    }
}