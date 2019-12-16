/**
 * Loading ajax content sample
 */
import * as React from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { Ajax } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './tooltip-sample.css';
export class AjaxContentTooltip extends SampleBase {
    constructor(props) {
        super(props);
        //Define an Array of JSON data
        this.listViewData = [
            { id: '1', text: 'Australia' },
            { id: '2', text: 'Bhutan' },
            { id: '3', text: 'China' },
            { id: '4', text: 'Cuba' },
            { id: '5', text: 'India' },
            { id: '6', text: 'Switzerland' },
            { id: '7', text: 'United States' }
        ];
        //Map appropriate columns to fields property.
        this.fields = { text: 'text', tooltip: 'id' };
        this.state = { content: 'Loading...' };
    }
    //Process tooltip ajax content.
    onBeforeRender(args) {
        let ajax = new Ajax('./src/tooltip/tooltipdata.json', 'GET', true);
        ajax.send().then((result) => {
            result = JSON.parse(result);
            for (let i = 0; i < result.length; i++) {
                if (result[i].Id === args.target.getAttribute('data-content')) {
                    this.setState({
                        content: "<div class='contentWrap'><span class=" + result[i].Class + "></span><div class='def'>" + result[i].Sports + "</div></div>"
                    });
                }
            }
        }, (reason) => {
            this.setState({
                content: reason.message
            });
        });
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <h4 className="list-header">National Sports</h4>

                    
                    <TooltipComponent className="e-prevent-select" cssClass="e-ajax-content" content={this.state.content} target="#countrylist [title]" position='RightCenter' beforeRender={this.onBeforeRender.bind(this)}>

                        
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
            </div>);
    }
}
