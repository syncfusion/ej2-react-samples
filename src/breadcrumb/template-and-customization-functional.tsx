import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective } from '@syncfusion/ej2-react-navigations';
import { ChipListComponent, ChipsDirective, ChipDirective } from '@syncfusion/ej2-react-buttons';
import { BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { getComponent } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './template-and-customization.css';

const TemplateAndCustomization = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const [disable, setDisable] = useState<boolean>(false);
    const chipTemplate = (data: any) => {
        return (
            <ChipListComponent>
                <ChipsDirective>
                    <ChipDirective text={data.text}></ChipDirective>
                </ChipsDirective>
            </ChipListComponent>
        );
    }

    const arrowSeparatorTemplate = () => {
        return (
            <span className="e-icons e-arrow"></span>
        );
    }

    const specificItemTemplate = (data: any) => {
        return (
            <div>
                {data.text == "Breadcrumb" ? (
                    <span>
                        <span className="e-searchfor-text">
                            <span style={{ marginRight: "5px" }}>Search for:</span>
                            <a className="e-breadcrumb-text" href={data.url} onClick={() => { return false }}>{data.text}</a>
                        </span>
                    </span>
                ) : (
                    <a className="e-breadcrumb-text" href={data.url} onClick={() => { return false }}>{data.text}</a>
                )}
            </div>
        );
    }

    const customTemplate = (data: any) => {
        return (
            <div className="e-custom-item">
                <div className="e-custom-icon">
                    <span className="e-bicons e-frame e-check"></span>
                    <span className="e-label">{data.text}</span>
                </div>
            </div>
        );
    }

    const customSeparatorTemplate = () => {
        return (
            <div className="e-custom-separator"></div>
        );
    }

    const beforeItemRenderHandler = (args: BreadcrumbBeforeItemRenderEventArgs) => {
        if (args.item.text !== 'Program Files') {
            setDisable(true);
        }
    }

    const btnClick = (): void => {
        let breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (let i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as ButtonComponent);
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    }

    return (
        <div className='control-pane'>
            <div className="col-lg-12 control-section">
                <div className="content-wrapper breadcrumb-control-wrapper">
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5 style={{ display: "inline-block" }}>Custom Breadcrumb</h5>
                            <ButtonComponent cssClass='e-small reset-btn' onClick={btnClick}>Reset State</ButtonComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <BreadcrumbComponent cssClass="e-breadcrumb-chips" itemTemplate={chipTemplate}>
                                <BreadcrumbItemsDirective>
                                    <BreadcrumbItemDirective text="Cart" />
                                    <BreadcrumbItemDirective text="Billing" />
                                    <BreadcrumbItemDirective text="Shipping" />
                                    <BreadcrumbItemDirective text="Payment" />
                                </BreadcrumbItemsDirective>
                            </BreadcrumbComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5>Specific Item Template</h5>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <BreadcrumbComponent itemTemplate={specificItemTemplate} cssClass="e-specific-item-template" enableNavigation={false}>
                                <BreadcrumbItemsDirective>
                                    <BreadcrumbItemDirective text="Home" url="https://ej2.syncfusion.com/home/react.html#platform" />
                                    <BreadcrumbItemDirective text="Components" url="https://ej2.syncfusion.com/react/demos/#/material/grid/overview/" />
                                    <BreadcrumbItemDirective text="Navigations" url="https://ej2.syncfusion.com/react/demos/#/material/menu/default" />
                                    <BreadcrumbItemDirective text="Breadcrumb" url="./breadcrumb/default" />
                                </BreadcrumbItemsDirective>
                            </BreadcrumbComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5>Custom Separator</h5>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 e-bc-separator">
                            <BreadcrumbComponent separatorTemplate={arrowSeparatorTemplate}>
                                <BreadcrumbItemsDirective>
                                    <BreadcrumbItemDirective text="Cart" />
                                    <BreadcrumbItemDirective text="Billing" />
                                    <BreadcrumbItemDirective text="Shipping" />
                                    <BreadcrumbItemDirective text="Payment" />
                                </BreadcrumbItemsDirective>
                            </BreadcrumbComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5>Custom Breadcrumb and Separator</h5>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <BreadcrumbComponent cssClass="e-custom-breadcrumb" itemTemplate={customTemplate} separatorTemplate={customSeparatorTemplate}>
                                <BreadcrumbItemsDirective>
                                    <BreadcrumbItemDirective text="Cart" />
                                    <BreadcrumbItemDirective text="Billing" />
                                    <BreadcrumbItemDirective text="Shipping" />
                                    <BreadcrumbItemDirective text="Payment" />
                                </BreadcrumbItemsDirective>
                            </BreadcrumbComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5>Breadcrumb with Icons</h5>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons">
                            <BreadcrumbComponent>
                                <BreadcrumbItemsDirective>
                                    <BreadcrumbItemDirective text="Program Files" iconCss="e-bicons e-folder" />
                                    <BreadcrumbItemDirective text="Commom Files" iconCss="e-bicons e-folder" />
                                    <BreadcrumbItemDirective text="Services" iconCss="e-bicons e-folder" />
                                    <BreadcrumbItemDirective text="Config.json" iconCss="e-bicons e-file" />
                                </BreadcrumbItemsDirective>
                            </BreadcrumbComponent>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <h5>Disabled Breadcrumb</h5>
                        </div>
                    </div>
                    <div className="row material2">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons">
                            <BreadcrumbComponent disabled={disable} beforeItemRender={beforeItemRenderHandler}>
                                <BreadcrumbItemsDirective>
                                    <BreadcrumbItemDirective text="Program Files" iconCss="e-bicons e-folder" />
                                    <BreadcrumbItemDirective text="Commom Files" iconCss="e-bicons e-folder" />
                                    <BreadcrumbItemDirective text="Services" iconCss="e-bicons e-folder" />
                                    <BreadcrumbItemDirective text="Config.json" iconCss="e-bicons e-file" />
                                </BreadcrumbItemsDirective>
                            </BreadcrumbComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the template functionalities of the <b>Breadcrumb</b> component. The breadcrumb item
                    templates are customized using HTML and CSS.
                </p>
            </div>
            <div id="description">
                <p> 
                    The <code>Breadcrumb</code> component provides a way to customize the items using <code>itemTemplate</code> and
                    the separators using
                    <code>separatorTemplate</code> properties.
                </p>
                <p>
                    The icons are used for the visual representation of the breadcrumb items. You can specify the
                    <code>iconCss</code> property to display the icon within the corresponding breadcrumb item. By default, the icons are aligned in the left position.</p>
                <p>You can enable or disable the entire Breadcrumb using <code>disabled</code> property.</p>
                <p>
                    In this demo, we have used Shopping Cart details as Breadcrumb Items and customized the items using
                    <code>itemTemplate</code> and <code>separatorTemplate</code>.
                </p>
                <p>
                    And, showcased the file path of the config.json file with icons using the <code>iconCss</code> property and
                    disabled the specific Breadcrumb items in <code>beforeItemRender</code> event using item <code>disabled</code> property.
                </p>
                <p>
                    More information about Breadcrumb component template feature can be found in this <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/breadcrumb/templates/">documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default TemplateAndCustomization;