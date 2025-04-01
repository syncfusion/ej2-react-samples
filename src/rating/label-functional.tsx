import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from "react";
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './label.css';

const Label = () => {
    useEffect(() => {
        updateSampleSection();

        const hideTooltipOnScroll = () => {
            const tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && Browser.isDevice) {
                (tooltipElement as HTMLElement).style.display = 'none';
            }
        };

        const rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', hideTooltipOnScroll);
        }

        return () => {
            if (rightPane) {
                rightPane.removeEventListener('scroll', hideTooltipOnScroll);
            }
        };
    }, []);

    return (
        <div className='control-pane'>
            <div id="label-rating-control">
                <div className="rating-content" >
                    <label>Default</label><br/>
                    <RatingComponent id='rating1' value={3.0} showLabel={true}></RatingComponent>
                </div>
                <div className="rating-content" >
                    <label>Left</label><br/>
                    <RatingComponent id='rating2' value={3.0} showLabel={true} labelPosition='Left'></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Label Template</label><br/>
                    <RatingComponent id='rating3' value={3.0} showLabel={true} labelTemplate="<span>${value} out of 5</span>"></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Top</label><br/>
                    <RatingComponent id='rating4' value={3.0} showLabel={true} labelPosition='Top'></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Bottom</label><br/>
                    <RatingComponent id='rating5' value={3.0} showLabel={true} labelPosition='Bottom'></RatingComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates label support, including label positioning and templates, in the Angular Rating component. 
                </p>
            </div>
            <div id="description">
                <p>
                    You can show or hide labels by setting the <code>showLabel</code> property. The <code>labelPosition</code> property provides several built-in positions and the appearance of labels can be customized using the <code>labelTemplate</code> property.
                </p>
            </div>
        </div> 
    )
}
export default Label;