import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './tooltip.css';

export class Tooltip extends SampleBase<{}, {}> {
    componentDidMount() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane')?.addEventListener('scroll', this.hideTooltipOnScroll);
        }
    }

    componentWillUnmount() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane')?.removeEventListener('scroll', this.hideTooltipOnScroll);
        }
    }

    hideTooltipOnScroll = () => {
        const tooltipElement = document.querySelector('.e-rating-tooltip');
        if (tooltipElement && Browser.isDevice) {
            (tooltipElement as HTMLElement).style.display = 'none';
        }
    }

    render() {
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
}