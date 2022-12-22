import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BreadcrumbComponent, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { getComponent } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './bind-to-location.css';

function BindToLocation() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let breadcrumb: BreadcrumbComponent;

    function btnClick(): void {
        let breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (let i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as ButtonComponent);
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    }

    function beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
        var url = 'https://ej2.syncfusion.com/react/demos/#/bootstrap5/breadcrumb/bind-to-location',
            themeName = url.split('/')[6];
        if (args.item.text == 'demos') {
            args.item.url = args.item.url + '/#/' + themeName + '/grid/default';
        }
        else if (args.item.text == 'breadcrumb') {
            args.item.url = 'https://ej2.syncfusion.com/react/demos/#/bootstrap5/breadcrumb/default';
        }
        else if (args.item.text == themeName || args.item.text == 'react') {
            args.cancel = true;
        }
    }

    return (
        <div className='control-pane'>
            <div className="col-lg-12 control-section">
                <div className="content-wrapper breadcrumb-control-wrapper">
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5 style={{ display: "inline-block" }}>Bind to Location</h5>
                            <ButtonComponent cssClass='e-small reset-btn'
                                onClick={btnClick}>Reset State</ButtonComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <BreadcrumbComponent enableNavigation={false}></BreadcrumbComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5>URL Binding and Navigation</h5>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <BreadcrumbComponent ref={(breadcrumbObj) => { breadcrumb = breadcrumbObj }} url="https://ej2.syncfusion.com/react/demos/breadcrumb/bind-to-location" beforeItemRender={beforeItemRenderHandler}></BreadcrumbComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p> This sample demonstrates the navigation functionality of the <b>Breadcrumb</b> component.</p>                </div>
            <div id='description'>
                <p>The <code>Breadcrumb</code> component can be rendered by using the href(URL) of the current page or by using <code>url</code> property when the user is not specified the breadcrumb items using <code>items</code> property.
                    In this demonstration, URL navigation is enabled for bind to location sample and <code>beforeItemRender</code> event is used to customize rendering Breadcrumb item.</p>
                <p>More information about Breadcrumb component navigations feature can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/data-binding/#items-based-on-current-url">documentation section</a>.</p>                </div>
        </div>
    );
}
export default BindToLocation;