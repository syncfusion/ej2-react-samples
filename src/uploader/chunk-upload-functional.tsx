import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './uploader.css';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, RemovingEventArgs} from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Browser, isNullOrUndefined } from '@syncfusion/ej2-base';

const ChunkUpload = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // Uploader component
    const [chunkSize, setChunkSize] = useState<number>(500000);
    let uploadObj = useRef<UploaderComponent>(null);
    let ddlDatas: { [key: string]: Object }[];
    let fields: object;
    const value: number = 0;
    let isInteraction: boolean;
    let asyncSettings: object;
    let autoUpload: boolean;
    ddlDatas = [
        { value: 500000, size: '500 KB' },
        { value: 1000000, size: '1 MB' },
        { value: 2000000, size: '2 MB' }
    ];
    fields = { text: 'size', value: 'value' };
    isInteraction = false;
    asyncSettings = {
        saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
        chunkSize: chunkSize
    };
    autoUpload = false;
    const onChange = (args: ChangeEventArgs): void => {
        setChunkSize(parseInt(args.itemData.value, 10));
    }
    const onRemoveFile = (args: RemovingEventArgs): void => {
        args.postRawFile = false;
    }
    // to update flag variable value for automatic pause and resume
    const onPausing = (args: any): void => {
        if (args.event !== null && !navigator.onLine) {
            isInteraction = true;
        } else {
            isInteraction = false;
        }
    }
    // to update flag variable value for automatic pause and resume
    const onResuming = (args: any): void => {
        if (args.event !== null && !navigator.onLine) {
            isInteraction = true;
        } else {
            isInteraction = false;
        }
    }   
    // to prevent triggering chunk-upload failure event and to pause uploading on network failure
    const onBeforeFailure = (args: any): void => {
        let proxy: any = this;
        args.cancel = !isInteraction;
        // interval to check network availability on every 500 milliseconds
        let clearTimeInterval: any = setInterval((): void => {
        if (navigator.onLine && !isNullOrUndefined(proxy.uploadObj.filesData[0]) && proxy.uploadObj.filesData[0].statusCode == 4) {
            proxy.uploadObj.resume(proxy.uploadObj.filesData);
            clearSetInterval();
        }else {
            if (!proxy.isInteraction && !isNullOrUndefined(proxy.uploadObj.filesData[0]) && proxy.uploadObj.filesData[0].statusCode == 3) {
                proxy.uploadObj.pause(proxy.uploadObj.filesData);
            }
        } }, 500);
        // clear Interval after when network is available.
        const clearSetInterval = (): void => {
            clearInterval(clearTimeInterval);
        }
    }
    return (
      <div className = 'control-pane'>
        <div className='control-section row uploadpreview'>
          <div className='col-lg-8'>
            <div className='upload_wrapper'>
              {/* Render Uploader */}
              <UploaderComponent id='chunkUpload' type='file' ref = {uploadObj} asyncSettings = {asyncSettings} autoUpload = {autoUpload} removing= {onRemoveFile.bind(this)} pausing= {onPausing.bind(this)} resuming= {onResuming.bind(this)} chunkFailure= {onBeforeFailure.bind(this)}></UploaderComponent>
            </div>
          </div>
          <div className='col-lg-4 property-section' id="chunk-size">
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" className='chunk-table'>
                <tbody>
                  <tr>
                    <td className='chunk-td'>Chunk Size</td>
                    <td>
                      <DropDownListComponent id="chunksize" index = {value}  dataSource={ddlDatas} fields={fields} change={onChange.bind(this)} placeholder="Select chunk size" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>
            This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates the chunk upload functionalities of the Uploader component.
            Browse or drag-and-drop a large file to upload with pause, resume, and retry options.
          </p>
          <p>Also, configured property panel to change the chunk size dynamically.</p>
        </div>
        <div id="description">
          <p>
            When the file size is large or transfer the file with slow network connection, the chunk upload feature slices the files and upload the sliced chunks to server in sequential order
            using the <a href="https://ej2.syncfusion.com/react/documentation/api/uploader/asyncSettingsModel#chunksize" target="_blank">&nbsp;chunkSize</a> API. It will slice the files and upload it in sequential order.
          </p>          
          <p>The sample is configured with the following options:</p>
          <ul>
            <li>While uploading, you can pause the upload and resume it later.</li>
            <li> If the upload fails, retry option will be enabled.</li>
            <li> The sample is configured with maximum file size as `100 MB` to upload.</li>
          </ul>
          <h4>Automatic pause and resume</h4>
          <p>
            If the application lost its connection (<code>offline</code>), the upload component pauses the process automatically. After the connection is up (<code>online</code>), the upload component will resume its process.
          </p>
          <p>More information on the Uploader instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/chunk-upload/">documentation section</a>.</p>
        </div>
      </div>
    );
}
export default ChunkUpload;