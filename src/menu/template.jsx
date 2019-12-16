import * as React from 'react';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './template-data.json';
import './template.css';
/**
 * Menu Template sample
 */
export class Template extends SampleBase {
    constructor() {
        super(...arguments);
        // Template datasource
        this.menuitems = dataSource.templateData;
        // Menu fields definition
        this.menuFields = { text: ['category', 'value'], children: ['options'] };
    }
    // Template to render Menu items
    menuTemplate(data) {
        return (data.category ? <span>{data.category}</span> :
            (data.value) ?
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        {data.url ? <img className="e-avatar e-avatar-small" src={`src/menu/images/${data.url}.png`}/> : ''}
                        <span style={{ width: '100%' }}>{data.value}</span>
                        {data.count ? <span className="e-badge e-badge-success">{data.count}</span> : ''}
                    </div> :
                <div tabIndex={0} className="e-card">
                            <div className="e-card-header">
                                <div className="e-card-header-caption">
                                    <div className="e-card-header-title">About Us</div>
                                </div>
                            </div>
                            <div className="e-card-content">
                                {data.about.value}
                            </div>
                            <div className="e-card-actions">
                                <button className="e-btn e-outline" style={{ pointerEvents: 'auto' }}>
                                    Read More
                                </button>
                            </div>
                        </div>);
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='menu-section'>
                        <div className='template-menu-control'>
                            <MenuComponent items={this.menuitems} fields={this.menuFields} template={this.menuTemplate} cssClass="e-template-menu"></MenuComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the template functionalities of the <code>menu</code> component. Interact with <code>menu</code> using hover / click to display sub menu pop-up items with its customized templates.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The menu component has an option to customize menu items using the <code>template</code> property, so that the menu items can be rendered according to the requirement.
                    </p>
                    <p>
                        In this demo, the below customization are demonstrated.
                        <ul>
                            <li>Header menu items and the 'Products' sub menu items represents the customization of default rendering of li elements i.e. <b>data.category</b> in template.</li>
                            <li>'Services' sub menu item represent the customization of li element with <code>badge</code> component.</li>
                            <li>'About Us' sub menu item showed with <code>card</code> component in a single li.</li>
                        </ul>
                    </p>
                    <p>
                        For more information, refer to the
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/menu/data-source-binding-and-custom-menu-items/#custom-menu-items">
                            templates</a> section in the documentation.
                    </p>
                </div>
            </div>);
    }
}
