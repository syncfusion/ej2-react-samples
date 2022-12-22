import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import './tooltip.css';

function Tooltip() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div className='control-pane'>
        <div id="tooltip-rating-control">
            <div className="rating-content" >
                <label>Default</label><br/>
                <RatingComponent id='rating1' value={3.0}></RatingComponent>
            </div>
            <div className="rating-content">
                <label>Template</label><br/>
                <RatingComponent id='rating2' tooltipTemplate="<span>${value} Star</span>" value={3.0}></RatingComponent>
            </div>
            </div>
            <div id="action-description">
                <p>
                    The following sample demonstrates the tooltip and its customization using templates in the Angular Rating component.
                </p>
            </div>
            <div id="description">
                <p>
                    The <code>tooltipTemplate</code> property customizes the tooltip template in the Angular Rating component.
                </p>
            </div>
        </div>
    )
}
export default Tooltip;