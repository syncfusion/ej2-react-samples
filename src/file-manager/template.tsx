import * as React from 'react';
import { createRoot as reactCreateRoot } from 'react-dom/client';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-react-filemanager';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import './template.css';

const hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
const actionItems: ItemModel[] = [
  { text: 'Open', iconCss: 'e-icons e-folder-open' },
  { text: 'Download', iconCss: 'e-icons e-download' },
  { text: 'Refresh', iconCss: 'e-icons e-refresh' },
  { text: 'Delete', iconCss: 'e-icons e-trash' },
];

export class Template extends SampleBase<{}, {}> {
  private fmRef: FileManagerComponent;

  formatSize = (bytes: number): string => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let value = bytes;
    while (value >= 1024 && i < sizes.length - 1) {
      value /= 1024;
      i++;
    }
    return `${value.toFixed(1)} ${sizes[i]}`;
  };

  getIconsForFolders(item: any): string {
    const iconMap: Record<string, string> = {
      Files: 'e-folder',
      Documents: 'e-file-document',
      Downloads: 'e-download',
      Pictures: 'e-thumbnail',
      Music: 'e-file-format',
      Videos: 'e-video',
      Employees: 'e-export-png',
      Food: 'e-export-png',
      Nature: 'e-export-png',
    };
    return iconMap[item.name] || 'e-folder';
  }

  getFileIconCssClass(item: any): string {
    if (!item.isFile) return '';
    const extensionMap: Record<string, string> = {
      jpg: 'image',
      jpeg: 'image',
      png: 'image',
      gif: 'image',
      mp3: 'music',
      wav: 'music',
      mp4: 'video',
      avi: 'video',
      doc: 'doc',
      docx: 'docx',
      ppt: 'pptx',
      pptx: 'pptx',
      xls: 'xlsx',
      xlsx: 'xlsx',
      txt: 'txt',
      js: 'js',
      css: 'css',
      html: 'html',
      exe: 'exe',
      msi: 'msi',
      php: 'php',
      xml: 'xml',
      zip: 'zip',
      rar: 'rar',
      pdf: 'pdf',
    };
    const extension = (item.name.split('.').pop() || '').toLowerCase();
    const iconType = extensionMap[extension] || 'unknown';
    return `e-list-icon e-fe-${iconType}`;
  }

  getBackgroundCss(item: any): string {
    const NamedFileBackgrounds: Record<string, string> = {
      'Adam.png': 'background-Adam',
      'Andrew.png': 'background-Andrew',
      'Ellie.png': 'background-Ellie',
      'Jameson.png': 'background-Jameson',
      'John.png': 'background-John',
      'Josie.png': 'background-Josie',
      'Apple pie.png': 'background-Applepie',
      'Bread.png': 'background-Bread',
      'Doughnut.png': 'background-Doughnut',
      'Nuggets.png': 'background-Nuggets',
      'Sugar cookie.png': 'background-Sugarcookie',
      'bird.jpg': 'background-bird',
      'sea.jpg': 'background-sea',
      'seaview.jpg': 'background-seaview',
      'snow.jpg': 'background-snow',
      'snowfall.jpg': 'background-snowfall',
    };

    const ExtensionBackgrounds: Record<string, string> = {
      jpg: 'background-jpg',
      jpeg: 'background-jpg',
      png: 'background-png',
      pptx: 'background-pptx',
      pdf: 'background-pdf',
      mp4: 'background-video',
      mp3: 'background-audio',
      docx: 'background-doc',
      txt: 'background-txt',
      xlsx: 'background-xlsx',
    };

    if (!item.isFile) return 'file-icon background-folder';
    if (NamedFileBackgrounds[item.name]) return `file-icon ${NamedFileBackgrounds[item.name]}`;
    const ext = item.name.split('.').pop().toLowerCase();
    return `file-icon ${ExtensionBackgrounds[ext] || 'background-default'}`;
  }

  onActionSelect = (action: string, item: { name: string; isFile: boolean }) => {
    if (!this.fmRef) return;
    switch (action) {
      case 'Open': this.fmRef.openFile(item.name); break;
      case 'Download': this.fmRef.downloadFiles([item.name]); break;
      case 'Refresh': this.fmRef.refreshFiles(); break;
      case 'Delete': this.fmRef.deleteFiles([item.name]); break;
      default: break;
    }
  };

  renderDDBIntoHost = (hostEl: HTMLElement) => {
    const fileName = hostEl.getAttribute('data-name') || '';
    const isFile = (hostEl.getAttribute('data-isfile') || 'false') === 'true';
    const items = isFile ? actionItems.filter(i => i.text !== 'Open') : actionItems;

    const onSelect = (args: any) => {
      const action = args?.item?.text || '';
      this.onActionSelect(action, { name: fileName, isFile });
    };

    if (!hostEl.hasAttribute('data-ddb-initialized')) {
      const root = reactCreateRoot(hostEl);
      root.render(
        <DropDownButtonComponent
          items={items}
          cssClass="e-caret-hide filemanager-dropdown-button"
          iconCss="e-icons e-more-vertical-1"
          select={onSelect}
        />
      );
      hostEl.setAttribute('data-ddb-initialized', 'true');
    }
  };

  menuOpen = (args: any) => {
    args.cancel = true;
  };

  fileLoad = (args: any) => {
    const validModules = ['DetailsView', 'LargeIconsView'];
    if (validModules.indexOf(args.module) !== -1) {
      setTimeout(() => {
        const actionBtn = args.element.querySelector('.action-ddb') as HTMLElement;
        if (actionBtn && !actionBtn.hasAttribute('data-ddb-initialized')) {
          this.renderDDBIntoHost(actionBtn);
        }
      }, 10);
    }
  };

  largeIconsTemplate = (item: any): JSX.Element => {
    const formattedDate = item.dateCreated
      ? new Date(item.dateCreated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

    const iconClass = this.getFileIconCssClass(item);
    const backgroundClass = this.getBackgroundCss(item);

    return (
      <div className="custom-icon-card">
        <div className="file-header">
          <div className="left-info">
            {item.isFile && <div className={iconClass}></div>}
            <div className="file-name" title={item.name}>{item.name}</div>
          </div>
          <div className="action-ddb" data-name={item.name} data-isfile={item.isFile}></div>
        </div>
        <div className={backgroundClass} title={item.name}></div>
        <div className="file-formattedDate">Created on {formattedDate}</div>
      </div>
    );
  };

  navigationPaneTemplate = (item: any): JSX.Element => {
    const iconClass = this.getIconsForFolders(item);
    return (
      <div className="e-nav-pane-node" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <span className={`e-icons ${iconClass}`}></span>
        <span className="folder-name" style={{ marginLeft: 8 }}>{item.name}</span>
      </div>
    );
  };

  detailsViewSettings = {
    columns: [
      {
        field: 'name',
        headerText: 'Name',
        template: (item: any): JSX.Element => <div>{item.name}</div>,
      },
      {
        field: 'size',
        headerText: 'Size',
        template: (item: any): JSX.Element => <div>{item.isFile ? this.formatSize(item.size) : '-'}</div>,
      },
      {
        field: '_fm_modified',
        headerText: 'DateModified',
        format: 'MM/dd/yyyy hh:mm a',
      },
      {
        headerText: 'Actions',
        template: (item: any): JSX.Element => (
          <div className="action-ddb" data-name={item.name} data-isfile={item.isFile}></div>
        ),
      },
    ],
  };

  render(): JSX.Element {
    return (
      <div className="control-section">
        <div className="sample-container">
          <FileManagerComponent
            id="template_filemanager"
            ref={(scope) => { this.fmRef = scope; }}
            ajaxSettings={{
              url: `${hostUrl}api/FileManager/FileOperations`,
              uploadUrl: `${hostUrl}api/FileManager/Upload`,
              downloadUrl: `${hostUrl}api/FileManager/Download`,
              getImageUrl: `${hostUrl}api/FileManager/GetImage`,
            }}
            cssClass="e-fm-template-sample"
            height="600px"
            menuOpen={this.menuOpen}
            fileLoad={this.fileLoad}
            detailsViewSettings={this.detailsViewSettings}
            largeIconsTemplate={this.largeIconsTemplate}
            navigationPaneTemplate={this.navigationPaneTemplate}
          >
            <Inject services={[NavigationPane, DetailsView, Toolbar]} />
          </FileManagerComponent>
        </div>

        <div id="action-description">
          <p>This sample showcases how to customize the Syncfusion File Manager's control with template support in the Navigation pane, Large icons and Details view.</p>
        </div>

        <div id="description">
          <p>
              The <code>navigationPaneTemplate</code> renders the nodes with icons based on folder names, while the<code>largeIconsTemplate</code> displays files with styled backgrounds and a action menu in each file/folder.
              The <code>detailsViewSettings</code> template shows file information like name, size, and modified date in columns.
              File operations such as Open, Delete, Download, and Refresh are handled through a dropdown menu option showed in each item,
              and the <code>select</code> initiates each action to the corresponding File Manager methods (<code>openFile</code>,
              <code>downloadFiles</code>, <code>deleteFiles</code>, and <code>refreshFiles</code>).
          </p>
        </div>
      </div>
    );
  }
}