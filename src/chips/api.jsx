import { CheckBoxComponent, ChipListComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './api.css';
import * as data from './data.json';
import { PropertyPane } from '../common/property-pane';
export class Api extends SampleBase {
    constructor() {
        super();
        this.data = data;
        this.colorCss = '';
        this.outlineCss = '';
        this.state = {
            cssClass: '',
            avatarIconCss: '',
            avatarText: '',
            trailingIconCss: '',
            leadingIconCss: ''
        };
    }
    // checkbox change handler for chip leading icon
    iconHandler(e) {
        this.setState({ leadingIconCss: e.checked ? 'janet' : '' });
    }
    // drop-down list change handler for chip color
    colorChange(e) {
        this.setState({ cssClass: `e-${e.value.toLowerCase()} ${this.outlineCss.trim()}` });
        this.colorCss = `e-${e.value.toLowerCase()}`;
    }
    // checkbox change handler for chip outline
    variantHandler(e) {
        this.outlineCss = e.checked ? 'e-outline' : '';
        this.setState({ cssClass: `${this.colorCss} ${this.outlineCss}`.trim() });
    }
    // drop-down list change handler for chip avatar
    avatarHandler(e) {
        this.setState({ avatarIconCss: (e.value.toLowerCase() === 'icon') ? 'e-icon' : (e.value.toLowerCase() === 'image') ? 'janet' : '', avatarText: (e.value.toLowerCase() === 'letter' ? 'JL' : '') });
    }
    // checkbox change handler for chip trailing icon
    deleteIconHandler(e) {
        this.setState({ trailingIconCss: e.checked ? 'e-dlt-btn' : '' });
    }
    render() {
        return (<div>
                <div className="col-lg-8 control-section">
                    <div id="chip-api-wrapper">
                        
                        <ChipListComponent id="chip" text="Janet Leverling" cssClass={this.state.cssClass} avatarIconCss={this.state.avatarIconCss} trailingIconCss={this.state.trailingIconCss} avatarText={this.state.avatarText} leadingIconCss={this.state.leadingIconCss}>
                        </ChipListComponent>
                    </div>
                </div>
                <div className="col-lg-4 property-section" id="chips-api-property">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Color</div>
                                    </td>
                                    <td style={{ width: "50%", "paddingRight": "10px" }}>
                                        <div>
                                            
                                            <DropDownListComponent id="chip-color" dataSource={this.data.ddlData} placeholder="Select a color" change={this.colorChange.bind(this)}></DropDownListComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Leading icon</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            
                                            <CheckBoxComponent id="chip-leadingicon" change={this.iconHandler.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Avatar</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div>
                                            
                                            <DropDownListComponent id="chip-avatar" dataSource={this.data.avatarData} placeholder="Select an avatar" change={this.avatarHandler.bind(this)}></DropDownListComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Trailing icon</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            
                                            <CheckBoxComponent id="chip-trailingicon" change={this.deleteIconHandler.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Outline</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                            
                                            <CheckBoxComponent id="chip-outline" change={this.variantHandler.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates most commonly used API functionalities of chip control from the property pane. Select
        any combination of properties from the property pane to customize the appearance of chip.</p>
                </div>
                <div id="description">
                    <p>
                        In this sample, default chip is rendered with minimal configuration.
    </p>
                    <p>
                        This sample can be customized further with the combination of Chip properties from the property pane. For
                        example,
    </p>
                    <ul>
                        <li>Color variant can be changed by selecting the color dropdownlist from property pane.</li>
                        <li>Leading and Trailing icons can be enabled by selecting Leading or Trailing Icon checkbox from property
            pane.</li>
                        <li>Leading icon can be customized with avatar initials, icons and images from property pane</li>
                        <li>Outline chip type can be enabled by checking outline checkbox from property pane.</li>
                    </ul>
                </div>
            </div>);
    }
}
