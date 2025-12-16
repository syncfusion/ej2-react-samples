import * as React from 'react';
import { useRef, useEffect } from 'react';
import { createRoot as reactCreateRoot } from 'react-dom/client';
import { updateSampleSection } from '../common/sample-base';
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

const Template = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);

  const fmRef = useRef<FileManagerComponent>(null);

  const formatSize = (bytes: number): string => {
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

  const getBackgroundCss = (item: any): string => {
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
      'snowfall.jpg': 'background-snowfall'
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
      xlsx: 'background-xlsx'
    };

    if (!item.isFile) return 'file-icon background-folder';
    if (NamedFileBackgrounds[item.name]) return `file-icon ${NamedFileBackgrounds[item.name]}`;
    const ext = (item.name.split('.').pop() || '').toLowerCase();
    return `file-icon ${ExtensionBackgrounds[ext] || 'background-default'}`;
  };

  const getIconsForFolders = (item: any): string => {
    const iconMap: Record<string, string> = {
      Files: 'e-folder',
      Documents: 'e-file-document',
      Downloads: 'e-download',
      Pictures: 'e-thumbnail',
      Music: 'e-file-format',
      Videos: 'e-video',
      Employees: 'e-export-png',
      Food: 'e-export-png',
      Nature: 'e-export-png'
    };
    return iconMap[item.name] || 'e-folder';
  };

  const getFileIconCssClass = (item: any): string => {
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
      pdf: 'pdf'
    };
    const extension = (item.name.split('.').pop() || '').toLowerCase();
    const iconType = extensionMap[extension] || 'unknown';
    return `e-list-icon e-fe-${iconType}`;
  };

  const onActionSelect = (action: string, item: { name: string; isFile: boolean }) => {
    if (!fmRef.current) return;
    switch (action) {
      case 'Open':
        fmRef.current.openFile(item.name);
        break;
      case 'Download':
        fmRef.current.downloadFiles([item.name]);
        break;
      case 'Refresh':
        fmRef.current.refreshFiles();
        break;
      case 'Delete':
        fmRef.current.deleteFiles([item.name]);
        break;
      default:
        break;
    }
  };

  // Render DropDownButtonComponent (React) into each action host
  const renderDDBIntoHost = (hostEl: HTMLElement) => {
    const fileName = hostEl.getAttribute('data-name') || '';
    const isFile = (hostEl.getAttribute('data-isfile') || 'false') === 'true';
    const items = isFile ? actionItems.filter(i => i.text !== 'Open') : actionItems;

    const onSelect = (args: any) => {
      const action = args?.item?.text || '';
      onActionSelect(action, { name: fileName, isFile });
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

  const menuOpen = (args: any) => {
    args.cancel = true;
  };

  const fileLoad = (args: any) => {
    const validModules = ['DetailsView', 'LargeIconsView'];
    if (validModules.indexOf(args.module) !== -1) {
      setTimeout(() => { 
        const actionBtn = args.element.querySelector('.action-ddb') as HTMLElement;
        if (actionBtn && !actionBtn.hasAttribute('data-ddb-initialized')) {
          renderDDBIntoHost(actionBtn);
        }
      }, 10);
      
    }
  };

  const detailsViewSettings = {
    columns: [
      {
        field: 'name',
        headerText: 'Name',
        template: (item: any): JSX.Element => (
          <div>{item.name}</div>
        )
      },
      {
        field: 'size',
        headerText: 'Size',
        template: (item: any): JSX.Element => (
          <div>{item.isFile ? formatSize(item.size) : '-'}</div>
        )
      },
      {
        field: '_fm_modified',
        headerText: 'DateModified',
        format: 'MM/dd/yyyy hh:mm a'
      },
      {
        headerText: 'Actions',
        template: (item: any): JSX.Element => (
          <div
            className="action-ddb"
            data-name={item.name}
            data-isfile={item.isFile}
          />
        )
      }
    ]
  };

  const largeIconsTemplate = (item: any): JSX.Element => {
    const formattedDate = item.dateCreated
      ? new Date(item.dateCreated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

    const iconClass = getFileIconCssClass(item);
    const backgroundClass = getBackgroundCss(item);

    return (
      <div className="custom-icon-card">
        <div className="file-header">
          <div className="left-info">
            {item.isFile && <div className={iconClass}></div>}
            <div className="file-name" title={item.name}>
              {item.name}
            </div>
          </div>
          <div
            className="action-ddb"
            data-name={item.name}
            data-isfile={item.isFile}
          ></div>
        </div>
        <div className={backgroundClass} title={item.name}></div>
        <div className="file-formattedDate">Created on {formattedDate}</div>
      </div>
    );
  };

  const navigationPaneTemplate = (item: any): JSX.Element => {
    const iconClass = getIconsForFolders(item);
    return (
      <div className="e-nav-pane-node" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <span className={`e-icons ${iconClass}`}></span>
        <span className="folder-name" style={{ marginLeft: 8 }}>{item.name}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="control-section">
        <div className="sample-container">
          <FileManagerComponent
            id="template_filemanager"
            ref={fmRef}
            ajaxSettings={{
              url: `${hostUrl}api/FileManager/FileOperations`,
              uploadUrl: `${hostUrl}api/FileManager/Upload`,
              downloadUrl: `${hostUrl}api/FileManager/Download`,
              getImageUrl: `${hostUrl}api/FileManager/GetImage`
            }}
            cssClass="e-fm-template-sample"
            height="600px"
            detailsViewSettings={detailsViewSettings as any}
            largeIconsTemplate={largeIconsTemplate as any}
            navigationPaneTemplate={navigationPaneTemplate as any}
            menuOpen={menuOpen}
            fileLoad={fileLoad}
          >
            <Inject services={[NavigationPane, DetailsView, Toolbar]} />
          </FileManagerComponent>
        </div>
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
};

export default Template;