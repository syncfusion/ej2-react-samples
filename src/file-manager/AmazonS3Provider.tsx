import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with Amazon S3 file provider service
 */
export class AmazonS3Provider extends SampleBase<{},{}> {

    private hostUrl: string = "https://amazons3.azurewebsites.net/api/AmazonS3Provider/";
    public render(): JSX.Element {
        return(
            <div>
                <div className="control-section">
                    <FileManagerComponent id="filemanager" ajaxSettings = {{
                             url: this.hostUrl +'AmazonS3FileOperations',
                             getImageUrl: this.hostUrl + 'AmazonS3GetImage',
                             uploadUrl: this.hostUrl + 'AmazonS3Upload',
                             downloadUrl: this.hostUrl + 'AmazonS3Download'
                    }} searchSettings={{allowSearchOnTyping: false}}
                    toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}}
                    contextMenuSettings={{
                    layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll']}}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar, ContextMenu]} />
                    </FileManagerComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to utilize the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-amazon-s3-aspcore-file-provider">Amazon S3 file system provider</a> to manage the files in File Manager component. To run the service, create an Amazon S3 account and a S3 bucket and then register your amazon S3 client account details like <b>bucketName</b>, <b>awsAccessKeyId</b>, <b>awsSecretKeyId</b> and <b>awsRegion</b> details in <code>RegisterAmazonS3</code> method to perform the file operations.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows. It supports all the basic file operations such as create, rename, delete and so on.</p>
                    <p><b>Note: </b>File Manager’s upload functionality is restricted in online demo. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-amazon-s3-aspcore-file-provider">Amazon S3 File Provider</a> from the GitHub repository.</p>
                </div>
            </div>
        );
    }
}
