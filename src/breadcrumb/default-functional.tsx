import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { getComponent } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './default.css';

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const btnClick = (): void => {
    let breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
    for (let i = 0; i < breadcrumbs.length; i++) {
      breadcrumb = breadcrumbs[i];
      breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as ButtonComponent);
      breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
    }
  }

  const breadcrumbTemplate = () => {
    return (
      <span className="e-bicons e-arrow"></span>
    );
  }

  return (
    <div className='control-pane'>
      <div className="control-section">
        <div className="content-wrapper breadcrumb-control-wrapper">
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5 style={{ display: "inline-block" }}>Simple Breadcrumb</h5>
              <ButtonComponent cssClass='e-small reset-btn' onClick={btnClick}>Reset State</ButtonComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <BreadcrumbComponent enableNavigation={false}>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective iconCss="e-icons e-home" url="https://ej2.syncfusion.com/home/react.html#platform" />
                  <BreadcrumbItemDirective text="Components" url="https://ej2.syncfusion.com/react/demos/#/material/grid/overview/" />
                  <BreadcrumbItemDirective text="Navigations" url="https://ej2.syncfusion.com/react/demos/#/material/menu/default" />
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb/default" />
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5>Breadcrumb with Overflow</h5>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 e-bc-overflow">
              <BreadcrumbComponent maxItems={3} enableNavigation={false} separatorTemplate={breadcrumbTemplate}>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective text="Home" url="./"></BreadcrumbItemDirective>
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb"></BreadcrumbItemDirective>
                  <BreadcrumbItemDirective text="Default" url="./breadcrumb/default-functionalities"></BreadcrumbItemDirective>
                  <BreadcrumbItemDirective text="Icons" url="./breadcrumb/icons"></BreadcrumbItemDirective>
                  <BreadcrumbItemDirective text="Navigation" url="./breadcrumb/navigation"></BreadcrumbItemDirective>
                  <BreadcrumbItemDirective text="Overflow" url="./breadcrumb/overflow"></BreadcrumbItemDirective>
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5>Active Last Breadcrumb</h5>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <BreadcrumbComponent enableNavigation={false} enableActiveItemNavigation={true}>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective iconCss="e-icons e-home" url="https://ej2.syncfusion.com/home/react.html#platform" />
                  <BreadcrumbItemDirective text="All Components" url="https://ej2.syncfusion.com/react/demos/#/material/grid/overview/" />
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb/default" />
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the basic rendering, overflow feature and navigable active item of the <b>Breadcrumb</b> component with icon support. Click the <b>Reset State</b> button to refresh Breadcrumb component states.</p>
      </div>
      <div id='description'>
        <p>The <code>Breadcrumb</code> component is used as a navigational aid to identify the current page location within the navigational hierarchy structure of websites. It has list of items that can be populated using the <code>BreadcrumbItemDirective</code> tag.</p>
        <p><b>Simple Breadcrumb</b></p>
        <p>In this sample, the Breadcrumb is populated with text, icon, and URL.</p>
        <p><b>Breadcrumb with Overflow</b></p>
        <p>In the Breadcrumb component, <code>maxItems</code> and <code>overflowMode</code> properties were used to limit the number of breadcrumb items to be displayed.</p>
        <p>In this sample, the <code>maxItems</code> is set as <code>3</code> with <code>overflowMode</code> as <code>Menu</code>. To prevent breadcrumb item navigation we have set <code>false</code> in <code>enableNavigation</code> property of Breadcrumb component.</p>          <p><b>Active Last Breadcrumb</b></p>
        <p>In this sample, navigation for the last item is enabled by using <code>enableActiveItemNavigation</code> property.</p>
        <p>More information about Breadcrumb component can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/">documentation section</a>.</p>
      </div>
    </div>
  );
}
export default Default;
