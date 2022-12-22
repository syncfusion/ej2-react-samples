import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import './icons.css';
import * as dataSource from './icons-data.json';
import { cssClass } from '@syncfusion/ej2-lists';

function Icons() {
    React.useEffect(() => {
        updateSampleSection();
        }, [])

    let data = dataSource as any;
    let fields: Object = { dataSource: data.iconData, value: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };

    return (
      <div className='control-pane'>
        <div className='control-section dropdowntree-icons'>
          <div className='control_wrapper'>
            {/* Render the Dropdown Tree with image icons */}
            <DropDownTreeComponent fields={fields} placeholder="Select a folder or file" popupHeight="200px" cssClass="dropdowntree-icon" />
          </div>
        </div>
        <div id="action-description">
          <p>This sample explains you about the Dropdown Tree item that can be configured by the icons or images. Click on the
            icon or double click on it to expand or collapse and to show the icons or images that are configured with the
            items.</p>
        </div>
        <div id="description">
          <p>The <code>Dropdown Tree</code> component has the built-in option to customize each item's appearance with the
            icons and images by mapping the <code>iconCss</code> and <code>imageUrl</code> fields.</p>
          <p>In this demo, the Dropdown Tree is showcased like a file system with custom icons and images.</p>
        </div>
      </div>
    )
}
export default Icons;
