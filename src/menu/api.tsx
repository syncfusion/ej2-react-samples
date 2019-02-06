import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuComponent, FieldSettingsModel, Orientation } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs as ddlChange, Inject } from '@syncfusion/ej2-react-dropdowns';
import { MultiSelectComponent, MultiSelectChangeEventArgs, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs as cbChange } from '@syncfusion/ej2-react-buttons';
import { getComponent } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './api.css';
import * as dataSource from './menu-data.json';
interface ApiSample {
    orientation: Orientation;
    showItemOnClick: boolean;
}
export class Api extends SampleBase<{}, ApiSample> {
    data = dataSource as any;
    constructor() {
        super();
        this.state = {
            orientation: 'Horizontal',
            showItemOnClick: false
        };
    }
    // Menu fields definition
    menuFields: FieldSettingsModel = { text: ['header', 'text', 'value'], children: ['subItems', 'options'] };
    modeChange(args: ddlChange): void {
        this.setState({ orientation: args.itemData.value as Orientation });
    }
    enabledisableChange(args: MultiSelectChangeEventArgs): void {
        if (args.value) {
            const menuObj: MenuComponent = this.refs.menu as MenuComponent;
            menuObj.enableItems(['Events', 'Movies', 'Directory', 'Queries', 'Services'], true);
            menuObj.enableItems(args.value as string[], false);
        }
    }
    // CheckBox change event
    showOnClickChange(args: cbChange) {
        this.setState({ showItemOnClick: args.checked });
    }
    render() {
        return (
            <div className='control-pane'>
                <div className="menu-section control-section">
                    <div className="col-lg-8 control-section">
                        <div id="apiMenu">
                            <MenuComponent id="menu" items={this.data.apiData} fields={this.menuFields} orientation={this.state.orientation} showItemOnClick={this.state.showItemOnClick} ref="menu"></MenuComponent>
                        </div>
                    </div>
                    <div className="col-lg-4 property-section">
                        <PropertyPane title='Properties'>
                            <table id="property" title="Properties" style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '50%', paddingTop: '10px' }}>
                                            <div>Orientation</div>
                                        </td>
                                        <td style={{ width: '50%', paddingTop: '10px' }}>
                                            <div style={{ maxWidth: '200px' }}>
                                                <DropDownListComponent value='Horizontal' dataSource={this.data.modeData} popupHeight='200px' change={this.modeChange.bind(this)}></DropDownListComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%', paddingTop: '10px' }}>
                                            <div>Enable / Disable item</div>
                                        </td>
                                        <td style={{ width: '50%', paddingTop: '10px' }}>
                                            <div style={{ maxWidth: '200px' }}>
                                                <MultiSelectComponent dataSource={this.data.headerData} popupHeight='250px' width='160px' mode='CheckBox' placeholder='Select item' showDropDownIcon={true} change={this.enabledisableChange.bind(this)}>
                                                    <Inject services={[CheckBoxSelection]}/>
                                                </MultiSelectComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%', paddingTop: '15px' }}>
                                            <div>Show Item on Click</div>
                                        </td>
                                        <td style={{ width: '50%', paddingTop: '15px' }}>
                                            <CheckBoxComponent checked={false} change={this.showOnClickChange.bind(this)}></CheckBoxComponent>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the customization of <code>menu</code> component by using its properties from the property pane. Select any combination of properties from the property pane to customize <code>menu</code> component.</p>
                </div>
                <div id="description">
                    <p>In this demo, default menu is rendered with minimal configuration.</p>
                    <p>This sample can be customized further with the combination of <code>menu</code> properties from the property pane. For example,</p>
                    <ul>
                        <li>You can switch to <b>Vertical</b> and <b>Horizontal</b> modes by clicking and selecting the 
                            <code>orientation</code> mode from <i>Orientation</i> dropdownlist.</li>
                        <li>You can enable or disable menu items by clicking and selecting the item
                            from <i>Enable item</i> or <i>Disable item</i> dropdownlists.</li>
                        <li>You can also enable the show menu item on mouse click <code>showItemOnClick</code> property by checking the 
                            <i>Show item on Click</i> checkbox.</li>
                    </ul>
                    <p>
                        More information about menu can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/menu">documentation</a> section.
                    </p>
                </div>
            </div>
        )
    }
}