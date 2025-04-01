import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './keyboard-navigation.css';

export class KeyboardNavigation extends SampleBase<{}, {}> {
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
                <div id="nav-rating-control">
                    <RatingComponent id='rating1' allowReset={true} value={3.0}></RatingComponent>
                </div>
                <div id="action-description">
                    <p>
                        This demo showcases the keyboard shortcuts applicable in the Rating component.
                    </p>
                </div>
                <div id="description">
                    <i>The below key combinations can be used in Rating to perform various actions. </i>
                    <ul>
                        <li>
                            <span className="key-class"><kbd>Tab</kbd></span>
                            <span> - Focus.</span>
                        </li>
                        <li>
                            <span className="key-class"><kbd>Left Arrow</kbd></span>
                            <span> - Increase in RTL and decrease in LTR.</span>
                        </li>
                        <li>
                            <span className="key-class"><kbd>Right Arrow</kbd></span>
                            <span> - Decrease in RTL and increase in LTR.</span>
                        </li>
                        <li>
                            <span className="key-class"><kbd>Down arrow</kbd></span>
                            <span> - Decreases the value.</span>
                        </li>
                        <li>
                            <span className="key-class"><kbd>Up arrow</kbd></span>
                            <span> - Increases the value.</span>
                        </li>
                    </ul>
                </div>
          </div>
        )
    }
}