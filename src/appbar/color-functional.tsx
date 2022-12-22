import * as React from 'react';
import { AppBarComponent, MenuComponent, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-react-navigations';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './color.css';

function Color() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
  function btnCreated(): void {
    const menuButtonElement = document.querySelectorAll('.color-appbar-section .e-inherit.menu');
    for (let i = 0; i < menuButtonElement.length; i++) {
      if (!(menuButtonElement[i].hasAttribute("aria-label"))) {
        menuButtonElement[i].setAttribute('aria-label', 'menu');
      }
    }
  }
  const productDropDownButtonItems: ItemModel[] = [
    { text: 'Developer' },
    { text: 'Analytics' },
    { text: 'Reporting' },
    { text: 'E-Signature' },
    { text: 'Help Desk' }
  ];
  const companyDropDownButtonItems: ItemModel[] = [
    { text: 'About Us' },
    { text: 'Customers' },
    { text: 'Blog' },
    { text: 'Careers' }
  ];
  const verticalMenuItems: MenuItemModel[] = [
    {
      iconCss: 'e-icons e-more-vertical-1',
      items: [
        { text: 'Home' },
        {
          text: 'Products',
          items: [
            { text: 'Developer' },
            { text: 'Analytics' },
            { text: 'Reporting' },
            { text: 'E-Signature' },
            { text: 'Help Desk' }
          ]
        },
        {
          text: 'Company',
          items: [
            { text: 'About Us' },
            { text: 'Customers' },
            { text: 'Blog' },
            { text: 'Careers' }
          ]
        },
        { text: 'Login' }
      ]
    }
  ];
  const appBarColors: any = [
    { colorMode: 'Light', colorClass: 'e-light', isPrimary: 'true', loginClass: 'login' }, { colorMode: 'Dark', colorClass: 'e-dark', isPrimary: 'false', loginClass: 'e-inherit login' },
    { colorMode: 'Primary', colorClass: 'e-primary', isPrimary: 'false', loginClass: 'e-inherit login' }, { colorMode: 'Inherit', colorClass: 'e-inherit', isPrimary: 'true', loginClass: 'login' }
  ];
  function onInputFocus(args: React.FocusEvent) {
    ((args.target as HTMLElement).parentElement as HTMLElement).classList.add('e-input-focus');
  }
  function onInputBlur(args: React.FocusEvent) {
    ((args.target as HTMLElement).parentElement as HTMLElement).classList.remove('e-input-focus');
  }
  function beforeItemRender(args: MenuEventArgs): void {
    if (args.element.children.length > 0 && args.element.children[0].classList.contains("e-more-vertical-1")) {
      args.element.setAttribute('aria-label', 'more vertical');
    }
  }

    return (
      <div className='control-pane'>
        <div className='col-lg-12 control-section color-appbar-section'>
          <div className='control appbar-sample'>
            <div className="color-appbar-container">
              {appBarColors?.map((props, key) => (
                <div key={key}>
                  <div className="row">
                    <div className="col-md-12">
                      <h5>{props.colorMode}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <AppBarComponent colorMode={props.colorMode}>
                        <ButtonComponent created={btnCreated.bind(this)} cssClass='e-inherit menu' iconCss='e-icons e-menu'></ButtonComponent>
                        <ButtonComponent cssClass='e-inherit home e-appbar-menu'>Home</ButtonComponent>
                        <DropDownButtonComponent cssClass={'e-inherit e-appbar-menu ' + props.colorClass} items={productDropDownButtonItems}>Products</DropDownButtonComponent>
                        <DropDownButtonComponent cssClass={'e-inherit e-appbar-menu ' + props.colorClass} items={companyDropDownButtonItems}>Company</DropDownButtonComponent>
                        <div className='e-appbar-spacer'></div>
                        <div style={{ width: '200px', marginRight: '10px' }}>
                          <span className='e-input-group e-control-wrapper e-inherit'>
                            <input type='text' className='e-searchinput e-input' placeholder='Search' onFocus={onInputFocus} onBlur={onInputBlur} />
                            <span className='e-icons e-search e-input-group-icon'></span>
                          </span>
                        </div>
                        <div className="e-appbar-separator"></div>
                        <ButtonComponent isPrimary={props.isPrimary} cssClass={props.loginClass}>Login</ButtonComponent>
                        <MenuComponent cssClass={'e-inherit e-appbar-icon-menu ' + props.colorClass} items={verticalMenuItems} beforeItemRender={beforeItemRender.bind(this)}></MenuComponent>
                      </AppBarComponent>
                    </div>
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </div></div>
        <div id="action-description">
          <p>
            This sample demonstrates the available types of color in the <strong>React AppBar</strong>.
          </p>
        </div>
        <div id="description">
          <p>In this demo, the available types of background color for <strong>React AppBar</strong> are showcased. The background and font colors can be set using the <strong>ColorMode</strong> property. The different types are <code>light</code>, <code>dark</code>, <code>primary</code>, and <code>inherit</code>.</p>
          <p><code>Light</code> - The AppBar can be displayed with a light background.</p>
          <p><code>Dark</code> - The AppBar can be displayed with a dark background.</p>
          <p><code>Primary</code> - The AppBar can be displayed with primary colors.</p>
          <p><code>Inherit</code> - The AppBar inherits the color from its parent element.</p> <br />
          <p> On <code>mobile devices</code>, media query is used to display the AppBar in adaptive views. You can click the menu to see the hidden AppBar content.</p>
        </div>
      </div>
    );
}
export default Color;