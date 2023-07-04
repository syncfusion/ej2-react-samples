import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { SplitButtonComponent, ItemModel, MenuEventArgs } from '@syncfusion/ej2-react-splitbuttons';
import { updateSampleSection } from '../common/sample-base';
import './split-button.css';

const SplitButton = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const items: ItemModel[] = [
        {
            text: 'Paste',
            iconCss: 'e-btn-icons e-paste'
        },
        {
            text: 'Paste Special',
            iconCss: 'e-btn-icons e-paste-special'
        },
        {
            text: 'Paste as Formula',
            iconCss: 'e-btn-icons e-paste-formula'
        },
        {
            text: 'Paste as Hyperlink',
            iconCss: 'e-btn-icons e-paste-hyperlink'
        }];

    const addDisabled: any = (args: MenuEventArgs) => {
        if (args.item.text !== 'Paste') {
            args.element.classList.add('e-disabled');
        }
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='splitbutton-section'>
                    <div id='splitbutton-control'>
                        <div className='row'>
                            <div className="col-xs-12 col-sm-6 col-lg-3 col-md-3">
                                <SplitButtonComponent items={items} iconCss='e-btn-icons e-paste'></SplitButtonComponent>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-lg-3 col-md-3">
                                <SplitButtonComponent items={items} content='Paste'></SplitButtonComponent>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-lg-3 col-md-3">
                                <SplitButtonComponent items={items} content='Paste' iconCss='e-btn-icons e-paste'></SplitButtonComponent>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-lg-3 col-md-3">
                                <SplitButtonComponent items={items} content='Paste' iconCss='e-btn-icons e-paste' beforeItemRender={addDisabled}></SplitButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the SplitButton.
                    By clicking primary button default action will be triggered and clicking secondary button will display popup with list of action items.
                </p>
            </div>
            <div id="description">
                <p>
                    The SplitButton component has primary and secondary buttons. Primary button is used to select default action and secondary button is
                    used to toggle contextual overlays for displaying list of action items. It can contain both text and images.
                </p>
                <p>
                    In this sample, SplitButton contains icon, content and list of action items, and can be added using
                    <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/split-button/#iconcss">iconCss,
                    </a></code>
                    <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/split-button/#content">content
                    </a></code>and
                    <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/split-button/#items">items
                    </a></code>property.
                </p>
                <p>
                    More information about SplitButton can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/split-button/getting-started">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default SplitButton;