import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BreadcrumbComponent } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './bind-to-location.css';

export class BindToLocation extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-12 control-section">
                    <div className="content-wrapper breadcrumb-control-wrapper">
                        <div className="row material2">
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                <h5>Bind to Location</h5>
                            </div>
                        </div>
                        <div className="row material2">
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                <BreadcrumbComponent enableNavigation={false}></BreadcrumbComponent>
                            </div>
                        </div>
                        <div className="row material2">
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                <h5>URL Binding</h5>
                            </div>
                        </div>
                        <div className="row material2">
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                <BreadcrumbComponent enableNavigation={false} url="https://ej2.syncfusion.com/demos/breadcrumb/bind-to-location"></BreadcrumbComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p> This sample demonstrates the Navigation functionality of the <b>Breadcrumb</b> component.</p>
                </div>
                <div id='description'>
                    <p>The <code>Breadcrumb</code> component can be rendered by using the href(url) of the current page or by using <code>url</code> property when the user is not specified the breadcrumb items using <code>BreadcrumbItemDirective</code> tag.</p>
                    <p>More information about <code>Breadcrumb</code> component navigations feature can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/">documentation section</a>.</p>
                </div>
            </div>
        );
    }
}
