import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { MenuComponent, ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { removeClass } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './toolbar-integration.css';
import * as dataSource from './menu-data.json';

const ToolbarIntegration = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let data = dataSource as any;
    let searchTemplate: string = '<div class="e-input-group"><input class="e-input" type="text" placeholder="Search" /><span class="e-input-group-icon em-icons e-search"></span></div>';
    let tbObj = useRef<ToolbarComponent>(null);

    const menuTemplate = () => {
        return (<MenuComponent id="menuele" items={data.toolbarIntegrationData} />);
    }

    const ddbTemplate = (): any => {
        return (<DropDownButtonComponent id="userDBtn" content='Andrew' created={onCreated} items={data.userData}></DropDownButtonComponent>);
    }

    const onCreated = (): void => {
        tbObj.current.refreshOverflow();
        removeClass([tbObj.current.element.querySelector('.e-shopping-cart')], 'e-icons');
    }

    return (
        <div className='control-pane'>
            <div id="menu-control" className='control-section'>
                <div className='toolbar-menu-control'>
                    <ToolbarComponent id="toolbar" ref={tbObj} >
                        <ItemsDirective>
                            <ItemDirective template={menuTemplate} />
                            <ItemDirective template={searchTemplate} align='Right' />
                            <ItemDirective template={ddbTemplate} align='Right' />
                            <ItemDirective prefixIcon='em-icons e-shopping-cart' align='Right' />
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the real use case of <code>menu</code> component in web application.</p>
            </div>
            <div id="description">
                <p>
                    Menu utilizes the <code>items</code> property to represent the menu bar in web application. In this demo, the menu component is integrated with toolbar along with customized
                    search input box, dropdownbutton component and added shopping cart item using toolbar default option.
                </p>
                <p>
                    More information about menu can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/menu/use-case-scenarios/#menu-in-toolbar">documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default ToolbarIntegration;