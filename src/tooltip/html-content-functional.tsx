/**
 * Loading HTML content sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useRef, useEffect } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import './html-content.css';
 
const HtmlContentTooltip = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let tooltipObj = useRef<TooltipComponent>(null);

    const onClick = (args: any): void => {
        if(tooltipObj.current != null) {
            if (!args.target.classList.contains('e-control') && !args.target.classList.contains('e-btn')) {
                if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                    tooltipObj.current.close();
                }
            }
        }
    }

    const onScroll = (): void => {
        if(tooltipObj.current != null) {
            if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                tooltipObj.current.close();
            }
        }
    }

    const created = (): void => {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('click', onClick.bind(this));
            document.getElementById('right-pane').addEventListener('scroll', onScroll.bind(this));
        }
    }

    const tooltipTemplate = () => {
        return (
            <div id="democontent" className="democontent">
                <h3 style={{ marginTop: '10px' }}>Eastern Bluebird</h3>
                <hr style={{ marginTop: '10px 0px' }} />
                <img id="bird" src='./src/tooltip/images/bird.png' alt="bird_image" />
                <p>
                    The <a href="https://en.wikipedia.org/wiki/Eastern_bluebird" target="_blank"> Eastern Bluebird </a>
                    is easily found in open fields and sparse woodland areas, including along woodland edges.
                </p>
            </div>
        );
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id="htmlTemplate" className="col-lg-12 control-section">
                    <TooltipComponent id='content' created={created.bind(this)} content={tooltipTemplate} opensOn='Click' cssClass='e-tooltip-template-css' target="#content" ref={tooltipObj}>
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
                <p> 
                    Tooltip content has been customized using HTML tags and CSS, i.e. the content can be loaded with HTML tags such as &lt;img&gt;,
                    &lt;a&gt;,&lt;b&gt;, etc. Title can also be added to the content. Overall, the tooltip content can be customized to appear like a web page.
                </p>
            </div>
        </div>
    )
}
 export default HtmlContentTooltip;
 
