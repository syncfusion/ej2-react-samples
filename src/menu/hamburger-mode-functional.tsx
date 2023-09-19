import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs as ddlChange } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import './hamburger-mode.css';
import * as dataSource from './menu-data.json';
import { Browser, select } from '@syncfusion/ej2-base';

interface HamburgerMenuSample {
    showItemOnClick: boolean;
    hamburgerMode: boolean;
}
const HamburgerMenu = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let menuObj = useRef<MenuComponent>(null);
    let data = dataSource as any;
    const [state, setState] = useState<HamburgerMenuSample>({
        showItemOnClick: true,
        hamburgerMode: true
    });
    const [layout, setLayout] = useState<string>('deviceLayout');

    const menuCreated = (): void => {
        if (Browser.isDevice) {
            select('.property-section').remove();
            select('#layoutcontainer').removeAttribute('class');
            select('#layoutcontainer').removeAttribute('id');
            (select('#menu') as HTMLElement).style.height = '363px';
        }
    }

    const modeChange = (args: ddlChange): void => {
        let container: HTMLElement = document.querySelector('#layoutcontainer');
        switch (args.value) {
            case 'Mobile':
            case 'Tablet':
                menuObj.current.close();
                args.value === 'Mobile' ? setLayout('deviceLayout') : setLayout('deviceLayout tabletview');
                menuObj.current.element.parentElement.classList[args.value === 'Mobile' ? 'remove' : 'add']('e-menu-icon-right');
                setState({ showItemOnClick: true, hamburgerMode: true });
                break;
            case 'Desktop':
                setLayout('');
                setState({ showItemOnClick: false, hamburgerMode: false });
                break;
        }
    }

    return (
        <div className='control-pane'>
            <div className="menu-section control-section">
                <div className="col-lg-8 control-section">
                    <div id="hamburgerMenu">
                        <div id='layoutcontainer' className={layout}>
                            <div className="speaker">
                                <div className="camera"></div>
                            </div>
                            <div className="layout">
                                <div id="container">
                                    <MenuComponent id="menu" items={data.hamburgerData} showItemOnClick={state.showItemOnClick} hamburgerMode={state.hamburgerMode} ref={menuObj} created={menuCreated}></MenuComponent>
                                </div>
                            </div>
                            <div className="outerButton"></div>
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
                                            <DropDownListComponent value='Mobile' dataSource={data.viewModeData} popupHeight='200px' change={modeChange}></DropDownListComponent>
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
                <p>
                    Enabling the <code>hamburgerMode</code> property makes the <code>menu</code> component in adaptive view. By default, its shows header with
                    hamburger icon in <code>Horizontal</code> orientation.
                </p>
                <p>The menu shows on clicking hamburger icon. You can use the <code>open</code> and <code>close</code> methods to show / hide the menu programmatically.</p>
                <p>
                    More information about Menu can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/menu/getting-started">documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default HamburgerMenu;