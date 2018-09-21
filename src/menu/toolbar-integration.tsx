import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuComponent, MenuItemModel, ToolbarComponent, ItemsDirective, ItemDirective, MenuAnimationSettings } from '@syncfusion/ej2-react-navigations';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { SampleBase } from '../common/sample-base';
import './toolbar-integration.css';

export class ToolbarIntegration extends SampleBase<{}, {}> {
    public searchTemplate: string = '<div class="e-input-group"><input class="e-input" type="text" placeholder="Search" /><span class="em-icons e-search"></span></div>';
    public tbObj: ToolbarComponent;

    public items: ItemModel[] = [
        { text: 'My Profile' },
        { text: 'Orders' },
        { text: 'Rewards' },
        { text: 'Logout' }
    ];

    private menuTemplate(): JSX.Element {
        return (<MenuComponent id="menuele" items={this.menuItems} animationSettings={this.animation} />);
    }

    private ddbTemplate(): any {
        return (<DropDownButtonComponent id="userDBtn" content='Andrew' created={this.onCreated.bind(this)} items={this.items}></DropDownButtonComponent>);
    }

    public onCreated(): void {
        this.tbObj.refreshOverflow();
    }

    public animation: MenuAnimationSettings = { effect: 'None' };

    //Menu items definition
    public menuItems: MenuItemModel[] = [
        {
            text: 'Appliances',
            items: [
                {
                    text: 'Kitchen',
                    items: [
                        { text: 'Electric Cookers' },
                        { text: 'Coffee Makers' },
                        { text: 'Blenders' }
                    ]
                },
                {
                    text: 'Washing Machine',
                    items: [
                        { text: 'Fully Automatic' },
                        { text: 'Semi Automatic' }
                    ]
                },
                {
                    text: 'Air Conditioners',
                    items: [
                        { text: 'Inverter ACs' },
                        { text: 'Split ACs' },
                        { text: 'Window ACs' }
                    ]
                }
            ]
        },
        {
            text: 'Accessories',
            items: [
                {
                    text: 'Mobile',
                    items: [
                        { text: 'Headphones' },
                        { text: 'Memory Cards' },
                        { text: 'Power Banks' }
                    ]
                },
                {
                    text: 'Computer',
                    items: [
                        { text: 'Pendrives' },
                        { text: 'External Hard Disks' },
                        { text: 'Monitors' }
                    ]
                }
            ]
        },
        {
            text: 'Fashion',
            items: [
                {
                    text: 'Men',
                    items: [
                        { text: 'Shirts' },
                        { text: 'Jackets' },
                        { text: 'Track Suits' }
                    ]
                },
                {
                    text: 'Women',
                    items: [
                        { text: 'Kurtas' },
                        { text: 'Salwars' },
                        { text: 'Sarees' }
                    ]
                }
            ]
        },
        {
            text: 'Home & Living',
            items: [
                {
                    text: 'Furniture',
                    items: [
                        { text: 'Beds' },
                        { text: 'Mattresses' },
                        { text: 'Dining Tables' }
                    ]
                },
                {
                    text: 'Decor',
                    items: [
                        { text: 'Clocks' },
                        { text: 'Wall Decals' },
                        { text: 'Paintings' }
                    ]
                }
            ]
        }
    ];

    render() {
        return (
            <div className='control-pane'>
                <div id="menu-control" className='control-section'>
                    <div className='toolbar-menu-control'>
                        <ToolbarComponent id="toolbar" ref={(scope) => { this.tbObj = scope; }} >
                            <ItemsDirective>
                                <ItemDirective template={this.menuTemplate.bind(this)} />
                                <ItemDirective template={this.searchTemplate} align='Right' />
                                <ItemDirective template={this.ddbTemplate.bind(this)} align='Right' />
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
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/menu/getting-started.html">
                            documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}