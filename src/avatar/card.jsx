import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './card.css';
// tslint:disable:max-line-length
// *  Sample for CSS avatar component
export class Card extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className="sample_container card_sample">
                    
                    <div className="e-card e-custom-card">
                        <div className="e-card-header">
                            
                            <div className="e-avatar e-avatar-circle e-avatar-xlarge">
                                <img src="./src/avatar/images/pic02.png" alt="profile_pic"/>
                            </div>
                            &nbsp;
                    </div>
                        <div className="e-card-header">
                            <div className="e-card-header-caption center">
                                <div className="e-card-header-title name">Laura Callahan</div>
                                <div className="e-card-sub-title">Sales Coordinator</div>
                            </div>
                        </div>
                        <div className="e-card-content">
                                <p className="avatar-content"> Laura received a BA in psychology from the University of Washington. She has also completed a course in business French. She reads and writes French.</p>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the integration of avatar component with card component to create business cards.</p>
                </div>

                <div id="description">
                    <p>The circle avatar is integrated into card component to design business cards. The image element is wrapped by the avatar
                        container to apply circle style to avatar and add
        <code>.e-avatar-circle</code> class to the avatar container.
    </p>
                </div>
            </div>);
    }
}
