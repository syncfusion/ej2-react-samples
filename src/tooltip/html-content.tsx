/**
 * Loading HTML content sample
 */

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './html-content.css';

export class HtmlContentTooltip extends SampleBase<{}, {}> {
    public tooltipObj: TooltipComponent;

    public onClick(args: any): void {
        if(this.tooltipObj != null) {
        if (!args.target.classList.contains('e-control') &&
            !args.target.classList.contains('e-btn')) {
            if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                this.tooltipObj.close();
            }
        }
        }
    }

    public onScroll(): void {
        if(this.tooltipObj != null) {
        if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
            this.tooltipObj.close();
        }
    }
    }

    public created(): void {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('click', this.onClick.bind(this));
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }

    render() {
        function tooltipTemplate(): JSX.Element {
            return (
                <div id="democontent" className="democontent">
                    <h3 style={{ marginTop: '10px' }}>Eastern Bluebird</h3>
                    <img id="bird" src='./src/tooltip/images/bird.png' alt="bird_image" />
                    <p>The
                    <a href="https://en.wikipedia.org/wiki/Eastern_bluebird" target="_blank"> Eastern Bluebird </a>
                        is easily found in open fields and sparse woodland areas, including along woodland edges. These are
                        cavity-nesting birds
                        and a pair of eastern bluebirds will raise 2-3 broods annually, with 2-8 light blue or whitish eggs
                    per brood.</p>
                    <hr style={{ marginTop: '10px 0px' }} />
                    <p>Eastern bluebirds can be very vocal in flocks. Their calls include a rapid, mid-tone chatter and
                        several long dropping pitch
                    calls.</p>
                    <p>Source:<br />
                        <a href="https://en.wikipedia.org/wiki/Eastern_bluebird" target="_blank">https://en.wikipedia.org/wiki/Eastern_bluebird</a>
                    </p>
                </div>
            );
        }
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="htmlTemplate" className="col-lg-12 control-section">
                        <TooltipComponent id='content' created={this.created.bind(this)} content={tooltipTemplate} opensOn='Click' cssClass='e-tooltip-template-css' target="#content" ref={t => this.tooltipObj = t}>
                            <div id="customization">
                                <ButtonComponent cssClass='e-outline' isPrimary={true} className="text" id="content">HTML Template</ButtonComponent>
                            </div>
                        </TooltipComponent>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates customizing tooltip content to display a HTML page.</p>
                </div>

                <div id="description">
                    <p> Tooltip content has been customized using HTML tags and CSS, i.e. the content can be loaded with HTML tags such as &lt;img&gt;,
        &lt;a&gt;,&lt;b&gt;, etc. Title can also be added to the content. Overall, the tooltip content can be customized to appear like a web page.</p>
                </div>
            </div>
        )
    }
}
