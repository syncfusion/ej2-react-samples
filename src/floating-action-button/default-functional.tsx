import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { FabComponent } from "@syncfusion/ej2-react-buttons";
import { updateSampleSection } from '../common/sample-base';
import './default.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (<div className='control-pane'>
        <div className="control-section">
            <div className="fab-default-container">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div id="target1" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                        </div>
                        <div id="target2" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div id="target3" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                        </div>
                        <div id="target4" className="col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index">
                        </div>
                    </div>
                </div>

                {/* Icon and isPrimary is false */}
                <FabComponent id="fab1" iconCss='e-icons e-people'
                    isPrimary={false} position='MiddleCenter' title="Contact" target='#target1'></FabComponent>

                {/* Icon with Label */}
                <FabComponent id="fab2" iconCss='e-icons e-people'
                    content="Contact" position='MiddleCenter' target='#target2'></FabComponent>

                {/* Icon with Disabled true */}
                <FabComponent id="fab3" content='Disabled'
                    disabled={true} iconCss='e-icons e-people'
                    position='MiddleCenter' target='#target3'></FabComponent>

                {/* Label only */}
                <FabComponent id="fab4" content='Text Content'
                    cssClass='e-warning' position='MiddleCenter' target='#target4'></FabComponent>
            </div>
        </div>
        <div id="action-description">
            <p>
                This sample demonstrates the default functionalities of the Floating Action Button (FAB).
            </p>
        </div>
        <div id="description">
            <p>
                In this example, each FAB showcases the usage of <code>iconCss</code>,<code>cssClass</code>, <code>content</code> and <code>disabled</code> properties, such as:
            </p>
            <ul>
                <li>Icon only FAB</li>
                <li>Icon with label FAB</li>
                <li>Disabled FAB</li>
                <li>Label Only FAB</li>
            </ul>
        </div>
    </div>
    )
}
export default Default;