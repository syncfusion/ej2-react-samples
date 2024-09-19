import { CheckBoxComponent, ChipListComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './api.css';
import * as data from './data.json';
import { PropertyPane } from '../common/property-pane';

const Api = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const datas = data as any;
    let colorCss = '';
    let outlineCss = '';
    const [cssClass, SetCssClass] = useState<string>('');
    const [avatarIconCss, SetAvatarIconCss] = useState<string>('');
    const [avatarText, SetAvatarText] = useState<string>('');
    const [trailingIconCss, SetTrailingIconCss] = useState<string>('');
    const [leadingIconCss, SetLeadingIconCss] = useState<string>('');
    // checkbox change handler for chip leading icon
    const iconHandler = (e): void => {
        SetLeadingIconCss(e.checked ? 'janet' : '');
    }
    // drop-down list change handler for chip color
    const colorChange = (e) => {
        SetCssClass(`e-${e.value.toLowerCase()} ${outlineCss.trim()}`);
        colorCss = `e-${e.value.toLowerCase()}`;
    }
    // checkbox change handler for chip outline
    const variantHandler = (e): void => {
        outlineCss = e.checked ? 'e-outline' : '';
        SetCssClass(`${colorCss} ${outlineCss}`.trim());
    }
    // drop-down list change handler for chip avatar
    const avatarHandler = (e): void => {
        SetAvatarIconCss((e.value.toLowerCase() === 'icon') ? 'e-icon' : (e.value.toLowerCase() === 'image') ? 'janet' : ''), SetAvatarText(e.value.toLowerCase() === 'letter' ? 'JL' : '');
    }
    // checkbox change handler for chip trailing icon
    const deleteIconHandler = (e): void => {
        SetTrailingIconCss(e.checked ? 'e-dlt-btn' : '');
    }
    return (
        <div>
            <div className="col-lg-8 control-section">
                <div id="chip-api-wrapper">
                    {/* initialize chip component */}
                    <ChipListComponent id="chip" text="Janet Leverling" cssClass={cssClass}
                        avatarIconCss={avatarIconCss} trailingIconCss={trailingIconCss}
                        avatarText={avatarText} leadingIconCss={leadingIconCss}>
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
                                    < div >
                                        {/* initialize dropdownlist component */}
                                        <DropDownListComponent id="chip-color" dataSource={datas.ddlData} placeholder="Select a color"
                                            change={colorChange.bind(this)}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "50%" }}>
                                    <div className="userselect">Leading icon</div>
                                </td>
                                <td style={{ width: "50%", paddingRight: "10px" }}>
                                    <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                        {/* initialize checkbox component */}
                                        <CheckBoxComponent id="chip-leadingicon" change={iconHandler.bind(this)}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "50%" }}>
                                    <div className="userselect">Avatar</div>
                                </td>
                                <td style={{ width: "50%", paddingRight: "10px" }}>
                                    <div>
                                        {/* initialize dropdownlist component */}
                                        <DropDownListComponent id="chip-avatar" dataSource={datas.avatarData} placeholder="Select an avatar"
                                            change={avatarHandler.bind(this)}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "50%" }}>
                                    <div className="userselect">Trailing icon</div>
                                </td>
                                <td style={{ width: "50%", paddingRight: "10px" }}>
                                    <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                        {/* initialize checkbox component */}
                                        <CheckBoxComponent id="chip-trailingicon" change={deleteIconHandler.bind(this)}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr >
                            <tr>
                                <td style={{ width: "50%" }}>
                                    <div className="userselect">Outline</div>
                                </td>
                                <td style={{ width: "50%", paddingRight: "10px" }}>
                                    <div style={{ paddingLeft: "0", paddingTop: "0" }}>
                                        {/* initialize checkbox component */}
                                        <CheckBoxComponent id="chip-outline" change={variantHandler.bind(this)}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr >
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
                    This sample can be customized further with the combination of Chip properties from the property
                    pane. For
                    example,
                </p>
                <ul>
                    <li>Color variant can be changed by selecting the color dropdownlist from property pane. This can be achieved by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chips/#cssclass">CssClass</a> property.</li>
                    <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chips/#leadingiconcss">Leading</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chips/#trailingiconcss">Trailing</a> icons can be enabled by selecting Leading or Trailing Icon checkbox from property pane.</li>
                    <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chips/#leadingiconcss">Leading</a> icon can be customized with avatar initials, icons and images from property pane</li>
                    <li>Outline chip type can be enabled by checking outline checkbox from property pane. This can be achieved by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chips/#cssclass">CssClass</a> property.</li>
                </ul>
            </div>
        </div>

    )
}
export default Api;
