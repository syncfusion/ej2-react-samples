import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './data-binding.css';
import * as dataSource from './menu-data.json';

/**
 * Menu data binding sample
 */
export class DataBinding extends SampleBase<{}, {}> {
    public data = dataSource as any;

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='menu-section'>
                        <div id='dataBinding'>
                            <MenuComponent items={this.data.dataBinding}></MenuComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the way of data binding in <code>menu</code> component with JavaScript object array (local data source). Interact with <code>menu</code> using hover / click action.</p>
                </div>
                <div id="description">
                    <p>
                        The menu component loads the data through the <code>items</code> property, where the data can either be structured as hierarchical or self-referential data, i.e. mapped with id and parentId fields.
                    </p>
                    <p>
                        In this demo, the component is bound with the list type data where the parent-child relation is referred by id and parentId mapping fields.
                    </p>
                    <p>
                        More information about menu can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/menu/data-source-binding-and-custom-menu-items/#data-binding">
                            data binding</a> section.
                    </p>
                </div>
            </div>
        )
    }
}