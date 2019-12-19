import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs as ddlChange } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './hamburger-mode.css';
import * as dataSource from './menu-data.json';
// custom code start
import { Browser, select } from '@syncfusion/ej2-base';
// custom code end
interface HamburgerMenuSample {
    showItemOnClick: boolean;
    hamburgerMode: boolean;
}
export class HamburgerMenu extends SampleBase<{}, HamburgerMenuSample> {
    public menuObj: MenuComponent;
    data = dataSource as any;
    constructor() {
        super();
        this.state = {
            showItemOnClick: true,
            hamburgerMode: true
        };
    }
    // custom code start
    menuCreated(): void {
        if (Browser.isDevice) {
            select('.property-section').remove();
            select('#layoutcontainer').removeAttribute('class');
            select('#layoutcontainer').removeAttribute('id');
            (select('#menu') as HTMLElement).style.height = '363px';
        }
    }
    // custom code end
    modeChange(args: ddlChange): void {
        let container: HTMLElement = document.querySelector('#layoutcontainer');
        switch (args.value) {
            case 'Mobile':
            case 'Tablet':
                this.menuObj.close();
                container.classList.add('deviceLayout');
                container.classList[args.value === 'Mobile' ? 'remove' : 'add']('tabletview');
                this.menuObj.element.parentElement.classList[args.value === 'Mobile' ? 'remove' : 'add']('e-menu-icon-right');
                this.setState({ showItemOnClick: true, hamburgerMode: true });
            break;
            case 'Desktop':
                container.classList.remove('deviceLayout', 'tabletview');
                this.setState({ showItemOnClick: false, hamburgerMode: false });
            break;
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className="menu-section control-section">
                    <div className="col-lg-8 control-section">
                        <div id="hamburgerMenu">
                            <div id='layoutcontainer' className="deviceLayout">
                                <div className="speaker">
                                    <div className="camera"></div>
                                </div>
                                <div className="layout-menu">
                                    <div id="container">
                                    <MenuComponent id="menu" items={this.data.hamburgerData} showItemOnClick={this.state.showItemOnClick}
                                    hamburgerMode={this.state.hamburgerMode} ref={(scope) => { this.menuObj = scope; }} created={this.menuCreated.bind(this)}></MenuComponent>
                                    </div>
                                </div>
                                <div className="outerButton"> </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 property-section">
                        <PropertyPane title='Properties'>
                            <table id="property" title="Properties" style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '50%', paddingTop: '10px' }}>
                                            <div>View Mode</div>
                                        </td>
                                        <td style={{ width: '50%', paddingTop: '10px' }}>
                                            <div style={{ maxWidth: '200px' }}>
                                                <DropDownListComponent value='Mobile' dataSource={this.data.viewModeData} popupHeight='200px' change={this.modeChange.bind(this)}></DropDownListComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the hamburger mode in the <code>menu</code> component.</p>
                </div>
                <div id="description">
                    <p>Enabling the <code>hamburgerMode</code> property makes the <code>menu</code> component in adaptive view. By default, its shows header with 
                        hamburger icon in <code>Horizontal</code> orientation.
                    </p>
                    <p>The menu shows on clicking hamburger icon. You can use the <code>open</code> and <code>close</code> methods to show / hide the menu programmatically.</p>
                    <p>
                        More information about Menu can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/menu/getting-started">
                         documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}