/**
 * Loading ajax content sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-react-popups';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { Ajax } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './tooltip-sample.css';

export class AjaxContentTooltip extends SampleBase<{}, {}> {
    private tooltipInstance: TooltipComponent;

    //Define an Array of JSON data
    public listViewData: { [key: string]: Object }[] = [
        { id: '1', text: 'Australia' },
        { id: '2', text: 'Bhutan' },
        { id: '3', text: 'China' },
        { id: '4', text: 'Cuba' },
        { id: '5', text: 'India' },
        { id: '6', text: 'Switzerland' },
        { id: '7', text: 'United States' }
    ];

    //Map appropriate columns to fields property.
    public fields: Object = { text: 'text', tooltip: 'id' };

    //Process tooltip ajax content.
    public onBeforeRender(args: TooltipEventArgs): void {
        this.tooltipInstance.content = 'Loading...';
        this.tooltipInstance.dataBind();
        let ajax: Ajax = new Ajax('./src/tooltip/tooltipdata.json', 'GET', true);
        ajax.send().then(
            (result: any) => {
                result = JSON.parse(result);
                for (let i: number = 0; i < result.length; i++) {
                    if (result[i].Id === args.target.getAttribute('data-content')) {
                        this.tooltipInstance.content = "<div class='contentWrap'><span class=" + result[i].Class + "></span><div class='def'>" + result[i].Sports + "</div></div>";
                    }
                }
                this.tooltipInstance.dataBind();
            },
            (reason: any) => {
                this.tooltipInstance.content = reason.message;
                this.tooltipInstance.dataBind();
            });
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <h4 className="list-header">National Sports</h4>

                    {/* Tooltip element */}
                    <TooltipComponent ref={t => this.tooltipInstance = t} className="e-prevent-select" content='Loading...' target="#countrylist [title]" position='RightCenter' beforeRender={this.onBeforeRender.bind(this)}>

                        {/* ListView element */}
                        <ListViewComponent id="countrylist" dataSource={this.listViewData} fields={this.fields}></ListViewComponent>
                    </TooltipComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the AJAX functionalities of the Tooltip which will open by Hover or Touch-hold action on list-item.</p>
                </div>

                <div id="description">
                    <p>This sample illustrates the way to load the content of a tooltip dynamically using AJAX request. Here, when the user
                hovers/tap on the country names, its respective data (national game of each country and its related game icon) will
                be retrieved dynamically and then assigned to the tooltip’s content.</p>
                    <p>The AJAX request should be made within the <code>beforeRender</code> event of the tooltip, and on every success, the corresponding
                retrieved data will be set to the <code>content</code> property of the tooltip.</p>
                    <p>More information on loading dynamic tooltip content can be found in the
        <a href="http://ej2.syncfusion.com/react/documentation/tooltip/content.html#dynamic-content-via-ajax" target="_blank"> documentation section</a>.</p>
                </div>
            </div>
        )
    }
}