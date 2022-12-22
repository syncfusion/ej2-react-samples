import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { getComponent } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './overflow-modes.css';

function OverflowModes() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  function btnClick(): void {
    let breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
    for (let i = 0; i < breadcrumbs.length; i++) {
      breadcrumb = breadcrumbs[i];
      breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as ButtonComponent);
      breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
    }
  }

  return (
    <div className='control-pane'>
      <div className="control-section">
        <div className="content-wrapper breadcrumb-control-wrapper">
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5 style={{ display: "inline-block" }}>Overflow Mode - Hidden</h5>
              <ButtonComponent cssClass='e-small reset-btn'
                onClick={btnClick}>Reset State</ButtonComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <BreadcrumbComponent enableNavigation={false} maxItems={3} overflowMode='Hidden'>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective text="Home" url="./" />
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb" />
                  <BreadcrumbItemDirective text="Default" url="./breadcrumb/default" />
                  <BreadcrumbItemDirective text="Icons" url="./breadcrumb/icons" />
                  <BreadcrumbItemDirective text="Navigation" url="./breadcrumb/navigation" />
                  <BreadcrumbItemDirective text="Overflow" url="./breadcrumb/overflow" />
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5>Overflow Mode - Menu</h5>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 e-bc-overflow">
              <BreadcrumbComponent enableNavigation={false} maxItems={3} overflowMode='Menu'>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective text="Home" url="./" />
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb" />
                  <BreadcrumbItemDirective text="Default" url="./breadcrumb/default" />
                  <BreadcrumbItemDirective text="Icons" url="./breadcrumb/icons" />
                  <BreadcrumbItemDirective text="Navigation" url="./breadcrumb/navigation" />
                  <BreadcrumbItemDirective text="Overflow" url="./breadcrumb/overflow" />
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5>Overflow Mode - Collapsed</h5>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <BreadcrumbComponent enableNavigation={false} maxItems={3} overflowMode='Collapsed'>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective text="Home" url="./" />
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb" />
                  <BreadcrumbItemDirective text="Default" url="./breadcrumb/default" />
                  <BreadcrumbItemDirective text="Icons" url="./breadcrumb/icons" />
                  <BreadcrumbItemDirective text="Navigation" url="./breadcrumb/navigation" />
                  <BreadcrumbItemDirective text="Overflow" url="./breadcrumb/overflow" />
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5>Overflow Mode - Wrap</h5>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <BreadcrumbComponent enableNavigation={false} maxItems={3} overflowMode='Wrap'>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective text="Home" url="./" />
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb" />
                  <BreadcrumbItemDirective text="Default" url="./breadcrumb/default" />
                  <BreadcrumbItemDirective text="Icons" url="./breadcrumb/icons" />
                  <BreadcrumbItemDirective text="Navigation" url="./breadcrumb/navigation" />
                  <BreadcrumbItemDirective text="Overflow" url="./breadcrumb/overflow" />
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <h5>Overflow Mode - Scroll</h5>
            </div>
          </div>
          <div className="row material2">
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
              <BreadcrumbComponent enableNavigation={false} maxItems={3} overflowMode='Scroll'>
                <BreadcrumbItemsDirective>
                  <BreadcrumbItemDirective text="Home" url="./" />
                  <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb" />
                  <BreadcrumbItemDirective text="Default" url="./breadcrumb/default" />
                  <BreadcrumbItemDirective text="Icons" url="./breadcrumb/icons" />
                  <BreadcrumbItemDirective text="Navigation" url="./breadcrumb/navigation" />
                  <BreadcrumbItemDirective text="Overflow" url="./breadcrumb/overflow" />
                </BreadcrumbItemsDirective>
              </BreadcrumbComponent>
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the different types of overflow mode such as <code>Hidden</code>, <code>Menu</code>, <code>Wrap</code>, <code>Collapsed</code>, and <code>Scroll</code> in the <b>Breadcrumb</b> component.</p>
      </div>
      <div id='description'>
        <p>Overflow mode limits the number of items to be displayed in the view when the breadcrumb's width exceeds the container width or <code>maxItems</code> property.</p>
        <p>The following overflow mode's were available in the <code>Breadcrumb</code> component.</p>
        <ul>
          <li><code>Hidden</code> - Specified maxItems count will be visible and the remaining items will be hidden. While clicking on the previous item, the hidden item will become visible.</li>
          <li><code>Collapsed</code> - Only the first and last items will be visible, and the remaining items will be hidden with collapsed icon. When the collapsed icon is clicked, all the items become visible.</li>
          <li><code>Menu</code> - Shows the number of breadcrumb items that can be accommodated within the container space, and creates a sub menu with the remaining items.</li>
          <li><code>Wrap</code> - Wraps the items on multiple lines when the Breadcrumb’s width exceeds the container space.</li>
          <li><code>Scroll</code> - Shows an HTML scroll bar when the Breadcrumb’s width exceeds the container space.</li>
          <li><code>None</code> - Shows all the items on a single line.</li>
        </ul>
        <p>More information about Breadcrumb component can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/overflow/">documentation section</a>.</p>
      </div>
    </div>
  );
}
export default OverflowModes;